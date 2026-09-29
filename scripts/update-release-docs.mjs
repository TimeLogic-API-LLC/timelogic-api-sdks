import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const releaseVersion = process.env.SDK_VERSION;
if (!releaseVersion || !/^\d+\.\d+\.\d+$/.test(releaseVersion)) {
  throw new Error('SDK_VERSION must be a semantic version (MAJOR.MINOR.PATCH)');
}

const versionFile = path.join(root, '.sdk-version');
const previousVersion = readFileSync(versionFile, 'utf8').trim();
if (!/^\d+\.\d+\.\d+$/.test(previousVersion)) {
  throw new Error('.sdk-version must contain a semantic version (MAJOR.MINOR.PATCH)');
}

function markdownFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      if (['.git', 'node_modules', 'vendor'].includes(entry.name)) return [];
      return markdownFiles(file);
    }
    return entry.isFile() && entry.name.toLowerCase().endsWith('.md') ? [file] : [];
  });
}

if (previousVersion !== releaseVersion) {
  const versionPattern = previousVersion.split('.').join('[.]');
  const currentRelease = new RegExp(`(?<![0-9.])v?${versionPattern}(?![0-9]|[.][0-9])`, 'g');
  for (const file of markdownFiles(root)) {
    const source = readFileSync(file, 'utf8');
    const updated = source.replace(currentRelease, (match) => `${match.startsWith('v') ? 'v' : ''}${releaseVersion}`);
    if (updated !== source) writeFileSync(file, updated);
  }
}

writeFileSync(versionFile, `${releaseVersion}\n`);
console.log(`Updated Markdown version references from ${previousVersion} to ${releaseVersion}.`);
