/** Pure time helpers, no DOM. */
export interface TimeParts {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

/**
 * Splits a remaining time into parts. Rounds up to whole seconds, so the
 * display shows 00:00 only when the time is really up.
 */
export function splitMs(ms: number): TimeParts {
  const total = Math.max(0, Math.ceil(ms / 1000));
  return {
    days: Math.floor(total / 86_400),
    hours: Math.floor((total % 86_400) / 3_600),
    minutes: Math.floor((total % 3_600) / 60),
    seconds: total % 60,
  };
}

export const pad = (n: number): string => String(n).padStart(2, '0');

/** Compact text form, e.g. "2d 03:04:05", "1:02:03" or "04:05". */
export function formatShort(ms: number): string {
  const p = splitMs(ms);
  if (p.days > 0) return `${p.days}d ${pad(p.hours)}:${pad(p.minutes)}:${pad(p.seconds)}`;
  if (p.hours > 0) return `${p.hours}:${pad(p.minutes)}:${pad(p.seconds)}`;
  return `${pad(p.minutes)}:${pad(p.seconds)}`;
}

export function msFromHMS(hours: number, minutes: number, seconds: number): number {
  return ((hours * 60 + minutes) * 60 + seconds) * 1000;
}

/** Value for <input type="datetime-local"> in the user's local time zone. */
export function toLocalInputValue(ts: number): string {
  const d = new Date(ts);
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

/** Midnight at the start of next year, a sensible default target. */
export function nextNewYear(now = new Date()): number {
  return new Date(now.getFullYear() + 1, 0, 1, 0, 0, 0).getTime();
}
