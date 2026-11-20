/** Translations of the guide (the Czech one is the page's HTML). */
import type { GuideTranslation } from '@shared/guide-page';

export const en: GuideTranslation = {
  title: 'How to convert HEIC to JPG – iPhone photos, free and without uploading',
  description: 'How to convert iPhone HEIC photos to JPG for free right in your browser, without uploading them, and how to make your iPhone take JPG photos.',
  html: `
<h1>How to convert HEIC to JPG</h1>
<p class="text-page__meta">Guide · iPhone photos</p>
<p>iPhones save photos as <strong>HEIC</strong> (HEIF). It is efficient: a photo takes about half the space of a
JPG at similar quality. But many programs, websites and older computers cannot open it. The easiest fix is to convert
the photos to the universal <strong>JPG</strong> format.</p>

<div class="guide-cta"><p>The conversion runs right in your browser; photos are never uploaded. You can add many at once.</p>
<a class="button button--primary" href="/image-compressor/">Convert HEIC to JPG</a></div>

<h2>Steps</h2>
<ol>
  <li>Open the <a href="/image-compressor/">image compressor</a>.</li>
  <li>Choose <strong>JPG</strong> as the format and a quality around <strong>80%</strong>.</li>
  <li>Keep <strong>Original size</strong> for the longest side, or make the photos smaller right away, e.g. 1920 px for e-mail.</li>
  <li>Drop the HEIC photos into the window (or choose them with the button).</li>
  <li>Download them one by one, or all at once as a ZIP.</li>
</ol>
<p>The conversion removes metadata, including the <strong>GPS location</strong> where the photo was taken. That is
useful when you share photos or post them online.</p>

<h2>How to make your iPhone take JPG photos</h2>
<p>On the iPhone, open <strong>Settings → Camera → Formats</strong> and choose <strong>Most Compatible</strong>.
New photos are then saved as JPG (they take more space). Photos you already took stay HEIC.</p>
<p>When copying photos to a computer with a cable, you can also set <strong>Settings → Photos → Transfer to Mac or
PC</strong> to <strong>Automatic</strong>, and the iPhone converts them during the transfer.</p>

<h2>FAQ</h2>
<h3>Does the photo lose quality?</h3>
<p>At 80–90% quality the difference is practically invisible. If you plan to edit the photos further, choose a higher quality.</p>
<h3>Why can't Windows open HEIC?</h3>
<p>Windows needs add-ons from the Microsoft Store (HEIF image and HEVC video extensions). Converting to JPG is simpler,
because every device opens JPG.</p>
<h3>Are my photos uploaded anywhere?</h3>
<p>No. The whole conversion happens in your browser. Your photos never leave your computer or phone.</p>

<div class="guide-related"><h2>More guides</h2><ul><li><a href="/jak-vytvorit-qr-platbu/">How to create a QR payment code</a></li><li><a href="/pomodoro-technika/">The Pomodoro Technique</a></li><li><a href="/tabata-trenink/">Tabata workout</a></li></ul></div>
`,
};

