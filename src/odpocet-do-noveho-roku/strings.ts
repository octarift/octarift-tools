import { tr } from '@shared/i18n';

/**
 * New Year countdown page. Placeholders: {year} = the new year, {old} = the year that ends, {days}, {weekday},
 * {date}. The HTML parts are trusted text written here, set with innerHTML after the placeholders are filled.
 */
const cs = {
  pageTitle: 'Odpočet do Nového roku {year} – kolik zbývá do Silvestra a půlnoci',
  metaDescription:
    'Kolik zbývá do Nového roku {year}? Živý odpočet do silvestrovské půlnoci až na sekundy, s motivem ohňostroje, na celou obrazovku. Kdy je Silvestr {old}.',
  heading: 'Odpočet do Nového roku {year}',
  stageTitle: 'Do Nového roku',
  happy: 'Šťastný nový rok {year}!',
  units: { days: 'dní', hours: 'hod', minutes: 'min', seconds: 'sek' },
  lead: 'Silvestr {old} připadá na {weekday} {date}, nový rok začne o půlnoci.',
  leadHappy: 'Ať se vám v novém roce daří! Odpočet k dalšímu Silvestru se spustí 2. ledna.',
  open: 'Otevřít na celou obrazovku',
  share: 'Sdílet odkaz',
  copied: 'Odkaz zkopírován.',
  copyPrompt: 'Zkopírujte odkaz:',
  appTitle: 'Do Nového roku',
  daysLeft: {
    one: 'Silvestr bude <strong>zítra</strong>.',
    few: 'Silvestr bude <strong>za {days} dny</strong>.',
    many: 'Silvestr bude <strong>za {days} dní</strong>.',
    zero: 'Silvestr je <strong>dnes</strong>, o půlnoci začne nový rok.',
  },
  weeks: ' Tedy {weeks}.',
  weeksForms: { one: '{n} týden', few: '{n} týdny', many: '{n} týdnů' },
  daysForms: { one: '{n} den', few: '{n} dny', many: '{n} dní' },
  and: ' a ',
  body: `
<h2>Kolik zbývá do Nového roku</h2>
<p>{daysLeft}{weeks} Odpočet nahoře ukazuje přesný čas do půlnoci až na sekundy a vždy se řídí skutečným časem
vašeho zařízení, takže sedí i po zavření a novém otevření stránky.</p>

<h2>Kdy je Silvestr {old} a Nový rok {year}</h2>
<ul>
  <li><strong>Silvestr:</strong> {eve}</li>
  <li><strong>Nový rok:</strong> {newYearDay}</li>
</ul>
<p>Nový rok je v Česku státním svátkem a zároveň Dnem obnovy samostatného českého státu. Silvestr svátkem není,
obchody ale obvykle zavírají dřív.</p>

<h2>Tipy na silvestrovskou půlnoc</h2>
<ul>
  <li><strong>Na celou obrazovku:</strong> odpočet si pusťte na televizi nebo projektoru. Tlačítko nahoře ho otevře
    se všemi motivy a s vlastním nápisem; motiv Ohňostroj má rachejtle nad nočním městem.</li>
  <li><strong>Posledních deset sekund:</strong> odpočet běží po sekundách, takže se podle něj dá společně odpočítávat
    nahlas.</li>
  <li><strong>Pošlete ho přátelům:</strong> odkaz otevře stejný odpočet na jakémkoli zařízení.</li>
  <li><strong>Ještě před tím:</strong> <a href="/odpocet-do-vanoc/?lang=cs">odpočet do Vánoc</a>.</li>
</ul>
`,
  dateFormat: { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' } as Intl.DateTimeFormatOptions,
};

const en: typeof cs = {
  pageTitle: 'New Year Countdown {year} – how long until midnight on New Year’s Eve',
  metaDescription:
    'How long until New Year {year}? A live countdown to midnight on New Year’s Eve to the second, with a fireworks theme, fullscreen ready.',
  heading: 'New Year Countdown {year}',
  stageTitle: 'Until New Year',
  happy: 'Happy New Year {year}!',
  units: { days: 'days', hours: 'hrs', minutes: 'min', seconds: 'sec' },
  lead: 'New Year’s Eve {old} falls on {weekday}, {date}; the new year begins at midnight.',
  leadHappy: 'All the best for the new year! The countdown to the next New Year’s Eve starts on 2 January.',
  open: 'Open fullscreen',
  share: 'Share link',
  copied: 'Link copied.',
  copyPrompt: 'Copy the link:',
  appTitle: 'Until New Year',
  daysLeft: {
    one: 'New Year’s Eve is <strong>tomorrow</strong>.',
    few: 'New Year’s Eve is <strong>in {days} days</strong>.',
    many: 'New Year’s Eve is <strong>in {days} days</strong>.',
    zero: 'New Year’s Eve is <strong>today</strong>; the new year begins at midnight.',
  },
  weeks: ' That is {weeks}.',
  weeksForms: { one: '{n} week', few: '{n} weeks', many: '{n} weeks' },
  daysForms: { one: '{n} day', few: '{n} days', many: '{n} days' },
  and: ' and ',
  body: `
<h2>How long until New Year</h2>
<p>{daysLeft}{weeks} The countdown above shows the exact time to midnight to the second and always follows your
device's clock, so it stays right even after you close and reopen the page.</p>

<h2>When is New Year’s Eve {old} and New Year {year}</h2>
<ul>
  <li><strong>New Year’s Eve:</strong> {eve}</li>
  <li><strong>New Year’s Day:</strong> {newYearDay}</li>
</ul>

<h2>Tips for midnight</h2>
<ul>
  <li><strong>Go fullscreen:</strong> put the countdown on a TV or projector. The button above opens it with all
    themes and your own title; the Fireworks theme has rockets bursting over a city at night.</li>
  <li><strong>The last ten seconds:</strong> the countdown ticks every second, so everyone can count down out loud.</li>
  <li><strong>Send it to friends:</strong> the link opens the same countdown on any device.</li>
  <li><strong>Before that:</strong> the <a href="/odpocet-do-vanoc/?lang=en">Christmas countdown</a>.</li>
</ul>
`,
  dateFormat: { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' },
};

export const s = tr({ cs, en });
