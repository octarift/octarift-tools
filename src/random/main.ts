import '@shared/styles/base.css';
import './random.css';
import { createFullscreen } from '@shared/fullscreen';
import { applyStrings, lang, setMetaDescription } from '@shared/i18n';
import { mountSiteChrome } from '@shared/site-chrome';
import { readJSON, writeJSON } from '@shared/storage';
import { parseNames, pick, randomBelow, randomNumbers, rollDice, shuffle, splitIntoTeams, teamsForSize } from './rng';
import { s, type Mode } from './strings';
import { Wheel } from './wheel';

applyStrings(s);
setMetaDescription(s.metaDescription);
document.title = `${s.pageTitle} – Octarift Tools`;
mountSiteChrome('random');

function $<T extends Element = HTMLElement>(selector: string): T {
  const el = document.querySelector<T>(selector);
  if (!el) throw new Error(`Missing element: ${selector}`);
  return el;
}

const els = {
  modes: $('#rnd-modes'),
  hint: $('#rnd-mode-hint'),
  names: $<HTMLTextAreaElement>('#rnd-names'),
  namesCount: $('#rnd-names-count'),
  pickCount: $<HTMLInputElement>('#rnd-pick-count'),
  wheel: $<HTMLInputElement>('#rnd-wheel'),
  remove: $<HTMLInputElement>('#rnd-remove'),
  teamsBy: $('#f-teams-by'),
  teamLabel: $('#rnd-team-label'),
  teamValue: $<HTMLInputElement>('#rnd-team-value'),
  diceCount: $<HTMLInputElement>('#rnd-dice-count'),
  diceSidesBox: $('#f-dice-sides'),
  diceSides: $<HTMLInputElement>('#rnd-dice-sides'),
  numMin: $<HTMLInputElement>('#rnd-num-min'),
  numMax: $<HTMLInputElement>('#rnd-num-max'),
  numCount: $<HTMLInputElement>('#rnd-num-count'),
  numUnique: $<HTMLInputElement>('#rnd-num-unique'),
  numSort: $<HTMLInputElement>('#rnd-num-sort'),
  coinHeads: $<HTMLInputElement>('#rnd-coin-heads'),
  coinTails: $<HTMLInputElement>('#rnd-coin-tails'),
  historyTitle: $('.rnd-history__title'),
  error: $('#rnd-error'),
  stage: $('#rnd-stage'),
  result: $('#rnd-result'),
  wheelSvg: $<SVGSVGElement>('#rnd-wheel-svg'),
  go: $<HTMLButtonElement>('#rnd-go'),
  copy: $<HTMLButtonElement>('#rnd-copy'),
  fullscreen: $<HTMLButtonElement>('#rnd-fullscreen'),
  history: $('#rnd-history'),
  historyList: $('#rnd-history-list'),
  historyClear: $<HTMLButtonElement>('#rnd-history-clear'),
  toast: $('#toast'),
};

/** Which form fields each mode shows (ids of their wrappers). */
const FIELDS: Record<Mode, string[]> = {
  pick: ['f-names', 'f-pick-count', 'f-pick-options'],
  teams: ['f-names', 'f-teams-by', 'f-team-value'],
  order: ['f-names'],
  dice: ['f-dice-count', 'f-dice-sides'],
  coin: ['f-coin'],
  number: ['f-num-min', 'f-num-max', 'f-num-count', 'f-num-options'],
};
const MODES = Object.keys(FIELDS) as Mode[];
const ALL_FIELDS = [...new Set(Object.values(FIELDS).flat())];

/* ---------- Settings (remembered in this browser, names included) ---------- */

interface Settings {
  mode: Mode;
  names: string;
  pickCount: number;
  wheel: boolean;
  remove: boolean;
  teamsBy: 'count' | 'size';
  teamValue: number;
  diceCount: number;
  diceSides: number;
  numMin: number;
  numMax: number;
  numCount: number;
  numUnique: boolean;
  numSort: boolean;
  /** Custom names of the coin sides; empty = Heads / Tails. */
  coinHeads: string;
  coinTails: string;
}

const SETTINGS_KEY = 'random:settings:v1';
const DEFAULTS: Settings = {
  mode: 'pick',
  names: '',
  pickCount: 1,
  wheel: true,
  remove: false,
  teamsBy: 'count',
  teamValue: 2,
  diceCount: 1,
  diceSides: 6,
  numMin: 1,
  numMax: 100,
  numCount: 1,
  numUnique: true,
  numSort: false,
  coinHeads: '',
  coinTails: '',
};

