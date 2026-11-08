# Octarift Tools

A collection of small browser-based tools on one site, published at
https://tools.octarift.com under the Octarift studio brand. The first tool is a
countdown (`/countdown/`); more tools will be added if the project takes off.

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
- UI is bilingual: Czech (formal "vy" form) and English. Czech/Slovak browsers get Czech, everyone else English;
  `?lang=cs|en` overrides and is remembered (`src/shared/i18n.ts`). Each page lists both versions with hreflang links.
  **Never hard-code UI text**: add it to the tool's `strings.ts` (`en` is typed from `cs`, so a missing translation
  fails the build), shared text uses `tr({ cs, en })`, static HTML uses `data-i18n` / `data-i18n-attr`.
  Code, comments and commit messages are in English.
- Respect `prefers-reduced-motion` for every animation; animated backgrounds must stay cheap (CSS/GPU, no heavy JS loops).
- Mobile matters: layouts must work at 360 px width, touch targets ≥ 44 px.

## Stack

- Vite (multi-page) + TypeScript, **no UI framework**. Keep dependencies minimal.
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
    site-chrome.ts              fills <header data-site-header>, <footer data-site-footer>, <aside data-ad-slot>
    fullscreen.ts               Fullscreen API with CSS fallback (iPhone Safari)
    wake-lock.ts                keeps the screen on
    storage.ts, idb.ts          safe localStorage / IndexedDB helpers
    styles/base.css             design tokens (light/dark), buttons, chrome
  countdown/                    the countdown tool (/countdown/)
    index.html, main.ts         page + UI wiring
    strings.ts                  all countdown UI text in Czech and English
    state.ts                    state shape, persistence, share-link encoding
    timer.ts                    pure time helpers
    themes.ts + countdown.css   theme list grouped into categories, and their look ([data-theme="id"])
    pencil.ts                   hand-drawn SVG digits for themes flagged `pencil` (paper, chalkboard)
    background.ts, alarm.ts     custom background storage, end sound
public/                         static files copied as-is (favicon, later robots.txt, ads.txt)
```

## Adding a new tool

1. Create `src/<slug>/index.html` and `src/<slug>/main.ts` (copy the countdown page skeleton:
   header/footer placeholders, `mountSiteChrome('<slug>')`, `@shared/styles/base.css`).
   Vite picks up the new page automatically (see `vite.config.ts`).
2. Add the tool to `tools` in `src/shared/config.ts` so it appears on the hub and in the nav.

## Countdown: things to keep right

- Remaining time is always computed as `endsAt - Date.now()`, never by decrementing a counter
  (background tabs throttle timers, so counters drift).
- Share links: `?to=<ISO date>` (date mode) or `?d=<seconds>` (timer), plus `t=<title>` and `theme=<id>`.
  The custom background is never part of a link.
- Saved state lives in localStorage under `countdown:state:v1`; bump the version if the shape changes incompatibly.
- Sound needs a user gesture first (`primeAudio()` on Start / first tap).

## Not done yet (ideas, in rough priority)

- Real ad integration + GDPR consent banner (CMP) before enabling `site.ads.enabled`
- Content/SEO pages (e.g. "Odpočet do Vánoc") — also needed for AdSense approval
- PWA (offline), OBS/stream overlay mode with transparent background, more themes, i18n
