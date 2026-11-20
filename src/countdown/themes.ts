import type { Localized } from '@shared/config';

/** Groups shown as headings in the theme picker, in display order. */
export const themeCategories = [
  { id: 'work', name: { cs: 'Škola a práce', en: 'School & Work', de: 'Schule & Arbeit' } },
  { id: 'tech', name: { cs: 'Technologie', en: 'Tech', de: 'Technik' } },
  { id: 'mood', name: { cs: 'Nálada', en: 'Mood', de: 'Stimmung' } },
  { id: 'nature', name: { cs: 'Příroda', en: 'Nature', de: 'Natur' } },
  { id: 'holiday', name: { cs: 'Svátky', en: 'Holidays', de: 'Feiertage' } },
  { id: 'life', name: { cs: 'Volno a životní události', en: 'Time Off & Life Events', de: 'Freizeit & Lebensereignisse' } },
  { id: 'own', name: { cs: 'Vlastní', en: 'Custom', de: 'Eigenes' } },
] as const;

export type ThemeCategoryId = (typeof themeCategories)[number]['id'];

/**
 * Built-in themes. Their look is defined in countdown.css under [data-theme="<id>"].
 * `pencil` themes draw their digits stroke by stroke (see pencil.ts) instead of using text.
 */
export const themes = [
  { id: 'aurora', name: { cs: 'Polární záře', en: 'Aurora', de: 'Polarlicht' }, category: 'mood', animated: true },
  { id: 'ocean', name: { cs: 'Moře při západu', en: 'Sea at Sunset', de: 'Meer im Abendrot' }, category: 'mood', animated: true },
  { id: 'sunset', name: { cs: 'Západ slunce', en: 'Sunset', de: 'Sonnenuntergang' }, category: 'mood', animated: true },
  { id: 'midnight', name: { cs: 'Půlnoc', en: 'Midnight', de: 'Mitternacht' }, category: 'mood', animated: false },

  { id: 'forest', name: { cs: 'Les', en: 'Forest', de: 'Wald' }, category: 'nature', animated: true },
  { id: 'meadow', name: { cs: 'Louka', en: 'Meadow', de: 'Wiese' }, category: 'nature', animated: true },
  { id: 'underwater', name: { cs: 'Podmořský svět', en: 'Underwater', de: 'Unterwasserwelt' }, category: 'nature', animated: true },
  { id: 'mountains', name: { cs: 'Hory', en: 'Mountains', de: 'Berge' }, category: 'nature', animated: true },
  { id: 'rain', name: { cs: 'Déšť', en: 'Rain', de: 'Regen' }, category: 'nature', animated: true },

  { id: 'neon', name: { cs: 'Neon', en: 'Neon', de: 'Neon' }, category: 'tech', animated: true },
  { id: 'tech', name: { cs: 'Technologie', en: 'Tech', de: 'Technik' }, category: 'tech', animated: true },
  { id: 'terminal', name: { cs: 'Terminál', en: 'Terminal', de: 'Terminal' }, category: 'tech', animated: true },
  { id: 'warp', name: { cs: 'Hyperprostor', en: 'Hyperspace', de: 'Hyperraum' }, category: 'tech', animated: true },
  { id: 'hud', name: { cs: 'HUD', en: 'HUD', de: 'HUD' }, category: 'tech', animated: true },
  { id: 'rgb', name: { cs: 'RGB setup', en: 'RGB Setup', de: 'RGB-Setup' }, category: 'tech', animated: true },

  { id: 'exam', name: { cs: 'Psaní testu', en: 'Exam Time', de: 'Prüfung' }, category: 'work', animated: true, pencil: true },
  { id: 'paper', name: { cs: 'Tužka na papíře', en: 'Pencil on Paper', de: 'Bleistift auf Papier' }, category: 'work', animated: true, pencil: true },
  { id: 'business', name: { cs: 'Business', en: 'Business', de: 'Business' }, category: 'work', animated: true },
  { id: 'coffee', name: { cs: 'Coffee break', en: 'Coffee Break', de: 'Kaffeepause' }, category: 'work', animated: true },

  { id: 'christmas', name: { cs: 'Vánoce', en: 'Christmas', de: 'Weihnachten' }, category: 'holiday', animated: true },
  { id: 'tree', name: { cs: 'Vánoční stromeček', en: 'Christmas Tree', de: 'Weihnachtsbaum' }, category: 'holiday', animated: true },
  { id: 'newyear', name: { cs: 'Ohňostroj', en: 'Fireworks', de: 'Feuerwerk' }, category: 'holiday', animated: true },
  { id: 'easter', name: { cs: 'Velikonoce', en: 'Easter', de: 'Ostern' }, category: 'holiday', animated: true },

  { id: 'holidays', name: { cs: 'Prázdniny', en: 'Summer Holidays', de: 'Sommerferien' }, category: 'life', animated: true },
  { id: 'wedding', name: { cs: 'Svatba', en: 'Wedding', de: 'Hochzeit' }, category: 'life', animated: true },
  { id: 'baby', name: { cs: 'Narození dítěte', en: 'New Baby', de: 'Geburt' }, category: 'life', animated: true },

  { id: 'custom', name: { cs: 'Vlastní', en: 'Custom', de: 'Eigenes' }, category: 'own', animated: false },
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
