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
<p>Diese deutsche Fassung ist eine Übersetzung. Bei Abweichungen zwischen den Sprachfassungen ist die
<a href="/privacy/?lang=en">englische Fassung</a> maßgeblich.</p>
`,
};

const es: typeof cs = {
  pageTitle: 'Política de privacidad',
  metaDescription:
    'Cómo trata Octarift Tools tus datos: las herramientas funcionan en tu navegador, los archivos y textos nunca se suben y la web no usa cookies de seguimiento.',
  heading: 'Política de privacidad',
  effective: 'En vigor desde el 20 de noviembre de 2026',
  body: `
<div class="text-page__summary">
  <p><strong>En resumen:</strong> Todas las herramientas funcionan directamente en tu navegador. Los textos, imágenes,
  fotos, datos de pago o contraseñas que introduces nunca se envían a ningún sitio y nadie, ni siquiera nosotros, tiene
  acceso a ellos. La web no tiene cuentas de usuario y no usa cookies de seguimiento, analítica ni publicidad.</p>
</div>

<h2>1. Quién gestiona la web</h2>
<p>El sitio web tools.octarift.com (la «web») lo gestiona Michal Šilhán, persona física que opera con el nombre
Octarift, República Checa. Contacto: <a href="mailto:octarift.studio@gmail.com">octarift.studio@gmail.com</a>.</p>

<h2>2. Datos que introduces en las herramientas</h2>
<p>El convertidor de texto, el generador de códigos QR, el compresor de imágenes, el sorteo aleatorio y la cuenta atrás
lo procesan todo en tu dispositivo. Lo que introduces o añades (textos, fotos con sus metadatos, números de cuenta,
contraseñas de Wi-Fi, el fondo de la cuenta atrás…) no se envía a ningún servidor. No tenemos ningún servidor que
pudiera recibirlo.</p>

<h2>3. Qué guarda la web en tu navegador</h2>
<p>Para que las herramientas recuerden tus ajustes, los guardan en el almacenamiento de tu navegador. Estos datos se
quedan en tu dispositivo, nunca se envían a nosotros ni a nadie más y solo sirven para que la web funcione como tú
quieres. Por eso no hace falta consentimiento para ellos.</p>
<div class="text-page__table"><table>
  <thead><tr><th>Qué</th><th>Dónde</th><th>Cuánto tiempo</th></tr></thead>
  <tbody>
    <tr><td>Tu elección de apariencia clara u oscura (solo si la cambias)</td><td>cookie <code>scheme</code>, compartida con octarift.com</td><td>1 año</td></tr>
    <tr><td>Tu idioma; ajustes de la cuenta atrás y el cronómetro (modo, tiempos, tema, textos propios); tipo y aspecto
      del código QR; la última conversión de texto usada; formato, calidad y tamaño de las imágenes; la lista de nombres y
      los ajustes del sorteo; si ya se mostró el consejo para iPhone</td>
      <td>localStorage</td><td>hasta que lo borres</td></tr>
    <tr><td>Texto escrito en el convertidor de texto, datos rellenados en el generador de códigos QR</td><td>sessionStorage</td><td>hasta cerrar la pestaña</td></tr>
    <tr><td>Tu propia imagen o vídeo de fondo para la cuenta atrás</td><td>IndexedDB</td><td>hasta que lo quites</td></tr>
  </tbody>
</table></div>
<p>Puedes borrarlo todo en cualquier momento en los ajustes del navegador (borrar los datos del sitio
tools.octarift.com).</p>

<h2>4. Alojamiento</h2>
<p>La web es estática y está alojada en GitHub Pages (GitHub, Inc., EE. UU.). Al cargar una página, tu navegador envía
los datos técnicos habituales, como tu dirección IP, el tipo de navegador y la dirección de la página. GitHub los trata
para servir la página y proteger el servicio frente a ataques, y puede conservarlos brevemente en registros del
servidor. Nosotros no tenemos acceso a esos registros. La base jurídica es el interés legítimo en un funcionamiento
seguro de la web (art. 6.1.f del RGPD). Las transferencias a EE. UU. se basan en el Marco de Privacidad de Datos UE-EE. UU.
o en cláusulas contractuales tipo. Más detalles en la
<a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" rel="noopener">declaración
de privacidad de GitHub</a>.</p>
<p>Cargar la compatibilidad con fotos HEIC solo descarga un archivo de esta misma web; no se contacta con ningún otro
servicio.</p>

