/** Pure helpers for the stopwatch, Pomodoro and interval modes (no DOM). */

import { pad } from './timer';

export type PhaseKind = 'work' | 'shortBreak' | 'longBreak' | 'prepare' | 'exercise' | 'rest';

export interface Phase {
  kind: PhaseKind;
  durationMs: number;
  /** Pomodoro: number of the work block (1, 2, 3 …, counting on across cycles). Interval: round 1…rounds. */
  round: number;
}

export interface PomodoroConfig {
  workMs: number;
  shortMs: number;
  longMs: number;
  /** Work blocks before the long break. */
  rounds: number;
}

export interface IntervalConfig {
  /** 0 = no preparation phase. */
  prepareMs: number;
  workMs: number;
  /** 0 = rounds follow each other without a rest. */
  restMs: number;
  rounds: number;
}

export const DEFAULT_POMODORO: PomodoroConfig = { workMs: 25 * 60_000, shortMs: 5 * 60_000, longMs: 15 * 60_000, rounds: 4 };
export const DEFAULT_INTERVAL: IntervalConfig = { prepareMs: 10_000, workMs: 20_000, restMs: 10_000, rounds: 8 };

/**
 * Pomodoro runs forever: work, short break, work … and a long break after every `rounds` work blocks.
 * Phase index 0 is the first work block.
 */
export function pomodoroPhase(c: PomodoroConfig, index: number): Phase {
  const work = Math.floor(index / 2); // work blocks started so far, minus one
  if (index % 2 === 0) return { kind: 'work', durationMs: c.workMs, round: work + 1 };
  const long = (work + 1) % c.rounds === 0;
  return { kind: long ? 'longBreak' : 'shortBreak', durationMs: long ? c.longMs : c.shortMs, round: work + 1 };
}

/** All phases of an interval workout: optional preparation, then exercise/rest per round (no rest after the last). */
export function intervalPhases(c: IntervalConfig): Phase[] {
  const out: Phase[] = [];
  if (c.prepareMs > 0) out.push({ kind: 'prepare', durationMs: c.prepareMs, round: 1 });
  for (let r = 1; r <= c.rounds; r++) {
    out.push({ kind: 'exercise', durationMs: c.workMs, round: r });
    if (r < c.rounds && c.restMs > 0) out.push({ kind: 'rest', durationMs: c.restMs, round: r });
  }
  return out;
}

/** Total length of an interval workout. */
export const intervalTotalMs = (c: IntervalConfig) => intervalPhases(c).reduce((n, p) => n + p.durationMs, 0);

/* ---------- Stopwatch ---------- */

export interface ElapsedParts {
  hours: number;
  minutes: number;
  seconds: number;
  /** Hundredths of a second. */
  centis: number;
}

/** Splits elapsed time, rounding down (a stopwatch never shows time that has not passed yet). */
export function splitElapsed(ms: number): ElapsedParts {
  const total = Math.max(0, Math.floor(ms / 10)); // hundredths
  return {
    hours: Math.floor(total / 360_000),
    minutes: Math.floor((total % 360_000) / 6000),
    seconds: Math.floor((total % 6000) / 100),
    centis: total % 100,
  };
}

/** "1:02:03.45" or "02:03.45", with a locale's decimal mark. */
export function formatElapsed(ms: number, decimal = '.'): string {
  const p = splitElapsed(ms);
  const tail = `${pad(p.minutes)}:${pad(p.seconds)}${decimal}${pad(p.centis)}`;
  return p.hours > 0 ? `${p.hours}:${tail}` : tail;
}
