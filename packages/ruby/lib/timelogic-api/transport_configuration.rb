# frozen_string_literal: true

require 'uri'

module TimeLogic
  module Api
    module TransportConfiguration
      DEFAULT_API_BASE_URL = 'https://api.timelogicapi.com'
      DEFAULT_RAPID_API_HOST = 'timelogic-api-world-time-timezones-time-calculations.p.rapidapi.com'
      DEFAULT_RAPID_API_BASE_URL = "https://#{DEFAULT_RAPID_API_HOST}"

      module_function

      def build(api_key:, rapid_api: false, base_url: nil, rapid_api_host: nil)
        raise ArgumentError, 'api_key is required' if api_key.to_s.strip.empty?

        host = (rapid_api_host || DEFAULT_RAPID_API_HOST).strip
        uri = URI.parse(base_url || (rapid_api ? DEFAULT_RAPID_API_BASE_URL : DEFAULT_API_BASE_URL))
        configuration = Configuration.new
        configuration.scheme = uri.scheme
        configuration.host = uri.port && ![80, 443].include?(uri.port) ? "#{uri.host}:#{uri.port}" : uri.host
        configuration.base_path = uri.path
        configuration.ignore_operation_servers = true
        if rapid_api
          configuration.api_key['X-RapidAPI-Key'] = api_key.strip
          configuration.api_key['X-RapidAPI-Host'] = host
        else
          configuration.access_token = api_key.strip
        end
        configuration
      end
    end
  end
end
