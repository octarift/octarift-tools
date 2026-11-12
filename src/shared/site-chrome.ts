import { GAME_MENTIONS_ENABLED, gamePromo, site, tools } from './config';
import { bindSchemeSwitch, schemeSwitchHtml } from './color-scheme';
import { lang, LANGS, langUrl, tr } from './i18n';

const LANG_LABELS = { cs: 'Čeština', en: 'English' } as const;

/**
 * Fills the shared header (with the language switch), footer, game promo and ad slots.
 * Pages provide empty <header data-site-header>, <footer data-site-footer>,
 * <aside data-promo="campaign"> and <aside data-ad-slot="name"> elements.
 */
export function mountSiteChrome(currentSlug?: string): void {
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
    const switcher = LANGS.map(
      (l) =>
        `<a href="${langUrl(l)}" hreflang="${l}" lang="${l}" title="${LANG_LABELS[l]}"` +
        `${l === lang ? ' aria-current="true"' : ''}>${l.toUpperCase()}</a>`,
    ).join('');
    header.innerHTML =
      `<a class="site-brand" href="/${q}"><img src="/favicon.svg" alt="" width="30" height="30">${site.name}</a>` +
      `<nav class="site-nav" aria-label="${tr({ cs: 'Nástroje', en: 'Tools' })}">${links}</nav>` +
      `<div class="site-switches">${schemeSwitchHtml()}` +
      `<nav class="lang-switch" aria-label="${tr({ cs: 'Jazyk', en: 'Language' })}">${switcher}</nav></div>`;
    bindSchemeSwitch(header);
  }

  const footer = document.querySelector<HTMLElement>('[data-site-footer]');
  if (footer) {
    footer.innerHTML =
      `<span>© ${new Date().getFullYear()} <a href="${site.studio.url}">${site.studio.name}</a>` +
      (GAME_MENTIONS_ENABLED ? ` · <a href="${gamePromo.pageUrl}">${gamePromo.name}</a>` : '') +
      // Notices required by the MIT licenses of code bundled into the scripts.
      ` · <a href="/third-party-licenses.txt">${tr({ cs: 'Licence', en: 'Licenses' })}</a>` +
      `</span>${coffeeButton()}`;
  }

  document.querySelectorAll<HTMLElement>('[data-promo]').forEach((slot) => {
    if (!GAME_MENTIONS_ENABLED || !gamePromo.enabled) {
      slot.remove();
      return;
    }
    const campaign = slot.dataset.promo || 'tools';
    slot.classList.add('promo');
    slot.setAttribute('aria-label', `${tr({ cs: 'Hra', en: 'Game' })} ${gamePromo.name}`);
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
      slot.textContent = `${tr({ cs: 'Místo pro reklamu', en: 'Ad space' })} (${slot.dataset.adSlot ?? ''})`;
    } else {
      slot.remove();
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
