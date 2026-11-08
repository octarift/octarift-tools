/**
 * Keeps the screen from sleeping while enabled. The browser drops the lock
 * when the tab is hidden, so it is re-acquired when the tab becomes visible.
 */
export interface WakeLockControl {
  enable(): Promise<void>;
  disable(): Promise<void>;
}

export function createWakeLock(): WakeLockControl {
  let sentinel: WakeLockSentinel | null = null;
  let wanted = false;

  async function acquire() {
    if (!('wakeLock' in navigator) || sentinel) return;
    try {
      sentinel = await navigator.wakeLock.request('screen');
      sentinel.addEventListener('release', () => {
        sentinel = null;
      });
    } catch {
      // Not allowed right now (hidden tab, battery saver…). Not critical.
    }
  }

  document.addEventListener('visibilitychange', () => {
    if (wanted && document.visibilityState === 'visible') void acquire();
  });

  return {
    async enable() {
      wanted = true;
      await acquire();
    },
    async disable() {
      wanted = false;
      const current = sentinel;
      sentinel = null;
      await current?.release().catch(() => undefined);
    },
  };
}
