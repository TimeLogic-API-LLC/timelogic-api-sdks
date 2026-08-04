const baseUrl = (process.env.TIMELOGIC_SDK_TEST_BASE_URL ?? 'https://api.timelogicapi.com').replace(/\/$/, '');
const apiKey = process.env.TIMELOGIC_SDK_TEST_API_KEY?.trim();

if (!apiKey) {
  console.log('Live HTTP tests skipped: TIMELOGIC_SDK_TEST_API_KEY is not configured. Static validation and generated SDK tests remain active.');
  process.exit(0);
}

const headers = { Authorization: `Bearer ${apiKey}`, 'CF-Connecting-IP': '203.0.113.10' };
const check = async (path, expected, label, options = {}) => {
  const response = await fetch(`${baseUrl}${path}`, options);
  if (response.status !== expected) throw new Error(`${label}: expected ${expected}, received ${response.status}: ${await response.text()}`);
  return response;
};
const json = async (path, expected, label, options = {}) => {
  const response = await check(path, expected, label, options);
  const body = await response.json();
  // The gateway's unauthenticated health probe is intentionally minimal and
  // does not carry the request metadata used on customer-facing responses.
  if (!response.headers.get('x-request-id') && path !== '/healthz' && !path.startsWith('/.well-known/')) {
    throw new Error(`${label}: missing x-request-id`);
  }
  return { response, body };
};
const noTimestamp = (body, label) => {
  if (body && Object.prototype.hasOwnProperty.call(body, 'timestamp')) throw new Error(`${label}: error exposed timestamp`);
};

const health = await json('/healthz', 200, 'health');
if (health.body.ok !== true) throw new Error('health did not return ok=true');

for (const [path, label] of [
  ['/v1/time/current?tz=America/New_York', 'current'],
  ['/v1/time/current', 'default UTC'],
  ['/v1/time/convert?iso=2026-04-16T09:00:00&source_tz=America/New_York&tz=Europe/London', 'convert'],
  ['/v1/time/diff?from=iso=2026-04-16T09:00:00&from_tz=America/New_York&to=iso=2026-04-16T09:00:00&to_tz=Europe/London', 'diff'],
  ['/v1/time/add?minutes=30&utc=true', 'add'],
  ['/v1/time/calendar?iso=2026-04-16T09:00:00&source_tz=America/New_York&tz=Europe/London&week=true', 'calendar'],
  ['/v1/time/dst?tz=America/New_York&next=true', 'DST'],
  ['/v1/time/elapsed?iso=2026-04-16T09:00:00&source_tz=America/New_York&compare_iso=2026-04-16T09:00:00&compare_source_tz=Europe/London', 'elapsed'],
  ['/v1/timezone?tz=America/New_York', 'timezone']
]) await json(path, 200, label, { headers });

const clock = await check('/v1/time/clock?style=digital-dashboard&tz=America/New_York', 200, 'clock', { headers });
if (!(clock.headers.get('content-type') ?? '').includes('text/html')) throw new Error('clock did not return HTML');
const asset = await check('/v1/time/clock/assets/v1/clock.js', 200, 'clock asset');
if (!(asset.headers.get('cache-control') ?? '').includes('immutable')) throw new Error('clock asset is not immutable-cached');

const queryAuth = await check('/v1/time/current?tz=Europe/London&api_key=' + encodeURIComponent(apiKey), 200, 'query authentication');
if (!queryAuth.headers.get('x-request-id')) throw new Error('query authentication missing request ID');
const headerAuth = await check('/v1/time/current?tz=Asia/Tokyo', 200, 'X-API-Key authentication', { headers: { 'X-API-Key': apiKey } });
if (!headerAuth.headers.get('x-request-id')) throw new Error('X-API-Key authentication missing request ID');

const signed = await check('/v1/time/current?sign=true', 200, 'signed response', { headers });
for (const name of ['x-timelogic-signature', 'x-timelogic-key-id', 'x-timelogic-signature-input', 'x-timelogic-content-sha256']) if (!signed.headers.get(name)) throw new Error(`signed response missing ${name}`);
await check('/.well-known/time-api-public-key', 200, 'JWKS');

for (const [path, options, status, label] of [
  ['/v1/time/current?tz=America/New_York', {}, 401, 'missing authentication'],
  ['/v1/time/current?tz=Not/AZone', { headers }, 400, 'invalid timezone'],
  ['/not-a-route', { headers }, 404, 'not found'],
  ['/v1/time/current', { method: 'POST', headers }, 405, 'wrong method']
]) {
  const result = await json(path, status, label, options);
  noTimestamp(result.body, label);
}

console.log(`Live HTTP contract tests passed against ${baseUrl}`);
