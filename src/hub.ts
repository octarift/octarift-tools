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
  },
  en: {
    heading: 'Tools',
    lead: 'Simple tools that run right in your browser.',
    description: 'Simple online tools that work right in your browser.',
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
