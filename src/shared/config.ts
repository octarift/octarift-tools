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
    es: 'Un tower defense espacial de los creadores de estas herramientas. Defiende tu estación de las oleadas de enemigos que salen de agujeros de gusano.',
    fr: 'Un tower defense spatial par les créateurs de ces outils. Défendez votre station contre des vagues d’ennemis surgissant de trous de ver.',
    it: 'Un tower defense spaziale dagli autori di questi strumenti. Difendi la tua stazione dalle ondate di nemici che escono dai wormhole.',
    pl: 'Kosmiczny tower defense od twórców tych narzędzi. Broń stacji przed falami wrogów wylatujących z tuneli czasoprzestrzennych.',
    sk: 'Vesmírna tower defense od autorov týchto nástrojov. Bráňte stanicu pred vlnami nepriateľov z červích dier.',
  } satisfies Localized,
  platform: { cs: 'Zdarma pro Android', en: 'Free on Android', de: 'Kostenlos für Android', es: 'Gratis para Android', fr: 'Gratuit sur Android', it: 'Gratis per Android', pl: 'Za darmo na Androida', sk: 'Zadarmo pre Android' } satisfies Localized,
  cta: { cs: 'Získat na Google Play', en: 'Get it on Google Play', de: 'Jetzt bei Google Play', es: 'Disponible en Google Play', fr: 'Disponible sur Google Play', it: 'Disponibile su Google Play', pl: 'Pobierz z Google Play', sk: 'Získať na Google Play' } satisfies Localized,
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
    name: { cs: 'Odpočet a stopky', en: 'Countdown & stopwatch', de: 'Countdown & Stoppuhr', es: 'Cuenta atrás y cronómetro', fr: 'Compte à rebours et chronomètre', it: 'Conto alla rovescia e cronometro', pl: 'Odliczanie i stoper', sk: 'Odpočet a stopky' },
    description: {
      cs: 'Odpočet k datu, časovač, stopky s mezičasy, Pomodoro a intervalový trénink. Témata a celá obrazovka.',
      en: 'Countdown to a date, timer, stopwatch with laps, Pomodoro and interval training. Themes and fullscreen.',
      de: 'Countdown bis zu einem Datum, Timer, Stoppuhr mit Rundenzeiten, Pomodoro und Intervalltraining. Designs und Vollbild.',
      es: 'Cuenta atrás hasta una fecha, temporizador, cronómetro con vueltas, Pomodoro y entrenamiento por intervalos. Temas y pantalla completa.',
      fr: 'Compte à rebours jusqu’à une date, minuteur, chronomètre avec tours, Pomodoro et entraînement fractionné. Thèmes et plein écran.',
      it: 'Conto alla rovescia a una data, timer, cronometro con giri, Pomodoro e allenamento a intervalli. Temi e schermo intero.',
      pl: 'Odliczanie do daty, minutnik, stoper z międzyczasami, Pomodoro i trening interwałowy. Motywy i pełny ekran.',
      sk: 'Odpočet k dátumu, časovač, stopky s medzičasmi, Pomodoro a intervalový tréning. Témy a celá obrazovka.',
    },
    icon: countdownIcon,
  },
  {
    slug: 'text-converter',
    name: { cs: 'Převod textu', en: 'Text converter', de: 'Text umwandeln', es: 'Convertidor de texto', fr: 'Convertisseur de texte', it: 'Convertitore di testo', pl: 'Konwerter tekstu', sk: 'Prevod textu' },
    description: {
      cs: 'Velká a malá písmena, camelCase, odstranění diakritiky, sloučení řádků, úprava mezer, URL, Base64 a JSON.',
      en: 'Change letter case, camelCase, remove accents, join lines, fix spacing, URL, Base64 and JSON.',
      de: 'Groß- und Kleinschreibung, camelCase, Akzente entfernen, Zeilen verbinden, Leerzeichen bereinigen, URL, Base64 und JSON.',
      es: 'Mayúsculas y minúsculas, camelCase, quitar tildes, unir líneas, corregir espacios, URL, Base64 y JSON.',
      fr: 'Majuscules et minuscules, camelCase, supprimer les accents, joindre les lignes, corriger les espaces, URL, Base64 et JSON.',
      it: 'Maiuscole e minuscole, camelCase, rimuovere gli accenti, unire le righe, sistemare gli spazi, URL, Base64 e JSON.',
      pl: 'Wielkie i małe litery, camelCase, usuwanie polskich znaków, łączenie wierszy, poprawianie spacji, URL, Base64 i JSON.',
      sk: 'Veľké a malé písmená, camelCase, odstránenie diakritiky, zlúčenie riadkov, úprava medzier, URL, Base64 a JSON.',
    },
    icon: textConverterIcon,
  },
  {
    slug: 'qr-code',
    name: { cs: 'QR kódy', en: 'QR codes', de: 'QR-Codes', es: 'Códigos QR', fr: 'Codes QR', it: 'Codici QR', pl: 'Kody QR', sk: 'QR kódy' },
    description: {
      cs: 'QR kód pro odkaz, Wi-Fi, kontakt, e-mail, SMS, QR Platbu nebo PAY by square. Stažení v PNG a SVG.',
      en: 'QR codes for links, Wi-Fi, contacts, e-mail, SMS and SEPA payments. Download as PNG or SVG.',
      de: 'QR-Codes für Links, WLAN, Kontakte, E-Mail, SMS und SEPA-Überweisungen (GiroCode). Download als PNG oder SVG.',
      es: 'Códigos QR para enlaces, Wi-Fi, contactos, correo, SMS y transferencias SEPA. Descarga en PNG o SVG.',
      fr: 'Codes QR pour liens, Wi-Fi, contacts, e-mail, SMS et virements SEPA. Téléchargement en PNG ou SVG.',
      it: 'Codici QR per link, Wi-Fi, contatti, e-mail, SMS e bonifici SEPA. Download in PNG o SVG.',
      pl: 'Kody QR do linków, Wi-Fi, kontaktów, e-maili, SMS-ów i przelewów SEPA. Pobieranie w PNG lub SVG.',
      sk: 'QR kód pre odkaz, Wi-Fi, kontakt, e-mail, SMS, PAY by square alebo platbu SEPA. Stiahnutie v PNG a SVG.',
    },
    icon: qrCodeIcon,
  },
  {
    slug: 'image-compressor',
    name: { cs: 'Zmenšení obrázků', en: 'Image compressor', de: 'Bilder verkleinern', es: 'Comprimir imágenes', fr: 'Compresser des images', it: 'Comprimi immagini', pl: 'Zmniejszanie zdjęć', sk: 'Zmenšenie obrázkov' },
    description: {
      cs: 'Zmenšete a zkomprimujte fotky, i HEIC z iPhonu. Převod do JPG, WebP a PNG, odstranění GPS a EXIF.',
      en: 'Resize and compress photos, including iPhone HEIC. Convert to JPG, WebP or PNG and strip GPS and EXIF data.',
      de: 'Fotos verkleinern und komprimieren, auch HEIC vom iPhone. Umwandeln in JPG, WebP oder PNG, GPS- und EXIF-Daten entfernen.',
      es: 'Reduce y comprime fotos, también HEIC del iPhone. Convierte a JPG, WebP o PNG y elimina los datos GPS y EXIF.',
      fr: 'Réduisez et compressez vos photos, y compris les HEIC de l’iPhone. Conversion en JPG, WebP ou PNG, suppression des données GPS et EXIF.',
      it: 'Ridimensiona e comprimi le foto, anche HEIC dell’iPhone. Converti in JPG, WebP o PNG e rimuovi i dati GPS ed EXIF.',
      pl: 'Zmniejsz i skompresuj zdjęcia, także HEIC z iPhone’a. Konwersja do JPG, WebP i PNG, usuwanie danych GPS i EXIF.',
      sk: 'Zmenšite a skomprimujte fotky, aj HEIC z iPhonu. Prevod do JPG, WebP a PNG, odstránenie GPS a EXIF.',
    },
    icon: imageCompressorIcon,
  },
  {
    slug: 'random',
    name: { cs: 'Losování', en: 'Random picker', de: 'Zufallsgenerator', es: 'Sorteo aleatorio', fr: 'Tirage au sort', it: 'Sorteggio casuale', pl: 'Losowanie', sk: 'Losovanie' },
    description: {
      cs: 'Losování jmen s kolem štěstí, rozdělení do týmů, hod kostkami a mincí, náhodné číslo a pořadí.',
      en: 'Name picker with a wheel of fortune, team generator, dice roller, coin flip, random number and order.',
      de: 'Namen auslosen mit Glücksrad, Teams einteilen, Würfeln, Münzwurf, Zufallszahl und zufällige Reihenfolge.',
      es: 'Sorteo de nombres con ruleta, generador de equipos, dados, cara o cruz, número aleatorio y orden aleatorio.',
      fr: 'Tirage de noms avec roue de la fortune, création d’équipes, lancer de dés, pile ou face, nombre et ordre aléatoires.',
      it: 'Estrazione di nomi con ruota della fortuna, squadre casuali, lancio di dadi, testa o croce, numero e ordine casuali.',
      pl: 'Losowanie imion z kołem fortuny, podział na drużyny, rzut kośćmi i monetą, losowa liczba i kolejność.',
      sk: 'Losovanie mien s kolesom šťastia, rozdelenie do tímov, hod kockami a mincou, náhodné číslo a poradie.',
    },
    icon: randomIcon,
  },
];
