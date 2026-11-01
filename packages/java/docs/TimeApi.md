# TimeApi

All URIs are relative to *https://api.timelogicapi.com*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
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
```java
// Import classes:
import com.timelogic.direct.ApiClient;
import com.timelogic.direct.ApiException;
import com.timelogic.direct.Configuration;
import com.timelogic.direct.auth.*;
import com.timelogic.direct.models.*;
import com.timelogic.direct.api.TimeApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("https://api.timelogicapi.com");

    // Configure API key authorization: apiKeyHeader
    ApiKeyAuth apiKeyHeader = (ApiKeyAuth) defaultClient.getAuthentication("apiKeyHeader");
    apiKeyHeader.setApiKey("YOUR API KEY");
    // Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
    //apiKeyHeader.setApiKeyPrefix("Token");

    // Configure HTTP bearer authorization: bearerAuth
    HttpBearerAuth bearerAuth = (HttpBearerAuth) defaultClient.getAuthentication("bearerAuth");
    bearerAuth.setBearerToken("BEARER TOKEN");

    // Configure API key authorization: apiKeyQuery
    ApiKeyAuth apiKeyQuery = (ApiKeyAuth) defaultClient.getAuthentication("apiKeyQuery");
    apiKeyQuery.setApiKey("YOUR API KEY");
    // Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
    //apiKeyQuery.setApiKeyPrefix("Token");

    // Configure API key authorization: rapidApiKey
    ApiKeyAuth rapidApiKey = (ApiKeyAuth) defaultClient.getAuthentication("rapidApiKey");
    rapidApiKey.setApiKey("YOUR API KEY");
    // Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
    //rapidApiKey.setApiKeyPrefix("Token");

    // Configure API key authorization: rapidApiHost
    ApiKeyAuth rapidApiHost = (ApiKeyAuth) defaultClient.getAuthentication("rapidApiHost");
    rapidApiHost.setApiKey("YOUR API KEY");
    // Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
    //rapidApiHost.setApiKeyPrefix("Token");

    TimeApi apiInstance = new TimeApi(defaultClient);
    Long unix = 1711300000L; // Long | Whole Unix seconds (fractions are rejected; negative values are allowed). Valid range is -62135596800 to 253402300799 (0001-01-01T00:00:00Z to 9999-12-31T23:59:59Z); values outside it return 400 INVALID_TIMESTAMP.
    Long unixMs = 1711300000000L; // Long | Whole Unix milliseconds. Valid range -62135596800000 to 253402300799999 (0001-01-01T00:00:00Z to 9999-12-31T23:59:59.999Z); values outside it return 400 INVALID_TIMESTAMP.
    String iso = "2024-03-24T15:00:00"; // String | ISO-8601 timestamp. To supply a local wall-clock time without an explicit offset, pair it with one of `source_tz=Area/City`, `source_ip=...`, `source_lat=...&source_lon=...`, or `source_offset=±HH:MM`; without a hint a local value is read as UTC. Accepted shapes are extended format with `Z`, `±HH:MM` or `±HH:MM:SS` (for example `1900-06-01T12:09:21+00:09:21`, as `iso_local` prints old local-mean-time offsets), optional fractional seconds, a space instead of `T`, a local time, or a date alone (read as 00:00). Basic format and offsets without a colon are rejected. The date must exist (`2027-02-29` returns 400 INVALID_TIMESTAMP rather than rolling over), and the instant must fall between 0001-01-01T00:00:00Z and 9999-12-31T23:59:59Z. A local time inside a spring-forward gap returns 400 INVALID_TIMESTAMP; an ambiguous fall-back time resolves to its first occurrence.
    String sourceTz = "America/New_York"; // String | Used only with `iso=...` when the ISO value has no explicit offset.
    String sourceIp = "8.8.8.8"; // String | Used only with `iso=...` when the ISO value has no explicit offset. Resolves that local wall-clock time through the timezone mapped from this IP address.
    Double sourceLat = 40.7128D; // Double | Used only with `iso=...` when the ISO value has no explicit offset. Provide together with `source_lon` to resolve that local wall-clock time through the timezone mapped from these coordinates.
    Double sourceLon = -74.006D; // Double | Used only with `iso=...` when the ISO value has no explicit offset. Provide together with `source_lat`.
    String sourceOffset = "-05:00"; // String | Used only with `iso=...` when the ISO value has no explicit offset. Interprets that local wall-clock time at this fixed UTC offset.
    Integer seconds = 30; // Integer |
    Integer minutes = 15; // Integer |
    Integer hours = 2; // Integer |
    Integer days = 7; // Integer | Days to add, each exactly 24 hours (86,400 seconds), so the local wall-clock time shifts across a DST change. There are no weeks/months/years modifiers; unknown parameters are ignored.
    String tz = "America/New_York"; // String | IANA timezone name, matched case-insensitively. Links and aliases resolve to their canonical zone, so the returned `timezone` can differ (`Europe/Stockholm` returns `Europe/Berlin`, `UTC` returns `Etc/UTC`). `Etc/GMT+5` is UTC-05:00 (POSIX sign). On bulk-capable routes, a comma-separated list enables bulk mode with at most 10 values (any comma, even a trailing one, returns an array); request URLs are limited to 8192 characters. On single-target routes a list is rejected as an invalid timezone.
    String ip = "8.8.8.8"; // String | IP address. On bulk-capable routes, a comma-separated list enables bulk mode with at most 10 values; request URLs are limited to 8192 characters.
    Double lat = 40.7128D; // Double | Latitude. Must be provided together with `lon`.
    Double lon = -74.006D; // Double | Longitude. Must be provided together with `lat`.
    String offset = "-04:00"; // String | Fixed UTC offset in `+HH:MM` or `-HH:MM` format only (`+0530` and `+5` are rejected); URL-encode `+` as `%2B`, since an unencoded `+` is read as a space. An offset target returns `timezone=null`. On bulk-capable routes, a comma-separated list enables bulk mode with at most 10 values; request URLs are limited to 8192 characters.
    Boolean autoTz = true; // Boolean | Set to `true` to resolve using the caller IP from Cloudflare headers. Counts as a selector family, so it cannot be combined with `tz`, `ip`, `lat`/`lon` or `offset`. Not supported on `/v1/time/clock`. Enabled by `true`, `1` or `yes` (case-insensitive); any other value leaves it off without an error.
    Boolean utc = true; // Boolean | Set to `true` to force UTC on routes that support it. Counts as a target and cannot be combined with other selectors (the AMBIGUOUS_TARGET message lists only the selector families). The response then has `iso_local=null` and `timezone=null`. Enabled by `true`, `1` or `yes` (case-insensitive); any other value leaves it off without an error.
    String format = "%Y-%m-%d %H:%M:%S"; // String | Custom date/time format template using supported `strftime`-style directives such as `%Y-%m-%d %H:%M:%S`. Supported directives: `%a %A %b %B %C %d %D %e %F %h %H %I %j %k %l %m %M %n %p %P %r %R %s %S %t %T %u %v %w %x %X %y %Y %z %:z %Z %%`, with the `-`, `_` and `0` padding flags on numeric directives. `%Z` prints the IANA zone name (or `UTC+HH:MM` for an offset target, `UTC` with no target), not an abbreviation. Any other directive (for example `%U`, `%f`, `%Q`) or a trailing `%` returns 400 INVALID_PARAMETER naming the directive.
    Boolean sign = true; // Boolean | Set to `true`, `1` or `yes` (case-insensitive) to ask the gateway to sign the final JSON response. Any other value, a bare `sign`, or repeated `sign` values leave the response unsigned. Every authenticated JSON response, including errors, then includes signing headers. Not supported on `/v1/time/clock`.
    try {
      TimePayload result = apiInstance.addTime(unix, unixMs, iso, sourceTz, sourceIp, sourceLat, sourceLon, sourceOffset, seconds, minutes, hours, days, tz, ip, lat, lon, offset, autoTz, utc, format, sign);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling TimeApi#addTime");
      System.err.println("Status code: " + e.getCode());
      System.err.println("Reason: " + e.getResponseBody());
      System.err.println("Response headers: " + e.getResponseHeaders());
      e.printStackTrace();
    }
  }
}
```

### Parameters

| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **unix** | **Long**| Whole Unix seconds (fractions are rejected; negative values are allowed). Valid range is -62135596800 to 253402300799 (0001-01-01T00:00:00Z to 9999-12-31T23:59:59Z); values outside it return 400 INVALID_TIMESTAMP. | [optional] |
| **unixMs** | **Long**| Whole Unix milliseconds. Valid range -62135596800000 to 253402300799999 (0001-01-01T00:00:00Z to 9999-12-31T23:59:59.999Z); values outside it return 400 INVALID_TIMESTAMP. | [optional] |
| **iso** | **String**| ISO-8601 timestamp. To supply a local wall-clock time without an explicit offset, pair it with one of &#x60;source_tz&#x3D;Area/City&#x60;, &#x60;source_ip&#x3D;...&#x60;, &#x60;source_lat&#x3D;...&amp;source_lon&#x3D;...&#x60;, or &#x60;source_offset&#x3D;±HH:MM&#x60;; without a hint a local value is read as UTC. Accepted shapes are extended format with &#x60;Z&#x60;, &#x60;±HH:MM&#x60; or &#x60;±HH:MM:SS&#x60; (for example &#x60;1900-06-01T12:09:21+00:09:21&#x60;, as &#x60;iso_local&#x60; prints old local-mean-time offsets), optional fractional seconds, a space instead of &#x60;T&#x60;, a local time, or a date alone (read as 00:00). Basic format and offsets without a colon are rejected. The date must exist (&#x60;2027-02-29&#x60; returns 400 INVALID_TIMESTAMP rather than rolling over), and the instant must fall between 0001-01-01T00:00:00Z and 9999-12-31T23:59:59Z. A local time inside a spring-forward gap returns 400 INVALID_TIMESTAMP; an ambiguous fall-back time resolves to its first occurrence. | [optional] |
| **sourceTz** | **String**| Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. | [optional] |
| **sourceIp** | **String**| Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Resolves that local wall-clock time through the timezone mapped from this IP address. | [optional] |
| **sourceLat** | **Double**| Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Provide together with &#x60;source_lon&#x60; to resolve that local wall-clock time through the timezone mapped from these coordinates. | [optional] |
| **sourceLon** | **Double**| Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Provide together with &#x60;source_lat&#x60;. | [optional] |
| **sourceOffset** | **String**| Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Interprets that local wall-clock time at this fixed UTC offset. | [optional] |
| **seconds** | **Integer**|  | [optional] |
| **minutes** | **Integer**|  | [optional] |
| **hours** | **Integer**|  | [optional] |
| **days** | **Integer**| Days to add, each exactly 24 hours (86,400 seconds), so the local wall-clock time shifts across a DST change. There are no weeks/months/years modifiers; unknown parameters are ignored. | [optional] |
| **tz** | **String**| IANA timezone name, matched case-insensitively. Links and aliases resolve to their canonical zone, so the returned &#x60;timezone&#x60; can differ (&#x60;Europe/Stockholm&#x60; returns &#x60;Europe/Berlin&#x60;, &#x60;UTC&#x60; returns &#x60;Etc/UTC&#x60;). &#x60;Etc/GMT+5&#x60; is UTC-05:00 (POSIX sign). On bulk-capable routes, a comma-separated list enables bulk mode with at most 10 values (any comma, even a trailing one, returns an array); request URLs are limited to 8192 characters. On single-target routes a list is rejected as an invalid timezone. | [optional] |
| **ip** | **String**| IP address. On bulk-capable routes, a comma-separated list enables bulk mode with at most 10 values; request URLs are limited to 8192 characters. | [optional] |
| **lat** | **Double**| Latitude. Must be provided together with &#x60;lon&#x60;. | [optional] |
| **lon** | **Double**| Longitude. Must be provided together with &#x60;lat&#x60;. | [optional] |
| **offset** | **String**| Fixed UTC offset in &#x60;+HH:MM&#x60; or &#x60;-HH:MM&#x60; format only (&#x60;+0530&#x60; and &#x60;+5&#x60; are rejected); URL-encode &#x60;+&#x60; as &#x60;%2B&#x60;, since an unencoded &#x60;+&#x60; is read as a space. An offset target returns &#x60;timezone&#x3D;null&#x60;. On bulk-capable routes, a comma-separated list enables bulk mode with at most 10 values; request URLs are limited to 8192 characters. | [optional] |
| **autoTz** | **Boolean**| Set to &#x60;true&#x60; to resolve using the caller IP from Cloudflare headers. Counts as a selector family, so it cannot be combined with &#x60;tz&#x60;, &#x60;ip&#x60;, &#x60;lat&#x60;/&#x60;lon&#x60; or &#x60;offset&#x60;. Not supported on &#x60;/v1/time/clock&#x60;. Enabled by &#x60;true&#x60;, &#x60;1&#x60; or &#x60;yes&#x60; (case-insensitive); any other value leaves it off without an error. | [optional] |
| **utc** | **Boolean**| Set to &#x60;true&#x60; to force UTC on routes that support it. Counts as a target and cannot be combined with other selectors (the AMBIGUOUS_TARGET message lists only the selector families). The response then has &#x60;iso_local&#x3D;null&#x60; and &#x60;timezone&#x3D;null&#x60;. Enabled by &#x60;true&#x60;, &#x60;1&#x60; or &#x60;yes&#x60; (case-insensitive); any other value leaves it off without an error. | [optional] |
| **format** | **String**| Custom date/time format template using supported &#x60;strftime&#x60;-style directives such as &#x60;%Y-%m-%d %H:%M:%S&#x60;. Supported directives: &#x60;%a %A %b %B %C %d %D %e %F %h %H %I %j %k %l %m %M %n %p %P %r %R %s %S %t %T %u %v %w %x %X %y %Y %z %:z %Z %%&#x60;, with the &#x60;-&#x60;, &#x60;_&#x60; and &#x60;0&#x60; padding flags on numeric directives. &#x60;%Z&#x60; prints the IANA zone name (or &#x60;UTC+HH:MM&#x60; for an offset target, &#x60;UTC&#x60; with no target), not an abbreviation. Any other directive (for example &#x60;%U&#x60;, &#x60;%f&#x60;, &#x60;%Q&#x60;) or a trailing &#x60;%&#x60; returns 400 INVALID_PARAMETER naming the directive. | [optional] |
| **sign** | **Boolean**| Set to &#x60;true&#x60;, &#x60;1&#x60; or &#x60;yes&#x60; (case-insensitive) to ask the gateway to sign the final JSON response. Any other value, a bare &#x60;sign&#x60;, or repeated &#x60;sign&#x60; values leave the response unsigned. Every authenticated JSON response, including errors, then includes signing headers. Not supported on &#x60;/v1/time/clock&#x60;. | [optional] |

### Return type

[**TimePayload**](TimePayload.md)

### Authorization

