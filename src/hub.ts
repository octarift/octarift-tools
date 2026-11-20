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
