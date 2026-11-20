import { tr } from '@shared/i18n';

/** About and contact page. The HTML parts are trusted text written here, set with innerHTML. */
const cs = {
  pageTitle: 'O webu a kontakt',
  metaDescription:
    'Octarift Tools jsou bezplatné online nástroje, které běží ve vašem prohlížeči: odpočet a stopky, převod textu, QR kódy a zmenšení obrázků. Bez registrace, nic se nenahrává.',
  heading: 'O webu',
  intro: `
<p>Octarift Tools jsou jednoduché bezplatné nástroje pro každý den. Fungují přímo ve vašem prohlížeči na počítači
i v mobilu, bez instalace a bez registrace.</p>`,
  toolsTitle: 'Nástroje',
  body: `
<h2>Na čem nám záleží</h2>
<ul>
  <li><strong>Vaše data zůstávají u vás.</strong> Texty, fotky i platební údaje se zpracují ve vašem zařízení a nikam
    se neodesílají. Podrobnosti najdete v <a href="/privacy/">zásadách ochrany soukromí</a>.</li>
  <li><strong>Žádné účty ani sledování.</strong> Web si pamatuje jen nastavení, která si sami zvolíte.</li>
  <li><strong>Rychlost a jednoduchost.</strong> Nástroj se otevře a hned funguje, i na pomalejším připojení.</li>
  <li><strong>V osmi jazycích.</strong> Jazyk přepnete vpravo nahoře.</li>
</ul>

<h2>Kdo za webem stojí</h2>
<p>Web vytváří <a href="https://octarift.com/">Octarift</a>, malé nezávislé studio z České republiky. Nástroje jsou
zdarma; do budoucna je mohou pomáhat financovat nenápadné reklamy, nikdy ale ne v režimu celé obrazovky.</p>

<h2>Kontakt</h2>
<p>Máte nápad na nový nástroj, našli jste chybu, nebo vám něco chybí? Napište na
<a href="mailto:octarift.studio@gmail.com">octarift.studio@gmail.com</a>. Každou zprávu si přečteme.</p>

<h2>Licence</h2>
<p>Některé nástroje používají otevřené knihovny jiných autorů. Jejich přehled a licence najdete na stránce
<a href="/third-party-licenses.txt">Licence</a>.</p>
`,
};

const en: typeof cs = {
  pageTitle: 'About and contact',
  metaDescription:
    'Octarift Tools are free online tools that run in your browser: countdown and stopwatch, text converter, QR codes and image compressor. No sign-up, nothing is uploaded.',
  heading: 'About',
  intro: `
<p>Octarift Tools are simple, free tools for everyday tasks. They work right in your browser on a computer or phone,
with nothing to install and no sign-up.</p>`,
  toolsTitle: 'Tools',
  body: `
<h2>What we care about</h2>
<ul>
  <li><strong>Your data stays with you.</strong> Text, photos and payment details are processed on your device and
    never sent anywhere. See the <a href="/privacy/">privacy policy</a> for details.</li>
  <li><strong>No accounts, no tracking.</strong> The site only remembers the settings you choose.</li>
  <li><strong>Fast and simple.</strong> A tool opens and works right away, even on a slow connection.</li>
  <li><strong>In eight languages.</strong> Switch the language at the top right.</li>
</ul>

<h2>Who makes it</h2>
<p>The site is made by <a href="https://octarift.com/">Octarift</a>, a small independent studio from the Czech
Republic. The tools are free; in the future, unobtrusive ads may help to pay for them, but never in fullscreen mode.</p>

<h2>Contact</h2>
<p>Have an idea for a new tool, found a bug or missing something? Write to
<a href="mailto:octarift.studio@gmail.com">octarift.studio@gmail.com</a>. We read every message.</p>

<h2>Licenses</h2>
<p>Some tools use open-source libraries by other authors. Their list and licenses are on the
<a href="/third-party-licenses.txt">Licenses</a> page.</p>
`,
};

