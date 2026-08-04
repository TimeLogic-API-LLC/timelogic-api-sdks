# TimeLogic.DirectApi.Api.TimeApi

All URIs are relative to *https://api.timelogicapi.com*

| Method | HTTP request | Description |
|--------|--------------|-------------|
| [**AddTime**](TimeApi.md#addtime) | **GET** /v1/time/add | Add modifiers to a timestamp |
| [**ConvertTime**](TimeApi.md#converttime) | **GET** /v1/time/convert | Convert a timestamp into a target timezone or offset |
| [**DiffTime**](TimeApi.md#difftime) | **GET** /v1/time/diff | Difference between two instants |
| [**GetCalendar**](TimeApi.md#getcalendar) | **GET** /v1/time/calendar | Calendar projection for a target instant |
| [**GetClock**](TimeApi.md#getclock) | **GET** /v1/time/clock | Render a live HTML clock |
| [**GetCurrentTime**](TimeApi.md#getcurrenttime) | **GET** /v1/time/current | Get the current time for a target |
| [**GetDst**](TimeApi.md#getdst) | **GET** /v1/time/dst | Daylight-saving status for a target |
| [**GetElapsed**](TimeApi.md#getelapsed) | **GET** /v1/time/elapsed | Time elapsed since or remaining until a reference instant |
| [**GetTimezone**](TimeApi.md#gettimezone) | **GET** /v1/timezone | Resolve timezone information for a target |

<a id="addtime"></a>
# **AddTime**
> TimePayload AddTime (long? unix = null, long? unixMs = null, string? iso = null, string? sourceTz = null, string? sourceIp = null, double? sourceLat = null, double? sourceLon = null, string? sourceOffset = null, int? seconds = null, int? minutes = null, int? hours = null, int? days = null, string? tz = null, string? ip = null, double? lat = null, double? lon = null, string? offset = null, bool? autoTz = null, bool? utc = null, string? format = null, bool? sign = null)

Add modifiers to a timestamp

Adds `seconds`, `minutes`, `hours`, and `days` to an optional base timestamp.  Input timestamp forms: - `unix=1711300000` - `unix_ms=1711300000000` - `iso=2026-04-16T09:00:00Z` - `iso=2026-04-16T09:00:00&source_tz=America/New_York` - `iso=2026-04-16T09:00:00&source_ip=8.8.8.8` - `iso=2026-04-16T09:00:00&source_lat=40.7128&source_lon=-74.0060` - `iso=2026-04-16T09:00:00&source_offset=-05:00` - if no input timestamp is provided, the base timestamp defaults to the request time  Modifiers: - `seconds=30` - `minutes=15` - `hours=2` - `days=7`  Target selector forms: - `tz=America/New_York` - `ip=8.8.8.8` - `lat=40.7128&lon=-74.0060` - `offset=-04:00` - `auto_tz=true` - `utc=true`  Incompatible combinations: - at most one input timestamp form - at most one target selector family - use at most one of `source_tz`, `source_ip`, `source_lat`/`source_lon`, or `source_offset` - local-ISO companion selectors are valid only with `iso=...` that has no explicit offset - bulk is not supported on this route  Examples: - `/v1/time/add?iso=2026-04-16T09:00:00&source_tz=America/New_York&days=1&tz=Europe/London` - `/v1/time/add?minutes=30&utc=true` 

### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using TimeLogic.DirectApi.Api;
using TimeLogic.DirectApi.Client;
using TimeLogic.DirectApi.Model;

namespace Example
{
    public class AddTimeExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "https://api.timelogicapi.com";
            // Configure API key authorization: directApiKeyHeader
            config.AddApiKey("X-API-Key", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("X-API-Key", "Bearer");
            // Configure Bearer token for authorization: directBearerAuth
            config.AccessToken = "YOUR_BEARER_TOKEN";
            // Configure API key authorization: directApiKeyQuery
            config.AddApiKey("api_key", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("api_key", "Bearer");
            // Configure API key authorization: rapidApiKey
            config.AddApiKey("X-RapidAPI-Key", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("X-RapidAPI-Key", "Bearer");
            // Configure API key authorization: rapidApiHost
            config.AddApiKey("X-RapidAPI-Host", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("X-RapidAPI-Host", "Bearer");

            var apiInstance = new TimeApi(config);
            var unix = 1711300000;  // long? |  (optional) 
            var unixMs = 1711300000000;  // long? |  (optional) 
            var iso = 2024-03-24T15:00:00;  // string? | ISO-8601 timestamp. To supply a local wall-clock time without an explicit offset, pair it with one of `source_tz=Area/City`, `source_ip=...`, `source_lat=...&source_lon=...`, or `source_offset=±HH:MM`. (optional) 
            var sourceTz = America/New_York;  // string? | Used only with `iso=...` when the ISO value has no explicit offset. (optional) 
            var sourceIp = 8.8.8.8;  // string? | Used only with `iso=...` when the ISO value has no explicit offset. Resolves that local wall-clock time through the timezone mapped from this IP address. (optional) 
            var sourceLat = 40.7128;  // double? | Used only with `iso=...` when the ISO value has no explicit offset. Provide together with `source_lon` to resolve that local wall-clock time through the timezone mapped from these coordinates. (optional) 
            var sourceLon = -74.006;  // double? | Used only with `iso=...` when the ISO value has no explicit offset. Provide together with `source_lat`. (optional) 
            var sourceOffset = -05:00;  // string? | Used only with `iso=...` when the ISO value has no explicit offset. Interprets that local wall-clock time at this fixed UTC offset. (optional) 
            var seconds = 30;  // int? |  (optional) 
            var minutes = 15;  // int? |  (optional) 
            var hours = 2;  // int? |  (optional) 
            var days = 7;  // int? |  (optional) 
            var tz = America/New_York;  // string? | IANA timezone name. On bulk-capable routes, a comma-separated list enables bulk mode. (optional) 
            var ip = 8.8.8.8;  // string? | IP address. On bulk-capable routes, a comma-separated list enables bulk mode. (optional) 
            var lat = 40.7128;  // double? | Latitude. Must be provided together with `lon`. (optional) 
            var lon = -74.006;  // double? | Longitude. Must be provided together with `lat`. (optional) 
            var offset = -04:00;  // string? | Fixed UTC offset in `+HH:MM` or `-HH:MM` format. On bulk-capable routes, a comma-separated list enables bulk mode. (optional) 
            var autoTz = true;  // bool? | Set to `true` to resolve using the caller IP from Cloudflare headers. (optional) 
            var utc = true;  // bool? | Set to `true` to force UTC on routes that support it. (optional) 
            var format = %Y-%m-%d %H:%M:%S;  // string? | Custom date/time format template using supported `strftime`-style directives such as `%Y-%m-%d %H:%M:%S`. Reference: [strftime](https://strftime.net/). (optional) 
            var sign = true;  // bool? | Set to exactly `true` to ask the gateway to sign the final JSON response. Every authenticated JSON response, including errors, then includes signing headers. Not supported on `/v1/time/clock`. (optional) 

            try
            {
                // Add modifiers to a timestamp
                TimePayload result = apiInstance.AddTime(unix, unixMs, iso, sourceTz, sourceIp, sourceLat, sourceLon, sourceOffset, seconds, minutes, hours, days, tz, ip, lat, lon, offset, autoTz, utc, format, sign);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling TimeApi.AddTime: " + e.Message);
                Debug.Print("Status Code: " + e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

#### Using the AddTimeWithHttpInfo variant
This returns an ApiResponse object which contains the response data, status code and headers.

```csharp
try
{
    // Add modifiers to a timestamp
    ApiResponse<TimePayload> response = apiInstance.AddTimeWithHttpInfo(unix, unixMs, iso, sourceTz, sourceIp, sourceLat, sourceLon, sourceOffset, seconds, minutes, hours, days, tz, ip, lat, lon, offset, autoTz, utc, format, sign);
    Debug.Write("Status Code: " + response.StatusCode);
    Debug.Write("Response Headers: " + response.Headers);
    Debug.Write("Response Body: " + response.Data);
}
catch (ApiException e)
{
    Debug.Print("Exception when calling TimeApi.AddTimeWithHttpInfo: " + e.Message);
    Debug.Print("Status Code: " + e.ErrorCode);
    Debug.Print(e.StackTrace);
}
```

### Parameters

| Name | Type | Description | Notes |
|------|------|-------------|-------|
| **unix** | **long?** |  | [optional]  |
| **unixMs** | **long?** |  | [optional]  |
| **iso** | **string?** | ISO-8601 timestamp. To supply a local wall-clock time without an explicit offset, pair it with one of &#x60;source_tz&#x3D;Area/City&#x60;, &#x60;source_ip&#x3D;...&#x60;, &#x60;source_lat&#x3D;...&amp;source_lon&#x3D;...&#x60;, or &#x60;source_offset&#x3D;±HH:MM&#x60;. | [optional]  |
| **sourceTz** | **string?** | Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. | [optional]  |
| **sourceIp** | **string?** | Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Resolves that local wall-clock time through the timezone mapped from this IP address. | [optional]  |
| **sourceLat** | **double?** | Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Provide together with &#x60;source_lon&#x60; to resolve that local wall-clock time through the timezone mapped from these coordinates. | [optional]  |
| **sourceLon** | **double?** | Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Provide together with &#x60;source_lat&#x60;. | [optional]  |
| **sourceOffset** | **string?** | Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Interprets that local wall-clock time at this fixed UTC offset. | [optional]  |
| **seconds** | **int?** |  | [optional]  |
| **minutes** | **int?** |  | [optional]  |
| **hours** | **int?** |  | [optional]  |
| **days** | **int?** |  | [optional]  |
| **tz** | **string?** | IANA timezone name. On bulk-capable routes, a comma-separated list enables bulk mode. | [optional]  |
| **ip** | **string?** | IP address. On bulk-capable routes, a comma-separated list enables bulk mode. | [optional]  |
| **lat** | **double?** | Latitude. Must be provided together with &#x60;lon&#x60;. | [optional]  |
| **lon** | **double?** | Longitude. Must be provided together with &#x60;lat&#x60;. | [optional]  |
| **offset** | **string?** | Fixed UTC offset in &#x60;+HH:MM&#x60; or &#x60;-HH:MM&#x60; format. On bulk-capable routes, a comma-separated list enables bulk mode. | [optional]  |
| **autoTz** | **bool?** | Set to &#x60;true&#x60; to resolve using the caller IP from Cloudflare headers. | [optional]  |
| **utc** | **bool?** | Set to &#x60;true&#x60; to force UTC on routes that support it. | [optional]  |
| **format** | **string?** | Custom date/time format template using supported &#x60;strftime&#x60;-style directives such as &#x60;%Y-%m-%d %H:%M:%S&#x60;. Reference: [strftime](https://strftime.net/). | [optional]  |
| **sign** | **bool?** | Set to exactly &#x60;true&#x60; to ask the gateway to sign the final JSON response. Every authenticated JSON response, including errors, then includes signing headers. Not supported on &#x60;/v1/time/clock&#x60;. | [optional]  |

### Return type

[**TimePayload**](TimePayload.md)

### Authorization

[directApiKeyHeader](../README.md#directApiKeyHeader), [directBearerAuth](../README.md#directBearerAuth), [directApiKeyQuery](../README.md#directApiKeyQuery), [rapidApiKey](../README.md#rapidApiKey), [rapidApiHost](../README.md#rapidApiHost)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Adjusted timestamp payload. |  * X-Request-Id -  <br>  * X-TimeLogic-Signature -  <br>  * X-TimeLogic-Key-Id -  <br>  * X-TimeLogic-Signature-Alg -  <br>  * X-TimeLogic-Signature-Timestamp -  <br>  * X-TimeLogic-Content-SHA256 -  <br>  * X-TimeLogic-Signature-Input -  <br>  |
| **400** | Invalid or ambiguous request parameters. |  * X-Request-Id -  <br>  |
| **401** | Missing or invalid authentication. |  -  |
| **403** | The key or customer subscription is not active. |  * X-Request-Id -  <br>  |
| **429** | The cached monthly quota state is exceeded. |  * X-Request-Id -  <br>  * X-TimeLogic-Quota-State -  <br>  |
| **405** | Only &#x60;GET&#x60; is supported. |  * X-Request-Id -  <br>  |
| **500** | Internal server error, including signing failures. |  * X-Request-Id -  <br>  |
| **501** | A required resolver or dependency is not configured or not ready. |  * X-Request-Id -  <br>  |
| **502** | Gateway failed to forward the request to the core worker. |  * X-Request-Id -  <br>  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

<a id="converttime"></a>
# **ConvertTime**
> GetCurrentTime200Response ConvertTime (long? unix = null, long? unixMs = null, string? iso = null, string? sourceTz = null, string? sourceIp = null, double? sourceLat = null, double? sourceLon = null, string? sourceOffset = null, string? tz = null, string? ip = null, double? lat = null, double? lon = null, string? offset = null, bool? autoTz = null, bool? utc = null, string? format = null, bool? sign = null)

Convert a timestamp into a target timezone or offset

Converts one required input timestamp into a single target or a bulk array.  Input timestamp forms: - `unix=1711300000` - `unix_ms=1711300000000` - `iso=2026-04-16T09:00:00Z` - `iso=2026-04-16T09:00:00&source_tz=America/New_York` - `iso=2026-04-16T09:00:00&source_ip=8.8.8.8` - `iso=2026-04-16T09:00:00&source_lat=40.7128&source_lon=-74.0060` - `iso=2026-04-16T09:00:00&source_offset=-05:00`  Target selector forms: - `tz=America/New_York` - `ip=8.8.8.8` - `lat=40.7128&lon=-74.0060` - `offset=-04:00` - `auto_tz=true` - `utc=true`  Incompatible combinations: - exactly one input timestamp form - exactly one target selector family - use at most one of `source_tz`, `source_ip`, `source_lat`/`source_lon`, or `source_offset` - local-ISO companion selectors are valid only with `iso=...` that has no explicit offset - bulk is allowed only through one comma-separated `tz`, `ip`, or `offset` selector  Examples: - Single target: `/v1/time/convert?iso=2026-04-16T09:00:00&source_tz=America/New_York&tz=Europe/London` - Bulk target set: `/v1/time/convert?unix=1711300000&offset=-04:00,+00:00,+09:00` 

### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using TimeLogic.DirectApi.Api;
using TimeLogic.DirectApi.Client;
using TimeLogic.DirectApi.Model;

namespace Example
{
    public class ConvertTimeExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "https://api.timelogicapi.com";
            // Configure API key authorization: directApiKeyHeader
            config.AddApiKey("X-API-Key", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("X-API-Key", "Bearer");
            // Configure Bearer token for authorization: directBearerAuth
            config.AccessToken = "YOUR_BEARER_TOKEN";
            // Configure API key authorization: directApiKeyQuery
            config.AddApiKey("api_key", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("api_key", "Bearer");
            // Configure API key authorization: rapidApiKey
            config.AddApiKey("X-RapidAPI-Key", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("X-RapidAPI-Key", "Bearer");
            // Configure API key authorization: rapidApiHost
            config.AddApiKey("X-RapidAPI-Host", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("X-RapidAPI-Host", "Bearer");

            var apiInstance = new TimeApi(config);
            var unix = 1711300000;  // long? |  (optional) 
            var unixMs = 1711300000000;  // long? |  (optional) 
            var iso = 2024-03-24T15:00:00;  // string? | ISO-8601 timestamp. To supply a local wall-clock time without an explicit offset, pair it with one of `source_tz=Area/City`, `source_ip=...`, `source_lat=...&source_lon=...`, or `source_offset=±HH:MM`. (optional) 
            var sourceTz = America/New_York;  // string? | Used only with `iso=...` when the ISO value has no explicit offset. (optional) 
            var sourceIp = 8.8.8.8;  // string? | Used only with `iso=...` when the ISO value has no explicit offset. Resolves that local wall-clock time through the timezone mapped from this IP address. (optional) 
            var sourceLat = 40.7128;  // double? | Used only with `iso=...` when the ISO value has no explicit offset. Provide together with `source_lon` to resolve that local wall-clock time through the timezone mapped from these coordinates. (optional) 
            var sourceLon = -74.006;  // double? | Used only with `iso=...` when the ISO value has no explicit offset. Provide together with `source_lat`. (optional) 
            var sourceOffset = -05:00;  // string? | Used only with `iso=...` when the ISO value has no explicit offset. Interprets that local wall-clock time at this fixed UTC offset. (optional) 
            var tz = America/New_York;  // string? | IANA timezone name. On bulk-capable routes, a comma-separated list enables bulk mode. (optional) 
            var ip = 8.8.8.8;  // string? | IP address. On bulk-capable routes, a comma-separated list enables bulk mode. (optional) 
            var lat = 40.7128;  // double? | Latitude. Must be provided together with `lon`. (optional) 
            var lon = -74.006;  // double? | Longitude. Must be provided together with `lat`. (optional) 
            var offset = -04:00;  // string? | Fixed UTC offset in `+HH:MM` or `-HH:MM` format. On bulk-capable routes, a comma-separated list enables bulk mode. (optional) 
            var autoTz = true;  // bool? | Set to `true` to resolve using the caller IP from Cloudflare headers. (optional) 
            var utc = true;  // bool? | Set to `true` to force UTC on routes that support it. (optional) 
            var format = %Y-%m-%d %H:%M:%S;  // string? | Custom date/time format template using supported `strftime`-style directives such as `%Y-%m-%d %H:%M:%S`. Reference: [strftime](https://strftime.net/). (optional) 
            var sign = true;  // bool? | Set to exactly `true` to ask the gateway to sign the final JSON response. Every authenticated JSON response, including errors, then includes signing headers. Not supported on `/v1/time/clock`. (optional) 

            try
            {
                // Convert a timestamp into a target timezone or offset
                GetCurrentTime200Response result = apiInstance.ConvertTime(unix, unixMs, iso, sourceTz, sourceIp, sourceLat, sourceLon, sourceOffset, tz, ip, lat, lon, offset, autoTz, utc, format, sign);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling TimeApi.ConvertTime: " + e.Message);
                Debug.Print("Status Code: " + e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

#### Using the ConvertTimeWithHttpInfo variant
This returns an ApiResponse object which contains the response data, status code and headers.

```csharp
try
{
    // Convert a timestamp into a target timezone or offset
    ApiResponse<GetCurrentTime200Response> response = apiInstance.ConvertTimeWithHttpInfo(unix, unixMs, iso, sourceTz, sourceIp, sourceLat, sourceLon, sourceOffset, tz, ip, lat, lon, offset, autoTz, utc, format, sign);
    Debug.Write("Status Code: " + response.StatusCode);
    Debug.Write("Response Headers: " + response.Headers);
    Debug.Write("Response Body: " + response.Data);
}
catch (ApiException e)
{
    Debug.Print("Exception when calling TimeApi.ConvertTimeWithHttpInfo: " + e.Message);
    Debug.Print("Status Code: " + e.ErrorCode);
    Debug.Print(e.StackTrace);
}
```

### Parameters

| Name | Type | Description | Notes |
|------|------|-------------|-------|
| **unix** | **long?** |  | [optional]  |
| **unixMs** | **long?** |  | [optional]  |
| **iso** | **string?** | ISO-8601 timestamp. To supply a local wall-clock time without an explicit offset, pair it with one of &#x60;source_tz&#x3D;Area/City&#x60;, &#x60;source_ip&#x3D;...&#x60;, &#x60;source_lat&#x3D;...&amp;source_lon&#x3D;...&#x60;, or &#x60;source_offset&#x3D;±HH:MM&#x60;. | [optional]  |
| **sourceTz** | **string?** | Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. | [optional]  |
| **sourceIp** | **string?** | Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Resolves that local wall-clock time through the timezone mapped from this IP address. | [optional]  |
| **sourceLat** | **double?** | Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Provide together with &#x60;source_lon&#x60; to resolve that local wall-clock time through the timezone mapped from these coordinates. | [optional]  |
| **sourceLon** | **double?** | Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Provide together with &#x60;source_lat&#x60;. | [optional]  |
| **sourceOffset** | **string?** | Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Interprets that local wall-clock time at this fixed UTC offset. | [optional]  |
| **tz** | **string?** | IANA timezone name. On bulk-capable routes, a comma-separated list enables bulk mode. | [optional]  |
| **ip** | **string?** | IP address. On bulk-capable routes, a comma-separated list enables bulk mode. | [optional]  |
| **lat** | **double?** | Latitude. Must be provided together with &#x60;lon&#x60;. | [optional]  |
| **lon** | **double?** | Longitude. Must be provided together with &#x60;lat&#x60;. | [optional]  |
| **offset** | **string?** | Fixed UTC offset in &#x60;+HH:MM&#x60; or &#x60;-HH:MM&#x60; format. On bulk-capable routes, a comma-separated list enables bulk mode. | [optional]  |
| **autoTz** | **bool?** | Set to &#x60;true&#x60; to resolve using the caller IP from Cloudflare headers. | [optional]  |
| **utc** | **bool?** | Set to &#x60;true&#x60; to force UTC on routes that support it. | [optional]  |
| **format** | **string?** | Custom date/time format template using supported &#x60;strftime&#x60;-style directives such as &#x60;%Y-%m-%d %H:%M:%S&#x60;. Reference: [strftime](https://strftime.net/). | [optional]  |
| **sign** | **bool?** | Set to exactly &#x60;true&#x60; to ask the gateway to sign the final JSON response. Every authenticated JSON response, including errors, then includes signing headers. Not supported on &#x60;/v1/time/clock&#x60;. | [optional]  |

### Return type

[**GetCurrentTime200Response**](GetCurrentTime200Response.md)

### Authorization

[directApiKeyHeader](../README.md#directApiKeyHeader), [directBearerAuth](../README.md#directBearerAuth), [directApiKeyQuery](../README.md#directApiKeyQuery), [rapidApiKey](../README.md#rapidApiKey), [rapidApiHost](../README.md#rapidApiHost)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Converted time payload or bulk array. |  * X-Request-Id -  <br>  * X-TimeLogic-Signature -  <br>  * X-TimeLogic-Key-Id -  <br>  * X-TimeLogic-Signature-Alg -  <br>  * X-TimeLogic-Signature-Timestamp -  <br>  * X-TimeLogic-Content-SHA256 -  <br>  * X-TimeLogic-Signature-Input -  <br>  |
| **400** | Invalid or ambiguous request parameters. |  * X-Request-Id -  <br>  |
| **401** | Missing or invalid authentication. |  -  |
| **403** | The key or customer subscription is not active. |  * X-Request-Id -  <br>  |
| **429** | The cached monthly quota state is exceeded. |  * X-Request-Id -  <br>  * X-TimeLogic-Quota-State -  <br>  |
| **405** | Only &#x60;GET&#x60; is supported. |  * X-Request-Id -  <br>  |
| **500** | Internal server error, including signing failures. |  * X-Request-Id -  <br>  |
| **501** | A required resolver or dependency is not configured or not ready. |  * X-Request-Id -  <br>  |
| **502** | Gateway failed to forward the request to the core worker. |  * X-Request-Id -  <br>  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

<a id="difftime"></a>
# **DiffTime**
> DiffResponse DiffTime (string from, string to, string? fromTz = null, string? fromIp = null, double? fromLat = null, double? fromLon = null, string? fromOffset = null, string? toTz = null, string? toIp = null, double? toLat = null, double? toLon = null, string? toOffset = null, string? format = null, bool? businessDays = null, string? holidayCountry = null, string? holidaySubdivision = null, bool? sign = null)

Difference between two instants

Computes the duration between `from` and `to`.  Required query fields: `from` and `to` only. Do not send every optional companion field. For each side, choose one supported specifier form. A `from_*` or `to_*` companion is allowed only when that side uses `iso=...` with no explicit offset; use at most one companion selector, except that coordinate input requires its paired latitude and longitude.  `from` and `to` are embedded specifier strings.  Accepted specifier forms: - `from=now` - `from=unix=1711300000` - `from=unix_ms=1711300000000` - `from=iso=2026-04-16T09:00:00` - `from=tz=America/New_York` - `from=ip=8.8.8.8` - `from=offset=-05:00` - the same forms are accepted for `to`  Timezone hint pairings: - `from_tz` only with `from=iso=...` that has no explicit offset - `from_ip`, `from_lat`/`from_lon`, and `from_offset` only with `from=iso=...` that has no explicit offset - `to_tz` only with `to=iso=...` that has no explicit offset - `to_ip`, `to_lat`/`to_lon`, and `to_offset` only with `to=iso=...` that has no explicit offset  Selector semantics: - `tz=...`, `ip=...`, and `offset=...` inside `from` or `to` mean the current request-time instant resolved through that selector - those selector forms do not represent an arbitrary local wall-clock time - returned duration magnitudes are absolute; use `direction` to see whether `to` is after, before, or the same instant as `from`  Business-day rules: - `holiday_country` and `holiday_subdivision` require `business_days=true` - `holiday_subdivision` also requires `holiday_country`  Examples: - Selector-current instant: `/v1/time/diff?from=unix=1711300000&to=tz=America/New_York` - Wall-clock pairing: `/v1/time/diff?from=iso=2026-04-16T09:00:00&from_tz=America/New_York&to=iso=2026-04-16T09:00:00&to_tz=Europe/London` - Wall-clock via selector: `/v1/time/diff?from=iso=2026-01-01T12:00:00&from_ip=8.8.8.8&to=iso=2026-01-01T12:00:00&to_offset=-05:00` 

### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using TimeLogic.DirectApi.Api;
using TimeLogic.DirectApi.Client;
using TimeLogic.DirectApi.Model;

namespace Example
{
    public class DiffTimeExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "https://api.timelogicapi.com";
            // Configure API key authorization: directApiKeyHeader
            config.AddApiKey("X-API-Key", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("X-API-Key", "Bearer");
            // Configure Bearer token for authorization: directBearerAuth
            config.AccessToken = "YOUR_BEARER_TOKEN";
            // Configure API key authorization: directApiKeyQuery
            config.AddApiKey("api_key", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("api_key", "Bearer");
            // Configure API key authorization: rapidApiKey
            config.AddApiKey("X-RapidAPI-Key", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("X-RapidAPI-Key", "Bearer");
            // Configure API key authorization: rapidApiHost
            config.AddApiKey("X-RapidAPI-Host", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("X-RapidAPI-Host", "Bearer");

            var apiInstance = new TimeApi(config);
            var from = "from_example";  // string | Time specifier. Supported forms are `now`, `unix=<seconds>`, `unix_ms=<milliseconds>`, `iso=<ISO-8601>`, `offset=±HH:MM`, `tz=<IANA timezone>`, and `ip=<IP address>`. For `tz=...`, `ip=...`, and `offset=...`, the specifier means the current request-time instant resolved through that selector. To express a local wall-clock time, use `from=iso=...` together with one of `from_tz`, `from_ip`, `from_lat`+`from_lon`, or `from_offset`.
            var to = "to_example";  // string | Time specifier. Supported forms are `now`, `unix=<seconds>`, `unix_ms=<milliseconds>`, `iso=<ISO-8601>`, `offset=±HH:MM`, `tz=<IANA timezone>`, and `ip=<IP address>`. For `tz=...`, `ip=...`, and `offset=...`, the specifier means the current request-time instant resolved through that selector. To express a local wall-clock time, use `to=iso=...` together with one of `to_tz`, `to_ip`, `to_lat`+`to_lon`, or `to_offset`.
            var fromTz = "fromTz_example";  // string? | Used only with `from=iso=...` when the ISO value has no explicit offset. (optional) 
            var fromIp = 8.8.8.8;  // string? | Used only with `from=iso=...` when the ISO value has no explicit offset. Resolves that local wall-clock time through the timezone mapped from this IP address. (optional) 
            var fromLat = 40.7128;  // double? | Used only with `from=iso=...` when the ISO value has no explicit offset. Provide together with `from_lon` to resolve that local wall-clock time through the timezone mapped from these coordinates. (optional) 
            var fromLon = -74.006;  // double? | Used only with `from=iso=...` when the ISO value has no explicit offset. Provide together with `from_lat`. (optional) 
            var fromOffset = -05:00;  // string? | Used only with `from=iso=...` when the ISO value has no explicit offset. Interprets that local wall-clock time at this fixed UTC offset. (optional) 
            var toTz = "toTz_example";  // string? | Used only with `to=iso=...` when the ISO value has no explicit offset. (optional) 
            var toIp = 8.8.8.8;  // string? | Used only with `to=iso=...` when the ISO value has no explicit offset. Resolves that local wall-clock time through the timezone mapped from this IP address. (optional) 
            var toLat = 40.7128;  // double? | Used only with `to=iso=...` when the ISO value has no explicit offset. Provide together with `to_lon` to resolve that local wall-clock time through the timezone mapped from these coordinates. (optional) 
            var toLon = -74.006;  // double? | Used only with `to=iso=...` when the ISO value has no explicit offset. Provide together with `to_lat`. (optional) 
            var toOffset = -05:00;  // string? | Used only with `to=iso=...` when the ISO value has no explicit offset. Interprets that local wall-clock time at this fixed UTC offset. (optional) 
            var format = %daysd %hoursh %minutesm %secondss;  // string? | Custom duration format template using `%days`, `%hours`, `%minutes`, and `%seconds`. (optional) 
            var businessDays = true;  // bool? | Set to `true` to enable weekday/business-day counting. (optional) 
            var holidayCountry = US;  // string? | ISO 3166-1 alpha-2 holiday calendar country code. Requires `business_days=true`. (optional) 
            var holidaySubdivision = CA;  // string? | Holiday calendar subdivision code from the upstream `python-holidays` calendar, for example `CA` or `ENG`. Requires `holiday_country` and `business_days=true`. (optional) 
            var sign = true;  // bool? | Set to exactly `true` to ask the gateway to sign the final JSON response. Every authenticated JSON response, including errors, then includes signing headers. Not supported on `/v1/time/clock`. (optional) 

            try
            {
                // Difference between two instants
                DiffResponse result = apiInstance.DiffTime(from, to, fromTz, fromIp, fromLat, fromLon, fromOffset, toTz, toIp, toLat, toLon, toOffset, format, businessDays, holidayCountry, holidaySubdivision, sign);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling TimeApi.DiffTime: " + e.Message);
                Debug.Print("Status Code: " + e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

#### Using the DiffTimeWithHttpInfo variant
This returns an ApiResponse object which contains the response data, status code and headers.

```csharp
try
{
    // Difference between two instants
    ApiResponse<DiffResponse> response = apiInstance.DiffTimeWithHttpInfo(from, to, fromTz, fromIp, fromLat, fromLon, fromOffset, toTz, toIp, toLat, toLon, toOffset, format, businessDays, holidayCountry, holidaySubdivision, sign);
    Debug.Write("Status Code: " + response.StatusCode);
    Debug.Write("Response Headers: " + response.Headers);
    Debug.Write("Response Body: " + response.Data);
}
catch (ApiException e)
{
    Debug.Print("Exception when calling TimeApi.DiffTimeWithHttpInfo: " + e.Message);
    Debug.Print("Status Code: " + e.ErrorCode);
    Debug.Print(e.StackTrace);
}
```

### Parameters

| Name | Type | Description | Notes |
|------|------|-------------|-------|
| **from** | **string** | Time specifier. Supported forms are &#x60;now&#x60;, &#x60;unix&#x3D;&lt;seconds&gt;&#x60;, &#x60;unix_ms&#x3D;&lt;milliseconds&gt;&#x60;, &#x60;iso&#x3D;&lt;ISO-8601&gt;&#x60;, &#x60;offset&#x3D;±HH:MM&#x60;, &#x60;tz&#x3D;&lt;IANA timezone&gt;&#x60;, and &#x60;ip&#x3D;&lt;IP address&gt;&#x60;. For &#x60;tz&#x3D;...&#x60;, &#x60;ip&#x3D;...&#x60;, and &#x60;offset&#x3D;...&#x60;, the specifier means the current request-time instant resolved through that selector. To express a local wall-clock time, use &#x60;from&#x3D;iso&#x3D;...&#x60; together with one of &#x60;from_tz&#x60;, &#x60;from_ip&#x60;, &#x60;from_lat&#x60;+&#x60;from_lon&#x60;, or &#x60;from_offset&#x60;. |  |
| **to** | **string** | Time specifier. Supported forms are &#x60;now&#x60;, &#x60;unix&#x3D;&lt;seconds&gt;&#x60;, &#x60;unix_ms&#x3D;&lt;milliseconds&gt;&#x60;, &#x60;iso&#x3D;&lt;ISO-8601&gt;&#x60;, &#x60;offset&#x3D;±HH:MM&#x60;, &#x60;tz&#x3D;&lt;IANA timezone&gt;&#x60;, and &#x60;ip&#x3D;&lt;IP address&gt;&#x60;. For &#x60;tz&#x3D;...&#x60;, &#x60;ip&#x3D;...&#x60;, and &#x60;offset&#x3D;...&#x60;, the specifier means the current request-time instant resolved through that selector. To express a local wall-clock time, use &#x60;to&#x3D;iso&#x3D;...&#x60; together with one of &#x60;to_tz&#x60;, &#x60;to_ip&#x60;, &#x60;to_lat&#x60;+&#x60;to_lon&#x60;, or &#x60;to_offset&#x60;. |  |
| **fromTz** | **string?** | Used only with &#x60;from&#x3D;iso&#x3D;...&#x60; when the ISO value has no explicit offset. | [optional]  |
| **fromIp** | **string?** | Used only with &#x60;from&#x3D;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Resolves that local wall-clock time through the timezone mapped from this IP address. | [optional]  |
| **fromLat** | **double?** | Used only with &#x60;from&#x3D;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Provide together with &#x60;from_lon&#x60; to resolve that local wall-clock time through the timezone mapped from these coordinates. | [optional]  |
| **fromLon** | **double?** | Used only with &#x60;from&#x3D;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Provide together with &#x60;from_lat&#x60;. | [optional]  |
| **fromOffset** | **string?** | Used only with &#x60;from&#x3D;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Interprets that local wall-clock time at this fixed UTC offset. | [optional]  |
| **toTz** | **string?** | Used only with &#x60;to&#x3D;iso&#x3D;...&#x60; when the ISO value has no explicit offset. | [optional]  |
| **toIp** | **string?** | Used only with &#x60;to&#x3D;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Resolves that local wall-clock time through the timezone mapped from this IP address. | [optional]  |
| **toLat** | **double?** | Used only with &#x60;to&#x3D;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Provide together with &#x60;to_lon&#x60; to resolve that local wall-clock time through the timezone mapped from these coordinates. | [optional]  |
| **toLon** | **double?** | Used only with &#x60;to&#x3D;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Provide together with &#x60;to_lat&#x60;. | [optional]  |
| **toOffset** | **string?** | Used only with &#x60;to&#x3D;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Interprets that local wall-clock time at this fixed UTC offset. | [optional]  |
| **format** | **string?** | Custom duration format template using &#x60;%days&#x60;, &#x60;%hours&#x60;, &#x60;%minutes&#x60;, and &#x60;%seconds&#x60;. | [optional]  |
| **businessDays** | **bool?** | Set to &#x60;true&#x60; to enable weekday/business-day counting. | [optional]  |
| **holidayCountry** | **string?** | ISO 3166-1 alpha-2 holiday calendar country code. Requires &#x60;business_days&#x3D;true&#x60;. | [optional]  |
| **holidaySubdivision** | **string?** | Holiday calendar subdivision code from the upstream &#x60;python-holidays&#x60; calendar, for example &#x60;CA&#x60; or &#x60;ENG&#x60;. Requires &#x60;holiday_country&#x60; and &#x60;business_days&#x3D;true&#x60;. | [optional]  |
| **sign** | **bool?** | Set to exactly &#x60;true&#x60; to ask the gateway to sign the final JSON response. Every authenticated JSON response, including errors, then includes signing headers. Not supported on &#x60;/v1/time/clock&#x60;. | [optional]  |

### Return type

[**DiffResponse**](DiffResponse.md)

### Authorization

[directApiKeyHeader](../README.md#directApiKeyHeader), [directBearerAuth](../README.md#directBearerAuth), [directApiKeyQuery](../README.md#directApiKeyQuery), [rapidApiKey](../README.md#rapidApiKey), [rapidApiHost](../README.md#rapidApiHost)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Duration result. |  * X-Request-Id -  <br>  * X-TimeLogic-Signature -  <br>  * X-TimeLogic-Key-Id -  <br>  * X-TimeLogic-Signature-Alg -  <br>  * X-TimeLogic-Signature-Timestamp -  <br>  * X-TimeLogic-Content-SHA256 -  <br>  * X-TimeLogic-Signature-Input -  <br>  |
| **400** | Invalid or ambiguous request parameters. |  * X-Request-Id -  <br>  |
| **401** | Missing or invalid authentication. |  -  |
| **403** | The key or customer subscription is not active. |  * X-Request-Id -  <br>  |
| **429** | The cached monthly quota state is exceeded. |  * X-Request-Id -  <br>  * X-TimeLogic-Quota-State -  <br>  |
| **405** | Only &#x60;GET&#x60; is supported. |  * X-Request-Id -  <br>  |
| **500** | Internal server error, including signing failures. |  * X-Request-Id -  <br>  |
| **501** | A required resolver or dependency is not configured or not ready. |  * X-Request-Id -  <br>  |
| **502** | Gateway failed to forward the request to the core worker. |  * X-Request-Id -  <br>  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

<a id="getcalendar"></a>
# **GetCalendar**
> CalendarResponse GetCalendar (long? unix = null, long? unixMs = null, string? iso = null, string? sourceTz = null, string? sourceIp = null, double? sourceLat = null, double? sourceLon = null, string? sourceOffset = null, string? tz = null, string? ip = null, double? lat = null, double? lon = null, string? offset = null, bool? autoTz = null, string? format = null, bool? week = null, bool? sign = null)

Calendar projection for a target instant

Returns calendar fields for an optional timestamp and target.  Input timestamp forms: - `unix=1711300000` - `unix_ms=1711300000000` - `iso=2026-04-16T09:00:00Z` - `iso=2026-04-16T09:00:00&source_tz=America/New_York` - `iso=2026-04-16T09:00:00&source_ip=8.8.8.8` - `iso=2026-04-16T09:00:00&source_lat=40.7128&source_lon=-74.0060` - `iso=2026-04-16T09:00:00&source_offset=-05:00` - if no input timestamp is provided, the request time is used  Target selector forms: - `tz=America/New_York` - `ip=8.8.8.8` - `lat=40.7128&lon=-74.0060` - `offset=-04:00` - `auto_tz=true`  Additional flags: - `week=true` adds `week_number`  Incompatible combinations: - at most one input timestamp form - at most one target selector family - use at most one of `source_tz`, `source_ip`, `source_lat`/`source_lon`, or `source_offset` - local-ISO companion selectors are valid only with `iso=...` that has no explicit offset - bulk is not supported on this route  Examples: - `/v1/time/calendar?iso=2026-04-16T09:00:00&source_tz=America/New_York&tz=Europe/London&week=true` - `/v1/time/calendar?unix=1711300000&auto_tz=true` 

### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using TimeLogic.DirectApi.Api;
using TimeLogic.DirectApi.Client;
using TimeLogic.DirectApi.Model;

namespace Example
{
    public class GetCalendarExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "https://api.timelogicapi.com";
            // Configure API key authorization: directApiKeyHeader
            config.AddApiKey("X-API-Key", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("X-API-Key", "Bearer");
            // Configure Bearer token for authorization: directBearerAuth
            config.AccessToken = "YOUR_BEARER_TOKEN";
            // Configure API key authorization: directApiKeyQuery
            config.AddApiKey("api_key", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("api_key", "Bearer");
            // Configure API key authorization: rapidApiKey
            config.AddApiKey("X-RapidAPI-Key", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("X-RapidAPI-Key", "Bearer");
            // Configure API key authorization: rapidApiHost
            config.AddApiKey("X-RapidAPI-Host", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("X-RapidAPI-Host", "Bearer");

            var apiInstance = new TimeApi(config);
            var unix = 1711300000;  // long? |  (optional) 
            var unixMs = 1711300000000;  // long? |  (optional) 
            var iso = 2024-03-24T15:00:00;  // string? | ISO-8601 timestamp. To supply a local wall-clock time without an explicit offset, pair it with one of `source_tz=Area/City`, `source_ip=...`, `source_lat=...&source_lon=...`, or `source_offset=±HH:MM`. (optional) 
            var sourceTz = America/New_York;  // string? | Used only with `iso=...` when the ISO value has no explicit offset. (optional) 
            var sourceIp = 8.8.8.8;  // string? | Used only with `iso=...` when the ISO value has no explicit offset. Resolves that local wall-clock time through the timezone mapped from this IP address. (optional) 
            var sourceLat = 40.7128;  // double? | Used only with `iso=...` when the ISO value has no explicit offset. Provide together with `source_lon` to resolve that local wall-clock time through the timezone mapped from these coordinates. (optional) 
            var sourceLon = -74.006;  // double? | Used only with `iso=...` when the ISO value has no explicit offset. Provide together with `source_lat`. (optional) 
            var sourceOffset = -05:00;  // string? | Used only with `iso=...` when the ISO value has no explicit offset. Interprets that local wall-clock time at this fixed UTC offset. (optional) 
            var tz = America/New_York;  // string? | IANA timezone name. On bulk-capable routes, a comma-separated list enables bulk mode. (optional) 
            var ip = 8.8.8.8;  // string? | IP address. On bulk-capable routes, a comma-separated list enables bulk mode. (optional) 
            var lat = 40.7128;  // double? | Latitude. Must be provided together with `lon`. (optional) 
            var lon = -74.006;  // double? | Longitude. Must be provided together with `lat`. (optional) 
            var offset = -04:00;  // string? | Fixed UTC offset in `+HH:MM` or `-HH:MM` format. On bulk-capable routes, a comma-separated list enables bulk mode. (optional) 
            var autoTz = true;  // bool? | Set to `true` to resolve using the caller IP from Cloudflare headers. (optional) 
            var format = %Y-%m-%d %H:%M:%S;  // string? | Custom date/time format template using supported `strftime`-style directives such as `%Y-%m-%d %H:%M:%S`. Reference: [strftime](https://strftime.net/). (optional) 
            var week = true;  // bool? |  (optional) 
            var sign = true;  // bool? | Set to exactly `true` to ask the gateway to sign the final JSON response. Every authenticated JSON response, including errors, then includes signing headers. Not supported on `/v1/time/clock`. (optional) 

            try
            {
                // Calendar projection for a target instant
                CalendarResponse result = apiInstance.GetCalendar(unix, unixMs, iso, sourceTz, sourceIp, sourceLat, sourceLon, sourceOffset, tz, ip, lat, lon, offset, autoTz, format, week, sign);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling TimeApi.GetCalendar: " + e.Message);
                Debug.Print("Status Code: " + e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

#### Using the GetCalendarWithHttpInfo variant
This returns an ApiResponse object which contains the response data, status code and headers.

```csharp
try
{
    // Calendar projection for a target instant
    ApiResponse<CalendarResponse> response = apiInstance.GetCalendarWithHttpInfo(unix, unixMs, iso, sourceTz, sourceIp, sourceLat, sourceLon, sourceOffset, tz, ip, lat, lon, offset, autoTz, format, week, sign);
    Debug.Write("Status Code: " + response.StatusCode);
    Debug.Write("Response Headers: " + response.Headers);
    Debug.Write("Response Body: " + response.Data);
}
catch (ApiException e)
{
    Debug.Print("Exception when calling TimeApi.GetCalendarWithHttpInfo: " + e.Message);
    Debug.Print("Status Code: " + e.ErrorCode);
    Debug.Print(e.StackTrace);
}
```

### Parameters

| Name | Type | Description | Notes |
|------|------|-------------|-------|
| **unix** | **long?** |  | [optional]  |
| **unixMs** | **long?** |  | [optional]  |
| **iso** | **string?** | ISO-8601 timestamp. To supply a local wall-clock time without an explicit offset, pair it with one of &#x60;source_tz&#x3D;Area/City&#x60;, &#x60;source_ip&#x3D;...&#x60;, &#x60;source_lat&#x3D;...&amp;source_lon&#x3D;...&#x60;, or &#x60;source_offset&#x3D;±HH:MM&#x60;. | [optional]  |
| **sourceTz** | **string?** | Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. | [optional]  |
| **sourceIp** | **string?** | Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Resolves that local wall-clock time through the timezone mapped from this IP address. | [optional]  |
| **sourceLat** | **double?** | Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Provide together with &#x60;source_lon&#x60; to resolve that local wall-clock time through the timezone mapped from these coordinates. | [optional]  |
| **sourceLon** | **double?** | Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Provide together with &#x60;source_lat&#x60;. | [optional]  |
| **sourceOffset** | **string?** | Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Interprets that local wall-clock time at this fixed UTC offset. | [optional]  |
| **tz** | **string?** | IANA timezone name. On bulk-capable routes, a comma-separated list enables bulk mode. | [optional]  |
| **ip** | **string?** | IP address. On bulk-capable routes, a comma-separated list enables bulk mode. | [optional]  |
| **lat** | **double?** | Latitude. Must be provided together with &#x60;lon&#x60;. | [optional]  |
| **lon** | **double?** | Longitude. Must be provided together with &#x60;lat&#x60;. | [optional]  |
| **offset** | **string?** | Fixed UTC offset in &#x60;+HH:MM&#x60; or &#x60;-HH:MM&#x60; format. On bulk-capable routes, a comma-separated list enables bulk mode. | [optional]  |
| **autoTz** | **bool?** | Set to &#x60;true&#x60; to resolve using the caller IP from Cloudflare headers. | [optional]  |
| **format** | **string?** | Custom date/time format template using supported &#x60;strftime&#x60;-style directives such as &#x60;%Y-%m-%d %H:%M:%S&#x60;. Reference: [strftime](https://strftime.net/). | [optional]  |
| **week** | **bool?** |  | [optional]  |
| **sign** | **bool?** | Set to exactly &#x60;true&#x60; to ask the gateway to sign the final JSON response. Every authenticated JSON response, including errors, then includes signing headers. Not supported on &#x60;/v1/time/clock&#x60;. | [optional]  |

### Return type

[**CalendarResponse**](CalendarResponse.md)

### Authorization

[directApiKeyHeader](../README.md#directApiKeyHeader), [directBearerAuth](../README.md#directBearerAuth), [directApiKeyQuery](../README.md#directApiKeyQuery), [rapidApiKey](../README.md#rapidApiKey), [rapidApiHost](../README.md#rapidApiHost)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Calendar payload. |  * X-Request-Id -  <br>  * X-TimeLogic-Signature -  <br>  * X-TimeLogic-Key-Id -  <br>  * X-TimeLogic-Signature-Alg -  <br>  * X-TimeLogic-Signature-Timestamp -  <br>  * X-TimeLogic-Content-SHA256 -  <br>  * X-TimeLogic-Signature-Input -  <br>  |
| **400** | Invalid or ambiguous request parameters. |  * X-Request-Id -  <br>  |
| **401** | Missing or invalid authentication. |  -  |
| **403** | The key or customer subscription is not active. |  * X-Request-Id -  <br>  |
| **429** | The cached monthly quota state is exceeded. |  * X-Request-Id -  <br>  * X-TimeLogic-Quota-State -  <br>  |
| **405** | Only &#x60;GET&#x60; is supported. |  * X-Request-Id -  <br>  |
| **500** | Internal server error, including signing failures. |  * X-Request-Id -  <br>  |
| **501** | A required resolver or dependency is not configured or not ready. |  * X-Request-Id -  <br>  |
| **502** | Gateway failed to forward the request to the core worker. |  * X-Request-Id -  <br>  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

<a id="getclock"></a>
# **GetClock**
> string GetClock (string style, long? unix = null, long? unixMs = null, string? iso = null, string? sourceTz = null, string? sourceIp = null, double? sourceLat = null, double? sourceLon = null, string? sourceOffset = null, string? tz = null, string? ip = null, double? lat = null, double? lon = null, string? offset = null, string? format = null)

Render a live HTML clock

Returns an embeddable HTML clock fragment.  Input timestamp forms: - `unix=1711300000` - `unix_ms=1711300000000` - `iso=2026-04-16T09:00:00Z` - `iso=2026-04-16T09:00:00&source_tz=America/New_York`  Target selector forms: - `tz=America/New_York` - `ip=8.8.8.8` - `lat=40.7128&lon=-74.0060` - `offset=-04:00`  Incompatible combinations: - `style` is required and must be one of the 30 names in the `style` enum - at most one input timestamp form - at most one target selector family - use at most one of `source_tz`, `source_ip`, `source_lat`/`source_lon`, or `source_offset` - local-ISO companion selectors are valid only with `iso=...` that has no explicit offset - this route is single-target only; comma-separated `tz`, `ip`, and `offset` values are rejected - `auto_tz` is not supported on this route - `sign` is not supported on this route  Examples: - Digital: `/v1/time/clock?style=digital-dashboard&iso=2026-04-16T09:00:00&source_tz=America/New_York&tz=Europe/London` - Analog: `/v1/time/clock?style=analog-station&offset=-04:00` 

### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using TimeLogic.DirectApi.Api;
using TimeLogic.DirectApi.Client;
using TimeLogic.DirectApi.Model;

namespace Example
{
    public class GetClockExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "https://api.timelogicapi.com";
            // Configure API key authorization: directApiKeyHeader
            config.AddApiKey("X-API-Key", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("X-API-Key", "Bearer");
            // Configure Bearer token for authorization: directBearerAuth
            config.AccessToken = "YOUR_BEARER_TOKEN";
            // Configure API key authorization: directApiKeyQuery
            config.AddApiKey("api_key", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("api_key", "Bearer");
            // Configure API key authorization: rapidApiKey
            config.AddApiKey("X-RapidAPI-Key", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("X-RapidAPI-Key", "Bearer");
            // Configure API key authorization: rapidApiHost
            config.AddApiKey("X-RapidAPI-Host", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("X-RapidAPI-Host", "Bearer");

            var apiInstance = new TimeApi(config);
            var style = "analog-station";  // string | Clock style name. Valid values are enumerated here; there is no separate style discovery endpoint.
            var unix = 1711300000;  // long? |  (optional) 
            var unixMs = 1711300000000;  // long? |  (optional) 
            var iso = 2024-03-24T15:00:00;  // string? | ISO-8601 timestamp. To supply a local wall-clock time without an explicit offset, pair it with one of `source_tz=Area/City`, `source_ip=...`, `source_lat=...&source_lon=...`, or `source_offset=±HH:MM`. (optional) 
            var sourceTz = America/New_York;  // string? | Used only with `iso=...` when the ISO value has no explicit offset. (optional) 
            var sourceIp = 8.8.8.8;  // string? | Used only with `iso=...` when the ISO value has no explicit offset. Resolves that local wall-clock time through the timezone mapped from this IP address. (optional) 
            var sourceLat = 40.7128;  // double? | Used only with `iso=...` when the ISO value has no explicit offset. Provide together with `source_lon` to resolve that local wall-clock time through the timezone mapped from these coordinates. (optional) 
            var sourceLon = -74.006;  // double? | Used only with `iso=...` when the ISO value has no explicit offset. Provide together with `source_lat`. (optional) 
            var sourceOffset = -05:00;  // string? | Used only with `iso=...` when the ISO value has no explicit offset. Interprets that local wall-clock time at this fixed UTC offset. (optional) 
            var tz = America/New_York;  // string? | IANA timezone name. On bulk-capable routes, a comma-separated list enables bulk mode. (optional) 
            var ip = 8.8.8.8;  // string? | IP address. On bulk-capable routes, a comma-separated list enables bulk mode. (optional) 
            var lat = 40.7128;  // double? | Latitude. Must be provided together with `lon`. (optional) 
            var lon = -74.006;  // double? | Longitude. Must be provided together with `lat`. (optional) 
            var offset = -04:00;  // string? | Fixed UTC offset in `+HH:MM` or `-HH:MM` format. On bulk-capable routes, a comma-separated list enables bulk mode. (optional) 
            var format = %Y-%m-%d %H:%M:%S;  // string? | Custom date/time format template using supported `strftime`-style directives such as `%Y-%m-%d %H:%M:%S`. Reference: [strftime](https://strftime.net/). (optional) 

            try
            {
                // Render a live HTML clock
                string result = apiInstance.GetClock(style, unix, unixMs, iso, sourceTz, sourceIp, sourceLat, sourceLon, sourceOffset, tz, ip, lat, lon, offset, format);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling TimeApi.GetClock: " + e.Message);
                Debug.Print("Status Code: " + e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

#### Using the GetClockWithHttpInfo variant
This returns an ApiResponse object which contains the response data, status code and headers.

```csharp
try
{
    // Render a live HTML clock
    ApiResponse<string> response = apiInstance.GetClockWithHttpInfo(style, unix, unixMs, iso, sourceTz, sourceIp, sourceLat, sourceLon, sourceOffset, tz, ip, lat, lon, offset, format);
    Debug.Write("Status Code: " + response.StatusCode);
    Debug.Write("Response Headers: " + response.Headers);
    Debug.Write("Response Body: " + response.Data);
}
catch (ApiException e)
{
    Debug.Print("Exception when calling TimeApi.GetClockWithHttpInfo: " + e.Message);
    Debug.Print("Status Code: " + e.ErrorCode);
    Debug.Print(e.StackTrace);
}
```

### Parameters

| Name | Type | Description | Notes |
|------|------|-------------|-------|
| **style** | **string** | Clock style name. Valid values are enumerated here; there is no separate style discovery endpoint. |  |
| **unix** | **long?** |  | [optional]  |
| **unixMs** | **long?** |  | [optional]  |
| **iso** | **string?** | ISO-8601 timestamp. To supply a local wall-clock time without an explicit offset, pair it with one of &#x60;source_tz&#x3D;Area/City&#x60;, &#x60;source_ip&#x3D;...&#x60;, &#x60;source_lat&#x3D;...&amp;source_lon&#x3D;...&#x60;, or &#x60;source_offset&#x3D;±HH:MM&#x60;. | [optional]  |
| **sourceTz** | **string?** | Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. | [optional]  |
| **sourceIp** | **string?** | Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Resolves that local wall-clock time through the timezone mapped from this IP address. | [optional]  |
| **sourceLat** | **double?** | Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Provide together with &#x60;source_lon&#x60; to resolve that local wall-clock time through the timezone mapped from these coordinates. | [optional]  |
| **sourceLon** | **double?** | Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Provide together with &#x60;source_lat&#x60;. | [optional]  |
| **sourceOffset** | **string?** | Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Interprets that local wall-clock time at this fixed UTC offset. | [optional]  |
| **tz** | **string?** | IANA timezone name. On bulk-capable routes, a comma-separated list enables bulk mode. | [optional]  |
| **ip** | **string?** | IP address. On bulk-capable routes, a comma-separated list enables bulk mode. | [optional]  |
| **lat** | **double?** | Latitude. Must be provided together with &#x60;lon&#x60;. | [optional]  |
| **lon** | **double?** | Longitude. Must be provided together with &#x60;lat&#x60;. | [optional]  |
| **offset** | **string?** | Fixed UTC offset in &#x60;+HH:MM&#x60; or &#x60;-HH:MM&#x60; format. On bulk-capable routes, a comma-separated list enables bulk mode. | [optional]  |
| **format** | **string?** | Custom date/time format template using supported &#x60;strftime&#x60;-style directives such as &#x60;%Y-%m-%d %H:%M:%S&#x60;. Reference: [strftime](https://strftime.net/). | [optional]  |

### Return type

**string**

### Authorization

[directApiKeyHeader](../README.md#directApiKeyHeader), [directBearerAuth](../README.md#directBearerAuth), [directApiKeyQuery](../README.md#directApiKeyQuery), [rapidApiKey](../README.md#rapidApiKey), [rapidApiHost](../README.md#rapidApiHost)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: text/html, application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Embeddable HTML clock fragment. |  * X-Request-Id -  <br>  * Cache-Control - Clock HTML is uncached so the bootstrap always reflects the current request. <br>  |
| **400** | Invalid clock style or unsupported selector combination. |  * X-Request-Id -  <br>  |
| **401** | Missing or invalid authentication. |  -  |
| **403** | The key or customer subscription is not active. |  * X-Request-Id -  <br>  |
| **429** | The cached monthly quota state is exceeded. |  * X-Request-Id -  <br>  * X-TimeLogic-Quota-State -  <br>  |
| **405** | Only &#x60;GET&#x60; is supported. |  * X-Request-Id -  <br>  |
| **500** | Internal server error, including signing failures. |  * X-Request-Id -  <br>  |
| **501** | A required resolver or dependency is not configured or not ready. |  * X-Request-Id -  <br>  |
| **502** | Gateway failed to forward the request to the core worker. |  * X-Request-Id -  <br>  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

<a id="getcurrenttime"></a>
# **GetCurrentTime**
> GetCurrentTime200Response GetCurrentTime (string? tz = null, string? ip = null, double? lat = null, double? lon = null, string? offset = null, bool? autoTz = null, string? format = null, bool? sign = null)

Get the current time for a target

Returns current time data for a single target, or a bulk array when exactly one of `tz`, `ip`, or `offset` is supplied as a comma-separated list.  Target selector rules: - Use at most one selector family per request: `tz`, `ip`, `lat` + `lon`, `offset`, or `auto_tz=true`. - If no selector is provided, the response defaults to UTC with `timezone=null` and `iso_local=null`. - Bulk mode is available only through one comma-separated `tz`, `ip`, or `offset` selector and cannot be combined with any other selector.  Example: - Single target: `/v1/time/current?tz=America/New_York` - For bulk, provide one comma-separated `tz`, `ip`, or `offset` value, for example `/v1/time/current?tz=America/New_York,Europe/London,Asia/Tokyo`.

### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using TimeLogic.DirectApi.Api;
using TimeLogic.DirectApi.Client;
using TimeLogic.DirectApi.Model;

namespace Example
{
    public class GetCurrentTimeExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "https://api.timelogicapi.com";
            // Configure API key authorization: directApiKeyHeader
            config.AddApiKey("X-API-Key", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("X-API-Key", "Bearer");
            // Configure Bearer token for authorization: directBearerAuth
            config.AccessToken = "YOUR_BEARER_TOKEN";
            // Configure API key authorization: directApiKeyQuery
            config.AddApiKey("api_key", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("api_key", "Bearer");
            // Configure API key authorization: rapidApiKey
            config.AddApiKey("X-RapidAPI-Key", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("X-RapidAPI-Key", "Bearer");
            // Configure API key authorization: rapidApiHost
            config.AddApiKey("X-RapidAPI-Host", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("X-RapidAPI-Host", "Bearer");

            var apiInstance = new TimeApi(config);
            var tz = America/New_York;  // string? | IANA timezone name. On bulk-capable routes, a comma-separated list enables bulk mode. (optional) 
            var ip = 8.8.8.8;  // string? | IP address. On bulk-capable routes, a comma-separated list enables bulk mode. (optional) 
            var lat = 40.7128;  // double? | Latitude. Must be provided together with `lon`. (optional) 
            var lon = -74.006;  // double? | Longitude. Must be provided together with `lat`. (optional) 
            var offset = -04:00;  // string? | Fixed UTC offset in `+HH:MM` or `-HH:MM` format. On bulk-capable routes, a comma-separated list enables bulk mode. (optional) 
            var autoTz = true;  // bool? | Set to `true` to resolve using the caller IP from Cloudflare headers. (optional) 
            var format = %Y-%m-%d %H:%M:%S;  // string? | Custom date/time format template using supported `strftime`-style directives such as `%Y-%m-%d %H:%M:%S`. Reference: [strftime](https://strftime.net/). (optional) 
            var sign = true;  // bool? | Set to exactly `true` to ask the gateway to sign the final JSON response. Every authenticated JSON response, including errors, then includes signing headers. Not supported on `/v1/time/clock`. (optional) 

            try
            {
                // Get the current time for a target
                GetCurrentTime200Response result = apiInstance.GetCurrentTime(tz, ip, lat, lon, offset, autoTz, format, sign);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling TimeApi.GetCurrentTime: " + e.Message);
                Debug.Print("Status Code: " + e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

#### Using the GetCurrentTimeWithHttpInfo variant
This returns an ApiResponse object which contains the response data, status code and headers.

```csharp
try
{
    // Get the current time for a target
    ApiResponse<GetCurrentTime200Response> response = apiInstance.GetCurrentTimeWithHttpInfo(tz, ip, lat, lon, offset, autoTz, format, sign);
    Debug.Write("Status Code: " + response.StatusCode);
    Debug.Write("Response Headers: " + response.Headers);
    Debug.Write("Response Body: " + response.Data);
}
catch (ApiException e)
{
    Debug.Print("Exception when calling TimeApi.GetCurrentTimeWithHttpInfo: " + e.Message);
    Debug.Print("Status Code: " + e.ErrorCode);
    Debug.Print(e.StackTrace);
}
```

### Parameters

| Name | Type | Description | Notes |
|------|------|-------------|-------|
| **tz** | **string?** | IANA timezone name. On bulk-capable routes, a comma-separated list enables bulk mode. | [optional]  |
| **ip** | **string?** | IP address. On bulk-capable routes, a comma-separated list enables bulk mode. | [optional]  |
| **lat** | **double?** | Latitude. Must be provided together with &#x60;lon&#x60;. | [optional]  |
| **lon** | **double?** | Longitude. Must be provided together with &#x60;lat&#x60;. | [optional]  |
| **offset** | **string?** | Fixed UTC offset in &#x60;+HH:MM&#x60; or &#x60;-HH:MM&#x60; format. On bulk-capable routes, a comma-separated list enables bulk mode. | [optional]  |
| **autoTz** | **bool?** | Set to &#x60;true&#x60; to resolve using the caller IP from Cloudflare headers. | [optional]  |
| **format** | **string?** | Custom date/time format template using supported &#x60;strftime&#x60;-style directives such as &#x60;%Y-%m-%d %H:%M:%S&#x60;. Reference: [strftime](https://strftime.net/). | [optional]  |
| **sign** | **bool?** | Set to exactly &#x60;true&#x60; to ask the gateway to sign the final JSON response. Every authenticated JSON response, including errors, then includes signing headers. Not supported on &#x60;/v1/time/clock&#x60;. | [optional]  |

### Return type

[**GetCurrentTime200Response**](GetCurrentTime200Response.md)

### Authorization

[directApiKeyHeader](../README.md#directApiKeyHeader), [directBearerAuth](../README.md#directBearerAuth), [directApiKeyQuery](../README.md#directApiKeyQuery), [rapidApiKey](../README.md#rapidApiKey), [rapidApiHost](../README.md#rapidApiHost)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Current time payload or bulk array. |  * X-Request-Id -  <br>  * X-TimeLogic-Signature -  <br>  * X-TimeLogic-Key-Id -  <br>  * X-TimeLogic-Signature-Alg -  <br>  * X-TimeLogic-Signature-Timestamp -  <br>  * X-TimeLogic-Content-SHA256 -  <br>  * X-TimeLogic-Signature-Input -  <br>  |
| **400** | Invalid or ambiguous request parameters. |  * X-Request-Id -  <br>  |
| **401** | Missing or invalid authentication. |  -  |
| **403** | The key or customer subscription is not active. |  * X-Request-Id -  <br>  |
| **429** | The cached monthly quota state is exceeded. |  * X-Request-Id -  <br>  * X-TimeLogic-Quota-State -  <br>  |
| **405** | Only &#x60;GET&#x60; is supported. |  * X-Request-Id -  <br>  |
| **500** | Internal server error, including signing failures. |  * X-Request-Id -  <br>  |
| **501** | A required resolver or dependency is not configured or not ready. |  * X-Request-Id -  <br>  |
| **502** | Gateway failed to forward the request to the core worker. |  * X-Request-Id -  <br>  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

<a id="getdst"></a>
# **GetDst**
> DstResponse GetDst (string? tz = null, string? ip = null, double? lat = null, double? lon = null, string? offset = null, bool? autoTz = null, string? format = null, bool? next = null, bool? sign = null)

Daylight-saving status for a target

Returns daylight-saving status for the selected target.  Target selector rules: - Use at most one selector family: `tz`, `ip`, `lat` + `lon`, `offset`, or `auto_tz=true`. - If no selector is provided, the response defaults to UTC. - Bulk is not supported on this route. - `next=true` adds `next_transition` when the resolver provides a transition timestamp.  Example: - `/v1/time/dst?tz=America/New_York&next=true`

### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using TimeLogic.DirectApi.Api;
using TimeLogic.DirectApi.Client;
using TimeLogic.DirectApi.Model;

namespace Example
{
    public class GetDstExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "https://api.timelogicapi.com";
            // Configure API key authorization: directApiKeyHeader
            config.AddApiKey("X-API-Key", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("X-API-Key", "Bearer");
            // Configure Bearer token for authorization: directBearerAuth
            config.AccessToken = "YOUR_BEARER_TOKEN";
            // Configure API key authorization: directApiKeyQuery
            config.AddApiKey("api_key", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("api_key", "Bearer");
            // Configure API key authorization: rapidApiKey
            config.AddApiKey("X-RapidAPI-Key", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("X-RapidAPI-Key", "Bearer");
            // Configure API key authorization: rapidApiHost
            config.AddApiKey("X-RapidAPI-Host", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("X-RapidAPI-Host", "Bearer");

            var apiInstance = new TimeApi(config);
            var tz = America/New_York;  // string? | IANA timezone name. On bulk-capable routes, a comma-separated list enables bulk mode. (optional) 
            var ip = 8.8.8.8;  // string? | IP address. On bulk-capable routes, a comma-separated list enables bulk mode. (optional) 
            var lat = 40.7128;  // double? | Latitude. Must be provided together with `lon`. (optional) 
            var lon = -74.006;  // double? | Longitude. Must be provided together with `lat`. (optional) 
            var offset = -04:00;  // string? | Fixed UTC offset in `+HH:MM` or `-HH:MM` format. On bulk-capable routes, a comma-separated list enables bulk mode. (optional) 
            var autoTz = true;  // bool? | Set to `true` to resolve using the caller IP from Cloudflare headers. (optional) 
            var format = %Y-%m-%d %H:%M:%S;  // string? | Custom date/time format template using supported `strftime`-style directives such as `%Y-%m-%d %H:%M:%S`. Reference: [strftime](https://strftime.net/). (optional) 
            var next = true;  // bool? |  (optional) 
            var sign = true;  // bool? | Set to exactly `true` to ask the gateway to sign the final JSON response. Every authenticated JSON response, including errors, then includes signing headers. Not supported on `/v1/time/clock`. (optional) 

            try
            {
                // Daylight-saving status for a target
                DstResponse result = apiInstance.GetDst(tz, ip, lat, lon, offset, autoTz, format, next, sign);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling TimeApi.GetDst: " + e.Message);
                Debug.Print("Status Code: " + e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

#### Using the GetDstWithHttpInfo variant
This returns an ApiResponse object which contains the response data, status code and headers.

```csharp
try
{
    // Daylight-saving status for a target
    ApiResponse<DstResponse> response = apiInstance.GetDstWithHttpInfo(tz, ip, lat, lon, offset, autoTz, format, next, sign);
    Debug.Write("Status Code: " + response.StatusCode);
    Debug.Write("Response Headers: " + response.Headers);
    Debug.Write("Response Body: " + response.Data);
}
catch (ApiException e)
{
    Debug.Print("Exception when calling TimeApi.GetDstWithHttpInfo: " + e.Message);
    Debug.Print("Status Code: " + e.ErrorCode);
    Debug.Print(e.StackTrace);
}
```

### Parameters

| Name | Type | Description | Notes |
|------|------|-------------|-------|
| **tz** | **string?** | IANA timezone name. On bulk-capable routes, a comma-separated list enables bulk mode. | [optional]  |
| **ip** | **string?** | IP address. On bulk-capable routes, a comma-separated list enables bulk mode. | [optional]  |
| **lat** | **double?** | Latitude. Must be provided together with &#x60;lon&#x60;. | [optional]  |
| **lon** | **double?** | Longitude. Must be provided together with &#x60;lat&#x60;. | [optional]  |
| **offset** | **string?** | Fixed UTC offset in &#x60;+HH:MM&#x60; or &#x60;-HH:MM&#x60; format. On bulk-capable routes, a comma-separated list enables bulk mode. | [optional]  |
| **autoTz** | **bool?** | Set to &#x60;true&#x60; to resolve using the caller IP from Cloudflare headers. | [optional]  |
| **format** | **string?** | Custom date/time format template using supported &#x60;strftime&#x60;-style directives such as &#x60;%Y-%m-%d %H:%M:%S&#x60;. Reference: [strftime](https://strftime.net/). | [optional]  |
| **next** | **bool?** |  | [optional]  |
| **sign** | **bool?** | Set to exactly &#x60;true&#x60; to ask the gateway to sign the final JSON response. Every authenticated JSON response, including errors, then includes signing headers. Not supported on &#x60;/v1/time/clock&#x60;. | [optional]  |

### Return type

[**DstResponse**](DstResponse.md)

### Authorization

[directApiKeyHeader](../README.md#directApiKeyHeader), [directBearerAuth](../README.md#directBearerAuth), [directApiKeyQuery](../README.md#directApiKeyQuery), [rapidApiKey](../README.md#rapidApiKey), [rapidApiHost](../README.md#rapidApiHost)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | DST payload. |  * X-Request-Id -  <br>  * X-TimeLogic-Signature -  <br>  * X-TimeLogic-Key-Id -  <br>  * X-TimeLogic-Signature-Alg -  <br>  * X-TimeLogic-Signature-Timestamp -  <br>  * X-TimeLogic-Content-SHA256 -  <br>  * X-TimeLogic-Signature-Input -  <br>  |
| **400** | Invalid or ambiguous request parameters. |  * X-Request-Id -  <br>  |
| **401** | Missing or invalid authentication. |  -  |
| **403** | The key or customer subscription is not active. |  * X-Request-Id -  <br>  |
| **429** | The cached monthly quota state is exceeded. |  * X-Request-Id -  <br>  * X-TimeLogic-Quota-State -  <br>  |
| **405** | Only &#x60;GET&#x60; is supported. |  * X-Request-Id -  <br>  |
| **500** | Internal server error, including signing failures. |  * X-Request-Id -  <br>  |
| **501** | A required resolver or dependency is not configured or not ready. |  * X-Request-Id -  <br>  |
| **502** | Gateway failed to forward the request to the core worker. |  * X-Request-Id -  <br>  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

<a id="getelapsed"></a>
# **GetElapsed**
> ElapsedResponse GetElapsed (long? unix = null, long? unixMs = null, string? iso = null, string? sourceTz = null, string? sourceIp = null, double? sourceLat = null, double? sourceLon = null, string? sourceOffset = null, long? compareUnix = null, long? compareUnixMs = null, string? compareIso = null, string? compareSourceTz = null, string? compareSourceIp = null, double? compareSourceLat = null, double? compareSourceLon = null, string? compareSourceOffset = null, string? tz = null, string? ip = null, double? lat = null, double? lon = null, string? offset = null, bool? autoTz = null, string? format = null, bool? businessDays = null, string? holidayCountry = null, string? holidaySubdivision = null, bool? sign = null)

Time elapsed since or remaining until a reference instant

Computes elapsed or remaining duration relative to one required reference timestamp.  Reference timestamp forms: - `unix=1711300000` - `unix_ms=1711300000000` - `iso=2026-04-16T09:00:00Z` - `iso=2026-04-16T09:00:00&source_tz=America/New_York` - `iso=2026-04-16T09:00:00&source_ip=8.8.8.8` - `iso=2026-04-16T09:00:00&source_lat=40.7128&source_lon=-74.0060` - `iso=2026-04-16T09:00:00&source_offset=-05:00`  Compare timestamp forms: - `compare_unix=1711213600` - `compare_unix_ms=1711213600000` - `compare_iso=2026-04-16T09:00:00Z` - `compare_iso=2026-04-16T09:00:00&compare_source_tz=Europe/London` - `compare_iso=2026-04-16T09:00:00&compare_source_ip=8.8.8.8` - `compare_iso=2026-04-16T09:00:00&compare_source_lat=40.7128&compare_source_lon=-74.0060` - `compare_iso=2026-04-16T09:00:00&compare_source_offset=-05:00`  Compare selector forms: - `tz=America/New_York` - `ip=8.8.8.8` - `lat=40.7128&lon=-74.0060` - `offset=-04:00` - `auto_tz=true`  Incompatible combinations: - exactly one reference timestamp form - use either one compare timestamp form or one compare selector family, not both - use at most one of `source_tz`, `source_ip`, `source_lat`/`source_lon`, or `source_offset` - use at most one of `compare_source_tz`, `compare_source_ip`, `compare_source_lat`/`compare_source_lon`, or `compare_source_offset` - local-ISO companion selectors are valid only with `iso=...` that has no explicit offset - compare local-ISO companion selectors are valid only with `compare_iso=...` that has no explicit offset - if no compare input is provided, the comparison defaults to the request time  Business-day rules: - `holiday_country` and `holiday_subdivision` require `business_days=true` - `holiday_subdivision` also requires `holiday_country`  Examples: - Timestamp-to-timestamp: `/v1/time/elapsed?iso=2026-04-16T09:00:00&source_tz=America/New_York&compare_iso=2026-04-16T09:00:00&compare_source_tz=Europe/London` - Timestamp-to-selector: `/v1/time/elapsed?unix=1711300000&tz=America/New_York&business_days=true` 

### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using TimeLogic.DirectApi.Api;
using TimeLogic.DirectApi.Client;
using TimeLogic.DirectApi.Model;

namespace Example
{
    public class GetElapsedExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "https://api.timelogicapi.com";
            // Configure API key authorization: directApiKeyHeader
            config.AddApiKey("X-API-Key", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("X-API-Key", "Bearer");
            // Configure Bearer token for authorization: directBearerAuth
            config.AccessToken = "YOUR_BEARER_TOKEN";
            // Configure API key authorization: directApiKeyQuery
            config.AddApiKey("api_key", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("api_key", "Bearer");
            // Configure API key authorization: rapidApiKey
            config.AddApiKey("X-RapidAPI-Key", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("X-RapidAPI-Key", "Bearer");
            // Configure API key authorization: rapidApiHost
            config.AddApiKey("X-RapidAPI-Host", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("X-RapidAPI-Host", "Bearer");

            var apiInstance = new TimeApi(config);
            var unix = 1711300000;  // long? |  (optional) 
            var unixMs = 1711300000000;  // long? |  (optional) 
            var iso = 2024-03-24T15:00:00;  // string? | ISO-8601 timestamp. To supply a local wall-clock time without an explicit offset, pair it with one of `source_tz=Area/City`, `source_ip=...`, `source_lat=...&source_lon=...`, or `source_offset=±HH:MM`. (optional) 
            var sourceTz = America/New_York;  // string? | Used only with `iso=...` when the ISO value has no explicit offset. (optional) 
            var sourceIp = 8.8.8.8;  // string? | Used only with `iso=...` when the ISO value has no explicit offset. Resolves that local wall-clock time through the timezone mapped from this IP address. (optional) 
            var sourceLat = 40.7128;  // double? | Used only with `iso=...` when the ISO value has no explicit offset. Provide together with `source_lon` to resolve that local wall-clock time through the timezone mapped from these coordinates. (optional) 
            var sourceLon = -74.006;  // double? | Used only with `iso=...` when the ISO value has no explicit offset. Provide together with `source_lat`. (optional) 
            var sourceOffset = -05:00;  // string? | Used only with `iso=...` when the ISO value has no explicit offset. Interprets that local wall-clock time at this fixed UTC offset. (optional) 
            var compareUnix = 1711213600;  // long? |  (optional) 
            var compareUnixMs = 1711213600000;  // long? |  (optional) 
            var compareIso = 2024-03-23T15:00:00;  // string? | ISO-8601 comparison timestamp. To supply a local wall-clock time without an explicit offset, pair it with one of `compare_source_tz=Area/City`, `compare_source_ip=...`, `compare_source_lat=...&compare_source_lon=...`, or `compare_source_offset=±HH:MM`. (optional) 
            var compareSourceTz = America/New_York;  // string? | Used only with `compare_iso=...` when the ISO value has no explicit offset. (optional) 
            var compareSourceIp = 8.8.8.8;  // string? | Used only with `compare_iso=...` when the ISO value has no explicit offset. Resolves that local wall-clock time through the timezone mapped from this IP address. (optional) 
            var compareSourceLat = 40.7128;  // double? | Used only with `compare_iso=...` when the ISO value has no explicit offset. Provide together with `compare_source_lon` to resolve that local wall-clock time through the timezone mapped from these coordinates. (optional) 
            var compareSourceLon = -74.006;  // double? | Used only with `compare_iso=...` when the ISO value has no explicit offset. Provide together with `compare_source_lat`. (optional) 
            var compareSourceOffset = -05:00;  // string? | Used only with `compare_iso=...` when the ISO value has no explicit offset. Interprets that local wall-clock time at this fixed UTC offset. (optional) 
            var tz = America/New_York;  // string? | IANA timezone name. On bulk-capable routes, a comma-separated list enables bulk mode. (optional) 
            var ip = 8.8.8.8;  // string? | IP address. On bulk-capable routes, a comma-separated list enables bulk mode. (optional) 
            var lat = 40.7128;  // double? | Latitude. Must be provided together with `lon`. (optional) 
            var lon = -74.006;  // double? | Longitude. Must be provided together with `lat`. (optional) 
            var offset = -04:00;  // string? | Fixed UTC offset in `+HH:MM` or `-HH:MM` format. On bulk-capable routes, a comma-separated list enables bulk mode. (optional) 
            var autoTz = true;  // bool? | Set to `true` to resolve using the caller IP from Cloudflare headers. (optional) 
            var format = %daysd %hoursh %minutesm %secondss;  // string? | Custom duration format template using `%days`, `%hours`, `%minutes`, and `%seconds`. (optional) 
            var businessDays = true;  // bool? | Set to `true` to enable weekday/business-day counting. (optional) 
            var holidayCountry = US;  // string? | ISO 3166-1 alpha-2 holiday calendar country code. Requires `business_days=true`. (optional) 
            var holidaySubdivision = CA;  // string? | Holiday calendar subdivision code from the upstream `python-holidays` calendar, for example `CA` or `ENG`. Requires `holiday_country` and `business_days=true`. (optional) 
            var sign = true;  // bool? | Set to exactly `true` to ask the gateway to sign the final JSON response. Every authenticated JSON response, including errors, then includes signing headers. Not supported on `/v1/time/clock`. (optional) 

            try
            {
                // Time elapsed since or remaining until a reference instant
                ElapsedResponse result = apiInstance.GetElapsed(unix, unixMs, iso, sourceTz, sourceIp, sourceLat, sourceLon, sourceOffset, compareUnix, compareUnixMs, compareIso, compareSourceTz, compareSourceIp, compareSourceLat, compareSourceLon, compareSourceOffset, tz, ip, lat, lon, offset, autoTz, format, businessDays, holidayCountry, holidaySubdivision, sign);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling TimeApi.GetElapsed: " + e.Message);
                Debug.Print("Status Code: " + e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

#### Using the GetElapsedWithHttpInfo variant
This returns an ApiResponse object which contains the response data, status code and headers.

```csharp
try
{
    // Time elapsed since or remaining until a reference instant
    ApiResponse<ElapsedResponse> response = apiInstance.GetElapsedWithHttpInfo(unix, unixMs, iso, sourceTz, sourceIp, sourceLat, sourceLon, sourceOffset, compareUnix, compareUnixMs, compareIso, compareSourceTz, compareSourceIp, compareSourceLat, compareSourceLon, compareSourceOffset, tz, ip, lat, lon, offset, autoTz, format, businessDays, holidayCountry, holidaySubdivision, sign);
    Debug.Write("Status Code: " + response.StatusCode);
    Debug.Write("Response Headers: " + response.Headers);
    Debug.Write("Response Body: " + response.Data);
}
catch (ApiException e)
{
    Debug.Print("Exception when calling TimeApi.GetElapsedWithHttpInfo: " + e.Message);
    Debug.Print("Status Code: " + e.ErrorCode);
    Debug.Print(e.StackTrace);
}
```

### Parameters

| Name | Type | Description | Notes |
|------|------|-------------|-------|
| **unix** | **long?** |  | [optional]  |
| **unixMs** | **long?** |  | [optional]  |
| **iso** | **string?** | ISO-8601 timestamp. To supply a local wall-clock time without an explicit offset, pair it with one of &#x60;source_tz&#x3D;Area/City&#x60;, &#x60;source_ip&#x3D;...&#x60;, &#x60;source_lat&#x3D;...&amp;source_lon&#x3D;...&#x60;, or &#x60;source_offset&#x3D;±HH:MM&#x60;. | [optional]  |
| **sourceTz** | **string?** | Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. | [optional]  |
| **sourceIp** | **string?** | Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Resolves that local wall-clock time through the timezone mapped from this IP address. | [optional]  |
| **sourceLat** | **double?** | Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Provide together with &#x60;source_lon&#x60; to resolve that local wall-clock time through the timezone mapped from these coordinates. | [optional]  |
| **sourceLon** | **double?** | Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Provide together with &#x60;source_lat&#x60;. | [optional]  |
| **sourceOffset** | **string?** | Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Interprets that local wall-clock time at this fixed UTC offset. | [optional]  |
| **compareUnix** | **long?** |  | [optional]  |
| **compareUnixMs** | **long?** |  | [optional]  |
| **compareIso** | **string?** | ISO-8601 comparison timestamp. To supply a local wall-clock time without an explicit offset, pair it with one of &#x60;compare_source_tz&#x3D;Area/City&#x60;, &#x60;compare_source_ip&#x3D;...&#x60;, &#x60;compare_source_lat&#x3D;...&amp;compare_source_lon&#x3D;...&#x60;, or &#x60;compare_source_offset&#x3D;±HH:MM&#x60;. | [optional]  |
| **compareSourceTz** | **string?** | Used only with &#x60;compare_iso&#x3D;...&#x60; when the ISO value has no explicit offset. | [optional]  |
| **compareSourceIp** | **string?** | Used only with &#x60;compare_iso&#x3D;...&#x60; when the ISO value has no explicit offset. Resolves that local wall-clock time through the timezone mapped from this IP address. | [optional]  |
| **compareSourceLat** | **double?** | Used only with &#x60;compare_iso&#x3D;...&#x60; when the ISO value has no explicit offset. Provide together with &#x60;compare_source_lon&#x60; to resolve that local wall-clock time through the timezone mapped from these coordinates. | [optional]  |
| **compareSourceLon** | **double?** | Used only with &#x60;compare_iso&#x3D;...&#x60; when the ISO value has no explicit offset. Provide together with &#x60;compare_source_lat&#x60;. | [optional]  |
| **compareSourceOffset** | **string?** | Used only with &#x60;compare_iso&#x3D;...&#x60; when the ISO value has no explicit offset. Interprets that local wall-clock time at this fixed UTC offset. | [optional]  |
| **tz** | **string?** | IANA timezone name. On bulk-capable routes, a comma-separated list enables bulk mode. | [optional]  |
| **ip** | **string?** | IP address. On bulk-capable routes, a comma-separated list enables bulk mode. | [optional]  |
| **lat** | **double?** | Latitude. Must be provided together with &#x60;lon&#x60;. | [optional]  |
| **lon** | **double?** | Longitude. Must be provided together with &#x60;lat&#x60;. | [optional]  |
| **offset** | **string?** | Fixed UTC offset in &#x60;+HH:MM&#x60; or &#x60;-HH:MM&#x60; format. On bulk-capable routes, a comma-separated list enables bulk mode. | [optional]  |
| **autoTz** | **bool?** | Set to &#x60;true&#x60; to resolve using the caller IP from Cloudflare headers. | [optional]  |
| **format** | **string?** | Custom duration format template using &#x60;%days&#x60;, &#x60;%hours&#x60;, &#x60;%minutes&#x60;, and &#x60;%seconds&#x60;. | [optional]  |
| **businessDays** | **bool?** | Set to &#x60;true&#x60; to enable weekday/business-day counting. | [optional]  |
| **holidayCountry** | **string?** | ISO 3166-1 alpha-2 holiday calendar country code. Requires &#x60;business_days&#x3D;true&#x60;. | [optional]  |
| **holidaySubdivision** | **string?** | Holiday calendar subdivision code from the upstream &#x60;python-holidays&#x60; calendar, for example &#x60;CA&#x60; or &#x60;ENG&#x60;. Requires &#x60;holiday_country&#x60; and &#x60;business_days&#x3D;true&#x60;. | [optional]  |
| **sign** | **bool?** | Set to exactly &#x60;true&#x60; to ask the gateway to sign the final JSON response. Every authenticated JSON response, including errors, then includes signing headers. Not supported on &#x60;/v1/time/clock&#x60;. | [optional]  |

### Return type

[**ElapsedResponse**](ElapsedResponse.md)

### Authorization

[directApiKeyHeader](../README.md#directApiKeyHeader), [directBearerAuth](../README.md#directBearerAuth), [directApiKeyQuery](../README.md#directApiKeyQuery), [rapidApiKey](../README.md#rapidApiKey), [rapidApiHost](../README.md#rapidApiHost)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Elapsed-duration result. |  * X-Request-Id -  <br>  * X-TimeLogic-Signature -  <br>  * X-TimeLogic-Key-Id -  <br>  * X-TimeLogic-Signature-Alg -  <br>  * X-TimeLogic-Signature-Timestamp -  <br>  * X-TimeLogic-Content-SHA256 -  <br>  * X-TimeLogic-Signature-Input -  <br>  |
| **400** | Invalid or ambiguous request parameters. |  * X-Request-Id -  <br>  |
| **401** | Missing or invalid authentication. |  -  |
| **403** | The key or customer subscription is not active. |  * X-Request-Id -  <br>  |
| **429** | The cached monthly quota state is exceeded. |  * X-Request-Id -  <br>  * X-TimeLogic-Quota-State -  <br>  |
| **405** | Only &#x60;GET&#x60; is supported. |  * X-Request-Id -  <br>  |
| **500** | Internal server error, including signing failures. |  * X-Request-Id -  <br>  |
| **501** | A required resolver or dependency is not configured or not ready. |  * X-Request-Id -  <br>  |
| **502** | Gateway failed to forward the request to the core worker. |  * X-Request-Id -  <br>  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

<a id="gettimezone"></a>
# **GetTimezone**
> GetTimezone200Response GetTimezone (string? tz = null, string? ip = null, double? lat = null, double? lon = null, string? offset = null, bool? autoTz = null, bool? sign = null)

Resolve timezone information for a target

Resolves timezone metadata for a single target.  Target selector rules: - Use exactly one selector family: `tz`, `ip`, `lat` + `lon`, `offset`, or `auto_tz=true`. - Bulk is not supported on this route. - `offset` queries return a specialized payload that includes `matching_zones` for the request-time offset match.  Examples: - Single target: `/v1/timezone?tz=America/New_York` - Offset match: `/v1/timezone?offset=-04:00`

### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using TimeLogic.DirectApi.Api;
using TimeLogic.DirectApi.Client;
using TimeLogic.DirectApi.Model;

namespace Example
{
    public class GetTimezoneExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "https://api.timelogicapi.com";
            // Configure API key authorization: directApiKeyHeader
            config.AddApiKey("X-API-Key", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("X-API-Key", "Bearer");
            // Configure Bearer token for authorization: directBearerAuth
            config.AccessToken = "YOUR_BEARER_TOKEN";
            // Configure API key authorization: directApiKeyQuery
            config.AddApiKey("api_key", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("api_key", "Bearer");
            // Configure API key authorization: rapidApiKey
            config.AddApiKey("X-RapidAPI-Key", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("X-RapidAPI-Key", "Bearer");
            // Configure API key authorization: rapidApiHost
            config.AddApiKey("X-RapidAPI-Host", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("X-RapidAPI-Host", "Bearer");

            var apiInstance = new TimeApi(config);
            var tz = America/New_York;  // string? | IANA timezone name. On bulk-capable routes, a comma-separated list enables bulk mode. (optional) 
            var ip = 8.8.8.8;  // string? | IP address. On bulk-capable routes, a comma-separated list enables bulk mode. (optional) 
            var lat = 40.7128;  // double? | Latitude. Must be provided together with `lon`. (optional) 
            var lon = -74.006;  // double? | Longitude. Must be provided together with `lat`. (optional) 
            var offset = -04:00;  // string? | Fixed UTC offset in `+HH:MM` or `-HH:MM` format. On bulk-capable routes, a comma-separated list enables bulk mode. (optional) 
            var autoTz = true;  // bool? | Set to `true` to resolve using the caller IP from Cloudflare headers. (optional) 
            var sign = true;  // bool? | Set to exactly `true` to ask the gateway to sign the final JSON response. Every authenticated JSON response, including errors, then includes signing headers. Not supported on `/v1/time/clock`. (optional) 

            try
            {
                // Resolve timezone information for a target
                GetTimezone200Response result = apiInstance.GetTimezone(tz, ip, lat, lon, offset, autoTz, sign);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling TimeApi.GetTimezone: " + e.Message);
                Debug.Print("Status Code: " + e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

#### Using the GetTimezoneWithHttpInfo variant
This returns an ApiResponse object which contains the response data, status code and headers.

```csharp
try
{
    // Resolve timezone information for a target
    ApiResponse<GetTimezone200Response> response = apiInstance.GetTimezoneWithHttpInfo(tz, ip, lat, lon, offset, autoTz, sign);
    Debug.Write("Status Code: " + response.StatusCode);
    Debug.Write("Response Headers: " + response.Headers);
    Debug.Write("Response Body: " + response.Data);
}
catch (ApiException e)
{
    Debug.Print("Exception when calling TimeApi.GetTimezoneWithHttpInfo: " + e.Message);
    Debug.Print("Status Code: " + e.ErrorCode);
    Debug.Print(e.StackTrace);
}
```

### Parameters

| Name | Type | Description | Notes |
|------|------|-------------|-------|
| **tz** | **string?** | IANA timezone name. On bulk-capable routes, a comma-separated list enables bulk mode. | [optional]  |
| **ip** | **string?** | IP address. On bulk-capable routes, a comma-separated list enables bulk mode. | [optional]  |
| **lat** | **double?** | Latitude. Must be provided together with &#x60;lon&#x60;. | [optional]  |
| **lon** | **double?** | Longitude. Must be provided together with &#x60;lat&#x60;. | [optional]  |
| **offset** | **string?** | Fixed UTC offset in &#x60;+HH:MM&#x60; or &#x60;-HH:MM&#x60; format. On bulk-capable routes, a comma-separated list enables bulk mode. | [optional]  |
| **autoTz** | **bool?** | Set to &#x60;true&#x60; to resolve using the caller IP from Cloudflare headers. | [optional]  |
| **sign** | **bool?** | Set to exactly &#x60;true&#x60; to ask the gateway to sign the final JSON response. Every authenticated JSON response, including errors, then includes signing headers. Not supported on &#x60;/v1/time/clock&#x60;. | [optional]  |

### Return type

[**GetTimezone200Response**](GetTimezone200Response.md)

### Authorization

[directApiKeyHeader](../README.md#directApiKeyHeader), [directBearerAuth](../README.md#directBearerAuth), [directApiKeyQuery](../README.md#directApiKeyQuery), [rapidApiKey](../README.md#rapidApiKey), [rapidApiHost](../README.md#rapidApiHost)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Resolved timezone payload. |  * X-Request-Id -  <br>  * X-TimeLogic-Signature -  <br>  * X-TimeLogic-Key-Id -  <br>  * X-TimeLogic-Signature-Alg -  <br>  * X-TimeLogic-Signature-Timestamp -  <br>  * X-TimeLogic-Content-SHA256 -  <br>  * X-TimeLogic-Signature-Input -  <br>  |
| **400** | Invalid or ambiguous request parameters. |  * X-Request-Id -  <br>  |
| **401** | Missing or invalid authentication. |  -  |
| **403** | The key or customer subscription is not active. |  * X-Request-Id -  <br>  |
| **429** | The cached monthly quota state is exceeded. |  * X-Request-Id -  <br>  * X-TimeLogic-Quota-State -  <br>  |
| **405** | Only &#x60;GET&#x60; is supported. |  * X-Request-Id -  <br>  |
| **500** | Internal server error, including signing failures. |  * X-Request-Id -  <br>  |
| **501** | A required resolver or dependency is not configured or not ready. |  * X-Request-Id -  <br>  |
| **502** | Gateway failed to forward the request to the core worker. |  * X-Request-Id -  <br>  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

