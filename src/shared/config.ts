import type { Lang } from './i18n';
import { countdownIcon, imageCompressorIcon, qrCodeIcon, randomIcon, textConverterIcon } from './tool-icons';

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
 * Any mention of the studio's game (promo card, footer link). Off for now so web filters such as
 * Zscaler classify the site as web tools, not games. It is a plain literal so the bundler drops the
 * game text from the build entirely while it is false; set to true to bring everything back.
 */
export const GAME_MENTIONS_ENABLED = false;

/**
 * House promotion for the studio's game, shown outside fullscreen only (and only with GAME_MENTIONS_ENABLED).
 * The Play link carries a referrer, so installs coming from the tools show up
 * under utm_source=octarift-tools in Play Console's acquisition reports.
 */
export const gamePromo = {
  /** Promo card on/off (needs GAME_MENTIONS_ENABLED too). Hidden for now; the slots stay in the pages. */
  enabled: false,
  name: 'Rift Defense',
  pitch: {
    cs: 'Vesmírná tower defense od autorů těchto nástrojů. Braňte stanici před vlnami nepřátel z červích děr.',
    en: 'A space tower defense game from the makers of these tools. Hold your station against waves of enemies pouring out of wormholes.',
    de: 'Ein Weltraum-Tower-Defense-Spiel von den Machern dieser Werkzeuge. Verteidigen Sie Ihre Station gegen Gegnerwellen aus Wurmlöchern.',
  } satisfies Localized,
  platform: { cs: 'Zdarma pro Android', en: 'Free on Android', de: 'Kostenlos für Android' } satisfies Localized,
  cta: { cs: 'Získat na Google Play', en: 'Get it on Google Play', de: 'Jetzt bei Google Play' } satisfies Localized,
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
  /** Inline SVG markup (see tool-icons.ts). */
  icon: string;
}

/** Every tool listed on the hub page and in the header navigation. */
export const tools: ToolInfo[] = [
  {
    slug: 'countdown',
    name: { cs: 'Odpočet a stopky', en: 'Countdown & stopwatch', de: 'Countdown & Stoppuhr' },
    description: {
      cs: 'Odpočet k datu, časovač, stopky s mezičasy, Pomodoro a intervalový trénink. Témata a celá obrazovka.',
      en: 'Countdown to a date, timer, stopwatch with laps, Pomodoro and interval training. Themes and fullscreen.',
      de: 'Countdown bis zu einem Datum, Timer, Stoppuhr mit Rundenzeiten, Pomodoro und Intervalltraining. Designs und Vollbild.',
    },
    icon: countdownIcon,
  },
  {
    slug: 'text-converter',
    name: { cs: 'Převod textu', en: 'Text converter', de: 'Text umwandeln' },
    description: {
      cs: 'Velká a malá písmena, camelCase, odstranění diakritiky, sloučení řádků, úprava mezer, URL, Base64 a JSON.',
      en: 'Change letter case, camelCase, remove accents, join lines, fix spacing, URL, Base64 and JSON.',
      de: 'Groß- und Kleinschreibung, camelCase, Akzente entfernen, Zeilen verbinden, Leerzeichen bereinigen, URL, Base64 und JSON.',
    },
    icon: textConverterIcon,
  },
  {
    slug: 'qr-code',
    name: { cs: 'QR kódy', en: 'QR codes', de: 'QR-Codes' },
    description: {
      cs: 'QR kód pro odkaz, Wi-Fi, kontakt, e-mail, SMS, QR Platbu nebo PAY by square. Stažení v PNG a SVG.',
      en: 'QR codes for links, Wi-Fi, contacts, e-mail, SMS and SEPA payments. Download as PNG or SVG.',
      de: 'QR-Codes für Links, WLAN, Kontakte, E-Mail, SMS und SEPA-Überweisungen (GiroCode). Download als PNG oder SVG.',
    },
    icon: qrCodeIcon,
  },
  {
    slug: 'image-compressor',
    name: { cs: 'Zmenšení obrázků', en: 'Image compressor', de: 'Bilder verkleinern' },
    description: {
      cs: 'Zmenšete a zkomprimujte fotky, i HEIC z iPhonu. Převod do JPG, WebP a PNG, odstranění GPS a EXIF.',
      en: 'Resize and compress photos, including iPhone HEIC. Convert to JPG, WebP or PNG and strip GPS and EXIF data.',
      de: 'Fotos verkleinern und komprimieren, auch HEIC vom iPhone. Umwandeln in JPG, WebP oder PNG, GPS- und EXIF-Daten entfernen.',
    },
    icon: imageCompressorIcon,
  },
  {
    slug: 'random',
    name: { cs: 'Losování', en: 'Random picker', de: 'Zufallsgenerator' },
    description: {
      cs: 'Losování jmen s kolem štěstí, rozdělení do týmů, hod kostkami a mincí, náhodné číslo a pořadí.',
      en: 'Name picker with a wheel of fortune, team generator, dice roller, coin flip, random number and order.',
      de: 'Namen auslosen mit Glücksrad, Teams einteilen, Würfeln, Münzwurf, Zufallszahl und zufällige Reihenfolge.',
    },
    icon: randomIcon,
  },
];