const de: typeof cs = {
  pageTitle: 'Über diese Seite und Kontakt',
  metaDescription:
    'Octarift Tools sind kostenlose Online-Werkzeuge, die in Ihrem Browser laufen: Countdown und Stoppuhr, Text umwandeln, QR-Codes, Bilder verkleinern und Zufallsgenerator. Ohne Anmeldung, nichts wird hochgeladen.',
  heading: 'Über diese Seite',
  intro: `
<p>Octarift Tools sind einfache, kostenlose Werkzeuge für alltägliche Aufgaben. Sie funktionieren direkt im Browser
auf dem Computer oder Handy, ohne Installation und ohne Anmeldung.</p>`,
  toolsTitle: 'Werkzeuge',
  body: `
<h2>Was uns wichtig ist</h2>
<ul>
  <li><strong>Ihre Daten bleiben bei Ihnen.</strong> Texte, Fotos und Zahlungsdaten werden auf Ihrem Gerät verarbeitet
    und nirgendwohin gesendet. Einzelheiten finden Sie in der <a href="/privacy/">Datenschutzerklärung</a>.</li>
  <li><strong>Keine Konten, kein Tracking.</strong> Die Seite merkt sich nur die Einstellungen, die Sie wählen.</li>
  <li><strong>Schnell und einfach.</strong> Ein Werkzeug öffnet sich und funktioniert sofort, auch bei langsamer Verbindung.</li>
  <li><strong>In acht Sprachen.</strong> Die Sprache wechseln Sie oben rechts. Die deutsche Übersetzung ist neu;
    wenn Ihnen ein Fehler auffällt, schreiben Sie uns bitte.</li>
</ul>

<h2>Wer dahintersteht</h2>
<p>Die Seite wird von <a href="https://octarift.com/">Octarift</a> betrieben, einem kleinen unabhängigen Studio aus
Tschechien. Die Werkzeuge sind kostenlos; künftig könnte dezente Werbung helfen, sie zu finanzieren, aber nie im
Vollbildmodus.</p>

<h2>Kontakt</h2>
<p>Sie haben eine Idee für ein neues Werkzeug, einen Fehler gefunden oder vermissen etwas? Schreiben Sie an
<a href="mailto:octarift.studio@gmail.com">octarift.studio@gmail.com</a>. Wir lesen jede Nachricht.</p>

<h2>Lizenzen</h2>
<p>Einige Werkzeuge nutzen Open-Source-Bibliotheken anderer Autoren. Die Liste und ihre Lizenzen finden Sie auf der
Seite <a href="/third-party-licenses.txt">Lizenzen</a> (auf Englisch).</p>
`,
};

const es: typeof cs = {
  pageTitle: 'Acerca de y contacto',
  metaDescription:
    'Octarift Tools son herramientas online gratuitas que funcionan en tu navegador: cuenta atrás y cronómetro, convertidor de texto, códigos QR, compresor de imágenes y sorteos. Sin registro, no se sube nada.',
  heading: 'Acerca de',
  intro: `
<p>Octarift Tools son herramientas sencillas y gratuitas para el día a día. Funcionan directamente en tu navegador,
en el ordenador o en el móvil, sin instalar nada y sin registrarte.</p>`,
  toolsTitle: 'Herramientas',
  body: `
<h2>Lo que nos importa</h2>
<ul>
  <li><strong>Tus datos se quedan contigo.</strong> Los textos, las fotos y los datos de pago se procesan en tu
    dispositivo y nunca se envían a ningún sitio. Encontrarás los detalles en la <a href="/privacy/">política de privacidad</a>.</li>
  <li><strong>Sin cuentas ni seguimiento.</strong> La web solo recuerda los ajustes que tú eliges.</li>
  <li><strong>Rápido y sencillo.</strong> Una herramienta se abre y funciona al momento, incluso con una conexión lenta.</li>
  <li><strong>En ocho idiomas.</strong> Cambia el idioma arriba a la derecha. La traducción al español es nueva; si ves
    algún error, escríbenos.</li>
</ul>

<h2>Quién está detrás</h2>
<p>La web la hace <a href="https://octarift.com/">Octarift</a>, un pequeño estudio independiente de la República Checa.
Las herramientas son gratuitas; en el futuro, algunos anuncios discretos podrían ayudar a financiarlas, pero nunca en
pantalla completa.</p>

<h2>Contacto</h2>
<p>¿Tienes una idea para una nueva herramienta, has encontrado un error o echas algo en falta? Escribe a
<a href="mailto:octarift.studio@gmail.com">octarift.studio@gmail.com</a>. Leemos todos los mensajes.</p>

<h2>Licencias</h2>
<p>Algunas herramientas usan bibliotecas de código abierto de otros autores. Su lista y sus licencias están en la
página <a href="/third-party-licenses.txt">Licencias</a> (en inglés).</p>
`,
};