<h2>5. Analítica y publicidad</h2>
<p>Actualmente la web no usa analítica de visitantes ni publicidad y no inserta contenido de terceros. Si los añadimos
en el futuro, actualizaremos antes esta política y te pediremos consentimiento cuando la ley lo exija.</p>

<h2>6. Enlaces a otras webs</h2>
<p>La web enlaza a otros sitios (por ejemplo octarift.com o las fuentes de las licencias). Cuando sigues un enlace, se
aplican sus políticas. Los códigos QR que creas pueden contener enlaces a servicios como PayPal o Revolut; la web en sí
no contacta con esos servicios.</p>

<h2>7. Tus derechos</h2>
<p>Según el RGPD tienes derecho de acceso, rectificación, supresión, limitación del tratamiento, portabilidad y
oposición. Como nosotros no guardamos ninguno de tus datos, estos derechos se refieren sobre todo a los registros del
proveedor de alojamiento; te ayudaremos con gusto en el contacto indicado arriba. También puedes presentar una
reclamación ante una autoridad de control; en la República Checa es la
<a href="https://uoou.gov.cz/en" rel="noopener">Oficina de Protección de Datos Personales (ÚOOÚ)</a>.</p>

<h2>8. Cambios</h2>
<p>Podemos actualizar esta política. La versión vigente siempre se publica en esta página con su fecha de entrada en vigor.</p>

<h2>9. Versiones lingüísticas</h2>
<p>Esta versión en español es una traducción. Si las versiones lingüísticas difieren, prevalece la
<a href="/privacy/?lang=en">versión en inglés</a>.</p>
`,
};

const fr: typeof cs = {
  pageTitle: 'Politique de confidentialité',
  metaDescription:
    'Comment Octarift Tools traite vos données : les outils fonctionnent dans votre navigateur, les fichiers et textes ne sont jamais envoyés et le site n’utilise aucun cookie de suivi.',
  heading: 'Politique de confidentialité',
  effective: 'En vigueur depuis le 20 novembre 2026',
  body: `
<div class="text-page__summary">
  <p><strong>En bref :</strong> Tous les outils fonctionnent directement dans votre navigateur. Les textes, images,
  photos, données de paiement ou mots de passe que vous saisissez ne sont jamais envoyés, et personne, pas même nous,
  n’y a accès. Le site n’a pas de comptes utilisateurs et n’utilise ni cookies de suivi, ni mesure d’audience, ni publicité.</p>
</div>

<h2>1. Qui gère le site</h2>
<p>Le site tools.octarift.com (le « site ») est géré par Michal Šilhán, personne physique exerçant sous le nom
Octarift, République tchèque. Contact : <a href="mailto:octarift.studio@gmail.com">octarift.studio@gmail.com</a>.</p>

<h2>2. Données que vous saisissez dans les outils</h2>
<p>Le convertisseur de texte, le générateur de codes QR, la compression d’images, le tirage au sort et le compte à
rebours traitent tout sur votre appareil. Ce que vous saisissez ou ajoutez (textes, photos avec leurs métadonnées,
numéros de compte, mots de passe Wi-Fi, fond du compte à rebours…) n’est envoyé à aucun serveur. Nous n’exploitons
aucun serveur qui pourrait le recevoir.</p>

<h2>3. Ce que le site enregistre dans votre navigateur</h2>
<p>Pour que les outils se souviennent de vos réglages, ils les enregistrent dans le stockage de votre navigateur. Ces
données restent sur votre appareil, ne nous sont jamais envoyées, ni à personne d’autre, et servent uniquement à faire
fonctionner le site comme vous l’avez demandé. C’est pourquoi aucun consentement n’est nécessaire.</p>
<div class="text-page__table"><table>
  <thead><tr><th>Quoi</th><th>Où</th><th>Combien de temps</th></tr></thead>
  <tbody>
    <tr><td>Votre choix d’apparence claire ou sombre (seulement si vous le modifiez)</td><td>cookie <code>scheme</code>, partagé avec octarift.com</td><td>1 an</td></tr>
    <tr><td>Votre langue ; réglages du compte à rebours et du chronomètre (mode, durées, thème, textes personnalisés) ;
      type et apparence du code QR ; la dernière conversion de texte utilisée ; format, qualité et taille des images ;
      la liste de noms et les réglages du tirage au sort ; l’affichage ou non de l’astuce iPhone</td>
      <td>localStorage</td><td>jusqu’à ce que vous les supprimiez</td></tr>
    <tr><td>Texte saisi dans le convertisseur de texte, informations remplies dans le générateur de codes QR</td><td>sessionStorage</td><td>jusqu’à la fermeture de l’onglet</td></tr>
    <tr><td>Votre image ou vidéo de fond pour le compte à rebours</td><td>IndexedDB</td><td>jusqu’à ce que vous la retiriez</td></tr>
  </tbody>
