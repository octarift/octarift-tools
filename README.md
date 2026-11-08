# Octarift Tools

Sada jednoduchých webových nástrojů od [Octarift](https://octarift.com), které běží přímo v prohlížeči.
Web: https://tools.octarift.com. První nástroj je **odpočet**:

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

Výsledek je ve složce `dist/`. Na GitHub Pages se web nasazuje automaticky
při každém pushi do `main` (viz `.github/workflows/deploy.yml`).

Podrobnosti o struktuře a pravidlech projektu jsou v [CLAUDE.md](CLAUDE.md).
