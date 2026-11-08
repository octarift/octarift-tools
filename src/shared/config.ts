/** Site-wide settings shared by every tool. */
export const site = {
  name: 'Web Tools',
  /** Full Buy Me a Coffee URL, e.g. https://www.buymeacoffee.com/yourname. Empty = button hidden. */
  buyMeACoffeeUrl: '',
  ads: {
    /** Turn on once an ad provider (and a GDPR consent banner) is set up. */
    enabled: false,
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
