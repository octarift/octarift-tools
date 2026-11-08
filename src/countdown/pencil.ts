/**
 * Hand-drawn pencil digits for the "paper" theme.
 *
 * Every digit is a single-stroke SVG path that is "drawn" by animating its
 * stroke-dashoffset (pathLength=1 makes every stroke the same length to CSS).
 *
 * To look like a human hand rather than a plotter, each drawing is unique:
 * - every coordinate of the glyph is nudged randomly, so no two "5"s match,
 * - the glyph gets a slight slant, tilt and offset,
 * - the second (retrace) pass follows its own jittered path,
 * - pressure (line width) varies per digit,
 * - an SVG filter adds slow hand tremor plus fine graphite grain; there are
 *   several filter variants with different noise so the tremor differs too.
 *
 * When a digit changes, the old glyph is rubbed out and left as a faint ghost,
 * the way an eraser leaves traces on real paper.
 */

const SVG_NS = 'http://www.w3.org/2000/svg';
const FILTER_PREFIX = 'pencil-filter-';
const FILTER_VARIANTS = 4;

/** Time to draw one whole digit; keep it under a second so the seconds digit keeps up. */
const DRAW_MS = 620;
/** Pause before drawing a replacement, while the old digit is being erased. */
const REDRAW_DELAY_MS = 170;
/** How far (in glyph units, box is 60×100) each coordinate may wander. */
const JITTER = 1.8;

/**
 * Single-stroke digits in a 60×100 box. Several strokes are drawn one after another.
 * Lines are deliberately drawn as gentle curves (no straight "L" segments), loops
 * don't close exactly and ends overshoot a little, as they do in handwriting.
 */
const GLYPHS: Record<string, string[]> = {
  '0': ['M32 11 C16 9 9 29 10 50 C10 72 17 90 31 90 C46 91 52 70 51 48 C50 27 44 9 26 14'],
  '1': ['M16 28 C23 22 29 16 34 9 C33 36 34 64 32 91'],
  '2': ['M11 30 C12 16 22 9 32 9 C44 10 51 18 50 29 C49 44 34 57 12 88 C25 89 39 86 54 88'],
  '3': [
    'M11 22 C16 13 24 9 33 10 C43 10 49 18 48 27 C48 38 39 45 25 47 C42 46 53 56 52 69 C51 83 41 91 29 90 C20 90 13 86 9 78',
  ],
  '4': ['M38 9 C28 28 18 46 9 64 C24 66 39 64 55 65', 'M41 32 C40 51 42 72 40 92'],
  '5': ['M50 11 C39 10 28 11 17 10 C15 22 14 34 13 47 C19 41 25 38 32 38 C45 39 52 50 51 64 C50 80 40 90 28 90 C19 90 12 85 9 78'],
  '6': ['M47 15 C42 10 36 8 30 9 C16 11 10 31 10 56 C11 78 18 91 31 90 C43 90 51 80 51 67 C51 53 42 45 31 46 C21 46 14 53 12 63'],
  '7': ['M8 12 C22 13 37 10 53 10 C41 32 32 57 24 91'],
  '8': [
    'M31 48 C18 46 12 39 12 28 C12 16 21 9 30 9 C41 9 48 18 48 28 C47 40 40 46 30 48 C17 51 9 59 9 71 C10 84 18 91 30 91 C43 90 51 82 51 69 C50 57 42 49 27 47',
  ],
  '9': ['M48 30 C47 18 40 10 29 10 C17 11 10 20 11 32 C11 44 19 51 29 50 C40 50 48 42 49 29 C51 54 47 90 25 90 C18 89 13 86 10 81'],
};

/** Two small scribbled dots for the ":" between units, in a 24×100 box. */
const SEPARATOR = ['M10 36 C14 33 16 38 12 40 C8 42 8 36 12 36', 'M10 66 C14 63 16 68 12 70 C8 72 8 66 12 66'];

const rand = (amount: number): number => (Math.random() * 2 - 1) * amount;

/** Nudges every number in a path (all of them are coordinates in our glyphs). */
function jitter(d: string, amount: number): string {
  return d.replace(/-?\d+(?:\.\d+)?/g, (n) => (Number(n) + rand(amount)).toFixed(1));
}

/** Injects the shared pencil filters once per page. */
function ensureFilters(): void {
  if (document.getElementById(`${FILTER_PREFIX}0`)) return;
  const holder = document.createElementNS(SVG_NS, 'svg');
  holder.setAttribute('aria-hidden', 'true');
  holder.setAttribute('focusable', 'false');
  holder.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden';
  // Per variant:
  // 1) slow, large-scale displacement = hand tremor,
  // 2) fine displacement = rough paper tooth catching the lead,
  // 3) mask with fine noise = patchy graphite grain.
  const filters = Array.from(
    { length: FILTER_VARIANTS },
    (_, i) => `<filter id="${FILTER_PREFIX}${i}" x="-20%" y="-20%" width="140%" height="140%">
      <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="1" seed="${5 + i * 7}" result="tremor"/>
      <feDisplacementMap in="SourceGraphic" in2="tremor" scale="5" xChannelSelector="R" yChannelSelector="G" result="shaky"/>
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="${3 + i * 5}" result="tooth"/>
      <feDisplacementMap in="shaky" in2="tooth" scale="1.8" xChannelSelector="R" yChannelSelector="G" result="rough"/>
      <feTurbulence type="fractalNoise" baseFrequency="2.2" numOctaves="1" seed="${11 + i * 3}" result="grain"/>
      <feColorMatrix in="grain" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -2.2 1.75" result="grainMask"/>
      <feComposite in="rough" in2="grainMask" operator="in"/>
    </filter>`,
  ).join('');
  holder.innerHTML = `<defs>${filters}</defs>`;
  document.body.append(holder);
}

