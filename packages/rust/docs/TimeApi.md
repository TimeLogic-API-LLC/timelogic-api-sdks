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
**unix** | Option<**i64**> | Whole Unix seconds (fractions are rejected; negative values are allowed). Valid range is -62135596800 to 253402300799 (0001-01-01T00:00:00Z to 9999-12-31T23:59:59Z); values outside it return 400 INVALID_TIMESTAMP. |  |
**unix_ms** | Option<**i64**> | Whole Unix milliseconds. Valid range -62135596800000 to 253402300799999 (0001-01-01T00:00:00Z to 9999-12-31T23:59:59.999Z); values outside it return 400 INVALID_TIMESTAMP. |  |
**iso** | Option<**String**> | ISO-8601 timestamp. To supply a local wall-clock time without an explicit offset, pair it with one of `source_tz=Area/City`, `source_ip=...`, `source_lat=...&source_lon=...`, or `source_offset=±HH:MM`; without a hint a local value is read as UTC. Accepted shapes are extended format with `Z`, `±HH:MM` or `±HH:MM:SS` (for example `1900-06-01T12:09:21+00:09:21`, as `iso_local` prints old local-mean-time offsets), optional fractional seconds, a space instead of `T`, a local time, or a date alone (read as 00:00). Basic format and offsets without a colon are rejected. The date must exist (`2027-02-29` returns 400 INVALID_TIMESTAMP rather than rolling over), and the instant must fall between 0001-01-01T00:00:00Z and 9999-12-31T23:59:59Z. A local time inside a spring-forward gap returns 400 INVALID_TIMESTAMP; an ambiguous fall-back time resolves to its first occurrence. |  |
**source_tz** | Option<**String**> | Used only with `iso=...` when the ISO value has no explicit offset. |  |
**source_ip** | Option<**String**> | Used only with `iso=...` when the ISO value has no explicit offset. Resolves that local wall-clock time through the timezone mapped from this IP address. |  |
**source_lat** | Option<**f64**> | Used only with `iso=...` when the ISO value has no explicit offset. Provide together with `source_lon` to resolve that local wall-clock time through the timezone mapped from these coordinates. |  |
**source_lon** | Option<**f64**> | Used only with `iso=...` when the ISO value has no explicit offset. Provide together with `source_lat`. |  |
**source_offset** | Option<**String**> | Used only with `iso=...` when the ISO value has no explicit offset. Interprets that local wall-clock time at this fixed UTC offset. |  |
**seconds** | Option<**i32**> |  |  |
**minutes** | Option<**i32**> |  |  |
**hours** | Option<**i32**> |  |  |
**days** | Option<**i32**> | Days to add, each exactly 24 hours (86,400 seconds), so the local wall-clock time shifts across a DST change. There are no weeks/months/years modifiers; unknown parameters are ignored. |  |
**tz** | Option<**String**> | IANA timezone name, matched case-insensitively. Links and aliases resolve to their canonical zone, so the returned `timezone` can differ (`Europe/Stockholm` returns `Europe/Berlin`, `UTC` returns `Etc/UTC`). `Etc/GMT+5` is UTC-05:00 (POSIX sign). On bulk-capable routes, a comma-separated list enables bulk mode with at most 10 values (any comma, even a trailing one, returns an array); request URLs are limited to 8192 characters. On single-target routes a list is rejected as an invalid timezone. |  |
**ip** | Option<**String**> | IP address. On bulk-capable routes, a comma-separated list enables bulk mode with at most 10 values; request URLs are limited to 8192 characters. |  |
**lat** | Option<**f64**> | Latitude. Must be provided together with `lon`. |  |
**lon** | Option<**f64**> | Longitude. Must be provided together with `lat`. |  |
**offset** | Option<**String**> | Fixed UTC offset in `+HH:MM` or `-HH:MM` format only (`+0530` and `+5` are rejected); URL-encode `+` as `%2B`, since an unencoded `+` is read as a space. An offset target returns `timezone=null`. On bulk-capable routes, a comma-separated list enables bulk mode with at most 10 values; request URLs are limited to 8192 characters. |  |
**auto_tz** | Option<**bool**> | Set to `true` to resolve using the caller IP from Cloudflare headers. Counts as a selector family, so it cannot be combined with `tz`, `ip`, `lat`/`lon` or `offset`. Not supported on `/v1/time/clock`. Enabled by `true`, `1` or `yes` (case-insensitive); any other value leaves it off without an error. |  |
**utc** | Option<**bool**> | Set to `true` to force UTC on routes that support it. Counts as a target and cannot be combined with other selectors (the AMBIGUOUS_TARGET message lists only the selector families). The response then has `iso_local=null` and `timezone=null`. Enabled by `true`, `1` or `yes` (case-insensitive); any other value leaves it off without an error. |  |
**format** | Option<**String**> | Custom date/time format template using supported `strftime`-style directives such as `%Y-%m-%d %H:%M:%S`. Supported directives: `%a %A %b %B %C %d %D %e %F %h %H %I %j %k %l %m %M %n %p %P %r %R %s %S %t %T %u %v %w %x %X %y %Y %z %:z %Z %%`, with the `-`, `_` and `0` padding flags on numeric directives. `%Z` prints the IANA zone name (or `UTC+HH:MM` for an offset target, `UTC` with no target), not an abbreviation. Any other directive (for example `%U`, `%f`, `%Q`) or a trailing `%` returns 400 INVALID_PARAMETER naming the directive. |  |
**sign** | Option<**bool**> | Set to `true`, `1` or `yes` (case-insensitive) to ask the gateway to sign the final JSON response. Any other value, a bare `sign`, or repeated `sign` values leave the response unsigned. Every authenticated JSON response, including errors, then includes signing headers. Not supported on `/v1/time/clock`. |  |

### Return type

[**models::TimePayload**](TimePayload.md)

### Authorization

