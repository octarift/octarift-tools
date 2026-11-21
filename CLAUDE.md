# Octarift Tools

A collection of small browser-based tools on one site, published at
https://tools.octarift.com under the Octarift studio brand. Tools so far: a
countdown with stopwatch, Pomodoro and interval modes (`/countdown/`), a text converter (`/text-converter/`), a QR code generator (`/qr-code/`),
an image compressor (`/image-compressor/`) and a random picker with teams and dice (`/random/`).

The studio site (octarift.com, separate repo `octarift/octarift-web`, local
`D:\Projects\octarift-web`) links here, and these tools promote the studio's
game Rift Defense (`com.octarift.riftdefense` on Google Play).

## Hosting

- GitHub Pages, organisation `octarift`; `.github/workflows/deploy.yml` builds and deploys on push to `main`.
- `public/CNAME` holds the custom domain. DNS (Forpsi): `tools` CNAME → `octarift.github.io`.
- Future ads need `public/ads.txt` (the AdMob/AdSense publisher ID is in octarift-web's `app-ads.txt`).

## Goals and product rules

- Everything runs in the browser. No backend, no accounts. Hosted as a static site.
- **User files never leave the device.** Uploaded backgrounds etc. go to IndexedDB, never to a server.
- **Ads, the Rift Defense promo card and the Buy Me a Coffee button appear only outside fullscreen.** Fullscreen is the product; keep it clean.
- The promo card is filled into `<aside data-promo="campaign">` by `site-chrome.ts`; its Play link carries
  `utm_source=octarift-tools&utm_campaign=<campaign>` so installs show in Play Console. Text lives in `gamePromo` in `config.ts`.
- UI languages (`LANGS` in `src/shared/i18n.ts`, alphabetical = menu order): cs, de, en, es, fr, it, pl, sk.
  Detection: `?lang=` (remembered), else the saved choice, else the browser's list: if it contains cs or sk, the
  first of those; otherwise the first supported language; otherwise English. Each page lists all versions with
  hreflang links and og:locale:alternate.
  **Never hard-code UI text**: add it to the tool's `strings.ts` (every language is typed from `cs`, so a missing
  translation fails the build), shared text uses `tr({ cs, de, en, es, fr, it, pl, sk })`, static HTML uses
  `data-i18n` / `data-i18n-attr`.
- Address forms: formal in Czech/Slovak ("vy"), German ("Sie") and French ("vous"); informal in Polish ("ty"),
  Spanish (Spain, "tú") and Italian ("tu").
- Everything except Czech and English is written by Claude and not reviewed by native speakers: in those languages
  the footer shows a "report a translation error" mailto (`REPORT_TRANSLATION_ERROR` in site-chrome.ts). Their
  privacy policies say the English version prevails.
- Established terms. German: Countdown, Stoppuhr, Text umwandeln, QR-Code-Generator, Bilder verkleinern,
  Zufallsgenerator, Design (theme), Vollbild, WLAN, GiroCode (SEPA); "remove accents" and slugs write ä/ö/ü as
  ae/oe/ue. Tool names: es Cuenta atrás y cronómetro / Convertidor de texto / Códigos QR / Comprimir imágenes /
  Sorteo aleatorio; fr Compte à rebours et chronomètre / Convertisseur de texte / Codes QR / Compresser des images /
  Tirage au sort; it Conto alla rovescia e cronometro / Convertitore di testo / Codici QR / Comprimi immagini /
  Sorteggio casuale; pl Odliczanie i stoper / Konwerter tekstu / Kody QR / Zmniejszanie zdjęć / Losowanie;
  sk Odpočet a stopky / Prevod textu / QR kódy / Zmenšenie obrázkov / Losovanie.
  Code, comments and commit messages are in English. English UI text uses US spelling (color, center).
- Light/dark/system switch in the header (`src/shared/color-scheme.ts`): the choice is a `scheme` cookie on
  `.octarift.com`, shared with the studio site (its `scheme.js`); no cookie = follow the system. An inline
  `<head>` snippet in every page applies it before paint, and base.css keeps the dark tokens in two equal blocks.
- Respect `prefers-reduced-motion` for every animation; animated backgrounds must stay cheap (CSS/GPU, no heavy JS loops).
- Mobile matters: layouts must work at 360 px width, touch targets ≥ 44 px.
- Number fields: always give `<input type="number">` real `min`/`max` (and set them from code when they depend on
  other values). `shared/number-limits.ts` (installed by `mountSiteChrome`) then makes them impossible to exceed:
  above max is replaced while typing, below a positive min when leaving the field.

## Stack

- Vite (multi-page) + TypeScript, **no UI framework**. Keep dependencies minimal.
- Runtime dependencies (code that ends up in the scripts, so far `uqr` and `lzma1`) need their license in
  `public/third-party-licenses.txt` (linked from the footer) and an entry in `NOTICES` in `vite.config.ts`,
  which puts a notice comment at the top of every built script that contains their code.
