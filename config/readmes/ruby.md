# TimeLogic API SDK for Ruby

Official Ruby client for [TimeLogic API](https://api.timelogicapi.com): current time, time zone lookups, conversions, date arithmetic, business-day counts, DST status, calendars, embeddable clocks and signed responses. The package contains two clients:

- the `/v1` client, generated from the [TimeLogic API contract](https://github.com/TimeLogic-API-LLC/timelogic-api-sdks/blob/main/openapi/openapi.yaml), with direct and RapidAPI transports;
- a [WorldTimeAPI-compatible client](#worldtimeapi-compatible-client) for the `/api/timezone` and `/api/ip` routes, which use worldtimeapi.org's paths, fields and plain-text format.

Package: [`timelogic-api`](https://rubygems.org/gems/timelogic-api), version __VERSION__. Changes are listed in the [changelog](https://github.com/TimeLogic-API-LLC/timelogic-api-sdks/blob/main/CHANGELOG.md).

## Install

```bash
gem install timelogic-api -v __VERSION__
```

Or in a Gemfile: `gem 'timelogic-api', '__VERSION__'`. Requires Ruby 2.7+.

## Quick start

Get an API key, export it as `TIMELOGIC_API_KEY`, and run:

```ruby
require 'timelogic-api'

config = TimeLogic::Api::TransportConfiguration.build(api_key: ENV.fetch('TIMELOGIC_API_KEY'))
time = TimeLogic::Api::TimeApi.new(TimeLogic::Api::ApiClient.new(config))

now = time.get_current_time(tz: 'America/New_York')
puts "#{now.iso_local} #{now.timezone}"
```

## Configuration

The transport helper sets the host and credentials for the `/v1` client. Pass a TimeLogic key for the direct API, or a RapidAPI key with the RapidAPI option; the SDK then sends `X-RapidAPI-Key` and `X-RapidAPI-Host` (default host `timelogic-api-world-time-timezones-time-calculations.p.rapidapi.com`, overridable). Keep keys in environment variables or a secret store, not in source control.

```ruby
require 'timelogic-api'

# Direct API (default host https://api.timelogicapi.com, sends Authorization: Bearer <key>)
direct = TimeLogic::Api::TransportConfiguration.build(api_key: ENV.fetch('TIMELOGIC_API_KEY'))

# RapidAPI: pass only your RapidAPI key; the SDK sets X-RapidAPI-Key and X-RapidAPI-Host
rapid = TimeLogic::Api::TransportConfiguration.build(api_key: ENV.fetch('RAPIDAPI_KEY'), rapid_api: true)

# A different host (for example a compatible gateway or a test server)
custom = TimeLogic::Api::TransportConfiguration.build(api_key: ENV.fetch('TIMELOGIC_API_KEY'), base_url: 'https://your-compatible-gateway.example')

# Request timeout in seconds (default 0, meaning no timeout). The SDK does not retry.
direct.timeout = 10
```

## Operations

| Operation | Endpoint | Method |
| --- | --- | --- |
| Current time | `GET /v1/time/current` | `TimeApi#get_current_time` |
| Convert | `GET /v1/time/convert` | `TimeApi#convert_time` |
| Add | `GET /v1/time/add` | `TimeApi#add_time` |
| Difference | `GET /v1/time/diff` | `TimeApi#diff_time` |
| Elapsed | `GET /v1/time/elapsed` | `TimeApi#get_elapsed` |
| Timezone | `GET /v1/timezone` | `TimeApi#get_timezone` |
| Daylight saving | `GET /v1/time/dst` | `TimeApi#get_dst` |
| Calendar | `GET /v1/time/calendar` | `TimeApi#get_calendar` |
| Clock | `GET /v1/time/clock` | `TimeApi#get_clock` |
| Signing keys | `GET /.well-known/time-api-public-key` | `UtilityApi#get_public_signing_key` |

Operations take an options hash named after the query parameters in snake_case; `next` is a Ruby keyword, so `get_dst` takes `_next:`. Each operation has a `…_with_http_info` variant that returns `[data, status_code, headers]`. API errors raise `TimeLogic::Api::ApiException` with `code`, `response_headers` and `response_body`. Parameters, response fields and errors for every operation: [How the API works](#how-the-api-works). Generated reference: [TimeApi](https://github.com/TimeLogic-API-LLC/timelogic-api-sdks/blob/main/packages/ruby/docs/TimeApi.md), [UtilityApi](https://github.com/TimeLogic-API-LLC/timelogic-api-sdks/blob/main/packages/ruby/docs/UtilityApi.md) and the models in the same folder.

### Examples

```ruby
require 'timelogic-api'

client = TimeLogic::Api::ApiClient.new(TimeLogic::Api::TransportConfiguration.build(api_key: ENV.fetch('TIMELOGIC_API_KEY')))
time = TimeLogic::Api::TimeApi.new(client)

# Convert a New York wall-clock time to Tokyo
tokyo = time.convert_time(iso: '2026-03-01T09:00:00', source_tz: 'America/New_York', tz: 'Asia/Tokyo')

# Add 1 day and 2 hours, shown in New York time
later = time.add_time(iso: '2026-03-07T12:00:00Z', days: 1, hours: 2, tz: 'America/New_York')

# Duration and business days between two instants (Zurich holiday calendar)
diff = time.diff_time('iso=2026-01-02T00:00:00Z', 'iso=2026-04-30T00:00:00Z', business_days: true, holiday_country: 'CH-ZH')
puts "#{diff.days} #{diff.direction} #{diff.business_days}" # 118 forward 82

# Time left until a deadline
left = time.get_elapsed(iso: '2027-01-01T00:00:00Z')

# Zone details, DST status with the next transition, ISO week number
berlin = time.get_timezone(tz: 'Europe/Berlin')
dst = time.get_dst(tz: 'America/New_York', _next: true) # `next` is a Ruby keyword, so the option is _next
calendar = time.get_calendar(tz: 'Europe/London', week: true)

# Embeddable HTML clock
html = time.get_clock('digital-dashboard', tz: 'Europe/London')

# Public signing keys (no API key needed)
keys = TimeLogic::Api::UtilityApi.new(client).get_public_signing_key
```

## Errors, headers and signed responses

```ruby
require 'timelogic-api'

time = TimeLogic::Api::TimeApi.new(TimeLogic::Api::ApiClient.new(TimeLogic::Api::TransportConfiguration.build(api_key: ENV.fetch('TIMELOGIC_API_KEY'))))

begin
  time.get_current_time(tz: 'Bad/Zone')
rescue TimeLogic::Api::ApiException => e
  puts "#{e.code} #{e.response_body}"
  # 400 {"error":{"code":"INVALID_PARAMETER","message":"Invalid timezone.",...},"request_id":"..."}
end

# *_with_http_info returns [data, status code, headers]
dst, status, headers = time.get_dst_with_http_info(tz: 'Asia/Kolkata', sign: true)
puts "#{status} #{headers['x-timelogic-quota-limit']} #{headers['x-timelogic-signature']}"
```

The SDK does not retry. A `429 QUOTA_EXCEEDED` carries no `Retry-After` header; quotas reset at 00:00 UTC on the 1st of each month. Status codes and error codes: [Errors](#errors).

## WorldTimeAPI-compatible client

A separate client for the WorldTimeAPI-compatible routes. Code written for worldtimeapi.org needs only the new host and an API key: paths, field names, types and the `.txt` format are the same. The client sends the key as `X-API-Key`, has a 30-second timeout, does not retry, and does not use or change the `/v1` configuration.

```ruby
require 'timelogic-api'

wta = TimeLogic::Api::WorldTimeApi::Client.new(api_key: ENV.fetch('TIMELOGIC_API_KEY')) # timeout: 30 seconds

zones = wta.list_timezones                  # ["Africa/Abidjan", ...]
europe = wta.list_timezones_in_area('Europe') # ["Europe/Amsterdam", ...]
london = wta.get_timezone('Europe/London')
puts "#{london.datetime} #{london.utc_offset} #{london.dst}"
text = wta.get_timezone_text('Europe/London') # "abbreviation: GMT\nclient_ip: ..."
mine = wta.get_ip                             # the caller's address
google = wta.get_ip('8.8.8.8')

begin
  wta.get_timezone('Nope/Zone')
rescue TimeLogic::Api::WorldTimeApi::UnknownLocationError
  puts 'unknown location' # 404 {"error":"unknown location"}
rescue TimeLogic::Api::WorldTimeApi::Error => e
  puts "#{e.status} #{e.error}"
end

# Signed responses: read the headers (lower-case names) through request_raw
signed = TimeLogic::Api::WorldTimeApi::Client.new(api_key: ENV.fetch('TIMELOGIC_API_KEY'), sign: true)
raw = signed.request_raw('/api/timezone/Europe/London')
puts "#{raw.status} #{raw.headers['x-timelogic-signature']} #{raw.body}"
```

Routes, fields and errors: [WorldTimeAPI-compatible routes](#worldtimeapi-compatible-routes).

## Migrating from 1.x to 2.0

2.0 changes the `/v1` response types so that every response decodes into a typed model. The API itself is unchanged. What changed in the contract, for every language:

- `timezone` returns one model, `TimezoneResponse`: the time payload plus `offset`, `dst`, and `matching_zones` (present only for `offset` lookups). The `oneOf` wrapper `GetTimezone200Response` and its members `TimezoneResolvedResponse` and `TimezoneOffsetResponse` are removed.
- `TimezoneMatch` (the `matching_zones` item) is `timezone`, `offset` and `dst`, as the API returns it. It previously described a full time payload.
- `timezone` takes the `format` parameter, after `sign`.
- `JwkKey` lists the optional `key_ops` and `ext` members.
- `current` and `convert` no longer reject a comma-separated `tz` list longer than 64 characters or an `offset` list before sending it; an invalid value in a list comes back as a `BulkError` item.

In this package:

- Bulk `get_current_time` / `convert_time` calls return `TimePayloadBulkResponse`, an `Array` of `TimePayload` and `BulkError` objects. 1.x returned `nil`.
- `get_timezone` returns `TimezoneResponse` and accepts `format:`. `matching_zones` holds `TimezoneMatch` objects. 1.x returned `nil` for `offset` lookups.

Before (1.x):

```ruby
items = time.get_current_time(tz: 'Europe/London,Asia/Tokyo', debug_return_type: 'Object')
puts items[1][:timezone]
```

After (2.0):

```ruby
time.get_current_time(tz: 'Europe/London,Nope/Zone').each do |item|
  if item.is_a?(TimeLogic::Api::BulkError)
    puts "#{item.item}: #{item.error.code}"
  else
    puts item.iso_local
  end
end

puts time.get_timezone(offset: '+05:30').matching_zones.map(&:timezone).inspect # ["Asia/Colombo", "Asia/Kolkata"]
```

## Known issues

Checked against the live API for this release: every `/v1` operation, including bulk `current` / `convert` calls and `offset` lookups with `timezone`, decodes into the typed models. There are no known issues.

<!-- include: shared/v1-api.md -->

<!-- include: shared/worldtimeapi.md -->

## Support

Questions and problem reports: [issue tracker](https://github.com/TimeLogic-API-LLC/timelogic-api-sdks/issues). Security issues: see [SECURITY.md](https://github.com/TimeLogic-API-LLC/timelogic-api-sdks/blob/main/SECURITY.md). Service status: [status.timelogicapi.com](https://status.timelogicapi.com).

## License

[Unlicense](https://github.com/TimeLogic-API-LLC/timelogic-api-sdks/blob/main/LICENSE).
