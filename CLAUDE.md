# Web Tools

A collection of small browser-based tools on one site. The first tool is a
countdown (`/countdown/`); more tools will be added if the project takes off.

## Goals and product rules

- Everything runs in the browser. No backend, no accounts. Hosted as a static site.
- **User files never leave the device.** Uploaded backgrounds etc. go to IndexedDB, never to a server.
- **Ads and the Buy Me a Coffee button appear only outside fullscreen.** Fullscreen is the product; keep it clean.
- UI language is Czech (`lang="cs"`, formal "vy" form). Code, comments and commit messages are in English.
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
    state.ts                    state shape, persistence, share-link encoding
    timer.ts                    pure time helpers
    themes.ts + countdown.css   theme list and their look ([data-theme="id"])
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
