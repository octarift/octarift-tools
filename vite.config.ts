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
    match: /[\\/]node_modules[\\/]lzma1[\\/]/,
    notice: 'lzma1 | MIT License | Copyright (c) Filip Seman and lzma1 contributors',
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

/**
 * Fills %CHRISTMAS_YEAR% in page HTML with the year of the next Christmas (from 27 December on, next
 * year's). The static text is what search engines read first; the page itself updates it live.
 * After New Year a fresh deploy is needed for the static text to follow.
 */
function christmasYear(): Plugin {
  return {
    name: 'christmas-year',
    transformIndexHtml(html) {
      const now = new Date();
      const year = now >= new Date(now.getFullYear(), 11, 27) ? now.getFullYear() + 1 : now.getFullYear();
      return html.replaceAll('%CHRISTMAS_YEAR%', String(year));
    },
  };
}

const SITE_URL = 'https://tools.octarift.com';

/**
 * Writes sitemap.xml from the pages Vite builds (pageInputs), so new tools are listed automatically.
 * Each page has a Czech and an English URL (?lang=cs / ?lang=en) plus the plain one as x-default,
 * matching the hreflang links in the pages.
 */
function sitemap(): Plugin {
  return {
    name: 'sitemap',
    apply: 'build',
    generateBundle() {
      const lastmod = new Date().toISOString().slice(0, 10);
      const paths = Object.keys(pageInputs())
        .map((name) => (name === 'hub' ? '/' : `/${name}/`))
        .sort((a, b) => (a === '/' ? -1 : b === '/' ? 1 : a.localeCompare(b)));
      const alternates = (path: string) =>
        [
          `    <xhtml:link rel="alternate" hreflang="cs" href="${SITE_URL}${path}?lang=cs"/>`,
          `    <xhtml:link rel="alternate" hreflang="en" href="${SITE_URL}${path}?lang=en"/>`,
          `    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_URL}${path}"/>`,
        ].join('\n');
      const urls = paths.flatMap((path) =>
        ['cs', 'en'].map(
          (l) => `  <url>\n    <loc>${SITE_URL}${path}?lang=${l}</loc>\n    <lastmod>${lastmod}</lastmod>\n${alternates(path)}\n  </url>`,
        ),
      );
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source:
          '<?xml version="1.0" encoding="UTF-8"?>\n' +
          '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n' +
          `${urls.join('\n')}\n</urlset>\n`,
      });
    },
  };
}

export default defineConfig({
  root,
  publicDir: resolve(here, 'public'),
  plugins: [licenseNotices(), christmasYear(), sitemap()],
  resolve: {
    alias: { '@shared': resolve(root, 'shared') },
  },
  build: {
    outDir: resolve(here, 'dist'),
    emptyOutDir: true,
    rollupOptions: { input: pageInputs() },
  },
});
