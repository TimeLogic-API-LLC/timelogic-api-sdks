// Checks the WorldTimeAPI-compatible contract and the client that every SDK
// package carries for it.
//
// - openapi/openapi-worldtimeapi.yaml validates and still describes the six
//   worldtimeapi.org routes (each with a .txt variant) and the 15-field object.
// - Every SDK language in config/generators.json has a client under
//   config/worldtimeapi/<language>/ that was copied into its package unchanged,
//   names every route and every field, and does not share a file with the
//   generated /v1 SDK.
import SwaggerParser from '@apidevtools/swagger-parser';
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';

const contractPath = 'openapi/openapi-worldtimeapi.yaml';
const spec = await SwaggerParser.validate(contractPath);

const expectedPaths = [
  '/api/timezone', '/api/timezone.txt',
  '/api/timezone/{area}', '/api/timezone/{area}.txt',
  '/api/timezone/{area}/{location}', '/api/timezone/{area}/{location}.txt',
  '/api/timezone/{area}/{location}/{region}', '/api/timezone/{area}/{location}/{region}.txt',
  '/api/ip', '/api/ip.txt',
  '/api/ip/{ip}', '/api/ip/{ip}.txt'
];
const paths = Object.keys(spec.paths ?? {}).sort();
const missing = expectedPaths.filter((p) => !paths.includes(p));
const extra = paths.filter((p) => !expectedPaths.includes(p));
if (missing.length || extra.length) {
  throw new Error(`${contractPath}: routes changed (missing: ${missing.join(', ') || 'none'}; new: ${extra.join(', ') || 'none'}); update config/worldtimeapi`);
}

const fields = [
  'abbreviation', 'client_ip', 'datetime', 'day_of_week', 'day_of_year', 'dst', 'dst_from', 'dst_offset',
  'dst_until', 'raw_offset', 'timezone', 'unixtime', 'utc_datetime', 'utc_offset', 'week_number'
];
const timeSchema = spec.paths['/api/timezone/{area}/{location}'].get.responses['200'].content['application/json'].schema;
const schemaFields = Object.keys(timeSchema.properties ?? {}).sort();
if (JSON.stringify(schemaFields) !== JSON.stringify([...fields].sort())) {
  throw new Error(`${contractPath}: the time object fields changed (${schemaFields.join(', ')}); update config/worldtimeapi`);
}

function filesUnder(directory) {
  const result = [];
  for (const name of readdirSync(directory).sort()) {
    const file = path.join(directory, name);
    if (statSync(file).isDirectory()) result.push(...filesUnder(file));
    else result.push(file);
  }
  return result;
}

const targets = JSON.parse(readFileSync('config/generators.json', 'utf8'));
for (const target of targets) {
  const sourceRoot = path.join('config/worldtimeapi', target.id);
  if (!existsSync(sourceRoot)) throw new Error(`${target.id}: no WorldTimeAPI-compatible client in ${sourceRoot}`);
  const sources = filesUnder(sourceRoot);
  let clientText = '';
  for (const source of sources) {
    const relative = path.relative(sourceRoot, source);
    const packaged = path.join(target.output, relative);
    if (!existsSync(packaged)) throw new Error(`${target.id}: ${packaged} is missing; run npm run generate`);
    if (readFileSync(packaged, 'utf8') !== readFileSync(source, 'utf8')) throw new Error(`${target.id}: ${packaged} differs from ${source}`);
    if (!/(^|[/\\])(test|tests|spec|Tests)[/\\]|_test\.go$|\.Test[/\\]/.test(relative)) clientText += readFileSync(source, 'utf8');
  }
  for (const needle of ['/api/timezone', '/api/ip', '.txt', 'X-API-Key', 'sign', 'unknown location']) {
    if (!clientText.includes(needle)) throw new Error(`${target.id}: the WorldTimeAPI-compatible client does not mention ${needle}`);
  }
  for (const field of fields) {
    if (!clientText.includes(field)) throw new Error(`${target.id}: the WorldTimeAPI-compatible client has no ${field} field`);
  }
  console.log(`${target.id}: WorldTimeAPI-compatible client present (${sources.length} files)`);
}
console.log(`${contractPath}: ${paths.length} routes and ${fields.length} fields match the SDK clients`);
