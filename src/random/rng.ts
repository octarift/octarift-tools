/**
 * Fair randomness for the draw tool (no DOM). Uses the browser's cryptographic generator, and
 * rejection sampling so every outcome is exactly equally likely (a plain `% n` would favour small values).
 */

const buffer = new Uint32Array(1);

/** Integer in [0, n), uniformly distributed. */
export function randomBelow(n: number): number {
  if (!Number.isInteger(n) || n < 1 || n > 2 ** 32) throw new RangeError(`randomBelow(${n})`);
  // Largest multiple of n that fits in 32 bits; values at or above it are drawn again.
  const limit = 2 ** 32 - (2 ** 32 % n);
  for (;;) {
    crypto.getRandomValues(buffer);
    if (buffer[0]! < limit) return buffer[0]! % n;
  }
}

/** Integer in [min, max], both inclusive. */
export const randomInt = (min: number, max: number) => min + randomBelow(max - min + 1);

/** Fisher–Yates shuffle into a new array. */
export function shuffle<T>(items: readonly T[]): T[] {
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = randomBelow(i + 1);
    [out[i], out[j]] = [out[j]!, out[i]!];
  }
  return out;
}

/** `count` different items, in the order drawn. */
export const pick = <T>(items: readonly T[], count: number): T[] => shuffle(items).slice(0, count);

/**
 * Splits items into `teams` groups whose sizes differ by at most one. The order inside the input does
 * not matter: items are shuffled first and then dealt like cards, so each team gets a fair mix.
 */
export function splitIntoTeams<T>(items: readonly T[], teams: number): T[][] {
  const out: T[][] = Array.from({ length: Math.max(1, teams) }, () => []);
  shuffle(items).forEach((item, i) => out[i % out.length]!.push(item));
  // Dealing puts the extra players in the first teams; shuffle the team order so it is not always team 1.
  return shuffle(out);
}

/** Number of teams for a wanted team size (the last ones may be one smaller). */
export const teamsForSize = (people: number, size: number) => Math.max(1, Math.ceil(people / Math.max(1, size)));

/** `count` dice with `sides` sides each. */
export const rollDice = (count: number, sides: number) => Array.from({ length: count }, () => randomInt(1, sides));

/**
 * `count` numbers from [min, max]. With `unique`, no number repeats (count must not exceed the range).
 * Unique draws from big ranges use a set instead of shuffling the whole range.
 */
export function randomNumbers(min: number, max: number, count: number, unique: boolean): number[] {
  if (!unique) return Array.from({ length: count }, () => randomInt(min, max));
  const range = max - min + 1;
  if (count > range) throw new RangeError('count > range');
  if (range <= 10_000) return pick(Array.from({ length: range }, (_, i) => min + i), count);
  const seen = new Set<number>();
  while (seen.size < count) seen.add(randomInt(min, max));
  return [...seen];
}

/** Names from a pasted list: one per line (or separated by commas/semicolons), trimmed, empty ones dropped. */
export function parseNames(text: string): string[] {
  const parts = /[\n\r]/.test(text) ? text.split(/\r?\n/) : text.split(/[,;]/);
  return parts.map((p) => p.trim()).filter(Boolean);
}
