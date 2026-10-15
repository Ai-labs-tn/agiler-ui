#!/usr/bin/env node
/** Generate `manifest.json` from `catalog.json` (+ validate against public exports). */
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

import { buildManifest } from './manifest-lib.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const { manifest, problems } = buildManifest();

if (problems.length > 0) {
  console.error('✗ catalog/export drift:');
  for (const problem of problems) console.error(`  - ${problem}`);
  process.exit(1);
}

writeFileSync(join(root, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`);
console.log(
  `✓ manifest.json written — ${manifest.counts.available} available, ${manifest.counts.planned} planned (v${manifest.version})`,
);