[apiKeyHeader](../README.md#apiKeyHeader), [bearerAuth](../README.md#bearerAuth), [apiKeyQuery](../README.md#apiKeyQuery), [rapidApiKey](../README.md#rapidApiKey), [rapidApiHost](../README.md#rapidApiHost)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Adjusted timestamp payload. |  * X-Request-Id -  <br>  * X-Auth-Mode -  <br>  * X-TimeLogic-Customer-ID -  <br>  * X-TimeLogic-Plan -  <br>  * X-TimeLogic-Quota-Limit -  <br>  * X-TimeLogic-Quota-State -  <br>  * X-TimeLogic-Signature -  <br>  * X-TimeLogic-Key-Id -  <br>  * X-TimeLogic-Signature-Alg -  <br>  * X-TimeLogic-Signature-Timestamp -  <br>  * X-TimeLogic-Content-SHA256 -  <br>  * X-TimeLogic-Signature-Input -  <br>  |
| **400** | Invalid or ambiguous request parameters. |  * X-Request-Id -  <br>  |
| **401** | Missing or invalid authentication. |  -  |
| **403** | The key or customer subscription is not active. |  * X-Request-Id -  <br>  |
| **404** | Unknown route (including a trailing slash), or an &#x60;ip&#x60; selector with no timezone mapping (private, reserved and loopback addresses never resolve) - \&quot;No timezone mapping found for the supplied IP address.\&quot; |  * X-Request-Id -  <br>  |
| **429** | The plan&#39;s monthly quota is used up (&#x60;QUOTA_EXCEEDED&#x60;, \&quot;Monthly quota exceeded.\&quot;). The quota period is the UTC calendar month and resets at 00:00 UTC on the 1st; no &#x60;Retry-After&#x60; header is sent. There is no published per-second limit. |  * X-Request-Id -  <br>  * X-TimeLogic-Quota-State -  <br>  |
| **405** | Only &#x60;GET&#x60; and &#x60;HEAD&#x60; are supported (\&quot;Only GET and HEAD are supported.\&quot;), with &#x60;Allow: GET, HEAD&#x60;. &#x60;HEAD&#x60; is answered like &#x60;GET&#x60; without a body. The CORS preflight allows GET, HEAD and OPTIONS. |  * X-Request-Id -  <br>  |
| **500** | Internal server error, including signing failures. |  * X-Request-Id -  <br>  |
| **501** | A required resolver or dependency is not configured or not ready. |  * X-Request-Id -  <br>  |
| **502** | Gateway failed to forward the request to the core worker. |  * X-Request-Id -  <br>  |

<a id="convertTime"></a>
# **convertTime**
> GetCurrentTime200Response convertTime(unix, unixMs, iso, sourceTz, sourceIp, sourceLat, sourceLon, sourceOffset, tz, ip, lat, lon, offset, autoTz, utc, format, sign)

Convert a timestamp into a target timezone or offset

Converts one required input timestamp into a single target or a bulk array.  Input timestamp forms: - &#x60;unix&#x3D;1711300000&#x60; - &#x60;unix_ms&#x3D;1711300000000&#x60; - &#x60;iso&#x3D;2026-04-16T09:00:00Z&#x60; - &#x60;iso&#x3D;2026-04-16T09:00:00&amp;source_tz&#x3D;America/New_York&#x60; - &#x60;iso&#x3D;2026-04-16T09:00:00&amp;source_ip&#x3D;8.8.8.8&#x60; - &#x60;iso&#x3D;2026-04-16T09:00:00&amp;source_lat&#x3D;40.7128&amp;source_lon&#x3D;-74.0060&#x60; - &#x60;iso&#x3D;2026-04-16T09:00:00&amp;source_offset&#x3D;-05:00&#x60;  Target selector forms: - &#x60;tz&#x3D;America/New_York&#x60; - &#x60;ip&#x3D;8.8.8.8&#x60; - &#x60;lat&#x3D;40.7128&amp;lon&#x3D;-74.0060&#x60; - &#x60;offset&#x3D;-04:00&#x60; - &#x60;auto_tz&#x3D;true&#x60; - &#x60;utc&#x3D;true&#x60;  Incompatible combinations: - exactly one input timestamp form - exactly one target selector family - use at most one of &#x60;source_tz&#x60;, &#x60;source_ip&#x60;, &#x60;source_lat&#x60;/&#x60;source_lon&#x60;, or &#x60;source_offset&#x60; - local-ISO companion selectors are valid only with &#x60;iso&#x3D;...&#x60; that has no explicit offset - bulk is allowed only through one comma-separated &#x60;tz&#x60;, &#x60;ip&#x60;, or &#x60;offset&#x60; selector with at most 10 values  Examples: - Single target: &#x60;/v1/time/convert?iso&#x3D;2026-04-16T09:00:00&amp;source_tz&#x3D;America/New_York&amp;tz&#x3D;Europe/London&#x60; - Bulk target set: &#x60;/v1/time/convert?unix&#x3D;1711300000&amp;offset&#x3D;-04:00,+00:00,+09:00&#x60;

### Example
```java
// Import classes:
import com.timelogic.direct.ApiClient;
import com.timelogic.direct.ApiException;
import com.timelogic.direct.Configuration;
import com.timelogic.direct.auth.*;
import com.timelogic.direct.models.*;
import com.timelogic.direct.api.TimeApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("https://api.timelogicapi.com");

    // Configure API key authorization: apiKeyHeader
    ApiKeyAuth apiKeyHeader = (ApiKeyAuth) defaultClient.getAuthentication("apiKeyHeader");
    apiKeyHeader.setApiKey("YOUR API KEY");
    // Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
    //apiKeyHeader.setApiKeyPrefix("Token");

    // Configure HTTP bearer authorization: bearerAuth
    HttpBearerAuth bearerAuth = (HttpBearerAuth) defaultClient.getAuthentication("bearerAuth");
    bearerAuth.setBearerToken("BEARER TOKEN");

    // Configure API key authorization: apiKeyQuery
    ApiKeyAuth apiKeyQuery = (ApiKeyAuth) defaultClient.getAuthentication("apiKeyQuery");
    apiKeyQuery.setApiKey("YOUR API KEY");
    // Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
    //apiKeyQuery.setApiKeyPrefix("Token");

    // Configure API key authorization: rapidApiKey
    ApiKeyAuth rapidApiKey = (ApiKeyAuth) defaultClient.getAuthentication("rapidApiKey");
    rapidApiKey.setApiKey("YOUR API KEY");
    // Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
    //rapidApiKey.setApiKeyPrefix("Token");

    // Configure API key authorization: rapidApiHost
    ApiKeyAuth rapidApiHost = (ApiKeyAuth) defaultClient.getAuthentication("rapidApiHost");
    rapidApiHost.setApiKey("YOUR API KEY");
    // Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
    //rapidApiHost.setApiKeyPrefix("Token");

    TimeApi apiInstance = new TimeApi(defaultClient);
    Long unix = 1711300000L; // Long | Whole Unix seconds (fractions are rejected; negative values are allowed). Valid range is -62135596800 to 253402300799 (0001-01-01T00:00:00Z to 9999-12-31T23:59:59Z); values outside it return 400 INVALID_TIMESTAMP.
    Long unixMs = 1711300000000L; // Long | Whole Unix milliseconds. Valid range -62135596800000 to 253402300799999 (0001-01-01T00:00:00Z to 9999-12-31T23:59:59.999Z); values outside it return 400 INVALID_TIMESTAMP.
    String iso = "2024-03-24T15:00:00"; // String | ISO-8601 timestamp. To supply a local wall-clock time without an explicit offset, pair it with one of `source_tz=Area/City`, `source_ip=...`, `source_lat=...&source_lon=...`, or `source_offset=±HH:MM`; without a hint a local value is read as UTC. Accepted shapes are extended format with `Z`, `±HH:MM` or `±HH:MM:SS` (for example `1900-06-01T12:09:21+00:09:21`, as `iso_local` prints old local-mean-time offsets), optional fractional seconds, a space instead of `T`, a local time, or a date alone (read as 00:00). Basic format and offsets without a colon are rejected. The date must exist (`2027-02-29` returns 400 INVALID_TIMESTAMP rather than rolling over), and the instant must fall between 0001-01-01T00:00:00Z and 9999-12-31T23:59:59Z. A local time inside a spring-forward gap returns 400 INVALID_TIMESTAMP; an ambiguous fall-back time resolves to its first occurrence.
    String sourceTz = "America/New_York"; // String | Used only with `iso=...` when the ISO value has no explicit offset.
    String sourceIp = "8.8.8.8"; // String | Used only with `iso=...` when the ISO value has no explicit offset. Resolves that local wall-clock time through the timezone mapped from this IP address.
    Double sourceLat = 40.7128D; // Double | Used only with `iso=...` when the ISO value has no explicit offset. Provide together with `source_lon` to resolve that local wall-clock time through the timezone mapped from these coordinates.
    Double sourceLon = -74.006D; // Double | Used only with `iso=...` when the ISO value has no explicit offset. Provide together with `source_lat`.
    String sourceOffset = "-05:00"; // String | Used only with `iso=...` when the ISO value has no explicit offset. Interprets that local wall-clock time at this fixed UTC offset.
    String tz = "America/New_York"; // String | IANA timezone name, matched case-insensitively. Links and aliases resolve to their canonical zone, so the returned `timezone` can differ (`Europe/Stockholm` returns `Europe/Berlin`, `UTC` returns `Etc/UTC`). `Etc/GMT+5` is UTC-05:00 (POSIX sign). On bulk-capable routes, a comma-separated list enables bulk mode with at most 10 values (any comma, even a trailing one, returns an array); request URLs are limited to 8192 characters. On single-target routes a list is rejected as an invalid timezone.
    String ip = "8.8.8.8"; // String | IP address. On bulk-capable routes, a comma-separated list enables bulk mode with at most 10 values; request URLs are limited to 8192 characters.
    Double lat = 40.7128D; // Double | Latitude. Must be provided together with `lon`.
    Double lon = -74.006D; // Double | Longitude. Must be provided together with `lat`.
    String offset = "-04:00"; // String | Fixed UTC offset in `+HH:MM` or `-HH:MM` format only (`+0530` and `+5` are rejected); URL-encode `+` as `%2B`, since an unencoded `+` is read as a space. An offset target returns `timezone=null`. On bulk-capable routes, a comma-separated list enables bulk mode with at most 10 values; request URLs are limited to 8192 characters.
    Boolean autoTz = true; // Boolean | Set to `true` to resolve using the caller IP from Cloudflare headers. Counts as a selector family, so it cannot be combined with `tz`, `ip`, `lat`/`lon` or `offset`. Not supported on `/v1/time/clock`. Enabled by `true`, `1` or `yes` (case-insensitive); any other value leaves it off without an error.
    Boolean utc = true; // Boolean | Set to `true` to force UTC on routes that support it. Counts as a target and cannot be combined with other selectors (the AMBIGUOUS_TARGET message lists only the selector families). The response then has `iso_local=null` and `timezone=null`. Enabled by `true`, `1` or `yes` (case-insensitive); any other value leaves it off without an error.
    String format = "%Y-%m-%d %H:%M:%S"; // String | Custom date/time format template using supported `strftime`-style directives such as `%Y-%m-%d %H:%M:%S`. Supported directives: `%a %A %b %B %C %d %D %e %F %h %H %I %j %k %l %m %M %n %p %P %r %R %s %S %t %T %u %v %w %x %X %y %Y %z %:z %Z %%`, with the `-`, `_` and `0` padding flags on numeric directives. `%Z` prints the IANA zone name (or `UTC+HH:MM` for an offset target, `UTC` with no target), not an abbreviation. Any other directive (for example `%U`, `%f`, `%Q`) or a trailing `%` returns 400 INVALID_PARAMETER naming the directive.
    Boolean sign = true; // Boolean | Set to `true`, `1` or `yes` (case-insensitive) to ask the gateway to sign the final JSON response. Any other value, a bare `sign`, or repeated `sign` values leave the response unsigned. Every authenticated JSON response, including errors, then includes signing headers. Not supported on `/v1/time/clock`.
    try {
      GetCurrentTime200Response result = apiInstance.convertTime(unix, unixMs, iso, sourceTz, sourceIp, sourceLat, sourceLon, sourceOffset, tz, ip, lat, lon, offset, autoTz, utc, format, sign);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling TimeApi#convertTime");
      System.err.println("Status code: " + e.getCode());
      System.err.println("Reason: " + e.getResponseBody());
      System.err.println("Response headers: " + e.getResponseHeaders());
      e.printStackTrace();
    }
  }
}
```

### Parameters

| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **unix** | **Long**| Whole Unix seconds (fractions are rejected; negative values are allowed). Valid range is -62135596800 to 253402300799 (0001-01-01T00:00:00Z to 9999-12-31T23:59:59Z); values outside it return 400 INVALID_TIMESTAMP. | [optional] |
| **unixMs** | **Long**| Whole Unix milliseconds. Valid range -62135596800000 to 253402300799999 (0001-01-01T00:00:00Z to 9999-12-31T23:59:59.999Z); values outside it return 400 INVALID_TIMESTAMP. | [optional] |
| **iso** | **String**| ISO-8601 timestamp. To supply a local wall-clock time without an explicit offset, pair it with one of &#x60;source_tz&#x3D;Area/City&#x60;, &#x60;source_ip&#x3D;...&#x60;, &#x60;source_lat&#x3D;...&amp;source_lon&#x3D;...&#x60;, or &#x60;source_offset&#x3D;±HH:MM&#x60;; without a hint a local value is read as UTC. Accepted shapes are extended format with &#x60;Z&#x60;, &#x60;±HH:MM&#x60; or &#x60;±HH:MM:SS&#x60; (for example &#x60;1900-06-01T12:09:21+00:09:21&#x60;, as &#x60;iso_local&#x60; prints old local-mean-time offsets), optional fractional seconds, a space instead of &#x60;T&#x60;, a local time, or a date alone (read as 00:00). Basic format and offsets without a colon are rejected. The date must exist (&#x60;2027-02-29&#x60; returns 400 INVALID_TIMESTAMP rather than rolling over), and the instant must fall between 0001-01-01T00:00:00Z and 9999-12-31T23:59:59Z. A local time inside a spring-forward gap returns 400 INVALID_TIMESTAMP; an ambiguous fall-back time resolves to its first occurrence. | [optional] |
| **sourceTz** | **String**| Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. | [optional] |
| **sourceIp** | **String**| Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Resolves that local wall-clock time through the timezone mapped from this IP address. | [optional] |
| **sourceLat** | **Double**| Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Provide together with &#x60;source_lon&#x60; to resolve that local wall-clock time through the timezone mapped from these coordinates. | [optional] |
| **sourceLon** | **Double**| Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Provide together with &#x60;source_lat&#x60;. | [optional] |
| **sourceOffset** | **String**| Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Interprets that local wall-clock time at this fixed UTC offset. | [optional] |
| **tz** | **String**| IANA timezone name, matched case-insensitively. Links and aliases resolve to their canonical zone, so the returned &#x60;timezone&#x60; can differ (&#x60;Europe/Stockholm&#x60; returns &#x60;Europe/Berlin&#x60;, &#x60;UTC&#x60; returns &#x60;Etc/UTC&#x60;). &#x60;Etc/GMT+5&#x60; is UTC-05:00 (POSIX sign). On bulk-capable routes, a comma-separated list enables bulk mode with at most 10 values (any comma, even a trailing one, returns an array); request URLs are limited to 8192 characters. On single-target routes a list is rejected as an invalid timezone. | [optional] |
| **ip** | **String**| IP address. On bulk-capable routes, a comma-separated list enables bulk mode with at most 10 values; request URLs are limited to 8192 characters. | [optional] |
| **lat** | **Double**| Latitude. Must be provided together with &#x60;lon&#x60;. | [optional] |
| **lon** | **Double**| Longitude. Must be provided together with &#x60;lat&#x60;. | [optional] |
| **offset** | **String**| Fixed UTC offset in &#x60;+HH:MM&#x60; or &#x60;-HH:MM&#x60; format only (&#x60;+0530&#x60; and &#x60;+5&#x60; are rejected); URL-encode &#x60;+&#x60; as &#x60;%2B&#x60;, since an unencoded &#x60;+&#x60; is read as a space. An offset target returns &#x60;timezone&#x3D;null&#x60;. On bulk-capable routes, a comma-separated list enables bulk mode with at most 10 values; request URLs are limited to 8192 characters. | [optional] |
| **autoTz** | **Boolean**| Set to &#x60;true&#x60; to resolve using the caller IP from Cloudflare headers. Counts as a selector family, so it cannot be combined with &#x60;tz&#x60;, &#x60;ip&#x60;, &#x60;lat&#x60;/&#x60;lon&#x60; or &#x60;offset&#x60;. Not supported on &#x60;/v1/time/clock&#x60;. Enabled by &#x60;true&#x60;, &#x60;1&#x60; or &#x60;yes&#x60; (case-insensitive); any other value leaves it off without an error. | [optional] |
| **utc** | **Boolean**| Set to &#x60;true&#x60; to force UTC on routes that support it. Counts as a target and cannot be combined with other selectors (the AMBIGUOUS_TARGET message lists only the selector families). The response then has &#x60;iso_local&#x3D;null&#x60; and &#x60;timezone&#x3D;null&#x60;. Enabled by &#x60;true&#x60;, &#x60;1&#x60; or &#x60;yes&#x60; (case-insensitive); any other value leaves it off without an error. | [optional] |
| **format** | **String**| Custom date/time format template using supported &#x60;strftime&#x60;-style directives such as &#x60;%Y-%m-%d %H:%M:%S&#x60;. Supported directives: &#x60;%a %A %b %B %C %d %D %e %F %h %H %I %j %k %l %m %M %n %p %P %r %R %s %S %t %T %u %v %w %x %X %y %Y %z %:z %Z %%&#x60;, with the &#x60;-&#x60;, &#x60;_&#x60; and &#x60;0&#x60; padding flags on numeric directives. &#x60;%Z&#x60; prints the IANA zone name (or &#x60;UTC+HH:MM&#x60; for an offset target, &#x60;UTC&#x60; with no target), not an abbreviation. Any other directive (for example &#x60;%U&#x60;, &#x60;%f&#x60;, &#x60;%Q&#x60;) or a trailing &#x60;%&#x60; returns 400 INVALID_PARAMETER naming the directive. | [optional] |
| **sign** | **Boolean**| Set to &#x60;true&#x60;, &#x60;1&#x60; or &#x60;yes&#x60; (case-insensitive) to ask the gateway to sign the final JSON response. Any other value, a bare &#x60;sign&#x60;, or repeated &#x60;sign&#x60; values leave the response unsigned. Every authenticated JSON response, including errors, then includes signing headers. Not supported on &#x60;/v1/time/clock&#x60;. | [optional] |

### Return type

[**GetCurrentTime200Response**](GetCurrentTime200Response.md)

### Authorization

[apiKeyHeader](../README.md#apiKeyHeader), [bearerAuth](../README.md#bearerAuth), [apiKeyQuery](../README.md#apiKeyQuery), [rapidApiKey](../README.md#rapidApiKey), [rapidApiHost](../README.md#rapidApiHost)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Converted time payload or bulk array. |  * X-Request-Id -  <br>  * X-Auth-Mode -  <br>  * X-TimeLogic-Customer-ID -  <br>  * X-TimeLogic-Plan -  <br>  * X-TimeLogic-Quota-Limit -  <br>  * X-TimeLogic-Quota-State -  <br>  * X-TimeLogic-Signature -  <br>  * X-TimeLogic-Key-Id -  <br>  * X-TimeLogic-Signature-Alg -  <br>  * X-TimeLogic-Signature-Timestamp -  <br>  * X-TimeLogic-Content-SHA256 -  <br>  * X-TimeLogic-Signature-Input -  <br>  |
| **400** | Invalid or ambiguous request parameters. |  * X-Request-Id -  <br>  |
| **401** | Missing or invalid authentication. |  -  |
| **403** | The key or customer subscription is not active. |  * X-Request-Id -  <br>  |
| **404** | Unknown route (including a trailing slash), or an &#x60;ip&#x60; selector with no timezone mapping (private, reserved and loopback addresses never resolve) - \&quot;No timezone mapping found for the supplied IP address.\&quot; |  * X-Request-Id -  <br>  |
| **429** | The plan&#39;s monthly quota is used up (&#x60;QUOTA_EXCEEDED&#x60;, \&quot;Monthly quota exceeded.\&quot;). The quota period is the UTC calendar month and resets at 00:00 UTC on the 1st; no &#x60;Retry-After&#x60; header is sent. There is no published per-second limit. |  * X-Request-Id -  <br>  * X-TimeLogic-Quota-State -  <br>  |
| **405** | Only &#x60;GET&#x60; and &#x60;HEAD&#x60; are supported (\&quot;Only GET and HEAD are supported.\&quot;), with &#x60;Allow: GET, HEAD&#x60;. &#x60;HEAD&#x60; is answered like &#x60;GET&#x60; without a body. The CORS preflight allows GET, HEAD and OPTIONS. |  * X-Request-Id -  <br>  |
| **500** | Internal server error, including signing failures. |  * X-Request-Id -  <br>  |
| **501** | A required resolver or dependency is not configured or not ready. |  * X-Request-Id -  <br>  |
| **502** | Gateway failed to forward the request to the core worker. |  * X-Request-Id -  <br>  |

<a id="diffTime"></a>
# **diffTime**
> DiffResponse diffTime(from, to, fromTz, fromIp, fromLat, fromLon, fromOffset, toTz, toIp, toLat, toLon, toOffset, format, businessDays, holidayCountry, holidaySubdivision, sign)

Difference between two instants

Computes the duration between &#x60;from&#x60; and &#x60;to&#x60;.  Required query fields: &#x60;from&#x60; and &#x60;to&#x60; only. Do not send every optional companion field. For each side, choose one supported specifier form. A &#x60;from_*&#x60; or &#x60;to_*&#x60; companion is allowed only when that side uses &#x60;iso&#x3D;...&#x60; with no explicit offset; use at most one companion selector, except that coordinate input requires its paired latitude and longitude.  &#x60;from&#x60; and &#x60;to&#x60; are embedded specifier strings.  Accepted specifier forms: - &#x60;from&#x3D;now&#x60; - &#x60;from&#x3D;unix&#x3D;1711300000&#x60; - &#x60;from&#x3D;unix_ms&#x3D;1711300000000&#x60; - &#x60;from&#x3D;iso&#x3D;2026-04-16T09:00:00&#x60; - &#x60;from&#x3D;tz&#x3D;America/New_York&#x60; - &#x60;from&#x3D;ip&#x3D;8.8.8.8&#x60; - &#x60;from&#x3D;offset&#x3D;-05:00&#x60; - the same forms are accepted for &#x60;to&#x60;  Timezone hint pairings: - &#x60;from_tz&#x60; only with &#x60;from&#x3D;iso&#x3D;...&#x60; that has no explicit offset - &#x60;from_ip&#x60;, &#x60;from_lat&#x60;/&#x60;from_lon&#x60;, and &#x60;from_offset&#x60; only with &#x60;from&#x3D;iso&#x3D;...&#x60; that has no explicit offset - &#x60;to_tz&#x60; only with &#x60;to&#x3D;iso&#x3D;...&#x60; that has no explicit offset - &#x60;to_ip&#x60;, &#x60;to_lat&#x60;/&#x60;to_lon&#x60;, and &#x60;to_offset&#x60; only with &#x60;to&#x3D;iso&#x3D;...&#x60; that has no explicit offset  Selector semantics: - &#x60;tz&#x3D;...&#x60;, &#x60;ip&#x3D;...&#x60;, and &#x60;offset&#x3D;...&#x60; inside &#x60;from&#x60; or &#x60;to&#x60; mean the current request-time instant resolved through that selector - those selector forms do not represent an arbitrary local wall-clock time - returned duration magnitudes are absolute; use &#x60;direction&#x60; to see whether &#x60;to&#x60; is after, before, or the same instant as &#x60;from&#x60; - because \&quot;now\&quot; is the same instant in every zone, &#x60;tz&#x3D;&#x60;, &#x60;ip&#x3D;&#x60; and &#x60;offset&#x3D;&#x60; specifiers never change &#x60;seconds&#x60; or &#x60;direction&#x60;; their zone only picks the calendar date for business days - coordinates are not a specifier (&#x60;from&#x3D;lat&#x3D;...&#x60; returns \&quot;Unsupported time specifier.\&quot;); use &#x60;from_lat&#x60;/&#x60;from_lon&#x60; as a hint for a local &#x60;iso&#x60; - &#x60;seconds&#x60;, &#x60;minutes&#x60;, &#x60;hours&#x60;, &#x60;days&#x60; and the &#x60;format&#x60; placeholders are totals in each unit, not remainders; &#x60;human&#x60; is always written in hours, minutes and seconds  Business-day rules: - &#x60;holiday_country&#x60; and &#x60;holiday_subdivision&#x60; require &#x60;business_days&#x3D;true&#x60; - &#x60;holiday_subdivision&#x60; also requires &#x60;holiday_country&#x60; - days are counted by calendar date, start included and end excluded, unsigned - each side&#39;s date is taken in its zone when known (a &#x60;from_*&#x60;/&#x60;to_*&#x60; hint, or a &#x60;tz&#x3D;&#x60;/&#x60;ip&#x3D;&#x60;/&#x60;offset&#x3D;&#x60; specifier), otherwise in UTC - example: &#x60;from&#x3D;iso&#x3D;2026-01-02T00:00:00Z&amp;to&#x3D;iso&#x3D;2026-04-30T00:00:00Z&amp;business_days&#x3D;true&amp;holiday_country&#x3D;FR&#x60; returns &#x60;business_days: 83&#x60; - weekends follow the holiday calendar&#39;s country (Friday/Saturday for &#x60;SA&#x60;); a subdivision uses its country&#39;s weekend - example with a subdivision: &#x60;from&#x3D;iso&#x3D;2026-01-02T00:00:00Z&amp;to&#x3D;iso&#x3D;2026-04-30T00:00:00Z&amp;business_days&#x3D;true&amp;holiday_country&#x3D;CH&amp;holiday_subdivision&#x3D;ZH&#x60; returns &#x60;business_days: 82&#x60; (&#x60;holiday_country&#x3D;CH-ZH&#x60; is the same calendar) - example with a Friday/Saturday weekend: the same range with &#x60;holiday_country&#x3D;SA&#x60; returns &#x60;business_days: 79&#x60;  Examples: - Selector-current instant: &#x60;/v1/time/diff?from&#x3D;unix&#x3D;1711300000&amp;to&#x3D;now&#x60; - Wall-clock pairing: &#x60;/v1/time/diff?from&#x3D;iso&#x3D;2026-04-16T09:00:00&amp;from_tz&#x3D;America/New_York&amp;to&#x3D;iso&#x3D;2026-04-16T09:00:00&amp;to_tz&#x3D;Europe/London&#x60; - Wall-clock via selector: &#x60;/v1/time/diff?from&#x3D;iso&#x3D;2026-01-01T12:00:00&amp;from_ip&#x3D;8.8.8.8&amp;to&#x3D;iso&#x3D;2026-01-01T12:00:00&amp;to_offset&#x3D;-05:00&#x60;

### Example
```java
// Import classes:
import com.timelogic.direct.ApiClient;
import com.timelogic.direct.ApiException;
import com.timelogic.direct.Configuration;
import com.timelogic.direct.auth.*;
import com.timelogic.direct.models.*;
import com.timelogic.direct.api.TimeApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("https://api.timelogicapi.com");

    // Configure API key authorization: apiKeyHeader
    ApiKeyAuth apiKeyHeader = (ApiKeyAuth) defaultClient.getAuthentication("apiKeyHeader");
    apiKeyHeader.setApiKey("YOUR API KEY");
    // Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
    //apiKeyHeader.setApiKeyPrefix("Token");

    // Configure HTTP bearer authorization: bearerAuth
    HttpBearerAuth bearerAuth = (HttpBearerAuth) defaultClient.getAuthentication("bearerAuth");
    bearerAuth.setBearerToken("BEARER TOKEN");

    // Configure API key authorization: apiKeyQuery
    ApiKeyAuth apiKeyQuery = (ApiKeyAuth) defaultClient.getAuthentication("apiKeyQuery");
    apiKeyQuery.setApiKey("YOUR API KEY");
    // Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
    //apiKeyQuery.setApiKeyPrefix("Token");

    // Configure API key authorization: rapidApiKey
    ApiKeyAuth rapidApiKey = (ApiKeyAuth) defaultClient.getAuthentication("rapidApiKey");
    rapidApiKey.setApiKey("YOUR API KEY");
    // Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
    //rapidApiKey.setApiKeyPrefix("Token");

    // Configure API key authorization: rapidApiHost
    ApiKeyAuth rapidApiHost = (ApiKeyAuth) defaultClient.getAuthentication("rapidApiHost");
    rapidApiHost.setApiKey("YOUR API KEY");
    // Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
    //rapidApiHost.setApiKeyPrefix("Token");

    TimeApi apiInstance = new TimeApi(defaultClient);
    String from = "from_example"; // String | Time specifier. Supported forms are `now`, `unix=<seconds>`, `unix_ms=<milliseconds>`, `iso=<ISO-8601>`, `offset=±HH:MM`, `tz=<IANA timezone>`, and `ip=<IP address>`. For `tz=...`, `ip=...`, and `offset=...`, the specifier means the current request-time instant resolved through that selector. To express a local wall-clock time, use `from=iso=...` together with one of `from_tz`, `from_ip`, `from_lat`+`from_lon`, or `from_offset`.
    String to = "to_example"; // String | Time specifier. Supported forms are `now`, `unix=<seconds>`, `unix_ms=<milliseconds>`, `iso=<ISO-8601>`, `offset=±HH:MM`, `tz=<IANA timezone>`, and `ip=<IP address>`. For `tz=...`, `ip=...`, and `offset=...`, the specifier means the current request-time instant resolved through that selector. To express a local wall-clock time, use `to=iso=...` together with one of `to_tz`, `to_ip`, `to_lat`+`to_lon`, or `to_offset`.
    String fromTz = "fromTz_example"; // String | Used only with `from=iso=...` when the ISO value has no explicit offset.
    String fromIp = "8.8.8.8"; // String | Used only with `from=iso=...` when the ISO value has no explicit offset. Resolves that local wall-clock time through the timezone mapped from this IP address.
    Double fromLat = 40.7128D; // Double | Used only with `from=iso=...` when the ISO value has no explicit offset. Provide together with `from_lon` to resolve that local wall-clock time through the timezone mapped from these coordinates.
    Double fromLon = -74.006D; // Double | Used only with `from=iso=...` when the ISO value has no explicit offset. Provide together with `from_lat`.
    String fromOffset = "-05:00"; // String | Used only with `from=iso=...` when the ISO value has no explicit offset. Interprets that local wall-clock time at this fixed UTC offset.
    String toTz = "toTz_example"; // String | Used only with `to=iso=...` when the ISO value has no explicit offset.
    String toIp = "8.8.8.8"; // String | Used only with `to=iso=...` when the ISO value has no explicit offset. Resolves that local wall-clock time through the timezone mapped from this IP address.
    Double toLat = 40.7128D; // Double | Used only with `to=iso=...` when the ISO value has no explicit offset. Provide together with `to_lon` to resolve that local wall-clock time through the timezone mapped from these coordinates.
    Double toLon = -74.006D; // Double | Used only with `to=iso=...` when the ISO value has no explicit offset. Provide together with `to_lat`.
    String toOffset = "-05:00"; // String | Used only with `to=iso=...` when the ISO value has no explicit offset. Interprets that local wall-clock time at this fixed UTC offset.
    String format = "%daysd %hoursh %minutesm %secondss"; // String | Custom duration format template using `%days`, `%hours`, `%minutes`, and `%seconds`. Each placeholder is the total duration in that unit, not a remainder (118 days renders `%days days %hours hours` as `118 days 2832 hours`).
    Boolean businessDays = true; // Boolean | Set to `true` to add a `business_days` count. Days are counted by calendar date, start included and end excluded, unsigned; weekends follow the holiday calendar's country (Saturday/Sunday in 221 countries, Friday/Saturday in 18 such as SA, Sunday only in 8, Friday only in IR, Friday/Sunday in BN; Saturday/Sunday when no `holiday_country` is given) and holidays of the chosen calendar are skipped. Each endpoint's date is taken in its own zone when one is known (diff - from_*_/to_* hints or a tz=/ip=/offset= specifier; elapsed - source_*_/compare_source_*), otherwise in UTC. Enabled by `true`, `1` or `yes` (case-insensitive); any other value leaves it off without an error.
    String holidayCountry = "US"; // String | Holiday calendar: one of the 249 countries with holiday calendars (862 calendars including subdivisions, years 1900-2100), as an ISO 3166-1 alpha-2 code in any letter case, or a combined ISO 3166-2 style code such as `CH-ZH`, `US-CA` or `FR-6AE`. Requires `business_days=true`. The full list is at https://timelogicapi.com/docs#holiday-calendars and, as JSON, at https://timelogicapi.com/content/holiday-calendars.json. Any other country (for example `LK`) returns 400 INVALID_PARAMETER \"Unsupported holiday calendar.\"; a malformed value returns \"Invalid holiday_country parameter.\"; a business-day range outside 1900-2100 returns \"Holiday calendar coverage is only available for years 1900-2100.\"
    String holidaySubdivision = "CA"; // String | Holiday calendar subdivision code for the country (the ISO 3166-2 suffix, 1-3 letters or digits, any letter case), for example `ENG` (GB), `ZH` (CH), `MH` (IN), `01` (FI) or `6AE` (FR); digits and leading zeros are part of the code. Subdivisions exist for 35 countries. Requires `holiday_country` and `business_days=true`. An unknown code returns 400 INVALID_PARAMETER \"Unknown holiday_subdivision 'XX' for country DE.\" (also for `FI` + `1`, which must be `01`); a value that conflicts with a combined `holiday_country` such as `US-CA` returns 400 INVALID_PARAMETER.
    Boolean sign = true; // Boolean | Set to `true`, `1` or `yes` (case-insensitive) to ask the gateway to sign the final JSON response. Any other value, a bare `sign`, or repeated `sign` values leave the response unsigned. Every authenticated JSON response, including errors, then includes signing headers. Not supported on `/v1/time/clock`.
    try {
      DiffResponse result = apiInstance.diffTime(from, to, fromTz, fromIp, fromLat, fromLon, fromOffset, toTz, toIp, toLat, toLon, toOffset, format, businessDays, holidayCountry, holidaySubdivision, sign);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling TimeApi#diffTime");
      System.err.println("Status code: " + e.getCode());
      System.err.println("Reason: " + e.getResponseBody());
      System.err.println("Response headers: " + e.getResponseHeaders());
      e.printStackTrace();
    }
  }
}
```

### Parameters

| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **from** | **String**| Time specifier. Supported forms are &#x60;now&#x60;, &#x60;unix&#x3D;&lt;seconds&gt;&#x60;, &#x60;unix_ms&#x3D;&lt;milliseconds&gt;&#x60;, &#x60;iso&#x3D;&lt;ISO-8601&gt;&#x60;, &#x60;offset&#x3D;±HH:MM&#x60;, &#x60;tz&#x3D;&lt;IANA timezone&gt;&#x60;, and &#x60;ip&#x3D;&lt;IP address&gt;&#x60;. For &#x60;tz&#x3D;...&#x60;, &#x60;ip&#x3D;...&#x60;, and &#x60;offset&#x3D;...&#x60;, the specifier means the current request-time instant resolved through that selector. To express a local wall-clock time, use &#x60;from&#x3D;iso&#x3D;...&#x60; together with one of &#x60;from_tz&#x60;, &#x60;from_ip&#x60;, &#x60;from_lat&#x60;+&#x60;from_lon&#x60;, or &#x60;from_offset&#x60;. | |
| **to** | **String**| Time specifier. Supported forms are &#x60;now&#x60;, &#x60;unix&#x3D;&lt;seconds&gt;&#x60;, &#x60;unix_ms&#x3D;&lt;milliseconds&gt;&#x60;, &#x60;iso&#x3D;&lt;ISO-8601&gt;&#x60;, &#x60;offset&#x3D;±HH:MM&#x60;, &#x60;tz&#x3D;&lt;IANA timezone&gt;&#x60;, and &#x60;ip&#x3D;&lt;IP address&gt;&#x60;. For &#x60;tz&#x3D;...&#x60;, &#x60;ip&#x3D;...&#x60;, and &#x60;offset&#x3D;...&#x60;, the specifier means the current request-time instant resolved through that selector. To express a local wall-clock time, use &#x60;to&#x3D;iso&#x3D;...&#x60; together with one of &#x60;to_tz&#x60;, &#x60;to_ip&#x60;, &#x60;to_lat&#x60;+&#x60;to_lon&#x60;, or &#x60;to_offset&#x60;. | |
| **fromTz** | **String**| Used only with &#x60;from&#x3D;iso&#x3D;...&#x60; when the ISO value has no explicit offset. | [optional] |
| **fromIp** | **String**| Used only with &#x60;from&#x3D;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Resolves that local wall-clock time through the timezone mapped from this IP address. | [optional] |
| **fromLat** | **Double**| Used only with &#x60;from&#x3D;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Provide together with &#x60;from_lon&#x60; to resolve that local wall-clock time through the timezone mapped from these coordinates. | [optional] |
| **fromLon** | **Double**| Used only with &#x60;from&#x3D;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Provide together with &#x60;from_lat&#x60;. | [optional] |
| **fromOffset** | **String**| Used only with &#x60;from&#x3D;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Interprets that local wall-clock time at this fixed UTC offset. | [optional] |
| **toTz** | **String**| Used only with &#x60;to&#x3D;iso&#x3D;...&#x60; when the ISO value has no explicit offset. | [optional] |
| **toIp** | **String**| Used only with &#x60;to&#x3D;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Resolves that local wall-clock time through the timezone mapped from this IP address. | [optional] |
| **toLat** | **Double**| Used only with &#x60;to&#x3D;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Provide together with &#x60;to_lon&#x60; to resolve that local wall-clock time through the timezone mapped from these coordinates. | [optional] |
| **toLon** | **Double**| Used only with &#x60;to&#x3D;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Provide together with &#x60;to_lat&#x60;. | [optional] |
| **toOffset** | **String**| Used only with &#x60;to&#x3D;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Interprets that local wall-clock time at this fixed UTC offset. | [optional] |
| **format** | **String**| Custom duration format template using &#x60;%days&#x60;, &#x60;%hours&#x60;, &#x60;%minutes&#x60;, and &#x60;%seconds&#x60;. Each placeholder is the total duration in that unit, not a remainder (118 days renders &#x60;%days days %hours hours&#x60; as &#x60;118 days 2832 hours&#x60;). | [optional] |
| **businessDays** | **Boolean**| Set to &#x60;true&#x60; to add a &#x60;business_days&#x60; count. Days are counted by calendar date, start included and end excluded, unsigned; weekends follow the holiday calendar&#39;s country (Saturday/Sunday in 221 countries, Friday/Saturday in 18 such as SA, Sunday only in 8, Friday only in IR, Friday/Sunday in BN; Saturday/Sunday when no &#x60;holiday_country&#x60; is given) and holidays of the chosen calendar are skipped. Each endpoint&#39;s date is taken in its own zone when one is known (diff - from_*_/to_* hints or a tz&#x3D;/ip&#x3D;/offset&#x3D; specifier; elapsed - source_*_/compare_source_*), otherwise in UTC. Enabled by &#x60;true&#x60;, &#x60;1&#x60; or &#x60;yes&#x60; (case-insensitive); any other value leaves it off without an error. | [optional] |
| **holidayCountry** | **String**| Holiday calendar: one of the 249 countries with holiday calendars (862 calendars including subdivisions, years 1900-2100), as an ISO 3166-1 alpha-2 code in any letter case, or a combined ISO 3166-2 style code such as &#x60;CH-ZH&#x60;, &#x60;US-CA&#x60; or &#x60;FR-6AE&#x60;. Requires &#x60;business_days&#x3D;true&#x60;. The full list is at https://timelogicapi.com/docs#holiday-calendars and, as JSON, at https://timelogicapi.com/content/holiday-calendars.json. Any other country (for example &#x60;LK&#x60;) returns 400 INVALID_PARAMETER \&quot;Unsupported holiday calendar.\&quot;; a malformed value returns \&quot;Invalid holiday_country parameter.\&quot;; a business-day range outside 1900-2100 returns \&quot;Holiday calendar coverage is only available for years 1900-2100.\&quot; | [optional] |
| **holidaySubdivision** | **String**| Holiday calendar subdivision code for the country (the ISO 3166-2 suffix, 1-3 letters or digits, any letter case), for example &#x60;ENG&#x60; (GB), &#x60;ZH&#x60; (CH), &#x60;MH&#x60; (IN), &#x60;01&#x60; (FI) or &#x60;6AE&#x60; (FR); digits and leading zeros are part of the code. Subdivisions exist for 35 countries. Requires &#x60;holiday_country&#x60; and &#x60;business_days&#x3D;true&#x60;. An unknown code returns 400 INVALID_PARAMETER \&quot;Unknown holiday_subdivision &#39;XX&#39; for country DE.\&quot; (also for &#x60;FI&#x60; + &#x60;1&#x60;, which must be &#x60;01&#x60;); a value that conflicts with a combined &#x60;holiday_country&#x60; such as &#x60;US-CA&#x60; returns 400 INVALID_PARAMETER. | [optional] |
| **sign** | **Boolean**| Set to &#x60;true&#x60;, &#x60;1&#x60; or &#x60;yes&#x60; (case-insensitive) to ask the gateway to sign the final JSON response. Any other value, a bare &#x60;sign&#x60;, or repeated &#x60;sign&#x60; values leave the response unsigned. Every authenticated JSON response, including errors, then includes signing headers. Not supported on &#x60;/v1/time/clock&#x60;. | [optional] |

### Return type

[**DiffResponse**](DiffResponse.md)

### Authorization

[apiKeyHeader](../README.md#apiKeyHeader), [bearerAuth](../README.md#bearerAuth), [apiKeyQuery](../README.md#apiKeyQuery), [rapidApiKey](../README.md#rapidApiKey), [rapidApiHost](../README.md#rapidApiHost)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Duration result. |  * X-Request-Id -  <br>  * X-Auth-Mode -  <br>  * X-TimeLogic-Customer-ID -  <br>  * X-TimeLogic-Plan -  <br>  * X-TimeLogic-Quota-Limit -  <br>  * X-TimeLogic-Quota-State -  <br>  * X-TimeLogic-Signature -  <br>  * X-TimeLogic-Key-Id -  <br>  * X-TimeLogic-Signature-Alg -  <br>  * X-TimeLogic-Signature-Timestamp -  <br>  * X-TimeLogic-Content-SHA256 -  <br>  * X-TimeLogic-Signature-Input -  <br>  |
| **400** | Invalid or ambiguous request parameters. |  * X-Request-Id -  <br>  |
| **401** | Missing or invalid authentication. |  -  |
| **403** | The key or customer subscription is not active. |  * X-Request-Id -  <br>  |
| **404** | Unknown route (including a trailing slash), or an &#x60;ip&#x60; selector with no timezone mapping (private, reserved and loopback addresses never resolve) - \&quot;No timezone mapping found for the supplied IP address.\&quot; |  * X-Request-Id -  <br>  |
| **429** | The plan&#39;s monthly quota is used up (&#x60;QUOTA_EXCEEDED&#x60;, \&quot;Monthly quota exceeded.\&quot;). The quota period is the UTC calendar month and resets at 00:00 UTC on the 1st; no &#x60;Retry-After&#x60; header is sent. There is no published per-second limit. |  * X-Request-Id -  <br>  * X-TimeLogic-Quota-State -  <br>  |
| **405** | Only &#x60;GET&#x60; and &#x60;HEAD&#x60; are supported (\&quot;Only GET and HEAD are supported.\&quot;), with &#x60;Allow: GET, HEAD&#x60;. &#x60;HEAD&#x60; is answered like &#x60;GET&#x60; without a body. The CORS preflight allows GET, HEAD and OPTIONS. |  * X-Request-Id -  <br>  |
| **500** | Internal server error, including signing failures. |  * X-Request-Id -  <br>  |
| **501** | A required resolver or dependency is not configured or not ready. |  * X-Request-Id -  <br>  |
| **502** | Gateway failed to forward the request to the core worker. |  * X-Request-Id -  <br>  |

<a id="getCalendar"></a>
# **getCalendar**
> CalendarResponse getCalendar(unix, unixMs, iso, sourceTz, sourceIp, sourceLat, sourceLon, sourceOffset, tz, ip, lat, lon, offset, autoTz, format, week, sign)

Calendar projection for a target instant

Returns calendar fields for an optional timestamp and target.  Input timestamp forms: - &#x60;unix&#x3D;1711300000&#x60; - &#x60;unix_ms&#x3D;1711300000000&#x60; - &#x60;iso&#x3D;2026-04-16T09:00:00Z&#x60; - &#x60;iso&#x3D;2026-04-16T09:00:00&amp;source_tz&#x3D;America/New_York&#x60; - &#x60;iso&#x3D;2026-04-16T09:00:00&amp;source_ip&#x3D;8.8.8.8&#x60; - &#x60;iso&#x3D;2026-04-16T09:00:00&amp;source_lat&#x3D;40.7128&amp;source_lon&#x3D;-74.0060&#x60; - &#x60;iso&#x3D;2026-04-16T09:00:00&amp;source_offset&#x3D;-05:00&#x60; - if no input timestamp is provided, the request time is used  Target selector forms: - &#x60;tz&#x3D;America/New_York&#x60; - &#x60;ip&#x3D;8.8.8.8&#x60; - &#x60;lat&#x3D;40.7128&amp;lon&#x3D;-74.0060&#x60; - &#x60;offset&#x3D;-04:00&#x60; - &#x60;auto_tz&#x3D;true&#x60;  Additional flags: - &#x60;week&#x3D;true&#x60; adds &#x60;week_number&#x60;  Incompatible combinations: - at most one input timestamp form - at most one target selector family - use at most one of &#x60;source_tz&#x60;, &#x60;source_ip&#x60;, &#x60;source_lat&#x60;/&#x60;source_lon&#x60;, or &#x60;source_offset&#x60; - local-ISO companion selectors are valid only with &#x60;iso&#x3D;...&#x60; that has no explicit offset - bulk is not supported on this route  Examples: - &#x60;/v1/time/calendar?iso&#x3D;2026-04-16T09:00:00&amp;source_tz&#x3D;America/New_York&amp;tz&#x3D;Europe/London&amp;week&#x3D;true&#x60; - &#x60;/v1/time/calendar?unix&#x3D;1711300000&amp;auto_tz&#x3D;true&#x60;

### Example
```java
// Import classes:
import com.timelogic.direct.ApiClient;
import com.timelogic.direct.ApiException;
import com.timelogic.direct.Configuration;
import com.timelogic.direct.auth.*;
import com.timelogic.direct.models.*;
import com.timelogic.direct.api.TimeApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("https://api.timelogicapi.com");

    // Configure API key authorization: apiKeyHeader
    ApiKeyAuth apiKeyHeader = (ApiKeyAuth) defaultClient.getAuthentication("apiKeyHeader");
    apiKeyHeader.setApiKey("YOUR API KEY");
    // Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
    //apiKeyHeader.setApiKeyPrefix("Token");

    // Configure HTTP bearer authorization: bearerAuth
    HttpBearerAuth bearerAuth = (HttpBearerAuth) defaultClient.getAuthentication("bearerAuth");
    bearerAuth.setBearerToken("BEARER TOKEN");

    // Configure API key authorization: apiKeyQuery
    ApiKeyAuth apiKeyQuery = (ApiKeyAuth) defaultClient.getAuthentication("apiKeyQuery");
    apiKeyQuery.setApiKey("YOUR API KEY");
    // Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
    //apiKeyQuery.setApiKeyPrefix("Token");

    // Configure API key authorization: rapidApiKey
    ApiKeyAuth rapidApiKey = (ApiKeyAuth) defaultClient.getAuthentication("rapidApiKey");
    rapidApiKey.setApiKey("YOUR API KEY");
    // Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
    //rapidApiKey.setApiKeyPrefix("Token");

    // Configure API key authorization: rapidApiHost
    ApiKeyAuth rapidApiHost = (ApiKeyAuth) defaultClient.getAuthentication("rapidApiHost");
    rapidApiHost.setApiKey("YOUR API KEY");
    // Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
    //rapidApiHost.setApiKeyPrefix("Token");

    TimeApi apiInstance = new TimeApi(defaultClient);
    Long unix = 1711300000L; // Long | Whole Unix seconds (fractions are rejected; negative values are allowed). Valid range is -62135596800 to 253402300799 (0001-01-01T00:00:00Z to 9999-12-31T23:59:59Z); values outside it return 400 INVALID_TIMESTAMP.
    Long unixMs = 1711300000000L; // Long | Whole Unix milliseconds. Valid range -62135596800000 to 253402300799999 (0001-01-01T00:00:00Z to 9999-12-31T23:59:59.999Z); values outside it return 400 INVALID_TIMESTAMP.
    String iso = "2024-03-24T15:00:00"; // String | ISO-8601 timestamp. To supply a local wall-clock time without an explicit offset, pair it with one of `source_tz=Area/City`, `source_ip=...`, `source_lat=...&source_lon=...`, or `source_offset=±HH:MM`; without a hint a local value is read as UTC. Accepted shapes are extended format with `Z`, `±HH:MM` or `±HH:MM:SS` (for example `1900-06-01T12:09:21+00:09:21`, as `iso_local` prints old local-mean-time offsets), optional fractional seconds, a space instead of `T`, a local time, or a date alone (read as 00:00). Basic format and offsets without a colon are rejected. The date must exist (`2027-02-29` returns 400 INVALID_TIMESTAMP rather than rolling over), and the instant must fall between 0001-01-01T00:00:00Z and 9999-12-31T23:59:59Z. A local time inside a spring-forward gap returns 400 INVALID_TIMESTAMP; an ambiguous fall-back time resolves to its first occurrence.
    String sourceTz = "America/New_York"; // String | Used only with `iso=...` when the ISO value has no explicit offset.
    String sourceIp = "8.8.8.8"; // String | Used only with `iso=...` when the ISO value has no explicit offset. Resolves that local wall-clock time through the timezone mapped from this IP address.
    Double sourceLat = 40.7128D; // Double | Used only with `iso=...` when the ISO value has no explicit offset. Provide together with `source_lon` to resolve that local wall-clock time through the timezone mapped from these coordinates.
    Double sourceLon = -74.006D; // Double | Used only with `iso=...` when the ISO value has no explicit offset. Provide together with `source_lat`.
    String sourceOffset = "-05:00"; // String | Used only with `iso=...` when the ISO value has no explicit offset. Interprets that local wall-clock time at this fixed UTC offset.
    String tz = "America/New_York"; // String | IANA timezone name, matched case-insensitively. Links and aliases resolve to their canonical zone, so the returned `timezone` can differ (`Europe/Stockholm` returns `Europe/Berlin`, `UTC` returns `Etc/UTC`). `Etc/GMT+5` is UTC-05:00 (POSIX sign). On bulk-capable routes, a comma-separated list enables bulk mode with at most 10 values (any comma, even a trailing one, returns an array); request URLs are limited to 8192 characters. On single-target routes a list is rejected as an invalid timezone.
    String ip = "8.8.8.8"; // String | IP address. On bulk-capable routes, a comma-separated list enables bulk mode with at most 10 values; request URLs are limited to 8192 characters.
    Double lat = 40.7128D; // Double | Latitude. Must be provided together with `lon`.
    Double lon = -74.006D; // Double | Longitude. Must be provided together with `lat`.
    String offset = "-04:00"; // String | Fixed UTC offset in `+HH:MM` or `-HH:MM` format only (`+0530` and `+5` are rejected); URL-encode `+` as `%2B`, since an unencoded `+` is read as a space. An offset target returns `timezone=null`. On bulk-capable routes, a comma-separated list enables bulk mode with at most 10 values; request URLs are limited to 8192 characters.
    Boolean autoTz = true; // Boolean | Set to `true` to resolve using the caller IP from Cloudflare headers. Counts as a selector family, so it cannot be combined with `tz`, `ip`, `lat`/`lon` or `offset`. Not supported on `/v1/time/clock`. Enabled by `true`, `1` or `yes` (case-insensitive); any other value leaves it off without an error.
    String format = "%Y-%m-%d %H:%M:%S"; // String | Custom date/time format template using supported `strftime`-style directives such as `%Y-%m-%d %H:%M:%S`. Supported directives: `%a %A %b %B %C %d %D %e %F %h %H %I %j %k %l %m %M %n %p %P %r %R %s %S %t %T %u %v %w %x %X %y %Y %z %:z %Z %%`, with the `-`, `_` and `0` padding flags on numeric directives. `%Z` prints the IANA zone name (or `UTC+HH:MM` for an offset target, `UTC` with no target), not an abbreviation. Any other directive (for example `%U`, `%f`, `%Q`) or a trailing `%` returns 400 INVALID_PARAMETER naming the directive.
    Boolean week = true; // Boolean | Set to `true` to add the ISO 8601 `week_number`. Enabled by `true`, `1` or `yes` (case-insensitive); any other value leaves it off without an error.
    Boolean sign = true; // Boolean | Set to `true`, `1` or `yes` (case-insensitive) to ask the gateway to sign the final JSON response. Any other value, a bare `sign`, or repeated `sign` values leave the response unsigned. Every authenticated JSON response, including errors, then includes signing headers. Not supported on `/v1/time/clock`.
    try {
      CalendarResponse result = apiInstance.getCalendar(unix, unixMs, iso, sourceTz, sourceIp, sourceLat, sourceLon, sourceOffset, tz, ip, lat, lon, offset, autoTz, format, week, sign);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling TimeApi#getCalendar");
      System.err.println("Status code: " + e.getCode());
      System.err.println("Reason: " + e.getResponseBody());
      System.err.println("Response headers: " + e.getResponseHeaders());
      e.printStackTrace();
    }
  }
}
```

### Parameters

| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **unix** | **Long**| Whole Unix seconds (fractions are rejected; negative values are allowed). Valid range is -62135596800 to 253402300799 (0001-01-01T00:00:00Z to 9999-12-31T23:59:59Z); values outside it return 400 INVALID_TIMESTAMP. | [optional] |
| **unixMs** | **Long**| Whole Unix milliseconds. Valid range -62135596800000 to 253402300799999 (0001-01-01T00:00:00Z to 9999-12-31T23:59:59.999Z); values outside it return 400 INVALID_TIMESTAMP. | [optional] |
| **iso** | **String**| ISO-8601 timestamp. To supply a local wall-clock time without an explicit offset, pair it with one of &#x60;source_tz&#x3D;Area/City&#x60;, &#x60;source_ip&#x3D;...&#x60;, &#x60;source_lat&#x3D;...&amp;source_lon&#x3D;...&#x60;, or &#x60;source_offset&#x3D;±HH:MM&#x60;; without a hint a local value is read as UTC. Accepted shapes are extended format with &#x60;Z&#x60;, &#x60;±HH:MM&#x60; or &#x60;±HH:MM:SS&#x60; (for example &#x60;1900-06-01T12:09:21+00:09:21&#x60;, as &#x60;iso_local&#x60; prints old local-mean-time offsets), optional fractional seconds, a space instead of &#x60;T&#x60;, a local time, or a date alone (read as 00:00). Basic format and offsets without a colon are rejected. The date must exist (&#x60;2027-02-29&#x60; returns 400 INVALID_TIMESTAMP rather than rolling over), and the instant must fall between 0001-01-01T00:00:00Z and 9999-12-31T23:59:59Z. A local time inside a spring-forward gap returns 400 INVALID_TIMESTAMP; an ambiguous fall-back time resolves to its first occurrence. | [optional] |
| **sourceTz** | **String**| Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. | [optional] |
| **sourceIp** | **String**| Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Resolves that local wall-clock time through the timezone mapped from this IP address. | [optional] |
| **sourceLat** | **Double**| Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Provide together with &#x60;source_lon&#x60; to resolve that local wall-clock time through the timezone mapped from these coordinates. | [optional] |
| **sourceLon** | **Double**| Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Provide together with &#x60;source_lat&#x60;. | [optional] |
| **sourceOffset** | **String**| Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Interprets that local wall-clock time at this fixed UTC offset. | [optional] |
| **tz** | **String**| IANA timezone name, matched case-insensitively. Links and aliases resolve to their canonical zone, so the returned &#x60;timezone&#x60; can differ (&#x60;Europe/Stockholm&#x60; returns &#x60;Europe/Berlin&#x60;, &#x60;UTC&#x60; returns &#x60;Etc/UTC&#x60;). &#x60;Etc/GMT+5&#x60; is UTC-05:00 (POSIX sign). On bulk-capable routes, a comma-separated list enables bulk mode with at most 10 values (any comma, even a trailing one, returns an array); request URLs are limited to 8192 characters. On single-target routes a list is rejected as an invalid timezone. | [optional] |
| **ip** | **String**| IP address. On bulk-capable routes, a comma-separated list enables bulk mode with at most 10 values; request URLs are limited to 8192 characters. | [optional] |
| **lat** | **Double**| Latitude. Must be provided together with &#x60;lon&#x60;. | [optional] |
| **lon** | **Double**| Longitude. Must be provided together with &#x60;lat&#x60;. | [optional] |
| **offset** | **String**| Fixed UTC offset in &#x60;+HH:MM&#x60; or &#x60;-HH:MM&#x60; format only (&#x60;+0530&#x60; and &#x60;+5&#x60; are rejected); URL-encode &#x60;+&#x60; as &#x60;%2B&#x60;, since an unencoded &#x60;+&#x60; is read as a space. An offset target returns &#x60;timezone&#x3D;null&#x60;. On bulk-capable routes, a comma-separated list enables bulk mode with at most 10 values; request URLs are limited to 8192 characters. | [optional] |
| **autoTz** | **Boolean**| Set to &#x60;true&#x60; to resolve using the caller IP from Cloudflare headers. Counts as a selector family, so it cannot be combined with &#x60;tz&#x60;, &#x60;ip&#x60;, &#x60;lat&#x60;/&#x60;lon&#x60; or &#x60;offset&#x60;. Not supported on &#x60;/v1/time/clock&#x60;. Enabled by &#x60;true&#x60;, &#x60;1&#x60; or &#x60;yes&#x60; (case-insensitive); any other value leaves it off without an error. | [optional] |
| **format** | **String**| Custom date/time format template using supported &#x60;strftime&#x60;-style directives such as &#x60;%Y-%m-%d %H:%M:%S&#x60;. Supported directives: &#x60;%a %A %b %B %C %d %D %e %F %h %H %I %j %k %l %m %M %n %p %P %r %R %s %S %t %T %u %v %w %x %X %y %Y %z %:z %Z %%&#x60;, with the &#x60;-&#x60;, &#x60;_&#x60; and &#x60;0&#x60; padding flags on numeric directives. &#x60;%Z&#x60; prints the IANA zone name (or &#x60;UTC+HH:MM&#x60; for an offset target, &#x60;UTC&#x60; with no target), not an abbreviation. Any other directive (for example &#x60;%U&#x60;, &#x60;%f&#x60;, &#x60;%Q&#x60;) or a trailing &#x60;%&#x60; returns 400 INVALID_PARAMETER naming the directive. | [optional] |
| **week** | **Boolean**| Set to &#x60;true&#x60; to add the ISO 8601 &#x60;week_number&#x60;. Enabled by &#x60;true&#x60;, &#x60;1&#x60; or &#x60;yes&#x60; (case-insensitive); any other value leaves it off without an error. | [optional] |
| **sign** | **Boolean**| Set to &#x60;true&#x60;, &#x60;1&#x60; or &#x60;yes&#x60; (case-insensitive) to ask the gateway to sign the final JSON response. Any other value, a bare &#x60;sign&#x60;, or repeated &#x60;sign&#x60; values leave the response unsigned. Every authenticated JSON response, including errors, then includes signing headers. Not supported on &#x60;/v1/time/clock&#x60;. | [optional] |

### Return type

[**CalendarResponse**](CalendarResponse.md)

### Authorization

[apiKeyHeader](../README.md#apiKeyHeader), [bearerAuth](../README.md#bearerAuth), [apiKeyQuery](../README.md#apiKeyQuery), [rapidApiKey](../README.md#rapidApiKey), [rapidApiHost](../README.md#rapidApiHost)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Calendar payload. |  * X-Request-Id -  <br>  * X-Auth-Mode -  <br>  * X-TimeLogic-Customer-ID -  <br>  * X-TimeLogic-Plan -  <br>  * X-TimeLogic-Quota-Limit -  <br>  * X-TimeLogic-Quota-State -  <br>  * X-TimeLogic-Signature -  <br>  * X-TimeLogic-Key-Id -  <br>  * X-TimeLogic-Signature-Alg -  <br>  * X-TimeLogic-Signature-Timestamp -  <br>  * X-TimeLogic-Content-SHA256 -  <br>  * X-TimeLogic-Signature-Input -  <br>  |
| **400** | Invalid or ambiguous request parameters. |  * X-Request-Id -  <br>  |
| **401** | Missing or invalid authentication. |  -  |
| **403** | The key or customer subscription is not active. |  * X-Request-Id -  <br>  |
| **404** | Unknown route (including a trailing slash), or an &#x60;ip&#x60; selector with no timezone mapping (private, reserved and loopback addresses never resolve) - \&quot;No timezone mapping found for the supplied IP address.\&quot; |  * X-Request-Id -  <br>  |
| **429** | The plan&#39;s monthly quota is used up (&#x60;QUOTA_EXCEEDED&#x60;, \&quot;Monthly quota exceeded.\&quot;). The quota period is the UTC calendar month and resets at 00:00 UTC on the 1st; no &#x60;Retry-After&#x60; header is sent. There is no published per-second limit. |  * X-Request-Id -  <br>  * X-TimeLogic-Quota-State -  <br>  |
| **405** | Only &#x60;GET&#x60; and &#x60;HEAD&#x60; are supported (\&quot;Only GET and HEAD are supported.\&quot;), with &#x60;Allow: GET, HEAD&#x60;. &#x60;HEAD&#x60; is answered like &#x60;GET&#x60; without a body. The CORS preflight allows GET, HEAD and OPTIONS. |  * X-Request-Id -  <br>  |
| **500** | Internal server error, including signing failures. |  * X-Request-Id -  <br>  |
| **501** | A required resolver or dependency is not configured or not ready. |  * X-Request-Id -  <br>  |
| **502** | Gateway failed to forward the request to the core worker. |  * X-Request-Id -  <br>  |

<a id="getClock"></a>
# **getClock**
> String getClock(style, unix, unixMs, iso, sourceTz, sourceIp, sourceLat, sourceLon, sourceOffset, tz, ip, lat, lon, offset, format)

Render a live HTML clock

Returns an embeddable HTML clock fragment.  Input timestamp forms: - &#x60;unix&#x3D;1711300000&#x60; - &#x60;unix_ms&#x3D;1711300000000&#x60; - &#x60;iso&#x3D;2026-04-16T09:00:00Z&#x60; - &#x60;iso&#x3D;2026-04-16T09:00:00&amp;source_tz&#x3D;America/New_York&#x60;  Target selector forms: - &#x60;tz&#x3D;America/New_York&#x60; - &#x60;ip&#x3D;8.8.8.8&#x60; - &#x60;lat&#x3D;40.7128&amp;lon&#x3D;-74.0060&#x60; - &#x60;offset&#x3D;-04:00&#x60;  Incompatible combinations: - &#x60;style&#x60; is required and must be one of the 30 names in the &#x60;style&#x60; enum - at most one input timestamp form - at most one target selector family - use at most one of &#x60;source_tz&#x60;, &#x60;source_ip&#x60;, &#x60;source_lat&#x60;/&#x60;source_lon&#x60;, or &#x60;source_offset&#x60; - local-ISO companion selectors are valid only with &#x60;iso&#x3D;...&#x60; that has no explicit offset - this route is single-target only; comma-separated &#x60;tz&#x60;, &#x60;ip&#x60;, and &#x60;offset&#x60; values are rejected - &#x60;auto_tz&#x60; is not supported on this route - &#x60;sign&#x60; is not supported on this route  Examples: - Digital: &#x60;/v1/time/clock?style&#x3D;digital-dashboard&amp;iso&#x3D;2026-04-16T09:00:00&amp;source_tz&#x3D;America/New_York&amp;tz&#x3D;Europe/London&#x60; - Analog: &#x60;/v1/time/clock?style&#x3D;analog-station&amp;offset&#x3D;-04:00&#x60;

### Example
```java
// Import classes:
import com.timelogic.direct.ApiClient;
import com.timelogic.direct.ApiException;
import com.timelogic.direct.Configuration;
import com.timelogic.direct.auth.*;
import com.timelogic.direct.models.*;
import com.timelogic.direct.api.TimeApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("https://api.timelogicapi.com");

    // Configure API key authorization: apiKeyHeader
    ApiKeyAuth apiKeyHeader = (ApiKeyAuth) defaultClient.getAuthentication("apiKeyHeader");
    apiKeyHeader.setApiKey("YOUR API KEY");
    // Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
    //apiKeyHeader.setApiKeyPrefix("Token");

    // Configure HTTP bearer authorization: bearerAuth
    HttpBearerAuth bearerAuth = (HttpBearerAuth) defaultClient.getAuthentication("bearerAuth");
    bearerAuth.setBearerToken("BEARER TOKEN");

    // Configure API key authorization: apiKeyQuery
    ApiKeyAuth apiKeyQuery = (ApiKeyAuth) defaultClient.getAuthentication("apiKeyQuery");
    apiKeyQuery.setApiKey("YOUR API KEY");
    // Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
    //apiKeyQuery.setApiKeyPrefix("Token");

    // Configure API key authorization: rapidApiKey
    ApiKeyAuth rapidApiKey = (ApiKeyAuth) defaultClient.getAuthentication("rapidApiKey");
    rapidApiKey.setApiKey("YOUR API KEY");
    // Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
    //rapidApiKey.setApiKeyPrefix("Token");

    // Configure API key authorization: rapidApiHost
    ApiKeyAuth rapidApiHost = (ApiKeyAuth) defaultClient.getAuthentication("rapidApiHost");
    rapidApiHost.setApiKey("YOUR API KEY");
    // Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
    //rapidApiHost.setApiKeyPrefix("Token");

    TimeApi apiInstance = new TimeApi(defaultClient);
    String style = "analog-station"; // String | Clock style name. Valid values are enumerated here; there is no separate style discovery endpoint.
    Long unix = 1711300000L; // Long | Whole Unix seconds (fractions are rejected; negative values are allowed). Valid range is -62135596800 to 253402300799 (0001-01-01T00:00:00Z to 9999-12-31T23:59:59Z); values outside it return 400 INVALID_TIMESTAMP.
    Long unixMs = 1711300000000L; // Long | Whole Unix milliseconds. Valid range -62135596800000 to 253402300799999 (0001-01-01T00:00:00Z to 9999-12-31T23:59:59.999Z); values outside it return 400 INVALID_TIMESTAMP.
    String iso = "2024-03-24T15:00:00"; // String | ISO-8601 timestamp. To supply a local wall-clock time without an explicit offset, pair it with one of `source_tz=Area/City`, `source_ip=...`, `source_lat=...&source_lon=...`, or `source_offset=±HH:MM`; without a hint a local value is read as UTC. Accepted shapes are extended format with `Z`, `±HH:MM` or `±HH:MM:SS` (for example `1900-06-01T12:09:21+00:09:21`, as `iso_local` prints old local-mean-time offsets), optional fractional seconds, a space instead of `T`, a local time, or a date alone (read as 00:00). Basic format and offsets without a colon are rejected. The date must exist (`2027-02-29` returns 400 INVALID_TIMESTAMP rather than rolling over), and the instant must fall between 0001-01-01T00:00:00Z and 9999-12-31T23:59:59Z. A local time inside a spring-forward gap returns 400 INVALID_TIMESTAMP; an ambiguous fall-back time resolves to its first occurrence.
    String sourceTz = "America/New_York"; // String | Used only with `iso=...` when the ISO value has no explicit offset.
    String sourceIp = "8.8.8.8"; // String | Used only with `iso=...` when the ISO value has no explicit offset. Resolves that local wall-clock time through the timezone mapped from this IP address.
    Double sourceLat = 40.7128D; // Double | Used only with `iso=...` when the ISO value has no explicit offset. Provide together with `source_lon` to resolve that local wall-clock time through the timezone mapped from these coordinates.
    Double sourceLon = -74.006D; // Double | Used only with `iso=...` when the ISO value has no explicit offset. Provide together with `source_lat`.
    String sourceOffset = "-05:00"; // String | Used only with `iso=...` when the ISO value has no explicit offset. Interprets that local wall-clock time at this fixed UTC offset.
    String tz = "America/New_York"; // String | IANA timezone name, matched case-insensitively. Links and aliases resolve to their canonical zone, so the returned `timezone` can differ (`Europe/Stockholm` returns `Europe/Berlin`, `UTC` returns `Etc/UTC`). `Etc/GMT+5` is UTC-05:00 (POSIX sign). On bulk-capable routes, a comma-separated list enables bulk mode with at most 10 values (any comma, even a trailing one, returns an array); request URLs are limited to 8192 characters. On single-target routes a list is rejected as an invalid timezone.
    String ip = "8.8.8.8"; // String | IP address. On bulk-capable routes, a comma-separated list enables bulk mode with at most 10 values; request URLs are limited to 8192 characters.
    Double lat = 40.7128D; // Double | Latitude. Must be provided together with `lon`.
    Double lon = -74.006D; // Double | Longitude. Must be provided together with `lat`.
    String offset = "-04:00"; // String | Fixed UTC offset in `+HH:MM` or `-HH:MM` format only (`+0530` and `+5` are rejected); URL-encode `+` as `%2B`, since an unencoded `+` is read as a space. An offset target returns `timezone=null`. On bulk-capable routes, a comma-separated list enables bulk mode with at most 10 values; request URLs are limited to 8192 characters.
    String format = "%Y-%m-%d %H:%M:%S"; // String | Custom date/time format template using supported `strftime`-style directives such as `%Y-%m-%d %H:%M:%S`. Supported directives: `%a %A %b %B %C %d %D %e %F %h %H %I %j %k %l %m %M %n %p %P %r %R %s %S %t %T %u %v %w %x %X %y %Y %z %:z %Z %%`, with the `-`, `_` and `0` padding flags on numeric directives. `%Z` prints the IANA zone name (or `UTC+HH:MM` for an offset target, `UTC` with no target), not an abbreviation. Any other directive (for example `%U`, `%f`, `%Q`) or a trailing `%` returns 400 INVALID_PARAMETER naming the directive.
    try {
      String result = apiInstance.getClock(style, unix, unixMs, iso, sourceTz, sourceIp, sourceLat, sourceLon, sourceOffset, tz, ip, lat, lon, offset, format);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling TimeApi#getClock");
      System.err.println("Status code: " + e.getCode());
      System.err.println("Reason: " + e.getResponseBody());
      System.err.println("Response headers: " + e.getResponseHeaders());
      e.printStackTrace();
    }
  }
}
```

### Parameters

| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **style** | **String**| Clock style name. Valid values are enumerated here; there is no separate style discovery endpoint. | [enum: analog-station, analog-aviation, analog-bauhaus, analog-graphite, analog-arctic, analog-brass, analog-marine, analog-grid, analog-slate, analog-executive, digital-segment-red, digital-segment-amber, digital-segment-ice, digital-terminal-green, digital-terminal-white, digital-broadcast, digital-dashboard, digital-control-room, digital-slate, digital-onyx, digital-frost, digital-card, digital-glass, digital-matrix, digital-timetable, digital-split-flap, digital-cyan, digital-emerald, digital-monolith, digital-minimal] |
| **unix** | **Long**| Whole Unix seconds (fractions are rejected; negative values are allowed). Valid range is -62135596800 to 253402300799 (0001-01-01T00:00:00Z to 9999-12-31T23:59:59Z); values outside it return 400 INVALID_TIMESTAMP. | [optional] |
| **unixMs** | **Long**| Whole Unix milliseconds. Valid range -62135596800000 to 253402300799999 (0001-01-01T00:00:00Z to 9999-12-31T23:59:59.999Z); values outside it return 400 INVALID_TIMESTAMP. | [optional] |
| **iso** | **String**| ISO-8601 timestamp. To supply a local wall-clock time without an explicit offset, pair it with one of &#x60;source_tz&#x3D;Area/City&#x60;, &#x60;source_ip&#x3D;...&#x60;, &#x60;source_lat&#x3D;...&amp;source_lon&#x3D;...&#x60;, or &#x60;source_offset&#x3D;±HH:MM&#x60;; without a hint a local value is read as UTC. Accepted shapes are extended format with &#x60;Z&#x60;, &#x60;±HH:MM&#x60; or &#x60;±HH:MM:SS&#x60; (for example &#x60;1900-06-01T12:09:21+00:09:21&#x60;, as &#x60;iso_local&#x60; prints old local-mean-time offsets), optional fractional seconds, a space instead of &#x60;T&#x60;, a local time, or a date alone (read as 00:00). Basic format and offsets without a colon are rejected. The date must exist (&#x60;2027-02-29&#x60; returns 400 INVALID_TIMESTAMP rather than rolling over), and the instant must fall between 0001-01-01T00:00:00Z and 9999-12-31T23:59:59Z. A local time inside a spring-forward gap returns 400 INVALID_TIMESTAMP; an ambiguous fall-back time resolves to its first occurrence. | [optional] |
| **sourceTz** | **String**| Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. | [optional] |
| **sourceIp** | **String**| Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Resolves that local wall-clock time through the timezone mapped from this IP address. | [optional] |
| **sourceLat** | **Double**| Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Provide together with &#x60;source_lon&#x60; to resolve that local wall-clock time through the timezone mapped from these coordinates. | [optional] |
| **sourceLon** | **Double**| Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Provide together with &#x60;source_lat&#x60;. | [optional] |
| **sourceOffset** | **String**| Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Interprets that local wall-clock time at this fixed UTC offset. | [optional] |
| **tz** | **String**| IANA timezone name, matched case-insensitively. Links and aliases resolve to their canonical zone, so the returned &#x60;timezone&#x60; can differ (&#x60;Europe/Stockholm&#x60; returns &#x60;Europe/Berlin&#x60;, &#x60;UTC&#x60; returns &#x60;Etc/UTC&#x60;). &#x60;Etc/GMT+5&#x60; is UTC-05:00 (POSIX sign). On bulk-capable routes, a comma-separated list enables bulk mode with at most 10 values (any comma, even a trailing one, returns an array); request URLs are limited to 8192 characters. On single-target routes a list is rejected as an invalid timezone. | [optional] |
| **ip** | **String**| IP address. On bulk-capable routes, a comma-separated list enables bulk mode with at most 10 values; request URLs are limited to 8192 characters. | [optional] |
| **lat** | **Double**| Latitude. Must be provided together with &#x60;lon&#x60;. | [optional] |
| **lon** | **Double**| Longitude. Must be provided together with &#x60;lat&#x60;. | [optional] |
| **offset** | **String**| Fixed UTC offset in &#x60;+HH:MM&#x60; or &#x60;-HH:MM&#x60; format only (&#x60;+0530&#x60; and &#x60;+5&#x60; are rejected); URL-encode &#x60;+&#x60; as &#x60;%2B&#x60;, since an unencoded &#x60;+&#x60; is read as a space. An offset target returns &#x60;timezone&#x3D;null&#x60;. On bulk-capable routes, a comma-separated list enables bulk mode with at most 10 values; request URLs are limited to 8192 characters. | [optional] |
| **format** | **String**| Custom date/time format template using supported &#x60;strftime&#x60;-style directives such as &#x60;%Y-%m-%d %H:%M:%S&#x60;. Supported directives: &#x60;%a %A %b %B %C %d %D %e %F %h %H %I %j %k %l %m %M %n %p %P %r %R %s %S %t %T %u %v %w %x %X %y %Y %z %:z %Z %%&#x60;, with the &#x60;-&#x60;, &#x60;_&#x60; and &#x60;0&#x60; padding flags on numeric directives. &#x60;%Z&#x60; prints the IANA zone name (or &#x60;UTC+HH:MM&#x60; for an offset target, &#x60;UTC&#x60; with no target), not an abbreviation. Any other directive (for example &#x60;%U&#x60;, &#x60;%f&#x60;, &#x60;%Q&#x60;) or a trailing &#x60;%&#x60; returns 400 INVALID_PARAMETER naming the directive. | [optional] |

### Return type

**String**

### Authorization

[apiKeyHeader](../README.md#apiKeyHeader), [bearerAuth](../README.md#bearerAuth), [apiKeyQuery](../README.md#apiKeyQuery), [rapidApiKey](../README.md#rapidApiKey), [rapidApiHost](../README.md#rapidApiHost)

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
| **404** | Unknown route (including a trailing slash), or an &#x60;ip&#x60; selector with no timezone mapping (private, reserved and loopback addresses never resolve) - \&quot;No timezone mapping found for the supplied IP address.\&quot; |  * X-Request-Id -  <br>  |
| **429** | The plan&#39;s monthly quota is used up (&#x60;QUOTA_EXCEEDED&#x60;, \&quot;Monthly quota exceeded.\&quot;). The quota period is the UTC calendar month and resets at 00:00 UTC on the 1st; no &#x60;Retry-After&#x60; header is sent. There is no published per-second limit. |  * X-Request-Id -  <br>  * X-TimeLogic-Quota-State -  <br>  |
| **405** | Only &#x60;GET&#x60; and &#x60;HEAD&#x60; are supported (\&quot;Only GET and HEAD are supported.\&quot;), with &#x60;Allow: GET, HEAD&#x60;. &#x60;HEAD&#x60; is answered like &#x60;GET&#x60; without a body. The CORS preflight allows GET, HEAD and OPTIONS. |  * X-Request-Id -  <br>  |
| **500** | Internal server error, including signing failures. |  * X-Request-Id -  <br>  |
| **501** | A required resolver or dependency is not configured or not ready. |  * X-Request-Id -  <br>  |
| **502** | Gateway failed to forward the request to the core worker. |  * X-Request-Id -  <br>  |

<a id="getCurrentTime"></a>
# **getCurrentTime**
> GetCurrentTime200Response getCurrentTime(tz, ip, lat, lon, offset, autoTz, format, sign)

Get the current time for a target

Returns current time data for a single target, or a bulk array when exactly one of &#x60;tz&#x60;, &#x60;ip&#x60;, or &#x60;offset&#x60; is supplied as a comma-separated list.  Target selector rules: - Use at most one selector family per request: &#x60;tz&#x60;, &#x60;ip&#x60;, &#x60;lat&#x60; + &#x60;lon&#x60;, &#x60;offset&#x60;, or &#x60;auto_tz&#x3D;true&#x60;. - If no selector is provided, the response defaults to UTC with &#x60;timezone&#x3D;null&#x60; and &#x60;iso_local&#x3D;null&#x60;. - Bulk mode is available only through one comma-separated &#x60;tz&#x60;, &#x60;ip&#x60;, or &#x60;offset&#x60; selector, accepts at most 10 values, and cannot be combined with any other selector.  Example: - Single target: &#x60;/v1/time/current?tz&#x3D;America/New_York&#x60; - For bulk, provide one comma-separated &#x60;tz&#x60;, &#x60;ip&#x60;, or &#x60;offset&#x60; value, for example &#x60;/v1/time/current?tz&#x3D;America/New_York,Europe/London,Asia/Tokyo&#x60;.

### Example
```java
// Import classes:
import com.timelogic.direct.ApiClient;
import com.timelogic.direct.ApiException;
import com.timelogic.direct.Configuration;
import com.timelogic.direct.auth.*;
import com.timelogic.direct.models.*;
import com.timelogic.direct.api.TimeApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("https://api.timelogicapi.com");

    // Configure API key authorization: apiKeyHeader
    ApiKeyAuth apiKeyHeader = (ApiKeyAuth) defaultClient.getAuthentication("apiKeyHeader");
    apiKeyHeader.setApiKey("YOUR API KEY");
    // Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
    //apiKeyHeader.setApiKeyPrefix("Token");

    // Configure HTTP bearer authorization: bearerAuth
    HttpBearerAuth bearerAuth = (HttpBearerAuth) defaultClient.getAuthentication("bearerAuth");
    bearerAuth.setBearerToken("BEARER TOKEN");

    // Configure API key authorization: apiKeyQuery
    ApiKeyAuth apiKeyQuery = (ApiKeyAuth) defaultClient.getAuthentication("apiKeyQuery");
    apiKeyQuery.setApiKey("YOUR API KEY");
    // Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
    //apiKeyQuery.setApiKeyPrefix("Token");

    // Configure API key authorization: rapidApiKey
    ApiKeyAuth rapidApiKey = (ApiKeyAuth) defaultClient.getAuthentication("rapidApiKey");
    rapidApiKey.setApiKey("YOUR API KEY");
    // Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
    //rapidApiKey.setApiKeyPrefix("Token");

    // Configure API key authorization: rapidApiHost
    ApiKeyAuth rapidApiHost = (ApiKeyAuth) defaultClient.getAuthentication("rapidApiHost");
    rapidApiHost.setApiKey("YOUR API KEY");
    // Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
    //rapidApiHost.setApiKeyPrefix("Token");

    TimeApi apiInstance = new TimeApi(defaultClient);
    String tz = "America/New_York"; // String | IANA timezone name, matched case-insensitively. Links and aliases resolve to their canonical zone, so the returned `timezone` can differ (`Europe/Stockholm` returns `Europe/Berlin`, `UTC` returns `Etc/UTC`). `Etc/GMT+5` is UTC-05:00 (POSIX sign). On bulk-capable routes, a comma-separated list enables bulk mode with at most 10 values (any comma, even a trailing one, returns an array); request URLs are limited to 8192 characters. On single-target routes a list is rejected as an invalid timezone.
    String ip = "8.8.8.8"; // String | IP address. On bulk-capable routes, a comma-separated list enables bulk mode with at most 10 values; request URLs are limited to 8192 characters.
    Double lat = 40.7128D; // Double | Latitude. Must be provided together with `lon`.
    Double lon = -74.006D; // Double | Longitude. Must be provided together with `lat`.
    String offset = "-04:00"; // String | Fixed UTC offset in `+HH:MM` or `-HH:MM` format only (`+0530` and `+5` are rejected); URL-encode `+` as `%2B`, since an unencoded `+` is read as a space. An offset target returns `timezone=null`. On bulk-capable routes, a comma-separated list enables bulk mode with at most 10 values; request URLs are limited to 8192 characters.
    Boolean autoTz = true; // Boolean | Set to `true` to resolve using the caller IP from Cloudflare headers. Counts as a selector family, so it cannot be combined with `tz`, `ip`, `lat`/`lon` or `offset`. Not supported on `/v1/time/clock`. Enabled by `true`, `1` or `yes` (case-insensitive); any other value leaves it off without an error.
    String format = "%Y-%m-%d %H:%M:%S"; // String | Custom date/time format template using supported `strftime`-style directives such as `%Y-%m-%d %H:%M:%S`. Supported directives: `%a %A %b %B %C %d %D %e %F %h %H %I %j %k %l %m %M %n %p %P %r %R %s %S %t %T %u %v %w %x %X %y %Y %z %:z %Z %%`, with the `-`, `_` and `0` padding flags on numeric directives. `%Z` prints the IANA zone name (or `UTC+HH:MM` for an offset target, `UTC` with no target), not an abbreviation. Any other directive (for example `%U`, `%f`, `%Q`) or a trailing `%` returns 400 INVALID_PARAMETER naming the directive.
    Boolean sign = true; // Boolean | Set to `true`, `1` or `yes` (case-insensitive) to ask the gateway to sign the final JSON response. Any other value, a bare `sign`, or repeated `sign` values leave the response unsigned. Every authenticated JSON response, including errors, then includes signing headers. Not supported on `/v1/time/clock`.
    try {
      GetCurrentTime200Response result = apiInstance.getCurrentTime(tz, ip, lat, lon, offset, autoTz, format, sign);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling TimeApi#getCurrentTime");
      System.err.println("Status code: " + e.getCode());
      System.err.println("Reason: " + e.getResponseBody());
      System.err.println("Response headers: " + e.getResponseHeaders());
      e.printStackTrace();
    }
  }
}
```

### Parameters

| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **tz** | **String**| IANA timezone name, matched case-insensitively. Links and aliases resolve to their canonical zone, so the returned &#x60;timezone&#x60; can differ (&#x60;Europe/Stockholm&#x60; returns &#x60;Europe/Berlin&#x60;, &#x60;UTC&#x60; returns &#x60;Etc/UTC&#x60;). &#x60;Etc/GMT+5&#x60; is UTC-05:00 (POSIX sign). On bulk-capable routes, a comma-separated list enables bulk mode with at most 10 values (any comma, even a trailing one, returns an array); request URLs are limited to 8192 characters. On single-target routes a list is rejected as an invalid timezone. | [optional] |
| **ip** | **String**| IP address. On bulk-capable routes, a comma-separated list enables bulk mode with at most 10 values; request URLs are limited to 8192 characters. | [optional] |
| **lat** | **Double**| Latitude. Must be provided together with &#x60;lon&#x60;. | [optional] |
| **lon** | **Double**| Longitude. Must be provided together with &#x60;lat&#x60;. | [optional] |
| **offset** | **String**| Fixed UTC offset in &#x60;+HH:MM&#x60; or &#x60;-HH:MM&#x60; format only (&#x60;+0530&#x60; and &#x60;+5&#x60; are rejected); URL-encode &#x60;+&#x60; as &#x60;%2B&#x60;, since an unencoded &#x60;+&#x60; is read as a space. An offset target returns &#x60;timezone&#x3D;null&#x60;. On bulk-capable routes, a comma-separated list enables bulk mode with at most 10 values; request URLs are limited to 8192 characters. | [optional] |
| **autoTz** | **Boolean**| Set to &#x60;true&#x60; to resolve using the caller IP from Cloudflare headers. Counts as a selector family, so it cannot be combined with &#x60;tz&#x60;, &#x60;ip&#x60;, &#x60;lat&#x60;/&#x60;lon&#x60; or &#x60;offset&#x60;. Not supported on &#x60;/v1/time/clock&#x60;. Enabled by &#x60;true&#x60;, &#x60;1&#x60; or &#x60;yes&#x60; (case-insensitive); any other value leaves it off without an error. | [optional] |
| **format** | **String**| Custom date/time format template using supported &#x60;strftime&#x60;-style directives such as &#x60;%Y-%m-%d %H:%M:%S&#x60;. Supported directives: &#x60;%a %A %b %B %C %d %D %e %F %h %H %I %j %k %l %m %M %n %p %P %r %R %s %S %t %T %u %v %w %x %X %y %Y %z %:z %Z %%&#x60;, with the &#x60;-&#x60;, &#x60;_&#x60; and &#x60;0&#x60; padding flags on numeric directives. &#x60;%Z&#x60; prints the IANA zone name (or &#x60;UTC+HH:MM&#x60; for an offset target, &#x60;UTC&#x60; with no target), not an abbreviation. Any other directive (for example &#x60;%U&#x60;, &#x60;%f&#x60;, &#x60;%Q&#x60;) or a trailing &#x60;%&#x60; returns 400 INVALID_PARAMETER naming the directive. | [optional] |
| **sign** | **Boolean**| Set to &#x60;true&#x60;, &#x60;1&#x60; or &#x60;yes&#x60; (case-insensitive) to ask the gateway to sign the final JSON response. Any other value, a bare &#x60;sign&#x60;, or repeated &#x60;sign&#x60; values leave the response unsigned. Every authenticated JSON response, including errors, then includes signing headers. Not supported on &#x60;/v1/time/clock&#x60;. | [optional] |

### Return type

[**GetCurrentTime200Response**](GetCurrentTime200Response.md)

### Authorization

[apiKeyHeader](../README.md#apiKeyHeader), [bearerAuth](../README.md#bearerAuth), [apiKeyQuery](../README.md#apiKeyQuery), [rapidApiKey](../README.md#rapidApiKey), [rapidApiHost](../README.md#rapidApiHost)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Current time payload or bulk array. |  * X-Request-Id -  <br>  * X-Auth-Mode -  <br>  * X-TimeLogic-Customer-ID -  <br>  * X-TimeLogic-Plan -  <br>  * X-TimeLogic-Quota-Limit -  <br>  * X-TimeLogic-Quota-State -  <br>  * X-TimeLogic-Signature -  <br>  * X-TimeLogic-Key-Id -  <br>  * X-TimeLogic-Signature-Alg -  <br>  * X-TimeLogic-Signature-Timestamp -  <br>  * X-TimeLogic-Content-SHA256 -  <br>  * X-TimeLogic-Signature-Input -  <br>  |
| **400** | Invalid or ambiguous request parameters. |  * X-Request-Id -  <br>  |
| **401** | Missing or invalid authentication. |  -  |
| **403** | The key or customer subscription is not active. |  * X-Request-Id -  <br>  |
| **404** | Unknown route (including a trailing slash), or an &#x60;ip&#x60; selector with no timezone mapping (private, reserved and loopback addresses never resolve) - \&quot;No timezone mapping found for the supplied IP address.\&quot; |  * X-Request-Id -  <br>  |
| **429** | The plan&#39;s monthly quota is used up (&#x60;QUOTA_EXCEEDED&#x60;, \&quot;Monthly quota exceeded.\&quot;). The quota period is the UTC calendar month and resets at 00:00 UTC on the 1st; no &#x60;Retry-After&#x60; header is sent. There is no published per-second limit. |  * X-Request-Id -  <br>  * X-TimeLogic-Quota-State -  <br>  |
| **405** | Only &#x60;GET&#x60; and &#x60;HEAD&#x60; are supported (\&quot;Only GET and HEAD are supported.\&quot;), with &#x60;Allow: GET, HEAD&#x60;. &#x60;HEAD&#x60; is answered like &#x60;GET&#x60; without a body. The CORS preflight allows GET, HEAD and OPTIONS. |  * X-Request-Id -  <br>  |
| **500** | Internal server error, including signing failures. |  * X-Request-Id -  <br>  |
| **501** | A required resolver or dependency is not configured or not ready. |  * X-Request-Id -  <br>  |
| **502** | Gateway failed to forward the request to the core worker. |  * X-Request-Id -  <br>  |

<a id="getDst"></a>
# **getDst**
> DstResponse getDst(tz, ip, lat, lon, offset, autoTz, format, next, sign)

Daylight-saving status for a target

Returns daylight-saving status for the selected target.  Target selector rules: - Use at most one selector family: &#x60;tz&#x60;, &#x60;ip&#x60;, &#x60;lat&#x60; + &#x60;lon&#x60;, &#x60;offset&#x60;, or &#x60;auto_tz&#x3D;true&#x60;. - If no selector is provided, the response defaults to UTC. - Bulk is not supported on this route. - &#x60;next&#x3D;true&#x60; adds &#x60;next_transition&#x60; when the resolver provides a transition timestamp.  Example: - &#x60;/v1/time/dst?tz&#x3D;America/New_York&amp;next&#x3D;true&#x60;

### Example
```java
// Import classes:
import com.timelogic.direct.ApiClient;
import com.timelogic.direct.ApiException;
import com.timelogic.direct.Configuration;
import com.timelogic.direct.auth.*;
import com.timelogic.direct.models.*;
import com.timelogic.direct.api.TimeApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("https://api.timelogicapi.com");

    // Configure API key authorization: apiKeyHeader
    ApiKeyAuth apiKeyHeader = (ApiKeyAuth) defaultClient.getAuthentication("apiKeyHeader");
    apiKeyHeader.setApiKey("YOUR API KEY");
    // Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
    //apiKeyHeader.setApiKeyPrefix("Token");

    // Configure HTTP bearer authorization: bearerAuth
    HttpBearerAuth bearerAuth = (HttpBearerAuth) defaultClient.getAuthentication("bearerAuth");
    bearerAuth.setBearerToken("BEARER TOKEN");

    // Configure API key authorization: apiKeyQuery
    ApiKeyAuth apiKeyQuery = (ApiKeyAuth) defaultClient.getAuthentication("apiKeyQuery");
    apiKeyQuery.setApiKey("YOUR API KEY");
    // Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
    //apiKeyQuery.setApiKeyPrefix("Token");

    // Configure API key authorization: rapidApiKey
    ApiKeyAuth rapidApiKey = (ApiKeyAuth) defaultClient.getAuthentication("rapidApiKey");
    rapidApiKey.setApiKey("YOUR API KEY");
    // Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
    //rapidApiKey.setApiKeyPrefix("Token");

    // Configure API key authorization: rapidApiHost
    ApiKeyAuth rapidApiHost = (ApiKeyAuth) defaultClient.getAuthentication("rapidApiHost");
    rapidApiHost.setApiKey("YOUR API KEY");
    // Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
    //rapidApiHost.setApiKeyPrefix("Token");

    TimeApi apiInstance = new TimeApi(defaultClient);
    String tz = "America/New_York"; // String | IANA timezone name, matched case-insensitively. Links and aliases resolve to their canonical zone, so the returned `timezone` can differ (`Europe/Stockholm` returns `Europe/Berlin`, `UTC` returns `Etc/UTC`). `Etc/GMT+5` is UTC-05:00 (POSIX sign). On bulk-capable routes, a comma-separated list enables bulk mode with at most 10 values (any comma, even a trailing one, returns an array); request URLs are limited to 8192 characters. On single-target routes a list is rejected as an invalid timezone.
    String ip = "8.8.8.8"; // String | IP address. On bulk-capable routes, a comma-separated list enables bulk mode with at most 10 values; request URLs are limited to 8192 characters.
    Double lat = 40.7128D; // Double | Latitude. Must be provided together with `lon`.
    Double lon = -74.006D; // Double | Longitude. Must be provided together with `lat`.
    String offset = "-04:00"; // String | Fixed UTC offset in `+HH:MM` or `-HH:MM` format only (`+0530` and `+5` are rejected); URL-encode `+` as `%2B`, since an unencoded `+` is read as a space. An offset target returns `timezone=null`. On bulk-capable routes, a comma-separated list enables bulk mode with at most 10 values; request URLs are limited to 8192 characters.
    Boolean autoTz = true; // Boolean | Set to `true` to resolve using the caller IP from Cloudflare headers. Counts as a selector family, so it cannot be combined with `tz`, `ip`, `lat`/`lon` or `offset`. Not supported on `/v1/time/clock`. Enabled by `true`, `1` or `yes` (case-insensitive); any other value leaves it off without an error.
    String format = "%Y-%m-%d %H:%M:%S"; // String | Custom date/time format template using supported `strftime`-style directives such as `%Y-%m-%d %H:%M:%S`. Supported directives: `%a %A %b %B %C %d %D %e %F %h %H %I %j %k %l %m %M %n %p %P %r %R %s %S %t %T %u %v %w %x %X %y %Y %z %:z %Z %%`, with the `-`, `_` and `0` padding flags on numeric directives. `%Z` prints the IANA zone name (or `UTC+HH:MM` for an offset target, `UTC` with no target), not an abbreviation. Any other directive (for example `%U`, `%f`, `%Q`) or a trailing `%` returns 400 INVALID_PARAMETER naming the directive.
    Boolean next = true; // Boolean | Set to `true` to add `next_transition` (the next UTC offset change, or null). Enabled by `true`, `1` or `yes` (case-insensitive); any other value leaves it off without an error.
    Boolean sign = true; // Boolean | Set to `true`, `1` or `yes` (case-insensitive) to ask the gateway to sign the final JSON response. Any other value, a bare `sign`, or repeated `sign` values leave the response unsigned. Every authenticated JSON response, including errors, then includes signing headers. Not supported on `/v1/time/clock`.
    try {
      DstResponse result = apiInstance.getDst(tz, ip, lat, lon, offset, autoTz, format, next, sign);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling TimeApi#getDst");
      System.err.println("Status code: " + e.getCode());
      System.err.println("Reason: " + e.getResponseBody());
      System.err.println("Response headers: " + e.getResponseHeaders());
      e.printStackTrace();
    }
  }
}
```

### Parameters

| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **tz** | **String**| IANA timezone name, matched case-insensitively. Links and aliases resolve to their canonical zone, so the returned &#x60;timezone&#x60; can differ (&#x60;Europe/Stockholm&#x60; returns &#x60;Europe/Berlin&#x60;, &#x60;UTC&#x60; returns &#x60;Etc/UTC&#x60;). &#x60;Etc/GMT+5&#x60; is UTC-05:00 (POSIX sign). On bulk-capable routes, a comma-separated list enables bulk mode with at most 10 values (any comma, even a trailing one, returns an array); request URLs are limited to 8192 characters. On single-target routes a list is rejected as an invalid timezone. | [optional] |
| **ip** | **String**| IP address. On bulk-capable routes, a comma-separated list enables bulk mode with at most 10 values; request URLs are limited to 8192 characters. | [optional] |
| **lat** | **Double**| Latitude. Must be provided together with &#x60;lon&#x60;. | [optional] |
| **lon** | **Double**| Longitude. Must be provided together with &#x60;lat&#x60;. | [optional] |
| **offset** | **String**| Fixed UTC offset in &#x60;+HH:MM&#x60; or &#x60;-HH:MM&#x60; format only (&#x60;+0530&#x60; and &#x60;+5&#x60; are rejected); URL-encode &#x60;+&#x60; as &#x60;%2B&#x60;, since an unencoded &#x60;+&#x60; is read as a space. An offset target returns &#x60;timezone&#x3D;null&#x60;. On bulk-capable routes, a comma-separated list enables bulk mode with at most 10 values; request URLs are limited to 8192 characters. | [optional] |
| **autoTz** | **Boolean**| Set to &#x60;true&#x60; to resolve using the caller IP from Cloudflare headers. Counts as a selector family, so it cannot be combined with &#x60;tz&#x60;, &#x60;ip&#x60;, &#x60;lat&#x60;/&#x60;lon&#x60; or &#x60;offset&#x60;. Not supported on &#x60;/v1/time/clock&#x60;. Enabled by &#x60;true&#x60;, &#x60;1&#x60; or &#x60;yes&#x60; (case-insensitive); any other value leaves it off without an error. | [optional] |
| **format** | **String**| Custom date/time format template using supported &#x60;strftime&#x60;-style directives such as &#x60;%Y-%m-%d %H:%M:%S&#x60;. Supported directives: &#x60;%a %A %b %B %C %d %D %e %F %h %H %I %j %k %l %m %M %n %p %P %r %R %s %S %t %T %u %v %w %x %X %y %Y %z %:z %Z %%&#x60;, with the &#x60;-&#x60;, &#x60;_&#x60; and &#x60;0&#x60; padding flags on numeric directives. &#x60;%Z&#x60; prints the IANA zone name (or &#x60;UTC+HH:MM&#x60; for an offset target, &#x60;UTC&#x60; with no target), not an abbreviation. Any other directive (for example &#x60;%U&#x60;, &#x60;%f&#x60;, &#x60;%Q&#x60;) or a trailing &#x60;%&#x60; returns 400 INVALID_PARAMETER naming the directive. | [optional] |
| **next** | **Boolean**| Set to &#x60;true&#x60; to add &#x60;next_transition&#x60; (the next UTC offset change, or null). Enabled by &#x60;true&#x60;, &#x60;1&#x60; or &#x60;yes&#x60; (case-insensitive); any other value leaves it off without an error. | [optional] |
| **sign** | **Boolean**| Set to &#x60;true&#x60;, &#x60;1&#x60; or &#x60;yes&#x60; (case-insensitive) to ask the gateway to sign the final JSON response. Any other value, a bare &#x60;sign&#x60;, or repeated &#x60;sign&#x60; values leave the response unsigned. Every authenticated JSON response, including errors, then includes signing headers. Not supported on &#x60;/v1/time/clock&#x60;. | [optional] |

### Return type

[**DstResponse**](DstResponse.md)

### Authorization

[apiKeyHeader](../README.md#apiKeyHeader), [bearerAuth](../README.md#bearerAuth), [apiKeyQuery](../README.md#apiKeyQuery), [rapidApiKey](../README.md#rapidApiKey), [rapidApiHost](../README.md#rapidApiHost)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | DST payload. |  * X-Request-Id -  <br>  * X-Auth-Mode -  <br>  * X-TimeLogic-Customer-ID -  <br>  * X-TimeLogic-Plan -  <br>  * X-TimeLogic-Quota-Limit -  <br>  * X-TimeLogic-Quota-State -  <br>  * X-TimeLogic-Signature -  <br>  * X-TimeLogic-Key-Id -  <br>  * X-TimeLogic-Signature-Alg -  <br>  * X-TimeLogic-Signature-Timestamp -  <br>  * X-TimeLogic-Content-SHA256 -  <br>  * X-TimeLogic-Signature-Input -  <br>  |
| **400** | Invalid or ambiguous request parameters. |  * X-Request-Id -  <br>  |
| **401** | Missing or invalid authentication. |  -  |
| **403** | The key or customer subscription is not active. |  * X-Request-Id -  <br>  |
| **404** | Unknown route (including a trailing slash), or an &#x60;ip&#x60; selector with no timezone mapping (private, reserved and loopback addresses never resolve) - \&quot;No timezone mapping found for the supplied IP address.\&quot; |  * X-Request-Id -  <br>  |
| **429** | The plan&#39;s monthly quota is used up (&#x60;QUOTA_EXCEEDED&#x60;, \&quot;Monthly quota exceeded.\&quot;). The quota period is the UTC calendar month and resets at 00:00 UTC on the 1st; no &#x60;Retry-After&#x60; header is sent. There is no published per-second limit. |  * X-Request-Id -  <br>  * X-TimeLogic-Quota-State -  <br>  |
| **405** | Only &#x60;GET&#x60; and &#x60;HEAD&#x60; are supported (\&quot;Only GET and HEAD are supported.\&quot;), with &#x60;Allow: GET, HEAD&#x60;. &#x60;HEAD&#x60; is answered like &#x60;GET&#x60; without a body. The CORS preflight allows GET, HEAD and OPTIONS. |  * X-Request-Id -  <br>  |
| **500** | Internal server error, including signing failures. |  * X-Request-Id -  <br>  |
| **501** | A required resolver or dependency is not configured or not ready. |  * X-Request-Id -  <br>  |
| **502** | Gateway failed to forward the request to the core worker. |  * X-Request-Id -  <br>  |

<a id="getElapsed"></a>
# **getElapsed**
> ElapsedResponse getElapsed(unix, unixMs, iso, sourceTz, sourceIp, sourceLat, sourceLon, sourceOffset, compareUnix, compareUnixMs, compareIso, compareSourceTz, compareSourceIp, compareSourceLat, compareSourceLon, compareSourceOffset, tz, ip, lat, lon, offset, autoTz, format, businessDays, holidayCountry, holidaySubdivision, sign)

Time elapsed since or remaining until a reference instant

Computes elapsed or remaining duration relative to one required reference timestamp.  Reference timestamp forms: - &#x60;unix&#x3D;1711300000&#x60; - &#x60;unix_ms&#x3D;1711300000000&#x60; - &#x60;iso&#x3D;2026-04-16T09:00:00Z&#x60; - &#x60;iso&#x3D;2026-04-16T09:00:00&amp;source_tz&#x3D;America/New_York&#x60; - &#x60;iso&#x3D;2026-04-16T09:00:00&amp;source_ip&#x3D;8.8.8.8&#x60; - &#x60;iso&#x3D;2026-04-16T09:00:00&amp;source_lat&#x3D;40.7128&amp;source_lon&#x3D;-74.0060&#x60; - &#x60;iso&#x3D;2026-04-16T09:00:00&amp;source_offset&#x3D;-05:00&#x60;  Compare timestamp forms: - &#x60;compare_unix&#x3D;1711213600&#x60; - &#x60;compare_unix_ms&#x3D;1711213600000&#x60; - &#x60;compare_iso&#x3D;2026-04-16T09:00:00Z&#x60; - &#x60;compare_iso&#x3D;2026-04-16T09:00:00&amp;compare_source_tz&#x3D;Europe/London&#x60; - &#x60;compare_iso&#x3D;2026-04-16T09:00:00&amp;compare_source_ip&#x3D;8.8.8.8&#x60; - &#x60;compare_iso&#x3D;2026-04-16T09:00:00&amp;compare_source_lat&#x3D;40.7128&amp;compare_source_lon&#x3D;-74.0060&#x60; - &#x60;compare_iso&#x3D;2026-04-16T09:00:00&amp;compare_source_offset&#x3D;-05:00&#x60;  Compare selector forms: - &#x60;tz&#x3D;America/New_York&#x60; - &#x60;ip&#x3D;8.8.8.8&#x60; - &#x60;lat&#x3D;40.7128&amp;lon&#x3D;-74.0060&#x60; - &#x60;offset&#x3D;-04:00&#x60; - &#x60;auto_tz&#x3D;true&#x60;  Incompatible combinations: - exactly one reference timestamp form - use either one compare timestamp form or one compare selector family, not both - use at most one of &#x60;source_tz&#x60;, &#x60;source_ip&#x60;, &#x60;source_lat&#x60;/&#x60;source_lon&#x60;, or &#x60;source_offset&#x60; - use at most one of &#x60;compare_source_tz&#x60;, &#x60;compare_source_ip&#x60;, &#x60;compare_source_lat&#x60;/&#x60;compare_source_lon&#x60;, or &#x60;compare_source_offset&#x60; - local-ISO companion selectors are valid only with &#x60;iso&#x3D;...&#x60; that has no explicit offset - compare local-ISO companion selectors are valid only with &#x60;compare_iso&#x3D;...&#x60; that has no explicit offset - if no compare input is provided, the comparison defaults to the request time - compare selectors (&#x60;tz&#x60;, &#x60;ip&#x60;, &#x60;lat&#x60;/&#x60;lon&#x60;, &#x60;offset&#x60;, &#x60;auto_tz&#x60;) all mean the current request time, which is the same instant in every zone, so they do not change the result - equal instants return &#x60;seconds: 0&#x60; with &#x60;direction: passed&#x60; (diff returns &#x60;same&#x60;)  Business-day rules: - &#x60;holiday_country&#x60; and &#x60;holiday_subdivision&#x60; require &#x60;business_days&#x3D;true&#x60; - &#x60;holiday_subdivision&#x60; also requires &#x60;holiday_country&#x60; - same counting rules as diff; the reference date uses its &#x60;source_*&#x60; zone and the compare date its &#x60;compare_source_*&#x60; zone when given, otherwise UTC - weekends follow the holiday calendar&#39;s country (Friday/Saturday for &#x60;SA&#x60;); a subdivision uses its country&#39;s weekend - example with a subdivision: &#x60;iso&#x3D;2026-01-02T00:00:00Z&amp;compare_iso&#x3D;2026-04-30T00:00:00Z&amp;business_days&#x3D;true&amp;holiday_country&#x3D;IN-MH&#x60; returns &#x60;business_days: 76&#x60; - example with a Friday/Saturday weekend: the same range with &#x60;holiday_country&#x3D;SA&#x60; returns &#x60;business_days: 79&#x60;  Examples: - Timestamp-to-timestamp: &#x60;/v1/time/elapsed?iso&#x3D;2026-04-16T09:00:00&amp;source_tz&#x3D;America/New_York&amp;compare_iso&#x3D;2026-04-16T09:00:00&amp;compare_source_tz&#x3D;Europe/London&#x60; - Timestamp-to-selector: &#x60;/v1/time/elapsed?unix&#x3D;1711300000&amp;tz&#x3D;America/New_York&amp;business_days&#x3D;true&#x60;

### Example
```java
// Import classes:
import com.timelogic.direct.ApiClient;
import com.timelogic.direct.ApiException;
import com.timelogic.direct.Configuration;
import com.timelogic.direct.auth.*;
import com.timelogic.direct.models.*;
import com.timelogic.direct.api.TimeApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("https://api.timelogicapi.com");

    // Configure API key authorization: apiKeyHeader
    ApiKeyAuth apiKeyHeader = (ApiKeyAuth) defaultClient.getAuthentication("apiKeyHeader");
    apiKeyHeader.setApiKey("YOUR API KEY");
    // Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
    //apiKeyHeader.setApiKeyPrefix("Token");

    // Configure HTTP bearer authorization: bearerAuth
    HttpBearerAuth bearerAuth = (HttpBearerAuth) defaultClient.getAuthentication("bearerAuth");
    bearerAuth.setBearerToken("BEARER TOKEN");

    // Configure API key authorization: apiKeyQuery
    ApiKeyAuth apiKeyQuery = (ApiKeyAuth) defaultClient.getAuthentication("apiKeyQuery");
    apiKeyQuery.setApiKey("YOUR API KEY");
    // Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
    //apiKeyQuery.setApiKeyPrefix("Token");

    // Configure API key authorization: rapidApiKey
    ApiKeyAuth rapidApiKey = (ApiKeyAuth) defaultClient.getAuthentication("rapidApiKey");
    rapidApiKey.setApiKey("YOUR API KEY");
    // Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
    //rapidApiKey.setApiKeyPrefix("Token");

    // Configure API key authorization: rapidApiHost
    ApiKeyAuth rapidApiHost = (ApiKeyAuth) defaultClient.getAuthentication("rapidApiHost");
    rapidApiHost.setApiKey("YOUR API KEY");
    // Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
    //rapidApiHost.setApiKeyPrefix("Token");

    TimeApi apiInstance = new TimeApi(defaultClient);
    Long unix = 1711300000L; // Long | Whole Unix seconds (fractions are rejected; negative values are allowed). Valid range is -62135596800 to 253402300799 (0001-01-01T00:00:00Z to 9999-12-31T23:59:59Z); values outside it return 400 INVALID_TIMESTAMP.
    Long unixMs = 1711300000000L; // Long | Whole Unix milliseconds. Valid range -62135596800000 to 253402300799999 (0001-01-01T00:00:00Z to 9999-12-31T23:59:59.999Z); values outside it return 400 INVALID_TIMESTAMP.
    String iso = "2024-03-24T15:00:00"; // String | ISO-8601 timestamp. To supply a local wall-clock time without an explicit offset, pair it with one of `source_tz=Area/City`, `source_ip=...`, `source_lat=...&source_lon=...`, or `source_offset=±HH:MM`; without a hint a local value is read as UTC. Accepted shapes are extended format with `Z`, `±HH:MM` or `±HH:MM:SS` (for example `1900-06-01T12:09:21+00:09:21`, as `iso_local` prints old local-mean-time offsets), optional fractional seconds, a space instead of `T`, a local time, or a date alone (read as 00:00). Basic format and offsets without a colon are rejected. The date must exist (`2027-02-29` returns 400 INVALID_TIMESTAMP rather than rolling over), and the instant must fall between 0001-01-01T00:00:00Z and 9999-12-31T23:59:59Z. A local time inside a spring-forward gap returns 400 INVALID_TIMESTAMP; an ambiguous fall-back time resolves to its first occurrence.
    String sourceTz = "America/New_York"; // String | Used only with `iso=...` when the ISO value has no explicit offset.
    String sourceIp = "8.8.8.8"; // String | Used only with `iso=...` when the ISO value has no explicit offset. Resolves that local wall-clock time through the timezone mapped from this IP address.
    Double sourceLat = 40.7128D; // Double | Used only with `iso=...` when the ISO value has no explicit offset. Provide together with `source_lon` to resolve that local wall-clock time through the timezone mapped from these coordinates.
    Double sourceLon = -74.006D; // Double | Used only with `iso=...` when the ISO value has no explicit offset. Provide together with `source_lat`.
    String sourceOffset = "-05:00"; // String | Used only with `iso=...` when the ISO value has no explicit offset. Interprets that local wall-clock time at this fixed UTC offset.
    Long compareUnix = 1711213600L; // Long |
    Long compareUnixMs = 1711213600000L; // Long |
    String compareIso = "2024-03-23T15:00:00"; // String | ISO-8601 comparison timestamp. To supply a local wall-clock time without an explicit offset, pair it with one of `compare_source_tz=Area/City`, `compare_source_ip=...`, `compare_source_lat=...&compare_source_lon=...`, or `compare_source_offset=±HH:MM`.
    String compareSourceTz = "America/New_York"; // String | Used only with `compare_iso=...` when the ISO value has no explicit offset.
    String compareSourceIp = "8.8.8.8"; // String | Used only with `compare_iso=...` when the ISO value has no explicit offset. Resolves that local wall-clock time through the timezone mapped from this IP address.
    Double compareSourceLat = 40.7128D; // Double | Used only with `compare_iso=...` when the ISO value has no explicit offset. Provide together with `compare_source_lon` to resolve that local wall-clock time through the timezone mapped from these coordinates.
    Double compareSourceLon = -74.006D; // Double | Used only with `compare_iso=...` when the ISO value has no explicit offset. Provide together with `compare_source_lat`.
    String compareSourceOffset = "-05:00"; // String | Used only with `compare_iso=...` when the ISO value has no explicit offset. Interprets that local wall-clock time at this fixed UTC offset.
    String tz = "America/New_York"; // String | IANA timezone name, matched case-insensitively. Links and aliases resolve to their canonical zone, so the returned `timezone` can differ (`Europe/Stockholm` returns `Europe/Berlin`, `UTC` returns `Etc/UTC`). `Etc/GMT+5` is UTC-05:00 (POSIX sign). On bulk-capable routes, a comma-separated list enables bulk mode with at most 10 values (any comma, even a trailing one, returns an array); request URLs are limited to 8192 characters. On single-target routes a list is rejected as an invalid timezone.
    String ip = "8.8.8.8"; // String | IP address. On bulk-capable routes, a comma-separated list enables bulk mode with at most 10 values; request URLs are limited to 8192 characters.
    Double lat = 40.7128D; // Double | Latitude. Must be provided together with `lon`.
    Double lon = -74.006D; // Double | Longitude. Must be provided together with `lat`.
    String offset = "-04:00"; // String | Fixed UTC offset in `+HH:MM` or `-HH:MM` format only (`+0530` and `+5` are rejected); URL-encode `+` as `%2B`, since an unencoded `+` is read as a space. An offset target returns `timezone=null`. On bulk-capable routes, a comma-separated list enables bulk mode with at most 10 values; request URLs are limited to 8192 characters.
    Boolean autoTz = true; // Boolean | Set to `true` to resolve using the caller IP from Cloudflare headers. Counts as a selector family, so it cannot be combined with `tz`, `ip`, `lat`/`lon` or `offset`. Not supported on `/v1/time/clock`. Enabled by `true`, `1` or `yes` (case-insensitive); any other value leaves it off without an error.
    String format = "%daysd %hoursh %minutesm %secondss"; // String | Custom duration format template using `%days`, `%hours`, `%minutes`, and `%seconds`. Each placeholder is the total duration in that unit, not a remainder (118 days renders `%days days %hours hours` as `118 days 2832 hours`).
    Boolean businessDays = true; // Boolean | Set to `true` to add a `business_days` count. Days are counted by calendar date, start included and end excluded, unsigned; weekends follow the holiday calendar's country (Saturday/Sunday in 221 countries, Friday/Saturday in 18 such as SA, Sunday only in 8, Friday only in IR, Friday/Sunday in BN; Saturday/Sunday when no `holiday_country` is given) and holidays of the chosen calendar are skipped. Each endpoint's date is taken in its own zone when one is known (diff - from_*_/to_* hints or a tz=/ip=/offset= specifier; elapsed - source_*_/compare_source_*), otherwise in UTC. Enabled by `true`, `1` or `yes` (case-insensitive); any other value leaves it off without an error.
    String holidayCountry = "US"; // String | Holiday calendar: one of the 249 countries with holiday calendars (862 calendars including subdivisions, years 1900-2100), as an ISO 3166-1 alpha-2 code in any letter case, or a combined ISO 3166-2 style code such as `CH-ZH`, `US-CA` or `FR-6AE`. Requires `business_days=true`. The full list is at https://timelogicapi.com/docs#holiday-calendars and, as JSON, at https://timelogicapi.com/content/holiday-calendars.json. Any other country (for example `LK`) returns 400 INVALID_PARAMETER \"Unsupported holiday calendar.\"; a malformed value returns \"Invalid holiday_country parameter.\"; a business-day range outside 1900-2100 returns \"Holiday calendar coverage is only available for years 1900-2100.\"
    String holidaySubdivision = "CA"; // String | Holiday calendar subdivision code for the country (the ISO 3166-2 suffix, 1-3 letters or digits, any letter case), for example `ENG` (GB), `ZH` (CH), `MH` (IN), `01` (FI) or `6AE` (FR); digits and leading zeros are part of the code. Subdivisions exist for 35 countries. Requires `holiday_country` and `business_days=true`. An unknown code returns 400 INVALID_PARAMETER \"Unknown holiday_subdivision 'XX' for country DE.\" (also for `FI` + `1`, which must be `01`); a value that conflicts with a combined `holiday_country` such as `US-CA` returns 400 INVALID_PARAMETER.
    Boolean sign = true; // Boolean | Set to `true`, `1` or `yes` (case-insensitive) to ask the gateway to sign the final JSON response. Any other value, a bare `sign`, or repeated `sign` values leave the response unsigned. Every authenticated JSON response, including errors, then includes signing headers. Not supported on `/v1/time/clock`.
    try {
      ElapsedResponse result = apiInstance.getElapsed(unix, unixMs, iso, sourceTz, sourceIp, sourceLat, sourceLon, sourceOffset, compareUnix, compareUnixMs, compareIso, compareSourceTz, compareSourceIp, compareSourceLat, compareSourceLon, compareSourceOffset, tz, ip, lat, lon, offset, autoTz, format, businessDays, holidayCountry, holidaySubdivision, sign);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling TimeApi#getElapsed");
      System.err.println("Status code: " + e.getCode());
      System.err.println("Reason: " + e.getResponseBody());
      System.err.println("Response headers: " + e.getResponseHeaders());
      e.printStackTrace();
    }
  }
}
```

### Parameters

| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **unix** | **Long**| Whole Unix seconds (fractions are rejected; negative values are allowed). Valid range is -62135596800 to 253402300799 (0001-01-01T00:00:00Z to 9999-12-31T23:59:59Z); values outside it return 400 INVALID_TIMESTAMP. | [optional] |
| **unixMs** | **Long**| Whole Unix milliseconds. Valid range -62135596800000 to 253402300799999 (0001-01-01T00:00:00Z to 9999-12-31T23:59:59.999Z); values outside it return 400 INVALID_TIMESTAMP. | [optional] |
| **iso** | **String**| ISO-8601 timestamp. To supply a local wall-clock time without an explicit offset, pair it with one of &#x60;source_tz&#x3D;Area/City&#x60;, &#x60;source_ip&#x3D;...&#x60;, &#x60;source_lat&#x3D;...&amp;source_lon&#x3D;...&#x60;, or &#x60;source_offset&#x3D;±HH:MM&#x60;; without a hint a local value is read as UTC. Accepted shapes are extended format with &#x60;Z&#x60;, &#x60;±HH:MM&#x60; or &#x60;±HH:MM:SS&#x60; (for example &#x60;1900-06-01T12:09:21+00:09:21&#x60;, as &#x60;iso_local&#x60; prints old local-mean-time offsets), optional fractional seconds, a space instead of &#x60;T&#x60;, a local time, or a date alone (read as 00:00). Basic format and offsets without a colon are rejected. The date must exist (&#x60;2027-02-29&#x60; returns 400 INVALID_TIMESTAMP rather than rolling over), and the instant must fall between 0001-01-01T00:00:00Z and 9999-12-31T23:59:59Z. A local time inside a spring-forward gap returns 400 INVALID_TIMESTAMP; an ambiguous fall-back time resolves to its first occurrence. | [optional] |
| **sourceTz** | **String**| Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. | [optional] |
| **sourceIp** | **String**| Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Resolves that local wall-clock time through the timezone mapped from this IP address. | [optional] |
| **sourceLat** | **Double**| Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Provide together with &#x60;source_lon&#x60; to resolve that local wall-clock time through the timezone mapped from these coordinates. | [optional] |
| **sourceLon** | **Double**| Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Provide together with &#x60;source_lat&#x60;. | [optional] |
| **sourceOffset** | **String**| Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Interprets that local wall-clock time at this fixed UTC offset. | [optional] |
| **compareUnix** | **Long**|  | [optional] |
| **compareUnixMs** | **Long**|  | [optional] |
| **compareIso** | **String**| ISO-8601 comparison timestamp. To supply a local wall-clock time without an explicit offset, pair it with one of &#x60;compare_source_tz&#x3D;Area/City&#x60;, &#x60;compare_source_ip&#x3D;...&#x60;, &#x60;compare_source_lat&#x3D;...&amp;compare_source_lon&#x3D;...&#x60;, or &#x60;compare_source_offset&#x3D;±HH:MM&#x60;. | [optional] |
| **compareSourceTz** | **String**| Used only with &#x60;compare_iso&#x3D;...&#x60; when the ISO value has no explicit offset. | [optional] |
| **compareSourceIp** | **String**| Used only with &#x60;compare_iso&#x3D;...&#x60; when the ISO value has no explicit offset. Resolves that local wall-clock time through the timezone mapped from this IP address. | [optional] |
| **compareSourceLat** | **Double**| Used only with &#x60;compare_iso&#x3D;...&#x60; when the ISO value has no explicit offset. Provide together with &#x60;compare_source_lon&#x60; to resolve that local wall-clock time through the timezone mapped from these coordinates. | [optional] |
| **compareSourceLon** | **Double**| Used only with &#x60;compare_iso&#x3D;...&#x60; when the ISO value has no explicit offset. Provide together with &#x60;compare_source_lat&#x60;. | [optional] |
| **compareSourceOffset** | **String**| Used only with &#x60;compare_iso&#x3D;...&#x60; when the ISO value has no explicit offset. Interprets that local wall-clock time at this fixed UTC offset. | [optional] |
| **tz** | **String**| IANA timezone name, matched case-insensitively. Links and aliases resolve to their canonical zone, so the returned &#x60;timezone&#x60; can differ (&#x60;Europe/Stockholm&#x60; returns &#x60;Europe/Berlin&#x60;, &#x60;UTC&#x60; returns &#x60;Etc/UTC&#x60;). &#x60;Etc/GMT+5&#x60; is UTC-05:00 (POSIX sign). On bulk-capable routes, a comma-separated list enables bulk mode with at most 10 values (any comma, even a trailing one, returns an array); request URLs are limited to 8192 characters. On single-target routes a list is rejected as an invalid timezone. | [optional] |
| **ip** | **String**| IP address. On bulk-capable routes, a comma-separated list enables bulk mode with at most 10 values; request URLs are limited to 8192 characters. | [optional] |
| **lat** | **Double**| Latitude. Must be provided together with &#x60;lon&#x60;. | [optional] |
| **lon** | **Double**| Longitude. Must be provided together with &#x60;lat&#x60;. | [optional] |
| **offset** | **String**| Fixed UTC offset in &#x60;+HH:MM&#x60; or &#x60;-HH:MM&#x60; format only (&#x60;+0530&#x60; and &#x60;+5&#x60; are rejected); URL-encode &#x60;+&#x60; as &#x60;%2B&#x60;, since an unencoded &#x60;+&#x60; is read as a space. An offset target returns &#x60;timezone&#x3D;null&#x60;. On bulk-capable routes, a comma-separated list enables bulk mode with at most 10 values; request URLs are limited to 8192 characters. | [optional] |
| **autoTz** | **Boolean**| Set to &#x60;true&#x60; to resolve using the caller IP from Cloudflare headers. Counts as a selector family, so it cannot be combined with &#x60;tz&#x60;, &#x60;ip&#x60;, &#x60;lat&#x60;/&#x60;lon&#x60; or &#x60;offset&#x60;. Not supported on &#x60;/v1/time/clock&#x60;. Enabled by &#x60;true&#x60;, &#x60;1&#x60; or &#x60;yes&#x60; (case-insensitive); any other value leaves it off without an error. | [optional] |
| **format** | **String**| Custom duration format template using &#x60;%days&#x60;, &#x60;%hours&#x60;, &#x60;%minutes&#x60;, and &#x60;%seconds&#x60;. Each placeholder is the total duration in that unit, not a remainder (118 days renders &#x60;%days days %hours hours&#x60; as &#x60;118 days 2832 hours&#x60;). | [optional] |
| **businessDays** | **Boolean**| Set to &#x60;true&#x60; to add a &#x60;business_days&#x60; count. Days are counted by calendar date, start included and end excluded, unsigned; weekends follow the holiday calendar&#39;s country (Saturday/Sunday in 221 countries, Friday/Saturday in 18 such as SA, Sunday only in 8, Friday only in IR, Friday/Sunday in BN; Saturday/Sunday when no &#x60;holiday_country&#x60; is given) and holidays of the chosen calendar are skipped. Each endpoint&#39;s date is taken in its own zone when one is known (diff - from_*_/to_* hints or a tz&#x3D;/ip&#x3D;/offset&#x3D; specifier; elapsed - source_*_/compare_source_*), otherwise in UTC. Enabled by &#x60;true&#x60;, &#x60;1&#x60; or &#x60;yes&#x60; (case-insensitive); any other value leaves it off without an error. | [optional] |
| **holidayCountry** | **String**| Holiday calendar: one of the 249 countries with holiday calendars (862 calendars including subdivisions, years 1900-2100), as an ISO 3166-1 alpha-2 code in any letter case, or a combined ISO 3166-2 style code such as &#x60;CH-ZH&#x60;, &#x60;US-CA&#x60; or &#x60;FR-6AE&#x60;. Requires &#x60;business_days&#x3D;true&#x60;. The full list is at https://timelogicapi.com/docs#holiday-calendars and, as JSON, at https://timelogicapi.com/content/holiday-calendars.json. Any other country (for example &#x60;LK&#x60;) returns 400 INVALID_PARAMETER \&quot;Unsupported holiday calendar.\&quot;; a malformed value returns \&quot;Invalid holiday_country parameter.\&quot;; a business-day range outside 1900-2100 returns \&quot;Holiday calendar coverage is only available for years 1900-2100.\&quot; | [optional] |
| **holidaySubdivision** | **String**| Holiday calendar subdivision code for the country (the ISO 3166-2 suffix, 1-3 letters or digits, any letter case), for example &#x60;ENG&#x60; (GB), &#x60;ZH&#x60; (CH), &#x60;MH&#x60; (IN), &#x60;01&#x60; (FI) or &#x60;6AE&#x60; (FR); digits and leading zeros are part of the code. Subdivisions exist for 35 countries. Requires &#x60;holiday_country&#x60; and &#x60;business_days&#x3D;true&#x60;. An unknown code returns 400 INVALID_PARAMETER \&quot;Unknown holiday_subdivision &#39;XX&#39; for country DE.\&quot; (also for &#x60;FI&#x60; + &#x60;1&#x60;, which must be &#x60;01&#x60;); a value that conflicts with a combined &#x60;holiday_country&#x60; such as &#x60;US-CA&#x60; returns 400 INVALID_PARAMETER. | [optional] |
| **sign** | **Boolean**| Set to &#x60;true&#x60;, &#x60;1&#x60; or &#x60;yes&#x60; (case-insensitive) to ask the gateway to sign the final JSON response. Any other value, a bare &#x60;sign&#x60;, or repeated &#x60;sign&#x60; values leave the response unsigned. Every authenticated JSON response, including errors, then includes signing headers. Not supported on &#x60;/v1/time/clock&#x60;. | [optional] |

### Return type

[**ElapsedResponse**](ElapsedResponse.md)

### Authorization

[apiKeyHeader](../README.md#apiKeyHeader), [bearerAuth](../README.md#bearerAuth), [apiKeyQuery](../README.md#apiKeyQuery), [rapidApiKey](../README.md#rapidApiKey), [rapidApiHost](../README.md#rapidApiHost)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Elapsed-duration result. |  * X-Request-Id -  <br>  * X-Auth-Mode -  <br>  * X-TimeLogic-Customer-ID -  <br>  * X-TimeLogic-Plan -  <br>  * X-TimeLogic-Quota-Limit -  <br>  * X-TimeLogic-Quota-State -  <br>  * X-TimeLogic-Signature -  <br>  * X-TimeLogic-Key-Id -  <br>  * X-TimeLogic-Signature-Alg -  <br>  * X-TimeLogic-Signature-Timestamp -  <br>  * X-TimeLogic-Content-SHA256 -  <br>  * X-TimeLogic-Signature-Input -  <br>  |
| **400** | Invalid or ambiguous request parameters. |  * X-Request-Id -  <br>  |
| **401** | Missing or invalid authentication. |  -  |
| **403** | The key or customer subscription is not active. |  * X-Request-Id -  <br>  |
| **404** | Unknown route (including a trailing slash), or an &#x60;ip&#x60; selector with no timezone mapping (private, reserved and loopback addresses never resolve) - \&quot;No timezone mapping found for the supplied IP address.\&quot; |  * X-Request-Id -  <br>  |
| **429** | The plan&#39;s monthly quota is used up (&#x60;QUOTA_EXCEEDED&#x60;, \&quot;Monthly quota exceeded.\&quot;). The quota period is the UTC calendar month and resets at 00:00 UTC on the 1st; no &#x60;Retry-After&#x60; header is sent. There is no published per-second limit. |  * X-Request-Id -  <br>  * X-TimeLogic-Quota-State -  <br>  |
| **405** | Only &#x60;GET&#x60; and &#x60;HEAD&#x60; are supported (\&quot;Only GET and HEAD are supported.\&quot;), with &#x60;Allow: GET, HEAD&#x60;. &#x60;HEAD&#x60; is answered like &#x60;GET&#x60; without a body. The CORS preflight allows GET, HEAD and OPTIONS. |  * X-Request-Id -  <br>  |
| **500** | Internal server error, including signing failures. |  * X-Request-Id -  <br>  |
| **501** | A required resolver or dependency is not configured or not ready. |  * X-Request-Id -  <br>  |
| **502** | Gateway failed to forward the request to the core worker. |  * X-Request-Id -  <br>  |

<a id="getTimezone"></a>
# **getTimezone**
> GetTimezone200Response getTimezone(tz, ip, lat, lon, offset, autoTz, sign)

Resolve timezone information for a target

Resolves timezone metadata for a single target.  Target selector rules: - Use exactly one selector family: &#x60;tz&#x60;, &#x60;ip&#x60;, &#x60;lat&#x60; + &#x60;lon&#x60;, &#x60;offset&#x60;, or &#x60;auto_tz&#x3D;true&#x60;. - Bulk is not supported on this route. - With no selector the route returns 400 MISSING_TARGET. - &#x60;offset&#x60; queries return a specialized payload with &#x60;timezone&#x3D;null&#x60; and &#x60;matching_zones&#x60; for the request-time offset match. Only geographic zones are listed; &#x60;UTC&#x60; and &#x60;Etc/_*&#x60; are intentionally excluded (use &#x60;tz&#x3D;UTC&#x60; for UTC). - &#x60;tz&#x60; names resolve to their canonical zone (&#x60;Europe/Stockholm&#x60; returns &#x60;Europe/Berlin&#x60;). - An &#x60;ip&#x60; with no timezone mapping returns 404 NOT_FOUND.  Examples: - Single target: &#x60;/v1/timezone?tz&#x3D;America/New_York&#x60; - Offset match: &#x60;/v1/timezone?offset&#x3D;-04:00&#x60;

### Example
```java
// Import classes:
import com.timelogic.direct.ApiClient;
import com.timelogic.direct.ApiException;
import com.timelogic.direct.Configuration;
import com.timelogic.direct.auth.*;
import com.timelogic.direct.models.*;
import com.timelogic.direct.api.TimeApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("https://api.timelogicapi.com");

    // Configure API key authorization: apiKeyHeader
    ApiKeyAuth apiKeyHeader = (ApiKeyAuth) defaultClient.getAuthentication("apiKeyHeader");
    apiKeyHeader.setApiKey("YOUR API KEY");
    // Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
    //apiKeyHeader.setApiKeyPrefix("Token");

    // Configure HTTP bearer authorization: bearerAuth
    HttpBearerAuth bearerAuth = (HttpBearerAuth) defaultClient.getAuthentication("bearerAuth");
    bearerAuth.setBearerToken("BEARER TOKEN");

    // Configure API key authorization: apiKeyQuery
    ApiKeyAuth apiKeyQuery = (ApiKeyAuth) defaultClient.getAuthentication("apiKeyQuery");
    apiKeyQuery.setApiKey("YOUR API KEY");
    // Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
    //apiKeyQuery.setApiKeyPrefix("Token");

    // Configure API key authorization: rapidApiKey
    ApiKeyAuth rapidApiKey = (ApiKeyAuth) defaultClient.getAuthentication("rapidApiKey");
    rapidApiKey.setApiKey("YOUR API KEY");
    // Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
    //rapidApiKey.setApiKeyPrefix("Token");

    // Configure API key authorization: rapidApiHost
    ApiKeyAuth rapidApiHost = (ApiKeyAuth) defaultClient.getAuthentication("rapidApiHost");
    rapidApiHost.setApiKey("YOUR API KEY");
    // Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
    //rapidApiHost.setApiKeyPrefix("Token");

    TimeApi apiInstance = new TimeApi(defaultClient);
    String tz = "America/New_York"; // String | IANA timezone name, matched case-insensitively. Links and aliases resolve to their canonical zone, so the returned `timezone` can differ (`Europe/Stockholm` returns `Europe/Berlin`, `UTC` returns `Etc/UTC`). `Etc/GMT+5` is UTC-05:00 (POSIX sign). On bulk-capable routes, a comma-separated list enables bulk mode with at most 10 values (any comma, even a trailing one, returns an array); request URLs are limited to 8192 characters. On single-target routes a list is rejected as an invalid timezone.
    String ip = "8.8.8.8"; // String | IP address. On bulk-capable routes, a comma-separated list enables bulk mode with at most 10 values; request URLs are limited to 8192 characters.
    Double lat = 40.7128D; // Double | Latitude. Must be provided together with `lon`.
    Double lon = -74.006D; // Double | Longitude. Must be provided together with `lat`.
    String offset = "-04:00"; // String | Fixed UTC offset in `+HH:MM` or `-HH:MM` format only (`+0530` and `+5` are rejected); URL-encode `+` as `%2B`, since an unencoded `+` is read as a space. An offset target returns `timezone=null`. On bulk-capable routes, a comma-separated list enables bulk mode with at most 10 values; request URLs are limited to 8192 characters.
    Boolean autoTz = true; // Boolean | Set to `true` to resolve using the caller IP from Cloudflare headers. Counts as a selector family, so it cannot be combined with `tz`, `ip`, `lat`/`lon` or `offset`. Not supported on `/v1/time/clock`. Enabled by `true`, `1` or `yes` (case-insensitive); any other value leaves it off without an error.
    Boolean sign = true; // Boolean | Set to `true`, `1` or `yes` (case-insensitive) to ask the gateway to sign the final JSON response. Any other value, a bare `sign`, or repeated `sign` values leave the response unsigned. Every authenticated JSON response, including errors, then includes signing headers. Not supported on `/v1/time/clock`.
    try {
      GetTimezone200Response result = apiInstance.getTimezone(tz, ip, lat, lon, offset, autoTz, sign);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling TimeApi#getTimezone");
      System.err.println("Status code: " + e.getCode());
      System.err.println("Reason: " + e.getResponseBody());
      System.err.println("Response headers: " + e.getResponseHeaders());
      e.printStackTrace();
    }
  }
}
```

### Parameters

| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **tz** | **String**| IANA timezone name, matched case-insensitively. Links and aliases resolve to their canonical zone, so the returned &#x60;timezone&#x60; can differ (&#x60;Europe/Stockholm&#x60; returns &#x60;Europe/Berlin&#x60;, &#x60;UTC&#x60; returns &#x60;Etc/UTC&#x60;). &#x60;Etc/GMT+5&#x60; is UTC-05:00 (POSIX sign). On bulk-capable routes, a comma-separated list enables bulk mode with at most 10 values (any comma, even a trailing one, returns an array); request URLs are limited to 8192 characters. On single-target routes a list is rejected as an invalid timezone. | [optional] |
| **ip** | **String**| IP address. On bulk-capable routes, a comma-separated list enables bulk mode with at most 10 values; request URLs are limited to 8192 characters. | [optional] |
| **lat** | **Double**| Latitude. Must be provided together with &#x60;lon&#x60;. | [optional] |
| **lon** | **Double**| Longitude. Must be provided together with &#x60;lat&#x60;. | [optional] |
| **offset** | **String**| Fixed UTC offset in &#x60;+HH:MM&#x60; or &#x60;-HH:MM&#x60; format only (&#x60;+0530&#x60; and &#x60;+5&#x60; are rejected); URL-encode &#x60;+&#x60; as &#x60;%2B&#x60;, since an unencoded &#x60;+&#x60; is read as a space. An offset target returns &#x60;timezone&#x3D;null&#x60;. On bulk-capable routes, a comma-separated list enables bulk mode with at most 10 values; request URLs are limited to 8192 characters. | [optional] |
| **autoTz** | **Boolean**| Set to &#x60;true&#x60; to resolve using the caller IP from Cloudflare headers. Counts as a selector family, so it cannot be combined with &#x60;tz&#x60;, &#x60;ip&#x60;, &#x60;lat&#x60;/&#x60;lon&#x60; or &#x60;offset&#x60;. Not supported on &#x60;/v1/time/clock&#x60;. Enabled by &#x60;true&#x60;, &#x60;1&#x60; or &#x60;yes&#x60; (case-insensitive); any other value leaves it off without an error. | [optional] |
| **sign** | **Boolean**| Set to &#x60;true&#x60;, &#x60;1&#x60; or &#x60;yes&#x60; (case-insensitive) to ask the gateway to sign the final JSON response. Any other value, a bare &#x60;sign&#x60;, or repeated &#x60;sign&#x60; values leave the response unsigned. Every authenticated JSON response, including errors, then includes signing headers. Not supported on &#x60;/v1/time/clock&#x60;. | [optional] |

### Return type

[**GetTimezone200Response**](GetTimezone200Response.md)

### Authorization

[apiKeyHeader](../README.md#apiKeyHeader), [bearerAuth](../README.md#bearerAuth), [apiKeyQuery](../README.md#apiKeyQuery), [rapidApiKey](../README.md#rapidApiKey), [rapidApiHost](../README.md#rapidApiHost)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Resolved timezone payload. |  * X-Request-Id -  <br>  * X-Auth-Mode -  <br>  * X-TimeLogic-Customer-ID -  <br>  * X-TimeLogic-Plan -  <br>  * X-TimeLogic-Quota-Limit -  <br>  * X-TimeLogic-Quota-State -  <br>  * X-TimeLogic-Signature -  <br>  * X-TimeLogic-Key-Id -  <br>  * X-TimeLogic-Signature-Alg -  <br>  * X-TimeLogic-Signature-Timestamp -  <br>  * X-TimeLogic-Content-SHA256 -  <br>  * X-TimeLogic-Signature-Input -  <br>  |
| **400** | Invalid or ambiguous request parameters. |  * X-Request-Id -  <br>  |
| **401** | Missing or invalid authentication. |  -  |
| **403** | The key or customer subscription is not active. |  * X-Request-Id -  <br>  |
| **404** | Unknown route (including a trailing slash), or an &#x60;ip&#x60; selector with no timezone mapping (private, reserved and loopback addresses never resolve) - \&quot;No timezone mapping found for the supplied IP address.\&quot; |  * X-Request-Id -  <br>  |
| **429** | The plan&#39;s monthly quota is used up (&#x60;QUOTA_EXCEEDED&#x60;, \&quot;Monthly quota exceeded.\&quot;). The quota period is the UTC calendar month and resets at 00:00 UTC on the 1st; no &#x60;Retry-After&#x60; header is sent. There is no published per-second limit. |  * X-Request-Id -  <br>  * X-TimeLogic-Quota-State -  <br>  |
| **405** | Only &#x60;GET&#x60; and &#x60;HEAD&#x60; are supported (\&quot;Only GET and HEAD are supported.\&quot;), with &#x60;Allow: GET, HEAD&#x60;. &#x60;HEAD&#x60; is answered like &#x60;GET&#x60; without a body. The CORS preflight allows GET, HEAD and OPTIONS. |  * X-Request-Id -  <br>  |
| **500** | Internal server error, including signing failures. |  * X-Request-Id -  <br>  |
| **501** | A required resolver or dependency is not configured or not ready. |  * X-Request-Id -  <br>  |
| **502** | Gateway failed to forward the request to the core worker. |  * X-Request-Id -  <br>  |

