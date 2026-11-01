# TimeLogic API SDK for TypeScript / JavaScript

Official TypeScript / JavaScript client for [TimeLogic API](https://api.timelogicapi.com): current time, time zone lookups, conversions, date arithmetic, business-day counts, DST status, calendars, embeddable clocks and signed responses. The package contains two clients:

- the `/v1` client, generated from the [TimeLogic API contract](https://github.com/TimeLogic-API-LLC/timelogic-api-sdks/blob/main/openapi/openapi.yaml), with direct and RapidAPI transports;
- a [WorldTimeAPI-compatible client](#worldtimeapi-compatible-client) for the `/api/timezone` and `/api/ip` routes, which use worldtimeapi.org's paths, fields and plain-text format.

Package: [`@timelogic/direct-api`](https://www.npmjs.com/package/@timelogic/direct-api), version 1.1.0. Changes are listed in the [changelog](https://github.com/TimeLogic-API-LLC/timelogic-api-sdks/blob/main/CHANGELOG.md).

## Install

```bash
npm install @timelogic/direct-api@1.1.0
```

Runs on Node.js 18+ and in browsers; requests use the global `fetch`. The package ships ES module and CommonJS builds with type definitions.

## Quick start

Get an API key, export it as `TIMELOGIC_API_KEY`, and run:

```ts
import { TimeApi, createConfiguration } from '@timelogic/direct-api';

const api = new TimeApi(createConfiguration({ apiKey: process.env.TIMELOGIC_API_KEY! }));

const now = await api.getCurrentTime({ tz: 'America/New_York' });
console.log(now);
// { unix: 1793538963, unixMs: 1793538963266, utc: 2026-11-01T13:16:03.000Z,
//   isoLocal: '2026-11-01T08:16:03-05:00', timezone: 'America/New_York', ... }
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

## Migrating from 1.x to 2.0

2.0 changes the `/v1` response types so that every response decodes into a typed model. The API itself is unchanged. What changed in the contract, for every language:

- `timezone` returns one model, `TimezoneResponse`: the time payload plus `offset`, `dst`, and `matching_zones` (present only for `offset` lookups). The `oneOf` wrapper `GetTimezone200Response` and its members `TimezoneResolvedResponse` and `TimezoneOffsetResponse` are removed.
- `TimezoneMatch` (the `matching_zones` item) is `timezone`, `offset` and `dst`, as the API returns it. It previously described a full time payload.
- `timezone` takes the `format` parameter, after `sign`.
- `JwkKey` lists the optional `key_ops` and `ext` members.
- `current` and `convert` no longer reject a comma-separated `tz` list longer than 64 characters or an `offset` list before sending it; an invalid value in a list comes back as a `BulkError` item.

In this package:

- `getCurrentTime` and `convertTime` resolve to camelCase models: a `TimePayload` for one target, or a `TimePayloadBulkResponse` (an array of `TimePayload` and `BulkError` items) for a bulk selector. In 1.x they resolved to the raw snake_case JSON. `isTimePayloadBulkResponse()` and `isBulkError()` tell the shapes apart.
- `getTimezone` resolves to `TimezoneResponse`; `matchingZones` items are `TimezoneMatch` (`timezone`, `offset`, `dst`).

Before (1.x):

```ts
const now = (await time.getCurrentTime({ tz: 'Europe/London' })) as unknown as { iso_local: string };
console.log(now.iso_local);
const ist = (await time.getTimezone({ offset: '+05:30' })) as TimezoneOffsetResponse;
```

After (2.0):

```ts
import { TimePayload, isBulkError, isTimePayloadBulkResponse } from '@timelogic/direct-api';

const now = (await time.getCurrentTime({ tz: 'Europe/London' })) as TimePayload;
console.log(now.isoLocal);

const many = await time.getCurrentTime({ tz: 'Europe/London,Asia/Tokyo,Nope/Zone' });
if (isTimePayloadBulkResponse(many)) {
  for (const item of many) {
    console.log(isBulkError(item) ? `${item.item}: ${item.error.code}` : item.isoLocal);
  }
}

const ist = await time.getTimezone({ offset: '+05:30' }); // TimezoneResponse
console.log(ist.matchingZones?.map((zone) => zone.timezone)); // ['Asia/Colombo', 'Asia/Kolkata']
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
