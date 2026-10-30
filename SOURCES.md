# Sources

Every folder in `third-party/` is an unmodified copy of the part listed below, taken on 2026-10-30 and verified file-by-file against the source (same file count, zero differences).
Each folder keeps the original licence file. To update a folder, fetch the same path again and replace it.

| Folder in this repo | Source | Version / commit | Path copied | Licence |
|---|---|---|---|---|
| `third-party/impeccable/` | https://github.com/pbakaus/impeccable | `02523ae` | `plugin/skills/impeccable/`, `LICENSE`, `NOTICE.md` | Apache-2.0 |
| `third-party/anthropic-skills/` | https://github.com/anthropics/skills | `ca45fc4` | `skills/canvas-design/`, `skills/theme-factory/`, `skills/frontend-design/`, `skills/algorithmic-art/` (each with its `LICENSE.txt`), `THIRD_PARTY_NOTICES.md` | Apache-2.0; fonts SIL OFL 1.1 (licence file per family in `canvas-fonts/`) |
| `third-party/awesome-design-md/` | https://github.com/VoltAgent/awesome-design-md | `fcc7028` | `design-md/`, `LICENSE` | MIT |
| `third-party/taste-skill/` | https://github.com/Leonxlnx/taste-skill | `12af471` | `skills/`, `LICENSE` | MIT |
| `third-party/tabler-icons/` | https://github.com/tabler/tabler-icons | `ed177a0` | `icons/`, `LICENSE` | MIT |
| `third-party/lucide/` | https://github.com/lucide-icons/lucide | `81875c8` | `icons/`, `LICENSE` | ISC |
| `third-party/tailwindcss/` | https://github.com/tailwindlabs/tailwindcss | `8cc0551` | `packages/tailwindcss/theme.css`, `LICENSE` | MIT |
| `third-party/magicui/` | https://github.com/magicuidesign/magicui | `efe76fc` | `apps/www/registry/magicui/`, `apps/www/registry/lib/`, `LICENSE.md` | MIT |
| `third-party/anime/` | https://github.com/juliangarnier/anime | `01b81be` | `dist/bundles/`, `LICENSE.md` | MIT |
| `third-party/animate-css/` | https://github.com/animate-css/animate.css | `3f8ab23` (v4.1.1) | `animate.min.css`, `LICENSE` | Hippocratic License 2.1 (not OSI open source) |
| `third-party/roughjs/` | npm `roughjs` (source https://github.com/rough-stuff/rough) | 4.6.6 | `bundled/rough.js`, `rough.esm.js`, `rough.cjs.js`, `LICENSE` | MIT |
| `third-party/chart.js/` | npm `chart.js` (source https://github.com/chartjs/Chart.js) | 4.6.1 | `dist/chart.umd.js`, `dist/chart.umd.min.js`, `LICENSE.md` | MIT |

Not copied on purpose: GSAP (own licence, use `npm install gsap`), and everything in [`repo-catalog/`](repo-catalog/README.md).
