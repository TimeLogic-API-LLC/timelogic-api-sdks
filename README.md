# TimeLogic API SDKs

[![SDK CI](https://github.com/TimeLogic-API-LLC/timelogic-api-sdks/actions/workflows/ci.yml/badge.svg)](https://github.com/TimeLogic-API-LLC/timelogic-api-sdks/actions/workflows/ci.yml)
[![Latest release](https://img.shields.io/github/v/release/TimeLogic-API-LLC/timelogic-api-sdks?display_name=tag&sort=semver)](https://github.com/TimeLogic-API-LLC/timelogic-api-sdks/releases)
[![npm](https://img.shields.io/npm/v/%40timelogic%2Fdirect-api?logo=npm&label=npm)](https://www.npmjs.com/package/@timelogic/direct-api)
[![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)](LICENSE)
[![TimeLogic API status](https://status.timelogicapi.com/badge/timelogic-api/status)](https://status.timelogicapi.com)
[![TimeLogic API uptime](https://status.timelogicapi.com/badge/timelogic-api/uptime)](https://status.timelogicapi.com)

Official client libraries for [TimeLogic API](https://api.timelogicapi.com), a world-time API for current time, time zones, calendars, daylight-saving rules, elapsed time, and signed JSON responses.

The `/v1` SDKs are generated from the versioned contract in [`openapi/openapi.yaml`](openapi/openapi.yaml): the code repository's direct API contract, kept verbatim in [`openapi/openapi-direct.yaml`](openapi/openapi-direct.yaml), plus the SDK's RapidAPI transport (`npm run build-spec` rebuilds it). Every package also includes a [WorldTimeAPI-compatible client](#worldtimeapi-compatible-client) for the routes in [`openapi/openapi-worldtimeapi.yaml`](openapi/openapi-worldtimeapi.yaml). The repository keeps the source contract, language clients, tests, and independent release automation together so every published client represents the same API.

## Supported SDKs

| Language | Package | Install |
| --- | --- | --- |
| TypeScript / JavaScript | [`@timelogic/direct-api`](https://www.npmjs.com/package/@timelogic/direct-api) | `npm install @timelogic/direct-api` |
| Python | [`timelogic-api`](https://pypi.org/project/timelogic-api/) | `python -m pip install timelogic-api` |
| Rust | [`timelogic-api`](https://crates.io/crates/timelogic-api) | `cargo add timelogic-api` |
| Go | [`packages/go`](https://pkg.go.dev/github.com/TimeLogic-API-LLC/timelogic-api-sdks/packages/go) | `go get github.com/TimeLogic-API-LLC/timelogic-api-sdks/packages/go` |
| Java | `com.timelogicapi:timelogic-api` | [Maven Central](https://central.sonatype.com/artifact/com.timelogicapi/timelogic-api) |
| Kotlin | `com.timelogicapi:timelogic-api-kotlin` | [Maven Central](https://central.sonatype.com/artifact/com.timelogicapi/timelogic-api-kotlin) |
| .NET | [`TimeLogic.Api`](https://www.nuget.org/packages/TimeLogic.Api) | `dotnet add package TimeLogic.Api` |
| PHP | [`timelogic-api/php-sdk`](https://packagist.org/packages/timelogic-api/php-sdk) | `composer require timelogic-api/php-sdk` |
| Ruby | [`timelogic-api`](https://rubygems.org/gems/timelogic-api) | `gem install timelogic-api` |
| Swift | `TimeLogicAPI` | [Swift Package Manager](#swift) |

## API capabilities

- Current time by timezone, IP address, or UTC offset
- Time conversion, differences, elapsed time, calendars, and daylight-saving status
- Timezone resolution and a live clock endpoint
- Optional signed JSON responses and public signing-key discovery
- Direct API and RapidAPI transports

All documented operations are `GET` requests. The contract rejects conflicting credential selectors and permits only one selector family per request.

## WorldTimeAPI-compatible client

Every package also contains a client for TimeLogic's WorldTimeAPI-compatible routes (`/api/timezone`, `/api/timezone/{area}`, `/api/timezone/{area}/{location}[/{region}]`, `/api/ip`, `/api/ip/{ip}` and their `.txt` variants). They return the same paths, field names and plain-text formats as worldtimeapi.org, so code written for worldtimeapi.org needs only the new host and a key. Install nothing new: the client ships inside the packages above, under its own namespace, and does not change any `/v1` class, configuration or default.

| Language | Where | Call |
| --- | --- | --- |
| TypeScript | `@timelogic/direct-api` → `WorldTimeApiClient` | `await new WorldTimeApiClient({ apiKey }).getTimezone('Europe/London')` |
| Python | `timelogic_direct_api.worldtimeapi` | `WorldTimeApiClient(api_key=key).get_timezone("Europe/London")` |
| Go | `github.com/TimeLogic-API-LLC/timelogic-api-sdks/packages/go/worldtimeapi` | `worldtimeapi.NewClient(key).GetTimezone(ctx, "Europe/London")` |
| Rust | `timelogic_api::worldtimeapi` | `Client::new(key).get_timezone("Europe/London").await?` |
| Java | `com.timelogic.direct.worldtimeapi` | `new WorldTimeApiClient(key).getTimezone("Europe/London")` |
| Kotlin | `com.timelogic.direct.api.worldtimeapi` | `WorldTimeApiClient(key).getTimezone("Europe/London")` |
| .NET | `TimeLogic.Api.WorldTimeApi` | `await new WorldTimeApiClient(key).GetTimezoneAsync("Europe/London")` |
| PHP | `TimeLogic\Api\WorldTimeApi` | `(new WorldTimeApiClient($key))->getTimezone('Europe/London')` |
| Ruby | `TimeLogic::Api::WorldTimeApi` | `TimeLogic::Api::WorldTimeApi::Client.new(api_key: key).get_timezone('Europe/London')` |
| Swift | `TimeLogicAPI` → `WorldTimeAPIClient` | `WorldTimeAPIClient(apiKey: key).getTimezone("Europe/London") { result in … }` |

Each client has the same operations (named in each language's style):

- `listTimezones` / `listTimezonesText`: every zone name (`/api/timezone`, `/api/timezone.txt`)
- `listTimezonesInArea(area)` / `…Text`: the zones in an area such as `Europe`
- `getTimezone(zone)` / `getTimezoneText(zone)`: the time object for `Area/Location`, `Area/Location/Region` or a one-word zone such as `UTC`
- `getIp()` / `getIp(ip)` and their `…Text` variants: the time for the caller's address or a given IP
- `requestRaw(path)`: status, headers and body for any `/api/*` path

The time object keeps the worldtimeapi.org fields: `abbreviation`, `client_ip`, `datetime`, `day_of_week`, `day_of_year`, `dst`, `dst_from`, `dst_offset`, `dst_until`, `raw_offset`, `timezone`, `unixtime`, `utc_datetime`, `utc_offset` and `week_number` (camelCase properties in Java, Kotlin, .NET and Swift, mapped to the same JSON names). An unknown zone returns worldtimeapi.org's 404 `{"error":"unknown location"}`, surfaced as `isUnknownLocation` / `is_unknown_location`, a dedicated `…UnknownLocation…` exception or error case, or `errors.Is(err, worldtimeapi.ErrUnknownLocation)` in Go. The key is sent as the `X-API-Key` header. Pass `sign: true` (or the language's equivalent) to receive the detached `X-TimeLogic-Signature*` headers, which `requestRaw` returns.

```ts
import { WorldTimeApiClient } from '@timelogic/direct-api';

const wta = new WorldTimeApiClient({ apiKey: process.env.TIMELOGIC_API_KEY! });
const now = await wta.getTimezone('Europe/London');
console.log(now.datetime, now.utc_offset, now.dst);
```

```python
import os
from timelogic_direct_api.worldtimeapi import WorldTimeApiClient, WorldTimeApiUnknownLocationError

wta = WorldTimeApiClient(api_key=os.environ["TIMELOGIC_API_KEY"])
try:
    print(wta.get_timezone("America/Argentina/Salta").datetime)
except WorldTimeApiUnknownLocationError:
    print("unknown location")
```

```go
client := worldtimeapi.NewClient(os.Getenv("TIMELOGIC_API_KEY"))
now, err := client.GetIP(ctx, "8.8.8.8")
if worldtimeapi.IsUnknownLocation(err) {
	// 404 {"error":"unknown location"}
}
```

Live tests for these clients run only when `TIMELOGIC_API_KEY` is set.

## Authentication

Keep API keys in environment variables or your platform secret store. Never commit credentials to source control.

```powershell
$env:TIMELOGIC_API_KEY = "your-api-key"
```

Direct API clients use the key supplied through their language-specific configuration. RapidAPI clients use the `rapidApi` (or `rapid_api`) transport option and require only the RapidAPI subscription key; the SDK supplies the required RapidAPI headers.

## Browser support

The public gateway supports cross-origin resource sharing (CORS), so browser-based applications can call the direct API straight from the client with the TypeScript SDK (`@timelogic/direct-api`) using standard `fetch` — no proxy layer or backend required. Signature and quota response headers are exposed to browsers so signed responses can still be verified client-side. Keep API keys out of client-side bundles; prefer short-lived or scoped credentials for browser use.

## TypeScript quick start

```bash
npm install @timelogic/direct-api
```

```ts
import { TimeApi, createConfiguration } from '@timelogic/direct-api';

const configuration = createConfiguration({
  apiKey: process.env.TIMELOGIC_API_KEY!,
});

const api = new TimeApi(configuration);
const response = await api.getCurrentTime({ tz: 'America/New_York' });

console.log(response);
```

See the [TypeScript package README](packages/typescript/README.md) for RapidAPI usage and the complete endpoint list.

## Swift

Swift Package Manager consumes the repository directly:

```swift
dependencies: [
    .package(url: "https://github.com/TimeLogic-API-LLC/timelogic-api-sdks.git", from: "1.0.3")
]
```

The library product and module are both named `TimeLogicAPI`.

## Development

Requirements for full repository validation are Node.js 22+, Docker Desktop, and the toolchain for any language you want to build locally.

```bash
npm ci
npm run validate
npm run generate
npm run verify-generated
npm run test:contract
npm run verify-worldtimeapi
```

`npm run build-spec -- --check` reports whether `openapi/openapi.yaml` is behind `openapi/openapi-direct.yaml`; `npm run build-spec` followed by `npm run generate` applies a newer upstream contract to the `/v1` SDKs.

Without `TIMELOGIC_SDK_TEST_API_KEY`, live HTTP checks are skipped and static contract checks still run. Use a dedicated, low-quota test key for local live checks; never use a master, billing, or unrestricted production key.

## Releases

Releases use immutable `vMAJOR.MINOR.PATCH` tags. Each registry has an independent job, so a failure in one publisher does not block the others. See [`PUBLISHING.md`](PUBLISHING.md) for registry setup, trusted publishing, and release verification.

## Security and support

Please report security issues privately using [`SECURITY.md`](SECURITY.md). For general questions or bug reports, use the [issue tracker](https://github.com/TimeLogic-API-LLC/timelogic-api-sdks/issues).

Licensed under the [Unlicense](LICENSE).