function loadSettings(): Settings {
  const raw = readJSON<Partial<Settings>>(SETTINGS_KEY) ?? {};
  const out = { ...DEFAULTS };
  for (const key of Object.keys(DEFAULTS) as (keyof Settings)[]) {
    if (typeof raw[key] === typeof DEFAULTS[key]) (out as Record<string, unknown>)[key] = raw[key];
  }
  if (!MODES.includes(out.mode)) out.mode = 'pick';
  if (out.teamsBy !== 'count' && out.teamsBy !== 'size') out.teamsBy = 'count';
  return out;
}

const settings = loadSettings();
const save = () => writeJSON(SETTINGS_KEY, settings);

/** Whole number from an input, clamped; the fallback while the field is empty or invalid. */
function intFrom(input: HTMLInputElement, min: number, max: number, fallback: number): number {
  const v = Math.round(Number(input.value));
  return input.value.trim() !== '' && Number.isFinite(v) ? Math.min(max, Math.max(min, v)) : fallback;
}

/* ---------- Mode and form ---------- */

els.modes.innerHTML = MODES.map((m) => `<button type="button" class="chip" data-mode="${m}">${s.modes[m]}</button>`).join('');

const reduceMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
const wheel = new Wheel(els.wheelSvg, []);
let busy = false; // a wheel spin or roll animation is running

function names(): string[] {
  return parseNames(els.names.value);
}

/** The wheel is used for drawing a single name from at least two. */
const wheelActive = () => settings.mode === 'pick' && settings.wheel && settings.pickCount === 1 && names().length >= 2;

function renderForm(): void {
  for (const b of els.modes.querySelectorAll<HTMLButtonElement>('[data-mode]')) {
    b.setAttribute('aria-pressed', String(b.dataset.mode === settings.mode));
  }
  for (const id of ALL_FIELDS) $(`#${id}`).hidden = !FIELDS[settings.mode].includes(id);
  els.hint.textContent = s.modeHints[settings.mode];
  els.go.textContent = s.actions[settings.mode];
  const count = names().length;
  els.namesCount.textContent = s.namesCount.replace('{n}', String(count));
  // Limits that depend on other values; number-limits.ts then keeps typed values inside them.
  setMax(els.pickCount, Math.max(1, count || 999), 'pickCount');
  setMax(els.teamValue, Math.max(1, count || 100), 'teamValue');
  const range = settings.numMax - settings.numMin + 1;
  setMax(els.numCount, settings.numUnique && range > 0 ? Math.min(1000, range) : 1000, 'numCount');
  els.coinHeads.placeholder = s.heads;
  els.coinTails.placeholder = s.tails;
  for (const b of els.teamsBy.querySelectorAll<HTMLButtonElement>('[data-teams-by]')) {
    b.setAttribute('aria-pressed', String(b.dataset.teamsBy === settings.teamsBy));
  }
  els.teamLabel.textContent = settings.teamsBy === 'count' ? s.teamCount : s.teamSize;
  for (const b of els.diceSidesBox.querySelectorAll<HTMLButtonElement>('[data-sides]')) {
    b.setAttribute('aria-pressed', String(Number(b.dataset.sides) === settings.diceSides));
  }
  els.history.hidden = !hasHistory(settings.mode) || history[settings.mode].length < 2;
  renderHistory();
  syncWheel();
}

/** Sets an input's max and pulls its value (and the setting) down to it when needed. */
function setMax(input: HTMLInputElement, max: number, key: 'pickCount' | 'teamValue' | 'numCount'): void {
  input.max = String(max);
  if (settings[key] > max) {
    settings[key] = max;
    input.value = String(max);
    save();
  }
}

/** Shows the wheel (with the current names) only where it is used. */
function syncWheel(): void {
  const on = wheelActive();
  els.wheelSvg.toggleAttribute('hidden', !on);
  els.stage.classList.toggle('has-wheel', on);
  if (on && !busy) wheel.setNames(names());
}

function writeFields(): void {
  els.names.value = settings.names;
  els.pickCount.value = String(settings.pickCount);
  els.wheel.checked = settings.wheel;
  els.remove.checked = settings.remove;
  els.teamValue.value = String(settings.teamValue);
  els.diceCount.value = String(settings.diceCount);
  els.diceSides.value = [4, 6, 8, 10, 12, 20, 100].includes(settings.diceSides) ? '' : String(settings.diceSides);
  els.numMin.value = String(settings.numMin);
  els.numMax.value = String(settings.numMax);
  els.numCount.value = String(settings.numCount);
  els.numUnique.checked = settings.numUnique;
  els.numSort.checked = settings.numSort;
  els.coinHeads.value = settings.coinHeads;
  els.coinTails.value = settings.coinTails;
}

