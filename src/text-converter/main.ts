import '@shared/styles/base.css';
import './text-converter.css';
import { applyStrings, lang, setMetaDescription } from '@shared/i18n';
import { mountSiteChrome } from '@shared/site-chrome';
import { readJSON, writeJSON } from '@shared/storage';
import { ConversionError, conversions, groups, type Conversion } from './conversions';
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
};

/** The chosen conversion is remembered; the text itself only for this tab (sessionStorage). */
const CONVERSION_KEY = 'text-converter:conversion';
const INPUT_KEY = 'text-converter:input';

const byId = new Map(conversions.map((c) => [c.id, c]));
let current: Conversion = byId.get(readJSON<Conversion['id']>(CONVERSION_KEY) ?? 'lower') ?? conversions[0]!;

function readSession(): string {
  try {
    return sessionStorage.getItem(INPUT_KEY) ?? '';
  } catch {
    return '';
  }
}

function writeSession(value: string): void {
  try {
    if (value) sessionStorage.setItem(INPUT_KEY, value);
    else sessionStorage.removeItem(INPUT_KEY);
  } catch {
    // Storage blocked or full: the text just is not kept across reloads.
  }
}

/* ---------- Conversion list ---------- */

els.list.innerHTML = groups
  .map((g) => {
    const buttons = conversions
      .filter((c) => c.group === g)
      .map((c) => `<button type="button" class="tc-chip" data-conversion="${c.id}">${s.conv[c.id]}</button>`)
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
  els.hint.textContent = (s.hints as Partial<Record<Conversion['id'], string>>)[current.id] ?? '';

  const input = normalize(els.input.value);
  let result = '';
  let error = '';
  if (input !== '') {
    try {
      result = current.run(input, lang);
    } catch (e) {
      if (!(e instanceof ConversionError)) throw e;
      error = s[e.key] + (e.detail ? ` (${e.detail})` : '');
    }
  }
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
els.input.addEventListener('input', () => {
  writeSession(els.input.value);
  // Coalesce fast typing into one conversion per frame.
  if (renderQueued) return;
  renderQueued = true;
  requestAnimationFrame(() => {
    renderQueued = false;
    render();
  });
});

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
render();
