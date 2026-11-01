# TimeLogic API SDK for Swift

Official Swift client for [TimeLogic API](https://api.timelogicapi.com): current time, time zone lookups, conversions, date arithmetic, business-day counts, DST status, calendars, embeddable clocks and signed responses. The package contains two clients:

- the `/v1` client, generated from the [TimeLogic API contract](https://github.com/TimeLogic-API-LLC/timelogic-api-sdks/blob/main/openapi/openapi.yaml), with direct and RapidAPI transports;
- a [WorldTimeAPI-compatible client](#worldtimeapi-compatible-client) for the `/api/timezone` and `/api/ip` routes, which use worldtimeapi.org's paths, fields and plain-text format.

Package: `TimeLogicAPI` (Swift Package Manager, this repository), version __VERSION__. Changes are listed in the [changelog](https://github.com/TimeLogic-API-LLC/timelogic-api-sdks/blob/main/CHANGELOG.md).

## Install

Swift Package Manager:

```swift
dependencies: [
    .package(url: "https://github.com/TimeLogic-API-LLC/timelogic-api-sdks.git", from: "__VERSION__")
]
```

Then add the `TimeLogicAPI` product to your target. Supports iOS 11+, macOS 10.13+, tvOS 11+ and watchOS 4+, and builds on Linux.

## Quick start

Get an API key, export it as `TIMELOGIC_API_KEY`, and run:

```swift
import Foundation
import TimeLogicAPI

TransportConfiguration.configure(apiKey: ProcessInfo.processInfo.environment["TIMELOGIC_API_KEY"]!)

TimeAPI.getCurrentTime(tz: "America/New_York") { response, error in
    if case let .typeTimePayload(now)? = response {
        print(now.isoLocal ?? "", now.timezone ?? "")
    } else if let error = error {
        print(error)
    }
}
```

## Configuration

The transport helper sets the host and credentials for the `/v1` client. Pass a TimeLogic key for the direct API, or a RapidAPI key with the RapidAPI option; the SDK then sends `X-RapidAPI-Key` and `X-RapidAPI-Host` (default host `timelogic-api-world-time-timezones-time-calculations.p.rapidapi.com`, overridable). Keep keys in environment variables or a secret store, not in source control.

```swift
import Foundation
import TimeLogicAPI

let env = ProcessInfo.processInfo.environment

// Direct API (default host https://api.timelogicapi.com, sends Authorization: Bearer <key>)
TransportConfiguration.configure(apiKey: env["TIMELOGIC_API_KEY"]!)

// RapidAPI: pass only your RapidAPI key; the SDK sets X-RapidAPI-Key and X-RapidAPI-Host
TransportConfiguration.configure(apiKey: env["RAPIDAPI_KEY"]!, rapidApi: true)

// A different host (for example a compatible gateway or a test server)
TransportConfiguration.configure(apiKey: env["TIMELOGIC_API_KEY"]!, baseURL: "https://your-compatible-gateway.example")

// configure() sets process-wide state (base path and headers), so the last call wins.
// Completion handlers run on TimeLogicAPIClient.apiResponseQueue (the main queue by default).
TimeLogicAPIClient.apiResponseQueue = DispatchQueue(label: "timelogic-responses")
```

## Operations

| Operation | Endpoint | Method |
| --- | --- | --- |
| Current time | `GET /v1/time/current` | `TimeAPI.getCurrentTime()` |
| Convert | `GET /v1/time/convert` | `TimeAPI.convertTime()` |
| Add | `GET /v1/time/add` | `TimeAPI.addTime()` |
| Difference | `GET /v1/time/diff` | `TimeAPI.diffTime()` |
| Elapsed | `GET /v1/time/elapsed` | `TimeAPI.getElapsed()` |
| Timezone | `GET /v1/timezone` | `TimeAPI.getTimezone()` |
| Daylight saving | `GET /v1/time/dst` | `TimeAPI.getDst()` |
| Calendar | `GET /v1/time/calendar` | `TimeAPI.getCalendar()` |
| Clock | `GET /v1/time/clock` | `TimeAPI.getClock()` |
| Signing keys | `GET /.well-known/time-api-public-key` | `UtilityAPI.getPublicSigningKey()` |

Operations are class methods with named, defaulted parameters and a completion handler `(value, error)`. Handlers run on `TimeLogicAPIClient.apiResponseQueue` (the main queue by default). Each operation also has a `…WithRequestBuilder` form; its `execute` result carries `statusCode`, `header`, the decoded `body` and the raw `bodyData`. API errors arrive as `ErrorResponse.error(status, body, response, error)`. Parameters, response fields and errors for every operation: [How the API works](#how-the-api-works). Generated reference: [TimeApi](https://github.com/TimeLogic-API-LLC/timelogic-api-sdks/blob/main/packages/swift/docs/TimeAPI.md), [UtilityApi](https://github.com/TimeLogic-API-LLC/timelogic-api-sdks/blob/main/packages/swift/docs/UtilityAPI.md) and the models in the same folder.

### Examples

```swift
import Foundation
import TimeLogicAPI

TransportConfiguration.configure(apiKey: ProcessInfo.processInfo.environment["TIMELOGIC_API_KEY"]!)

// Convert a New York wall-clock time to Tokyo
TimeAPI.convertTime(iso: "2026-03-01T09:00:00", sourceTz: "America/New_York", tz: "Asia/Tokyo") { response, error in }

// Add 1 day and 2 hours, shown in New York time
TimeAPI.addTime(iso: "2026-03-07T12:00:00Z", hours: 2, days: 1, tz: "America/New_York") { payload, error in }

// Duration and business days between two instants (Zurich holiday calendar)
TimeAPI.diffTime(from: "iso=2026-01-02T00:00:00Z", to: "iso=2026-04-30T00:00:00Z", businessDays: true, holidayCountry: "CH-ZH") { diff, error in
    if let diff = diff {
        print(diff.days, diff.direction, diff.businessDays ?? 0) // 118 forward 82
    }
}

// Time left until a deadline
TimeAPI.getElapsed(iso: "2027-01-01T00:00:00Z") { elapsed, error in }

// Zone details, DST status with the next transition, ISO week number
TimeAPI.getTimezone(tz: "Europe/Berlin") { zone, error in }
TimeAPI.getDst(tz: "America/New_York", next: true) { dst, error in }
TimeAPI.getCalendar(tz: "Europe/London", week: true) { calendar, error in }

// Embeddable HTML clock
TimeAPI.getClock(style: .digitalDashboard, tz: "Europe/London") { html, error in }

// Public signing keys (no API key needed)
UtilityAPI.getPublicSigningKey { keys, error in }
```

## Errors, headers and signed responses

```swift
import Foundation
import TimeLogicAPI

TransportConfiguration.configure(apiKey: ProcessInfo.processInfo.environment["TIMELOGIC_API_KEY"]!)

TimeAPI.getDst(tz: "Bad/Zone") { dst, error in
    if case let ErrorResponse.error(status, data, _, _)? = error {
        print(status, String(decoding: data ?? Data(), as: UTF8.self))
        // 400 {"error":{"code":"INVALID_PARAMETER","message":"Invalid timezone.",...},"request_id":"..."}
    }
}

// The request builder returns the status code and headers too
TimeAPI.getDstWithRequestBuilder(tz: "Asia/Kolkata", sign: true).execute { result in
    if case let .success(response) = result {
        // Header names keep the spelling the platform reports, so compare them case-insensitively
        let headers = Dictionary(uniqueKeysWithValues: response.header.map { ($0.key.lowercased(), $0.value) })
        print(response.statusCode, headers["x-timelogic-quota-limit"] ?? "", headers["x-timelogic-signature"] ?? "")
    }
}
```

The SDK does not retry. A `429 QUOTA_EXCEEDED` carries no `Retry-After` header; quotas reset at 00:00 UTC on the 1st of each month. Status codes and error codes: [Errors](#errors).

## WorldTimeAPI-compatible client

A separate client for the WorldTimeAPI-compatible routes. Code written for worldtimeapi.org needs only the new host and an API key: paths, field names, types and the `.txt` format are the same. The client sends the key as `X-API-Key`, has a 30-second timeout, does not retry, and does not use or change the `/v1` configuration.

```swift
import Foundation
import TimeLogicAPI

let wta = WorldTimeAPIClient(apiKey: ProcessInfo.processInfo.environment["TIMELOGIC_API_KEY"]!)

wta.listTimezones { result in }                // ["Africa/Abidjan", ...]
wta.listTimezonesInArea("Europe") { result in } // ["Europe/Amsterdam", ...]
wta.getTimezone("Europe/London") { result in
    switch result {
    case .success(let london):
        print(london.datetime, london.utcOffset, london.dst)
    case .failure(let error):
        print(error)
    }
}
wta.getTimezoneText("Europe/London") { result in } // "abbreviation: GMT\nclient_ip: ..."
wta.getIp { result in }                            // the caller's address
wta.getIp("8.8.8.8") { result in }

wta.getTimezone("Nope/Zone") { result in
    if case .failure(let error) = result, error.isUnknownLocation {
        print("unknown location") // 404 {"error":"unknown location"}
    }
}

// Signed responses: read the headers through requestRaw
let signed = WorldTimeAPIClient(apiKey: ProcessInfo.processInfo.environment["TIMELOGIC_API_KEY"]!, sign: true)
signed.requestRaw("/api/timezone/Europe/London") { result in
    if case .success(let raw) = result {
        print(raw.status, raw.headers["x-timelogic-signature"] ?? "", raw.text)
    }
}
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

- `getTimezone` completes with `TimezoneResponse`. 1.x completed with the `GetTimezone200Response` enum (`.typeTimezoneResolvedResponse` / `.typeTimezoneOffsetResponse`) and dropped `matchingZones` for `offset` lookups. `getTimezone` takes `format`.
- `matchingZones` items are `TimezoneMatch` (`timezone`, `offset`, `dst`).

Before (1.x):

```swift
TimeAPI.getTimezone(tz: "Europe/Berlin") { response, error in
    if case let .typeTimezoneResolvedResponse(zone)? = response { print(zone.timezone ?? "") }
}
```

After (2.0):

```swift
TimeAPI.getTimezone(tz: "Europe/Berlin") { zone, error in
    print(zone?.timezone ?? "")
}
TimeAPI.getTimezone(offset: "+05:30") { zone, error in
    print(zone?.matchingZones?.map(\.timezone) ?? []) // ["Asia/Colombo", "Asia/Kolkata"]
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
