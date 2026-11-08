import '@shared/styles/base.css';
import './countdown.css';
import { site } from '@shared/config';
import { createFullscreen } from '@shared/fullscreen';
import { mountSiteChrome } from '@shared/site-chrome';
import { createWakeLock } from '@shared/wake-lock';
import { playAlarm, primeAudio } from './alarm';
import {
  clearCustomBackground,
  isSupportedBackground,
  loadCustomBackground,
  MAX_BACKGROUND_BYTES,
  saveCustomBackground,
} from './background';
import { PencilDigits } from './pencil';
import { buildShareUrl, loadState, MAX_DURATION_MS, saveState, type Mode } from './state';
import { FALLBACK_THEME, isThemeId, themes, type ThemeId } from './themes';
import { formatShort, msFromHMS, nextNewYear, pad, splitMs, toLocalInputValue } from './timer';

mountSiteChrome('countdown');

function $<T extends HTMLElement = HTMLElement>(selector: string): T {
  const el = document.querySelector<T>(selector);
  if (!el) throw new Error(`Missing element: ${selector}`);
  return el;
}

const els = {
  root: $('#countdown'),
  stage: $('#stage'),
  video: $<HTMLVideoElement>('#stage-video'),
  stageTitle: $('#stage-title'),
  digits: $('#digits'),
  done: $('#done'),
  timerFields: $('#timer-fields'),
  dateFields: $('#date-fields'),
  hours: $<HTMLInputElement>('#dur-h'),
  minutes: $<HTMLInputElement>('#dur-m'),
  seconds: $<HTMLInputElement>('#dur-s'),
  targetDate: $<HTMLInputElement>('#target-date'),
  title: $<HTMLInputElement>('#title'),
  themeList: $('#theme-list'),
  bgInput: $<HTMLInputElement>('#bg-input'),
  bgRemove: $<HTMLButtonElement>('#bg-remove'),
  start: $<HTMLButtonElement>('#start'),
  pause: $<HTMLButtonElement>('#pause'),
  reset: $<HTMLButtonElement>('#reset'),
  fullscreen: $<HTMLButtonElement>('#fullscreen'),
  share: $<HTMLButtonElement>('#share'),
  toast: $('#toast'),
  settings: $<HTMLDialogElement>('#settings'),
  settingsOpen: $<HTMLButtonElement>('#settings-open'),
  settingsClose: $<HTMLButtonElement>('#settings-close'),
};

const loaded = loadState();
let state = loaded.state;
// A shared link has been applied; drop it from the address bar so later edits are not overridden on reload.
if (state.targetDate === null) state.targetDate = nextNewYear();
if (loaded.fromLink) {
  saveState(state);
  history.replaceState(null, '', location.pathname);
}

let hasCustomBg = false;
let customBgUrl: string | null = null;

const wakeLock = createWakeLock();
const fullscreen = createFullscreen(els.stage, (on) => {
  document.body.classList.toggle('is-fullscreen', on);
  els.fullscreen.textContent = on ? 'Ukončit celou obrazovku' : 'Celá obrazovka';
  wakeCursor();
});

/* ---------- time ---------- */

function remainingMs(now = Date.now()): number {
  switch (state.status) {
    case 'running':
      return (state.endsAt ?? now) - now;
    case 'paused':
      return state.remainingMs ?? 0;
    case 'finished':
      return 0;
    case 'idle':
      return state.mode === 'timer' ? state.durationMs : Math.max(0, (state.targetDate ?? now) - now);
  }
}

function readDuration(): number {
  const n = (input: HTMLInputElement) => Math.max(0, Math.floor(Number(input.value) || 0));
  return Math.min(msFromHMS(n(els.hours), n(els.minutes), n(els.seconds)), MAX_DURATION_MS);
}

function writeDuration(ms: number): void {
  const p = splitMs(ms);
  els.hours.value = String(p.days * 24 + p.hours);
  els.minutes.value = String(p.minutes);
  els.seconds.value = String(p.seconds);
}

/* ---------- actions ---------- */

function commit(): void {
  saveState(state);
  render();
}

function start(): void {
  primeAudio();
  const now = Date.now();

  if (state.mode === 'timer') {
    const ms = state.status === 'paused' ? (state.remainingMs ?? 0) : readDuration();
    if (ms <= 0) {
      toast('Nastavte délku odpočtu.');
      return;
    }
    if (state.status !== 'paused') state.durationMs = ms;
    state = { ...state, status: 'running', endsAt: now + ms, remainingMs: null };
  } else {
    const target = new Date(els.targetDate.value).getTime();
    if (!Number.isFinite(target) || target <= now) {
      toast('Zvolte datum a čas v budoucnosti.');
      return;
    }
    state = { ...state, status: 'running', targetDate: target, endsAt: target, remainingMs: null };
  }
  void wakeLock.enable();
  commit();
}

