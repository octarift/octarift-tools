/**
 * Fullscreen for one element. Falls back to a CSS "pseudo fullscreen"
 * (body.pseudo-fullscreen) where the Fullscreen API is missing, e.g. iPhone Safari.
 */
export interface FullscreenControl {
  toggle(): Promise<void>;
  exit(): Promise<void>;
  isOn(): boolean;
}

export function createFullscreen(el: HTMLElement, onChange: (on: boolean) => void): FullscreenControl {
  const native = document.fullscreenEnabled && typeof el.requestFullscreen === 'function';
  let pseudo = false;

  const isOn = () => document.fullscreenElement === el || pseudo;

  function setPseudo(on: boolean) {
    pseudo = on;
    document.body.classList.toggle('pseudo-fullscreen', on);
  }

  if (native) {
    document.addEventListener('fullscreenchange', () => {
      // Native fullscreen arrived late, after the fallback had already kicked in.
      if (document.fullscreenElement === el && pseudo) setPseudo(false);
      onChange(isOn());
    });
  }

  async function enter() {
    if (native) {
      try {
        // Some embedded browsers never settle this promise, so give up after a moment.
        await Promise.race([
          el.requestFullscreen({ navigationUI: 'hide' }),
          new Promise((_, reject) => setTimeout(() => reject(new Error('fullscreen timeout')), 1000)),
        ]);
        return;
      } catch {
        if (document.fullscreenElement === el) return;
        // Refused or no answer (e.g. inside an iframe): use the CSS fallback.
      }
    }
    setPseudo(true);
    onChange(true);
  }

  async function exit() {
    if (document.fullscreenElement) {
      await document.exitFullscreen().catch(() => undefined);
    } else if (pseudo) {
      setPseudo(false);
      onChange(false);
    }
  }

  return {
    toggle: () => (isOn() ? exit() : enter()),
    exit,
    isOn,
  };
}
