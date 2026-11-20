/**
 * Decode → resize → re-encode, all on a canvas in the browser. Re-encoding drops all metadata (EXIF,
 * GPS location, camera data); EXIF orientation is applied while decoding, so photos stay upright.
 */

import { decodeHeic, isHeic } from './heic';

export type OutputFormat = 'jpeg' | 'webp' | 'png';

export interface CompressOptions {
  format: OutputFormat;
  /** 0.1–1 for JPEG and WebP; PNG is lossless and ignores it. */
  quality: number;
  /** Longest side in px; 0 keeps the original size. Images are never enlarged. */
  maxSide: number;
}

export interface CompressResult {
  blob: Blob;
  width: number;
  height: number;
  /** Size of the decoded original, for the "1920 × 1080" label. */
  sourceWidth: number;
  sourceHeight: number;
}

export const MIME: Record<OutputFormat, string> = { jpeg: 'image/jpeg', webp: 'image/webp', png: 'image/png' };
export const EXTENSION: Record<OutputFormat, string> = { jpeg: 'jpg', webp: 'webp', png: 'png' };

/** Thrown when the browser cannot decode a file (not an image, or a format it does not know). */
export class UnsupportedImageError extends Error {}

async function decode(file: File, onLoadingDecoder: () => void): Promise<ImageBitmap | ImageData> {
  if (await isHeic(file)) return decodeHeic(file, onLoadingDecoder);
  try {
    return await createImageBitmap(file, { imageOrientation: 'from-image' });
  } catch {
    throw new UnsupportedImageError(file.name);
  }
}

export function targetSize(width: number, height: number, maxSide: number): { width: number; height: number } {
  const longest = Math.max(width, height);
  if (!maxSide || longest <= maxSide) return { width, height };
  const scale = maxSide / longest;
  return { width: Math.max(1, Math.round(width * scale)), height: Math.max(1, Math.round(height * scale)) };
}

function canvasOf(width: number, height: number): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  return canvas;
}

/**
 * Draws `source` at the target size. Big reductions go in halving steps, which looks sharper than one
 * large step in browsers whose "high" smoothing is still a plain bilinear filter.
 */
function resize(source: CanvasImageSource, sw: number, sh: number, width: number, height: number): HTMLCanvasElement {
  let current: CanvasImageSource = source;
  let cw = sw;
  let ch = sh;
  while (cw / 2 >= width && ch / 2 >= height) {
    const step = canvasOf(Math.round(cw / 2), Math.round(ch / 2));
    const ctx = step.getContext('2d')!;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(current, 0, 0, step.width, step.height);
    current = step;
    cw = step.width;
    ch = step.height;
  }
  const out = canvasOf(width, height);
  const ctx = out.getContext('2d')!;
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(current, 0, 0, width, height);
  return out;
}

export async function compress(file: File, o: CompressOptions, onLoadingDecoder: () => void): Promise<CompressResult> {
  const decoded = await decode(file, onLoadingDecoder);
  const sourceWidth = decoded.width;
  const sourceHeight = decoded.height;
  const { width, height } = targetSize(sourceWidth, sourceHeight, o.maxSide);

  // ImageData cannot be scaled by drawImage, so it goes through a canvas first.
  let source: CanvasImageSource;
  if (decoded instanceof ImageData) {
    const c = canvasOf(sourceWidth, sourceHeight);
    c.getContext('2d')!.putImageData(decoded, 0, 0);
    source = c;
  } else {
    source = decoded;
  }

  const canvas = resize(source, sourceWidth, sourceHeight, width, height);
  if ('close' in decoded) decoded.close();

  if (o.format === 'jpeg') {
    // JPEG has no transparency: put transparent areas (PNG logos etc.) on white instead of black.
    const flat = canvasOf(width, height);
    const ctx = flat.getContext('2d')!;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);
    ctx.drawImage(canvas, 0, 0);
    return { blob: await toBlob(flat, o), width, height, sourceWidth, sourceHeight };
  }
  return { blob: await toBlob(canvas, o), width, height, sourceWidth, sourceHeight };
}

function toBlob(canvas: HTMLCanvasElement, o: CompressOptions): Promise<Blob> {
  return new Promise((resolve, reject) =>
    canvas.toBlob(
      (blob) => {
        // Browsers without WebP encoding (older Safari) silently return PNG instead.
        if (!blob) reject(new Error('Encoding failed'));
        else if (blob.type !== MIME[o.format]) reject(new FormatUnsupportedError(o.format));
        else resolve(blob);
      },
      MIME[o.format],
      o.format === 'png' ? undefined : o.quality,
    ),
  );
}

/** The browser cannot write this output format (WebP in Safari before 17). */
export class FormatUnsupportedError extends Error {
  constructor(readonly format: OutputFormat) {
    super(format);
  }
}
