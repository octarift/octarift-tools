/**
 * Overlay mode for OBS and other streaming software (?overlay=1): only the countdown on a transparent
 * background, started automatically (nobody can click inside an OBS browser source), and nothing saved,
 * so an overlay link never changes the countdown someone uses normally.
 *
 * Extra link parameters: color=<hex without #> for the digits, shadow=0 to drop the text shadow,
 * labels=0 to hide the "min / sec" labels, sound=1 to play the end sound and phase cues.
 */

export interface OverlayOptions {
  /** "#rrggbb". */
  color: string;
  shadow: boolean;
  labels: boolean;
  sound: boolean;
}

export const DEFAULT_OVERLAY: OverlayOptions = { color: '#ffffff', shadow: true, labels: true, sound: false };

/** The overlay options from the address, or null when this is not an overlay link. */
export function readOverlay(search = location.search): OverlayOptions | null {
  const p = new URLSearchParams(search);
  if (p.get('overlay') !== '1') return null;
  const color = p.get('color');
  return {
    color: color && /^[0-9a-f]{6}$/i.test(color) ? `#${color.toLowerCase()}` : DEFAULT_OVERLAY.color,
    shadow: p.get('shadow') !== '0',
    labels: p.get('labels') !== '0',
    sound: p.get('sound') === '1',
  };
}

/** Adds the overlay parameters to a share link (which already says what to count). */
export function overlayUrl(shareUrl: string, o: OverlayOptions): string {
  const url = new URL(shareUrl);
  // The overlay draws no theme (it is transparent), so the theme only made the link longer.
  url.searchParams.delete('theme');
  url.searchParams.set('overlay', '1');
  if (o.color !== DEFAULT_OVERLAY.color) url.searchParams.set('color', o.color.slice(1));
  if (!o.shadow) url.searchParams.set('shadow', '0');
  if (!o.labels) url.searchParams.set('labels', '0');
  if (o.sound) url.searchParams.set('sound', '1');
  return url.toString();
}
