# TimeLogic::Api::TimeApi

All URIs are relative to *https://api.timelogicapi.com*

| Method | HTTP request | Description |
| ------ | ------------ | ----------- |
| [**add_time**](TimeApi.md#add_time) | **GET** /v1/time/add | Add modifiers to a timestamp |
| [**convert_time**](TimeApi.md#convert_time) | **GET** /v1/time/convert | Convert a timestamp into a target timezone or offset |
| [**diff_time**](TimeApi.md#diff_time) | **GET** /v1/time/diff | Difference between two instants |
| [**get_calendar**](TimeApi.md#get_calendar) | **GET** /v1/time/calendar | Calendar projection for a target instant |
| [**get_clock**](TimeApi.md#get_clock) | **GET** /v1/time/clock | Render a live HTML clock |
| [**get_current_time**](TimeApi.md#get_current_time) | **GET** /v1/time/current | Get the current time for a target |
| [**get_dst**](TimeApi.md#get_dst) | **GET** /v1/time/dst | Daylight-saving status for a target |
| [**get_elapsed**](TimeApi.md#get_elapsed) | **GET** /v1/time/elapsed | Time elapsed since or remaining until a reference instant |
| [**get_timezone**](TimeApi.md#get_timezone) | **GET** /v1/timezone | Resolve timezone information for a target |


## add_time

> <TimePayload> add_time(opts)

Add modifiers to a timestamp

Adds `seconds`, `minutes`, `hours`, and `days` to an optional base timestamp.  Input timestamp forms: - `unix=1711300000` - `unix_ms=1711300000000` - `iso=2026-04-16T09:00:00Z` - `iso=2026-04-16T09:00:00&source_tz=America/New_York` - `iso=2026-04-16T09:00:00&source_ip=8.8.8.8` - `iso=2026-04-16T09:00:00&source_lat=40.7128&source_lon=-74.0060` - `iso=2026-04-16T09:00:00&source_offset=-05:00` - if no input timestamp is provided, the base timestamp defaults to the request time  Modifiers: - `seconds=30` - `minutes=15` - `hours=2` - `days=7`  Target selector forms: - `tz=America/New_York` - `ip=8.8.8.8` - `lat=40.7128&lon=-74.0060` - `offset=-04:00` - `auto_tz=true` - `utc=true`  Incompatible combinations: - at most one input timestamp form - at most one target selector family - use at most one of `source_tz`, `source_ip`, `source_lat`/`source_lon`, or `source_offset` - local-ISO companion selectors are valid only with `iso=...` that has no explicit offset - bulk is not supported on this route  Examples: - `/v1/time/add?iso=2026-04-16T09:00:00&source_tz=America/New_York&days=1&tz=Europe/London` - `/v1/time/add?minutes=30&utc=true`

### Examples

```ruby
require 'time'
require 'timelogic-api'
# setup authorization
TimeLogic::Api.configure do |config|
  # Configure API key authorization: apiKeyHeader
  config.api_key['X-API-Key'] = 'YOUR API KEY'
  # Uncomment the following line to set a prefix for the API key, e.g. 'Bearer' (defaults to nil)
  # config.api_key_prefix['X-API-Key'] = 'Bearer'

  # Configure Bearer authorization (TimeLogic API key): bearerAuth
  config.access_token = 'YOUR_BEARER_TOKEN'

  # Configure API key authorization: apiKeyQuery
  config.api_key['api_key'] = 'YOUR API KEY'
  # Uncomment the following line to set a prefix for the API key, e.g. 'Bearer' (defaults to nil)
  # config.api_key_prefix['api_key'] = 'Bearer'

  # Configure API key authorization: rapidApiKey
  config.api_key['X-RapidAPI-Key'] = 'YOUR API KEY'
  # Uncomment the following line to set a prefix for the API key, e.g. 'Bearer' (defaults to nil)
  # config.api_key_prefix['X-RapidAPI-Key'] = 'Bearer'

  # Configure API key authorization: rapidApiHost
  config.api_key['X-RapidAPI-Host'] = 'YOUR API KEY'
  # Uncomment the following line to set a prefix for the API key, e.g. 'Bearer' (defaults to nil)
  # config.api_key_prefix['X-RapidAPI-Host'] = 'Bearer'
end

api_instance = TimeLogic::Api::TimeApi.new
opts = {
  unix: 1711300000, # Integer |
  unix_ms: 1711300000000, # Integer |
  iso: '2024-03-24T15:00:00', # String | ISO-8601 timestamp. To supply a local wall-clock time without an explicit offset, pair it with one of `source_tz=Area/City`, `source_ip=...`, `source_lat=...&source_lon=...`, or `source_offset=±HH:MM`.
  source_tz: 'America/New_York', # String | Used only with `iso=...` when the ISO value has no explicit offset.
  source_ip: '8.8.8.8', # String | Used only with `iso=...` when the ISO value has no explicit offset. Resolves that local wall-clock time through the timezone mapped from this IP address.
  source_lat: 40.7128, # Float | Used only with `iso=...` when the ISO value has no explicit offset. Provide together with `source_lon` to resolve that local wall-clock time through the timezone mapped from these coordinates.
  source_lon: -74.006, # Float | Used only with `iso=...` when the ISO value has no explicit offset. Provide together with `source_lat`.
  source_offset: '-05:00', # String | Used only with `iso=...` when the ISO value has no explicit offset. Interprets that local wall-clock time at this fixed UTC offset.
  seconds: 30, # Integer |
  minutes: 15, # Integer |
  hours: 2, # Integer |
  days: 7, # Integer |
  tz: 'America/New_York', # String | IANA timezone name. On bulk-capable routes, a comma-separated list enables bulk mode.
  ip: '8.8.8.8', # String | IP address. On bulk-capable routes, a comma-separated list enables bulk mode.
  lat: 40.7128, # Float | Latitude. Must be provided together with `lon`.
  lon: -74.006, # Float | Longitude. Must be provided together with `lat`.
  offset: '-04:00', # String | Fixed UTC offset in `+HH:MM` or `-HH:MM` format. On bulk-capable routes, a comma-separated list enables bulk mode.
  auto_tz: true, # Boolean | Set to `true` to resolve using the caller IP from Cloudflare headers.
  utc: true, # Boolean | Set to `true` to force UTC on routes that support it.
  format: '%Y-%m-%d %H:%M:%S', # String | Custom date/time format template using supported `strftime`-style directives such as `%Y-%m-%d %H:%M:%S`. Reference: [strftime](https://strftime.net/).
  sign: true # Boolean | Set to exactly `true` to ask the gateway to sign the final JSON response. Every authenticated JSON response, including errors, then includes signing headers. Not supported on `/v1/time/clock`.
}

begin
  # Add modifiers to a timestamp
  result = api_instance.add_time(opts)
  p result
rescue TimeLogic::Api::ApiError => e
  puts "Error when calling TimeApi->add_time: #{e}"
end
```

#### Using the add_time_with_http_info variant

This returns an Array which contains the response data, status code and headers.

> <Array(<TimePayload>, Integer, Hash)> add_time_with_http_info(opts)

```ruby
begin
  # Add modifiers to a timestamp
  data, status_code, headers = api_instance.add_time_with_http_info(opts)
  p status_code # => 2xx
  p headers # => { ... }
  p data # => <TimePayload>
rescue TimeLogic::Api::ApiError => e
  puts "Error when calling TimeApi->add_time_with_http_info: #{e}"
end
```

### Parameters

| Name | Type | Description | Notes |
| ---- | ---- | ----------- | ----- |
| **unix** | **Integer** |  | [optional] |
| **unix_ms** | **Integer** |  | [optional] |
| **iso** | **String** | ISO-8601 timestamp. To supply a local wall-clock time without an explicit offset, pair it with one of &#x60;source_tz&#x3D;Area/City&#x60;, &#x60;source_ip&#x3D;...&#x60;, &#x60;source_lat&#x3D;...&amp;source_lon&#x3D;...&#x60;, or &#x60;source_offset&#x3D;±HH:MM&#x60;. | [optional] |
| **source_tz** | **String** | Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. | [optional] |
| **source_ip** | **String** | Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Resolves that local wall-clock time through the timezone mapped from this IP address. | [optional] |
| **source_lat** | **Float** | Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Provide together with &#x60;source_lon&#x60; to resolve that local wall-clock time through the timezone mapped from these coordinates. | [optional] |
| **source_lon** | **Float** | Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Provide together with &#x60;source_lat&#x60;. | [optional] |
| **source_offset** | **String** | Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Interprets that local wall-clock time at this fixed UTC offset. | [optional] |
| **seconds** | **Integer** |  | [optional] |
| **minutes** | **Integer** |  | [optional] |
| **hours** | **Integer** |  | [optional] |
| **days** | **Integer** |  | [optional] |
| **tz** | **String** | IANA timezone name. On bulk-capable routes, a comma-separated list enables bulk mode. | [optional] |
| **ip** | **String** | IP address. On bulk-capable routes, a comma-separated list enables bulk mode. | [optional] |
| **lat** | **Float** | Latitude. Must be provided together with &#x60;lon&#x60;. | [optional] |
| **lon** | **Float** | Longitude. Must be provided together with &#x60;lat&#x60;. | [optional] |
| **offset** | **String** | Fixed UTC offset in &#x60;+HH:MM&#x60; or &#x60;-HH:MM&#x60; format. On bulk-capable routes, a comma-separated list enables bulk mode. | [optional] |
| **auto_tz** | **Boolean** | Set to &#x60;true&#x60; to resolve using the caller IP from Cloudflare headers. | [optional] |
| **utc** | **Boolean** | Set to &#x60;true&#x60; to force UTC on routes that support it. | [optional] |
| **format** | **String** | Custom date/time format template using supported &#x60;strftime&#x60;-style directives such as &#x60;%Y-%m-%d %H:%M:%S&#x60;. Reference: [strftime](https://strftime.net/). | [optional] |
| **sign** | **Boolean** | Set to exactly &#x60;true&#x60; to ask the gateway to sign the final JSON response. Every authenticated JSON response, including errors, then includes signing headers. Not supported on &#x60;/v1/time/clock&#x60;. | [optional] |

### Return type

[**TimePayload**](TimePayload.md)

### Authorization

[apiKeyHeader](../README.md#apiKeyHeader), [bearerAuth](../README.md#bearerAuth), [apiKeyQuery](../README.md#apiKeyQuery), [rapidApiKey](../README.md#rapidApiKey), [rapidApiHost](../README.md#rapidApiHost)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## convert_time

> <GetCurrentTime200Response> convert_time(opts)

Convert a timestamp into a target timezone or offset

Converts one required input timestamp into a single target or a bulk array.  Input timestamp forms: - `unix=1711300000` - `unix_ms=1711300000000` - `iso=2026-04-16T09:00:00Z` - `iso=2026-04-16T09:00:00&source_tz=America/New_York` - `iso=2026-04-16T09:00:00&source_ip=8.8.8.8` - `iso=2026-04-16T09:00:00&source_lat=40.7128&source_lon=-74.0060` - `iso=2026-04-16T09:00:00&source_offset=-05:00`  Target selector forms: - `tz=America/New_York` - `ip=8.8.8.8` - `lat=40.7128&lon=-74.0060` - `offset=-04:00` - `auto_tz=true` - `utc=true`  Incompatible combinations: - exactly one input timestamp form - exactly one target selector family - use at most one of `source_tz`, `source_ip`, `source_lat`/`source_lon`, or `source_offset` - local-ISO companion selectors are valid only with `iso=...` that has no explicit offset - bulk is allowed only through one comma-separated `tz`, `ip`, or `offset` selector  Examples: - Single target: `/v1/time/convert?iso=2026-04-16T09:00:00&source_tz=America/New_York&tz=Europe/London` - Bulk target set: `/v1/time/convert?unix=1711300000&offset=-04:00,+00:00,+09:00`

### Examples

```ruby
require 'time'
require 'timelogic-api'
# setup authorization
TimeLogic::Api.configure do |config|
  # Configure API key authorization: apiKeyHeader
  config.api_key['X-API-Key'] = 'YOUR API KEY'
  # Uncomment the following line to set a prefix for the API key, e.g. 'Bearer' (defaults to nil)
  # config.api_key_prefix['X-API-Key'] = 'Bearer'

  # Configure Bearer authorization (TimeLogic API key): bearerAuth
  config.access_token = 'YOUR_BEARER_TOKEN'

  # Configure API key authorization: apiKeyQuery
  config.api_key['api_key'] = 'YOUR API KEY'
  # Uncomment the following line to set a prefix for the API key, e.g. 'Bearer' (defaults to nil)
  # config.api_key_prefix['api_key'] = 'Bearer'

  # Configure API key authorization: rapidApiKey
  config.api_key['X-RapidAPI-Key'] = 'YOUR API KEY'
  # Uncomment the following line to set a prefix for the API key, e.g. 'Bearer' (defaults to nil)
  # config.api_key_prefix['X-RapidAPI-Key'] = 'Bearer'

  # Configure API key authorization: rapidApiHost
  config.api_key['X-RapidAPI-Host'] = 'YOUR API KEY'
  # Uncomment the following line to set a prefix for the API key, e.g. 'Bearer' (defaults to nil)
  # config.api_key_prefix['X-RapidAPI-Host'] = 'Bearer'
end

api_instance = TimeLogic::Api::TimeApi.new
opts = {
  unix: 1711300000, # Integer |
  unix_ms: 1711300000000, # Integer |
  iso: '2024-03-24T15:00:00', # String | ISO-8601 timestamp. To supply a local wall-clock time without an explicit offset, pair it with one of `source_tz=Area/City`, `source_ip=...`, `source_lat=...&source_lon=...`, or `source_offset=±HH:MM`.
  source_tz: 'America/New_York', # String | Used only with `iso=...` when the ISO value has no explicit offset.
  source_ip: '8.8.8.8', # String | Used only with `iso=...` when the ISO value has no explicit offset. Resolves that local wall-clock time through the timezone mapped from this IP address.
  source_lat: 40.7128, # Float | Used only with `iso=...` when the ISO value has no explicit offset. Provide together with `source_lon` to resolve that local wall-clock time through the timezone mapped from these coordinates.
  source_lon: -74.006, # Float | Used only with `iso=...` when the ISO value has no explicit offset. Provide together with `source_lat`.
  source_offset: '-05:00', # String | Used only with `iso=...` when the ISO value has no explicit offset. Interprets that local wall-clock time at this fixed UTC offset.
  tz: 'America/New_York', # String | IANA timezone name. On bulk-capable routes, a comma-separated list enables bulk mode.
  ip: '8.8.8.8', # String | IP address. On bulk-capable routes, a comma-separated list enables bulk mode.
  lat: 40.7128, # Float | Latitude. Must be provided together with `lon`.
  lon: -74.006, # Float | Longitude. Must be provided together with `lat`.
  offset: '-04:00', # String | Fixed UTC offset in `+HH:MM` or `-HH:MM` format. On bulk-capable routes, a comma-separated list enables bulk mode.
  auto_tz: true, # Boolean | Set to `true` to resolve using the caller IP from Cloudflare headers.
  utc: true, # Boolean | Set to `true` to force UTC on routes that support it.
  format: '%Y-%m-%d %H:%M:%S', # String | Custom date/time format template using supported `strftime`-style directives such as `%Y-%m-%d %H:%M:%S`. Reference: [strftime](https://strftime.net/).
  sign: true # Boolean | Set to exactly `true` to ask the gateway to sign the final JSON response. Every authenticated JSON response, including errors, then includes signing headers. Not supported on `/v1/time/clock`.
}

begin
  # Convert a timestamp into a target timezone or offset
  result = api_instance.convert_time(opts)
  p result
rescue TimeLogic::Api::ApiError => e
  puts "Error when calling TimeApi->convert_time: #{e}"
end
```

#### Using the convert_time_with_http_info variant

This returns an Array which contains the response data, status code and headers.

> <Array(<GetCurrentTime200Response>, Integer, Hash)> convert_time_with_http_info(opts)

```ruby
begin
  # Convert a timestamp into a target timezone or offset
  data, status_code, headers = api_instance.convert_time_with_http_info(opts)
  p status_code # => 2xx
  p headers # => { ... }
  p data # => <GetCurrentTime200Response>
rescue TimeLogic::Api::ApiError => e
  puts "Error when calling TimeApi->convert_time_with_http_info: #{e}"
end
```

### Parameters

| Name | Type | Description | Notes |
| ---- | ---- | ----------- | ----- |
| **unix** | **Integer** |  | [optional] |
| **unix_ms** | **Integer** |  | [optional] |
| **iso** | **String** | ISO-8601 timestamp. To supply a local wall-clock time without an explicit offset, pair it with one of &#x60;source_tz&#x3D;Area/City&#x60;, &#x60;source_ip&#x3D;...&#x60;, &#x60;source_lat&#x3D;...&amp;source_lon&#x3D;...&#x60;, or &#x60;source_offset&#x3D;±HH:MM&#x60;. | [optional] |
| **source_tz** | **String** | Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. | [optional] |
| **source_ip** | **String** | Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Resolves that local wall-clock time through the timezone mapped from this IP address. | [optional] |
| **source_lat** | **Float** | Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Provide together with &#x60;source_lon&#x60; to resolve that local wall-clock time through the timezone mapped from these coordinates. | [optional] |
| **source_lon** | **Float** | Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Provide together with &#x60;source_lat&#x60;. | [optional] |
| **source_offset** | **String** | Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Interprets that local wall-clock time at this fixed UTC offset. | [optional] |
| **tz** | **String** | IANA timezone name. On bulk-capable routes, a comma-separated list enables bulk mode. | [optional] |
| **ip** | **String** | IP address. On bulk-capable routes, a comma-separated list enables bulk mode. | [optional] |
| **lat** | **Float** | Latitude. Must be provided together with &#x60;lon&#x60;. | [optional] |
| **lon** | **Float** | Longitude. Must be provided together with &#x60;lat&#x60;. | [optional] |
| **offset** | **String** | Fixed UTC offset in &#x60;+HH:MM&#x60; or &#x60;-HH:MM&#x60; format. On bulk-capable routes, a comma-separated list enables bulk mode. | [optional] |
| **auto_tz** | **Boolean** | Set to &#x60;true&#x60; to resolve using the caller IP from Cloudflare headers. | [optional] |
| **utc** | **Boolean** | Set to &#x60;true&#x60; to force UTC on routes that support it. | [optional] |
| **format** | **String** | Custom date/time format template using supported &#x60;strftime&#x60;-style directives such as &#x60;%Y-%m-%d %H:%M:%S&#x60;. Reference: [strftime](https://strftime.net/). | [optional] |
| **sign** | **Boolean** | Set to exactly &#x60;true&#x60; to ask the gateway to sign the final JSON response. Every authenticated JSON response, including errors, then includes signing headers. Not supported on &#x60;/v1/time/clock&#x60;. | [optional] |

### Return type

[**GetCurrentTime200Response**](GetCurrentTime200Response.md)

### Authorization

[apiKeyHeader](../README.md#apiKeyHeader), [bearerAuth](../README.md#bearerAuth), [apiKeyQuery](../README.md#apiKeyQuery), [rapidApiKey](../README.md#rapidApiKey), [rapidApiHost](../README.md#rapidApiHost)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## diff_time

> <DiffResponse> diff_time(from, to, opts)

Difference between two instants

Computes the duration between `from` and `to`.  Required query fields: `from` and `to` only. Do not send every optional companion field. For each side, choose one supported specifier form. A `from_*` or `to_*` companion is allowed only when that side uses `iso=...` with no explicit offset; use at most one companion selector, except that coordinate input requires its paired latitude and longitude.  `from` and `to` are embedded specifier strings.  Accepted specifier forms: - `from=now` - `from=unix=1711300000` - `from=unix_ms=1711300000000` - `from=iso=2026-04-16T09:00:00` - `from=tz=America/New_York` - `from=ip=8.8.8.8` - `from=offset=-05:00` - the same forms are accepted for `to`  Timezone hint pairings: - `from_tz` only with `from=iso=...` that has no explicit offset - `from_ip`, `from_lat`/`from_lon`, and `from_offset` only with `from=iso=...` that has no explicit offset - `to_tz` only with `to=iso=...` that has no explicit offset - `to_ip`, `to_lat`/`to_lon`, and `to_offset` only with `to=iso=...` that has no explicit offset  Selector semantics: - `tz=...`, `ip=...`, and `offset=...` inside `from` or `to` mean the current request-time instant resolved through that selector - those selector forms do not represent an arbitrary local wall-clock time - returned duration magnitudes are absolute; use `direction` to see whether `to` is after, before, or the same instant as `from`  Business-day rules: - `holiday_country` and `holiday_subdivision` require `business_days=true` - `holiday_subdivision` also requires `holiday_country`  Examples: - Selector-current instant: `/v1/time/diff?from=unix=1711300000&to=tz=America/New_York` - Wall-clock pairing: `/v1/time/diff?from=iso=2026-04-16T09:00:00&from_tz=America/New_York&to=iso=2026-04-16T09:00:00&to_tz=Europe/London` - Wall-clock via selector: `/v1/time/diff?from=iso=2026-01-01T12:00:00&from_ip=8.8.8.8&to=iso=2026-01-01T12:00:00&to_offset=-05:00`

### Examples

```ruby
require 'time'
require 'timelogic-api'
# setup authorization
TimeLogic::Api.configure do |config|
  # Configure API key authorization: apiKeyHeader
  config.api_key['X-API-Key'] = 'YOUR API KEY'
  # Uncomment the following line to set a prefix for the API key, e.g. 'Bearer' (defaults to nil)
  # config.api_key_prefix['X-API-Key'] = 'Bearer'

  # Configure Bearer authorization (TimeLogic API key): bearerAuth
  config.access_token = 'YOUR_BEARER_TOKEN'

  # Configure API key authorization: apiKeyQuery
  config.api_key['api_key'] = 'YOUR API KEY'
  # Uncomment the following line to set a prefix for the API key, e.g. 'Bearer' (defaults to nil)
  # config.api_key_prefix['api_key'] = 'Bearer'

  # Configure API key authorization: rapidApiKey
  config.api_key['X-RapidAPI-Key'] = 'YOUR API KEY'
  # Uncomment the following line to set a prefix for the API key, e.g. 'Bearer' (defaults to nil)
  # config.api_key_prefix['X-RapidAPI-Key'] = 'Bearer'

  # Configure API key authorization: rapidApiHost
  config.api_key['X-RapidAPI-Host'] = 'YOUR API KEY'
  # Uncomment the following line to set a prefix for the API key, e.g. 'Bearer' (defaults to nil)
  # config.api_key_prefix['X-RapidAPI-Host'] = 'Bearer'
end

api_instance = TimeLogic::Api::TimeApi.new
from = 'from_example' # String | Time specifier. Supported forms are `now`, `unix=<seconds>`, `unix_ms=<milliseconds>`, `iso=<ISO-8601>`, `offset=±HH:MM`, `tz=<IANA timezone>`, and `ip=<IP address>`. For `tz=...`, `ip=...`, and `offset=...`, the specifier means the current request-time instant resolved through that selector. To express a local wall-clock time, use `from=iso=...` together with one of `from_tz`, `from_ip`, `from_lat`+`from_lon`, or `from_offset`.
to = 'to_example' # String | Time specifier. Supported forms are `now`, `unix=<seconds>`, `unix_ms=<milliseconds>`, `iso=<ISO-8601>`, `offset=±HH:MM`, `tz=<IANA timezone>`, and `ip=<IP address>`. For `tz=...`, `ip=...`, and `offset=...`, the specifier means the current request-time instant resolved through that selector. To express a local wall-clock time, use `to=iso=...` together with one of `to_tz`, `to_ip`, `to_lat`+`to_lon`, or `to_offset`.
opts = {
  from_tz: 'from_tz_example', # String | Used only with `from=iso=...` when the ISO value has no explicit offset.
  from_ip: '8.8.8.8', # String | Used only with `from=iso=...` when the ISO value has no explicit offset. Resolves that local wall-clock time through the timezone mapped from this IP address.
  from_lat: 40.7128, # Float | Used only with `from=iso=...` when the ISO value has no explicit offset. Provide together with `from_lon` to resolve that local wall-clock time through the timezone mapped from these coordinates.
  from_lon: -74.006, # Float | Used only with `from=iso=...` when the ISO value has no explicit offset. Provide together with `from_lat`.
  from_offset: '-05:00', # String | Used only with `from=iso=...` when the ISO value has no explicit offset. Interprets that local wall-clock time at this fixed UTC offset.
  to_tz: 'to_tz_example', # String | Used only with `to=iso=...` when the ISO value has no explicit offset.
  to_ip: '8.8.8.8', # String | Used only with `to=iso=...` when the ISO value has no explicit offset. Resolves that local wall-clock time through the timezone mapped from this IP address.
  to_lat: 40.7128, # Float | Used only with `to=iso=...` when the ISO value has no explicit offset. Provide together with `to_lon` to resolve that local wall-clock time through the timezone mapped from these coordinates.
  to_lon: -74.006, # Float | Used only with `to=iso=...` when the ISO value has no explicit offset. Provide together with `to_lat`.
  to_offset: '-05:00', # String | Used only with `to=iso=...` when the ISO value has no explicit offset. Interprets that local wall-clock time at this fixed UTC offset.
  format: '%daysd %hoursh %minutesm %secondss', # String | Custom duration format template using `%days`, `%hours`, `%minutes`, and `%seconds`.
  business_days: true, # Boolean | Set to `true` to enable weekday/business-day counting.
  holiday_country: 'US', # String | ISO 3166-1 alpha-2 holiday calendar country code. Requires `business_days=true`.
  holiday_subdivision: 'CA', # String | Holiday calendar subdivision code from the upstream `python-holidays` calendar, for example `CA` or `ENG`. Requires `holiday_country` and `business_days=true`.
  sign: true # Boolean | Set to exactly `true` to ask the gateway to sign the final JSON response. Every authenticated JSON response, including errors, then includes signing headers. Not supported on `/v1/time/clock`.
}

begin
  # Difference between two instants
  result = api_instance.diff_time(from, to, opts)
  p result
rescue TimeLogic::Api::ApiError => e
  puts "Error when calling TimeApi->diff_time: #{e}"
end
```

#### Using the diff_time_with_http_info variant

This returns an Array which contains the response data, status code and headers.

> <Array(<DiffResponse>, Integer, Hash)> diff_time_with_http_info(from, to, opts)

```ruby
begin
  # Difference between two instants
  data, status_code, headers = api_instance.diff_time_with_http_info(from, to, opts)
  p status_code # => 2xx
  p headers # => { ... }
  p data # => <DiffResponse>
rescue TimeLogic::Api::ApiError => e
  puts "Error when calling TimeApi->diff_time_with_http_info: #{e}"
end
```

### Parameters

| Name | Type | Description | Notes |
| ---- | ---- | ----------- | ----- |
| **from** | **String** | Time specifier. Supported forms are &#x60;now&#x60;, &#x60;unix&#x3D;&lt;seconds&gt;&#x60;, &#x60;unix_ms&#x3D;&lt;milliseconds&gt;&#x60;, &#x60;iso&#x3D;&lt;ISO-8601&gt;&#x60;, &#x60;offset&#x3D;±HH:MM&#x60;, &#x60;tz&#x3D;&lt;IANA timezone&gt;&#x60;, and &#x60;ip&#x3D;&lt;IP address&gt;&#x60;. For &#x60;tz&#x3D;...&#x60;, &#x60;ip&#x3D;...&#x60;, and &#x60;offset&#x3D;...&#x60;, the specifier means the current request-time instant resolved through that selector. To express a local wall-clock time, use &#x60;from&#x3D;iso&#x3D;...&#x60; together with one of &#x60;from_tz&#x60;, &#x60;from_ip&#x60;, &#x60;from_lat&#x60;+&#x60;from_lon&#x60;, or &#x60;from_offset&#x60;. |  |
| **to** | **String** | Time specifier. Supported forms are &#x60;now&#x60;, &#x60;unix&#x3D;&lt;seconds&gt;&#x60;, &#x60;unix_ms&#x3D;&lt;milliseconds&gt;&#x60;, &#x60;iso&#x3D;&lt;ISO-8601&gt;&#x60;, &#x60;offset&#x3D;±HH:MM&#x60;, &#x60;tz&#x3D;&lt;IANA timezone&gt;&#x60;, and &#x60;ip&#x3D;&lt;IP address&gt;&#x60;. For &#x60;tz&#x3D;...&#x60;, &#x60;ip&#x3D;...&#x60;, and &#x60;offset&#x3D;...&#x60;, the specifier means the current request-time instant resolved through that selector. To express a local wall-clock time, use &#x60;to&#x3D;iso&#x3D;...&#x60; together with one of &#x60;to_tz&#x60;, &#x60;to_ip&#x60;, &#x60;to_lat&#x60;+&#x60;to_lon&#x60;, or &#x60;to_offset&#x60;. |  |
| **from_tz** | **String** | Used only with &#x60;from&#x3D;iso&#x3D;...&#x60; when the ISO value has no explicit offset. | [optional] |
| **from_ip** | **String** | Used only with &#x60;from&#x3D;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Resolves that local wall-clock time through the timezone mapped from this IP address. | [optional] |
| **from_lat** | **Float** | Used only with &#x60;from&#x3D;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Provide together with &#x60;from_lon&#x60; to resolve that local wall-clock time through the timezone mapped from these coordinates. | [optional] |
| **from_lon** | **Float** | Used only with &#x60;from&#x3D;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Provide together with &#x60;from_lat&#x60;. | [optional] |
| **from_offset** | **String** | Used only with &#x60;from&#x3D;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Interprets that local wall-clock time at this fixed UTC offset. | [optional] |
| **to_tz** | **String** | Used only with &#x60;to&#x3D;iso&#x3D;...&#x60; when the ISO value has no explicit offset. | [optional] |
| **to_ip** | **String** | Used only with &#x60;to&#x3D;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Resolves that local wall-clock time through the timezone mapped from this IP address. | [optional] |
| **to_lat** | **Float** | Used only with &#x60;to&#x3D;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Provide together with &#x60;to_lon&#x60; to resolve that local wall-clock time through the timezone mapped from these coordinates. | [optional] |
| **to_lon** | **Float** | Used only with &#x60;to&#x3D;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Provide together with &#x60;to_lat&#x60;. | [optional] |
| **to_offset** | **String** | Used only with &#x60;to&#x3D;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Interprets that local wall-clock time at this fixed UTC offset. | [optional] |
| **format** | **String** | Custom duration format template using &#x60;%days&#x60;, &#x60;%hours&#x60;, &#x60;%minutes&#x60;, and &#x60;%seconds&#x60;. | [optional] |
| **business_days** | **Boolean** | Set to &#x60;true&#x60; to enable weekday/business-day counting. | [optional] |
| **holiday_country** | **String** | ISO 3166-1 alpha-2 holiday calendar country code. Requires &#x60;business_days&#x3D;true&#x60;. | [optional] |
| **holiday_subdivision** | **String** | Holiday calendar subdivision code from the upstream &#x60;python-holidays&#x60; calendar, for example &#x60;CA&#x60; or &#x60;ENG&#x60;. Requires &#x60;holiday_country&#x60; and &#x60;business_days&#x3D;true&#x60;. | [optional] |
| **sign** | **Boolean** | Set to exactly &#x60;true&#x60; to ask the gateway to sign the final JSON response. Every authenticated JSON response, including errors, then includes signing headers. Not supported on &#x60;/v1/time/clock&#x60;. | [optional] |

### Return type

[**DiffResponse**](DiffResponse.md)

### Authorization

[apiKeyHeader](../README.md#apiKeyHeader), [bearerAuth](../README.md#bearerAuth), [apiKeyQuery](../README.md#apiKeyQuery), [rapidApiKey](../README.md#rapidApiKey), [rapidApiHost](../README.md#rapidApiHost)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## get_calendar

> <CalendarResponse> get_calendar(opts)

Calendar projection for a target instant

Returns calendar fields for an optional timestamp and target.  Input timestamp forms: - `unix=1711300000` - `unix_ms=1711300000000` - `iso=2026-04-16T09:00:00Z` - `iso=2026-04-16T09:00:00&source_tz=America/New_York` - `iso=2026-04-16T09:00:00&source_ip=8.8.8.8` - `iso=2026-04-16T09:00:00&source_lat=40.7128&source_lon=-74.0060` - `iso=2026-04-16T09:00:00&source_offset=-05:00` - if no input timestamp is provided, the request time is used  Target selector forms: - `tz=America/New_York` - `ip=8.8.8.8` - `lat=40.7128&lon=-74.0060` - `offset=-04:00` - `auto_tz=true`  Additional flags: - `week=true` adds `week_number`  Incompatible combinations: - at most one input timestamp form - at most one target selector family - use at most one of `source_tz`, `source_ip`, `source_lat`/`source_lon`, or `source_offset` - local-ISO companion selectors are valid only with `iso=...` that has no explicit offset - bulk is not supported on this route  Examples: - `/v1/time/calendar?iso=2026-04-16T09:00:00&source_tz=America/New_York&tz=Europe/London&week=true` - `/v1/time/calendar?unix=1711300000&auto_tz=true`

### Examples

```ruby
require 'time'
require 'timelogic-api'
# setup authorization
TimeLogic::Api.configure do |config|
  # Configure API key authorization: apiKeyHeader
  config.api_key['X-API-Key'] = 'YOUR API KEY'
  # Uncomment the following line to set a prefix for the API key, e.g. 'Bearer' (defaults to nil)
  # config.api_key_prefix['X-API-Key'] = 'Bearer'

  # Configure Bearer authorization (TimeLogic API key): bearerAuth
  config.access_token = 'YOUR_BEARER_TOKEN'

  # Configure API key authorization: apiKeyQuery
  config.api_key['api_key'] = 'YOUR API KEY'
  # Uncomment the following line to set a prefix for the API key, e.g. 'Bearer' (defaults to nil)
  # config.api_key_prefix['api_key'] = 'Bearer'

  # Configure API key authorization: rapidApiKey
  config.api_key['X-RapidAPI-Key'] = 'YOUR API KEY'
  # Uncomment the following line to set a prefix for the API key, e.g. 'Bearer' (defaults to nil)
  # config.api_key_prefix['X-RapidAPI-Key'] = 'Bearer'

  # Configure API key authorization: rapidApiHost
  config.api_key['X-RapidAPI-Host'] = 'YOUR API KEY'
  # Uncomment the following line to set a prefix for the API key, e.g. 'Bearer' (defaults to nil)
  # config.api_key_prefix['X-RapidAPI-Host'] = 'Bearer'
end

api_instance = TimeLogic::Api::TimeApi.new
opts = {
  unix: 1711300000, # Integer |
  unix_ms: 1711300000000, # Integer |
  iso: '2024-03-24T15:00:00', # String | ISO-8601 timestamp. To supply a local wall-clock time without an explicit offset, pair it with one of `source_tz=Area/City`, `source_ip=...`, `source_lat=...&source_lon=...`, or `source_offset=±HH:MM`.
  source_tz: 'America/New_York', # String | Used only with `iso=...` when the ISO value has no explicit offset.
  source_ip: '8.8.8.8', # String | Used only with `iso=...` when the ISO value has no explicit offset. Resolves that local wall-clock time through the timezone mapped from this IP address.
  source_lat: 40.7128, # Float | Used only with `iso=...` when the ISO value has no explicit offset. Provide together with `source_lon` to resolve that local wall-clock time through the timezone mapped from these coordinates.
  source_lon: -74.006, # Float | Used only with `iso=...` when the ISO value has no explicit offset. Provide together with `source_lat`.
  source_offset: '-05:00', # String | Used only with `iso=...` when the ISO value has no explicit offset. Interprets that local wall-clock time at this fixed UTC offset.
  tz: 'America/New_York', # String | IANA timezone name. On bulk-capable routes, a comma-separated list enables bulk mode.
  ip: '8.8.8.8', # String | IP address. On bulk-capable routes, a comma-separated list enables bulk mode.
  lat: 40.7128, # Float | Latitude. Must be provided together with `lon`.
  lon: -74.006, # Float | Longitude. Must be provided together with `lat`.
  offset: '-04:00', # String | Fixed UTC offset in `+HH:MM` or `-HH:MM` format. On bulk-capable routes, a comma-separated list enables bulk mode.
  auto_tz: true, # Boolean | Set to `true` to resolve using the caller IP from Cloudflare headers.
  format: '%Y-%m-%d %H:%M:%S', # String | Custom date/time format template using supported `strftime`-style directives such as `%Y-%m-%d %H:%M:%S`. Reference: [strftime](https://strftime.net/).
  week: true, # Boolean |
  sign: true # Boolean | Set to exactly `true` to ask the gateway to sign the final JSON response. Every authenticated JSON response, including errors, then includes signing headers. Not supported on `/v1/time/clock`.
}

begin
  # Calendar projection for a target instant
  result = api_instance.get_calendar(opts)
  p result
rescue TimeLogic::Api::ApiError => e
  puts "Error when calling TimeApi->get_calendar: #{e}"
end
```

#### Using the get_calendar_with_http_info variant

This returns an Array which contains the response data, status code and headers.

> <Array(<CalendarResponse>, Integer, Hash)> get_calendar_with_http_info(opts)

```ruby
begin
  # Calendar projection for a target instant
  data, status_code, headers = api_instance.get_calendar_with_http_info(opts)
  p status_code # => 2xx
  p headers # => { ... }
  p data # => <CalendarResponse>
rescue TimeLogic::Api::ApiError => e
  puts "Error when calling TimeApi->get_calendar_with_http_info: #{e}"
end
```

### Parameters

| Name | Type | Description | Notes |
| ---- | ---- | ----------- | ----- |
| **unix** | **Integer** |  | [optional] |
| **unix_ms** | **Integer** |  | [optional] |
| **iso** | **String** | ISO-8601 timestamp. To supply a local wall-clock time without an explicit offset, pair it with one of &#x60;source_tz&#x3D;Area/City&#x60;, &#x60;source_ip&#x3D;...&#x60;, &#x60;source_lat&#x3D;...&amp;source_lon&#x3D;...&#x60;, or &#x60;source_offset&#x3D;±HH:MM&#x60;. | [optional] |
| **source_tz** | **String** | Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. | [optional] |
| **source_ip** | **String** | Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Resolves that local wall-clock time through the timezone mapped from this IP address. | [optional] |
| **source_lat** | **Float** | Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Provide together with &#x60;source_lon&#x60; to resolve that local wall-clock time through the timezone mapped from these coordinates. | [optional] |
| **source_lon** | **Float** | Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Provide together with &#x60;source_lat&#x60;. | [optional] |
| **source_offset** | **String** | Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Interprets that local wall-clock time at this fixed UTC offset. | [optional] |
| **tz** | **String** | IANA timezone name. On bulk-capable routes, a comma-separated list enables bulk mode. | [optional] |
| **ip** | **String** | IP address. On bulk-capable routes, a comma-separated list enables bulk mode. | [optional] |
| **lat** | **Float** | Latitude. Must be provided together with &#x60;lon&#x60;. | [optional] |
| **lon** | **Float** | Longitude. Must be provided together with &#x60;lat&#x60;. | [optional] |
| **offset** | **String** | Fixed UTC offset in &#x60;+HH:MM&#x60; or &#x60;-HH:MM&#x60; format. On bulk-capable routes, a comma-separated list enables bulk mode. | [optional] |
| **auto_tz** | **Boolean** | Set to &#x60;true&#x60; to resolve using the caller IP from Cloudflare headers. | [optional] |
| **format** | **String** | Custom date/time format template using supported &#x60;strftime&#x60;-style directives such as &#x60;%Y-%m-%d %H:%M:%S&#x60;. Reference: [strftime](https://strftime.net/). | [optional] |
| **week** | **Boolean** |  | [optional] |
| **sign** | **Boolean** | Set to exactly &#x60;true&#x60; to ask the gateway to sign the final JSON response. Every authenticated JSON response, including errors, then includes signing headers. Not supported on &#x60;/v1/time/clock&#x60;. | [optional] |

### Return type

[**CalendarResponse**](CalendarResponse.md)

### Authorization

[apiKeyHeader](../README.md#apiKeyHeader), [bearerAuth](../README.md#bearerAuth), [apiKeyQuery](../README.md#apiKeyQuery), [rapidApiKey](../README.md#rapidApiKey), [rapidApiHost](../README.md#rapidApiHost)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## get_clock

> String get_clock(style, opts)

Render a live HTML clock

Returns an embeddable HTML clock fragment.  Input timestamp forms: - `unix=1711300000` - `unix_ms=1711300000000` - `iso=2026-04-16T09:00:00Z` - `iso=2026-04-16T09:00:00&source_tz=America/New_York`  Target selector forms: - `tz=America/New_York` - `ip=8.8.8.8` - `lat=40.7128&lon=-74.0060` - `offset=-04:00`  Incompatible combinations: - `style` is required and must be one of the 30 names in the `style` enum - at most one input timestamp form - at most one target selector family - use at most one of `source_tz`, `source_ip`, `source_lat`/`source_lon`, or `source_offset` - local-ISO companion selectors are valid only with `iso=...` that has no explicit offset - this route is single-target only; comma-separated `tz`, `ip`, and `offset` values are rejected - `auto_tz` is not supported on this route - `sign` is not supported on this route  Examples: - Digital: `/v1/time/clock?style=digital-dashboard&iso=2026-04-16T09:00:00&source_tz=America/New_York&tz=Europe/London` - Analog: `/v1/time/clock?style=analog-station&offset=-04:00`

### Examples

```ruby
require 'time'
require 'timelogic-api'
# setup authorization
TimeLogic::Api.configure do |config|
  # Configure API key authorization: apiKeyHeader
  config.api_key['X-API-Key'] = 'YOUR API KEY'
  # Uncomment the following line to set a prefix for the API key, e.g. 'Bearer' (defaults to nil)
  # config.api_key_prefix['X-API-Key'] = 'Bearer'

  # Configure Bearer authorization (TimeLogic API key): bearerAuth
  config.access_token = 'YOUR_BEARER_TOKEN'

  # Configure API key authorization: apiKeyQuery
  config.api_key['api_key'] = 'YOUR API KEY'
  # Uncomment the following line to set a prefix for the API key, e.g. 'Bearer' (defaults to nil)
  # config.api_key_prefix['api_key'] = 'Bearer'

  # Configure API key authorization: rapidApiKey
  config.api_key['X-RapidAPI-Key'] = 'YOUR API KEY'
  # Uncomment the following line to set a prefix for the API key, e.g. 'Bearer' (defaults to nil)
  # config.api_key_prefix['X-RapidAPI-Key'] = 'Bearer'

  # Configure API key authorization: rapidApiHost
  config.api_key['X-RapidAPI-Host'] = 'YOUR API KEY'
  # Uncomment the following line to set a prefix for the API key, e.g. 'Bearer' (defaults to nil)
  # config.api_key_prefix['X-RapidAPI-Host'] = 'Bearer'
end

api_instance = TimeLogic::Api::TimeApi.new
style = 'analog-station' # String | Clock style name. Valid values are enumerated here; there is no separate style discovery endpoint.
opts = {
  unix: 1711300000, # Integer |
  unix_ms: 1711300000000, # Integer |
  iso: '2024-03-24T15:00:00', # String | ISO-8601 timestamp. To supply a local wall-clock time without an explicit offset, pair it with one of `source_tz=Area/City`, `source_ip=...`, `source_lat=...&source_lon=...`, or `source_offset=±HH:MM`.
  source_tz: 'America/New_York', # String | Used only with `iso=...` when the ISO value has no explicit offset.
  source_ip: '8.8.8.8', # String | Used only with `iso=...` when the ISO value has no explicit offset. Resolves that local wall-clock time through the timezone mapped from this IP address.
  source_lat: 40.7128, # Float | Used only with `iso=...` when the ISO value has no explicit offset. Provide together with `source_lon` to resolve that local wall-clock time through the timezone mapped from these coordinates.
  source_lon: -74.006, # Float | Used only with `iso=...` when the ISO value has no explicit offset. Provide together with `source_lat`.
  source_offset: '-05:00', # String | Used only with `iso=...` when the ISO value has no explicit offset. Interprets that local wall-clock time at this fixed UTC offset.
  tz: 'America/New_York', # String | IANA timezone name. On bulk-capable routes, a comma-separated list enables bulk mode.
  ip: '8.8.8.8', # String | IP address. On bulk-capable routes, a comma-separated list enables bulk mode.
  lat: 40.7128, # Float | Latitude. Must be provided together with `lon`.
  lon: -74.006, # Float | Longitude. Must be provided together with `lat`.
  offset: '-04:00', # String | Fixed UTC offset in `+HH:MM` or `-HH:MM` format. On bulk-capable routes, a comma-separated list enables bulk mode.
  format: '%Y-%m-%d %H:%M:%S' # String | Custom date/time format template using supported `strftime`-style directives such as `%Y-%m-%d %H:%M:%S`. Reference: [strftime](https://strftime.net/).
}

begin
  # Render a live HTML clock
  result = api_instance.get_clock(style, opts)
  p result
rescue TimeLogic::Api::ApiError => e
  puts "Error when calling TimeApi->get_clock: #{e}"
end
```

#### Using the get_clock_with_http_info variant

This returns an Array which contains the response data, status code and headers.

> <Array(String, Integer, Hash)> get_clock_with_http_info(style, opts)

```ruby
begin
  # Render a live HTML clock
  data, status_code, headers = api_instance.get_clock_with_http_info(style, opts)
  p status_code # => 2xx
  p headers # => { ... }
  p data # => String
rescue TimeLogic::Api::ApiError => e
  puts "Error when calling TimeApi->get_clock_with_http_info: #{e}"
end
```

### Parameters

| Name | Type | Description | Notes |
| ---- | ---- | ----------- | ----- |
| **style** | **String** | Clock style name. Valid values are enumerated here; there is no separate style discovery endpoint. |  |
| **unix** | **Integer** |  | [optional] |
| **unix_ms** | **Integer** |  | [optional] |
| **iso** | **String** | ISO-8601 timestamp. To supply a local wall-clock time without an explicit offset, pair it with one of &#x60;source_tz&#x3D;Area/City&#x60;, &#x60;source_ip&#x3D;...&#x60;, &#x60;source_lat&#x3D;...&amp;source_lon&#x3D;...&#x60;, or &#x60;source_offset&#x3D;±HH:MM&#x60;. | [optional] |
| **source_tz** | **String** | Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. | [optional] |
| **source_ip** | **String** | Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Resolves that local wall-clock time through the timezone mapped from this IP address. | [optional] |
| **source_lat** | **Float** | Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Provide together with &#x60;source_lon&#x60; to resolve that local wall-clock time through the timezone mapped from these coordinates. | [optional] |
| **source_lon** | **Float** | Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Provide together with &#x60;source_lat&#x60;. | [optional] |
| **source_offset** | **String** | Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Interprets that local wall-clock time at this fixed UTC offset. | [optional] |
| **tz** | **String** | IANA timezone name. On bulk-capable routes, a comma-separated list enables bulk mode. | [optional] |
| **ip** | **String** | IP address. On bulk-capable routes, a comma-separated list enables bulk mode. | [optional] |
| **lat** | **Float** | Latitude. Must be provided together with &#x60;lon&#x60;. | [optional] |
| **lon** | **Float** | Longitude. Must be provided together with &#x60;lat&#x60;. | [optional] |
| **offset** | **String** | Fixed UTC offset in &#x60;+HH:MM&#x60; or &#x60;-HH:MM&#x60; format. On bulk-capable routes, a comma-separated list enables bulk mode. | [optional] |
| **format** | **String** | Custom date/time format template using supported &#x60;strftime&#x60;-style directives such as &#x60;%Y-%m-%d %H:%M:%S&#x60;. Reference: [strftime](https://strftime.net/). | [optional] |

### Return type

**String**

### Authorization

[apiKeyHeader](../README.md#apiKeyHeader), [bearerAuth](../README.md#bearerAuth), [apiKeyQuery](../README.md#apiKeyQuery), [rapidApiKey](../README.md#rapidApiKey), [rapidApiHost](../README.md#rapidApiHost)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/html, application/json


## get_current_time

> <GetCurrentTime200Response> get_current_time(opts)

Get the current time for a target

Returns current time data for a single target, or a bulk array when exactly one of `tz`, `ip`, or `offset` is supplied as a comma-separated list.  Target selector rules: - Use at most one selector family per request: `tz`, `ip`, `lat` + `lon`, `offset`, or `auto_tz=true`. - If no selector is provided, the response defaults to UTC with `timezone=null` and `iso_local=null`. - Bulk mode is available only through one comma-separated `tz`, `ip`, or `offset` selector and cannot be combined with any other selector.  Example: - Single target: `/v1/time/current?tz=America/New_York` - For bulk, provide one comma-separated `tz`, `ip`, or `offset` value, for example `/v1/time/current?tz=America/New_York,Europe/London,Asia/Tokyo`.

### Examples

```ruby
require 'time'
require 'timelogic-api'
# setup authorization
TimeLogic::Api.configure do |config|
  # Configure API key authorization: apiKeyHeader
  config.api_key['X-API-Key'] = 'YOUR API KEY'
  # Uncomment the following line to set a prefix for the API key, e.g. 'Bearer' (defaults to nil)
  # config.api_key_prefix['X-API-Key'] = 'Bearer'

  # Configure Bearer authorization (TimeLogic API key): bearerAuth
  config.access_token = 'YOUR_BEARER_TOKEN'

  # Configure API key authorization: apiKeyQuery
  config.api_key['api_key'] = 'YOUR API KEY'
  # Uncomment the following line to set a prefix for the API key, e.g. 'Bearer' (defaults to nil)
  # config.api_key_prefix['api_key'] = 'Bearer'

  # Configure API key authorization: rapidApiKey
  config.api_key['X-RapidAPI-Key'] = 'YOUR API KEY'
  # Uncomment the following line to set a prefix for the API key, e.g. 'Bearer' (defaults to nil)
  # config.api_key_prefix['X-RapidAPI-Key'] = 'Bearer'

  # Configure API key authorization: rapidApiHost
  config.api_key['X-RapidAPI-Host'] = 'YOUR API KEY'
  # Uncomment the following line to set a prefix for the API key, e.g. 'Bearer' (defaults to nil)
  # config.api_key_prefix['X-RapidAPI-Host'] = 'Bearer'
end

api_instance = TimeLogic::Api::TimeApi.new
opts = {
  tz: 'America/New_York', # String | IANA timezone name. On bulk-capable routes, a comma-separated list enables bulk mode.
  ip: '8.8.8.8', # String | IP address. On bulk-capable routes, a comma-separated list enables bulk mode.
  lat: 40.7128, # Float | Latitude. Must be provided together with `lon`.
  lon: -74.006, # Float | Longitude. Must be provided together with `lat`.
  offset: '-04:00', # String | Fixed UTC offset in `+HH:MM` or `-HH:MM` format. On bulk-capable routes, a comma-separated list enables bulk mode.
  auto_tz: true, # Boolean | Set to `true` to resolve using the caller IP from Cloudflare headers.
  format: '%Y-%m-%d %H:%M:%S', # String | Custom date/time format template using supported `strftime`-style directives such as `%Y-%m-%d %H:%M:%S`. Reference: [strftime](https://strftime.net/).
  sign: true # Boolean | Set to exactly `true` to ask the gateway to sign the final JSON response. Every authenticated JSON response, including errors, then includes signing headers. Not supported on `/v1/time/clock`.
}

begin
  # Get the current time for a target
  result = api_instance.get_current_time(opts)
  p result
rescue TimeLogic::Api::ApiError => e
  puts "Error when calling TimeApi->get_current_time: #{e}"
end
```

#### Using the get_current_time_with_http_info variant

This returns an Array which contains the response data, status code and headers.

> <Array(<GetCurrentTime200Response>, Integer, Hash)> get_current_time_with_http_info(opts)

```ruby
begin
  # Get the current time for a target
  data, status_code, headers = api_instance.get_current_time_with_http_info(opts)
  p status_code # => 2xx
  p headers # => { ... }
  p data # => <GetCurrentTime200Response>
rescue TimeLogic::Api::ApiError => e
  puts "Error when calling TimeApi->get_current_time_with_http_info: #{e}"
end
```

### Parameters

| Name | Type | Description | Notes |
| ---- | ---- | ----------- | ----- |
| **tz** | **String** | IANA timezone name. On bulk-capable routes, a comma-separated list enables bulk mode. | [optional] |
| **ip** | **String** | IP address. On bulk-capable routes, a comma-separated list enables bulk mode. | [optional] |
| **lat** | **Float** | Latitude. Must be provided together with &#x60;lon&#x60;. | [optional] |
| **lon** | **Float** | Longitude. Must be provided together with &#x60;lat&#x60;. | [optional] |
| **offset** | **String** | Fixed UTC offset in &#x60;+HH:MM&#x60; or &#x60;-HH:MM&#x60; format. On bulk-capable routes, a comma-separated list enables bulk mode. | [optional] |
| **auto_tz** | **Boolean** | Set to &#x60;true&#x60; to resolve using the caller IP from Cloudflare headers. | [optional] |
| **format** | **String** | Custom date/time format template using supported &#x60;strftime&#x60;-style directives such as &#x60;%Y-%m-%d %H:%M:%S&#x60;. Reference: [strftime](https://strftime.net/). | [optional] |
| **sign** | **Boolean** | Set to exactly &#x60;true&#x60; to ask the gateway to sign the final JSON response. Every authenticated JSON response, including errors, then includes signing headers. Not supported on &#x60;/v1/time/clock&#x60;. | [optional] |

### Return type

[**GetCurrentTime200Response**](GetCurrentTime200Response.md)

### Authorization

[apiKeyHeader](../README.md#apiKeyHeader), [bearerAuth](../README.md#bearerAuth), [apiKeyQuery](../README.md#apiKeyQuery), [rapidApiKey](../README.md#rapidApiKey), [rapidApiHost](../README.md#rapidApiHost)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## get_dst

> <DstResponse> get_dst(opts)

Daylight-saving status for a target

Returns daylight-saving status for the selected target.  Target selector rules: - Use at most one selector family: `tz`, `ip`, `lat` + `lon`, `offset`, or `auto_tz=true`. - If no selector is provided, the response defaults to UTC. - Bulk is not supported on this route. - `next=true` adds `next_transition` when the resolver provides a transition timestamp.  Example: - `/v1/time/dst?tz=America/New_York&next=true`

### Examples

```ruby
require 'time'
require 'timelogic-api'
# setup authorization
TimeLogic::Api.configure do |config|
  # Configure API key authorization: apiKeyHeader
  config.api_key['X-API-Key'] = 'YOUR API KEY'
  # Uncomment the following line to set a prefix for the API key, e.g. 'Bearer' (defaults to nil)
  # config.api_key_prefix['X-API-Key'] = 'Bearer'

  # Configure Bearer authorization (TimeLogic API key): bearerAuth
  config.access_token = 'YOUR_BEARER_TOKEN'

  # Configure API key authorization: apiKeyQuery
  config.api_key['api_key'] = 'YOUR API KEY'
  # Uncomment the following line to set a prefix for the API key, e.g. 'Bearer' (defaults to nil)
  # config.api_key_prefix['api_key'] = 'Bearer'

  # Configure API key authorization: rapidApiKey
  config.api_key['X-RapidAPI-Key'] = 'YOUR API KEY'
  # Uncomment the following line to set a prefix for the API key, e.g. 'Bearer' (defaults to nil)
  # config.api_key_prefix['X-RapidAPI-Key'] = 'Bearer'

  # Configure API key authorization: rapidApiHost
  config.api_key['X-RapidAPI-Host'] = 'YOUR API KEY'
  # Uncomment the following line to set a prefix for the API key, e.g. 'Bearer' (defaults to nil)
  # config.api_key_prefix['X-RapidAPI-Host'] = 'Bearer'
end

api_instance = TimeLogic::Api::TimeApi.new
opts = {
  tz: 'America/New_York', # String | IANA timezone name. On bulk-capable routes, a comma-separated list enables bulk mode.
  ip: '8.8.8.8', # String | IP address. On bulk-capable routes, a comma-separated list enables bulk mode.
  lat: 40.7128, # Float | Latitude. Must be provided together with `lon`.
  lon: -74.006, # Float | Longitude. Must be provided together with `lat`.
  offset: '-04:00', # String | Fixed UTC offset in `+HH:MM` or `-HH:MM` format. On bulk-capable routes, a comma-separated list enables bulk mode.
  auto_tz: true, # Boolean | Set to `true` to resolve using the caller IP from Cloudflare headers.
  format: '%Y-%m-%d %H:%M:%S', # String | Custom date/time format template using supported `strftime`-style directives such as `%Y-%m-%d %H:%M:%S`. Reference: [strftime](https://strftime.net/).
  _next: true, # Boolean |
  sign: true # Boolean | Set to exactly `true` to ask the gateway to sign the final JSON response. Every authenticated JSON response, including errors, then includes signing headers. Not supported on `/v1/time/clock`.
}

begin
  # Daylight-saving status for a target
  result = api_instance.get_dst(opts)
  p result
rescue TimeLogic::Api::ApiError => e
  puts "Error when calling TimeApi->get_dst: #{e}"
end
```

#### Using the get_dst_with_http_info variant

This returns an Array which contains the response data, status code and headers.

> <Array(<DstResponse>, Integer, Hash)> get_dst_with_http_info(opts)

```ruby
begin
  # Daylight-saving status for a target
  data, status_code, headers = api_instance.get_dst_with_http_info(opts)
  p status_code # => 2xx
  p headers # => { ... }
  p data # => <DstResponse>
rescue TimeLogic::Api::ApiError => e
  puts "Error when calling TimeApi->get_dst_with_http_info: #{e}"
end
```

### Parameters

| Name | Type | Description | Notes |
| ---- | ---- | ----------- | ----- |
| **tz** | **String** | IANA timezone name. On bulk-capable routes, a comma-separated list enables bulk mode. | [optional] |
| **ip** | **String** | IP address. On bulk-capable routes, a comma-separated list enables bulk mode. | [optional] |
| **lat** | **Float** | Latitude. Must be provided together with &#x60;lon&#x60;. | [optional] |
| **lon** | **Float** | Longitude. Must be provided together with &#x60;lat&#x60;. | [optional] |
| **offset** | **String** | Fixed UTC offset in &#x60;+HH:MM&#x60; or &#x60;-HH:MM&#x60; format. On bulk-capable routes, a comma-separated list enables bulk mode. | [optional] |
| **auto_tz** | **Boolean** | Set to &#x60;true&#x60; to resolve using the caller IP from Cloudflare headers. | [optional] |
| **format** | **String** | Custom date/time format template using supported &#x60;strftime&#x60;-style directives such as &#x60;%Y-%m-%d %H:%M:%S&#x60;. Reference: [strftime](https://strftime.net/). | [optional] |
| **_next** | **Boolean** |  | [optional] |
| **sign** | **Boolean** | Set to exactly &#x60;true&#x60; to ask the gateway to sign the final JSON response. Every authenticated JSON response, including errors, then includes signing headers. Not supported on &#x60;/v1/time/clock&#x60;. | [optional] |

### Return type

[**DstResponse**](DstResponse.md)

### Authorization

[apiKeyHeader](../README.md#apiKeyHeader), [bearerAuth](../README.md#bearerAuth), [apiKeyQuery](../README.md#apiKeyQuery), [rapidApiKey](../README.md#rapidApiKey), [rapidApiHost](../README.md#rapidApiHost)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## get_elapsed

> <ElapsedResponse> get_elapsed(opts)

Time elapsed since or remaining until a reference instant

Computes elapsed or remaining duration relative to one required reference timestamp.  Reference timestamp forms: - `unix=1711300000` - `unix_ms=1711300000000` - `iso=2026-04-16T09:00:00Z` - `iso=2026-04-16T09:00:00&source_tz=America/New_York` - `iso=2026-04-16T09:00:00&source_ip=8.8.8.8` - `iso=2026-04-16T09:00:00&source_lat=40.7128&source_lon=-74.0060` - `iso=2026-04-16T09:00:00&source_offset=-05:00`  Compare timestamp forms: - `compare_unix=1711213600` - `compare_unix_ms=1711213600000` - `compare_iso=2026-04-16T09:00:00Z` - `compare_iso=2026-04-16T09:00:00&compare_source_tz=Europe/London` - `compare_iso=2026-04-16T09:00:00&compare_source_ip=8.8.8.8` - `compare_iso=2026-04-16T09:00:00&compare_source_lat=40.7128&compare_source_lon=-74.0060` - `compare_iso=2026-04-16T09:00:00&compare_source_offset=-05:00`  Compare selector forms: - `tz=America/New_York` - `ip=8.8.8.8` - `lat=40.7128&lon=-74.0060` - `offset=-04:00` - `auto_tz=true`  Incompatible combinations: - exactly one reference timestamp form - use either one compare timestamp form or one compare selector family, not both - use at most one of `source_tz`, `source_ip`, `source_lat`/`source_lon`, or `source_offset` - use at most one of `compare_source_tz`, `compare_source_ip`, `compare_source_lat`/`compare_source_lon`, or `compare_source_offset` - local-ISO companion selectors are valid only with `iso=...` that has no explicit offset - compare local-ISO companion selectors are valid only with `compare_iso=...` that has no explicit offset - if no compare input is provided, the comparison defaults to the request time  Business-day rules: - `holiday_country` and `holiday_subdivision` require `business_days=true` - `holiday_subdivision` also requires `holiday_country`  Examples: - Timestamp-to-timestamp: `/v1/time/elapsed?iso=2026-04-16T09:00:00&source_tz=America/New_York&compare_iso=2026-04-16T09:00:00&compare_source_tz=Europe/London` - Timestamp-to-selector: `/v1/time/elapsed?unix=1711300000&tz=America/New_York&business_days=true`

### Examples

```ruby
require 'time'
require 'timelogic-api'
# setup authorization
TimeLogic::Api.configure do |config|
  # Configure API key authorization: apiKeyHeader
  config.api_key['X-API-Key'] = 'YOUR API KEY'
  # Uncomment the following line to set a prefix for the API key, e.g. 'Bearer' (defaults to nil)
  # config.api_key_prefix['X-API-Key'] = 'Bearer'

  # Configure Bearer authorization (TimeLogic API key): bearerAuth
  config.access_token = 'YOUR_BEARER_TOKEN'

  # Configure API key authorization: apiKeyQuery
  config.api_key['api_key'] = 'YOUR API KEY'
  # Uncomment the following line to set a prefix for the API key, e.g. 'Bearer' (defaults to nil)
  # config.api_key_prefix['api_key'] = 'Bearer'

  # Configure API key authorization: rapidApiKey
  config.api_key['X-RapidAPI-Key'] = 'YOUR API KEY'
  # Uncomment the following line to set a prefix for the API key, e.g. 'Bearer' (defaults to nil)
  # config.api_key_prefix['X-RapidAPI-Key'] = 'Bearer'

  # Configure API key authorization: rapidApiHost
  config.api_key['X-RapidAPI-Host'] = 'YOUR API KEY'
  # Uncomment the following line to set a prefix for the API key, e.g. 'Bearer' (defaults to nil)
  # config.api_key_prefix['X-RapidAPI-Host'] = 'Bearer'
end

api_instance = TimeLogic::Api::TimeApi.new
opts = {
  unix: 1711300000, # Integer |
  unix_ms: 1711300000000, # Integer |
  iso: '2024-03-24T15:00:00', # String | ISO-8601 timestamp. To supply a local wall-clock time without an explicit offset, pair it with one of `source_tz=Area/City`, `source_ip=...`, `source_lat=...&source_lon=...`, or `source_offset=±HH:MM`.
  source_tz: 'America/New_York', # String | Used only with `iso=...` when the ISO value has no explicit offset.
  source_ip: '8.8.8.8', # String | Used only with `iso=...` when the ISO value has no explicit offset. Resolves that local wall-clock time through the timezone mapped from this IP address.
  source_lat: 40.7128, # Float | Used only with `iso=...` when the ISO value has no explicit offset. Provide together with `source_lon` to resolve that local wall-clock time through the timezone mapped from these coordinates.
  source_lon: -74.006, # Float | Used only with `iso=...` when the ISO value has no explicit offset. Provide together with `source_lat`.
  source_offset: '-05:00', # String | Used only with `iso=...` when the ISO value has no explicit offset. Interprets that local wall-clock time at this fixed UTC offset.
  compare_unix: 1711213600, # Integer |
  compare_unix_ms: 1711213600000, # Integer |
  compare_iso: '2024-03-23T15:00:00', # String | ISO-8601 comparison timestamp. To supply a local wall-clock time without an explicit offset, pair it with one of `compare_source_tz=Area/City`, `compare_source_ip=...`, `compare_source_lat=...&compare_source_lon=...`, or `compare_source_offset=±HH:MM`.
  compare_source_tz: 'America/New_York', # String | Used only with `compare_iso=...` when the ISO value has no explicit offset.
  compare_source_ip: '8.8.8.8', # String | Used only with `compare_iso=...` when the ISO value has no explicit offset. Resolves that local wall-clock time through the timezone mapped from this IP address.
  compare_source_lat: 40.7128, # Float | Used only with `compare_iso=...` when the ISO value has no explicit offset. Provide together with `compare_source_lon` to resolve that local wall-clock time through the timezone mapped from these coordinates.
  compare_source_lon: -74.006, # Float | Used only with `compare_iso=...` when the ISO value has no explicit offset. Provide together with `compare_source_lat`.
  compare_source_offset: '-05:00', # String | Used only with `compare_iso=...` when the ISO value has no explicit offset. Interprets that local wall-clock time at this fixed UTC offset.
  tz: 'America/New_York', # String | IANA timezone name. On bulk-capable routes, a comma-separated list enables bulk mode.
  ip: '8.8.8.8', # String | IP address. On bulk-capable routes, a comma-separated list enables bulk mode.
  lat: 40.7128, # Float | Latitude. Must be provided together with `lon`.
  lon: -74.006, # Float | Longitude. Must be provided together with `lat`.
  offset: '-04:00', # String | Fixed UTC offset in `+HH:MM` or `-HH:MM` format. On bulk-capable routes, a comma-separated list enables bulk mode.
  auto_tz: true, # Boolean | Set to `true` to resolve using the caller IP from Cloudflare headers.
  format: '%daysd %hoursh %minutesm %secondss', # String | Custom duration format template using `%days`, `%hours`, `%minutes`, and `%seconds`.
  business_days: true, # Boolean | Set to `true` to enable weekday/business-day counting.
  holiday_country: 'US', # String | ISO 3166-1 alpha-2 holiday calendar country code. Requires `business_days=true`.
  holiday_subdivision: 'CA', # String | Holiday calendar subdivision code from the upstream `python-holidays` calendar, for example `CA` or `ENG`. Requires `holiday_country` and `business_days=true`.
  sign: true # Boolean | Set to exactly `true` to ask the gateway to sign the final JSON response. Every authenticated JSON response, including errors, then includes signing headers. Not supported on `/v1/time/clock`.
}

begin
  # Time elapsed since or remaining until a reference instant
  result = api_instance.get_elapsed(opts)
  p result
rescue TimeLogic::Api::ApiError => e
  puts "Error when calling TimeApi->get_elapsed: #{e}"
end
```

#### Using the get_elapsed_with_http_info variant

This returns an Array which contains the response data, status code and headers.

> <Array(<ElapsedResponse>, Integer, Hash)> get_elapsed_with_http_info(opts)

```ruby
begin
  # Time elapsed since or remaining until a reference instant
  data, status_code, headers = api_instance.get_elapsed_with_http_info(opts)
  p status_code # => 2xx
  p headers # => { ... }
  p data # => <ElapsedResponse>
rescue TimeLogic::Api::ApiError => e
  puts "Error when calling TimeApi->get_elapsed_with_http_info: #{e}"
end
```

### Parameters

| Name | Type | Description | Notes |
| ---- | ---- | ----------- | ----- |
| **unix** | **Integer** |  | [optional] |
| **unix_ms** | **Integer** |  | [optional] |
| **iso** | **String** | ISO-8601 timestamp. To supply a local wall-clock time without an explicit offset, pair it with one of &#x60;source_tz&#x3D;Area/City&#x60;, &#x60;source_ip&#x3D;...&#x60;, &#x60;source_lat&#x3D;...&amp;source_lon&#x3D;...&#x60;, or &#x60;source_offset&#x3D;±HH:MM&#x60;. | [optional] |
| **source_tz** | **String** | Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. | [optional] |
| **source_ip** | **String** | Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Resolves that local wall-clock time through the timezone mapped from this IP address. | [optional] |
| **source_lat** | **Float** | Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Provide together with &#x60;source_lon&#x60; to resolve that local wall-clock time through the timezone mapped from these coordinates. | [optional] |
| **source_lon** | **Float** | Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Provide together with &#x60;source_lat&#x60;. | [optional] |
| **source_offset** | **String** | Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Interprets that local wall-clock time at this fixed UTC offset. | [optional] |
| **compare_unix** | **Integer** |  | [optional] |
| **compare_unix_ms** | **Integer** |  | [optional] |
| **compare_iso** | **String** | ISO-8601 comparison timestamp. To supply a local wall-clock time without an explicit offset, pair it with one of &#x60;compare_source_tz&#x3D;Area/City&#x60;, &#x60;compare_source_ip&#x3D;...&#x60;, &#x60;compare_source_lat&#x3D;...&amp;compare_source_lon&#x3D;...&#x60;, or &#x60;compare_source_offset&#x3D;±HH:MM&#x60;. | [optional] |
| **compare_source_tz** | **String** | Used only with &#x60;compare_iso&#x3D;...&#x60; when the ISO value has no explicit offset. | [optional] |
| **compare_source_ip** | **String** | Used only with &#x60;compare_iso&#x3D;...&#x60; when the ISO value has no explicit offset. Resolves that local wall-clock time through the timezone mapped from this IP address. | [optional] |
| **compare_source_lat** | **Float** | Used only with &#x60;compare_iso&#x3D;...&#x60; when the ISO value has no explicit offset. Provide together with &#x60;compare_source_lon&#x60; to resolve that local wall-clock time through the timezone mapped from these coordinates. | [optional] |
| **compare_source_lon** | **Float** | Used only with &#x60;compare_iso&#x3D;...&#x60; when the ISO value has no explicit offset. Provide together with &#x60;compare_source_lat&#x60;. | [optional] |
| **compare_source_offset** | **String** | Used only with &#x60;compare_iso&#x3D;...&#x60; when the ISO value has no explicit offset. Interprets that local wall-clock time at this fixed UTC offset. | [optional] |
| **tz** | **String** | IANA timezone name. On bulk-capable routes, a comma-separated list enables bulk mode. | [optional] |
| **ip** | **String** | IP address. On bulk-capable routes, a comma-separated list enables bulk mode. | [optional] |
| **lat** | **Float** | Latitude. Must be provided together with &#x60;lon&#x60;. | [optional] |
| **lon** | **Float** | Longitude. Must be provided together with &#x60;lat&#x60;. | [optional] |
| **offset** | **String** | Fixed UTC offset in &#x60;+HH:MM&#x60; or &#x60;-HH:MM&#x60; format. On bulk-capable routes, a comma-separated list enables bulk mode. | [optional] |
| **auto_tz** | **Boolean** | Set to &#x60;true&#x60; to resolve using the caller IP from Cloudflare headers. | [optional] |
| **format** | **String** | Custom duration format template using &#x60;%days&#x60;, &#x60;%hours&#x60;, &#x60;%minutes&#x60;, and &#x60;%seconds&#x60;. | [optional] |
| **business_days** | **Boolean** | Set to &#x60;true&#x60; to enable weekday/business-day counting. | [optional] |
| **holiday_country** | **String** | ISO 3166-1 alpha-2 holiday calendar country code. Requires &#x60;business_days&#x3D;true&#x60;. | [optional] |
| **holiday_subdivision** | **String** | Holiday calendar subdivision code from the upstream &#x60;python-holidays&#x60; calendar, for example &#x60;CA&#x60; or &#x60;ENG&#x60;. Requires &#x60;holiday_country&#x60; and &#x60;business_days&#x3D;true&#x60;. | [optional] |
| **sign** | **Boolean** | Set to exactly &#x60;true&#x60; to ask the gateway to sign the final JSON response. Every authenticated JSON response, including errors, then includes signing headers. Not supported on &#x60;/v1/time/clock&#x60;. | [optional] |

### Return type

[**ElapsedResponse**](ElapsedResponse.md)

### Authorization

[apiKeyHeader](../README.md#apiKeyHeader), [bearerAuth](../README.md#bearerAuth), [apiKeyQuery](../README.md#apiKeyQuery), [rapidApiKey](../README.md#rapidApiKey), [rapidApiHost](../README.md#rapidApiHost)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## get_timezone

> <GetTimezone200Response> get_timezone(opts)

Resolve timezone information for a target

Resolves timezone metadata for a single target.  Target selector rules: - Use exactly one selector family: `tz`, `ip`, `lat` + `lon`, `offset`, or `auto_tz=true`. - Bulk is not supported on this route. - `offset` queries return a specialized payload that includes `matching_zones` for the request-time offset match.  Examples: - Single target: `/v1/timezone?tz=America/New_York` - Offset match: `/v1/timezone?offset=-04:00`

### Examples

```ruby
require 'time'
require 'timelogic-api'
# setup authorization
TimeLogic::Api.configure do |config|
  # Configure API key authorization: apiKeyHeader
  config.api_key['X-API-Key'] = 'YOUR API KEY'
  # Uncomment the following line to set a prefix for the API key, e.g. 'Bearer' (defaults to nil)
  # config.api_key_prefix['X-API-Key'] = 'Bearer'

  # Configure Bearer authorization (TimeLogic API key): bearerAuth
  config.access_token = 'YOUR_BEARER_TOKEN'

  # Configure API key authorization: apiKeyQuery
  config.api_key['api_key'] = 'YOUR API KEY'
  # Uncomment the following line to set a prefix for the API key, e.g. 'Bearer' (defaults to nil)
  # config.api_key_prefix['api_key'] = 'Bearer'

  # Configure API key authorization: rapidApiKey
  config.api_key['X-RapidAPI-Key'] = 'YOUR API KEY'
  # Uncomment the following line to set a prefix for the API key, e.g. 'Bearer' (defaults to nil)
  # config.api_key_prefix['X-RapidAPI-Key'] = 'Bearer'

  # Configure API key authorization: rapidApiHost
  config.api_key['X-RapidAPI-Host'] = 'YOUR API KEY'
  # Uncomment the following line to set a prefix for the API key, e.g. 'Bearer' (defaults to nil)
  # config.api_key_prefix['X-RapidAPI-Host'] = 'Bearer'
end

api_instance = TimeLogic::Api::TimeApi.new
opts = {
  tz: 'America/New_York', # String | IANA timezone name. On bulk-capable routes, a comma-separated list enables bulk mode.
  ip: '8.8.8.8', # String | IP address. On bulk-capable routes, a comma-separated list enables bulk mode.
  lat: 40.7128, # Float | Latitude. Must be provided together with `lon`.
  lon: -74.006, # Float | Longitude. Must be provided together with `lat`.
  offset: '-04:00', # String | Fixed UTC offset in `+HH:MM` or `-HH:MM` format. On bulk-capable routes, a comma-separated list enables bulk mode.
  auto_tz: true, # Boolean | Set to `true` to resolve using the caller IP from Cloudflare headers.
  sign: true # Boolean | Set to exactly `true` to ask the gateway to sign the final JSON response. Every authenticated JSON response, including errors, then includes signing headers. Not supported on `/v1/time/clock`.
}

begin
  # Resolve timezone information for a target
  result = api_instance.get_timezone(opts)
  p result
rescue TimeLogic::Api::ApiError => e
  puts "Error when calling TimeApi->get_timezone: #{e}"
end
```

#### Using the get_timezone_with_http_info variant

This returns an Array which contains the response data, status code and headers.

> <Array(<GetTimezone200Response>, Integer, Hash)> get_timezone_with_http_info(opts)

```ruby
begin
  # Resolve timezone information for a target
  data, status_code, headers = api_instance.get_timezone_with_http_info(opts)
  p status_code # => 2xx
  p headers # => { ... }
  p data # => <GetTimezone200Response>
rescue TimeLogic::Api::ApiError => e
  puts "Error when calling TimeApi->get_timezone_with_http_info: #{e}"
end
```

### Parameters

| Name | Type | Description | Notes |
| ---- | ---- | ----------- | ----- |
| **tz** | **String** | IANA timezone name. On bulk-capable routes, a comma-separated list enables bulk mode. | [optional] |
| **ip** | **String** | IP address. On bulk-capable routes, a comma-separated list enables bulk mode. | [optional] |
| **lat** | **Float** | Latitude. Must be provided together with &#x60;lon&#x60;. | [optional] |
| **lon** | **Float** | Longitude. Must be provided together with &#x60;lat&#x60;. | [optional] |
| **offset** | **String** | Fixed UTC offset in &#x60;+HH:MM&#x60; or &#x60;-HH:MM&#x60; format. On bulk-capable routes, a comma-separated list enables bulk mode. | [optional] |
| **auto_tz** | **Boolean** | Set to &#x60;true&#x60; to resolve using the caller IP from Cloudflare headers. | [optional] |
| **sign** | **Boolean** | Set to exactly &#x60;true&#x60; to ask the gateway to sign the final JSON response. Every authenticated JSON response, including errors, then includes signing headers. Not supported on &#x60;/v1/time/clock&#x60;. | [optional] |

### Return type

[**GetTimezone200Response**](GetTimezone200Response.md)

### Authorization

[apiKeyHeader](../README.md#apiKeyHeader), [bearerAuth](../README.md#bearerAuth), [apiKeyQuery](../README.md#apiKeyQuery), [rapidApiKey](../README.md#rapidApiKey), [rapidApiHost](../README.md#rapidApiHost)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

