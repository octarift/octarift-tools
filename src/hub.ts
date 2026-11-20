import '@shared/styles/base.css';
import './hub.css';
import { tools } from '@shared/config';
import { applyStrings, lang, setMetaDescription, tr } from '@shared/i18n';
import { mountSiteChrome } from '@shared/site-chrome';

const strings = tr({
  cs: {
    heading: 'Nástroje',
    lead: 'Jednoduché nástroje, které běží přímo ve vašem prohlížeči.',
    description: 'Jednoduché online nástroje, které fungují přímo v prohlížeči.',
    popular: 'Oblíbené odpočty',
    christmas: 'Odpočet do Vánoc',
    newYear: 'Odpočet do Nového roku',
    guides: 'Návody',
    guideList: [
      ['jak-vytvorit-qr-platbu', 'Jak vytvořit QR Platbu'],
      ['heic-na-jpg', 'Jak převést HEIC na JPG'],
      ['pomodoro-technika', 'Pomodoro technika'],
      ['tabata-trenink', 'Tabata trénink'],
    ],
  },
  en: {
    heading: 'Tools',
    lead: 'Simple tools that run right in your browser.',
    description: 'Simple online tools that work right in your browser.',
    popular: 'Popular countdowns',
    christmas: 'Christmas countdown',
    newYear: 'New Year countdown',
    guides: 'Guides',
    guideList: [
      ['jak-vytvorit-qr-platbu', 'How to create a QR payment code'],
      ['heic-na-jpg', 'How to convert HEIC to JPG'],
      ['pomodoro-technika', 'The Pomodoro Technique'],
      ['tabata-trenink', 'Tabata workout'],
    ],
  },
  de: {
    heading: 'Werkzeuge',
    lead: 'Einfache Werkzeuge, die direkt in Ihrem Browser laufen.',
    description: 'Einfache Online-Werkzeuge, die direkt im Browser funktionieren.',
    popular: 'Beliebte Countdowns',
    christmas: 'Countdown bis Weihnachten',
    newYear: 'Countdown bis Neujahr',
    guides: 'Anleitungen',
    // The QR Platba guide is about Czech bank payments: not offered to German visitors.
    guideList: [
      ['heic-na-jpg', 'HEIC in JPG umwandeln'],
      ['pomodoro-technika', 'Die Pomodoro-Technik'],
      ['tabata-trenink', 'Tabata-Training'],
    ],
  },
  es: {
    heading: 'Herramientas',
    lead: 'Herramientas sencillas que funcionan directamente en tu navegador.',
    description: 'Herramientas online sencillas que funcionan directamente en el navegador.',
    popular: 'Cuentas atrás populares',
    christmas: 'Cuenta atrás para Navidad',
    newYear: 'Cuenta atrás para Año Nuevo',
    guides: 'Guías',
    guideList: [
      ['heic-na-jpg', 'Cómo convertir HEIC a JPG'],
      ['pomodoro-technika', 'La técnica Pomodoro'],
      ['tabata-trenink', 'Entrenamiento Tabata'],
    ],
  },
  fr: {
    heading: 'Outils',
    lead: 'Des outils simples qui fonctionnent directement dans votre navigateur.',
    description: 'Des outils en ligne simples qui fonctionnent directement dans le navigateur.',
    popular: 'Comptes à rebours populaires',
    christmas: 'Compte à rebours de Noël',
    newYear: 'Compte à rebours du Nouvel An',
    guides: 'Guides',
    guideList: [
      ['heic-na-jpg', 'Convertir HEIC en JPG'],
      ['pomodoro-technika', 'La technique Pomodoro'],
      ['tabata-trenink', 'Entraînement Tabata'],
    ],
  },
  it: {
    heading: 'Strumenti',
    lead: 'Strumenti semplici che funzionano direttamente nel tuo browser.',
    description: 'Strumenti online semplici che funzionano direttamente nel browser.',
    popular: 'Conti alla rovescia popolari',
    christmas: 'Conto alla rovescia per Natale',
    newYear: 'Conto alla rovescia per Capodanno',
    guides: 'Guide',
    guideList: [
      ['heic-na-jpg', 'Come convertire HEIC in JPG'],
      ['pomodoro-technika', 'La tecnica del pomodoro'],
      ['tabata-trenink', 'Allenamento Tabata'],
    ],
  },
  pl: {
    heading: 'Narzędzia',
    lead: 'Proste narzędzia, które działają bezpośrednio w Twojej przeglądarce.',
    description: 'Proste narzędzia online, które działają bezpośrednio w przeglądarce.',
    popular: 'Popularne odliczania',
    christmas: 'Odliczanie do świąt Bożego Narodzenia',
    newYear: 'Odliczanie do Nowego Roku',
    guides: 'Poradniki',
    guideList: [
      ['heic-na-jpg', 'Jak przekonwertować HEIC na JPG'],
      ['pomodoro-technika', 'Technika Pomodoro'],
      ['tabata-trenink', 'Trening Tabata'],
    ],
  },
  sk: {
    heading: 'Nástroje',
    lead: 'Jednoduché nástroje, ktoré bežia priamo vo vašom prehliadači.',
    description: 'Jednoduché online nástroje, ktoré fungujú priamo v prehliadači.',
    popular: 'Obľúbené odpočty',
    christmas: 'Odpočet do Vianoc',
    newYear: 'Odpočet do Nového roka',
    guides: 'Návody',
    guideList: [
      ['heic-na-jpg', 'Ako previesť HEIC na JPG'],
      ['pomodoro-technika', 'Technika Pomodoro'],
      ['tabata-trenink', 'Tabata tréning'],
    ],
  },
});

applyStrings(strings);
setMetaDescription(strings.description);
mountSiteChrome();

const list = document.querySelector<HTMLUListElement>('#tool-list');
if (list) {
  list.innerHTML = tools
    .map(
      (t) => `<li><a class="tool-card" href="/${t.slug}/?lang=${lang}">
        <span class="tool-card__icon" aria-hidden="true">${t.icon}</span>
        <span class="tool-card__name">${tr(t.name)}</span>
        <span class="tool-card__desc">${tr(t.description)}</span>
      </a></li>`,
    )
    .join('');
}

// Ready-made countdown pages (seasonal content that people search for).
const popular = document.querySelector<HTMLElement>('#popular');
if (popular) {
  popular.innerHTML =
    `<h2 class="hub__subtitle">${strings.popular}</h2>` +
    `<ul class="hub-links"><li><a href="/odpocet-do-vanoc/?lang=${lang}">🎄 ${strings.christmas}</a></li>` +
    `<li><a href="/odpocet-do-noveho-roku/?lang=${lang}">🎆 ${strings.newYear}</a></li></ul>` +
    // Guides: articles that bring visitors from search straight to the tools.
    `<h2 class="hub__subtitle hub__subtitle--next">${strings.guides}</h2>` +
    `<ul class="hub-links">${strings.guideList
      .map(([slug, name]) => `<li><a href="/${slug}/?lang=${lang}">${name}</a></li>`)
      .join('')}</ul>`;
}
