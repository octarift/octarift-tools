/**
 * Pure text conversions. Each takes the whole input (line endings normalised to \n)
 * and returns the result, or throws ConversionError with a key from strings.ts.
 */

import { removeDiacritics } from '@shared/text';
import type { ConversionLabelId } from './strings';

export type ErrorKey = 'errUrl' | 'errBase64' | 'errUtf8' | 'errJson' | 'errRegex';

export class ConversionError extends Error {
  constructor(
    readonly key: ErrorKey,
    readonly detail = '',
  ) {
    super(key);
  }
}

export type GroupId = 'case' | 'cleanup' | 'lines' | 'encoding';

/* Settings of the conversions that take user input. */

export interface ReplaceOptions {
  find: string;
  replace: string;
  caseSensitive: boolean;
  regex: boolean;
}

/** Text added to the start and end of every line. */
export interface AffixOptions {
  prefix: string;
  suffix: string;
  skipEmpty: boolean;
}

/** Line numbering: first number, text between the number and the line, empty lines left unnumbered. */
export interface NumberOptions {
  start: number;
  separator: string;
  /** Pad with zeros to the widest number (01 … 12). */
  pad: boolean;
  skipEmpty: boolean;
}

/** Separator between list items, for lines ↔ list. */
export interface ListOptions {
  separator: string;
}

/** Keep / remove lines that contain the text. */
export interface FilterOptions {
  find: string;
  caseSensitive: boolean;
  regex: boolean;
}

export interface ConversionContext {
  lang: string;
  replace: ReplaceOptions;
  affix: AffixOptions;
  numbering: NumberOptions;
  list: ListOptions;
  filter: FilterOptions;
}

export interface Conversion {
  /** Also the key of its label in strings.ts, so a missing label fails the build. */
  id: ConversionLabelId;
  group: GroupId;
  run: (text: string, lang: string, ctx: ConversionContext) => string;
}

const perLine = (fn: (line: string) => string) => (text: string) => text.split('\n').map(fn).join('\n');

/* ---------- Case ---------- */

/** Splits "XMLHttpRequest", "hello_world", "Hello world-2" etc. into words. */
const WORD_RE = /\p{Lu}+(?=\p{Lu}\p{Ll})|\p{Lu}?\p{Ll}+|\p{Lu}+|\p{Lo}+|\p{N}+/gu;
const words = (line: string) => removeDiacritics(line).match(WORD_RE) ?? [];
const cap = (w: string) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();

const camel = perLine((line) =>
  words(line)
    .map((w, i) => (i === 0 ? w.toLowerCase() : cap(w)))
    .join(''),
);
const pascal = perLine((line) => words(line).map(cap).join(''));
const joined = (sep: string, upper = false) =>
  perLine((line) =>
    words(line)
      .map((w) => (upper ? w.toUpperCase() : w.toLowerCase()))
      .join(sep),
  );

