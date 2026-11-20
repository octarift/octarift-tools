/**
 * Wheel of fortune as an SVG: one slice per name, a pointer at the top, and a spin done with a CSS
 * transform transition (GPU, no JS animation loop). The winner is chosen fairly first (rng.ts); the
 * wheel then only animates to it.
 */

/** Slice colors: the logo greens and calm accents, all readable with white text. */
const GREENS = ['#147d4c', '#1f9a5a', '#33b866', '#0f5f3c'];
const OTHERS = ['#2a7fb8', '#c2563f', '#7a4fc4', '#b8860b'];

const escapeXml = (text: string) =>
  text.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c] ?? c);

/**
 * Slice colors for n names: a green and another color take turns, so no two greens touch. With an odd
 * number of slices the last one would meet the first green across the wrap-around, so it gets another
 * accent instead (different from its other neighbor too).
 */
function colorsFor(n: number): string[] {
  const out = Array.from({ length: n }, (_, i) =>
    i % 2 === 0 ? GREENS[(i / 2) % GREENS.length]! : OTHERS[((i - 1) / 2) % OTHERS.length]!,
  );
  if (n > 2 && n % 2 === 1) out[n - 1] = OTHERS.find((c) => c !== out[n - 2])!;
  return out;
}

export class Wheel {
  private rotation = 0; // degrees, keeps growing so every spin turns forward
  private readonly disc: SVGGElement;

  constructor(
    private readonly svg: SVGSVGElement,
    private names: string[],
  ) {
    this.svg.setAttribute('viewBox', '-110 -116 220 228');
    this.svg.innerHTML =
      `<g class="wheel__disc"></g>` +
      `<circle r="9" class="wheel__hub"/>` +
      // Pointer at the top, pointing down into the wheel.
      `<path class="wheel__pointer" d="M-9 -112 L9 -112 L0 -92 Z"/>`;
    this.disc = this.svg.querySelector('.wheel__disc')!;
    this.draw();
  }

  setNames(names: string[]): void {
    this.names = names;
    this.draw();
  }

  private draw(): void {
    const n = this.names.length;
    if (!n) {
      this.disc.innerHTML = `<circle r="100" class="wheel__empty"/>`;
      return;
    }
    const colors = colorsFor(n);
    const slice = 360 / n;
    // Text shrinks with more slices; beyond ~60 names the labels would be unreadable, so they are left out.
    const fontSize = Math.max(4, Math.min(11, 160 / n + 3));
    const maxChars = Math.max(6, Math.round(26 - fontSize));
    const point = (deg: number, r: number) => {
      const rad = ((deg - 90) * Math.PI) / 180;
      return `${(r * Math.cos(rad)).toFixed(2)} ${(r * Math.sin(rad)).toFixed(2)}`;
    };
    this.disc.innerHTML = this.names
      .map((name, i) => {
        const a0 = i * slice;
        const a1 = (i + 1) * slice;
        const path =
          n === 1
            ? `<circle r="100" fill="${colors[i]}"/>`
            : `<path d="M0 0 L${point(a0, 100)} A100 100 0 ${slice > 180 ? 1 : 0} 1 ${point(a1, 100)} Z" fill="${colors[i]}"/>`;
        const label = name.length > maxChars ? `${name.slice(0, maxChars - 1)}…` : name;
        const text =
          n <= 60
            ? `<text transform="rotate(${a0 + slice / 2 - 90}) translate(92 0)" text-anchor="end" dominant-baseline="central" font-size="${fontSize.toFixed(1)}">${escapeXml(label)}</text>`
            : '';
        return `<g>${path}${text}</g>`;
      })
      .join('');
  }

  /**
   * Spins so that slice `index` ends under the pointer, at a random spot inside the slice.
   * Resolves when the animation is over (at once with reduced motion).
   */
  spin(index: number, jitter: number, reduceMotion: boolean): Promise<void> {
    const n = this.names.length;
    const slice = 360 / n;
    // Angle (clockwise from the top) of the chosen spot on the unrotated wheel.
    const spot = index * slice + slice * (0.15 + 0.7 * jitter);
    // The wheel must end rotated by -spot (mod 360) so the spot is at the top; add whole turns for the show.
    const current = ((this.rotation % 360) + 360) % 360;
    const forward = (((360 - spot - current) % 360) + 360) % 360;
    this.rotation += forward + (reduceMotion ? 0 : 360 * 5);
    this.disc.style.transition = reduceMotion ? 'none' : 'transform 4.2s cubic-bezier(0.12, 0.6, 0.12, 1)';
    this.disc.style.transform = `rotate(${this.rotation}deg)`;
    if (reduceMotion) return Promise.resolve();
    return new Promise((resolve) => {
      const done = () => {
        this.disc.removeEventListener('transitionend', done);
        window.clearTimeout(fallback);
        resolve();
      };
      // transitionend does not fire in background tabs or when the element is hidden meanwhile.
      const fallback = window.setTimeout(done, 4500);
      this.disc.addEventListener('transitionend', done);
    });
  }
}