function glyph(paths: string[], viewBox: string, delayMs: number, jitterAmount: number): SVGSVGElement {
  const svg = document.createElementNS(SVG_NS, 'svg');
  svg.setAttribute('viewBox', viewBox);
  svg.setAttribute('aria-hidden', 'true');
  svg.classList.add('pencil-glyph');
  // Pressure: some digits come out a bit darker and heavier than others.
  svg.style.setProperty('--w', (4 + Math.random() * 1.1).toFixed(2));
  svg.style.setProperty('--ink', (0.82 + Math.random() * 0.18).toFixed(2));

  const [, , w = 60, h = 100] = viewBox.split(' ').map(Number);
  const cx = w / 2;
  const cy = h / 2;
  // Handwriting leans right a little and never sits perfectly on the line.
  const slant = -5 + rand(2.5);
  const transform =
    `translate(${(rand(1.5) + h * 0.045).toFixed(2)} ${rand(1.5).toFixed(2)}) ` +
    `rotate(${rand(2.5).toFixed(2)} ${cx} ${cy}) skewX(${slant.toFixed(2)})`;
  const filter = `url(#${FILTER_PREFIX}${Math.floor(Math.random() * FILTER_VARIANTS)})`;

  const per = DRAW_MS / paths.length;
  const strokes = paths
    .map((d, i) => {
      const style = `--delay:${Math.round(delayMs + i * per)}ms;--dur:${Math.round(per)}ms`;
      // The retrace follows its own slightly different path, like going over the line twice.
      return (
        `<path class="pencil-stroke" d="${jitter(d, jitterAmount)}" pathLength="1" style="${style}"/>` +
        `<path class="pencil-stroke pencil-stroke--retrace" d="${jitter(d, jitterAmount)}" pathLength="1" style="${style}"/>`
      );
    })
    .join('');

  svg.innerHTML = `<g transform="${transform}"><g filter="${filter}">${strokes}</g></g>`;
  return svg;
}

interface Slot {
  el: HTMLElement;
  char: string;
  current: SVGSVGElement | null;
  ghost: SVGSVGElement | null;
}

export class PencilDigits {
  private structure = '';
  private slots: Slot[] = [];

  constructor(private readonly container: HTMLElement) {}

  /** Forget the drawn state, e.g. after another renderer replaced the container's content. */
  reset(): void {
    this.structure = '';
    this.slots = [];
  }

  /** Units are [value, label] pairs, e.g. [["05", "min"], ["09", "sek"]]. Only changed digits are redrawn. */
  render(units: Array<[value: string, label: string]>): void {
    const structure = units.map(([value, label]) => `${label}:${value.length}`).join('|');
    if (structure !== this.structure) this.build(units, structure);

    let i = 0;
    for (const [value] of units) {
      for (const ch of value) {
        const slot = this.slots[i++];
        if (slot && slot.char !== ch) this.draw(slot, ch);
      }
    }
  }

  private build(units: Array<[string, string]>, structure: string): void {
    ensureFilters();
    this.container.innerHTML = units
      .map(
        ([value, label], i) =>
          `${i ? '<span class="digits__sep pencil-sep" aria-hidden="true"></span>' : ''}` +
          `<span class="unit"><span class="unit__value pencil-value">${'<span class="pencil-slot"></span>'.repeat(value.length)}</span>` +
          `<span class="unit__label">${label}</span></span>`,
      )
      .join('');
    this.container
      .querySelectorAll<HTMLElement>('.pencil-sep')
      .forEach((sep) => sep.append(glyph(SEPARATOR, '0 0 24 100', 0, 0.8)));
    this.slots = Array.from(this.container.querySelectorAll<HTMLElement>('.pencil-slot'), (el) => ({
      el,
      char: '',
      current: null,
      ghost: null,
    }));
    this.structure = structure;
  }

  private draw(slot: Slot, ch: string): void {
    const paths = GLYPHS[ch];
    if (!paths) return;

    const replacing = slot.current !== null;
    if (slot.current) {
      // The previous ghost is fully rubbed out; the current digit becomes the new ghost.
      slot.ghost?.remove();
      slot.current.classList.add('is-erasing');
      slot.ghost = slot.current;
    }

    const svg = glyph(paths, '0 0 60 100', replacing ? REDRAW_DELAY_MS : 0, JITTER);
    slot.el.append(svg);
    slot.current = svg;
    slot.char = ch;
  }
}