function readFields(): void {
  settings.names = els.names.value;
  settings.pickCount = intFrom(els.pickCount, 1, 999, settings.pickCount);
  settings.wheel = els.wheel.checked;
  settings.remove = els.remove.checked;
  settings.teamValue = intFrom(els.teamValue, 1, 100, settings.teamValue);
  settings.diceCount = intFrom(els.diceCount, 1, 30, settings.diceCount);
  if (els.diceSides.value.trim() !== '') settings.diceSides = intFrom(els.diceSides, 2, 1000, settings.diceSides);
  settings.numMin = intFrom(els.numMin, -1_000_000_000, 1_000_000_000, settings.numMin);
  settings.numMax = intFrom(els.numMax, -1_000_000_000, 1_000_000_000, settings.numMax);
  settings.numCount = intFrom(els.numCount, 1, 1000, settings.numCount);
  settings.numUnique = els.numUnique.checked;
  settings.numSort = els.numSort.checked;
  settings.coinHeads = els.coinHeads.value.trim();
  settings.coinTails = els.coinTails.value.trim();
}

document.querySelector('.rnd-fields')!.addEventListener('input', () => {
  readFields();
  save();
  showError('');
  renderForm();
});

els.modes.addEventListener('click', (e) => {
  const mode = (e.target as Element).closest<HTMLButtonElement>('[data-mode]')?.dataset.mode as Mode | undefined;
  if (!mode || mode === settings.mode || busy) return;
  settings.mode = mode;
  save();
  showError('');
  clearResult();
  renderForm();
});

els.teamsBy.addEventListener('click', (e) => {
  const by = (e.target as Element).closest<HTMLButtonElement>('[data-teams-by]')?.dataset.teamsBy;
  if (by !== 'count' && by !== 'size') return;
  settings.teamsBy = by;
  save();
  renderForm();
});

els.diceSidesBox.addEventListener('click', (e) => {
  const sides = Number((e.target as Element).closest<HTMLButtonElement>('[data-sides]')?.dataset.sides);
  if (!sides) return;
  settings.diceSides = sides;
  els.diceSides.value = '';
  save();
  renderForm();
});

/* ---------- Results ---------- */

const escapeHtml = (text: string) =>
  text.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c] ?? c);

let resultText = ''; // plain text for "Copy result"

function setResult(html: string, text: string): void {
  els.result.innerHTML = html;
  resultText = text;
  els.copy.disabled = !text;
}

function clearResult(): void {
  setResult(`<p class="rnd-result__empty">${s.stageEmpty}</p>`, '');
}

function showError(message: string): void {
  els.error.textContent = message;
  els.error.hidden = !message;
}

/** A numbered list of names (winners, order). */
const numberedList = (items: string[]) =>
  `<ol class="rnd-list">${items.map((n) => `<li>${escapeHtml(n)}</li>`).join('')}</ol>`;

/** Dice face: pips for six-sided dice, the number for others. */
function dieHtml(value: number, sides: number): string {
  if (sides !== 6) return `<span class="die die--number" data-sides="${sides}">${value}</span>`;
  // Pip positions on a 3 × 3 grid, numbered 1–9 from the top left.
  const pips: Record<number, number[]> = { 1: [5], 2: [3, 7], 3: [3, 5, 7], 4: [1, 3, 7, 9], 5: [1, 3, 5, 7, 9], 6: [1, 3, 4, 6, 7, 9] };
  const cells = Array.from({ length: 9 }, (_, i) => `<i${pips[value]!.includes(i + 1) ? ' class="pip"' : ''}></i>`).join('');
  return `<span class="die die--pips" role="img" aria-label="${value}">${cells}</span>`;
}

/* ---------- History (dice and coin, this visit only) ---------- */

type HistoryMode = 'pick' | 'number' | 'dice' | 'coin';
const hasHistory = (m: Mode): m is HistoryMode => m === 'pick' || m === 'number' || m === 'dice' || m === 'coin';
const history: Record<HistoryMode, string[]> = { pick: [], number: [], dice: [], coin: [] };
const tally = { heads: 0, tails: 0 };

function addHistory(mode: HistoryMode, entry: string): void {
  history[mode].unshift(entry);
  history[mode].length = Math.min(history[mode].length, 50);
}

