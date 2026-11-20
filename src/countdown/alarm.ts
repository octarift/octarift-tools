/**
 * Sounds, generated with Web Audio (no audio files needed). Browsers only allow sound after a
 * user gesture, so primeAudio() must be called from a click/tap before anything can be heard.
 */
let ctx: AudioContext | null = null;

/** End-of-countdown alarm switched off for now (to be reworked later); set to true to bring it back. */
export const ALARM_ENABLED = false;

export function primeAudio(): void {
  try {
    ctx ??= new AudioContext();
    if (ctx.state === 'suspended') void ctx.resume();
  } catch {
    ctx = null;
  }
}

/** One soft sine beep starting `delay` seconds from now. */
function beep(frequency: number, delay: number, length: number, volume = 0.25): void {
  if (!ctx || ctx.state !== 'running') return;
  const start = ctx.currentTime + delay;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sine';
  osc.frequency.value = frequency;
  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(volume, start + 0.015);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + length);
  osc.connect(gain).connect(ctx.destination);
  osc.start(start);
  osc.stop(start + length + 0.02);
}

export function playAlarm(): void {
  if (!ALARM_ENABLED) return;
  for (let i = 0; i < 6; i++) beep(i % 2 ? 660 : 880, i * 0.35, 0.3, 0.3);
}

/**
 * Short cues for Pomodoro and interval phases:
 * - work: two rising beeps (go!),
 * - rest: one lower beep,
 * - tick: a short click for the last three seconds of an interval phase,
 * - end: three beeps when the workout is over.
 */
export type Cue = 'work' | 'rest' | 'tick' | 'end';

export function playCue(cue: Cue): void {
  switch (cue) {
    case 'work':
      beep(880, 0, 0.18);
      beep(1175, 0.2, 0.3);
      break;
    case 'rest':
      beep(587, 0, 0.45);
      break;
    case 'tick':
      beep(660, 0, 0.08, 0.18);
      break;
    case 'end':
      for (let i = 0; i < 3; i++) beep(i === 2 ? 1175 : 880, i * 0.28, 0.24);
      break;
  }
}
