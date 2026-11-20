import type { Localized } from '@shared/config';

/** Groups shown as headings in the theme picker, in display order. */
export const themeCategories = [
  { id: 'work', name: { cs: 'Škola a práce', en: 'School & Work', de: 'Schule & Arbeit', es: 'Escuela y trabajo', fr: 'École et travail', it: 'Scuola e lavoro', pl: 'Szkoła i praca', sk: 'Škola a práca' } },
  { id: 'tech', name: { cs: 'Technologie', en: 'Tech', de: 'Technik', es: 'Tecnología', fr: 'Tech', it: 'Tecnologia', pl: 'Technologia', sk: 'Technológie' } },
  { id: 'mood', name: { cs: 'Nálada', en: 'Mood', de: 'Stimmung', es: 'Ambiente', fr: 'Ambiance', it: 'Atmosfera', pl: 'Nastrój', sk: 'Nálada' } },
  { id: 'nature', name: { cs: 'Příroda', en: 'Nature', de: 'Natur', es: 'Naturaleza', fr: 'Nature', it: 'Natura', pl: 'Natura', sk: 'Príroda' } },
  { id: 'holiday', name: { cs: 'Svátky', en: 'Holidays', de: 'Feiertage', es: 'Fiestas', fr: 'Fêtes', it: 'Feste', pl: 'Święta', sk: 'Sviatky' } },
  { id: 'life', name: { cs: 'Volno a životní události', en: 'Time Off & Life Events', de: 'Freizeit & Lebensereignisse', es: 'Ocio y grandes momentos', fr: 'Loisirs et grands moments', it: 'Tempo libero e grandi eventi', pl: 'Wolne i ważne chwile', sk: 'Voľno a životné udalosti' } },
  { id: 'own', name: { cs: 'Vlastní', en: 'Custom', de: 'Eigenes', es: 'Personalizado', fr: 'Personnalisé', it: 'Personalizzato', pl: 'Własny', sk: 'Vlastné' } },
] as const;

export type ThemeCategoryId = (typeof themeCategories)[number]['id'];

/**
 * Built-in themes. Their look is defined in countdown.css under [data-theme="<id>"].
 * `pencil` themes draw their digits stroke by stroke (see pencil.ts) instead of using text.
 */
