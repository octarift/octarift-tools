import '@shared/styles/base.css';
import './qr-code.css';
import { applyStrings, setMetaDescription } from '@shared/i18n';
import { mountSiteChrome } from '@shared/site-chrome';
import { readJSON, writeJSON } from '@shared/storage';
import { encode } from 'uqr';
import { FieldError, isComplete, modes, type Field, type Mode, type Values } from './modes';
import { s, type EccLevel, type ModeId } from './strings';

applyStrings(s);
setMetaDescription(s.metaDescription);
document.title = `${s.pageTitle} – Octarift Tools`;
mountSiteChrome('qr-code');

function $<T extends HTMLElement = HTMLElement>(selector: string): T {
  const el = document.querySelector<T>(selector);
  if (!el) throw new Error(`Missing element: ${selector}`);
  return el;
}

const els = {
  modes: $('#qr-modes'),
  payments: $('#qr-payments'),
  hint: $('#qr-mode-hint'),
  form: $<HTMLFormElement>('#qr-fields'),
  paymentNote: $('#qr-payment-note'),
  preview: $('#qr-preview'),
  empty: $('#qr-empty'),
  error: $('#qr-error'),
  warning: $('#qr-warning'),
  png: $<HTMLButtonElement>('#qr-png'),
  svg: $<HTMLButtonElement>('#qr-svg'),
  copy: $<HTMLButtonElement>('#qr-copy'),
  ecc: $<HTMLSelectElement>('#qr-ecc'),
  eccFixed: $('#qr-ecc-fixed'),
  size: $<HTMLSelectElement>('#qr-size'),
  fg: $<HTMLInputElement>('#qr-fg'),
  bg: $<HTMLInputElement>('#qr-bg'),
  content: $('#qr-content'),
  toast: $('#toast'),
};

/* ---------- Saved state ---------- */

/** Mode and look are remembered; what was typed (passwords, accounts) only for this tab. */
const SETTINGS_KEY = 'qr-code:settings:v1';
const VALUES_KEY = 'qr-code:values';

interface Settings {
  mode: ModeId;
  /** Payment type last used, opened by the "Payment" chip. */
  payment: ModeId;
  ecc: EccLevel;
  size: string;
  fg: string;
  bg: string;
}

const byId = new Map(modes.map((m) => [m.id, m]));
const isColor = (v: unknown): v is string => typeof v === 'string' && /^#[0-9a-f]{6}$/i.test(v);
const saved = readJSON<Partial<Settings>>(SETTINGS_KEY) ?? {};
const settings: Settings = {
  mode: saved.mode && byId.has(saved.mode) ? saved.mode : 'url',
  payment: saved.payment && byId.get(saved.payment)?.payment ? saved.payment : 'czPayment',
  ecc: saved.ecc && saved.ecc in s.eccLevels ? saved.ecc : 'M',
  size: ['512', '1024', '2048'].includes(saved.size ?? '') ? saved.size! : '1024',
  fg: isColor(saved.fg) ? saved.fg : '#000000',
  bg: isColor(saved.bg) ? saved.bg : '#ffffff',
};

let values: Values = {};
try {
  const raw = JSON.parse(sessionStorage.getItem(VALUES_KEY) ?? '{}') as unknown;
  if (raw && typeof raw === 'object') values = raw as Values;
} catch {
  // Storage blocked or a damaged value: start empty.
}

function saveValues(): void {
  try {
    sessionStorage.setItem(VALUES_KEY, JSON.stringify(values));
  } catch {
    // Storage blocked: values are just not kept across reloads.
  }
}

const saveSettings = () => writeJSON(SETTINGS_KEY, settings);
const current = (): Mode => byId.get(settings.mode) ?? modes[0]!;

/* ---------- Mode chips and form ---------- */

const chip = (id: string, label: string) => `<button type="button" class="chip" data-mode="${id}">${label}</button>`;
// First row: every non-payment type plus one "Payment" chip; second row: the payment types.
els.modes.innerHTML =
  modes
    .filter((m) => !m.payment)
    .map((m) => chip(m.id, s.modes[m.id]))
    .join('') + chip('payment', s.paymentGroup);
els.payments.innerHTML = modes
  .filter((m) => m.payment)
  .map((m) => chip(m.id, s.modes[m.id]))
  .join('');

function selectMode(e: Event): void {
  const button = (e.target as Element).closest<HTMLButtonElement>('[data-mode]');
  const id = button?.dataset.mode === 'payment' ? settings.payment : (button?.dataset.mode as ModeId | undefined);
  const mode = id && byId.get(id);
  if (!mode || mode.id === settings.mode) return;
  settings.mode = mode.id;
  if (mode.payment) settings.payment = mode.id;
  saveSettings();
  buildForm();
  render();
}
els.modes.addEventListener('click', selectMode);
els.payments.addEventListener('click', selectMode);

