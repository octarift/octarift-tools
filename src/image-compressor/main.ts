import '@shared/styles/base.css';
import './image-compressor.css';
import { applyStrings, lang, setMetaDescription } from '@shared/i18n';
import { mountSiteChrome } from '@shared/site-chrome';
import { readJSON, writeJSON } from '@shared/storage';
import { LIBHEIF_SIZE_MB } from './heic';
import {
  compress,
  EXTENSION,
  FormatUnsupportedError,
  UnsupportedImageError,
  type CompressOptions,
  type CompressResult,
  type OutputFormat,
} from './process';
import { s } from './strings';
import { zip } from './zip';

applyStrings(s);
setMetaDescription(s.metaDescription);
document.title = `${s.pageTitle} – Octarift Tools`;
mountSiteChrome('image-compressor');

function $<T extends HTMLElement = HTMLElement>(selector: string): T {
  const el = document.querySelector<T>(selector);
  if (!el) throw new Error(`Missing element: ${selector}`);
  return el;
}

const els = {
  formats: $('#ic-formats'),
  formatHint: $('#ic-format-hint'),
  qualityField: $('#ic-quality-field'),
  quality: $<HTMLInputElement>('#ic-quality'),
  qualityValue: $<HTMLOutputElement>('#ic-quality-value'),
  size: $<HTMLSelectElement>('#ic-size'),
  custom: $('#ic-custom'),
  customSide: $<HTMLInputElement>('#ic-custom-side'),
  customError: $('#ic-custom-error'),
  drop: $('#ic-drop'),
  input: $<HTMLInputElement>('#ic-input'),
  results: $('#ic-results'),
  total: $('#ic-total'),
  zip: $<HTMLButtonElement>('#ic-zip'),
  clear: $<HTMLButtonElement>('#ic-clear'),
  list: $<HTMLUListElement>('#ic-list'),
};

/* ---------- Settings (remembered; the images themselves never are) ---------- */

const SETTINGS_KEY = 'image-compressor:settings:v1';
const FORMATS: OutputFormat[] = ['jpeg', 'webp', 'png'];
const SIZES = [0, 3840, 2560, 1920, 1280, 1024, 800];
/** Allowed range for a custom longest side. */
const CUSTOM_MIN = 16;
const CUSTOM_MAX = 10_000;
const validCustom = (n: number) => Number.isInteger(n) && n >= CUSTOM_MIN && n <= CUSTOM_MAX;

const saved = readJSON<Partial<CompressOptions>>(SETTINGS_KEY) ?? {};
const options: CompressOptions = {
  format: FORMATS.includes(saved.format!) ? saved.format! : 'jpeg',
  quality: typeof saved.quality === 'number' && saved.quality >= 0.1 && saved.quality <= 1 ? saved.quality : 0.8,
  maxSide: SIZES.includes(saved.maxSide!) || validCustom(saved.maxSide!) ? saved.maxSide! : 1920,
};

els.formats.innerHTML = FORMATS.map(
  (f) => `<button type="button" class="chip" data-format="${f}">${s.formats[f]}</button>`,
).join('');
els.size.innerHTML =
  SIZES.map((n) => `<option value="${n}">${s.sizes[n]}</option>`).join('') +
  `<option value="custom">${s.customOption}</option>`;
/** A custom size stays chosen even when it happens to equal a preset. */
let customChosen = !SIZES.includes(options.maxSide);

function showSettings(): void {
  for (const b of els.formats.querySelectorAll<HTMLButtonElement>('[data-format]')) {
    b.setAttribute('aria-pressed', String(b.dataset.format === options.format));
  }
  els.formatHint.textContent = s.formatHints[options.format];
  els.qualityField.hidden = options.format === 'png';
  els.quality.value = String(Math.round(options.quality * 100));
  els.qualityValue.value = `${els.quality.value} %`;
  els.size.value = customChosen ? 'custom' : String(options.maxSide);
  els.custom.hidden = !customChosen;
  if (customChosen && document.activeElement !== els.customSide) els.customSide.value = String(options.maxSide);
}

function settingsChanged(): void {
  writeJSON(SETTINGS_KEY, options);
  showSettings();
  // Re-run everything with the new settings (the originals are kept in memory).
  for (const item of items) item.status = 'pending';
  scheduleRun();
}

els.formats.addEventListener('click', (e) => {
  const button = (e.target as Element).closest<HTMLButtonElement>('[data-format]');
  const format = button?.dataset.format as OutputFormat | undefined;
  if (!format || format === options.format) return;
  options.format = format;
  settingsChanged();
});
els.quality.addEventListener('input', () => {
  els.qualityValue.value = `${els.quality.value} %`;
});
// Recompress when the slider is released, not on every step.
els.quality.addEventListener('change', () => {
  options.quality = Number(els.quality.value) / 100;
  settingsChanged();
});
els.size.addEventListener('change', () => {
  customChosen = els.size.value === 'custom';
  if (customChosen) {
    // Start from the current size (or Full HD for "original") and let the user edit it.
    const wasOriginal = !options.maxSide;
    if (wasOriginal) options.maxSide = 1920;
    els.customSide.value = String(options.maxSide);
    if (wasOriginal) settingsChanged();
    else showSettings();
    els.customSide.focus();
    els.customSide.select();
    return;
  }
  els.customError.hidden = true;
  options.maxSide = Number(els.size.value);
  settingsChanged();
});

