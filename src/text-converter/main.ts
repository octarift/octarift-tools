import '@shared/styles/base.css';
import './text-converter.css';
import { applyStrings, lang, setMetaDescription } from '@shared/i18n';
import { mountSiteChrome } from '@shared/site-chrome';
import { readJSON, writeJSON } from '@shared/storage';
import {
  ConversionError,
  conversions,
  filterLines,
  findReplace,
  groups,
  type AffixOptions,
  type Conversion,
  type ConversionContext,
  type FilterOptions,
  type ListOptions,
  type NumberOptions,
  type ReplaceOptions,
} from './conversions';
import { s } from './strings';

applyStrings(s);
setMetaDescription(s.metaDescription);
document.title = `${s.pageTitle} – Octarift Tools`;
mountSiteChrome('text-converter');

function $<T extends HTMLElement = HTMLElement>(selector: string): T {
  const el = document.querySelector<T>(selector);
  if (!el) throw new Error(`Missing element: ${selector}`);
  return el;
}

const els = {
  list: $('#conversion-list'),
  hint: $('#conversion-hint'),
  input: $<HTMLTextAreaElement>('#tc-input'),
  output: $<HTMLTextAreaElement>('#tc-output'),
  error: $('#tc-error'),
  inputStats: $('#tc-input-stats'),
  outputStats: $('#tc-output-stats'),
  clear: $<HTMLButtonElement>('#tc-clear'),
  copy: $<HTMLButtonElement>('#tc-copy'),
  use: $<HTMLButtonElement>('#tc-use'),
  toast: $('#toast'),
  replaceFields: $('#replace-fields'),
  find: $<HTMLInputElement>('#tc-find'),
  replace: $<HTMLInputElement>('#tc-replace'),
  caseSensitive: $<HTMLInputElement>('#tc-case'),
  regex: $<HTMLInputElement>('#tc-regex'),
  affixFields: $('#affix-fields'),
  prefix: $<HTMLInputElement>('#tc-prefix'),
  suffix: $<HTMLInputElement>('#tc-suffix'),
  affixSkip: $<HTMLInputElement>('#tc-affix-skip'),
  numberFields: $('#number-fields'),
  numberStart: $<HTMLInputElement>('#tc-number-start'),
  numberSep: $<HTMLInputElement>('#tc-number-sep'),
  numberPad: $<HTMLInputElement>('#tc-number-pad'),
  numberSkip: $<HTMLInputElement>('#tc-number-skip'),
  listFields: $('#list-fields'),
  listSep: $<HTMLInputElement>('#tc-list-sep'),
  filterFields: $('#filter-fields'),
  filterFind: $<HTMLInputElement>('#tc-filter-find'),
  filterCase: $<HTMLInputElement>('#tc-filter-case'),
  filterRegex: $<HTMLInputElement>('#tc-filter-regex'),
};

/** Settings panels shown only for the conversion that uses them. */
const panels: Partial<Record<Conversion['id'], HTMLElement>> = {
  replace: els.replaceFields,
  affix: els.affixFields,
  numberLines: els.numberFields,
  toList: els.listFields,
  fromList: els.listFields,
  keepLines: els.filterFields,
  dropLines: els.filterFields,
};
const panelSet = new Set(Object.values(panels));

/** The chosen conversion is remembered; the text itself only for this tab (sessionStorage). */
const CONVERSION_KEY = 'text-converter:conversion';
const INPUT_KEY = 'text-converter:input';
/** Values of every settings field, by element id (sessionStorage too). */
const SETTINGS_KEY = 'text-converter:settings';

const byId = new Map(conversions.map((c) => [c.id, c]));
let current: Conversion = byId.get(readJSON<Conversion['id']>(CONVERSION_KEY) ?? 'lower') ?? conversions[0]!;

function readSession(key = INPUT_KEY): string {
  try {
    return sessionStorage.getItem(key) ?? '';
  } catch {
    return '';
  }
}

function writeSession(value: string, key = INPUT_KEY): void {
  try {
    if (value) sessionStorage.setItem(key, value);
    else sessionStorage.removeItem(key);
  } catch {
    // Storage blocked or full: the text just is not kept across reloads.
  }
}

function replaceOptions(): ReplaceOptions {
  return {
    find: els.find.value,
    replace: els.replace.value,
    caseSensitive: els.caseSensitive.checked,
    regex: els.regex.checked,
  };
}

function affixOptions(): AffixOptions {
  return { prefix: els.prefix.value, suffix: els.suffix.value, skipEmpty: els.affixSkip.checked };
}

function numberOptions(): NumberOptions {
  return {
    start: els.numberStart.value === '' ? 1 : Number(els.numberStart.value),
    separator: els.numberSep.value,
    pad: els.numberPad.checked,
    skipEmpty: els.numberSkip.checked,
  };
}

function listOptions(): ListOptions {
  return { separator: els.listSep.value };
}

function filterOptions(): FilterOptions {
  return { find: els.filterFind.value, caseSensitive: els.filterCase.checked, regex: els.filterRegex.checked };
}

function context(): ConversionContext {
  return {
    lang,
    replace: replaceOptions(),
    affix: affixOptions(),
    numbering: numberOptions(),
    list: listOptions(),
    filter: filterOptions(),
  };
}

