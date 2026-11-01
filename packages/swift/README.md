# TimeLogic API SDK for Swift

Official Swift client for [TimeLogic API](https://api.timelogicapi.com): current time, time zone lookups, conversions, date arithmetic, business-day counts, DST status, calendars, embeddable clocks and signed responses. The package contains two clients:

- the `/v1` client, generated from the [TimeLogic API contract](https://github.com/TimeLogic-API-LLC/timelogic-api-sdks/blob/main/openapi/openapi.yaml), with direct and RapidAPI transports;
- a [WorldTimeAPI-compatible client](#worldtimeapi-compatible-client) for the `/api/timezone` and `/api/ip` routes, which use worldtimeapi.org's paths, fields and plain-text format.

Package: `TimeLogicAPI` (Swift Package Manager, this repository), version 2.0.0. Changes are listed in the [changelog](https://github.com/TimeLogic-API-LLC/timelogic-api-sdks/blob/main/CHANGELOG.md).

## Install

Swift Package Manager:

```swift
dependencies: [
    .package(url: "https://github.com/TimeLogic-API-LLC/timelogic-api-sdks.git", from: "2.0.0")
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

## How the API works

### Base URLs

| Transport | Base URL | Credentials the SDK sends |
| --- | --- | --- |
| Direct API (default) | `https://api.timelogicapi.com` | `Authorization: Bearer <your TimeLogic API key>` |
| RapidAPI | `https://timelogic-api-world-time-timezones-time-calculations.p.rapidapi.com` | `X-RapidAPI-Key: <your RapidAPI key>` and `X-RapidAPI-Host: <RapidAPI host>` |

The gateway accepts a direct key in three places, checked in this order: `Authorization: Bearer <key>`, the `X-API-Key` header, and the `api_key` query parameter. The `/v1` clients in this package send the bearer header; the WorldTimeAPI-compatible client sends `X-API-Key`. Sending two different keys in one request is rejected with `401 UNAUTHORIZED` ("Conflicting API key credentials."). All operations are `GET` requests (`HEAD` is answered like `GET` without a body).

### Choosing a target (selector rules)

Most time operations take one *target*, chosen with exactly one selector family:

| Selector | Example | Notes |
| --- | --- | --- |
| `tz` | `America/New_York` | IANA zone, matched case-insensitively. Links and aliases resolve to their canonical zone (`Europe/Stockholm` returns `Europe/Berlin`, `UTC` returns `Etc/UTC`). `Etc/GMT+5` is UTC-05:00 (POSIX sign). |
| `ip` | `8.8.8.8` | IPv4 or IPv6. Private, reserved and loopback addresses have no zone and return `404 NOT_FOUND`. |
| `lat` + `lon` | `40.7128`, `-74.006` | Both are required together. |
| `offset` | `-04:00` | Fixed offset, `+HH:MM` or `-HH:MM` only (`+0530` and `+5` are rejected). The response has `timezone: null`. |
| `auto_tz` | `true` | Uses the caller's IP address as seen by the gateway. Not available on the clock route. |
| `utc` | `true` | Forces UTC (convert and add only). The response has `iso_local: null` and `timezone: null`. |

Combining two selector families returns `400 AMBIGUOUS_TARGET`. Where a target is optional and none is given, the response is in UTC with `timezone: null` and `iso_local: null`; `/v1/timezone` requires a target and returns `400 MISSING_TARGET` without one.

**Bulk requests.** `current` and `convert` accept a comma-separated list in one `tz`, `ip` or `offset` selector (at most 10 values; any comma, even a trailing one, switches to bulk). The response is then an array in request order; each item is either a normal time payload or an item error `{ "item", "error": { "code", "message", "details" }, "request_id" }`, so one bad value does not fail the whole request. Every request URL is limited to 8192 characters.

**Input timestamps.** `convert`, `add`, `calendar`, `elapsed` and `clock` take one input instant: `unix` (whole seconds, -62135596800 to 253402300799), `unix_ms` (whole milliseconds) or `iso` (ISO-8601). An `iso` value without an offset is a local wall-clock time; pair it with one hint (`source_tz`, `source_ip`, `source_lat` + `source_lon`, or `source_offset`), otherwise it is read as UTC. Dates must exist (`2027-02-29` returns `400 INVALID_TIMESTAMP`), a local time inside a spring-forward gap returns `400 INVALID_TIMESTAMP`, and an ambiguous fall-back time resolves to its first occurrence.

**Custom formatting.** Every JSON time route accepts `format`, a `strftime`-style template that adds a `formatted` field. Supported directives: `%a %A %b %B %C %d %D %e %F %h %H %I %j %k %l %m %M %n %p %P %r %R %s %S %t %T %u %v %w %x %X %y %Y %z %:z %Z %%`, with the `-`, `_` and `0` padding flags on numeric directives. `%Z` prints the IANA zone name (or `UTC+HH:MM` for an offset target), not an abbreviation. Any other directive returns `400 INVALID_PARAMETER`. On `diff` and `elapsed`, `format` is a duration template instead, using `%days`, `%hours`, `%minutes` and `%seconds` (each a total in that unit, so 118 days renders `%days days %hours hours` as `118 days 2832 hours`).

### Operations

| Operation | Endpoint | What it returns |
| --- | --- | --- |
| Current time | `GET /v1/time/current` | The current time for one target, or an array for a bulk selector. |
| Convert | `GET /v1/time/convert` | One input instant (`unix`, `unix_ms` or `iso`) expressed in a target zone or offset; bulk targets supported. |
| Add | `GET /v1/time/add` | A base instant (default: now) plus `seconds`, `minutes`, `hours` and `days`, in a target zone. `days` are exact 24-hour days, so the wall-clock time shifts across a DST change. |
| Difference | `GET /v1/time/diff` | The duration between `from` and `to`, with `direction` and optional business days. |
| Elapsed | `GET /v1/time/elapsed` | Time elapsed since, or remaining until, a reference instant (compared with now or a `compare_*` instant), with optional business days. |
| Timezone | `GET /v1/timezone` | Zone metadata for a target: current time plus `offset` (minutes) and `dst`. An `offset` lookup adds `matching_zones`. |
| Daylight saving | `GET /v1/time/dst` | Whether DST is active for a target; `next=true` adds `next_transition`. |
| Calendar | `GET /v1/time/calendar` | Calendar fields (`year`, `month`, `month_name`, `day`) for an instant and target; `week=true` adds the ISO `week_number`. |
| Clock | `GET /v1/time/clock` | An embeddable HTML clock fragment (`text/html`). `style` is required (30 styles, for example `digital-dashboard` or `analog-station`); `auto_tz` and `sign` are not supported here. |
| Signing keys | `GET /.well-known/time-api-public-key` | The public Ed25519 keys (JWKS) used to verify signed responses. No API key needed; `kid` filters to one key. |

#### Time payload fields

`current`, `convert`, `add`, `timezone`, `dst` and `calendar` all return these fields:

| Field | Type | Meaning |
| --- | --- | --- |
| `unix` | integer | Unix seconds. |
| `unix_ms` | integer | Unix milliseconds. |
| `utc` | string | UTC timestamp, for example `2026-11-01T13:16:03Z`. |
| `iso_local` | string or null | Local ISO-8601 time with offset; `null` for UTC-only responses. |
| `rfc2822` | string | RFC 2822 local time. |
| `human` | string | Readable local time, for example `November 1, 2026, 8:16 AM America/New_York`. |
| `day_number` | integer | Day of the week counted from Sunday (1 = Sunday ... 7 = Saturday). |
| `day_short`, `day_full` | string | `Sun` / `Sunday`. |
| `timezone` | string or null | Canonical IANA zone; `null` for offset and UTC targets. |
| `formatted` | string | Present only when `format` was sent. |

Extra fields per operation:

- `/v1/timezone`: `offset` (minutes east of UTC) and `dst` (boolean); with an `offset` selector also `matching_zones`, the geographic zones currently at that offset (`UTC` and `Etc/*` excluded).
- `/v1/time/dst`: `dst_active` and, with `next=true`, `next_transition` (the next UTC-offset change, or `null` if the zone has none).
- `/v1/time/calendar`: `year`, `month`, `month_name`, `day`, and with `week=true` `week_number` (ISO 8601 week).
- `/v1/time/diff`: `seconds`, `minutes`, `hours`, `days` (each a total, not a remainder), `direction` (`forward`, `backward` or `same`), `human` (always in hours, minutes and seconds), `from.unix_ms`, `to.unix_ms`, and `business_days` when requested.
- `/v1/time/elapsed`: `seconds`, `minutes`, `hours`, `days`, `human`, `direction` (`left` while the reference is still ahead, `passed` once it is behind), and `business_days` when requested.

#### Difference and elapsed

`diff` takes two *time specifiers*, `from` and `to`: `now`, `unix=<seconds>`, `unix_ms=<milliseconds>`, `iso=<ISO-8601>`, `offset=±HH:MM`, `tz=<IANA zone>` or `ip=<address>`. The `tz=`, `ip=` and `offset=` forms mean "now" (they only choose the calendar date used for business days). A local `iso` can be placed with `from_tz`/`from_ip`/`from_lat`+`from_lon`/`from_offset` and the matching `to_*` hints.

`elapsed` takes one reference instant (`unix`, `unix_ms` or `iso` with `source_*` hints) and compares it with now, with a `compare_unix`/`compare_unix_ms`/`compare_iso` instant (with `compare_source_*` hints), or with the current time at a target selector.

**Business days.** Set `business_days=true` to add `business_days`. Days are counted by calendar date, start included and end excluded. Add `holiday_country` (ISO 3166-1 alpha-2, any letter case, optionally with a subdivision such as `US-CA` or `CH-ZH`) to skip that calendar's public holidays; `holiday_subdivision` (for example `ZH`, `ENG`, `01`) selects a region and requires `holiday_country`. Weekends follow the calendar's country (Friday/Saturday for `SA`, Saturday/Sunday when no calendar is given). Holiday coverage is 1900 to 2100. Example: from `2026-01-02T00:00:00Z` to `2026-04-30T00:00:00Z` gives `business_days: 83` with `holiday_country=FR`, `82` with `CH-ZH`, and `79` with `SA`.

### Errors

Every error has the same JSON body:

```json
{ "error": { "code": "INVALID_PARAMETER", "message": "Invalid timezone.", "details": { "tz": "Bad/Zone" } }, "request_id": "547f27d2-1acc-46e6-a9a6-686ec2ca99d9" }
```

| Status | Codes | When |
| --- | --- | --- |
| 400 | `INVALID_PARAMETER`, `INVALID_TIMESTAMP`, `AMBIGUOUS_TARGET`, `MISSING_TARGET` | A parameter is malformed or out of range, two selector families were combined, or a required target is missing. |
| 401 | `UNAUTHORIZED` | Missing, invalid or conflicting API key credentials. |
| 403 | `SUBSCRIPTION_INACTIVE` | The key or the customer subscription is not active. |
| 404 | `NOT_FOUND` | Unknown route (including a trailing slash), or an `ip` with no timezone mapping. |
| 405 | `METHOD_NOT_ALLOWED` | A method other than `GET`/`HEAD`; the response carries `Allow: GET, HEAD`. |
| 429 | `QUOTA_EXCEEDED` | The plan's monthly quota is used up. |
| 500 | `INTERNAL_ERROR` | Internal failure, including signing failures. |
| 501 | `DEPENDENCY_NOT_READY` | A required resolver or dependency is not ready. |
| 502 | `INTERNAL_ERROR` | The gateway could not reach the core service. |

Quote `request_id` (also sent as the `X-Request-Id` header) when you contact support.

### Response headers, quotas and limits

| Header | Meaning |
| --- | --- |
| `X-Request-Id` | Request identifier, on every response. |
| `X-Auth-Mode` | How the request was authenticated (`api_key`). |
| `X-TimeLogic-Customer-ID` | Your customer identifier. |
| `X-TimeLogic-Plan` | Your plan, for example `free`. |
| `X-TimeLogic-Quota-Limit` | Requests included per month, or `unlimited`. |
| `X-TimeLogic-Quota-State` | Cached quota state, for example `active`. |
| `X-TimeLogic-Key-Id` | On unsigned responses, the ID of the API key that made the request; on signed responses, the signing key `kid`. |

Header names are case-insensitive in HTTP. Some SDKs return headers as a plain map keyed by the name as received (most arrive in lower case, the signature headers as `X-TimeLogic-Signature…`), so compare names case-insensitively.

Quotas are counted per UTC calendar month and reset at 00:00 UTC on the 1st. There is no remaining-requests or reset header, no `Retry-After` on `429`, and no published per-second limit. Bulk selectors take at most 10 values and every request URL is limited to 8192 characters.

### Signed responses

Pass `sign` (`true`) on any JSON route except the clock to receive a detached Ed25519 signature over the exact response body, in these headers: `X-TimeLogic-Signature` (Base64), `X-TimeLogic-Key-Id`, `X-TimeLogic-Signature-Alg` (`Ed25519`), `X-TimeLogic-Signature-Timestamp`, `X-TimeLogic-Content-SHA256` and `X-TimeLogic-Signature-Input`. To verify: decode `X-TimeLogic-Signature-Input` (Base64URL), check that its `content-sha256` line matches the SHA-256 of the body bytes, then verify the signature over the decoded input with the key whose `kid` matches, from `GET /.well-known/time-api-public-key`. The body is unchanged by signing. The headers are exposed to browsers through CORS.

## WorldTimeAPI-compatible routes

### Routes

The client covers all 12 routes of the WorldTimeAPI-compatible contract ([`openapi/openapi-worldtimeapi.yaml`](https://github.com/TimeLogic-API-LLC/timelogic-api-sdks/blob/main/openapi/openapi-worldtimeapi.yaml)). Each JSON route has a plain-text twin ending in `.txt`.

| Route | Returns |
| --- | --- |
| `GET /api/timezone`, `/api/timezone.txt` | Every zone name. |
| `GET /api/timezone/{area}`, `.txt` | The zone names in an area such as `Europe`, or the time object for a one-word zone such as `UTC`. |
| `GET /api/timezone/{area}/{location}`, `.txt` | The time object for a zone such as `Europe/London`. |
| `GET /api/timezone/{area}/{location}/{region}`, `.txt` | The time object for a three-part zone such as `America/Argentina/Salta`. |
| `GET /api/ip`, `/api/ip.txt` | The time object for the caller's IP address. |
| `GET /api/ip/{ip}`, `.txt` | The time object for an IPv4 or IPv6 address. |

Zone names match in any letter case. Query parameters other than `api_key` and `sign` are ignored.

### Time object fields

| Field | Example | Meaning |
| --- | --- | --- |
| `abbreviation` | `GMT` | Zone abbreviation. |
| `client_ip` | `203.0.113.7` | The caller's IP address. |
| `datetime` | `2026-11-01T13:18:00.721000+00:00` | Local time with six fractional digits (millisecond resolution, so the last three are `000`). |
| `day_of_week` | `0` | 0 = Sunday ... 6 = Saturday. |
| `day_of_year` | `305` | 1-366. |
| `dst` | `false` | Whether DST is in effect. |
| `dst_from` | `null` | Start of the current DST period, or `null`. |
| `dst_offset` | `0` | DST offset in seconds. |
| `dst_until` | `null` | End of the current DST period, or `null`. |
| `raw_offset` | `0` | Standard offset in seconds. |
| `timezone` | `Europe/London` | Zone name. |
| `unixtime` | `1793539080` | Unix seconds. |
| `utc_datetime` | `2026-11-01T13:18:00.721000+00:00` | UTC time. |
| `utc_offset` | `+00:00` | Current total offset. |
| `week_number` | `44` | ISO 8601 week number. |

The `.txt` variants return the same fields as `key: value` lines in alphabetical order.

### Errors and authentication

Unknown zones and malformed addresses return `404` with worldtimeapi.org's bodies: `{"error":"unknown location"}`, `{"error":"malformed ip"}` or `{"error":"not found"}` (on `.txt` routes, a line starting with `Error:`). Authentication and quota errors (`401`, `403`, `429`) use the TimeLogic error body shown in [Errors](#errors). Every route requires a TimeLogic API key, which the client sends as the `X-API-Key` header, and successful calls count toward the monthly quota like `/v1` calls. The client connects to the direct API (`https://api.timelogicapi.com` by default); it does not use the RapidAPI transport.

With signing enabled, the client adds `sign=true` and responses carry the same detached signature headers as `/v1` ([Signed responses](#signed-responses)); the body is byte-identical to the unsigned body. Use the raw request method to read those headers.

## Support

Questions and problem reports: [issue tracker](https://github.com/TimeLogic-API-LLC/timelogic-api-sdks/issues). Security issues: see [SECURITY.md](https://github.com/TimeLogic-API-LLC/timelogic-api-sdks/blob/main/SECURITY.md). Service status: [status.timelogicapi.com](https://status.timelogicapi.com).

## License

[Unlicense](https://github.com/TimeLogic-API-LLC/timelogic-api-sdks/blob/main/LICENSE).
