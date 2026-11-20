import '@shared/styles/base.css';
import './countdown.css';
import { site } from '@shared/config';
import { createFullscreen } from '@shared/fullscreen';
import { mountSiteChrome } from '@shared/site-chrome';
import { createWakeLock } from '@shared/wake-lock';
import { playAlarm, playCue, primeAudio, type Cue } from './alarm';
import {
  clearCustomBackground,
  isSupportedBackground,
  loadCustomBackground,
  MAX_BACKGROUND_BYTES,
  saveCustomBackground,
} from './background';
import { applyStrings, lang, setMetaDescription, tr } from '@shared/i18n';
import { DEFAULT_OVERLAY, overlayUrl, readOverlay, type OverlayOptions } from './overlay';
import { PencilDigits } from './pencil';
import {
  formatElapsed,
  intervalPhases,
  intervalTotalMs,
  pomodoroPhase,
  splitElapsed,
  type Phase,
  type PhaseKind,
} from './phases';
import { s } from './strings';
import {
  buildShareUrl,
  canPause,
  inRange,
  LIMITS,
  loadState,
  MAX_DURATION_MS,
  MAX_LABEL_LENGTH,
  MODE_LABELS,
  MODES,
  saveState,
  type LabelKey,
  type Mode,
} from './state';
import { FALLBACK_THEME, isThemeId, themeCategories, themes, usesPencil, type ThemeId } from './themes';
import { formatShort, msFromHMS, nextNewYear, pad, splitMs, toLocalInputValue } from './timer';

applyStrings(s);
setMetaDescription(s.metaDescription);
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
  phase: $('#phase'),
  done: $('#done'),
  modeHint: $('#mode-hint'),
  timerFields: $('#timer-fields'),
  dateFields: $('#date-fields'),
  pomodoroFields: $('#pomodoro-fields'),
  intervalFields: $('#interval-fields'),
  hours: $<HTMLInputElement>('#dur-h'),
  minutes: $<HTMLInputElement>('#dur-m'),
  seconds: $<HTMLInputElement>('#dur-s'),
  targetDate: $<HTMLInputElement>('#target-date'),
  pomoWork: $<HTMLInputElement>('#pomo-work'),
  pomoShort: $<HTMLInputElement>('#pomo-short'),
  pomoLong: $<HTMLInputElement>('#pomo-long'),
  pomoRounds: $<HTMLInputElement>('#pomo-rounds'),
  intPrepare: $<HTMLInputElement>('#int-prepare'),
  intWork: $<HTMLInputElement>('#int-work'),
  intRest: $<HTMLInputElement>('#int-rest'),
  intRounds: $<HTMLInputElement>('#int-rounds'),
  intervalTotal: $('#interval-total'),
  soundField: $('#sound-field'),
  customTexts: $('#custom-texts'),
  labelFields: $('#label-fields'),
  sound: $<HTMLInputElement>('#sound'),
  soundLabel: $('#sound-label'),
  title: $<HTMLInputElement>('#title'),
  themeList: $('#theme-list'),
  bgInput: $<HTMLInputElement>('#bg-input'),
  bgRemove: $<HTMLButtonElement>('#bg-remove'),
  start: $<HTMLButtonElement>('#start'),
  pause: $<HTMLButtonElement>('#pause'),
  lap: $<HTMLButtonElement>('#lap'),
  skip: $<HTMLButtonElement>('#skip'),
  reset: $<HTMLButtonElement>('#reset'),
  fullscreen: $<HTMLButtonElement>('#fullscreen'),
  immersive: $<HTMLButtonElement>('#immersive'),
  shortcuts: $('#shortcuts'),
  guideLink: $('#guide-link'),
  share: $<HTMLButtonElement>('#share'),
  laps: $('#laps'),
  lapsBody: $('#laps-body'),
  lapsCopy: $<HTMLButtonElement>('#laps-copy'),
  toast: $('#toast'),
  settings: $<HTMLDialogElement>('#settings'),
  settingsOpen: $<HTMLButtonElement>('#settings-open'),
  settingsClose: $<HTMLButtonElement>('#settings-close'),
  obsColor: $<HTMLInputElement>('#obs-color'),
  obsShadow: $<HTMLInputElement>('#obs-shadow'),
  obsLabels: $<HTMLInputElement>('#obs-labels'),
  obsCopy: $<HTMLButtonElement>('#obs-copy'),
  obsOpen: $<HTMLButtonElement>('#obs-open'),
};

/** OBS overlay (?overlay=1): transparent, digits only, starts by itself, saves nothing (see overlay.ts). */
const overlay = readOverlay();

const loaded = loadState();
let state = loaded.state;
if (state.targetDate === null) state.targetDate = nextNewYear();
if (overlay) {
  // Everything an overlay shows comes from its link: no title or custom texts from this browser's settings.
  const params = new URLSearchParams(location.search);
  state = {
    ...state,
    sound: overlay.sound,
    title: params.get('t') ?? '',
    labels: [...params.keys()].some((k) => k.startsWith('l_')) ? state.labels : {},
  };
  const root = document.documentElement;
  root.classList.add('overlay');
  root.style.setProperty('--overlay-color', overlay.color);
  root.dataset.overlayShadow = String(overlay.shadow);
  root.dataset.overlayLabels = String(overlay.labels);
} else if (loaded.fromLink) {
  // A shared link has been applied; drop it from the address bar so later edits are not overridden on reload.
  saveState(state);
  history.replaceState(null, '', location.pathname);
}

