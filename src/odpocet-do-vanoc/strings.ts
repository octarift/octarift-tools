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
      lead: 'Štědrý den {year} je {weekday} {date}.',
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
      lead: 'Boží hod vánoční {year} je {weekday} {date}.',
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

const de: typeof cs = {
  pageTitle: 'Countdown bis Weihnachten {year} – wie viele Tage noch bis Weihnachten',
  metaDescription:
    'Wie viele Tage noch bis Weihnachten? Ein Live-Countdown bis Heiligabend {year} mit festlichem Design, auch im Vollbild. Termine für Weihnachten und Advent {year}.',
  heading: 'Countdown bis Weihnachten {year}',
  merry: 'Frohe Weihnachten!',
  /** In German-speaking countries presents come on Christmas Eve. */
  defaultDay: 24,
  dayChoice: 'Countdown bis',
  byDay: {
    24: {
      choice: 'Heiligabend (24. Dez.)',
      stageTitle: 'Bis Heiligabend',
      lead: 'Heiligabend {year} fällt auf {weekday}, den {date}.',
      appTitle: 'Bis Heiligabend',
      daysLeft: {
        one: 'Heiligabend ist <strong>morgen</strong>.',
        few: 'Heiligabend ist <strong>in {days} Tagen</strong>.',
        many: 'Heiligabend ist <strong>in {days} Tagen</strong>.',
        zero: 'Heiligabend ist <strong>heute</strong>.',
      },
    },
    25: {
      choice: '1. Weihnachtstag (25. Dez.)',
      stageTitle: 'Bis Weihnachten',
      lead: 'Der 1. Weihnachtstag {year} fällt auf {weekday}, den {date}.',
      appTitle: 'Bis Weihnachten',
      daysLeft: {
        one: 'Weihnachten ist <strong>morgen</strong>.',
        few: 'Weihnachten ist <strong>in {days} Tagen</strong>.',
        many: 'Weihnachten ist <strong>in {days} Tagen</strong>.',
        zero: 'Weihnachten ist <strong>heute</strong>.',
      },
    },
  },
  units: { days: 'Tage', hours: 'Std.', minutes: 'Min.', seconds: 'Sek.' },
  leadMerry: 'Frohe Feiertage! Der Countdown bis zum nächsten Weihnachten beginnt am 27. Dezember.',
  open: 'Im Vollbild öffnen',
  share: 'Link teilen',
  copied: 'Link kopiert.',
  copyPrompt: 'Link kopieren:',
  weeks: ' Das sind {weeks}.',
  weeksForms: { one: '{n} Woche', few: '{n} Wochen', many: '{n} Wochen' },
  daysForms: { one: '{n} Tag', few: '{n} Tage', many: '{n} Tage' },
  and: ' und ',
  body: `
<h2>Wie viele Tage noch bis Weihnachten</h2>
<p>{daysLeft}{weeks} Der Countdown oben zeigt die genaue verbleibende Zeit auf die Sekunde und richtet sich immer nach
der tatsächlichen Uhrzeit, sodass er auch nach dem Schließen und erneuten Öffnen der Seite stimmt.</p>

<h2>Wann ist Weihnachten {year}</h2>
<ul>
  <li><strong>Heiligabend:</strong> {d24}</li>
  <li><strong>1. Weihnachtstag:</strong> {d25}</li>
  <li><strong>2. Weihnachtstag:</strong> {d26}</li>
</ul>

<h2>Advent {year}</h2>
<p>Der Advent beginnt am vierten Sonntag vor dem 1. Weihnachtstag. In diesem Jahr fallen die Adventssonntage auf:</p>
<ul>
  <li><strong>1. Advent:</strong> {a1}</li>
  <li><strong>2. Advent:</strong> {a2}</li>
  <li><strong>3. Advent:</strong> {a3}</li>
  <li><strong>4. Advent:</strong> {a4}</li>
</ul>

<h2>Tipps</h2>
<ul>
  <li><strong>Im Vollbild:</strong> Zeigen Sie den Countdown auf dem Fernseher, im Klassenzimmer oder im Büro. Die
    Schaltfläche oben öffnet ihn mit allen Einstellungen, einschließlich des Designs Weihnachtsbaum oder eines eigenen
    Hintergrundbilds.</li>
  <li><strong>An die Familie senden:</strong> Der Link öffnet denselben Countdown auf jedem Gerät.</li>
  <li><strong>Silvester:</strong> Gleich nach Weihnachten probieren Sie den <a href="{newYearLink}">Countdown bis Neujahr</a>.</li>
</ul>
`,
  dateFormat: { weekday: 'long', day: 'numeric', month: 'long' },
};