const fr: typeof cs = {
  pageTitle: 'À propos et contact',
  metaDescription:
    'Octarift Tools sont des outils en ligne gratuits qui fonctionnent dans votre navigateur : compte à rebours et chronomètre, convertisseur de texte, codes QR, compression d’images et tirage au sort. Sans inscription, rien n’est envoyé.',
  heading: 'À propos',
  intro: `
<p>Octarift Tools sont des outils simples et gratuits pour le quotidien. Ils fonctionnent directement dans votre
navigateur, sur ordinateur comme sur téléphone, sans installation ni inscription.</p>`,
  toolsTitle: 'Outils',
  body: `
<h2>Ce qui compte pour nous</h2>
<ul>
  <li><strong>Vos données restent chez vous.</strong> Les textes, photos et informations de paiement sont traités sur
    votre appareil et ne sont jamais envoyés. Les détails se trouvent dans la <a href="/privacy/">politique de confidentialité</a>.</li>
  <li><strong>Ni compte ni pistage.</strong> Le site ne retient que les réglages que vous choisissez.</li>
  <li><strong>Rapide et simple.</strong> Un outil s’ouvre et fonctionne tout de suite, même avec une connexion lente.</li>
  <li><strong>En huit langues.</strong> Changez de langue en haut à droite. La traduction française est récente ; si
    vous remarquez une erreur, écrivez-nous.</li>
</ul>

<h2>Qui est derrière</h2>
<p>Le site est réalisé par <a href="https://octarift.com/">Octarift</a>, un petit studio indépendant de République
tchèque. Les outils sont gratuits ; à l’avenir, des publicités discrètes pourraient aider à les financer, mais jamais
en plein écran.</p>

<h2>Contact</h2>
<p>Une idée de nouvel outil, un bug, quelque chose qui vous manque ? Écrivez à
<a href="mailto:octarift.studio@gmail.com">octarift.studio@gmail.com</a>. Nous lisons chaque message.</p>

<h2>Licences</h2>
<p>Certains outils utilisent des bibliothèques open source d’autres auteurs. Leur liste et leurs licences figurent sur
la page <a href="/third-party-licenses.txt">Licences</a> (en anglais).</p>
`,
};

const it: typeof cs = {
  pageTitle: 'Informazioni e contatti',
  metaDescription:
    'Octarift Tools sono strumenti online gratuiti che funzionano nel tuo browser: conto alla rovescia e cronometro, convertitore di testo, codici QR, compressione immagini e sorteggi. Senza registrazione, non viene caricato nulla.',
  heading: 'Informazioni',
  intro: `
<p>Octarift Tools sono strumenti semplici e gratuiti per tutti i giorni. Funzionano direttamente nel tuo browser,
su computer e smartphone, senza installare nulla e senza registrazione.</p>`,
  toolsTitle: 'Strumenti',
  body: `
<h2>Cosa ci sta a cuore</h2>
<ul>
  <li><strong>I tuoi dati restano a te.</strong> Testi, foto e dati di pagamento vengono elaborati sul tuo dispositivo e
    non vengono mai inviati. Trovi i dettagli nell’<a href="/privacy/">informativa sulla privacy</a>.</li>
  <li><strong>Niente account né tracciamento.</strong> Il sito ricorda solo le impostazioni che scegli tu.</li>
  <li><strong>Veloce e semplice.</strong> Uno strumento si apre e funziona subito, anche con una connessione lenta.</li>
  <li><strong>In otto lingue.</strong> Cambia lingua in alto a destra. La traduzione italiana è nuova; se noti un
    errore, scrivici.</li>
</ul>

<h2>Chi c’è dietro</h2>
<p>Il sito è realizzato da <a href="https://octarift.com/">Octarift</a>, un piccolo studio indipendente della
Repubblica Ceca. Gli strumenti sono gratuiti; in futuro potrebbero essere finanziati da annunci discreti, ma mai a
schermo intero.</p>

<h2>Contatti</h2>
<p>Hai un’idea per un nuovo strumento, hai trovato un errore o ti manca qualcosa? Scrivi a
<a href="mailto:octarift.studio@gmail.com">octarift.studio@gmail.com</a>. Leggiamo ogni messaggio.</p>

<h2>Licenze</h2>
<p>Alcuni strumenti usano librerie open source di altri autori. L’elenco e le licenze sono nella pagina
<a href="/third-party-licenses.txt">Licenze</a> (in inglese).</p>
`,
};