/** Saves the state, except in an overlay, which must never change the countdown used outside OBS. */
function persist(): void {
  if (!overlay) saveState(state);
}

let hasCustomBg = false;
let customBgUrl: string | null = null;

const wakeLock = createWakeLock();
const fullscreen = createFullscreen(els.stage, (on) => {
  document.body.classList.toggle('is-fullscreen', on);
  els.fullscreen.textContent = on ? s.exitFullscreen : s.fullscreen;
  if (on) setImmersive(false);
  if (on) startDateCountdown();
  wakeCursor();
  if (on) maybeShowIosTip();
  else iosTip.hidden = true;
});

/* ---------- Fill window: the stage covers the browser window, without real fullscreen ---------- */

let immersive = false;
const fillWakeLock = createWakeLock();

function setImmersive(on: boolean): void {
  if (immersive === on) return;
  immersive = on;
  if (on) startDateCountdown();
  void (on ? fillWakeLock.enable() : fillWakeLock.disable());
  document.body.classList.toggle('immersive', on);
  wakeCursor();
  if (on) toast(s.immersiveHint);
}

// Any click or tap on the countdown leaves the mode (buttons inside the stage keep their own job).
els.stage.addEventListener('click', (e) => {
  if (immersive && !(e.target as Element).closest('button, .ios-tip')) setImmersive(false);
});

/* ---------- iPhone: suggest Add to Home Screen ---------- */

// iPhone Safari has no Fullscreen API, so its bars stay visible. A Home Screen web app has none;
// there is no way to open that dialog from a page, so the tip explains the two taps once.
const IOS_TIP_KEY = 'countdown:ios-tip-seen';
const iosTip = $('#ios-tip');
const isIPhone = /iPhone|iPod/.test(navigator.userAgent);
const isHomeScreenApp =
  (navigator as Navigator & { standalone?: boolean }).standalone === true ||
  matchMedia('(display-mode: standalone), (display-mode: fullscreen)').matches;

function maybeShowIosTip(): void {
  if (!isIPhone || isHomeScreenApp || !fullscreen.isPseudo()) return;
  try {
    if (localStorage.getItem(IOS_TIP_KEY)) return;
    localStorage.setItem(IOS_TIP_KEY, '1');
  } catch {
    // Storage blocked: show the tip anyway, it just may come back next time.
  }
  iosTip.hidden = false;
}

$('#ios-tip-close').addEventListener('click', (e) => {
  e.stopPropagation();
  iosTip.hidden = true;
});
iosTip.addEventListener('dblclick', (e) => e.stopPropagation());
document.querySelector('meta[name="apple-mobile-web-app-title"]')?.setAttribute('content', s.pageTitle);

/* ---------- time ---------- */

const isPhased = (m: Mode) => m === 'pomodoro' || m === 'interval';

/** The Pomodoro or interval phase at `index`; null after the last interval phase (and in other modes). */
function phaseAt(index: number): Phase | null {
  if (state.mode === 'pomodoro') return pomodoroPhase(state.pomodoro, index);
  if (state.mode === 'interval') return intervalPhases(state.interval)[index] ?? null;
  return null;
}

/** Countdown modes: time left (of the current phase). */
function remainingMs(now = Date.now()): number {
  switch (state.status) {
    case 'running':
      return (state.endsAt ?? now) - now;
    case 'paused':
      return state.remainingMs ?? 0;
    case 'finished':
      return 0;
    case 'idle':
      if (state.mode === 'date') return Math.max(0, (state.targetDate ?? now) - now);
      if (isPhased(state.mode)) return phaseAt(0)?.durationMs ?? 0;
      return state.durationMs;
  }
}

/** Stopwatch: time measured so far. */
function elapsedMs(now = Date.now()): number {
  return state.status === 'running' && state.startedAt !== null ? now - state.startedAt : state.elapsedMs;
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
  persist();
  render();
}

const cueFor = (kind: PhaseKind): Cue => (kind === 'work' || kind === 'exercise' ? 'work' : 'rest');

function cue(c: Cue): void {
  if (state.sound) playCue(c);
}

function start(): void {
  primeAudio();
  const now = Date.now();

  if (state.mode === 'stopwatch') {
    state = { ...state, status: 'running', startedAt: now - state.elapsedMs };
  } else if (isPhased(state.mode)) {
    if (state.status === 'paused') {
      state = { ...state, status: 'running', endsAt: now + (state.remainingMs ?? 0), remainingMs: null };
    } else {
      const first = phaseAt(0);
      if (!first) return;
      state = { ...state, status: 'running', phase: 0, endsAt: now + first.durationMs, remainingMs: null };
    }
  } else if (state.mode === 'timer') {
    const ms = state.status === 'paused' ? (state.remainingMs ?? 0) : readDuration();
    if (ms <= 0) {
      toast(s.toastNoDuration);
      return;
    }
    if (state.status !== 'paused') state.durationMs = ms;
    state = { ...state, status: 'running', endsAt: now + ms, remainingMs: null };
  } else {
    const target = new Date(els.targetDate.value).getTime();
    if (!Number.isFinite(target) || target <= now) {
      toast(s.toastPastDate);
      return;
    }
    state = { ...state, status: 'running', targetDate: target, endsAt: target, remainingMs: null };
  }
  void wakeLock.enable();
  commit();
}

