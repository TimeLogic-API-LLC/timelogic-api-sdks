// Tests for the WorldTimeAPI-compatible client. Run after `npm run build`:
//   node --test test/
// The live check runs only when TIMELOGIC_API_KEY is set.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const sdk = require('../dist/index.js');
const { WorldTimeApiClient, WorldTimeApiError } = sdk;

const LONDON = {
  utc_offset: '+00:00', timezone: 'Europe/London', day_of_week: 0, day_of_year: 305,
  datetime: '2026-11-01T03:34:38.413000+00:00', utc_datetime: '2026-11-01T03:34:38.413000+00:00',
  unixtime: 1793504078, raw_offset: 0, week_number: 44, dst: false, abbreviation: 'GMT',
  dst_offset: 0, dst_from: null, dst_until: null, client_ip: '203.0.113.7',
};

function mockFetch(routes, calls) {
  return async (url, init) => {
    calls.push({ url, init });
    const path = new URL(url).pathname;
    const [status, body, type] = routes[path] ?? [404, '{"error":"not found"}', 'application/json'];
    return {
      status,
      headers: new Map([['content-type', type ?? 'application/json']]),
      text: async () => body,
    };
  };
}

test('getTimezone returns the 15 worldtimeapi.org fields and sends X-API-Key', async () => {
  const calls = [];
  const client = new WorldTimeApiClient({ apiKey: 'test-key', fetchApi: mockFetch({ '/api/timezone/Europe/London': [200, JSON.stringify(LONDON)] }, calls) });
  const value = await client.getTimezone('Europe/London');
  assert.deepEqual(Object.keys(value).sort(), Object.keys(LONDON).sort());
  assert.equal(Object.keys(value).length, 15);
  assert.equal(value.timezone, 'Europe/London');
  assert.equal(calls[0].url, 'https://api.timelogicapi.com/api/timezone/Europe/London');
  assert.equal(calls[0].init.headers['X-API-Key'], 'test-key');
});

test('three-segment zones, areas, IP routes and .txt variants use the worldtimeapi.org paths', async () => {
  const calls = [];
  const client = new WorldTimeApiClient({ apiKey: 'k', baseUrl: 'https://example.test/', fetchApi: mockFetch({
    '/api/timezone': [200, '["Europe/London","UTC"]'],
    '/api/timezone.txt': [200, 'Europe/London\nUTC', 'text/plain'],
    '/api/timezone/Europe': [200, '["Europe/London"]'],
    '/api/timezone/Europe.txt': [200, 'Europe/London', 'text/plain'],
    '/api/timezone/America/Argentina/Salta': [200, JSON.stringify({ ...LONDON, timezone: 'America/Argentina/Salta' })],
    '/api/timezone/Europe/London.txt': [200, 'abbreviation: GMT', 'text/plain'],
    '/api/ip': [200, JSON.stringify(LONDON)],
    '/api/ip/8.8.8.8': [200, JSON.stringify(LONDON)],
    '/api/ip.txt': [200, 'abbreviation: GMT', 'text/plain'],
    '/api/ip/8.8.8.8.txt': [200, 'abbreviation: GMT', 'text/plain'],
  }, calls) });
  assert.deepEqual(await client.listTimezones(), ['Europe/London', 'UTC']);
  assert.equal(await client.listTimezonesText(), 'Europe/London\nUTC');
  assert.deepEqual(await client.listTimezonesInArea('Europe'), ['Europe/London']);
  assert.equal(await client.listTimezonesInAreaText('Europe'), 'Europe/London');
  assert.equal((await client.getTimezone('America/Argentina/Salta')).timezone, 'America/Argentina/Salta');
  assert.equal(await client.getTimezoneText('Europe/London'), 'abbreviation: GMT');
  assert.equal((await client.getIp()).timezone, 'Europe/London');
  assert.equal((await client.getIp('8.8.8.8')).timezone, 'Europe/London');
  assert.equal(await client.getIpText(), 'abbreviation: GMT');
  assert.equal(await client.getIpText('8.8.8.8'), 'abbreviation: GMT');
  assert.ok(calls.every((c) => c.url.startsWith('https://example.test/api/')));
});

test('unknown location is a WorldTimeApiError with isUnknownLocation', async () => {
  const client = new WorldTimeApiClient({ apiKey: 'k', fetchApi: mockFetch({
    '/api/timezone/Nowhere/Land': [404, '{"error":"unknown location"}'],
    '/api/timezone/Nowhere/Land.txt': [404, 'Error: unknown location', 'text/plain'],
    '/api/ip/999.1.1.1': [404, '{"error":"malformed ip"}'],
  }, []) });
  await assert.rejects(client.getTimezone('Nowhere/Land'), (e) => e instanceof WorldTimeApiError && e.isUnknownLocation && e.status === 404);
  await assert.rejects(client.getTimezoneText('Nowhere/Land'), (e) => e instanceof WorldTimeApiError && e.isUnknownLocation);
  await assert.rejects(client.getIp('999.1.1.1'), (e) => e instanceof WorldTimeApiError && e.isMalformedIp);
});

test('TimeLogic auth errors keep their code and message', async () => {
  const client = new WorldTimeApiClient({ apiKey: 'bad', fetchApi: mockFetch({
    '/api/timezone/UTC': [401, '{"error":{"code":"UNAUTHORIZED","message":"Missing API key credentials."}}'],
  }, []) });
  await assert.rejects(client.getTimezone('UTC'), (e) => e.status === 401 && e.code === 'UNAUTHORIZED' && !e.isUnknownLocation);
});

test('sign adds sign=true and requestRaw exposes the signature headers', async () => {
  const calls = [];
  const fetchApi = async (url) => {
    calls.push(url);
    return { status: 200, headers: new Map([['X-TimeLogic-Signature', 'sig']]), text: async () => JSON.stringify(LONDON) };
  };
  const client = new WorldTimeApiClient({ apiKey: 'k', sign: true, fetchApi });
  const raw = await client.requestRaw('/api/timezone/Europe/London');
  assert.equal(calls[0], 'https://api.timelogicapi.com/api/timezone/Europe/London?sign=true');
  assert.equal(raw.headers['x-timelogic-signature'], 'sig');
});

test('the /v1 exports are still present next to the new client', () => {
  assert.equal(typeof sdk.TimeApi, 'function');
  assert.equal(typeof sdk.UtilityApi, 'function');
  assert.equal(typeof sdk.createConfiguration, 'function');
});

test('live smoke test (skipped without TIMELOGIC_API_KEY)', { skip: !process.env.TIMELOGIC_API_KEY }, async () => {
  const client = new WorldTimeApiClient({ apiKey: process.env.TIMELOGIC_API_KEY });
  const value = await client.getTimezone('Europe/London');
  assert.equal(value.timezone, 'Europe/London');
  assert.equal(Object.keys(value).length, 15);
  await assert.rejects(client.getTimezone('Nowhere/Land'), (e) => e.isUnknownLocation);
  const zones = await client.listTimezones();
  assert.ok(zones.includes('Europe/London'));
});
