import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const targets = JSON.parse(readFileSync('config/generators.json', 'utf8'));
for (const target of targets) {
  const files = [];
  for (const required of target.required) {
    const targetPath = join(target.output, required);
    if (existsSync(targetPath)) files.push(required);
    else if (required.startsWith('.') && existsSync(target.output) && (await import('node:fs')).readdirSync(target.output).some((name) => name.endsWith(required))) files.push(required);
    else throw new Error(`${target.id}: missing generated artifact ${required}`);
  }
  console.log(`${target.id}: generated artifacts present (${files.join(', ')})`);
}

for (const file of ['Package.swift', 'Package.resolved', 'composer.json', 'phpunit.xml.dist']) {
  if (!existsSync(file)) throw new Error(`Root package manifest: missing ${file}`);
}
console.log('root package manifests: Swift and Composer present');

const transportArtifacts = {
  typescript: 'packages/typescript/src/transport.ts',
  python: 'packages/python/timelogic_direct_api/transport.py',
  rust: 'packages/rust/src/apis/configuration.rs',
  go: 'packages/go/transport.go',
  java: 'packages/java/src/main/java/com/timelogic/direct/TransportConfiguration.java',
  csharp: 'packages/csharp/src/TimeLogic.Api/Client/TransportConfiguration.cs',
  php: 'packages/php/lib/TransportConfiguration.php',
  ruby: 'packages/ruby/lib/timelogic-api/transport_configuration.rb',
  kotlin: 'packages/kotlin/src/main/kotlin/com/timelogic/direct/api/infrastructure/TransportConfiguration.kt',
  swift: 'packages/swift/OpenAPIClient/Classes/OpenAPIs/TransportConfiguration.swift'
};

for (const [target, artifact] of Object.entries(transportArtifacts)) {
  if (!existsSync(artifact)) throw new Error(`${target}: missing RapidAPI transport helper ${artifact}`);
  console.log(`${target}: RapidAPI transport helper present`);
}
