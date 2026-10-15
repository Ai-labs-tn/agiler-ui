#!/usr/bin/env node
/**
 * CI gate: the committed `manifest.json` must match what the catalog currently
 * produces (ignoring the generation timestamp), and the catalog must agree with
 * the public exports.
 */
import { readFileSync } from 'node:fs';
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

const committed = JSON.parse(readFileSync(join(root, 'manifest.json'), 'utf8'));
const strip = ({ generatedAt: _generatedAt, ...rest }) => rest;

if (JSON.stringify(strip(committed)) !== JSON.stringify(strip(manifest))) {
  console.error('✗ manifest.json is out of date — run `npm run manifest` and commit the result.');
  process.exit(1);
}

console.log(
  `✓ manifest.json is in sync — ${manifest.counts.available} available, ${manifest.counts.planned} planned (v${manifest.version})`,
);
