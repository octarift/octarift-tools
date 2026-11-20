/**
 * Guides (SEO articles such as "Jak vytvořit QR Platbu"). They target Czech searches, so the Czech article is
 * written straight into the page's HTML, where search engines read it first. English visitors get the English
 * version from the page's strings.ts at runtime (trusted HTML written by us, never user input).
 */

import './styles/base.css';
import './styles/text-page.css';
import { site } from './config';
import { lang, setMetaDescription } from './i18n';
import { mountSiteChrome } from './site-chrome';

export interface GuideTranslation {
  title: string;
  description: string;
  /** The whole article (h1 included). */
  html: string;
}

export function mountGuide(en: GuideTranslation): void {
  mountSiteChrome();
  const article = document.querySelector<HTMLElement>('#guide');
  if (!article) throw new Error('Missing element: #guide');
  if (lang === 'en') {
    article.innerHTML = en.html;
    document.title = `${en.title} | ${site.name}`;
    setMetaDescription(en.description);
  }
  document.documentElement.lang = lang;
  // Links inside the article keep the visitor's language.
  for (const a of article.querySelectorAll<HTMLAnchorElement>('a[href^="/"]')) {
    const url = new URL(a.href);
    url.searchParams.set('lang', lang);
    a.href = url.pathname + url.search;
  }
}
