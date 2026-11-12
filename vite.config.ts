import { defineConfig, type Plugin } from 'vite';
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

/**
 * Third-party code bundled into the scripts, matched by module id. Each chunk that contains such code starts
 * with a notice comment; full license texts are in public/third-party-licenses.txt.
 * Add an entry here (and to that file) for every new runtime dependency.
 */
const NOTICES: { match: RegExp; notice: string }[] = [
  {
    match: /[\\/]node_modules[\\/]uqr[\\/]/,
    notice: 'uqr | MIT License | Copyright (c) Project Nayuki, Copyright (c) 2023 Anthony Fu',
  },
  {
    match: /vite[\\/]modulepreload-polyfill/,
    notice: 'Vite module preload helper | MIT License | Copyright (c) 2019-present, VoidZero Inc. and Vite contributors',
  },
];

/** Prepends the notices once chunks are final (after minification, which would strip plain comments). */
function licenseNotices(): Plugin {
  return {
    name: 'license-notices',
    apply: 'build',
    generateBundle(_options, bundle) {
      for (const chunk of Object.values(bundle)) {
        if (chunk.type !== 'chunk') continue;
        const found = NOTICES.filter((n) => chunk.moduleIds.some((id) => n.match.test(id)));
        if (!found.length) continue;
        const lines = found.map((n) => ` * ${n.notice}`).join('\n');
        chunk.code =
          `/*! Third-party code in this file:\n${lines}\n` +
          ` * Full license texts: https://tools.octarift.com/third-party-licenses.txt */\n${chunk.code}`;
      }
    },
  };
}

export default defineConfig({
  root,
  publicDir: resolve(here, 'public'),
  plugins: [licenseNotices()],
  resolve: {
    alias: { '@shared': resolve(root, 'shared') },
  },
  build: {
    outDir: resolve(here, 'dist'),
    emptyOutDir: true,
    rollupOptions: { input: pageInputs() },
  },
});