function pause(): void {
  if (state.status !== 'running' || state.mode !== 'timer') return;
  state = { ...state, status: 'paused', remainingMs: Math.max(0, (state.endsAt ?? 0) - Date.now()), endsAt: null };
  void wakeLock.disable();
  commit();
}

function reset(): void {
  state = { ...state, status: 'idle', endsAt: null, remainingMs: null };
  void wakeLock.disable();
  commit();
}

function finish(): void {
  state = { ...state, status: 'finished', endsAt: null, remainingMs: null };
  void wakeLock.disable();
  playAlarm();
  commit();
}

function setMode(mode: Mode): void {
  if (mode === state.mode) return;
  state = { ...state, mode, status: 'idle', endsAt: null, remainingMs: null };
  void wakeLock.disable();
  commit();
}

function setTheme(theme: ThemeId): void {
  state = { ...state, theme };
  commit();
}

/* ---------- custom background ---------- */

function applyCustomBackground(blob: Blob | null): void {
  if (customBgUrl) URL.revokeObjectURL(customBgUrl);
  customBgUrl = blob ? URL.createObjectURL(blob) : null;
  hasCustomBg = blob !== null;

  const isVideo = blob?.type.startsWith('video/') ?? false;
  if (customBgUrl && isVideo) {
    els.root.style.removeProperty('--custom-bg');
    els.video.src = customBgUrl;
    els.video.hidden = false;
    void els.video.play().catch(() => undefined);
  } else {
    els.video.removeAttribute('src');
    els.video.hidden = true;
    if (customBgUrl) els.root.style.setProperty('--custom-bg', `url("${customBgUrl}")`);
    else els.root.style.removeProperty('--custom-bg');
  }
}

async function onBackgroundChosen(): Promise<void> {
  const file = els.bgInput.files?.[0];
  els.bgInput.value = '';
  if (!file) return;
  if (!isSupportedBackground(file)) {
    toast('Podporované jsou obrázky a videa MP4 nebo WebM.');
    return;
  }
  if (file.size > MAX_BACKGROUND_BYTES) {
    toast('Soubor je příliš velký (maximum je 30 MB).');
    return;
  }
  applyCustomBackground(file);
  setTheme('custom');
  try {
    await saveCustomBackground(file);
  } catch {
    toast('Pozadí se nepodařilo uložit, po obnovení stránky zmizí.');
  }
}

async function removeBackground(): Promise<void> {
  applyCustomBackground(null);
  await clearCustomBackground();
  if (state.theme === 'custom') setTheme(FALLBACK_THEME);
  else render();
}

/* ---------- rendering ---------- */

let lastDigitsKey = '';
const pencil = new PencilDigits(els.digits);

function renderDigits(ms: number): void {
  const p = splitMs(ms);
  const units: Array<[value: string, label: string]> = [];
  if (p.days > 0) units.push([String(p.days), 'dní']);
  if (p.days > 0 || p.hours > 0) units.push([pad(p.hours), 'hod']);
  units.push([pad(p.minutes), 'min'], [pad(p.seconds), 'sek']);

  // The paper theme draws digits with a pencil; every other theme uses plain text.
  const pencilMode = els.stage.dataset.theme === 'paper';
  const key = `${pencilMode ? 'pencil' : 'text'}|${units.map((u) => u[0]).join(':')}`;
  if (key === lastDigitsKey) return;
  lastDigitsKey = key;

  els.digits.dataset.units = String(units.length);
  els.digits.setAttribute('aria-label', formatShort(ms));
  if (pencilMode) {
    pencil.render(units);
    return;
  }
  pencil.reset();
  els.digits.innerHTML = units
    .map(
      ([value, label], i) =>
        `${i ? '<span class="digits__sep" aria-hidden="true">:</span>' : ''}` +
        `<span class="unit"><span class="unit__value">${value}</span><span class="unit__label">${label}</span></span>`,
    )
    .join('');
}

/** Builds the swatches once, then only updates their state (keeps keyboard focus in place). */
function renderThemes(): void {
  if (!els.themeList.childElementCount) {
    els.themeList.innerHTML = themes
      .map(
        (t) =>
          `<button type="button" class="theme-swatch" data-theme-id="${t.id}">` +
          `<span class="theme-swatch__preview" data-theme="${t.id}"></span><span>${t.name}</span></button>`,
      )
      .join('');
  }
  els.themeList.querySelectorAll<HTMLButtonElement>('[data-theme-id]').forEach((b) => {
    const locked = b.dataset.themeId === 'custom' && !hasCustomBg;
    b.setAttribute('aria-pressed', String(b.dataset.themeId === state.theme));
    b.disabled = locked;
    b.title = locked ? 'Nejdřív nahrajte vlastní pozadí' : '';
  });
}

