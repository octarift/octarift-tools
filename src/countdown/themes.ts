/** Built-in themes. Their look is defined in countdown.css under [data-theme="<id>"]. */
export const themes = [
  { id: 'aurora', name: 'Polární záře', animated: true },
  { id: 'midnight', name: 'Půlnoc', animated: false },
  { id: 'neon', name: 'Neon', animated: true },
  { id: 'sunset', name: 'Západ slunce', animated: true },
  { id: 'paper', name: 'Papír', animated: false },
  { id: 'custom', name: 'Vlastní', animated: false },
] as const;

export type ThemeId = (typeof themes)[number]['id'];

export const FALLBACK_THEME: ThemeId = 'midnight';

export function isThemeId(value: unknown): value is ThemeId {
  return themes.some((t) => t.id === value);
}
