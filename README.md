# TimeLogic API SDKs

Official client libraries for [TimeLogic API](https://api.timelogicapi.com), a world-time API for current time, time zones, calendars, daylight-saving rules, elapsed time, and signed JSON responses.

All SDKs are generated from the checked-in contract at [`openapi/openapi.yaml`](openapi/openapi.yaml). Generated changes are reviewed in pull requests and release jobs verify the generated tree before publishing.

## SDKs and package managers

| Language | Package | Install / consume |
| --- | --- | --- |
| TypeScript | `@timelogic/direct-api` | `npm install @timelogic/direct-api` |
| Python | `timelogic-api` | `python -m pip install timelogic-api` |
| Rust | `timelogic-api` | `cargo add timelogic-api` |
| Go | `github.com/TimeLogic-API-LLC/timelogic-api-sdks/packages/go` | `go get github.com/TimeLogic-API-LLC/timelogic-api-sdks/packages/go` |
| Java | `com.timelogicapi:timelogic-api` | Maven Central |
| Kotlin | `com.timelogicapi:timelogic-api-kotlin` | Maven Central |
| .NET | `TimeLogic.Api` | `dotnet add package TimeLogic.Api` |
| PHP | `timelogic-api/php-sdk` | `composer require timelogic-api/php-sdk` |
| Ruby | `timelogic-api` | `gem install timelogic-api` |
| Swift | `TimeLogicAPI` | Swift Package Manager |

The TypeScript, Python module, Java namespace, Kotlin namespace, and generated source paths retain their v1.0.0 identities for source compatibility. The public package descriptions, titles, coordinates, and documentation use the TimeLogic API brand.

## Quick start

Every SDK accepts an API key through its language-specific configuration. Keep credentials in environment variables or your platform secret store; never commit them.

```powershell
$env:TIMELOGIC_API_KEY = "your-test-key"
```

TypeScript example:

```ts
import { TimeApi, createConfiguration } from '@timelogic/direct-api';

const configuration = createConfiguration({ apiKey: process.env.TIMELOGIC_API_KEY! });
const api = new TimeApi(configuration);
const result = await api.getCurrentTime({ tz: 'America/New_York' });
```

RapidAPI is available through each SDK's `rapidApi`/`rapid_api` transport option. Supply only the RapidAPI subscription key; the SDK sets the required RapidAPI headers. Custom base URLs are explicit caller configuration for compatible gateways or tests.

## Local validation

Requirements: Node.js 22+, Docker Desktop, and the toolchain for any language you want to test.

```powershell
npm ci
npm run validate
npm run generate
npm run verify-generated
npm run test:contract
```

Without `TIMELOGIC_SDK_TEST_API_KEY`, live HTTP checks are skipped and static contract checks still run. For local live checks, use a dedicated low-quota test key:

```powershell
$env:TIMELOGIC_SDK_TEST_BASE_URL = "http://127.0.0.1:8787"
$env:TIMELOGIC_SDK_TEST_API_KEY = "your-dedicated-test-key"
npm run test:contract
```

Never use a master, billing, or unrestricted production key in tests.

## Releases

Releases use immutable `vMAJOR.MINOR.PATCH` tags. The release workflow has independent jobs for npm, PyPI, crates.io, NuGet, Maven Central, Kotlin/Maven Central, RubyGems, Packagist indexing, the Go module tag, and the Swift source tag. Swift Package Manager consumes the repository tag directly. See [`PUBLISHING.md`](PUBLISHING.md) for registry setup and release checks.

## Security and support

Please report security issues privately using the process in [`SECURITY.md`](SECURITY.md). For general questions, use the [issue tracker](https://github.com/TimeLogic-API-LLC/timelogic-api-sdks/issues).

Licensed under the [Unlicense](LICENSE).