function renderTitle(ms: number): void {
  const label = state.title || 'Odpočet';
  document.title =
    state.status === 'running' || state.status === 'paused'
      ? `${formatShort(ms)} · ${label}`
      : state.status === 'finished'
        ? `Hotovo! · ${label}`
        : `Odpočet – ${site.name}`;
}

function render(): void {
  const ms = remainingMs();
  const running = state.status === 'running';

  els.stage.dataset.theme = state.theme === 'custom' && !hasCustomBg ? FALLBACK_THEME : state.theme;
  els.stage.classList.toggle('is-finished', state.status === 'finished');
  els.stageTitle.textContent = state.title;
  els.done.hidden = state.status !== 'finished';
  renderDigits(ms);
  renderTitle(ms);

  document.querySelectorAll<HTMLButtonElement>('[data-mode]').forEach((b) => {
    b.setAttribute('aria-pressed', String(b.dataset.mode === state.mode));
  });
  els.timerFields.hidden = state.mode !== 'timer';
  els.dateFields.hidden = state.mode !== 'date';

  els.start.hidden = running;
  els.start.textContent = state.status === 'paused' ? 'Pokračovat' : 'Start';
  els.pause.hidden = !(running && state.mode === 'timer');
  els.reset.disabled = state.status === 'idle';
  els.bgRemove.hidden = !hasCustomBg;

  renderThemes();
  syncTerminalBlink();
  scheduleTick();
}

/**
 * The shown seconds roll over whenever (anchor - now) crosses a whole second, so the
 * anchor is the moment the countdown hits zero. Null when the display is not moving.
 */
function secondsAnchor(): number | null {
  if (state.status === 'running') return state.endsAt;
  if (state.status === 'idle' && state.mode === 'date') return state.targetDate;
  return null;
}

let tickTimer = 0;

/** Wakes up just after the displayed value changes instead of polling, so digits flip on time. */
function scheduleTick(): void {
  window.clearTimeout(tickTimer);
  const anchor = secondsAnchor();
  const now = Date.now();
  const delay = anchor !== null && anchor > now ? ((anchor - now) % 1000 || 1000) + 5 : 500;
  tickTimer = window.setTimeout(tick, delay);
}

function tick(): void {
  if (state.status === 'running' && remainingMs() <= 0) {
    finish(); // re-renders and reschedules
    return;
  }
  const ms = remainingMs();
  renderDigits(ms);
  renderTitle(ms);
  syncTerminalBlink();
  scheduleTick();
}

/**
 * Terminal theme: keeps the cursor blink (a 1 s CSS animation named wt-term-*)
 * in step with the moment the seconds change.
 */
function syncTerminalBlink(): void {
  if (els.stage.dataset.theme !== 'terminal') return;
  const now = Date.now();
  const phase = (((now - (secondsAnchor() ?? 0)) % 1000) + 1000) % 1000;
  for (const anim of els.stage.getAnimations({ subtree: true })) {
    if (!(anim instanceof CSSAnimation) || !anim.animationName.startsWith('wt-term-')) continue;
    const current = (Number(anim.currentTime) || 0) % 1000;
    const drift = Math.abs(current - phase);
    // Only correct real drift; re-seeking every tick would cause visible stutter.
    if (Math.min(drift, 1000 - drift) > 30) anim.currentTime = phase;
  }
}

/* ---------- misc UI ---------- */

let toastTimer = 0;
function toast(message: string): void {
  // An open modal dialog sits in the top layer above everything else, so show the toast inside it.
  const host = els.settings.open ? els.settings : document.body;
  if (els.toast.parentElement !== host) host.append(els.toast);
  els.toast.textContent = message;
  els.toast.hidden = false;
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => {
    els.toast.hidden = true;
  }, 2800);
}

let idleTimer = 0;
/** Hides the cursor and exit button in fullscreen after a moment without movement. */
function wakeCursor(): void {
  els.stage.classList.remove('is-idle');
  window.clearTimeout(idleTimer);
  if (fullscreen.isOn()) {
    idleTimer = window.setTimeout(() => els.stage.classList.add('is-idle'), 2500);
  }
}

