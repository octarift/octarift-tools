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
  lead: 'Silvestr {old} je {weekday} {date}, nový rok začne o půlnoci.',
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

const es: typeof cs = {
  pageTitle: 'Cuenta atrás para Año Nuevo {year} – cuánto falta para las campanadas',
  metaDescription:
    '¿Cuánto falta para Año Nuevo {year}? Cuenta atrás en directo hasta la medianoche de Nochevieja al segundo, con tema de fuegos artificiales, también a pantalla completa.',
  heading: 'Cuenta atrás para Año Nuevo {year}',
  stageTitle: 'Hasta Año Nuevo',
  happy: '¡Feliz Año Nuevo {year}!',
  units: { days: 'días', hours: 'h', minutes: 'min', seconds: 's' },
  lead: 'Nochevieja {old} cae el {weekday} {date}; el año nuevo empieza a medianoche.',
  leadHappy: '¡Feliz año nuevo! La cuenta atrás para la próxima Nochevieja empieza el 2 de enero.',
  open: 'Abrir a pantalla completa',
  share: 'Compartir enlace',
  copied: 'Enlace copiado.',
  copyPrompt: 'Copia el enlace:',
  appTitle: 'Hasta Año Nuevo',
  daysLeft: {
    one: 'Nochevieja es <strong>mañana</strong>.',
    few: 'Nochevieja es <strong>dentro de {days} días</strong>.',
    many: 'Nochevieja es <strong>dentro de {days} días</strong>.',
    zero: 'Nochevieja es <strong>hoy</strong>; el año nuevo empieza a medianoche.',
  },
  weeks: ' Son {weeks}.',
  weeksForms: { one: '{n} semana', few: '{n} semanas', many: '{n} semanas' },
  daysForms: { one: '{n} día', few: '{n} días', many: '{n} días' },
  and: ' y ',
  body: `
<h2>Cuánto falta para Año Nuevo</h2>
<p>{daysLeft}{weeks} La cuenta atrás de arriba muestra el tiempo exacto hasta medianoche, al segundo, y sigue siempre el
reloj de tu dispositivo, así que es correcta aunque cierres la página y la vuelvas a abrir.</p>

<h2>Cuándo es Nochevieja {old} y Año Nuevo {year}</h2>
<ul>
  <li><strong>Nochevieja:</strong> {eve}</li>
  <li><strong>Año Nuevo:</strong> {newYearDay}</li>
</ul>

<h2>Consejos para la medianoche</h2>
<ul>
  <li><strong>A pantalla completa:</strong> pon la cuenta atrás en la tele o en un proyector. El botón de arriba la abre
    con todos los temas y tu propio título; el tema Fuegos artificiales lanza cohetes sobre una ciudad de noche.</li>
  <li><strong>Los últimos diez segundos:</strong> la cuenta atrás avanza cada segundo, así que todos pueden contar en voz alta.</li>
  <li><strong>Envíala a tus amigos:</strong> el enlace abre la misma cuenta atrás en cualquier dispositivo.</li>
  <li><strong>Antes:</strong> la <a href="/odpocet-do-vanoc/?lang=es">cuenta atrás para Navidad</a>.</li>
</ul>
`,
  dateFormat: { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' },
};

const fr: typeof cs = {
  pageTitle: 'Compte à rebours du Nouvel An {year} – combien de temps avant minuit',
  metaDescription:
    'Combien de temps avant le Nouvel An {year} ? Un compte à rebours en direct jusqu’à minuit le soir du réveillon, à la seconde près, avec un thème feu d’artifice, aussi en plein écran.',
  heading: 'Compte à rebours du Nouvel An {year}',
  stageTitle: 'Avant le Nouvel An',
  happy: 'Bonne année {year} !',
  units: { days: 'jours', hours: 'h', minutes: 'min', seconds: 's' },
  lead: 'Le réveillon de la Saint-Sylvestre {old} tombe le {weekday} {date} ; la nouvelle année commence à minuit.',
  leadHappy: 'Meilleurs vœux pour la nouvelle année ! Le compte à rebours jusqu’au prochain réveillon reprend le 2 janvier.',
  open: 'Ouvrir en plein écran',
  share: 'Partager le lien',
  copied: 'Lien copié.',
  copyPrompt: 'Copiez le lien :',
  appTitle: 'Avant le Nouvel An',
  daysLeft: {
    one: 'Le réveillon, c’est <strong>demain</strong>.',
    few: 'Le réveillon est <strong>dans {days} jours</strong>.',
    many: 'Le réveillon est <strong>dans {days} jours</strong>.',
    zero: 'Le réveillon, c’est <strong>aujourd’hui</strong> ; la nouvelle année commence à minuit.',
  },
  weeks: ' Soit {weeks}.',
  weeksForms: { one: '{n} semaine', few: '{n} semaines', many: '{n} semaines' },
  daysForms: { one: '{n} jour', few: '{n} jours', many: '{n} jours' },
  and: ' et ',
  body: `
<h2>Combien de temps avant le Nouvel An</h2>
<p>{daysLeft}{weeks} Le compte à rebours ci-dessus indique le temps exact jusqu’à minuit, à la seconde près, et suit
toujours l’horloge de votre appareil : il reste juste même si vous fermez puis rouvrez la page.</p>

<h2>Quand sont la Saint-Sylvestre {old} et le Nouvel An {year}</h2>
<ul>
  <li><strong>Réveillon de la Saint-Sylvestre :</strong> {eve}</li>
  <li><strong>Jour de l’An :</strong> {newYearDay}</li>
</ul>

<h2>Astuces pour minuit</h2>
<ul>
  <li><strong>En plein écran :</strong> affichez le compte à rebours sur la télé ou un vidéoprojecteur. Le bouton
    ci-dessus l’ouvre avec tous les thèmes et votre propre titre ; le thème Feu d’artifice fait éclater des fusées
    au-dessus d’une ville de nuit.</li>
  <li><strong>Les dix dernières secondes :</strong> le compte à rebours avance chaque seconde, pour que tout le monde
    puisse compter à voix haute.</li>
  <li><strong>Envoyez-le à vos amis :</strong> le lien ouvre le même compte à rebours sur n’importe quel appareil.</li>
  <li><strong>Avant cela :</strong> le <a href="/odpocet-do-vanoc/?lang=fr">compte à rebours de Noël</a>.</li>
</ul>
`,
  dateFormat: { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' },
};

const it: typeof cs = {
  pageTitle: 'Conto alla rovescia per Capodanno {year} – quanto manca alla mezzanotte',
  metaDescription:
    'Quanto manca a Capodanno {year}? Un conto alla rovescia in diretta fino alla mezzanotte di San Silvestro al secondo, con tema fuochi d’artificio, anche a schermo intero.',
  heading: 'Conto alla rovescia per Capodanno {year}',
  stageTitle: 'A Capodanno',
  happy: 'Buon anno {year}!',
  units: { days: 'giorni', hours: 'ore', minutes: 'min', seconds: 'sec' },
  lead: 'San Silvestro {old} cade {weekday} {date}; il nuovo anno inizia a mezzanotte.',
  leadHappy: 'Buon anno nuovo! Il conto alla rovescia per il prossimo San Silvestro riparte il 2 gennaio.',
  open: 'Apri a schermo intero',
  share: 'Condividi link',
  copied: 'Link copiato.',
  copyPrompt: 'Copia il link:',
  appTitle: 'A Capodanno',
  daysLeft: {
    one: 'San Silvestro è <strong>domani</strong>.',
    few: 'Mancano <strong>{days} giorni</strong> a San Silvestro.',
    many: 'Mancano <strong>{days} giorni</strong> a San Silvestro.',
    zero: 'San Silvestro è <strong>oggi</strong>; il nuovo anno inizia a mezzanotte.',
  },
  weeks: ' Sono {weeks}.',
  weeksForms: { one: '{n} settimana', few: '{n} settimane', many: '{n} settimane' },
  daysForms: { one: '{n} giorno', few: '{n} giorni', many: '{n} giorni' },
  and: ' e ',
  body: `
<h2>Quanto manca a Capodanno</h2>
<p>{daysLeft}{weeks} Il conto alla rovescia qui sopra mostra il tempo esatto fino a mezzanotte, al secondo, e segue
sempre l’orologio del tuo dispositivo, quindi resta giusto anche se chiudi e riapri la pagina.</p>

<h2>Quando sono San Silvestro {old} e Capodanno {year}</h2>
<ul>
  <li><strong>San Silvestro:</strong> {eve}</li>
  <li><strong>Capodanno:</strong> {newYearDay}</li>
</ul>

<h2>Consigli per la mezzanotte</h2>
<ul>
  <li><strong>A schermo intero:</strong> metti il conto alla rovescia sulla TV o su un proiettore. Il pulsante qui sopra
    lo apre con tutti i temi e un tuo titolo; il tema Fuochi d’artificio fa esplodere razzi sopra una città di notte.</li>
  <li><strong>Gli ultimi dieci secondi:</strong> il conto alla rovescia scorre ogni secondo, così tutti possono contare ad alta voce.</li>
  <li><strong>Mandalo agli amici:</strong> il link apre lo stesso conto alla rovescia su qualsiasi dispositivo.</li>
  <li><strong>Prima ancora:</strong> il <a href="/odpocet-do-vanoc/?lang=it">conto alla rovescia per Natale</a>.</li>
</ul>
`,
  dateFormat: { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' },
};

const pl: typeof cs = {
  pageTitle: 'Odliczanie do Nowego Roku {year} – ile zostało do północy w Sylwestra',
  metaDescription:
    'Ile zostało do Nowego Roku {year}? Odliczanie na żywo do sylwestrowej północy co do sekundy, z motywem fajerwerków, także na pełnym ekranie.',
  heading: 'Odliczanie do Nowego Roku {year}',
  stageTitle: 'Do Nowego Roku',
  happy: 'Szczęśliwego Nowego Roku {year}!',
  units: { days: 'dni', hours: 'godz.', minutes: 'min', seconds: 'sek.' },
  lead: 'Sylwester {old} to {weekday}, {date}; nowy rok zaczyna się o północy.',
  leadHappy: 'Wszystkiego dobrego w nowym roku! Odliczanie do kolejnego Sylwestra rusza 2 stycznia.',
  open: 'Otwórz na pełnym ekranie',
  share: 'Udostępnij link',
  copied: 'Link skopiowany.',
  copyPrompt: 'Skopiuj link:',
  appTitle: 'Do Nowego Roku',
  daysLeft: {
    one: 'Sylwester jest <strong>jutro</strong>.',
    few: 'Do Sylwestra zostały <strong>{days} dni</strong>.',
    many: 'Do Sylwestra zostało <strong>{days} dni</strong>.',
    zero: 'Sylwester jest <strong>dziś</strong>; nowy rok zaczyna się o północy.',
  },
  weeks: ' To {weeks}.',
  weeksForms: { one: '{n} tydzień', few: '{n} tygodnie', many: '{n} tygodni' },
  daysForms: { one: '{n} dzień', few: '{n} dni', many: '{n} dni' },
  and: ' i ',
  body: `
<h2>Ile zostało do Nowego Roku</h2>
<p>{daysLeft}{weeks} Odliczanie powyżej pokazuje dokładny czas do północy co do sekundy i zawsze opiera się na zegarze
Twojego urządzenia, więc jest poprawne nawet po zamknięciu i ponownym otwarciu strony.</p>

<h2>Kiedy jest Sylwester {old} i Nowy Rok {year}</h2>
<ul>
  <li><strong>Sylwester:</strong> {eve}</li>
  <li><strong>Nowy Rok:</strong> {newYearDay}</li>
</ul>

<h2>Wskazówki na północ</h2>
<ul>
  <li><strong>Na pełnym ekranie:</strong> wyświetl odliczanie na telewizorze lub projektorze. Przycisk powyżej otwiera
    je ze wszystkimi motywami i własnym tytułem; w motywie Fajerwerki nad nocnym miastem wybuchają rakiety.</li>
  <li><strong>Ostatnie dziesięć sekund:</strong> odliczanie zmienia się co sekundę, więc wszyscy mogą odliczać na głos.</li>
  <li><strong>Wyślij znajomym:</strong> link otwiera to samo odliczanie na każdym urządzeniu.</li>
  <li><strong>Wcześniej:</strong> <a href="/odpocet-do-vanoc/?lang=pl">odliczanie do świąt</a>.</li>
</ul>
`,
  dateFormat: { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' },
};

const sk: typeof cs = {
  pageTitle: 'Odpočet do Nového roka {year} – koľko zostáva do Silvestra a polnoci',
  metaDescription:
    'Koľko zostáva do Nového roka {year}? Živý odpočet do silvestrovskej polnoci až na sekundy, s témou ohňostroja, na celú obrazovku. Kedy je Silvester {old}.',
  heading: 'Odpočet do Nového roka {year}',
  stageTitle: 'Do Nového roka',
  happy: 'Šťastný nový rok {year}!',
  units: { days: 'dní', hours: 'hod', minutes: 'min', seconds: 'sek' },
  lead: 'Silvester {old} je {weekday} {date}, nový rok začne o polnoci.',
  leadHappy: 'Všetko najlepšie do nového roka! Odpočet do ďalšieho Silvestra začne 2. januára.',
  open: 'Otvoriť na celú obrazovku',
  share: 'Zdieľať odkaz',
  copied: 'Odkaz skopírovaný.',
  copyPrompt: 'Skopírujte odkaz:',
  appTitle: 'Do Nového roka',
  daysLeft: {
    one: 'Silvester je <strong>zajtra</strong>.',
    few: 'Do Silvestra zostávajú <strong>{days} dni</strong>.',
    many: 'Do Silvestra zostáva <strong>{days} dní</strong>.',
    zero: 'Silvester je <strong>dnes</strong>, nový rok začne o polnoci.',
  },
  weeks: ' To je {weeks}.',
  weeksForms: { one: '{n} týždeň', few: '{n} týždne', many: '{n} týždňov' },
  daysForms: { one: '{n} deň', few: '{n} dni', many: '{n} dní' },
  and: ' a ',
  body: `
<h2>Koľko zostáva do Nového roka</h2>
<p>{daysLeft}{weeks} Odpočet vyššie ukazuje presný čas do polnoci na sekundu a vždy sa riadi hodinami vášho zariadenia,
takže sedí aj po zatvorení a opätovnom otvorení stránky.</p>

<h2>Kedy je Silvester {old} a Nový rok {year}</h2>
<ul>
  <li><strong>Silvester:</strong> {eve}</li>
  <li><strong>Nový rok:</strong> {newYearDay}</li>
</ul>

<h2>Tipy na polnoc</h2>
<ul>
  <li><strong>Na celú obrazovku:</strong> pustite si odpočet na televízore alebo projektore. Tlačidlo vyššie ho otvorí
    so všetkými témami a vlastným nadpisom; v téme Ohňostroj vybuchujú nad nočným mestom rakety.</li>
  <li><strong>Posledných desať sekúnd:</strong> odpočet sa mení každú sekundu, takže môžu všetci odpočítavať nahlas.</li>
  <li><strong>Pošlite ho priateľom:</strong> odkaz otvorí rovnaký odpočet na akomkoľvek zariadení.</li>
  <li><strong>Ešte predtým:</strong> <a href="/odpocet-do-vanoc/?lang=sk">odpočet do Vianoc</a>.</li>
</ul>
`,
  dateFormat: { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' },
};

export const s = tr({ cs, de, en, es, fr, it, pl, sk });
