/**
 * Pure text conversions. Each takes the whole input (line endings normalised to \n)
 * and returns the result, or throws ConversionError with a key from strings.ts.
 */

import type { ConversionLabelId } from './strings';

export type ErrorKey = 'errUrl' | 'errBase64' | 'errUtf8' | 'errJson';

export class ConversionError extends Error {
  constructor(
    readonly key: ErrorKey,
    readonly detail = '',
  ) {
    super(key);
  }
}

export type GroupId = 'case' | 'cleanup' | 'lines' | 'encoding';

export interface Conversion {
  /** Also the key of its label in strings.ts, so a missing label fails the build. */
  id: ConversionLabelId;
  group: GroupId;
  run: (text: string, lang: string) => string;
}

const perLine = (fn: (line: string) => string) => (text: string) => text.split('\n').map(fn).join('\n');

/* ---------- Diacritics ---------- */

/** Letters that Unicode does not decompose into base letter + accent. */
// prettier-ignore
const SPECIAL_LETTERS: Record<string, string> = {
  ß: 'ss', ẞ: 'SS', æ: 'ae', Æ: 'AE', œ: 'oe', Œ: 'OE', ø: 'o', Ø: 'O', ł: 'l', Ł: 'L',
  đ: 'd', Đ: 'D', ð: 'd', Ð: 'D', þ: 'th', Þ: 'Th', ı: 'i', ħ: 'h', Ħ: 'H', ŧ: 't', Ŧ: 'T',
  ŀ: 'l', Ŀ: 'L', ŋ: 'n', Ŋ: 'N', ĸ: 'k', ſ: 's',
};
const SPECIAL_RE = new RegExp(`[${Object.keys(SPECIAL_LETTERS).join('')}]`, 'g');

export function removeDiacritics(text: string): string {
  return text
    .normalize('NFD')
    .replace(/\p{M}+/gu, '')
    .replace(SPECIAL_RE, (c) => SPECIAL_LETTERS[c] ?? c)
    .normalize('NFC');
}

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

  { id: 'linearize', group: 'cleanup', run: linearize },
  { id: 'spaces', group: 'cleanup', run: normalizeSpaces },
  { id: 'diacritics', group: 'cleanup', run: removeDiacritics },
  { id: 'slug', group: 'cleanup', run: slug },
  { id: 'stripHtml', group: 'cleanup', run: stripHtml },

  { id: 'sortAsc', group: 'lines', run: (t, l) => sortLines(t, l) },
  { id: 'sortDesc', group: 'lines', run: (t, l) => sortLines(t, l, true) },
  { id: 'dedupe', group: 'lines', run: dedupeLines },
  { id: 'removeEmpty', group: 'lines', run: removeEmptyLines },
  { id: 'reverseLines', group: 'lines', run: reverseLines },

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