const escapeHtml = (text: string) =>
  text.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c] ?? c);

function fieldHtml(f: Field): string {
  const id = `qr-f-${f.id}`;
  const label = escapeHtml(s.fields[f.id]);
  if (f.type === 'checkbox') {
    return `<label class="qr-check" data-field="${f.id}"><input id="${id}" name="${f.id}" type="checkbox"><span>${label}</span></label>`;
  }
  const attrs = [
    `id="${id}"`,
    `name="${f.id}"`,
    f.maxLength ? `maxlength="${f.maxLength}"` : '',
    f.inputMode ? `inputmode="${f.inputMode}"` : '',
    `autocomplete="${f.autocomplete ?? 'off'}"`,
    f.required ? 'aria-required="true"' : '',
    `aria-describedby="${id}-error"`,
  ].join(' ');
  const placeholder = s.placeholders[f.id] ? ` placeholder="${escapeHtml(s.placeholders[f.id]!)}"` : '';
  let control: string;
  if (f.type === 'select') {
    const options = (f.options ?? []).map((o) => `<option value="${o}">${escapeHtml(s.options[o])}</option>`).join('');
    control = `<select ${attrs}>${options}</select>`;
  } else if (f.type === 'textarea') {
    control = `<textarea ${attrs} rows="4" spellcheck="true"${placeholder}></textarea>`;
  } else {
    const type = f.type === 'password' ? 'text' : f.type;
    control = `<input ${attrs} type="${type}" spellcheck="false"${placeholder}>`;
  }
  return (
    `<label class="qr-field${f.wide ? ' qr-field--wide' : ''}" data-field="${f.id}">` +
    `<span>${label}${f.required ? ' <span class="qr-field__req" aria-hidden="true">*</span>' : ''}</span>${control}` +
    `<span class="qr-field__error" id="${id}-error"></span></label>`
  );
}

function controlOf(f: Field): HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null {
  return els.form.querySelector(`[name="${f.id}"]`);
}

function buildForm(): void {
  const mode = current();
  els.form.innerHTML = mode.fields.map(fieldHtml).join('');
  for (const f of mode.fields) {
    const control = controlOf(f);
    if (!control) continue;
    const value = values[f.id];
    if (control instanceof HTMLInputElement && control.type === 'checkbox') control.checked = value === true;
    else if (typeof value === 'string') control.value = value;
    else if (f.type === 'select') control.value = f.initial ?? f.options?.[0] ?? '';
    // Store select defaults so builders see them.
    if (f.type === 'select') values[f.id] = control.value;
  }
  const active = mode.payment ? 'payment' : mode.id;
  for (const b of els.modes.querySelectorAll<HTMLButtonElement>('[data-mode]')) {
    b.setAttribute('aria-pressed', String(b.dataset.mode === active));
  }
  for (const b of els.payments.querySelectorAll<HTMLButtonElement>('[data-mode]')) {
    b.setAttribute('aria-pressed', String(b.dataset.mode === mode.id));
  }
  els.payments.hidden = !mode.payment;
  els.hint.textContent = s.modeHints[mode.id];
  els.paymentNote.hidden = !['czPayment', 'euPayment'].includes(mode.id);
  updateVisibility();
}

function updateVisibility(): void {
  for (const f of current().fields) {
    const wrapper = els.form.querySelector<HTMLElement>(`[data-field="${f.id}"]`);
    if (wrapper) wrapper.hidden = Boolean(f.when && !f.when(values));
  }
}

els.form.addEventListener('submit', (e) => e.preventDefault());
els.form.addEventListener('input', (e) => {
  const control = e.target as HTMLInputElement;
  if (!control.name) return;
  values[control.name] = control.type === 'checkbox' ? control.checked : control.value;
  saveValues();
  updateVisibility();
  queueRender();
});

/* ---------- Style options ---------- */

els.ecc.innerHTML = (Object.keys(s.eccLevels) as EccLevel[])
  .map((l) => `<option value="${l}">${s.eccLevels[l]}</option>`)
  .join('');
els.ecc.value = settings.ecc;
els.size.value = settings.size;
els.fg.value = settings.fg;
els.bg.value = settings.bg;

for (const control of [els.ecc, els.size, els.fg, els.bg]) {
  control.addEventListener('input', () => {
    // A format with a fixed level (EPC) disables the select, so its value never overwrites the user's choice.
    if (!els.ecc.disabled) settings.ecc = els.ecc.value as EccLevel;
    settings.size = els.size.value;
    settings.fg = els.fg.value;
    settings.bg = els.bg.value;
    saveSettings();
    queueRender();
  });
}

