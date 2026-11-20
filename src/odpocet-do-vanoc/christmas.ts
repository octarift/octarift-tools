/** Christmas dates (pure, no DOM). Czech tradition celebrates on 24 December, English on 25 December. */

export interface ChristmasInfo {
  /** Year of the Christmas we count down to (or are celebrating). */
  year: number;
  /** Midnight starting the main day: 24 Dec (Czech) or 25 Dec (English), local time. */
  target: Date;
  /** True from the main day until the end of 26 December. */
  celebrating: boolean;
  /** The four Advent Sundays, first to last. */
  advent: Date[];
}

/**
 * The Christmas to count down to. During the holidays (until 26 Dec inclusive) it is this year's,
 * from 27 December on next year's.
 */
export function christmasInfo(now: Date, mainDay: 24 | 25): ChristmasInfo {
  let year = now.getFullYear();
  if (now >= new Date(year, 11, 27)) year++;
  const target = new Date(year, 11, mainDay);
  return { year, target, celebrating: now >= target, advent: adventSundays(year) };
}

/** The fourth Advent Sunday is the last Sunday before 25 December; the others are one, two and three weeks earlier. */
export function adventSundays(year: number): Date[] {
  const christmas = new Date(year, 11, 25);
  // Days back to the previous Sunday (a Christmas on Sunday makes the 4th Advent the 18th).
  const back = christmas.getDay() === 0 ? 7 : christmas.getDay();
  const fourth = new Date(year, 11, 25 - back);
  return [21, 14, 7, 0].map((d) => new Date(year, 11, fourth.getDate() - d));
}

/** Whole calendar days from `now` to `target` (0 on the day itself), independent of the time of day. */
export function calendarDaysUntil(now: Date, target: Date): number {
  const a = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
  const b = Date.UTC(target.getFullYear(), target.getMonth(), target.getDate());
  return Math.round((b - a) / 86_400_000);
}
