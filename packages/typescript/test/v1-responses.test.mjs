// Typed /v1 response decoding. Run after `npm run build`:
//   node --test test/v1-responses.test.mjs
// The offline tests decode recorded API responses through the real client with
// a stubbed fetch. The live tests run only when TIMELOGIC_SDK_TEST_API_KEY (or
// TIMELOGIC_API_KEY) is set.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const sdk = require('../dist/index.js');
const { Configuration, TimeApi, ResponseError, createConfiguration, isTimePayloadBulkResponse, isBulkError } = sdk;

const SINGLE = {"unix":1772366400,"unix_ms":1772366400000,"utc":"2026-03-01T12:00:00Z","iso_local":"2026-03-01T21:00:00+09:00","rfc2822":"Sun, 01 Mar 2026 21:00:00 +0900","human":"March 1, 2026, 9:00 PM Asia/Tokyo","day_number":1,"day_short":"Sun","day_full":"Sunday","timezone":"Asia/Tokyo"};
const BULK = [{"unix":1772366400,"unix_ms":1772366400000,"utc":"2026-03-01T12:00:00Z","iso_local":"2026-03-01T21:00:00+09:00","rfc2822":"Sun, 01 Mar 2026 21:00:00 +0900","human":"March 1, 2026, 9:00 PM Asia/Tokyo","day_number":1,"day_short":"Sun","day_full":"Sunday","timezone":"Asia/Tokyo"},{"item":"Bad/Zone","error":{"code":"INVALID_PARAMETER","message":"Invalid timezone.","details":{"tz":"Bad/Zone"}},"request_id":"a6116a2e-8809-46e9-99c5-765cf0d50fcb"}];
const TIMEZONE = {"unix":1772366400,"unix_ms":1772366400000,"utc":"2026-03-01T12:00:00Z","iso_local":"2026-03-01T21:00:00+09:00","rfc2822":"Sun, 01 Mar 2026 21:00:00 +0900","human":"March 1, 2026, 9:00 PM Asia/Tokyo","day_number":1,"day_short":"Sun","day_full":"Sunday","timezone":"Asia/Tokyo","offset":540,"dst":false};
const OFFSET = {"unix":1772366400,"unix_ms":1772366400000,"utc":"2026-03-01T12:00:00Z","iso_local":"2026-03-01T17:30:00+05:30","rfc2822":"Sun, 01 Mar 2026 21:00:00 +0900","human":"March 1, 2026, 5:30 PM UTC+05:30","day_number":1,"day_short":"Sun","day_full":"Sunday","timezone":null,"offset":330,"dst":false,"matching_zones":[{"timezone":"Asia/Colombo","offset":330,"dst":false},{"timezone":"Asia/Kolkata","offset":330,"dst":false}]};
const ERROR = {"error":{"code":"INVALID_PARAMETER","message":"Invalid timezone.","details":{"tz":"Bad/Zone"}},"request_id":"a6116a2e-8809-46e9-99c5-765cf0d50fcb"};

function stubbed(status, body) {
  const fetchApi = async () => new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } });
  return new TimeApi(new Configuration({ basePath: 'https://api.example.test', accessToken: 'test-key', fetchApi }));
}

test('a single current-time result is a typed TimePayload', async () => {
  const value = await stubbed(200, SINGLE).getCurrentTime({ tz: 'Asia/Tokyo' });
  assert.equal(isTimePayloadBulkResponse(value), false);
  assert.equal(value.unixMs, 1772366400000);
  assert.equal(value.isoLocal, '2026-03-01T21:00:00+09:00');
  assert.ok(value.utc instanceof Date);
  assert.equal(value.unix_ms, undefined);
});

test('a bulk result is an array of TimePayload and BulkError items', async () => {
  const value = await stubbed(200, BULK).convertTime({ tz: 'Asia/Tokyo,Bad/Zone', unix: 1772366400 });
  assert.equal(isTimePayloadBulkResponse(value), true);
  assert.equal(value.length, 2);
  assert.equal(isBulkError(value[0]), false);
  assert.equal(value[0].timezone, 'Asia/Tokyo');
  assert.equal(value[0].dayNumber, 1);
  assert.equal(isBulkError(value[1]), true);
  assert.equal(value[1].item, 'Bad/Zone');
  assert.equal(value[1].error.code, 'INVALID_PARAMETER');
  assert.equal(value[1].requestId, ERROR.request_id);
});

