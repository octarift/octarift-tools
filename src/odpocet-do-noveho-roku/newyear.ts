/** New Year dates (pure, no DOM). */

export interface NewYearInfo {
  /** The year that begins at the target midnight. */
  year: number;
  /** Midnight starting 1 January of `year`, local time. */
  target: Date;
  /** New Year's Eve: 31 December before the target. */
  eve: Date;
  /** True during 1 January (the countdown is over, it is celebration time). */
  celebrating: boolean;
}

/** The New Year to count down to. All of 1 January still celebrates the one that just began. */
export function newYearInfo(now: Date): NewYearInfo {
  const thisYear = now.getFullYear();
  const celebrating = now < new Date(thisYear, 0, 2);
  const year = celebrating ? thisYear : thisYear + 1;
  return { year, target: new Date(year, 0, 1), eve: new Date(year - 1, 11, 31), celebrating };
}

/** Whole calendar days from `now` to `target` (0 on the day itself), independent of the time of day. */
export function calendarDaysUntil(now: Date, target: Date): number {
  const a = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
  const b = Date.UTC(target.getFullYear(), target.getMonth(), target.getDate());
  return Math.round((b - a) / 86_400_000);
}
