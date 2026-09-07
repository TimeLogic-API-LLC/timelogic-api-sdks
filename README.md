# TimeLogic API SDKs

[![SDK CI](https://github.com/TimeLogic-API-LLC/timelogic-api-sdks/actions/workflows/ci.yml/badge.svg)](https://github.com/TimeLogic-API-LLC/timelogic-api-sdks/actions/workflows/ci.yml)
[![Latest release](https://img.shields.io/github/v/release/TimeLogic-API-LLC/timelogic-api-sdks?display_name=tag&sort=semver)](https://github.com/TimeLogic-API-LLC/timelogic-api-sdks/releases)
[![npm](https://img.shields.io/npm/v/%40timelogic%2Fdirect-api?logo=npm&label=npm)](https://www.npmjs.com/package/@timelogic/direct-api)
[![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)](LICENSE)

Official client libraries for [TimeLogic API](https://api.timelogicapi.com), a world-time API for current time, time zones, calendars, daylight-saving rules, elapsed time, and signed JSON responses.

The SDKs are generated from the versioned contract in [`openapi/openapi.yaml`](openapi/openapi.yaml). The repository keeps the source contract, language clients, tests, and independent release automation together so every published client represents the same API.

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
    .package(url: "https://github.com/TimeLogic-API-LLC/timelogic-api-sdks.git", from: "1.0.1")
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
```

Without `TIMELOGIC_SDK_TEST_API_KEY`, live HTTP checks are skipped and static contract checks still run. Use a dedicated, low-quota test key for local live checks; never use a master, billing, or unrestricted production key.

## Releases

Releases use immutable `vMAJOR.MINOR.PATCH` tags. Each registry has an independent job, so a failure in one publisher does not block the others. See [`PUBLISHING.md`](PUBLISHING.md) for registry setup, trusted publishing, and release verification.

## Security and support

Please report security issues privately using [`SECURITY.md`](SECURITY.md). For general questions or bug reports, use the [issue tracker](https://github.com/TimeLogic-API-LLC/timelogic-api-sdks/issues).

Licensed under the [Unlicense](LICENSE).