function sentenceCase(text: string, lang: string): string {
  return text
    .toLocaleLowerCase(lang)
    .replace(/(^|[.!?…]\s+|\n[\s\-–•*>"„“'(]*)(\p{Ll})/gu, (_, before: string, ch: string) => before + ch.toLocaleUpperCase(lang));
}

function titleCase(text: string, lang: string): string {
  return text
    .toLocaleLowerCase(lang)
    .replace(/(^|[\s\-–—("„“/])(\p{Ll})/gu, (_, before: string, ch: string) => before + ch.toLocaleUpperCase(lang));
}

function invertCase(text: string): string {
  let out = '';
  for (const ch of text) {
    const lower = ch.toLowerCase();
    out += ch === lower ? ch.toUpperCase() : lower;
  }
  return out;
}

/* ---------- Cleanup ---------- */

function linearize(text: string): string {
  return text
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)
    .join(' ')
    .replace(/[ \t]{2,}/g, ' ');
}

/**
 * Tidies spacing: collapses repeated spaces, trims lines, removes spaces before
 * punctuation and inside brackets, adds a missing space after punctuation.
 * Numbers like 3.14, 1,5 and 10:30 are left alone.
 */
const normalizeSpaces = perLine((line) =>
  line
    .replace(/\t/g, ' ')
    .replace(/ {2,}/g, ' ')
    .trim()
    .replace(/ +([,.;:!?…)\]}])/g, '$1')
    .replace(/([([{]) +/g, '$1')
    .replace(/([,;!?])(?=[\p{L}(„"])/gu, '$1 ')
    .replace(/([.…])(?=\p{Lu})/gu, '$1 ')
    .replace(/:(?=\p{L})/gu, ': '),
);

const slug = perLine((line) =>
  removeDiacritics(line)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, ''),
);

function stripHtml(text: string): string {
  const withBreaks = text
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/(p|div|li|h[1-6]|tr|blockquote|pre)>/gi, '$&\n');
  // DOMParser builds an inert document: scripts do not run and nothing is loaded.
  const doc = new DOMParser().parseFromString(withBreaks, 'text/html');
  doc.querySelectorAll('script, style, template').forEach((el) => el.remove());
  return (doc.body.textContent ?? '')
    .split('\n')
    .map((l) => l.replace(/[ \t ]+/g, ' ').trim())
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

/* ---------- Find and replace ---------- */

const escapeRegExp = (text: string) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/** The search text as a RegExp: literal unless `regex`; a broken pattern throws ConversionError. */
function buildRegExp(find: string, caseSensitive: boolean, regex: boolean, flags: string): RegExp {
  try {
    return new RegExp(regex ? find : escapeRegExp(find), `${flags}${caseSensitive ? '' : 'i'}u`);
  } catch (e) {
    throw new ConversionError('errRegex', e instanceof Error ? e.message : '');
  }
}

/**
 * Replaces every match. Plain mode replaces the text literally (no $ patterns);
 * regex mode supports $1, $<name>, $& and \n / \t in the replacement.
 */
export function findReplace(text: string, o: ReplaceOptions): { text: string; count: number } {
  if (o.find === '') return { text, count: 0 };
  const re = buildRegExp(o.find, o.caseSensitive, o.regex, 'g');
  const count = [...text.matchAll(re)].length;
  if (!o.regex) return { text: text.replace(re, () => o.replace), count };
  const replacement = o.replace.replace(/\\n/g, '\n').replace(/\\t/g, '\t');
  return { text: text.replace(re, replacement), count };
}

/* ---------- Lines ---------- */

const lines = (text: string) => text.split('\n');

function sortLines(text: string, lang: string, desc = false): string {
  const collator = new Intl.Collator(lang, { numeric: true, sensitivity: 'base' });
  const sorted = lines(text).sort(collator.compare);
  return (desc ? sorted.reverse() : sorted).join('\n');
}

const dedupeLines = (text: string) => [...new Set(lines(text))].join('\n');
const removeEmptyLines = (text: string) =>
  lines(text)
    .filter((l) => l.trim() !== '')
    .join('\n');
const reverseLines = (text: string) => lines(text).reverse().join('\n');

/** \t typed in a field stands for a tab, so columns can be built for spreadsheets. */
const tabs = (text: string) => text.replace(/\\t/g, '\t');

function affixLines(text: string, o: AffixOptions): string {
  const prefix = tabs(o.prefix);
  const suffix = tabs(o.suffix);
  return lines(text)
    .map((l) => (o.skipEmpty && l.trim() === '' ? l : prefix + l + suffix))
    .join('\n');
}

function numberLines(text: string, o: NumberOptions): string {
  const all = lines(text);
  const start = Number.isFinite(o.start) ? Math.trunc(o.start) : 1;
  const count = o.skipEmpty ? all.filter((l) => l.trim() !== '').length : all.length;
  const last = start + Math.max(count, 1) - 1;
  // Negative starts are not padded ("-1" would become "0-1").
  const width = o.pad && start >= 0 ? String(last).length : 0;
  const separator = tabs(o.separator);
  let n = start;
  return all
    .map((l) => (o.skipEmpty && l.trim() === '' ? l : String(n++).padStart(width, '0') + separator + l))
    .join('\n');
}

const trimLines = (text: string) =>
  lines(text)
    .map((l) => l.trim())
    .join('\n');

/** Shortest line first; lines of equal length keep their order (sort is stable). */
const sortByLength = (text: string) =>
  lines(text)
    .sort((a, b) => [...a].length - [...b].length)
    .join('\n');

/** Fisher–Yates with crypto randomness, so every order is equally likely. */
function shuffleLines(text: string): string {
  const all = lines(text);
  const random = new Uint32Array(1);
  for (let i = all.length - 1; i > 0; i--) {
    crypto.getRandomValues(random);
    const j = random[0]! % (i + 1);
    [all[i], all[j]] = [all[j]!, all[i]!];
  }
  return all.join('\n');
}

/** Lines → "a, b, c" with the chosen separator; empty lines are dropped. */
function linesToList(text: string, o: ListOptions): string {
  return lines(text)
    .map((l) => l.trim())
    .filter(Boolean)
    .join(tabs(o.separator));
}

/** "a, b, c" → one item per line. Spaces around the separator are ignored, so ", " also splits "a,b". */
function listToLines(text: string, o: ListOptions): string {
  const separator = tabs(o.separator);
  const splitOn = separator.trim() || separator;
  if (splitOn === '') return text;
  return text
    .split('\n')
    .flatMap((l) => l.split(splitOn))
    .map((item) => item.trim())
    .filter(Boolean)
    .join('\n');
}

/** Lines that contain the text (or match the regular expression) are kept, or removed. */
export function filterLines(text: string, o: FilterOptions, keep: boolean): { text: string; count: number } {
  if (o.find === '') return { text, count: 0 };
  const re = buildRegExp(o.find, o.caseSensitive, o.regex, '');
  const all = lines(text);
  const matching = all.map((l) => re.test(l));
  return {
    text: all.filter((_, i) => matching[i] === keep).join('\n'),
    count: matching.filter(Boolean).length,
  };
}

/* ---------- Encoding ---------- */

function urlDecode(text: string): string {
  try {
    return decodeURIComponent(text);
  } catch {
    throw new ConversionError('errUrl');
  }
}

function base64Encode(text: string): string {
  const bytes = new TextEncoder().encode(text);
  let binary = '';
  for (let i = 0; i < bytes.length; i += 0x8000) {
    binary += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  }
  return btoa(binary);
}

function base64Decode(text: string): string {
  // Accept line-wrapped input and the URL-safe alphabet (- and _), with or without padding.
  let clean = text.replace(/\s+/g, '').replace(/-/g, '+').replace(/_/g, '/');
  clean += '='.repeat((4 - (clean.length % 4)) % 4);
  let binary: string;
  try {
    binary = atob(clean);
  } catch {
    throw new ConversionError('errBase64');
  }
  const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
  try {
    return new TextDecoder('utf-8', { fatal: true }).decode(bytes);
  } catch {
    throw new ConversionError('errUtf8');
  }
}

const HTML_ESCAPES: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
const htmlEncode = (text: string) => text.replace(/[&<>"']/g, (c) => HTML_ESCAPES[c] ?? c);

function htmlDecode(text: string): string {
  // A <textarea>'s content is parsed as text, so entities are decoded but no elements are created.
  const area = document.createElement('textarea');
  area.innerHTML = text;
  return area.value;
}

function parseJson(text: string): unknown {
  try {
    return JSON.parse(text);
  } catch (e) {
    throw new ConversionError('errJson', e instanceof Error ? e.message : '');
  }
}

/* ---------- Registry (order = order on the page) ---------- */

export const conversions: Conversion[] = [
  { id: 'lower', group: 'case', run: (t, l) => t.toLocaleLowerCase(l) },
  { id: 'upper', group: 'case', run: (t, l) => t.toLocaleUpperCase(l) },
  { id: 'sentence', group: 'case', run: sentenceCase },
  { id: 'title', group: 'case', run: titleCase },
  { id: 'invert', group: 'case', run: invertCase },
  { id: 'camel', group: 'case', run: camel },
  { id: 'pascal', group: 'case', run: pascal },
  { id: 'snake', group: 'case', run: joined('_') },
  { id: 'kebab', group: 'case', run: joined('-') },
  { id: 'constant', group: 'case', run: joined('_', true) },

  { id: 'replace', group: 'cleanup', run: (t, _l, ctx) => findReplace(t, ctx.replace).text },
  { id: 'linearize', group: 'cleanup', run: linearize },
  { id: 'spaces', group: 'cleanup', run: normalizeSpaces },
  { id: 'diacritics', group: 'cleanup', run: removeDiacritics },
  { id: 'slug', group: 'cleanup', run: slug },
  { id: 'stripHtml', group: 'cleanup', run: stripHtml },

  { id: 'sortAsc', group: 'lines', run: (t, l) => sortLines(t, l) },
  { id: 'sortDesc', group: 'lines', run: (t, l) => sortLines(t, l, true) },
  { id: 'sortLength', group: 'lines', run: sortByLength },
  { id: 'shuffle', group: 'lines', run: shuffleLines },
  { id: 'reverseLines', group: 'lines', run: reverseLines },
  { id: 'dedupe', group: 'lines', run: dedupeLines },
  { id: 'removeEmpty', group: 'lines', run: removeEmptyLines },
  { id: 'trimLines', group: 'lines', run: trimLines },
  { id: 'keepLines', group: 'lines', run: (t, _l, ctx) => filterLines(t, ctx.filter, true).text },
  { id: 'dropLines', group: 'lines', run: (t, _l, ctx) => filterLines(t, ctx.filter, false).text },
  { id: 'affix', group: 'lines', run: (t, _l, ctx) => affixLines(t, ctx.affix) },
  { id: 'numberLines', group: 'lines', run: (t, _l, ctx) => numberLines(t, ctx.numbering) },
  { id: 'toList', group: 'lines', run: (t, _l, ctx) => linesToList(t, ctx.list) },
  { id: 'fromList', group: 'lines', run: (t, _l, ctx) => listToLines(t, ctx.list) },

  { id: 'urlEncode', group: 'encoding', run: encodeURIComponent },
  { id: 'urlDecode', group: 'encoding', run: urlDecode },
  { id: 'base64Encode', group: 'encoding', run: base64Encode },
  { id: 'base64Decode', group: 'encoding', run: base64Decode },
  { id: 'htmlEncode', group: 'encoding', run: htmlEncode },
  { id: 'htmlDecode', group: 'encoding', run: htmlDecode },
  { id: 'jsonFormat', group: 'encoding', run: (t) => JSON.stringify(parseJson(t), null, 2) },
  { id: 'jsonMinify', group: 'encoding', run: (t) => JSON.stringify(parseJson(t)) },
];

export const groups: GroupId[] = ['case', 'cleanup', 'lines', 'encoding'];
