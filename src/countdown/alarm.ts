/**
 * Sounds, generated with Web Audio (no audio files needed). Browsers only allow sound after a
 * user gesture, so primeAudio() must be called from a click/tap before anything can be heard.
 */
let ctx: AudioContext | null = null;

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

/** End of a timer or a countdown to a date: a rising three-note chime, played twice. */
export function playAlarm(): void {
  for (const offset of [0, 1.3]) {
    beep(784, offset, 0.35, 0.28); // G5
    beep(988, offset + 0.28, 0.35, 0.28); // B5
    beep(1319, offset + 0.56, 0.6, 0.3); // E6
  }
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
