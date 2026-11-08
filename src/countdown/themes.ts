/** Groups shown as headings in the theme picker, in display order. */
export const themeCategories = [
  { id: 'mood', name: 'Nálada' },
  { id: 'tech', name: 'Technologie a hry' },
  { id: 'work', name: 'Škola a práce' },
  { id: 'holiday', name: 'Svátky' },
  { id: 'life', name: 'Volno a životní události' },
  { id: 'own', name: 'Vlastní' },
] as const;

export type ThemeCategoryId = (typeof themeCategories)[number]['id'];

/**
 * Built-in themes. Their look is defined in countdown.css under [data-theme="<id>"].
 * `pencil` themes draw their digits stroke by stroke (see pencil.ts) instead of using text.
 */
export const themes = [
  { id: 'aurora', name: 'Polární záře', category: 'mood', animated: true },
  { id: 'ocean', name: 'Moře při západu', category: 'mood', animated: true },
  { id: 'sunset', name: 'Západ slunce', category: 'mood', animated: true },
  { id: 'midnight', name: 'Půlnoc', category: 'mood', animated: false },

  { id: 'neon', name: 'Neon', category: 'tech', animated: true },
  { id: 'tech', name: 'Technologie', category: 'tech', animated: true },
  { id: 'terminal', name: 'Terminál', category: 'tech', animated: true },
  { id: 'warp', name: 'Hyperprostor', category: 'tech', animated: true },
  { id: 'hud', name: 'HUD', category: 'tech', animated: true },
  { id: 'gaming', name: 'Gaming', category: 'tech', animated: true },

  { id: 'exam', name: 'Psaní testu', category: 'work', animated: true, pencil: true },
  { id: 'paper', name: 'Tužka na papíře', category: 'work', animated: true, pencil: true },
  { id: 'business', name: 'Business', category: 'work', animated: true },
  { id: 'coffee', name: 'Coffee break', category: 'work', animated: true },

  { id: 'christmas', name: 'Vánoce', category: 'holiday', animated: true },
  { id: 'tree', name: 'Vánoční stromeček', category: 'holiday', animated: true },
  { id: 'newyear', name: 'Silvestr', category: 'holiday', animated: true },
  { id: 'easter', name: 'Velikonoce', category: 'holiday', animated: true },

  { id: 'holidays', name: 'Prázdniny', category: 'life', animated: true },
  { id: 'wedding', name: 'Svatba', category: 'life', animated: true },
  { id: 'baby', name: 'Narození dítěte', category: 'life', animated: true },

  { id: 'custom', name: 'Vlastní', category: 'own', animated: false },
] as const satisfies ReadonlyArray<{
  id: string;
  name: string;
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
