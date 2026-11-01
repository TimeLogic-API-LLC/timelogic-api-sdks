# TimeLogic API SDK for Rust

Official Rust client for [TimeLogic API](https://api.timelogicapi.com): current time, time zone lookups, conversions, date arithmetic, business-day counts, DST status, calendars, embeddable clocks and signed responses. The package contains two clients:

- the `/v1` client, generated from the [TimeLogic API contract](https://github.com/TimeLogic-API-LLC/timelogic-api-sdks/blob/main/openapi/openapi.yaml), with direct and RapidAPI transports;
- a [WorldTimeAPI-compatible client](#worldtimeapi-compatible-client) for the `/api/timezone` and `/api/ip` routes, which use worldtimeapi.org's paths, fields and plain-text format.

Package: [`timelogic-api`](https://crates.io/crates/timelogic-api), version 1.1.0. Changes are listed in the [changelog](https://github.com/TimeLogic-API-LLC/timelogic-api-sdks/blob/main/CHANGELOG.md).

## Install

```bash
cargo add timelogic-api@1.1.0
cargo add tokio --features macros,rt-multi-thread
```

The client is async (`reqwest`) and runs inside a Tokio runtime. The crate name in code is `timelogic_api`.

## Quick start

Get an API key, export it as `TIMELOGIC_API_KEY`, and run:

```rust
use timelogic_api::apis::{configuration::Configuration, time_api};
use timelogic_api::models::GetCurrentTime200Response;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let config = Configuration::with_api_key(std::env::var("TIMELOGIC_API_KEY")?, false, None, None);

    // Parameters are positional Options in the order of the endpoint's query parameters:
    // tz, ip, lat, lon, offset, auto_tz, format, sign
    let now = time_api::get_current_time(&config, Some("America/New_York"), None, None, None, None, None, None, None).await?;
    if let GetCurrentTime200Response::TimePayload(payload) = now {
        println!("{:?} {:?}", payload.iso_local, payload.timezone);
    }
    Ok(())
}
```

## Configuration

The transport helper sets the host and credentials for the `/v1` client. Pass a TimeLogic key for the direct API, or a RapidAPI key with the RapidAPI option; the SDK then sends `X-RapidAPI-Key` and `X-RapidAPI-Host` (default host `timelogic-api-world-time-timezones-time-calculations.p.rapidapi.com`, overridable). Keep keys in environment variables or a secret store, not in source control.

```rust
use timelogic_api::apis::configuration::Configuration;

fn configs() -> Result<(), Box<dyn std::error::Error>> {
    // Direct API (default host https://api.timelogicapi.com, sends Authorization: Bearer <key>)
    let direct = Configuration::with_api_key(std::env::var("TIMELOGIC_API_KEY")?, false, None, None);

    // RapidAPI: pass only your RapidAPI key; the SDK sets X-RapidAPI-Key and X-RapidAPI-Host
    let rapid = Configuration::with_api_key(std::env::var("RAPIDAPI_KEY")?, true, None, None);

    // A different host (for example a compatible gateway or a test server)
    let custom = Configuration::with_api_key(
        std::env::var("TIMELOGIC_API_KEY")?,
        false,
        Some("https://your-compatible-gateway.example".to_owned()),
        None,
    );

    // The default reqwest client has no timeout. Supply your own:
    let mut with_timeout = Configuration::with_api_key(std::env::var("TIMELOGIC_API_KEY")?, false, None, None);
    with_timeout.client = reqwest::Client::builder().timeout(std::time::Duration::from_secs(10)).build()?;

    let _ = (direct, rapid, custom, with_timeout);
    Ok(())
}
```

## Operations

| Operation | Endpoint | Method |
| --- | --- | --- |
| Current time | `GET /v1/time/current` | `time_api::get_current_time()` |
| Convert | `GET /v1/time/convert` | `time_api::convert_time()` |
| Add | `GET /v1/time/add` | `time_api::add_time()` |
| Difference | `GET /v1/time/diff` | `time_api::diff_time()` |
| Elapsed | `GET /v1/time/elapsed` | `time_api::get_elapsed()` |
| Timezone | `GET /v1/timezone` | `time_api::get_timezone()` |
| Daylight saving | `GET /v1/time/dst` | `time_api::get_dst()` |
| Calendar | `GET /v1/time/calendar` | `time_api::get_calendar()` |
| Clock | `GET /v1/time/clock` | `time_api::get_clock()` |
| Signing keys | `GET /.well-known/time-api-public-key` | `utility_api::get_public_signing_key()` |

Operations are async functions that take `&Configuration` followed by every query parameter as a positional `Option`, in the order the endpoint defines them (see the [generated docs](https://github.com/TimeLogic-API-LLC/timelogic-api-sdks/blob/main/packages/rust/docs/TimeApi.md) for each signature). Errors are `Error<T>`: `Error::ResponseError` carries the HTTP status and the raw body. Parameters, response fields and errors for every operation: [How the API works](#how-the-api-works). Generated reference: [TimeApi](https://github.com/TimeLogic-API-LLC/timelogic-api-sdks/blob/main/packages/rust/docs/TimeApi.md), [UtilityApi](https://github.com/TimeLogic-API-LLC/timelogic-api-sdks/blob/main/packages/rust/docs/UtilityApi.md) and the models in the same folder.

### Examples

```rust
use timelogic_api::apis::{configuration::Configuration, time_api, utility_api};

async fn examples() -> Result<(), Box<dyn std::error::Error>> {
    let config = Configuration::with_api_key(std::env::var("TIMELOGIC_API_KEY")?, false, None, None);

    // Convert a New York wall-clock time to Tokyo
    let tokyo = time_api::convert_time(&config, None, None, Some("2026-03-01T09:00:00"), Some("America/New_York"), None, None, None, None, Some("Asia/Tokyo"), None, None, None, None, None, None, None, None).await?;

    // Add 1 day and 2 hours, shown in New York time
    let later = time_api::add_time(&config, None, None, Some("2026-03-07T12:00:00Z"), None, None, None, None, None, None, None, Some(2), Some(1), Some("America/New_York"), None, None, None, None, None, None, None, None).await?;

    // Duration and business days between two instants (Zurich holiday calendar)
    let diff = time_api::diff_time(&config, "iso=2026-01-02T00:00:00Z", "iso=2026-04-30T00:00:00Z", None, None, None, None, None, None, None, None, None, None, None, Some(true), Some("CH-ZH"), None, None).await?;
    println!("{} {:?} {:?}", diff.days, diff.direction, diff.business_days); // 118 Forward Some(82)

    // Time left until a deadline
    let left = time_api::get_elapsed(&config, None, None, Some("2027-01-01T00:00:00Z"), None, None, None, None, None, None, None, None, None, None, None, None, None, None, None, None, None, None, None, None, None, None, None, None).await?;

    // Zone details, DST status with the next transition, ISO week number
    let berlin = time_api::get_timezone(&config, Some("Europe/Berlin"), None, None, None, None, None, None).await?;
    let dst = time_api::get_dst(&config, Some("America/New_York"), None, None, None, None, None, None, Some(true), None).await?;
    let calendar = time_api::get_calendar(&config, None, None, None, None, None, None, None, None, Some("Europe/London"), None, None, None, None, None, None, Some(true), None).await?;

    // Embeddable HTML clock
    let html: String = time_api::get_clock(&config, "digital-dashboard", None, None, None, None, None, None, None, None, Some("Europe/London"), None, None, None, None, None).await?;

    // Public signing keys (no API key needed)
    let keys = utility_api::get_public_signing_key(&config, None).await?;

    let _ = (tokyo, later, left, berlin, dst, calendar, html, keys);
    Ok(())
}
```

## Errors, headers and signed responses

```rust
use timelogic_api::apis::{configuration::Configuration, time_api, Error};

async fn errors() -> Result<(), Box<dyn std::error::Error>> {
    let config = Configuration::with_api_key(std::env::var("TIMELOGIC_API_KEY")?, false, None, None);

    match time_api::get_dst(&config, Some("Bad/Zone"), None, None, None, None, None, None, None, None).await {
        Ok(dst) => println!("{}", dst.dst_active),
        Err(Error::ResponseError(response)) => {
            // response.status is the HTTP status and response.content the raw body.
            // Every error has the same body shape, so the parsed response.entity is always
            // its first variant (Status400); branch on response.status instead.
            println!("{} {}", response.status, response.content);
        }
        Err(other) => return Err(other.into()), // transport or decoding failure
    }
    Ok(())
}
```

The SDK does not retry. A `429 QUOTA_EXCEEDED` carries no `Retry-After` header; quotas reset at 00:00 UTC on the 1st of each month. Status codes and error codes: [Errors](#errors).

## WorldTimeAPI-compatible client

A separate client for the WorldTimeAPI-compatible routes. Code written for worldtimeapi.org needs only the new host and an API key: paths, field names, types and the `.txt` format are the same. The client sends the key as `X-API-Key`, has a 30-second timeout, does not retry, and does not use or change the `/v1` configuration.

```rust
use timelogic_api::worldtimeapi::{Client, Error};

async fn wta() -> Result<(), Box<dyn std::error::Error>> {
    let wta = Client::new(std::env::var("TIMELOGIC_API_KEY")?); // 30-second timeout by default

    let zones = wta.list_timezones().await?;                  // ["Africa/Abidjan", ...]
    let europe = wta.list_timezones_in_area("Europe").await?; // ["Europe/Amsterdam", ...]
    let london = wta.get_timezone("Europe/London").await?;
    println!("{} {} {}", london.datetime, london.utc_offset, london.dst);
    let text = wta.get_timezone_text("Europe/London").await?; // "abbreviation: GMT\nclient_ip: ..."
    let mine = wta.get_ip(None).await?;                        // the caller's address
    let google = wta.get_ip(Some("8.8.8.8")).await?;

    match wta.get_timezone("Nope/Zone").await {
        Err(error) if error.is_unknown_location() => println!("unknown location"), // 404 {"error":"unknown location"}
        Err(Error::Api { status, error, .. }) => println!("{status} {error}"),
        other => println!("{:?}", other.map(|t| t.timezone)),
    }

    // Signed responses: read the headers (lower-case names) through request_raw
    let signed = Client::with_options(std::env::var("TIMELOGIC_API_KEY")?, "https://api.timelogicapi.com", true);
    let raw = signed.request_raw("/api/timezone/Europe/London").await?;
    println!("{} {:?} {}", raw.status, raw.headers.get("x-timelogic-signature"), raw.body);

    let _ = (zones, europe, text, mine, google);
    Ok(())
}
```

Routes, fields and errors: [WorldTimeAPI-compatible routes](#worldtimeapi-compatible-routes).

## Known issues

Checked against the live API for this release. All other operations, including single-target `current`, `convert` and `timezone` calls, decode normally.

- Bulk `get_current_time` / `convert_time` calls (comma-separated selectors) return `Error::Serde`.
- An `offset` lookup with `get_timezone` decodes to `TimezoneResolvedResponse` and drops `matching_zones`.

Read those responses as JSON with the configured HTTP client (this uses `reqwest` with the `json` feature and `serde_json`):

```rust
use timelogic_api::apis::configuration::Configuration;

// Bulk current/convert and offset timezone lookups: read the JSON directly with the
// configured HTTP client until the typed decoders handle these answers.
async fn raw_json(config: &Configuration, path_and_query: &str) -> Result<serde_json::Value, reqwest::Error> {
    let url = format!("{}{}", config.base_path, path_and_query);
    let token = config.bearer_access_token.clone().unwrap_or_default();
    config.client.get(url).bearer_auth(token).send().await?.error_for_status()?.json().await
}

async fn known() -> Result<(), Box<dyn std::error::Error>> {
    let config = Configuration::with_api_key(std::env::var("TIMELOGIC_API_KEY")?, false, None, None);
    let many = raw_json(&config, "/v1/time/current?tz=Europe/London,Asia/Tokyo").await?;
    let offset = raw_json(&config, "/v1/timezone?offset=%2B05:30").await?;
    println!("{} {}", many[1]["timezone"], offset["matching_zones"][0]["timezone"]); // "Asia/Tokyo" "Asia/Colombo"
    Ok(())
}
```

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
