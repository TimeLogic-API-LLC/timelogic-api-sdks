// Builds openapi/openapi.yaml, the contract the /v1 SDKs are generated from,
// from openapi/openapi-direct.yaml.
//
// openapi/openapi-direct.yaml is a verbatim copy of the code repository's
// openapi-direct.yaml (kept in sync from that repository). The SDKs also ship a
// RapidAPI transport, so the generation contract adds the SDK title, the
// RapidAPI server and the RapidAPI security schemes on top of it. Every edit
// below anchors on text that must appear exactly once; if the upstream file
// moves an anchor, this script stops with an error instead of guessing.
//
//   npm run build-spec            writes openapi/openapi.yaml (then run npm run generate)
//   npm run build-spec -- --check reports whether openapi/openapi.yaml is behind
//
// `npm run generate` does not run this step, so a new upstream copy never
// changes the published /v1 SDKs until openapi.yaml is rebuilt on purpose.
//
// The WorldTimeAPI-compatible contract, openapi/openapi-worldtimeapi.yaml, is a
// verbatim copy as well and is not used by the /v1 generators.
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sourcePath = path.join(root, 'openapi/openapi-direct.yaml');
const targetPath = path.join(root, 'openapi/openapi.yaml');

const sdkAdditions = [
  {
    label: 'SDK title',
    replace: /^  title: .*$/m,
    with: '  title: TimeLogic API | A World Time API'
  },
  {
    label: 'RapidAPI authentication note',
    after: "    - direct access supports `Authorization: Bearer <token>`, `X-API-Key`, and `api_key` query credentials\n\n",
    insert: "    - RapidAPI access uses `X-RapidAPI-Key` and `X-RapidAPI-Host`; the SDKs expose\n      this as a `rapidApi` transport option that accepts only the RapidAPI key\n\n"
  },
  {
    label: 'RapidAPI server note',
    after: '    - credentials are extracted in Authorization, X-API-Key, then api_key query order; conflicting values are rejected\n\n',
    insert: '    - the first server is the default direct API host. The second server is the\n      RapidAPI gateway and can be selected or overridden by SDK configuration\n\n'
  },
  {
    label: 'RapidAPI server',
    after: '      default: api.timelogicapi.com\n      description: HTTPS hostname serving this API.\n',
    insert: [
      '- url: https://{rapidapiHost}',
      '  description: RapidAPI gateway; SDKs select this when rapidApi is enabled.',
      '  variables:',
      '    rapidapiHost:',
      '      default: timelogic-api-world-time-timezones-time-calculations.p.rapidapi.com',
      '      description: RapidAPI gateway hostname. Override for a compatible proxy or test gateway.',
      ''
    ].join('\n')
  },
  {
    label: 'RapidAPI security requirement',
    after: 'security:\n- directBearerAuth: []\n- directApiKeyHeader: []\n- directApiKeyQuery: []\n',
    insert: '- rapidApiKey: []\n  rapidApiHost: []\n'
  },
  {
    label: 'RapidAPI security schemes',
    after: '      name: api_key\n      description: Direct API key supplied as a query parameter; headers are preferred.\n',
    insert: [
      '    rapidApiKey:',
      '      type: apiKey',
      '      in: header',
      '      name: X-RapidAPI-Key',
      '      description: RapidAPI subscription key. The SDK rapidApi option accepts this key.',
      '    rapidApiHost:',
      '      type: apiKey',
      '      in: header',
      '      name: X-RapidAPI-Host',
      '      description: RapidAPI gateway host header. SDKs supply the configured host automatically.',
      ''
    ].join('\n')
  }
];

function countOf(text, needle) {
  let count = 0;
  for (let index = text.indexOf(needle); index !== -1; index = text.indexOf(needle, index + needle.length)) count += 1;
  return count;
}

let spec = readFileSync(sourcePath, 'utf8');
for (const addition of sdkAdditions) {
  if (addition.replace) {
    const matches = spec.match(new RegExp(addition.replace.source, 'gm')) ?? [];
    if (matches.length !== 1) throw new Error(`${addition.label}: expected one match in openapi-direct.yaml, found ${matches.length}`);
    spec = spec.replace(addition.replace, addition.with);
    continue;
  }
  const found = countOf(spec, addition.after);
  if (found !== 1) throw new Error(`${addition.label}: expected one anchor in openapi-direct.yaml, found ${found}`);
  if (spec.includes(addition.after + addition.insert)) continue;
  spec = spec.replace(addition.after, addition.after + addition.insert);
}

if (process.argv.includes('--check')) {
  const current = readFileSync(targetPath, 'utf8');
  if (current === spec) {
    console.log('openapi/openapi.yaml matches openapi/openapi-direct.yaml plus the SDK RapidAPI additions.');
  } else {
    const currentLines = new Set(current.split('\n'));
    const builtLines = new Set(spec.split('\n'));
    const added = spec.split('\n').filter((line) => !currentLines.has(line)).length;
    const removed = current.split('\n').filter((line) => !builtLines.has(line)).length;
    console.log(`openapi/openapi.yaml is behind openapi/openapi-direct.yaml (${added} lines new upstream, ${removed} lines replaced). Run npm run build-spec and npm run generate to apply it to the /v1 SDKs.`);
  }
} else {
  writeFileSync(targetPath, spec);
  console.log('openapi/openapi.yaml built from openapi/openapi-direct.yaml with the SDK RapidAPI additions.');
}
