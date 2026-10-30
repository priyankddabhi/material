# Sources

Every third-party folder is an unmodified copy of the part listed below, taken on 2026-10-30 and verified file-by-file against its source (same files, zero differences).
Each folder keeps its original licence file. To update a folder, fetch the same source path again and replace it.

## Third-party
| Folder in this repo | Source | Version / commit | Path copied from the source | Licence |
|---|---|---|---|---|
| `skills/impeccable/` | https://github.com/pbakaus/impeccable | `02523ae` | `plugin/skills/impeccable/`, `LICENSE`, `NOTICE.md` | Apache-2.0 |
| `skills/taste-skill/` | https://github.com/Leonxlnx/taste-skill | `12af471` | `skills/taste-skill/`, `LICENSE` | MIT |
| `skills/taste-skill-classic/` | https://github.com/Leonxlnx/taste-skill | `ce26fc2` (2026-09-26, before the repo was reduced to one skill) | `skills/` brandkit, brutalist-skill, gpt-tasteskill, image-to-code-skill, imagegen-frontend-mobile, imagegen-frontend-web, minimalist-skill, output-skill, redesign-skill, soft-skill, stitch-skill, taste-skill-v1, `skills/llms.txt`, `LICENSE` | MIT |
| `skills/anthropic/` | https://github.com/anthropics/skills | `ca45fc4` | `skills/canvas-design/`, `skills/theme-factory/`, `skills/frontend-design/`, `skills/algorithmic-art/` (each with its `LICENSE.txt`), `THIRD_PARTY_NOTICES.md` | Apache-2.0; fonts SIL OFL 1.1 (`canvas-design/canvas-fonts/*-OFL.txt`) |
| `skills/brand-styles/` | https://github.com/VoltAgent/awesome-design-md | `fcc7028` | `design-md/`, `LICENSE` | MIT |
| `assets/icons/tabler/` | https://github.com/tabler/tabler-icons | `ed177a0` | `icons/`, `LICENSE` | MIT |
| `assets/icons/lucide/` | https://github.com/lucide-icons/lucide | `81875c8` | `icons/`, `LICENSE` | ISC |
| `assets/colors/tailwind/` | https://github.com/tailwindlabs/tailwindcss | `8cc0551` | `packages/tailwindcss/theme.css`, `LICENSE` | MIT |
| `libraries/magicui/` | https://github.com/magicuidesign/magicui | `efe76fc` | `apps/www/registry/magicui/` → `components/`, `apps/www/registry/lib/` → `lib/`, `LICENSE.md` | MIT |
| `libraries/anime/` | https://github.com/juliangarnier/anime | `01b81be` | `dist/bundles/`, `LICENSE.md` | MIT |
| `libraries/animate-css/` | https://github.com/animate-css/animate.css | `3f8ab23` (v4.1.1) | `animate.min.css`, `LICENSE` | Hippocratic License 2.1 (not OSI open source) |
| `libraries/roughjs/` | npm `roughjs` (source https://github.com/rough-stuff/rough) | 4.6.6 | `bundled/rough.js`, `rough.esm.js`, `rough.cjs.js`, `LICENSE` | MIT |
| `libraries/chartjs/` | npm `chart.js` (source https://github.com/chartjs/Chart.js) | 4.6.1 | `dist/chart.umd.js`, `dist/chart.umd.min.js`, `LICENSE.md` | MIT |
| `libraries/blueprint-engine/` | https://github.com/lemomo-ai/lemo-opuscar | `f171360` | `LICENSE`; `styles/blueprint/STYLE.md`; `styles/blueprint/demo/CREDITS`; `styles/blueprint/demo/draw.js`, `paper.js`, `sheet.js` → `engine/`; `styles/blueprint/demo/fonts/fonts.css`, `OFL.txt` → `engine/fonts/` | MIT (Copyright 2026 LemoLab) |
| `libraries/blueprint-engine/engine/fonts/*.ttf` | https://github.com/google/fonts (as named in the style's CREDITS) | main, 2026-10-30 | `ofl/architectsdaughter/`, `ofl/b612/`, `ofl/b612mono/`, `ofl/allura/` (font + `OFL.txt`, saved as `OFL-<family>.txt`; B612 and B612 Mono share one identical OFL file, `OFL-b612-and-b612mono.txt`) | SIL OFL 1.1 |

## Our own work
| Folder | Source | Note |
|---|---|---|
| `guides/layout/`, `guides/animation/*.md` (except `motion-recipes.md`), `guides/product-photo/topics/` | Our private working repo (Meta), commit `7a0ec25` | Copied unchanged; verified identical |
| `guides/animation/reels/`, `guides/product-photo/reels/` | Meta `animation/reel-01…08.md`, `animation/index.md` (→ `reels/all-lessons.md`), `product-shoot/mind/reels/REEL-001…009.md` | Creator usernames removed; style / main lesson / filed-in lines added; "Takeaway for Nvidia" headings renamed "Takeaway". Reel links kept as sources |
| `guides/boss-mode.md` | Our local notes folder (`become_boss.md`) | Copied unchanged |
| `catalog/tools-index.md` | Our local notes folder (`AI-RESOURCE-INDEX.md`, verified 2026-10-05) | Original text unchanged; an "Updates 2026-10-30" note added at the top |
| `guides/animation/motion-recipes.md`, all `README.md`, `AGENTS.md`, `INDEX.md` | Written 2026-10-30 | New |

Not copied on purpose: GSAP (own licence, use `npm install gsap`), and everything in [`catalog/`](catalog/README.md).