async function share(): Promise<void> {
  if (state.mode === 'date') {
    const target = new Date(els.targetDate.value).getTime();
    if (Number.isFinite(target)) state = { ...state, targetDate: target };
  } else if (state.status === 'idle') {
    state = { ...state, durationMs: readDuration() || state.durationMs };
  }
  saveState(state);

  const url = buildShareUrl(state, location.href);
  try {
    await navigator.clipboard.writeText(url);
    toast(state.theme === 'custom' ? 'Odkaz zkopírován (bez vlastního pozadí).' : 'Odkaz zkopírován.');
  } catch {
    window.prompt('Zkopírujte odkaz:', url);
  }
}

/* ---------- events ---------- */

document.querySelectorAll<HTMLButtonElement>('[data-mode]').forEach((b) => {
  b.addEventListener('click', () => setMode(b.dataset.mode === 'date' ? 'date' : 'timer'));
});

document.querySelectorAll<HTMLButtonElement>('[data-preset]').forEach((b) => {
  b.addEventListener('click', () => {
    writeDuration(Number(b.dataset.preset) * 1000);
    state = { ...state, durationMs: readDuration(), status: 'idle', endsAt: null, remainingMs: null };
    void wakeLock.disable();
    commit();
  });
});

[els.hours, els.minutes, els.seconds].forEach((input) =>
  input.addEventListener('input', () => {
    if (state.status !== 'idle') return; // edits apply to the next start
    const ms = readDuration();
    if (ms > 0) {
      state = { ...state, durationMs: ms };
      commit();
    }
  }),
);

els.targetDate.addEventListener('change', () => {
  const target = new Date(els.targetDate.value).getTime();
  if (Number.isFinite(target) && state.status === 'idle') {
    state = { ...state, targetDate: target };
    commit();
  }
});

els.title.addEventListener('input', () => {
  state = { ...state, title: els.title.value.slice(0, 80) };
  commit();
});

els.themeList.addEventListener('click', (e) => {
  const button = (e.target as Element).closest<HTMLButtonElement>('[data-theme-id]');
  const id = button?.dataset.themeId;
  if (button && !button.disabled && isThemeId(id)) setTheme(id);
});

els.bgInput.addEventListener('change', () => void onBackgroundChosen());
els.bgRemove.addEventListener('click', () => void removeBackground());
els.start.addEventListener('click', start);
els.pause.addEventListener('click', pause);
els.reset.addEventListener('click', reset);
els.share.addEventListener('click', () => void share());
document.querySelectorAll<HTMLButtonElement>('[data-action="fullscreen"]').forEach((b) => {
  b.addEventListener('click', () => void fullscreen.toggle());
});
els.stage.addEventListener('dblclick', () => void fullscreen.toggle());
els.stage.addEventListener('pointermove', wakeCursor);

// Any first interaction unlocks sound, so a countdown opened from a link can still ring.
document.addEventListener('pointerdown', primeAudio, { once: true });

document.addEventListener('keydown', (e) => {
  if (e.target instanceof Element && e.target.closest('input, textarea, select, button, [contenteditable]')) return;
  // While the settings drawer is open, only its own keys apply (Esc closes it natively).
  if (els.settings.open) return;
  if (e.key === ' ') {
    e.preventDefault();
    if (state.status === 'running') pause();
    else start();
  } else if ((e.key === 'n' || e.key === 'N') && !fullscreen.isOn()) {
    openSettings();
  } else if (e.key === 'f' || e.key === 'F') {
    void fullscreen.toggle();
  } else if (e.key === 'Escape' && fullscreen.isOn()) {
    void fullscreen.exit();
  }
});

document.addEventListener('visibilitychange', tick);

/* ---------- settings drawer ---------- */

function openSettings(): void {
  if (els.settings.open) return;
  els.settings.showModal();
  els.settingsOpen.setAttribute('aria-expanded', 'true');
}

els.settingsOpen.addEventListener('click', openSettings);
els.settingsClose.addEventListener('click', () => els.settings.close());
// The panel fills the dialog, so a click that lands on the dialog itself was on the backdrop.
els.settings.addEventListener('click', (e) => {
  if (e.target === els.settings) els.settings.close();
});
els.settings.addEventListener('close', () => {
  els.settingsOpen.setAttribute('aria-expanded', 'false');
  if (els.toast.parentElement !== document.body) document.body.append(els.toast);
});

/* ---------- init ---------- */

writeDuration(state.durationMs);
els.targetDate.value = toLocalInputValue(state.targetDate ?? nextNewYear());
els.title.value = state.title;
render();
if (state.status === 'running') void wakeLock.enable();

void loadCustomBackground().then((blob) => {
  if (!blob) return;
  applyCustomBackground(blob);
  render();
});
