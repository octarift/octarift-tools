import { defineConfig } from 'vite';
import { existsSync, readdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, 'src');

/**
 * Each tool lives in its own folder under src/ with an index.html
 * (e.g. src/countdown/index.html -> /countdown/). New tools are picked up
 * automatically; only src/index.html (the hub) is listed explicitly.
 */
function pageInputs(): Record<string, string> {
  const inputs: Record<string, string> = { hub: resolve(root, 'index.html') };
  for (const entry of readdirSync(root, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const html = resolve(root, entry.name, 'index.html');
    if (existsSync(html)) inputs[entry.name] = html;
  }
  return inputs;
}

export default defineConfig({
  root,
  publicDir: resolve(here, 'public'),
  resolve: {
    alias: { '@shared': resolve(root, 'shared') },
  },
  build: {
    outDir: resolve(here, 'dist'),
    emptyOutDir: true,
    rollupOptions: { input: pageInputs() },
  },
});
