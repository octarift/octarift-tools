import '@shared/styles/base.css';
import '@shared/styles/text-page.css';
import '../countdown/countdown.css';
import './christmas-page.css';
import { site } from '@shared/config';
import { readJSON, writeJSON } from '@shared/storage';
import { lang, setMetaDescription } from '@shared/i18n';
import { mountSiteChrome } from '@shared/site-chrome';
import { pad, splitMs } from '../countdown/timer';
import { calendarDaysUntil, christmasInfo } from './christmas';
import { s } from './strings';

mountSiteChrome();

function $<T extends HTMLElement = HTMLElement>(selector: string): T {
  const el = document.querySelector<T>(selector);
  if (!el) throw new Error(`Missing element: ${selector}`);
  return el;
}

const els = {
  heading: $('#xmas-heading'),
  stageTitle: $('#xmas-stage-title'),
  digits: $('#xmas-digits'),
  merry: $('#xmas-merry'),
  lead: $('#xmas-lead'),
  days: $('#xmas-days'),
  open: $<HTMLAnchorElement>('#xmas-open'),
  share: $<HTMLButtonElement>('#xmas-share'),
  text: $('#xmas-text'),
  toast: $('#toast'),
};

type MainDay = 24 | 25;
const isDay = (v: unknown): v is MainDay => v === 24 || v === 25;
const DAY_KEY = 'christmas:day';

/**
 * Languages of countries where Christmas Eve (24 Dec) is the main day. English visitors whose browser
 * also lists one of these start with the 24th; everyone else in English with Christmas Day (25th).
 */
const EVE_LANGUAGES = /^(cs|sk|de|pl|hu|sv|nb|nn|no|da|fi|et|lv|lt|is)\b/i;

/** ?day= from a shared link, then the visitor's earlier choice, then a default for the language. */
function initialDay(): MainDay {
  const fromUrl = Number(new URLSearchParams(location.search).get('day'));
  if (isDay(fromUrl)) return fromUrl;
  const saved = readJSON<number>(DAY_KEY);
  if (isDay(saved)) return saved;
  if (s.defaultDay === 24) return 24;
  const languages = navigator.languages?.length ? navigator.languages : [navigator.language];
  return languages.some((l) => EVE_LANGUAGES.test(l)) ? 24 : 25;
}

let mainDay: MainDay = initialDay();
let info = christmasInfo(new Date(), mainDay);
const dayText = () => s.byDay[mainDay];

const fill = (text: string, values: Record<string, string | number>) =>
  text.replace(/\{(\w+)\}/g, (m, key: string) => (key in values ? String(values[key]) : m));
const plural = new Intl.PluralRules(lang);
const form = (forms: { one: string; few: string; many: string }, n: number) => {
  const rule = plural.select(n);
  return (rule === 'one' ? forms.one : rule === 'few' ? forms.few : forms.many).replace('{n}', String(n));
};
const dateText = (d: Date, options: Intl.DateTimeFormatOptions) => d.toLocaleDateString(lang, options);

/** Link to the full countdown with this Christmas preset (fullscreen, themes, sharing). */
function countdownLink(target: Date, title: string, theme: string): string {
  const url = new URL('/countdown/', location.origin);
  url.searchParams.set('to', target.toISOString());
  url.searchParams.set('t', title);
  url.searchParams.set('theme', theme);
  url.searchParams.set('lang', lang);
  return url.pathname + url.search;
}

/** Everything that depends on the year and the day (rebuilt when either changes). */
function renderTexts(now: Date): void {
  const year = info.year;
  document.documentElement.lang = lang;
  document.title = `${fill(s.pageTitle, { year })} | ${site.name}`;
  setMetaDescription(fill(s.metaDescription, { year }));
  els.heading.textContent = fill(s.heading, { year });
  els.stageTitle.textContent = dayText().stageTitle;
  els.merry.textContent = s.merry;
  els.open.textContent = s.open;
  els.share.textContent = s.share;
  els.open.href = countdownLink(info.target, dayText().appTitle, 'christmas');
  els.days.setAttribute('aria-label', s.dayChoice);
  for (const b of els.days.querySelectorAll<HTMLButtonElement>('[data-day]')) {
    const d = Number(b.dataset.day) as MainDay;
    b.textContent = s.byDay[d].choice;
    b.setAttribute('aria-pressed', String(d === mainDay));
  }

  els.lead.textContent = info.celebrating
    ? s.leadMerry
    : fill(dayText().lead, {
        year,
        weekday: dateText(info.target, { weekday: 'long' }),
        date: dateText(info.target, { day: 'numeric', month: 'long' }),
      });

  const days = calendarDaysUntil(now, info.target);
  const left = dayText().daysLeft;
  const rule = plural.select(days);
  const daysLeft = days <= 0 ? left.zero : fill(rule === 'one' ? left.one : rule === 'few' ? left.few : left.many, { days });
  const fullWeeks = Math.floor(days / 7);
  const restDays = days % 7;
  const weeks =
    fullWeeks > 0
      ? fill(s.weeks, {
          weeks: form(s.weeksForms, fullWeeks) + (restDays ? s.and + form(s.daysForms, restDays) : ''),
        })
      : '';
  const day = (d: number) => dateText(new Date(year, 11, d), s.dateFormat);
  const advent = info.advent.map((d) => dateText(d, s.dateFormat));
  const newYear = new Date(year + 1, 0, 1);
  els.text.innerHTML = fill(s.body, {
    year,
    daysLeft,
    weeks,
    d24: day(24),
    d25: day(25),
    d26: day(26),
    a1: advent[0]!,
    a2: advent[1]!,
    a3: advent[2]!,
    a4: advent[3]!,
    newYearLink: countdownLink(newYear, lang === 'cs' ? 'Do Nového roku' : 'Until New Year', 'newyear'),
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
let tickTimer = 0;

function tick(): void {
  const now = new Date();
  // Past 27 December the next Christmas takes over; texts are rebuilt once a day (or when that happens).
  const next = christmasInfo(now, mainDay);
  const dayKey = `${next.year}|${next.celebrating}|${now.toDateString()}`;
  if (dayKey !== textDay) {
    info = next;
    textDay = dayKey;
    renderTexts(now);
  }
  els.merry.hidden = !info.celebrating;
  els.digits.hidden = info.celebrating;
  if (!info.celebrating) renderDigits(info.target.getTime() - now.getTime());
  // Wake up just after the next whole second, like the countdown tool.
  const msLeft = info.target.getTime() - Date.now();
  tickTimer = window.setTimeout(tick, info.celebrating ? 60_000 : (msLeft % 1000 || 1000) + 5);
}

document.addEventListener('visibilitychange', () => {
  if (!document.hidden) {
    lastKey = '';
    renderDigits(Math.max(0, info.target.getTime() - Date.now()));
  }
});

els.share.addEventListener('click', async () => {
  const url = `${location.origin}${location.pathname}?lang=${lang}&day=${mainDay}`;
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

els.days.addEventListener('click', (e) => {
  const button = (e.target as Element).closest<HTMLButtonElement>('[data-day]');
  const day = Number(button?.dataset.day);
  if (!isDay(day) || day === mainDay) return;
  mainDay = day;
  writeJSON(DAY_KEY, day);
  textDay = ''; // rebuild all texts for the other day
  lastKey = '';
  window.clearTimeout(tickTimer);
  tick();
});

tick();