/**
 * A countdown to a date already counts without Start, but only a started one shows the end message
 * and plays the sound. Fullscreen and fill window are for watching it, so they start it.
 */
function startDateCountdown(): void {
  if (state.mode !== 'date' || state.status !== 'idle') return;
  const target = new Date(els.targetDate.value).getTime();
  if (Number.isFinite(target) && target > Date.now()) start();
}

function pause(): void {
  if (state.status !== 'running' || !canPause(state.mode)) return;
  const now = Date.now();
  if (state.mode === 'stopwatch') {
    state = { ...state, status: 'paused', elapsedMs: elapsedMs(now), startedAt: null };
  } else {
    state = { ...state, status: 'paused', remainingMs: Math.max(0, (state.endsAt ?? 0) - now), endsAt: null };
  }
  void wakeLock.disable();
  commit();
}

function reset(): void {
  // Go back to what the settings currently say, not to the values of the last start.
  const ms = readDuration();
  const target = new Date(els.targetDate.value).getTime();
  state = {
    ...state,
    status: 'idle',
    endsAt: null,
    remainingMs: null,
    durationMs: ms > 0 ? ms : state.durationMs,
    targetDate: Number.isFinite(target) ? target : state.targetDate,
    startedAt: null,
    elapsedMs: 0,
    laps: [],
    phase: 0,
  };
  void wakeLock.disable();
  commit();
}

function finish(): void {
  state = { ...state, status: 'finished', endsAt: null, remainingMs: null };
  void wakeLock.disable();
  // The sound setting covers the end sound of every counting mode (the stopwatch has no end).
  if (state.sound) {
    if (state.mode === 'interval') playCue('end');
    else playAlarm();
  }
  commit();
}

/** Stopwatch: records the current time as a lap. */
function lap(): void {
  if (state.mode !== 'stopwatch' || state.status !== 'running') return;
  state = { ...state, laps: [...state.laps, elapsedMs()] };
  commit();
}

/** Pomodoro and intervals: jumps to the next phase (and ends an interval workout after its last one). */
function skip(): void {
  if (!isPhased(state.mode) || (state.status !== 'running' && state.status !== 'paused')) return;
  const next = phaseAt(state.phase + 1);
  if (!next) {
    finish();
    return;
  }
  state =
    state.status === 'running'
      ? { ...state, phase: state.phase + 1, endsAt: Date.now() + next.durationMs }
      : { ...state, phase: state.phase + 1, remainingMs: next.durationMs };
  lastTick = 0;
  cue(cueFor(next.kind));
  commit();
}

/**
 * Moves a running Pomodoro or interval past every phase that has ended. Each next phase starts exactly
 * when the previous one ended, so a tab that slept in the background catches up without drift.
 * Returns true when something changed.
 */
function advancePhases(now = Date.now()): boolean {
  if (!isPhased(state.mode) || state.status !== 'running' || state.endsAt === null) return false;
  let changed: Phase | null = null;
  while (state.endsAt !== null && state.endsAt <= now) {
    const next = phaseAt(state.phase + 1);
    if (!next) {
      finish();
      return true;
    }
    state = { ...state, phase: state.phase + 1, endsAt: state.endsAt + next.durationMs };
    changed = next;
  }
  if (!changed) return false;
  lastTick = 0;
  cue(cueFor(changed.kind));
  commit();
  return true;
}

function setMode(mode: Mode): void {
  if (mode === state.mode) return;
  state = {
    ...state,
    mode,
    status: 'idle',
    endsAt: null,
    remainingMs: null,
    startedAt: null,
    elapsedMs: 0,
    laps: [],
    phase: 0,
  };
  void wakeLock.disable();
  commit();
}

function setTheme(theme: ThemeId): void {
  state = { ...state, theme };
  commit();
}

/* ---------- custom texts ---------- */

/** Built-in text for each customizable label. */
function defaultLabel(key: LabelKey): string {
  if (key === 'done') return s.done;
  if (key === 'workoutDone') return s.workoutDone;
  return s.phases[key];
}

/** The user's text, or the built-in one. */
const label = (key: LabelKey): string => state.labels[key] || defaultLabel(key);

const escapeAttr = (text: string) =>
  text.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c] ?? c);

let labelFieldsMode: Mode | null = null;

/** Fields for the texts of the current mode; rebuilt only when the mode changes, so typing keeps focus. */
function renderLabelFields(): void {
  const keys = MODE_LABELS[state.mode];
  els.customTexts.hidden = keys.length === 0;
  if (labelFieldsMode === state.mode) return;
  labelFieldsMode = state.mode;
  els.labelFields.innerHTML = keys
    .map(
      (key) =>
        `<label class="field"><span>${s.labelNames[key]}</span>` +
        `<input type="text" data-label="${key}" maxlength="${MAX_LABEL_LENGTH}" ` +
        `placeholder="${escapeAttr(defaultLabel(key))}" value="${escapeAttr(state.labels[key] ?? '')}"></label>`,
    )
    .join('');
}

