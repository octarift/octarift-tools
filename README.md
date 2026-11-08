# Web Tools

Sada jednoduchých webových nástrojů, které běží přímo v prohlížeči. První nástroj je **odpočet**:

- časovač (délka) nebo odpočet k datu
- předdefinovaná témata, z toho tři animovaná
- vlastní obrázek nebo video na pozadí (zůstává jen v prohlížeči)
- režim celé obrazovky, obrazovka během odpočtu nezhasne
- zvuk na konci, sdílitelný odkaz

## Spuštění

Je potřeba [Node.js](https://nodejs.org/) 20.19 nebo novější.

```bash
npm install
npm run dev
```

Pak otevřete http://localhost:5173/countdown/.

## Build

```bash
npm run build
```

Výsledek je ve složce `dist/` a dá se nahrát na libovolný statický hosting
(Cloudflare Pages, Netlify, GitHub Pages).

Podrobnosti o struktuře a pravidlech projektu jsou v [CLAUDE.md](CLAUDE.md).
