/**
 * Shared setup of the long-form text pages (privacy policy, about): chrome, title, description and the
 * page text. The text comes from the page's own strings.ts as trusted HTML (never user input).
 */

import './styles/base.css';
import './styles/text-page.css';
import { site } from './config';
import { lang, setMetaDescription } from './i18n';
import { mountSiteChrome } from './site-chrome';

export interface TextPageStrings {
  pageTitle: string;
  metaDescription: string;
  heading: string;
  /** "Platné od …" line under the heading, if the page has one. */
  effective?: string;
  body: string;
}

export function mountTextPage(page: TextPageStrings): HTMLElement {
  mountSiteChrome();
  setMetaDescription(page.metaDescription);
  document.title = `${page.pageTitle} – ${site.name}`;

  const article = document.querySelector<HTMLElement>('#text-page');
  if (!article) throw new Error('Missing element: #text-page');
  article.lang = lang;
  article.innerHTML =
    `<h1>${page.heading}</h1>` +
    (page.effective ? `<p class="text-page__meta">${page.effective}</p>` : '') +
    page.body;
  return article;
}
