/**
 * Manifest toolkit — dependency-free (plain Node ESM).
 *
 * `manifest.json` is what the AGILER Design agent reads: the bounded component vocabulary, the
 * layout archetypes (page skeletons) it may fill, and the `theme.json` contract. It is generated
 * from `catalog.json` plus the `layout.json` contracts under `src/layouts/<id>/` and validated
 * against the package's public exports so the two can never drift.
 */
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

export const SHELLS = ['public-shell', 'app-shell-sidebar', 'topnav-shell'];

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

/** Layout archetypes, read from `src/layouts/<id>/layout.json`. */
export function loadLayouts(problems) {
  const dir = join(root, 'src', 'layouts');
  if (!existsSync(dir)) return [];

  const layouts = [];
  for (const entry of readdirSync(dir)) {
    const contractPath = join(dir, entry, 'layout.json');
    if (!existsSync(contractPath)) continue;
    const contract = JSON.parse(readFileSync(contractPath, 'utf8'));

    if (!contract.id || !contract.name) problems.push(`layout "${entry}" needs id + name`);
    if (!SHELLS.includes(contract.shell)) {
      problems.push(`layout "${contract.id}" has unknown shell "${contract.shell}"`);
    }
    for (const field of ['component', 'preview']) {
      if (!contract[field]) problems.push(`layout "${contract.id}" is missing "${field}"`);
    }
    const regions = contract.regions ?? [];
    if (regions.length === 0) problems.push(`layout "${contract.id}" declares no regions`);
    if (!regions.some((region) => region.required)) {
      problems.push(`layout "${contract.id}" has no required region`);
    }
    for (const region of regions) {
      if (!region.id || !region.prop) {
        problems.push(`layout "${contract.id}" has a region without id/prop`);
      }
    }
    if (!existsSync(join(dir, entry, 'layout.tsx'))) {
      problems.push(`layout "${contract.id}" has no layout.tsx`);
    }
    layouts.push(contract);
  }

  layouts.sort((a, b) => a.id.localeCompare(b.id));
  return layouts;
}

/** Build the manifest object and collect validation problems. */
export function buildManifest() {
  const pkg = readJson('package.json');
  const catalog = readJson('catalog.json');
  const problems = [];

  const components = [...catalog.components].sort((a, b) => a.name.localeCompare(b.name));
  const available = components.filter((component) => component.status === 'available');
  const planned = components.filter((component) => component.status === 'planned');
  const api = catalog.api ?? [];
  const layouts = loadLayouts(problems);

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

  // Layouts may only compose components that actually exist.
  const availableNames = new Set(available.map((component) => component.name));
  for (const layout of layouts) {
    for (const required of layout.requiredComponents ?? []) {
      if (!availableNames.has(required)) {
        problems.push(`layout "${layout.id}" requires unknown component "${required}"`);
      }
    }
  }

  const exports = publicExports();
  const apiNames = new Set(api.map((entry) => entry.name));
  const layoutExports = new Set(
    layouts.flatMap((layout) => [layout.component, layout.preview]).filter(Boolean),
  );

  for (const name of exports) {
    if (!availableNames.has(name) && !apiNames.has(name) && !layoutExports.has(name)) {
      problems.push(
        `"${name}" is exported from src/index.ts but is not an available component, a layout, or in the catalog "api" list`,
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
      problems.push(`"${name}" is in the catalog "api" list but not exported from src/index.ts`);
    }
  }
  for (const name of layoutExports) {
    if (!exports.includes(name)) {
      problems.push(`layout export "${name}" is not exported from src/index.ts`);
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
      layouts: layouts.length,
      total: components.length,
    },
    rules: catalog.rules,
    components,
    layouts,
    api,
  };

  return { manifest, problems };
}
