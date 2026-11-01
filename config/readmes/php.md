# TimeLogic API SDK for PHP

Official PHP client for [TimeLogic API](https://api.timelogicapi.com): current time, time zone lookups, conversions, date arithmetic, business-day counts, DST status, calendars, embeddable clocks and signed responses. The package contains two clients:

- the `/v1` client, generated from the [TimeLogic API contract](https://github.com/TimeLogic-API-LLC/timelogic-api-sdks/blob/main/openapi/openapi.yaml), with direct and RapidAPI transports;
- a [WorldTimeAPI-compatible client](#worldtimeapi-compatible-client) for the `/api/timezone` and `/api/ip` routes, which use worldtimeapi.org's paths, fields and plain-text format.

Package: [`timelogic-api/php-sdk`](https://packagist.org/packages/timelogic-api/php-sdk), version __VERSION__. Changes are listed in the [changelog](https://github.com/TimeLogic-API-LLC/timelogic-api-sdks/blob/main/CHANGELOG.md).

## Install

```bash
composer require timelogic-api/php-sdk:__VERSION__
```

Requires PHP 7.4+ with `ext-curl`, `ext-json` and `ext-mbstring`, and Guzzle 7.16.1+ or 8.3.1+. The examples use named arguments (PHP 8.0+); on PHP 7.4 pass the parameters positionally.

## Quick start

Get an API key, export it as `TIMELOGIC_API_KEY`, and run:

```php
<?php
require __DIR__ . '/vendor/autoload.php';

use TimeLogic\Api\Api\TimeApi;
use TimeLogic\Api\TransportConfiguration;

$config = TransportConfiguration::create(getenv('TIMELOGIC_API_KEY'));
$time = new TimeApi(new GuzzleHttp\Client(), $config);

$now = $time->getCurrentTime(tz: 'America/New_York');
echo $now->getIsoLocal(), ' ', $now->getTimezone(), PHP_EOL;
```

## Configuration

The transport helper sets the host and credentials for the `/v1` client. Pass a TimeLogic key for the direct API, or a RapidAPI key with the RapidAPI option; the SDK then sends `X-RapidAPI-Key` and `X-RapidAPI-Host` (default host `timelogic-api-world-time-timezones-time-calculations.p.rapidapi.com`, overridable). Keep keys in environment variables or a secret store, not in source control.

```php
<?php
require __DIR__ . '/vendor/autoload.php';

use TimeLogic\Api\Api\TimeApi;
use TimeLogic\Api\TransportConfiguration;

// Direct API (default host https://api.timelogicapi.com, sends Authorization: Bearer <key>)
$direct = TransportConfiguration::create(getenv('TIMELOGIC_API_KEY'));

// RapidAPI: pass only your RapidAPI key; the SDK sets X-RapidAPI-Key and X-RapidAPI-Host
$rapid = TransportConfiguration::create(getenv('RAPIDAPI_KEY'), true);

// A different host (for example a compatible gateway or a test server)
$custom = TransportConfiguration::create(getenv('TIMELOGIC_API_KEY'), false, 'https://your-compatible-gateway.example');

// Timeouts belong to the Guzzle client you pass in (Guzzle's default is no timeout). The SDK does not retry.
$time = new TimeApi(new GuzzleHttp\Client(['timeout' => 10, 'connect_timeout' => 3]), $direct);
```

## Operations

| Operation | Endpoint | Method |
| --- | --- | --- |
| Current time | `GET /v1/time/current` | `TimeApi::getCurrentTime()` |
| Convert | `GET /v1/time/convert` | `TimeApi::convertTime()` |
| Add | `GET /v1/time/add` | `TimeApi::addTime()` |
| Difference | `GET /v1/time/diff` | `TimeApi::diffTime()` |
| Elapsed | `GET /v1/time/elapsed` | `TimeApi::getElapsed()` |
| Timezone | `GET /v1/timezone` | `TimeApi::getTimezone()` |
| Daylight saving | `GET /v1/time/dst` | `TimeApi::getDst()` |
| Calendar | `GET /v1/time/calendar` | `TimeApi::getCalendar()` |
| Clock | `GET /v1/time/clock` | `TimeApi::getClock()` |
| Signing keys | `GET /.well-known/time-api-public-key` | `UtilityApi::getPublicSigningKey()` |

Operations take the query parameters in the order the endpoint defines them (named arguments on PHP 8). Each operation also has `…WithHttpInfo` (data, status code, headers), `…Async` (a Guzzle promise) and `…Request` (the prepared PSR-7 request) variants. Parameters, response fields and errors for every operation: [How the API works](#how-the-api-works). Generated reference: [TimeApi](https://github.com/TimeLogic-API-LLC/timelogic-api-sdks/blob/main/packages/php/docs/Api/TimeApi.md), [UtilityApi](https://github.com/TimeLogic-API-LLC/timelogic-api-sdks/blob/main/packages/php/docs/Api/UtilityApi.md) and the models in the same folder.

### Examples

```php
<?php
require __DIR__ . '/vendor/autoload.php';

use TimeLogic\Api\Api\TimeApi;
use TimeLogic\Api\Api\UtilityApi;
use TimeLogic\Api\TransportConfiguration;

$config = TransportConfiguration::create(getenv('TIMELOGIC_API_KEY'));
$http = new GuzzleHttp\Client();
$time = new TimeApi($http, $config);

// Convert a New York wall-clock time to Tokyo
$tokyo = $time->convertTime(iso: '2026-03-01T09:00:00', sourceTz: 'America/New_York', tz: 'Asia/Tokyo');

// Add 1 day and 2 hours, shown in New York time
$later = $time->addTime(iso: '2026-03-07T12:00:00Z', days: 1, hours: 2, tz: 'America/New_York');

// Duration and business days between two instants (Zurich holiday calendar)
$diff = $time->diffTime('iso=2026-01-02T00:00:00Z', 'iso=2026-04-30T00:00:00Z', businessDays: true, holidayCountry: 'CH-ZH');
echo $diff->getDays(), ' ', $diff->getDirection(), ' ', $diff->getBusinessDays(), PHP_EOL; // 118 forward 82

// Time left until a deadline
$left = $time->getElapsed(iso: '2027-01-01T00:00:00Z');

// Zone details, DST status with the next transition, ISO week number
$berlin = $time->getTimezone(tz: 'Europe/Berlin');
$dst = $time->getDst(tz: 'America/New_York', next: true);
$calendar = $time->getCalendar(tz: 'Europe/London', week: true);

// Embeddable HTML clock
$html = $time->getClock('digital-dashboard', tz: 'Europe/London');

// Public signing keys (no API key needed)
$keys = (new UtilityApi($http, $config))->getPublicSigningKey();
```

## Errors, headers and signed responses

```php
<?php
require __DIR__ . '/vendor/autoload.php';

use TimeLogic\Api\Api\TimeApi;
use TimeLogic\Api\ApiException;
use TimeLogic\Api\TransportConfiguration;

$time = new TimeApi(new GuzzleHttp\Client(), TransportConfiguration::create(getenv('TIMELOGIC_API_KEY')));

try {
    $time->getCurrentTime(tz: 'Bad/Zone');
} catch (ApiException $e) {
    echo $e->getCode(), ' ', $e->getResponseBody(), PHP_EOL;
    // 400 {"error":{"code":"INVALID_PARAMETER","message":"Invalid timezone.",...},"request_id":"..."}
    $error = $e->getResponseObject(); // TimeLogic\Api\Model\ErrorResponse
}

// *WithHttpInfo returns [data, status code, headers]
[$dst, $status, $headers] = $time->getDstWithHttpInfo(tz: 'Asia/Kolkata', sign: true);
echo $status, ' ', $headers['x-timelogic-quota-limit'][0], ' ', $headers['X-TimeLogic-Signature'][0], PHP_EOL;
```

The SDK does not retry. A `429 QUOTA_EXCEEDED` carries no `Retry-After` header; quotas reset at 00:00 UTC on the 1st of each month. Status codes and error codes: [Errors](#errors).

## WorldTimeAPI-compatible client

A separate client for the WorldTimeAPI-compatible routes. Code written for worldtimeapi.org needs only the new host and an API key: paths, field names, types and the `.txt` format are the same. The client sends the key as `X-API-Key`, has a 30-second timeout, does not retry, and does not use or change the `/v1` configuration.

```php
<?php
require __DIR__ . '/vendor/autoload.php';

use TimeLogic\Api\WorldTimeApi\WorldTimeApiClient;
use TimeLogic\Api\WorldTimeApi\WorldTimeApiException;
use TimeLogic\Api\WorldTimeApi\WorldTimeApiUnknownLocationException;

$wta = new WorldTimeApiClient(getenv('TIMELOGIC_API_KEY')); // 30-second timeout

$zones = $wta->listTimezones();                 // ['Africa/Abidjan', ...]
$europe = $wta->listTimezonesInArea('Europe');  // ['Europe/Amsterdam', ...]
$london = $wta->getTimezone('Europe/London');
echo $london->datetime, ' ', $london->utc_offset, PHP_EOL; // worldtimeapi.org field names
$text = $wta->getTimezoneText('Europe/London'); // "abbreviation: GMT\nclient_ip: ..."
$mine = $wta->getIp();                          // the caller's address
$google = $wta->getIp('8.8.8.8');

try {
    $wta->getTimezone('Nope/Zone');
} catch (WorldTimeApiUnknownLocationException $e) {
    echo 'unknown location', PHP_EOL; // 404 {"error":"unknown location"}
} catch (WorldTimeApiException $e) {
    echo $e->getStatus(), ' ', $e->getError(), PHP_EOL;
}

// Signed responses: read the headers through requestRaw
$signed = new WorldTimeApiClient(getenv('TIMELOGIC_API_KEY'), WorldTimeApiClient::DEFAULT_BASE_URL, true);
$raw = $signed->requestRaw('/api/timezone/Europe/London');
echo $raw->status, ' ', $raw->headers['x-timelogic-signature'], ' ', $raw->body, PHP_EOL; // lower-case header names
```

Routes, fields and errors: [WorldTimeAPI-compatible routes](#worldtimeapi-compatible-routes).

## Migrating from 1.x to 2.0

2.0 changes the `/v1` response types so that every response decodes into a typed model. The API itself is unchanged. What changed in the contract, for every language:

- `timezone` returns one model, `TimezoneResponse`: the time payload plus `offset`, `dst`, and `matching_zones` (present only for `offset` lookups). The `oneOf` wrapper `GetTimezone200Response` and its members `TimezoneResolvedResponse` and `TimezoneOffsetResponse` are removed.
- `TimezoneMatch` (the `matching_zones` item) is `timezone`, `offset` and `dst`, as the API returns it. It previously described a full time payload.
- `timezone` takes the `format` parameter, after `sign`.
- `JwkKey` lists the optional `key_ops` and `ext` members.
- `current` and `convert` no longer reject a comma-separated `tz` list longer than 64 characters or an `offset` list before sending it; an invalid value in a list comes back as a `BulkError` item.

In this package:

- Bulk `getCurrentTime` / `convertTime` calls return `TimePayloadBulkResponse`, a countable, iterable and array-accessible list of `TimePayload` and `BulkError` objects. 1.x returned a `GetCurrentTime200Response` without the items. One target still returns `GetCurrentTime200Response`.
- `getTimezone` returns `TimezoneResponse` and takes `format`. `getMatchingZones()` holds `TimezoneMatch` objects.

Before (1.x):

```php
$response = $http->send($time->getCurrentTimeRequest(tz: 'Europe/London,Asia/Tokyo'));
$items = json_decode((string) $response->getBody(), true);
```

After (2.0):

```php
use TimeLogic\Api\Model\BulkError;

foreach ($time->getCurrentTime(tz: 'Europe/London,Nope/Zone') as $item) {
    echo $item instanceof BulkError
        ? $item->getItem() . ': ' . $item->getError()->getCode()
        : $item->getIsoLocal(), PHP_EOL;
}

$ist = $time->getTimezone(offset: '+05:30');
foreach ($ist->getMatchingZones() as $zone) {
    echo $zone->getTimezone(), ' ', $zone->getOffset(), PHP_EOL;
}
```

## Known issues

Checked against the live API for this release: every `/v1` operation, including bulk `current` / `convert` calls and `offset` lookups with `timezone`, decodes into the typed models. There are no known issues.

<!-- include: shared/v1-api.md -->

<!-- include: shared/worldtimeapi.md -->

## Support

Questions and problem reports: [issue tracker](https://github.com/TimeLogic-API-LLC/timelogic-api-sdks/issues). Security issues: see [SECURITY.md](https://github.com/TimeLogic-API-LLC/timelogic-api-sdks/blob/main/SECURITY.md). Service status: [status.timelogicapi.com](https://status.timelogicapi.com).

## License

[Unlicense](https://github.com/TimeLogic-API-LLC/timelogic-api-sdks/blob/main/LICENSE).
