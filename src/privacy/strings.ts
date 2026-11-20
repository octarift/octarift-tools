import { tr } from '@shared/i18n';

/**
 * Privacy policy. `body` is trusted HTML written here (no user input), set with innerHTML.
 * Keep it in line with what the site really does: update it before adding analytics, ads or anything
 * that sends data anywhere, and change `effective` with every substantive edit.
 */
const cs = {
  pageTitle: 'Zásady ochrany soukromí',
  metaDescription:
    'Jak Octarift Tools zachází s vašimi údaji: nástroje běží ve vašem prohlížeči, soubory ani texty se nikam neodesílají a web nepoužívá sledovací cookies.',
  heading: 'Zásady ochrany soukromí',
  effective: 'Platné od 20. listopadu 2026',
  body: `
<div class="text-page__summary">
  <p><strong>Ve zkratce:</strong> Všechny nástroje běží přímo ve vašem prohlížeči. Texty, obrázky, fotky,
  platební údaje ani hesla, která do nich zadáte, se nikam neodesílají a nikdo, ani my, k nim nemá přístup.
  Web nemá uživatelské účty, nepoužívá sledovací cookies, analytiku ani reklamy.</p>
</div>

<h2>1. Kdo za webem stojí</h2>
<p>Web tools.octarift.com („web“) provozuje Michal Šilhán, fyzická osoba vystupující pod názvem Octarift,
Česká republika. Kontakt: <a href="mailto:octarift.studio@gmail.com">octarift.studio@gmail.com</a>.</p>

<h2>2. Data, která zadáváte do nástrojů</h2>
<p>Převod textu, generátor QR kódů, zmenšení obrázků, losování i odpočet zpracovávají vše ve vašem zařízení.
Obsah, který zadáte nebo nahrajete (text, fotky včetně jejich metadat, čísla účtů, hesla k Wi-Fi, obrázek na pozadí
odpočtu…), se neposílá na žádný server. Neprovozujeme žádný vlastní server, který by ho mohl přijmout.</p>

<h2>3. Co web ukládá ve vašem prohlížeči</h2>
<p>Aby si nástroje pamatovaly vaše nastavení, ukládají ho do úložiště vašeho prohlížeče. Tato data zůstávají
ve vašem zařízení, neodesílají se nám ani nikomu jinému a slouží jen k fungování webu, o které jste sami požádali.
Proto k nim není potřeba souhlas.</p>
<div class="text-page__table"><table>
  <thead><tr><th>Co</th><th>Kde</th><th>Jak dlouho</th></tr></thead>
  <tbody>
    <tr><td>Zvolený světlý nebo tmavý vzhled (jen pokud ho změníte)</td><td>cookie <code>scheme</code>, sdílená s octarift.com</td><td>1 rok</td></tr>
    <tr><td>Zvolený jazyk; nastavení odpočtu a stopek (režim, časy, motiv, vlastní texty); typ a vzhled QR kódu;
      naposledy použitý převod textu; formát, kvalita a velikost obrázků; seznam jmen a nastavení v losování; že už se zobrazil tip pro iPhone</td>
      <td>localStorage</td><td>dokud je nesmažete</td></tr>
    <tr><td>Rozepsaný text v převodu textu, vyplněné údaje v generátoru QR kódů</td><td>sessionStorage</td><td>do zavření karty</td></tr>
    <tr><td>Vlastní obrázek nebo video na pozadí odpočtu</td><td>IndexedDB</td><td>dokud ho neodeberete</td></tr>
  </tbody>
</table></div>
<p>Všechno můžete kdykoli smazat v nastavení prohlížeče (vymazání dat webu tools.octarift.com).</p>

<h2>4. Hosting</h2>
<p>Web je statický a hostuje ho služba GitHub Pages (GitHub, Inc., USA). Při načtení stránky váš prohlížeč
odesílá běžné technické údaje, jako je IP adresa, typ prohlížeče a adresa požadované stránky. GitHub je zpracovává,
aby vám stránku doručil a chránil službu před útoky, a může je krátce uchovávat v záznamech serveru. My k těmto
záznamům přístup nemáme. Právním základem je oprávněný zájem na bezpečném provozu webu (čl. 6 odst. 1 písm. f GDPR).
Přenos do USA se opírá o rámec EU–USA pro ochranu osobních údajů (Data Privacy Framework) nebo standardní smluvní doložky.
Podrobnosti najdete v <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement"
rel="noopener">prohlášení GitHubu o ochraně soukromí</a>.</p>
<p>Načtení podpory pro fotky HEIC se týká jen souboru z tohoto webu, žádná další služba se při tom nekontaktuje.</p>

<h2>5. Analytika a reklama</h2>
<p>Web v tuto chvíli nepoužívá žádnou analytiku návštěvnosti ani reklamy a nevkládá obsah cizích služeb.
Pokud je v budoucnu zavedeme, tyto zásady předem upravíme, a kde to zákon vyžaduje, požádáme vás o souhlas.</p>

<h2>6. Odkazy na jiné weby</h2>
<p>Web obsahuje odkazy na jiné stránky (například octarift.com nebo zdroje licencí). Po kliknutí se řídíte zásadami
těchto stránek. QR kódy, které vytvoříte, mohou obsahovat odkazy na služby jako PayPal nebo Revolut; web tyto služby
sám nekontaktuje.</p>

<h2>7. Vaše práva</h2>
<p>Podle GDPR máte právo na přístup ke svým osobním údajům, jejich opravu, výmaz, omezení zpracování, přenositelnost
a právo vznést námitku. Protože žádné vaše údaje sami neuchováváme, týkají se tato práva hlavně záznamů u poskytovatele
hostingu; rádi vám s nimi pomůžeme na kontaktu výše. Máte také právo podat stížnost u dozorového úřadu, v České republice
u <a href="https://uoou.gov.cz" rel="noopener">Úřadu pro ochranu osobních údajů</a>.</p>

<h2>8. Změny</h2>
<p>Tyto zásady můžeme aktualizovat. Platné znění je vždy zveřejněno na této stránce s datem účinnosti.</p>
`,
};

