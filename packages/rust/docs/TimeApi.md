# \TimeApi

All URIs are relative to *https://api.timelogicapi.com*

Method | HTTP request | Description
------------- | ------------- | -------------
[**add_time**](TimeApi.md#add_time) | **GET** /v1/time/add | Add modifiers to a timestamp
[**convert_time**](TimeApi.md#convert_time) | **GET** /v1/time/convert | Convert a timestamp into a target timezone or offset
[**diff_time**](TimeApi.md#diff_time) | **GET** /v1/time/diff | Difference between two instants
[**get_calendar**](TimeApi.md#get_calendar) | **GET** /v1/time/calendar | Calendar projection for a target instant
[**get_clock**](TimeApi.md#get_clock) | **GET** /v1/time/clock | Render a live HTML clock
[**get_current_time**](TimeApi.md#get_current_time) | **GET** /v1/time/current | Get the current time for a target
[**get_dst**](TimeApi.md#get_dst) | **GET** /v1/time/dst | Daylight-saving status for a target
[**get_elapsed**](TimeApi.md#get_elapsed) | **GET** /v1/time/elapsed | Time elapsed since or remaining until a reference instant
[**get_timezone**](TimeApi.md#get_timezone) | **GET** /v1/timezone | Resolve timezone information for a target



## add_time

> models::TimePayload add_time(unix, unix_ms, iso, source_tz, source_ip, source_lat, source_lon, source_offset, seconds, minutes, hours, days, tz, ip, lat, lon, offset, auto_tz, utc, format, sign)
Add modifiers to a timestamp

Adds `seconds`, `minutes`, `hours`, and `days` to an optional base timestamp.  Input timestamp forms: - `unix=1711300000` - `unix_ms=1711300000000` - `iso=2026-04-16T09:00:00Z` - `iso=2026-04-16T09:00:00&source_tz=America/New_York` - `iso=2026-04-16T09:00:00&source_ip=8.8.8.8` - `iso=2026-04-16T09:00:00&source_lat=40.7128&source_lon=-74.0060` - `iso=2026-04-16T09:00:00&source_offset=-05:00` - if no input timestamp is provided, the base timestamp defaults to the request time  Modifiers: - `seconds=30` - `minutes=15` - `hours=2` - `days=7`  Target selector forms: - `tz=America/New_York` - `ip=8.8.8.8` - `lat=40.7128&lon=-74.0060` - `offset=-04:00` - `auto_tz=true` - `utc=true`  Incompatible combinations: - at most one input timestamp form - at most one target selector family - use at most one of `source_tz`, `source_ip`, `source_lat`/`source_lon`, or `source_offset` - local-ISO companion selectors are valid only with `iso=...` that has no explicit offset - bulk is not supported on this route  Examples: - `/v1/time/add?iso=2026-04-16T09:00:00&source_tz=America/New_York&days=1&tz=Europe/London` - `/v1/time/add?minutes=30&utc=true` 

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**unix** | Option<**i64**> |  |  |
**unix_ms** | Option<**i64**> |  |  |
**iso** | Option<**String**> | ISO-8601 timestamp. To supply a local wall-clock time without an explicit offset, pair it with one of `source_tz=Area/City`, `source_ip=...`, `source_lat=...&source_lon=...`, or `source_offset=±HH:MM`. |  |
**source_tz** | Option<**String**> | Used only with `iso=...` when the ISO value has no explicit offset. |  |
**source_ip** | Option<**String**> | Used only with `iso=...` when the ISO value has no explicit offset. Resolves that local wall-clock time through the timezone mapped from this IP address. |  |
**source_lat** | Option<**f64**> | Used only with `iso=...` when the ISO value has no explicit offset. Provide together with `source_lon` to resolve that local wall-clock time through the timezone mapped from these coordinates. |  |
**source_lon** | Option<**f64**> | Used only with `iso=...` when the ISO value has no explicit offset. Provide together with `source_lat`. |  |
**source_offset** | Option<**String**> | Used only with `iso=...` when the ISO value has no explicit offset. Interprets that local wall-clock time at this fixed UTC offset. |  |
**seconds** | Option<**i32**> |  |  |
**minutes** | Option<**i32**> |  |  |
**hours** | Option<**i32**> |  |  |
**days** | Option<**i32**> |  |  |
**tz** | Option<**String**> | IANA timezone name. On bulk-capable routes, a comma-separated list enables bulk mode. |  |
**ip** | Option<**String**> | IP address. On bulk-capable routes, a comma-separated list enables bulk mode. |  |
**lat** | Option<**f64**> | Latitude. Must be provided together with `lon`. |  |
**lon** | Option<**f64**> | Longitude. Must be provided together with `lat`. |  |
**offset** | Option<**String**> | Fixed UTC offset in `+HH:MM` or `-HH:MM` format. On bulk-capable routes, a comma-separated list enables bulk mode. |  |
**auto_tz** | Option<**bool**> | Set to `true` to resolve using the caller IP from Cloudflare headers. |  |
**utc** | Option<**bool**> | Set to `true` to force UTC on routes that support it. |  |
**format** | Option<**String**> | Custom date/time format template using supported `strftime`-style directives such as `%Y-%m-%d %H:%M:%S`. Reference: [strftime](https://strftime.net/). |  |
**sign** | Option<**bool**> | Set to exactly `true` to ask the gateway to sign the final JSON response. Every authenticated JSON response, including errors, then includes signing headers. Not supported on `/v1/time/clock`. |  |

### Return type

[**models::TimePayload**](TimePayload.md)

### Authorization

[directApiKeyHeader](../README.md#directApiKeyHeader), [directBearerAuth](../README.md#directBearerAuth), [directApiKeyQuery](../README.md#directApiKeyQuery), [rapidApiKey](../README.md#rapidApiKey), [rapidApiHost](../README.md#rapidApiHost)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## convert_time

> models::GetCurrentTime200Response convert_time(unix, unix_ms, iso, source_tz, source_ip, source_lat, source_lon, source_offset, tz, ip, lat, lon, offset, auto_tz, utc, format, sign)
Convert a timestamp into a target timezone or offset

Converts one required input timestamp into a single target or a bulk array.  Input timestamp forms: - `unix=1711300000` - `unix_ms=1711300000000` - `iso=2026-04-16T09:00:00Z` - `iso=2026-04-16T09:00:00&source_tz=America/New_York` - `iso=2026-04-16T09:00:00&source_ip=8.8.8.8` - `iso=2026-04-16T09:00:00&source_lat=40.7128&source_lon=-74.0060` - `iso=2026-04-16T09:00:00&source_offset=-05:00`  Target selector forms: - `tz=America/New_York` - `ip=8.8.8.8` - `lat=40.7128&lon=-74.0060` - `offset=-04:00` - `auto_tz=true` - `utc=true`  Incompatible combinations: - exactly one input timestamp form - exactly one target selector family - use at most one of `source_tz`, `source_ip`, `source_lat`/`source_lon`, or `source_offset` - local-ISO companion selectors are valid only with `iso=...` that has no explicit offset - bulk is allowed only through one comma-separated `tz`, `ip`, or `offset` selector  Examples: - Single target: `/v1/time/convert?iso=2026-04-16T09:00:00&source_tz=America/New_York&tz=Europe/London` - Bulk target set: `/v1/time/convert?unix=1711300000&offset=-04:00,+00:00,+09:00` 

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**unix** | Option<**i64**> |  |  |
**unix_ms** | Option<**i64**> |  |  |
**iso** | Option<**String**> | ISO-8601 timestamp. To supply a local wall-clock time without an explicit offset, pair it with one of `source_tz=Area/City`, `source_ip=...`, `source_lat=...&source_lon=...`, or `source_offset=±HH:MM`. |  |
**source_tz** | Option<**String**> | Used only with `iso=...` when the ISO value has no explicit offset. |  |
**source_ip** | Option<**String**> | Used only with `iso=...` when the ISO value has no explicit offset. Resolves that local wall-clock time through the timezone mapped from this IP address. |  |
**source_lat** | Option<**f64**> | Used only with `iso=...` when the ISO value has no explicit offset. Provide together with `source_lon` to resolve that local wall-clock time through the timezone mapped from these coordinates. |  |
**source_lon** | Option<**f64**> | Used only with `iso=...` when the ISO value has no explicit offset. Provide together with `source_lat`. |  |
**source_offset** | Option<**String**> | Used only with `iso=...` when the ISO value has no explicit offset. Interprets that local wall-clock time at this fixed UTC offset. |  |
**tz** | Option<**String**> | IANA timezone name. On bulk-capable routes, a comma-separated list enables bulk mode. |  |
**ip** | Option<**String**> | IP address. On bulk-capable routes, a comma-separated list enables bulk mode. |  |
**lat** | Option<**f64**> | Latitude. Must be provided together with `lon`. |  |
**lon** | Option<**f64**> | Longitude. Must be provided together with `lat`. |  |
**offset** | Option<**String**> | Fixed UTC offset in `+HH:MM` or `-HH:MM` format. On bulk-capable routes, a comma-separated list enables bulk mode. |  |
**auto_tz** | Option<**bool**> | Set to `true` to resolve using the caller IP from Cloudflare headers. |  |
**utc** | Option<**bool**> | Set to `true` to force UTC on routes that support it. |  |
**format** | Option<**String**> | Custom date/time format template using supported `strftime`-style directives such as `%Y-%m-%d %H:%M:%S`. Reference: [strftime](https://strftime.net/). |  |
**sign** | Option<**bool**> | Set to exactly `true` to ask the gateway to sign the final JSON response. Every authenticated JSON response, including errors, then includes signing headers. Not supported on `/v1/time/clock`. |  |

### Return type

[**models::GetCurrentTime200Response**](getCurrentTime_200_response.md)

### Authorization

[directApiKeyHeader](../README.md#directApiKeyHeader), [directBearerAuth](../README.md#directBearerAuth), [directApiKeyQuery](../README.md#directApiKeyQuery), [rapidApiKey](../README.md#rapidApiKey), [rapidApiHost](../README.md#rapidApiHost)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## diff_time

> models::DiffResponse diff_time(from, to, from_tz, from_ip, from_lat, from_lon, from_offset, to_tz, to_ip, to_lat, to_lon, to_offset, format, business_days, holiday_country, holiday_subdivision, sign)
Difference between two instants

Computes the duration between `from` and `to`.  Required query fields: `from` and `to` only. Do not send every optional companion field. For each side, choose one supported specifier form. A `from_*` or `to_*` companion is allowed only when that side uses `iso=...` with no explicit offset; use at most one companion selector, except that coordinate input requires its paired latitude and longitude.  `from` and `to` are embedded specifier strings.  Accepted specifier forms: - `from=now` - `from=unix=1711300000` - `from=unix_ms=1711300000000` - `from=iso=2026-04-16T09:00:00` - `from=tz=America/New_York` - `from=ip=8.8.8.8` - `from=offset=-05:00` - the same forms are accepted for `to`  Timezone hint pairings: - `from_tz` only with `from=iso=...` that has no explicit offset - `from_ip`, `from_lat`/`from_lon`, and `from_offset` only with `from=iso=...` that has no explicit offset - `to_tz` only with `to=iso=...` that has no explicit offset - `to_ip`, `to_lat`/`to_lon`, and `to_offset` only with `to=iso=...` that has no explicit offset  Selector semantics: - `tz=...`, `ip=...`, and `offset=...` inside `from` or `to` mean the current request-time instant resolved through that selector - those selector forms do not represent an arbitrary local wall-clock time - returned duration magnitudes are absolute; use `direction` to see whether `to` is after, before, or the same instant as `from`  Business-day rules: - `holiday_country` and `holiday_subdivision` require `business_days=true` - `holiday_subdivision` also requires `holiday_country`  Examples: - Selector-current instant: `/v1/time/diff?from=unix=1711300000&to=tz=America/New_York` - Wall-clock pairing: `/v1/time/diff?from=iso=2026-04-16T09:00:00&from_tz=America/New_York&to=iso=2026-04-16T09:00:00&to_tz=Europe/London` - Wall-clock via selector: `/v1/time/diff?from=iso=2026-01-01T12:00:00&from_ip=8.8.8.8&to=iso=2026-01-01T12:00:00&to_offset=-05:00` 

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**from** | **String** | Time specifier. Supported forms are `now`, `unix=<seconds>`, `unix_ms=<milliseconds>`, `iso=<ISO-8601>`, `offset=±HH:MM`, `tz=<IANA timezone>`, and `ip=<IP address>`. For `tz=...`, `ip=...`, and `offset=...`, the specifier means the current request-time instant resolved through that selector. To express a local wall-clock time, use `from=iso=...` together with one of `from_tz`, `from_ip`, `from_lat`+`from_lon`, or `from_offset`. | [required] |
**to** | **String** | Time specifier. Supported forms are `now`, `unix=<seconds>`, `unix_ms=<milliseconds>`, `iso=<ISO-8601>`, `offset=±HH:MM`, `tz=<IANA timezone>`, and `ip=<IP address>`. For `tz=...`, `ip=...`, and `offset=...`, the specifier means the current request-time instant resolved through that selector. To express a local wall-clock time, use `to=iso=...` together with one of `to_tz`, `to_ip`, `to_lat`+`to_lon`, or `to_offset`. | [required] |
**from_tz** | Option<**String**> | Used only with `from=iso=...` when the ISO value has no explicit offset. |  |
**from_ip** | Option<**String**> | Used only with `from=iso=...` when the ISO value has no explicit offset. Resolves that local wall-clock time through the timezone mapped from this IP address. |  |
**from_lat** | Option<**f64**> | Used only with `from=iso=...` when the ISO value has no explicit offset. Provide together with `from_lon` to resolve that local wall-clock time through the timezone mapped from these coordinates. |  |
**from_lon** | Option<**f64**> | Used only with `from=iso=...` when the ISO value has no explicit offset. Provide together with `from_lat`. |  |
**from_offset** | Option<**String**> | Used only with `from=iso=...` when the ISO value has no explicit offset. Interprets that local wall-clock time at this fixed UTC offset. |  |
**to_tz** | Option<**String**> | Used only with `to=iso=...` when the ISO value has no explicit offset. |  |
**to_ip** | Option<**String**> | Used only with `to=iso=...` when the ISO value has no explicit offset. Resolves that local wall-clock time through the timezone mapped from this IP address. |  |
**to_lat** | Option<**f64**> | Used only with `to=iso=...` when the ISO value has no explicit offset. Provide together with `to_lon` to resolve that local wall-clock time through the timezone mapped from these coordinates. |  |
**to_lon** | Option<**f64**> | Used only with `to=iso=...` when the ISO value has no explicit offset. Provide together with `to_lat`. |  |
**to_offset** | Option<**String**> | Used only with `to=iso=...` when the ISO value has no explicit offset. Interprets that local wall-clock time at this fixed UTC offset. |  |
**format** | Option<**String**> | Custom duration format template using `%days`, `%hours`, `%minutes`, and `%seconds`. |  |
**business_days** | Option<**bool**> | Set to `true` to enable weekday/business-day counting. |  |
**holiday_country** | Option<**String**> | ISO 3166-1 alpha-2 holiday calendar country code. Requires `business_days=true`. |  |
**holiday_subdivision** | Option<**String**> | Holiday calendar subdivision code from the upstream `python-holidays` calendar, for example `CA` or `ENG`. Requires `holiday_country` and `business_days=true`. |  |
**sign** | Option<**bool**> | Set to exactly `true` to ask the gateway to sign the final JSON response. Every authenticated JSON response, including errors, then includes signing headers. Not supported on `/v1/time/clock`. |  |

### Return type

[**models::DiffResponse**](DiffResponse.md)

### Authorization

[directApiKeyHeader](../README.md#directApiKeyHeader), [directBearerAuth](../README.md#directBearerAuth), [directApiKeyQuery](../README.md#directApiKeyQuery), [rapidApiKey](../README.md#rapidApiKey), [rapidApiHost](../README.md#rapidApiHost)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## get_calendar

> models::CalendarResponse get_calendar(unix, unix_ms, iso, source_tz, source_ip, source_lat, source_lon, source_offset, tz, ip, lat, lon, offset, auto_tz, format, week, sign)
Calendar projection for a target instant

Returns calendar fields for an optional timestamp and target.  Input timestamp forms: - `unix=1711300000` - `unix_ms=1711300000000` - `iso=2026-04-16T09:00:00Z` - `iso=2026-04-16T09:00:00&source_tz=America/New_York` - `iso=2026-04-16T09:00:00&source_ip=8.8.8.8` - `iso=2026-04-16T09:00:00&source_lat=40.7128&source_lon=-74.0060` - `iso=2026-04-16T09:00:00&source_offset=-05:00` - if no input timestamp is provided, the request time is used  Target selector forms: - `tz=America/New_York` - `ip=8.8.8.8` - `lat=40.7128&lon=-74.0060` - `offset=-04:00` - `auto_tz=true`  Additional flags: - `week=true` adds `week_number`  Incompatible combinations: - at most one input timestamp form - at most one target selector family - use at most one of `source_tz`, `source_ip`, `source_lat`/`source_lon`, or `source_offset` - local-ISO companion selectors are valid only with `iso=...` that has no explicit offset - bulk is not supported on this route  Examples: - `/v1/time/calendar?iso=2026-04-16T09:00:00&source_tz=America/New_York&tz=Europe/London&week=true` - `/v1/time/calendar?unix=1711300000&auto_tz=true` 

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**unix** | Option<**i64**> |  |  |
**unix_ms** | Option<**i64**> |  |  |
**iso** | Option<**String**> | ISO-8601 timestamp. To supply a local wall-clock time without an explicit offset, pair it with one of `source_tz=Area/City`, `source_ip=...`, `source_lat=...&source_lon=...`, or `source_offset=±HH:MM`. |  |
**source_tz** | Option<**String**> | Used only with `iso=...` when the ISO value has no explicit offset. |  |
**source_ip** | Option<**String**> | Used only with `iso=...` when the ISO value has no explicit offset. Resolves that local wall-clock time through the timezone mapped from this IP address. |  |
**source_lat** | Option<**f64**> | Used only with `iso=...` when the ISO value has no explicit offset. Provide together with `source_lon` to resolve that local wall-clock time through the timezone mapped from these coordinates. |  |
**source_lon** | Option<**f64**> | Used only with `iso=...` when the ISO value has no explicit offset. Provide together with `source_lat`. |  |
**source_offset** | Option<**String**> | Used only with `iso=...` when the ISO value has no explicit offset. Interprets that local wall-clock time at this fixed UTC offset. |  |
**tz** | Option<**String**> | IANA timezone name. On bulk-capable routes, a comma-separated list enables bulk mode. |  |
**ip** | Option<**String**> | IP address. On bulk-capable routes, a comma-separated list enables bulk mode. |  |
**lat** | Option<**f64**> | Latitude. Must be provided together with `lon`. |  |
**lon** | Option<**f64**> | Longitude. Must be provided together with `lat`. |  |
**offset** | Option<**String**> | Fixed UTC offset in `+HH:MM` or `-HH:MM` format. On bulk-capable routes, a comma-separated list enables bulk mode. |  |
**auto_tz** | Option<**bool**> | Set to `true` to resolve using the caller IP from Cloudflare headers. |  |
**format** | Option<**String**> | Custom date/time format template using supported `strftime`-style directives such as `%Y-%m-%d %H:%M:%S`. Reference: [strftime](https://strftime.net/). |  |
**week** | Option<**bool**> |  |  |
**sign** | Option<**bool**> | Set to exactly `true` to ask the gateway to sign the final JSON response. Every authenticated JSON response, including errors, then includes signing headers. Not supported on `/v1/time/clock`. |  |

### Return type

[**models::CalendarResponse**](CalendarResponse.md)

### Authorization

[directApiKeyHeader](../README.md#directApiKeyHeader), [directBearerAuth](../README.md#directBearerAuth), [directApiKeyQuery](../README.md#directApiKeyQuery), [rapidApiKey](../README.md#rapidApiKey), [rapidApiHost](../README.md#rapidApiHost)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## get_clock

> String get_clock(style, unix, unix_ms, iso, source_tz, source_ip, source_lat, source_lon, source_offset, tz, ip, lat, lon, offset, format)
Render a live HTML clock

Returns an embeddable HTML clock fragment.  Input timestamp forms: - `unix=1711300000` - `unix_ms=1711300000000` - `iso=2026-04-16T09:00:00Z` - `iso=2026-04-16T09:00:00&source_tz=America/New_York`  Target selector forms: - `tz=America/New_York` - `ip=8.8.8.8` - `lat=40.7128&lon=-74.0060` - `offset=-04:00`  Incompatible combinations: - `style` is required and must be one of the 30 names in the `style` enum - at most one input timestamp form - at most one target selector family - use at most one of `source_tz`, `source_ip`, `source_lat`/`source_lon`, or `source_offset` - local-ISO companion selectors are valid only with `iso=...` that has no explicit offset - this route is single-target only; comma-separated `tz`, `ip`, and `offset` values are rejected - `auto_tz` is not supported on this route - `sign` is not supported on this route  Examples: - Digital: `/v1/time/clock?style=digital-dashboard&iso=2026-04-16T09:00:00&source_tz=America/New_York&tz=Europe/London` - Analog: `/v1/time/clock?style=analog-station&offset=-04:00` 

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**style** | **String** | Clock style name. Valid values are enumerated here; there is no separate style discovery endpoint. | [required] |
**unix** | Option<**i64**> |  |  |
**unix_ms** | Option<**i64**> |  |  |
**iso** | Option<**String**> | ISO-8601 timestamp. To supply a local wall-clock time without an explicit offset, pair it with one of `source_tz=Area/City`, `source_ip=...`, `source_lat=...&source_lon=...`, or `source_offset=±HH:MM`. |  |
**source_tz** | Option<**String**> | Used only with `iso=...` when the ISO value has no explicit offset. |  |
**source_ip** | Option<**String**> | Used only with `iso=...` when the ISO value has no explicit offset. Resolves that local wall-clock time through the timezone mapped from this IP address. |  |
**source_lat** | Option<**f64**> | Used only with `iso=...` when the ISO value has no explicit offset. Provide together with `source_lon` to resolve that local wall-clock time through the timezone mapped from these coordinates. |  |
**source_lon** | Option<**f64**> | Used only with `iso=...` when the ISO value has no explicit offset. Provide together with `source_lat`. |  |
**source_offset** | Option<**String**> | Used only with `iso=...` when the ISO value has no explicit offset. Interprets that local wall-clock time at this fixed UTC offset. |  |
**tz** | Option<**String**> | IANA timezone name. On bulk-capable routes, a comma-separated list enables bulk mode. |  |
**ip** | Option<**String**> | IP address. On bulk-capable routes, a comma-separated list enables bulk mode. |  |
**lat** | Option<**f64**> | Latitude. Must be provided together with `lon`. |  |
**lon** | Option<**f64**> | Longitude. Must be provided together with `lat`. |  |
**offset** | Option<**String**> | Fixed UTC offset in `+HH:MM` or `-HH:MM` format. On bulk-capable routes, a comma-separated list enables bulk mode. |  |
**format** | Option<**String**> | Custom date/time format template using supported `strftime`-style directives such as `%Y-%m-%d %H:%M:%S`. Reference: [strftime](https://strftime.net/). |  |

### Return type

**String**

### Authorization

[directApiKeyHeader](../README.md#directApiKeyHeader), [directBearerAuth](../README.md#directBearerAuth), [directApiKeyQuery](../README.md#directApiKeyQuery), [rapidApiKey](../README.md#rapidApiKey), [rapidApiHost](../README.md#rapidApiHost)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/html, application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## get_current_time

> models::GetCurrentTime200Response get_current_time(tz, ip, lat, lon, offset, auto_tz, format, sign)
Get the current time for a target

Returns current time data for a single target, or a bulk array when exactly one of `tz`, `ip`, or `offset` is supplied as a comma-separated list.  Target selector rules: - Use at most one selector family per request: `tz`, `ip`, `lat` + `lon`, `offset`, or `auto_tz=true`. - If no selector is provided, the response defaults to UTC with `timezone=null` and `iso_local=null`. - Bulk mode is available only through one comma-separated `tz`, `ip`, or `offset` selector and cannot be combined with any other selector.  Example: - Single target: `/v1/time/current?tz=America/New_York` - For bulk, provide one comma-separated `tz`, `ip`, or `offset` value, for example `/v1/time/current?tz=America/New_York,Europe/London,Asia/Tokyo`.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**tz** | Option<**String**> | IANA timezone name. On bulk-capable routes, a comma-separated list enables bulk mode. |  |
**ip** | Option<**String**> | IP address. On bulk-capable routes, a comma-separated list enables bulk mode. |  |
**lat** | Option<**f64**> | Latitude. Must be provided together with `lon`. |  |
**lon** | Option<**f64**> | Longitude. Must be provided together with `lat`. |  |
**offset** | Option<**String**> | Fixed UTC offset in `+HH:MM` or `-HH:MM` format. On bulk-capable routes, a comma-separated list enables bulk mode. |  |
**auto_tz** | Option<**bool**> | Set to `true` to resolve using the caller IP from Cloudflare headers. |  |
**format** | Option<**String**> | Custom date/time format template using supported `strftime`-style directives such as `%Y-%m-%d %H:%M:%S`. Reference: [strftime](https://strftime.net/). |  |
**sign** | Option<**bool**> | Set to exactly `true` to ask the gateway to sign the final JSON response. Every authenticated JSON response, including errors, then includes signing headers. Not supported on `/v1/time/clock`. |  |

### Return type

[**models::GetCurrentTime200Response**](getCurrentTime_200_response.md)

### Authorization

[directApiKeyHeader](../README.md#directApiKeyHeader), [directBearerAuth](../README.md#directBearerAuth), [directApiKeyQuery](../README.md#directApiKeyQuery), [rapidApiKey](../README.md#rapidApiKey), [rapidApiHost](../README.md#rapidApiHost)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## get_dst

> models::DstResponse get_dst(tz, ip, lat, lon, offset, auto_tz, format, next, sign)
Daylight-saving status for a target

Returns daylight-saving status for the selected target.  Target selector rules: - Use at most one selector family: `tz`, `ip`, `lat` + `lon`, `offset`, or `auto_tz=true`. - If no selector is provided, the response defaults to UTC. - Bulk is not supported on this route. - `next=true` adds `next_transition` when the resolver provides a transition timestamp.  Example: - `/v1/time/dst?tz=America/New_York&next=true`

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**tz** | Option<**String**> | IANA timezone name. On bulk-capable routes, a comma-separated list enables bulk mode. |  |
**ip** | Option<**String**> | IP address. On bulk-capable routes, a comma-separated list enables bulk mode. |  |
**lat** | Option<**f64**> | Latitude. Must be provided together with `lon`. |  |
**lon** | Option<**f64**> | Longitude. Must be provided together with `lat`. |  |
**offset** | Option<**String**> | Fixed UTC offset in `+HH:MM` or `-HH:MM` format. On bulk-capable routes, a comma-separated list enables bulk mode. |  |
**auto_tz** | Option<**bool**> | Set to `true` to resolve using the caller IP from Cloudflare headers. |  |
**format** | Option<**String**> | Custom date/time format template using supported `strftime`-style directives such as `%Y-%m-%d %H:%M:%S`. Reference: [strftime](https://strftime.net/). |  |
**next** | Option<**bool**> |  |  |
**sign** | Option<**bool**> | Set to exactly `true` to ask the gateway to sign the final JSON response. Every authenticated JSON response, including errors, then includes signing headers. Not supported on `/v1/time/clock`. |  |

### Return type

[**models::DstResponse**](DstResponse.md)

### Authorization

[directApiKeyHeader](../README.md#directApiKeyHeader), [directBearerAuth](../README.md#directBearerAuth), [directApiKeyQuery](../README.md#directApiKeyQuery), [rapidApiKey](../README.md#rapidApiKey), [rapidApiHost](../README.md#rapidApiHost)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## get_elapsed

> models::ElapsedResponse get_elapsed(unix, unix_ms, iso, source_tz, source_ip, source_lat, source_lon, source_offset, compare_unix, compare_unix_ms, compare_iso, compare_source_tz, compare_source_ip, compare_source_lat, compare_source_lon, compare_source_offset, tz, ip, lat, lon, offset, auto_tz, format, business_days, holiday_country, holiday_subdivision, sign)
Time elapsed since or remaining until a reference instant

Computes elapsed or remaining duration relative to one required reference timestamp.  Reference timestamp forms: - `unix=1711300000` - `unix_ms=1711300000000` - `iso=2026-04-16T09:00:00Z` - `iso=2026-04-16T09:00:00&source_tz=America/New_York` - `iso=2026-04-16T09:00:00&source_ip=8.8.8.8` - `iso=2026-04-16T09:00:00&source_lat=40.7128&source_lon=-74.0060` - `iso=2026-04-16T09:00:00&source_offset=-05:00`  Compare timestamp forms: - `compare_unix=1711213600` - `compare_unix_ms=1711213600000` - `compare_iso=2026-04-16T09:00:00Z` - `compare_iso=2026-04-16T09:00:00&compare_source_tz=Europe/London` - `compare_iso=2026-04-16T09:00:00&compare_source_ip=8.8.8.8` - `compare_iso=2026-04-16T09:00:00&compare_source_lat=40.7128&compare_source_lon=-74.0060` - `compare_iso=2026-04-16T09:00:00&compare_source_offset=-05:00`  Compare selector forms: - `tz=America/New_York` - `ip=8.8.8.8` - `lat=40.7128&lon=-74.0060` - `offset=-04:00` - `auto_tz=true`  Incompatible combinations: - exactly one reference timestamp form - use either one compare timestamp form or one compare selector family, not both - use at most one of `source_tz`, `source_ip`, `source_lat`/`source_lon`, or `source_offset` - use at most one of `compare_source_tz`, `compare_source_ip`, `compare_source_lat`/`compare_source_lon`, or `compare_source_offset` - local-ISO companion selectors are valid only with `iso=...` that has no explicit offset - compare local-ISO companion selectors are valid only with `compare_iso=...` that has no explicit offset - if no compare input is provided, the comparison defaults to the request time  Business-day rules: - `holiday_country` and `holiday_subdivision` require `business_days=true` - `holiday_subdivision` also requires `holiday_country`  Examples: - Timestamp-to-timestamp: `/v1/time/elapsed?iso=2026-04-16T09:00:00&source_tz=America/New_York&compare_iso=2026-04-16T09:00:00&compare_source_tz=Europe/London` - Timestamp-to-selector: `/v1/time/elapsed?unix=1711300000&tz=America/New_York&business_days=true` 

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**unix** | Option<**i64**> |  |  |
**unix_ms** | Option<**i64**> |  |  |
**iso** | Option<**String**> | ISO-8601 timestamp. To supply a local wall-clock time without an explicit offset, pair it with one of `source_tz=Area/City`, `source_ip=...`, `source_lat=...&source_lon=...`, or `source_offset=±HH:MM`. |  |
**source_tz** | Option<**String**> | Used only with `iso=...` when the ISO value has no explicit offset. |  |
**source_ip** | Option<**String**> | Used only with `iso=...` when the ISO value has no explicit offset. Resolves that local wall-clock time through the timezone mapped from this IP address. |  |
**source_lat** | Option<**f64**> | Used only with `iso=...` when the ISO value has no explicit offset. Provide together with `source_lon` to resolve that local wall-clock time through the timezone mapped from these coordinates. |  |
**source_lon** | Option<**f64**> | Used only with `iso=...` when the ISO value has no explicit offset. Provide together with `source_lat`. |  |
**source_offset** | Option<**String**> | Used only with `iso=...` when the ISO value has no explicit offset. Interprets that local wall-clock time at this fixed UTC offset. |  |
**compare_unix** | Option<**i64**> |  |  |
**compare_unix_ms** | Option<**i64**> |  |  |
**compare_iso** | Option<**String**> | ISO-8601 comparison timestamp. To supply a local wall-clock time without an explicit offset, pair it with one of `compare_source_tz=Area/City`, `compare_source_ip=...`, `compare_source_lat=...&compare_source_lon=...`, or `compare_source_offset=±HH:MM`. |  |
**compare_source_tz** | Option<**String**> | Used only with `compare_iso=...` when the ISO value has no explicit offset. |  |
**compare_source_ip** | Option<**String**> | Used only with `compare_iso=...` when the ISO value has no explicit offset. Resolves that local wall-clock time through the timezone mapped from this IP address. |  |
**compare_source_lat** | Option<**f64**> | Used only with `compare_iso=...` when the ISO value has no explicit offset. Provide together with `compare_source_lon` to resolve that local wall-clock time through the timezone mapped from these coordinates. |  |
**compare_source_lon** | Option<**f64**> | Used only with `compare_iso=...` when the ISO value has no explicit offset. Provide together with `compare_source_lat`. |  |
**compare_source_offset** | Option<**String**> | Used only with `compare_iso=...` when the ISO value has no explicit offset. Interprets that local wall-clock time at this fixed UTC offset. |  |
**tz** | Option<**String**> | IANA timezone name. On bulk-capable routes, a comma-separated list enables bulk mode. |  |
**ip** | Option<**String**> | IP address. On bulk-capable routes, a comma-separated list enables bulk mode. |  |
**lat** | Option<**f64**> | Latitude. Must be provided together with `lon`. |  |
**lon** | Option<**f64**> | Longitude. Must be provided together with `lat`. |  |
**offset** | Option<**String**> | Fixed UTC offset in `+HH:MM` or `-HH:MM` format. On bulk-capable routes, a comma-separated list enables bulk mode. |  |
**auto_tz** | Option<**bool**> | Set to `true` to resolve using the caller IP from Cloudflare headers. |  |
**format** | Option<**String**> | Custom duration format template using `%days`, `%hours`, `%minutes`, and `%seconds`. |  |
**business_days** | Option<**bool**> | Set to `true` to enable weekday/business-day counting. |  |
**holiday_country** | Option<**String**> | ISO 3166-1 alpha-2 holiday calendar country code. Requires `business_days=true`. |  |
**holiday_subdivision** | Option<**String**> | Holiday calendar subdivision code from the upstream `python-holidays` calendar, for example `CA` or `ENG`. Requires `holiday_country` and `business_days=true`. |  |
**sign** | Option<**bool**> | Set to exactly `true` to ask the gateway to sign the final JSON response. Every authenticated JSON response, including errors, then includes signing headers. Not supported on `/v1/time/clock`. |  |

### Return type

[**models::ElapsedResponse**](ElapsedResponse.md)

### Authorization

[directApiKeyHeader](../README.md#directApiKeyHeader), [directBearerAuth](../README.md#directBearerAuth), [directApiKeyQuery](../README.md#directApiKeyQuery), [rapidApiKey](../README.md#rapidApiKey), [rapidApiHost](../README.md#rapidApiHost)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## get_timezone

> models::GetTimezone200Response get_timezone(tz, ip, lat, lon, offset, auto_tz, sign)
Resolve timezone information for a target

Resolves timezone metadata for a single target.  Target selector rules: - Use exactly one selector family: `tz`, `ip`, `lat` + `lon`, `offset`, or `auto_tz=true`. - Bulk is not supported on this route. - `offset` queries return a specialized payload that includes `matching_zones` for the request-time offset match.  Examples: - Single target: `/v1/timezone?tz=America/New_York` - Offset match: `/v1/timezone?offset=-04:00`

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**tz** | Option<**String**> | IANA timezone name. On bulk-capable routes, a comma-separated list enables bulk mode. |  |
**ip** | Option<**String**> | IP address. On bulk-capable routes, a comma-separated list enables bulk mode. |  |
**lat** | Option<**f64**> | Latitude. Must be provided together with `lon`. |  |
**lon** | Option<**f64**> | Longitude. Must be provided together with `lat`. |  |
**offset** | Option<**String**> | Fixed UTC offset in `+HH:MM` or `-HH:MM` format. On bulk-capable routes, a comma-separated list enables bulk mode. |  |
**auto_tz** | Option<**bool**> | Set to `true` to resolve using the caller IP from Cloudflare headers. |  |
**sign** | Option<**bool**> | Set to exactly `true` to ask the gateway to sign the final JSON response. Every authenticated JSON response, including errors, then includes signing headers. Not supported on `/v1/time/clock`. |  |

### Return type

[**models::GetTimezone200Response**](getTimezone_200_response.md)

### Authorization

[directApiKeyHeader](../README.md#directApiKeyHeader), [directBearerAuth](../README.md#directBearerAuth), [directApiKeyQuery](../README.md#directApiKeyQuery), [rapidApiKey](../README.md#rapidApiKey), [rapidApiHost](../README.md#rapidApiHost)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