</table></div>
<p>Vous pouvez tout supprimer à tout moment dans les réglages de votre navigateur (effacer les données du site
tools.octarift.com).</p>

<h2>4. Hébergement</h2>
<p>Le site est statique et hébergé sur GitHub Pages (GitHub, Inc., États-Unis). Au chargement d’une page, votre
navigateur envoie les données techniques habituelles, comme votre adresse IP, le type de navigateur et l’adresse de la
page. GitHub les traite pour fournir la page et protéger le service contre les attaques, et peut les conserver
brièvement dans des journaux de serveur. Nous n’avons pas accès à ces journaux. La base juridique est l’intérêt
légitime à exploiter le site de manière sûre (art. 6, par. 1, point f, du RGPD). Les transferts vers les États-Unis
reposent sur le cadre de protection des données UE–États-Unis ou sur des clauses contractuelles types. Voir la
<a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" rel="noopener">déclaration
de confidentialité de GitHub</a> pour plus de détails.</p>
<p>Le chargement de la prise en charge des photos HEIC ne télécharge qu’un fichier de ce site ; aucun autre service
n’est contacté.</p>

<h2>5. Mesure d’audience et publicité</h2>
<p>Le site n’utilise actuellement ni mesure d’audience ni publicité et n’intègre aucun contenu tiers. Si nous en
ajoutons à l’avenir, nous mettrons d’abord cette politique à jour et vous demanderons votre consentement lorsque la loi
l’exige.</p>

<h2>6. Liens vers d’autres sites</h2>
<p>Le site contient des liens vers d’autres sites (par exemple octarift.com ou les sources des licences). Dès que vous
suivez un lien, leurs politiques s’appliquent. Les codes QR que vous créez peuvent contenir des liens vers des services
comme PayPal ou Revolut ; le site lui-même ne contacte pas ces services.</p>

<h2>7. Vos droits</h2>
<p>En vertu du RGPD, vous disposez d’un droit d’accès, de rectification, d’effacement, de limitation du traitement, de
portabilité et d’opposition. Comme nous ne conservons aucune de vos données, ces droits concernent surtout les journaux
de l’hébergeur ; nous vous aiderons volontiers à l’adresse ci-dessus. Vous pouvez aussi introduire une réclamation
auprès d’une autorité de contrôle ; en République tchèque, il s’agit de
l’<a href="https://uoou.gov.cz/en" rel="noopener">Office pour la protection des données personnelles (ÚOOÚ)</a>.</p>

<h2>8. Modifications</h2>
<p>Nous pouvons mettre à jour cette politique. La version en vigueur est toujours publiée sur cette page avec sa date
d’entrée en vigueur.</p>

<h2>9. Versions linguistiques</h2>
<p>Cette version française est une traduction. En cas de divergence entre les versions linguistiques, la
<a href="/privacy/?lang=en">version anglaise</a> prévaut.</p>
`,
};

const it: typeof cs = {
  pageTitle: 'Informativa sulla privacy',
  metaDescription:
    'Come Octarift Tools tratta i tuoi dati: gli strumenti funzionano nel tuo browser, file e testi non vengono mai caricati e il sito non usa cookie di tracciamento.',
  heading: 'Informativa sulla privacy',
  effective: 'In vigore dal 20 novembre 2026',
  body: `
<div class="text-page__summary">
  <p><strong>In breve:</strong> Tutti gli strumenti funzionano direttamente nel tuo browser. Testi, immagini, foto, dati
  di pagamento o password che inserisci non vengono mai inviati e nessuno, nemmeno noi, vi ha accesso. Il sito non ha
  account utente e non usa cookie di tracciamento, strumenti di analisi né pubblicità.</p>
</div>