export const de: GuideTranslation = {
  title: 'HEIC in JPG umwandeln – iPhone-Fotos kostenlos und ohne Hochladen',
  description: 'So wandeln Sie iPhone-Fotos von HEIC kostenlos direkt im Browser in JPG um, ohne sie hochzuladen, und so nimmt Ihr iPhone Fotos als JPG auf.',
  html: `
<h1>HEIC in JPG umwandeln</h1>
<p class="text-page__meta">Anleitung · iPhone-Fotos</p>
<p>iPhones speichern Fotos als <strong>HEIC</strong> (HEIF). Das ist effizient: Ein Foto braucht bei ähnlicher
Qualität etwa halb so viel Platz wie ein JPG. Viele Programme, Websites und ältere Computer können es aber nicht
öffnen. Am einfachsten wandeln Sie die Fotos in das universelle Format <strong>JPG</strong> um.</p>

<div class="guide-cta"><p>Die Umwandlung läuft direkt in Ihrem Browser; die Fotos werden nie hochgeladen. Sie können viele auf einmal hinzufügen.</p>
<a class="button button--primary" href="/image-compressor/">HEIC in JPG umwandeln</a></div>

<h2>Schritte</h2>
<ol>
  <li>Öffnen Sie <a href="/image-compressor/">Bilder verkleinern</a>.</li>
  <li>Wählen Sie als Format <strong>JPG</strong> und eine Qualität um <strong>80 %</strong>.</li>
  <li>Lassen Sie bei der längsten Seite <strong>Originalgröße</strong>, oder verkleinern Sie die Fotos gleich, z. B. auf 1920 px für E-Mails.</li>
  <li>Ziehen Sie die HEIC-Fotos in das Fenster (oder wählen Sie sie über die Schaltfläche aus).</li>
  <li>Laden Sie sie einzeln herunter oder alle zusammen als ZIP.</li>
</ol>
<p>Bei der Umwandlung werden die Metadaten entfernt, auch der <strong>GPS-Standort</strong>, an dem das Foto
aufgenommen wurde. Das ist praktisch, wenn Sie Fotos teilen oder online stellen.</p>

<h2>So nimmt Ihr iPhone Fotos als JPG auf</h2>
<p>Öffnen Sie auf dem iPhone <strong>Einstellungen → Kamera → Formate</strong> und wählen Sie
<strong>Maximale Kompatibilität</strong>. Neue Fotos werden dann als JPG gespeichert (sie brauchen mehr Platz).
Bereits aufgenommene Fotos bleiben HEIC.</p>
<p>Wenn Sie Fotos per Kabel auf einen Computer kopieren, können Sie außerdem
<strong>Einstellungen → Fotos → Auf Mac oder PC übertragen</strong> auf <strong>Automatisch</strong> stellen; dann
wandelt das iPhone sie bei der Übertragung um.</p>

<h2>Häufige Fragen</h2>
<h3>Verliert das Foto an Qualität?</h3>
<p>Bei 80–90 % Qualität ist der Unterschied praktisch unsichtbar. Wenn Sie die Fotos weiter bearbeiten möchten, wählen Sie eine höhere Qualität.</p>
<h3>Warum kann Windows HEIC nicht öffnen?</h3>
<p>Windows braucht dafür Erweiterungen aus dem Microsoft Store (HEIF-Bilderweiterungen und HEVC-Videoerweiterungen).
Die Umwandlung in JPG ist einfacher, denn JPG öffnet jedes Gerät.</p>
<h3>Werden meine Fotos irgendwohin hochgeladen?</h3>
<p>Nein. Die gesamte Umwandlung findet in Ihrem Browser statt. Ihre Fotos verlassen Ihren Computer oder Ihr Handy nie.</p>

<div class="guide-related"><h2>Weitere Anleitungen</h2><ul><li><a href="/pomodoro-technika/">Die Pomodoro-Technik</a></li><li><a href="/tabata-trenink/">Tabata-Training</a></li></ul></div>
`,
};

