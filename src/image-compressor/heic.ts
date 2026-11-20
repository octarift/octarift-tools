/**
 * HEIC/HEIF (iPhone photos). Safari decodes them natively; elsewhere libheif is loaded on demand.
 *
 * libheif (with the libde265 HEVC decoder) is LGPL-3.0, so it is served as its own unmodified file from
 * public/vendor/ next to its license, loaded at runtime by URL and never bundled into our scripts. Anyone
 * can replace that file with another build. See public/third-party-licenses.txt.
 */

/** Version folder under public/vendor/; keep in sync when updating (see README there). */
const LIBHEIF_URL = '/vendor/libheif-js-1.23.5/libheif-bundle.mjs';

/** Approximate download size, shown while the decoder loads. */
export const LIBHEIF_SIZE_MB = 0.7;

/** HEIF brands of still images (ISO/IEC 23008-12), read from the "ftyp" box at the start of the file. */
const HEIF_BRANDS = ['heic', 'heix', 'heim', 'heis', 'hevc', 'hevx', 'mif1', 'msf1'];

export async function isHeic(file: File): Promise<boolean> {
  if (/^image\/hei[cf]/i.test(file.type) || /\.hei[cf]$/i.test(file.name)) return true;
  const head = new Uint8Array(await file.slice(0, 12).arrayBuffer());
  if (head.length < 12) return false;
  const box = String.fromCharCode(...head.subarray(4, 8));
  const brand = String.fromCharCode(...head.subarray(8, 12));
  return box === 'ftyp' && HEIF_BRANDS.includes(brand);
}

/* The parts of libheif's JavaScript API that we use (its bundled .d.ts only covers the C functions). */
interface HeifImage {
  get_width(): number;
  get_height(): number;
  is_primary(): boolean;
  display(target: ImageData, done: (result: ImageData | null) => void): void;
  free(): void;
}
interface LibHeif {
  HeifDecoder: new () => { decode(data: ArrayBuffer | Uint8Array): HeifImage[] };
}

let libheif: Promise<LibHeif> | null = null;

/**
 * Plain dynamic import of a public file. Built with Function so the Vite dev server does not rewrite it
 * (it would append "?import" and then refuse to serve files from public/); production behaves the same.
 */
const importUrl = new Function('url', 'return import(url)') as (url: string) => Promise<unknown>;

function loadLibheif(): Promise<LibHeif> {
  libheif ??= (importUrl(LIBHEIF_URL) as Promise<{ default: () => LibHeif | Promise<LibHeif> }>).then(
    (module: { default: () => LibHeif | Promise<LibHeif> }) => module.default(),
  );
  // A failed download may succeed on the next try.
  libheif.catch(() => (libheif = null));
  return libheif;
}

/**
 * Decodes the primary image of a HEIC file. `onLoadingDecoder` is called when the decoder has to be
 * downloaded first (so the page can say so).
 */
export async function decodeHeic(file: File, onLoadingDecoder: () => void): Promise<ImageBitmap | ImageData> {
  try {
    return await createImageBitmap(file); // Safari 17+ and other browsers with native HEIC support
  } catch {
    // Not supported natively: fall back to libheif.
  }
  if (!libheif) onLoadingDecoder();
  const lib = await loadLibheif();
  const images = new lib.HeifDecoder().decode(new Uint8Array(await file.arrayBuffer()));
  if (!images.length) throw new Error('No image in HEIC file');
  const image = images.find((i) => i.is_primary()) ?? images[0]!;
  try {
    const target = new ImageData(image.get_width(), image.get_height());
    return await new Promise<ImageData>((resolve, reject) =>
      image.display(target, (result) => (result ? resolve(result) : reject(new Error('HEIC decoding failed')))),
    );
  } finally {
    for (const i of images) i.free();
  }
}
