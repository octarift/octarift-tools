import { readJSON, writeJSON } from '@shared/storage';
import { DEFAULT_INTERVAL, DEFAULT_POMODORO, type IntervalConfig, type PomodoroConfig } from './phases';
import { isThemeId, type ThemeId } from './themes';

export type Mode = 'timer' | 'date' | 'stopwatch' | 'pomodoro' | 'interval';
export const MODES: Mode[] = ['timer', 'date', 'stopwatch', 'pomodoro', 'interval'];
const isMode = (v: unknown): v is Mode => MODES.includes(v as Mode);
/** Modes that can be paused (a countdown to a date cannot). */
export const canPause = (m: Mode) => m !== 'date';

export type Status = 'idle' | 'running' | 'paused' | 'finished';

/** Texts the user can replace; an empty or missing one falls back to the built-in text in strings.ts. */
export const LABEL_KEYS = ['work', 'shortBreak', 'longBreak', 'prepare', 'exercise', 'rest', 'done', 'workoutDone'] as const;
export type LabelKey = (typeof LABEL_KEYS)[number];
export type Labels = Partial<Record<LabelKey, string>>;
export const MAX_LABEL_LENGTH = 40;

/** Which custom texts each mode uses (in the order shown in settings). */
export const MODE_LABELS: Record<Mode, LabelKey[]> = {
  timer: ['done'],
  date: ['done'],
  stopwatch: [],
  pomodoro: ['work', 'shortBreak', 'longBreak'],
  interval: ['prepare', 'exercise', 'rest', 'workoutDone'],
};

export interface CountdownState {
  mode: Mode;
  title: string;
  theme: ThemeId;
  /** Date mode: the target moment (epoch ms). */
  targetDate: number | null;
  /** Timer mode: configured length in ms. */
  durationMs: number;
  status: Status;
  /** When the running countdown (or current Pomodoro/interval phase) reaches zero. Time is always derived from this. */
  endsAt: number | null;
  /** Timer, Pomodoro and interval modes while paused: the time that was left (of the current phase). */
  remainingMs: number | null;
  /** Stopwatch while running: the moment it would have started without pauses (elapsed = now - startedAt). */
  startedAt: number | null;
  /** Stopwatch while paused or stopped: the elapsed time. */
  elapsedMs: number;
  /** Stopwatch: total elapsed time at each lap, oldest first. */
  laps: number[];
  pomodoro: PomodoroConfig;
  interval: IntervalConfig;
  /** Pomodoro and interval modes: index of the current phase (see phases.ts). */
  phase: number;
  /** Beeps when a Pomodoro or interval phase changes (and 3-2-1 before an interval phase ends). */
  sound: boolean;
  /** Custom phase names and end messages. */
  labels: Labels;
}

const STORAGE_KEY = 'countdown:state:v1';
export const MAX_DURATION_MS = 999 * 3_600_000;
export const MAX_TITLE_LENGTH = 80;

export function defaultState(): CountdownState {
  return {
    mode: 'timer',
    title: '',
    theme: 'aurora',
    targetDate: null,
    durationMs: 5 * 60_000,
    status: 'idle',
    endsAt: null,
    remainingMs: null,
    startedAt: null,
    elapsedMs: 0,
    laps: [],
    pomodoro: { ...DEFAULT_POMODORO },
    interval: { ...DEFAULT_INTERVAL },
    phase: 0,
    sound: true,
    labels: {},
  };
}

/** Allowed ranges of the Pomodoro and interval settings (ms, except rounds). */
export const LIMITS = {
  pomodoroWork: [60_000, 4 * 3_600_000],
  pomodoroBreak: [60_000, 2 * 3_600_000],
  pomodoroRounds: [1, 12],
  intervalPrepare: [0, 10 * 60_000],
  intervalWork: [1000, 60 * 60_000],
  intervalRest: [0, 60 * 60_000],
  intervalRounds: [1, 99],
} as const satisfies Record<string, readonly [number, number]>;

export const inRange = (v: unknown, [min, max]: readonly [number, number]): v is number =>
  typeof v === 'number' && Number.isFinite(v) && v >= min && v <= max;

const finite = (v: unknown): number | null => (typeof v === 'number' && Number.isFinite(v) ? v : null);
const isStatus = (v: unknown): v is Status => v === 'idle' || v === 'running' || v === 'paused' || v === 'finished';

