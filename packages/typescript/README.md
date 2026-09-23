# TimeLogic API TypeScript SDK

[![npm version](https://img.shields.io/npm/v/%40timelogic%2Fdirect-api?logo=npm&label=npm)](https://www.npmjs.com/package/@timelogic/direct-api)
[![npm downloads](https://img.shields.io/npm/dm/%40timelogic%2Fdirect-api?logo=npm&label=downloads)](https://www.npmjs.com/package/@timelogic/direct-api)
[![SDK CI](https://github.com/TimeLogic-API-LLC/timelogic-api-sdks/actions/workflows/ci.yml/badge.svg)](https://github.com/TimeLogic-API-LLC/timelogic-api-sdks/actions/workflows/ci.yml)
[![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)](https://github.com/TimeLogic-API-LLC/timelogic-api-sdks/blob/main/LICENSE)

Official TypeScript and JavaScript client for [TimeLogic API](https://api.timelogicapi.com), a world-time API for current time, time zones, calendars, daylight-saving rules, elapsed time, and signed JSON responses.

## Install

```bash
npm install @timelogic/direct-api
```

Pin the current release when you need reproducible builds:

```bash
npm install @timelogic/direct-api@1.0.1
```

The package supports Node.js and browser environments with a standard `fetch` implementation. It ships CommonJS, ES modules, and TypeScript declarations.

## Browser support

The direct API gateway enables cross-origin resource sharing (CORS), so browser applications can call the API directly with this package — no proxy layer or backend required:

```ts
import { TimeApi, createConfiguration } from '@timelogic/direct-api';

const configuration = createConfiguration({
  apiKey: 'your-api-key',
});

const api = new TimeApi(configuration);
const currentTime = await api.getCurrentTime({ tz: 'America/New_York' });

console.log(currentTime);
```

Signature headers (`X-TimeLogic-*`) and quota headers are exposed to browser clients, so signed responses can still be verified client-side. Keep API keys out of client-side bundles; prefer short-lived or scoped credentials for browser use.

## Quick start

```ts
import { TimeApi, createConfiguration } from '@timelogic/direct-api';

const configuration = createConfiguration({
  apiKey: process.env.TIMELOGIC_API_KEY!,
});

const api = new TimeApi(configuration);
const currentTime = await api.getCurrentTime({ tz: 'America/New_York' });

console.log(currentTime);
```

Keep credentials in environment variables or your platform secret store. Never commit an API key to source control.

## RapidAPI

Pass only the RapidAPI subscription key and set `rapidApi: true`. The client selects the RapidAPI host and adds the required headers.

```ts
const configuration = createConfiguration({
  apiKey: process.env.RAPIDAPI_KEY!,
  rapidApi: true,
});

const api = new TimeApi(configuration);
const result = await api.getTimezone({ tz: 'Europe/London' });
```

## Available operations

| Client method | HTTP endpoint | Purpose |
| --- | --- | --- |
| `getCurrentTime` | `GET /v1/time/current` | Current time by timezone, IP, or offset |
| `convertTime` | `GET /v1/time/convert` | Convert an instant to a timezone or offset |
| `diffTime` | `GET /v1/time/diff` | Difference between two instants |
| `addTime` | `GET /v1/time/add` | Add modifiers to a timestamp |
| `getCalendar` | `GET /v1/time/calendar` | Calendar projection for an instant |
| `getDst` | `GET /v1/time/dst` | Daylight-saving status |
| `getElapsed` | `GET /v1/time/elapsed` | Elapsed or remaining time |
| `getTimezone` | `GET /v1/timezone` | Resolve timezone information |
| `getClock` | `GET /v1/time/clock` | Render the live clock response |
| `getPublicSigningKey` | `GET /.well-known/time-api-public-key` | Retrieve public signing keys |

All documented operations are `GET` requests. Current-time and conversion requests support one comma-separated bulk selector (`tz`, `ip`, or `offset`); the other operations are single-target routes.

## Configuration

The default direct API host is `https://api.timelogicapi.com`. A compatible gateway can be supplied explicitly:

```ts
const configuration = createConfiguration({
  apiKey: process.env.TIMELOGIC_API_KEY!,
  baseUrl: 'https://your-compatible-gateway.example',
});
```

Use `sign` on supported JSON operations when you need signed responses. The live clock endpoint does not support `sign`.

## Development

From the repository root:

```bash
npm ci
npm run validate
npm run generate
npm run verify-generated
npm run test:contract
```

To build this package locally:

```bash
npm install
npm run build
```

## Links

- [TimeLogic API](https://api.timelogicapi.com)
- [API contract](https://github.com/TimeLogic-API-LLC/timelogic-api-sdks/blob/main/openapi/openapi.yaml)
- [Repository](https://github.com/TimeLogic-API-LLC/timelogic-api-sdks)
- [Releases](https://github.com/TimeLogic-API-LLC/timelogic-api-sdks/releases)
- [Issue tracker](https://github.com/TimeLogic-API-LLC/timelogic-api-sdks/issues)

Licensed under the [Unlicense](https://github.com/TimeLogic-API-LLC/timelogic-api-sdks/blob/main/LICENSE).
