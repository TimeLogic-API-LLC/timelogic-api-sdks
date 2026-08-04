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
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let unix = 987 // Int64 |  (optional)
let unixMs = 987 // Int64 |  (optional)
let iso = "iso_example" // String | ISO-8601 timestamp. To supply a local wall-clock time without an explicit offset, pair it with one of `source_tz=Area/City`, `source_ip=...`, `source_lat=...&source_lon=...`, or `source_offset=±HH:MM`. (optional)
let sourceTz = "sourceTz_example" // String | Used only with `iso=...` when the ISO value has no explicit offset. (optional)
let sourceIp = "sourceIp_example" // String | Used only with `iso=...` when the ISO value has no explicit offset. Resolves that local wall-clock time through the timezone mapped from this IP address. (optional)
let sourceLat = 987 // Double | Used only with `iso=...` when the ISO value has no explicit offset. Provide together with `source_lon` to resolve that local wall-clock time through the timezone mapped from these coordinates. (optional)
let sourceLon = 987 // Double | Used only with `iso=...` when the ISO value has no explicit offset. Provide together with `source_lat`. (optional)
let sourceOffset = "sourceOffset_example" // String | Used only with `iso=...` when the ISO value has no explicit offset. Interprets that local wall-clock time at this fixed UTC offset. (optional)
let seconds = 987 // Int |  (optional)
let minutes = 987 // Int |  (optional)
let hours = 987 // Int |  (optional)
let days = 987 // Int |  (optional)
let tz = "tz_example" // String | IANA timezone name. On bulk-capable routes, a comma-separated list enables bulk mode. (optional)
let ip = "ip_example" // String | IP address. On bulk-capable routes, a comma-separated list enables bulk mode. (optional)
let lat = 987 // Double | Latitude. Must be provided together with `lon`. (optional)
let lon = 987 // Double | Longitude. Must be provided together with `lat`. (optional)
let offset = "offset_example" // String | Fixed UTC offset in `+HH:MM` or `-HH:MM` format. On bulk-capable routes, a comma-separated list enables bulk mode. (optional)
let autoTz = true // Bool | Set to `true` to resolve using the caller IP from Cloudflare headers. (optional)
let utc = true // Bool | Set to `true` to force UTC on routes that support it. (optional)
let format = "format_example" // String | Custom date/time format template using supported `strftime`-style directives such as `%Y-%m-%d %H:%M:%S`. Reference: [strftime](https://strftime.net/). (optional)
let sign = true // Bool | Set to exactly `true` to ask the gateway to sign the final JSON response. Every authenticated JSON response, including errors, then includes signing headers. Not supported on `/v1/time/clock`. (optional)

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
 **unix** | **Int64** |  | [optional] 
 **unixMs** | **Int64** |  | [optional] 
 **iso** | **String** | ISO-8601 timestamp. To supply a local wall-clock time without an explicit offset, pair it with one of &#x60;source_tz&#x3D;Area/City&#x60;, &#x60;source_ip&#x3D;...&#x60;, &#x60;source_lat&#x3D;...&amp;source_lon&#x3D;...&#x60;, or &#x60;source_offset&#x3D;±HH:MM&#x60;. | [optional] 
 **sourceTz** | **String** | Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. | [optional] 
 **sourceIp** | **String** | Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Resolves that local wall-clock time through the timezone mapped from this IP address. | [optional] 
 **sourceLat** | **Double** | Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Provide together with &#x60;source_lon&#x60; to resolve that local wall-clock time through the timezone mapped from these coordinates. | [optional] 
 **sourceLon** | **Double** | Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Provide together with &#x60;source_lat&#x60;. | [optional] 
 **sourceOffset** | **String** | Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Interprets that local wall-clock time at this fixed UTC offset. | [optional] 
 **seconds** | **Int** |  | [optional] 
 **minutes** | **Int** |  | [optional] 
 **hours** | **Int** |  | [optional] 
 **days** | **Int** |  | [optional] 
 **tz** | **String** | IANA timezone name. On bulk-capable routes, a comma-separated list enables bulk mode. | [optional] 
 **ip** | **String** | IP address. On bulk-capable routes, a comma-separated list enables bulk mode. | [optional] 
 **lat** | **Double** | Latitude. Must be provided together with &#x60;lon&#x60;. | [optional] 
 **lon** | **Double** | Longitude. Must be provided together with &#x60;lat&#x60;. | [optional] 
 **offset** | **String** | Fixed UTC offset in &#x60;+HH:MM&#x60; or &#x60;-HH:MM&#x60; format. On bulk-capable routes, a comma-separated list enables bulk mode. | [optional] 
 **autoTz** | **Bool** | Set to &#x60;true&#x60; to resolve using the caller IP from Cloudflare headers. | [optional] 
 **utc** | **Bool** | Set to &#x60;true&#x60; to force UTC on routes that support it. | [optional] 
 **format** | **String** | Custom date/time format template using supported &#x60;strftime&#x60;-style directives such as &#x60;%Y-%m-%d %H:%M:%S&#x60;. Reference: [strftime](https://strftime.net/). | [optional] 
 **sign** | **Bool** | Set to exactly &#x60;true&#x60; to ask the gateway to sign the final JSON response. Every authenticated JSON response, including errors, then includes signing headers. Not supported on &#x60;/v1/time/clock&#x60;. | [optional] 

### Return type

[**TimePayload**](TimePayload.md)

### Authorization

