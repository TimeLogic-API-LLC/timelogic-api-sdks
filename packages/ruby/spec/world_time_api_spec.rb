# frozen_string_literal: true

require 'json'
require 'timelogic-api'

LONDON_JSON = '{"utc_offset":"+00:00","timezone":"Europe/London","day_of_week":0,"day_of_year":305,"datetime":"2026-11-01T03:34:38.413000+00:00","utc_datetime":"2026-11-01T03:34:38.413000+00:00","unixtime":1793504078,"raw_offset":0,"week_number":44,"dst":false,"abbreviation":"GMT","dst_offset":0,"dst_from":null,"dst_until":null,"client_ip":"203.0.113.7"}'

RSpec.describe TimeLogic::Api::WorldTimeApi::Client do
  def client_for(routes, sign = false)
    calls = []
    transport = lambda do |url, headers|
      calls << [url, headers]
      path = URI.parse(url).path
      status, body = routes.fetch(path, [404, '{"error":"not found"}'])
      TimeLogic::Api::WorldTimeApi::RawResponse.new(status: status, headers: { 'x-timelogic-signature' => 'sig' }, body: body)
    end
    [described_class.new(api_key: 'test-key', base_url: 'https://example.test/', sign: sign, transport: transport), calls]
  end

  it 'returns the 15 worldtimeapi.org fields and sends X-API-Key' do
    client, calls = client_for('/api/timezone/Europe/London' => [200, LONDON_JSON])
    value = client.get_timezone('Europe/London')
    expect(value.timezone).to eq('Europe/London')
    expect(value.unixtime).to eq(1_793_504_078)
    expect(value.dst_from).to be_nil
    expect(value.to_h.transform_keys(&:to_s)).to eq(JSON.parse(LONDON_JSON))
    expect(TimeLogic::Api::WorldTimeApi::FIELDS.length).to eq(15)
    expect(calls[0][1]['X-API-Key']).to eq('test-key')
  end

  it 'uses the worldtimeapi.org paths' do
    client, calls = client_for(
      '/api/timezone' => [200, '["Europe/London","UTC"]'],
      '/api/timezone.txt' => [200, "Europe/London\nUTC"],
      '/api/timezone/Europe' => [200, '["Europe/London"]'],
      '/api/timezone/Europe.txt' => [200, 'Europe/London'],
      '/api/timezone/America/Argentina/Salta' => [200, LONDON_JSON],
      '/api/timezone/Europe/London.txt' => [200, 'abbreviation: GMT'],
      '/api/ip' => [200, LONDON_JSON],
      '/api/ip/8.8.8.8' => [200, LONDON_JSON],
      '/api/ip.txt' => [200, 'abbreviation: GMT'],
      '/api/ip/8.8.8.8.txt' => [200, 'abbreviation: GMT']
    )
    expect(client.list_timezones).to eq(%w[Europe/London UTC])
    expect(client.list_timezones_text).to eq("Europe/London\nUTC")
    expect(client.list_timezones_in_area('Europe')).to eq(['Europe/London'])
    expect(client.list_timezones_in_area_text('Europe')).to eq('Europe/London')
    expect(client.get_timezone('America/Argentina/Salta').timezone).to eq('Europe/London')
    expect(client.get_timezone_text('Europe/London')).to eq('abbreviation: GMT')
    expect(client.get_ip.timezone).to eq('Europe/London')
    expect(client.get_ip('8.8.8.8').timezone).to eq('Europe/London')
    expect(client.get_ip_text).to eq('abbreviation: GMT')
    expect(client.get_ip_text('8.8.8.8')).to eq('abbreviation: GMT')
    expect(calls.length).to eq(10)
  end

  it 'raises UnknownLocationError for unknown locations' do
    client, = client_for(
      '/api/timezone/Nowhere/Land' => [404, '{"error":"unknown location"}'],
      '/api/timezone/Nowhere/Land.txt' => [404, 'Error: unknown location'],
      '/api/ip/999.1.1.1' => [404, '{"error":"malformed ip"}']
    )
    expect { client.get_timezone('Nowhere/Land') }.to raise_error(TimeLogic::Api::WorldTimeApi::UnknownLocationError) { |e|
      expect(e.status).to eq(404)
      expect(e).to be_unknown_location
    }
    expect { client.get_timezone_text('Nowhere/Land') }.to raise_error(TimeLogic::Api::WorldTimeApi::UnknownLocationError)
    expect { client.get_ip('999.1.1.1') }.to raise_error(TimeLogic::Api::WorldTimeApi::Error, &:malformed_ip?)
  end

  it 'keeps the TimeLogic code on auth errors' do
    client, = client_for('/api/timezone/UTC' => [401, '{"error":{"code":"UNAUTHORIZED","message":"Missing API key credentials."}}'])
    expect { client.get_timezone('UTC') }.to raise_error(TimeLogic::Api::WorldTimeApi::Error) { |e|
      expect(e.status).to eq(401)
      expect(e.code).to eq('UNAUTHORIZED')
      expect(e).not_to be_unknown_location
    }
  end

  it 'adds sign=true and exposes signature headers' do
    client, calls = client_for({ '/api/timezone/Europe/London' => [200, LONDON_JSON] }, true)
    raw = client.request_raw('/api/timezone/Europe/London')
    expect(calls[0][0]).to eq('https://example.test/api/timezone/Europe/London?sign=true')
    expect(raw.headers['x-timelogic-signature']).to eq('sig')
  end

  it 'leaves the generated /v1 client in place' do
    expect(defined?(TimeLogic::Api::TimeApi)).to eq('constant')
    expect(defined?(TimeLogic::Api::TransportConfiguration)).to eq('constant')
  end

  it 'answers from the live API when TIMELOGIC_API_KEY is set' do
    skip 'TIMELOGIC_API_KEY is not set' if ENV['TIMELOGIC_API_KEY'].to_s.empty?

    client = described_class.new(api_key: ENV.fetch('TIMELOGIC_API_KEY'))
    expect(client.get_timezone('Europe/London').timezone).to eq('Europe/London')
    expect { client.get_timezone('Nowhere/Land') }.to raise_error(TimeLogic::Api::WorldTimeApi::UnknownLocationError)
  end
end
