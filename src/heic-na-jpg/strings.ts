/** English and German versions of the guide (the Czech one is the page's HTML). */
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
