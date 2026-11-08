import '@shared/styles/base.css';
import './hub.css';
import { tools } from '@shared/config';
import { mountSiteChrome } from '@shared/site-chrome';

mountSiteChrome();

const list = document.querySelector<HTMLUListElement>('#tool-list');
if (list) {
  list.innerHTML = tools
    .map(
      (t) => `<li><a class="tool-card" href="/${t.slug}/">
        <span class="tool-card__icon" aria-hidden="true">${t.icon}</span>
        <span class="tool-card__name">${t.name}</span>
        <span class="tool-card__desc">${t.description}</span>
      </a></li>`,
    )
    .join('');
}