els.labelFields.addEventListener('input', (e) => {
  const input = e.target as HTMLInputElement;
  const key = input.dataset.label as LabelKey | undefined;
  if (!key) return;
  const labels = { ...state.labels };
  const text = input.value.trim().slice(0, MAX_LABEL_LENGTH);
  if (text) labels[key] = text;
  else delete labels[key];
  state = { ...state, labels };
  commit();
});

/* ---------- Pomodoro and interval settings ---------- */

const minutesOf = (ms: number) => String(Math.round(ms / 60_000));
const secondsOf = (ms: number) => String(Math.round(ms / 1000));

function writePhaseSettings(): void {
  const p = state.pomodoro;
  els.pomoWork.value = minutesOf(p.workMs);
  els.pomoShort.value = minutesOf(p.shortMs);
  els.pomoLong.value = minutesOf(p.longMs);
  els.pomoRounds.value = String(p.rounds);
  const i = state.interval;
  els.intPrepare.value = secondsOf(i.prepareMs);
  els.intWork.value = secondsOf(i.workMs);
  els.intRest.value = secondsOf(i.restMs);
  els.intRounds.value = String(i.rounds);
  els.sound.checked = state.sound;
}

/**
 * Reads the fields; a value out of range is ignored (the previous one stays) and the field is marked.
 * A running Pomodoro or workout keeps its current phase; the new lengths apply from the next one.
 */
function readPhaseSettings(): void {
  const field = (input: HTMLInputElement, unit: number, limits: readonly [number, number], fallback: number) => {
    const v = Number(input.value) * unit;
    const ok = input.value.trim() !== '' && inRange(v, limits);
    input.toggleAttribute('aria-invalid', !ok);
    return ok ? v : fallback;
  };
  const p = state.pomodoro;
  const i = state.interval;
  state = {
    ...state,
    pomodoro: {
      workMs: field(els.pomoWork, 60_000, LIMITS.pomodoroWork, p.workMs),
      shortMs: field(els.pomoShort, 60_000, LIMITS.pomodoroBreak, p.shortMs),
      longMs: field(els.pomoLong, 60_000, LIMITS.pomodoroBreak, p.longMs),
      rounds: Math.round(field(els.pomoRounds, 1, LIMITS.pomodoroRounds, p.rounds)),
    },
    interval: {
      prepareMs: field(els.intPrepare, 1000, LIMITS.intervalPrepare, i.prepareMs),
      workMs: field(els.intWork, 1000, LIMITS.intervalWork, i.workMs),
      restMs: field(els.intRest, 1000, LIMITS.intervalRest, i.restMs),
      rounds: Math.round(field(els.intRounds, 1, LIMITS.intervalRounds, i.rounds)),
    },
  };
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
    toast(s.toastBadFile);
    return;
  }
  if (file.size > MAX_BACKGROUND_BYTES) {
    toast(s.toastTooBig);
    return;
  }
  applyCustomBackground(file);
  setTheme('custom');
  try {
    await saveCustomBackground(file);
  } catch {
    toast(s.toastBgNotSaved);
  }
}

async function removeBackground(): Promise<void> {
  applyCustomBackground(null);
  await clearCustomBackground();
  if (state.theme === 'custom') setTheme(FALLBACK_THEME);
  else render();
}

/* ---------- rendering ---------- */

/** One block of the big display: digits, the small label under them, and whether it is a decimal fraction. */
interface Unit {
  value: string;
  label: string;
  fraction?: boolean;
}

let lastDigitsKey = '';
const pencil = new PencilDigits(els.digits);
/** "," in Czech, "." in English: the separator before the stopwatch's hundredths. */
const decimalMark = (1.5).toLocaleString(lang).charAt(1);

function countdownUnits(ms: number): Unit[] {
  const p = splitMs(ms);
  const units: Unit[] = [];
  if (p.days > 0) units.push({ value: String(p.days), label: s.unitDays });
  if (p.days > 0 || p.hours > 0) units.push({ value: pad(p.hours), label: s.unitHours });
  units.push({ value: pad(p.minutes), label: s.unitMinutes }, { value: pad(p.seconds), label: s.unitSeconds });
  return units;
}

function stopwatchUnits(ms: number): Unit[] {
  const p = splitElapsed(ms);
  const units: Unit[] = [];
  if (p.hours > 0) units.push({ value: String(p.hours), label: s.unitHours });
  units.push(
    { value: pad(p.minutes), label: s.unitMinutes },
    { value: pad(p.seconds), label: s.unitSeconds },
    { value: pad(p.centis), label: s.unitCentis, fraction: true },
  );
  return units;
}

function renderDigits(all: Unit[], ariaLabel: string): void {
  // Pencil/chalk themes draw digits stroke by stroke; every other theme uses plain text.
  // They skip the stopwatch's hundredths: redrawing strokes a hundred times a second would be too much.
  const pencilMode = usesPencil(els.stage.dataset.theme);
  const units = pencilMode ? all.filter((u) => !u.fraction) : all;
  const key = `${pencilMode ? 'pencil' : 'text'}|${units.map((u) => u.value).join(':')}`;
  if (key === lastDigitsKey) return;
  lastDigitsKey = key;

  // The hundredths are drawn smaller, so they count as less than a full unit when sizing the line.
  els.digits.dataset.units = String(units.filter((u) => !u.fraction).length);
  els.digits.setAttribute('aria-label', ariaLabel);
  if (pencilMode) {
    pencil.render(units.map((u) => [u.value, u.label]));
    return;
  }
  pencil.reset();
  // Each digit sits in its own fixed-width cell (see updateDigitWidth), so fonts whose
  // digits differ in width ("1" narrower than "0") don't make the line shift every second.
  const cells = (value: string) => [...value].map((ch) => `<span class="digit">${ch}</span>`).join('');
  els.digits.innerHTML = units
    .map(
      (u, i) =>
        `${i ? `<span class="digits__sep${u.fraction ? ' digits__sep--decimal' : ''}" aria-hidden="true">${u.fraction ? decimalMark : ':'}</span>` : ''}` +
        `<span class="unit${u.fraction ? ' unit--fraction' : ''}"><span class="unit__value">${cells(u.value)}</span><span class="unit__label">${u.label}</span></span>`,
    )
    .join('');
}

