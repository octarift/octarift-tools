/**
 * Keeps the screen from sleeping. Several parts of a page can ask for it at once (a running
 * countdown, fullscreen, fill window): each gets its own control, and the screen stays on while
 * any of them is enabled.
 *
 * The browser drops the lock when the tab is hidden (and may drop it at other moments), so it is
 * requested again when the tab becomes visible or the lock is released while still wanted.
 */
export interface WakeLockControl {
  enable(): Promise<void>;
  disable(): Promise<void>;
}

const holders = new Set<symbol>();
let sentinel: WakeLockSentinel | null = null;
let pending: Promise<void> | null = null;
let listening = false;

const wanted = () => holders.size > 0;

function acquire(): Promise<void> {
  if (!wanted() || sentinel || !('wakeLock' in navigator) || document.visibilityState !== 'visible') {
    return Promise.resolve();
  }
  pending ??= (async () => {
    try {
      const lock = await navigator.wakeLock.request('screen');
      // Nobody needs it any more (disabled while the request was running).
      if (!wanted()) {
        await lock.release().catch(() => undefined);
        return;
      }
      sentinel = lock;
      lock.addEventListener('release', () => {
        if (sentinel === lock) sentinel = null;
        void acquire();
      });
    } catch {
      // Not allowed right now (hidden tab, battery saver…). Not critical.
    } finally {
      pending = null;
    }
  })();
  return pending;
}

/** A switch for one reason to keep the screen on, e.g. "the countdown is running". */
export function createWakeLock(): WakeLockControl {
  const id = Symbol('wake-lock');
  if (!listening) {
    listening = true;
    document.addEventListener('visibilitychange', () => void acquire());
  }
  return {
    async enable() {
      holders.add(id);
      await acquire();
    },
    async disable() {
      if (!holders.delete(id) || wanted() || !sentinel) return;
      const current = sentinel;
      sentinel = null;
      await current.release().catch(() => undefined);
    },
  };
}