const es: typeof cs = {
  pageTitle: 'Cuenta atrás para Navidad {year} – cuántos días faltan para Navidad',
  metaDescription:
    '¿Cuántos días faltan para Navidad? Cuenta atrás en directo hasta el día de Navidad {year} con tema navideño, también a pantalla completa. Fechas de Navidad y Adviento {year}.',
  heading: 'Cuenta atrás para Navidad {year}',
  merry: '¡Feliz Navidad!',
  defaultDay: 25,
  dayChoice: 'Cuenta atrás hasta',
  byDay: {
    24: {
      choice: 'Nochebuena (24 dic.)',
      stageTitle: 'Hasta Nochebuena',
      lead: 'Nochebuena {year} cae el {weekday} {date}.',
      appTitle: 'Hasta Nochebuena',
      daysLeft: {
        one: 'Nochebuena es <strong>mañana</strong>.',
        few: 'Nochebuena es <strong>dentro de {days} días</strong>.',
        many: 'Nochebuena es <strong>dentro de {days} días</strong>.',
        zero: 'Nochebuena es <strong>hoy</strong>.',
      },
    },
    25: {
      choice: 'Navidad (25 dic.)',
      stageTitle: 'Hasta Navidad',
      lead: 'El día de Navidad {year} cae el {weekday} {date}.',
      appTitle: 'Hasta Navidad',
      daysLeft: {
        one: 'Navidad es <strong>mañana</strong>.',
        few: 'Navidad es <strong>dentro de {days} días</strong>.',
        many: 'Navidad es <strong>dentro de {days} días</strong>.',
        zero: 'Navidad es <strong>hoy</strong>.',
      },
    },
  },
  units: { days: 'días', hours: 'h', minutes: 'min', seconds: 's' },
  leadMerry: '¡Felices fiestas! La cuenta atrás para la próxima Navidad empieza el 27 de diciembre.',
  open: 'Abrir a pantalla completa',
  share: 'Compartir enlace',
  copied: 'Enlace copiado.',
  copyPrompt: 'Copia el enlace:',
  weeks: ' Son {weeks}.',
  weeksForms: { one: '{n} semana', few: '{n} semanas', many: '{n} semanas' },
  daysForms: { one: '{n} día', few: '{n} días', many: '{n} días' },
  and: ' y ',
  body: `
<h2>Cuántos días faltan para Navidad</h2>
<p>{daysLeft}{weeks} La cuenta atrás de arriba muestra el tiempo exacto que falta, al segundo, y sigue siempre la hora
real, así que es correcta aunque cierres la página y la vuelvas a abrir.</p>

<h2>Cuándo es Navidad {year}</h2>
<ul>
  <li><strong>Nochebuena:</strong> {d24}</li>
  <li><strong>Navidad:</strong> {d25}</li>
  <li><strong>San Esteban:</strong> {d26}</li>
</ul>

<h2>Adviento {year}</h2>
<p>El Adviento empieza el cuarto domingo antes del día de Navidad. Este año los domingos de Adviento son:</p>
<ul>
  <li><strong>Primer domingo de Adviento:</strong> {a1}</li>
  <li><strong>Segundo domingo de Adviento:</strong> {a2}</li>
  <li><strong>Tercer domingo de Adviento:</strong> {a3}</li>
  <li><strong>Cuarto domingo de Adviento:</strong> {a4}</li>
</ul>

<h2>Consejos</h2>
<ul>
  <li><strong>A pantalla completa:</strong> pon la cuenta atrás en la tele, en clase o en la oficina. El botón de arriba
    la abre con todos los ajustes, incluido el tema Árbol de Navidad o tu propia imagen de fondo.</li>
  <li><strong>Envíala a tu familia:</strong> el enlace abre la misma cuenta atrás en cualquier dispositivo.</li>
  <li><strong>Nochevieja:</strong> justo después de Navidad, prueba la <a href="{newYearLink}">cuenta atrás para Año Nuevo</a>.</li>
</ul>
`,
  dateFormat: { weekday: 'long', day: 'numeric', month: 'long' },
};