export const es: GuideTranslation = {
  title: 'Cómo convertir HEIC a JPG – fotos del iPhone, gratis y sin subirlas',
  description: 'Cómo convertir gratis las fotos HEIC del iPhone a JPG directamente en el navegador, sin subirlas, y cómo hacer que el iPhone haga las fotos en JPG.',
  html: `
<h1>Cómo convertir HEIC a JPG</h1>
<p class="text-page__meta">Guía · fotos del iPhone</p>
<p>El iPhone guarda las fotos en formato <strong>HEIC</strong> (HEIF). Es eficiente: una foto ocupa más o menos la mitad
que un JPG de calidad similar. Pero muchos programas, webs y ordenadores antiguos no lo abren. Lo más fácil es convertir
las fotos al formato universal <strong>JPG</strong>.</p>

<div class="guide-cta"><p>La conversión se hace en tu navegador; las fotos nunca se suben. Puedes añadir muchas a la vez.</p>
<a class="button button--primary" href="/image-compressor/">Convertir HEIC a JPG</a></div>

<h2>Pasos</h2>
<ol>
  <li>Abre el <a href="/image-compressor/">compresor de imágenes</a>.</li>
  <li>Elige <strong>JPG</strong> como formato y una calidad de alrededor del <strong>80 %</strong>.</li>
  <li>Deja <strong>Tamaño original</strong> en el lado más largo o reduce ya las fotos, p. ej. a 1920 px para el correo.</li>
  <li>Arrastra las fotos HEIC a la ventana (o elígelas con el botón).</li>
  <li>Descárgalas una a una o todas juntas en un ZIP.</li>
</ol>
<p>La conversión elimina los metadatos, incluida la <strong>ubicación GPS</strong> donde se hizo la foto. Es útil cuando
compartes fotos o las publicas en internet.</p>

<h2>Cómo hacer que el iPhone haga fotos en JPG</h2>
<p>En el iPhone, abre <strong>Ajustes → Cámara → Formatos</strong> y elige <strong>Más compatible</strong>. Las fotos
nuevas se guardarán en JPG (ocupan más). Las que ya hiciste siguen en HEIC.</p>
<p>Si copias las fotos al ordenador con un cable, también puedes poner <strong>Ajustes → Fotos → Transferir a Mac o
PC</strong> en <strong>Automático</strong>, y el iPhone las convertirá durante la transferencia.</p>

<h2>Preguntas frecuentes</h2>
<h3>¿La foto pierde calidad?</h3>
<p>Con una calidad del 80–90 % la diferencia es prácticamente invisible. Si vas a seguir editando las fotos, elige una calidad mayor.</p>
<h3>¿Por qué Windows no abre HEIC?</h3>
<p>Windows necesita extensiones de Microsoft Store (extensiones de imagen HEIF y de vídeo HEVC). Convertir a JPG es más
sencillo, porque cualquier dispositivo abre JPG.</p>
<h3>¿Se suben mis fotos a algún sitio?</h3>
<p>No. Toda la conversión ocurre en tu navegador. Tus fotos nunca salen de tu ordenador o móvil.</p>

<div class="guide-related"><h2>Más guías</h2><ul><li><a href="/pomodoro-technika/">La técnica Pomodoro</a></li><li><a href="/tabata-trenink/">Entrenamiento Tabata</a></li></ul></div>
`,
};

export const fr: GuideTranslation = {
  title: 'Convertir HEIC en JPG – photos d’iPhone, gratuitement et sans envoi',
  description: 'Comment convertir gratuitement les photos HEIC de l’iPhone en JPG directement dans le navigateur, sans les envoyer, et comment faire prendre des photos en JPG à l’iPhone.',
  html: `
<h1>Convertir HEIC en JPG</h1>
<p class="text-page__meta">Guide · photos d’iPhone</p>
<p>L’iPhone enregistre les photos au format <strong>HEIC</strong> (HEIF). C’est efficace : une photo prend environ deux
fois moins de place qu’un JPG de qualité comparable. Mais beaucoup de logiciels, de sites et d’ordinateurs anciens ne
savent pas l’ouvrir. Le plus simple est de convertir les photos au format universel <strong>JPG</strong>.</p>

<div class="guide-cta"><p>La conversion se fait directement dans votre navigateur ; les photos ne sont jamais envoyées. Vous pouvez en ajouter beaucoup à la fois.</p>
<a class="button button--primary" href="/image-compressor/">Convertir HEIC en JPG</a></div>

<h2>Étapes</h2>
<ol>
  <li>Ouvrez l’outil <a href="/image-compressor/">Compresser des images</a>.</li>
  <li>Choisissez le format <strong>JPG</strong> et une qualité d’environ <strong>80 %</strong>.</li>
  <li>Gardez <strong>Taille d’origine</strong> pour le plus grand côté, ou réduisez tout de suite les photos, p. ex. à 1920 px pour l’e-mail.</li>
  <li>Déposez les photos HEIC dans la fenêtre (ou choisissez-les avec le bouton).</li>
  <li>Téléchargez-les une par une, ou toutes ensemble dans un ZIP.</li>
</ol>
<p>La conversion supprime les métadonnées, y compris la <strong>position GPS</strong> où la photo a été prise. C’est utile
quand vous partagez des photos ou les publiez en ligne.</p>

<h2>Faire prendre des photos en JPG à l’iPhone</h2>
<p>Sur l’iPhone, ouvrez <strong>Réglages → Appareil photo → Formats</strong> et choisissez <strong>Le plus
compatible</strong>. Les nouvelles photos seront enregistrées en JPG (elles prennent plus de place). Les photos déjà
prises restent en HEIC.</p>
<p>Si vous copiez les photos sur un ordinateur par câble, vous pouvez aussi régler <strong>Réglages → Photos →
Transférer sur Mac ou PC</strong> sur <strong>Automatique</strong> : l’iPhone les convertit pendant le transfert.</p>

<h2>Questions fréquentes</h2>
<h3>La photo perd-elle en qualité ?</h3>
<p>À 80–90 % de qualité, la différence est pratiquement invisible. Si vous comptez retoucher les photos, choisissez une qualité plus élevée.</p>
<h3>Pourquoi Windows n’ouvre-t-il pas les HEIC ?</h3>
<p>Windows a besoin d’extensions du Microsoft Store (extensions d’images HEIF et vidéo HEVC). Convertir en JPG est plus
simple, car tous les appareils ouvrent le JPG.</p>
<h3>Mes photos sont-elles envoyées quelque part ?</h3>
<p>Non. Toute la conversion a lieu dans votre navigateur. Vos photos ne quittent jamais votre ordinateur ou votre téléphone.</p>

<div class="guide-related"><h2>Autres guides</h2><ul><li><a href="/pomodoro-technika/">La technique Pomodoro</a></li><li><a href="/tabata-trenink/">Entraînement Tabata</a></li></ul></div>
`,
};

