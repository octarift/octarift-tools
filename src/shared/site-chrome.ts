import { gamePromo, site, tools } from './config';

/**
 * Fills the shared header, footer, game promo and ad slots on a page.
 * Pages provide empty <header data-site-header>, <footer data-site-footer>,
 * <aside data-promo="campaign"> and <aside data-ad-slot="name"> elements.
 */
export function mountSiteChrome(currentSlug?: string): void {
  const header = document.querySelector<HTMLElement>('[data-site-header]');
  if (header) {
    const links = tools
      .map((t) => `<a href="/${t.slug}/"${t.slug === currentSlug ? ' aria-current="page"' : ''}>${t.name}</a>`)
      .join('');
    header.innerHTML = `<a class="site-brand" href="/">${site.name}</a><nav class="site-nav" aria-label="Nástroje">${links}</nav>`;
  }

  const footer = document.querySelector<HTMLElement>('[data-site-footer]');
  if (footer) {
    footer.innerHTML =
      `<span>© ${new Date().getFullYear()} <a href="${site.studio.url}">${site.studio.name}</a>` +
      ` · <a href="${gamePromo.pageUrl}">${gamePromo.name}</a></span>${coffeeButton()}`;
  }

  document.querySelectorAll<HTMLElement>('[data-promo]').forEach((slot) => {
    const campaign = slot.dataset.promo || 'tools';
    slot.classList.add('promo');
    slot.setAttribute('aria-label', `Hra ${gamePromo.name}`);
    slot.innerHTML =
      `<div class="promo__icon" aria-hidden="true"></div>` +
      `<div class="promo__text"><span class="promo__eyebrow">${gamePromo.platform}</span>` +
      `<strong class="promo__name">${gamePromo.name}</strong>` +
      `<span class="promo__pitch">${gamePromo.pitch}</span></div>` +
      `<a class="promo__cta" href="${gamePromo.playUrl(campaign)}" target="_blank" rel="noopener">Získat na Google Play</a>`;
  });

  document.querySelectorAll<HTMLElement>('[data-ad-slot]').forEach((slot) => {
    if (site.ads.enabled) {
      // TODO: insert the ad provider's markup for slot.dataset.adSlot here.
      return;
    }
    if (import.meta.env.DEV) {
      slot.classList.add('ad-slot--placeholder');
      slot.textContent = `Místo pro reklamu (${slot.dataset.adSlot ?? ''})`;
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
    return `<span class="bmc-button bmc-button--placeholder" title="Doplňte buyMeACoffeeUrl v src/shared/config.ts">☕ Buy me a coffee</span>`;
  }
  return '';
}
