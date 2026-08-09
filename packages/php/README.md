# TimeLogic API PHP SDK | A World Time API

Official PHP SDK for TimeLogic API, a world time API.

## Installation & Usage

Install the package after its Packagist release:

```bash
composer require timelogic-api/php-sdk:^1.0
```

## Getting Started

Please follow the [installation procedure](#installation--usage) and then run the following:

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



// Configure API key authorization: apiKeyHeader
$config = TimeLogic\Api\Configuration::getDefaultConfiguration()->setApiKey('X-API-Key', 'YOUR_API_KEY');
// Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
// $config = TimeLogic\Api\Configuration::getDefaultConfiguration()->setApiKeyPrefix('X-API-Key', 'Bearer');

// Configure Bearer (TimeLogic API key) authorization: bearerAuth
$config = TimeLogic\Api\Configuration::getDefaultConfiguration()->setAccessToken('YOUR_ACCESS_TOKEN');

// Configure API key authorization: apiKeyQuery
$config = TimeLogic\Api\Configuration::getDefaultConfiguration()->setApiKey('api_key', 'YOUR_API_KEY');
// Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
// $config = TimeLogic\Api\Configuration::getDefaultConfiguration()->setApiKeyPrefix('api_key', 'Bearer');

// Configure API key authorization: rapidApiKey
$config = TimeLogic\Api\Configuration::getDefaultConfiguration()->setApiKey('X-RapidAPI-Key', 'YOUR_API_KEY');
// Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
// $config = TimeLogic\Api\Configuration::getDefaultConfiguration()->setApiKeyPrefix('X-RapidAPI-Key', 'Bearer');

// Configure API key authorization: rapidApiHost
$config = TimeLogic\Api\Configuration::getDefaultConfiguration()->setApiKey('X-RapidAPI-Host', 'YOUR_API_KEY');
// Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
// $config = TimeLogic\Api\Configuration::getDefaultConfiguration()->setApiKeyPrefix('X-RapidAPI-Host', 'Bearer');


$apiInstance = new TimeLogic\Api\Api\TimeApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client(),
    $config
);
$unix = 1711300000; // int
$unixMs = 1711300000000; // int
$iso = '2024-03-24T15:00:00'; // string | ISO-8601 timestamp. To supply a local wall-clock time without an explicit offset, pair it with one of `source_tz=Area/City`, `source_ip=...`, `source_lat=...&source_lon=...`, or `source_offset=±HH:MM`.
$sourceTz = 'America/New_York'; // string | Used only with `iso=...` when the ISO value has no explicit offset.
$sourceIp = '8.8.8.8'; // string | Used only with `iso=...` when the ISO value has no explicit offset. Resolves that local wall-clock time through the timezone mapped from this IP address.
$sourceLat = 40.7128; // float | Used only with `iso=...` when the ISO value has no explicit offset. Provide together with `source_lon` to resolve that local wall-clock time through the timezone mapped from these coordinates.
$sourceLon = -74.006; // float | Used only with `iso=...` when the ISO value has no explicit offset. Provide together with `source_lat`.
$sourceOffset = '-05:00'; // string | Used only with `iso=...` when the ISO value has no explicit offset. Interprets that local wall-clock time at this fixed UTC offset.
$seconds = 30; // int
$minutes = 15; // int
$hours = 2; // int
$days = 7; // int
$tz = 'America/New_York'; // string | IANA timezone name. On bulk-capable routes, a comma-separated list enables bulk mode.
$ip = '8.8.8.8'; // string | IP address. On bulk-capable routes, a comma-separated list enables bulk mode.
$lat = 40.7128; // float | Latitude. Must be provided together with `lon`.
$lon = -74.006; // float | Longitude. Must be provided together with `lat`.
$offset = '-04:00'; // string | Fixed UTC offset in `+HH:MM` or `-HH:MM` format. On bulk-capable routes, a comma-separated list enables bulk mode.
$autoTz = true; // bool | Set to `true` to resolve using the caller IP from Cloudflare headers.
$utc = true; // bool | Set to `true` to force UTC on routes that support it.
$format = '%Y-%m-%d %H:%M:%S'; // string | Custom date/time format template using supported `strftime`-style directives such as `%Y-%m-%d %H:%M:%S`. Reference: [strftime](https://strftime.net/).
$sign = true; // bool | Set to exactly `true` to ask the gateway to sign the final JSON response. Every authenticated JSON response, including errors, then includes signing headers. Not supported on `/v1/time/clock`.

