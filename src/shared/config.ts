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
  },
};

/**
 * House promotion for the studio's game, shown outside fullscreen only.
 * The Play link carries a referrer, so installs coming from the tools show up
 * under utm_source=octarift-tools in Play Console's acquisition reports.
 */
export const gamePromo = {
  name: 'Rift Defense',
  pitch: 'Vesmírná tower defense od autorů těchto nástrojů. Braňte stanici před vlnami nepřátel z červích děr.',
  platform: 'Zdarma pro Android',
  pageUrl: 'https://octarift.com/rift-defense/',
  playUrl(campaign: string): string {
    const referrer = `utm_source=octarift-tools&utm_medium=promo&utm_campaign=${campaign}`;
    return `https://play.google.com/store/apps/details?id=com.octarift.riftdefense&referrer=${encodeURIComponent(referrer)}`;
  },
};

export interface ToolInfo {
  /** Folder name under src/ and the URL path (/slug/). */
  slug: string;
  name: string;
  description: string;
  icon: string;
}

/** Every tool listed on the hub page and in the header navigation. */
export const tools: ToolInfo[] = [
  {
    slug: 'countdown',
    name: 'Odpočet',
    description: 'Odpočet k datu nebo časovač s tématy, animovaným pozadím a režimem celé obrazovky.',
    icon: '⏳',
  },
];