/* ---------- Conversion list ---------- */

els.list.innerHTML = groups
  .map((g) => {
    const buttons = conversions
      .filter((c) => c.group === g)
      .map((c) => `<button type="button" class="chip" data-conversion="${c.id}">${s.conv[c.id]}</button>`)
      .join('');
    return `<div class="tc-group" role="group" aria-label="${s.groups[g]}"><h3 class="tc-group__title">${s.groups[g]}</h3><div class="tc-group__chips">${buttons}</div></div>`;
  })
  .join('');

els.list.addEventListener('click', (e) => {
  const button = (e.target as Element).closest<HTMLButtonElement>('[data-conversion]');
  const next = button && byId.get(button.dataset.conversion as Conversion['id']);
  if (!next) return;
  current = next;
  writeJSON(CONVERSION_KEY, next.id);
  render();
});

/* ---------- Rendering ---------- */

const normalize = (text: string) => text.replace(/\r\n?/g, '\n');

function stats(text: string): string {
  const chars = [...text].length;
  const words = text.match(/[\p{L}\p{N}]+(?:['’-][\p{L}\p{N}]+)*/gu)?.length ?? 0;
  const lines = text === '' ? 0 : text.split('\n').length;
  const n = (v: number) => v.toLocaleString(lang);
  return `${s.statChars}: ${n(chars)} · ${s.statWords}: ${n(words)} · ${s.statLines}: ${n(lines)}`;
}

function render(): void {
  els.list.querySelectorAll<HTMLButtonElement>('[data-conversion]').forEach((b) => {
    b.setAttribute('aria-pressed', String(b.dataset.conversion === current.id));
  });
  const isReplace = current.id === 'replace';
  const isFilter = current.id === 'keepLines' || current.id === 'dropLines';
  for (const panel of panelSet) panel.hidden = panel !== panels[current.id];
  let hint = (s.hints as Partial<Record<Conversion['id'], string>>)[current.id] ?? '';

  const input = normalize(els.input.value);
  let result = '';
  let error = '';
  if (input !== '') {
    try {
      if (isReplace) {
        const replaced = findReplace(input, replaceOptions());
        result = replaced.text;
        if (els.find.value) hint = `${s.replaceCount}: ${replaced.count.toLocaleString(lang)}. ${hint}`;
      } else if (isFilter) {
        const filtered = filterLines(input, filterOptions(), current.id === 'keepLines');
        result = filtered.text;
        if (els.filterFind.value) hint = `${s.matchingLines}: ${filtered.count.toLocaleString(lang)}. ${hint}`;
      } else {
        result = current.run(input, lang, context());
      }
    } catch (e) {
      if (!(e instanceof ConversionError)) throw e;
      error = s[e.key] + (e.detail ? ` (${e.detail})` : '');
    }
  }
  els.hint.textContent = hint;
  els.output.value = result;
  els.error.textContent = error;
  els.error.hidden = !error;
  els.output.classList.toggle('is-error', Boolean(error));
  els.inputStats.textContent = stats(input);
  els.outputStats.textContent = stats(result);
  els.copy.disabled = els.use.disabled = result === '';
  els.clear.disabled = input === '';
}

/* ---------- Actions ---------- */

let renderQueued = false;
/** Coalesces fast typing into one conversion per frame. */
function queueRender(): void {
  if (renderQueued) return;
  renderQueued = true;
  requestAnimationFrame(() => {
    renderQueued = false;
    render();
  });
}

els.input.addEventListener('input', () => {
  writeSession(els.input.value);
  queueRender();
});

const settingFields = [...panelSet].flatMap((panel) => [...panel.querySelectorAll<HTMLInputElement>('input[id]')]);

function saveSettings(): void {
  const values = Object.fromEntries(settingFields.map((f) => [f.id, f.type === 'checkbox' ? f.checked : f.value]));
  writeSession(JSON.stringify(values), SETTINGS_KEY);
}

function restoreSettings(): void {
  let saved: Record<string, unknown>;
  try {
    saved = JSON.parse(readSession(SETTINGS_KEY) || '{}') as Record<string, unknown>;
  } catch {
    return; // A damaged saved value: keep the defaults.
  }
  for (const f of settingFields) {
    const v = saved[f.id];
    if (f.type === 'checkbox' && typeof v === 'boolean') f.checked = v;
    else if (f.type !== 'checkbox' && typeof v === 'string') f.value = v;
  }
}

for (const field of settingFields) {
  field.addEventListener('input', () => {
    saveSettings();
    queueRender();
  });
}

els.clear.addEventListener('click', () => {
  els.input.value = '';
  writeSession('');
  render();
  els.input.focus();
});

els.use.addEventListener('click', () => {
  els.input.value = els.output.value;
  writeSession(els.input.value);
  render();
  els.input.focus();
});

els.copy.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(els.output.value);
    toast(s.copied);
  } catch {
    els.output.select();
    toast(s.copyFailed);
  }
});

let toastTimer = 0;
function toast(message: string): void {
  els.toast.textContent = message;
  els.toast.hidden = false;
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => {
    els.toast.hidden = true;
  }, 2400);
}

els.input.value = readSession();
restoreSettings();
render();
