# TimeLogic API SDK for .NET

Official .NET client for [TimeLogic API](https://api.timelogicapi.com): current time, time zone lookups, conversions, date arithmetic, business-day counts, DST status, calendars, embeddable clocks and signed responses. The package contains two clients:

- the `/v1` client, generated from the [TimeLogic API contract](https://github.com/TimeLogic-API-LLC/timelogic-api-sdks/blob/main/openapi/openapi.yaml), with direct and RapidAPI transports;
- a [WorldTimeAPI-compatible client](#worldtimeapi-compatible-client) for the `/api/timezone` and `/api/ip` routes, which use worldtimeapi.org's paths, fields and plain-text format.

Package: [`TimeLogic.Api`](https://www.nuget.org/packages/TimeLogic.Api), version __VERSION__. Changes are listed in the [changelog](https://github.com/TimeLogic-API-LLC/timelogic-api-sdks/blob/main/CHANGELOG.md).

## Install

```bash
dotnet add package TimeLogic.Api --version __VERSION__
```

Targets .NET 8.

## Quick start

Get an API key, export it as `TIMELOGIC_API_KEY`, and run:

```csharp
using TimeLogic.Api.Api;
using TimeLogic.Api.Client;

var configuration = TransportConfiguration.Create(Environment.GetEnvironmentVariable("TIMELOGIC_API_KEY")!);
var time = new TimeApi(configuration);

var now = time.GetCurrentTime(tz: "America/New_York").GetTimePayload();
Console.WriteLine($"{now.IsoLocal} {now.Timezone}");
```

## Configuration

The transport helper sets the host and credentials for the `/v1` client. Pass a TimeLogic key for the direct API, or a RapidAPI key with the RapidAPI option; the SDK then sends `X-RapidAPI-Key` and `X-RapidAPI-Host` (default host `timelogic-api-world-time-timezones-time-calculations.p.rapidapi.com`, overridable). Keep keys in environment variables or a secret store, not in source control.

```csharp
using TimeLogic.Api.Client;

// Direct API (default host https://api.timelogicapi.com, sends Authorization: Bearer <key>)
var direct = TransportConfiguration.Create(Environment.GetEnvironmentVariable("TIMELOGIC_API_KEY")!);

// RapidAPI: pass only your RapidAPI key; the SDK sets X-RapidAPI-Key and X-RapidAPI-Host
var rapid = TransportConfiguration.Create(Environment.GetEnvironmentVariable("RAPIDAPI_KEY")!, rapidApi: true);

// A different host (for example a compatible gateway or a test server)
var custom = TransportConfiguration.Create(Environment.GetEnvironmentVariable("TIMELOGIC_API_KEY")!, baseUrl: "https://your-compatible-gateway.example");

// Request timeout (default 100 seconds). The SDK does not retry unless you set RetryConfiguration.RetryPolicy.
direct.Timeout = TimeSpan.FromSeconds(10);
```

## Operations

| Operation | Endpoint | Method |
| --- | --- | --- |
| Current time | `GET /v1/time/current` | `TimeApi.GetCurrentTime()` / `GetCurrentTimeAsync()` |
| Convert | `GET /v1/time/convert` | `TimeApi.ConvertTime()` / `ConvertTimeAsync()` |
| Add | `GET /v1/time/add` | `TimeApi.AddTime()` / `AddTimeAsync()` |
| Difference | `GET /v1/time/diff` | `TimeApi.DiffTime()` / `DiffTimeAsync()` |
| Elapsed | `GET /v1/time/elapsed` | `TimeApi.GetElapsed()` / `GetElapsedAsync()` |
| Timezone | `GET /v1/timezone` | `TimeApi.GetTimezone()` / `GetTimezoneAsync()` |
| Daylight saving | `GET /v1/time/dst` | `TimeApi.GetDst()` / `GetDstAsync()` |
| Calendar | `GET /v1/time/calendar` | `TimeApi.GetCalendar()` / `GetCalendarAsync()` |
| Clock | `GET /v1/time/clock` | `TimeApi.GetClock()` / `GetClockAsync()` |
| Signing keys | `GET /.well-known/time-api-public-key` | `UtilityApi.GetPublicSigningKey()` / `GetPublicSigningKeyAsync()` |

Operations take optional named arguments (`tz: "Europe/Berlin"`), and each has an `…Async` form and `…WithHttpInfo` / `…WithHttpInfoAsync` forms that return the status code, headers and data. API errors throw `ApiException` with `ErrorCode` (the HTTP status) and `ErrorContent` (the body). Parameters, response fields and errors for every operation: [How the API works](#how-the-api-works). Generated reference: [TimeApi](https://github.com/TimeLogic-API-LLC/timelogic-api-sdks/blob/main/packages/csharp/docs/TimeApi.md), [UtilityApi](https://github.com/TimeLogic-API-LLC/timelogic-api-sdks/blob/main/packages/csharp/docs/UtilityApi.md) and the models in the same folder.

### Examples

```csharp
using TimeLogic.Api.Api;
using TimeLogic.Api.Client;

var configuration = TransportConfiguration.Create(Environment.GetEnvironmentVariable("TIMELOGIC_API_KEY")!);
var time = new TimeApi(configuration);

// Convert a New York wall-clock time to Tokyo
var tokyo = time.ConvertTime(iso: "2026-03-01T09:00:00", sourceTz: "America/New_York", tz: "Asia/Tokyo").GetTimePayload();

// Add 1 day and 2 hours, shown in New York time
var later = time.AddTime(iso: "2026-03-07T12:00:00Z", days: 1, hours: 2, tz: "America/New_York");

// Duration and business days between two instants (Zurich holiday calendar)
var diff = time.DiffTime("iso=2026-01-02T00:00:00Z", "iso=2026-04-30T00:00:00Z", businessDays: true, holidayCountry: "CH-ZH");
Console.WriteLine($"{diff.Days} {diff.Direction} {diff.BusinessDays}"); // 118 Forward 82

// Time left until a deadline
var left = await time.GetElapsedAsync(iso: "2027-01-01T00:00:00Z"); // every operation also has an *Async form

// Zone details, DST status with the next transition, ISO week number
var berlin = time.GetTimezone(tz: "Europe/Berlin");
var dst = time.GetDst(tz: "America/New_York", next: true);
var calendar = time.GetCalendar(tz: "Europe/London", week: true);

// Embeddable HTML clock
string html = time.GetClock("digital-dashboard", tz: "Europe/London");

// Public signing keys (no API key needed)
var keys = new UtilityApi(configuration).GetPublicSigningKey();
```

## Errors, headers and signed responses

```csharp
using TimeLogic.Api.Api;
using TimeLogic.Api.Client;

var time = new TimeApi(TransportConfiguration.Create(Environment.GetEnvironmentVariable("TIMELOGIC_API_KEY")!));

try
{
    time.GetCurrentTime(tz: "Bad/Zone");
}
catch (ApiException e)
{
    Console.WriteLine($"{e.ErrorCode} {e.ErrorContent}");
    // 400 {"error":{"code":"INVALID_PARAMETER","message":"Invalid timezone.",...},"request_id":"..."}
}

// *WithHttpInfo returns the status code and headers (names as the server sent them, lower-case)
var response = time.GetDstWithHttpInfo(tz: "Asia/Kolkata", sign: true);
Console.WriteLine($"{(int)response.StatusCode} {response.Headers["x-timelogic-quota-limit"][0]} {response.Headers["X-TimeLogic-Signature"][0]}");
```

The SDK does not retry. A `429 QUOTA_EXCEEDED` carries no `Retry-After` header; quotas reset at 00:00 UTC on the 1st of each month. Status codes and error codes: [Errors](#errors).

## WorldTimeAPI-compatible client

A separate client for the WorldTimeAPI-compatible routes. Code written for worldtimeapi.org needs only the new host and an API key: paths, field names, types and the `.txt` format are the same. The client sends the key as `X-API-Key`, has a 30-second timeout, does not retry, and does not use or change the `/v1` configuration.

```csharp
using TimeLogic.Api.WorldTimeApi;

var wta = new WorldTimeApiClient(Environment.GetEnvironmentVariable("TIMELOGIC_API_KEY")!); // 30-second timeout

var zones = await wta.ListTimezonesAsync();                 // ["Africa/Abidjan", ...]
var europe = await wta.ListTimezonesInAreaAsync("Europe");  // ["Europe/Amsterdam", ...]
var london = await wta.GetTimezoneAsync("Europe/London");
Console.WriteLine($"{london.Datetime} {london.UtcOffset} {london.Dst}");
var text = await wta.GetTimezoneTextAsync("Europe/London");  // "abbreviation: GMT\nclient_ip: ..."
var mine = await wta.GetIpAsync();                           // the caller's address
var google = await wta.GetIpAsync("8.8.8.8");

try
{
    await wta.GetTimezoneAsync("Nope/Zone");
}
catch (WorldTimeApiUnknownLocationException)
{
    Console.WriteLine("unknown location"); // 404 {"error":"unknown location"}
}
catch (WorldTimeApiException e)
{
    Console.WriteLine($"{e.Status} {e.Error}");
}

// Signed responses: read the headers through RequestRawAsync
var signed = new WorldTimeApiClient(Environment.GetEnvironmentVariable("TIMELOGIC_API_KEY")!, sign: true);
var raw = await signed.RequestRawAsync("/api/timezone/Europe/London");
Console.WriteLine($"{raw.Status} {raw.Headers["x-timelogic-signature"]} {raw.Body}");
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

- `TimePayloadBulkResponse` is a `List<TimePayloadBulkItem>`; bulk `GetCurrentTime` / `ConvertTime` calls decode, and each item holds a `TimePayload` or a `BulkError`. 1.x threw `InvalidDataException`.
- Date-like strings in `oneOf` results (`IsoLocal`) keep the API's offset; they are no longer re-written in the machine's local offset.
- `GetTimezone` returns `TimezoneResponse` and takes `format`. 1.x returned `GetTimezone200Response`.

Before (1.x):

```csharp
var berlin = time.GetTimezone(tz: "Europe/Berlin");
```

After (2.0):

```csharp
var berlin = time.GetTimezone(tz: "Europe/Berlin"); // TimezoneResponse
var ist = time.GetTimezone(offset: "+05:30");
foreach (var zone in ist.MatchingZones) Console.WriteLine($"{zone.Timezone} {zone.Offset}");

var many = time.GetCurrentTime(tz: "Europe/London,Nope/Zone").GetTimePayloadBulkResponse();
foreach (var item in many)
{
    if (item.ActualInstance is BulkError error) Console.WriteLine($"{error.Item}: {error.Error.Code}");
    else Console.WriteLine(item.GetTimePayload().IsoLocal);
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