const fr: typeof cs = {
  pageTitle: 'Compte à rebours de Noël {year} – dans combien de jours est Noël',
  metaDescription:
    'Dans combien de jours est Noël ? Un compte à rebours en direct jusqu’au jour de Noël {year} avec un thème de fête, aussi en plein écran. Dates de Noël et de l’Avent {year}.',
  heading: 'Compte à rebours de Noël {year}',
  merry: 'Joyeux Noël !',
  defaultDay: 25,
  dayChoice: 'Compte à rebours jusqu’à',
  byDay: {
    24: {
      choice: 'Réveillon (24 déc.)',
      stageTitle: 'Avant le réveillon',
      lead: 'Le réveillon de Noël {year} tombe le {weekday} {date}.',
      appTitle: 'Avant le réveillon',
      daysLeft: {
        one: 'Le réveillon, c’est <strong>demain</strong>.',
        few: 'Le réveillon est <strong>dans {days} jours</strong>.',
        many: 'Le réveillon est <strong>dans {days} jours</strong>.',
        zero: 'Le réveillon, c’est <strong>aujourd’hui</strong>.',
      },
    },
    25: {
      choice: 'Noël (25 déc.)',
      stageTitle: 'Avant Noël',
      lead: 'Le jour de Noël {year} tombe le {weekday} {date}.',
      appTitle: 'Avant Noël',
      daysLeft: {
        one: 'Noël, c’est <strong>demain</strong>.',
        few: 'Noël est <strong>dans {days} jours</strong>.',
        many: 'Noël est <strong>dans {days} jours</strong>.',
        zero: 'Noël, c’est <strong>aujourd’hui</strong>.',
      },
    },
  },
  units: { days: 'jours', hours: 'h', minutes: 'min', seconds: 's' },
  leadMerry: 'Joyeuses fêtes ! Le compte à rebours jusqu’au prochain Noël reprend le 27 décembre.',
  open: 'Ouvrir en plein écran',
  share: 'Partager le lien',
  copied: 'Lien copié.',
  copyPrompt: 'Copiez le lien :',
  weeks: ' Soit {weeks}.',
  weeksForms: { one: '{n} semaine', few: '{n} semaines', many: '{n} semaines' },
  daysForms: { one: '{n} jour', few: '{n} jours', many: '{n} jours' },
  and: ' et ',
  body: `
<h2>Dans combien de jours est Noël</h2>
<p>{daysLeft}{weeks} Le compte à rebours ci-dessus indique le temps exact restant, à la seconde près, et suit toujours
l’heure réelle : il reste juste même si vous fermez puis rouvrez la page.</p>

<h2>Quand est Noël {year}</h2>
<ul>
  <li><strong>Réveillon de Noël :</strong> {d24}</li>
  <li><strong>Noël :</strong> {d25}</li>
  <li><strong>Saint-Étienne :</strong> {d26}</li>
</ul>

<h2>L’Avent {year}</h2>
<p>L’Avent commence le quatrième dimanche avant Noël. Cette année, les dimanches de l’Avent tombent :</p>
<ul>
  <li><strong>Premier dimanche de l’Avent :</strong> {a1}</li>
  <li><strong>Deuxième dimanche de l’Avent :</strong> {a2}</li>
  <li><strong>Troisième dimanche de l’Avent :</strong> {a3}</li>
  <li><strong>Quatrième dimanche de l’Avent :</strong> {a4}</li>
</ul>

<h2>Astuces</h2>
<ul>
  <li><strong>En plein écran :</strong> affichez le compte à rebours sur la télé, en classe ou au bureau. Le bouton
    ci-dessus l’ouvre avec tous les réglages, dont le thème Sapin de Noël ou votre propre image de fond.</li>
  <li><strong>Envoyez-le à votre famille :</strong> le lien ouvre le même compte à rebours sur n’importe quel appareil.</li>
  <li><strong>Réveillon du Nouvel An :</strong> juste après Noël, essayez le <a href="{newYearLink}">compte à rebours du Nouvel An</a>.</li>
</ul>
`,
  dateFormat: { weekday: 'long', day: 'numeric', month: 'long' },
};