try {
    $result = $apiInstance->addTime($unix, $unixMs, $iso, $sourceTz, $sourceIp, $sourceLat, $sourceLon, $sourceOffset, $seconds, $minutes, $hours, $days, $tz, $ip, $lat, $lon, $offset, $autoTz, $utc, $format, $sign);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling TimeApi->addTime: ', $e->getMessage(), PHP_EOL;
}

```

## API Endpoints

All URIs are relative to *https://api.timelogicapi.com*

Class | Method | HTTP request | Description
------------ | ------------- | ------------- | -------------
*TimeApi* | [**addTime**](docs/Api/TimeApi.md#addtime) | **GET** /v1/time/add | Add modifiers to a timestamp
*TimeApi* | [**convertTime**](docs/Api/TimeApi.md#converttime) | **GET** /v1/time/convert | Convert a timestamp into a target timezone or offset
*TimeApi* | [**diffTime**](docs/Api/TimeApi.md#difftime) | **GET** /v1/time/diff | Difference between two instants
*TimeApi* | [**getCalendar**](docs/Api/TimeApi.md#getcalendar) | **GET** /v1/time/calendar | Calendar projection for a target instant
*TimeApi* | [**getClock**](docs/Api/TimeApi.md#getclock) | **GET** /v1/time/clock | Render a live HTML clock
*TimeApi* | [**getCurrentTime**](docs/Api/TimeApi.md#getcurrenttime) | **GET** /v1/time/current | Get the current time for a target
*TimeApi* | [**getDst**](docs/Api/TimeApi.md#getdst) | **GET** /v1/time/dst | Daylight-saving status for a target
*TimeApi* | [**getElapsed**](docs/Api/TimeApi.md#getelapsed) | **GET** /v1/time/elapsed | Time elapsed since or remaining until a reference instant
*TimeApi* | [**getTimezone**](docs/Api/TimeApi.md#gettimezone) | **GET** /v1/timezone | Resolve timezone information for a target
*UtilityApi* | [**getPublicSigningKey**](docs/Api/UtilityApi.md#getpublicsigningkey) | **GET** /.well-known/time-api-public-key | Public signing key set

## Models

- [ApiError](docs/Model/ApiError.md)
- [BulkError](docs/Model/BulkError.md)
- [CalendarResponse](docs/Model/CalendarResponse.md)
- [DiffEndpointRef](docs/Model/DiffEndpointRef.md)
- [DiffResponse](docs/Model/DiffResponse.md)
- [DstResponse](docs/Model/DstResponse.md)
- [ElapsedResponse](docs/Model/ElapsedResponse.md)
- [ErrorResponse](docs/Model/ErrorResponse.md)
- [GetCurrentTime200Response](docs/Model/GetCurrentTime200Response.md)
- [GetTimezone200Response](docs/Model/GetTimezone200Response.md)
- [JwkKey](docs/Model/JwkKey.md)
- [JwksResponse](docs/Model/JwksResponse.md)
- [TimePayload](docs/Model/TimePayload.md)
- [TimePayloadBulkItem](docs/Model/TimePayloadBulkItem.md)
- [TimePayloadBulkResponse](docs/Model/TimePayloadBulkResponse.md)
- [TimezoneMatch](docs/Model/TimezoneMatch.md)
- [TimezoneOffsetResponse](docs/Model/TimezoneOffsetResponse.md)
- [TimezoneResolvedResponse](docs/Model/TimezoneResolvedResponse.md)

## Authorization

Authentication schemes defined for the API:
### bearerAuth

- **Type**: Bearer authentication (TimeLogic API key)

### apiKeyHeader

- **Type**: API key
- **API key parameter name**: X-API-Key
- **Location**: HTTP header


### apiKeyQuery

- **Type**: API key
- **API key parameter name**: api_key
- **Location**: URL query string


### rapidApiKey

- **Type**: API key
- **API key parameter name**: X-RapidAPI-Key
- **Location**: HTTP header


### rapidApiHost

- **Type**: API key
- **API key parameter name**: X-RapidAPI-Host
- **Location**: HTTP header


## Tests

To run the tests, use:

```bash
composer install
vendor/bin/phpunit
```

## Author



## About this package

This PHP package is automatically generated by the [TimeLogic API](https://github.com/TimeLogic-API-LLC/timelogic-api-sdks) project:

- API version: `1.0.0`
    - Generator version: `7.10.0`
- Build package: `org.openapitools.codegen.languages.PhpClientCodegen`
