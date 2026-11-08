/**
 * UI language. Czech for browsers set to Czech or Slovak, English for everyone else.
 *
 * Order of precedence: ?lang= in the URL (also remembered), then the remembered choice,
 * then the browser's languages. Each language has its own URL (?lang=cs / ?lang=en) so
 * search engines can index both; the pages list them with hreflang links.
 */
export const LANGS = ['cs', 'en'] as const;
export type Lang = (typeof LANGS)[number];

const STORAGE_KEY = 'lang';
const isLang = (v: unknown): v is Lang => v === 'cs' || v === 'en';

function detect(): Lang {
  const fromUrl = new URLSearchParams(location.search).get('lang');
  if (isLang(fromUrl)) {
    try {
      localStorage.setItem(STORAGE_KEY, fromUrl);
    } catch {
      // Storage blocked: the URL still decides for this visit.
    }
    return fromUrl;
  }
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (isLang(saved)) return saved;
  } catch {
    // Storage blocked: fall through to the browser languages.
  }
  const prefs = navigator.languages?.length ? navigator.languages : [navigator.language];
  return prefs.some((l) => /^(cs|sk)\b/i.test(l)) ? 'cs' : 'en';
}

export const lang: Lang = detect();
document.documentElement.lang = lang;

/** Picks the value for the current language, e.g. tr({ cs: 'Odpočet', en: 'Countdown' }). */
export function tr<T>(values: Record<Lang, T>): T {
  return values[lang];
}

/** Link to the current page in another language (other query parameters are kept). */
export function langUrl(target: Lang): string {
  const url = new URL(location.href);
  url.searchParams.set('lang', target);
  url.hash = '';
  return url.pathname + url.search;
}

/**
 * Fills static page text from a string table:
 * - data-i18n="key" sets the element's text,
 * - data-i18n-attr="aria-label:key; placeholder:key2" sets attributes.
 */
export function applyStrings(strings: Record<string, string>, root: ParentNode = document): void {
  root.querySelectorAll<HTMLElement>('[data-i18n]').forEach((el) => {
    const value = strings[el.dataset.i18n ?? ''];
    if (value !== undefined) el.textContent = value;
  });
  root.querySelectorAll<HTMLElement>('[data-i18n-attr]').forEach((el) => {
    for (const pair of (el.dataset.i18nAttr ?? '').split(';')) {
      const [attr, key] = pair.split(':').map((p) => p.trim());
      const value = attr && key ? strings[key] : undefined;
      if (attr && value !== undefined) el.setAttribute(attr, value);
    }
  });
}

/** Sets the page's meta description (titles are set by each page's script). */
export function setMetaDescription(text: string): void {
  document.querySelector('meta[name="description"]')?.setAttribute('content', text);
}
