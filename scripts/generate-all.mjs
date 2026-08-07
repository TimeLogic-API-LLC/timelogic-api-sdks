import { existsSync, readFileSync, rmSync } from 'node:fs';
import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const image = process.env.OPENAPI_GENERATOR_IMAGE ?? 'openapitools/openapi-generator-cli:v7.10.0';
const targets = JSON.parse(readFileSync(path.join(root, 'config/generators.json'), 'utf8'));
const dockerUserArgs = typeof process.getuid === 'function' && typeof process.getgid === 'function'
  ? ['--user', `${process.getuid()}:${process.getgid()}`]
  : [];

if (!existsSync(path.join(root, 'openapi/openapi.yaml'))) throw new Error('openapi/openapi.yaml is missing');

const properties = {
  typescript: 'npmName=@timelogic/direct-api,npmVersion=1.0.0,supportsES6=true,useSingleRequestParameter=true,generateAliasAsModel=true,gitUserId=TimeLogic-API-LLC,gitRepoId=timelogic-api-sdks',
  python: 'packageName=timelogic_direct_api,projectName=timelogic-api,packageVersion=1.0.0,generateAliasAsModel=true,gitUserId=TimeLogic-API-LLC,gitRepoId=timelogic-api-sdks',
  rust: 'packageName=timelogic-api,packageVersion=1.0.0,generateAliasAsModel=true,gitUserId=TimeLogic-API-LLC,gitRepoId=timelogic-api-sdks',
  go: 'packageName=timelogicdirectapi,packageVersion=0.1.0,generateAliasAsModel=true,gitUserId=TimeLogic-API-LLC,gitRepoId=timelogic-api-sdks',
  java: 'groupId=com.timelogic,artifactId=timelogic-direct-api,artifactVersion=0.1.0,apiPackage=com.timelogic.direct.api,modelPackage=com.timelogic.direct.model,generateAliasAsModel=true,gitUserId=TimeLogic-API-LLC,gitRepoId=timelogic-api-sdks',
  csharp: 'packageName=TimeLogic.DirectApi,packageVersion=0.1.0,generateAliasAsModel=true,gitUserId=TimeLogic-API-LLC,gitRepoId=timelogic-api-sdks',
  php: 'invokerPackage=TimeLogic\\DirectApi,variableNamingConvention=camelCase,generateAliasAsModel=true,gitUserId=TimeLogic-API-LLC,gitRepoId=timelogic-api-sdks',
  ruby: 'gemName=timelogic-direct-api,moduleName=TimeLogic::DirectApi,generateAliasAsModel=true,gitUserId=TimeLogic-API-LLC,gitRepoId=timelogic-api-sdks',
  kotlin: 'packageName=com.timelogic.direct.api,artifactId=timelogic-direct-api,groupId=com.timelogic,artifactVersion=0.1.0,generateAliasAsModel=true,gitUserId=TimeLogic-API-LLC,gitRepoId=timelogic-api-sdks',
  swift: 'packageName=TimeLogicDirectAPI,generateAliasAsModel=true,gitUserId=TimeLogic-API-LLC,gitRepoId=timelogic-api-sdks'
};

const run = (args) => new Promise((resolve, reject) => {
  const child = spawn('docker', args, { cwd: root, stdio: 'inherit', shell: false });
  child.on('error', reject);
  child.on('exit', (code) => code === 0 ? resolve() : reject(new Error(`docker exited with ${code}`)));
});

for (const target of targets) {
  const output = path.join(root, target.output);
  rmSync(output, { recursive: true, force: true });
  console.log(`Generating ${target.id} SDK...`);
  await run([
    'run', '--rm',
    ...dockerUserArgs,
    '-v', `${root}:/local`,
    image, 'generate',
    '-i', '/local/openapi/openapi.yaml',
    '-g', target.generator,
    '-o', `/local/${target.output.replaceAll('\\', '/')}`,
    '--additional-properties', properties[target.id]
  ]);
}

await import('./normalize-generated.mjs');
console.log(`Generated ${targets.length} SDK targets.`);
