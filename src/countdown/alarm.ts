/**
 * End-of-countdown sound, generated with Web Audio (no audio file needed).
 * Browsers only allow sound after a user gesture, so primeAudio() must be
 * called from a click/tap before playAlarm() can be heard.
 */
let ctx: AudioContext | null = null;

/** Sound switched off for now (to be reworked later); set to true to bring the beeps back. */
export const ALARM_ENABLED = false;

export function primeAudio(): void {
  if (!ALARM_ENABLED) return;
  try {
    ctx ??= new AudioContext();
    if (ctx.state === 'suspended') void ctx.resume();
  } catch {
    ctx = null;
  }
}

export function playAlarm(): void {
  if (!ALARM_ENABLED || !ctx || ctx.state !== 'running') return;
  const now = ctx.currentTime;
  for (let i = 0; i < 6; i++) {
    const start = now + i * 0.35;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.value = i % 2 ? 660 : 880;
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(0.3, start + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.3);
    osc.connect(gain).connect(ctx.destination);
    osc.start(start);
    osc.stop(start + 0.32);
  }
}
