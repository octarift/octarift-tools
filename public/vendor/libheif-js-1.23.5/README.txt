libheif-js 1.23.5 (HEIC decoder used by https://tools.octarift.com/image-compressor/)
====================================================================================

libheif-bundle.mjs   unmodified copy of libheif-wasm/libheif-bundle.mjs from the npm package
                     libheif-js@1.23.5 (SHA-256 095194187be00d3e36335b8ad7f5552d70655e5e2159486d7d36cd4daa47bba9)
LICENSE.txt          unmodified copy of libheif-wasm/LICENSE from the same package
                     (GNU LGPL version 3 and the GNU GPL version 3 it builds on)

What it contains
- libheif 1.23.5, Copyright (c) struktur AG, Dirk Farin and contributors, GNU LGPL v3
- libde265 1.0.15 (HEVC decoder), Copyright (c) struktur AG, Dirk Farin and contributors, GNU LGPL v3
- Emscripten runtime code, MIT license, Copyright (c) Emscripten authors
compiled to WebAssembly with Emscripten (AOM, OpenJPEG and other codecs are not included in this build).

Corresponding source
- libheif:      https://github.com/strukturag/libheif (commit 413e2a87e6a70b3eccc3a3adc5801179dd2d9e00, version 1.23.5)
- libde265:     https://github.com/strukturag/libde265/releases/tag/v1.0.15
- Build:        https://github.com/catdad-experiments/libheif-emscripten/tree/v1.23.5
                (libheif's build-emscripten.sh, WASM target)
- npm package:  https://github.com/catdad-experiments/libheif-js/tree/1.23.5

How the site uses it
The page loads this file at runtime only when a HEIC photo cannot be decoded natively by the browser.
It is not combined with or bundled into the site's own scripts, so it can be replaced by any other
compatible build of libheif-js (same file name and the same JavaScript interface).

Updating
Copy libheif-wasm/libheif-bundle.mjs and libheif-wasm/LICENSE from a newer libheif-js release into a new
folder named libheif-js-<version>, update LIBHEIF_URL in src/image-compressor/heic.ts, this README and
public/third-party-licenses.txt, then delete the old folder.