const en: typeof cs = {
  pageTitle: 'Privacy policy',
  metaDescription:
    'How Octarift Tools handles your data: the tools run in your browser, files and text are never uploaded, and the site uses no tracking cookies.',
  heading: 'Privacy policy',
  effective: 'Effective from 20 November 2026',
  body: `
<div class="text-page__summary">
  <p><strong>In short:</strong> All tools run right in your browser. The text, images, photos, payment details or
  passwords you enter are never sent anywhere, and nobody, including us, has access to them. The site has no user
  accounts and uses no tracking cookies, analytics or ads.</p>
</div>

<h2>1. Who runs the site</h2>
<p>The website tools.octarift.com (the "site") is run by Michal Šilhán, a natural person operating under the name
Octarift, Czech Republic. Contact: <a href="mailto:octarift.studio@gmail.com">octarift.studio@gmail.com</a>.</p>

<h2>2. Data you enter into the tools</h2>
<p>The text converter, QR code generator, image compressor, random picker and countdown process everything on your device.
What you enter or add (text, photos including their metadata, account numbers, Wi-Fi passwords, the countdown
background…) is not sent to any server. We do not run any server that could receive it.</p>

<h2>3. What the site stores in your browser</h2>
<p>So that the tools remember your settings, they store them in your browser's storage. This data stays on your
device, is never sent to us or anyone else, and only makes the site work the way you asked it to. That is why no
consent is needed for it.</p>
<div class="text-page__table"><table>
  <thead><tr><th>What</th><th>Where</th><th>How long</th></tr></thead>
  <tbody>
    <tr><td>Your light or dark appearance choice (only if you change it)</td><td>cookie <code>scheme</code>, shared with octarift.com</td><td>1 year</td></tr>
    <tr><td>Your language; countdown and stopwatch settings (mode, times, theme, custom texts); QR code type and look;
      the last text conversion used; image format, quality and size; the name list and settings of the random picker; whether the iPhone tip was shown</td>
      <td>localStorage</td><td>until you delete it</td></tr>
    <tr><td>Text typed into the text converter, details filled into the QR code generator</td><td>sessionStorage</td><td>until the tab is closed</td></tr>
    <tr><td>Your own countdown background image or video</td><td>IndexedDB</td><td>until you remove it</td></tr>
  </tbody>
</table></div>
<p>You can delete all of it at any time in your browser settings (clear site data for tools.octarift.com).</p>

<h2>4. Hosting</h2>
<p>The site is static and hosted on GitHub Pages (GitHub, Inc., USA). When a page loads, your browser sends the usual
technical data, such as your IP address, browser type and the address of the page. GitHub processes it to deliver
the page and protect the service against attacks and may keep it briefly in server logs. We have no access to these
logs. The legal basis is the legitimate interest in running the site securely (Art. 6(1)(f) GDPR). Transfers to the USA
rely on the EU–US Data Privacy Framework or standard contractual clauses. See
<a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" rel="noopener">GitHub's
privacy statement</a> for details.</p>
<p>Loading HEIC photo support only fetches a file from this site; no other service is contacted.</p>

<h2>5. Analytics and advertising</h2>
<p>The site currently uses no visitor analytics or ads and embeds no third-party content. If we add them in the future,
we will update this policy beforehand and ask for your consent where the law requires it.</p>

<h2>6. Links to other websites</h2>
<p>The site links to other websites (for example octarift.com or license sources). Once you follow a link, their
policies apply. QR codes you create may contain links to services such as PayPal or Revolut; the site itself does not
contact these services.</p>

<h2>7. Your rights</h2>
<p>Under the GDPR you have the right to access, rectification, erasure, restriction of processing, data portability
and to object. As we do not keep any of your data ourselves, these rights mainly concern the hosting provider's logs;
we will gladly help at the contact above. You may also lodge a complaint with a supervisory authority; in the Czech
Republic this is the <a href="https://uoou.gov.cz/en" rel="noopener">Office for Personal Data Protection</a>.</p>

<h2>8. Changes</h2>
<p>We may update this policy. The current version is always published on this page with its effective date.</p>
`,
};

