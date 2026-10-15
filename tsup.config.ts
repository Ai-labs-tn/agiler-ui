import { defineConfig } from 'tsup';

/**
 * Library build for registry consumption (GitHub Packages).
 * Until `dist` exists, consumers use the workspace/link or a Vite alias pointing at `src`.
 */
export default defineConfig({
  entry: { index: 'src/index.ts' },
  format: ['esm'],
  dts: true,
  sourcemap: true,
  clean: true,
  external: ['react', 'react-dom'],
  // CSS Modules are imported by the components; keep them alongside the JS so bundlers resolve them.
  loader: { '.css': 'copy' },
});