/** The big display for the current mode. */
function renderDisplay(now = Date.now()): void {
  if (state.mode === 'stopwatch') {
    const ms = elapsedMs(now);
    renderDigits(stopwatchUnits(ms), formatElapsed(ms, decimalMark));
  } else {
    const ms = remainingMs(now);
    renderDigits(countdownUnits(ms), formatShort(ms));
  }
}

let measuredFont = '';
let measureCtx: CanvasRenderingContext2D | null = null;

/**
 * Sets --digit-w to the widest digit of the current theme's font (in em), so every digit
 * cell is as wide as the widest digit. Re-measures only when the font actually changes.
 */
function updateDigitWidth(): void {
  const cs = getComputedStyle(els.digits);
  const pencilMode = usesPencil(els.stage.dataset.theme);
  const font = `${cs.fontStyle} ${cs.fontWeight} 100px ${cs.fontFamily}`;
  if (`${pencilMode}|${font}` === measuredFont) return;
  measureCtx ??= document.createElement('canvas').getContext('2d');
  if (!measureCtx) return;
  measuredFont = `${pencilMode}|${font}`;
  measureCtx.font = font;
  let widest = 0;
  for (let d = 0; d <= 9; d++) widest = Math.max(widest, measureCtx.measureText(String(d)).width);
  const em = widest / 100;
  els.digits.style.setProperty('--digit-w', `${em.toFixed(3)}em`);
  // Fonts with unusually wide digits shrink so the line still fits the stage. The sizes in
  // countdown.css assume ~0.6em digits. Pencil themes draw their own fixed-size glyphs.
  els.digits.style.setProperty('--fit', pencilMode ? '1' : Math.max(1, em / 0.6).toFixed(3));
}

// Web/system fonts may finish loading after the first measurement; measure again then.
void document.fonts?.ready.then(() => {
  measuredFont = '';
  updateDigitWidth();
});

/** Builds the swatches once, then only updates their state (keeps keyboard focus in place). */
function renderThemes(): void {
  if (!els.themeList.childElementCount) {
    els.themeList.innerHTML = themeCategories
      .map((category) => {
        const swatches = themes
          .filter((t) => t.category === category.id)
          .map(
            (t) =>
              `<button type="button" class="theme-swatch" data-theme-id="${t.id}">` +
              `<span class="theme-swatch__preview" data-theme="${t.id}"></span><span>${tr(t.name)}</span></button>`,
          )
          .join('');
        // Collapsible groups, all open when the drawer is first built.
        return (
          `<details class="theme-group" open>` +
          `<summary class="theme-group__title">${tr(category.name)}</summary>` +
          `<div class="themes">${swatches}</div></details>`
        );
      })
      .join('');
  }
  els.themeList.querySelectorAll<HTMLButtonElement>('[data-theme-id]').forEach((b) => {
    const locked = b.dataset.themeId === 'custom' && !hasCustomBg;
    b.setAttribute('aria-pressed', String(b.dataset.themeId === state.theme));
    b.disabled = locked;
    b.title = locked ? s.customLocked : '';
  });
}

/** Phase or lap line under the digits: "Práce · 2. pomodoro", "Cvičení · Kolo 3/8", "Kolo 4 · 00:12,34". */
function phaseText(): string {
  if (state.mode === 'stopwatch') {
    const n = state.laps.length;
    if (!n) return '';
    const lapMs = state.laps[n - 1]! - (state.laps[n - 2] ?? 0);
    return s.lapLatest.replace('{n}', String(n)).replace('{time}', formatElapsed(lapMs, decimalMark));
  }
  if (!isPhased(state.mode) || state.status === 'finished') return '';
  const phase = phaseAt(state.phase);
  if (!phase) return '';
  const name = label(phase.kind);
  if (state.mode === 'pomodoro') return `${name} · ${s.pomodoroNumber.replace('{n}', String(phase.round))}`;
  if (phase.kind === 'prepare') return name;
  const round = s.roundOf.replace('{n}', String(phase.round)).replace('{total}', String(state.interval.rounds));
  return `${name} · ${round}`;
}

function renderPhase(): void {
  const text = phaseText();
  els.phase.textContent = text;
  els.phase.hidden = !text;
  const kind = isPhased(state.mode) && state.status !== 'finished' ? phaseAt(state.phase)?.kind : undefined;
  // Work phases and rest phases get a slightly different look (see countdown.css).
  if (kind) els.stage.dataset.phase = cueFor(kind);
  else delete els.stage.dataset.phase;
}

