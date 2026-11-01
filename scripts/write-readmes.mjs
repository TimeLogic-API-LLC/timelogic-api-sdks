// Writes packages/<language>/README.md from config/readmes/<language>.md.
// `<!-- include: shared/<file>.md -->` lines are replaced with that file from
// config/readmes, and `__VERSION__` with the SDK version. Runs after every other
// generation step, so the published READMEs always come from these templates.
import { readFileSync, writeFileSync } from 'node:fs';

const currentVersion = readFileSync('.sdk-version', 'utf8').trim();
const releaseVersion = process.env.SDK_VERSION ?? currentVersion;
const languages = ['typescript', 'python', 'go', 'rust', 'java', 'kotlin', 'csharp', 'php', 'ruby', 'swift'];

for (const language of languages) {
  const template = readFileSync(`config/readmes/${language}.md`, 'utf8');
  const expanded = template.replace(/^<!-- include: (shared\/[a-z0-9-]+\.md) -->$/gm, (_, file) =>
    readFileSync(`config/readmes/${file}`, 'utf8').trimEnd()
  );
  if (expanded.includes('<!-- include:')) throw new Error(`Unresolved include in config/readmes/${language}.md`);
  writeFileSync(`packages/${language}/README.md`, expanded.replaceAll('__VERSION__', releaseVersion));
}
console.log(`Package READMEs written for ${languages.length} SDKs.`);