<h2>1. Chi gestisce il sito</h2>
<p>Il sito tools.octarift.com (il «sito») è gestito da Michal Šilhán, persona fisica che opera con il nome Octarift,
Repubblica Ceca. Contatto: <a href="mailto:octarift.studio@gmail.com">octarift.studio@gmail.com</a>.</p>

<h2>2. Dati che inserisci negli strumenti</h2>
<p>Il convertitore di testo, il generatore di codici QR, la compressione immagini, il sorteggio e il conto alla rovescia
elaborano tutto sul tuo dispositivo. Ciò che inserisci o aggiungi (testi, foto con i loro metadati, numeri di conto,
password Wi-Fi, lo sfondo del conto alla rovescia…) non viene inviato a nessun server. Non gestiamo alcun server che
possa riceverlo.</p>

<h2>3. Cosa salva il sito nel tuo browser</h2>
<p>Perché gli strumenti ricordino le tue impostazioni, le salvano nella memoria del browser. Questi dati restano sul tuo
dispositivo, non vengono mai inviati a noi né ad altri e servono solo a far funzionare il sito come hai chiesto. Per
questo non serve il consenso.</p>
<div class="text-page__table"><table>
  <thead><tr><th>Cosa</th><th>Dove</th><th>Per quanto</th></tr></thead>
  <tbody>
    <tr><td>La tua scelta di aspetto chiaro o scuro (solo se la cambi)</td><td>cookie <code>scheme</code>, condiviso con octarift.com</td><td>1 anno</td></tr>
    <tr><td>La tua lingua; impostazioni del conto alla rovescia e del cronometro (modalità, tempi, tema, testi
      personalizzati); tipo e aspetto del codice QR; l’ultima conversione di testo usata; formato, qualità e dimensione
      delle immagini; l’elenco dei nomi e le impostazioni del sorteggio; se il suggerimento per iPhone è stato mostrato</td>
      <td>localStorage</td><td>finché non li elimini</td></tr>
    <tr><td>Testo scritto nel convertitore di testo, dati inseriti nel generatore di codici QR</td><td>sessionStorage</td><td>fino alla chiusura della scheda</td></tr>
    <tr><td>La tua immagine o il tuo video di sfondo per il conto alla rovescia</td><td>IndexedDB</td><td>finché non lo rimuovi</td></tr>
  </tbody>
</table></div>
<p>Puoi eliminare tutto in qualsiasi momento dalle impostazioni del browser (cancella i dati del sito
tools.octarift.com).</p>

<h2>4. Hosting</h2>
<p>Il sito è statico ed è ospitato su GitHub Pages (GitHub, Inc., USA). Quando una pagina viene caricata, il browser
invia i normali dati tecnici, come indirizzo IP, tipo di browser e indirizzo della pagina. GitHub li tratta per fornire
la pagina e proteggere il servizio dagli attacchi e può conservarli per breve tempo nei log del server. Non abbiamo
accesso a questi log. La base giuridica è il legittimo interesse a un funzionamento sicuro del sito (art. 6, par. 1,
lett. f del GDPR). I trasferimenti verso gli USA si basano sul Data Privacy Framework UE-USA o su clausole contrattuali
tipo. Maggiori dettagli nell’<a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" rel="noopener">informativa
sulla privacy di GitHub</a>.</p>
<p>Il caricamento del supporto per le foto HEIC scarica solo un file da questo sito; nessun altro servizio viene
contattato.</p>

<h2>5. Analisi e pubblicità</h2>
<p>Al momento il sito non usa analisi dei visitatori né pubblicità e non incorpora contenuti di terze parti. Se li
aggiungeremo in futuro, aggiorneremo prima questa informativa e ti chiederemo il consenso dove la legge lo richiede.</p>

<h2>6. Link ad altri siti</h2>
<p>Il sito contiene link ad altri siti (ad esempio octarift.com o le fonti delle licenze). Quando segui un link, valgono
le loro regole. I codici QR che crei possono contenere link a servizi come PayPal o Revolut; il sito stesso non
contatta questi servizi.</p>

<h2>7. I tuoi diritti</h2>
<p>In base al GDPR hai diritto di accesso, rettifica, cancellazione, limitazione del trattamento, portabilità dei dati
e opposizione. Poiché non conserviamo alcun tuo dato, questi diritti riguardano soprattutto i log del fornitore di
hosting; ti aiuteremo volentieri al contatto indicato sopra. Puoi anche presentare reclamo a un’autorità di controllo;
nella Repubblica Ceca è l’<a href="https://uoou.gov.cz/en" rel="noopener">Ufficio per la protezione dei dati personali (ÚOOÚ)</a>.</p>