export const themes = [
  { id: 'aurora', name: { cs: 'Polární záře', en: 'Aurora', de: 'Polarlicht', es: 'Aurora boreal', fr: 'Aurore boréale', it: 'Aurora boreale', pl: 'Zorza polarna', sk: 'Polárna žiara' }, category: 'mood', animated: true },
  { id: 'ocean', name: { cs: 'Moře při západu', en: 'Sea at Sunset', de: 'Meer im Abendrot', es: 'Mar al atardecer', fr: 'Mer au couchant', it: 'Mare al tramonto', pl: 'Morze o zachodzie', sk: 'More pri západe' }, category: 'mood', animated: true },
  { id: 'sunset', name: { cs: 'Západ slunce', en: 'Sunset', de: 'Sonnenuntergang', es: 'Puesta de sol', fr: 'Coucher de soleil', it: 'Tramonto', pl: 'Zachód słońca', sk: 'Západ slnka' }, category: 'mood', animated: true },
  { id: 'midnight', name: { cs: 'Půlnoc', en: 'Midnight', de: 'Mitternacht', es: 'Medianoche', fr: 'Minuit', it: 'Mezzanotte', pl: 'Północ', sk: 'Polnoc' }, category: 'mood', animated: false },

  { id: 'forest', name: { cs: 'Les', en: 'Forest', de: 'Wald', es: 'Bosque', fr: 'Forêt', it: 'Bosco', pl: 'Las', sk: 'Les' }, category: 'nature', animated: true },
  { id: 'meadow', name: { cs: 'Louka', en: 'Meadow', de: 'Wiese', es: 'Pradera', fr: 'Prairie', it: 'Prato', pl: 'Łąka', sk: 'Lúka' }, category: 'nature', animated: true },
  { id: 'underwater', name: { cs: 'Podmořský svět', en: 'Underwater', de: 'Unterwasserwelt', es: 'Bajo el mar', fr: 'Sous la mer', it: 'Sott’acqua', pl: 'Podwodny świat', sk: 'Podmorský svet' }, category: 'nature', animated: true },
  { id: 'mountains', name: { cs: 'Hory', en: 'Mountains', de: 'Berge', es: 'Montañas', fr: 'Montagnes', it: 'Montagne', pl: 'Góry', sk: 'Hory' }, category: 'nature', animated: true },
  { id: 'rain', name: { cs: 'Déšť', en: 'Rain', de: 'Regen', es: 'Lluvia', fr: 'Pluie', it: 'Pioggia', pl: 'Deszcz', sk: 'Dážď' }, category: 'nature', animated: true },

  { id: 'neon', name: { cs: 'Neon', en: 'Neon', de: 'Neon', es: 'Neón', fr: 'Néon', it: 'Neon', pl: 'Neon', sk: 'Neón' }, category: 'tech', animated: true },
  { id: 'tech', name: { cs: 'Technologie', en: 'Tech', de: 'Technik', es: 'Tecnología', fr: 'Tech', it: 'Tecnologia', pl: 'Technologia', sk: 'Technológie' }, category: 'tech', animated: true },
  { id: 'terminal', name: { cs: 'Terminál', en: 'Terminal', de: 'Terminal', es: 'Terminal', fr: 'Terminal', it: 'Terminale', pl: 'Terminal', sk: 'Terminál' }, category: 'tech', animated: true },
  { id: 'warp', name: { cs: 'Hyperprostor', en: 'Hyperspace', de: 'Hyperraum', es: 'Hiperespacio', fr: 'Hyperespace', it: 'Iperspazio', pl: 'Nadprzestrzeń', sk: 'Hyperpriestor' }, category: 'tech', animated: true },
  { id: 'hud', name: { cs: 'HUD', en: 'HUD', de: 'HUD', es: 'HUD', fr: 'HUD', it: 'HUD', pl: 'HUD', sk: 'HUD' }, category: 'tech', animated: true },
  { id: 'rgb', name: { cs: 'RGB setup', en: 'RGB Setup', de: 'RGB-Setup', es: 'Setup RGB', fr: 'Setup RGB', it: 'Setup RGB', pl: 'Setup RGB', sk: 'RGB setup' }, category: 'tech', animated: true },

  { id: 'exam', name: { cs: 'Psaní testu', en: 'Exam Time', de: 'Prüfung', es: 'Examen', fr: 'Examen', it: 'Esame', pl: 'Egzamin', sk: 'Písanie testu' }, category: 'work', animated: true, pencil: true },
  { id: 'paper', name: { cs: 'Tužka na papíře', en: 'Pencil on Paper', de: 'Bleistift auf Papier', es: 'Lápiz sobre papel', fr: 'Crayon sur papier', it: 'Matita su carta', pl: 'Ołówek na papierze', sk: 'Ceruzka na papieri' }, category: 'work', animated: true, pencil: true },
  { id: 'business', name: { cs: 'Business', en: 'Business', de: 'Business', es: 'Negocios', fr: 'Business', it: 'Business', pl: 'Biznes', sk: 'Business' }, category: 'work', animated: true },
  { id: 'coffee', name: { cs: 'Coffee break', en: 'Coffee Break', de: 'Kaffeepause', es: 'Pausa para el café', fr: 'Pause café', it: 'Pausa caffè', pl: 'Przerwa na kawę', sk: 'Prestávka na kávu' }, category: 'work', animated: true },

  { id: 'christmas', name: { cs: 'Vánoce', en: 'Christmas', de: 'Weihnachten', es: 'Navidad', fr: 'Noël', it: 'Natale', pl: 'Boże Narodzenie', sk: 'Vianoce' }, category: 'holiday', animated: true },
  { id: 'tree', name: { cs: 'Vánoční stromeček', en: 'Christmas Tree', de: 'Weihnachtsbaum', es: 'Árbol de Navidad', fr: 'Sapin de Noël', it: 'Albero di Natale', pl: 'Choinka', sk: 'Vianočný stromček' }, category: 'holiday', animated: true },
  { id: 'newyear', name: { cs: 'Ohňostroj', en: 'Fireworks', de: 'Feuerwerk', es: 'Fuegos artificiales', fr: 'Feu d’artifice', it: 'Fuochi d’artificio', pl: 'Fajerwerki', sk: 'Ohňostroj' }, category: 'holiday', animated: true },
  { id: 'easter', name: { cs: 'Velikonoce', en: 'Easter', de: 'Ostern', es: 'Pascua', fr: 'Pâques', it: 'Pasqua', pl: 'Wielkanoc', sk: 'Veľká noc' }, category: 'holiday', animated: true },

  { id: 'holidays', name: { cs: 'Prázdniny', en: 'Summer Holidays', de: 'Sommerferien', es: 'Vacaciones de verano', fr: 'Vacances d’été', it: 'Vacanze estive', pl: 'Wakacje', sk: 'Prázdniny' }, category: 'life', animated: true },
  { id: 'wedding', name: { cs: 'Svatba', en: 'Wedding', de: 'Hochzeit', es: 'Boda', fr: 'Mariage', it: 'Matrimonio', pl: 'Ślub', sk: 'Svadba' }, category: 'life', animated: true },
  { id: 'baby', name: { cs: 'Narození dítěte', en: 'New Baby', de: 'Geburt', es: 'Bebé en camino', fr: 'Naissance', it: 'Nascita', pl: 'Narodziny dziecka', sk: 'Narodenie dieťaťa' }, category: 'life', animated: true },

  { id: 'custom', name: { cs: 'Vlastní', en: 'Custom', de: 'Eigenes', es: 'Personalizado', fr: 'Personnalisé', it: 'Personalizzato', pl: 'Własny', sk: 'Vlastné' }, category: 'own', animated: false },
] as const satisfies ReadonlyArray<{
  id: string;
  name: Localized;
  category: ThemeCategoryId;
  animated: boolean;
  pencil?: boolean;
}>;

export type ThemeId = (typeof themes)[number]['id'];

export const FALLBACK_THEME: ThemeId = 'midnight';

export function isThemeId(value: unknown): value is ThemeId {
  return themes.some((t) => t.id === value);
}

/** Whether the theme draws its digits by hand (pencil, chalk). */
export function usesPencil(id: string | undefined): boolean {
  return themes.some((t) => t.id === id && 'pencil' in t && t.pencil);
}
