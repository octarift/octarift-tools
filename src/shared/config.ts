import type { Lang } from './i18n';

/** Text in every UI language. */
export type Localized = Record<Lang, string>;

/** Site-wide settings shared by every tool. */
export const site = {
  name: 'Octarift Tools',
  /** The studio the tools belong to; linked from the footer. */
  studio: { name: 'Octarift', url: 'https://octarift.com/' },
  /** Full Buy Me a Coffee URL, e.g. https://www.buymeacoffee.com/yourname. Empty = button hidden. */
  buyMeACoffeeUrl: '',
  ads: {
    /** Turn on once an ad provider (and a GDPR consent banner) is set up. */
    enabled: false,
    /** Show the dashed "ad goes here" box in dev mode while ads are off. Hidden for now. */
    showPlaceholder: false,
  },
};

/**
 * House promotion for the studio's game, shown outside fullscreen only.
 * The Play link carries a referrer, so installs coming from the tools show up
 * under utm_source=octarift-tools in Play Console's acquisition reports.
 */
export const gamePromo = {
  /** Promo card on/off. Hidden for now; the slots stay in the pages, ready to switch back on. */
  enabled: false,
  name: 'Rift Defense',
  pitch: {
    cs: 'Vesmírná tower defense od autorů těchto nástrojů. Braňte stanici před vlnami nepřátel z červích děr.',
    en: 'A space tower defense game from the makers of these tools. Hold your station against waves of enemies pouring out of wormholes.',
  } satisfies Localized,
  platform: { cs: 'Zdarma pro Android', en: 'Free on Android' } satisfies Localized,
  cta: { cs: 'Získat na Google Play', en: 'Get it on Google Play' } satisfies Localized,
  pageUrl: 'https://octarift.com/rift-defense/',
  playUrl(campaign: string): string {
    const referrer = `utm_source=octarift-tools&utm_medium=promo&utm_campaign=${campaign}`;
    return `https://play.google.com/store/apps/details?id=com.octarift.riftdefense&referrer=${encodeURIComponent(referrer)}`;
  },
};

export interface ToolInfo {
  /** Folder name under src/ and the URL path (/slug/). */
  slug: string;
  name: Localized;
  description: Localized;
  icon: string;
}

/** Every tool listed on the hub page and in the header navigation. */
export const tools: ToolInfo[] = [
  {
    slug: 'countdown',
    name: { cs: 'Odpočet', en: 'Countdown' },
    description: {
      cs: 'Odpočet k datu nebo časovač s tématy, animovaným pozadím a režimem celé obrazovky.',
      en: 'Count down to a date or run a timer, with themes, animated backgrounds and fullscreen mode.',
    },
    icon: '⏳',
  },
  {
    slug: 'text-converter',
    name: { cs: 'Převod textu', en: 'Text converter' },
    description: {
      cs: 'Velká a malá písmena, camelCase, odstranění diakritiky, sloučení řádků, úprava mezer, URL, Base64 a JSON.',
      en: 'Change letter case, camelCase, remove accents, join lines, fix spacing, URL, Base64 and JSON.',
    },
    icon: '🔤',
  },
];