function renderHistory(): void {
  if (!hasHistory(settings.mode)) return;
  els.historyTitle.textContent = settings.mode === 'pick' || settings.mode === 'number' ? s.historyDraws : s.history;
  // The newest entry is the result on the stage; the list shows the ones before it.
  const older = history[settings.mode].slice(1);
  els.history.hidden = older.length === 0;
  els.historyList.setAttribute('start', String(older.length));
  els.historyList.innerHTML = older.map((h) => `<li>${escapeHtml(h)}</li>`).join('');
}

els.historyClear.addEventListener('click', () => {
  if (!hasHistory(settings.mode)) return;
  history[settings.mode] = history[settings.mode].slice(0, 1);
  if (settings.mode === 'coin') {
    tally.heads = 0;
    tally.tails = 0;
  }
  renderHistory();
});

/** Restarts a CSS animation on the result (shake for dice, flip for the coin), unless motion is reduced. */
function animate(className: string, ms: number): Promise<void> {
  if (reduceMotion()) return Promise.resolve();
  els.result.classList.remove(className);
  void els.result.offsetWidth; // restart the animation
  els.result.classList.add(className);
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

/**
 * A coin with both faces in 3D. It spins several half turns; each half turn shows the other face, so the
 * result stays open until the coin settles. The final angle is set by the result (decided beforehand).
 */
/** "Hlava 2× · Orel 1×" with the current side names. */
const tallyText = (headsName: string, tailsName: string) =>
  s.tally
    .replace('{heads}', headsName)
    .replace('{tails}', tailsName)
    .replace('{h}', String(tally.heads))
    .replace('{t}', String(tally.tails));

async function flipCoin(heads: boolean, headsName: string, tailsName: string): Promise<void> {
  const coin = (side: 'heads' | 'tails', name: string) =>
    `<span class="coin__face coin__face--${side}"><span>${escapeHtml(name)}</span></span>`;
  // The tally stays in place (with the previous counts) while the coin is in the air, so nothing below moves.
  els.result.innerHTML =
    `<div class="coin-toss"><div class="coin3d">${coin('heads', headsName)}${coin('tails', tailsName)}</div></div>` +
    `<p class="rnd-result__total" data-tally>${escapeHtml(tallyText(headsName, tailsName))}</p>`;
  const disc = els.result.querySelector<HTMLElement>('.coin3d')!;
  // Whole turns end on heads, an extra half turn on tails.
  const end = 360 * 6 + (heads ? 0 : 180);
  if (reduceMotion()) {
    disc.style.transform = `rotateY(${end}deg)`;
    return;
  }
  disc.style.transform = 'rotateY(0deg)';
  void disc.offsetWidth;
  els.result.querySelector('.coin-toss')!.classList.add('is-tossing');
  disc.style.transition = 'transform 1.6s cubic-bezier(0.15, 0.55, 0.25, 1)';
  disc.style.transform = `rotateY(${end}deg)`;
  await new Promise((resolve) => window.setTimeout(resolve, 1650));
}

/* ---------- The actions ---------- */

async function go(): Promise<void> {
  if (busy) return;
  readFields();
  showError('');
  const list = names();

  switch (settings.mode) {
    case 'pick': {
      if (!list.length) return showError(s.errNoNames);
      const count = Math.min(settings.pickCount, list.length);
      let winners: string[];
      if (wheelActive()) {
        const index = randomBelow(list.length);
        winners = [list[index]!];
        busy = true;
        els.go.disabled = true;
        // Same lines as the final result (label + name), so the button below does not jump when it lands.
        setResult(`<p class="rnd-result__label">${s.winner}</p><p class="rnd-result__big rnd-result__spinning">…</p>`, '');
        wheel.setNames(list);
        await wheel.spin(index, randomBelow(1000) / 1000, reduceMotion());
        busy = false;
        els.go.disabled = false;
      } else {
        winners = pick(list, count);
      }
      setResult(
        winners.length === 1
          ? `<p class="rnd-result__label">${s.winner}</p><p class="rnd-result__big">${escapeHtml(winners[0]!)}</p>`
          : `<p class="rnd-result__label">${s.winners}</p>${numberedList(winners)}`,
        winners.join('\n'),
      );
      addHistory('pick', winners.join(', '));
      if (settings.remove) {
        // Remove one occurrence of each winner, keeping the rest of the list as typed.
        const left = [...list];
        for (const w of winners) left.splice(left.indexOf(w), 1);
        els.names.value = left.join('\n');
        settings.names = els.names.value;
        save();
        toast(s.removedToast);
      }
      break;
    }
    case 'teams': {
      if (!list.length) return showError(s.errNoNames);
      const teams = settings.teamsBy === 'count' ? settings.teamValue : teamsForSize(list.length, settings.teamValue);
      if (teams > list.length) return showError(s.errTeams);
      const result = splitIntoTeams(list, teams);
      const label = (i: number) => s.team.replace('{n}', String(i + 1));
      setResult(
        `<div class="rnd-teams">${result
          .map((t, i) => `<section class="rnd-team"><h3>${label(i)}</h3>${numberedList(t)}</section>`)
          .join('')}</div>`,
        result.map((t, i) => `${label(i)}\n${t.join('\n')}`).join('\n\n'),
      );
      break;
    }
    case 'order': {
      if (!list.length) return showError(s.errNoNames);
      const order = shuffle(list);
      setResult(numberedList(order), order.map((n, i) => `${i + 1}. ${n}`).join('\n'));
      break;
    }
    case 'dice': {
      const values = rollDice(settings.diceCount, settings.diceSides);
      const total = values.reduce((a, b) => a + b, 0);
      const text = values.length > 1 ? `${values.join(' + ')} = ${total}` : String(total);
      busy = true;
      setResult(
        `<div class="rnd-dice">${values.map((v) => dieHtml(v, settings.diceSides)).join('')}</div>` +
          (values.length > 1 ? `<p class="rnd-result__total">${s.total.replace('{total}', String(total))}</p>` : ''),
        text,
      );
      addHistory('dice', `${values.length}d${settings.diceSides}: ${text}`);
      await animate('is-rolling', 550);
      busy = false;
      break;
    }
    case 'coin': {
      const heads = randomBelow(2) === 0;
      const headsName = settings.coinHeads || s.heads;
      const tailsName = settings.coinTails || s.tails;
      const face = heads ? headsName : tailsName;
      busy = true;
      els.go.disabled = true;
      await flipCoin(heads, headsName, tailsName);
      if (heads) tally.heads++;
      else tally.tails++;
      els.result.querySelector('[data-tally]')!.textContent = tallyText(headsName, tailsName);
      resultText = face;
      els.copy.disabled = false;
      addHistory('coin', face);
      busy = false;
      els.go.disabled = false;
      break;
    }
    case 'number': {
      const { numMin: min, numMax: max, numCount: count, numUnique: unique } = settings;
      if (min > max) return showError(s.errRange);
      if (unique && count > max - min + 1) return showError(s.errUniqueRange);
      const nums = randomNumbers(min, max, count, unique);
      if (settings.numSort) nums.sort((a, b) => a - b);
      const shown = nums.map((n) => n.toLocaleString(lang));
      setResult(
        nums.length === 1
          ? `<p class="rnd-result__big">${shown[0]}</p>`
          : `<p class="rnd-result__numbers">${shown.map((n) => `<span>${n}</span>`).join('')}</p>`,
        nums.join(', '),
      );
      addHistory('number', shown.join(', '));
      break;
    }
  }
  renderForm();
}

els.go.addEventListener('click', () => void go());

els.copy.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(resultText);
    toast(s.copied);
  } catch {
    toast(s.copyFailed);
  }
});

/* ---------- Fullscreen and keys ---------- */

const fullscreen = createFullscreen(els.stage, (on) => {
  document.body.classList.toggle('is-fullscreen', on);
  els.fullscreen.textContent = on ? s.exitFullscreen : s.fullscreen;
});
document.querySelectorAll<HTMLButtonElement>('[data-action="fullscreen"]').forEach((b) =>
  b.addEventListener('click', () => void fullscreen.toggle()),
);

document.addEventListener('keydown', (e) => {
  if (e.target instanceof Element && e.target.closest('input, textarea, select, button, [contenteditable]')) return;
  if (e.ctrlKey || e.metaKey || e.altKey) return;
  if (e.key === ' ' || e.key === 'Enter') {
    e.preventDefault();
    void go();
  } else if (e.key === 'f' || e.key === 'F') {
    void fullscreen.toggle();
  } else if (e.key === 'Escape' && fullscreen.isOn()) {
    void fullscreen.exit();
  }
});

let toastTimer = 0;
function toast(message: string): void {
  els.toast.textContent = message;
  els.toast.hidden = false;
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => (els.toast.hidden = true), 2400);
}

/* ---------- init ---------- */

writeFields();
clearResult();
renderForm();