<h2>8. Modifiche</h2>
<p>Possiamo aggiornare questa informativa. La versione in vigore è sempre pubblicata su questa pagina con la sua data di
entrata in vigore.</p>

<h2>9. Versioni linguistiche</h2>
<p>Questa versione italiana è una traduzione. In caso di differenze tra le versioni linguistiche prevale la
<a href="/privacy/?lang=en">versione inglese</a>.</p>
`,
};

const pl: typeof cs = {
  pageTitle: 'Polityka prywatności',
  metaDescription:
    'Jak Octarift Tools obchodzi się z Twoimi danymi: narzędzia działają w przeglądarce, pliki i teksty nigdy nie są wysyłane, a strona nie używa śledzących plików cookie.',
  heading: 'Polityka prywatności',
  effective: 'Obowiązuje od 20 listopada 2026 r.',
  body: `
<div class="text-page__summary">
  <p><strong>W skrócie:</strong> Wszystkie narzędzia działają bezpośrednio w Twojej przeglądarce. Teksty, obrazy,
  zdjęcia, dane płatności ani hasła, które wpisujesz, nigdy nie są nigdzie wysyłane i nikt, również my, nie ma do nich
  dostępu. Strona nie ma kont użytkowników i nie używa śledzących plików cookie, analityki ani reklam.</p>
</div>

<h2>1. Kto prowadzi stronę</h2>
<p>Stronę tools.octarift.com („strona”) prowadzi Michal Šilhán, osoba fizyczna działająca pod nazwą Octarift,
Republika Czeska. Kontakt: <a href="mailto:octarift.studio@gmail.com">octarift.studio@gmail.com</a>.</p>

<h2>2. Dane wpisywane do narzędzi</h2>
<p>Konwerter tekstu, generator kodów QR, zmniejszanie zdjęć, losowanie i odliczanie przetwarzają wszystko na Twoim
urządzeniu. To, co wpisujesz lub dodajesz (teksty, zdjęcia wraz z metadanymi, numery kont, hasła do Wi-Fi, tło
odliczania…), nie jest wysyłane na żaden serwer. Nie prowadzimy żadnego serwera, który mógłby to odebrać.</p>

<h2>3. Co strona zapisuje w Twojej przeglądarce</h2>
<p>Aby narzędzia pamiętały Twoje ustawienia, zapisują je w pamięci przeglądarki. Te dane zostają na Twoim urządzeniu,
nigdy nie trafiają do nas ani do nikogo innego i służą tylko temu, by strona działała tak, jak chcesz. Dlatego nie jest
do tego potrzebna zgoda.</p>
<div class="text-page__table"><table>
  <thead><tr><th>Co</th><th>Gdzie</th><th>Jak długo</th></tr></thead>
  <tbody>
    <tr><td>Twój wybór jasnego lub ciemnego wyglądu (tylko jeśli go zmienisz)</td><td>plik cookie <code>scheme</code>, wspólny z octarift.com</td><td>1 rok</td></tr>
    <tr><td>Twój język; ustawienia odliczania i stopera (tryb, czasy, motyw, własne teksty); rodzaj i wygląd kodu QR;
      ostatnio użyta konwersja tekstu; format, jakość i rozmiar zdjęć; lista imion i ustawienia losowania; czy
      wyświetlono wskazówkę dla iPhone’a</td>
      <td>localStorage</td><td>do czasu usunięcia</td></tr>
    <tr><td>Tekst wpisany w konwerterze tekstu, dane wpisane w generatorze kodów QR</td><td>sessionStorage</td><td>do zamknięcia karty</td></tr>
    <tr><td>Twój własny obraz lub film w tle odliczania</td><td>IndexedDB</td><td>do czasu usunięcia</td></tr>
  </tbody>
</table></div>
<p>W każdej chwili możesz to wszystko usunąć w ustawieniach przeglądarki (wyczyść dane witryny tools.octarift.com).</p>

