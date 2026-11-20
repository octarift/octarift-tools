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
  <li><strong>Česky, anglicky a německy.</strong> Jazyk přepnete vpravo nahoře.</li>
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
  <li><strong>In Czech, English and German.</strong> Switch the language at the top right.</li>
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
  <li><strong>Auf Tschechisch, Englisch und Deutsch.</strong> Die Sprache wechseln Sie oben rechts. Die deutsche
    Übersetzung ist neu; wenn Ihnen ein Fehler auffällt, schreiben Sie uns bitte.</li>
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

export const s = tr({ cs, en, de });
