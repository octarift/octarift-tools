import { GAME_MENTIONS_ENABLED, gamePromo, site, tools } from './config';
import { bindSchemeSwitch, schemeSwitchHtml } from './color-scheme';
import { lang, LANGS, langUrl, tr } from './i18n';
import { enforceNumberLimits } from './number-limits';

const LANG_LABELS = { cs: 'Čeština', en: 'English', de: 'Deutsch' } as const;

/**
 * Fills the shared header (with the language switch), footer, game promo and ad slots.
 * Pages provide empty <header data-site-header>, <footer data-site-footer>,
 * <aside data-promo="campaign"> and <aside data-ad-slot="name"> elements.
 */
export function mountSiteChrome(currentSlug?: string): void {
  // Every page with number fields gets binding min/max limits.
  enforceNumberLimits();
  const header = document.querySelector<HTMLElement>('[data-site-header]');
  if (header) {
    // Keep the chosen language when moving between pages.
    const q = `?lang=${lang}`;
    const links = tools
      .map(
        (t) =>
          `<a href="/${t.slug}/${q}"${t.slug === currentSlug ? ' aria-current="page"' : ''}>${tr(t.name)}</a>`,
      )
      .join('');
    // Language menu: only the current language is visible, the rest folds out (stays short as languages are added).
    const languageLabel = tr({ cs: 'Jazyk', en: 'Language', de: 'Sprache' });
    const options = LANGS.map(
      (l) =>
        `<li><a href="${langUrl(l)}" hreflang="${l}" lang="${l}"${l === lang ? ' aria-current="true"' : ''}>` +
        `<span>${LANG_LABELS[l]}</span><span class="lang-menu__code">${l.toUpperCase()}</span></a></li>`,
    ).join('');
    const switcher =
      `<details class="lang-menu"><summary aria-label="${languageLabel}: ${LANG_LABELS[lang]}" title="${languageLabel}">` +
      `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">` +
      `<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></svg>` +
      `<span>${lang.toUpperCase()}</span>` +
      `<svg class="lang-menu__chevron" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>` +
      `</summary><ul class="lang-menu__list">${options}</ul></details>`;
    header.innerHTML =
      `<a class="site-brand" href="/${q}"><img src="/favicon.svg" alt="" width="30" height="30">${site.name}</a>` +
      `<nav class="site-nav" aria-label="${tr({ cs: 'Nástroje', en: 'Tools', de: 'Werkzeuge' })}">${links}</nav>` +
      `<div class="site-switches">${schemeSwitchHtml()}` +
      `<nav class="lang-switch" aria-label="${languageLabel}">${switcher}</nav></div>`;
    bindSchemeSwitch(header);
    bindLangMenu(header);
  }

  const footer = document.querySelector<HTMLElement>('[data-site-footer]');
  if (footer) {
    footer.innerHTML =
      `<span>© ${new Date().getFullYear()} <a href="${site.studio.url}">${site.studio.name}</a>` +
      (GAME_MENTIONS_ENABLED ? ` · <a href="${gamePromo.pageUrl}">${gamePromo.name}</a>` : '') +
      ` · <a href="/about/?lang=${lang}">${tr({ cs: 'O webu', en: 'About', de: 'Über diese Seite' })}</a>` +
      ` · <a href="/privacy/?lang=${lang}">${tr({ cs: 'Ochrana soukromí', en: 'Privacy', de: 'Datenschutz' })}</a>` +
      // Notices required by the licenses of code used in the scripts.
      ` · <a href="/third-party-licenses.txt">${tr({ cs: 'Licence', en: 'Licenses', de: 'Lizenzen' })}</a>` +
      // German is a machine-assisted translation checked only by the author: invite corrections.
      (lang === 'de'
        ? ` · <a href="mailto:octarift.studio@gmail.com?subject=${encodeURIComponent('Übersetzungsfehler')}">Übersetzungsfehler melden</a>`
        : '') +
      `</span>${coffeeButton()}`;
  }

  document.querySelectorAll<HTMLElement>('[data-promo]').forEach((slot) => {
    if (!GAME_MENTIONS_ENABLED || !gamePromo.enabled) {
      slot.remove();
      return;
    }
    const campaign = slot.dataset.promo || 'tools';
    slot.classList.add('promo');
    slot.setAttribute('aria-label', `${tr({ cs: 'Hra', en: 'Game', de: 'Spiel' })} ${gamePromo.name}`);
    slot.innerHTML =
      `<div class="promo__icon" aria-hidden="true"></div>` +
      `<div class="promo__text"><span class="promo__eyebrow">${tr(gamePromo.platform)}</span>` +
      `<strong class="promo__name">${gamePromo.name}</strong>` +
      `<span class="promo__pitch">${tr(gamePromo.pitch)}</span></div>` +
      `<a class="promo__cta" href="${gamePromo.playUrl(campaign)}" target="_blank" rel="noopener">${tr(gamePromo.cta)}</a>`;
  });

  document.querySelectorAll<HTMLElement>('[data-ad-slot]').forEach((slot) => {
    if (site.ads.enabled) {
      // TODO: insert the ad provider's markup for slot.dataset.adSlot here.
      return;
    }
    if (import.meta.env.DEV && site.ads.showPlaceholder) {
      slot.classList.add('ad-slot--placeholder');
      slot.textContent = `${tr({ cs: 'Místo pro reklamu', en: 'Ad space', de: 'Werbefläche' })} (${slot.dataset.adSlot ?? ''})`;
    } else {
      slot.remove();
    }
  });
}

/** The language menu is a <details>; this closes it on a click outside or Escape. */
function bindLangMenu(root: ParentNode): void {
  const menu = root.querySelector<HTMLDetailsElement>('.lang-menu');
  if (!menu) return;
  document.addEventListener('click', (e) => {
    if (menu.open && !menu.contains(e.target as Node)) menu.open = false;
  });
  menu.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.open) {
      menu.open = false;
      menu.querySelector('summary')?.focus();
    }
  });
}

function coffeeButton(): string {
  if (site.buyMeACoffeeUrl) {
    return `<a class="bmc-button" href="${site.buyMeACoffeeUrl}" target="_blank" rel="noopener">☕ Buy me a coffee</a>`;
  }
  if (import.meta.env.DEV) {
    return `<span class="bmc-button bmc-button--placeholder" title="Set buyMeACoffeeUrl in src/shared/config.ts">☕ Buy me a coffee</span>`;
  }
  return '';
}