const it: typeof cs = {
  pageTitle: 'Conto alla rovescia per Natale {year} – quanti giorni mancano a Natale',
  metaDescription:
    'Quanti giorni mancano a Natale? Un conto alla rovescia in diretta fino al giorno di Natale {year} con tema natalizio, anche a schermo intero. Date di Natale e Avvento {year}.',
  heading: 'Conto alla rovescia per Natale {year}',
  merry: 'Buon Natale!',
  defaultDay: 25,
  dayChoice: 'Conto alla rovescia fino a',
  byDay: {
    24: {
      choice: 'Vigilia (24 dic.)',
      stageTitle: 'Alla Vigilia di Natale',
      lead: 'La Vigilia di Natale {year} cade {weekday} {date}.',
      appTitle: 'Alla Vigilia di Natale',
      daysLeft: {
        one: 'La Vigilia è <strong>domani</strong>.',
        few: 'Mancano <strong>{days} giorni</strong> alla Vigilia.',
        many: 'Mancano <strong>{days} giorni</strong> alla Vigilia.',
        zero: 'La Vigilia è <strong>oggi</strong>.',
      },
    },
    25: {
      choice: 'Natale (25 dic.)',
      stageTitle: 'A Natale',
      lead: 'Il giorno di Natale {year} cade {weekday} {date}.',
      appTitle: 'A Natale',
      daysLeft: {
        one: 'Natale è <strong>domani</strong>.',
        few: 'Mancano <strong>{days} giorni</strong> a Natale.',
        many: 'Mancano <strong>{days} giorni</strong> a Natale.',
        zero: 'Natale è <strong>oggi</strong>.',
      },
    },
  },
  units: { days: 'giorni', hours: 'ore', minutes: 'min', seconds: 'sec' },
  leadMerry: 'Buone feste! Il conto alla rovescia per il prossimo Natale riparte il 27 dicembre.',
  open: 'Apri a schermo intero',
  share: 'Condividi link',
  copied: 'Link copiato.',
  copyPrompt: 'Copia il link:',
  weeks: ' Sono {weeks}.',
  weeksForms: { one: '{n} settimana', few: '{n} settimane', many: '{n} settimane' },
  daysForms: { one: '{n} giorno', few: '{n} giorni', many: '{n} giorni' },
  and: ' e ',
  body: `
<h2>Quanti giorni mancano a Natale</h2>
<p>{daysLeft}{weeks} Il conto alla rovescia qui sopra mostra il tempo esatto che manca, al secondo, e segue sempre l’ora
reale, quindi resta giusto anche se chiudi e riapri la pagina.</p>

<h2>Quando è Natale {year}</h2>
<ul>
  <li><strong>Vigilia di Natale:</strong> {d24}</li>
  <li><strong>Natale:</strong> {d25}</li>
  <li><strong>Santo Stefano:</strong> {d26}</li>
</ul>

<h2>Avvento {year}</h2>
<p>L’Avvento inizia la quarta domenica prima di Natale. Quest’anno le domeniche di Avvento sono:</p>
<ul>
  <li><strong>Prima domenica di Avvento:</strong> {a1}</li>
  <li><strong>Seconda domenica di Avvento:</strong> {a2}</li>
  <li><strong>Terza domenica di Avvento:</strong> {a3}</li>
  <li><strong>Quarta domenica di Avvento:</strong> {a4}</li>
</ul>

<h2>Consigli</h2>
<ul>
  <li><strong>A schermo intero:</strong> metti il conto alla rovescia sulla TV, in classe o in ufficio. Il pulsante qui
    sopra lo apre con tutte le impostazioni, compreso il tema Albero di Natale o una tua immagine di sfondo.</li>
  <li><strong>Mandalo alla famiglia:</strong> il link apre lo stesso conto alla rovescia su qualsiasi dispositivo.</li>
  <li><strong>Capodanno:</strong> subito dopo Natale prova il <a href="{newYearLink}">conto alla rovescia per Capodanno</a>.</li>
</ul>
`,
  dateFormat: { weekday: 'long', day: 'numeric', month: 'long' },
};

