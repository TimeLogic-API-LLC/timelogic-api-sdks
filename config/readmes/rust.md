# TimeLogic API SDK for Rust

Official Rust client for [TimeLogic API](https://api.timelogicapi.com): current time, time zone lookups, conversions, date arithmetic, business-day counts, DST status, calendars, embeddable clocks and signed responses. The package contains two clients:

- the `/v1` client, generated from the [TimeLogic API contract](https://github.com/TimeLogic-API-LLC/timelogic-api-sdks/blob/main/openapi/openapi.yaml), with direct and RapidAPI transports;
- a [WorldTimeAPI-compatible client](#worldtimeapi-compatible-client) for the `/api/timezone` and `/api/ip` routes, which use worldtimeapi.org's paths, fields and plain-text format.

Package: [`timelogic-api`](https://crates.io/crates/timelogic-api), version __VERSION__. Changes are listed in the [changelog](https://github.com/TimeLogic-API-LLC/timelogic-api-sdks/blob/main/CHANGELOG.md).

## Install

```bash
cargo add timelogic-api@__VERSION__
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

<!-- include: shared/v1-api.md -->

<!-- include: shared/worldtimeapi.md -->

## Support

Questions and problem reports: [issue tracker](https://github.com/TimeLogic-API-LLC/timelogic-api-sdks/issues). Security issues: see [SECURITY.md](https://github.com/TimeLogic-API-LLC/timelogic-api-sdks/blob/main/SECURITY.md). Service status: [status.timelogicapi.com](https://status.timelogicapi.com).

## License

[Unlicense](https://github.com/TimeLogic-API-LLC/timelogic-api-sdks/blob/main/LICENSE).
