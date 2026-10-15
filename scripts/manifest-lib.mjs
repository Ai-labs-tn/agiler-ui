/**
 * Manifest toolkit — dependency-free (plain Node ESM).
 *
 * The `manifest.json` is what the AGILER Design agent reads: the bounded component
 * vocabulary it may compose screens from. It is generated from `catalog.json` and
 * validated against the package's public exports so the two can never drift.
 */
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

export const readJson = (path) => JSON.parse(readFileSync(join(root, path), 'utf8'));

/** Value exports of `src/index.ts` (skips `type X` entries). */
export function publicExports() {
  const source = readFileSync(join(root, 'src/index.ts'), 'utf8');
  const names = new Set();
  const block = /export\s*\{([^}]*)\}\s*from/g;
  let match;
  while ((match = block.exec(source)) !== null) {
    for (const entry of match[1].split(',')) {
      const name = entry.trim();
      if (!name || name.startsWith('type ')) continue;
      names.add(name);
    }
  }
  return [...names].sort();
}

/** Build the manifest object and collect validation problems. */
export function buildManifest() {
  const pkg = readJson('package.json');
  const catalog = readJson('catalog.json');
  const problems = [];

  const components = [...catalog.components].sort((a, b) => a.name.localeCompare(b.name));
  const available = components.filter((component) => component.status === 'available');
  const planned = components.filter((component) => component.status === 'planned');

  for (const component of components) {
    if (component.status === 'available') {
      if (!component.source || !existsSync(join(root, component.source))) {
        problems.push(`available component "${component.name}" has no resolvable source`);
      }
      if (!component.summary) {
        problems.push(`available component "${component.name}" is missing a summary`);
      }
    }
  }

  const exports = publicExports();
  const api = catalog.api ?? [];
  const apiNames = new Set(api.map((entry) => entry.name));
  const availableNames = new Set(available.map((component) => component.name));
  for (const name of exports) {
    if (!availableNames.has(name) && !apiNames.has(name)) {
      problems.push(
        `"${name}" is exported from src/index.ts but is neither an available component nor in the catalog "api" list`,
      );
    }
  }
  for (const name of availableNames) {
    if (!exports.includes(name)) {
      problems.push(`"${name}" is catalogued as available but not exported from src/index.ts`);
    }
  }
  for (const name of apiNames) {
    if (!exports.includes(name)) {
      problems.push(`"${name}" is listed in the catalog "api" list but not exported from src/index.ts`);
    }
  }

  const manifest = {
    name: catalog.name,
    version: pkg.version,
    generatedAt: new Date().toISOString(),
    themeAttribute: catalog.themeAttribute,
    themes: catalog.themes,
    tokensFile: catalog.tokensFile,
    themesFile: catalog.themesFile,
    counts: {
      available: available.length,
      planned: planned.length,
      api: api.length,
      total: components.length,
    },
    rules: catalog.rules,
    components,
    api,
  };

  return { manifest, problems };
}