<h2>4. Hosting</h2>
<p>Strona jest statyczna i hostowana na GitHub Pages (GitHub, Inc., USA). Podczas ładowania strony przeglądarka wysyła
zwykłe dane techniczne, takie jak adres IP, rodzaj przeglądarki i adres strony. GitHub przetwarza je, aby dostarczyć
stronę i chronić usługę przed atakami, i może je krótko przechowywać w logach serwera. Nie mamy dostępu do tych logów.
Podstawą prawną jest prawnie uzasadniony interes w bezpiecznym działaniu strony (art. 6 ust. 1 lit. f RODO).
Przekazywanie danych do USA opiera się na ramach ochrony danych UE–USA lub standardowych klauzulach umownych.
Szczegóły znajdziesz w
<a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" rel="noopener">oświadczeniu
o prywatności GitHub</a>.</p>
<p>Wczytanie obsługi zdjęć HEIC pobiera tylko plik z tej strony; żadna inna usługa nie jest kontaktowana.</p>

<h2>5. Analityka i reklamy</h2>
<p>Strona obecnie nie używa analityki odwiedzin ani reklam i nie osadza treści stron trzecich. Jeśli je w przyszłości
dodamy, wcześniej zaktualizujemy tę politykę i poprosimy o zgodę tam, gdzie wymaga tego prawo.</p>

<h2>6. Linki do innych stron</h2>
<p>Strona zawiera linki do innych witryn (na przykład octarift.com lub źródeł licencji). Po przejściu przez link
obowiązują ich zasady. Tworzone przez Ciebie kody QR mogą zawierać linki do usług takich jak PayPal czy Revolut; sama
strona się z tymi usługami nie kontaktuje.</p>

<h2>7. Twoje prawa</h2>
<p>Zgodnie z RODO masz prawo dostępu, sprostowania, usunięcia, ograniczenia przetwarzania, przenoszenia danych i
sprzeciwu. Ponieważ sami nie przechowujemy żadnych Twoich danych, prawa te dotyczą głównie logów dostawcy hostingu;
chętnie pomożemy pod podanym wyżej adresem. Możesz też złożyć skargę do organu nadzorczego; w Czechach jest to
<a href="https://uoou.gov.cz/en" rel="noopener">Urząd Ochrony Danych Osobowych (ÚOOÚ)</a>, w Polsce Prezes UODO.</p>

<h2>8. Zmiany</h2>
<p>Możemy aktualizować tę politykę. Aktualna wersja jest zawsze opublikowana na tej stronie wraz z datą obowiązywania.</p>

<h2>9. Wersje językowe</h2>
<p>Ta polska wersja jest tłumaczeniem. W razie rozbieżności między wersjami językowymi rozstrzyga
<a href="/privacy/?lang=en">wersja angielska</a>.</p>
`,
};

const sk: typeof cs = {
  pageTitle: 'Zásady ochrany súkromia',
  metaDescription:
    'Ako Octarift Tools zaobchádza s vašimi údajmi: nástroje bežia vo vašom prehliadači, súbory ani texty sa nikam neodosielajú a web nepoužíva sledovacie cookies.',
  heading: 'Zásady ochrany súkromia',
  effective: 'Účinné od 20. novembra 2026',
  body: `
<div class="text-page__summary">
  <p><strong>Stručne:</strong> Všetky nástroje bežia priamo vo vašom prehliadači. Texty, obrázky, fotky, platobné údaje
  ani heslá, ktoré zadáte, sa nikam neodosielajú a nikto, ani my, k nim nemá prístup. Web nemá používateľské účty a
  nepoužíva sledovacie cookies, analytiku ani reklamu.</p>
</div>

<h2>1. Kto web prevádzkuje</h2>
<p>Web tools.octarift.com („web“) prevádzkuje Michal Šilhán, fyzická osoba vystupujúca pod názvom Octarift, Česká
republika. Kontakt: <a href="mailto:octarift.studio@gmail.com">octarift.studio@gmail.com</a>.</p>

<h2>2. Údaje, ktoré zadávate do nástrojov</h2>
<p>Prevod textu, generátor QR kódov, zmenšenie obrázkov, losovanie a odpočet spracúvajú všetko vo vašom zariadení. Čo
zadáte alebo pridáte (texty, fotky vrátane metadát, čísla účtov, heslá k Wi-Fi, pozadie odpočtu…), sa neodosiela na
žiadny server. Neprevádzkujeme žiadny server, ktorý by to mohol prijať.</p>