/** Applies the typed size once it is a valid number; shows why not otherwise. */
function applyCustomSide(final: boolean): void {
  const n = Number(els.customSide.value);
  const ok = els.customSide.value !== '' && validCustom(n);
  els.customError.hidden = ok || !final;
  els.customError.textContent = s.customRange;
  els.customSide.toggleAttribute('aria-invalid', !ok && final);
  if (ok && n !== options.maxSide) {
    options.maxSide = n;
    settingsChanged();
  }
}

let customTimer = 0;
els.customSide.addEventListener('input', () => {
  // Wait for a pause in typing: "1", "12", "128" would each restart the compression otherwise.
  window.clearTimeout(customTimer);
  customTimer = window.setTimeout(() => applyCustomSide(false), 600);
});
els.customSide.addEventListener('change', () => {
  window.clearTimeout(customTimer);
  applyCustomSide(true);
});

/* ---------- Files ---------- */

interface Item {
  id: number;
  file: File;
  status: 'pending' | 'working' | 'done' | 'error';
  result?: CompressResult;
  url?: string;
  error?: string;
  li: HTMLLIElement;
}

const items: Item[] = [];
let nextId = 1;

function addFiles(files: Iterable<File>): void {
  for (const file of files) {
    const li = document.createElement('li');
    li.className = 'ic-item';
    const item: Item = { id: nextId++, file, status: 'pending', li };
    li.dataset.id = String(item.id);
    items.push(item);
    els.list.append(li);
    renderItem(item);
  }
  els.results.hidden = items.length === 0;
  scheduleRun();
}

els.input.addEventListener('change', () => {
  if (els.input.files) addFiles([...els.input.files]);
  els.input.value = ''; // allow choosing the same file again
});

for (const type of ['dragenter', 'dragover'] as const) {
  els.drop.addEventListener(type, (e) => {
    e.preventDefault();
    els.drop.classList.add('is-over');
  });
}
for (const type of ['dragleave', 'drop'] as const) {
  els.drop.addEventListener(type, () => els.drop.classList.remove('is-over'));
}
els.drop.addEventListener('drop', (e) => {
  e.preventDefault();
  if (e.dataTransfer?.files.length) addFiles([...e.dataTransfer.files]);
});
// A file dropped next to the box would otherwise open in the tab and leave the page.
window.addEventListener('dragover', (e) => e.preventDefault());
window.addEventListener('drop', (e) => e.preventDefault());

document.addEventListener('paste', (e) => {
  const files = [...(e.clipboardData?.files ?? [])].filter((f) => f.type.startsWith('image/') || /\.hei[cf]$/i.test(f.name));
  if (files.length) addFiles(files);
});

/* ---------- Processing: one image at a time, to keep memory use low ---------- */

let running = false;
let rerun = false;

function scheduleRun(): void {
  if (running) {
    rerun = true;
    return;
  }
  void run();
}

async function run(): Promise<void> {
  running = true;
  do {
    rerun = false;
    for (const item of items) {
      if (rerun) break; // settings changed: start over with the new ones
      if (item.status !== 'pending') continue;
      item.status = 'working';
      item.error = undefined;
      renderItem(item);
      const settings = { ...options };
      try {
        const result = await compress(item.file, settings, () => renderItem(item, s.loadingHeic));
        if (!items.includes(item)) continue; // removed meanwhile
        if (rerun) {
          item.status = 'pending';
          break;
        }
        setResult(item, result);
        item.status = 'done';
      } catch (e) {
        item.status = 'error';
        item.error = errorText(e, item.file);
      }
      renderItem(item);
      renderTotal();
    }
  } while (rerun);
  running = false;
}

function errorText(e: unknown, file: File): string {
  if (e instanceof FormatUnsupportedError) return s.errFormat.replace('{format}', s.formats[e.format]);
  if (e instanceof UnsupportedImageError) return s.errUnsupported;
  if (/\.hei[cf]$/i.test(file.name) || /hei[cf]/i.test(file.type)) return s.errHeic;
  return s.errGeneric;
}

function setResult(item: Item, result: CompressResult): void {
  if (item.url) URL.revokeObjectURL(item.url);
  item.result = result;
  item.url = URL.createObjectURL(result.blob);
}

/* ---------- Rendering ---------- */

const escapeHtml = (text: string) =>
  text.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c] ?? c);

function formatBytes(bytes: number): string {
  const nf = (n: number, digits: number) =>
    n.toLocaleString(lang, { maximumFractionDigits: digits, minimumFractionDigits: 0 });
  if (bytes < 1000) return `${bytes} B`;
  if (bytes < 1_000_000) return `${nf(bytes / 1000, 0)} kB`;
  return `${nf(bytes / 1_000_000, 1)} MB`;
}