function sanitizePomodoro(raw: unknown): PomodoroConfig {
  const r = (raw && typeof raw === 'object' ? raw : {}) as Record<string, unknown>;
  return {
    workMs: inRange(r.workMs, LIMITS.pomodoroWork) ? r.workMs : DEFAULT_POMODORO.workMs,
    shortMs: inRange(r.shortMs, LIMITS.pomodoroBreak) ? r.shortMs : DEFAULT_POMODORO.shortMs,
    longMs: inRange(r.longMs, LIMITS.pomodoroBreak) ? r.longMs : DEFAULT_POMODORO.longMs,
    rounds: inRange(r.rounds, LIMITS.pomodoroRounds) ? Math.round(r.rounds) : DEFAULT_POMODORO.rounds,
  };
}

function sanitizeInterval(raw: unknown): IntervalConfig {
  const r = (raw && typeof raw === 'object' ? raw : {}) as Record<string, unknown>;
  return {
    prepareMs: inRange(r.prepareMs, LIMITS.intervalPrepare) ? r.prepareMs : DEFAULT_INTERVAL.prepareMs,
    workMs: inRange(r.workMs, LIMITS.intervalWork) ? r.workMs : DEFAULT_INTERVAL.workMs,
    restMs: inRange(r.restMs, LIMITS.intervalRest) ? r.restMs : DEFAULT_INTERVAL.restMs,
    rounds: inRange(r.rounds, LIMITS.intervalRounds) ? Math.round(r.rounds) : DEFAULT_INTERVAL.rounds,
  };
}

/** Accepts only well-typed fields from untrusted saved data. */
function sanitize(raw: unknown): Partial<CountdownState> {
  if (!raw || typeof raw !== 'object') return {};
  const r = raw as Record<string, unknown>;
  const out: Partial<CountdownState> = {};
  if (isMode(r.mode)) out.mode = r.mode;
  if (typeof r.title === 'string') out.title = r.title.slice(0, MAX_TITLE_LENGTH);
  if (isThemeId(r.theme)) out.theme = r.theme;
  const target = finite(r.targetDate);
  if (target !== null) out.targetDate = target;
  const duration = finite(r.durationMs);
  if (duration !== null && duration > 0 && duration <= MAX_DURATION_MS) out.durationMs = duration;
  if (isStatus(r.status)) out.status = r.status;
  out.endsAt = finite(r.endsAt);
  out.remainingMs = finite(r.remainingMs);
  out.startedAt = finite(r.startedAt);
  const elapsed = finite(r.elapsedMs);
  if (elapsed !== null && elapsed >= 0) out.elapsedMs = elapsed;
  if (Array.isArray(r.laps)) out.laps = r.laps.filter((v): v is number => finite(v) !== null).slice(-999);
  out.pomodoro = sanitizePomodoro(r.pomodoro);
  out.interval = sanitizeInterval(r.interval);
  const phase = finite(r.phase);
  if (phase !== null && phase >= 0) out.phase = Math.floor(phase);
  if (typeof r.sound === 'boolean') out.sound = r.sound;
  out.labels = sanitizeLabels(r.labels);
  return out;
}

function sanitizeLabels(raw: unknown): Labels {
  const r = (raw && typeof raw === 'object' ? raw : {}) as Record<string, unknown>;
  const out: Labels = {};
  for (const key of LABEL_KEYS) {
    const v = r[key];
    if (typeof v === 'string' && v.trim()) out[key] = v.trim().slice(0, MAX_LABEL_LENGTH);
  }
  return out;
}

/** Fixes combinations that cannot work, e.g. "running" without an end time. */
function normalize(s: CountdownState): CountdownState {
  if (s.mode === 'stopwatch') {
    if (s.status === 'running' && s.startedAt === null) return { ...s, status: 'paused' };
    if (s.status === 'finished') return { ...s, status: 'idle' };
    return s;
  }
  if (s.status === 'running' && s.endsAt === null) return { ...s, status: 'idle', phase: 0 };
  if (s.status === 'paused' && (!canPause(s.mode) || s.remainingMs === null)) {
    return { ...s, status: 'idle', remainingMs: null, phase: 0 };
  }
  return s;
}

/** Seconds from a link parameter, as ms; null when missing or out of range. */
function secondsParam(p: URLSearchParams, name: string, limits: readonly [number, number]): number | null {
  const v = p.get(name);
  if (v === null || v.trim() === '') return null;
  const ms = Number(v) * 1000;
  return inRange(ms, limits) ? ms : null;
}

/**
 * Reads a shared link: ?to=<ISO date> for date mode or ?d=<seconds> for a timer; ?mode=stopwatch,
 * ?mode=pomodoro (w, b, l = work and break lengths in seconds, n = blocks before the long break) or
 * ?mode=interval (p, w, r = prepare, work, rest in seconds, n = rounds). ?mode=timer or ?mode=date just
 * opens that mode. Plus optional t=<title> and theme=<id>.
 */