<h2>3. Čo web ukladá vo vašom prehliadači</h2>
<p>Aby si nástroje pamätali vaše nastavenia, ukladajú ich do úložiska prehliadača. Tieto údaje zostávajú vo vašom
zariadení, nikdy sa neodosielajú nám ani nikomu inému a slúžia len na to, aby web fungoval tak, ako chcete. Preto na ne
nie je potrebný súhlas.</p>
<div class="text-page__table"><table>
  <thead><tr><th>Čo</th><th>Kde</th><th>Ako dlho</th></tr></thead>
  <tbody>
    <tr><td>Vaša voľba svetlého alebo tmavého vzhľadu (len ak ju zmeníte)</td><td>cookie <code>scheme</code>, spoločná s octarift.com</td><td>1 rok</td></tr>
    <tr><td>Váš jazyk; nastavenia odpočtu a stopiek (režim, časy, téma, vlastné texty); typ a vzhľad QR kódu; naposledy
      použitý prevod textu; formát, kvalita a veľkosť obrázkov; zoznam mien a nastavenia losovania; či sa zobrazil tip
      pre iPhone</td>
      <td>localStorage</td><td>kým ich nezmažete</td></tr>
    <tr><td>Text napísaný v prevode textu, údaje vyplnené v generátore QR kódov</td><td>sessionStorage</td><td>do zatvorenia karty</td></tr>
    <tr><td>Váš vlastný obrázok alebo video na pozadí odpočtu</td><td>IndexedDB</td><td>kým ho neodstránite</td></tr>
  </tbody>
</table></div>
<p>Všetko môžete kedykoľvek zmazať v nastaveniach prehliadača (vymazať údaje stránky tools.octarift.com).</p>

<h2>4. Hosting</h2>
<p>Web je statický a hostovaný na GitHub Pages (GitHub, Inc., USA). Pri načítaní stránky prehliadač odošle bežné
technické údaje, napríklad IP adresu, typ prehliadača a adresu stránky. GitHub ich spracúva, aby stránku doručil a
chránil službu pred útokmi, a môže ich krátko uchovávať v serverových logoch. K týmto logom nemáme prístup. Právnym
základom je oprávnený záujem na bezpečnej prevádzke webu (čl. 6 ods. 1 písm. f GDPR). Prenos do USA sa opiera o rámec
ochrany údajov EÚ – USA alebo štandardné zmluvné doložky. Podrobnosti nájdete vo
<a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" rel="noopener">vyhlásení
o ochrane súkromia GitHubu</a>.</p>
<p>Načítanie podpory fotiek HEIC stiahne len súbor z tohto webu; žiadna iná služba sa nekontaktuje.</p>

<h2>5. Analytika a reklama</h2>
<p>Web v súčasnosti nepoužíva analytiku návštevnosti ani reklamu a nevkladá obsah tretích strán. Ak ich v budúcnosti
pridáme, tieto zásady vopred aktualizujeme a tam, kde to zákon vyžaduje, vás požiadame o súhlas.</p>

<h2>6. Odkazy na iné weby</h2>
<p>Web odkazuje na iné stránky (napríklad octarift.com alebo zdroje licencií). Keď prejdete na odkaz, platia ich
pravidlá. QR kódy, ktoré vytvoríte, môžu obsahovať odkazy na služby ako PayPal alebo Revolut; samotný web tieto služby
nekontaktuje.</p>

<h2>7. Vaše práva</h2>
<p>Podľa GDPR máte právo na prístup, opravu, vymazanie, obmedzenie spracúvania, prenosnosť údajov a námietku. Keďže
sami žiadne vaše údaje neuchovávame, tieto práva sa týkajú najmä logov poskytovateľa hostingu; radi pomôžeme na
uvedenom kontakte. Môžete tiež podať sťažnosť dozornému orgánu; v Českej republike je to
<a href="https://uoou.gov.cz/en" rel="noopener">Úrad pre ochranu osobných údajov (ÚOOÚ)</a>, na Slovensku Úrad na
ochranu osobných údajov SR.</p>

<h2>8. Zmeny</h2>
<p>Tieto zásady môžeme aktualizovať. Aktuálna verzia je vždy zverejnená na tejto stránke s dátumom účinnosti.</p>

<h2>9. Jazykové verzie</h2>
<p>Táto slovenská verzia je preklad. Pri rozdieloch medzi jazykovými verziami má prednosť
<a href="/privacy/?lang=en">anglická verzia</a>.</p>
`,
};

export const s = tr({ cs, de, en, es, fr, it, pl, sk });