const pl: typeof cs = {
  pageTitle: 'Odliczanie do świąt {year} – ile dni do Bożego Narodzenia',
  metaDescription:
    'Ile dni zostało do świąt? Odliczanie na żywo do Wigilii {year} ze świątecznym motywem, także na pełnym ekranie. Kiedy są święta i Adwent {year}.',
  heading: 'Odliczanie do świąt {year}',
  merry: 'Wesołych Świąt!',
  defaultDay: 24,
  dayChoice: 'Odliczaj do',
  byDay: {
    24: {
      choice: 'Wigilia (24 grudnia)',
      stageTitle: 'Do Wigilii',
      lead: 'Wigilia {year} to {weekday}, {date}.',
      appTitle: 'Do Wigilii',
      daysLeft: {
        one: 'Wigilia jest <strong>jutro</strong>.',
        few: 'Do Wigilii zostały <strong>{days} dni</strong>.',
        many: 'Do Wigilii zostało <strong>{days} dni</strong>.',
        zero: 'Wigilia jest <strong>dziś</strong>.',
      },
    },
    25: {
      choice: 'Boże Narodzenie (25 grudnia)',
      stageTitle: 'Do Bożego Narodzenia',
      lead: 'Boże Narodzenie {year} to {weekday}, {date}.',
      appTitle: 'Do Bożego Narodzenia',
      daysLeft: {
        one: 'Boże Narodzenie jest <strong>jutro</strong>.',
        few: 'Do Bożego Narodzenia zostały <strong>{days} dni</strong>.',
        many: 'Do Bożego Narodzenia zostało <strong>{days} dni</strong>.',
        zero: 'Boże Narodzenie jest <strong>dziś</strong>.',
      },
    },
  },
  units: { days: 'dni', hours: 'godz.', minutes: 'min', seconds: 'sek.' },
  leadMerry: 'Wesołych Świąt! Odliczanie do kolejnych świąt rusza 27 grudnia.',
  open: 'Otwórz na pełnym ekranie',
  share: 'Udostępnij link',
  copied: 'Link skopiowany.',
  copyPrompt: 'Skopiuj link:',
  weeks: ' To {weeks}.',
  weeksForms: { one: '{n} tydzień', few: '{n} tygodnie', many: '{n} tygodni' },
  daysForms: { one: '{n} dzień', few: '{n} dni', many: '{n} dni' },
  and: ' i ',
  body: `
<h2>Ile dni do świąt</h2>
<p>{daysLeft}{weeks} Odliczanie powyżej pokazuje dokładny czas co do sekundy i zawsze opiera się na rzeczywistym czasie,
więc jest poprawne nawet po zamknięciu i ponownym otwarciu strony.</p>

<h2>Kiedy są święta {year}</h2>
<ul>
  <li><strong>Wigilia:</strong> {d24}</li>
  <li><strong>Boże Narodzenie (pierwszy dzień świąt):</strong> {d25}</li>
  <li><strong>Drugi dzień świąt:</strong> {d26}</li>
</ul>

<h2>Adwent {year}</h2>
<p>Adwent zaczyna się w czwartą niedzielę przed Bożym Narodzeniem. W tym roku niedziele Adwentu wypadają:</p>
<ul>
  <li><strong>I niedziela Adwentu:</strong> {a1}</li>
  <li><strong>II niedziela Adwentu:</strong> {a2}</li>
  <li><strong>III niedziela Adwentu:</strong> {a3}</li>
  <li><strong>IV niedziela Adwentu:</strong> {a4}</li>
</ul>

<h2>Wskazówki</h2>
<ul>
  <li><strong>Na pełnym ekranie:</strong> wyświetl odliczanie na telewizorze, w klasie albo w biurze. Przycisk powyżej
    otwiera je ze wszystkimi ustawieniami, w tym z motywem Choinka lub z własnym zdjęciem w tle.</li>
  <li><strong>Wyślij rodzinie:</strong> link otwiera to samo odliczanie na każdym urządzeniu.</li>
  <li><strong>Sylwester:</strong> zaraz po świętach wypróbuj <a href="{newYearLink}">odliczanie do Nowego Roku</a>.</li>
</ul>
`,
  dateFormat: { weekday: 'long', day: 'numeric', month: 'long' },
};

