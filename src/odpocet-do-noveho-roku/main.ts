import '@shared/styles/base.css';
import '@shared/styles/text-page.css';
import '../countdown/countdown.css';
import '@shared/styles/holiday-page.css';
import { site } from '@shared/config';
import { lang, setMetaDescription } from '@shared/i18n';
import { mountSiteChrome } from '@shared/site-chrome';
import { pad, splitMs } from '../countdown/timer';
import { calendarDaysUntil, newYearInfo } from './newyear';
import { s } from './strings';

mountSiteChrome();

function $<T extends HTMLElement = HTMLElement>(selector: string): T {
  const el = document.querySelector<T>(selector);
  if (!el) throw new Error(`Missing element: ${selector}`);
  return el;
}

const els = {
  heading: $('#ny-heading'),
  stageTitle: $('#ny-stage-title'),
  digits: $('#ny-digits'),
  happy: $('#ny-happy'),
  lead: $('#ny-lead'),
  open: $<HTMLAnchorElement>('#ny-open'),
  share: $<HTMLButtonElement>('#ny-share'),
  text: $('#ny-text'),
  toast: $('#toast'),
};

let info = newYearInfo(new Date());

const fill = (text: string, values: Record<string, string | number>) =>
  text.replace(/\{(\w+)\}/g, (m, key: string) => (key in values ? String(values[key]) : m));
const plural = new Intl.PluralRules(lang);
const form = (forms: { one: string; few: string; many: string }, n: number) => {
  const rule = plural.select(n);
  return (rule === 'one' ? forms.one : rule === 'few' ? forms.few : forms.many).replace('{n}', String(n));
};
const dateText = (d: Date, options: Intl.DateTimeFormatOptions) => d.toLocaleDateString(lang, options);

/** Link to the full countdown with the fireworks preset (fullscreen, other themes, own title). */
function countdownLink(): string {
  const url = new URL('/countdown/', location.origin);
  url.searchParams.set('to', info.target.toISOString());
  url.searchParams.set('t', s.appTitle);
  url.searchParams.set('theme', 'newyear');
  url.searchParams.set('lang', lang);
  return url.pathname + url.search;
}

/** Everything that depends on the year and the day (rebuilt when either changes). */
function renderTexts(now: Date): void {
  const year = info.year;
  const old = year - 1;
  document.documentElement.lang = lang;
  document.title = `${fill(s.pageTitle, { year })} | ${site.name}`;
  setMetaDescription(fill(s.metaDescription, { year, old }));
  els.heading.textContent = fill(s.heading, { year });
  els.stageTitle.textContent = s.stageTitle;
  els.happy.textContent = fill(s.happy, { year });
  els.open.textContent = s.open;
  els.share.textContent = s.share;
  els.open.href = countdownLink();

  els.lead.textContent = info.celebrating
    ? s.leadHappy
    : fill(s.lead, {
        old,
        weekday: dateText(info.eve, { weekday: 'long' }),
        date: dateText(info.eve, { day: 'numeric', month: 'long' }),
      });

  const days = calendarDaysUntil(now, info.eve);
  const rule = plural.select(days);
  const left = s.daysLeft;
  const daysLeft = days <= 0 ? left.zero : fill(rule === 'one' ? left.one : rule === 'few' ? left.few : left.many, { days });
  const fullWeeks = Math.floor(days / 7);
  const restDays = days % 7;
  const weeks =
    fullWeeks > 0
      ? fill(s.weeks, { weeks: form(s.weeksForms, fullWeeks) + (restDays ? s.and + form(s.daysForms, restDays) : '') })
      : '';
  els.text.innerHTML = fill(s.body, {
    year,
    old,
    daysLeft,
    weeks,
    eve: dateText(info.eve, s.dateFormat),
    newYearDay: dateText(info.target, s.dateFormat),
  });
}

let lastKey = '';

function renderDigits(ms: number): void {
  const p = splitMs(ms);
  const units: Array<[string, string]> = [
    [String(p.days), s.units.days],
    [pad(p.hours), s.units.hours],
    [pad(p.minutes), s.units.minutes],
    [pad(p.seconds), s.units.seconds],
  ];
  const key = units.map((u) => u[0]).join(':');
  if (key === lastKey) return;
  lastKey = key;
  els.digits.dataset.units = '4';
  els.digits.setAttribute('aria-label', `${p.days} ${s.units.days} ${pad(p.hours)}:${pad(p.minutes)}:${pad(p.seconds)}`);
  els.digits.innerHTML = units
    .map(
      ([value, label], i) =>
        `${i ? '<span class="digits__sep" aria-hidden="true">:</span>' : ''}` +
        `<span class="unit"><span class="unit__value">${[...value].map((c) => `<span class="digit">${c}</span>`).join('')}</span>` +
        `<span class="unit__label">${label}</span></span>`,
    )
    .join('');
}

let textDay = '';

function tick(): void {
  const now = new Date();
  // At midnight the page switches to "Happy New Year"; on 2 January it moves on to the next one.
  const next = newYearInfo(now);
  const dayKey = `${next.year}|${next.celebrating}|${now.toDateString()}`;
  if (dayKey !== textDay) {
    info = next;
    textDay = dayKey;
    renderTexts(now);
  }
  els.happy.hidden = !info.celebrating;
  els.digits.hidden = info.celebrating;
  if (!info.celebrating) renderDigits(info.target.getTime() - now.getTime());
  const msLeft = info.target.getTime() - Date.now();
  window.setTimeout(tick, info.celebrating ? 60_000 : (msLeft % 1000 || 1000) + 5);
}

document.addEventListener('visibilitychange', () => {
  if (!document.hidden) {
    lastKey = '';
    renderDigits(Math.max(0, info.target.getTime() - Date.now()));
  }
});

els.share.addEventListener('click', async () => {
  const url = `${location.origin}${location.pathname}?lang=${lang}`;
  try {
    await navigator.clipboard.writeText(url);
    toast(s.copied);
  } catch {
    window.prompt(s.copyPrompt, url);
  }
});

let toastTimer = 0;
function toast(message: string): void {
  els.toast.textContent = message;
  els.toast.hidden = false;
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => (els.toast.hidden = true), 2400);
}

tick();
