import { readFileSync } from 'node:fs';
import SwaggerParser from '@apidevtools/swagger-parser';

const input = 'openapi/openapi.yaml';
const spec = await SwaggerParser.validate(input);
const operations = [];
for (const [path, item] of Object.entries(spec.paths ?? {})) {
  for (const [method, operation] of Object.entries(item)) {
    if (!['get', 'post', 'put', 'patch', 'delete', 'head', 'options', 'trace'].includes(method)) continue;
    if (!operation.operationId) throw new Error(`${method.toUpperCase()} ${path} has no operationId`);
    operations.push(`${method.toUpperCase()} ${path} (${operation.operationId})`);
  }
}

if (operations.length !== 10) throw new Error(`Expected 10 direct operations, found ${operations.length}`);
if (spec.servers?.[0]?.url !== 'https://{host}') throw new Error('The default customer-host server is missing');
if (spec.servers?.[0]?.variables?.host?.default !== 'api.timelogicapi.com') throw new Error('The default API host is incorrect');
if (spec.servers?.[1]?.url !== 'https://{rapidapiHost}') throw new Error('The RapidAPI server is missing');
if (spec.servers?.[1]?.variables?.rapidapiHost?.default !== 'timelogic-api-world-time-timezones-time-calculations.p.rapidapi.com') throw new Error('The default RapidAPI host is incorrect');
if (!spec.components?.securitySchemes?.rapidApiKey || !spec.components?.securitySchemes?.rapidApiHost) throw new Error('RapidAPI security schemes are missing');
if (JSON.stringify(spec).includes('workers.dev')) throw new Error('The public SDK contract must not contain a workers.dev host');

console.log(`OpenAPI validation passed: ${operations.length} operations`);
for (const operation of operations) console.log(`  ${operation}`);
