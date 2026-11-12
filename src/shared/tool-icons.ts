/**
 * Tool icons in the green ramp of the Octarift logo (light #c4f27a → dark #0f5f3c).
 * Drawn on a 48×48 grid for a dark tile (.tool-card__icon), so they read the same in light and dark mode.
 */

const svg = (body: string) =>
  `<svg viewBox="0 0 48 48" width="48" height="48" fill="none" stroke-linecap="round" aria-hidden="true">${body}</svg>`;

/**
 * A stopwatch: a dial of seven arcs with the top one missing (the logo's "rift"), the winding button
 * above the gap and the hand on the first arc.
 */
export const countdownIcon = svg(
  `<g stroke-width="5">` +
    `<path d="M30.93 12.69A15 15 0 0 1 37.31 19.07" stroke="#c4f27a"/>` +
    `<path d="M38.31 21.49A15 15 0 0 1 38.31 30.51" stroke="#94e46a"/>` +
    `<path d="M37.31 32.93A15 15 0 0 1 30.93 39.31" stroke="#5ad278"/>` +
    `<path d="M28.51 40.31A15 15 0 0 1 19.49 40.31" stroke="#33b866"/>` +
    `<path d="M17.07 39.31A15 15 0 0 1 10.69 32.93" stroke="#1f9a5a"/>` +
    `<path d="M9.69 30.51A15 15 0 0 1 9.69 21.49" stroke="#147d4c"/>` +
    `<path d="M10.69 19.07A15 15 0 0 1 17.07 12.69" stroke="#0f5f3c"/>` +
    `</g>` +
    `<path d="M20 4h8M24 4v5" stroke="#c4f27a" stroke-width="3.4"/>` +
    `<path d="M24 26l6.5-6.5" stroke="#c4f27a" stroke-width="3"/>` +
    `<circle cx="24" cy="26" r="3" fill="#c4f27a"/>`,
);

/** A capital A turning into a small a, with a curved arrow between them. */
export const textConverterIcon = svg(
  // A
  `<path d="M7 25 13 8l6 17M9.4 19h7.2" stroke="#c4f27a" stroke-width="3.4" stroke-linejoin="round"/>` +
  // a
  `<circle cx="34" cy="34.5" r="5.5" stroke="#5ad278" stroke-width="3.4"/>` +
  `<path d="M39.5 29v11" stroke="#5ad278" stroke-width="3.4"/>` +
  // arrow from A to a
  `<path d="M24 11c7 0 12 4 13 11" stroke="#1f9a5a" stroke-width="3"/>` +
  `<path d="m33.5 19.5 3.5 3.5 3-4" stroke="#1f9a5a" stroke-width="3" stroke-linejoin="round"/>` +
  // text lines under the A
  `<path d="M8 33h12M8 40h16" stroke="#147d4c" stroke-width="3"/>`,
);

/** Three finder squares and a few modules, each in a different shade of the ramp. */
export const qrCodeIcon = svg(
  `<g stroke-width="3" stroke-linejoin="round">` +
    `<rect x="7.5" y="7.5" width="12" height="12" rx="2.5" stroke="#c4f27a"/>` +
    `<rect x="28.5" y="7.5" width="12" height="12" rx="2.5" stroke="#5ad278"/>` +
    `<rect x="7.5" y="28.5" width="12" height="12" rx="2.5" stroke="#1f9a5a"/>` +
    `</g>` +
    `<rect x="11.5" y="11.5" width="4" height="4" rx="1" fill="#c4f27a"/>` +
    `<rect x="32.5" y="11.5" width="4" height="4" rx="1" fill="#5ad278"/>` +
    `<rect x="11.5" y="32.5" width="4" height="4" rx="1" fill="#1f9a5a"/>` +
    `<rect x="27" y="27" width="5" height="5" rx="1" fill="#94e46a"/>` +
    `<rect x="36" y="27" width="5" height="5" rx="1" fill="#33b866"/>` +
    `<rect x="31.5" y="31.5" width="5" height="5" rx="1" fill="#5ad278"/>` +
    `<rect x="27" y="36" width="5" height="5" rx="1" fill="#147d4c"/>` +
    `<rect x="36" y="36" width="5" height="5" rx="1" fill="#0f5f3c"/>`,
);
