/**
 * Guides (SEO articles such as "Jak vytvořit QR Platbu"). They target Czech searches, so the Czech article is
 * written straight into the page's HTML, where search engines read it first. Other languages get their version
 * from the page's strings.ts at runtime (trusted HTML written by us, never user input). A guide without a version
 * in the visitor's language (the Czech QR Platba one) shows the English text.
 */

import './styles/base.css';
import './styles/text-page.css';
import { site } from './config';
import { lang, setMetaDescription, type Lang } from './i18n';
import { mountSiteChrome } from './site-chrome';

export interface GuideTranslation {
  title: string;
  description: string;
  /** The whole article (h1 included). */
  html: string;
}

export function mountGuide(translations: { en: GuideTranslation } & Partial<Record<Lang, GuideTranslation>>): void {
  mountSiteChrome();
  const article = document.querySelector<HTMLElement>('#guide');
  if (!article) throw new Error('Missing element: #guide');
  const t = lang === 'cs' ? null : (translations[lang] ?? translations.en);
  if (t) {
    article.innerHTML = t.html;
    document.title = `${t.title} | ${site.name}`;
    setMetaDescription(t.description);
    // The article's own language (English when a translation is missing); the site chrome keeps the visitor's.
    article.lang = t === translations.en ? 'en' : lang;
  }
  document.documentElement.lang = lang;
  // Links inside the article keep the visitor's language.
  for (const a of article.querySelectorAll<HTMLAnchorElement>('a[href^="/"]')) {
    const url = new URL(a.href);
    url.searchParams.set('lang', lang);
    a.href = url.pathname + url.search;
  }
}
