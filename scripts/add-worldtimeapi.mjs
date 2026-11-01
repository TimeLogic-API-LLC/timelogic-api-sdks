// Adds the WorldTimeAPI-compatible client to each existing SDK package.
//
// Sources live in config/worldtimeapi/<language>/ and mirror each package's
// layout. They are copied into packages/<language>/ after the /v1 SDKs are
// generated and normalized, so regeneration always rebuilds them. Every copied
// file is new to its package; the only edits to generated files are the
// additive wiring lines listed in `wiring` below.
import { copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sourceRoot = path.join(root, 'config/worldtimeapi');

function filesUnder(directory) {
  const result = [];
  for (const name of readdirSync(directory).sort()) {
    const file = path.join(directory, name);
    if (statSync(file).isDirectory()) result.push(...filesUnder(file));
    else result.push(file);
  }
  return result;
}

// One additive line per package that needs an entry point. Nothing is removed
// or reordered; the line is appended once.
const wiring = {
  typescript: [['src/index.ts', "export * from './worldtimeapi';"]],
  ruby: [['lib/timelogic-api.rb', "require 'timelogic-api/world_time_api'"]],
  rust: [['src/lib.rs', 'pub mod worldtimeapi;']]
};

let copied = 0;
for (const language of readdirSync(sourceRoot).sort()) {
  const languageRoot = path.join(sourceRoot, language);
  if (!statSync(languageRoot).isDirectory()) continue;
  const packageRoot = path.join(root, 'packages', language);
  if (!existsSync(packageRoot)) throw new Error(`${language}: packages/${language} is missing`);
  for (const source of filesUnder(languageRoot)) {
    const relative = path.relative(languageRoot, source);
    const target = path.join(packageRoot, relative);
    if (existsSync(target) && readFileSync(target, 'utf8') !== readFileSync(source, 'utf8')) {
      throw new Error(`${language}: ${relative} already exists in the generated package; WorldTimeAPI files must be new files`);
    }
    mkdirSync(path.dirname(target), { recursive: true });
    copyFileSync(source, target);
    copied += 1;
  }
  for (const [file, line] of wiring[language] ?? []) {
    const target = path.join(packageRoot, file);
    const content = readFileSync(target, 'utf8');
    if (content.split('\n').includes(line)) continue;
    writeFileSync(target, `${content.replace(/\n*$/, '\n')}${line}\n`);
  }
}
console.log(`WorldTimeAPI-compatible client: ${copied} files added to the SDK packages.`);