[apiKeyHeader](../README.md#apiKeyHeader), [bearerAuth](../README.md#bearerAuth), [apiKeyQuery](../README.md#apiKeyQuery), [rapidApiKey](../README.md#rapidApiKey), [rapidApiHost](../README.md#rapidApiHost)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## convert_time

> models::GetCurrentTime200Response convert_time(unix, unix_ms, iso, source_tz, source_ip, source_lat, source_lon, source_offset, tz, ip, lat, lon, offset, auto_tz, utc, format, sign)
Convert a timestamp into a target timezone or offset

Converts one required input timestamp into a single target or a bulk array.  Input timestamp forms: - `unix=1711300000` - `unix_ms=1711300000000` - `iso=2026-04-16T09:00:00Z` - `iso=2026-04-16T09:00:00&source_tz=America/New_York` - `iso=2026-04-16T09:00:00&source_ip=8.8.8.8` - `iso=2026-04-16T09:00:00&source_lat=40.7128&source_lon=-74.0060` - `iso=2026-04-16T09:00:00&source_offset=-05:00`  Target selector forms: - `tz=America/New_York` - `ip=8.8.8.8` - `lat=40.7128&lon=-74.0060` - `offset=-04:00` - `auto_tz=true` - `utc=true`  Incompatible combinations: - exactly one input timestamp form - exactly one target selector family - use at most one of `source_tz`, `source_ip`, `source_lat`/`source_lon`, or `source_offset` - local-ISO companion selectors are valid only with `iso=...` that has no explicit offset - bulk is allowed only through one comma-separated `tz`, `ip`, or `offset` selector with at most 10 values  Examples: - Single target: `/v1/time/convert?iso=2026-04-16T09:00:00&source_tz=America/New_York&tz=Europe/London` - Bulk target set: `/v1/time/convert?unix=1711300000&offset=-04:00,+00:00,+09:00`

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**unix** | Option<**i64**> | Whole Unix seconds (fractions are rejected; negative values are allowed). Valid range is -62135596800 to 253402300799 (0001-01-01T00:00:00Z to 9999-12-31T23:59:59Z); values outside it return 400 INVALID_TIMESTAMP. |  |
**unix_ms** | Option<**i64**> | Whole Unix milliseconds. Valid range -62135596800000 to 253402300799999 (0001-01-01T00:00:00Z to 9999-12-31T23:59:59.999Z); values outside it return 400 INVALID_TIMESTAMP. |  |
**iso** | Option<**String**> | ISO-8601 timestamp. To supply a local wall-clock time without an explicit offset, pair it with one of `source_tz=Area/City`, `source_ip=...`, `source_lat=...&source_lon=...`, or `source_offset=±HH:MM`; without a hint a local value is read as UTC. Accepted shapes are extended format with `Z`, `±HH:MM` or `±HH:MM:SS` (for example `1900-06-01T12:09:21+00:09:21`, as `iso_local` prints old local-mean-time offsets), optional fractional seconds, a space instead of `T`, a local time, or a date alone (read as 00:00). Basic format and offsets without a colon are rejected. The date must exist (`2027-02-29` returns 400 INVALID_TIMESTAMP rather than rolling over), and the instant must fall between 0001-01-01T00:00:00Z and 9999-12-31T23:59:59Z. A local time inside a spring-forward gap returns 400 INVALID_TIMESTAMP; an ambiguous fall-back time resolves to its first occurrence. |  |
**source_tz** | Option<**String**> | Used only with `iso=...` when the ISO value has no explicit offset. |  |
**source_ip** | Option<**String**> | Used only with `iso=...` when the ISO value has no explicit offset. Resolves that local wall-clock time through the timezone mapped from this IP address. |  |
**source_lat** | Option<**f64**> | Used only with `iso=...` when the ISO value has no explicit offset. Provide together with `source_lon` to resolve that local wall-clock time through the timezone mapped from these coordinates. |  |
**source_lon** | Option<**f64**> | Used only with `iso=...` when the ISO value has no explicit offset. Provide together with `source_lat`. |  |
**source_offset** | Option<**String**> | Used only with `iso=...` when the ISO value has no explicit offset. Interprets that local wall-clock time at this fixed UTC offset. |  |
**tz** | Option<**String**> | IANA timezone name, matched case-insensitively. Links and aliases resolve to their canonical zone, so the returned `timezone` can differ (`Europe/Stockholm` returns `Europe/Berlin`, `UTC` returns `Etc/UTC`). `Etc/GMT+5` is UTC-05:00 (POSIX sign). On bulk-capable routes, a comma-separated list enables bulk mode with at most 10 values (any comma, even a trailing one, returns an array); request URLs are limited to 8192 characters. On single-target routes a list is rejected as an invalid timezone. |  |
**ip** | Option<**String**> | IP address. On bulk-capable routes, a comma-separated list enables bulk mode with at most 10 values; request URLs are limited to 8192 characters. |  |
**lat** | Option<**f64**> | Latitude. Must be provided together with `lon`. |  |
**lon** | Option<**f64**> | Longitude. Must be provided together with `lat`. |  |
**offset** | Option<**String**> | Fixed UTC offset in `+HH:MM` or `-HH:MM` format only (`+0530` and `+5` are rejected); URL-encode `+` as `%2B`, since an unencoded `+` is read as a space. An offset target returns `timezone=null`. On bulk-capable routes, a comma-separated list enables bulk mode with at most 10 values; request URLs are limited to 8192 characters. |  |
**auto_tz** | Option<**bool**> | Set to `true` to resolve using the caller IP from Cloudflare headers. Counts as a selector family, so it cannot be combined with `tz`, `ip`, `lat`/`lon` or `offset`. Not supported on `/v1/time/clock`. Enabled by `true`, `1` or `yes` (case-insensitive); any other value leaves it off without an error. |  |
**utc** | Option<**bool**> | Set to `true` to force UTC on routes that support it. Counts as a target and cannot be combined with other selectors (the AMBIGUOUS_TARGET message lists only the selector families). The response then has `iso_local=null` and `timezone=null`. Enabled by `true`, `1` or `yes` (case-insensitive); any other value leaves it off without an error. |  |
**format** | Option<**String**> | Custom date/time format template using supported `strftime`-style directives such as `%Y-%m-%d %H:%M:%S`. Supported directives: `%a %A %b %B %C %d %D %e %F %h %H %I %j %k %l %m %M %n %p %P %r %R %s %S %t %T %u %v %w %x %X %y %Y %z %:z %Z %%`, with the `-`, `_` and `0` padding flags on numeric directives. `%Z` prints the IANA zone name (or `UTC+HH:MM` for an offset target, `UTC` with no target), not an abbreviation. Any other directive (for example `%U`, `%f`, `%Q`) or a trailing `%` returns 400 INVALID_PARAMETER naming the directive. |  |
**sign** | Option<**bool**> | Set to `true`, `1` or `yes` (case-insensitive) to ask the gateway to sign the final JSON response. Any other value, a bare `sign`, or repeated `sign` values leave the response unsigned. Every authenticated JSON response, including errors, then includes signing headers. Not supported on `/v1/time/clock`. |  |

### Return type

[**models::GetCurrentTime200Response**](getCurrentTime_200_response.md)

### Authorization

[apiKeyHeader](../README.md#apiKeyHeader), [bearerAuth](../README.md#bearerAuth), [apiKeyQuery](../README.md#apiKeyQuery), [rapidApiKey](../README.md#rapidApiKey), [rapidApiHost](../README.md#rapidApiHost)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## diff_time

> models::DiffResponse diff_time(from, to, from_tz, from_ip, from_lat, from_lon, from_offset, to_tz, to_ip, to_lat, to_lon, to_offset, format, business_days, holiday_country, holiday_subdivision, sign)
Difference between two instants

Computes the duration between `from` and `to`.  Required query fields: `from` and `to` only. Do not send every optional companion field. For each side, choose one supported specifier form. A `from_*` or `to_*` companion is allowed only when that side uses `iso=...` with no explicit offset; use at most one companion selector, except that coordinate input requires its paired latitude and longitude.  `from` and `to` are embedded specifier strings.  Accepted specifier forms: - `from=now` - `from=unix=1711300000` - `from=unix_ms=1711300000000` - `from=iso=2026-04-16T09:00:00` - `from=tz=America/New_York` - `from=ip=8.8.8.8` - `from=offset=-05:00` - the same forms are accepted for `to`  Timezone hint pairings: - `from_tz` only with `from=iso=...` that has no explicit offset - `from_ip`, `from_lat`/`from_lon`, and `from_offset` only with `from=iso=...` that has no explicit offset - `to_tz` only with `to=iso=...` that has no explicit offset - `to_ip`, `to_lat`/`to_lon`, and `to_offset` only with `to=iso=...` that has no explicit offset  Selector semantics: - `tz=...`, `ip=...`, and `offset=...` inside `from` or `to` mean the current request-time instant resolved through that selector - those selector forms do not represent an arbitrary local wall-clock time - returned duration magnitudes are absolute; use `direction` to see whether `to` is after, before, or the same instant as `from` - because \"now\" is the same instant in every zone, `tz=`, `ip=` and `offset=` specifiers never change `seconds` or `direction`; their zone only picks the calendar date for business days - coordinates are not a specifier (`from=lat=...` returns \"Unsupported time specifier.\"); use `from_lat`/`from_lon` as a hint for a local `iso` - `seconds`, `minutes`, `hours`, `days` and the `format` placeholders are totals in each unit, not remainders; `human` is always written in hours, minutes and seconds  Business-day rules: - `holiday_country` and `holiday_subdivision` require `business_days=true` - `holiday_subdivision` also requires `holiday_country` - days are counted by calendar date, start included and end excluded, unsigned - each side's date is taken in its zone when known (a `from_*`/`to_*` hint, or a `tz=`/`ip=`/`offset=` specifier), otherwise in UTC - example: `from=iso=2026-01-02T00:00:00Z&to=iso=2026-04-30T00:00:00Z&business_days=true&holiday_country=FR` returns `business_days: 83` - weekends follow the holiday calendar's country (Friday/Saturday for `SA`); a subdivision uses its country's weekend - example with a subdivision: `from=iso=2026-01-02T00:00:00Z&to=iso=2026-04-30T00:00:00Z&business_days=true&holiday_country=CH&holiday_subdivision=ZH` returns `business_days: 82` (`holiday_country=CH-ZH` is the same calendar) - example with a Friday/Saturday weekend: the same range with `holiday_country=SA` returns `business_days: 79`  Examples: - Selector-current instant: `/v1/time/diff?from=unix=1711300000&to=now` - Wall-clock pairing: `/v1/time/diff?from=iso=2026-04-16T09:00:00&from_tz=America/New_York&to=iso=2026-04-16T09:00:00&to_tz=Europe/London` - Wall-clock via selector: `/v1/time/diff?from=iso=2026-01-01T12:00:00&from_ip=8.8.8.8&to=iso=2026-01-01T12:00:00&to_offset=-05:00`

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
**format** | Option<**String**> | Custom duration format template using `%days`, `%hours`, `%minutes`, and `%seconds`. Each placeholder is the total duration in that unit, not a remainder (118 days renders `%days days %hours hours` as `118 days 2832 hours`). |  |
**business_days** | Option<**bool**> | Set to `true` to add a `business_days` count. Days are counted by calendar date, start included and end excluded, unsigned; weekends follow the holiday calendar's country (Saturday/Sunday in 221 countries, Friday/Saturday in 18 such as SA, Sunday only in 8, Friday only in IR, Friday/Sunday in BN; Saturday/Sunday when no `holiday_country` is given) and holidays of the chosen calendar are skipped. Each endpoint's date is taken in its own zone when one is known (diff - from_*_/to_* hints or a tz=/ip=/offset= specifier; elapsed - source_*_/compare_source_*), otherwise in UTC. Enabled by `true`, `1` or `yes` (case-insensitive); any other value leaves it off without an error. |  |
**holiday_country** | Option<**String**> | Holiday calendar: one of the 249 countries with holiday calendars (862 calendars including subdivisions, years 1900-2100), as an ISO 3166-1 alpha-2 code in any letter case, or a combined ISO 3166-2 style code such as `CH-ZH`, `US-CA` or `FR-6AE`. Requires `business_days=true`. The full list is at https://timelogicapi.com/docs#holiday-calendars and, as JSON, at https://timelogicapi.com/content/holiday-calendars.json. Any other country (for example `LK`) returns 400 INVALID_PARAMETER \"Unsupported holiday calendar.\"; a malformed value returns \"Invalid holiday_country parameter.\"; a business-day range outside 1900-2100 returns \"Holiday calendar coverage is only available for years 1900-2100.\" |  |
**holiday_subdivision** | Option<**String**> | Holiday calendar subdivision code for the country (the ISO 3166-2 suffix, 1-3 letters or digits, any letter case), for example `ENG` (GB), `ZH` (CH), `MH` (IN), `01` (FI) or `6AE` (FR); digits and leading zeros are part of the code. Subdivisions exist for 35 countries. Requires `holiday_country` and `business_days=true`. An unknown code returns 400 INVALID_PARAMETER \"Unknown holiday_subdivision 'XX' for country DE.\" (also for `FI` + `1`, which must be `01`); a value that conflicts with a combined `holiday_country` such as `US-CA` returns 400 INVALID_PARAMETER. |  |
**sign** | Option<**bool**> | Set to `true`, `1` or `yes` (case-insensitive) to ask the gateway to sign the final JSON response. Any other value, a bare `sign`, or repeated `sign` values leave the response unsigned. Every authenticated JSON response, including errors, then includes signing headers. Not supported on `/v1/time/clock`. |  |

### Return type

[**models::DiffResponse**](DiffResponse.md)

### Authorization

[apiKeyHeader](../README.md#apiKeyHeader), [bearerAuth](../README.md#bearerAuth), [apiKeyQuery](../README.md#apiKeyQuery), [rapidApiKey](../README.md#rapidApiKey), [rapidApiHost](../README.md#rapidApiHost)

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
**unix** | Option<**i64**> | Whole Unix seconds (fractions are rejected; negative values are allowed). Valid range is -62135596800 to 253402300799 (0001-01-01T00:00:00Z to 9999-12-31T23:59:59Z); values outside it return 400 INVALID_TIMESTAMP. |  |
**unix_ms** | Option<**i64**> | Whole Unix milliseconds. Valid range -62135596800000 to 253402300799999 (0001-01-01T00:00:00Z to 9999-12-31T23:59:59.999Z); values outside it return 400 INVALID_TIMESTAMP. |  |
**iso** | Option<**String**> | ISO-8601 timestamp. To supply a local wall-clock time without an explicit offset, pair it with one of `source_tz=Area/City`, `source_ip=...`, `source_lat=...&source_lon=...`, or `source_offset=±HH:MM`; without a hint a local value is read as UTC. Accepted shapes are extended format with `Z`, `±HH:MM` or `±HH:MM:SS` (for example `1900-06-01T12:09:21+00:09:21`, as `iso_local` prints old local-mean-time offsets), optional fractional seconds, a space instead of `T`, a local time, or a date alone (read as 00:00). Basic format and offsets without a colon are rejected. The date must exist (`2027-02-29` returns 400 INVALID_TIMESTAMP rather than rolling over), and the instant must fall between 0001-01-01T00:00:00Z and 9999-12-31T23:59:59Z. A local time inside a spring-forward gap returns 400 INVALID_TIMESTAMP; an ambiguous fall-back time resolves to its first occurrence. |  |
**source_tz** | Option<**String**> | Used only with `iso=...` when the ISO value has no explicit offset. |  |
**source_ip** | Option<**String**> | Used only with `iso=...` when the ISO value has no explicit offset. Resolves that local wall-clock time through the timezone mapped from this IP address. |  |
**source_lat** | Option<**f64**> | Used only with `iso=...` when the ISO value has no explicit offset. Provide together with `source_lon` to resolve that local wall-clock time through the timezone mapped from these coordinates. |  |
**source_lon** | Option<**f64**> | Used only with `iso=...` when the ISO value has no explicit offset. Provide together with `source_lat`. |  |
**source_offset** | Option<**String**> | Used only with `iso=...` when the ISO value has no explicit offset. Interprets that local wall-clock time at this fixed UTC offset. |  |
**tz** | Option<**String**> | IANA timezone name, matched case-insensitively. Links and aliases resolve to their canonical zone, so the returned `timezone` can differ (`Europe/Stockholm` returns `Europe/Berlin`, `UTC` returns `Etc/UTC`). `Etc/GMT+5` is UTC-05:00 (POSIX sign). On bulk-capable routes, a comma-separated list enables bulk mode with at most 10 values (any comma, even a trailing one, returns an array); request URLs are limited to 8192 characters. On single-target routes a list is rejected as an invalid timezone. |  |
**ip** | Option<**String**> | IP address. On bulk-capable routes, a comma-separated list enables bulk mode with at most 10 values; request URLs are limited to 8192 characters. |  |
**lat** | Option<**f64**> | Latitude. Must be provided together with `lon`. |  |
**lon** | Option<**f64**> | Longitude. Must be provided together with `lat`. |  |
**offset** | Option<**String**> | Fixed UTC offset in `+HH:MM` or `-HH:MM` format only (`+0530` and `+5` are rejected); URL-encode `+` as `%2B`, since an unencoded `+` is read as a space. An offset target returns `timezone=null`. On bulk-capable routes, a comma-separated list enables bulk mode with at most 10 values; request URLs are limited to 8192 characters. |  |
**auto_tz** | Option<**bool**> | Set to `true` to resolve using the caller IP from Cloudflare headers. Counts as a selector family, so it cannot be combined with `tz`, `ip`, `lat`/`lon` or `offset`. Not supported on `/v1/time/clock`. Enabled by `true`, `1` or `yes` (case-insensitive); any other value leaves it off without an error. |  |
**format** | Option<**String**> | Custom date/time format template using supported `strftime`-style directives such as `%Y-%m-%d %H:%M:%S`. Supported directives: `%a %A %b %B %C %d %D %e %F %h %H %I %j %k %l %m %M %n %p %P %r %R %s %S %t %T %u %v %w %x %X %y %Y %z %:z %Z %%`, with the `-`, `_` and `0` padding flags on numeric directives. `%Z` prints the IANA zone name (or `UTC+HH:MM` for an offset target, `UTC` with no target), not an abbreviation. Any other directive (for example `%U`, `%f`, `%Q`) or a trailing `%` returns 400 INVALID_PARAMETER naming the directive. |  |
**week** | Option<**bool**> | Set to `true` to add the ISO 8601 `week_number`. Enabled by `true`, `1` or `yes` (case-insensitive); any other value leaves it off without an error. |  |
**sign** | Option<**bool**> | Set to `true`, `1` or `yes` (case-insensitive) to ask the gateway to sign the final JSON response. Any other value, a bare `sign`, or repeated `sign` values leave the response unsigned. Every authenticated JSON response, including errors, then includes signing headers. Not supported on `/v1/time/clock`. |  |

### Return type

[**models::CalendarResponse**](CalendarResponse.md)

### Authorization

[apiKeyHeader](../README.md#apiKeyHeader), [bearerAuth](../README.md#bearerAuth), [apiKeyQuery](../README.md#apiKeyQuery), [rapidApiKey](../README.md#rapidApiKey), [rapidApiHost](../README.md#rapidApiHost)

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
**unix** | Option<**i64**> | Whole Unix seconds (fractions are rejected; negative values are allowed). Valid range is -62135596800 to 253402300799 (0001-01-01T00:00:00Z to 9999-12-31T23:59:59Z); values outside it return 400 INVALID_TIMESTAMP. |  |
**unix_ms** | Option<**i64**> | Whole Unix milliseconds. Valid range -62135596800000 to 253402300799999 (0001-01-01T00:00:00Z to 9999-12-31T23:59:59.999Z); values outside it return 400 INVALID_TIMESTAMP. |  |
**iso** | Option<**String**> | ISO-8601 timestamp. To supply a local wall-clock time without an explicit offset, pair it with one of `source_tz=Area/City`, `source_ip=...`, `source_lat=...&source_lon=...`, or `source_offset=±HH:MM`; without a hint a local value is read as UTC. Accepted shapes are extended format with `Z`, `±HH:MM` or `±HH:MM:SS` (for example `1900-06-01T12:09:21+00:09:21`, as `iso_local` prints old local-mean-time offsets), optional fractional seconds, a space instead of `T`, a local time, or a date alone (read as 00:00). Basic format and offsets without a colon are rejected. The date must exist (`2027-02-29` returns 400 INVALID_TIMESTAMP rather than rolling over), and the instant must fall between 0001-01-01T00:00:00Z and 9999-12-31T23:59:59Z. A local time inside a spring-forward gap returns 400 INVALID_TIMESTAMP; an ambiguous fall-back time resolves to its first occurrence. |  |
**source_tz** | Option<**String**> | Used only with `iso=...` when the ISO value has no explicit offset. |  |
**source_ip** | Option<**String**> | Used only with `iso=...` when the ISO value has no explicit offset. Resolves that local wall-clock time through the timezone mapped from this IP address. |  |
**source_lat** | Option<**f64**> | Used only with `iso=...` when the ISO value has no explicit offset. Provide together with `source_lon` to resolve that local wall-clock time through the timezone mapped from these coordinates. |  |
**source_lon** | Option<**f64**> | Used only with `iso=...` when the ISO value has no explicit offset. Provide together with `source_lat`. |  |
**source_offset** | Option<**String**> | Used only with `iso=...` when the ISO value has no explicit offset. Interprets that local wall-clock time at this fixed UTC offset. |  |
**tz** | Option<**String**> | IANA timezone name, matched case-insensitively. Links and aliases resolve to their canonical zone, so the returned `timezone` can differ (`Europe/Stockholm` returns `Europe/Berlin`, `UTC` returns `Etc/UTC`). `Etc/GMT+5` is UTC-05:00 (POSIX sign). On bulk-capable routes, a comma-separated list enables bulk mode with at most 10 values (any comma, even a trailing one, returns an array); request URLs are limited to 8192 characters. On single-target routes a list is rejected as an invalid timezone. |  |
**ip** | Option<**String**> | IP address. On bulk-capable routes, a comma-separated list enables bulk mode with at most 10 values; request URLs are limited to 8192 characters. |  |
**lat** | Option<**f64**> | Latitude. Must be provided together with `lon`. |  |
**lon** | Option<**f64**> | Longitude. Must be provided together with `lat`. |  |
**offset** | Option<**String**> | Fixed UTC offset in `+HH:MM` or `-HH:MM` format only (`+0530` and `+5` are rejected); URL-encode `+` as `%2B`, since an unencoded `+` is read as a space. An offset target returns `timezone=null`. On bulk-capable routes, a comma-separated list enables bulk mode with at most 10 values; request URLs are limited to 8192 characters. |  |
**format** | Option<**String**> | Custom date/time format template using supported `strftime`-style directives such as `%Y-%m-%d %H:%M:%S`. Supported directives: `%a %A %b %B %C %d %D %e %F %h %H %I %j %k %l %m %M %n %p %P %r %R %s %S %t %T %u %v %w %x %X %y %Y %z %:z %Z %%`, with the `-`, `_` and `0` padding flags on numeric directives. `%Z` prints the IANA zone name (or `UTC+HH:MM` for an offset target, `UTC` with no target), not an abbreviation. Any other directive (for example `%U`, `%f`, `%Q`) or a trailing `%` returns 400 INVALID_PARAMETER naming the directive. |  |

### Return type

**String**

### Authorization

[apiKeyHeader](../README.md#apiKeyHeader), [bearerAuth](../README.md#bearerAuth), [apiKeyQuery](../README.md#apiKeyQuery), [rapidApiKey](../README.md#rapidApiKey), [rapidApiHost](../README.md#rapidApiHost)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/html, application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## get_current_time

> models::GetCurrentTime200Response get_current_time(tz, ip, lat, lon, offset, auto_tz, format, sign)
Get the current time for a target

Returns current time data for a single target, or a bulk array when exactly one of `tz`, `ip`, or `offset` is supplied as a comma-separated list.  Target selector rules: - Use at most one selector family per request: `tz`, `ip`, `lat` + `lon`, `offset`, or `auto_tz=true`. - If no selector is provided, the response defaults to UTC with `timezone=null` and `iso_local=null`. - Bulk mode is available only through one comma-separated `tz`, `ip`, or `offset` selector, accepts at most 10 values, and cannot be combined with any other selector.  Example: - Single target: `/v1/time/current?tz=America/New_York` - For bulk, provide one comma-separated `tz`, `ip`, or `offset` value, for example `/v1/time/current?tz=America/New_York,Europe/London,Asia/Tokyo`.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**tz** | Option<**String**> | IANA timezone name, matched case-insensitively. Links and aliases resolve to their canonical zone, so the returned `timezone` can differ (`Europe/Stockholm` returns `Europe/Berlin`, `UTC` returns `Etc/UTC`). `Etc/GMT+5` is UTC-05:00 (POSIX sign). On bulk-capable routes, a comma-separated list enables bulk mode with at most 10 values (any comma, even a trailing one, returns an array); request URLs are limited to 8192 characters. On single-target routes a list is rejected as an invalid timezone. |  |
**ip** | Option<**String**> | IP address. On bulk-capable routes, a comma-separated list enables bulk mode with at most 10 values; request URLs are limited to 8192 characters. |  |
**lat** | Option<**f64**> | Latitude. Must be provided together with `lon`. |  |
**lon** | Option<**f64**> | Longitude. Must be provided together with `lat`. |  |
**offset** | Option<**String**> | Fixed UTC offset in `+HH:MM` or `-HH:MM` format only (`+0530` and `+5` are rejected); URL-encode `+` as `%2B`, since an unencoded `+` is read as a space. An offset target returns `timezone=null`. On bulk-capable routes, a comma-separated list enables bulk mode with at most 10 values; request URLs are limited to 8192 characters. |  |
**auto_tz** | Option<**bool**> | Set to `true` to resolve using the caller IP from Cloudflare headers. Counts as a selector family, so it cannot be combined with `tz`, `ip`, `lat`/`lon` or `offset`. Not supported on `/v1/time/clock`. Enabled by `true`, `1` or `yes` (case-insensitive); any other value leaves it off without an error. |  |
**format** | Option<**String**> | Custom date/time format template using supported `strftime`-style directives such as `%Y-%m-%d %H:%M:%S`. Supported directives: `%a %A %b %B %C %d %D %e %F %h %H %I %j %k %l %m %M %n %p %P %r %R %s %S %t %T %u %v %w %x %X %y %Y %z %:z %Z %%`, with the `-`, `_` and `0` padding flags on numeric directives. `%Z` prints the IANA zone name (or `UTC+HH:MM` for an offset target, `UTC` with no target), not an abbreviation. Any other directive (for example `%U`, `%f`, `%Q`) or a trailing `%` returns 400 INVALID_PARAMETER naming the directive. |  |
**sign** | Option<**bool**> | Set to `true`, `1` or `yes` (case-insensitive) to ask the gateway to sign the final JSON response. Any other value, a bare `sign`, or repeated `sign` values leave the response unsigned. Every authenticated JSON response, including errors, then includes signing headers. Not supported on `/v1/time/clock`. |  |

### Return type

[**models::GetCurrentTime200Response**](getCurrentTime_200_response.md)

### Authorization

[apiKeyHeader](../README.md#apiKeyHeader), [bearerAuth](../README.md#bearerAuth), [apiKeyQuery](../README.md#apiKeyQuery), [rapidApiKey](../README.md#rapidApiKey), [rapidApiHost](../README.md#rapidApiHost)

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
**tz** | Option<**String**> | IANA timezone name, matched case-insensitively. Links and aliases resolve to their canonical zone, so the returned `timezone` can differ (`Europe/Stockholm` returns `Europe/Berlin`, `UTC` returns `Etc/UTC`). `Etc/GMT+5` is UTC-05:00 (POSIX sign). On bulk-capable routes, a comma-separated list enables bulk mode with at most 10 values (any comma, even a trailing one, returns an array); request URLs are limited to 8192 characters. On single-target routes a list is rejected as an invalid timezone. |  |
**ip** | Option<**String**> | IP address. On bulk-capable routes, a comma-separated list enables bulk mode with at most 10 values; request URLs are limited to 8192 characters. |  |
**lat** | Option<**f64**> | Latitude. Must be provided together with `lon`. |  |
**lon** | Option<**f64**> | Longitude. Must be provided together with `lat`. |  |
**offset** | Option<**String**> | Fixed UTC offset in `+HH:MM` or `-HH:MM` format only (`+0530` and `+5` are rejected); URL-encode `+` as `%2B`, since an unencoded `+` is read as a space. An offset target returns `timezone=null`. On bulk-capable routes, a comma-separated list enables bulk mode with at most 10 values; request URLs are limited to 8192 characters. |  |
**auto_tz** | Option<**bool**> | Set to `true` to resolve using the caller IP from Cloudflare headers. Counts as a selector family, so it cannot be combined with `tz`, `ip`, `lat`/`lon` or `offset`. Not supported on `/v1/time/clock`. Enabled by `true`, `1` or `yes` (case-insensitive); any other value leaves it off without an error. |  |
**format** | Option<**String**> | Custom date/time format template using supported `strftime`-style directives such as `%Y-%m-%d %H:%M:%S`. Supported directives: `%a %A %b %B %C %d %D %e %F %h %H %I %j %k %l %m %M %n %p %P %r %R %s %S %t %T %u %v %w %x %X %y %Y %z %:z %Z %%`, with the `-`, `_` and `0` padding flags on numeric directives. `%Z` prints the IANA zone name (or `UTC+HH:MM` for an offset target, `UTC` with no target), not an abbreviation. Any other directive (for example `%U`, `%f`, `%Q`) or a trailing `%` returns 400 INVALID_PARAMETER naming the directive. |  |
**next** | Option<**bool**> | Set to `true` to add `next_transition` (the next UTC offset change, or null). Enabled by `true`, `1` or `yes` (case-insensitive); any other value leaves it off without an error. |  |
**sign** | Option<**bool**> | Set to `true`, `1` or `yes` (case-insensitive) to ask the gateway to sign the final JSON response. Any other value, a bare `sign`, or repeated `sign` values leave the response unsigned. Every authenticated JSON response, including errors, then includes signing headers. Not supported on `/v1/time/clock`. |  |

### Return type

[**models::DstResponse**](DstResponse.md)

### Authorization

[apiKeyHeader](../README.md#apiKeyHeader), [bearerAuth](../README.md#bearerAuth), [apiKeyQuery](../README.md#apiKeyQuery), [rapidApiKey](../README.md#rapidApiKey), [rapidApiHost](../README.md#rapidApiHost)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## get_elapsed

> models::ElapsedResponse get_elapsed(unix, unix_ms, iso, source_tz, source_ip, source_lat, source_lon, source_offset, compare_unix, compare_unix_ms, compare_iso, compare_source_tz, compare_source_ip, compare_source_lat, compare_source_lon, compare_source_offset, tz, ip, lat, lon, offset, auto_tz, format, business_days, holiday_country, holiday_subdivision, sign)
Time elapsed since or remaining until a reference instant

Computes elapsed or remaining duration relative to one required reference timestamp.  Reference timestamp forms: - `unix=1711300000` - `unix_ms=1711300000000` - `iso=2026-04-16T09:00:00Z` - `iso=2026-04-16T09:00:00&source_tz=America/New_York` - `iso=2026-04-16T09:00:00&source_ip=8.8.8.8` - `iso=2026-04-16T09:00:00&source_lat=40.7128&source_lon=-74.0060` - `iso=2026-04-16T09:00:00&source_offset=-05:00`  Compare timestamp forms: - `compare_unix=1711213600` - `compare_unix_ms=1711213600000` - `compare_iso=2026-04-16T09:00:00Z` - `compare_iso=2026-04-16T09:00:00&compare_source_tz=Europe/London` - `compare_iso=2026-04-16T09:00:00&compare_source_ip=8.8.8.8` - `compare_iso=2026-04-16T09:00:00&compare_source_lat=40.7128&compare_source_lon=-74.0060` - `compare_iso=2026-04-16T09:00:00&compare_source_offset=-05:00`  Compare selector forms: - `tz=America/New_York` - `ip=8.8.8.8` - `lat=40.7128&lon=-74.0060` - `offset=-04:00` - `auto_tz=true`  Incompatible combinations: - exactly one reference timestamp form - use either one compare timestamp form or one compare selector family, not both - use at most one of `source_tz`, `source_ip`, `source_lat`/`source_lon`, or `source_offset` - use at most one of `compare_source_tz`, `compare_source_ip`, `compare_source_lat`/`compare_source_lon`, or `compare_source_offset` - local-ISO companion selectors are valid only with `iso=...` that has no explicit offset - compare local-ISO companion selectors are valid only with `compare_iso=...` that has no explicit offset - if no compare input is provided, the comparison defaults to the request time - compare selectors (`tz`, `ip`, `lat`/`lon`, `offset`, `auto_tz`) all mean the current request time, which is the same instant in every zone, so they do not change the result - equal instants return `seconds: 0` with `direction: passed` (diff returns `same`)  Business-day rules: - `holiday_country` and `holiday_subdivision` require `business_days=true` - `holiday_subdivision` also requires `holiday_country` - same counting rules as diff; the reference date uses its `source_*` zone and the compare date its `compare_source_*` zone when given, otherwise UTC - weekends follow the holiday calendar's country (Friday/Saturday for `SA`); a subdivision uses its country's weekend - example with a subdivision: `iso=2026-01-02T00:00:00Z&compare_iso=2026-04-30T00:00:00Z&business_days=true&holiday_country=IN-MH` returns `business_days: 76` - example with a Friday/Saturday weekend: the same range with `holiday_country=SA` returns `business_days: 79`  Examples: - Timestamp-to-timestamp: `/v1/time/elapsed?iso=2026-04-16T09:00:00&source_tz=America/New_York&compare_iso=2026-04-16T09:00:00&compare_source_tz=Europe/London` - Timestamp-to-selector: `/v1/time/elapsed?unix=1711300000&tz=America/New_York&business_days=true`

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**unix** | Option<**i64**> | Whole Unix seconds (fractions are rejected; negative values are allowed). Valid range is -62135596800 to 253402300799 (0001-01-01T00:00:00Z to 9999-12-31T23:59:59Z); values outside it return 400 INVALID_TIMESTAMP. |  |
**unix_ms** | Option<**i64**> | Whole Unix milliseconds. Valid range -62135596800000 to 253402300799999 (0001-01-01T00:00:00Z to 9999-12-31T23:59:59.999Z); values outside it return 400 INVALID_TIMESTAMP. |  |
**iso** | Option<**String**> | ISO-8601 timestamp. To supply a local wall-clock time without an explicit offset, pair it with one of `source_tz=Area/City`, `source_ip=...`, `source_lat=...&source_lon=...`, or `source_offset=±HH:MM`; without a hint a local value is read as UTC. Accepted shapes are extended format with `Z`, `±HH:MM` or `±HH:MM:SS` (for example `1900-06-01T12:09:21+00:09:21`, as `iso_local` prints old local-mean-time offsets), optional fractional seconds, a space instead of `T`, a local time, or a date alone (read as 00:00). Basic format and offsets without a colon are rejected. The date must exist (`2027-02-29` returns 400 INVALID_TIMESTAMP rather than rolling over), and the instant must fall between 0001-01-01T00:00:00Z and 9999-12-31T23:59:59Z. A local time inside a spring-forward gap returns 400 INVALID_TIMESTAMP; an ambiguous fall-back time resolves to its first occurrence. |  |
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
**tz** | Option<**String**> | IANA timezone name, matched case-insensitively. Links and aliases resolve to their canonical zone, so the returned `timezone` can differ (`Europe/Stockholm` returns `Europe/Berlin`, `UTC` returns `Etc/UTC`). `Etc/GMT+5` is UTC-05:00 (POSIX sign). On bulk-capable routes, a comma-separated list enables bulk mode with at most 10 values (any comma, even a trailing one, returns an array); request URLs are limited to 8192 characters. On single-target routes a list is rejected as an invalid timezone. |  |
**ip** | Option<**String**> | IP address. On bulk-capable routes, a comma-separated list enables bulk mode with at most 10 values; request URLs are limited to 8192 characters. |  |
**lat** | Option<**f64**> | Latitude. Must be provided together with `lon`. |  |
**lon** | Option<**f64**> | Longitude. Must be provided together with `lat`. |  |
**offset** | Option<**String**> | Fixed UTC offset in `+HH:MM` or `-HH:MM` format only (`+0530` and `+5` are rejected); URL-encode `+` as `%2B`, since an unencoded `+` is read as a space. An offset target returns `timezone=null`. On bulk-capable routes, a comma-separated list enables bulk mode with at most 10 values; request URLs are limited to 8192 characters. |  |
**auto_tz** | Option<**bool**> | Set to `true` to resolve using the caller IP from Cloudflare headers. Counts as a selector family, so it cannot be combined with `tz`, `ip`, `lat`/`lon` or `offset`. Not supported on `/v1/time/clock`. Enabled by `true`, `1` or `yes` (case-insensitive); any other value leaves it off without an error. |  |
**format** | Option<**String**> | Custom duration format template using `%days`, `%hours`, `%minutes`, and `%seconds`. Each placeholder is the total duration in that unit, not a remainder (118 days renders `%days days %hours hours` as `118 days 2832 hours`). |  |
**business_days** | Option<**bool**> | Set to `true` to add a `business_days` count. Days are counted by calendar date, start included and end excluded, unsigned; weekends follow the holiday calendar's country (Saturday/Sunday in 221 countries, Friday/Saturday in 18 such as SA, Sunday only in 8, Friday only in IR, Friday/Sunday in BN; Saturday/Sunday when no `holiday_country` is given) and holidays of the chosen calendar are skipped. Each endpoint's date is taken in its own zone when one is known (diff - from_*_/to_* hints or a tz=/ip=/offset= specifier; elapsed - source_*_/compare_source_*), otherwise in UTC. Enabled by `true`, `1` or `yes` (case-insensitive); any other value leaves it off without an error. |  |
**holiday_country** | Option<**String**> | Holiday calendar: one of the 249 countries with holiday calendars (862 calendars including subdivisions, years 1900-2100), as an ISO 3166-1 alpha-2 code in any letter case, or a combined ISO 3166-2 style code such as `CH-ZH`, `US-CA` or `FR-6AE`. Requires `business_days=true`. The full list is at https://timelogicapi.com/docs#holiday-calendars and, as JSON, at https://timelogicapi.com/content/holiday-calendars.json. Any other country (for example `LK`) returns 400 INVALID_PARAMETER \"Unsupported holiday calendar.\"; a malformed value returns \"Invalid holiday_country parameter.\"; a business-day range outside 1900-2100 returns \"Holiday calendar coverage is only available for years 1900-2100.\" |  |
**holiday_subdivision** | Option<**String**> | Holiday calendar subdivision code for the country (the ISO 3166-2 suffix, 1-3 letters or digits, any letter case), for example `ENG` (GB), `ZH` (CH), `MH` (IN), `01` (FI) or `6AE` (FR); digits and leading zeros are part of the code. Subdivisions exist for 35 countries. Requires `holiday_country` and `business_days=true`. An unknown code returns 400 INVALID_PARAMETER \"Unknown holiday_subdivision 'XX' for country DE.\" (also for `FI` + `1`, which must be `01`); a value that conflicts with a combined `holiday_country` such as `US-CA` returns 400 INVALID_PARAMETER. |  |
**sign** | Option<**bool**> | Set to `true`, `1` or `yes` (case-insensitive) to ask the gateway to sign the final JSON response. Any other value, a bare `sign`, or repeated `sign` values leave the response unsigned. Every authenticated JSON response, including errors, then includes signing headers. Not supported on `/v1/time/clock`. |  |

### Return type

[**models::ElapsedResponse**](ElapsedResponse.md)

### Authorization

[apiKeyHeader](../README.md#apiKeyHeader), [bearerAuth](../README.md#bearerAuth), [apiKeyQuery](../README.md#apiKeyQuery), [rapidApiKey](../README.md#rapidApiKey), [rapidApiHost](../README.md#rapidApiHost)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## get_timezone

> models::GetTimezone200Response get_timezone(tz, ip, lat, lon, offset, auto_tz, sign)
Resolve timezone information for a target

Resolves timezone metadata for a single target.  Target selector rules: - Use exactly one selector family: `tz`, `ip`, `lat` + `lon`, `offset`, or `auto_tz=true`. - Bulk is not supported on this route. - With no selector the route returns 400 MISSING_TARGET. - `offset` queries return a specialized payload with `timezone=null` and `matching_zones` for the request-time offset match. Only geographic zones are listed; `UTC` and `Etc/_*` are intentionally excluded (use `tz=UTC` for UTC). - `tz` names resolve to their canonical zone (`Europe/Stockholm` returns `Europe/Berlin`). - An `ip` with no timezone mapping returns 404 NOT_FOUND.  Examples: - Single target: `/v1/timezone?tz=America/New_York` - Offset match: `/v1/timezone?offset=-04:00`

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**tz** | Option<**String**> | IANA timezone name, matched case-insensitively. Links and aliases resolve to their canonical zone, so the returned `timezone` can differ (`Europe/Stockholm` returns `Europe/Berlin`, `UTC` returns `Etc/UTC`). `Etc/GMT+5` is UTC-05:00 (POSIX sign). On bulk-capable routes, a comma-separated list enables bulk mode with at most 10 values (any comma, even a trailing one, returns an array); request URLs are limited to 8192 characters. On single-target routes a list is rejected as an invalid timezone. |  |
**ip** | Option<**String**> | IP address. On bulk-capable routes, a comma-separated list enables bulk mode with at most 10 values; request URLs are limited to 8192 characters. |  |
**lat** | Option<**f64**> | Latitude. Must be provided together with `lon`. |  |
**lon** | Option<**f64**> | Longitude. Must be provided together with `lat`. |  |
**offset** | Option<**String**> | Fixed UTC offset in `+HH:MM` or `-HH:MM` format only (`+0530` and `+5` are rejected); URL-encode `+` as `%2B`, since an unencoded `+` is read as a space. An offset target returns `timezone=null`. On bulk-capable routes, a comma-separated list enables bulk mode with at most 10 values; request URLs are limited to 8192 characters. |  |
**auto_tz** | Option<**bool**> | Set to `true` to resolve using the caller IP from Cloudflare headers. Counts as a selector family, so it cannot be combined with `tz`, `ip`, `lat`/`lon` or `offset`. Not supported on `/v1/time/clock`. Enabled by `true`, `1` or `yes` (case-insensitive); any other value leaves it off without an error. |  |
**sign** | Option<**bool**> | Set to `true`, `1` or `yes` (case-insensitive) to ask the gateway to sign the final JSON response. Any other value, a bare `sign`, or repeated `sign` values leave the response unsigned. Every authenticated JSON response, including errors, then includes signing headers. Not supported on `/v1/time/clock`. |  |

### Return type

[**models::GetTimezone200Response**](getTimezone_200_response.md)

### Authorization

[apiKeyHeader](../README.md#apiKeyHeader), [bearerAuth](../README.md#bearerAuth), [apiKeyQuery](../README.md#apiKeyQuery), [rapidApiKey](../README.md#rapidApiKey), [rapidApiHost](../README.md#rapidApiHost)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

