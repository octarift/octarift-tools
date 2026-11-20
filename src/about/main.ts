import { tools } from '@shared/config';
import { lang, tr } from '@shared/i18n';
import { mountTextPage } from '@shared/text-page';
import { s } from './strings';

// Intro, then the list of tools (from config, so new tools appear here too), then the rest.
const list = tools
  .map(
    (t) =>
      `<li><a href="/${t.slug}/?lang=${lang}"><strong>${tr(t.name)}</strong><span>${tr(t.description)}</span></a></li>`,
  )
  .join('');
mountTextPage({
  ...s,
  body: `${s.intro}<h2>${s.toolsTitle}</h2><ul class="text-page__tools">${list}</ul>${s.body}`,
});
