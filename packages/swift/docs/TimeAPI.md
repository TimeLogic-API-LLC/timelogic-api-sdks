# TimeAPI

All URIs are relative to *https://api.timelogicapi.com*

Method | HTTP request | Description
------------- | ------------- | -------------
[**addTime**](TimeAPI.md#addtime) | **GET** /v1/time/add | Add modifiers to a timestamp
[**convertTime**](TimeAPI.md#converttime) | **GET** /v1/time/convert | Convert a timestamp into a target timezone or offset
[**diffTime**](TimeAPI.md#difftime) | **GET** /v1/time/diff | Difference between two instants
[**getCalendar**](TimeAPI.md#getcalendar) | **GET** /v1/time/calendar | Calendar projection for a target instant
[**getClock**](TimeAPI.md#getclock) | **GET** /v1/time/clock | Render a live HTML clock
[**getCurrentTime**](TimeAPI.md#getcurrenttime) | **GET** /v1/time/current | Get the current time for a target
[**getDst**](TimeAPI.md#getdst) | **GET** /v1/time/dst | Daylight-saving status for a target
[**getElapsed**](TimeAPI.md#getelapsed) | **GET** /v1/time/elapsed | Time elapsed since or remaining until a reference instant
[**getTimezone**](TimeAPI.md#gettimezone) | **GET** /v1/timezone | Resolve timezone information for a target


# **addTime**
```swift
    open class func addTime(unix: Int64? = nil, unixMs: Int64? = nil, iso: String? = nil, sourceTz: String? = nil, sourceIp: String? = nil, sourceLat: Double? = nil, sourceLon: Double? = nil, sourceOffset: String? = nil, seconds: Int? = nil, minutes: Int? = nil, hours: Int? = nil, days: Int? = nil, tz: String? = nil, ip: String? = nil, lat: Double? = nil, lon: Double? = nil, offset: String? = nil, autoTz: Bool? = nil, utc: Bool? = nil, format: String? = nil, sign: Bool? = nil, completion: @escaping (_ data: TimePayload?, _ error: Error?) -> Void)
```

Add modifiers to a timestamp

Adds `seconds`, `minutes`, `hours`, and `days` to an optional base timestamp.  Input timestamp forms: - `unix=1711300000` - `unix_ms=1711300000000` - `iso=2026-04-16T09:00:00Z` - `iso=2026-04-16T09:00:00&source_tz=America/New_York` - `iso=2026-04-16T09:00:00&source_ip=8.8.8.8` - `iso=2026-04-16T09:00:00&source_lat=40.7128&source_lon=-74.0060` - `iso=2026-04-16T09:00:00&source_offset=-05:00` - if no input timestamp is provided, the base timestamp defaults to the request time  Modifiers: - `seconds=30` - `minutes=15` - `hours=2` - `days=7`  Target selector forms: - `tz=America/New_York` - `ip=8.8.8.8` - `lat=40.7128&lon=-74.0060` - `offset=-04:00` - `auto_tz=true` - `utc=true`  Incompatible combinations: - at most one input timestamp form - at most one target selector family - use at most one of `source_tz`, `source_ip`, `source_lat`/`source_lon`, or `source_offset` - local-ISO companion selectors are valid only with `iso=...` that has no explicit offset - bulk is not supported on this route  Examples: - `/v1/time/add?iso=2026-04-16T09:00:00&source_tz=America/New_York&days=1&tz=Europe/London` - `/v1/time/add?minutes=30&utc=true`

### Example
```swift
// For support, visit https://github.com/TimeLogic-API-LLC/timelogic-api-sdks/issues
import TimeLogicAPI

let unix = 987 // Int64 | Whole Unix seconds (fractions are rejected; negative values are allowed). Valid range is -62135596800 to 253402300799 (0001-01-01T00:00:00Z to 9999-12-31T23:59:59Z); values outside it return 400 INVALID_TIMESTAMP. (optional)
let unixMs = 987 // Int64 | Whole Unix milliseconds. Valid range -62135596800000 to 253402300799999 (0001-01-01T00:00:00Z to 9999-12-31T23:59:59.999Z); values outside it return 400 INVALID_TIMESTAMP. (optional)
let iso = "iso_example" // String | ISO-8601 timestamp. To supply a local wall-clock time without an explicit offset, pair it with one of `source_tz=Area/City`, `source_ip=...`, `source_lat=...&source_lon=...`, or `source_offset=±HH:MM`; without a hint a local value is read as UTC. Accepted shapes are extended format with `Z`, `±HH:MM` or `±HH:MM:SS` (for example `1900-06-01T12:09:21+00:09:21`, as `iso_local` prints old local-mean-time offsets), optional fractional seconds, a space instead of `T`, a local time, or a date alone (read as 00:00). Basic format and offsets without a colon are rejected. The date must exist (`2027-02-29` returns 400 INVALID_TIMESTAMP rather than rolling over), and the instant must fall between 0001-01-01T00:00:00Z and 9999-12-31T23:59:59Z. A local time inside a spring-forward gap returns 400 INVALID_TIMESTAMP; an ambiguous fall-back time resolves to its first occurrence. (optional)
let sourceTz = "sourceTz_example" // String | Used only with `iso=...` when the ISO value has no explicit offset. (optional)
let sourceIp = "sourceIp_example" // String | Used only with `iso=...` when the ISO value has no explicit offset. Resolves that local wall-clock time through the timezone mapped from this IP address. (optional)
let sourceLat = 987 // Double | Used only with `iso=...` when the ISO value has no explicit offset. Provide together with `source_lon` to resolve that local wall-clock time through the timezone mapped from these coordinates. (optional)
let sourceLon = 987 // Double | Used only with `iso=...` when the ISO value has no explicit offset. Provide together with `source_lat`. (optional)
let sourceOffset = "sourceOffset_example" // String | Used only with `iso=...` when the ISO value has no explicit offset. Interprets that local wall-clock time at this fixed UTC offset. (optional)
let seconds = 987 // Int |  (optional)
let minutes = 987 // Int |  (optional)
let hours = 987 // Int |  (optional)
let days = 987 // Int | Days to add, each exactly 24 hours (86,400 seconds), so the local wall-clock time shifts across a DST change. There are no weeks/months/years modifiers; unknown parameters are ignored. (optional)
let tz = "tz_example" // String | IANA timezone name, matched case-insensitively. Links and aliases resolve to their canonical zone, so the returned `timezone` can differ (`Europe/Stockholm` returns `Europe/Berlin`, `UTC` returns `Etc/UTC`). `Etc/GMT+5` is UTC-05:00 (POSIX sign). On bulk-capable routes, a comma-separated list enables bulk mode with at most 10 values (any comma, even a trailing one, returns an array); request URLs are limited to 8192 characters. On single-target routes a list is rejected as an invalid timezone. (optional)
let ip = "ip_example" // String | IP address. On bulk-capable routes, a comma-separated list enables bulk mode with at most 10 values; request URLs are limited to 8192 characters. (optional)
let lat = 987 // Double | Latitude. Must be provided together with `lon`. (optional)
let lon = 987 // Double | Longitude. Must be provided together with `lat`. (optional)
let offset = "offset_example" // String | Fixed UTC offset in `+HH:MM` or `-HH:MM` format only (`+0530` and `+5` are rejected); URL-encode `+` as `%2B`, since an unencoded `+` is read as a space. An offset target returns `timezone=null`. On bulk-capable routes, a comma-separated list enables bulk mode with at most 10 values; request URLs are limited to 8192 characters. (optional)
let autoTz = true // Bool | Set to `true` to resolve using the caller IP from Cloudflare headers. Counts as a selector family, so it cannot be combined with `tz`, `ip`, `lat`/`lon` or `offset`. Not supported on `/v1/time/clock`. Enabled by `true`, `1` or `yes` (case-insensitive); any other value leaves it off without an error. (optional)
let utc = true // Bool | Set to `true` to force UTC on routes that support it. Counts as a target and cannot be combined with other selectors (the AMBIGUOUS_TARGET message lists only the selector families). The response then has `iso_local=null` and `timezone=null`. Enabled by `true`, `1` or `yes` (case-insensitive); any other value leaves it off without an error. (optional)
let format = "format_example" // String | Custom date/time format template using supported `strftime`-style directives such as `%Y-%m-%d %H:%M:%S`. Supported directives: `%a %A %b %B %C %d %D %e %F %h %H %I %j %k %l %m %M %n %p %P %r %R %s %S %t %T %u %v %w %x %X %y %Y %z %:z %Z %%`, with the `-`, `_` and `0` padding flags on numeric directives. `%Z` prints the IANA zone name (or `UTC+HH:MM` for an offset target, `UTC` with no target), not an abbreviation. Any other directive (for example `%U`, `%f`, `%Q`) or a trailing `%` returns 400 INVALID_PARAMETER naming the directive. (optional)
let sign = true // Bool | Set to `true`, `1` or `yes` (case-insensitive) to ask the gateway to sign the final JSON response. Any other value, a bare `sign`, or repeated `sign` values leave the response unsigned. Every authenticated JSON response, including errors, then includes signing headers. Not supported on `/v1/time/clock`. (optional)

// Add modifiers to a timestamp
TimeAPI.addTime(unix: unix, unixMs: unixMs, iso: iso, sourceTz: sourceTz, sourceIp: sourceIp, sourceLat: sourceLat, sourceLon: sourceLon, sourceOffset: sourceOffset, seconds: seconds, minutes: minutes, hours: hours, days: days, tz: tz, ip: ip, lat: lat, lon: lon, offset: offset, autoTz: autoTz, utc: utc, format: format, sign: sign) { (response, error) in
    guard error == nil else {
        print(error)
        return
    }

    if (response) {
        dump(response)
    }
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **unix** | **Int64** | Whole Unix seconds (fractions are rejected; negative values are allowed). Valid range is -62135596800 to 253402300799 (0001-01-01T00:00:00Z to 9999-12-31T23:59:59Z); values outside it return 400 INVALID_TIMESTAMP. | [optional]
 **unixMs** | **Int64** | Whole Unix milliseconds. Valid range -62135596800000 to 253402300799999 (0001-01-01T00:00:00Z to 9999-12-31T23:59:59.999Z); values outside it return 400 INVALID_TIMESTAMP. | [optional]
 **iso** | **String** | ISO-8601 timestamp. To supply a local wall-clock time without an explicit offset, pair it with one of &#x60;source_tz&#x3D;Area/City&#x60;, &#x60;source_ip&#x3D;...&#x60;, &#x60;source_lat&#x3D;...&amp;source_lon&#x3D;...&#x60;, or &#x60;source_offset&#x3D;±HH:MM&#x60;; without a hint a local value is read as UTC. Accepted shapes are extended format with &#x60;Z&#x60;, &#x60;±HH:MM&#x60; or &#x60;±HH:MM:SS&#x60; (for example &#x60;1900-06-01T12:09:21+00:09:21&#x60;, as &#x60;iso_local&#x60; prints old local-mean-time offsets), optional fractional seconds, a space instead of &#x60;T&#x60;, a local time, or a date alone (read as 00:00). Basic format and offsets without a colon are rejected. The date must exist (&#x60;2027-02-29&#x60; returns 400 INVALID_TIMESTAMP rather than rolling over), and the instant must fall between 0001-01-01T00:00:00Z and 9999-12-31T23:59:59Z. A local time inside a spring-forward gap returns 400 INVALID_TIMESTAMP; an ambiguous fall-back time resolves to its first occurrence. | [optional]
 **sourceTz** | **String** | Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. | [optional]
 **sourceIp** | **String** | Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Resolves that local wall-clock time through the timezone mapped from this IP address. | [optional]
 **sourceLat** | **Double** | Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Provide together with &#x60;source_lon&#x60; to resolve that local wall-clock time through the timezone mapped from these coordinates. | [optional]
 **sourceLon** | **Double** | Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Provide together with &#x60;source_lat&#x60;. | [optional]
 **sourceOffset** | **String** | Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Interprets that local wall-clock time at this fixed UTC offset. | [optional]
 **seconds** | **Int** |  | [optional]
 **minutes** | **Int** |  | [optional]
 **hours** | **Int** |  | [optional]
 **days** | **Int** | Days to add, each exactly 24 hours (86,400 seconds), so the local wall-clock time shifts across a DST change. There are no weeks/months/years modifiers; unknown parameters are ignored. | [optional]
 **tz** | **String** | IANA timezone name, matched case-insensitively. Links and aliases resolve to their canonical zone, so the returned &#x60;timezone&#x60; can differ (&#x60;Europe/Stockholm&#x60; returns &#x60;Europe/Berlin&#x60;, &#x60;UTC&#x60; returns &#x60;Etc/UTC&#x60;). &#x60;Etc/GMT+5&#x60; is UTC-05:00 (POSIX sign). On bulk-capable routes, a comma-separated list enables bulk mode with at most 10 values (any comma, even a trailing one, returns an array); request URLs are limited to 8192 characters. On single-target routes a list is rejected as an invalid timezone. | [optional]
 **ip** | **String** | IP address. On bulk-capable routes, a comma-separated list enables bulk mode with at most 10 values; request URLs are limited to 8192 characters. | [optional]
 **lat** | **Double** | Latitude. Must be provided together with &#x60;lon&#x60;. | [optional]
 **lon** | **Double** | Longitude. Must be provided together with &#x60;lat&#x60;. | [optional]
 **offset** | **String** | Fixed UTC offset in &#x60;+HH:MM&#x60; or &#x60;-HH:MM&#x60; format only (&#x60;+0530&#x60; and &#x60;+5&#x60; are rejected); URL-encode &#x60;+&#x60; as &#x60;%2B&#x60;, since an unencoded &#x60;+&#x60; is read as a space. An offset target returns &#x60;timezone&#x3D;null&#x60;. On bulk-capable routes, a comma-separated list enables bulk mode with at most 10 values; request URLs are limited to 8192 characters. | [optional]
 **autoTz** | **Bool** | Set to &#x60;true&#x60; to resolve using the caller IP from Cloudflare headers. Counts as a selector family, so it cannot be combined with &#x60;tz&#x60;, &#x60;ip&#x60;, &#x60;lat&#x60;/&#x60;lon&#x60; or &#x60;offset&#x60;. Not supported on &#x60;/v1/time/clock&#x60;. Enabled by &#x60;true&#x60;, &#x60;1&#x60; or &#x60;yes&#x60; (case-insensitive); any other value leaves it off without an error. | [optional]
 **utc** | **Bool** | Set to &#x60;true&#x60; to force UTC on routes that support it. Counts as a target and cannot be combined with other selectors (the AMBIGUOUS_TARGET message lists only the selector families). The response then has &#x60;iso_local&#x3D;null&#x60; and &#x60;timezone&#x3D;null&#x60;. Enabled by &#x60;true&#x60;, &#x60;1&#x60; or &#x60;yes&#x60; (case-insensitive); any other value leaves it off without an error. | [optional]
 **format** | **String** | Custom date/time format template using supported &#x60;strftime&#x60;-style directives such as &#x60;%Y-%m-%d %H:%M:%S&#x60;. Supported directives: &#x60;%a %A %b %B %C %d %D %e %F %h %H %I %j %k %l %m %M %n %p %P %r %R %s %S %t %T %u %v %w %x %X %y %Y %z %:z %Z %%&#x60;, with the &#x60;-&#x60;, &#x60;_&#x60; and &#x60;0&#x60; padding flags on numeric directives. &#x60;%Z&#x60; prints the IANA zone name (or &#x60;UTC+HH:MM&#x60; for an offset target, &#x60;UTC&#x60; with no target), not an abbreviation. Any other directive (for example &#x60;%U&#x60;, &#x60;%f&#x60;, &#x60;%Q&#x60;) or a trailing &#x60;%&#x60; returns 400 INVALID_PARAMETER naming the directive. | [optional]
 **sign** | **Bool** | Set to &#x60;true&#x60;, &#x60;1&#x60; or &#x60;yes&#x60; (case-insensitive) to ask the gateway to sign the final JSON response. Any other value, a bare &#x60;sign&#x60;, or repeated &#x60;sign&#x60; values leave the response unsigned. Every authenticated JSON response, including errors, then includes signing headers. Not supported on &#x60;/v1/time/clock&#x60;. | [optional]

### Return type

[**TimePayload**](TimePayload.md)

### Authorization

[apiKeyHeader](../README.md#apiKeyHeader), [bearerAuth](../README.md#bearerAuth), [apiKeyQuery](../README.md#apiKeyQuery), [rapidApiKey](../README.md#rapidApiKey), [rapidApiHost](../README.md#rapidApiHost)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **convertTime**
```swift
    open class func convertTime(unix: Int64? = nil, unixMs: Int64? = nil, iso: String? = nil, sourceTz: String? = nil, sourceIp: String? = nil, sourceLat: Double? = nil, sourceLon: Double? = nil, sourceOffset: String? = nil, tz: String? = nil, ip: String? = nil, lat: Double? = nil, lon: Double? = nil, offset: String? = nil, autoTz: Bool? = nil, utc: Bool? = nil, format: String? = nil, sign: Bool? = nil, completion: @escaping (_ data: GetCurrentTime200Response?, _ error: Error?) -> Void)
```

Convert a timestamp into a target timezone or offset

Converts one required input timestamp into a single target or a bulk array.  Input timestamp forms: - `unix=1711300000` - `unix_ms=1711300000000` - `iso=2026-04-16T09:00:00Z` - `iso=2026-04-16T09:00:00&source_tz=America/New_York` - `iso=2026-04-16T09:00:00&source_ip=8.8.8.8` - `iso=2026-04-16T09:00:00&source_lat=40.7128&source_lon=-74.0060` - `iso=2026-04-16T09:00:00&source_offset=-05:00`  Target selector forms: - `tz=America/New_York` - `ip=8.8.8.8` - `lat=40.7128&lon=-74.0060` - `offset=-04:00` - `auto_tz=true` - `utc=true`  Incompatible combinations: - exactly one input timestamp form - exactly one target selector family - use at most one of `source_tz`, `source_ip`, `source_lat`/`source_lon`, or `source_offset` - local-ISO companion selectors are valid only with `iso=...` that has no explicit offset - bulk is allowed only through one comma-separated `tz`, `ip`, or `offset` selector with at most 10 values  Examples: - Single target: `/v1/time/convert?iso=2026-04-16T09:00:00&source_tz=America/New_York&tz=Europe/London` - Bulk target set: `/v1/time/convert?unix=1711300000&offset=-04:00,+00:00,+09:00`

### Example
```swift
// For support, visit https://github.com/TimeLogic-API-LLC/timelogic-api-sdks/issues
import TimeLogicAPI

let unix = 987 // Int64 | Whole Unix seconds (fractions are rejected; negative values are allowed). Valid range is -62135596800 to 253402300799 (0001-01-01T00:00:00Z to 9999-12-31T23:59:59Z); values outside it return 400 INVALID_TIMESTAMP. (optional)
let unixMs = 987 // Int64 | Whole Unix milliseconds. Valid range -62135596800000 to 253402300799999 (0001-01-01T00:00:00Z to 9999-12-31T23:59:59.999Z); values outside it return 400 INVALID_TIMESTAMP. (optional)
let iso = "iso_example" // String | ISO-8601 timestamp. To supply a local wall-clock time without an explicit offset, pair it with one of `source_tz=Area/City`, `source_ip=...`, `source_lat=...&source_lon=...`, or `source_offset=±HH:MM`; without a hint a local value is read as UTC. Accepted shapes are extended format with `Z`, `±HH:MM` or `±HH:MM:SS` (for example `1900-06-01T12:09:21+00:09:21`, as `iso_local` prints old local-mean-time offsets), optional fractional seconds, a space instead of `T`, a local time, or a date alone (read as 00:00). Basic format and offsets without a colon are rejected. The date must exist (`2027-02-29` returns 400 INVALID_TIMESTAMP rather than rolling over), and the instant must fall between 0001-01-01T00:00:00Z and 9999-12-31T23:59:59Z. A local time inside a spring-forward gap returns 400 INVALID_TIMESTAMP; an ambiguous fall-back time resolves to its first occurrence. (optional)
let sourceTz = "sourceTz_example" // String | Used only with `iso=...` when the ISO value has no explicit offset. (optional)
let sourceIp = "sourceIp_example" // String | Used only with `iso=...` when the ISO value has no explicit offset. Resolves that local wall-clock time through the timezone mapped from this IP address. (optional)
let sourceLat = 987 // Double | Used only with `iso=...` when the ISO value has no explicit offset. Provide together with `source_lon` to resolve that local wall-clock time through the timezone mapped from these coordinates. (optional)
let sourceLon = 987 // Double | Used only with `iso=...` when the ISO value has no explicit offset. Provide together with `source_lat`. (optional)
let sourceOffset = "sourceOffset_example" // String | Used only with `iso=...` when the ISO value has no explicit offset. Interprets that local wall-clock time at this fixed UTC offset. (optional)
let tz = "tz_example" // String | IANA timezone name, matched case-insensitively. Links and aliases resolve to their canonical zone, so the returned `timezone` can differ (`Europe/Stockholm` returns `Europe/Berlin`, `UTC` returns `Etc/UTC`). `Etc/GMT+5` is UTC-05:00 (POSIX sign). On bulk-capable routes, a comma-separated list enables bulk mode with at most 10 values (any comma, even a trailing one, returns an array); request URLs are limited to 8192 characters. On single-target routes a list is rejected as an invalid timezone. (optional)
let ip = "ip_example" // String | IP address. On bulk-capable routes, a comma-separated list enables bulk mode with at most 10 values; request URLs are limited to 8192 characters. (optional)
let lat = 987 // Double | Latitude. Must be provided together with `lon`. (optional)
let lon = 987 // Double | Longitude. Must be provided together with `lat`. (optional)
let offset = "offset_example" // String | Fixed UTC offset in `+HH:MM` or `-HH:MM` format only (`+0530` and `+5` are rejected); URL-encode `+` as `%2B`, since an unencoded `+` is read as a space. An offset target returns `timezone=null`. On bulk-capable routes, a comma-separated list enables bulk mode with at most 10 values; request URLs are limited to 8192 characters. (optional)
let autoTz = true // Bool | Set to `true` to resolve using the caller IP from Cloudflare headers. Counts as a selector family, so it cannot be combined with `tz`, `ip`, `lat`/`lon` or `offset`. Not supported on `/v1/time/clock`. Enabled by `true`, `1` or `yes` (case-insensitive); any other value leaves it off without an error. (optional)
let utc = true // Bool | Set to `true` to force UTC on routes that support it. Counts as a target and cannot be combined with other selectors (the AMBIGUOUS_TARGET message lists only the selector families). The response then has `iso_local=null` and `timezone=null`. Enabled by `true`, `1` or `yes` (case-insensitive); any other value leaves it off without an error. (optional)
let format = "format_example" // String | Custom date/time format template using supported `strftime`-style directives such as `%Y-%m-%d %H:%M:%S`. Supported directives: `%a %A %b %B %C %d %D %e %F %h %H %I %j %k %l %m %M %n %p %P %r %R %s %S %t %T %u %v %w %x %X %y %Y %z %:z %Z %%`, with the `-`, `_` and `0` padding flags on numeric directives. `%Z` prints the IANA zone name (or `UTC+HH:MM` for an offset target, `UTC` with no target), not an abbreviation. Any other directive (for example `%U`, `%f`, `%Q`) or a trailing `%` returns 400 INVALID_PARAMETER naming the directive. (optional)
let sign = true // Bool | Set to `true`, `1` or `yes` (case-insensitive) to ask the gateway to sign the final JSON response. Any other value, a bare `sign`, or repeated `sign` values leave the response unsigned. Every authenticated JSON response, including errors, then includes signing headers. Not supported on `/v1/time/clock`. (optional)

// Convert a timestamp into a target timezone or offset
TimeAPI.convertTime(unix: unix, unixMs: unixMs, iso: iso, sourceTz: sourceTz, sourceIp: sourceIp, sourceLat: sourceLat, sourceLon: sourceLon, sourceOffset: sourceOffset, tz: tz, ip: ip, lat: lat, lon: lon, offset: offset, autoTz: autoTz, utc: utc, format: format, sign: sign) { (response, error) in
    guard error == nil else {
        print(error)
        return
    }

    if (response) {
        dump(response)
    }
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **unix** | **Int64** | Whole Unix seconds (fractions are rejected; negative values are allowed). Valid range is -62135596800 to 253402300799 (0001-01-01T00:00:00Z to 9999-12-31T23:59:59Z); values outside it return 400 INVALID_TIMESTAMP. | [optional]
 **unixMs** | **Int64** | Whole Unix milliseconds. Valid range -62135596800000 to 253402300799999 (0001-01-01T00:00:00Z to 9999-12-31T23:59:59.999Z); values outside it return 400 INVALID_TIMESTAMP. | [optional]
 **iso** | **String** | ISO-8601 timestamp. To supply a local wall-clock time without an explicit offset, pair it with one of &#x60;source_tz&#x3D;Area/City&#x60;, &#x60;source_ip&#x3D;...&#x60;, &#x60;source_lat&#x3D;...&amp;source_lon&#x3D;...&#x60;, or &#x60;source_offset&#x3D;±HH:MM&#x60;; without a hint a local value is read as UTC. Accepted shapes are extended format with &#x60;Z&#x60;, &#x60;±HH:MM&#x60; or &#x60;±HH:MM:SS&#x60; (for example &#x60;1900-06-01T12:09:21+00:09:21&#x60;, as &#x60;iso_local&#x60; prints old local-mean-time offsets), optional fractional seconds, a space instead of &#x60;T&#x60;, a local time, or a date alone (read as 00:00). Basic format and offsets without a colon are rejected. The date must exist (&#x60;2027-02-29&#x60; returns 400 INVALID_TIMESTAMP rather than rolling over), and the instant must fall between 0001-01-01T00:00:00Z and 9999-12-31T23:59:59Z. A local time inside a spring-forward gap returns 400 INVALID_TIMESTAMP; an ambiguous fall-back time resolves to its first occurrence. | [optional]
 **sourceTz** | **String** | Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. | [optional]
 **sourceIp** | **String** | Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Resolves that local wall-clock time through the timezone mapped from this IP address. | [optional]
 **sourceLat** | **Double** | Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Provide together with &#x60;source_lon&#x60; to resolve that local wall-clock time through the timezone mapped from these coordinates. | [optional]
 **sourceLon** | **Double** | Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Provide together with &#x60;source_lat&#x60;. | [optional]
 **sourceOffset** | **String** | Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Interprets that local wall-clock time at this fixed UTC offset. | [optional]
 **tz** | **String** | IANA timezone name, matched case-insensitively. Links and aliases resolve to their canonical zone, so the returned &#x60;timezone&#x60; can differ (&#x60;Europe/Stockholm&#x60; returns &#x60;Europe/Berlin&#x60;, &#x60;UTC&#x60; returns &#x60;Etc/UTC&#x60;). &#x60;Etc/GMT+5&#x60; is UTC-05:00 (POSIX sign). On bulk-capable routes, a comma-separated list enables bulk mode with at most 10 values (any comma, even a trailing one, returns an array); request URLs are limited to 8192 characters. On single-target routes a list is rejected as an invalid timezone. | [optional]
 **ip** | **String** | IP address. On bulk-capable routes, a comma-separated list enables bulk mode with at most 10 values; request URLs are limited to 8192 characters. | [optional]
 **lat** | **Double** | Latitude. Must be provided together with &#x60;lon&#x60;. | [optional]
 **lon** | **Double** | Longitude. Must be provided together with &#x60;lat&#x60;. | [optional]
 **offset** | **String** | Fixed UTC offset in &#x60;+HH:MM&#x60; or &#x60;-HH:MM&#x60; format only (&#x60;+0530&#x60; and &#x60;+5&#x60; are rejected); URL-encode &#x60;+&#x60; as &#x60;%2B&#x60;, since an unencoded &#x60;+&#x60; is read as a space. An offset target returns &#x60;timezone&#x3D;null&#x60;. On bulk-capable routes, a comma-separated list enables bulk mode with at most 10 values; request URLs are limited to 8192 characters. | [optional]
 **autoTz** | **Bool** | Set to &#x60;true&#x60; to resolve using the caller IP from Cloudflare headers. Counts as a selector family, so it cannot be combined with &#x60;tz&#x60;, &#x60;ip&#x60;, &#x60;lat&#x60;/&#x60;lon&#x60; or &#x60;offset&#x60;. Not supported on &#x60;/v1/time/clock&#x60;. Enabled by &#x60;true&#x60;, &#x60;1&#x60; or &#x60;yes&#x60; (case-insensitive); any other value leaves it off without an error. | [optional]
 **utc** | **Bool** | Set to &#x60;true&#x60; to force UTC on routes that support it. Counts as a target and cannot be combined with other selectors (the AMBIGUOUS_TARGET message lists only the selector families). The response then has &#x60;iso_local&#x3D;null&#x60; and &#x60;timezone&#x3D;null&#x60;. Enabled by &#x60;true&#x60;, &#x60;1&#x60; or &#x60;yes&#x60; (case-insensitive); any other value leaves it off without an error. | [optional]
 **format** | **String** | Custom date/time format template using supported &#x60;strftime&#x60;-style directives such as &#x60;%Y-%m-%d %H:%M:%S&#x60;. Supported directives: &#x60;%a %A %b %B %C %d %D %e %F %h %H %I %j %k %l %m %M %n %p %P %r %R %s %S %t %T %u %v %w %x %X %y %Y %z %:z %Z %%&#x60;, with the &#x60;-&#x60;, &#x60;_&#x60; and &#x60;0&#x60; padding flags on numeric directives. &#x60;%Z&#x60; prints the IANA zone name (or &#x60;UTC+HH:MM&#x60; for an offset target, &#x60;UTC&#x60; with no target), not an abbreviation. Any other directive (for example &#x60;%U&#x60;, &#x60;%f&#x60;, &#x60;%Q&#x60;) or a trailing &#x60;%&#x60; returns 400 INVALID_PARAMETER naming the directive. | [optional]
 **sign** | **Bool** | Set to &#x60;true&#x60;, &#x60;1&#x60; or &#x60;yes&#x60; (case-insensitive) to ask the gateway to sign the final JSON response. Any other value, a bare &#x60;sign&#x60;, or repeated &#x60;sign&#x60; values leave the response unsigned. Every authenticated JSON response, including errors, then includes signing headers. Not supported on &#x60;/v1/time/clock&#x60;. | [optional]

### Return type

[**GetCurrentTime200Response**](GetCurrentTime200Response.md)

### Authorization

[apiKeyHeader](../README.md#apiKeyHeader), [bearerAuth](../README.md#bearerAuth), [apiKeyQuery](../README.md#apiKeyQuery), [rapidApiKey](../README.md#rapidApiKey), [rapidApiHost](../README.md#rapidApiHost)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **diffTime**
```swift
    open class func diffTime(from: String, to: String, fromTz: String? = nil, fromIp: String? = nil, fromLat: Double? = nil, fromLon: Double? = nil, fromOffset: String? = nil, toTz: String? = nil, toIp: String? = nil, toLat: Double? = nil, toLon: Double? = nil, toOffset: String? = nil, format: String? = nil, businessDays: Bool? = nil, holidayCountry: String? = nil, holidaySubdivision: String? = nil, sign: Bool? = nil, completion: @escaping (_ data: DiffResponse?, _ error: Error?) -> Void)
```

Difference between two instants

Computes the duration between `from` and `to`.  Required query fields: `from` and `to` only. Do not send every optional companion field. For each side, choose one supported specifier form. A `from_*` or `to_*` companion is allowed only when that side uses `iso=...` with no explicit offset; use at most one companion selector, except that coordinate input requires its paired latitude and longitude.  `from` and `to` are embedded specifier strings.  Accepted specifier forms: - `from=now` - `from=unix=1711300000` - `from=unix_ms=1711300000000` - `from=iso=2026-04-16T09:00:00` - `from=tz=America/New_York` - `from=ip=8.8.8.8` - `from=offset=-05:00` - the same forms are accepted for `to`  Timezone hint pairings: - `from_tz` only with `from=iso=...` that has no explicit offset - `from_ip`, `from_lat`/`from_lon`, and `from_offset` only with `from=iso=...` that has no explicit offset - `to_tz` only with `to=iso=...` that has no explicit offset - `to_ip`, `to_lat`/`to_lon`, and `to_offset` only with `to=iso=...` that has no explicit offset  Selector semantics: - `tz=...`, `ip=...`, and `offset=...` inside `from` or `to` mean the current request-time instant resolved through that selector - those selector forms do not represent an arbitrary local wall-clock time - returned duration magnitudes are absolute; use `direction` to see whether `to` is after, before, or the same instant as `from` - because \"now\" is the same instant in every zone, `tz=`, `ip=` and `offset=` specifiers never change `seconds` or `direction`; their zone only picks the calendar date for business days - coordinates are not a specifier (`from=lat=...` returns \"Unsupported time specifier.\"); use `from_lat`/`from_lon` as a hint for a local `iso` - `seconds`, `minutes`, `hours`, `days` and the `format` placeholders are totals in each unit, not remainders; `human` is always written in hours, minutes and seconds  Business-day rules: - `holiday_country` and `holiday_subdivision` require `business_days=true` - `holiday_subdivision` also requires `holiday_country` - days are counted by calendar date, start included and end excluded, unsigned - each side's date is taken in its zone when known (a `from_*`/`to_*` hint, or a `tz=`/`ip=`/`offset=` specifier), otherwise in UTC - example: `from=iso=2026-01-02T00:00:00Z&to=iso=2026-04-30T00:00:00Z&business_days=true&holiday_country=FR` returns `business_days: 83` - weekends follow the holiday calendar's country (Friday/Saturday for `SA`); a subdivision uses its country's weekend - example with a subdivision: `from=iso=2026-01-02T00:00:00Z&to=iso=2026-04-30T00:00:00Z&business_days=true&holiday_country=CH&holiday_subdivision=ZH` returns `business_days: 82` (`holiday_country=CH-ZH` is the same calendar) - example with a Friday/Saturday weekend: the same range with `holiday_country=SA` returns `business_days: 79`  Examples: - Selector-current instant: `/v1/time/diff?from=unix=1711300000&to=now` - Wall-clock pairing: `/v1/time/diff?from=iso=2026-04-16T09:00:00&from_tz=America/New_York&to=iso=2026-04-16T09:00:00&to_tz=Europe/London` - Wall-clock via selector: `/v1/time/diff?from=iso=2026-01-01T12:00:00&from_ip=8.8.8.8&to=iso=2026-01-01T12:00:00&to_offset=-05:00`

### Example
```swift
// For support, visit https://github.com/TimeLogic-API-LLC/timelogic-api-sdks/issues
import TimeLogicAPI

let from = "from_example" // String | Time specifier. Supported forms are `now`, `unix=<seconds>`, `unix_ms=<milliseconds>`, `iso=<ISO-8601>`, `offset=±HH:MM`, `tz=<IANA timezone>`, and `ip=<IP address>`. For `tz=...`, `ip=...`, and `offset=...`, the specifier means the current request-time instant resolved through that selector. To express a local wall-clock time, use `from=iso=...` together with one of `from_tz`, `from_ip`, `from_lat`+`from_lon`, or `from_offset`.
let to = "to_example" // String | Time specifier. Supported forms are `now`, `unix=<seconds>`, `unix_ms=<milliseconds>`, `iso=<ISO-8601>`, `offset=±HH:MM`, `tz=<IANA timezone>`, and `ip=<IP address>`. For `tz=...`, `ip=...`, and `offset=...`, the specifier means the current request-time instant resolved through that selector. To express a local wall-clock time, use `to=iso=...` together with one of `to_tz`, `to_ip`, `to_lat`+`to_lon`, or `to_offset`.
let fromTz = "fromTz_example" // String | Used only with `from=iso=...` when the ISO value has no explicit offset. (optional)
let fromIp = "fromIp_example" // String | Used only with `from=iso=...` when the ISO value has no explicit offset. Resolves that local wall-clock time through the timezone mapped from this IP address. (optional)
let fromLat = 987 // Double | Used only with `from=iso=...` when the ISO value has no explicit offset. Provide together with `from_lon` to resolve that local wall-clock time through the timezone mapped from these coordinates. (optional)
let fromLon = 987 // Double | Used only with `from=iso=...` when the ISO value has no explicit offset. Provide together with `from_lat`. (optional)
let fromOffset = "fromOffset_example" // String | Used only with `from=iso=...` when the ISO value has no explicit offset. Interprets that local wall-clock time at this fixed UTC offset. (optional)
let toTz = "toTz_example" // String | Used only with `to=iso=...` when the ISO value has no explicit offset. (optional)
let toIp = "toIp_example" // String | Used only with `to=iso=...` when the ISO value has no explicit offset. Resolves that local wall-clock time through the timezone mapped from this IP address. (optional)
let toLat = 987 // Double | Used only with `to=iso=...` when the ISO value has no explicit offset. Provide together with `to_lon` to resolve that local wall-clock time through the timezone mapped from these coordinates. (optional)
let toLon = 987 // Double | Used only with `to=iso=...` when the ISO value has no explicit offset. Provide together with `to_lat`. (optional)
let toOffset = "toOffset_example" // String | Used only with `to=iso=...` when the ISO value has no explicit offset. Interprets that local wall-clock time at this fixed UTC offset. (optional)
let format = "format_example" // String | Custom duration format template using `%days`, `%hours`, `%minutes`, and `%seconds`. Each placeholder is the total duration in that unit, not a remainder (118 days renders `%days days %hours hours` as `118 days 2832 hours`). (optional)
let businessDays = true // Bool | Set to `true` to add a `business_days` count. Days are counted by calendar date, start included and end excluded, unsigned; weekends follow the holiday calendar's country (Saturday/Sunday in 221 countries, Friday/Saturday in 18 such as SA, Sunday only in 8, Friday only in IR, Friday/Sunday in BN; Saturday/Sunday when no `holiday_country` is given) and holidays of the chosen calendar are skipped. Each endpoint's date is taken in its own zone when one is known (diff - from_*_/to_* hints or a tz=/ip=/offset= specifier; elapsed - source_*_/compare_source_*), otherwise in UTC. Enabled by `true`, `1` or `yes` (case-insensitive); any other value leaves it off without an error. (optional)
let holidayCountry = "holidayCountry_example" // String | Holiday calendar: one of the 249 countries with holiday calendars (862 calendars including subdivisions, years 1900-2100), as an ISO 3166-1 alpha-2 code in any letter case, or a combined ISO 3166-2 style code such as `CH-ZH`, `US-CA` or `FR-6AE`. Requires `business_days=true`. The full list is at https://timelogicapi.com/docs#holiday-calendars and, as JSON, at https://timelogicapi.com/content/holiday-calendars.json. Any other country (for example `LK`) returns 400 INVALID_PARAMETER \"Unsupported holiday calendar.\"; a malformed value returns \"Invalid holiday_country parameter.\"; a business-day range outside 1900-2100 returns \"Holiday calendar coverage is only available for years 1900-2100.\" (optional)
let holidaySubdivision = "holidaySubdivision_example" // String | Holiday calendar subdivision code for the country (the ISO 3166-2 suffix, 1-3 letters or digits, any letter case), for example `ENG` (GB), `ZH` (CH), `MH` (IN), `01` (FI) or `6AE` (FR); digits and leading zeros are part of the code. Subdivisions exist for 35 countries. Requires `holiday_country` and `business_days=true`. An unknown code returns 400 INVALID_PARAMETER \"Unknown holiday_subdivision 'XX' for country DE.\" (also for `FI` + `1`, which must be `01`); a value that conflicts with a combined `holiday_country` such as `US-CA` returns 400 INVALID_PARAMETER. (optional)
let sign = true // Bool | Set to `true`, `1` or `yes` (case-insensitive) to ask the gateway to sign the final JSON response. Any other value, a bare `sign`, or repeated `sign` values leave the response unsigned. Every authenticated JSON response, including errors, then includes signing headers. Not supported on `/v1/time/clock`. (optional)

// Difference between two instants
TimeAPI.diffTime(from: from, to: to, fromTz: fromTz, fromIp: fromIp, fromLat: fromLat, fromLon: fromLon, fromOffset: fromOffset, toTz: toTz, toIp: toIp, toLat: toLat, toLon: toLon, toOffset: toOffset, format: format, businessDays: businessDays, holidayCountry: holidayCountry, holidaySubdivision: holidaySubdivision, sign: sign) { (response, error) in
    guard error == nil else {
        print(error)
        return
    }

    if (response) {
        dump(response)
    }
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **from** | **String** | Time specifier. Supported forms are &#x60;now&#x60;, &#x60;unix&#x3D;&lt;seconds&gt;&#x60;, &#x60;unix_ms&#x3D;&lt;milliseconds&gt;&#x60;, &#x60;iso&#x3D;&lt;ISO-8601&gt;&#x60;, &#x60;offset&#x3D;±HH:MM&#x60;, &#x60;tz&#x3D;&lt;IANA timezone&gt;&#x60;, and &#x60;ip&#x3D;&lt;IP address&gt;&#x60;. For &#x60;tz&#x3D;...&#x60;, &#x60;ip&#x3D;...&#x60;, and &#x60;offset&#x3D;...&#x60;, the specifier means the current request-time instant resolved through that selector. To express a local wall-clock time, use &#x60;from&#x3D;iso&#x3D;...&#x60; together with one of &#x60;from_tz&#x60;, &#x60;from_ip&#x60;, &#x60;from_lat&#x60;+&#x60;from_lon&#x60;, or &#x60;from_offset&#x60;. |
 **to** | **String** | Time specifier. Supported forms are &#x60;now&#x60;, &#x60;unix&#x3D;&lt;seconds&gt;&#x60;, &#x60;unix_ms&#x3D;&lt;milliseconds&gt;&#x60;, &#x60;iso&#x3D;&lt;ISO-8601&gt;&#x60;, &#x60;offset&#x3D;±HH:MM&#x60;, &#x60;tz&#x3D;&lt;IANA timezone&gt;&#x60;, and &#x60;ip&#x3D;&lt;IP address&gt;&#x60;. For &#x60;tz&#x3D;...&#x60;, &#x60;ip&#x3D;...&#x60;, and &#x60;offset&#x3D;...&#x60;, the specifier means the current request-time instant resolved through that selector. To express a local wall-clock time, use &#x60;to&#x3D;iso&#x3D;...&#x60; together with one of &#x60;to_tz&#x60;, &#x60;to_ip&#x60;, &#x60;to_lat&#x60;+&#x60;to_lon&#x60;, or &#x60;to_offset&#x60;. |
 **fromTz** | **String** | Used only with &#x60;from&#x3D;iso&#x3D;...&#x60; when the ISO value has no explicit offset. | [optional]
 **fromIp** | **String** | Used only with &#x60;from&#x3D;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Resolves that local wall-clock time through the timezone mapped from this IP address. | [optional]
 **fromLat** | **Double** | Used only with &#x60;from&#x3D;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Provide together with &#x60;from_lon&#x60; to resolve that local wall-clock time through the timezone mapped from these coordinates. | [optional]
 **fromLon** | **Double** | Used only with &#x60;from&#x3D;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Provide together with &#x60;from_lat&#x60;. | [optional]
 **fromOffset** | **String** | Used only with &#x60;from&#x3D;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Interprets that local wall-clock time at this fixed UTC offset. | [optional]
 **toTz** | **String** | Used only with &#x60;to&#x3D;iso&#x3D;...&#x60; when the ISO value has no explicit offset. | [optional]
 **toIp** | **String** | Used only with &#x60;to&#x3D;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Resolves that local wall-clock time through the timezone mapped from this IP address. | [optional]
 **toLat** | **Double** | Used only with &#x60;to&#x3D;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Provide together with &#x60;to_lon&#x60; to resolve that local wall-clock time through the timezone mapped from these coordinates. | [optional]
 **toLon** | **Double** | Used only with &#x60;to&#x3D;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Provide together with &#x60;to_lat&#x60;. | [optional]
 **toOffset** | **String** | Used only with &#x60;to&#x3D;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Interprets that local wall-clock time at this fixed UTC offset. | [optional]
 **format** | **String** | Custom duration format template using &#x60;%days&#x60;, &#x60;%hours&#x60;, &#x60;%minutes&#x60;, and &#x60;%seconds&#x60;. Each placeholder is the total duration in that unit, not a remainder (118 days renders &#x60;%days days %hours hours&#x60; as &#x60;118 days 2832 hours&#x60;). | [optional]
 **businessDays** | **Bool** | Set to &#x60;true&#x60; to add a &#x60;business_days&#x60; count. Days are counted by calendar date, start included and end excluded, unsigned; weekends follow the holiday calendar&#39;s country (Saturday/Sunday in 221 countries, Friday/Saturday in 18 such as SA, Sunday only in 8, Friday only in IR, Friday/Sunday in BN; Saturday/Sunday when no &#x60;holiday_country&#x60; is given) and holidays of the chosen calendar are skipped. Each endpoint&#39;s date is taken in its own zone when one is known (diff - from_*_/to_* hints or a tz&#x3D;/ip&#x3D;/offset&#x3D; specifier; elapsed - source_*_/compare_source_*), otherwise in UTC. Enabled by &#x60;true&#x60;, &#x60;1&#x60; or &#x60;yes&#x60; (case-insensitive); any other value leaves it off without an error. | [optional]
 **holidayCountry** | **String** | Holiday calendar: one of the 249 countries with holiday calendars (862 calendars including subdivisions, years 1900-2100), as an ISO 3166-1 alpha-2 code in any letter case, or a combined ISO 3166-2 style code such as &#x60;CH-ZH&#x60;, &#x60;US-CA&#x60; or &#x60;FR-6AE&#x60;. Requires &#x60;business_days&#x3D;true&#x60;. The full list is at https://timelogicapi.com/docs#holiday-calendars and, as JSON, at https://timelogicapi.com/content/holiday-calendars.json. Any other country (for example &#x60;LK&#x60;) returns 400 INVALID_PARAMETER \&quot;Unsupported holiday calendar.\&quot;; a malformed value returns \&quot;Invalid holiday_country parameter.\&quot;; a business-day range outside 1900-2100 returns \&quot;Holiday calendar coverage is only available for years 1900-2100.\&quot; | [optional]
 **holidaySubdivision** | **String** | Holiday calendar subdivision code for the country (the ISO 3166-2 suffix, 1-3 letters or digits, any letter case), for example &#x60;ENG&#x60; (GB), &#x60;ZH&#x60; (CH), &#x60;MH&#x60; (IN), &#x60;01&#x60; (FI) or &#x60;6AE&#x60; (FR); digits and leading zeros are part of the code. Subdivisions exist for 35 countries. Requires &#x60;holiday_country&#x60; and &#x60;business_days&#x3D;true&#x60;. An unknown code returns 400 INVALID_PARAMETER \&quot;Unknown holiday_subdivision &#39;XX&#39; for country DE.\&quot; (also for &#x60;FI&#x60; + &#x60;1&#x60;, which must be &#x60;01&#x60;); a value that conflicts with a combined &#x60;holiday_country&#x60; such as &#x60;US-CA&#x60; returns 400 INVALID_PARAMETER. | [optional]
 **sign** | **Bool** | Set to &#x60;true&#x60;, &#x60;1&#x60; or &#x60;yes&#x60; (case-insensitive) to ask the gateway to sign the final JSON response. Any other value, a bare &#x60;sign&#x60;, or repeated &#x60;sign&#x60; values leave the response unsigned. Every authenticated JSON response, including errors, then includes signing headers. Not supported on &#x60;/v1/time/clock&#x60;. | [optional]

### Return type

[**DiffResponse**](DiffResponse.md)

### Authorization

[apiKeyHeader](../README.md#apiKeyHeader), [bearerAuth](../README.md#bearerAuth), [apiKeyQuery](../README.md#apiKeyQuery), [rapidApiKey](../README.md#rapidApiKey), [rapidApiHost](../README.md#rapidApiHost)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getCalendar**
```swift
    open class func getCalendar(unix: Int64? = nil, unixMs: Int64? = nil, iso: String? = nil, sourceTz: String? = nil, sourceIp: String? = nil, sourceLat: Double? = nil, sourceLon: Double? = nil, sourceOffset: String? = nil, tz: String? = nil, ip: String? = nil, lat: Double? = nil, lon: Double? = nil, offset: String? = nil, autoTz: Bool? = nil, format: String? = nil, week: Bool? = nil, sign: Bool? = nil, completion: @escaping (_ data: CalendarResponse?, _ error: Error?) -> Void)
```

Calendar projection for a target instant

Returns calendar fields for an optional timestamp and target.  Input timestamp forms: - `unix=1711300000` - `unix_ms=1711300000000` - `iso=2026-04-16T09:00:00Z` - `iso=2026-04-16T09:00:00&source_tz=America/New_York` - `iso=2026-04-16T09:00:00&source_ip=8.8.8.8` - `iso=2026-04-16T09:00:00&source_lat=40.7128&source_lon=-74.0060` - `iso=2026-04-16T09:00:00&source_offset=-05:00` - if no input timestamp is provided, the request time is used  Target selector forms: - `tz=America/New_York` - `ip=8.8.8.8` - `lat=40.7128&lon=-74.0060` - `offset=-04:00` - `auto_tz=true`  Additional flags: - `week=true` adds `week_number`  Incompatible combinations: - at most one input timestamp form - at most one target selector family - use at most one of `source_tz`, `source_ip`, `source_lat`/`source_lon`, or `source_offset` - local-ISO companion selectors are valid only with `iso=...` that has no explicit offset - bulk is not supported on this route  Examples: - `/v1/time/calendar?iso=2026-04-16T09:00:00&source_tz=America/New_York&tz=Europe/London&week=true` - `/v1/time/calendar?unix=1711300000&auto_tz=true`

### Example
```swift
// For support, visit https://github.com/TimeLogic-API-LLC/timelogic-api-sdks/issues
import TimeLogicAPI

let unix = 987 // Int64 | Whole Unix seconds (fractions are rejected; negative values are allowed). Valid range is -62135596800 to 253402300799 (0001-01-01T00:00:00Z to 9999-12-31T23:59:59Z); values outside it return 400 INVALID_TIMESTAMP. (optional)
let unixMs = 987 // Int64 | Whole Unix milliseconds. Valid range -62135596800000 to 253402300799999 (0001-01-01T00:00:00Z to 9999-12-31T23:59:59.999Z); values outside it return 400 INVALID_TIMESTAMP. (optional)
let iso = "iso_example" // String | ISO-8601 timestamp. To supply a local wall-clock time without an explicit offset, pair it with one of `source_tz=Area/City`, `source_ip=...`, `source_lat=...&source_lon=...`, or `source_offset=±HH:MM`; without a hint a local value is read as UTC. Accepted shapes are extended format with `Z`, `±HH:MM` or `±HH:MM:SS` (for example `1900-06-01T12:09:21+00:09:21`, as `iso_local` prints old local-mean-time offsets), optional fractional seconds, a space instead of `T`, a local time, or a date alone (read as 00:00). Basic format and offsets without a colon are rejected. The date must exist (`2027-02-29` returns 400 INVALID_TIMESTAMP rather than rolling over), and the instant must fall between 0001-01-01T00:00:00Z and 9999-12-31T23:59:59Z. A local time inside a spring-forward gap returns 400 INVALID_TIMESTAMP; an ambiguous fall-back time resolves to its first occurrence. (optional)
let sourceTz = "sourceTz_example" // String | Used only with `iso=...` when the ISO value has no explicit offset. (optional)
let sourceIp = "sourceIp_example" // String | Used only with `iso=...` when the ISO value has no explicit offset. Resolves that local wall-clock time through the timezone mapped from this IP address. (optional)
let sourceLat = 987 // Double | Used only with `iso=...` when the ISO value has no explicit offset. Provide together with `source_lon` to resolve that local wall-clock time through the timezone mapped from these coordinates. (optional)
let sourceLon = 987 // Double | Used only with `iso=...` when the ISO value has no explicit offset. Provide together with `source_lat`. (optional)
let sourceOffset = "sourceOffset_example" // String | Used only with `iso=...` when the ISO value has no explicit offset. Interprets that local wall-clock time at this fixed UTC offset. (optional)
let tz = "tz_example" // String | IANA timezone name, matched case-insensitively. Links and aliases resolve to their canonical zone, so the returned `timezone` can differ (`Europe/Stockholm` returns `Europe/Berlin`, `UTC` returns `Etc/UTC`). `Etc/GMT+5` is UTC-05:00 (POSIX sign). On bulk-capable routes, a comma-separated list enables bulk mode with at most 10 values (any comma, even a trailing one, returns an array); request URLs are limited to 8192 characters. On single-target routes a list is rejected as an invalid timezone. (optional)
let ip = "ip_example" // String | IP address. On bulk-capable routes, a comma-separated list enables bulk mode with at most 10 values; request URLs are limited to 8192 characters. (optional)
let lat = 987 // Double | Latitude. Must be provided together with `lon`. (optional)
let lon = 987 // Double | Longitude. Must be provided together with `lat`. (optional)
let offset = "offset_example" // String | Fixed UTC offset in `+HH:MM` or `-HH:MM` format only (`+0530` and `+5` are rejected); URL-encode `+` as `%2B`, since an unencoded `+` is read as a space. An offset target returns `timezone=null`. On bulk-capable routes, a comma-separated list enables bulk mode with at most 10 values; request URLs are limited to 8192 characters. (optional)
let autoTz = true // Bool | Set to `true` to resolve using the caller IP from Cloudflare headers. Counts as a selector family, so it cannot be combined with `tz`, `ip`, `lat`/`lon` or `offset`. Not supported on `/v1/time/clock`. Enabled by `true`, `1` or `yes` (case-insensitive); any other value leaves it off without an error. (optional)
let format = "format_example" // String | Custom date/time format template using supported `strftime`-style directives such as `%Y-%m-%d %H:%M:%S`. Supported directives: `%a %A %b %B %C %d %D %e %F %h %H %I %j %k %l %m %M %n %p %P %r %R %s %S %t %T %u %v %w %x %X %y %Y %z %:z %Z %%`, with the `-`, `_` and `0` padding flags on numeric directives. `%Z` prints the IANA zone name (or `UTC+HH:MM` for an offset target, `UTC` with no target), not an abbreviation. Any other directive (for example `%U`, `%f`, `%Q`) or a trailing `%` returns 400 INVALID_PARAMETER naming the directive. (optional)
let week = true // Bool | Set to `true` to add the ISO 8601 `week_number`. Enabled by `true`, `1` or `yes` (case-insensitive); any other value leaves it off without an error. (optional)
let sign = true // Bool | Set to `true`, `1` or `yes` (case-insensitive) to ask the gateway to sign the final JSON response. Any other value, a bare `sign`, or repeated `sign` values leave the response unsigned. Every authenticated JSON response, including errors, then includes signing headers. Not supported on `/v1/time/clock`. (optional)

// Calendar projection for a target instant
TimeAPI.getCalendar(unix: unix, unixMs: unixMs, iso: iso, sourceTz: sourceTz, sourceIp: sourceIp, sourceLat: sourceLat, sourceLon: sourceLon, sourceOffset: sourceOffset, tz: tz, ip: ip, lat: lat, lon: lon, offset: offset, autoTz: autoTz, format: format, week: week, sign: sign) { (response, error) in
    guard error == nil else {
        print(error)
        return
    }

    if (response) {
        dump(response)
    }
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **unix** | **Int64** | Whole Unix seconds (fractions are rejected; negative values are allowed). Valid range is -62135596800 to 253402300799 (0001-01-01T00:00:00Z to 9999-12-31T23:59:59Z); values outside it return 400 INVALID_TIMESTAMP. | [optional]
 **unixMs** | **Int64** | Whole Unix milliseconds. Valid range -62135596800000 to 253402300799999 (0001-01-01T00:00:00Z to 9999-12-31T23:59:59.999Z); values outside it return 400 INVALID_TIMESTAMP. | [optional]
 **iso** | **String** | ISO-8601 timestamp. To supply a local wall-clock time without an explicit offset, pair it with one of &#x60;source_tz&#x3D;Area/City&#x60;, &#x60;source_ip&#x3D;...&#x60;, &#x60;source_lat&#x3D;...&amp;source_lon&#x3D;...&#x60;, or &#x60;source_offset&#x3D;±HH:MM&#x60;; without a hint a local value is read as UTC. Accepted shapes are extended format with &#x60;Z&#x60;, &#x60;±HH:MM&#x60; or &#x60;±HH:MM:SS&#x60; (for example &#x60;1900-06-01T12:09:21+00:09:21&#x60;, as &#x60;iso_local&#x60; prints old local-mean-time offsets), optional fractional seconds, a space instead of &#x60;T&#x60;, a local time, or a date alone (read as 00:00). Basic format and offsets without a colon are rejected. The date must exist (&#x60;2027-02-29&#x60; returns 400 INVALID_TIMESTAMP rather than rolling over), and the instant must fall between 0001-01-01T00:00:00Z and 9999-12-31T23:59:59Z. A local time inside a spring-forward gap returns 400 INVALID_TIMESTAMP; an ambiguous fall-back time resolves to its first occurrence. | [optional]
 **sourceTz** | **String** | Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. | [optional]
 **sourceIp** | **String** | Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Resolves that local wall-clock time through the timezone mapped from this IP address. | [optional]
 **sourceLat** | **Double** | Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Provide together with &#x60;source_lon&#x60; to resolve that local wall-clock time through the timezone mapped from these coordinates. | [optional]
 **sourceLon** | **Double** | Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Provide together with &#x60;source_lat&#x60;. | [optional]
 **sourceOffset** | **String** | Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Interprets that local wall-clock time at this fixed UTC offset. | [optional]
 **tz** | **String** | IANA timezone name, matched case-insensitively. Links and aliases resolve to their canonical zone, so the returned &#x60;timezone&#x60; can differ (&#x60;Europe/Stockholm&#x60; returns &#x60;Europe/Berlin&#x60;, &#x60;UTC&#x60; returns &#x60;Etc/UTC&#x60;). &#x60;Etc/GMT+5&#x60; is UTC-05:00 (POSIX sign). On bulk-capable routes, a comma-separated list enables bulk mode with at most 10 values (any comma, even a trailing one, returns an array); request URLs are limited to 8192 characters. On single-target routes a list is rejected as an invalid timezone. | [optional]
 **ip** | **String** | IP address. On bulk-capable routes, a comma-separated list enables bulk mode with at most 10 values; request URLs are limited to 8192 characters. | [optional]
 **lat** | **Double** | Latitude. Must be provided together with &#x60;lon&#x60;. | [optional]
 **lon** | **Double** | Longitude. Must be provided together with &#x60;lat&#x60;. | [optional]
 **offset** | **String** | Fixed UTC offset in &#x60;+HH:MM&#x60; or &#x60;-HH:MM&#x60; format only (&#x60;+0530&#x60; and &#x60;+5&#x60; are rejected); URL-encode &#x60;+&#x60; as &#x60;%2B&#x60;, since an unencoded &#x60;+&#x60; is read as a space. An offset target returns &#x60;timezone&#x3D;null&#x60;. On bulk-capable routes, a comma-separated list enables bulk mode with at most 10 values; request URLs are limited to 8192 characters. | [optional]
 **autoTz** | **Bool** | Set to &#x60;true&#x60; to resolve using the caller IP from Cloudflare headers. Counts as a selector family, so it cannot be combined with &#x60;tz&#x60;, &#x60;ip&#x60;, &#x60;lat&#x60;/&#x60;lon&#x60; or &#x60;offset&#x60;. Not supported on &#x60;/v1/time/clock&#x60;. Enabled by &#x60;true&#x60;, &#x60;1&#x60; or &#x60;yes&#x60; (case-insensitive); any other value leaves it off without an error. | [optional]
 **format** | **String** | Custom date/time format template using supported &#x60;strftime&#x60;-style directives such as &#x60;%Y-%m-%d %H:%M:%S&#x60;. Supported directives: &#x60;%a %A %b %B %C %d %D %e %F %h %H %I %j %k %l %m %M %n %p %P %r %R %s %S %t %T %u %v %w %x %X %y %Y %z %:z %Z %%&#x60;, with the &#x60;-&#x60;, &#x60;_&#x60; and &#x60;0&#x60; padding flags on numeric directives. &#x60;%Z&#x60; prints the IANA zone name (or &#x60;UTC+HH:MM&#x60; for an offset target, &#x60;UTC&#x60; with no target), not an abbreviation. Any other directive (for example &#x60;%U&#x60;, &#x60;%f&#x60;, &#x60;%Q&#x60;) or a trailing &#x60;%&#x60; returns 400 INVALID_PARAMETER naming the directive. | [optional]
 **week** | **Bool** | Set to &#x60;true&#x60; to add the ISO 8601 &#x60;week_number&#x60;. Enabled by &#x60;true&#x60;, &#x60;1&#x60; or &#x60;yes&#x60; (case-insensitive); any other value leaves it off without an error. | [optional]
 **sign** | **Bool** | Set to &#x60;true&#x60;, &#x60;1&#x60; or &#x60;yes&#x60; (case-insensitive) to ask the gateway to sign the final JSON response. Any other value, a bare &#x60;sign&#x60;, or repeated &#x60;sign&#x60; values leave the response unsigned. Every authenticated JSON response, including errors, then includes signing headers. Not supported on &#x60;/v1/time/clock&#x60;. | [optional]

### Return type

[**CalendarResponse**](CalendarResponse.md)

### Authorization

[apiKeyHeader](../README.md#apiKeyHeader), [bearerAuth](../README.md#bearerAuth), [apiKeyQuery](../README.md#apiKeyQuery), [rapidApiKey](../README.md#rapidApiKey), [rapidApiHost](../README.md#rapidApiHost)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getClock**
```swift
    open class func getClock(style: Style_getClock, unix: Int64? = nil, unixMs: Int64? = nil, iso: String? = nil, sourceTz: String? = nil, sourceIp: String? = nil, sourceLat: Double? = nil, sourceLon: Double? = nil, sourceOffset: String? = nil, tz: String? = nil, ip: String? = nil, lat: Double? = nil, lon: Double? = nil, offset: String? = nil, format: String? = nil, completion: @escaping (_ data: String?, _ error: Error?) -> Void)
```

Render a live HTML clock

Returns an embeddable HTML clock fragment.  Input timestamp forms: - `unix=1711300000` - `unix_ms=1711300000000` - `iso=2026-04-16T09:00:00Z` - `iso=2026-04-16T09:00:00&source_tz=America/New_York`  Target selector forms: - `tz=America/New_York` - `ip=8.8.8.8` - `lat=40.7128&lon=-74.0060` - `offset=-04:00`  Incompatible combinations: - `style` is required and must be one of the 30 names in the `style` enum - at most one input timestamp form - at most one target selector family - use at most one of `source_tz`, `source_ip`, `source_lat`/`source_lon`, or `source_offset` - local-ISO companion selectors are valid only with `iso=...` that has no explicit offset - this route is single-target only; comma-separated `tz`, `ip`, and `offset` values are rejected - `auto_tz` is not supported on this route - `sign` is not supported on this route  Examples: - Digital: `/v1/time/clock?style=digital-dashboard&iso=2026-04-16T09:00:00&source_tz=America/New_York&tz=Europe/London` - Analog: `/v1/time/clock?style=analog-station&offset=-04:00`

### Example
```swift
// For support, visit https://github.com/TimeLogic-API-LLC/timelogic-api-sdks/issues
import TimeLogicAPI

let style = "style_example" // String | Clock style name. Valid values are enumerated here; there is no separate style discovery endpoint.
let unix = 987 // Int64 | Whole Unix seconds (fractions are rejected; negative values are allowed). Valid range is -62135596800 to 253402300799 (0001-01-01T00:00:00Z to 9999-12-31T23:59:59Z); values outside it return 400 INVALID_TIMESTAMP. (optional)
let unixMs = 987 // Int64 | Whole Unix milliseconds. Valid range -62135596800000 to 253402300799999 (0001-01-01T00:00:00Z to 9999-12-31T23:59:59.999Z); values outside it return 400 INVALID_TIMESTAMP. (optional)
let iso = "iso_example" // String | ISO-8601 timestamp. To supply a local wall-clock time without an explicit offset, pair it with one of `source_tz=Area/City`, `source_ip=...`, `source_lat=...&source_lon=...`, or `source_offset=±HH:MM`; without a hint a local value is read as UTC. Accepted shapes are extended format with `Z`, `±HH:MM` or `±HH:MM:SS` (for example `1900-06-01T12:09:21+00:09:21`, as `iso_local` prints old local-mean-time offsets), optional fractional seconds, a space instead of `T`, a local time, or a date alone (read as 00:00). Basic format and offsets without a colon are rejected. The date must exist (`2027-02-29` returns 400 INVALID_TIMESTAMP rather than rolling over), and the instant must fall between 0001-01-01T00:00:00Z and 9999-12-31T23:59:59Z. A local time inside a spring-forward gap returns 400 INVALID_TIMESTAMP; an ambiguous fall-back time resolves to its first occurrence. (optional)
let sourceTz = "sourceTz_example" // String | Used only with `iso=...` when the ISO value has no explicit offset. (optional)
let sourceIp = "sourceIp_example" // String | Used only with `iso=...` when the ISO value has no explicit offset. Resolves that local wall-clock time through the timezone mapped from this IP address. (optional)
let sourceLat = 987 // Double | Used only with `iso=...` when the ISO value has no explicit offset. Provide together with `source_lon` to resolve that local wall-clock time through the timezone mapped from these coordinates. (optional)
let sourceLon = 987 // Double | Used only with `iso=...` when the ISO value has no explicit offset. Provide together with `source_lat`. (optional)
let sourceOffset = "sourceOffset_example" // String | Used only with `iso=...` when the ISO value has no explicit offset. Interprets that local wall-clock time at this fixed UTC offset. (optional)
let tz = "tz_example" // String | IANA timezone name, matched case-insensitively. Links and aliases resolve to their canonical zone, so the returned `timezone` can differ (`Europe/Stockholm` returns `Europe/Berlin`, `UTC` returns `Etc/UTC`). `Etc/GMT+5` is UTC-05:00 (POSIX sign). On bulk-capable routes, a comma-separated list enables bulk mode with at most 10 values (any comma, even a trailing one, returns an array); request URLs are limited to 8192 characters. On single-target routes a list is rejected as an invalid timezone. (optional)
let ip = "ip_example" // String | IP address. On bulk-capable routes, a comma-separated list enables bulk mode with at most 10 values; request URLs are limited to 8192 characters. (optional)
let lat = 987 // Double | Latitude. Must be provided together with `lon`. (optional)
let lon = 987 // Double | Longitude. Must be provided together with `lat`. (optional)
let offset = "offset_example" // String | Fixed UTC offset in `+HH:MM` or `-HH:MM` format only (`+0530` and `+5` are rejected); URL-encode `+` as `%2B`, since an unencoded `+` is read as a space. An offset target returns `timezone=null`. On bulk-capable routes, a comma-separated list enables bulk mode with at most 10 values; request URLs are limited to 8192 characters. (optional)
let format = "format_example" // String | Custom date/time format template using supported `strftime`-style directives such as `%Y-%m-%d %H:%M:%S`. Supported directives: `%a %A %b %B %C %d %D %e %F %h %H %I %j %k %l %m %M %n %p %P %r %R %s %S %t %T %u %v %w %x %X %y %Y %z %:z %Z %%`, with the `-`, `_` and `0` padding flags on numeric directives. `%Z` prints the IANA zone name (or `UTC+HH:MM` for an offset target, `UTC` with no target), not an abbreviation. Any other directive (for example `%U`, `%f`, `%Q`) or a trailing `%` returns 400 INVALID_PARAMETER naming the directive. (optional)

// Render a live HTML clock
TimeAPI.getClock(style: style, unix: unix, unixMs: unixMs, iso: iso, sourceTz: sourceTz, sourceIp: sourceIp, sourceLat: sourceLat, sourceLon: sourceLon, sourceOffset: sourceOffset, tz: tz, ip: ip, lat: lat, lon: lon, offset: offset, format: format) { (response, error) in
    guard error == nil else {
        print(error)
        return
    }

    if (response) {
        dump(response)
    }
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **style** | **String** | Clock style name. Valid values are enumerated here; there is no separate style discovery endpoint. |
 **unix** | **Int64** | Whole Unix seconds (fractions are rejected; negative values are allowed). Valid range is -62135596800 to 253402300799 (0001-01-01T00:00:00Z to 9999-12-31T23:59:59Z); values outside it return 400 INVALID_TIMESTAMP. | [optional]
 **unixMs** | **Int64** | Whole Unix milliseconds. Valid range -62135596800000 to 253402300799999 (0001-01-01T00:00:00Z to 9999-12-31T23:59:59.999Z); values outside it return 400 INVALID_TIMESTAMP. | [optional]
 **iso** | **String** | ISO-8601 timestamp. To supply a local wall-clock time without an explicit offset, pair it with one of &#x60;source_tz&#x3D;Area/City&#x60;, &#x60;source_ip&#x3D;...&#x60;, &#x60;source_lat&#x3D;...&amp;source_lon&#x3D;...&#x60;, or &#x60;source_offset&#x3D;±HH:MM&#x60;; without a hint a local value is read as UTC. Accepted shapes are extended format with &#x60;Z&#x60;, &#x60;±HH:MM&#x60; or &#x60;±HH:MM:SS&#x60; (for example &#x60;1900-06-01T12:09:21+00:09:21&#x60;, as &#x60;iso_local&#x60; prints old local-mean-time offsets), optional fractional seconds, a space instead of &#x60;T&#x60;, a local time, or a date alone (read as 00:00). Basic format and offsets without a colon are rejected. The date must exist (&#x60;2027-02-29&#x60; returns 400 INVALID_TIMESTAMP rather than rolling over), and the instant must fall between 0001-01-01T00:00:00Z and 9999-12-31T23:59:59Z. A local time inside a spring-forward gap returns 400 INVALID_TIMESTAMP; an ambiguous fall-back time resolves to its first occurrence. | [optional]
 **sourceTz** | **String** | Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. | [optional]
 **sourceIp** | **String** | Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Resolves that local wall-clock time through the timezone mapped from this IP address. | [optional]
 **sourceLat** | **Double** | Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Provide together with &#x60;source_lon&#x60; to resolve that local wall-clock time through the timezone mapped from these coordinates. | [optional]
 **sourceLon** | **Double** | Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Provide together with &#x60;source_lat&#x60;. | [optional]
 **sourceOffset** | **String** | Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Interprets that local wall-clock time at this fixed UTC offset. | [optional]
 **tz** | **String** | IANA timezone name, matched case-insensitively. Links and aliases resolve to their canonical zone, so the returned &#x60;timezone&#x60; can differ (&#x60;Europe/Stockholm&#x60; returns &#x60;Europe/Berlin&#x60;, &#x60;UTC&#x60; returns &#x60;Etc/UTC&#x60;). &#x60;Etc/GMT+5&#x60; is UTC-05:00 (POSIX sign). On bulk-capable routes, a comma-separated list enables bulk mode with at most 10 values (any comma, even a trailing one, returns an array); request URLs are limited to 8192 characters. On single-target routes a list is rejected as an invalid timezone. | [optional]
 **ip** | **String** | IP address. On bulk-capable routes, a comma-separated list enables bulk mode with at most 10 values; request URLs are limited to 8192 characters. | [optional]
 **lat** | **Double** | Latitude. Must be provided together with &#x60;lon&#x60;. | [optional]
 **lon** | **Double** | Longitude. Must be provided together with &#x60;lat&#x60;. | [optional]
 **offset** | **String** | Fixed UTC offset in &#x60;+HH:MM&#x60; or &#x60;-HH:MM&#x60; format only (&#x60;+0530&#x60; and &#x60;+5&#x60; are rejected); URL-encode &#x60;+&#x60; as &#x60;%2B&#x60;, since an unencoded &#x60;+&#x60; is read as a space. An offset target returns &#x60;timezone&#x3D;null&#x60;. On bulk-capable routes, a comma-separated list enables bulk mode with at most 10 values; request URLs are limited to 8192 characters. | [optional]
 **format** | **String** | Custom date/time format template using supported &#x60;strftime&#x60;-style directives such as &#x60;%Y-%m-%d %H:%M:%S&#x60;. Supported directives: &#x60;%a %A %b %B %C %d %D %e %F %h %H %I %j %k %l %m %M %n %p %P %r %R %s %S %t %T %u %v %w %x %X %y %Y %z %:z %Z %%&#x60;, with the &#x60;-&#x60;, &#x60;_&#x60; and &#x60;0&#x60; padding flags on numeric directives. &#x60;%Z&#x60; prints the IANA zone name (or &#x60;UTC+HH:MM&#x60; for an offset target, &#x60;UTC&#x60; with no target), not an abbreviation. Any other directive (for example &#x60;%U&#x60;, &#x60;%f&#x60;, &#x60;%Q&#x60;) or a trailing &#x60;%&#x60; returns 400 INVALID_PARAMETER naming the directive. | [optional]

### Return type

**String**

### Authorization

[apiKeyHeader](../README.md#apiKeyHeader), [bearerAuth](../README.md#bearerAuth), [apiKeyQuery](../README.md#apiKeyQuery), [rapidApiKey](../README.md#rapidApiKey), [rapidApiHost](../README.md#rapidApiHost)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: text/html, application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getCurrentTime**
```swift
    open class func getCurrentTime(tz: String? = nil, ip: String? = nil, lat: Double? = nil, lon: Double? = nil, offset: String? = nil, autoTz: Bool? = nil, format: String? = nil, sign: Bool? = nil, completion: @escaping (_ data: GetCurrentTime200Response?, _ error: Error?) -> Void)
```

Get the current time for a target

Returns current time data for a single target, or a bulk array when exactly one of `tz`, `ip`, or `offset` is supplied as a comma-separated list.  Target selector rules: - Use at most one selector family per request: `tz`, `ip`, `lat` + `lon`, `offset`, or `auto_tz=true`. - If no selector is provided, the response defaults to UTC with `timezone=null` and `iso_local=null`. - Bulk mode is available only through one comma-separated `tz`, `ip`, or `offset` selector, accepts at most 10 values, and cannot be combined with any other selector.  Example: - Single target: `/v1/time/current?tz=America/New_York` - For bulk, provide one comma-separated `tz`, `ip`, or `offset` value, for example `/v1/time/current?tz=America/New_York,Europe/London,Asia/Tokyo`.

### Example
```swift
// For support, visit https://github.com/TimeLogic-API-LLC/timelogic-api-sdks/issues
import TimeLogicAPI

let tz = "tz_example" // String | IANA timezone name, matched case-insensitively. Links and aliases resolve to their canonical zone, so the returned `timezone` can differ (`Europe/Stockholm` returns `Europe/Berlin`, `UTC` returns `Etc/UTC`). `Etc/GMT+5` is UTC-05:00 (POSIX sign). On bulk-capable routes, a comma-separated list enables bulk mode with at most 10 values (any comma, even a trailing one, returns an array); request URLs are limited to 8192 characters. On single-target routes a list is rejected as an invalid timezone. (optional)
let ip = "ip_example" // String | IP address. On bulk-capable routes, a comma-separated list enables bulk mode with at most 10 values; request URLs are limited to 8192 characters. (optional)
let lat = 987 // Double | Latitude. Must be provided together with `lon`. (optional)
let lon = 987 // Double | Longitude. Must be provided together with `lat`. (optional)
let offset = "offset_example" // String | Fixed UTC offset in `+HH:MM` or `-HH:MM` format only (`+0530` and `+5` are rejected); URL-encode `+` as `%2B`, since an unencoded `+` is read as a space. An offset target returns `timezone=null`. On bulk-capable routes, a comma-separated list enables bulk mode with at most 10 values; request URLs are limited to 8192 characters. (optional)
let autoTz = true // Bool | Set to `true` to resolve using the caller IP from Cloudflare headers. Counts as a selector family, so it cannot be combined with `tz`, `ip`, `lat`/`lon` or `offset`. Not supported on `/v1/time/clock`. Enabled by `true`, `1` or `yes` (case-insensitive); any other value leaves it off without an error. (optional)
let format = "format_example" // String | Custom date/time format template using supported `strftime`-style directives such as `%Y-%m-%d %H:%M:%S`. Supported directives: `%a %A %b %B %C %d %D %e %F %h %H %I %j %k %l %m %M %n %p %P %r %R %s %S %t %T %u %v %w %x %X %y %Y %z %:z %Z %%`, with the `-`, `_` and `0` padding flags on numeric directives. `%Z` prints the IANA zone name (or `UTC+HH:MM` for an offset target, `UTC` with no target), not an abbreviation. Any other directive (for example `%U`, `%f`, `%Q`) or a trailing `%` returns 400 INVALID_PARAMETER naming the directive. (optional)
let sign = true // Bool | Set to `true`, `1` or `yes` (case-insensitive) to ask the gateway to sign the final JSON response. Any other value, a bare `sign`, or repeated `sign` values leave the response unsigned. Every authenticated JSON response, including errors, then includes signing headers. Not supported on `/v1/time/clock`. (optional)

// Get the current time for a target
TimeAPI.getCurrentTime(tz: tz, ip: ip, lat: lat, lon: lon, offset: offset, autoTz: autoTz, format: format, sign: sign) { (response, error) in
    guard error == nil else {
        print(error)
        return
    }

    if (response) {
        dump(response)
    }
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **tz** | **String** | IANA timezone name, matched case-insensitively. Links and aliases resolve to their canonical zone, so the returned &#x60;timezone&#x60; can differ (&#x60;Europe/Stockholm&#x60; returns &#x60;Europe/Berlin&#x60;, &#x60;UTC&#x60; returns &#x60;Etc/UTC&#x60;). &#x60;Etc/GMT+5&#x60; is UTC-05:00 (POSIX sign). On bulk-capable routes, a comma-separated list enables bulk mode with at most 10 values (any comma, even a trailing one, returns an array); request URLs are limited to 8192 characters. On single-target routes a list is rejected as an invalid timezone. | [optional]
 **ip** | **String** | IP address. On bulk-capable routes, a comma-separated list enables bulk mode with at most 10 values; request URLs are limited to 8192 characters. | [optional]
 **lat** | **Double** | Latitude. Must be provided together with &#x60;lon&#x60;. | [optional]
 **lon** | **Double** | Longitude. Must be provided together with &#x60;lat&#x60;. | [optional]
 **offset** | **String** | Fixed UTC offset in &#x60;+HH:MM&#x60; or &#x60;-HH:MM&#x60; format only (&#x60;+0530&#x60; and &#x60;+5&#x60; are rejected); URL-encode &#x60;+&#x60; as &#x60;%2B&#x60;, since an unencoded &#x60;+&#x60; is read as a space. An offset target returns &#x60;timezone&#x3D;null&#x60;. On bulk-capable routes, a comma-separated list enables bulk mode with at most 10 values; request URLs are limited to 8192 characters. | [optional]
 **autoTz** | **Bool** | Set to &#x60;true&#x60; to resolve using the caller IP from Cloudflare headers. Counts as a selector family, so it cannot be combined with &#x60;tz&#x60;, &#x60;ip&#x60;, &#x60;lat&#x60;/&#x60;lon&#x60; or &#x60;offset&#x60;. Not supported on &#x60;/v1/time/clock&#x60;. Enabled by &#x60;true&#x60;, &#x60;1&#x60; or &#x60;yes&#x60; (case-insensitive); any other value leaves it off without an error. | [optional]
 **format** | **String** | Custom date/time format template using supported &#x60;strftime&#x60;-style directives such as &#x60;%Y-%m-%d %H:%M:%S&#x60;. Supported directives: &#x60;%a %A %b %B %C %d %D %e %F %h %H %I %j %k %l %m %M %n %p %P %r %R %s %S %t %T %u %v %w %x %X %y %Y %z %:z %Z %%&#x60;, with the &#x60;-&#x60;, &#x60;_&#x60; and &#x60;0&#x60; padding flags on numeric directives. &#x60;%Z&#x60; prints the IANA zone name (or &#x60;UTC+HH:MM&#x60; for an offset target, &#x60;UTC&#x60; with no target), not an abbreviation. Any other directive (for example &#x60;%U&#x60;, &#x60;%f&#x60;, &#x60;%Q&#x60;) or a trailing &#x60;%&#x60; returns 400 INVALID_PARAMETER naming the directive. | [optional]
 **sign** | **Bool** | Set to &#x60;true&#x60;, &#x60;1&#x60; or &#x60;yes&#x60; (case-insensitive) to ask the gateway to sign the final JSON response. Any other value, a bare &#x60;sign&#x60;, or repeated &#x60;sign&#x60; values leave the response unsigned. Every authenticated JSON response, including errors, then includes signing headers. Not supported on &#x60;/v1/time/clock&#x60;. | [optional]

### Return type

[**GetCurrentTime200Response**](GetCurrentTime200Response.md)

### Authorization

[apiKeyHeader](../README.md#apiKeyHeader), [bearerAuth](../README.md#bearerAuth), [apiKeyQuery](../README.md#apiKeyQuery), [rapidApiKey](../README.md#rapidApiKey), [rapidApiHost](../README.md#rapidApiHost)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getDst**
```swift
    open class func getDst(tz: String? = nil, ip: String? = nil, lat: Double? = nil, lon: Double? = nil, offset: String? = nil, autoTz: Bool? = nil, format: String? = nil, next: Bool? = nil, sign: Bool? = nil, completion: @escaping (_ data: DstResponse?, _ error: Error?) -> Void)
```

Daylight-saving status for a target

Returns daylight-saving status for the selected target.  Target selector rules: - Use at most one selector family: `tz`, `ip`, `lat` + `lon`, `offset`, or `auto_tz=true`. - If no selector is provided, the response defaults to UTC. - Bulk is not supported on this route. - `next=true` adds `next_transition` when the resolver provides a transition timestamp.  Example: - `/v1/time/dst?tz=America/New_York&next=true`

### Example
```swift
// For support, visit https://github.com/TimeLogic-API-LLC/timelogic-api-sdks/issues
import TimeLogicAPI

let tz = "tz_example" // String | IANA timezone name, matched case-insensitively. Links and aliases resolve to their canonical zone, so the returned `timezone` can differ (`Europe/Stockholm` returns `Europe/Berlin`, `UTC` returns `Etc/UTC`). `Etc/GMT+5` is UTC-05:00 (POSIX sign). On bulk-capable routes, a comma-separated list enables bulk mode with at most 10 values (any comma, even a trailing one, returns an array); request URLs are limited to 8192 characters. On single-target routes a list is rejected as an invalid timezone. (optional)
let ip = "ip_example" // String | IP address. On bulk-capable routes, a comma-separated list enables bulk mode with at most 10 values; request URLs are limited to 8192 characters. (optional)
let lat = 987 // Double | Latitude. Must be provided together with `lon`. (optional)
let lon = 987 // Double | Longitude. Must be provided together with `lat`. (optional)
let offset = "offset_example" // String | Fixed UTC offset in `+HH:MM` or `-HH:MM` format only (`+0530` and `+5` are rejected); URL-encode `+` as `%2B`, since an unencoded `+` is read as a space. An offset target returns `timezone=null`. On bulk-capable routes, a comma-separated list enables bulk mode with at most 10 values; request URLs are limited to 8192 characters. (optional)
let autoTz = true // Bool | Set to `true` to resolve using the caller IP from Cloudflare headers. Counts as a selector family, so it cannot be combined with `tz`, `ip`, `lat`/`lon` or `offset`. Not supported on `/v1/time/clock`. Enabled by `true`, `1` or `yes` (case-insensitive); any other value leaves it off without an error. (optional)
let format = "format_example" // String | Custom date/time format template using supported `strftime`-style directives such as `%Y-%m-%d %H:%M:%S`. Supported directives: `%a %A %b %B %C %d %D %e %F %h %H %I %j %k %l %m %M %n %p %P %r %R %s %S %t %T %u %v %w %x %X %y %Y %z %:z %Z %%`, with the `-`, `_` and `0` padding flags on numeric directives. `%Z` prints the IANA zone name (or `UTC+HH:MM` for an offset target, `UTC` with no target), not an abbreviation. Any other directive (for example `%U`, `%f`, `%Q`) or a trailing `%` returns 400 INVALID_PARAMETER naming the directive. (optional)
let next = true // Bool | Set to `true` to add `next_transition` (the next UTC offset change, or null). Enabled by `true`, `1` or `yes` (case-insensitive); any other value leaves it off without an error. (optional)
let sign = true // Bool | Set to `true`, `1` or `yes` (case-insensitive) to ask the gateway to sign the final JSON response. Any other value, a bare `sign`, or repeated `sign` values leave the response unsigned. Every authenticated JSON response, including errors, then includes signing headers. Not supported on `/v1/time/clock`. (optional)

// Daylight-saving status for a target
TimeAPI.getDst(tz: tz, ip: ip, lat: lat, lon: lon, offset: offset, autoTz: autoTz, format: format, next: next, sign: sign) { (response, error) in
    guard error == nil else {
        print(error)
        return
    }

    if (response) {
        dump(response)
    }
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **tz** | **String** | IANA timezone name, matched case-insensitively. Links and aliases resolve to their canonical zone, so the returned &#x60;timezone&#x60; can differ (&#x60;Europe/Stockholm&#x60; returns &#x60;Europe/Berlin&#x60;, &#x60;UTC&#x60; returns &#x60;Etc/UTC&#x60;). &#x60;Etc/GMT+5&#x60; is UTC-05:00 (POSIX sign). On bulk-capable routes, a comma-separated list enables bulk mode with at most 10 values (any comma, even a trailing one, returns an array); request URLs are limited to 8192 characters. On single-target routes a list is rejected as an invalid timezone. | [optional]
 **ip** | **String** | IP address. On bulk-capable routes, a comma-separated list enables bulk mode with at most 10 values; request URLs are limited to 8192 characters. | [optional]
 **lat** | **Double** | Latitude. Must be provided together with &#x60;lon&#x60;. | [optional]
 **lon** | **Double** | Longitude. Must be provided together with &#x60;lat&#x60;. | [optional]
 **offset** | **String** | Fixed UTC offset in &#x60;+HH:MM&#x60; or &#x60;-HH:MM&#x60; format only (&#x60;+0530&#x60; and &#x60;+5&#x60; are rejected); URL-encode &#x60;+&#x60; as &#x60;%2B&#x60;, since an unencoded &#x60;+&#x60; is read as a space. An offset target returns &#x60;timezone&#x3D;null&#x60;. On bulk-capable routes, a comma-separated list enables bulk mode with at most 10 values; request URLs are limited to 8192 characters. | [optional]
 **autoTz** | **Bool** | Set to &#x60;true&#x60; to resolve using the caller IP from Cloudflare headers. Counts as a selector family, so it cannot be combined with &#x60;tz&#x60;, &#x60;ip&#x60;, &#x60;lat&#x60;/&#x60;lon&#x60; or &#x60;offset&#x60;. Not supported on &#x60;/v1/time/clock&#x60;. Enabled by &#x60;true&#x60;, &#x60;1&#x60; or &#x60;yes&#x60; (case-insensitive); any other value leaves it off without an error. | [optional]
 **format** | **String** | Custom date/time format template using supported &#x60;strftime&#x60;-style directives such as &#x60;%Y-%m-%d %H:%M:%S&#x60;. Supported directives: &#x60;%a %A %b %B %C %d %D %e %F %h %H %I %j %k %l %m %M %n %p %P %r %R %s %S %t %T %u %v %w %x %X %y %Y %z %:z %Z %%&#x60;, with the &#x60;-&#x60;, &#x60;_&#x60; and &#x60;0&#x60; padding flags on numeric directives. &#x60;%Z&#x60; prints the IANA zone name (or &#x60;UTC+HH:MM&#x60; for an offset target, &#x60;UTC&#x60; with no target), not an abbreviation. Any other directive (for example &#x60;%U&#x60;, &#x60;%f&#x60;, &#x60;%Q&#x60;) or a trailing &#x60;%&#x60; returns 400 INVALID_PARAMETER naming the directive. | [optional]
 **next** | **Bool** | Set to &#x60;true&#x60; to add &#x60;next_transition&#x60; (the next UTC offset change, or null). Enabled by &#x60;true&#x60;, &#x60;1&#x60; or &#x60;yes&#x60; (case-insensitive); any other value leaves it off without an error. | [optional]
 **sign** | **Bool** | Set to &#x60;true&#x60;, &#x60;1&#x60; or &#x60;yes&#x60; (case-insensitive) to ask the gateway to sign the final JSON response. Any other value, a bare &#x60;sign&#x60;, or repeated &#x60;sign&#x60; values leave the response unsigned. Every authenticated JSON response, including errors, then includes signing headers. Not supported on &#x60;/v1/time/clock&#x60;. | [optional]

### Return type

[**DstResponse**](DstResponse.md)

### Authorization

[apiKeyHeader](../README.md#apiKeyHeader), [bearerAuth](../README.md#bearerAuth), [apiKeyQuery](../README.md#apiKeyQuery), [rapidApiKey](../README.md#rapidApiKey), [rapidApiHost](../README.md#rapidApiHost)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getElapsed**
```swift
    open class func getElapsed(unix: Int64? = nil, unixMs: Int64? = nil, iso: String? = nil, sourceTz: String? = nil, sourceIp: String? = nil, sourceLat: Double? = nil, sourceLon: Double? = nil, sourceOffset: String? = nil, compareUnix: Int64? = nil, compareUnixMs: Int64? = nil, compareIso: String? = nil, compareSourceTz: String? = nil, compareSourceIp: String? = nil, compareSourceLat: Double? = nil, compareSourceLon: Double? = nil, compareSourceOffset: String? = nil, tz: String? = nil, ip: String? = nil, lat: Double? = nil, lon: Double? = nil, offset: String? = nil, autoTz: Bool? = nil, format: String? = nil, businessDays: Bool? = nil, holidayCountry: String? = nil, holidaySubdivision: String? = nil, sign: Bool? = nil, completion: @escaping (_ data: ElapsedResponse?, _ error: Error?) -> Void)
```

Time elapsed since or remaining until a reference instant

Computes elapsed or remaining duration relative to one required reference timestamp.  Reference timestamp forms: - `unix=1711300000` - `unix_ms=1711300000000` - `iso=2026-04-16T09:00:00Z` - `iso=2026-04-16T09:00:00&source_tz=America/New_York` - `iso=2026-04-16T09:00:00&source_ip=8.8.8.8` - `iso=2026-04-16T09:00:00&source_lat=40.7128&source_lon=-74.0060` - `iso=2026-04-16T09:00:00&source_offset=-05:00`  Compare timestamp forms: - `compare_unix=1711213600` - `compare_unix_ms=1711213600000` - `compare_iso=2026-04-16T09:00:00Z` - `compare_iso=2026-04-16T09:00:00&compare_source_tz=Europe/London` - `compare_iso=2026-04-16T09:00:00&compare_source_ip=8.8.8.8` - `compare_iso=2026-04-16T09:00:00&compare_source_lat=40.7128&compare_source_lon=-74.0060` - `compare_iso=2026-04-16T09:00:00&compare_source_offset=-05:00`  Compare selector forms: - `tz=America/New_York` - `ip=8.8.8.8` - `lat=40.7128&lon=-74.0060` - `offset=-04:00` - `auto_tz=true`  Incompatible combinations: - exactly one reference timestamp form - use either one compare timestamp form or one compare selector family, not both - use at most one of `source_tz`, `source_ip`, `source_lat`/`source_lon`, or `source_offset` - use at most one of `compare_source_tz`, `compare_source_ip`, `compare_source_lat`/`compare_source_lon`, or `compare_source_offset` - local-ISO companion selectors are valid only with `iso=...` that has no explicit offset - compare local-ISO companion selectors are valid only with `compare_iso=...` that has no explicit offset - if no compare input is provided, the comparison defaults to the request time - compare selectors (`tz`, `ip`, `lat`/`lon`, `offset`, `auto_tz`) all mean the current request time, which is the same instant in every zone, so they do not change the result - equal instants return `seconds: 0` with `direction: passed` (diff returns `same`)  Business-day rules: - `holiday_country` and `holiday_subdivision` require `business_days=true` - `holiday_subdivision` also requires `holiday_country` - same counting rules as diff; the reference date uses its `source_*` zone and the compare date its `compare_source_*` zone when given, otherwise UTC - weekends follow the holiday calendar's country (Friday/Saturday for `SA`); a subdivision uses its country's weekend - example with a subdivision: `iso=2026-01-02T00:00:00Z&compare_iso=2026-04-30T00:00:00Z&business_days=true&holiday_country=IN-MH` returns `business_days: 76` - example with a Friday/Saturday weekend: the same range with `holiday_country=SA` returns `business_days: 79`  Examples: - Timestamp-to-timestamp: `/v1/time/elapsed?iso=2026-04-16T09:00:00&source_tz=America/New_York&compare_iso=2026-04-16T09:00:00&compare_source_tz=Europe/London` - Timestamp-to-selector: `/v1/time/elapsed?unix=1711300000&tz=America/New_York&business_days=true`

### Example
```swift
// For support, visit https://github.com/TimeLogic-API-LLC/timelogic-api-sdks/issues
import TimeLogicAPI

let unix = 987 // Int64 | Whole Unix seconds (fractions are rejected; negative values are allowed). Valid range is -62135596800 to 253402300799 (0001-01-01T00:00:00Z to 9999-12-31T23:59:59Z); values outside it return 400 INVALID_TIMESTAMP. (optional)
let unixMs = 987 // Int64 | Whole Unix milliseconds. Valid range -62135596800000 to 253402300799999 (0001-01-01T00:00:00Z to 9999-12-31T23:59:59.999Z); values outside it return 400 INVALID_TIMESTAMP. (optional)
let iso = "iso_example" // String | ISO-8601 timestamp. To supply a local wall-clock time without an explicit offset, pair it with one of `source_tz=Area/City`, `source_ip=...`, `source_lat=...&source_lon=...`, or `source_offset=±HH:MM`; without a hint a local value is read as UTC. Accepted shapes are extended format with `Z`, `±HH:MM` or `±HH:MM:SS` (for example `1900-06-01T12:09:21+00:09:21`, as `iso_local` prints old local-mean-time offsets), optional fractional seconds, a space instead of `T`, a local time, or a date alone (read as 00:00). Basic format and offsets without a colon are rejected. The date must exist (`2027-02-29` returns 400 INVALID_TIMESTAMP rather than rolling over), and the instant must fall between 0001-01-01T00:00:00Z and 9999-12-31T23:59:59Z. A local time inside a spring-forward gap returns 400 INVALID_TIMESTAMP; an ambiguous fall-back time resolves to its first occurrence. (optional)
let sourceTz = "sourceTz_example" // String | Used only with `iso=...` when the ISO value has no explicit offset. (optional)
let sourceIp = "sourceIp_example" // String | Used only with `iso=...` when the ISO value has no explicit offset. Resolves that local wall-clock time through the timezone mapped from this IP address. (optional)
let sourceLat = 987 // Double | Used only with `iso=...` when the ISO value has no explicit offset. Provide together with `source_lon` to resolve that local wall-clock time through the timezone mapped from these coordinates. (optional)
let sourceLon = 987 // Double | Used only with `iso=...` when the ISO value has no explicit offset. Provide together with `source_lat`. (optional)
let sourceOffset = "sourceOffset_example" // String | Used only with `iso=...` when the ISO value has no explicit offset. Interprets that local wall-clock time at this fixed UTC offset. (optional)
let compareUnix = 987 // Int64 |  (optional)
let compareUnixMs = 987 // Int64 |  (optional)
let compareIso = "compareIso_example" // String | ISO-8601 comparison timestamp. To supply a local wall-clock time without an explicit offset, pair it with one of `compare_source_tz=Area/City`, `compare_source_ip=...`, `compare_source_lat=...&compare_source_lon=...`, or `compare_source_offset=±HH:MM`. (optional)
let compareSourceTz = "compareSourceTz_example" // String | Used only with `compare_iso=...` when the ISO value has no explicit offset. (optional)
let compareSourceIp = "compareSourceIp_example" // String | Used only with `compare_iso=...` when the ISO value has no explicit offset. Resolves that local wall-clock time through the timezone mapped from this IP address. (optional)
let compareSourceLat = 987 // Double | Used only with `compare_iso=...` when the ISO value has no explicit offset. Provide together with `compare_source_lon` to resolve that local wall-clock time through the timezone mapped from these coordinates. (optional)
let compareSourceLon = 987 // Double | Used only with `compare_iso=...` when the ISO value has no explicit offset. Provide together with `compare_source_lat`. (optional)
let compareSourceOffset = "compareSourceOffset_example" // String | Used only with `compare_iso=...` when the ISO value has no explicit offset. Interprets that local wall-clock time at this fixed UTC offset. (optional)
let tz = "tz_example" // String | IANA timezone name, matched case-insensitively. Links and aliases resolve to their canonical zone, so the returned `timezone` can differ (`Europe/Stockholm` returns `Europe/Berlin`, `UTC` returns `Etc/UTC`). `Etc/GMT+5` is UTC-05:00 (POSIX sign). On bulk-capable routes, a comma-separated list enables bulk mode with at most 10 values (any comma, even a trailing one, returns an array); request URLs are limited to 8192 characters. On single-target routes a list is rejected as an invalid timezone. (optional)
let ip = "ip_example" // String | IP address. On bulk-capable routes, a comma-separated list enables bulk mode with at most 10 values; request URLs are limited to 8192 characters. (optional)
let lat = 987 // Double | Latitude. Must be provided together with `lon`. (optional)
let lon = 987 // Double | Longitude. Must be provided together with `lat`. (optional)
let offset = "offset_example" // String | Fixed UTC offset in `+HH:MM` or `-HH:MM` format only (`+0530` and `+5` are rejected); URL-encode `+` as `%2B`, since an unencoded `+` is read as a space. An offset target returns `timezone=null`. On bulk-capable routes, a comma-separated list enables bulk mode with at most 10 values; request URLs are limited to 8192 characters. (optional)
let autoTz = true // Bool | Set to `true` to resolve using the caller IP from Cloudflare headers. Counts as a selector family, so it cannot be combined with `tz`, `ip`, `lat`/`lon` or `offset`. Not supported on `/v1/time/clock`. Enabled by `true`, `1` or `yes` (case-insensitive); any other value leaves it off without an error. (optional)
let format = "format_example" // String | Custom duration format template using `%days`, `%hours`, `%minutes`, and `%seconds`. Each placeholder is the total duration in that unit, not a remainder (118 days renders `%days days %hours hours` as `118 days 2832 hours`). (optional)
let businessDays = true // Bool | Set to `true` to add a `business_days` count. Days are counted by calendar date, start included and end excluded, unsigned; weekends follow the holiday calendar's country (Saturday/Sunday in 221 countries, Friday/Saturday in 18 such as SA, Sunday only in 8, Friday only in IR, Friday/Sunday in BN; Saturday/Sunday when no `holiday_country` is given) and holidays of the chosen calendar are skipped. Each endpoint's date is taken in its own zone when one is known (diff - from_*_/to_* hints or a tz=/ip=/offset= specifier; elapsed - source_*_/compare_source_*), otherwise in UTC. Enabled by `true`, `1` or `yes` (case-insensitive); any other value leaves it off without an error. (optional)
let holidayCountry = "holidayCountry_example" // String | Holiday calendar: one of the 249 countries with holiday calendars (862 calendars including subdivisions, years 1900-2100), as an ISO 3166-1 alpha-2 code in any letter case, or a combined ISO 3166-2 style code such as `CH-ZH`, `US-CA` or `FR-6AE`. Requires `business_days=true`. The full list is at https://timelogicapi.com/docs#holiday-calendars and, as JSON, at https://timelogicapi.com/content/holiday-calendars.json. Any other country (for example `LK`) returns 400 INVALID_PARAMETER \"Unsupported holiday calendar.\"; a malformed value returns \"Invalid holiday_country parameter.\"; a business-day range outside 1900-2100 returns \"Holiday calendar coverage is only available for years 1900-2100.\" (optional)
let holidaySubdivision = "holidaySubdivision_example" // String | Holiday calendar subdivision code for the country (the ISO 3166-2 suffix, 1-3 letters or digits, any letter case), for example `ENG` (GB), `ZH` (CH), `MH` (IN), `01` (FI) or `6AE` (FR); digits and leading zeros are part of the code. Subdivisions exist for 35 countries. Requires `holiday_country` and `business_days=true`. An unknown code returns 400 INVALID_PARAMETER \"Unknown holiday_subdivision 'XX' for country DE.\" (also for `FI` + `1`, which must be `01`); a value that conflicts with a combined `holiday_country` such as `US-CA` returns 400 INVALID_PARAMETER. (optional)
let sign = true // Bool | Set to `true`, `1` or `yes` (case-insensitive) to ask the gateway to sign the final JSON response. Any other value, a bare `sign`, or repeated `sign` values leave the response unsigned. Every authenticated JSON response, including errors, then includes signing headers. Not supported on `/v1/time/clock`. (optional)

// Time elapsed since or remaining until a reference instant
TimeAPI.getElapsed(unix: unix, unixMs: unixMs, iso: iso, sourceTz: sourceTz, sourceIp: sourceIp, sourceLat: sourceLat, sourceLon: sourceLon, sourceOffset: sourceOffset, compareUnix: compareUnix, compareUnixMs: compareUnixMs, compareIso: compareIso, compareSourceTz: compareSourceTz, compareSourceIp: compareSourceIp, compareSourceLat: compareSourceLat, compareSourceLon: compareSourceLon, compareSourceOffset: compareSourceOffset, tz: tz, ip: ip, lat: lat, lon: lon, offset: offset, autoTz: autoTz, format: format, businessDays: businessDays, holidayCountry: holidayCountry, holidaySubdivision: holidaySubdivision, sign: sign) { (response, error) in
    guard error == nil else {
        print(error)
        return
    }

    if (response) {
        dump(response)
    }
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **unix** | **Int64** | Whole Unix seconds (fractions are rejected; negative values are allowed). Valid range is -62135596800 to 253402300799 (0001-01-01T00:00:00Z to 9999-12-31T23:59:59Z); values outside it return 400 INVALID_TIMESTAMP. | [optional]
 **unixMs** | **Int64** | Whole Unix milliseconds. Valid range -62135596800000 to 253402300799999 (0001-01-01T00:00:00Z to 9999-12-31T23:59:59.999Z); values outside it return 400 INVALID_TIMESTAMP. | [optional]
 **iso** | **String** | ISO-8601 timestamp. To supply a local wall-clock time without an explicit offset, pair it with one of &#x60;source_tz&#x3D;Area/City&#x60;, &#x60;source_ip&#x3D;...&#x60;, &#x60;source_lat&#x3D;...&amp;source_lon&#x3D;...&#x60;, or &#x60;source_offset&#x3D;±HH:MM&#x60;; without a hint a local value is read as UTC. Accepted shapes are extended format with &#x60;Z&#x60;, &#x60;±HH:MM&#x60; or &#x60;±HH:MM:SS&#x60; (for example &#x60;1900-06-01T12:09:21+00:09:21&#x60;, as &#x60;iso_local&#x60; prints old local-mean-time offsets), optional fractional seconds, a space instead of &#x60;T&#x60;, a local time, or a date alone (read as 00:00). Basic format and offsets without a colon are rejected. The date must exist (&#x60;2027-02-29&#x60; returns 400 INVALID_TIMESTAMP rather than rolling over), and the instant must fall between 0001-01-01T00:00:00Z and 9999-12-31T23:59:59Z. A local time inside a spring-forward gap returns 400 INVALID_TIMESTAMP; an ambiguous fall-back time resolves to its first occurrence. | [optional]
 **sourceTz** | **String** | Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. | [optional]
 **sourceIp** | **String** | Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Resolves that local wall-clock time through the timezone mapped from this IP address. | [optional]
 **sourceLat** | **Double** | Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Provide together with &#x60;source_lon&#x60; to resolve that local wall-clock time through the timezone mapped from these coordinates. | [optional]
 **sourceLon** | **Double** | Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Provide together with &#x60;source_lat&#x60;. | [optional]
 **sourceOffset** | **String** | Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Interprets that local wall-clock time at this fixed UTC offset. | [optional]
 **compareUnix** | **Int64** |  | [optional]
 **compareUnixMs** | **Int64** |  | [optional]
 **compareIso** | **String** | ISO-8601 comparison timestamp. To supply a local wall-clock time without an explicit offset, pair it with one of &#x60;compare_source_tz&#x3D;Area/City&#x60;, &#x60;compare_source_ip&#x3D;...&#x60;, &#x60;compare_source_lat&#x3D;...&amp;compare_source_lon&#x3D;...&#x60;, or &#x60;compare_source_offset&#x3D;±HH:MM&#x60;. | [optional]
 **compareSourceTz** | **String** | Used only with &#x60;compare_iso&#x3D;...&#x60; when the ISO value has no explicit offset. | [optional]
 **compareSourceIp** | **String** | Used only with &#x60;compare_iso&#x3D;...&#x60; when the ISO value has no explicit offset. Resolves that local wall-clock time through the timezone mapped from this IP address. | [optional]
 **compareSourceLat** | **Double** | Used only with &#x60;compare_iso&#x3D;...&#x60; when the ISO value has no explicit offset. Provide together with &#x60;compare_source_lon&#x60; to resolve that local wall-clock time through the timezone mapped from these coordinates. | [optional]
 **compareSourceLon** | **Double** | Used only with &#x60;compare_iso&#x3D;...&#x60; when the ISO value has no explicit offset. Provide together with &#x60;compare_source_lat&#x60;. | [optional]
 **compareSourceOffset** | **String** | Used only with &#x60;compare_iso&#x3D;...&#x60; when the ISO value has no explicit offset. Interprets that local wall-clock time at this fixed UTC offset. | [optional]
 **tz** | **String** | IANA timezone name, matched case-insensitively. Links and aliases resolve to their canonical zone, so the returned &#x60;timezone&#x60; can differ (&#x60;Europe/Stockholm&#x60; returns &#x60;Europe/Berlin&#x60;, &#x60;UTC&#x60; returns &#x60;Etc/UTC&#x60;). &#x60;Etc/GMT+5&#x60; is UTC-05:00 (POSIX sign). On bulk-capable routes, a comma-separated list enables bulk mode with at most 10 values (any comma, even a trailing one, returns an array); request URLs are limited to 8192 characters. On single-target routes a list is rejected as an invalid timezone. | [optional]
 **ip** | **String** | IP address. On bulk-capable routes, a comma-separated list enables bulk mode with at most 10 values; request URLs are limited to 8192 characters. | [optional]
 **lat** | **Double** | Latitude. Must be provided together with &#x60;lon&#x60;. | [optional]
 **lon** | **Double** | Longitude. Must be provided together with &#x60;lat&#x60;. | [optional]
 **offset** | **String** | Fixed UTC offset in &#x60;+HH:MM&#x60; or &#x60;-HH:MM&#x60; format only (&#x60;+0530&#x60; and &#x60;+5&#x60; are rejected); URL-encode &#x60;+&#x60; as &#x60;%2B&#x60;, since an unencoded &#x60;+&#x60; is read as a space. An offset target returns &#x60;timezone&#x3D;null&#x60;. On bulk-capable routes, a comma-separated list enables bulk mode with at most 10 values; request URLs are limited to 8192 characters. | [optional]
 **autoTz** | **Bool** | Set to &#x60;true&#x60; to resolve using the caller IP from Cloudflare headers. Counts as a selector family, so it cannot be combined with &#x60;tz&#x60;, &#x60;ip&#x60;, &#x60;lat&#x60;/&#x60;lon&#x60; or &#x60;offset&#x60;. Not supported on &#x60;/v1/time/clock&#x60;. Enabled by &#x60;true&#x60;, &#x60;1&#x60; or &#x60;yes&#x60; (case-insensitive); any other value leaves it off without an error. | [optional]
 **format** | **String** | Custom duration format template using &#x60;%days&#x60;, &#x60;%hours&#x60;, &#x60;%minutes&#x60;, and &#x60;%seconds&#x60;. Each placeholder is the total duration in that unit, not a remainder (118 days renders &#x60;%days days %hours hours&#x60; as &#x60;118 days 2832 hours&#x60;). | [optional]
 **businessDays** | **Bool** | Set to &#x60;true&#x60; to add a &#x60;business_days&#x60; count. Days are counted by calendar date, start included and end excluded, unsigned; weekends follow the holiday calendar&#39;s country (Saturday/Sunday in 221 countries, Friday/Saturday in 18 such as SA, Sunday only in 8, Friday only in IR, Friday/Sunday in BN; Saturday/Sunday when no &#x60;holiday_country&#x60; is given) and holidays of the chosen calendar are skipped. Each endpoint&#39;s date is taken in its own zone when one is known (diff - from_*_/to_* hints or a tz&#x3D;/ip&#x3D;/offset&#x3D; specifier; elapsed - source_*_/compare_source_*), otherwise in UTC. Enabled by &#x60;true&#x60;, &#x60;1&#x60; or &#x60;yes&#x60; (case-insensitive); any other value leaves it off without an error. | [optional]
 **holidayCountry** | **String** | Holiday calendar: one of the 249 countries with holiday calendars (862 calendars including subdivisions, years 1900-2100), as an ISO 3166-1 alpha-2 code in any letter case, or a combined ISO 3166-2 style code such as &#x60;CH-ZH&#x60;, &#x60;US-CA&#x60; or &#x60;FR-6AE&#x60;. Requires &#x60;business_days&#x3D;true&#x60;. The full list is at https://timelogicapi.com/docs#holiday-calendars and, as JSON, at https://timelogicapi.com/content/holiday-calendars.json. Any other country (for example &#x60;LK&#x60;) returns 400 INVALID_PARAMETER \&quot;Unsupported holiday calendar.\&quot;; a malformed value returns \&quot;Invalid holiday_country parameter.\&quot;; a business-day range outside 1900-2100 returns \&quot;Holiday calendar coverage is only available for years 1900-2100.\&quot; | [optional]
 **holidaySubdivision** | **String** | Holiday calendar subdivision code for the country (the ISO 3166-2 suffix, 1-3 letters or digits, any letter case), for example &#x60;ENG&#x60; (GB), &#x60;ZH&#x60; (CH), &#x60;MH&#x60; (IN), &#x60;01&#x60; (FI) or &#x60;6AE&#x60; (FR); digits and leading zeros are part of the code. Subdivisions exist for 35 countries. Requires &#x60;holiday_country&#x60; and &#x60;business_days&#x3D;true&#x60;. An unknown code returns 400 INVALID_PARAMETER \&quot;Unknown holiday_subdivision &#39;XX&#39; for country DE.\&quot; (also for &#x60;FI&#x60; + &#x60;1&#x60;, which must be &#x60;01&#x60;); a value that conflicts with a combined &#x60;holiday_country&#x60; such as &#x60;US-CA&#x60; returns 400 INVALID_PARAMETER. | [optional]
 **sign** | **Bool** | Set to &#x60;true&#x60;, &#x60;1&#x60; or &#x60;yes&#x60; (case-insensitive) to ask the gateway to sign the final JSON response. Any other value, a bare &#x60;sign&#x60;, or repeated &#x60;sign&#x60; values leave the response unsigned. Every authenticated JSON response, including errors, then includes signing headers. Not supported on &#x60;/v1/time/clock&#x60;. | [optional]

### Return type

[**ElapsedResponse**](ElapsedResponse.md)

### Authorization

[apiKeyHeader](../README.md#apiKeyHeader), [bearerAuth](../README.md#bearerAuth), [apiKeyQuery](../README.md#apiKeyQuery), [rapidApiKey](../README.md#rapidApiKey), [rapidApiHost](../README.md#rapidApiHost)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getTimezone**
```swift
    open class func getTimezone(tz: String? = nil, ip: String? = nil, lat: Double? = nil, lon: Double? = nil, offset: String? = nil, autoTz: Bool? = nil, sign: Bool? = nil, completion: @escaping (_ data: GetTimezone200Response?, _ error: Error?) -> Void)
```

Resolve timezone information for a target

Resolves timezone metadata for a single target.  Target selector rules: - Use exactly one selector family: `tz`, `ip`, `lat` + `lon`, `offset`, or `auto_tz=true`. - Bulk is not supported on this route. - With no selector the route returns 400 MISSING_TARGET. - `offset` queries return a specialized payload with `timezone=null` and `matching_zones` for the request-time offset match. Only geographic zones are listed; `UTC` and `Etc/_*` are intentionally excluded (use `tz=UTC` for UTC). - `tz` names resolve to their canonical zone (`Europe/Stockholm` returns `Europe/Berlin`). - An `ip` with no timezone mapping returns 404 NOT_FOUND.  Examples: - Single target: `/v1/timezone?tz=America/New_York` - Offset match: `/v1/timezone?offset=-04:00`

### Example
```swift
// For support, visit https://github.com/TimeLogic-API-LLC/timelogic-api-sdks/issues
import TimeLogicAPI

let tz = "tz_example" // String | IANA timezone name, matched case-insensitively. Links and aliases resolve to their canonical zone, so the returned `timezone` can differ (`Europe/Stockholm` returns `Europe/Berlin`, `UTC` returns `Etc/UTC`). `Etc/GMT+5` is UTC-05:00 (POSIX sign). On bulk-capable routes, a comma-separated list enables bulk mode with at most 10 values (any comma, even a trailing one, returns an array); request URLs are limited to 8192 characters. On single-target routes a list is rejected as an invalid timezone. (optional)
let ip = "ip_example" // String | IP address. On bulk-capable routes, a comma-separated list enables bulk mode with at most 10 values; request URLs are limited to 8192 characters. (optional)
let lat = 987 // Double | Latitude. Must be provided together with `lon`. (optional)
let lon = 987 // Double | Longitude. Must be provided together with `lat`. (optional)
let offset = "offset_example" // String | Fixed UTC offset in `+HH:MM` or `-HH:MM` format only (`+0530` and `+5` are rejected); URL-encode `+` as `%2B`, since an unencoded `+` is read as a space. An offset target returns `timezone=null`. On bulk-capable routes, a comma-separated list enables bulk mode with at most 10 values; request URLs are limited to 8192 characters. (optional)
let autoTz = true // Bool | Set to `true` to resolve using the caller IP from Cloudflare headers. Counts as a selector family, so it cannot be combined with `tz`, `ip`, `lat`/`lon` or `offset`. Not supported on `/v1/time/clock`. Enabled by `true`, `1` or `yes` (case-insensitive); any other value leaves it off without an error. (optional)
let sign = true // Bool | Set to `true`, `1` or `yes` (case-insensitive) to ask the gateway to sign the final JSON response. Any other value, a bare `sign`, or repeated `sign` values leave the response unsigned. Every authenticated JSON response, including errors, then includes signing headers. Not supported on `/v1/time/clock`. (optional)

// Resolve timezone information for a target
TimeAPI.getTimezone(tz: tz, ip: ip, lat: lat, lon: lon, offset: offset, autoTz: autoTz, sign: sign) { (response, error) in
    guard error == nil else {
        print(error)
        return
    }

    if (response) {
        dump(response)
    }
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **tz** | **String** | IANA timezone name, matched case-insensitively. Links and aliases resolve to their canonical zone, so the returned &#x60;timezone&#x60; can differ (&#x60;Europe/Stockholm&#x60; returns &#x60;Europe/Berlin&#x60;, &#x60;UTC&#x60; returns &#x60;Etc/UTC&#x60;). &#x60;Etc/GMT+5&#x60; is UTC-05:00 (POSIX sign). On bulk-capable routes, a comma-separated list enables bulk mode with at most 10 values (any comma, even a trailing one, returns an array); request URLs are limited to 8192 characters. On single-target routes a list is rejected as an invalid timezone. | [optional]
 **ip** | **String** | IP address. On bulk-capable routes, a comma-separated list enables bulk mode with at most 10 values; request URLs are limited to 8192 characters. | [optional]
 **lat** | **Double** | Latitude. Must be provided together with &#x60;lon&#x60;. | [optional]
 **lon** | **Double** | Longitude. Must be provided together with &#x60;lat&#x60;. | [optional]
 **offset** | **String** | Fixed UTC offset in &#x60;+HH:MM&#x60; or &#x60;-HH:MM&#x60; format only (&#x60;+0530&#x60; and &#x60;+5&#x60; are rejected); URL-encode &#x60;+&#x60; as &#x60;%2B&#x60;, since an unencoded &#x60;+&#x60; is read as a space. An offset target returns &#x60;timezone&#x3D;null&#x60;. On bulk-capable routes, a comma-separated list enables bulk mode with at most 10 values; request URLs are limited to 8192 characters. | [optional]
 **autoTz** | **Bool** | Set to &#x60;true&#x60; to resolve using the caller IP from Cloudflare headers. Counts as a selector family, so it cannot be combined with &#x60;tz&#x60;, &#x60;ip&#x60;, &#x60;lat&#x60;/&#x60;lon&#x60; or &#x60;offset&#x60;. Not supported on &#x60;/v1/time/clock&#x60;. Enabled by &#x60;true&#x60;, &#x60;1&#x60; or &#x60;yes&#x60; (case-insensitive); any other value leaves it off without an error. | [optional]
 **sign** | **Bool** | Set to &#x60;true&#x60;, &#x60;1&#x60; or &#x60;yes&#x60; (case-insensitive) to ask the gateway to sign the final JSON response. Any other value, a bare &#x60;sign&#x60;, or repeated &#x60;sign&#x60; values leave the response unsigned. Every authenticated JSON response, including errors, then includes signing headers. Not supported on &#x60;/v1/time/clock&#x60;. | [optional]

### Return type

[**GetTimezone200Response**](GetTimezone200Response.md)

### Authorization

[apiKeyHeader](../README.md#apiKeyHeader), [bearerAuth](../README.md#bearerAuth), [apiKeyQuery](../README.md#apiKeyQuery), [rapidApiKey](../README.md#rapidApiKey), [rapidApiHost](../README.md#rapidApiHost)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