function renderTitle(now = Date.now()): void {
  const name = state.title || s.modeTitles[state.mode];
  let title: string;
  if (state.status === 'running' || state.status === 'paused') {
    const time =
      state.mode === 'stopwatch' ? formatElapsed(elapsedMs(now), decimalMark).slice(0, -3) : formatShort(remainingMs(now));
    const phase = isPhased(state.mode) ? label(phaseAt(state.phase)?.kind ?? 'work') : name;
    title = `${time} · ${phase}`;
  } else if (state.status === 'finished') {
    title = `${s.finishedTitle} · ${name}`;
  } else {
    title = `${s.modeTitles[state.mode]} – ${site.name}`;
  }
  // The stopwatch redraws many times a second; only touch the tab title when the text changes.
  if (document.title !== title) document.title = title;
}

function renderLaps(): void {
  const laps = state.laps;
  els.laps.hidden = state.mode !== 'stopwatch' || laps.length === 0;
  if (els.laps.hidden) return;
  // Newest first, like most stopwatches.
  els.lapsBody.innerHTML = laps
    .map((total, i) => {
      const lapMs = total - (laps[i - 1] ?? 0);
      return `<tr><td>${i + 1}</td><td>${formatElapsed(lapMs, decimalMark)}</td><td>${formatElapsed(total, decimalMark)}</td></tr>`;
    })
    .reverse()
    .join('');
}

function render(): void {
  const running = state.status === 'running';
  const phased = isPhased(state.mode);

  // The overlay uses no theme at all: plain digits on a transparent background.
  els.stage.dataset.theme = overlay ? 'overlay' : state.theme === 'custom' && !hasCustomBg ? FALLBACK_THEME : state.theme;
  updateDigitWidth();
  els.stage.classList.toggle('is-finished', state.status === 'finished');
  els.stageTitle.textContent = state.title;
  els.done.hidden = state.status !== 'finished';
  els.done.textContent = label(state.mode === 'interval' ? 'workoutDone' : 'done');
  renderDisplay();
  renderPhase();
  renderTitle();
  renderLaps();

  document.querySelectorAll<HTMLButtonElement>('[data-mode]').forEach((b) => {
    b.setAttribute('aria-pressed', String(b.dataset.mode === state.mode));
  });
  els.timerFields.hidden = state.mode !== 'timer';
  els.dateFields.hidden = state.mode !== 'date';
  els.pomodoroFields.hidden = state.mode !== 'pomodoro';
  els.intervalFields.hidden = state.mode !== 'interval';
  els.soundField.hidden = state.mode === 'stopwatch';
  els.soundLabel.textContent = phased ? s.sound : s.soundEnd;
  renderLabelFields();
  els.modeHint.textContent = s.modeHints[state.mode];
  els.modeHint.hidden = !s.modeHints[state.mode];
  els.intervalTotal.textContent = s.intervalTotal.replace('{time}', formatShort(intervalTotalMs(state.interval)));
  // Guide for the modes that have one (also brings search visitors and these users together).
  const guide =
    state.mode === 'pomodoro' ? ['pomodoro-technika', s.guidePomodoro] : state.mode === 'interval' ? ['tabata-trenink', s.guideInterval] : null;
  els.guideLink.hidden = !guide;
  if (guide) {
    const a = els.guideLink.querySelector('a')!;
    a.href = `/${guide[0]}/?lang=${lang}`;
    a.textContent = guide[1]!;
  }
  els.shortcuts.textContent =
    state.mode === 'date' ? s.shortcutsDate : state.mode === 'stopwatch' ? s.shortcutsStopwatch : s.shortcuts;

  els.start.hidden = running;
  els.start.textContent = state.status === 'paused' ? s.resume : s.start;
  els.pause.hidden = !(running && canPause(state.mode));
  els.lap.hidden = !(running && state.mode === 'stopwatch');
  els.skip.hidden = !(phased && (running || state.status === 'paused'));
  els.reset.disabled = state.status === 'idle' && !(state.mode === 'stopwatch' && state.elapsedMs > 0);
  els.bgRemove.hidden = !hasCustomBg;

  renderThemes();
  syncTerminalBlink();
  syncDateWakeLock();
  scheduleTick();
}

/**
 * The shown seconds roll over whenever (anchor - now) crosses a whole second, so the
 * anchor is the moment the countdown (or current phase) hits zero. Null when the display is not moving.
 */
function secondsAnchor(): number | null {
  if (state.status === 'running' && state.mode !== 'stopwatch') return state.endsAt;
  if (state.status === 'idle' && state.mode === 'date') return state.targetDate;
  return null;
}

let tickTimer = 0;

/* A countdown to a date runs without Start (status idle), so it keeps the screen on by itself
   until the date has passed. */
const dateWakeLock = createWakeLock();
let dateCounting = false;

function syncDateWakeLock(): void {
  const counting = state.mode === 'date' && state.status === 'idle' && (state.targetDate ?? 0) > Date.now();
  if (counting === dateCounting) return;
  dateCounting = counting;
  void (counting ? dateWakeLock.enable() : dateWakeLock.disable());
}