const plural = new Intl.PluralRules(lang);
function filesLabel(n: number): string {
  const rule = plural.select(n);
  const form = rule === 'one' ? s.files.one : rule === 'few' ? s.files.few : s.files.many;
  return form.replace('{n}', n.toLocaleString(lang));
}

/** "photo.HEIC" + jpeg → "photo.jpg"; when the extension would not change, "-min" keeps the names apart. */
function outputName(file: File): string {
  const dot = file.name.lastIndexOf('.');
  const base = dot > 0 ? file.name.slice(0, dot) : file.name;
  const oldExt = dot > 0 ? file.name.slice(dot + 1).toLowerCase() : '';
  const ext = EXTENSION[options.format];
  const same = oldExt === ext || (ext === 'jpg' && oldExt === 'jpeg');
  return `${base}${same ? '-min' : ''}.${ext}`;
}

function renderItem(item: Item, note?: string): void {
  const { file, result } = item;
  const name = escapeHtml(file.name);
  let thumb = '<span class="ic-item__thumb ic-item__thumb--empty" aria-hidden="true"></span>';
  let meta = `<span>${formatBytes(file.size)}</span>`;
  let status = '';
  let actions = '';

  if (item.status === 'done' && result && item.url) {
    const saving = 1 - result.blob.size / file.size;
    thumb = `<img class="ic-item__thumb" src="${item.url}" alt="" width="${result.width}" height="${result.height}">`;
    const dims =
      result.width === result.sourceWidth
        ? `${result.width} × ${result.height}`
        : `${result.sourceWidth} × ${result.sourceHeight} → ${result.width} × ${result.height}`;
    meta =
      `<span>${dims} px</span>` +
      `<span>${formatBytes(file.size)} → <strong>${formatBytes(result.blob.size)}</strong></span>` +
      (saving > 0
        ? `<span class="ic-item__saved">${s.saved.replace('{percent}', String(Math.round(saving * 100)))}</span>`
        : '');
    if (saving <= 0) status = `<p class="ic-item__note">${result.blob.type === 'image/png' ? s.biggerPng : s.bigger}</p>`;
    actions = `<a class="button button--small" href="${item.url}" download="${escapeHtml(outputName(file))}">${s.download}</a>`;
  } else if (item.status === 'error') {
    status = `<p class="ic-item__error" role="alert">${escapeHtml(item.error ?? s.errGeneric)}</p>`;
  } else {
    const text = note ? note.replace('{size}', LIBHEIF_SIZE_MB.toLocaleString(lang)) : s.processing;
    status = `<p class="ic-item__note"><span class="ic-spinner" aria-hidden="true"></span>${text}</p>`;
  }

  item.li.innerHTML =
    thumb +
    `<div class="ic-item__body"><p class="ic-item__name" title="${name}">${name}</p>` +
    `<p class="ic-item__meta">${meta}</p>${status}</div>` +
    `<div class="ic-item__actions">${actions}` +
    `<button class="ic-item__remove" type="button" data-remove="${item.id}" aria-label="${s.remove}: ${name}" title="${s.remove}">` +
    `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>` +
    `</button></div>`;
}

function renderTotal(): void {
  const done = items.filter((i) => i.status === 'done' && i.result);
  els.zip.disabled = done.length === 0;
  if (!done.length) {
    els.total.textContent = '';
    return;
  }
  const before = done.reduce((n, i) => n + i.file.size, 0);
  const after = done.reduce((n, i) => n + i.result!.blob.size, 0);
  els.total.textContent = s.total
    .replace('{before}', formatBytes(before))
    .replace('{after}', formatBytes(after))
    .replace('{files}', filesLabel(done.length));
}

function removeItem(id: number): void {
  const index = items.findIndex((i) => i.id === id);
  if (index < 0) return;
  const [item] = items.splice(index, 1);
  if (item!.url) URL.revokeObjectURL(item!.url);
  item!.li.remove();
  els.results.hidden = items.length === 0;
  renderTotal();
}

els.list.addEventListener('click', (e) => {
  const button = (e.target as Element).closest<HTMLButtonElement>('[data-remove]');
  if (button) removeItem(Number(button.dataset.remove));
});

els.clear.addEventListener('click', () => {
  for (const item of [...items]) removeItem(item.id);
});

els.zip.addEventListener('click', async () => {
  const done = items.filter((i) => i.status === 'done' && i.result);
  if (!done.length) return;
  // Two photos can end up with the same name ("IMG_1.HEIC" and "IMG_1.JPG" → "IMG_1.jpg").
  const used = new Set<string>();
  const entries = await Promise.all(
    done.map(async (i) => {
      let name = outputName(i.file);
      for (let n = 2; used.has(name.toLowerCase()); n++) name = outputName(i.file).replace(/(\.\w+)$/, `-${n}$1`);
      used.add(name.toLowerCase());
      return { name, data: new Uint8Array(await i.result!.blob.arrayBuffer()) };
    }),
  );
  const url = URL.createObjectURL(zip(entries));
  const a = document.createElement('a');
  a.href = url;
  a.download = s.zipName;
  document.body.append(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
});

showSettings();
renderTotal();