const sk: typeof cs = {
  pageTitle: 'Odpočet do Vianoc {year} – koľko dní zostáva do Vianoc',
  metaDescription:
    'Koľko dní zostáva do Vianoc? Živý odpočet do Štedrého dňa {year} s vianočnou témou, na celú obrazovku. Kedy sú Vianoce a advent {year}.',
  heading: 'Odpočet do Vianoc {year}',
  merry: 'Veselé Vianoce!',
  defaultDay: 24,
  dayChoice: 'Odpočítavať do',
  byDay: {
    24: {
      choice: 'Štedrý deň (24. 12.)',
      stageTitle: 'Do Štedrého dňa',
      lead: 'Štedrý deň {year} je {weekday} {date}.',
      appTitle: 'Do Štedrého dňa',
      daysLeft: {
        one: 'Štedrý deň je <strong>zajtra</strong>.',
        few: 'Do Štedrého dňa zostávajú <strong>{days} dni</strong>.',
        many: 'Do Štedrého dňa zostáva <strong>{days} dní</strong>.',
        zero: 'Štedrý deň je <strong>dnes</strong>.',
      },
    },
    25: {
      choice: 'Prvý sviatok vianočný (25. 12.)',
      stageTitle: 'Do Vianoc',
      lead: 'Prvý sviatok vianočný {year} je {weekday} {date}.',
      appTitle: 'Do Vianoc',
      daysLeft: {
        one: 'Prvý sviatok vianočný je <strong>zajtra</strong>.',
        few: 'Do prvého sviatku vianočného zostávajú <strong>{days} dni</strong>.',
        many: 'Do prvého sviatku vianočného zostáva <strong>{days} dní</strong>.',
        zero: 'Prvý sviatok vianočný je <strong>dnes</strong>.',
      },
    },
  },
  units: { days: 'dní', hours: 'hod', minutes: 'min', seconds: 'sek' },
  leadMerry: 'Príjemné sviatky! Odpočet do ďalších Vianoc začne 27. decembra.',
  open: 'Otvoriť na celú obrazovku',
  share: 'Zdieľať odkaz',
  copied: 'Odkaz skopírovaný.',
  copyPrompt: 'Skopírujte odkaz:',
  weeks: ' To je {weeks}.',
  weeksForms: { one: '{n} týždeň', few: '{n} týždne', many: '{n} týždňov' },
  daysForms: { one: '{n} deň', few: '{n} dni', many: '{n} dní' },
  and: ' a ',
  body: `
<h2>Koľko dní zostáva do Vianoc</h2>
<p>{daysLeft}{weeks} Odpočet vyššie ukazuje presný čas na sekundu a vždy sa riadi skutočným časom, takže sedí aj po
zatvorení a opätovnom otvorení stránky.</p>

<h2>Kedy sú Vianoce {year}</h2>
<ul>
  <li><strong>Štedrý deň:</strong> {d24}</li>
  <li><strong>Prvý sviatok vianočný:</strong> {d25}</li>
  <li><strong>Druhý sviatok vianočný (Štefan):</strong> {d26}</li>
</ul>

<h2>Advent {year}</h2>
<p>Advent začína štvrtú nedeľu pred prvým sviatkom vianočným. Tento rok pripadajú adventné nedele na:</p>
<ul>
  <li><strong>1. adventná nedeľa:</strong> {a1}</li>
  <li><strong>2. adventná nedeľa:</strong> {a2}</li>
  <li><strong>3. adventná nedeľa:</strong> {a3}</li>
  <li><strong>4. adventná nedeľa:</strong> {a4}</li>
</ul>

<h2>Tipy</h2>
<ul>
  <li><strong>Na celú obrazovku:</strong> pustite si odpočet na televízore, v triede alebo v kancelárii. Tlačidlo vyššie
    ho otvorí so všetkými nastaveniami vrátane témy Vianočný stromček alebo vlastného obrázka na pozadí.</li>
  <li><strong>Pošlite ho rodine:</strong> odkaz otvorí rovnaký odpočet na akomkoľvek zariadení.</li>
  <li><strong>Silvester:</strong> hneď po Vianociach vyskúšajte <a href="{newYearLink}">odpočet do Nového roka</a>.</li>
</ul>
`,
  dateFormat: { weekday: 'long', day: 'numeric', month: 'long' },
};

export const s = tr({ cs, de, en, es, fr, it, pl, sk });
