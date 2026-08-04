# TimeLogic\DirectApi\TimeApi

All URIs are relative to https://api.timelogicapi.com, except if the operation defines another base path.

| Method | HTTP request | Description |
| ------------- | ------------- | ------------- |
| [**addTime()**](TimeApi.md#addTime) | **GET** /v1/time/add | Add modifiers to a timestamp |
| [**convertTime()**](TimeApi.md#convertTime) | **GET** /v1/time/convert | Convert a timestamp into a target timezone or offset |
| [**diffTime()**](TimeApi.md#diffTime) | **GET** /v1/time/diff | Difference between two instants |
| [**getCalendar()**](TimeApi.md#getCalendar) | **GET** /v1/time/calendar | Calendar projection for a target instant |
| [**getClock()**](TimeApi.md#getClock) | **GET** /v1/time/clock | Render a live HTML clock |
| [**getCurrentTime()**](TimeApi.md#getCurrentTime) | **GET** /v1/time/current | Get the current time for a target |
| [**getDst()**](TimeApi.md#getDst) | **GET** /v1/time/dst | Daylight-saving status for a target |
| [**getElapsed()**](TimeApi.md#getElapsed) | **GET** /v1/time/elapsed | Time elapsed since or remaining until a reference instant |
| [**getTimezone()**](TimeApi.md#getTimezone) | **GET** /v1/timezone | Resolve timezone information for a target |


## `addTime()`

```php
addTime($unix, $unixMs, $iso, $sourceTz, $sourceIp, $sourceLat, $sourceLon, $sourceOffset, $seconds, $minutes, $hours, $days, $tz, $ip, $lat, $lon, $offset, $autoTz, $utc, $format, $sign): \TimeLogic\DirectApi\Model\TimePayload
```

Add modifiers to a timestamp

Adds `seconds`, `minutes`, `hours`, and `days` to an optional base timestamp.  Input timestamp forms: - `unix=1711300000` - `unix_ms=1711300000000` - `iso=2026-04-16T09:00:00Z` - `iso=2026-04-16T09:00:00&source_tz=America/New_York` - `iso=2026-04-16T09:00:00&source_ip=8.8.8.8` - `iso=2026-04-16T09:00:00&source_lat=40.7128&source_lon=-74.0060` - `iso=2026-04-16T09:00:00&source_offset=-05:00` - if no input timestamp is provided, the base timestamp defaults to the request time  Modifiers: - `seconds=30` - `minutes=15` - `hours=2` - `days=7`  Target selector forms: - `tz=America/New_York` - `ip=8.8.8.8` - `lat=40.7128&lon=-74.0060` - `offset=-04:00` - `auto_tz=true` - `utc=true`  Incompatible combinations: - at most one input timestamp form - at most one target selector family - use at most one of `source_tz`, `source_ip`, `source_lat`/`source_lon`, or `source_offset` - local-ISO companion selectors are valid only with `iso=...` that has no explicit offset - bulk is not supported on this route  Examples: - `/v1/time/add?iso=2026-04-16T09:00:00&source_tz=America/New_York&days=1&tz=Europe/London` - `/v1/time/add?minutes=30&utc=true`

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');


// Configure API key authorization: directApiKeyHeader
$config = TimeLogic\DirectApi\Configuration::getDefaultConfiguration()->setApiKey('X-API-Key', 'YOUR_API_KEY');
// Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
// $config = TimeLogic\DirectApi\Configuration::getDefaultConfiguration()->setApiKeyPrefix('X-API-Key', 'Bearer');

// Configure Bearer (TimeLogic API key) authorization: directBearerAuth
$config = TimeLogic\DirectApi\Configuration::getDefaultConfiguration()->setAccessToken('YOUR_ACCESS_TOKEN');

// Configure API key authorization: directApiKeyQuery
$config = TimeLogic\DirectApi\Configuration::getDefaultConfiguration()->setApiKey('api_key', 'YOUR_API_KEY');
// Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
// $config = TimeLogic\DirectApi\Configuration::getDefaultConfiguration()->setApiKeyPrefix('api_key', 'Bearer');

// Configure API key authorization: rapidApiKey
$config = TimeLogic\DirectApi\Configuration::getDefaultConfiguration()->setApiKey('X-RapidAPI-Key', 'YOUR_API_KEY');
// Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
// $config = TimeLogic\DirectApi\Configuration::getDefaultConfiguration()->setApiKeyPrefix('X-RapidAPI-Key', 'Bearer');

// Configure API key authorization: rapidApiHost
$config = TimeLogic\DirectApi\Configuration::getDefaultConfiguration()->setApiKey('X-RapidAPI-Host', 'YOUR_API_KEY');
// Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
// $config = TimeLogic\DirectApi\Configuration::getDefaultConfiguration()->setApiKeyPrefix('X-RapidAPI-Host', 'Bearer');


$apiInstance = new TimeLogic\DirectApi\Api\TimeApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client(),
    $config
);
$unix = 1711300000; // int
$unixMs = 1711300000000; // int
$iso = 2024-03-24T15:00:00; // string | ISO-8601 timestamp. To supply a local wall-clock time without an explicit offset, pair it with one of `source_tz=Area/City`, `source_ip=...`, `source_lat=...&source_lon=...`, or `source_offset=±HH:MM`.
$sourceTz = America/New_York; // string | Used only with `iso=...` when the ISO value has no explicit offset.
$sourceIp = 8.8.8.8; // string | Used only with `iso=...` when the ISO value has no explicit offset. Resolves that local wall-clock time through the timezone mapped from this IP address.
$sourceLat = 40.7128; // float | Used only with `iso=...` when the ISO value has no explicit offset. Provide together with `source_lon` to resolve that local wall-clock time through the timezone mapped from these coordinates.
$sourceLon = -74.006; // float | Used only with `iso=...` when the ISO value has no explicit offset. Provide together with `source_lat`.
$sourceOffset = -05:00; // string | Used only with `iso=...` when the ISO value has no explicit offset. Interprets that local wall-clock time at this fixed UTC offset.
$seconds = 30; // int
$minutes = 15; // int
$hours = 2; // int
$days = 7; // int
$tz = America/New_York; // string | IANA timezone name. On bulk-capable routes, a comma-separated list enables bulk mode.
$ip = 8.8.8.8; // string | IP address. On bulk-capable routes, a comma-separated list enables bulk mode.
$lat = 40.7128; // float | Latitude. Must be provided together with `lon`.
$lon = -74.006; // float | Longitude. Must be provided together with `lat`.
$offset = -04:00; // string | Fixed UTC offset in `+HH:MM` or `-HH:MM` format. On bulk-capable routes, a comma-separated list enables bulk mode.
$autoTz = true; // bool | Set to `true` to resolve using the caller IP from Cloudflare headers.
$utc = true; // bool | Set to `true` to force UTC on routes that support it.
$format = %Y-%m-%d %H:%M:%S; // string | Custom date/time format template using supported `strftime`-style directives such as `%Y-%m-%d %H:%M:%S`. Reference: [strftime](https://strftime.net/).
$sign = true; // bool | Set to exactly `true` to ask the gateway to sign the final JSON response. Every authenticated JSON response, including errors, then includes signing headers. Not supported on `/v1/time/clock`.

try {
    $result = $apiInstance->addTime($unix, $unixMs, $iso, $sourceTz, $sourceIp, $sourceLat, $sourceLon, $sourceOffset, $seconds, $minutes, $hours, $days, $tz, $ip, $lat, $lon, $offset, $autoTz, $utc, $format, $sign);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling TimeApi->addTime: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **unix** | **int**|  | [optional] |
| **unixMs** | **int**|  | [optional] |
| **iso** | **string**| ISO-8601 timestamp. To supply a local wall-clock time without an explicit offset, pair it with one of &#x60;source_tz&#x3D;Area/City&#x60;, &#x60;source_ip&#x3D;...&#x60;, &#x60;source_lat&#x3D;...&amp;source_lon&#x3D;...&#x60;, or &#x60;source_offset&#x3D;±HH:MM&#x60;. | [optional] |
| **sourceTz** | **string**| Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. | [optional] |
| **sourceIp** | **string**| Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Resolves that local wall-clock time through the timezone mapped from this IP address. | [optional] |
| **sourceLat** | **float**| Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Provide together with &#x60;source_lon&#x60; to resolve that local wall-clock time through the timezone mapped from these coordinates. | [optional] |
| **sourceLon** | **float**| Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Provide together with &#x60;source_lat&#x60;. | [optional] |
| **sourceOffset** | **string**| Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Interprets that local wall-clock time at this fixed UTC offset. | [optional] |
| **seconds** | **int**|  | [optional] |
| **minutes** | **int**|  | [optional] |
| **hours** | **int**|  | [optional] |
| **days** | **int**|  | [optional] |
| **tz** | **string**| IANA timezone name. On bulk-capable routes, a comma-separated list enables bulk mode. | [optional] |
| **ip** | **string**| IP address. On bulk-capable routes, a comma-separated list enables bulk mode. | [optional] |
| **lat** | **float**| Latitude. Must be provided together with &#x60;lon&#x60;. | [optional] |
| **lon** | **float**| Longitude. Must be provided together with &#x60;lat&#x60;. | [optional] |
| **offset** | **string**| Fixed UTC offset in &#x60;+HH:MM&#x60; or &#x60;-HH:MM&#x60; format. On bulk-capable routes, a comma-separated list enables bulk mode. | [optional] |
| **autoTz** | **bool**| Set to &#x60;true&#x60; to resolve using the caller IP from Cloudflare headers. | [optional] |
| **utc** | **bool**| Set to &#x60;true&#x60; to force UTC on routes that support it. | [optional] |
| **format** | **string**| Custom date/time format template using supported &#x60;strftime&#x60;-style directives such as &#x60;%Y-%m-%d %H:%M:%S&#x60;. Reference: [strftime](https://strftime.net/). | [optional] |
| **sign** | **bool**| Set to exactly &#x60;true&#x60; to ask the gateway to sign the final JSON response. Every authenticated JSON response, including errors, then includes signing headers. Not supported on &#x60;/v1/time/clock&#x60;. | [optional] |

### Return type

[**\TimeLogic\DirectApi\Model\TimePayload**](../Model/TimePayload.md)

### Authorization

[directApiKeyHeader](../../README.md#directApiKeyHeader), [directBearerAuth](../../README.md#directBearerAuth), [directApiKeyQuery](../../README.md#directApiKeyQuery), [rapidApiKey](../../README.md#rapidApiKey), [rapidApiHost](../../README.md#rapidApiHost)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `convertTime()`

```php
convertTime($unix, $unixMs, $iso, $sourceTz, $sourceIp, $sourceLat, $sourceLon, $sourceOffset, $tz, $ip, $lat, $lon, $offset, $autoTz, $utc, $format, $sign): \TimeLogic\DirectApi\Model\GetCurrentTime200Response
```

Convert a timestamp into a target timezone or offset

Converts one required input timestamp into a single target or a bulk array.  Input timestamp forms: - `unix=1711300000` - `unix_ms=1711300000000` - `iso=2026-04-16T09:00:00Z` - `iso=2026-04-16T09:00:00&source_tz=America/New_York` - `iso=2026-04-16T09:00:00&source_ip=8.8.8.8` - `iso=2026-04-16T09:00:00&source_lat=40.7128&source_lon=-74.0060` - `iso=2026-04-16T09:00:00&source_offset=-05:00`  Target selector forms: - `tz=America/New_York` - `ip=8.8.8.8` - `lat=40.7128&lon=-74.0060` - `offset=-04:00` - `auto_tz=true` - `utc=true`  Incompatible combinations: - exactly one input timestamp form - exactly one target selector family - use at most one of `source_tz`, `source_ip`, `source_lat`/`source_lon`, or `source_offset` - local-ISO companion selectors are valid only with `iso=...` that has no explicit offset - bulk is allowed only through one comma-separated `tz`, `ip`, or `offset` selector  Examples: - Single target: `/v1/time/convert?iso=2026-04-16T09:00:00&source_tz=America/New_York&tz=Europe/London` - Bulk target set: `/v1/time/convert?unix=1711300000&offset=-04:00,+00:00,+09:00`

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');


// Configure API key authorization: directApiKeyHeader
$config = TimeLogic\DirectApi\Configuration::getDefaultConfiguration()->setApiKey('X-API-Key', 'YOUR_API_KEY');
// Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
// $config = TimeLogic\DirectApi\Configuration::getDefaultConfiguration()->setApiKeyPrefix('X-API-Key', 'Bearer');

// Configure Bearer (TimeLogic API key) authorization: directBearerAuth
$config = TimeLogic\DirectApi\Configuration::getDefaultConfiguration()->setAccessToken('YOUR_ACCESS_TOKEN');

// Configure API key authorization: directApiKeyQuery
$config = TimeLogic\DirectApi\Configuration::getDefaultConfiguration()->setApiKey('api_key', 'YOUR_API_KEY');
// Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
// $config = TimeLogic\DirectApi\Configuration::getDefaultConfiguration()->setApiKeyPrefix('api_key', 'Bearer');

// Configure API key authorization: rapidApiKey
$config = TimeLogic\DirectApi\Configuration::getDefaultConfiguration()->setApiKey('X-RapidAPI-Key', 'YOUR_API_KEY');
// Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
// $config = TimeLogic\DirectApi\Configuration::getDefaultConfiguration()->setApiKeyPrefix('X-RapidAPI-Key', 'Bearer');

// Configure API key authorization: rapidApiHost
$config = TimeLogic\DirectApi\Configuration::getDefaultConfiguration()->setApiKey('X-RapidAPI-Host', 'YOUR_API_KEY');
// Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
// $config = TimeLogic\DirectApi\Configuration::getDefaultConfiguration()->setApiKeyPrefix('X-RapidAPI-Host', 'Bearer');


$apiInstance = new TimeLogic\DirectApi\Api\TimeApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client(),
    $config
);
$unix = 1711300000; // int
$unixMs = 1711300000000; // int
$iso = 2024-03-24T15:00:00; // string | ISO-8601 timestamp. To supply a local wall-clock time without an explicit offset, pair it with one of `source_tz=Area/City`, `source_ip=...`, `source_lat=...&source_lon=...`, or `source_offset=±HH:MM`.
$sourceTz = America/New_York; // string | Used only with `iso=...` when the ISO value has no explicit offset.
$sourceIp = 8.8.8.8; // string | Used only with `iso=...` when the ISO value has no explicit offset. Resolves that local wall-clock time through the timezone mapped from this IP address.
$sourceLat = 40.7128; // float | Used only with `iso=...` when the ISO value has no explicit offset. Provide together with `source_lon` to resolve that local wall-clock time through the timezone mapped from these coordinates.
$sourceLon = -74.006; // float | Used only with `iso=...` when the ISO value has no explicit offset. Provide together with `source_lat`.
$sourceOffset = -05:00; // string | Used only with `iso=...` when the ISO value has no explicit offset. Interprets that local wall-clock time at this fixed UTC offset.
$tz = America/New_York; // string | IANA timezone name. On bulk-capable routes, a comma-separated list enables bulk mode.
$ip = 8.8.8.8; // string | IP address. On bulk-capable routes, a comma-separated list enables bulk mode.
$lat = 40.7128; // float | Latitude. Must be provided together with `lon`.
$lon = -74.006; // float | Longitude. Must be provided together with `lat`.
$offset = -04:00; // string | Fixed UTC offset in `+HH:MM` or `-HH:MM` format. On bulk-capable routes, a comma-separated list enables bulk mode.
$autoTz = true; // bool | Set to `true` to resolve using the caller IP from Cloudflare headers.
$utc = true; // bool | Set to `true` to force UTC on routes that support it.
$format = %Y-%m-%d %H:%M:%S; // string | Custom date/time format template using supported `strftime`-style directives such as `%Y-%m-%d %H:%M:%S`. Reference: [strftime](https://strftime.net/).
$sign = true; // bool | Set to exactly `true` to ask the gateway to sign the final JSON response. Every authenticated JSON response, including errors, then includes signing headers. Not supported on `/v1/time/clock`.

try {
    $result = $apiInstance->convertTime($unix, $unixMs, $iso, $sourceTz, $sourceIp, $sourceLat, $sourceLon, $sourceOffset, $tz, $ip, $lat, $lon, $offset, $autoTz, $utc, $format, $sign);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling TimeApi->convertTime: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **unix** | **int**|  | [optional] |
| **unixMs** | **int**|  | [optional] |
| **iso** | **string**| ISO-8601 timestamp. To supply a local wall-clock time without an explicit offset, pair it with one of &#x60;source_tz&#x3D;Area/City&#x60;, &#x60;source_ip&#x3D;...&#x60;, &#x60;source_lat&#x3D;...&amp;source_lon&#x3D;...&#x60;, or &#x60;source_offset&#x3D;±HH:MM&#x60;. | [optional] |
| **sourceTz** | **string**| Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. | [optional] |
| **sourceIp** | **string**| Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Resolves that local wall-clock time through the timezone mapped from this IP address. | [optional] |
| **sourceLat** | **float**| Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Provide together with &#x60;source_lon&#x60; to resolve that local wall-clock time through the timezone mapped from these coordinates. | [optional] |
| **sourceLon** | **float**| Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Provide together with &#x60;source_lat&#x60;. | [optional] |
| **sourceOffset** | **string**| Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Interprets that local wall-clock time at this fixed UTC offset. | [optional] |
| **tz** | **string**| IANA timezone name. On bulk-capable routes, a comma-separated list enables bulk mode. | [optional] |
| **ip** | **string**| IP address. On bulk-capable routes, a comma-separated list enables bulk mode. | [optional] |
| **lat** | **float**| Latitude. Must be provided together with &#x60;lon&#x60;. | [optional] |
| **lon** | **float**| Longitude. Must be provided together with &#x60;lat&#x60;. | [optional] |
| **offset** | **string**| Fixed UTC offset in &#x60;+HH:MM&#x60; or &#x60;-HH:MM&#x60; format. On bulk-capable routes, a comma-separated list enables bulk mode. | [optional] |
| **autoTz** | **bool**| Set to &#x60;true&#x60; to resolve using the caller IP from Cloudflare headers. | [optional] |
| **utc** | **bool**| Set to &#x60;true&#x60; to force UTC on routes that support it. | [optional] |
| **format** | **string**| Custom date/time format template using supported &#x60;strftime&#x60;-style directives such as &#x60;%Y-%m-%d %H:%M:%S&#x60;. Reference: [strftime](https://strftime.net/). | [optional] |
| **sign** | **bool**| Set to exactly &#x60;true&#x60; to ask the gateway to sign the final JSON response. Every authenticated JSON response, including errors, then includes signing headers. Not supported on &#x60;/v1/time/clock&#x60;. | [optional] |

### Return type

[**\TimeLogic\DirectApi\Model\GetCurrentTime200Response**](../Model/GetCurrentTime200Response.md)

### Authorization

[directApiKeyHeader](../../README.md#directApiKeyHeader), [directBearerAuth](../../README.md#directBearerAuth), [directApiKeyQuery](../../README.md#directApiKeyQuery), [rapidApiKey](../../README.md#rapidApiKey), [rapidApiHost](../../README.md#rapidApiHost)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `diffTime()`

```php
diffTime($from, $to, $fromTz, $fromIp, $fromLat, $fromLon, $fromOffset, $toTz, $toIp, $toLat, $toLon, $toOffset, $format, $businessDays, $holidayCountry, $holidaySubdivision, $sign): \TimeLogic\DirectApi\Model\DiffResponse
```

Difference between two instants

Computes the duration between `from` and `to`.  Required query fields: `from` and `to` only. Do not send every optional companion field. For each side, choose one supported specifier form. A `from_*` or `to_*` companion is allowed only when that side uses `iso=...` with no explicit offset; use at most one companion selector, except that coordinate input requires its paired latitude and longitude.  `from` and `to` are embedded specifier strings.  Accepted specifier forms: - `from=now` - `from=unix=1711300000` - `from=unix_ms=1711300000000` - `from=iso=2026-04-16T09:00:00` - `from=tz=America/New_York` - `from=ip=8.8.8.8` - `from=offset=-05:00` - the same forms are accepted for `to`  Timezone hint pairings: - `from_tz` only with `from=iso=...` that has no explicit offset - `from_ip`, `from_lat`/`from_lon`, and `from_offset` only with `from=iso=...` that has no explicit offset - `to_tz` only with `to=iso=...` that has no explicit offset - `to_ip`, `to_lat`/`to_lon`, and `to_offset` only with `to=iso=...` that has no explicit offset  Selector semantics: - `tz=...`, `ip=...`, and `offset=...` inside `from` or `to` mean the current request-time instant resolved through that selector - those selector forms do not represent an arbitrary local wall-clock time - returned duration magnitudes are absolute; use `direction` to see whether `to` is after, before, or the same instant as `from`  Business-day rules: - `holiday_country` and `holiday_subdivision` require `business_days=true` - `holiday_subdivision` also requires `holiday_country`  Examples: - Selector-current instant: `/v1/time/diff?from=unix=1711300000&to=tz=America/New_York` - Wall-clock pairing: `/v1/time/diff?from=iso=2026-04-16T09:00:00&from_tz=America/New_York&to=iso=2026-04-16T09:00:00&to_tz=Europe/London` - Wall-clock via selector: `/v1/time/diff?from=iso=2026-01-01T12:00:00&from_ip=8.8.8.8&to=iso=2026-01-01T12:00:00&to_offset=-05:00`

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');


// Configure API key authorization: directApiKeyHeader
$config = TimeLogic\DirectApi\Configuration::getDefaultConfiguration()->setApiKey('X-API-Key', 'YOUR_API_KEY');
// Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
// $config = TimeLogic\DirectApi\Configuration::getDefaultConfiguration()->setApiKeyPrefix('X-API-Key', 'Bearer');

// Configure Bearer (TimeLogic API key) authorization: directBearerAuth
$config = TimeLogic\DirectApi\Configuration::getDefaultConfiguration()->setAccessToken('YOUR_ACCESS_TOKEN');

// Configure API key authorization: directApiKeyQuery
$config = TimeLogic\DirectApi\Configuration::getDefaultConfiguration()->setApiKey('api_key', 'YOUR_API_KEY');
// Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
// $config = TimeLogic\DirectApi\Configuration::getDefaultConfiguration()->setApiKeyPrefix('api_key', 'Bearer');

// Configure API key authorization: rapidApiKey
$config = TimeLogic\DirectApi\Configuration::getDefaultConfiguration()->setApiKey('X-RapidAPI-Key', 'YOUR_API_KEY');
// Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
// $config = TimeLogic\DirectApi\Configuration::getDefaultConfiguration()->setApiKeyPrefix('X-RapidAPI-Key', 'Bearer');

// Configure API key authorization: rapidApiHost
$config = TimeLogic\DirectApi\Configuration::getDefaultConfiguration()->setApiKey('X-RapidAPI-Host', 'YOUR_API_KEY');
// Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
// $config = TimeLogic\DirectApi\Configuration::getDefaultConfiguration()->setApiKeyPrefix('X-RapidAPI-Host', 'Bearer');


$apiInstance = new TimeLogic\DirectApi\Api\TimeApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client(),
    $config
);
$from = 'from_example'; // string | Time specifier. Supported forms are `now`, `unix=<seconds>`, `unix_ms=<milliseconds>`, `iso=<ISO-8601>`, `offset=±HH:MM`, `tz=<IANA timezone>`, and `ip=<IP address>`. For `tz=...`, `ip=...`, and `offset=...`, the specifier means the current request-time instant resolved through that selector. To express a local wall-clock time, use `from=iso=...` together with one of `from_tz`, `from_ip`, `from_lat`+`from_lon`, or `from_offset`.
$to = 'to_example'; // string | Time specifier. Supported forms are `now`, `unix=<seconds>`, `unix_ms=<milliseconds>`, `iso=<ISO-8601>`, `offset=±HH:MM`, `tz=<IANA timezone>`, and `ip=<IP address>`. For `tz=...`, `ip=...`, and `offset=...`, the specifier means the current request-time instant resolved through that selector. To express a local wall-clock time, use `to=iso=...` together with one of `to_tz`, `to_ip`, `to_lat`+`to_lon`, or `to_offset`.
$fromTz = 'fromTz_example'; // string | Used only with `from=iso=...` when the ISO value has no explicit offset.
$fromIp = 8.8.8.8; // string | Used only with `from=iso=...` when the ISO value has no explicit offset. Resolves that local wall-clock time through the timezone mapped from this IP address.
$fromLat = 40.7128; // float | Used only with `from=iso=...` when the ISO value has no explicit offset. Provide together with `from_lon` to resolve that local wall-clock time through the timezone mapped from these coordinates.
$fromLon = -74.006; // float | Used only with `from=iso=...` when the ISO value has no explicit offset. Provide together with `from_lat`.
$fromOffset = -05:00; // string | Used only with `from=iso=...` when the ISO value has no explicit offset. Interprets that local wall-clock time at this fixed UTC offset.
$toTz = 'toTz_example'; // string | Used only with `to=iso=...` when the ISO value has no explicit offset.
$toIp = 8.8.8.8; // string | Used only with `to=iso=...` when the ISO value has no explicit offset. Resolves that local wall-clock time through the timezone mapped from this IP address.
$toLat = 40.7128; // float | Used only with `to=iso=...` when the ISO value has no explicit offset. Provide together with `to_lon` to resolve that local wall-clock time through the timezone mapped from these coordinates.
$toLon = -74.006; // float | Used only with `to=iso=...` when the ISO value has no explicit offset. Provide together with `to_lat`.
$toOffset = -05:00; // string | Used only with `to=iso=...` when the ISO value has no explicit offset. Interprets that local wall-clock time at this fixed UTC offset.
$format = %daysd %hoursh %minutesm %secondss; // string | Custom duration format template using `%days`, `%hours`, `%minutes`, and `%seconds`.
$businessDays = true; // bool | Set to `true` to enable weekday/business-day counting.
$holidayCountry = US; // string | ISO 3166-1 alpha-2 holiday calendar country code. Requires `business_days=true`.
$holidaySubdivision = CA; // string | Holiday calendar subdivision code from the upstream `python-holidays` calendar, for example `CA` or `ENG`. Requires `holiday_country` and `business_days=true`.
$sign = true; // bool | Set to exactly `true` to ask the gateway to sign the final JSON response. Every authenticated JSON response, including errors, then includes signing headers. Not supported on `/v1/time/clock`.

try {
    $result = $apiInstance->diffTime($from, $to, $fromTz, $fromIp, $fromLat, $fromLon, $fromOffset, $toTz, $toIp, $toLat, $toLon, $toOffset, $format, $businessDays, $holidayCountry, $holidaySubdivision, $sign);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling TimeApi->diffTime: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **from** | **string**| Time specifier. Supported forms are &#x60;now&#x60;, &#x60;unix&#x3D;&lt;seconds&gt;&#x60;, &#x60;unix_ms&#x3D;&lt;milliseconds&gt;&#x60;, &#x60;iso&#x3D;&lt;ISO-8601&gt;&#x60;, &#x60;offset&#x3D;±HH:MM&#x60;, &#x60;tz&#x3D;&lt;IANA timezone&gt;&#x60;, and &#x60;ip&#x3D;&lt;IP address&gt;&#x60;. For &#x60;tz&#x3D;...&#x60;, &#x60;ip&#x3D;...&#x60;, and &#x60;offset&#x3D;...&#x60;, the specifier means the current request-time instant resolved through that selector. To express a local wall-clock time, use &#x60;from&#x3D;iso&#x3D;...&#x60; together with one of &#x60;from_tz&#x60;, &#x60;from_ip&#x60;, &#x60;from_lat&#x60;+&#x60;from_lon&#x60;, or &#x60;from_offset&#x60;. | |
| **to** | **string**| Time specifier. Supported forms are &#x60;now&#x60;, &#x60;unix&#x3D;&lt;seconds&gt;&#x60;, &#x60;unix_ms&#x3D;&lt;milliseconds&gt;&#x60;, &#x60;iso&#x3D;&lt;ISO-8601&gt;&#x60;, &#x60;offset&#x3D;±HH:MM&#x60;, &#x60;tz&#x3D;&lt;IANA timezone&gt;&#x60;, and &#x60;ip&#x3D;&lt;IP address&gt;&#x60;. For &#x60;tz&#x3D;...&#x60;, &#x60;ip&#x3D;...&#x60;, and &#x60;offset&#x3D;...&#x60;, the specifier means the current request-time instant resolved through that selector. To express a local wall-clock time, use &#x60;to&#x3D;iso&#x3D;...&#x60; together with one of &#x60;to_tz&#x60;, &#x60;to_ip&#x60;, &#x60;to_lat&#x60;+&#x60;to_lon&#x60;, or &#x60;to_offset&#x60;. | |
| **fromTz** | **string**| Used only with &#x60;from&#x3D;iso&#x3D;...&#x60; when the ISO value has no explicit offset. | [optional] |
| **fromIp** | **string**| Used only with &#x60;from&#x3D;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Resolves that local wall-clock time through the timezone mapped from this IP address. | [optional] |
| **fromLat** | **float**| Used only with &#x60;from&#x3D;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Provide together with &#x60;from_lon&#x60; to resolve that local wall-clock time through the timezone mapped from these coordinates. | [optional] |
| **fromLon** | **float**| Used only with &#x60;from&#x3D;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Provide together with &#x60;from_lat&#x60;. | [optional] |
| **fromOffset** | **string**| Used only with &#x60;from&#x3D;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Interprets that local wall-clock time at this fixed UTC offset. | [optional] |
| **toTz** | **string**| Used only with &#x60;to&#x3D;iso&#x3D;...&#x60; when the ISO value has no explicit offset. | [optional] |
| **toIp** | **string**| Used only with &#x60;to&#x3D;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Resolves that local wall-clock time through the timezone mapped from this IP address. | [optional] |
| **toLat** | **float**| Used only with &#x60;to&#x3D;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Provide together with &#x60;to_lon&#x60; to resolve that local wall-clock time through the timezone mapped from these coordinates. | [optional] |
| **toLon** | **float**| Used only with &#x60;to&#x3D;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Provide together with &#x60;to_lat&#x60;. | [optional] |
| **toOffset** | **string**| Used only with &#x60;to&#x3D;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Interprets that local wall-clock time at this fixed UTC offset. | [optional] |
| **format** | **string**| Custom duration format template using &#x60;%days&#x60;, &#x60;%hours&#x60;, &#x60;%minutes&#x60;, and &#x60;%seconds&#x60;. | [optional] |
| **businessDays** | **bool**| Set to &#x60;true&#x60; to enable weekday/business-day counting. | [optional] |
| **holidayCountry** | **string**| ISO 3166-1 alpha-2 holiday calendar country code. Requires &#x60;business_days&#x3D;true&#x60;. | [optional] |
| **holidaySubdivision** | **string**| Holiday calendar subdivision code from the upstream &#x60;python-holidays&#x60; calendar, for example &#x60;CA&#x60; or &#x60;ENG&#x60;. Requires &#x60;holiday_country&#x60; and &#x60;business_days&#x3D;true&#x60;. | [optional] |
| **sign** | **bool**| Set to exactly &#x60;true&#x60; to ask the gateway to sign the final JSON response. Every authenticated JSON response, including errors, then includes signing headers. Not supported on &#x60;/v1/time/clock&#x60;. | [optional] |

### Return type

[**\TimeLogic\DirectApi\Model\DiffResponse**](../Model/DiffResponse.md)

### Authorization

[directApiKeyHeader](../../README.md#directApiKeyHeader), [directBearerAuth](../../README.md#directBearerAuth), [directApiKeyQuery](../../README.md#directApiKeyQuery), [rapidApiKey](../../README.md#rapidApiKey), [rapidApiHost](../../README.md#rapidApiHost)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `getCalendar()`

```php
getCalendar($unix, $unixMs, $iso, $sourceTz, $sourceIp, $sourceLat, $sourceLon, $sourceOffset, $tz, $ip, $lat, $lon, $offset, $autoTz, $format, $week, $sign): \TimeLogic\DirectApi\Model\CalendarResponse
```

Calendar projection for a target instant

Returns calendar fields for an optional timestamp and target.  Input timestamp forms: - `unix=1711300000` - `unix_ms=1711300000000` - `iso=2026-04-16T09:00:00Z` - `iso=2026-04-16T09:00:00&source_tz=America/New_York` - `iso=2026-04-16T09:00:00&source_ip=8.8.8.8` - `iso=2026-04-16T09:00:00&source_lat=40.7128&source_lon=-74.0060` - `iso=2026-04-16T09:00:00&source_offset=-05:00` - if no input timestamp is provided, the request time is used  Target selector forms: - `tz=America/New_York` - `ip=8.8.8.8` - `lat=40.7128&lon=-74.0060` - `offset=-04:00` - `auto_tz=true`  Additional flags: - `week=true` adds `week_number`  Incompatible combinations: - at most one input timestamp form - at most one target selector family - use at most one of `source_tz`, `source_ip`, `source_lat`/`source_lon`, or `source_offset` - local-ISO companion selectors are valid only with `iso=...` that has no explicit offset - bulk is not supported on this route  Examples: - `/v1/time/calendar?iso=2026-04-16T09:00:00&source_tz=America/New_York&tz=Europe/London&week=true` - `/v1/time/calendar?unix=1711300000&auto_tz=true`

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');


// Configure API key authorization: directApiKeyHeader
$config = TimeLogic\DirectApi\Configuration::getDefaultConfiguration()->setApiKey('X-API-Key', 'YOUR_API_KEY');
// Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
// $config = TimeLogic\DirectApi\Configuration::getDefaultConfiguration()->setApiKeyPrefix('X-API-Key', 'Bearer');

// Configure Bearer (TimeLogic API key) authorization: directBearerAuth
$config = TimeLogic\DirectApi\Configuration::getDefaultConfiguration()->setAccessToken('YOUR_ACCESS_TOKEN');

// Configure API key authorization: directApiKeyQuery
$config = TimeLogic\DirectApi\Configuration::getDefaultConfiguration()->setApiKey('api_key', 'YOUR_API_KEY');
// Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
// $config = TimeLogic\DirectApi\Configuration::getDefaultConfiguration()->setApiKeyPrefix('api_key', 'Bearer');

// Configure API key authorization: rapidApiKey
$config = TimeLogic\DirectApi\Configuration::getDefaultConfiguration()->setApiKey('X-RapidAPI-Key', 'YOUR_API_KEY');
// Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
// $config = TimeLogic\DirectApi\Configuration::getDefaultConfiguration()->setApiKeyPrefix('X-RapidAPI-Key', 'Bearer');

// Configure API key authorization: rapidApiHost
$config = TimeLogic\DirectApi\Configuration::getDefaultConfiguration()->setApiKey('X-RapidAPI-Host', 'YOUR_API_KEY');
// Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
// $config = TimeLogic\DirectApi\Configuration::getDefaultConfiguration()->setApiKeyPrefix('X-RapidAPI-Host', 'Bearer');


$apiInstance = new TimeLogic\DirectApi\Api\TimeApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client(),
    $config
);
$unix = 1711300000; // int
$unixMs = 1711300000000; // int
$iso = 2024-03-24T15:00:00; // string | ISO-8601 timestamp. To supply a local wall-clock time without an explicit offset, pair it with one of `source_tz=Area/City`, `source_ip=...`, `source_lat=...&source_lon=...`, or `source_offset=±HH:MM`.
$sourceTz = America/New_York; // string | Used only with `iso=...` when the ISO value has no explicit offset.
$sourceIp = 8.8.8.8; // string | Used only with `iso=...` when the ISO value has no explicit offset. Resolves that local wall-clock time through the timezone mapped from this IP address.
$sourceLat = 40.7128; // float | Used only with `iso=...` when the ISO value has no explicit offset. Provide together with `source_lon` to resolve that local wall-clock time through the timezone mapped from these coordinates.
$sourceLon = -74.006; // float | Used only with `iso=...` when the ISO value has no explicit offset. Provide together with `source_lat`.
$sourceOffset = -05:00; // string | Used only with `iso=...` when the ISO value has no explicit offset. Interprets that local wall-clock time at this fixed UTC offset.
$tz = America/New_York; // string | IANA timezone name. On bulk-capable routes, a comma-separated list enables bulk mode.
$ip = 8.8.8.8; // string | IP address. On bulk-capable routes, a comma-separated list enables bulk mode.
$lat = 40.7128; // float | Latitude. Must be provided together with `lon`.
$lon = -74.006; // float | Longitude. Must be provided together with `lat`.
$offset = -04:00; // string | Fixed UTC offset in `+HH:MM` or `-HH:MM` format. On bulk-capable routes, a comma-separated list enables bulk mode.
$autoTz = true; // bool | Set to `true` to resolve using the caller IP from Cloudflare headers.
$format = %Y-%m-%d %H:%M:%S; // string | Custom date/time format template using supported `strftime`-style directives such as `%Y-%m-%d %H:%M:%S`. Reference: [strftime](https://strftime.net/).
$week = true; // bool
$sign = true; // bool | Set to exactly `true` to ask the gateway to sign the final JSON response. Every authenticated JSON response, including errors, then includes signing headers. Not supported on `/v1/time/clock`.

try {
    $result = $apiInstance->getCalendar($unix, $unixMs, $iso, $sourceTz, $sourceIp, $sourceLat, $sourceLon, $sourceOffset, $tz, $ip, $lat, $lon, $offset, $autoTz, $format, $week, $sign);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling TimeApi->getCalendar: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **unix** | **int**|  | [optional] |
| **unixMs** | **int**|  | [optional] |
| **iso** | **string**| ISO-8601 timestamp. To supply a local wall-clock time without an explicit offset, pair it with one of &#x60;source_tz&#x3D;Area/City&#x60;, &#x60;source_ip&#x3D;...&#x60;, &#x60;source_lat&#x3D;...&amp;source_lon&#x3D;...&#x60;, or &#x60;source_offset&#x3D;±HH:MM&#x60;. | [optional] |
| **sourceTz** | **string**| Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. | [optional] |
| **sourceIp** | **string**| Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Resolves that local wall-clock time through the timezone mapped from this IP address. | [optional] |
| **sourceLat** | **float**| Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Provide together with &#x60;source_lon&#x60; to resolve that local wall-clock time through the timezone mapped from these coordinates. | [optional] |
| **sourceLon** | **float**| Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Provide together with &#x60;source_lat&#x60;. | [optional] |
| **sourceOffset** | **string**| Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Interprets that local wall-clock time at this fixed UTC offset. | [optional] |
| **tz** | **string**| IANA timezone name. On bulk-capable routes, a comma-separated list enables bulk mode. | [optional] |
| **ip** | **string**| IP address. On bulk-capable routes, a comma-separated list enables bulk mode. | [optional] |
| **lat** | **float**| Latitude. Must be provided together with &#x60;lon&#x60;. | [optional] |
| **lon** | **float**| Longitude. Must be provided together with &#x60;lat&#x60;. | [optional] |
| **offset** | **string**| Fixed UTC offset in &#x60;+HH:MM&#x60; or &#x60;-HH:MM&#x60; format. On bulk-capable routes, a comma-separated list enables bulk mode. | [optional] |
| **autoTz** | **bool**| Set to &#x60;true&#x60; to resolve using the caller IP from Cloudflare headers. | [optional] |
| **format** | **string**| Custom date/time format template using supported &#x60;strftime&#x60;-style directives such as &#x60;%Y-%m-%d %H:%M:%S&#x60;. Reference: [strftime](https://strftime.net/). | [optional] |
| **week** | **bool**|  | [optional] |
| **sign** | **bool**| Set to exactly &#x60;true&#x60; to ask the gateway to sign the final JSON response. Every authenticated JSON response, including errors, then includes signing headers. Not supported on &#x60;/v1/time/clock&#x60;. | [optional] |

### Return type

[**\TimeLogic\DirectApi\Model\CalendarResponse**](../Model/CalendarResponse.md)

### Authorization

[directApiKeyHeader](../../README.md#directApiKeyHeader), [directBearerAuth](../../README.md#directBearerAuth), [directApiKeyQuery](../../README.md#directApiKeyQuery), [rapidApiKey](../../README.md#rapidApiKey), [rapidApiHost](../../README.md#rapidApiHost)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `getClock()`

```php
getClock($style, $unix, $unixMs, $iso, $sourceTz, $sourceIp, $sourceLat, $sourceLon, $sourceOffset, $tz, $ip, $lat, $lon, $offset, $format): string
```

Render a live HTML clock

Returns an embeddable HTML clock fragment.  Input timestamp forms: - `unix=1711300000` - `unix_ms=1711300000000` - `iso=2026-04-16T09:00:00Z` - `iso=2026-04-16T09:00:00&source_tz=America/New_York`  Target selector forms: - `tz=America/New_York` - `ip=8.8.8.8` - `lat=40.7128&lon=-74.0060` - `offset=-04:00`  Incompatible combinations: - `style` is required and must be one of the 30 names in the `style` enum - at most one input timestamp form - at most one target selector family - use at most one of `source_tz`, `source_ip`, `source_lat`/`source_lon`, or `source_offset` - local-ISO companion selectors are valid only with `iso=...` that has no explicit offset - this route is single-target only; comma-separated `tz`, `ip`, and `offset` values are rejected - `auto_tz` is not supported on this route - `sign` is not supported on this route  Examples: - Digital: `/v1/time/clock?style=digital-dashboard&iso=2026-04-16T09:00:00&source_tz=America/New_York&tz=Europe/London` - Analog: `/v1/time/clock?style=analog-station&offset=-04:00`

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');


// Configure API key authorization: directApiKeyHeader
$config = TimeLogic\DirectApi\Configuration::getDefaultConfiguration()->setApiKey('X-API-Key', 'YOUR_API_KEY');
// Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
// $config = TimeLogic\DirectApi\Configuration::getDefaultConfiguration()->setApiKeyPrefix('X-API-Key', 'Bearer');

// Configure Bearer (TimeLogic API key) authorization: directBearerAuth
$config = TimeLogic\DirectApi\Configuration::getDefaultConfiguration()->setAccessToken('YOUR_ACCESS_TOKEN');

// Configure API key authorization: directApiKeyQuery
$config = TimeLogic\DirectApi\Configuration::getDefaultConfiguration()->setApiKey('api_key', 'YOUR_API_KEY');
// Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
// $config = TimeLogic\DirectApi\Configuration::getDefaultConfiguration()->setApiKeyPrefix('api_key', 'Bearer');

// Configure API key authorization: rapidApiKey
$config = TimeLogic\DirectApi\Configuration::getDefaultConfiguration()->setApiKey('X-RapidAPI-Key', 'YOUR_API_KEY');
// Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
// $config = TimeLogic\DirectApi\Configuration::getDefaultConfiguration()->setApiKeyPrefix('X-RapidAPI-Key', 'Bearer');

// Configure API key authorization: rapidApiHost
$config = TimeLogic\DirectApi\Configuration::getDefaultConfiguration()->setApiKey('X-RapidAPI-Host', 'YOUR_API_KEY');
// Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
// $config = TimeLogic\DirectApi\Configuration::getDefaultConfiguration()->setApiKeyPrefix('X-RapidAPI-Host', 'Bearer');


$apiInstance = new TimeLogic\DirectApi\Api\TimeApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client(),
    $config
);
$style = 'style_example'; // string | Clock style name. Valid values are enumerated here; there is no separate style discovery endpoint.
$unix = 1711300000; // int
$unixMs = 1711300000000; // int
$iso = 2024-03-24T15:00:00; // string | ISO-8601 timestamp. To supply a local wall-clock time without an explicit offset, pair it with one of `source_tz=Area/City`, `source_ip=...`, `source_lat=...&source_lon=...`, or `source_offset=±HH:MM`.
$sourceTz = America/New_York; // string | Used only with `iso=...` when the ISO value has no explicit offset.
$sourceIp = 8.8.8.8; // string | Used only with `iso=...` when the ISO value has no explicit offset. Resolves that local wall-clock time through the timezone mapped from this IP address.
$sourceLat = 40.7128; // float | Used only with `iso=...` when the ISO value has no explicit offset. Provide together with `source_lon` to resolve that local wall-clock time through the timezone mapped from these coordinates.
$sourceLon = -74.006; // float | Used only with `iso=...` when the ISO value has no explicit offset. Provide together with `source_lat`.
$sourceOffset = -05:00; // string | Used only with `iso=...` when the ISO value has no explicit offset. Interprets that local wall-clock time at this fixed UTC offset.
$tz = America/New_York; // string | IANA timezone name. On bulk-capable routes, a comma-separated list enables bulk mode.
$ip = 8.8.8.8; // string | IP address. On bulk-capable routes, a comma-separated list enables bulk mode.
$lat = 40.7128; // float | Latitude. Must be provided together with `lon`.
$lon = -74.006; // float | Longitude. Must be provided together with `lat`.
$offset = -04:00; // string | Fixed UTC offset in `+HH:MM` or `-HH:MM` format. On bulk-capable routes, a comma-separated list enables bulk mode.
$format = %Y-%m-%d %H:%M:%S; // string | Custom date/time format template using supported `strftime`-style directives such as `%Y-%m-%d %H:%M:%S`. Reference: [strftime](https://strftime.net/).

try {
    $result = $apiInstance->getClock($style, $unix, $unixMs, $iso, $sourceTz, $sourceIp, $sourceLat, $sourceLon, $sourceOffset, $tz, $ip, $lat, $lon, $offset, $format);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling TimeApi->getClock: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **style** | **string**| Clock style name. Valid values are enumerated here; there is no separate style discovery endpoint. | |
| **unix** | **int**|  | [optional] |
| **unixMs** | **int**|  | [optional] |
| **iso** | **string**| ISO-8601 timestamp. To supply a local wall-clock time without an explicit offset, pair it with one of &#x60;source_tz&#x3D;Area/City&#x60;, &#x60;source_ip&#x3D;...&#x60;, &#x60;source_lat&#x3D;...&amp;source_lon&#x3D;...&#x60;, or &#x60;source_offset&#x3D;±HH:MM&#x60;. | [optional] |
| **sourceTz** | **string**| Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. | [optional] |
| **sourceIp** | **string**| Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Resolves that local wall-clock time through the timezone mapped from this IP address. | [optional] |
| **sourceLat** | **float**| Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Provide together with &#x60;source_lon&#x60; to resolve that local wall-clock time through the timezone mapped from these coordinates. | [optional] |
| **sourceLon** | **float**| Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Provide together with &#x60;source_lat&#x60;. | [optional] |
| **sourceOffset** | **string**| Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Interprets that local wall-clock time at this fixed UTC offset. | [optional] |
| **tz** | **string**| IANA timezone name. On bulk-capable routes, a comma-separated list enables bulk mode. | [optional] |
| **ip** | **string**| IP address. On bulk-capable routes, a comma-separated list enables bulk mode. | [optional] |
| **lat** | **float**| Latitude. Must be provided together with &#x60;lon&#x60;. | [optional] |
| **lon** | **float**| Longitude. Must be provided together with &#x60;lat&#x60;. | [optional] |
| **offset** | **string**| Fixed UTC offset in &#x60;+HH:MM&#x60; or &#x60;-HH:MM&#x60; format. On bulk-capable routes, a comma-separated list enables bulk mode. | [optional] |
| **format** | **string**| Custom date/time format template using supported &#x60;strftime&#x60;-style directives such as &#x60;%Y-%m-%d %H:%M:%S&#x60;. Reference: [strftime](https://strftime.net/). | [optional] |

### Return type

**string**

### Authorization

[directApiKeyHeader](../../README.md#directApiKeyHeader), [directBearerAuth](../../README.md#directBearerAuth), [directApiKeyQuery](../../README.md#directApiKeyQuery), [rapidApiKey](../../README.md#rapidApiKey), [rapidApiHost](../../README.md#rapidApiHost)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `text/html`, `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `getCurrentTime()`

```php
getCurrentTime($tz, $ip, $lat, $lon, $offset, $autoTz, $format, $sign): \TimeLogic\DirectApi\Model\GetCurrentTime200Response
```

Get the current time for a target

Returns current time data for a single target, or a bulk array when exactly one of `tz`, `ip`, or `offset` is supplied as a comma-separated list.  Target selector rules: - Use at most one selector family per request: `tz`, `ip`, `lat` + `lon`, `offset`, or `auto_tz=true`. - If no selector is provided, the response defaults to UTC with `timezone=null` and `iso_local=null`. - Bulk mode is available only through one comma-separated `tz`, `ip`, or `offset` selector and cannot be combined with any other selector.  Example: - Single target: `/v1/time/current?tz=America/New_York` - For bulk, provide one comma-separated `tz`, `ip`, or `offset` value, for example `/v1/time/current?tz=America/New_York,Europe/London,Asia/Tokyo`.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');


// Configure API key authorization: directApiKeyHeader
$config = TimeLogic\DirectApi\Configuration::getDefaultConfiguration()->setApiKey('X-API-Key', 'YOUR_API_KEY');
// Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
// $config = TimeLogic\DirectApi\Configuration::getDefaultConfiguration()->setApiKeyPrefix('X-API-Key', 'Bearer');

// Configure Bearer (TimeLogic API key) authorization: directBearerAuth
$config = TimeLogic\DirectApi\Configuration::getDefaultConfiguration()->setAccessToken('YOUR_ACCESS_TOKEN');

// Configure API key authorization: directApiKeyQuery
$config = TimeLogic\DirectApi\Configuration::getDefaultConfiguration()->setApiKey('api_key', 'YOUR_API_KEY');
// Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
// $config = TimeLogic\DirectApi\Configuration::getDefaultConfiguration()->setApiKeyPrefix('api_key', 'Bearer');

// Configure API key authorization: rapidApiKey
$config = TimeLogic\DirectApi\Configuration::getDefaultConfiguration()->setApiKey('X-RapidAPI-Key', 'YOUR_API_KEY');
// Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
// $config = TimeLogic\DirectApi\Configuration::getDefaultConfiguration()->setApiKeyPrefix('X-RapidAPI-Key', 'Bearer');

// Configure API key authorization: rapidApiHost
$config = TimeLogic\DirectApi\Configuration::getDefaultConfiguration()->setApiKey('X-RapidAPI-Host', 'YOUR_API_KEY');
// Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
// $config = TimeLogic\DirectApi\Configuration::getDefaultConfiguration()->setApiKeyPrefix('X-RapidAPI-Host', 'Bearer');


$apiInstance = new TimeLogic\DirectApi\Api\TimeApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client(),
    $config
);
$tz = America/New_York; // string | IANA timezone name. On bulk-capable routes, a comma-separated list enables bulk mode.
$ip = 8.8.8.8; // string | IP address. On bulk-capable routes, a comma-separated list enables bulk mode.
$lat = 40.7128; // float | Latitude. Must be provided together with `lon`.
$lon = -74.006; // float | Longitude. Must be provided together with `lat`.
$offset = -04:00; // string | Fixed UTC offset in `+HH:MM` or `-HH:MM` format. On bulk-capable routes, a comma-separated list enables bulk mode.
$autoTz = true; // bool | Set to `true` to resolve using the caller IP from Cloudflare headers.
$format = %Y-%m-%d %H:%M:%S; // string | Custom date/time format template using supported `strftime`-style directives such as `%Y-%m-%d %H:%M:%S`. Reference: [strftime](https://strftime.net/).
$sign = true; // bool | Set to exactly `true` to ask the gateway to sign the final JSON response. Every authenticated JSON response, including errors, then includes signing headers. Not supported on `/v1/time/clock`.

try {
    $result = $apiInstance->getCurrentTime($tz, $ip, $lat, $lon, $offset, $autoTz, $format, $sign);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling TimeApi->getCurrentTime: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **tz** | **string**| IANA timezone name. On bulk-capable routes, a comma-separated list enables bulk mode. | [optional] |
| **ip** | **string**| IP address. On bulk-capable routes, a comma-separated list enables bulk mode. | [optional] |
| **lat** | **float**| Latitude. Must be provided together with &#x60;lon&#x60;. | [optional] |
| **lon** | **float**| Longitude. Must be provided together with &#x60;lat&#x60;. | [optional] |
| **offset** | **string**| Fixed UTC offset in &#x60;+HH:MM&#x60; or &#x60;-HH:MM&#x60; format. On bulk-capable routes, a comma-separated list enables bulk mode. | [optional] |
| **autoTz** | **bool**| Set to &#x60;true&#x60; to resolve using the caller IP from Cloudflare headers. | [optional] |
| **format** | **string**| Custom date/time format template using supported &#x60;strftime&#x60;-style directives such as &#x60;%Y-%m-%d %H:%M:%S&#x60;. Reference: [strftime](https://strftime.net/). | [optional] |
| **sign** | **bool**| Set to exactly &#x60;true&#x60; to ask the gateway to sign the final JSON response. Every authenticated JSON response, including errors, then includes signing headers. Not supported on &#x60;/v1/time/clock&#x60;. | [optional] |

### Return type

[**\TimeLogic\DirectApi\Model\GetCurrentTime200Response**](../Model/GetCurrentTime200Response.md)

### Authorization

[directApiKeyHeader](../../README.md#directApiKeyHeader), [directBearerAuth](../../README.md#directBearerAuth), [directApiKeyQuery](../../README.md#directApiKeyQuery), [rapidApiKey](../../README.md#rapidApiKey), [rapidApiHost](../../README.md#rapidApiHost)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `getDst()`

```php
getDst($tz, $ip, $lat, $lon, $offset, $autoTz, $format, $next, $sign): \TimeLogic\DirectApi\Model\DstResponse
```

Daylight-saving status for a target

Returns daylight-saving status for the selected target.  Target selector rules: - Use at most one selector family: `tz`, `ip`, `lat` + `lon`, `offset`, or `auto_tz=true`. - If no selector is provided, the response defaults to UTC. - Bulk is not supported on this route. - `next=true` adds `next_transition` when the resolver provides a transition timestamp.  Example: - `/v1/time/dst?tz=America/New_York&next=true`

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');


// Configure API key authorization: directApiKeyHeader
$config = TimeLogic\DirectApi\Configuration::getDefaultConfiguration()->setApiKey('X-API-Key', 'YOUR_API_KEY');
// Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
// $config = TimeLogic\DirectApi\Configuration::getDefaultConfiguration()->setApiKeyPrefix('X-API-Key', 'Bearer');

// Configure Bearer (TimeLogic API key) authorization: directBearerAuth
$config = TimeLogic\DirectApi\Configuration::getDefaultConfiguration()->setAccessToken('YOUR_ACCESS_TOKEN');

// Configure API key authorization: directApiKeyQuery
$config = TimeLogic\DirectApi\Configuration::getDefaultConfiguration()->setApiKey('api_key', 'YOUR_API_KEY');
// Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
// $config = TimeLogic\DirectApi\Configuration::getDefaultConfiguration()->setApiKeyPrefix('api_key', 'Bearer');

// Configure API key authorization: rapidApiKey
$config = TimeLogic\DirectApi\Configuration::getDefaultConfiguration()->setApiKey('X-RapidAPI-Key', 'YOUR_API_KEY');
// Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
// $config = TimeLogic\DirectApi\Configuration::getDefaultConfiguration()->setApiKeyPrefix('X-RapidAPI-Key', 'Bearer');

// Configure API key authorization: rapidApiHost
$config = TimeLogic\DirectApi\Configuration::getDefaultConfiguration()->setApiKey('X-RapidAPI-Host', 'YOUR_API_KEY');
// Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
// $config = TimeLogic\DirectApi\Configuration::getDefaultConfiguration()->setApiKeyPrefix('X-RapidAPI-Host', 'Bearer');


$apiInstance = new TimeLogic\DirectApi\Api\TimeApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client(),
    $config
);
$tz = America/New_York; // string | IANA timezone name. On bulk-capable routes, a comma-separated list enables bulk mode.
$ip = 8.8.8.8; // string | IP address. On bulk-capable routes, a comma-separated list enables bulk mode.
$lat = 40.7128; // float | Latitude. Must be provided together with `lon`.
$lon = -74.006; // float | Longitude. Must be provided together with `lat`.
$offset = -04:00; // string | Fixed UTC offset in `+HH:MM` or `-HH:MM` format. On bulk-capable routes, a comma-separated list enables bulk mode.
$autoTz = true; // bool | Set to `true` to resolve using the caller IP from Cloudflare headers.
$format = %Y-%m-%d %H:%M:%S; // string | Custom date/time format template using supported `strftime`-style directives such as `%Y-%m-%d %H:%M:%S`. Reference: [strftime](https://strftime.net/).
$next = true; // bool
$sign = true; // bool | Set to exactly `true` to ask the gateway to sign the final JSON response. Every authenticated JSON response, including errors, then includes signing headers. Not supported on `/v1/time/clock`.

try {
    $result = $apiInstance->getDst($tz, $ip, $lat, $lon, $offset, $autoTz, $format, $next, $sign);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling TimeApi->getDst: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **tz** | **string**| IANA timezone name. On bulk-capable routes, a comma-separated list enables bulk mode. | [optional] |
| **ip** | **string**| IP address. On bulk-capable routes, a comma-separated list enables bulk mode. | [optional] |
| **lat** | **float**| Latitude. Must be provided together with &#x60;lon&#x60;. | [optional] |
| **lon** | **float**| Longitude. Must be provided together with &#x60;lat&#x60;. | [optional] |
| **offset** | **string**| Fixed UTC offset in &#x60;+HH:MM&#x60; or &#x60;-HH:MM&#x60; format. On bulk-capable routes, a comma-separated list enables bulk mode. | [optional] |
| **autoTz** | **bool**| Set to &#x60;true&#x60; to resolve using the caller IP from Cloudflare headers. | [optional] |
| **format** | **string**| Custom date/time format template using supported &#x60;strftime&#x60;-style directives such as &#x60;%Y-%m-%d %H:%M:%S&#x60;. Reference: [strftime](https://strftime.net/). | [optional] |
| **next** | **bool**|  | [optional] |
| **sign** | **bool**| Set to exactly &#x60;true&#x60; to ask the gateway to sign the final JSON response. Every authenticated JSON response, including errors, then includes signing headers. Not supported on &#x60;/v1/time/clock&#x60;. | [optional] |

### Return type

[**\TimeLogic\DirectApi\Model\DstResponse**](../Model/DstResponse.md)

### Authorization

[directApiKeyHeader](../../README.md#directApiKeyHeader), [directBearerAuth](../../README.md#directBearerAuth), [directApiKeyQuery](../../README.md#directApiKeyQuery), [rapidApiKey](../../README.md#rapidApiKey), [rapidApiHost](../../README.md#rapidApiHost)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `getElapsed()`

```php
getElapsed($unix, $unixMs, $iso, $sourceTz, $sourceIp, $sourceLat, $sourceLon, $sourceOffset, $compareUnix, $compareUnixMs, $compareIso, $compareSourceTz, $compareSourceIp, $compareSourceLat, $compareSourceLon, $compareSourceOffset, $tz, $ip, $lat, $lon, $offset, $autoTz, $format, $businessDays, $holidayCountry, $holidaySubdivision, $sign): \TimeLogic\DirectApi\Model\ElapsedResponse
```

Time elapsed since or remaining until a reference instant

Computes elapsed or remaining duration relative to one required reference timestamp.  Reference timestamp forms: - `unix=1711300000` - `unix_ms=1711300000000` - `iso=2026-04-16T09:00:00Z` - `iso=2026-04-16T09:00:00&source_tz=America/New_York` - `iso=2026-04-16T09:00:00&source_ip=8.8.8.8` - `iso=2026-04-16T09:00:00&source_lat=40.7128&source_lon=-74.0060` - `iso=2026-04-16T09:00:00&source_offset=-05:00`  Compare timestamp forms: - `compare_unix=1711213600` - `compare_unix_ms=1711213600000` - `compare_iso=2026-04-16T09:00:00Z` - `compare_iso=2026-04-16T09:00:00&compare_source_tz=Europe/London` - `compare_iso=2026-04-16T09:00:00&compare_source_ip=8.8.8.8` - `compare_iso=2026-04-16T09:00:00&compare_source_lat=40.7128&compare_source_lon=-74.0060` - `compare_iso=2026-04-16T09:00:00&compare_source_offset=-05:00`  Compare selector forms: - `tz=America/New_York` - `ip=8.8.8.8` - `lat=40.7128&lon=-74.0060` - `offset=-04:00` - `auto_tz=true`  Incompatible combinations: - exactly one reference timestamp form - use either one compare timestamp form or one compare selector family, not both - use at most one of `source_tz`, `source_ip`, `source_lat`/`source_lon`, or `source_offset` - use at most one of `compare_source_tz`, `compare_source_ip`, `compare_source_lat`/`compare_source_lon`, or `compare_source_offset` - local-ISO companion selectors are valid only with `iso=...` that has no explicit offset - compare local-ISO companion selectors are valid only with `compare_iso=...` that has no explicit offset - if no compare input is provided, the comparison defaults to the request time  Business-day rules: - `holiday_country` and `holiday_subdivision` require `business_days=true` - `holiday_subdivision` also requires `holiday_country`  Examples: - Timestamp-to-timestamp: `/v1/time/elapsed?iso=2026-04-16T09:00:00&source_tz=America/New_York&compare_iso=2026-04-16T09:00:00&compare_source_tz=Europe/London` - Timestamp-to-selector: `/v1/time/elapsed?unix=1711300000&tz=America/New_York&business_days=true`

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');


// Configure API key authorization: directApiKeyHeader
$config = TimeLogic\DirectApi\Configuration::getDefaultConfiguration()->setApiKey('X-API-Key', 'YOUR_API_KEY');
// Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
// $config = TimeLogic\DirectApi\Configuration::getDefaultConfiguration()->setApiKeyPrefix('X-API-Key', 'Bearer');

// Configure Bearer (TimeLogic API key) authorization: directBearerAuth
$config = TimeLogic\DirectApi\Configuration::getDefaultConfiguration()->setAccessToken('YOUR_ACCESS_TOKEN');

// Configure API key authorization: directApiKeyQuery
$config = TimeLogic\DirectApi\Configuration::getDefaultConfiguration()->setApiKey('api_key', 'YOUR_API_KEY');
// Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
// $config = TimeLogic\DirectApi\Configuration::getDefaultConfiguration()->setApiKeyPrefix('api_key', 'Bearer');

// Configure API key authorization: rapidApiKey
$config = TimeLogic\DirectApi\Configuration::getDefaultConfiguration()->setApiKey('X-RapidAPI-Key', 'YOUR_API_KEY');
// Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
// $config = TimeLogic\DirectApi\Configuration::getDefaultConfiguration()->setApiKeyPrefix('X-RapidAPI-Key', 'Bearer');

// Configure API key authorization: rapidApiHost
$config = TimeLogic\DirectApi\Configuration::getDefaultConfiguration()->setApiKey('X-RapidAPI-Host', 'YOUR_API_KEY');
// Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
// $config = TimeLogic\DirectApi\Configuration::getDefaultConfiguration()->setApiKeyPrefix('X-RapidAPI-Host', 'Bearer');


$apiInstance = new TimeLogic\DirectApi\Api\TimeApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client(),
    $config
);
$unix = 1711300000; // int
$unixMs = 1711300000000; // int
$iso = 2024-03-24T15:00:00; // string | ISO-8601 timestamp. To supply a local wall-clock time without an explicit offset, pair it with one of `source_tz=Area/City`, `source_ip=...`, `source_lat=...&source_lon=...`, or `source_offset=±HH:MM`.
$sourceTz = America/New_York; // string | Used only with `iso=...` when the ISO value has no explicit offset.
$sourceIp = 8.8.8.8; // string | Used only with `iso=...` when the ISO value has no explicit offset. Resolves that local wall-clock time through the timezone mapped from this IP address.
$sourceLat = 40.7128; // float | Used only with `iso=...` when the ISO value has no explicit offset. Provide together with `source_lon` to resolve that local wall-clock time through the timezone mapped from these coordinates.
$sourceLon = -74.006; // float | Used only with `iso=...` when the ISO value has no explicit offset. Provide together with `source_lat`.
$sourceOffset = -05:00; // string | Used only with `iso=...` when the ISO value has no explicit offset. Interprets that local wall-clock time at this fixed UTC offset.
$compareUnix = 1711213600; // int
$compareUnixMs = 1711213600000; // int
$compareIso = 2024-03-23T15:00:00; // string | ISO-8601 comparison timestamp. To supply a local wall-clock time without an explicit offset, pair it with one of `compare_source_tz=Area/City`, `compare_source_ip=...`, `compare_source_lat=...&compare_source_lon=...`, or `compare_source_offset=±HH:MM`.
$compareSourceTz = America/New_York; // string | Used only with `compare_iso=...` when the ISO value has no explicit offset.
$compareSourceIp = 8.8.8.8; // string | Used only with `compare_iso=...` when the ISO value has no explicit offset. Resolves that local wall-clock time through the timezone mapped from this IP address.
$compareSourceLat = 40.7128; // float | Used only with `compare_iso=...` when the ISO value has no explicit offset. Provide together with `compare_source_lon` to resolve that local wall-clock time through the timezone mapped from these coordinates.
$compareSourceLon = -74.006; // float | Used only with `compare_iso=...` when the ISO value has no explicit offset. Provide together with `compare_source_lat`.
$compareSourceOffset = -05:00; // string | Used only with `compare_iso=...` when the ISO value has no explicit offset. Interprets that local wall-clock time at this fixed UTC offset.
$tz = America/New_York; // string | IANA timezone name. On bulk-capable routes, a comma-separated list enables bulk mode.
$ip = 8.8.8.8; // string | IP address. On bulk-capable routes, a comma-separated list enables bulk mode.
$lat = 40.7128; // float | Latitude. Must be provided together with `lon`.
$lon = -74.006; // float | Longitude. Must be provided together with `lat`.
$offset = -04:00; // string | Fixed UTC offset in `+HH:MM` or `-HH:MM` format. On bulk-capable routes, a comma-separated list enables bulk mode.
$autoTz = true; // bool | Set to `true` to resolve using the caller IP from Cloudflare headers.
$format = %daysd %hoursh %minutesm %secondss; // string | Custom duration format template using `%days`, `%hours`, `%minutes`, and `%seconds`.
$businessDays = true; // bool | Set to `true` to enable weekday/business-day counting.
$holidayCountry = US; // string | ISO 3166-1 alpha-2 holiday calendar country code. Requires `business_days=true`.
$holidaySubdivision = CA; // string | Holiday calendar subdivision code from the upstream `python-holidays` calendar, for example `CA` or `ENG`. Requires `holiday_country` and `business_days=true`.
$sign = true; // bool | Set to exactly `true` to ask the gateway to sign the final JSON response. Every authenticated JSON response, including errors, then includes signing headers. Not supported on `/v1/time/clock`.

try {
    $result = $apiInstance->getElapsed($unix, $unixMs, $iso, $sourceTz, $sourceIp, $sourceLat, $sourceLon, $sourceOffset, $compareUnix, $compareUnixMs, $compareIso, $compareSourceTz, $compareSourceIp, $compareSourceLat, $compareSourceLon, $compareSourceOffset, $tz, $ip, $lat, $lon, $offset, $autoTz, $format, $businessDays, $holidayCountry, $holidaySubdivision, $sign);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling TimeApi->getElapsed: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **unix** | **int**|  | [optional] |
| **unixMs** | **int**|  | [optional] |
| **iso** | **string**| ISO-8601 timestamp. To supply a local wall-clock time without an explicit offset, pair it with one of &#x60;source_tz&#x3D;Area/City&#x60;, &#x60;source_ip&#x3D;...&#x60;, &#x60;source_lat&#x3D;...&amp;source_lon&#x3D;...&#x60;, or &#x60;source_offset&#x3D;±HH:MM&#x60;. | [optional] |
| **sourceTz** | **string**| Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. | [optional] |
| **sourceIp** | **string**| Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Resolves that local wall-clock time through the timezone mapped from this IP address. | [optional] |
| **sourceLat** | **float**| Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Provide together with &#x60;source_lon&#x60; to resolve that local wall-clock time through the timezone mapped from these coordinates. | [optional] |
| **sourceLon** | **float**| Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Provide together with &#x60;source_lat&#x60;. | [optional] |
| **sourceOffset** | **string**| Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Interprets that local wall-clock time at this fixed UTC offset. | [optional] |
| **compareUnix** | **int**|  | [optional] |
| **compareUnixMs** | **int**|  | [optional] |
| **compareIso** | **string**| ISO-8601 comparison timestamp. To supply a local wall-clock time without an explicit offset, pair it with one of &#x60;compare_source_tz&#x3D;Area/City&#x60;, &#x60;compare_source_ip&#x3D;...&#x60;, &#x60;compare_source_lat&#x3D;...&amp;compare_source_lon&#x3D;...&#x60;, or &#x60;compare_source_offset&#x3D;±HH:MM&#x60;. | [optional] |
| **compareSourceTz** | **string**| Used only with &#x60;compare_iso&#x3D;...&#x60; when the ISO value has no explicit offset. | [optional] |
| **compareSourceIp** | **string**| Used only with &#x60;compare_iso&#x3D;...&#x60; when the ISO value has no explicit offset. Resolves that local wall-clock time through the timezone mapped from this IP address. | [optional] |
| **compareSourceLat** | **float**| Used only with &#x60;compare_iso&#x3D;...&#x60; when the ISO value has no explicit offset. Provide together with &#x60;compare_source_lon&#x60; to resolve that local wall-clock time through the timezone mapped from these coordinates. | [optional] |
| **compareSourceLon** | **float**| Used only with &#x60;compare_iso&#x3D;...&#x60; when the ISO value has no explicit offset. Provide together with &#x60;compare_source_lat&#x60;. | [optional] |
| **compareSourceOffset** | **string**| Used only with &#x60;compare_iso&#x3D;...&#x60; when the ISO value has no explicit offset. Interprets that local wall-clock time at this fixed UTC offset. | [optional] |
| **tz** | **string**| IANA timezone name. On bulk-capable routes, a comma-separated list enables bulk mode. | [optional] |
| **ip** | **string**| IP address. On bulk-capable routes, a comma-separated list enables bulk mode. | [optional] |
| **lat** | **float**| Latitude. Must be provided together with &#x60;lon&#x60;. | [optional] |
| **lon** | **float**| Longitude. Must be provided together with &#x60;lat&#x60;. | [optional] |
| **offset** | **string**| Fixed UTC offset in &#x60;+HH:MM&#x60; or &#x60;-HH:MM&#x60; format. On bulk-capable routes, a comma-separated list enables bulk mode. | [optional] |
| **autoTz** | **bool**| Set to &#x60;true&#x60; to resolve using the caller IP from Cloudflare headers. | [optional] |
| **format** | **string**| Custom duration format template using &#x60;%days&#x60;, &#x60;%hours&#x60;, &#x60;%minutes&#x60;, and &#x60;%seconds&#x60;. | [optional] |
| **businessDays** | **bool**| Set to &#x60;true&#x60; to enable weekday/business-day counting. | [optional] |
| **holidayCountry** | **string**| ISO 3166-1 alpha-2 holiday calendar country code. Requires &#x60;business_days&#x3D;true&#x60;. | [optional] |
| **holidaySubdivision** | **string**| Holiday calendar subdivision code from the upstream &#x60;python-holidays&#x60; calendar, for example &#x60;CA&#x60; or &#x60;ENG&#x60;. Requires &#x60;holiday_country&#x60; and &#x60;business_days&#x3D;true&#x60;. | [optional] |
| **sign** | **bool**| Set to exactly &#x60;true&#x60; to ask the gateway to sign the final JSON response. Every authenticated JSON response, including errors, then includes signing headers. Not supported on &#x60;/v1/time/clock&#x60;. | [optional] |

### Return type

[**\TimeLogic\DirectApi\Model\ElapsedResponse**](../Model/ElapsedResponse.md)

### Authorization

[directApiKeyHeader](../../README.md#directApiKeyHeader), [directBearerAuth](../../README.md#directBearerAuth), [directApiKeyQuery](../../README.md#directApiKeyQuery), [rapidApiKey](../../README.md#rapidApiKey), [rapidApiHost](../../README.md#rapidApiHost)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `getTimezone()`

```php
getTimezone($tz, $ip, $lat, $lon, $offset, $autoTz, $sign): \TimeLogic\DirectApi\Model\GetTimezone200Response
```

Resolve timezone information for a target

Resolves timezone metadata for a single target.  Target selector rules: - Use exactly one selector family: `tz`, `ip`, `lat` + `lon`, `offset`, or `auto_tz=true`. - Bulk is not supported on this route. - `offset` queries return a specialized payload that includes `matching_zones` for the request-time offset match.  Examples: - Single target: `/v1/timezone?tz=America/New_York` - Offset match: `/v1/timezone?offset=-04:00`

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');


// Configure API key authorization: directApiKeyHeader
$config = TimeLogic\DirectApi\Configuration::getDefaultConfiguration()->setApiKey('X-API-Key', 'YOUR_API_KEY');
// Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
// $config = TimeLogic\DirectApi\Configuration::getDefaultConfiguration()->setApiKeyPrefix('X-API-Key', 'Bearer');

// Configure Bearer (TimeLogic API key) authorization: directBearerAuth
$config = TimeLogic\DirectApi\Configuration::getDefaultConfiguration()->setAccessToken('YOUR_ACCESS_TOKEN');

// Configure API key authorization: directApiKeyQuery
$config = TimeLogic\DirectApi\Configuration::getDefaultConfiguration()->setApiKey('api_key', 'YOUR_API_KEY');
// Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
// $config = TimeLogic\DirectApi\Configuration::getDefaultConfiguration()->setApiKeyPrefix('api_key', 'Bearer');

// Configure API key authorization: rapidApiKey
$config = TimeLogic\DirectApi\Configuration::getDefaultConfiguration()->setApiKey('X-RapidAPI-Key', 'YOUR_API_KEY');
// Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
// $config = TimeLogic\DirectApi\Configuration::getDefaultConfiguration()->setApiKeyPrefix('X-RapidAPI-Key', 'Bearer');

// Configure API key authorization: rapidApiHost
$config = TimeLogic\DirectApi\Configuration::getDefaultConfiguration()->setApiKey('X-RapidAPI-Host', 'YOUR_API_KEY');
// Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
// $config = TimeLogic\DirectApi\Configuration::getDefaultConfiguration()->setApiKeyPrefix('X-RapidAPI-Host', 'Bearer');


$apiInstance = new TimeLogic\DirectApi\Api\TimeApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client(),
    $config
);
$tz = America/New_York; // string | IANA timezone name. On bulk-capable routes, a comma-separated list enables bulk mode.
$ip = 8.8.8.8; // string | IP address. On bulk-capable routes, a comma-separated list enables bulk mode.
$lat = 40.7128; // float | Latitude. Must be provided together with `lon`.
$lon = -74.006; // float | Longitude. Must be provided together with `lat`.
$offset = -04:00; // string | Fixed UTC offset in `+HH:MM` or `-HH:MM` format. On bulk-capable routes, a comma-separated list enables bulk mode.
$autoTz = true; // bool | Set to `true` to resolve using the caller IP from Cloudflare headers.
$sign = true; // bool | Set to exactly `true` to ask the gateway to sign the final JSON response. Every authenticated JSON response, including errors, then includes signing headers. Not supported on `/v1/time/clock`.

try {
    $result = $apiInstance->getTimezone($tz, $ip, $lat, $lon, $offset, $autoTz, $sign);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling TimeApi->getTimezone: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **tz** | **string**| IANA timezone name. On bulk-capable routes, a comma-separated list enables bulk mode. | [optional] |
| **ip** | **string**| IP address. On bulk-capable routes, a comma-separated list enables bulk mode. | [optional] |
| **lat** | **float**| Latitude. Must be provided together with &#x60;lon&#x60;. | [optional] |
| **lon** | **float**| Longitude. Must be provided together with &#x60;lat&#x60;. | [optional] |
| **offset** | **string**| Fixed UTC offset in &#x60;+HH:MM&#x60; or &#x60;-HH:MM&#x60; format. On bulk-capable routes, a comma-separated list enables bulk mode. | [optional] |
| **autoTz** | **bool**| Set to &#x60;true&#x60; to resolve using the caller IP from Cloudflare headers. | [optional] |
| **sign** | **bool**| Set to exactly &#x60;true&#x60; to ask the gateway to sign the final JSON response. Every authenticated JSON response, including errors, then includes signing headers. Not supported on &#x60;/v1/time/clock&#x60;. | [optional] |

### Return type

[**\TimeLogic\DirectApi\Model\GetTimezone200Response**](../Model/GetTimezone200Response.md)

### Authorization

[directApiKeyHeader](../../README.md#directApiKeyHeader), [directBearerAuth](../../README.md#directBearerAuth), [directApiKeyQuery](../../README.md#directApiKeyQuery), [rapidApiKey](../../README.md#rapidApiKey), [rapidApiHost](../../README.md#rapidApiHost)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)
