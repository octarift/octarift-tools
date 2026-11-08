import { tr } from './i18n';

/**
 * Light / dark / system colour scheme switch.
 *
 * The choice is stored in a `scheme` cookie on the whole octarift.com domain, so the
 * studio site (octarift-web/scheme.js) and Tools share it. No cookie = follow the system.
 * An inline script in each page's <head> applies it before first paint (no flash);
 * keep that snippet in sync with readScheme().
 */
export type Scheme = 'auto' | 'light' | 'dark';

const SCHEMES: Scheme[] = ['auto', 'light', 'dark'];
const COOKIE = 'scheme';

const ICONS: Record<Scheme, string> = {
  auto: '<circle cx="12" cy="12" r="8"/><path d="M12 4a8 8 0 0 1 0 16z" fill="currentColor"/>',
  light:
    '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  dark: '<path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/>',
};

export function readScheme(): Scheme {
  const m = document.cookie.match(/(?:^|; )scheme=(light|dark)/);
  return m ? (m[1] as Scheme) : 'auto';
}

function cookieDomain(): string {
  const host = location.hostname;
  return host === 'octarift.com' || host.endsWith('.octarift.com') ? '; domain=octarift.com' : '';
}

export function setScheme(scheme: Scheme): void {
  const base = `${COOKIE}=${scheme}; path=/; SameSite=Lax${cookieDomain()}`;
  document.cookie = scheme === 'auto' ? `${base}; max-age=0` : `${base}; max-age=31536000`;
  if (scheme === 'auto') delete document.documentElement.dataset.scheme;
  else document.documentElement.dataset.scheme = scheme;
}

/** Markup for the three-way switch; wire it up with bindSchemeSwitch(). */
export function schemeSwitchHtml(): string {
  const labels: Record<Scheme, string> = {
    auto: tr({ cs: 'Podle systému', en: 'System' }),
    light: tr({ cs: 'Světlý vzhled', en: 'Light' }),
    dark: tr({ cs: 'Tmavý vzhled', en: 'Dark' }),
  };
  const current = readScheme();
  const buttons = SCHEMES.map(
    (s) =>
      `<button type="button" data-scheme-option="${s}" aria-pressed="${s === current}" title="${labels[s]}" aria-label="${labels[s]}">` +
      `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">${ICONS[s]}</svg></button>`,
  ).join('');
  return `<div class="scheme-switch" role="group" aria-label="${tr({ cs: 'Vzhled', en: 'Appearance' })}">${buttons}</div>`;
}

export function bindSchemeSwitch(root: ParentNode): void {
  const buttons = root.querySelectorAll<HTMLButtonElement>('[data-scheme-option]');
  buttons.forEach((b) =>
    b.addEventListener('click', () => {
      setScheme(b.dataset.schemeOption as Scheme);
      buttons.forEach((o) => o.setAttribute('aria-pressed', String(o === b)));
    }),
  );
}