function fromSearch(search: string): Partial<CountdownState> | null {
  const p = new URLSearchParams(search);
  const to = p.get('to');
  const d = p.get('d');
  const mode = p.get('mode');
  if (!to && !d && !isMode(mode)) return null;

  const out: Partial<CountdownState> = { status: 'idle', endsAt: null, remainingMs: null, phase: 0 };
  const title = p.get('t');
  if (title !== null) out.title = title.slice(0, MAX_TITLE_LENGTH);
  const theme = p.get('theme');
  if (isThemeId(theme) && theme !== 'custom') out.theme = theme;
  // Custom texts travel as l_<key>=<text>, e.g. l_work=Uceni.
  const labels = sanitizeLabels(Object.fromEntries(LABEL_KEYS.map((k) => [k, p.get(`l_${k}`)])));
  if (Object.keys(labels).length) out.labels = labels;

  if (mode === 'pomodoro') {
    const c = { ...DEFAULT_POMODORO };
    c.workMs = secondsParam(p, 'w', LIMITS.pomodoroWork) ?? c.workMs;
    c.shortMs = secondsParam(p, 'b', LIMITS.pomodoroBreak) ?? c.shortMs;
    c.longMs = secondsParam(p, 'l', LIMITS.pomodoroBreak) ?? c.longMs;
    const n = Number(p.get('n'));
    if (inRange(n, LIMITS.pomodoroRounds)) c.rounds = Math.round(n);
    Object.assign(out, { mode, pomodoro: c });
  } else if (mode === 'interval') {
    const c = { ...DEFAULT_INTERVAL };
    c.prepareMs = secondsParam(p, 'p', LIMITS.intervalPrepare) ?? c.prepareMs;
    c.workMs = secondsParam(p, 'w', LIMITS.intervalWork) ?? c.workMs;
    c.restMs = secondsParam(p, 'r', LIMITS.intervalRest) ?? c.restMs;
    const n = Number(p.get('n'));
    if (inRange(n, LIMITS.intervalRounds)) c.rounds = Math.round(n);
    Object.assign(out, { mode, interval: c });
  } else if (mode === 'stopwatch') {
    Object.assign(out, { mode, startedAt: null, elapsedMs: 0, laps: [] });
  } else if (to) {
    const ts = Date.parse(to);
    if (!Number.isFinite(ts)) return null;
    Object.assign(out, { mode: 'date', targetDate: ts, status: 'running', endsAt: ts });
  } else if (d) {
    const secs = Number(d);
    if (!Number.isFinite(secs) || secs <= 0) return null;
    Object.assign(out, { mode: 'timer', durationMs: Math.min(secs * 1000, MAX_DURATION_MS) });
  } else {
    out.mode = mode as Mode;
  }
  return out;
}

/** Saved state, overridden by a shared link if the URL has one. */
export function loadState(search = location.search): { state: CountdownState; fromLink: boolean } {
  const saved = { ...defaultState(), ...sanitize(readJSON(STORAGE_KEY)) };
  const link = fromSearch(search);
  return { state: normalize(link ? { ...saved, ...link } : saved), fromLink: link !== null };
}

export function saveState(state: CountdownState): void {
  writeJSON(STORAGE_KEY, state);
}

export function buildShareUrl(state: CountdownState, pageUrl: string): string {
  const url = new URL(pageUrl);
  url.search = '';
  url.hash = '';
  const secs = (ms: number) => String(Math.round(ms / 1000));
  if (state.mode === 'date' && state.targetDate !== null) {
    url.searchParams.set('to', new Date(state.targetDate).toISOString());
  } else if (state.mode === 'stopwatch') {
    url.searchParams.set('mode', 'stopwatch');
  } else if (state.mode === 'pomodoro') {
    const c = state.pomodoro;
    url.searchParams.set('mode', 'pomodoro');
    url.searchParams.set('w', secs(c.workMs));
    url.searchParams.set('b', secs(c.shortMs));
    url.searchParams.set('l', secs(c.longMs));
    url.searchParams.set('n', String(c.rounds));
  } else if (state.mode === 'interval') {
    const c = state.interval;
    url.searchParams.set('mode', 'interval');
    url.searchParams.set('p', secs(c.prepareMs));
    url.searchParams.set('w', secs(c.workMs));
    url.searchParams.set('r', secs(c.restMs));
    url.searchParams.set('n', String(c.rounds));
  } else {
    url.searchParams.set('d', secs(state.durationMs));
  }
  if (state.title) url.searchParams.set('t', state.title);
  // Only the texts this mode shows.
  for (const key of MODE_LABELS[state.mode]) {
    const text = state.labels[key];
    if (text) url.searchParams.set(`l_${key}`, text);
  }
  // A custom background stays on this device, so the link cannot carry it.
  if (state.theme !== 'custom') url.searchParams.set('theme', state.theme);
  return url.toString();
}
