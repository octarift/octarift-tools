import { tr } from '@shared/i18n';

/**
 * Christmas countdown page. Placeholders: {year}, {days}, {date}, {weekday}. The HTML parts are trusted text
 * written here, set with innerHTML after the placeholders are filled with computed values.
 */
const cs = {
  pageTitle: 'Odpočet do Vánoc {year} – kolik dní zbývá do Vánoc',
  metaDescription:
    'Kolik dní zbývá do Vánoc? Živý odpočet do Štědrého dne {year} s vánočním motivem, na celou obrazovku. Kdy jsou Vánoce a advent {year}.',
  heading: 'Odpočet do Vánoc {year}',
  merry: 'Veselé Vánoce!',
  /** Default day in Czech: Christmas Eve. */
  defaultDay: 24,
  dayChoice: 'Odpočítávat do',
  byDay: {
    24: {
      choice: 'Štědrý den (24. 12.)',
      stageTitle: 'Do Štědrého dne',
      lead: 'Štědrý den {year} připadá na {weekday} {date}.',
      appTitle: 'Do Štědrého dne',
      daysLeft: {
        one: 'Štědrý den bude <strong>zítra</strong>.',
        few: 'Štědrý den bude <strong>za {days} dny</strong>.',
        many: 'Štědrý den bude <strong>za {days} dní</strong>.',
        zero: 'Štědrý den je <strong>dnes</strong>.',
      },
    },
    25: {
      choice: 'Boží hod (25. 12.)',
      stageTitle: 'Do Božího hodu vánočního',
      lead: 'Boží hod vánoční {year} připadá na {weekday} {date}.',
      appTitle: 'Do Božího hodu',
      daysLeft: {
        one: 'Boží hod vánoční bude <strong>zítra</strong>.',
        few: 'Boží hod vánoční bude <strong>za {days} dny</strong>.',
        many: 'Boží hod vánoční bude <strong>za {days} dní</strong>.',
        zero: 'Boží hod vánoční je <strong>dnes</strong>.',
      },
    },
  },
  units: { days: 'dní', hours: 'hod', minutes: 'min', seconds: 'sek' },
  leadMerry: 'Krásné svátky! Odpočet k dalším Vánocům se spustí 27. prosince.',
  open: 'Otevřít na celou obrazovku',
  share: 'Sdílet odkaz',
  copied: 'Odkaz zkopírován.',
  copyPrompt: 'Zkopírujte odkaz:',
  weeks: ' Tedy {weeks}.',
  weeksForms: { one: '{n} týden', few: '{n} týdny', many: '{n} týdnů' },
  daysForms: { one: '{n} den', few: '{n} dny', many: '{n} dní' },
  and: ' a ',
  body: `
<h2>Kolik dní zbývá do Vánoc</h2>
<p>{daysLeft}{weeks} Odpočet nahoře ukazuje přesný zbývající čas až na sekundy a vždy se řídí skutečným časem,
takže sedí i po zavření a novém otevření stránky.</p>

<h2>Kdy jsou Vánoce {year}</h2>
<ul>
  <li><strong>Štědrý den:</strong> {d24}</li>
  <li><strong>1. svátek vánoční (Boží hod):</strong> {d25}</li>
  <li><strong>2. svátek vánoční (sv. Štěpán):</strong> {d26}</li>
</ul>
<p>Všechny tři dny jsou v Česku státním svátkem, v obchodech se ale 24. prosince prodává do poledne.</p>

<h2>Advent {year}</h2>
<p>Advent začíná čtvrtou nedělí před Božím hodem vánočním. Letos připadají adventní neděle na tato data:</p>
<ul>
  <li><strong>1. adventní neděle:</strong> {a1}</li>
  <li><strong>2. adventní neděle:</strong> {a2}</li>
  <li><strong>3. adventní neděle:</strong> {a3}</li>
  <li><strong>4. adventní neděle:</strong> {a4}</li>
</ul>

<h2>Tipy</h2>
<ul>
  <li><strong>Na celou obrazovku:</strong> odpočet si pusťte na televizi, ve třídě nebo v kanceláři. Tlačítko nahoře
    ho otevře se vším nastavením, včetně motivu Vánoční stromeček nebo vlastního obrázku na pozadí.</li>
  <li><strong>Pošlete ho rodině:</strong> odkaz otevře stejný odpočet i na jiném zařízení.</li>
  <li><strong>Silvestr:</strong> hned po Vánocích se hodí <a href="{newYearLink}">odpočet do Nového roku</a>.</li>
</ul>
`,
  dateFormat: { weekday: 'long', day: 'numeric', month: 'long' } as Intl.DateTimeFormatOptions,
};

