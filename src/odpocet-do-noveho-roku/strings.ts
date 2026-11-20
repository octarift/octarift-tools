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

const de: typeof cs = {
  pageTitle: 'Countdown bis Neujahr {year} – wie lange noch bis Mitternacht an Silvester',
  metaDescription:
    'Wie lange noch bis Neujahr {year}? Ein Live-Countdown bis Mitternacht an Silvester auf die Sekunde genau, mit Feuerwerk-Design, auch im Vollbild.',
  heading: 'Countdown bis Neujahr {year}',
  stageTitle: 'Bis Neujahr',
  happy: 'Frohes neues Jahr {year}!',
  units: { days: 'Tage', hours: 'Std.', minutes: 'Min.', seconds: 'Sek.' },
  lead: 'Silvester {old} fällt auf {weekday}, den {date}; um Mitternacht beginnt das neue Jahr.',
  leadHappy: 'Alles Gute im neuen Jahr! Der Countdown bis zum nächsten Silvester beginnt am 2. Januar.',
  open: 'Im Vollbild öffnen',
  share: 'Link teilen',
  copied: 'Link kopiert.',
  copyPrompt: 'Link kopieren:',
  appTitle: 'Bis Neujahr',
  daysLeft: {
    one: 'Silvester ist <strong>morgen</strong>.',
    few: 'Silvester ist <strong>in {days} Tagen</strong>.',
    many: 'Silvester ist <strong>in {days} Tagen</strong>.',
    zero: 'Silvester ist <strong>heute</strong>; um Mitternacht beginnt das neue Jahr.',
  },
  weeks: ' Das sind {weeks}.',
  weeksForms: { one: '{n} Woche', few: '{n} Wochen', many: '{n} Wochen' },
  daysForms: { one: '{n} Tag', few: '{n} Tage', many: '{n} Tage' },
  and: ' und ',
  body: `
<h2>Wie lange noch bis Neujahr</h2>
<p>{daysLeft}{weeks} Der Countdown oben zeigt die genaue Zeit bis Mitternacht auf die Sekunde und richtet sich immer
nach der Uhr Ihres Geräts, sodass er auch nach dem Schließen und erneuten Öffnen der Seite stimmt.</p>

<h2>Wann ist Silvester {old} und Neujahr {year}</h2>
<ul>
  <li><strong>Silvester:</strong> {eve}</li>
  <li><strong>Neujahr:</strong> {newYearDay}</li>
</ul>

<h2>Tipps für Mitternacht</h2>
<ul>
  <li><strong>Im Vollbild:</strong> Zeigen Sie den Countdown auf dem Fernseher oder Beamer. Die Schaltfläche oben
    öffnet ihn mit allen Designs und Ihrer eigenen Überschrift; im Design Feuerwerk explodieren Raketen über einer
    nächtlichen Stadt.</li>
  <li><strong>Die letzten zehn Sekunden:</strong> Der Countdown tickt jede Sekunde, sodass alle laut mitzählen können.</li>
  <li><strong>An Freunde senden:</strong> Der Link öffnet denselben Countdown auf jedem Gerät.</li>
  <li><strong>Davor:</strong> der <a href="/odpocet-do-vanoc/?lang=de">Countdown bis Weihnachten</a>.</li>
</ul>
`,
  dateFormat: { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' },
};

export const s = tr({ cs, en, de });