[directApiKeyHeader](../README.md#directApiKeyHeader), [directBearerAuth](../README.md#directBearerAuth), [directApiKeyQuery](../README.md#directApiKeyQuery), [rapidApiKey](../README.md#rapidApiKey), [rapidApiHost](../README.md#rapidApiHost)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **convertTime**
```swift
    open class func convertTime(unix: Int64? = nil, unixMs: Int64? = nil, iso: String? = nil, sourceTz: String? = nil, sourceIp: String? = nil, sourceLat: Double? = nil, sourceLon: Double? = nil, sourceOffset: String? = nil, tz: String? = nil, ip: String? = nil, lat: Double? = nil, lon: Double? = nil, offset: String? = nil, autoTz: Bool? = nil, utc: Bool? = nil, format: String? = nil, sign: Bool? = nil, completion: @escaping (_ data: GetCurrentTime200Response?, _ error: Error?) -> Void)
```

Convert a timestamp into a target timezone or offset

Converts one required input timestamp into a single target or a bulk array.  Input timestamp forms: - `unix=1711300000` - `unix_ms=1711300000000` - `iso=2026-04-16T09:00:00Z` - `iso=2026-04-16T09:00:00&source_tz=America/New_York` - `iso=2026-04-16T09:00:00&source_ip=8.8.8.8` - `iso=2026-04-16T09:00:00&source_lat=40.7128&source_lon=-74.0060` - `iso=2026-04-16T09:00:00&source_offset=-05:00`  Target selector forms: - `tz=America/New_York` - `ip=8.8.8.8` - `lat=40.7128&lon=-74.0060` - `offset=-04:00` - `auto_tz=true` - `utc=true`  Incompatible combinations: - exactly one input timestamp form - exactly one target selector family - use at most one of `source_tz`, `source_ip`, `source_lat`/`source_lon`, or `source_offset` - local-ISO companion selectors are valid only with `iso=...` that has no explicit offset - bulk is allowed only through one comma-separated `tz`, `ip`, or `offset` selector  Examples: - Single target: `/v1/time/convert?iso=2026-04-16T09:00:00&source_tz=America/New_York&tz=Europe/London` - Bulk target set: `/v1/time/convert?unix=1711300000&offset=-04:00,+00:00,+09:00` 

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let unix = 987 // Int64 |  (optional)
let unixMs = 987 // Int64 |  (optional)
let iso = "iso_example" // String | ISO-8601 timestamp. To supply a local wall-clock time without an explicit offset, pair it with one of `source_tz=Area/City`, `source_ip=...`, `source_lat=...&source_lon=...`, or `source_offset=±HH:MM`. (optional)
let sourceTz = "sourceTz_example" // String | Used only with `iso=...` when the ISO value has no explicit offset. (optional)
let sourceIp = "sourceIp_example" // String | Used only with `iso=...` when the ISO value has no explicit offset. Resolves that local wall-clock time through the timezone mapped from this IP address. (optional)
let sourceLat = 987 // Double | Used only with `iso=...` when the ISO value has no explicit offset. Provide together with `source_lon` to resolve that local wall-clock time through the timezone mapped from these coordinates. (optional)
let sourceLon = 987 // Double | Used only with `iso=...` when the ISO value has no explicit offset. Provide together with `source_lat`. (optional)
let sourceOffset = "sourceOffset_example" // String | Used only with `iso=...` when the ISO value has no explicit offset. Interprets that local wall-clock time at this fixed UTC offset. (optional)
let tz = "tz_example" // String | IANA timezone name. On bulk-capable routes, a comma-separated list enables bulk mode. (optional)
let ip = "ip_example" // String | IP address. On bulk-capable routes, a comma-separated list enables bulk mode. (optional)
let lat = 987 // Double | Latitude. Must be provided together with `lon`. (optional)
let lon = 987 // Double | Longitude. Must be provided together with `lat`. (optional)
let offset = "offset_example" // String | Fixed UTC offset in `+HH:MM` or `-HH:MM` format. On bulk-capable routes, a comma-separated list enables bulk mode. (optional)
let autoTz = true // Bool | Set to `true` to resolve using the caller IP from Cloudflare headers. (optional)
let utc = true // Bool | Set to `true` to force UTC on routes that support it. (optional)
let format = "format_example" // String | Custom date/time format template using supported `strftime`-style directives such as `%Y-%m-%d %H:%M:%S`. Reference: [strftime](https://strftime.net/). (optional)
let sign = true // Bool | Set to exactly `true` to ask the gateway to sign the final JSON response. Every authenticated JSON response, including errors, then includes signing headers. Not supported on `/v1/time/clock`. (optional)

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
 **unix** | **Int64** |  | [optional] 
 **unixMs** | **Int64** |  | [optional] 
 **iso** | **String** | ISO-8601 timestamp. To supply a local wall-clock time without an explicit offset, pair it with one of &#x60;source_tz&#x3D;Area/City&#x60;, &#x60;source_ip&#x3D;...&#x60;, &#x60;source_lat&#x3D;...&amp;source_lon&#x3D;...&#x60;, or &#x60;source_offset&#x3D;±HH:MM&#x60;. | [optional] 
 **sourceTz** | **String** | Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. | [optional] 
 **sourceIp** | **String** | Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Resolves that local wall-clock time through the timezone mapped from this IP address. | [optional] 
 **sourceLat** | **Double** | Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Provide together with &#x60;source_lon&#x60; to resolve that local wall-clock time through the timezone mapped from these coordinates. | [optional] 
 **sourceLon** | **Double** | Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Provide together with &#x60;source_lat&#x60;. | [optional] 
 **sourceOffset** | **String** | Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Interprets that local wall-clock time at this fixed UTC offset. | [optional] 
 **tz** | **String** | IANA timezone name. On bulk-capable routes, a comma-separated list enables bulk mode. | [optional] 
 **ip** | **String** | IP address. On bulk-capable routes, a comma-separated list enables bulk mode. | [optional] 
 **lat** | **Double** | Latitude. Must be provided together with &#x60;lon&#x60;. | [optional] 
 **lon** | **Double** | Longitude. Must be provided together with &#x60;lat&#x60;. | [optional] 
 **offset** | **String** | Fixed UTC offset in &#x60;+HH:MM&#x60; or &#x60;-HH:MM&#x60; format. On bulk-capable routes, a comma-separated list enables bulk mode. | [optional] 
 **autoTz** | **Bool** | Set to &#x60;true&#x60; to resolve using the caller IP from Cloudflare headers. | [optional] 
 **utc** | **Bool** | Set to &#x60;true&#x60; to force UTC on routes that support it. | [optional] 
 **format** | **String** | Custom date/time format template using supported &#x60;strftime&#x60;-style directives such as &#x60;%Y-%m-%d %H:%M:%S&#x60;. Reference: [strftime](https://strftime.net/). | [optional] 
 **sign** | **Bool** | Set to exactly &#x60;true&#x60; to ask the gateway to sign the final JSON response. Every authenticated JSON response, including errors, then includes signing headers. Not supported on &#x60;/v1/time/clock&#x60;. | [optional] 

### Return type

[**GetCurrentTime200Response**](GetCurrentTime200Response.md)

### Authorization

[directApiKeyHeader](../README.md#directApiKeyHeader), [directBearerAuth](../README.md#directBearerAuth), [directApiKeyQuery](../README.md#directApiKeyQuery), [rapidApiKey](../README.md#rapidApiKey), [rapidApiHost](../README.md#rapidApiHost)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **diffTime**
```swift
    open class func diffTime(from: String, to: String, fromTz: String? = nil, fromIp: String? = nil, fromLat: Double? = nil, fromLon: Double? = nil, fromOffset: String? = nil, toTz: String? = nil, toIp: String? = nil, toLat: Double? = nil, toLon: Double? = nil, toOffset: String? = nil, format: String? = nil, businessDays: Bool? = nil, holidayCountry: String? = nil, holidaySubdivision: String? = nil, sign: Bool? = nil, completion: @escaping (_ data: DiffResponse?, _ error: Error?) -> Void)
```

Difference between two instants

Computes the duration between `from` and `to`.  Required query fields: `from` and `to` only. Do not send every optional companion field. For each side, choose one supported specifier form. A `from_*` or `to_*` companion is allowed only when that side uses `iso=...` with no explicit offset; use at most one companion selector, except that coordinate input requires its paired latitude and longitude.  `from` and `to` are embedded specifier strings.  Accepted specifier forms: - `from=now` - `from=unix=1711300000` - `from=unix_ms=1711300000000` - `from=iso=2026-04-16T09:00:00` - `from=tz=America/New_York` - `from=ip=8.8.8.8` - `from=offset=-05:00` - the same forms are accepted for `to`  Timezone hint pairings: - `from_tz` only with `from=iso=...` that has no explicit offset - `from_ip`, `from_lat`/`from_lon`, and `from_offset` only with `from=iso=...` that has no explicit offset - `to_tz` only with `to=iso=...` that has no explicit offset - `to_ip`, `to_lat`/`to_lon`, and `to_offset` only with `to=iso=...` that has no explicit offset  Selector semantics: - `tz=...`, `ip=...`, and `offset=...` inside `from` or `to` mean the current request-time instant resolved through that selector - those selector forms do not represent an arbitrary local wall-clock time - returned duration magnitudes are absolute; use `direction` to see whether `to` is after, before, or the same instant as `from`  Business-day rules: - `holiday_country` and `holiday_subdivision` require `business_days=true` - `holiday_subdivision` also requires `holiday_country`  Examples: - Selector-current instant: `/v1/time/diff?from=unix=1711300000&to=tz=America/New_York` - Wall-clock pairing: `/v1/time/diff?from=iso=2026-04-16T09:00:00&from_tz=America/New_York&to=iso=2026-04-16T09:00:00&to_tz=Europe/London` - Wall-clock via selector: `/v1/time/diff?from=iso=2026-01-01T12:00:00&from_ip=8.8.8.8&to=iso=2026-01-01T12:00:00&to_offset=-05:00` 

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

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
let format = "format_example" // String | Custom duration format template using `%days`, `%hours`, `%minutes`, and `%seconds`. (optional)
let businessDays = true // Bool | Set to `true` to enable weekday/business-day counting. (optional)
let holidayCountry = "holidayCountry_example" // String | ISO 3166-1 alpha-2 holiday calendar country code. Requires `business_days=true`. (optional)
let holidaySubdivision = "holidaySubdivision_example" // String | Holiday calendar subdivision code from the upstream `python-holidays` calendar, for example `CA` or `ENG`. Requires `holiday_country` and `business_days=true`. (optional)
let sign = true // Bool | Set to exactly `true` to ask the gateway to sign the final JSON response. Every authenticated JSON response, including errors, then includes signing headers. Not supported on `/v1/time/clock`. (optional)

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
 **format** | **String** | Custom duration format template using &#x60;%days&#x60;, &#x60;%hours&#x60;, &#x60;%minutes&#x60;, and &#x60;%seconds&#x60;. | [optional] 
 **businessDays** | **Bool** | Set to &#x60;true&#x60; to enable weekday/business-day counting. | [optional] 
 **holidayCountry** | **String** | ISO 3166-1 alpha-2 holiday calendar country code. Requires &#x60;business_days&#x3D;true&#x60;. | [optional] 
 **holidaySubdivision** | **String** | Holiday calendar subdivision code from the upstream &#x60;python-holidays&#x60; calendar, for example &#x60;CA&#x60; or &#x60;ENG&#x60;. Requires &#x60;holiday_country&#x60; and &#x60;business_days&#x3D;true&#x60;. | [optional] 
 **sign** | **Bool** | Set to exactly &#x60;true&#x60; to ask the gateway to sign the final JSON response. Every authenticated JSON response, including errors, then includes signing headers. Not supported on &#x60;/v1/time/clock&#x60;. | [optional] 

### Return type

[**DiffResponse**](DiffResponse.md)

### Authorization

[directApiKeyHeader](../README.md#directApiKeyHeader), [directBearerAuth](../README.md#directBearerAuth), [directApiKeyQuery](../README.md#directApiKeyQuery), [rapidApiKey](../README.md#rapidApiKey), [rapidApiHost](../README.md#rapidApiHost)

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
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let unix = 987 // Int64 |  (optional)
let unixMs = 987 // Int64 |  (optional)
let iso = "iso_example" // String | ISO-8601 timestamp. To supply a local wall-clock time without an explicit offset, pair it with one of `source_tz=Area/City`, `source_ip=...`, `source_lat=...&source_lon=...`, or `source_offset=±HH:MM`. (optional)
let sourceTz = "sourceTz_example" // String | Used only with `iso=...` when the ISO value has no explicit offset. (optional)
let sourceIp = "sourceIp_example" // String | Used only with `iso=...` when the ISO value has no explicit offset. Resolves that local wall-clock time through the timezone mapped from this IP address. (optional)
let sourceLat = 987 // Double | Used only with `iso=...` when the ISO value has no explicit offset. Provide together with `source_lon` to resolve that local wall-clock time through the timezone mapped from these coordinates. (optional)
let sourceLon = 987 // Double | Used only with `iso=...` when the ISO value has no explicit offset. Provide together with `source_lat`. (optional)
let sourceOffset = "sourceOffset_example" // String | Used only with `iso=...` when the ISO value has no explicit offset. Interprets that local wall-clock time at this fixed UTC offset. (optional)
let tz = "tz_example" // String | IANA timezone name. On bulk-capable routes, a comma-separated list enables bulk mode. (optional)
let ip = "ip_example" // String | IP address. On bulk-capable routes, a comma-separated list enables bulk mode. (optional)
let lat = 987 // Double | Latitude. Must be provided together with `lon`. (optional)
let lon = 987 // Double | Longitude. Must be provided together with `lat`. (optional)
let offset = "offset_example" // String | Fixed UTC offset in `+HH:MM` or `-HH:MM` format. On bulk-capable routes, a comma-separated list enables bulk mode. (optional)
let autoTz = true // Bool | Set to `true` to resolve using the caller IP from Cloudflare headers. (optional)
let format = "format_example" // String | Custom date/time format template using supported `strftime`-style directives such as `%Y-%m-%d %H:%M:%S`. Reference: [strftime](https://strftime.net/). (optional)
let week = true // Bool |  (optional)
let sign = true // Bool | Set to exactly `true` to ask the gateway to sign the final JSON response. Every authenticated JSON response, including errors, then includes signing headers. Not supported on `/v1/time/clock`. (optional)

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
 **unix** | **Int64** |  | [optional] 
 **unixMs** | **Int64** |  | [optional] 
 **iso** | **String** | ISO-8601 timestamp. To supply a local wall-clock time without an explicit offset, pair it with one of &#x60;source_tz&#x3D;Area/City&#x60;, &#x60;source_ip&#x3D;...&#x60;, &#x60;source_lat&#x3D;...&amp;source_lon&#x3D;...&#x60;, or &#x60;source_offset&#x3D;±HH:MM&#x60;. | [optional] 
 **sourceTz** | **String** | Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. | [optional] 
 **sourceIp** | **String** | Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Resolves that local wall-clock time through the timezone mapped from this IP address. | [optional] 
 **sourceLat** | **Double** | Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Provide together with &#x60;source_lon&#x60; to resolve that local wall-clock time through the timezone mapped from these coordinates. | [optional] 
 **sourceLon** | **Double** | Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Provide together with &#x60;source_lat&#x60;. | [optional] 
 **sourceOffset** | **String** | Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Interprets that local wall-clock time at this fixed UTC offset. | [optional] 
 **tz** | **String** | IANA timezone name. On bulk-capable routes, a comma-separated list enables bulk mode. | [optional] 
 **ip** | **String** | IP address. On bulk-capable routes, a comma-separated list enables bulk mode. | [optional] 
 **lat** | **Double** | Latitude. Must be provided together with &#x60;lon&#x60;. | [optional] 
 **lon** | **Double** | Longitude. Must be provided together with &#x60;lat&#x60;. | [optional] 
 **offset** | **String** | Fixed UTC offset in &#x60;+HH:MM&#x60; or &#x60;-HH:MM&#x60; format. On bulk-capable routes, a comma-separated list enables bulk mode. | [optional] 
 **autoTz** | **Bool** | Set to &#x60;true&#x60; to resolve using the caller IP from Cloudflare headers. | [optional] 
 **format** | **String** | Custom date/time format template using supported &#x60;strftime&#x60;-style directives such as &#x60;%Y-%m-%d %H:%M:%S&#x60;. Reference: [strftime](https://strftime.net/). | [optional] 
 **week** | **Bool** |  | [optional] 
 **sign** | **Bool** | Set to exactly &#x60;true&#x60; to ask the gateway to sign the final JSON response. Every authenticated JSON response, including errors, then includes signing headers. Not supported on &#x60;/v1/time/clock&#x60;. | [optional] 

### Return type

[**CalendarResponse**](CalendarResponse.md)

### Authorization

[directApiKeyHeader](../README.md#directApiKeyHeader), [directBearerAuth](../README.md#directBearerAuth), [directApiKeyQuery](../README.md#directApiKeyQuery), [rapidApiKey](../README.md#rapidApiKey), [rapidApiHost](../README.md#rapidApiHost)

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
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let style = "style_example" // String | Clock style name. Valid values are enumerated here; there is no separate style discovery endpoint.
let unix = 987 // Int64 |  (optional)
let unixMs = 987 // Int64 |  (optional)
let iso = "iso_example" // String | ISO-8601 timestamp. To supply a local wall-clock time without an explicit offset, pair it with one of `source_tz=Area/City`, `source_ip=...`, `source_lat=...&source_lon=...`, or `source_offset=±HH:MM`. (optional)
let sourceTz = "sourceTz_example" // String | Used only with `iso=...` when the ISO value has no explicit offset. (optional)
let sourceIp = "sourceIp_example" // String | Used only with `iso=...` when the ISO value has no explicit offset. Resolves that local wall-clock time through the timezone mapped from this IP address. (optional)
let sourceLat = 987 // Double | Used only with `iso=...` when the ISO value has no explicit offset. Provide together with `source_lon` to resolve that local wall-clock time through the timezone mapped from these coordinates. (optional)
let sourceLon = 987 // Double | Used only with `iso=...` when the ISO value has no explicit offset. Provide together with `source_lat`. (optional)
let sourceOffset = "sourceOffset_example" // String | Used only with `iso=...` when the ISO value has no explicit offset. Interprets that local wall-clock time at this fixed UTC offset. (optional)
let tz = "tz_example" // String | IANA timezone name. On bulk-capable routes, a comma-separated list enables bulk mode. (optional)
let ip = "ip_example" // String | IP address. On bulk-capable routes, a comma-separated list enables bulk mode. (optional)
let lat = 987 // Double | Latitude. Must be provided together with `lon`. (optional)
let lon = 987 // Double | Longitude. Must be provided together with `lat`. (optional)
let offset = "offset_example" // String | Fixed UTC offset in `+HH:MM` or `-HH:MM` format. On bulk-capable routes, a comma-separated list enables bulk mode. (optional)
let format = "format_example" // String | Custom date/time format template using supported `strftime`-style directives such as `%Y-%m-%d %H:%M:%S`. Reference: [strftime](https://strftime.net/). (optional)

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
 **unix** | **Int64** |  | [optional] 
 **unixMs** | **Int64** |  | [optional] 
 **iso** | **String** | ISO-8601 timestamp. To supply a local wall-clock time without an explicit offset, pair it with one of &#x60;source_tz&#x3D;Area/City&#x60;, &#x60;source_ip&#x3D;...&#x60;, &#x60;source_lat&#x3D;...&amp;source_lon&#x3D;...&#x60;, or &#x60;source_offset&#x3D;±HH:MM&#x60;. | [optional] 
 **sourceTz** | **String** | Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. | [optional] 
 **sourceIp** | **String** | Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Resolves that local wall-clock time through the timezone mapped from this IP address. | [optional] 
 **sourceLat** | **Double** | Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Provide together with &#x60;source_lon&#x60; to resolve that local wall-clock time through the timezone mapped from these coordinates. | [optional] 
 **sourceLon** | **Double** | Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Provide together with &#x60;source_lat&#x60;. | [optional] 
 **sourceOffset** | **String** | Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Interprets that local wall-clock time at this fixed UTC offset. | [optional] 
 **tz** | **String** | IANA timezone name. On bulk-capable routes, a comma-separated list enables bulk mode. | [optional] 
 **ip** | **String** | IP address. On bulk-capable routes, a comma-separated list enables bulk mode. | [optional] 
 **lat** | **Double** | Latitude. Must be provided together with &#x60;lon&#x60;. | [optional] 
 **lon** | **Double** | Longitude. Must be provided together with &#x60;lat&#x60;. | [optional] 
 **offset** | **String** | Fixed UTC offset in &#x60;+HH:MM&#x60; or &#x60;-HH:MM&#x60; format. On bulk-capable routes, a comma-separated list enables bulk mode. | [optional] 
 **format** | **String** | Custom date/time format template using supported &#x60;strftime&#x60;-style directives such as &#x60;%Y-%m-%d %H:%M:%S&#x60;. Reference: [strftime](https://strftime.net/). | [optional] 

### Return type

**String**

### Authorization

[directApiKeyHeader](../README.md#directApiKeyHeader), [directBearerAuth](../README.md#directBearerAuth), [directApiKeyQuery](../README.md#directApiKeyQuery), [rapidApiKey](../README.md#rapidApiKey), [rapidApiHost](../README.md#rapidApiHost)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: text/html, application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getCurrentTime**
```swift
    open class func getCurrentTime(tz: String? = nil, ip: String? = nil, lat: Double? = nil, lon: Double? = nil, offset: String? = nil, autoTz: Bool? = nil, format: String? = nil, sign: Bool? = nil, completion: @escaping (_ data: GetCurrentTime200Response?, _ error: Error?) -> Void)
```

Get the current time for a target

Returns current time data for a single target, or a bulk array when exactly one of `tz`, `ip`, or `offset` is supplied as a comma-separated list.  Target selector rules: - Use at most one selector family per request: `tz`, `ip`, `lat` + `lon`, `offset`, or `auto_tz=true`. - If no selector is provided, the response defaults to UTC with `timezone=null` and `iso_local=null`. - Bulk mode is available only through one comma-separated `tz`, `ip`, or `offset` selector and cannot be combined with any other selector.  Example: - Single target: `/v1/time/current?tz=America/New_York` - For bulk, provide one comma-separated `tz`, `ip`, or `offset` value, for example `/v1/time/current?tz=America/New_York,Europe/London,Asia/Tokyo`.

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let tz = "tz_example" // String | IANA timezone name. On bulk-capable routes, a comma-separated list enables bulk mode. (optional)
let ip = "ip_example" // String | IP address. On bulk-capable routes, a comma-separated list enables bulk mode. (optional)
let lat = 987 // Double | Latitude. Must be provided together with `lon`. (optional)
let lon = 987 // Double | Longitude. Must be provided together with `lat`. (optional)
let offset = "offset_example" // String | Fixed UTC offset in `+HH:MM` or `-HH:MM` format. On bulk-capable routes, a comma-separated list enables bulk mode. (optional)
let autoTz = true // Bool | Set to `true` to resolve using the caller IP from Cloudflare headers. (optional)
let format = "format_example" // String | Custom date/time format template using supported `strftime`-style directives such as `%Y-%m-%d %H:%M:%S`. Reference: [strftime](https://strftime.net/). (optional)
let sign = true // Bool | Set to exactly `true` to ask the gateway to sign the final JSON response. Every authenticated JSON response, including errors, then includes signing headers. Not supported on `/v1/time/clock`. (optional)

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
 **tz** | **String** | IANA timezone name. On bulk-capable routes, a comma-separated list enables bulk mode. | [optional] 
 **ip** | **String** | IP address. On bulk-capable routes, a comma-separated list enables bulk mode. | [optional] 
 **lat** | **Double** | Latitude. Must be provided together with &#x60;lon&#x60;. | [optional] 
 **lon** | **Double** | Longitude. Must be provided together with &#x60;lat&#x60;. | [optional] 
 **offset** | **String** | Fixed UTC offset in &#x60;+HH:MM&#x60; or &#x60;-HH:MM&#x60; format. On bulk-capable routes, a comma-separated list enables bulk mode. | [optional] 
 **autoTz** | **Bool** | Set to &#x60;true&#x60; to resolve using the caller IP from Cloudflare headers. | [optional] 
 **format** | **String** | Custom date/time format template using supported &#x60;strftime&#x60;-style directives such as &#x60;%Y-%m-%d %H:%M:%S&#x60;. Reference: [strftime](https://strftime.net/). | [optional] 
 **sign** | **Bool** | Set to exactly &#x60;true&#x60; to ask the gateway to sign the final JSON response. Every authenticated JSON response, including errors, then includes signing headers. Not supported on &#x60;/v1/time/clock&#x60;. | [optional] 

### Return type

[**GetCurrentTime200Response**](GetCurrentTime200Response.md)

### Authorization

[directApiKeyHeader](../README.md#directApiKeyHeader), [directBearerAuth](../README.md#directBearerAuth), [directApiKeyQuery](../README.md#directApiKeyQuery), [rapidApiKey](../README.md#rapidApiKey), [rapidApiHost](../README.md#rapidApiHost)

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
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let tz = "tz_example" // String | IANA timezone name. On bulk-capable routes, a comma-separated list enables bulk mode. (optional)
let ip = "ip_example" // String | IP address. On bulk-capable routes, a comma-separated list enables bulk mode. (optional)
let lat = 987 // Double | Latitude. Must be provided together with `lon`. (optional)
let lon = 987 // Double | Longitude. Must be provided together with `lat`. (optional)
let offset = "offset_example" // String | Fixed UTC offset in `+HH:MM` or `-HH:MM` format. On bulk-capable routes, a comma-separated list enables bulk mode. (optional)
let autoTz = true // Bool | Set to `true` to resolve using the caller IP from Cloudflare headers. (optional)
let format = "format_example" // String | Custom date/time format template using supported `strftime`-style directives such as `%Y-%m-%d %H:%M:%S`. Reference: [strftime](https://strftime.net/). (optional)
let next = true // Bool |  (optional)
let sign = true // Bool | Set to exactly `true` to ask the gateway to sign the final JSON response. Every authenticated JSON response, including errors, then includes signing headers. Not supported on `/v1/time/clock`. (optional)

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
 **tz** | **String** | IANA timezone name. On bulk-capable routes, a comma-separated list enables bulk mode. | [optional] 
 **ip** | **String** | IP address. On bulk-capable routes, a comma-separated list enables bulk mode. | [optional] 
 **lat** | **Double** | Latitude. Must be provided together with &#x60;lon&#x60;. | [optional] 
 **lon** | **Double** | Longitude. Must be provided together with &#x60;lat&#x60;. | [optional] 
 **offset** | **String** | Fixed UTC offset in &#x60;+HH:MM&#x60; or &#x60;-HH:MM&#x60; format. On bulk-capable routes, a comma-separated list enables bulk mode. | [optional] 
 **autoTz** | **Bool** | Set to &#x60;true&#x60; to resolve using the caller IP from Cloudflare headers. | [optional] 
 **format** | **String** | Custom date/time format template using supported &#x60;strftime&#x60;-style directives such as &#x60;%Y-%m-%d %H:%M:%S&#x60;. Reference: [strftime](https://strftime.net/). | [optional] 
 **next** | **Bool** |  | [optional] 
 **sign** | **Bool** | Set to exactly &#x60;true&#x60; to ask the gateway to sign the final JSON response. Every authenticated JSON response, including errors, then includes signing headers. Not supported on &#x60;/v1/time/clock&#x60;. | [optional] 

### Return type

[**DstResponse**](DstResponse.md)

### Authorization

[directApiKeyHeader](../README.md#directApiKeyHeader), [directBearerAuth](../README.md#directBearerAuth), [directApiKeyQuery](../README.md#directApiKeyQuery), [rapidApiKey](../README.md#rapidApiKey), [rapidApiHost](../README.md#rapidApiHost)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getElapsed**
```swift
    open class func getElapsed(unix: Int64? = nil, unixMs: Int64? = nil, iso: String? = nil, sourceTz: String? = nil, sourceIp: String? = nil, sourceLat: Double? = nil, sourceLon: Double? = nil, sourceOffset: String? = nil, compareUnix: Int64? = nil, compareUnixMs: Int64? = nil, compareIso: String? = nil, compareSourceTz: String? = nil, compareSourceIp: String? = nil, compareSourceLat: Double? = nil, compareSourceLon: Double? = nil, compareSourceOffset: String? = nil, tz: String? = nil, ip: String? = nil, lat: Double? = nil, lon: Double? = nil, offset: String? = nil, autoTz: Bool? = nil, format: String? = nil, businessDays: Bool? = nil, holidayCountry: String? = nil, holidaySubdivision: String? = nil, sign: Bool? = nil, completion: @escaping (_ data: ElapsedResponse?, _ error: Error?) -> Void)
```

Time elapsed since or remaining until a reference instant

Computes elapsed or remaining duration relative to one required reference timestamp.  Reference timestamp forms: - `unix=1711300000` - `unix_ms=1711300000000` - `iso=2026-04-16T09:00:00Z` - `iso=2026-04-16T09:00:00&source_tz=America/New_York` - `iso=2026-04-16T09:00:00&source_ip=8.8.8.8` - `iso=2026-04-16T09:00:00&source_lat=40.7128&source_lon=-74.0060` - `iso=2026-04-16T09:00:00&source_offset=-05:00`  Compare timestamp forms: - `compare_unix=1711213600` - `compare_unix_ms=1711213600000` - `compare_iso=2026-04-16T09:00:00Z` - `compare_iso=2026-04-16T09:00:00&compare_source_tz=Europe/London` - `compare_iso=2026-04-16T09:00:00&compare_source_ip=8.8.8.8` - `compare_iso=2026-04-16T09:00:00&compare_source_lat=40.7128&compare_source_lon=-74.0060` - `compare_iso=2026-04-16T09:00:00&compare_source_offset=-05:00`  Compare selector forms: - `tz=America/New_York` - `ip=8.8.8.8` - `lat=40.7128&lon=-74.0060` - `offset=-04:00` - `auto_tz=true`  Incompatible combinations: - exactly one reference timestamp form - use either one compare timestamp form or one compare selector family, not both - use at most one of `source_tz`, `source_ip`, `source_lat`/`source_lon`, or `source_offset` - use at most one of `compare_source_tz`, `compare_source_ip`, `compare_source_lat`/`compare_source_lon`, or `compare_source_offset` - local-ISO companion selectors are valid only with `iso=...` that has no explicit offset - compare local-ISO companion selectors are valid only with `compare_iso=...` that has no explicit offset - if no compare input is provided, the comparison defaults to the request time  Business-day rules: - `holiday_country` and `holiday_subdivision` require `business_days=true` - `holiday_subdivision` also requires `holiday_country`  Examples: - Timestamp-to-timestamp: `/v1/time/elapsed?iso=2026-04-16T09:00:00&source_tz=America/New_York&compare_iso=2026-04-16T09:00:00&compare_source_tz=Europe/London` - Timestamp-to-selector: `/v1/time/elapsed?unix=1711300000&tz=America/New_York&business_days=true` 

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let unix = 987 // Int64 |  (optional)
let unixMs = 987 // Int64 |  (optional)
let iso = "iso_example" // String | ISO-8601 timestamp. To supply a local wall-clock time without an explicit offset, pair it with one of `source_tz=Area/City`, `source_ip=...`, `source_lat=...&source_lon=...`, or `source_offset=±HH:MM`. (optional)
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
let tz = "tz_example" // String | IANA timezone name. On bulk-capable routes, a comma-separated list enables bulk mode. (optional)
let ip = "ip_example" // String | IP address. On bulk-capable routes, a comma-separated list enables bulk mode. (optional)
let lat = 987 // Double | Latitude. Must be provided together with `lon`. (optional)
let lon = 987 // Double | Longitude. Must be provided together with `lat`. (optional)
let offset = "offset_example" // String | Fixed UTC offset in `+HH:MM` or `-HH:MM` format. On bulk-capable routes, a comma-separated list enables bulk mode. (optional)
let autoTz = true // Bool | Set to `true` to resolve using the caller IP from Cloudflare headers. (optional)
let format = "format_example" // String | Custom duration format template using `%days`, `%hours`, `%minutes`, and `%seconds`. (optional)
let businessDays = true // Bool | Set to `true` to enable weekday/business-day counting. (optional)
let holidayCountry = "holidayCountry_example" // String | ISO 3166-1 alpha-2 holiday calendar country code. Requires `business_days=true`. (optional)
let holidaySubdivision = "holidaySubdivision_example" // String | Holiday calendar subdivision code from the upstream `python-holidays` calendar, for example `CA` or `ENG`. Requires `holiday_country` and `business_days=true`. (optional)
let sign = true // Bool | Set to exactly `true` to ask the gateway to sign the final JSON response. Every authenticated JSON response, including errors, then includes signing headers. Not supported on `/v1/time/clock`. (optional)

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
 **unix** | **Int64** |  | [optional] 
 **unixMs** | **Int64** |  | [optional] 
 **iso** | **String** | ISO-8601 timestamp. To supply a local wall-clock time without an explicit offset, pair it with one of &#x60;source_tz&#x3D;Area/City&#x60;, &#x60;source_ip&#x3D;...&#x60;, &#x60;source_lat&#x3D;...&amp;source_lon&#x3D;...&#x60;, or &#x60;source_offset&#x3D;±HH:MM&#x60;. | [optional] 
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
 **tz** | **String** | IANA timezone name. On bulk-capable routes, a comma-separated list enables bulk mode. | [optional] 
 **ip** | **String** | IP address. On bulk-capable routes, a comma-separated list enables bulk mode. | [optional] 
 **lat** | **Double** | Latitude. Must be provided together with &#x60;lon&#x60;. | [optional] 
 **lon** | **Double** | Longitude. Must be provided together with &#x60;lat&#x60;. | [optional] 
 **offset** | **String** | Fixed UTC offset in &#x60;+HH:MM&#x60; or &#x60;-HH:MM&#x60; format. On bulk-capable routes, a comma-separated list enables bulk mode. | [optional] 
 **autoTz** | **Bool** | Set to &#x60;true&#x60; to resolve using the caller IP from Cloudflare headers. | [optional] 
 **format** | **String** | Custom duration format template using &#x60;%days&#x60;, &#x60;%hours&#x60;, &#x60;%minutes&#x60;, and &#x60;%seconds&#x60;. | [optional] 
 **businessDays** | **Bool** | Set to &#x60;true&#x60; to enable weekday/business-day counting. | [optional] 
 **holidayCountry** | **String** | ISO 3166-1 alpha-2 holiday calendar country code. Requires &#x60;business_days&#x3D;true&#x60;. | [optional] 
 **holidaySubdivision** | **String** | Holiday calendar subdivision code from the upstream &#x60;python-holidays&#x60; calendar, for example &#x60;CA&#x60; or &#x60;ENG&#x60;. Requires &#x60;holiday_country&#x60; and &#x60;business_days&#x3D;true&#x60;. | [optional] 
 **sign** | **Bool** | Set to exactly &#x60;true&#x60; to ask the gateway to sign the final JSON response. Every authenticated JSON response, including errors, then includes signing headers. Not supported on &#x60;/v1/time/clock&#x60;. | [optional] 

### Return type

[**ElapsedResponse**](ElapsedResponse.md)

### Authorization

[directApiKeyHeader](../README.md#directApiKeyHeader), [directBearerAuth](../README.md#directBearerAuth), [directApiKeyQuery](../README.md#directApiKeyQuery), [rapidApiKey](../README.md#rapidApiKey), [rapidApiHost](../README.md#rapidApiHost)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getTimezone**
```swift
    open class func getTimezone(tz: String? = nil, ip: String? = nil, lat: Double? = nil, lon: Double? = nil, offset: String? = nil, autoTz: Bool? = nil, sign: Bool? = nil, completion: @escaping (_ data: GetTimezone200Response?, _ error: Error?) -> Void)
```

Resolve timezone information for a target

Resolves timezone metadata for a single target.  Target selector rules: - Use exactly one selector family: `tz`, `ip`, `lat` + `lon`, `offset`, or `auto_tz=true`. - Bulk is not supported on this route. - `offset` queries return a specialized payload that includes `matching_zones` for the request-time offset match.  Examples: - Single target: `/v1/timezone?tz=America/New_York` - Offset match: `/v1/timezone?offset=-04:00`

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let tz = "tz_example" // String | IANA timezone name. On bulk-capable routes, a comma-separated list enables bulk mode. (optional)
let ip = "ip_example" // String | IP address. On bulk-capable routes, a comma-separated list enables bulk mode. (optional)
let lat = 987 // Double | Latitude. Must be provided together with `lon`. (optional)
let lon = 987 // Double | Longitude. Must be provided together with `lat`. (optional)
let offset = "offset_example" // String | Fixed UTC offset in `+HH:MM` or `-HH:MM` format. On bulk-capable routes, a comma-separated list enables bulk mode. (optional)
let autoTz = true // Bool | Set to `true` to resolve using the caller IP from Cloudflare headers. (optional)
let sign = true // Bool | Set to exactly `true` to ask the gateway to sign the final JSON response. Every authenticated JSON response, including errors, then includes signing headers. Not supported on `/v1/time/clock`. (optional)

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
 **tz** | **String** | IANA timezone name. On bulk-capable routes, a comma-separated list enables bulk mode. | [optional] 
 **ip** | **String** | IP address. On bulk-capable routes, a comma-separated list enables bulk mode. | [optional] 
 **lat** | **Double** | Latitude. Must be provided together with &#x60;lon&#x60;. | [optional] 
 **lon** | **Double** | Longitude. Must be provided together with &#x60;lat&#x60;. | [optional] 
 **offset** | **String** | Fixed UTC offset in &#x60;+HH:MM&#x60; or &#x60;-HH:MM&#x60; format. On bulk-capable routes, a comma-separated list enables bulk mode. | [optional] 
 **autoTz** | **Bool** | Set to &#x60;true&#x60; to resolve using the caller IP from Cloudflare headers. | [optional] 
 **sign** | **Bool** | Set to exactly &#x60;true&#x60; to ask the gateway to sign the final JSON response. Every authenticated JSON response, including errors, then includes signing headers. Not supported on &#x60;/v1/time/clock&#x60;. | [optional] 

### Return type

[**GetTimezone200Response**](GetTimezone200Response.md)

### Authorization

[directApiKeyHeader](../README.md#directApiKeyHeader), [directBearerAuth](../README.md#directBearerAuth), [directApiKeyQuery](../README.md#directApiKeyQuery), [rapidApiKey](../README.md#rapidApiKey), [rapidApiHost](../README.md#rapidApiHost)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