/* ---------- Rendering ---------- */

let matrix: boolean[][] | null = null;
let payload = '';

/** One path for all dark modules, merged into horizontal runs (small SVG, no hairline seams). */
function svgMarkup(m: boolean[][], fg: string, bg: string): string {
  let d = '';
  m.forEach((row, y) => {
    let x = 0;
    while (x < row.length) {
      if (!row[x]) {
        x++;
        continue;
      }
      const start = x;
      while (x < row.length && row[x]) x++;
      d += `M${start} ${y}h${x - start}v1h${start - x}z`;
    }
  });
  const n = m.length;
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${n} ${n}" shape-rendering="crispEdges">` +
    `<rect width="${n}" height="${n}" fill="${bg}"/><path d="${d}" fill="${fg}"/></svg>`
  );
}

function luminance(hex: string): number {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r! + 0.7152 * g! + 0.0722 * b!;
}

function render(): void {
  const mode = current();
  const ecc: EccLevel = mode.ecc ?? settings.ecc;
  els.ecc.value = ecc;
  els.ecc.disabled = Boolean(mode.ecc);
  els.eccFixed.hidden = !mode.ecc;

  // Clear previous field errors.
  els.form.querySelectorAll<HTMLElement>('.qr-field__error').forEach((el) => (el.textContent = ''));
  els.form.querySelectorAll('[aria-invalid]').forEach((el) => el.removeAttribute('aria-invalid'));

  matrix = null;
  payload = '';
  let error = '';
  if (isComplete(mode, values)) {
    try {
      payload = mode.build(values);
    } catch (e) {
      if (!(e instanceof FieldError)) throw e;
      const control = els.form.querySelector(`[name="${e.field}"]`);
      control?.setAttribute('aria-invalid', 'true');
      const slot = els.form.querySelector(`#qr-f-${e.field}-error`);
      if (slot) slot.textContent = s.errors[e.key];
    }
  }
  if (payload) {
    try {
      matrix = encode(payload, { ecc, border: 4 }).data;
    } catch {
      error = s.tooLong;
    }
  }

  els.preview.querySelector('svg')?.remove();
  els.empty.hidden = Boolean(matrix);
  if (matrix) els.preview.insertAdjacentHTML('beforeend', svgMarkup(matrix, settings.fg, settings.bg));
  els.preview.classList.toggle('has-code', Boolean(matrix));
  els.error.textContent = error;
  els.error.hidden = !error;

  const lf = luminance(settings.fg);
  const lb = luminance(settings.bg);
  // Scanners expect dark modules on a light background with decent contrast.
  els.warning.hidden = !matrix || (lf < lb && (lb + 0.05) / (lf + 0.05) >= 4);

  els.content.textContent = payload;
  els.png.disabled = els.svg.disabled = els.copy.disabled = !matrix;
}

let renderQueued = false;
function queueRender(): void {
  if (renderQueued) return;
  renderQueued = true;
  requestAnimationFrame(() => {
    renderQueued = false;
    render();
  });
}

/* ---------- Downloads ---------- */

/** Draws the code at exactly `size` px; module edges are rounded to whole pixels so there are no seams. */
function pngBlob(m: boolean[][], size: number): Promise<Blob> {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = settings.bg;
  ctx.fillRect(0, 0, size, size);
  ctx.fillStyle = settings.fg;
  const n = m.length;
  const edge = (i: number) => Math.round((i * size) / n);
  m.forEach((row, y) =>
    row.forEach((dark, x) => {
      if (dark) ctx.fillRect(edge(x), edge(y), edge(x + 1) - edge(x), edge(y + 1) - edge(y));
    }),
  );
  return new Promise((resolve, reject) =>
    canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error('toBlob failed'))), 'image/png'),
  );
}

function download(blob: Blob, name: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  document.body.append(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

const fileName = (ext: string) => `qr-${settings.mode}.${ext}`;

els.png.addEventListener('click', async () => {
  if (matrix) download(await pngBlob(matrix, Number(settings.size)), fileName('png'));
});

els.svg.addEventListener('click', () => {
  if (matrix) download(new Blob([svgMarkup(matrix, settings.fg, settings.bg)], { type: 'image/svg+xml' }), fileName('svg'));
});

els.copy.addEventListener('click', async () => {
  if (!matrix) return;
  try {
    // Passing the promise keeps Safari's user-gesture requirement satisfied.
    await navigator.clipboard.write([new ClipboardItem({ 'image/png': pngBlob(matrix, Number(settings.size)) })]);
    toast(s.copied);
  } catch {
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

buildForm();
render();