const en: typeof cs = {
  pageTitle: 'Christmas Countdown {year} – how many days until Christmas',
  metaDescription:
    'How many days until Christmas? A live countdown to Christmas Day {year} with a festive theme, fullscreen ready. Christmas and Advent {year} dates.',
  heading: 'Christmas Countdown {year}',
  merry: 'Merry Christmas!',
  /** Default day in English (Christmas Eve for browsers from countries that celebrate on the 24th, see main.ts). */
  defaultDay: 25,
  dayChoice: 'Count down to',
  byDay: {
    24: {
      choice: 'Christmas Eve (24 Dec)',
      stageTitle: 'Until Christmas Eve',
      lead: 'Christmas Eve {year} falls on {weekday}, {date}.',
      appTitle: 'Until Christmas Eve',
      daysLeft: {
        one: 'Christmas Eve is <strong>tomorrow</strong>.',
        few: 'Christmas Eve is <strong>in {days} days</strong>.',
        many: 'Christmas Eve is <strong>in {days} days</strong>.',
        zero: 'Christmas Eve is <strong>today</strong>.',
      },
    },
    25: {
      choice: 'Christmas Day (25 Dec)',
      stageTitle: 'Until Christmas',
      lead: 'Christmas Day {year} falls on {weekday}, {date}.',
      appTitle: 'Until Christmas',
      daysLeft: {
        one: 'Christmas is <strong>tomorrow</strong>.',
        few: 'Christmas is <strong>in {days} days</strong>.',
        many: 'Christmas is <strong>in {days} days</strong>.',
        zero: 'Christmas is <strong>today</strong>.',
      },
    },
  },
  units: { days: 'days', hours: 'hrs', minutes: 'min', seconds: 'sec' },
  leadMerry: 'Happy holidays! The countdown to next Christmas starts on 27 December.',
  open: 'Open fullscreen',
  share: 'Share link',
  copied: 'Link copied.',
  copyPrompt: 'Copy the link:',
  weeks: ' That is {weeks}.',
  weeksForms: { one: '{n} week', few: '{n} weeks', many: '{n} weeks' },
  daysForms: { one: '{n} day', few: '{n} days', many: '{n} days' },
  and: ' and ',
  body: `
<h2>How many days until Christmas</h2>
<p>{daysLeft}{weeks} The countdown above shows the exact time left to the second and always follows the real time,
so it stays right even after you close and reopen the page.</p>

<h2>When is Christmas {year}</h2>
<ul>
  <li><strong>Christmas Eve:</strong> {d24}</li>
  <li><strong>Christmas Day:</strong> {d25}</li>
  <li><strong>Boxing Day / St Stephen's Day:</strong> {d26}</li>
</ul>

<h2>Advent {year}</h2>
<p>Advent starts on the fourth Sunday before Christmas Day. This year the Advent Sundays are:</p>
<ul>
  <li><strong>First Sunday of Advent:</strong> {a1}</li>
  <li><strong>Second Sunday of Advent:</strong> {a2}</li>
  <li><strong>Third Sunday of Advent:</strong> {a3}</li>
  <li><strong>Fourth Sunday of Advent:</strong> {a4}</li>
</ul>

<h2>Tips</h2>
<ul>
  <li><strong>Go fullscreen:</strong> put the countdown on a TV, in a classroom or at the office. The button above opens
    it with all settings, including the Christmas Tree theme or your own background picture.</li>
  <li><strong>Send it to your family:</strong> the link opens the same countdown on any device.</li>
  <li><strong>New Year's Eve:</strong> right after Christmas, try the <a href="{newYearLink}">countdown to the New Year</a>.</li>
</ul>
`,
  dateFormat: { weekday: 'long', day: 'numeric', month: 'long' },
};

export const s = tr({ cs, en });