/** Wakes up just after the displayed value changes instead of polling, so digits flip on time. */
function scheduleTick(): void {
  window.clearTimeout(tickTimer);
  let delay: number;
  if (state.mode === 'stopwatch' && state.status === 'running') {
    // Hundredths are shown; ~25 updates a second look continuous and cost little.
    delay = usesPencil(els.stage.dataset.theme) ? 1000 - (elapsedMs() % 1000) + 5 : 40;
  } else {
    const anchor = secondsAnchor();
    const now = Date.now();
    delay = anchor !== null && anchor > now ? ((anchor - now) % 1000 || 1000) + 5 : 500;
  }
  tickTimer = window.setTimeout(tick, delay);
}

/** Interval mode: the last whole second for which the 3-2-1 click has played (0 = none yet). */
let lastTick = 0;

function tick(): void {
  if (advancePhases()) return; // re-rendered already
  if (state.status === 'running' && !isPhased(state.mode) && state.mode !== 'stopwatch' && remainingMs() <= 0) {
    finish(); // re-renders and reschedules
    return;
  }
  if (state.mode === 'interval' && state.status === 'running') {
    const left = Math.ceil(remainingMs() / 1000);
    if (left >= 1 && left <= 3 && left !== lastTick) {
      lastTick = left;
      cue('tick');
    }
  }
  renderDisplay();
  renderTitle();
  syncTerminalBlink();
  syncDateWakeLock();
  scheduleTick();
}

/**
 * Terminal theme: keeps the cursor blink (a 1 s CSS animation named wt-term-*)
 * in step with the moment the seconds change.
 */
function syncTerminalBlink(): void {
  if (els.stage.dataset.theme !== 'terminal') return;
  const now = Date.now();
  const anchor = state.mode === 'stopwatch' ? state.startedAt : secondsAnchor();
  const phase = (((now - (anchor ?? 0)) % 1000) + 1000) % 1000;
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
  if (fullscreen.isOn() || immersive) {
    idleTimer = window.setTimeout(() => els.stage.classList.add('is-idle'), 2500);
  }
}

async function share(): Promise<void> {
  if (state.mode === 'date') {
    const target = new Date(els.targetDate.value).getTime();
    if (Number.isFinite(target)) state = { ...state, targetDate: target };
  } else if (state.mode === 'timer' && state.status === 'idle') {
    state = { ...state, durationMs: readDuration() || state.durationMs };
  }
  persist();

  const url = buildShareUrl(state, location.href);
  try {
    await navigator.clipboard.writeText(url);
    toast(state.theme === 'custom' ? s.toastCopiedNoBg : s.toastCopied);
  } catch {
    window.prompt(s.copyPrompt, url);
  }
}

/* ---------- OBS overlay link ---------- */

const OBS_KEY = 'countdown:obs:v1';

function obsOptions(): OverlayOptions {
  return {
    color: /^#[0-9a-f]{6}$/i.test(els.obsColor.value) ? els.obsColor.value.toLowerCase() : DEFAULT_OVERLAY.color,
    shadow: els.obsShadow.checked,
    labels: els.obsLabels.checked,
    // The overlay plays sounds when this countdown has them switched on.
    sound: state.sound,
  };
}

function writeObsOptions(): void {
  let saved: Partial<OverlayOptions> = {};
  try {
    saved = JSON.parse(localStorage.getItem(OBS_KEY) ?? '{}') as Partial<OverlayOptions>;
  } catch {
    // Storage blocked or damaged: defaults.
  }
  els.obsColor.value = typeof saved.color === 'string' && /^#[0-9a-f]{6}$/i.test(saved.color) ? saved.color : DEFAULT_OVERLAY.color;
  els.obsShadow.checked = saved.shadow ?? DEFAULT_OVERLAY.shadow;
  els.obsLabels.checked = saved.labels ?? DEFAULT_OVERLAY.labels;
}

for (const input of [els.obsColor, els.obsShadow, els.obsLabels]) {
  input.addEventListener('input', () => {
    const { color, shadow, labels } = obsOptions();
    try {
      localStorage.setItem(OBS_KEY, JSON.stringify({ color, shadow, labels }));
    } catch {
      // Not remembered; the link still works.
    }
  });
}

/** The link for OBS: what this countdown shows now, as an overlay. */
function obsLink(): string {
  if (state.mode === 'date') {
    const target = new Date(els.targetDate.value).getTime();
    if (Number.isFinite(target)) state = { ...state, targetDate: target };
  } else if (state.mode === 'timer' && state.status === 'idle') {
    state = { ...state, durationMs: readDuration() || state.durationMs };
  }
  persist();
  const url = new URL(overlayUrl(buildShareUrl(state, location.href), obsOptions()));
  // The labels ("min / sec") and texts follow the language the link was made in, not OBS's browser.
  url.searchParams.set('lang', lang);
  return url.toString();
}

els.obsCopy.addEventListener('click', async () => {
  const url = obsLink();
  try {
    await navigator.clipboard.writeText(url);
    toast(s.toastObsCopied);
  } catch {
    window.prompt(s.copyPrompt, url);
  }
});

els.obsOpen.addEventListener('click', () => {
  window.open(obsLink(), '_blank', 'noopener');
});

/** Laps as tab-separated text, so they paste into a spreadsheet as columns. */
async function copyLaps(): Promise<void> {
  const rows = state.laps.map((total, i) =>
    [i + 1, formatElapsed(total - (state.laps[i - 1] ?? 0), decimalMark), formatElapsed(total, decimalMark)].join('\t'),
  );
  const text = [[s.lapNumber, s.lapTime, s.lapTotal].join('\t'), ...rows].join('\n');
  try {
    await navigator.clipboard.writeText(text);
    toast(s.toastLapsCopied);
  } catch {
    window.prompt(s.copyPrompt, text);
  }
}

