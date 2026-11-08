/** Built-in themes. Their look is defined in countdown.css under [data-theme="<id>"]. */
export const themes = [
  { id: 'aurora', name: 'Polární záře', animated: true },
  { id: 'ocean', name: 'Moře při západu', animated: true },
  { id: 'sunset', name: 'Západ slunce', animated: true },
  { id: 'midnight', name: 'Půlnoc', animated: false },
  { id: 'neon', name: 'Neon', animated: true },
  { id: 'tech', name: 'Technologie', animated: true },
  { id: 'terminal', name: 'Terminál', animated: true },
  { id: 'warp', name: 'Hyperprostor', animated: true },
  { id: 'hud', name: 'HUD', animated: true },
  { id: 'business', name: 'Business', animated: true },
  { id: 'paper', name: 'Papír', animated: false },
  { id: 'custom', name: 'Vlastní', animated: false },
] as const;

export type ThemeId = (typeof themes)[number]['id'];

export const FALLBACK_THEME: ThemeId = 'midnight';

export function isThemeId(value: unknown): value is ThemeId {
  return themes.some((t) => t.id === value);
}
