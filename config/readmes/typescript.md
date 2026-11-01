# TimeLogic API SDK for TypeScript / JavaScript

Official TypeScript / JavaScript client for [TimeLogic API](https://api.timelogicapi.com): current time, time zone lookups, conversions, date arithmetic, business-day counts, DST status, calendars, embeddable clocks and signed responses. The package contains two clients:

- the `/v1` client, generated from the [TimeLogic API contract](https://github.com/TimeLogic-API-LLC/timelogic-api-sdks/blob/main/openapi/openapi.yaml), with direct and RapidAPI transports;
- a [WorldTimeAPI-compatible client](#worldtimeapi-compatible-client) for the `/api/timezone` and `/api/ip` routes, which use worldtimeapi.org's paths, fields and plain-text format.

Package: [`@timelogic/direct-api`](https://www.npmjs.com/package/@timelogic/direct-api), version __VERSION__. Changes are listed in the [changelog](https://github.com/TimeLogic-API-LLC/timelogic-api-sdks/blob/main/CHANGELOG.md).

## Install

```bash
npm install @timelogic/direct-api@__VERSION__
```

Runs on Node.js 18+ and in browsers; requests use the global `fetch`. The package ships ES module and CommonJS builds with type definitions.

## Quick start

Get an API key, export it as `TIMELOGIC_API_KEY`, and run:

```ts
import { TimeApi, createConfiguration } from '@timelogic/direct-api';

const api = new TimeApi(createConfiguration({ apiKey: process.env.TIMELOGIC_API_KEY! }));

const now = await api.getCurrentTime({ tz: 'America/New_York' });
console.log(now);
// { unix: 1793538963, unix_ms: 1793538963266, utc: '2026-11-01T13:16:03Z',
//   iso_local: '2026-11-01T08:16:03-05:00', timezone: 'America/New_York', ... }
// getCurrentTime and convertTime return the API's field names; see "Known issues".
```

## Configuration

The transport helper sets the host and credentials for the `/v1` client. Pass a TimeLogic key for the direct API, or a RapidAPI key with the RapidAPI option; the SDK then sends `X-RapidAPI-Key` and `X-RapidAPI-Host` (default host `timelogic-api-world-time-timezones-time-calculations.p.rapidapi.com`, overridable). Keep keys in environment variables or a secret store, not in source control.

```ts
import { TimeApi, createConfiguration } from '@timelogic/direct-api';

// Direct API (default host https://api.timelogicapi.com, sends Authorization: Bearer <key>)
const direct = createConfiguration({ apiKey: process.env.TIMELOGIC_API_KEY! });

// RapidAPI: pass only your RapidAPI key; the SDK sets X-RapidAPI-Key and X-RapidAPI-Host
const rapid = createConfiguration({ apiKey: process.env.RAPIDAPI_KEY!, rapidApi: true });

// A different host (for example a compatible gateway or a test server)
const custom = createConfiguration({
  apiKey: process.env.TIMELOGIC_API_KEY!,
  baseUrl: 'https://your-compatible-gateway.example',
});

const api = new TimeApi(direct);
```

## Operations

| Operation | Endpoint | Method |
| --- | --- | --- |
| Current time | `GET /v1/time/current` | `TimeApi.getCurrentTime()` |
| Convert | `GET /v1/time/convert` | `TimeApi.convertTime()` |
| Add | `GET /v1/time/add` | `TimeApi.addTime()` |
| Difference | `GET /v1/time/diff` | `TimeApi.diffTime()` |
| Elapsed | `GET /v1/time/elapsed` | `TimeApi.getElapsed()` |
| Timezone | `GET /v1/timezone` | `TimeApi.getTimezone()` |
| Daylight saving | `GET /v1/time/dst` | `TimeApi.getDst()` |
| Calendar | `GET /v1/time/calendar` | `TimeApi.getCalendar()` |
| Clock | `GET /v1/time/clock` | `TimeApi.getClock()` |
| Signing keys | `GET /.well-known/time-api-public-key` | `UtilityApi.getPublicSigningKey()` |

Each operation takes one request object whose properties are the endpoint's query parameters in camelCase (`sourceTz`, `businessDays`, `holidayCountry`), and an optional second argument with `fetch` options (`RequestInit`). Every operation also has a `…Raw` variant that resolves to an `ApiResponse` with `.raw` (the `fetch` `Response`) and `.value()`. Parameters, response fields and errors for every operation: [How the API works](#how-the-api-works).

### Examples

```ts
import { TimeApi, UtilityApi, createConfiguration } from '@timelogic/direct-api';

const configuration = createConfiguration({ apiKey: process.env.TIMELOGIC_API_KEY! });
const time = new TimeApi(configuration);

// Bulk: up to 10 comma-separated values; items are time payloads or item errors
const many = await time.getCurrentTime({ tz: 'Europe/London,Asia/Tokyo' });

// Convert a New York wall-clock time to Tokyo
const tokyo = await time.convertTime({ iso: '2026-03-01T09:00:00', sourceTz: 'America/New_York', tz: 'Asia/Tokyo' });

// Add 1 day and 2 hours, shown in New York time
const later = await time.addTime({ iso: '2026-03-07T12:00:00Z', days: 1, hours: 2, tz: 'America/New_York' });

// Duration and business days between two instants (Zurich holiday calendar)
const diff = await time.diffTime({
  from: 'iso=2026-01-02T00:00:00Z',
  to: 'iso=2026-04-30T00:00:00Z',
  businessDays: true,
  holidayCountry: 'CH-ZH',
});
console.log(diff.days, diff.direction, diff.businessDays); // 118 'forward' 82

// Time left until a deadline
const left = await time.getElapsed({ iso: '2027-01-01T00:00:00Z' });

// Zone details, and the zones currently at +05:30
const berlin = await time.getTimezone({ tz: 'Europe/Berlin' });
const ist = await time.getTimezone({ offset: '+05:30' });

// DST status with the next transition, and ISO week number
const dst = await time.getDst({ tz: 'America/New_York', next: true });
const calendar = await time.getCalendar({ tz: 'Europe/London', week: true });

// Embeddable HTML clock
const html: string = await time.getClock({ style: 'digital-dashboard', tz: 'Europe/London' });

// Public signing keys (no API key needed)
const keys = await new UtilityApi(configuration).getPublicSigningKey();
```

## Errors, headers and signed responses

```ts
import { TimeApi, ResponseError, createConfiguration } from '@timelogic/direct-api';

const time = new TimeApi(createConfiguration({ apiKey: process.env.TIMELOGIC_API_KEY! }));

try {
  await time.getCurrentTime({ tz: 'Bad/Zone' });
} catch (error) {
  if (error instanceof ResponseError) {
    const body = await error.response.json();
    console.log(error.response.status, body.error.code, body.error.message, body.request_id);
    // 400 INVALID_PARAMETER Invalid timezone. 547f27d2-...
  } else {
    throw error; // network failure (FetchError) or a missing required parameter (RequiredError)
  }
}

// Every operation has a *Raw variant that also exposes the HTTP response
const raw = await time.getCurrentTimeRaw({ tz: 'Asia/Kolkata', sign: true });
const payload = await raw.value();
console.log(raw.raw.headers.get('X-TimeLogic-Quota-Limit'), raw.raw.headers.get('X-TimeLogic-Signature'));

// Timeouts: pass fetch options per call (the SDK sets none and does not retry)
await time.getCurrentTime({ tz: 'UTC' }, { signal: AbortSignal.timeout(5000) });
```

The SDK does not retry. A `429 QUOTA_EXCEEDED` carries no `Retry-After` header; quotas reset at 00:00 UTC on the 1st of each month. Status codes and error codes: [Errors](#errors).

## WorldTimeAPI-compatible client

A separate client for the WorldTimeAPI-compatible routes. Code written for worldtimeapi.org needs only the new host and an API key: paths, field names, types and the `.txt` format are the same. The client sends the key as `X-API-Key`, sets no timeout of its own (pass a `fetchApi` that adds one, for example `(url, init) => fetch(url, { ...init, signal: AbortSignal.timeout(10_000) })`), does not retry, and does not use or change the `/v1` configuration.

```ts
import { WorldTimeApiClient, WorldTimeApiError } from '@timelogic/direct-api';

const wta = new WorldTimeApiClient({ apiKey: process.env.TIMELOGIC_API_KEY! });

const zones = await wta.listTimezones();                 // ['Africa/Abidjan', ...]
const europe = await wta.listTimezonesInArea('Europe');  // ['Europe/Amsterdam', ...]
const london = await wta.getTimezone('Europe/London');
console.log(london.datetime, london.utc_offset, london.dst);
const salta = await wta.getTimezone('America/Argentina/Salta');
const text = await wta.getTimezoneText('Europe/London');  // 'abbreviation: GMT\nclient_ip: ...'
const mine = await wta.getIp();                           // the caller's address
const google = await wta.getIp('8.8.8.8');

try {
  await wta.getTimezone('Nope/Zone');
} catch (error) {
  if (error instanceof WorldTimeApiError && error.isUnknownLocation) {
    console.log('unknown location'); // 404 {"error":"unknown location"}
  }
}

// Signed responses: read the headers through requestRaw
const signed = new WorldTimeApiClient({ apiKey: process.env.TIMELOGIC_API_KEY!, sign: true });
const res = await signed.requestRaw('/api/timezone/Europe/London');
console.log(res.status, res.headers['x-timelogic-signature'], res.body);
```

Routes, fields and errors: [WorldTimeAPI-compatible routes](#worldtimeapi-compatible-routes).

## Known issues

Checked against the live API for this release. All other operations, including single-target `current`, `convert` and `timezone` calls, decode normally.

- `getCurrentTime` and `convertTime` (single and bulk) resolve to the response JSON exactly as the API sends it, with snake_case keys (`iso_local`, `unix_ms`, `day_number`), although the declared return type is the camelCase `TimePayload`. All other operations return camelCase models. Read those two results as the API's field names:

```ts
import { TimeApi, createConfiguration } from '@timelogic/direct-api';

const time = new TimeApi(createConfiguration({ apiKey: process.env.TIMELOGIC_API_KEY! }));

// getCurrentTime and convertTime resolve to the API's JSON (snake_case keys)
const now = (await time.getCurrentTime({ tz: 'Europe/London' })) as unknown as { iso_local: string; timezone: string };
console.log(now.iso_local, now.timezone);
```

<!-- include: shared/v1-api.md -->

<!-- include: shared/worldtimeapi.md -->

## Support

Questions and problem reports: [issue tracker](https://github.com/TimeLogic-API-LLC/timelogic-api-sdks/issues). Security issues: see [SECURITY.md](https://github.com/TimeLogic-API-LLC/timelogic-api-sdks/blob/main/SECURITY.md). Service status: [status.timelogicapi.com](https://status.timelogicapi.com).

## License

[Unlicense](https://github.com/TimeLogic-API-LLC/timelogic-api-sdks/blob/main/LICENSE).