/* ---------- events ---------- */

document.querySelectorAll<HTMLButtonElement>('[data-mode]').forEach((b) => {
  b.addEventListener('click', () => {
    const mode = b.dataset.mode as Mode;
    if (MODES.includes(mode)) setMode(mode);
  });
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
    // Always store the new length: a running countdown follows its own endsAt and is not
    // affected, while Reset and the next Start use this value.
    const ms = readDuration();
    if (ms > 0) {
      state = { ...state, durationMs: ms };
      commit();
    }
  }),
);

[els.pomoWork, els.pomoShort, els.pomoLong, els.pomoRounds, els.intPrepare, els.intWork, els.intRest, els.intRounds].forEach(
  (input) =>
    input.addEventListener('input', () => {
      readPhaseSettings();
      commit();
    }),
);

// Presets: "25,5,15,4" = work, short break, long break (minutes), blocks; "10,20,10,8" = prepare, work, rest (s), rounds.
document.querySelectorAll<HTMLButtonElement>('[data-pomodoro]').forEach((b) => {
  b.addEventListener('click', () => {
    const [work, short, long, rounds] = b.dataset.pomodoro!.split(',').map(Number);
    state = {
      ...state,
      pomodoro: { workMs: work! * 60_000, shortMs: short! * 60_000, longMs: long! * 60_000, rounds: rounds! },
      status: 'idle',
      endsAt: null,
      remainingMs: null,
      phase: 0,
    };
    writePhaseSettings();
    void wakeLock.disable();
    commit();
  });
});
document.querySelectorAll<HTMLButtonElement>('[data-interval]').forEach((b) => {
  b.addEventListener('click', () => {
    const [prepare, work, rest, rounds] = b.dataset.interval!.split(',').map(Number);
    state = {
      ...state,
      interval: { prepareMs: prepare! * 1000, workMs: work! * 1000, restMs: rest! * 1000, rounds: rounds! },
      status: 'idle',
      endsAt: null,
      remainingMs: null,
      phase: 0,
    };
    writePhaseSettings();
    void wakeLock.disable();
    commit();
  });
});

els.sound.addEventListener('change', () => {
  state = { ...state, sound: els.sound.checked };
  primeAudio();
  commit();
});

els.targetDate.addEventListener('change', () => {
  const target = new Date(els.targetDate.value).getTime();
  // Stored even while running (the countdown follows endsAt), so Reset shows the new date.
  if (Number.isFinite(target)) {
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
els.lap.addEventListener('click', lap);
els.skip.addEventListener('click', skip);
els.reset.addEventListener('click', reset);
els.share.addEventListener('click', () => void share());
els.lapsCopy.addEventListener('click', () => void copyLaps());
document.querySelectorAll<HTMLButtonElement>('[data-action="fullscreen"]').forEach((b) => {
  b.addEventListener('click', () => void fullscreen.toggle());
});
els.stage.addEventListener('dblclick', () => void fullscreen.toggle());
els.immersive.addEventListener('click', () => setImmersive(true));
els.stage.addEventListener('pointermove', wakeCursor);

// Any first interaction unlocks sound, so a countdown opened from a link can still ring.
document.addEventListener('pointerdown', primeAudio, { once: true });

document.addEventListener('keydown', (e) => {
  if (e.target instanceof Element && e.target.closest('input, textarea, select, button, [contenteditable]')) return;
  // While the settings drawer is open, only its own keys apply (Esc closes it natively).
  if (els.settings.open) return;
  // Leave browser shortcuts (Ctrl+S, Cmd+F…) alone.
  if (e.ctrlKey || e.metaKey || e.altKey) return;
  if (e.key === ' ') {
    e.preventDefault();
    if (state.status === 'running' && canPause(state.mode)) pause();
    else if (state.status !== 'running') start();
  } else if (/^l$/i.test(e.key)) {
    lap();
  } else if (/^[ns]$/i.test(e.key) && !fullscreen.isOn()) {
    // N for Nastavení, S for Settings; both work in either language.
    setImmersive(false);
    openSettings();
  } else if (/^[ow]$/i.test(e.key) && !fullscreen.isOn()) {
    // O for Okno, W for Window.
    setImmersive(!immersive);
  } else if (e.key === 'f' || e.key === 'F') {
    void fullscreen.toggle();
  } else if (e.key === 'Escape' && fullscreen.isOn()) {
    void fullscreen.exit();
  } else if (e.key === 'Escape' && immersive) {
    setImmersive(false);
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
writePhaseSettings();
els.targetDate.value = toLocalInputValue(state.targetDate ?? nextNewYear());
els.title.value = state.title;
writeObsOptions();
// A Pomodoro or workout left running in a closed tab continues where the clock says it should be.
if (!advancePhases()) render();
// In OBS nobody can press Start: the overlay starts by itself (a countdown to a date is already running).
if (overlay && state.status !== 'running' && state.mode !== 'date') {
  if (state.status === 'finished') reset();
  start();
}
if (state.status === 'running') void wakeLock.enable();

void loadCustomBackground().then((blob) => {
  if (!blob) return;
  applyCustomBackground(blob);
  render();
});