const de: typeof cs = {
  pageTitle: 'Datenschutzerklärung',
  metaDescription:
    'Wie Octarift Tools mit Ihren Daten umgeht: Die Werkzeuge laufen in Ihrem Browser, Dateien und Texte werden nie hochgeladen, und die Seite verwendet keine Tracking-Cookies.',
  heading: 'Datenschutzerklärung',
  effective: 'Gültig ab 20. November 2026',
  body: `
<div class="text-page__summary">
  <p><strong>Kurz gesagt:</strong> Alle Werkzeuge laufen direkt in Ihrem Browser. Texte, Bilder, Fotos, Zahlungsdaten
  oder Passwörter, die Sie eingeben, werden nirgendwohin gesendet, und niemand, auch wir nicht, hat Zugriff darauf.
  Die Seite hat keine Benutzerkonten und verwendet keine Tracking-Cookies, Analysedienste oder Werbung.</p>
</div>

<h2>1. Wer die Seite betreibt</h2>
<p>Die Website tools.octarift.com (die „Seite“) wird von Michal Šilhán betrieben, einer natürlichen Person, die unter
dem Namen Octarift tätig ist, Tschechische Republik. Kontakt:
<a href="mailto:octarift.studio@gmail.com">octarift.studio@gmail.com</a>.</p>

<h2>2. Daten, die Sie in die Werkzeuge eingeben</h2>
<p>Text umwandeln, QR-Code-Generator, Bilder verkleinern, Zufallsgenerator und Countdown verarbeiten alles auf Ihrem
Gerät. Was Sie eingeben oder hinzufügen (Texte, Fotos einschließlich ihrer Metadaten, Kontonummern, WLAN-Passwörter,
den Countdown-Hintergrund…), wird an keinen Server gesendet. Wir betreiben keinen Server, der es empfangen könnte.</p>

<h2>3. Was die Seite in Ihrem Browser speichert</h2>
<p>Damit sich die Werkzeuge Ihre Einstellungen merken, speichern sie diese im Speicher Ihres Browsers. Diese Daten
bleiben auf Ihrem Gerät, werden nie an uns oder andere gesendet und sorgen nur dafür, dass die Seite so funktioniert,
wie Sie es wünschen. Deshalb ist dafür keine Einwilligung erforderlich.</p>
<div class="text-page__table"><table>
  <thead><tr><th>Was</th><th>Wo</th><th>Wie lange</th></tr></thead>
  <tbody>
    <tr><td>Ihre Wahl der hellen oder dunklen Darstellung (nur wenn Sie sie ändern)</td><td>Cookie <code>scheme</code>, gemeinsam mit octarift.com</td><td>1 Jahr</td></tr>
    <tr><td>Ihre Sprache; Einstellungen von Countdown und Stoppuhr (Modus, Zeiten, Design, eigene Texte); Typ und
      Aussehen des QR-Codes; die zuletzt verwendete Textumwandlung; Bildformat, Qualität und Größe; Namensliste und
      Einstellungen des Zufallsgenerators; ob der iPhone-Hinweis angezeigt wurde</td>
      <td>localStorage</td><td>bis Sie sie löschen</td></tr>
    <tr><td>In „Text umwandeln“ eingegebener Text, im QR-Code-Generator ausgefüllte Angaben</td><td>sessionStorage</td><td>bis der Tab geschlossen wird</td></tr>
    <tr><td>Ihr eigenes Hintergrundbild oder -video für den Countdown</td><td>IndexedDB</td><td>bis Sie es entfernen</td></tr>
  </tbody>
</table></div>
<p>Sie können all das jederzeit in den Einstellungen Ihres Browsers löschen (Websitedaten für tools.octarift.com
löschen).</p>

<h2>4. Hosting</h2>
<p>Die Seite ist statisch und wird auf GitHub Pages (GitHub, Inc., USA) gehostet. Beim Laden einer Seite sendet Ihr
Browser die üblichen technischen Daten, etwa Ihre IP-Adresse, den Browsertyp und die Adresse der Seite. GitHub
verarbeitet sie, um die Seite auszuliefern und den Dienst vor Angriffen zu schützen, und kann sie kurzzeitig in
Server-Logs speichern. Wir haben keinen Zugriff auf diese Logs. Rechtsgrundlage ist das berechtigte Interesse am
sicheren Betrieb der Seite (Art. 6 Abs. 1 lit. f DSGVO). Übermittlungen in die USA stützen sich auf das
EU-US Data Privacy Framework oder Standardvertragsklauseln. Einzelheiten finden Sie in der
<a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" rel="noopener">Datenschutzerklärung
von GitHub</a>.</p>
<p>Das Laden der Unterstützung für HEIC-Fotos ruft nur eine Datei von dieser Seite ab; kein anderer Dienst wird
kontaktiert.</p>

<h2>5. Analyse und Werbung</h2>
<p>Die Seite verwendet derzeit keine Besucheranalyse und keine Werbung und bindet keine Inhalte Dritter ein. Sollten wir
sie künftig hinzufügen, aktualisieren wir diese Erklärung vorher und bitten Sie um Ihre Einwilligung, wo das Gesetz
es verlangt.</p>

<h2>6. Links zu anderen Websites</h2>
<p>Die Seite verlinkt auf andere Websites (zum Beispiel octarift.com oder Lizenzquellen). Sobald Sie einem Link folgen,
gelten deren Bestimmungen. Von Ihnen erstellte QR-Codes können Links zu Diensten wie PayPal oder Revolut enthalten;
die Seite selbst kontaktiert diese Dienste nicht.</p>

<h2>7. Ihre Rechte</h2>
<p>Nach der DSGVO haben Sie das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung,
Datenübertragbarkeit und Widerspruch. Da wir selbst keine Ihrer Daten speichern, betreffen diese Rechte vor allem die
Logs des Hosting-Anbieters; wir helfen Ihnen gern unter dem oben genannten Kontakt. Sie können sich auch bei einer
Aufsichtsbehörde beschweren; in Tschechien ist das das
<a href="https://uoou.gov.cz/en" rel="noopener">Amt für den Schutz personenbezogener Daten (ÚOOÚ)</a>.</p>

<h2>8. Änderungen</h2>
<p>Wir können diese Erklärung aktualisieren. Die aktuelle Fassung ist immer auf dieser Seite mit ihrem Gültigkeitsdatum
veröffentlicht.</p>

<h2>9. Sprachfassungen</h2>
<p>Diese deutsche Fassung ist eine Übersetzung. Bei Abweichungen zwischen den Sprachfassungen ist die tschechische
Fassung maßgeblich.</p>
`,
};

export const s = tr({ cs, en, de });
