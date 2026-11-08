/** Groups shown as headings in the theme picker, in display order. */
export const themeCategories = [
  { id: 'mood', name: { cs: 'Nálada', en: 'Mood' } },
  { id: 'tech', name: { cs: 'Technologie a hry', en: 'Tech & Games' } },
  { id: 'work', name: { cs: 'Škola a práce', en: 'School & Work' } },
  { id: 'holiday', name: { cs: 'Svátky', en: 'Holidays' } },
  { id: 'life', name: { cs: 'Volno a životní události', en: 'Time Off & Life Events' } },
  { id: 'own', name: { cs: 'Vlastní', en: 'Custom' } },
] as const;

export type ThemeCategoryId = (typeof themeCategories)[number]['id'];

/**
 * Built-in themes. Their look is defined in countdown.css under [data-theme="<id>"].
 * `pencil` themes draw their digits stroke by stroke (see pencil.ts) instead of using text.
 */
export const themes = [
  { id: 'aurora', name: { cs: 'Polární záře', en: 'Aurora' }, category: 'mood', animated: true },
  { id: 'ocean', name: { cs: 'Moře při západu', en: 'Sea at Sunset' }, category: 'mood', animated: true },
  { id: 'sunset', name: { cs: 'Západ slunce', en: 'Sunset' }, category: 'mood', animated: true },
  { id: 'midnight', name: { cs: 'Půlnoc', en: 'Midnight' }, category: 'mood', animated: false },

  { id: 'neon', name: { cs: 'Neon', en: 'Neon' }, category: 'tech', animated: true },
  { id: 'tech', name: { cs: 'Technologie', en: 'Tech' }, category: 'tech', animated: true },
  { id: 'terminal', name: { cs: 'Terminál', en: 'Terminal' }, category: 'tech', animated: true },
  { id: 'warp', name: { cs: 'Hyperprostor', en: 'Hyperspace' }, category: 'tech', animated: true },
  { id: 'hud', name: { cs: 'HUD', en: 'HUD' }, category: 'tech', animated: true },
  { id: 'gaming', name: { cs: 'Gaming', en: 'Gaming' }, category: 'tech', animated: true },

  { id: 'exam', name: { cs: 'Psaní testu', en: 'Exam Time' }, category: 'work', animated: true, pencil: true },
  { id: 'paper', name: { cs: 'Tužka na papíře', en: 'Pencil on Paper' }, category: 'work', animated: true, pencil: true },
  { id: 'business', name: { cs: 'Business', en: 'Business' }, category: 'work', animated: true },
  { id: 'coffee', name: { cs: 'Coffee break', en: 'Coffee Break' }, category: 'work', animated: true },

  { id: 'christmas', name: { cs: 'Vánoce', en: 'Christmas' }, category: 'holiday', animated: true },
  { id: 'tree', name: { cs: 'Vánoční stromeček', en: 'Christmas Tree' }, category: 'holiday', animated: true },
  { id: 'newyear', name: { cs: 'Silvestr', en: "New Year's Eve" }, category: 'holiday', animated: true },
  { id: 'easter', name: { cs: 'Velikonoce', en: 'Easter' }, category: 'holiday', animated: true },

  { id: 'holidays', name: { cs: 'Prázdniny', en: 'Summer Holidays' }, category: 'life', animated: true },
  { id: 'wedding', name: { cs: 'Svatba', en: 'Wedding' }, category: 'life', animated: true },
  { id: 'baby', name: { cs: 'Narození dítěte', en: 'New Baby' }, category: 'life', animated: true },

  { id: 'custom', name: { cs: 'Vlastní', en: 'Custom' }, category: 'own', animated: false },
] as const satisfies ReadonlyArray<{
  id: string;
  name: Record<'cs' | 'en', string>;
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
