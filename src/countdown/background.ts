import { idbDelete, idbGet, idbSet } from '@shared/idb';

/**
 * The user's own background image or video. It is stored only in this
 * browser (IndexedDB) and never uploaded anywhere.
 */
const KEY = 'countdown:custom-background';
export const MAX_BACKGROUND_BYTES = 30 * 1024 * 1024;

export function isSupportedBackground(file: File): boolean {
  return file.type.startsWith('image/') || file.type === 'video/mp4' || file.type === 'video/webm';
}

export async function loadCustomBackground(): Promise<Blob | null> {
  try {
    const blob = await idbGet<Blob>(KEY);
    return blob instanceof Blob ? blob : null;
  } catch {
    return null;
  }
}

export function saveCustomBackground(blob: Blob): Promise<unknown> {
  return idbSet(KEY, blob);
}

export async function clearCustomBackground(): Promise<void> {
  try {
    await idbDelete(KEY);
  } catch {
    // Nothing stored or storage blocked; either way it is gone from the page.
  }
}
