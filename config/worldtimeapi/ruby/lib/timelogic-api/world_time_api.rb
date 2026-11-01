# frozen_string_literal: true

# WorldTimeAPI-compatible client for the TimeLogic API /api/* routes.
#
# Contract: openapi/openapi-worldtimeapi.yaml. The routes answer the same paths, field
# names and plain-text variants as worldtimeapi.org; a TimeLogic API key is required and
# is sent as the X-API-Key header. This module uses Ruby's standard library only and does
# not use or change the generated /v1 ApiClient, Configuration or TransportConfiguration.
#
#   client = TimeLogic::Api::WorldTimeApi::Client.new(api_key: ENV.fetch('TIMELOGIC_API_KEY'))
#   now = client.get_timezone('Europe/London')
#   puts now.datetime

require 'json'
require 'net/http'
require 'uri'

module TimeLogic
  module Api
    module WorldTimeApi
      DEFAULT_BASE_URL = 'https://api.timelogicapi.com'

      FIELDS = %i[
        abbreviation client_ip datetime day_of_week day_of_year dst dst_from dst_offset
        dst_until raw_offset timezone unixtime utc_datetime utc_offset week_number
      ].freeze

      # Time object with the worldtimeapi.org field names and types.
      DateTime = Struct.new(*FIELDS, keyword_init: true) do
        def self.from_hash(hash)
          new(**FIELDS.to_h { |field| [field, hash[field.to_s]] })
        end
      end

      # HTTP answer, including the X-TimeLogic-Signature* headers when signing is enabled.
      RawResponse = Struct.new(:status, :headers, :body, keyword_init: true)

      # Raised for any non-2xx answer. +error+ is the worldtimeapi.org-style message (for
      # example "unknown location") or the TimeLogic message for authentication and quota errors.
      class Error < StandardError
        attr_reader :status, :error, :code, :body

        def initialize(status, error, code, body)
          super("WorldTimeAPI-compatible request failed (#{status}): #{error}")
          @status = status
          @error = error
          @code = code
          @body = body
        end

        def unknown_location?
          status == 404 && error == 'unknown location'
        end

        def malformed_ip?
          status == 404 && error == 'malformed ip'
        end
      end

      # The 404 {"error":"unknown location"} answer.
      class UnknownLocationError < Error; end

      def self.error_from_response(status, body)
        message = body.to_s.strip
        code = nil
        if message.start_with?('Error:')
          message = message.delete_prefix('Error:').strip
        else
          begin
            parsed = JSON.parse(body.to_s)
            if parsed.is_a?(Hash) && parsed.key?('error')
              if parsed['error'].is_a?(String)
                message = parsed['error']
              elsif parsed['error'].is_a?(Hash)
                message = parsed['error']['message'].to_s
                code = parsed['error']['code']&.to_s
              end
            end
          rescue JSON::ParserError
            # keep the raw body as the message
          end
        end
        klass = status == 404 && message == 'unknown location' ? UnknownLocationError : Error
        klass.new(status, message, code, body.to_s)
      end

      # Path for "Europe/London", "America/Argentina/Salta" or a one-word zone such as "UTC".
      def self.zone_path(timezone, text = false)
        segments = timezone.to_s.split('/').reject(&:empty?)
        unless (1..3).cover?(segments.length)
          raise ArgumentError, 'timezone must have one to three segments, for example "Europe/London"'
        end

        "/api/timezone/#{segments.map { |s| URI.encode_www_form_component(s).gsub('+', '%20') }.join('/')}#{text ? '.txt' : ''}"
      end

      def self.ip_path(ip = nil, text = false)
        base = ip.nil? || ip.to_s.empty? ? '/api/ip' : "/api/ip/#{URI.encode_www_form_component(ip.to_s)}"
        "#{base}#{text ? '.txt' : ''}"
      end

      # Client for the WorldTimeAPI-compatible routes.
      class Client
        # transport: optional callable (url, headers) -> RawResponse, used by tests.
        def initialize(api_key:, base_url: DEFAULT_BASE_URL, sign: false, timeout: 30, transport: nil)
          raise ArgumentError, 'api_key is required' if api_key.nil? || api_key.to_s.empty?

          @api_key = api_key.to_s
          @base_url = base_url.to_s.sub(%r{/+\z}, '')
          @sign = sign
          @timeout = timeout
          @transport = transport
        end

        # GET /api/timezone
        def list_timezones
          get_json('/api/timezone')
        end

        # GET /api/timezone.txt
        def list_timezones_text
          get_text('/api/timezone.txt')
        end

        # GET /api/timezone/{area}
        def list_timezones_in_area(area)
          value = get_json(WorldTimeApi.zone_path(area))
          raise Error.new(200, "#{area} is a timezone, not an area; use get_timezone", nil, JSON.generate(value)) unless value.is_a?(Array)

          value
        end

        # GET /api/timezone/{area}.txt
        def list_timezones_in_area_text(area)
          get_text(WorldTimeApi.zone_path(area, true))
        end

        # GET /api/timezone/{area}/{location}[/{region}], or a one-word zone such as UTC.
        def get_timezone(timezone)
          DateTime.from_hash(get_json(WorldTimeApi.zone_path(timezone)))
        end

        def get_timezone_text(timezone)
          get_text(WorldTimeApi.zone_path(timezone, true))
        end

        # GET /api/ip (the caller's address) or /api/ip/{ip}.
        def get_ip(ip = nil)
          DateTime.from_hash(get_json(WorldTimeApi.ip_path(ip)))
        end

        def get_ip_text(ip = nil)
          get_text(WorldTimeApi.ip_path(ip, true))
        end

        # GET any /api/* path and return status, headers and body without raising.
        def request_raw(path)
          url = "#{@base_url}#{path}#{@sign ? '?sign=true' : ''}"
          headers = { 'X-API-Key' => @api_key, 'Accept' => path.end_with?('.txt') ? 'text/plain' : 'application/json' }
          return @transport.call(url, headers) if @transport

          uri = URI.parse(url)
          http = Net::HTTP.new(uri.host, uri.port)
          http.use_ssl = uri.scheme == 'https'
          http.open_timeout = @timeout
          http.read_timeout = @timeout
          request = Net::HTTP::Get.new(uri.request_uri)
          headers.each { |name, value| request[name] = value }
          response = http.request(request)
          RawResponse.new(
            status: response.code.to_i,
            headers: response.each_header.to_h { |name, value| [name.downcase, value] },
            body: response.body.to_s.dup.force_encoding('UTF-8')
          )
        end

        private

        def get_text(path)
          raw = request_raw(path)
          raise WorldTimeApi.error_from_response(raw.status, raw.body) unless (200..299).cover?(raw.status)

          raw.body
        end

        def get_json(path)
          JSON.parse(get_text(path))
        end
      end
    end
  end
end
