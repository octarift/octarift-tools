/** English and German versions of the guide (the Czech one is the page's HTML). */
import type { GuideTranslation } from '@shared/guide-page';

export const en: GuideTranslation = {
  title: 'Tabata workout – 20/10 × 8, how to train, with an online timer',
  description: 'What Tabata is: 8 rounds of 20 seconds of all-out effort and 10 seconds of rest, 4 minutes in total. How to train, example exercises and a free interval timer.',
  html: `
<h1>Tabata workout</h1>
<p class="text-page__meta">Guide · online interval timer</p>
<p>Tabata is a short, very intense interval workout: <strong>20 seconds all out, 10 seconds of rest, eight times in a
row</strong>. A full round takes just <strong>4 minutes</strong>. It is named after the Japanese scientist Izumi
Tabata, whose study in the 1990s showed how effective such short high-intensity intervals are.</p>

<div class="guide-cta"><p>Start the timer with the Tabata setup; it sounds at the start of each work phase and counts 3-2-1 before the end.</p>
<a class="button button--primary" href="/countdown/?mode=interval&amp;p=10&amp;w=20&amp;r=10&amp;n=8">Start Tabata</a></div>

<h2>How a Tabata goes</h2>
<ol>
  <li><strong>Warm up</strong> for 5–10 minutes (light jogging, arm circles, unweighted squats).</li>
  <li><strong>20 seconds</strong> of exercise at maximum effort.</li>
  <li><strong>10 seconds</strong> of rest.</li>
  <li>Repeat <strong>8 times</strong>, 4 minutes in total.</li>
  <li>Optionally rest for a minute and do another block with a different exercise.</li>
  <li>Finish with an easy <strong>cool-down and stretching</strong>.</li>
</ol>

<h2>Good exercises</h2>
<ul>
  <li>squats or jump squats,</li>
  <li>push-ups (also on your knees),</li>
  <li>burpees,</li>
  <li>mountain climbers,</li>
  <li>skipping rope, sprinting on the spot or on an exercise bike.</li>
</ul>
<p>Choose exercises that use large muscle groups, where you can go all out and still keep good form.</p>

<h2>For beginners</h2>
<p>If 20/10 is too much at first, start with gentler intervals such as <strong>20 seconds of work and 20 seconds of
rest</strong>, or fewer rounds. Our timer also has quick picks for 30/30 and 45/15, and you can set everything yourself.</p>

<h2>Safety</h2>
<p>Tabata is very demanding on the heart and muscles. If you have health problems, are not used to exercise or are
unsure, talk to a doctor first. Stop right away if you feel pain or dizziness.</p>

<div class="guide-related"><h2>More guides</h2><ul><li><a href="/jak-vytvorit-qr-platbu/">How to create a QR payment code</a></li><li><a href="/heic-na-jpg/">How to convert HEIC to JPG</a></li><li><a href="/pomodoro-technika/">The Pomodoro Technique</a></li></ul></div>
`,
};

export const de: GuideTranslation = {
  title: 'Tabata-Training – 20/10 × 8, so trainieren Sie, mit Online-Timer',
  description: 'Was Tabata ist: 8 Runden mit 20 Sekunden maximaler Belastung und 10 Sekunden Pause, insgesamt 4 Minuten. So trainieren Sie, Beispielübungen und ein kostenloser Intervall-Timer.',
  html: `
<h1>Tabata-Training</h1>
<p class="text-page__meta">Anleitung · Online-Intervall-Timer</p>
<p>Tabata ist ein kurzes, sehr intensives Intervalltraining: <strong>20 Sekunden Vollgas, 10 Sekunden Pause, achtmal
hintereinander</strong>. Eine ganze Runde dauert nur <strong>4 Minuten</strong>. Benannt ist es nach dem japanischen
Wissenschaftler Izumi Tabata, dessen Studie in den 1990er-Jahren zeigte, wie wirksam solche kurzen, hochintensiven
Intervalle sind.</p>

<div class="guide-cta"><p>Starten Sie den Timer mit der Tabata-Einstellung; er gibt zu Beginn jeder Belastungsphase einen Ton und zählt vor dem Ende 3-2-1.</p>
<a class="button button--primary" href="/countdown/?mode=interval&amp;p=10&amp;w=20&amp;r=10&amp;n=8">Tabata starten</a></div>

<h2>So läuft ein Tabata ab</h2>
<ol>
  <li><strong>Aufwärmen</strong> für 5–10 Minuten (leichtes Joggen, Armkreisen, Kniebeugen ohne Gewicht).</li>
  <li><strong>20 Sekunden</strong> Übung mit maximaler Anstrengung.</li>
  <li><strong>10 Sekunden</strong> Pause.</li>
  <li><strong>8-mal</strong> wiederholen, insgesamt 4 Minuten.</li>
  <li>Nach Wunsch eine Minute ausruhen und einen weiteren Block mit einer anderen Übung anhängen.</li>
  <li>Zum Schluss locker <strong>auslaufen und dehnen</strong>.</li>
</ol>

<h2>Geeignete Übungen</h2>
<ul>
  <li>Kniebeugen oder Sprungkniebeugen,</li>
  <li>Liegestütze (auch auf den Knien),</li>
  <li>Burpees,</li>
  <li>Mountain Climbers,</li>
  <li>Seilspringen, Sprinten auf der Stelle oder auf dem Heimtrainer.</li>
</ul>
<p>Wählen Sie Übungen für große Muskelgruppen, bei denen Sie alles geben und trotzdem eine saubere Technik halten können.</p>

<h2>Für Einsteiger</h2>
<p>Wenn 20/10 anfangs zu viel ist, beginnen Sie mit sanfteren Intervallen wie <strong>20 Sekunden Belastung und
20 Sekunden Pause</strong> oder mit weniger Runden. Unser Timer bietet auch die Schnellauswahl 30/30 und 45/15, und Sie
können alles selbst einstellen.</p>

<h2>Sicherheit</h2>
<p>Tabata belastet Herz und Muskeln sehr stark. Wenn Sie gesundheitliche Probleme haben, Sport nicht gewohnt sind oder
unsicher sind, sprechen Sie vorher mit einem Arzt. Hören Sie sofort auf, wenn Sie Schmerzen oder Schwindel spüren.</p>

<div class="guide-related"><h2>Weitere Anleitungen</h2><ul><li><a href="/heic-na-jpg/">HEIC in JPG umwandeln</a></li><li><a href="/pomodoro-technika/">Die Pomodoro-Technik</a></li></ul></div>
`,
};