test('a timezone lookup is a TimezoneResponse without matchingZones', async () => {
  const value = await stubbed(200, TIMEZONE).getTimezone({ tz: 'Asia/Tokyo' });
  assert.equal(value.timezone, 'Asia/Tokyo');
  assert.equal(value.offset, 540);
  assert.equal(value.dst, false);
  assert.equal(value.matchingZones, undefined);
});

test('an offset lookup lists typed matchingZones', async () => {
  const value = await stubbed(200, OFFSET).getTimezone({ offset: '+05:30' });
  assert.equal(value.timezone, null);
  assert.equal(value.offset, 330);
  assert.deepEqual(value.matchingZones, [
    { timezone: 'Asia/Colombo', offset: 330, dst: false },
    { timezone: 'Asia/Kolkata', offset: 330, dst: false },
  ]);
});

test('an API error surfaces as ResponseError with the error body', async () => {
  const error = await stubbed(400, ERROR).getCurrentTime({ tz: 'Bad/Zone' }).then(() => null, (caught) => caught);
  assert.ok(error instanceof ResponseError);
  assert.equal(error.response.status, 400);
  const body = await error.response.json();
  assert.equal(body.error.code, 'INVALID_PARAMETER');
  assert.equal(body.request_id, ERROR.request_id);
});

const apiKey = process.env.TIMELOGIC_SDK_TEST_API_KEY || process.env.TIMELOGIC_API_KEY;
const baseUrl = process.env.TIMELOGIC_SDK_TEST_BASE_URL || undefined;
const live = { skip: apiKey ? false : 'set TIMELOGIC_SDK_TEST_API_KEY to run live calls' };
const liveApi = () => new TimeApi(createConfiguration({ apiKey, baseUrl }));
const liveUtility = () => new sdk.UtilityApi(createConfiguration({ apiKey, baseUrl }));

test('live: every /v1 operation decodes into its typed model', live, async () => {
  const api = liveApi();
  const single = await api.getCurrentTime({ tz: 'America/New_York' });
  assert.equal(single.timezone, 'America/New_York');
  assert.ok(single.unixMs > 0);

  const bulk = await api.getCurrentTime({ tz: 'America/New_York,Europe/London,Bad/Zone' });
  assert.ok(isTimePayloadBulkResponse(bulk));
  assert.equal(bulk[1].timezone, 'Europe/London');
  assert.ok(isBulkError(bulk[2]));
  assert.equal(bulk[2].error.code, 'INVALID_PARAMETER');

  const converted = await api.convertTime({ tz: 'Asia/Tokyo', unix: 1772366400 });
  assert.equal(converted.isoLocal, '2026-03-01T21:00:00+09:00');
  const convertedBulk = await api.convertTime({ offset: '+01:00,+02:00', unix: 1772366400 });
  assert.equal(convertedBulk.length, 2);
  assert.equal(convertedBulk[1].isoLocal, '2026-03-01T14:00:00+02:00');

  const zone = await api.getTimezone({ tz: 'Europe/London' });
  assert.equal(zone.timezone, 'Europe/London');
  assert.equal(zone.matchingZones, undefined);
  const offset = await api.getTimezone({ offset: '+05:30' });
  assert.equal(offset.timezone, null);
  assert.ok(offset.matchingZones.length > 0);
  assert.equal(offset.matchingZones[0].offset, 330);

  const diff = await api.diffTime({ from: 'iso=2026-01-01T00:00:00Z', to: 'iso=2026-03-01T12:00:00Z' });
  assert.equal(diff.days, 59);
  assert.equal(diff.from.unixMs, 1767225600000);
  assert.equal((await api.addTime({ unix: 0, seconds: 60, utc: true })).unix, 60);
  assert.ok((await api.getCalendar({ tz: 'America/New_York', week: true })).weekNumber > 0);
  assert.ok((await api.getDst({ tz: 'America/New_York', next: true })).nextTransition instanceof Date);
  assert.equal((await api.getElapsed({ iso: '2026-01-01T00:00:00Z', compareIso: '2026-02-01T00:00:00Z' })).days, 31);
  assert.match(await api.getClock({ style: 'digital-broadcast', tz: 'UTC' }), /timelogic-clock/);
  const keys = await liveUtility().getPublicSigningKey();
  assert.equal(keys.keys[0].kty, 'OKP');
});

test('live: API errors keep code, message and request_id', live, async () => {
  const error = await liveApi().getCurrentTime({ tz: 'Bad/Zone' }).then(() => null, (caught) => caught);
  assert.ok(error instanceof ResponseError);
  assert.equal(error.response.status, 400);
  const body = await error.response.json();
  assert.equal(body.error.code, 'INVALID_PARAMETER');
  assert.ok(body.request_id);
});