export const it: GuideTranslation = {
  title: 'Come convertire HEIC in JPG – foto dell’iPhone, gratis e senza caricarle',
  description: 'Come convertire gratis le foto HEIC dell’iPhone in JPG direttamente nel browser, senza caricarle, e come far scattare all’iPhone foto in JPG.',
  html: `
<h1>Come convertire HEIC in JPG</h1>
<p class="text-page__meta">Guida · foto dell’iPhone</p>
<p>L’iPhone salva le foto in formato <strong>HEIC</strong> (HEIF). È efficiente: una foto occupa circa la metà di un JPG
di qualità simile. Però molti programmi, siti e computer meno recenti non riescono ad aprirlo. La soluzione più semplice
è convertire le foto nel formato universale <strong>JPG</strong>.</p>

<div class="guide-cta"><p>La conversione avviene direttamente nel browser; le foto non vengono mai caricate. Puoi aggiungerne molte insieme.</p>
<a class="button button--primary" href="/image-compressor/">Converti HEIC in JPG</a></div>

<h2>Passaggi</h2>
<ol>
  <li>Apri lo strumento <a href="/image-compressor/">Comprimi immagini</a>.</li>
  <li>Scegli il formato <strong>JPG</strong> e una qualità intorno all’<strong>80%</strong>.</li>
  <li>Lascia <strong>Dimensione originale</strong> per il lato più lungo oppure riduci subito le foto, ad es. a 1920 px per l’e-mail.</li>
  <li>Trascina le foto HEIC nella finestra (o sceglile con il pulsante).</li>
  <li>Scaricale una alla volta o tutte insieme in un file ZIP.</li>
</ol>
<p>La conversione rimuove i metadati, compresa la <strong>posizione GPS</strong> in cui è stata scattata la foto. È utile
quando condividi le foto o le pubblichi online.</p>

<h2>Come far scattare all’iPhone foto in JPG</h2>
<p>Sull’iPhone apri <strong>Impostazioni → Fotocamera → Formati</strong> e scegli <strong>Più compatibile</strong>. Le nuove
foto verranno salvate in JPG (occupano più spazio). Quelle già scattate restano in HEIC.</p>
<p>Se copi le foto sul computer con un cavo, puoi anche impostare <strong>Impostazioni → Foto → Trasferisci su Mac o
PC</strong> su <strong>Automatico</strong>: l’iPhone le converte durante il trasferimento.</p>

<h2>Domande frequenti</h2>
<h3>La foto perde qualità?</h3>
<p>Con una qualità dell’80–90% la differenza è praticamente invisibile. Se pensi di modificare ancora le foto, scegli una qualità più alta.</p>
<h3>Perché Windows non apre i file HEIC?</h3>
<p>Windows ha bisogno di estensioni del Microsoft Store (estensioni per immagini HEIF e video HEVC). Convertire in JPG è
più semplice, perché qualsiasi dispositivo apre i JPG.</p>
<h3>Le mie foto vengono caricate da qualche parte?</h3>
<p>No. Tutta la conversione avviene nel browser. Le tue foto non lasciano mai il computer o il telefono.</p>

<div class="guide-related"><h2>Altre guide</h2><ul><li><a href="/pomodoro-technika/">La tecnica del pomodoro</a></li><li><a href="/tabata-trenink/">Allenamento Tabata</a></li></ul></div>
`,
};

