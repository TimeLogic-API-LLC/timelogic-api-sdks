# frozen_string_literal: true

require 'json'
require 'timelogic-api'

# Typed /v1 response decoding. The offline examples send recorded API
# responses through the generated client with stubbed HTTP. The live examples
# run only when TIMELOGIC_SDK_TEST_API_KEY (or TIMELOGIC_API_KEY) is set.
RSpec.describe 'v1 typed responses' do
  single = '{"unix":1772366400,"unix_ms":1772366400000,"utc":"2026-03-01T12:00:00Z","iso_local":"2026-03-01T21:00:00+09:00","rfc2822":"Sun, 01 Mar 2026 21:00:00 +0900","human":"March 1, 2026, 9:00 PM Asia/Tokyo","day_number":1,"day_short":"Sun","day_full":"Sunday","timezone":"Asia/Tokyo"}'
  bulk = '[{"unix":1772366400,"unix_ms":1772366400000,"utc":"2026-03-01T12:00:00Z","iso_local":"2026-03-01T21:00:00+09:00","rfc2822":"Sun, 01 Mar 2026 21:00:00 +0900","human":"March 1, 2026, 9:00 PM Asia/Tokyo","day_number":1,"day_short":"Sun","day_full":"Sunday","timezone":"Asia/Tokyo"},{"item":"Bad/Zone","error":{"code":"INVALID_PARAMETER","message":"Invalid timezone.","details":{"tz":"Bad/Zone"}},"request_id":"a6116a2e-8809-46e9-99c5-765cf0d50fcb"}]'
  timezone = '{"unix":1772366400,"unix_ms":1772366400000,"utc":"2026-03-01T12:00:00Z","iso_local":"2026-03-01T21:00:00+09:00","rfc2822":"Sun, 01 Mar 2026 21:00:00 +0900","human":"March 1, 2026, 9:00 PM Asia/Tokyo","day_number":1,"day_short":"Sun","day_full":"Sunday","timezone":"Asia/Tokyo","offset":540,"dst":false}'
  offset = '{"unix":1772366400,"unix_ms":1772366400000,"utc":"2026-03-01T12:00:00Z","iso_local":"2026-03-01T17:30:00+05:30","rfc2822":"Sun, 01 Mar 2026 21:00:00 +0900","human":"March 1, 2026, 5:30 PM UTC+05:30","day_number":1,"day_short":"Sun","day_full":"Sunday","timezone":null,"offset":330,"dst":false,"matching_zones":[{"timezone":"Asia/Colombo","offset":330,"dst":false},{"timezone":"Asia/Kolkata","offset":330,"dst":false}]}'
  error = '{"error":{"code":"INVALID_PARAMETER","message":"Invalid timezone.","details":{"tz":"Bad/Zone"}},"request_id":"a6116a2e-8809-46e9-99c5-765cf0d50fcb"}'

  def api_with(status, body)
    Typhoeus::Expectation.clear
    Typhoeus.stub(/example\.test/).and_return(Typhoeus::Response.new(code: status, body: body, headers: { 'Content-Type' => 'application/json' }))
    config = TimeLogic::Api::TransportConfiguration.build(api_key: 'test-key', base_url: 'https://api.example.test')
    TimeLogic::Api::TimeApi.new(TimeLogic::Api::ApiClient.new(config))
  end

  after { Typhoeus::Expectation.clear }

  it 'decodes a single result as TimePayload' do
    value = api_with(200, single).get_current_time(tz: 'Asia/Tokyo')
    expect(value).to be_a(TimeLogic::Api::TimePayload)
    expect(value.unix_ms).to eq(1_772_366_400_000)
    expect(value.iso_local).to eq('2026-03-01T21:00:00+09:00')
  end

  it 'decodes bulk items as TimePayload or BulkError' do
    value = api_with(200, bulk).convert_time(unix: 1_772_366_400, tz: 'Asia/Tokyo,Bad/Zone')
    expect(value).to be_a(TimeLogic::Api::TimePayloadBulkResponse)
    expect(value.length).to eq(2)
    expect(value[0]).to be_a(TimeLogic::Api::TimePayload)
    expect(value[0].timezone).to eq('Asia/Tokyo')
    expect(value[1]).to be_a(TimeLogic::Api::BulkError)
    expect(TimeLogic::Api::TimePayloadBulkResponse.bulk_error?(value[1])).to be(true)
    expect(value[1].item).to eq('Bad/Zone')
    expect(value[1].error.code).to eq('INVALID_PARAMETER')
    expect(value[1].request_id).to eq('a6116a2e-8809-46e9-99c5-765cf0d50fcb')
    expect(JSON.parse(value.to_hash.to_json)[1]).to eq(JSON.parse(bulk)[1])
    expect(value.to_hash[0][:utc]).to eq(Time.utc(2026, 3, 1, 12))
  end

  it 'decodes timezone and offset lookups' do
    zone = api_with(200, timezone).get_timezone(tz: 'Asia/Tokyo')
    expect(zone).to be_a(TimeLogic::Api::TimezoneResponse)
    expect(zone.timezone).to eq('Asia/Tokyo')
    expect(zone.offset).to eq(540)
    expect(zone.matching_zones).to be_nil
    lookup = api_with(200, offset).get_timezone(offset: '+05:30')
    expect(lookup.timezone).to be_nil
    expect(lookup.matching_zones.map(&:timezone)).to eq(%w[Asia/Colombo Asia/Kolkata])
    expect(lookup.matching_zones[1]).to be_a(TimeLogic::Api::TimezoneMatch)
    expect(lookup.matching_zones[1].offset).to eq(330)
    expect(lookup.matching_zones[1].dst).to be(false)
  end

  it 'raises ApiException with the status and the error body' do
    expect { api_with(400, error).get_current_time(tz: 'Bad/Zone') }.to raise_error(TimeLogic::Api::ApiException) do |raised|
      expect(raised.code).to eq(400)
      body = JSON.parse(raised.response_body)
      expect(body['error']['code']).to eq('INVALID_PARAMETER')
      expect(body['request_id']).to eq('a6116a2e-8809-46e9-99c5-765cf0d50fcb')
    end
  end

  context 'against the live API' do
    let(:key) { ENV['TIMELOGIC_SDK_TEST_API_KEY'].to_s.empty? ? ENV['TIMELOGIC_API_KEY'].to_s : ENV['TIMELOGIC_SDK_TEST_API_KEY'] }
    let(:config) do
      skip 'set TIMELOGIC_SDK_TEST_API_KEY to run live calls' if key.empty?
      TimeLogic::Api::TransportConfiguration.build(api_key: key, base_url: ENV['TIMELOGIC_SDK_TEST_BASE_URL'])
    end
    let(:api) { TimeLogic::Api::TimeApi.new(TimeLogic::Api::ApiClient.new(config)) }

    it 'decodes every operation' do
      expect(api.get_current_time(tz: 'America/New_York').timezone).to eq('America/New_York')
      many = api.get_current_time(tz: 'America/New_York,Europe/London,Bad/Zone')
      expect(many[1].timezone).to eq('Europe/London')
      expect(many[2]).to be_a(TimeLogic::Api::BulkError)
      expect(api.convert_time(unix: 1_772_366_400, tz: 'Asia/Tokyo').iso_local).to eq('2026-03-01T21:00:00+09:00')
      expect(api.convert_time(unix: 1_772_366_400, offset: '+01:00,+02:00')[1].iso_local).to eq('2026-03-01T14:00:00+02:00')
      expect(api.get_timezone(tz: 'Europe/London').matching_zones).to be_nil
      expect(api.get_timezone(offset: '+05:30').matching_zones[0].offset).to eq(330)
      diff = api.diff_time('iso=2026-01-01T00:00:00Z', 'iso=2026-03-01T12:00:00Z')
      expect(diff.days).to eq(59)
      expect(diff.from.unix_ms).to eq(1_767_225_600_000)
      expect(api.add_time(unix: 0, seconds: 60, utc: true).unix).to eq(60)
      expect(api.get_calendar(tz: 'America/New_York', week: true).week_number).to be > 0
      expect(api.get_dst(tz: 'America/New_York', _next: true).next_transition).not_to be_nil
      expect(api.get_elapsed(iso: '2026-01-01T00:00:00Z', compare_iso: '2026-02-01T00:00:00Z').days).to eq(31)
      expect(api.get_clock('digital-broadcast', tz: 'UTC')).to include('timelogic-clock')
      jwks = TimeLogic::Api::UtilityApi.new(TimeLogic::Api::ApiClient.new(config)).get_public_signing_key
      expect(jwks.keys[0].kty).to eq('OKP')
    end

    it 'keeps the error code and request id' do
      expect { api.get_current_time(tz: 'Bad/Zone') }.to raise_error(TimeLogic::Api::ApiException) do |raised|
        expect(raised.code).to eq(400)
        expect(JSON.parse(raised.response_body)['request_id']).not_to be_empty
      end
    end
  end
end
