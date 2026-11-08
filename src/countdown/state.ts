import { readJSON, writeJSON } from '@shared/storage';
import { isThemeId, type ThemeId } from './themes';

export type Mode = 'timer' | 'date';
export type Status = 'idle' | 'running' | 'paused' | 'finished';

export interface CountdownState {
  mode: Mode;
  title: string;
  theme: ThemeId;
  /** Date mode: the target moment (epoch ms). */
  targetDate: number | null;
  /** Timer mode: configured length in ms. */
  durationMs: number;
  status: Status;
  /** When the running countdown reaches zero (epoch ms). Time is always derived from this. */
  endsAt: number | null;
  /** Timer mode while paused: the time that was left. */
  remainingMs: number | null;
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
  };
}

const finite = (v: unknown): number | null => (typeof v === 'number' && Number.isFinite(v) ? v : null);
const isStatus = (v: unknown): v is Status => v === 'idle' || v === 'running' || v === 'paused' || v === 'finished';

/** Accepts only well-typed fields from untrusted saved data. */
function sanitize(raw: unknown): Partial<CountdownState> {
  if (!raw || typeof raw !== 'object') return {};
  const r = raw as Record<string, unknown>;
  const out: Partial<CountdownState> = {};
  if (r.mode === 'timer' || r.mode === 'date') out.mode = r.mode;
  if (typeof r.title === 'string') out.title = r.title.slice(0, MAX_TITLE_LENGTH);
  if (isThemeId(r.theme)) out.theme = r.theme;
  const target = finite(r.targetDate);
  if (target !== null) out.targetDate = target;
  const duration = finite(r.durationMs);
  if (duration !== null && duration > 0 && duration <= MAX_DURATION_MS) out.durationMs = duration;
  if (isStatus(r.status)) out.status = r.status;
  out.endsAt = finite(r.endsAt);
  out.remainingMs = finite(r.remainingMs);
  return out;
}

/** Fixes combinations that cannot work, e.g. "running" without an end time. */
function normalize(s: CountdownState): CountdownState {
  if (s.status === 'running' && s.endsAt === null) return { ...s, status: 'idle' };
  if (s.status === 'paused' && (s.mode !== 'timer' || s.remainingMs === null)) {
    return { ...s, status: 'idle', remainingMs: null };
  }
  return s;
}

/**
 * Reads a shared link: ?to=<ISO date> for date mode or ?d=<seconds> for a timer,
 * plus optional t=<title> and theme=<id>.
 */
function fromSearch(search: string): Partial<CountdownState> | null {
  const p = new URLSearchParams(search);
  const to = p.get('to');
  const d = p.get('d');
  if (!to && !d) return null;

  const out: Partial<CountdownState> = { status: 'idle', endsAt: null, remainingMs: null };
  const title = p.get('t');
  if (title !== null) out.title = title.slice(0, MAX_TITLE_LENGTH);
  const theme = p.get('theme');
  if (isThemeId(theme) && theme !== 'custom') out.theme = theme;

  if (to) {
    const ts = Date.parse(to);
    if (!Number.isFinite(ts)) return null;
    Object.assign(out, { mode: 'date', targetDate: ts, status: 'running', endsAt: ts });
  } else {
    const secs = Number(d);
    if (!Number.isFinite(secs) || secs <= 0) return null;
    Object.assign(out, { mode: 'timer', durationMs: Math.min(secs * 1000, MAX_DURATION_MS) });
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
  if (state.mode === 'date' && state.targetDate !== null) {
    url.searchParams.set('to', new Date(state.targetDate).toISOString());
  } else {
    url.searchParams.set('d', String(Math.round(state.durationMs / 1000)));
  }
  if (state.title) url.searchParams.set('t', state.title);
  // A custom background stays on this device, so the link cannot carry it.
  if (state.theme !== 'custom') url.searchParams.set('theme', state.theme);
  return url.toString();
}