const pl: typeof cs = {
  pageTitle: 'O stronie i kontakt',
  metaDescription:
    'Octarift Tools to darmowe narzędzia online działające w przeglądarce: odliczanie i stoper, konwerter tekstu, kody QR, zmniejszanie zdjęć i losowanie. Bez rejestracji, nic nie jest wysyłane.',
  heading: 'O stronie',
  intro: `
<p>Octarift Tools to proste, darmowe narzędzia na co dzień. Działają bezpośrednio w przeglądarce na komputerze
i telefonie, bez instalacji i bez rejestracji.</p>`,
  toolsTitle: 'Narzędzia',
  body: `
<h2>Na czym nam zależy</h2>
<ul>
  <li><strong>Twoje dane zostają u Ciebie.</strong> Teksty, zdjęcia i dane płatności są przetwarzane na Twoim urządzeniu
    i nigdzie nie są wysyłane. Szczegóły znajdziesz w <a href="/privacy/">polityce prywatności</a>.</li>
  <li><strong>Bez kont i śledzenia.</strong> Strona zapamiętuje tylko ustawienia, które sam wybierzesz.</li>
  <li><strong>Szybko i prosto.</strong> Narzędzie otwiera się i działa od razu, nawet przy wolnym łączu.</li>
  <li><strong>W ośmiu językach.</strong> Język zmienisz w prawym górnym rogu. Polskie tłumaczenie jest nowe; jeśli
    zauważysz błąd, napisz do nas.</li>
</ul>

<h2>Kto za tym stoi</h2>
<p>Stronę tworzy <a href="https://octarift.com/">Octarift</a>, małe niezależne studio z Czech. Narzędzia są darmowe;
w przyszłości mogą je współfinansować dyskretne reklamy, ale nigdy w trybie pełnoekranowym.</p>

<h2>Kontakt</h2>
<p>Masz pomysł na nowe narzędzie, znalazłeś błąd albo czegoś Ci brakuje? Napisz na
<a href="mailto:octarift.studio@gmail.com">octarift.studio@gmail.com</a>. Czytamy każdą wiadomość.</p>

<h2>Licencje</h2>
<p>Niektóre narzędzia korzystają z otwartych bibliotek innych autorów. Ich listę i licencje znajdziesz na stronie
<a href="/third-party-licenses.txt">Licencje</a> (po angielsku).</p>
`,
};

const sk: typeof cs = {
  pageTitle: 'O webe a kontakt',
  metaDescription:
    'Octarift Tools sú bezplatné online nástroje, ktoré bežia vo vašom prehliadači: odpočet a stopky, prevod textu, QR kódy, zmenšenie obrázkov a losovanie. Bez registrácie, nič sa nenahráva.',
  heading: 'O webe',
  intro: `
<p>Octarift Tools sú jednoduché bezplatné nástroje na každý deň. Fungujú priamo vo vašom prehliadači na počítači
aj v mobile, bez inštalácie a bez registrácie.</p>`,
  toolsTitle: 'Nástroje',
  body: `
<h2>Na čom nám záleží</h2>
<ul>
  <li><strong>Vaše dáta zostávajú u vás.</strong> Texty, fotky aj platobné údaje sa spracujú vo vašom zariadení a nikam
    sa neodosielajú. Podrobnosti nájdete v <a href="/privacy/">zásadách ochrany súkromia</a>.</li>
  <li><strong>Žiadne účty ani sledovanie.</strong> Web si pamätá len nastavenia, ktoré si sami zvolíte.</li>
  <li><strong>Rýchlosť a jednoduchosť.</strong> Nástroj sa otvorí a hneď funguje, aj na pomalšom pripojení.</li>
  <li><strong>V ôsmich jazykoch.</strong> Jazyk prepnete vpravo hore. Slovenský preklad je nový; ak si všimnete chybu,
    napíšte nám.</li>
</ul>

<h2>Kto za webom stojí</h2>
<p>Web vytvára <a href="https://octarift.com/">Octarift</a>, malé nezávislé štúdio z Českej republiky. Nástroje sú
zadarmo; do budúcna ich môžu pomáhať financovať nenápadné reklamy, nikdy však nie v režime celej obrazovky.</p>

<h2>Kontakt</h2>
<p>Máte nápad na nový nástroj, našli ste chybu alebo vám niečo chýba? Napíšte na
<a href="mailto:octarift.studio@gmail.com">octarift.studio@gmail.com</a>. Každú správu si prečítame.</p>

<h2>Licencie</h2>
<p>Niektoré nástroje používajú otvorené knižnice iných autorov. Ich prehľad a licencie nájdete na stránke
<a href="/third-party-licenses.txt">Licencie</a> (v angličtine).</p>
`,
};

export const s = tr({ cs, de, en, es, fr, it, pl, sk });