export const pl: GuideTranslation = {
  title: 'Jak przekonwertować HEIC na JPG – zdjęcia z iPhone’a, za darmo i bez wysyłania',
  description: 'Jak za darmo przekonwertować zdjęcia HEIC z iPhone’a na JPG bezpośrednio w przeglądarce, bez wysyłania ich, i jak ustawić iPhone’a, by robił zdjęcia w JPG.',
  html: `
<h1>Jak przekonwertować HEIC na JPG</h1>
<p class="text-page__meta">Poradnik · zdjęcia z iPhone’a</p>
<p>iPhone zapisuje zdjęcia w formacie <strong>HEIC</strong> (HEIF). To oszczędny format: zdjęcie zajmuje mniej więcej
połowę miejsca, co JPG o podobnej jakości. Wiele programów, stron i starszych komputerów nie potrafi go jednak otworzyć.
Najprościej jest przekonwertować zdjęcia do uniwersalnego formatu <strong>JPG</strong>.</p>

<div class="guide-cta"><p>Konwersja odbywa się bezpośrednio w przeglądarce; zdjęcia nigdy nie są wysyłane. Możesz dodać wiele naraz.</p>
<a class="button button--primary" href="/image-compressor/">Konwertuj HEIC na JPG</a></div>

<h2>Krok po kroku</h2>
<ol>
  <li>Otwórz narzędzie <a href="/image-compressor/">Zmniejszanie zdjęć</a>.</li>
  <li>Wybierz format <strong>JPG</strong> i jakość około <strong>80%</strong>.</li>
  <li>Przy dłuższym boku zostaw <strong>Oryginalny rozmiar</strong> albo od razu zmniejsz zdjęcia, np. do 1920 px do e-maila.</li>
  <li>Przeciągnij zdjęcia HEIC do okna (lub wybierz je przyciskiem).</li>
  <li>Pobierz je pojedynczo albo wszystkie naraz jako ZIP.</li>
</ol>
<p>Konwersja usuwa metadane, w tym <strong>lokalizację GPS</strong>, w której zrobiono zdjęcie. Przydaje się to, gdy
udostępniasz zdjęcia lub publikujesz je w internecie.</p>

<h2>Jak ustawić iPhone’a, by robił zdjęcia w JPG</h2>
<p>Na iPhonie otwórz <strong>Ustawienia → Aparat → Formaty</strong> i wybierz <strong>Najbardziej zgodne</strong>. Nowe
zdjęcia będą zapisywane jako JPG (zajmują więcej miejsca). Zrobione wcześniej zdjęcia pozostaną w HEIC.</p>
<p>Jeśli kopiujesz zdjęcia na komputer kablem, możesz też ustawić <strong>Ustawienia → Zdjęcia → Przenoś na Maca lub
PC</strong> na <strong>Automatycznie</strong>, a iPhone przekonwertuje je podczas przenoszenia.</p>

<h2>Najczęstsze pytania</h2>
<h3>Czy zdjęcie traci na jakości?</h3>
<p>Przy jakości 80–90% różnica jest praktycznie niewidoczna. Jeśli zamierzasz dalej edytować zdjęcia, wybierz wyższą jakość.</p>
<h3>Dlaczego Windows nie otwiera HEIC?</h3>
<p>Windows potrzebuje do tego rozszerzeń ze sklepu Microsoft Store (rozszerzenia obrazów HEIF i wideo HEVC). Konwersja do
JPG jest prostsza, bo JPG otworzy każde urządzenie.</p>
<h3>Czy moje zdjęcia są gdzieś wysyłane?</h3>
<p>Nie. Cała konwersja odbywa się w przeglądarce. Twoje zdjęcia nigdy nie opuszczają komputera ani telefonu.</p>

<div class="guide-related"><h2>Inne poradniki</h2><ul><li><a href="/pomodoro-technika/">Technika Pomodoro</a></li><li><a href="/tabata-trenink/">Trening Tabata</a></li></ul></div>
`,
};