- LGPL code is never bundled: libheif (HEIC decoding) is an unmodified file in `public/vendor/libheif-js-<version>/`
  with its LICENSE and a README (versions, source links, how to update), loaded by URL at runtime.
- Node.js 20.19+ is required (Vite 7).

## Commands

- `npm install` — install dependencies
- `npm run dev` — dev server (http://localhost:5173)
- `npm run build` — typecheck + production build into `dist/`
- `npm run preview` — serve the built `dist/`
- `npm run typecheck` — TypeScript only

## Structure

```
src/
  index.html, hub.ts, hub.css   hub page listing all tools (/)
  shared/                       code used by every tool (import via "@shared/...")
    config.ts                   site name, Buy Me a Coffee URL, ads switch, list of tools
    tool-icons.ts               hub icons (inline SVG in the logo's green ramp, on a dark tile)
    text.ts                     shared text helpers (removeDiacritics)
    crc32.ts                    CRC-32 (ZIP export, PAY by square)
    site-chrome.ts              fills <header data-site-header>, <footer data-site-footer>, <aside data-ad-slot>
    fullscreen.ts               Fullscreen API with CSS fallback (iPhone Safari)
    wake-lock.ts                keeps the screen on
    storage.ts, idb.ts          safe localStorage / IndexedDB helpers
    styles/base.css             design tokens (light/dark), buttons, chrome
  countdown/                    the countdown tool (/countdown/)
    index.html, main.ts         page + UI wiring
    strings.ts                  all countdown UI text (every UI language)
    state.ts                    state shape, persistence, share-link encoding
    timer.ts                    pure time helpers
    phases.ts                   Pomodoro and interval phase sequences, stopwatch time format (pure)
    overlay.ts                  OBS overlay links (?overlay=1, color, shadow, labels, sound)
    themes.ts + countdown.css   theme list grouped into categories, and their look ([data-theme="id"])
    pencil.ts                   hand-drawn SVG digits for themes flagged `pencil` (paper, chalkboard)
    background.ts, alarm.ts     custom background storage, sounds (end chime and phase cues; one on/off setting)
  text-converter/               the text converter (/text-converter/)
    conversions.ts              pure conversion functions + their order and groups (id = label key in strings.ts)
    main.ts, strings.ts, text-converter.css
  qr-code/                      the QR code generator (/qr-code/), QR encoding by the `uqr` package
    payloads.ts                 pure payload builders: QR Platba (SPD), EPC/SEPA, Wi-Fi, vCard, mailto, SMS,
                                PayPal.me/Revolut.me links; IBAN and Czech account (mod 11) checks
    pay-by-square.ts            Slovak PAY by square encoder (spec 1.2.0: tab fields, CRC32, LZMA, Base32hex)
    pay-by-square-frame.svg     official PAY by square mark (SBA logo pack, unchanged) drawn around those codes
    modes.ts                    code types: form fields + how values become the payload
    main.ts, strings.ts, qr-code.css
  image-compressor/             the image compressor (/image-compressor/)
    process.ts                  decode → resize (halving steps) → encode on a canvas; metadata is dropped
    heic.ts                     HEIC detection; native decode first (Safari), else libheif from public/vendor
    zip.ts                      store-only ZIP writer for "download all"
    main.ts, strings.ts, image-compressor.css
  odpocet-do-vanoc/             Christmas countdown landing page (SEO): Czech-first static HTML; a 24/25 Dec toggle
                                (`defaultDay` 24 in cs/de/pl/sk; in en/es/fr/it 24 for browsers with a Christmas-Eve-country
                                language, else 25; remembered, ?day= in links); christmas.ts = dates/Advent (pure)
  odpocet-do-noveho-roku/       New Year countdown landing page (SEO), same pattern as Christmas; newyear.ts (pure);
                                Fireworks theme (id `newyear`); both holiday pages share shared/styles/holiday-page.css
  jak-vytvorit-qr-platbu/, heic-na-jpg/, pomodoro-technika/, tabata-trenink/
                                guides (SEO articles): Czech article in the HTML, other languages in strings.ts, via
                                shared/guide-page.ts (the QR Platba guide is cs/en only: other visitors get English, it is
                                in PAGE_LANGS in vite.config.ts, has only cs/en hreflang, and the hub, the other guides'
                                lists and the QR page drop its link outside cs/en); each links to its tool and to the other guides; listed on
                                the hub (Návody) and linked from the QR generator, image compressor and countdown
  privacy/, about/              text pages (privacy policy, about and contact) via shared/text-page.ts;
                                not tools, so not in `tools`; linked from the footer
  random/                       random picker (/random/): names with a wheel of fortune, teams, order, dice, coin, numbers
    rng.ts                      fair randomness (crypto + rejection sampling), shuffle, teams, dice (pure)
    wheel.ts                    SVG wheel; the winner is drawn first, the CSS transition only animates to it
    main.ts, strings.ts, random.css
public/                         static files copied as-is (favicon, og images, vendor/, robots.txt, later ads.txt)
```

## Adding a new tool

1. Create `src/<slug>/index.html` and `src/<slug>/main.ts` (copy the countdown page skeleton:
   header/footer placeholders, `mountSiteChrome('<slug>')`, `@shared/styles/base.css`).
   Vite picks up the new page automatically (see `vite.config.ts`).
2. Add the tool to `tools` in `src/shared/config.ts` so it appears on the hub and in the nav.

## Countdown: things to keep right

- Modes: timer, date, stopwatch, pomodoro, interval (`Mode` in state.ts).
- Remaining time is always computed as `endsAt - Date.now()` (stopwatch: `Date.now() - startedAt`), never by
  decrementing a counter (background tabs throttle timers, so counters drift). Pomodoro/interval phases chain
  exactly (`endsAt += next phase`), so `advancePhases()` catches up after a sleeping tab or a reload.
- Share links: `?to=<ISO date>` (date mode), `?d=<seconds>` (timer), `?mode=stopwatch`,
  `?mode=pomodoro&w=&b=&l=&n=` or `?mode=interval&p=&w=&r=&n=` (seconds, n = rounds), plus `t=<title>` and `theme=<id>`.
  The custom background is never part of a link.
- Phase names and end messages can be replaced by the user (`labels` in state, `MODE_LABELS` says which mode
  shows which; empty = built-in text from strings.ts); links carry them as `l_<key>=<text>`.
- OBS overlay (`?overlay=1` on any share link): only the stage on a transparent background, no theme, starts by
  itself, takes title and texts only from the link and never saves state (`persist()` skips it). The settings
  drawer builds these links (options remembered under `countdown:obs:v1`).
- Saved state lives in localStorage under `countdown:state:v1`; bump the version if the shape changes incompatibly.
- Sound needs a user gesture first (`primeAudio()` on Start / first tap).
- iPhone Safari has no Fullscreen API, so fullscreen there is the CSS fallback with Safari's bars visible.
  Real fullscreen = Add to Home Screen (`public/countdown/manifest.webmanifest`, apple-* meta tags); the page
  shows a one-time tip (`countdown:ios-tip-seen`) on iPhone. Home Screen apps get their own storage on iOS.

## QR code generator: things to keep right

- Field values (Wi-Fi passwords, accounts) stay in sessionStorage only; mode and look in localStorage.
- EPC codes must use error correction M, PAY by square codes L (the mode sets `ecc` and the select is locked).
- QR Platba values drop accents and encode `*` as `%2A`; accounts are always sent as IBAN.
- The default payment type follows the UI language: cs → QR Platba, sk → PAY by square, everyone else → EPC (SEPA).
- PAY by square (SBA terms: free for implementations that follow the spec) must always be shown inside the
  official mark, so those codes are fixed to black on white and PNG/SVG include the mark. The header writes
  type version 1 (data model with beneficiary fields): version 2 (= spec 1.2.0) would make banking apps that
  are not yet updated reject the code. Spec, logo manual and logo pack: sbaonline.sk (PAY by square section).
- Any payload change: round-trip it through a decoder (e.g. jsQR) and scan it with a real banking app.

## Image compressor: things to keep right

- Images stay in memory only (never uploaded, never stored); only the settings are saved (localStorage).
- HEIC: try `createImageBitmap` first; only if that fails load libheif (~0.7 MB gzipped), once per page.
- JPEG output gets a white background (transparent areas would turn black). Results bigger than the
  original are flagged, not hidden.

## Privacy policy

- `src/privacy/strings.ts` must match what the site really does. Update it (and its effective date) before
  adding analytics, ads or anything that loads third-party content or sends data anywhere; ads in the EU
  also need a certified consent banner (CMP). Today: the hosting (GitHub Pages) and Cloudflare Web Analytics
  (cookieless, so no consent needed; section 5) are the only third parties.
- Analytics: Cloudflare Web Analytics, site registered as `octarift.com` (one token for this site and the studio
  site). The `analytics()` plugin in vite.config.ts adds the beacon to every page, in production builds only.
- Controller and contact (same as octarift.com): Michal Šilhán (Octarift), octarift.studio@gmail.com.

## SEO

- New guides: same template as the existing ones (head with hreflang, `#guide` article, `.guide-cta` button to the
  tool with useful presets, "Další návody" list); add them to every guide's list and to the hub's `guideList`.
- `sitemap.xml` is generated at build time from the page folders (vite.config.ts), with one URL per language
  plus x-default alternates (`PAGE_LANGS` limits a page to fewer languages); `public/robots.txt` points to it. Landing pages that are not tools (e.g. Christmas) are linked
  from the hub's "Oblíbené odpočty".
- `%CHRISTMAS_YEAR%`, `%NEW_YEAR%` and `%OLD_YEAR%` in HTML are filled at build time (`holidayYears` in
  vite.config.ts); deploy once after 27 December and once after 2 January so the static text shows the next
  year (the pages themselves update live).

## Not done yet (ideas, in rough priority)

- Real ad integration + GDPR consent banner (CMP) before enabling `site.ads.enabled`
- Content/SEO pages (e.g. "Odpočet do Vánoc") — also needed for AdSense approval
- PWA (offline), more themes
