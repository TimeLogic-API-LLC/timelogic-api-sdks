# TimeApi

All URIs are relative to *https://api.timelogicapi.com*

| Method | HTTP request | Description |
| ------------- | ------------- | ------------- |
| [**addTime**](TimeApi.md#addTime) | **GET** /v1/time/add | Add modifiers to a timestamp |
| [**convertTime**](TimeApi.md#convertTime) | **GET** /v1/time/convert | Convert a timestamp into a target timezone or offset |
| [**diffTime**](TimeApi.md#diffTime) | **GET** /v1/time/diff | Difference between two instants |
| [**getCalendar**](TimeApi.md#getCalendar) | **GET** /v1/time/calendar | Calendar projection for a target instant |
| [**getClock**](TimeApi.md#getClock) | **GET** /v1/time/clock | Render a live HTML clock |
| [**getCurrentTime**](TimeApi.md#getCurrentTime) | **GET** /v1/time/current | Get the current time for a target |
| [**getDst**](TimeApi.md#getDst) | **GET** /v1/time/dst | Daylight-saving status for a target |
| [**getElapsed**](TimeApi.md#getElapsed) | **GET** /v1/time/elapsed | Time elapsed since or remaining until a reference instant |
| [**getTimezone**](TimeApi.md#getTimezone) | **GET** /v1/timezone | Resolve timezone information for a target |


<a id="addTime"></a>
# **addTime**
> TimePayload addTime(unix, unixMs, iso, sourceTz, sourceIp, sourceLat, sourceLon, sourceOffset, seconds, minutes, hours, days, tz, ip, lat, lon, offset, autoTz, utc, format, sign)

Add modifiers to a timestamp

Adds &#x60;seconds&#x60;, &#x60;minutes&#x60;, &#x60;hours&#x60;, and &#x60;days&#x60; to an optional base timestamp.  Input timestamp forms: - &#x60;unix&#x3D;1711300000&#x60; - &#x60;unix_ms&#x3D;1711300000000&#x60; - &#x60;iso&#x3D;2026-04-16T09:00:00Z&#x60; - &#x60;iso&#x3D;2026-04-16T09:00:00&amp;source_tz&#x3D;America/New_York&#x60; - &#x60;iso&#x3D;2026-04-16T09:00:00&amp;source_ip&#x3D;8.8.8.8&#x60; - &#x60;iso&#x3D;2026-04-16T09:00:00&amp;source_lat&#x3D;40.7128&amp;source_lon&#x3D;-74.0060&#x60; - &#x60;iso&#x3D;2026-04-16T09:00:00&amp;source_offset&#x3D;-05:00&#x60; - if no input timestamp is provided, the base timestamp defaults to the request time  Modifiers: - &#x60;seconds&#x3D;30&#x60; - &#x60;minutes&#x3D;15&#x60; - &#x60;hours&#x3D;2&#x60; - &#x60;days&#x3D;7&#x60;  Target selector forms: - &#x60;tz&#x3D;America/New_York&#x60; - &#x60;ip&#x3D;8.8.8.8&#x60; - &#x60;lat&#x3D;40.7128&amp;lon&#x3D;-74.0060&#x60; - &#x60;offset&#x3D;-04:00&#x60; - &#x60;auto_tz&#x3D;true&#x60; - &#x60;utc&#x3D;true&#x60;  Incompatible combinations: - at most one input timestamp form - at most one target selector family - use at most one of &#x60;source_tz&#x60;, &#x60;source_ip&#x60;, &#x60;source_lat&#x60;/&#x60;source_lon&#x60;, or &#x60;source_offset&#x60; - local-ISO companion selectors are valid only with &#x60;iso&#x3D;...&#x60; that has no explicit offset - bulk is not supported on this route  Examples: - &#x60;/v1/time/add?iso&#x3D;2026-04-16T09:00:00&amp;source_tz&#x3D;America/New_York&amp;days&#x3D;1&amp;tz&#x3D;Europe/London&#x60; - &#x60;/v1/time/add?minutes&#x3D;30&amp;utc&#x3D;true&#x60;

### Example
```kotlin
// Import classes:
//import com.timelogic.direct.api.infrastructure.*
//import com.timelogic.direct.api.models.*

val apiInstance = TimeApi()
val unix : kotlin.Long = 1711300000 // kotlin.Long |
val unixMs : kotlin.Long = 1711300000000 // kotlin.Long |
val iso : kotlin.String = 2024-03-24T15:00:00 // kotlin.String | ISO-8601 timestamp. To supply a local wall-clock time without an explicit offset, pair it with one of `source_tz=Area/City`, `source_ip=...`, `source_lat=...&source_lon=...`, or `source_offset=±HH:MM`.
val sourceTz : kotlin.String = America/New_York // kotlin.String | Used only with `iso=...` when the ISO value has no explicit offset.
val sourceIp : kotlin.String = 8.8.8.8 // kotlin.String | Used only with `iso=...` when the ISO value has no explicit offset. Resolves that local wall-clock time through the timezone mapped from this IP address.
val sourceLat : kotlin.Double = 40.7128 // kotlin.Double | Used only with `iso=...` when the ISO value has no explicit offset. Provide together with `source_lon` to resolve that local wall-clock time through the timezone mapped from these coordinates.
val sourceLon : kotlin.Double = -74.006 // kotlin.Double | Used only with `iso=...` when the ISO value has no explicit offset. Provide together with `source_lat`.
val sourceOffset : kotlin.String = -05:00 // kotlin.String | Used only with `iso=...` when the ISO value has no explicit offset. Interprets that local wall-clock time at this fixed UTC offset.
val seconds : kotlin.Int = 30 // kotlin.Int |
val minutes : kotlin.Int = 15 // kotlin.Int |
val hours : kotlin.Int = 2 // kotlin.Int |
val days : kotlin.Int = 7 // kotlin.Int |
val tz : kotlin.String = America/New_York // kotlin.String | IANA timezone name. On bulk-capable routes, a comma-separated list enables bulk mode.
val ip : kotlin.String = 8.8.8.8 // kotlin.String | IP address. On bulk-capable routes, a comma-separated list enables bulk mode.
val lat : kotlin.Double = 40.7128 // kotlin.Double | Latitude. Must be provided together with `lon`.
val lon : kotlin.Double = -74.006 // kotlin.Double | Longitude. Must be provided together with `lat`.
val offset : kotlin.String = -04:00 // kotlin.String | Fixed UTC offset in `+HH:MM` or `-HH:MM` format. On bulk-capable routes, a comma-separated list enables bulk mode.
val autoTz : kotlin.Boolean = true // kotlin.Boolean | Set to `true` to resolve using the caller IP from Cloudflare headers.
val utc : kotlin.Boolean = true // kotlin.Boolean | Set to `true` to force UTC on routes that support it.
val format : kotlin.String = %Y-%m-%d %H:%M:%S // kotlin.String | Custom date/time format template using supported `strftime`-style directives such as `%Y-%m-%d %H:%M:%S`. Reference: [strftime](https://strftime.net/).
val sign : kotlin.Boolean = true // kotlin.Boolean | Set to exactly `true` to ask the gateway to sign the final JSON response. Every authenticated JSON response, including errors, then includes signing headers. Not supported on `/v1/time/clock`.
try {
    val result : TimePayload = apiInstance.addTime(unix, unixMs, iso, sourceTz, sourceIp, sourceLat, sourceLon, sourceOffset, seconds, minutes, hours, days, tz, ip, lat, lon, offset, autoTz, utc, format, sign)
    println(result)
} catch (e: ClientException) {
    println("4xx response calling TimeApi#addTime")
    e.printStackTrace()
} catch (e: ServerException) {
    println("5xx response calling TimeApi#addTime")
    e.printStackTrace()
}
```

### Parameters
| **unix** | **kotlin.Long**|  | [optional] |
| **unixMs** | **kotlin.Long**|  | [optional] |
| **iso** | **kotlin.String**| ISO-8601 timestamp. To supply a local wall-clock time without an explicit offset, pair it with one of &#x60;source_tz&#x3D;Area/City&#x60;, &#x60;source_ip&#x3D;...&#x60;, &#x60;source_lat&#x3D;...&amp;source_lon&#x3D;...&#x60;, or &#x60;source_offset&#x3D;±HH:MM&#x60;. | [optional] |
| **sourceTz** | **kotlin.String**| Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. | [optional] |
| **sourceIp** | **kotlin.String**| Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Resolves that local wall-clock time through the timezone mapped from this IP address. | [optional] |
| **sourceLat** | **kotlin.Double**| Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Provide together with &#x60;source_lon&#x60; to resolve that local wall-clock time through the timezone mapped from these coordinates. | [optional] |
| **sourceLon** | **kotlin.Double**| Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Provide together with &#x60;source_lat&#x60;. | [optional] |
| **sourceOffset** | **kotlin.String**| Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Interprets that local wall-clock time at this fixed UTC offset. | [optional] |
| **seconds** | **kotlin.Int**|  | [optional] |
| **minutes** | **kotlin.Int**|  | [optional] |
| **hours** | **kotlin.Int**|  | [optional] |
| **days** | **kotlin.Int**|  | [optional] |
| **tz** | **kotlin.String**| IANA timezone name. On bulk-capable routes, a comma-separated list enables bulk mode. | [optional] |
| **ip** | **kotlin.String**| IP address. On bulk-capable routes, a comma-separated list enables bulk mode. | [optional] |
| **lat** | **kotlin.Double**| Latitude. Must be provided together with &#x60;lon&#x60;. | [optional] |
| **lon** | **kotlin.Double**| Longitude. Must be provided together with &#x60;lat&#x60;. | [optional] |
| **offset** | **kotlin.String**| Fixed UTC offset in &#x60;+HH:MM&#x60; or &#x60;-HH:MM&#x60; format. On bulk-capable routes, a comma-separated list enables bulk mode. | [optional] |
| **autoTz** | **kotlin.Boolean**| Set to &#x60;true&#x60; to resolve using the caller IP from Cloudflare headers. | [optional] |
| **utc** | **kotlin.Boolean**| Set to &#x60;true&#x60; to force UTC on routes that support it. | [optional] |
| **format** | **kotlin.String**| Custom date/time format template using supported &#x60;strftime&#x60;-style directives such as &#x60;%Y-%m-%d %H:%M:%S&#x60;. Reference: [strftime](https://strftime.net/). | [optional] |
| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **sign** | **kotlin.Boolean**| Set to exactly &#x60;true&#x60; to ask the gateway to sign the final JSON response. Every authenticated JSON response, including errors, then includes signing headers. Not supported on &#x60;/v1/time/clock&#x60;. | [optional] |

### Return type

[**TimePayload**](TimePayload.md)

### Authorization


Configure apiKeyHeader:
    ApiClient.apiKey["X-API-Key"] = ""
    ApiClient.apiKeyPrefix["X-API-Key"] = ""
Configure bearerAuth:
    ApiClient.accessToken = ""
Configure apiKeyQuery:
    ApiClient.apiKey["api_key"] = ""
    ApiClient.apiKeyPrefix["api_key"] = ""
Configure rapidApiKey:
    ApiClient.apiKey["X-RapidAPI-Key"] = ""
    ApiClient.apiKeyPrefix["X-RapidAPI-Key"] = ""
Configure rapidApiHost:
    ApiClient.apiKey["X-RapidAPI-Host"] = ""
    ApiClient.apiKeyPrefix["X-RapidAPI-Host"] = ""

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a id="convertTime"></a>
# **convertTime**
> GetCurrentTime200Response convertTime(unix, unixMs, iso, sourceTz, sourceIp, sourceLat, sourceLon, sourceOffset, tz, ip, lat, lon, offset, autoTz, utc, format, sign)

Convert a timestamp into a target timezone or offset

Converts one required input timestamp into a single target or a bulk array.  Input timestamp forms: - &#x60;unix&#x3D;1711300000&#x60; - &#x60;unix_ms&#x3D;1711300000000&#x60; - &#x60;iso&#x3D;2026-04-16T09:00:00Z&#x60; - &#x60;iso&#x3D;2026-04-16T09:00:00&amp;source_tz&#x3D;America/New_York&#x60; - &#x60;iso&#x3D;2026-04-16T09:00:00&amp;source_ip&#x3D;8.8.8.8&#x60; - &#x60;iso&#x3D;2026-04-16T09:00:00&amp;source_lat&#x3D;40.7128&amp;source_lon&#x3D;-74.0060&#x60; - &#x60;iso&#x3D;2026-04-16T09:00:00&amp;source_offset&#x3D;-05:00&#x60;  Target selector forms: - &#x60;tz&#x3D;America/New_York&#x60; - &#x60;ip&#x3D;8.8.8.8&#x60; - &#x60;lat&#x3D;40.7128&amp;lon&#x3D;-74.0060&#x60; - &#x60;offset&#x3D;-04:00&#x60; - &#x60;auto_tz&#x3D;true&#x60; - &#x60;utc&#x3D;true&#x60;  Incompatible combinations: - exactly one input timestamp form - exactly one target selector family - use at most one of &#x60;source_tz&#x60;, &#x60;source_ip&#x60;, &#x60;source_lat&#x60;/&#x60;source_lon&#x60;, or &#x60;source_offset&#x60; - local-ISO companion selectors are valid only with &#x60;iso&#x3D;...&#x60; that has no explicit offset - bulk is allowed only through one comma-separated &#x60;tz&#x60;, &#x60;ip&#x60;, or &#x60;offset&#x60; selector  Examples: - Single target: &#x60;/v1/time/convert?iso&#x3D;2026-04-16T09:00:00&amp;source_tz&#x3D;America/New_York&amp;tz&#x3D;Europe/London&#x60; - Bulk target set: &#x60;/v1/time/convert?unix&#x3D;1711300000&amp;offset&#x3D;-04:00,+00:00,+09:00&#x60;

### Example
```kotlin
// Import classes:
//import com.timelogic.direct.api.infrastructure.*
//import com.timelogic.direct.api.models.*

val apiInstance = TimeApi()
val unix : kotlin.Long = 1711300000 // kotlin.Long |
val unixMs : kotlin.Long = 1711300000000 // kotlin.Long |
val iso : kotlin.String = 2024-03-24T15:00:00 // kotlin.String | ISO-8601 timestamp. To supply a local wall-clock time without an explicit offset, pair it with one of `source_tz=Area/City`, `source_ip=...`, `source_lat=...&source_lon=...`, or `source_offset=±HH:MM`.
val sourceTz : kotlin.String = America/New_York // kotlin.String | Used only with `iso=...` when the ISO value has no explicit offset.
val sourceIp : kotlin.String = 8.8.8.8 // kotlin.String | Used only with `iso=...` when the ISO value has no explicit offset. Resolves that local wall-clock time through the timezone mapped from this IP address.
val sourceLat : kotlin.Double = 40.7128 // kotlin.Double | Used only with `iso=...` when the ISO value has no explicit offset. Provide together with `source_lon` to resolve that local wall-clock time through the timezone mapped from these coordinates.
val sourceLon : kotlin.Double = -74.006 // kotlin.Double | Used only with `iso=...` when the ISO value has no explicit offset. Provide together with `source_lat`.
val sourceOffset : kotlin.String = -05:00 // kotlin.String | Used only with `iso=...` when the ISO value has no explicit offset. Interprets that local wall-clock time at this fixed UTC offset.
val tz : kotlin.String = America/New_York // kotlin.String | IANA timezone name. On bulk-capable routes, a comma-separated list enables bulk mode.
val ip : kotlin.String = 8.8.8.8 // kotlin.String | IP address. On bulk-capable routes, a comma-separated list enables bulk mode.
val lat : kotlin.Double = 40.7128 // kotlin.Double | Latitude. Must be provided together with `lon`.
val lon : kotlin.Double = -74.006 // kotlin.Double | Longitude. Must be provided together with `lat`.
val offset : kotlin.String = -04:00 // kotlin.String | Fixed UTC offset in `+HH:MM` or `-HH:MM` format. On bulk-capable routes, a comma-separated list enables bulk mode.
val autoTz : kotlin.Boolean = true // kotlin.Boolean | Set to `true` to resolve using the caller IP from Cloudflare headers.
val utc : kotlin.Boolean = true // kotlin.Boolean | Set to `true` to force UTC on routes that support it.
val format : kotlin.String = %Y-%m-%d %H:%M:%S // kotlin.String | Custom date/time format template using supported `strftime`-style directives such as `%Y-%m-%d %H:%M:%S`. Reference: [strftime](https://strftime.net/).
val sign : kotlin.Boolean = true // kotlin.Boolean | Set to exactly `true` to ask the gateway to sign the final JSON response. Every authenticated JSON response, including errors, then includes signing headers. Not supported on `/v1/time/clock`.
try {
    val result : GetCurrentTime200Response = apiInstance.convertTime(unix, unixMs, iso, sourceTz, sourceIp, sourceLat, sourceLon, sourceOffset, tz, ip, lat, lon, offset, autoTz, utc, format, sign)
    println(result)
} catch (e: ClientException) {
    println("4xx response calling TimeApi#convertTime")
    e.printStackTrace()
} catch (e: ServerException) {
    println("5xx response calling TimeApi#convertTime")
    e.printStackTrace()
}
```

### Parameters
| **unix** | **kotlin.Long**|  | [optional] |
| **unixMs** | **kotlin.Long**|  | [optional] |
| **iso** | **kotlin.String**| ISO-8601 timestamp. To supply a local wall-clock time without an explicit offset, pair it with one of &#x60;source_tz&#x3D;Area/City&#x60;, &#x60;source_ip&#x3D;...&#x60;, &#x60;source_lat&#x3D;...&amp;source_lon&#x3D;...&#x60;, or &#x60;source_offset&#x3D;±HH:MM&#x60;. | [optional] |
| **sourceTz** | **kotlin.String**| Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. | [optional] |
| **sourceIp** | **kotlin.String**| Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Resolves that local wall-clock time through the timezone mapped from this IP address. | [optional] |
| **sourceLat** | **kotlin.Double**| Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Provide together with &#x60;source_lon&#x60; to resolve that local wall-clock time through the timezone mapped from these coordinates. | [optional] |
| **sourceLon** | **kotlin.Double**| Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Provide together with &#x60;source_lat&#x60;. | [optional] |
| **sourceOffset** | **kotlin.String**| Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Interprets that local wall-clock time at this fixed UTC offset. | [optional] |
| **tz** | **kotlin.String**| IANA timezone name. On bulk-capable routes, a comma-separated list enables bulk mode. | [optional] |
| **ip** | **kotlin.String**| IP address. On bulk-capable routes, a comma-separated list enables bulk mode. | [optional] |
| **lat** | **kotlin.Double**| Latitude. Must be provided together with &#x60;lon&#x60;. | [optional] |
| **lon** | **kotlin.Double**| Longitude. Must be provided together with &#x60;lat&#x60;. | [optional] |
| **offset** | **kotlin.String**| Fixed UTC offset in &#x60;+HH:MM&#x60; or &#x60;-HH:MM&#x60; format. On bulk-capable routes, a comma-separated list enables bulk mode. | [optional] |
| **autoTz** | **kotlin.Boolean**| Set to &#x60;true&#x60; to resolve using the caller IP from Cloudflare headers. | [optional] |
| **utc** | **kotlin.Boolean**| Set to &#x60;true&#x60; to force UTC on routes that support it. | [optional] |
| **format** | **kotlin.String**| Custom date/time format template using supported &#x60;strftime&#x60;-style directives such as &#x60;%Y-%m-%d %H:%M:%S&#x60;. Reference: [strftime](https://strftime.net/). | [optional] |
| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **sign** | **kotlin.Boolean**| Set to exactly &#x60;true&#x60; to ask the gateway to sign the final JSON response. Every authenticated JSON response, including errors, then includes signing headers. Not supported on &#x60;/v1/time/clock&#x60;. | [optional] |

### Return type

[**GetCurrentTime200Response**](GetCurrentTime200Response.md)

### Authorization


Configure apiKeyHeader:
    ApiClient.apiKey["X-API-Key"] = ""
    ApiClient.apiKeyPrefix["X-API-Key"] = ""
Configure bearerAuth:
    ApiClient.accessToken = ""
Configure apiKeyQuery:
    ApiClient.apiKey["api_key"] = ""
    ApiClient.apiKeyPrefix["api_key"] = ""
Configure rapidApiKey:
    ApiClient.apiKey["X-RapidAPI-Key"] = ""
    ApiClient.apiKeyPrefix["X-RapidAPI-Key"] = ""
Configure rapidApiHost:
    ApiClient.apiKey["X-RapidAPI-Host"] = ""
    ApiClient.apiKeyPrefix["X-RapidAPI-Host"] = ""

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a id="diffTime"></a>
# **diffTime**
> DiffResponse diffTime(from, to, fromTz, fromIp, fromLat, fromLon, fromOffset, toTz, toIp, toLat, toLon, toOffset, format, businessDays, holidayCountry, holidaySubdivision, sign)

Difference between two instants

Computes the duration between &#x60;from&#x60; and &#x60;to&#x60;.  Required query fields: &#x60;from&#x60; and &#x60;to&#x60; only. Do not send every optional companion field. For each side, choose one supported specifier form. A &#x60;from_*&#x60; or &#x60;to_*&#x60; companion is allowed only when that side uses &#x60;iso&#x3D;...&#x60; with no explicit offset; use at most one companion selector, except that coordinate input requires its paired latitude and longitude.  &#x60;from&#x60; and &#x60;to&#x60; are embedded specifier strings.  Accepted specifier forms: - &#x60;from&#x3D;now&#x60; - &#x60;from&#x3D;unix&#x3D;1711300000&#x60; - &#x60;from&#x3D;unix_ms&#x3D;1711300000000&#x60; - &#x60;from&#x3D;iso&#x3D;2026-04-16T09:00:00&#x60; - &#x60;from&#x3D;tz&#x3D;America/New_York&#x60; - &#x60;from&#x3D;ip&#x3D;8.8.8.8&#x60; - &#x60;from&#x3D;offset&#x3D;-05:00&#x60; - the same forms are accepted for &#x60;to&#x60;  Timezone hint pairings: - &#x60;from_tz&#x60; only with &#x60;from&#x3D;iso&#x3D;...&#x60; that has no explicit offset - &#x60;from_ip&#x60;, &#x60;from_lat&#x60;/&#x60;from_lon&#x60;, and &#x60;from_offset&#x60; only with &#x60;from&#x3D;iso&#x3D;...&#x60; that has no explicit offset - &#x60;to_tz&#x60; only with &#x60;to&#x3D;iso&#x3D;...&#x60; that has no explicit offset - &#x60;to_ip&#x60;, &#x60;to_lat&#x60;/&#x60;to_lon&#x60;, and &#x60;to_offset&#x60; only with &#x60;to&#x3D;iso&#x3D;...&#x60; that has no explicit offset  Selector semantics: - &#x60;tz&#x3D;...&#x60;, &#x60;ip&#x3D;...&#x60;, and &#x60;offset&#x3D;...&#x60; inside &#x60;from&#x60; or &#x60;to&#x60; mean the current request-time instant resolved through that selector - those selector forms do not represent an arbitrary local wall-clock time - returned duration magnitudes are absolute; use &#x60;direction&#x60; to see whether &#x60;to&#x60; is after, before, or the same instant as &#x60;from&#x60;  Business-day rules: - &#x60;holiday_country&#x60; and &#x60;holiday_subdivision&#x60; require &#x60;business_days&#x3D;true&#x60; - &#x60;holiday_subdivision&#x60; also requires &#x60;holiday_country&#x60;  Examples: - Selector-current instant: &#x60;/v1/time/diff?from&#x3D;unix&#x3D;1711300000&amp;to&#x3D;tz&#x3D;America/New_York&#x60; - Wall-clock pairing: &#x60;/v1/time/diff?from&#x3D;iso&#x3D;2026-04-16T09:00:00&amp;from_tz&#x3D;America/New_York&amp;to&#x3D;iso&#x3D;2026-04-16T09:00:00&amp;to_tz&#x3D;Europe/London&#x60; - Wall-clock via selector: &#x60;/v1/time/diff?from&#x3D;iso&#x3D;2026-01-01T12:00:00&amp;from_ip&#x3D;8.8.8.8&amp;to&#x3D;iso&#x3D;2026-01-01T12:00:00&amp;to_offset&#x3D;-05:00&#x60;

### Example
```kotlin
// Import classes:
//import com.timelogic.direct.api.infrastructure.*
//import com.timelogic.direct.api.models.*

val apiInstance = TimeApi()
val from : kotlin.String = from_example // kotlin.String | Time specifier. Supported forms are `now`, `unix=<seconds>`, `unix_ms=<milliseconds>`, `iso=<ISO-8601>`, `offset=±HH:MM`, `tz=<IANA timezone>`, and `ip=<IP address>`. For `tz=...`, `ip=...`, and `offset=...`, the specifier means the current request-time instant resolved through that selector. To express a local wall-clock time, use `from=iso=...` together with one of `from_tz`, `from_ip`, `from_lat`+`from_lon`, or `from_offset`.
val to : kotlin.String = to_example // kotlin.String | Time specifier. Supported forms are `now`, `unix=<seconds>`, `unix_ms=<milliseconds>`, `iso=<ISO-8601>`, `offset=±HH:MM`, `tz=<IANA timezone>`, and `ip=<IP address>`. For `tz=...`, `ip=...`, and `offset=...`, the specifier means the current request-time instant resolved through that selector. To express a local wall-clock time, use `to=iso=...` together with one of `to_tz`, `to_ip`, `to_lat`+`to_lon`, or `to_offset`.
val fromTz : kotlin.String = fromTz_example // kotlin.String | Used only with `from=iso=...` when the ISO value has no explicit offset.
val fromIp : kotlin.String = 8.8.8.8 // kotlin.String | Used only with `from=iso=...` when the ISO value has no explicit offset. Resolves that local wall-clock time through the timezone mapped from this IP address.
val fromLat : kotlin.Double = 40.7128 // kotlin.Double | Used only with `from=iso=...` when the ISO value has no explicit offset. Provide together with `from_lon` to resolve that local wall-clock time through the timezone mapped from these coordinates.
val fromLon : kotlin.Double = -74.006 // kotlin.Double | Used only with `from=iso=...` when the ISO value has no explicit offset. Provide together with `from_lat`.
val fromOffset : kotlin.String = -05:00 // kotlin.String | Used only with `from=iso=...` when the ISO value has no explicit offset. Interprets that local wall-clock time at this fixed UTC offset.
val toTz : kotlin.String = toTz_example // kotlin.String | Used only with `to=iso=...` when the ISO value has no explicit offset.
val toIp : kotlin.String = 8.8.8.8 // kotlin.String | Used only with `to=iso=...` when the ISO value has no explicit offset. Resolves that local wall-clock time through the timezone mapped from this IP address.
val toLat : kotlin.Double = 40.7128 // kotlin.Double | Used only with `to=iso=...` when the ISO value has no explicit offset. Provide together with `to_lon` to resolve that local wall-clock time through the timezone mapped from these coordinates.
val toLon : kotlin.Double = -74.006 // kotlin.Double | Used only with `to=iso=...` when the ISO value has no explicit offset. Provide together with `to_lat`.
val toOffset : kotlin.String = -05:00 // kotlin.String | Used only with `to=iso=...` when the ISO value has no explicit offset. Interprets that local wall-clock time at this fixed UTC offset.
val format : kotlin.String = %daysd %hoursh %minutesm %secondss // kotlin.String | Custom duration format template using `%days`, `%hours`, `%minutes`, and `%seconds`.
val businessDays : kotlin.Boolean = true // kotlin.Boolean | Set to `true` to enable weekday/business-day counting.
val holidayCountry : kotlin.String = US // kotlin.String | ISO 3166-1 alpha-2 holiday calendar country code. Requires `business_days=true`.
val holidaySubdivision : kotlin.String = CA // kotlin.String | Holiday calendar subdivision code from the upstream `python-holidays` calendar, for example `CA` or `ENG`. Requires `holiday_country` and `business_days=true`.
val sign : kotlin.Boolean = true // kotlin.Boolean | Set to exactly `true` to ask the gateway to sign the final JSON response. Every authenticated JSON response, including errors, then includes signing headers. Not supported on `/v1/time/clock`.
try {
    val result : DiffResponse = apiInstance.diffTime(from, to, fromTz, fromIp, fromLat, fromLon, fromOffset, toTz, toIp, toLat, toLon, toOffset, format, businessDays, holidayCountry, holidaySubdivision, sign)
    println(result)
} catch (e: ClientException) {
    println("4xx response calling TimeApi#diffTime")
    e.printStackTrace()
} catch (e: ServerException) {
    println("5xx response calling TimeApi#diffTime")
    e.printStackTrace()
}
```

### Parameters
| **from** | **kotlin.String**| Time specifier. Supported forms are &#x60;now&#x60;, &#x60;unix&#x3D;&lt;seconds&gt;&#x60;, &#x60;unix_ms&#x3D;&lt;milliseconds&gt;&#x60;, &#x60;iso&#x3D;&lt;ISO-8601&gt;&#x60;, &#x60;offset&#x3D;±HH:MM&#x60;, &#x60;tz&#x3D;&lt;IANA timezone&gt;&#x60;, and &#x60;ip&#x3D;&lt;IP address&gt;&#x60;. For &#x60;tz&#x3D;...&#x60;, &#x60;ip&#x3D;...&#x60;, and &#x60;offset&#x3D;...&#x60;, the specifier means the current request-time instant resolved through that selector. To express a local wall-clock time, use &#x60;from&#x3D;iso&#x3D;...&#x60; together with one of &#x60;from_tz&#x60;, &#x60;from_ip&#x60;, &#x60;from_lat&#x60;+&#x60;from_lon&#x60;, or &#x60;from_offset&#x60;. | |
| **to** | **kotlin.String**| Time specifier. Supported forms are &#x60;now&#x60;, &#x60;unix&#x3D;&lt;seconds&gt;&#x60;, &#x60;unix_ms&#x3D;&lt;milliseconds&gt;&#x60;, &#x60;iso&#x3D;&lt;ISO-8601&gt;&#x60;, &#x60;offset&#x3D;±HH:MM&#x60;, &#x60;tz&#x3D;&lt;IANA timezone&gt;&#x60;, and &#x60;ip&#x3D;&lt;IP address&gt;&#x60;. For &#x60;tz&#x3D;...&#x60;, &#x60;ip&#x3D;...&#x60;, and &#x60;offset&#x3D;...&#x60;, the specifier means the current request-time instant resolved through that selector. To express a local wall-clock time, use &#x60;to&#x3D;iso&#x3D;...&#x60; together with one of &#x60;to_tz&#x60;, &#x60;to_ip&#x60;, &#x60;to_lat&#x60;+&#x60;to_lon&#x60;, or &#x60;to_offset&#x60;. | |
| **fromTz** | **kotlin.String**| Used only with &#x60;from&#x3D;iso&#x3D;...&#x60; when the ISO value has no explicit offset. | [optional] |
| **fromIp** | **kotlin.String**| Used only with &#x60;from&#x3D;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Resolves that local wall-clock time through the timezone mapped from this IP address. | [optional] |
| **fromLat** | **kotlin.Double**| Used only with &#x60;from&#x3D;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Provide together with &#x60;from_lon&#x60; to resolve that local wall-clock time through the timezone mapped from these coordinates. | [optional] |
| **fromLon** | **kotlin.Double**| Used only with &#x60;from&#x3D;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Provide together with &#x60;from_lat&#x60;. | [optional] |
| **fromOffset** | **kotlin.String**| Used only with &#x60;from&#x3D;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Interprets that local wall-clock time at this fixed UTC offset. | [optional] |
| **toTz** | **kotlin.String**| Used only with &#x60;to&#x3D;iso&#x3D;...&#x60; when the ISO value has no explicit offset. | [optional] |
| **toIp** | **kotlin.String**| Used only with &#x60;to&#x3D;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Resolves that local wall-clock time through the timezone mapped from this IP address. | [optional] |
| **toLat** | **kotlin.Double**| Used only with &#x60;to&#x3D;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Provide together with &#x60;to_lon&#x60; to resolve that local wall-clock time through the timezone mapped from these coordinates. | [optional] |
| **toLon** | **kotlin.Double**| Used only with &#x60;to&#x3D;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Provide together with &#x60;to_lat&#x60;. | [optional] |
| **toOffset** | **kotlin.String**| Used only with &#x60;to&#x3D;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Interprets that local wall-clock time at this fixed UTC offset. | [optional] |
| **format** | **kotlin.String**| Custom duration format template using &#x60;%days&#x60;, &#x60;%hours&#x60;, &#x60;%minutes&#x60;, and &#x60;%seconds&#x60;. | [optional] |
| **businessDays** | **kotlin.Boolean**| Set to &#x60;true&#x60; to enable weekday/business-day counting. | [optional] |
| **holidayCountry** | **kotlin.String**| ISO 3166-1 alpha-2 holiday calendar country code. Requires &#x60;business_days&#x3D;true&#x60;. | [optional] |
| **holidaySubdivision** | **kotlin.String**| Holiday calendar subdivision code from the upstream &#x60;python-holidays&#x60; calendar, for example &#x60;CA&#x60; or &#x60;ENG&#x60;. Requires &#x60;holiday_country&#x60; and &#x60;business_days&#x3D;true&#x60;. | [optional] |
| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **sign** | **kotlin.Boolean**| Set to exactly &#x60;true&#x60; to ask the gateway to sign the final JSON response. Every authenticated JSON response, including errors, then includes signing headers. Not supported on &#x60;/v1/time/clock&#x60;. | [optional] |

### Return type

[**DiffResponse**](DiffResponse.md)

### Authorization


Configure apiKeyHeader:
    ApiClient.apiKey["X-API-Key"] = ""
    ApiClient.apiKeyPrefix["X-API-Key"] = ""
Configure bearerAuth:
    ApiClient.accessToken = ""
Configure apiKeyQuery:
    ApiClient.apiKey["api_key"] = ""
    ApiClient.apiKeyPrefix["api_key"] = ""
Configure rapidApiKey:
    ApiClient.apiKey["X-RapidAPI-Key"] = ""
    ApiClient.apiKeyPrefix["X-RapidAPI-Key"] = ""
Configure rapidApiHost:
    ApiClient.apiKey["X-RapidAPI-Host"] = ""
    ApiClient.apiKeyPrefix["X-RapidAPI-Host"] = ""

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a id="getCalendar"></a>
# **getCalendar**
> CalendarResponse getCalendar(unix, unixMs, iso, sourceTz, sourceIp, sourceLat, sourceLon, sourceOffset, tz, ip, lat, lon, offset, autoTz, format, week, sign)

Calendar projection for a target instant

Returns calendar fields for an optional timestamp and target.  Input timestamp forms: - &#x60;unix&#x3D;1711300000&#x60; - &#x60;unix_ms&#x3D;1711300000000&#x60; - &#x60;iso&#x3D;2026-04-16T09:00:00Z&#x60; - &#x60;iso&#x3D;2026-04-16T09:00:00&amp;source_tz&#x3D;America/New_York&#x60; - &#x60;iso&#x3D;2026-04-16T09:00:00&amp;source_ip&#x3D;8.8.8.8&#x60; - &#x60;iso&#x3D;2026-04-16T09:00:00&amp;source_lat&#x3D;40.7128&amp;source_lon&#x3D;-74.0060&#x60; - &#x60;iso&#x3D;2026-04-16T09:00:00&amp;source_offset&#x3D;-05:00&#x60; - if no input timestamp is provided, the request time is used  Target selector forms: - &#x60;tz&#x3D;America/New_York&#x60; - &#x60;ip&#x3D;8.8.8.8&#x60; - &#x60;lat&#x3D;40.7128&amp;lon&#x3D;-74.0060&#x60; - &#x60;offset&#x3D;-04:00&#x60; - &#x60;auto_tz&#x3D;true&#x60;  Additional flags: - &#x60;week&#x3D;true&#x60; adds &#x60;week_number&#x60;  Incompatible combinations: - at most one input timestamp form - at most one target selector family - use at most one of &#x60;source_tz&#x60;, &#x60;source_ip&#x60;, &#x60;source_lat&#x60;/&#x60;source_lon&#x60;, or &#x60;source_offset&#x60; - local-ISO companion selectors are valid only with &#x60;iso&#x3D;...&#x60; that has no explicit offset - bulk is not supported on this route  Examples: - &#x60;/v1/time/calendar?iso&#x3D;2026-04-16T09:00:00&amp;source_tz&#x3D;America/New_York&amp;tz&#x3D;Europe/London&amp;week&#x3D;true&#x60; - &#x60;/v1/time/calendar?unix&#x3D;1711300000&amp;auto_tz&#x3D;true&#x60;

### Example
```kotlin
// Import classes:
//import com.timelogic.direct.api.infrastructure.*
//import com.timelogic.direct.api.models.*

val apiInstance = TimeApi()
val unix : kotlin.Long = 1711300000 // kotlin.Long |
val unixMs : kotlin.Long = 1711300000000 // kotlin.Long |
val iso : kotlin.String = 2024-03-24T15:00:00 // kotlin.String | ISO-8601 timestamp. To supply a local wall-clock time without an explicit offset, pair it with one of `source_tz=Area/City`, `source_ip=...`, `source_lat=...&source_lon=...`, or `source_offset=±HH:MM`.
val sourceTz : kotlin.String = America/New_York // kotlin.String | Used only with `iso=...` when the ISO value has no explicit offset.
val sourceIp : kotlin.String = 8.8.8.8 // kotlin.String | Used only with `iso=...` when the ISO value has no explicit offset. Resolves that local wall-clock time through the timezone mapped from this IP address.
val sourceLat : kotlin.Double = 40.7128 // kotlin.Double | Used only with `iso=...` when the ISO value has no explicit offset. Provide together with `source_lon` to resolve that local wall-clock time through the timezone mapped from these coordinates.
val sourceLon : kotlin.Double = -74.006 // kotlin.Double | Used only with `iso=...` when the ISO value has no explicit offset. Provide together with `source_lat`.
val sourceOffset : kotlin.String = -05:00 // kotlin.String | Used only with `iso=...` when the ISO value has no explicit offset. Interprets that local wall-clock time at this fixed UTC offset.
val tz : kotlin.String = America/New_York // kotlin.String | IANA timezone name. On bulk-capable routes, a comma-separated list enables bulk mode.
val ip : kotlin.String = 8.8.8.8 // kotlin.String | IP address. On bulk-capable routes, a comma-separated list enables bulk mode.
val lat : kotlin.Double = 40.7128 // kotlin.Double | Latitude. Must be provided together with `lon`.
val lon : kotlin.Double = -74.006 // kotlin.Double | Longitude. Must be provided together with `lat`.
val offset : kotlin.String = -04:00 // kotlin.String | Fixed UTC offset in `+HH:MM` or `-HH:MM` format. On bulk-capable routes, a comma-separated list enables bulk mode.
val autoTz : kotlin.Boolean = true // kotlin.Boolean | Set to `true` to resolve using the caller IP from Cloudflare headers.
val format : kotlin.String = %Y-%m-%d %H:%M:%S // kotlin.String | Custom date/time format template using supported `strftime`-style directives such as `%Y-%m-%d %H:%M:%S`. Reference: [strftime](https://strftime.net/).
val week : kotlin.Boolean = true // kotlin.Boolean |
val sign : kotlin.Boolean = true // kotlin.Boolean | Set to exactly `true` to ask the gateway to sign the final JSON response. Every authenticated JSON response, including errors, then includes signing headers. Not supported on `/v1/time/clock`.
try {
    val result : CalendarResponse = apiInstance.getCalendar(unix, unixMs, iso, sourceTz, sourceIp, sourceLat, sourceLon, sourceOffset, tz, ip, lat, lon, offset, autoTz, format, week, sign)
    println(result)
} catch (e: ClientException) {
    println("4xx response calling TimeApi#getCalendar")
    e.printStackTrace()
} catch (e: ServerException) {
    println("5xx response calling TimeApi#getCalendar")
    e.printStackTrace()
}
```

### Parameters
| **unix** | **kotlin.Long**|  | [optional] |
| **unixMs** | **kotlin.Long**|  | [optional] |
| **iso** | **kotlin.String**| ISO-8601 timestamp. To supply a local wall-clock time without an explicit offset, pair it with one of &#x60;source_tz&#x3D;Area/City&#x60;, &#x60;source_ip&#x3D;...&#x60;, &#x60;source_lat&#x3D;...&amp;source_lon&#x3D;...&#x60;, or &#x60;source_offset&#x3D;±HH:MM&#x60;. | [optional] |
| **sourceTz** | **kotlin.String**| Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. | [optional] |
| **sourceIp** | **kotlin.String**| Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Resolves that local wall-clock time through the timezone mapped from this IP address. | [optional] |
| **sourceLat** | **kotlin.Double**| Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Provide together with &#x60;source_lon&#x60; to resolve that local wall-clock time through the timezone mapped from these coordinates. | [optional] |
| **sourceLon** | **kotlin.Double**| Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Provide together with &#x60;source_lat&#x60;. | [optional] |
| **sourceOffset** | **kotlin.String**| Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Interprets that local wall-clock time at this fixed UTC offset. | [optional] |
| **tz** | **kotlin.String**| IANA timezone name. On bulk-capable routes, a comma-separated list enables bulk mode. | [optional] |
| **ip** | **kotlin.String**| IP address. On bulk-capable routes, a comma-separated list enables bulk mode. | [optional] |
| **lat** | **kotlin.Double**| Latitude. Must be provided together with &#x60;lon&#x60;. | [optional] |
| **lon** | **kotlin.Double**| Longitude. Must be provided together with &#x60;lat&#x60;. | [optional] |
| **offset** | **kotlin.String**| Fixed UTC offset in &#x60;+HH:MM&#x60; or &#x60;-HH:MM&#x60; format. On bulk-capable routes, a comma-separated list enables bulk mode. | [optional] |
| **autoTz** | **kotlin.Boolean**| Set to &#x60;true&#x60; to resolve using the caller IP from Cloudflare headers. | [optional] |
| **format** | **kotlin.String**| Custom date/time format template using supported &#x60;strftime&#x60;-style directives such as &#x60;%Y-%m-%d %H:%M:%S&#x60;. Reference: [strftime](https://strftime.net/). | [optional] |
| **week** | **kotlin.Boolean**|  | [optional] |
| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **sign** | **kotlin.Boolean**| Set to exactly &#x60;true&#x60; to ask the gateway to sign the final JSON response. Every authenticated JSON response, including errors, then includes signing headers. Not supported on &#x60;/v1/time/clock&#x60;. | [optional] |

### Return type

[**CalendarResponse**](CalendarResponse.md)

### Authorization


Configure apiKeyHeader:
    ApiClient.apiKey["X-API-Key"] = ""
    ApiClient.apiKeyPrefix["X-API-Key"] = ""
Configure bearerAuth:
    ApiClient.accessToken = ""
Configure apiKeyQuery:
    ApiClient.apiKey["api_key"] = ""
    ApiClient.apiKeyPrefix["api_key"] = ""
Configure rapidApiKey:
    ApiClient.apiKey["X-RapidAPI-Key"] = ""
    ApiClient.apiKeyPrefix["X-RapidAPI-Key"] = ""
Configure rapidApiHost:
    ApiClient.apiKey["X-RapidAPI-Host"] = ""
    ApiClient.apiKeyPrefix["X-RapidAPI-Host"] = ""

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a id="getClock"></a>
# **getClock**
> kotlin.String getClock(style, unix, unixMs, iso, sourceTz, sourceIp, sourceLat, sourceLon, sourceOffset, tz, ip, lat, lon, offset, format)

Render a live HTML clock

Returns an embeddable HTML clock fragment.  Input timestamp forms: - &#x60;unix&#x3D;1711300000&#x60; - &#x60;unix_ms&#x3D;1711300000000&#x60; - &#x60;iso&#x3D;2026-04-16T09:00:00Z&#x60; - &#x60;iso&#x3D;2026-04-16T09:00:00&amp;source_tz&#x3D;America/New_York&#x60;  Target selector forms: - &#x60;tz&#x3D;America/New_York&#x60; - &#x60;ip&#x3D;8.8.8.8&#x60; - &#x60;lat&#x3D;40.7128&amp;lon&#x3D;-74.0060&#x60; - &#x60;offset&#x3D;-04:00&#x60;  Incompatible combinations: - &#x60;style&#x60; is required and must be one of the 30 names in the &#x60;style&#x60; enum - at most one input timestamp form - at most one target selector family - use at most one of &#x60;source_tz&#x60;, &#x60;source_ip&#x60;, &#x60;source_lat&#x60;/&#x60;source_lon&#x60;, or &#x60;source_offset&#x60; - local-ISO companion selectors are valid only with &#x60;iso&#x3D;...&#x60; that has no explicit offset - this route is single-target only; comma-separated &#x60;tz&#x60;, &#x60;ip&#x60;, and &#x60;offset&#x60; values are rejected - &#x60;auto_tz&#x60; is not supported on this route - &#x60;sign&#x60; is not supported on this route  Examples: - Digital: &#x60;/v1/time/clock?style&#x3D;digital-dashboard&amp;iso&#x3D;2026-04-16T09:00:00&amp;source_tz&#x3D;America/New_York&amp;tz&#x3D;Europe/London&#x60; - Analog: &#x60;/v1/time/clock?style&#x3D;analog-station&amp;offset&#x3D;-04:00&#x60;

### Example
```kotlin
// Import classes:
//import com.timelogic.direct.api.infrastructure.*
//import com.timelogic.direct.api.models.*

val apiInstance = TimeApi()
val style : kotlin.String = style_example // kotlin.String | Clock style name. Valid values are enumerated here; there is no separate style discovery endpoint.
val unix : kotlin.Long = 1711300000 // kotlin.Long |
val unixMs : kotlin.Long = 1711300000000 // kotlin.Long |
val iso : kotlin.String = 2024-03-24T15:00:00 // kotlin.String | ISO-8601 timestamp. To supply a local wall-clock time without an explicit offset, pair it with one of `source_tz=Area/City`, `source_ip=...`, `source_lat=...&source_lon=...`, or `source_offset=±HH:MM`.
val sourceTz : kotlin.String = America/New_York // kotlin.String | Used only with `iso=...` when the ISO value has no explicit offset.
val sourceIp : kotlin.String = 8.8.8.8 // kotlin.String | Used only with `iso=...` when the ISO value has no explicit offset. Resolves that local wall-clock time through the timezone mapped from this IP address.
val sourceLat : kotlin.Double = 40.7128 // kotlin.Double | Used only with `iso=...` when the ISO value has no explicit offset. Provide together with `source_lon` to resolve that local wall-clock time through the timezone mapped from these coordinates.
val sourceLon : kotlin.Double = -74.006 // kotlin.Double | Used only with `iso=...` when the ISO value has no explicit offset. Provide together with `source_lat`.
val sourceOffset : kotlin.String = -05:00 // kotlin.String | Used only with `iso=...` when the ISO value has no explicit offset. Interprets that local wall-clock time at this fixed UTC offset.
val tz : kotlin.String = America/New_York // kotlin.String | IANA timezone name. On bulk-capable routes, a comma-separated list enables bulk mode.
val ip : kotlin.String = 8.8.8.8 // kotlin.String | IP address. On bulk-capable routes, a comma-separated list enables bulk mode.
val lat : kotlin.Double = 40.7128 // kotlin.Double | Latitude. Must be provided together with `lon`.
val lon : kotlin.Double = -74.006 // kotlin.Double | Longitude. Must be provided together with `lat`.
val offset : kotlin.String = -04:00 // kotlin.String | Fixed UTC offset in `+HH:MM` or `-HH:MM` format. On bulk-capable routes, a comma-separated list enables bulk mode.
val format : kotlin.String = %Y-%m-%d %H:%M:%S // kotlin.String | Custom date/time format template using supported `strftime`-style directives such as `%Y-%m-%d %H:%M:%S`. Reference: [strftime](https://strftime.net/).
try {
    val result : kotlin.String = apiInstance.getClock(style, unix, unixMs, iso, sourceTz, sourceIp, sourceLat, sourceLon, sourceOffset, tz, ip, lat, lon, offset, format)
    println(result)
} catch (e: ClientException) {
    println("4xx response calling TimeApi#getClock")
    e.printStackTrace()
} catch (e: ServerException) {
    println("5xx response calling TimeApi#getClock")
    e.printStackTrace()
}
```

### Parameters
| **style** | **kotlin.String**| Clock style name. Valid values are enumerated here; there is no separate style discovery endpoint. | [enum: analog-station, analog-aviation, analog-bauhaus, analog-graphite, analog-arctic, analog-brass, analog-marine, analog-grid, analog-slate, analog-executive, digital-segment-red, digital-segment-amber, digital-segment-ice, digital-terminal-green, digital-terminal-white, digital-broadcast, digital-dashboard, digital-control-room, digital-slate, digital-onyx, digital-frost, digital-card, digital-glass, digital-matrix, digital-timetable, digital-split-flap, digital-cyan, digital-emerald, digital-monolith, digital-minimal] |
| **unix** | **kotlin.Long**|  | [optional] |
| **unixMs** | **kotlin.Long**|  | [optional] |
| **iso** | **kotlin.String**| ISO-8601 timestamp. To supply a local wall-clock time without an explicit offset, pair it with one of &#x60;source_tz&#x3D;Area/City&#x60;, &#x60;source_ip&#x3D;...&#x60;, &#x60;source_lat&#x3D;...&amp;source_lon&#x3D;...&#x60;, or &#x60;source_offset&#x3D;±HH:MM&#x60;. | [optional] |
| **sourceTz** | **kotlin.String**| Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. | [optional] |
| **sourceIp** | **kotlin.String**| Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Resolves that local wall-clock time through the timezone mapped from this IP address. | [optional] |
| **sourceLat** | **kotlin.Double**| Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Provide together with &#x60;source_lon&#x60; to resolve that local wall-clock time through the timezone mapped from these coordinates. | [optional] |
| **sourceLon** | **kotlin.Double**| Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Provide together with &#x60;source_lat&#x60;. | [optional] |
| **sourceOffset** | **kotlin.String**| Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Interprets that local wall-clock time at this fixed UTC offset. | [optional] |
| **tz** | **kotlin.String**| IANA timezone name. On bulk-capable routes, a comma-separated list enables bulk mode. | [optional] |
| **ip** | **kotlin.String**| IP address. On bulk-capable routes, a comma-separated list enables bulk mode. | [optional] |
| **lat** | **kotlin.Double**| Latitude. Must be provided together with &#x60;lon&#x60;. | [optional] |
| **lon** | **kotlin.Double**| Longitude. Must be provided together with &#x60;lat&#x60;. | [optional] |
| **offset** | **kotlin.String**| Fixed UTC offset in &#x60;+HH:MM&#x60; or &#x60;-HH:MM&#x60; format. On bulk-capable routes, a comma-separated list enables bulk mode. | [optional] |
| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **format** | **kotlin.String**| Custom date/time format template using supported &#x60;strftime&#x60;-style directives such as &#x60;%Y-%m-%d %H:%M:%S&#x60;. Reference: [strftime](https://strftime.net/). | [optional] |

### Return type

**kotlin.String**

### Authorization


Configure apiKeyHeader:
    ApiClient.apiKey["X-API-Key"] = ""
    ApiClient.apiKeyPrefix["X-API-Key"] = ""
Configure bearerAuth:
    ApiClient.accessToken = ""
Configure apiKeyQuery:
    ApiClient.apiKey["api_key"] = ""
    ApiClient.apiKeyPrefix["api_key"] = ""
Configure rapidApiKey:
    ApiClient.apiKey["X-RapidAPI-Key"] = ""
    ApiClient.apiKeyPrefix["X-RapidAPI-Key"] = ""
Configure rapidApiHost:
    ApiClient.apiKey["X-RapidAPI-Host"] = ""
    ApiClient.apiKeyPrefix["X-RapidAPI-Host"] = ""

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a id="getCurrentTime"></a>
# **getCurrentTime**
> GetCurrentTime200Response getCurrentTime(tz, ip, lat, lon, offset, autoTz, format, sign)

Get the current time for a target

Returns current time data for a single target, or a bulk array when exactly one of &#x60;tz&#x60;, &#x60;ip&#x60;, or &#x60;offset&#x60; is supplied as a comma-separated list.  Target selector rules: - Use at most one selector family per request: &#x60;tz&#x60;, &#x60;ip&#x60;, &#x60;lat&#x60; + &#x60;lon&#x60;, &#x60;offset&#x60;, or &#x60;auto_tz&#x3D;true&#x60;. - If no selector is provided, the response defaults to UTC with &#x60;timezone&#x3D;null&#x60; and &#x60;iso_local&#x3D;null&#x60;. - Bulk mode is available only through one comma-separated &#x60;tz&#x60;, &#x60;ip&#x60;, or &#x60;offset&#x60; selector and cannot be combined with any other selector.  Example: - Single target: &#x60;/v1/time/current?tz&#x3D;America/New_York&#x60; - For bulk, provide one comma-separated &#x60;tz&#x60;, &#x60;ip&#x60;, or &#x60;offset&#x60; value, for example &#x60;/v1/time/current?tz&#x3D;America/New_York,Europe/London,Asia/Tokyo&#x60;.

### Example
```kotlin
// Import classes:
//import com.timelogic.direct.api.infrastructure.*
//import com.timelogic.direct.api.models.*

val apiInstance = TimeApi()
val tz : kotlin.String = America/New_York // kotlin.String | IANA timezone name. On bulk-capable routes, a comma-separated list enables bulk mode.
val ip : kotlin.String = 8.8.8.8 // kotlin.String | IP address. On bulk-capable routes, a comma-separated list enables bulk mode.
val lat : kotlin.Double = 40.7128 // kotlin.Double | Latitude. Must be provided together with `lon`.
val lon : kotlin.Double = -74.006 // kotlin.Double | Longitude. Must be provided together with `lat`.
val offset : kotlin.String = -04:00 // kotlin.String | Fixed UTC offset in `+HH:MM` or `-HH:MM` format. On bulk-capable routes, a comma-separated list enables bulk mode.
val autoTz : kotlin.Boolean = true // kotlin.Boolean | Set to `true` to resolve using the caller IP from Cloudflare headers.
val format : kotlin.String = %Y-%m-%d %H:%M:%S // kotlin.String | Custom date/time format template using supported `strftime`-style directives such as `%Y-%m-%d %H:%M:%S`. Reference: [strftime](https://strftime.net/).
val sign : kotlin.Boolean = true // kotlin.Boolean | Set to exactly `true` to ask the gateway to sign the final JSON response. Every authenticated JSON response, including errors, then includes signing headers. Not supported on `/v1/time/clock`.
try {
    val result : GetCurrentTime200Response = apiInstance.getCurrentTime(tz, ip, lat, lon, offset, autoTz, format, sign)
    println(result)
} catch (e: ClientException) {
    println("4xx response calling TimeApi#getCurrentTime")
    e.printStackTrace()
} catch (e: ServerException) {
    println("5xx response calling TimeApi#getCurrentTime")
    e.printStackTrace()
}
```

### Parameters
| **tz** | **kotlin.String**| IANA timezone name. On bulk-capable routes, a comma-separated list enables bulk mode. | [optional] |
| **ip** | **kotlin.String**| IP address. On bulk-capable routes, a comma-separated list enables bulk mode. | [optional] |
| **lat** | **kotlin.Double**| Latitude. Must be provided together with &#x60;lon&#x60;. | [optional] |
| **lon** | **kotlin.Double**| Longitude. Must be provided together with &#x60;lat&#x60;. | [optional] |
| **offset** | **kotlin.String**| Fixed UTC offset in &#x60;+HH:MM&#x60; or &#x60;-HH:MM&#x60; format. On bulk-capable routes, a comma-separated list enables bulk mode. | [optional] |
| **autoTz** | **kotlin.Boolean**| Set to &#x60;true&#x60; to resolve using the caller IP from Cloudflare headers. | [optional] |
| **format** | **kotlin.String**| Custom date/time format template using supported &#x60;strftime&#x60;-style directives such as &#x60;%Y-%m-%d %H:%M:%S&#x60;. Reference: [strftime](https://strftime.net/). | [optional] |
| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **sign** | **kotlin.Boolean**| Set to exactly &#x60;true&#x60; to ask the gateway to sign the final JSON response. Every authenticated JSON response, including errors, then includes signing headers. Not supported on &#x60;/v1/time/clock&#x60;. | [optional] |

### Return type

[**GetCurrentTime200Response**](GetCurrentTime200Response.md)

### Authorization


Configure apiKeyHeader:
    ApiClient.apiKey["X-API-Key"] = ""
    ApiClient.apiKeyPrefix["X-API-Key"] = ""
Configure bearerAuth:
    ApiClient.accessToken = ""
Configure apiKeyQuery:
    ApiClient.apiKey["api_key"] = ""
    ApiClient.apiKeyPrefix["api_key"] = ""
Configure rapidApiKey:
    ApiClient.apiKey["X-RapidAPI-Key"] = ""
    ApiClient.apiKeyPrefix["X-RapidAPI-Key"] = ""
Configure rapidApiHost:
    ApiClient.apiKey["X-RapidAPI-Host"] = ""
    ApiClient.apiKeyPrefix["X-RapidAPI-Host"] = ""

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a id="getDst"></a>
# **getDst**
> DstResponse getDst(tz, ip, lat, lon, offset, autoTz, format, next, sign)

Daylight-saving status for a target

Returns daylight-saving status for the selected target.  Target selector rules: - Use at most one selector family: &#x60;tz&#x60;, &#x60;ip&#x60;, &#x60;lat&#x60; + &#x60;lon&#x60;, &#x60;offset&#x60;, or &#x60;auto_tz&#x3D;true&#x60;. - If no selector is provided, the response defaults to UTC. - Bulk is not supported on this route. - &#x60;next&#x3D;true&#x60; adds &#x60;next_transition&#x60; when the resolver provides a transition timestamp.  Example: - &#x60;/v1/time/dst?tz&#x3D;America/New_York&amp;next&#x3D;true&#x60;

### Example
```kotlin
// Import classes:
//import com.timelogic.direct.api.infrastructure.*
//import com.timelogic.direct.api.models.*

val apiInstance = TimeApi()
val tz : kotlin.String = America/New_York // kotlin.String | IANA timezone name. On bulk-capable routes, a comma-separated list enables bulk mode.
val ip : kotlin.String = 8.8.8.8 // kotlin.String | IP address. On bulk-capable routes, a comma-separated list enables bulk mode.
val lat : kotlin.Double = 40.7128 // kotlin.Double | Latitude. Must be provided together with `lon`.
val lon : kotlin.Double = -74.006 // kotlin.Double | Longitude. Must be provided together with `lat`.
val offset : kotlin.String = -04:00 // kotlin.String | Fixed UTC offset in `+HH:MM` or `-HH:MM` format. On bulk-capable routes, a comma-separated list enables bulk mode.
val autoTz : kotlin.Boolean = true // kotlin.Boolean | Set to `true` to resolve using the caller IP from Cloudflare headers.
val format : kotlin.String = %Y-%m-%d %H:%M:%S // kotlin.String | Custom date/time format template using supported `strftime`-style directives such as `%Y-%m-%d %H:%M:%S`. Reference: [strftime](https://strftime.net/).
val next : kotlin.Boolean = true // kotlin.Boolean |
val sign : kotlin.Boolean = true // kotlin.Boolean | Set to exactly `true` to ask the gateway to sign the final JSON response. Every authenticated JSON response, including errors, then includes signing headers. Not supported on `/v1/time/clock`.
try {
    val result : DstResponse = apiInstance.getDst(tz, ip, lat, lon, offset, autoTz, format, next, sign)
    println(result)
} catch (e: ClientException) {
    println("4xx response calling TimeApi#getDst")
    e.printStackTrace()
} catch (e: ServerException) {
    println("5xx response calling TimeApi#getDst")
    e.printStackTrace()
}
```

### Parameters
| **tz** | **kotlin.String**| IANA timezone name. On bulk-capable routes, a comma-separated list enables bulk mode. | [optional] |
| **ip** | **kotlin.String**| IP address. On bulk-capable routes, a comma-separated list enables bulk mode. | [optional] |
| **lat** | **kotlin.Double**| Latitude. Must be provided together with &#x60;lon&#x60;. | [optional] |
| **lon** | **kotlin.Double**| Longitude. Must be provided together with &#x60;lat&#x60;. | [optional] |
| **offset** | **kotlin.String**| Fixed UTC offset in &#x60;+HH:MM&#x60; or &#x60;-HH:MM&#x60; format. On bulk-capable routes, a comma-separated list enables bulk mode. | [optional] |
| **autoTz** | **kotlin.Boolean**| Set to &#x60;true&#x60; to resolve using the caller IP from Cloudflare headers. | [optional] |
| **format** | **kotlin.String**| Custom date/time format template using supported &#x60;strftime&#x60;-style directives such as &#x60;%Y-%m-%d %H:%M:%S&#x60;. Reference: [strftime](https://strftime.net/). | [optional] |
| **next** | **kotlin.Boolean**|  | [optional] |
| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **sign** | **kotlin.Boolean**| Set to exactly &#x60;true&#x60; to ask the gateway to sign the final JSON response. Every authenticated JSON response, including errors, then includes signing headers. Not supported on &#x60;/v1/time/clock&#x60;. | [optional] |

### Return type

[**DstResponse**](DstResponse.md)

### Authorization


Configure apiKeyHeader:
    ApiClient.apiKey["X-API-Key"] = ""
    ApiClient.apiKeyPrefix["X-API-Key"] = ""
Configure bearerAuth:
    ApiClient.accessToken = ""
Configure apiKeyQuery:
    ApiClient.apiKey["api_key"] = ""
    ApiClient.apiKeyPrefix["api_key"] = ""
Configure rapidApiKey:
    ApiClient.apiKey["X-RapidAPI-Key"] = ""
    ApiClient.apiKeyPrefix["X-RapidAPI-Key"] = ""
Configure rapidApiHost:
    ApiClient.apiKey["X-RapidAPI-Host"] = ""
    ApiClient.apiKeyPrefix["X-RapidAPI-Host"] = ""

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a id="getElapsed"></a>
# **getElapsed**
> ElapsedResponse getElapsed(unix, unixMs, iso, sourceTz, sourceIp, sourceLat, sourceLon, sourceOffset, compareUnix, compareUnixMs, compareIso, compareSourceTz, compareSourceIp, compareSourceLat, compareSourceLon, compareSourceOffset, tz, ip, lat, lon, offset, autoTz, format, businessDays, holidayCountry, holidaySubdivision, sign)

Time elapsed since or remaining until a reference instant

Computes elapsed or remaining duration relative to one required reference timestamp.  Reference timestamp forms: - &#x60;unix&#x3D;1711300000&#x60; - &#x60;unix_ms&#x3D;1711300000000&#x60; - &#x60;iso&#x3D;2026-04-16T09:00:00Z&#x60; - &#x60;iso&#x3D;2026-04-16T09:00:00&amp;source_tz&#x3D;America/New_York&#x60; - &#x60;iso&#x3D;2026-04-16T09:00:00&amp;source_ip&#x3D;8.8.8.8&#x60; - &#x60;iso&#x3D;2026-04-16T09:00:00&amp;source_lat&#x3D;40.7128&amp;source_lon&#x3D;-74.0060&#x60; - &#x60;iso&#x3D;2026-04-16T09:00:00&amp;source_offset&#x3D;-05:00&#x60;  Compare timestamp forms: - &#x60;compare_unix&#x3D;1711213600&#x60; - &#x60;compare_unix_ms&#x3D;1711213600000&#x60; - &#x60;compare_iso&#x3D;2026-04-16T09:00:00Z&#x60; - &#x60;compare_iso&#x3D;2026-04-16T09:00:00&amp;compare_source_tz&#x3D;Europe/London&#x60; - &#x60;compare_iso&#x3D;2026-04-16T09:00:00&amp;compare_source_ip&#x3D;8.8.8.8&#x60; - &#x60;compare_iso&#x3D;2026-04-16T09:00:00&amp;compare_source_lat&#x3D;40.7128&amp;compare_source_lon&#x3D;-74.0060&#x60; - &#x60;compare_iso&#x3D;2026-04-16T09:00:00&amp;compare_source_offset&#x3D;-05:00&#x60;  Compare selector forms: - &#x60;tz&#x3D;America/New_York&#x60; - &#x60;ip&#x3D;8.8.8.8&#x60; - &#x60;lat&#x3D;40.7128&amp;lon&#x3D;-74.0060&#x60; - &#x60;offset&#x3D;-04:00&#x60; - &#x60;auto_tz&#x3D;true&#x60;  Incompatible combinations: - exactly one reference timestamp form - use either one compare timestamp form or one compare selector family, not both - use at most one of &#x60;source_tz&#x60;, &#x60;source_ip&#x60;, &#x60;source_lat&#x60;/&#x60;source_lon&#x60;, or &#x60;source_offset&#x60; - use at most one of &#x60;compare_source_tz&#x60;, &#x60;compare_source_ip&#x60;, &#x60;compare_source_lat&#x60;/&#x60;compare_source_lon&#x60;, or &#x60;compare_source_offset&#x60; - local-ISO companion selectors are valid only with &#x60;iso&#x3D;...&#x60; that has no explicit offset - compare local-ISO companion selectors are valid only with &#x60;compare_iso&#x3D;...&#x60; that has no explicit offset - if no compare input is provided, the comparison defaults to the request time  Business-day rules: - &#x60;holiday_country&#x60; and &#x60;holiday_subdivision&#x60; require &#x60;business_days&#x3D;true&#x60; - &#x60;holiday_subdivision&#x60; also requires &#x60;holiday_country&#x60;  Examples: - Timestamp-to-timestamp: &#x60;/v1/time/elapsed?iso&#x3D;2026-04-16T09:00:00&amp;source_tz&#x3D;America/New_York&amp;compare_iso&#x3D;2026-04-16T09:00:00&amp;compare_source_tz&#x3D;Europe/London&#x60; - Timestamp-to-selector: &#x60;/v1/time/elapsed?unix&#x3D;1711300000&amp;tz&#x3D;America/New_York&amp;business_days&#x3D;true&#x60;

### Example
```kotlin
// Import classes:
//import com.timelogic.direct.api.infrastructure.*
//import com.timelogic.direct.api.models.*

val apiInstance = TimeApi()
val unix : kotlin.Long = 1711300000 // kotlin.Long |
val unixMs : kotlin.Long = 1711300000000 // kotlin.Long |
val iso : kotlin.String = 2024-03-24T15:00:00 // kotlin.String | ISO-8601 timestamp. To supply a local wall-clock time without an explicit offset, pair it with one of `source_tz=Area/City`, `source_ip=...`, `source_lat=...&source_lon=...`, or `source_offset=±HH:MM`.
val sourceTz : kotlin.String = America/New_York // kotlin.String | Used only with `iso=...` when the ISO value has no explicit offset.
val sourceIp : kotlin.String = 8.8.8.8 // kotlin.String | Used only with `iso=...` when the ISO value has no explicit offset. Resolves that local wall-clock time through the timezone mapped from this IP address.
val sourceLat : kotlin.Double = 40.7128 // kotlin.Double | Used only with `iso=...` when the ISO value has no explicit offset. Provide together with `source_lon` to resolve that local wall-clock time through the timezone mapped from these coordinates.
val sourceLon : kotlin.Double = -74.006 // kotlin.Double | Used only with `iso=...` when the ISO value has no explicit offset. Provide together with `source_lat`.
val sourceOffset : kotlin.String = -05:00 // kotlin.String | Used only with `iso=...` when the ISO value has no explicit offset. Interprets that local wall-clock time at this fixed UTC offset.
val compareUnix : kotlin.Long = 1711213600 // kotlin.Long |
val compareUnixMs : kotlin.Long = 1711213600000 // kotlin.Long |
val compareIso : kotlin.String = 2024-03-23T15:00:00 // kotlin.String | ISO-8601 comparison timestamp. To supply a local wall-clock time without an explicit offset, pair it with one of `compare_source_tz=Area/City`, `compare_source_ip=...`, `compare_source_lat=...&compare_source_lon=...`, or `compare_source_offset=±HH:MM`.
val compareSourceTz : kotlin.String = America/New_York // kotlin.String | Used only with `compare_iso=...` when the ISO value has no explicit offset.
val compareSourceIp : kotlin.String = 8.8.8.8 // kotlin.String | Used only with `compare_iso=...` when the ISO value has no explicit offset. Resolves that local wall-clock time through the timezone mapped from this IP address.
val compareSourceLat : kotlin.Double = 40.7128 // kotlin.Double | Used only with `compare_iso=...` when the ISO value has no explicit offset. Provide together with `compare_source_lon` to resolve that local wall-clock time through the timezone mapped from these coordinates.
val compareSourceLon : kotlin.Double = -74.006 // kotlin.Double | Used only with `compare_iso=...` when the ISO value has no explicit offset. Provide together with `compare_source_lat`.
val compareSourceOffset : kotlin.String = -05:00 // kotlin.String | Used only with `compare_iso=...` when the ISO value has no explicit offset. Interprets that local wall-clock time at this fixed UTC offset.
val tz : kotlin.String = America/New_York // kotlin.String | IANA timezone name. On bulk-capable routes, a comma-separated list enables bulk mode.
val ip : kotlin.String = 8.8.8.8 // kotlin.String | IP address. On bulk-capable routes, a comma-separated list enables bulk mode.
val lat : kotlin.Double = 40.7128 // kotlin.Double | Latitude. Must be provided together with `lon`.
val lon : kotlin.Double = -74.006 // kotlin.Double | Longitude. Must be provided together with `lat`.
val offset : kotlin.String = -04:00 // kotlin.String | Fixed UTC offset in `+HH:MM` or `-HH:MM` format. On bulk-capable routes, a comma-separated list enables bulk mode.
val autoTz : kotlin.Boolean = true // kotlin.Boolean | Set to `true` to resolve using the caller IP from Cloudflare headers.
val format : kotlin.String = %daysd %hoursh %minutesm %secondss // kotlin.String | Custom duration format template using `%days`, `%hours`, `%minutes`, and `%seconds`.
val businessDays : kotlin.Boolean = true // kotlin.Boolean | Set to `true` to enable weekday/business-day counting.
val holidayCountry : kotlin.String = US // kotlin.String | ISO 3166-1 alpha-2 holiday calendar country code. Requires `business_days=true`.
val holidaySubdivision : kotlin.String = CA // kotlin.String | Holiday calendar subdivision code from the upstream `python-holidays` calendar, for example `CA` or `ENG`. Requires `holiday_country` and `business_days=true`.
val sign : kotlin.Boolean = true // kotlin.Boolean | Set to exactly `true` to ask the gateway to sign the final JSON response. Every authenticated JSON response, including errors, then includes signing headers. Not supported on `/v1/time/clock`.
try {
    val result : ElapsedResponse = apiInstance.getElapsed(unix, unixMs, iso, sourceTz, sourceIp, sourceLat, sourceLon, sourceOffset, compareUnix, compareUnixMs, compareIso, compareSourceTz, compareSourceIp, compareSourceLat, compareSourceLon, compareSourceOffset, tz, ip, lat, lon, offset, autoTz, format, businessDays, holidayCountry, holidaySubdivision, sign)
    println(result)
} catch (e: ClientException) {
    println("4xx response calling TimeApi#getElapsed")
    e.printStackTrace()
} catch (e: ServerException) {
    println("5xx response calling TimeApi#getElapsed")
    e.printStackTrace()
}
```

### Parameters
| **unix** | **kotlin.Long**|  | [optional] |
| **unixMs** | **kotlin.Long**|  | [optional] |
| **iso** | **kotlin.String**| ISO-8601 timestamp. To supply a local wall-clock time without an explicit offset, pair it with one of &#x60;source_tz&#x3D;Area/City&#x60;, &#x60;source_ip&#x3D;...&#x60;, &#x60;source_lat&#x3D;...&amp;source_lon&#x3D;...&#x60;, or &#x60;source_offset&#x3D;±HH:MM&#x60;. | [optional] |
| **sourceTz** | **kotlin.String**| Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. | [optional] |
| **sourceIp** | **kotlin.String**| Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Resolves that local wall-clock time through the timezone mapped from this IP address. | [optional] |
| **sourceLat** | **kotlin.Double**| Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Provide together with &#x60;source_lon&#x60; to resolve that local wall-clock time through the timezone mapped from these coordinates. | [optional] |
| **sourceLon** | **kotlin.Double**| Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Provide together with &#x60;source_lat&#x60;. | [optional] |
| **sourceOffset** | **kotlin.String**| Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Interprets that local wall-clock time at this fixed UTC offset. | [optional] |
| **compareUnix** | **kotlin.Long**|  | [optional] |
| **compareUnixMs** | **kotlin.Long**|  | [optional] |
| **compareIso** | **kotlin.String**| ISO-8601 comparison timestamp. To supply a local wall-clock time without an explicit offset, pair it with one of &#x60;compare_source_tz&#x3D;Area/City&#x60;, &#x60;compare_source_ip&#x3D;...&#x60;, &#x60;compare_source_lat&#x3D;...&amp;compare_source_lon&#x3D;...&#x60;, or &#x60;compare_source_offset&#x3D;±HH:MM&#x60;. | [optional] |
| **compareSourceTz** | **kotlin.String**| Used only with &#x60;compare_iso&#x3D;...&#x60; when the ISO value has no explicit offset. | [optional] |
| **compareSourceIp** | **kotlin.String**| Used only with &#x60;compare_iso&#x3D;...&#x60; when the ISO value has no explicit offset. Resolves that local wall-clock time through the timezone mapped from this IP address. | [optional] |
| **compareSourceLat** | **kotlin.Double**| Used only with &#x60;compare_iso&#x3D;...&#x60; when the ISO value has no explicit offset. Provide together with &#x60;compare_source_lon&#x60; to resolve that local wall-clock time through the timezone mapped from these coordinates. | [optional] |
| **compareSourceLon** | **kotlin.Double**| Used only with &#x60;compare_iso&#x3D;...&#x60; when the ISO value has no explicit offset. Provide together with &#x60;compare_source_lat&#x60;. | [optional] |
| **compareSourceOffset** | **kotlin.String**| Used only with &#x60;compare_iso&#x3D;...&#x60; when the ISO value has no explicit offset. Interprets that local wall-clock time at this fixed UTC offset. | [optional] |
| **tz** | **kotlin.String**| IANA timezone name. On bulk-capable routes, a comma-separated list enables bulk mode. | [optional] |
| **ip** | **kotlin.String**| IP address. On bulk-capable routes, a comma-separated list enables bulk mode. | [optional] |
| **lat** | **kotlin.Double**| Latitude. Must be provided together with &#x60;lon&#x60;. | [optional] |
| **lon** | **kotlin.Double**| Longitude. Must be provided together with &#x60;lat&#x60;. | [optional] |
| **offset** | **kotlin.String**| Fixed UTC offset in &#x60;+HH:MM&#x60; or &#x60;-HH:MM&#x60; format. On bulk-capable routes, a comma-separated list enables bulk mode. | [optional] |
| **autoTz** | **kotlin.Boolean**| Set to &#x60;true&#x60; to resolve using the caller IP from Cloudflare headers. | [optional] |
| **format** | **kotlin.String**| Custom duration format template using &#x60;%days&#x60;, &#x60;%hours&#x60;, &#x60;%minutes&#x60;, and &#x60;%seconds&#x60;. | [optional] |
| **businessDays** | **kotlin.Boolean**| Set to &#x60;true&#x60; to enable weekday/business-day counting. | [optional] |
| **holidayCountry** | **kotlin.String**| ISO 3166-1 alpha-2 holiday calendar country code. Requires &#x60;business_days&#x3D;true&#x60;. | [optional] |
| **holidaySubdivision** | **kotlin.String**| Holiday calendar subdivision code from the upstream &#x60;python-holidays&#x60; calendar, for example &#x60;CA&#x60; or &#x60;ENG&#x60;. Requires &#x60;holiday_country&#x60; and &#x60;business_days&#x3D;true&#x60;. | [optional] |
| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **sign** | **kotlin.Boolean**| Set to exactly &#x60;true&#x60; to ask the gateway to sign the final JSON response. Every authenticated JSON response, including errors, then includes signing headers. Not supported on &#x60;/v1/time/clock&#x60;. | [optional] |

### Return type

[**ElapsedResponse**](ElapsedResponse.md)

### Authorization


Configure apiKeyHeader:
    ApiClient.apiKey["X-API-Key"] = ""
    ApiClient.apiKeyPrefix["X-API-Key"] = ""
Configure bearerAuth:
    ApiClient.accessToken = ""
Configure apiKeyQuery:
    ApiClient.apiKey["api_key"] = ""
    ApiClient.apiKeyPrefix["api_key"] = ""
Configure rapidApiKey:
    ApiClient.apiKey["X-RapidAPI-Key"] = ""
    ApiClient.apiKeyPrefix["X-RapidAPI-Key"] = ""
Configure rapidApiHost:
    ApiClient.apiKey["X-RapidAPI-Host"] = ""
    ApiClient.apiKeyPrefix["X-RapidAPI-Host"] = ""

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a id="getTimezone"></a>
# **getTimezone**
> GetTimezone200Response getTimezone(tz, ip, lat, lon, offset, autoTz, sign)

Resolve timezone information for a target

Resolves timezone metadata for a single target.  Target selector rules: - Use exactly one selector family: &#x60;tz&#x60;, &#x60;ip&#x60;, &#x60;lat&#x60; + &#x60;lon&#x60;, &#x60;offset&#x60;, or &#x60;auto_tz&#x3D;true&#x60;. - Bulk is not supported on this route. - &#x60;offset&#x60; queries return a specialized payload that includes &#x60;matching_zones&#x60; for the request-time offset match.  Examples: - Single target: &#x60;/v1/timezone?tz&#x3D;America/New_York&#x60; - Offset match: &#x60;/v1/timezone?offset&#x3D;-04:00&#x60;

### Example
```kotlin
// Import classes:
//import com.timelogic.direct.api.infrastructure.*
//import com.timelogic.direct.api.models.*

val apiInstance = TimeApi()
val tz : kotlin.String = America/New_York // kotlin.String | IANA timezone name. On bulk-capable routes, a comma-separated list enables bulk mode.
val ip : kotlin.String = 8.8.8.8 // kotlin.String | IP address. On bulk-capable routes, a comma-separated list enables bulk mode.
val lat : kotlin.Double = 40.7128 // kotlin.Double | Latitude. Must be provided together with `lon`.
val lon : kotlin.Double = -74.006 // kotlin.Double | Longitude. Must be provided together with `lat`.
val offset : kotlin.String = -04:00 // kotlin.String | Fixed UTC offset in `+HH:MM` or `-HH:MM` format. On bulk-capable routes, a comma-separated list enables bulk mode.
val autoTz : kotlin.Boolean = true // kotlin.Boolean | Set to `true` to resolve using the caller IP from Cloudflare headers.
val sign : kotlin.Boolean = true // kotlin.Boolean | Set to exactly `true` to ask the gateway to sign the final JSON response. Every authenticated JSON response, including errors, then includes signing headers. Not supported on `/v1/time/clock`.
try {
    val result : GetTimezone200Response = apiInstance.getTimezone(tz, ip, lat, lon, offset, autoTz, sign)
    println(result)
} catch (e: ClientException) {
    println("4xx response calling TimeApi#getTimezone")
    e.printStackTrace()
} catch (e: ServerException) {
    println("5xx response calling TimeApi#getTimezone")
    e.printStackTrace()
}
```

### Parameters
| **tz** | **kotlin.String**| IANA timezone name. On bulk-capable routes, a comma-separated list enables bulk mode. | [optional] |
| **ip** | **kotlin.String**| IP address. On bulk-capable routes, a comma-separated list enables bulk mode. | [optional] |
| **lat** | **kotlin.Double**| Latitude. Must be provided together with &#x60;lon&#x60;. | [optional] |
| **lon** | **kotlin.Double**| Longitude. Must be provided together with &#x60;lat&#x60;. | [optional] |
| **offset** | **kotlin.String**| Fixed UTC offset in &#x60;+HH:MM&#x60; or &#x60;-HH:MM&#x60; format. On bulk-capable routes, a comma-separated list enables bulk mode. | [optional] |
| **autoTz** | **kotlin.Boolean**| Set to &#x60;true&#x60; to resolve using the caller IP from Cloudflare headers. | [optional] |
| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **sign** | **kotlin.Boolean**| Set to exactly &#x60;true&#x60; to ask the gateway to sign the final JSON response. Every authenticated JSON response, including errors, then includes signing headers. Not supported on &#x60;/v1/time/clock&#x60;. | [optional] |

### Return type

[**GetTimezone200Response**](GetTimezone200Response.md)

### Authorization


Configure apiKeyHeader:
    ApiClient.apiKey["X-API-Key"] = ""
    ApiClient.apiKeyPrefix["X-API-Key"] = ""
Configure bearerAuth:
    ApiClient.accessToken = ""
Configure apiKeyQuery:
    ApiClient.apiKey["api_key"] = ""
    ApiClient.apiKeyPrefix["api_key"] = ""
Configure rapidApiKey:
    ApiClient.apiKey["X-RapidAPI-Key"] = ""
    ApiClient.apiKeyPrefix["X-RapidAPI-Key"] = ""
Configure rapidApiHost:
    ApiClient.apiKey["X-RapidAPI-Host"] = ""
    ApiClient.apiKeyPrefix["X-RapidAPI-Host"] = ""

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