export const sk: GuideTranslation = {
  title: 'Ako previesť HEIC na JPG – fotky z iPhonu zadarmo a bez nahrávania',
  description: 'Ako zadarmo previesť fotky HEIC z iPhonu na JPG priamo v prehliadači bez nahrávania a ako nastaviť iPhone, aby fotil do JPG.',
  html: `
<h1>Ako previesť HEIC na JPG</h1>
<p class="text-page__meta">Návod · fotky z iPhonu</p>
<p>iPhone ukladá fotky vo formáte <strong>HEIC</strong> (HEIF). Je úsporný: fotka zaberie zhruba polovicu miesta oproti JPG
v podobnej kvalite. Mnohé programy, weby a staršie počítače ho však neotvoria. Najjednoduchšie je previesť fotky do
univerzálneho formátu <strong>JPG</strong>.</p>

<div class="guide-cta"><p>Prevod prebieha priamo vo vašom prehliadači; fotky sa nikam nenahrávajú. Pridať ich môžete aj veľa naraz.</p>
<a class="button button--primary" href="/image-compressor/">Previesť HEIC na JPG</a></div>

<h2>Postup</h2>
<ol>
  <li>Otvorte nástroj <a href="/image-compressor/">Zmenšenie obrázkov</a>.</li>
  <li>Zvoľte formát <strong>JPG</strong> a kvalitu okolo <strong>80 %</strong>.</li>
  <li>Pri dlhšej strane nechajte <strong>Pôvodnú veľkosť</strong>, alebo fotky rovno zmenšite, napr. na 1920 px do e-mailu.</li>
  <li>Presuňte fotky HEIC do okna (alebo ich vyberte tlačidlom).</li>
  <li>Stiahnite ich po jednej alebo všetky naraz ako ZIP.</li>
</ol>
<p>Prevod odstráni metadáta vrátane <strong>polohy GPS</strong>, kde bola fotka urobená. To sa hodí, keď fotky zdieľate
alebo zverejňujete na internete.</p>

<h2>Ako nastaviť iPhone, aby fotil do JPG</h2>
<p>V iPhone otvorte <strong>Nastavenia → Fotoaparát → Formáty</strong> a zvoľte <strong>Najkompatibilnejšie</strong>.
Nové fotky sa potom uložia ako JPG (zaberajú viac miesta). Už urobené fotky zostanú v HEIC.</p>
<p>Ak kopírujete fotky do počítača káblom, môžete tiež nastaviť <strong>Nastavenia → Fotky → Prenos do Macu alebo
PC</strong> na <strong>Automaticky</strong> a iPhone ich pri prenose prevedie.</p>

<h2>Časté otázky</h2>
<h3>Stratí fotka kvalitu?</h3>
<p>Pri kvalite 80–90 % je rozdiel prakticky neviditeľný. Ak chcete fotky ďalej upravovať, zvoľte vyššiu kvalitu.</p>
<h3>Prečo Windows neotvorí HEIC?</h3>
<p>Windows na to potrebuje rozšírenia z Microsoft Store (rozšírenia pre obrázky HEIF a video HEVC). Prevod do JPG je
jednoduchší, pretože JPG otvorí každé zariadenie.</p>
<h3>Nahrávajú sa moje fotky niekam?</h3>
<p>Nie. Celý prevod prebieha vo vašom prehliadači. Fotky nikdy neopustia váš počítač ani telefón.</p>

<div class="guide-related"><h2>Ďalšie návody</h2><ul><li><a href="/pomodoro-technika/">Technika Pomodoro</a></li><li><a href="/tabata-trenink/">Tabata tréning</a></li></ul></div>
`,
};
