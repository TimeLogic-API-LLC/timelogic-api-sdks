# TimeLogic API SDKs

This repository contains generated client SDKs for the direct TimeLogic API. It remains private while the generated clients and release automation are verified.

The checked-in contract is always named:

```text
openapi/openapi.yaml
```

It is synchronized from `TimeLogic-API-LLC/timelogic-api/openapi-direct.yaml` by a workflow in the API repository. The synchronization workflow creates a pull request here; it does not silently overwrite `main`.

## Local validation

Requirements: Node.js 22+, Docker Desktop, and the local direct stack when live tests are desired.

```powershell
npm install
npm run validate
npm run generate
npm run verify-generated
npm run test:contract
```

Without `TIMELOGIC_SDK_TEST_API_KEY`, live HTTP tests are skipped and the command succeeds after static validation. With the variable present, live tests run and any failure exits non-zero.

```powershell
$env:TIMELOGIC_SDK_TEST_BASE_URL = "http://127.0.0.1:8787"
$env:TIMELOGIC_SDK_TEST_API_KEY = Get-Content "..\timelogic-api\.wrangler\direct-stack\direct-api-key.txt"
npm run test:contract
```

For CI, configure `TIMELOGIC_SDK_TEST_API_KEY` as a GitHub Actions secret containing a dedicated, low-quota SDK test key. Never use a master, billing, or unrestricted production key.

## Generated targets

TypeScript/npm, Python/PyPI, Rust/crates.io, Go, Java, C#/.NET, PHP, Ruby, Kotlin, and Swift are generated from the same OpenAPI contract. Generated output is reviewed in pull requests before release.

## Direct API and RapidAPI transports

Every SDK defaults to the direct API at `https://api.timelogicapi.com`. Customer or local testing can override the base URL. RapidAPI is selected with the SDK's `rapidApi`/`rapid_api` option; the caller supplies only the RapidAPI subscription key. The SDK automatically switches to:

```text
https://timelogic-api-world-time-timezones-time-calculations.p.rapidapi.com
X-RapidAPI-Key: <key>
X-RapidAPI-Host: timelogic-api-world-time-timezones-time-calculations.p.rapidapi.com
```

The RapidAPI base URL and host header can both be overridden for a compatible proxy or test gateway. The direct default remains unchanged. The OpenAPI source documents both servers and both required RapidAPI headers in `openapi/openapi.yaml`.

TypeScript example:

```ts
import { Configuration, TimeApi, createConfiguration } from '@timelogic/direct-api';

const configuration = createConfiguration({ apiKey: process.env.TIMELOGIC_API_KEY! });
const api = new TimeApi(configuration);

const rapidConfiguration = createConfiguration({
  apiKey: process.env.RAPIDAPI_KEY!,
  rapidApi: true,
});
const rapidApi = new TimeApi(rapidConfiguration);
```

For local testing, pass `baseUrl: "http://127.0.0.1:8787"`. In RapidAPI mode, pass `rapidApiHost` when the host header must differ from the default; `baseUrl` may be overridden independently.

Releases use `vMAJOR.MINOR.PATCH` tags. npm and PyPI use GitHub OIDC trusted publishing. crates.io is gated behind the `PUBLISH_CRATES` repository variable and a protected `CARGO_REGISTRY_TOKEN` environment secret. No registry is published by ordinary commits or pull requests.
