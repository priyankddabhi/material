# Repo catalog — useful repos that are NOT copied here

These 20 repos are useful but were not copied, because they are too big, React-only, licence-limited, or only needed now and then.
Each entry tells an AI agent what the repo is good for, which part is worth reading, and how to fetch only that part.

**How an AI agent should use this file**
1. Match the task to the **Keywords** and **Use it for** lines below.
2. Prefer a ready asset in [`../third-party/`](../third-party/) first. Use a catalog repo only when nothing there fits.
3. Read the **Useful parts** paths on GitHub before fetching anything.
4. Fetch only that folder (see *How to fetch only one folder* at the bottom). Never clone the whole repo when the size is large.
5. Check the **Licence** line before copying anything into a project.

Facts checked on 2026-10-30 (stars, size, last update, licence, folder paths).

## Quick pick
| Need | Best repo here |
|---|---|
| **A complete video style made in code (66 styles)** | **lemo-opuscar** |
| 3D product viewer / 3D hero / 3D video scene | three.js |
| Round, flat pseudo-3D shapes (isometric "Mix 3" look) | zdog |
| Rich 2D effects, particles, filters | pixijs |
| Drag-and-drop design or ad editor | konva |
| Interactive charts and dashboards | apexcharts (licence limit) · tremor (React) |
| Ready colour themes | daisyui · webawesome · preline · shadcn/ui themes |
| Design tokens (colour roles, type scale) | material-web · ant-design · react-spectrum |
| Website sections and layouts to copy | hyperui · preline · flowbite |
| Animated backgrounds, gradients, effects | syntaxui · (also `../third-party/magicui`) |
| Bold, distinct style | neobrutalism-components |
| Web UI animation in React | motion |
| Layout ideas only (look, never copy) | origin-space/ui-experiments |

---

## 1. mrdoob/three.js — 3D for the web
- **Link:** https://github.com/mrdoob/three.js · site https://threejs.org
- **Licence:** MIT · **Repo size:** 564 MB (too big to clone) · **Stars:** 117k · **Updated:** 2026-10-30 · **Default branch:** `dev`
- **Use it for:** 3D product viewer for product photos/ads, rotating 3D hero on a website, 3D scenes rendered into video frames, glowing/lit objects, shader backgrounds.
- **Keywords:** 3D, WebGL, WebGPU, product viewer, GLTF model, lighting, shadows, materials, shaders, camera, orbit controls, hero, render to video
- **Useful parts:** `build/three.module.js` (the library, ~1 MB) · `examples/jsm/` (loaders, orbit controls, post-processing) · `examples/textures/` (108 MB) · `examples/models/` (268 MB — avoid)
- **How to fetch:** `npm install three` (best) or sparse-checkout `build/` and `examples/jsm/`.
- **Watch out:** heavy for mobile pages; keep scenes simple.

## 2. metafizzy/zdog — round, flat pseudo-3D
- **Link:** https://github.com/metafizzy/zdog · site https://zzz.dog
- **Licence:** not detected by GitHub — confirm on zzz.dog before use · **Size:** 0.3 MB · **Stars:** 10.7k · **Updated:** 2023-07 (no longer active)
- **Use it for:** 3D-looking icons, spinning logos, simple isometric objects that match the "Mix 3 Isometric + Dark" video style, without WebGL.
- **Keywords:** pseudo-3D, isometric, flat 3D, round shapes, canvas, SVG, spinning logo, illustration, tiny library
- **Useful parts:** `dist/zdog.dist.min.js` (~30 KB) · `demos/` (houses, solids, logo examples)
- **How to fetch:** download the one dist file, or `npm install zdog`.

## 3. pixijs/pixijs — fast 2D WebGL / WebGPU effects
- **Link:** https://github.com/pixijs/pixijs · site https://pixijs.com
- **Licence:** MIT · **Size:** 43 MB · **Stars:** 48.6k · **Updated:** 2026-10-28 · **Default branch:** `dev`
- **Use it for:** rich animated backgrounds, particle effects, filters (blur, colour matrix, displacement), blend modes, sprite animation, game-like visuals.
- **Keywords:** 2D, WebGL, WebGPU, particles, filters, blend modes, sprites, textures, gradients, text effects, performance
- **Useful parts:** `src/filters/` · `src/advanced-blend-modes/` · `examples/` (with assets)
- **How to fetch:** `npm install pixi.js`; read examples on pixijs.com.

## 4. konvajs/konva — canvas editors and diagrams
- **Link:** https://github.com/konvajs/konva · site https://konvajs.org
- **Licence:** MIT · **Size:** 3.3 MB · **Stars:** 14.9k · **Updated:** 2026-10-23
- **Use it for:** building your own ad/product-photo editor (drag, resize, crop, add text, export PNG), whiteboards, diagrams, annotations.
- **Keywords:** canvas, design editor, drag and drop, transform, image crop, export PNG, diagram, whiteboard, layers, filters
- **Useful parts:** `src/shapes/` · `src/filters/` · demos on konvajs.org (Canvas Editor, Image Crop, Window Frame Designer)
- **How to fetch:** `npm install konva`.

## 5. apexcharts/apexcharts.js — interactive charts
- **Link:** https://github.com/apexcharts/apexcharts.js · site https://apexcharts.com
- **Licence:** custom — free only for individuals/companies under the revenue limit on apexcharts.com (check before client work) · **Size:** 57 MB · **Stars:** 15.2k · **Updated:** 2026-10-29
- **Use it for:** dashboards and infographic charts on websites: 18+ types (line, area, bar, pie, donut, radar, heatmap, treemap, candlestick, funnel, gauge).
- **Keywords:** charts, infographic, dashboard, heatmap, treemap, gauge, funnel, SVG charts, animated charts
- **Useful parts:** `samples/vanilla-js/` (ready chart examples per type) · `dist/`
- **How to fetch:** `npm install apexcharts`. Free alternative already here: `../third-party/chart.js/`.

## 6. tremorlabs/tremor — dashboard components (React)
- **Link:** https://github.com/tremorlabs/tremor · site https://tremor.so
- **Licence:** Apache-2.0 · **Size:** 1.8 MB · **Stars:** 3.7k · **Updated:** 2025-10 (quiet)
- **Use it for:** clean, professional dashboard pages: KPI cards, bar lists, area/bar/donut charts, trackers.
- **Keywords:** dashboard, KPI, charts, analytics, React, Tailwind, Radix, copy-paste
- **Useful parts:** `src/components/` (35+ components)
- **How to fetch:** copy single components from tremor.so docs.

## 7. saadeghi/daisyui — ready colour themes for Tailwind
- **Link:** https://github.com/saadeghi/daisyui · site https://daisyui.com
- **Licence:** MIT · **Size:** 19 MB · **Stars:** 42.7k · **Updated:** 2026-10-17
- **Use it for:** picking a full colour theme in one word (35+ themes: light, dark, cupcake, corporate, luxury, retro…), theme generator, simple semantic class names.
- **Keywords:** themes, colour palette, dark mode, Tailwind, theme generator, semantic classes, zero JS
- **Useful parts:** `skills/daisyui/` (**an AI agent skill**, 73 files) · `packages/daisyui/` (themes + components) · theme generator at daisyui.com/theme-generator
- **How to fetch:** `npm install daisyui`, or sparse-checkout `skills/daisyui/`.

## 8. shoelace-style/webawesome — themes and tokens from the Font Awesome team
- **Link:** https://github.com/shoelace-style/webawesome · site https://webawesome.com
- **Licence:** MIT core (Pro is paid) · **Size:** 65 MB · **Stars:** 1.4k · **Updated:** 2026-10-29 · **Default branch:** `next`
- **Use it for:** framework-free web components with official themes, dark theme and design tokens; works in plain HTML.
- **Keywords:** web components, themes, design tokens, dark theme, colour palettes, any framework, plain HTML
- **Useful parts:** `packages/webawesome/docs/_includes/theming/` · `packages/webawesome/docs/docs/tokens/`
- **How to fetch:** load from CDN as in webawesome.com docs; sparse-checkout the docs folders to read tokens.

## 9. shadcn-ui/ui — clean professional website defaults
- **Link:** https://github.com/shadcn-ui/ui · site https://ui.shadcn.com
- **Licence:** MIT · **Size:** 49 MB · **Stars:** 127k · **Updated:** 2026-10-29
- **Use it for:** modern React/Next.js websites with a professional, calm look; ready themes, blocks (dashboards, login, sidebars) and charts.
- **Keywords:** React, Next.js, components, themes, blocks, charts, professional, Tailwind, Radix, copy-paste
- **Useful parts:** `apps/v4/public/r/styles/new-york/` (component registry) · `apps/v4/registry/new-york-v4/examples/` · themes at ui.shadcn.com/themes
- **How to fetch:** never clone; run `npx shadcn@latest init` then `npx shadcn@latest add <component>`.

## 10. material-components/material-web — Material 3 tokens
- **Link:** https://github.com/material-components/material-web · site https://material-web.dev
- **Licence:** Apache-2.0 · **Size:** 18 MB · **Stars:** 11.4k · **Updated:** 2026-10-30 · **Status:** maintenance mode
- **Use it for:** Google Material 3 colour roles, type scale and shape tokens as a reference for consistent design.
- **Keywords:** Material 3, design tokens, colour roles, typography scale, shape, elevation, Google
- **Useful parts:** `tokens/versions/` (token files) · `docs/theming/`
- **How to fetch:** sparse-checkout `tokens/` and `docs/theming/`. Layout numbers already noted in Meta `m3-layout-notes.md`.

## 11. ant-design/ant-design — enterprise design language
- **Link:** https://github.com/ant-design/ant-design · site https://ant.design (design spec: https://ant.design/docs/spec/introduce)
- **Licence:** MIT · **Size:** 56 MB · **Stars:** 100k · **Updated:** 2026-10-30
- **Use it for:** written design rules (colour, layout, spacing, typography, data display) for serious business pages and dashboards.
- **Keywords:** design language, enterprise, dashboard, colour system, spacing, typography, data-dense, tables, forms
- **Useful parts:** the design spec pages on ant.design · `.dumi/theme/common/Color/` · `.dumi/pages/index/components/ThemePreview/previewThemes/` (12 theme presets)
- **How to fetch:** read the website spec; `npm install @ant-design/colors` to generate colour scales.

## 12. adobe/react-spectrum — Adobe's design system
- **Link:** https://github.com/adobe/react-spectrum · site https://react-spectrum.adobe.com
- **Licence:** Apache-2.0 · **Size:** 188 MB (too big to clone) · **Stars:** 16k · **Updated:** 2026-10-29
- **Use it for:** accessible, adaptive design; component illustrations (light + dark); a React Aria + Tailwind starter.
- **Keywords:** Adobe, Spectrum, accessibility, design system, illustrations, light/dark, colour tokens, React Aria, internationalisation
- **Useful parts:** `packages/dev/s2-docs/assets/component-illustrations/` (light/ and dark/) · `starters/tailwind/`
- **How to fetch:** sparse-checkout only those folders.

## 13. motiondivision/motion — web animation (React / JS / Vue)
- **Link:** https://github.com/motiondivision/motion · site https://motion.dev
- **Licence:** MIT · **Repo size:** 278 MB (265 MB is a package cache; the library itself is ~2 MB) · **Stars:** 34.7k · **Updated:** 2026-10-30
- **Use it for:** website animations: springs, gestures, layout transitions, scroll-linked effects (formerly Framer Motion). For videos, use GSAP or `../third-party/anime/`.
- **Keywords:** animation, React, spring, gesture, layout animation, scroll animation, page transitions, Framer Motion
- **How to fetch:** `npm install motion`. Never clone.

## 14. htmlstreamofficial/preline — Tailwind blocks, templates, themes
- **Link:** https://github.com/htmlstreamofficial/preline · site https://preline.co
- **Licence:** dual MIT + Fair Use — check which part you copy · **Size:** 7.3 MB · **Stars:** 6.5k · **Updated:** 2026-08-31
- **Use it for:** 204 free website blocks, 5 templates (websites, ecommerce, AI, dashboards), ready themes.
- **Keywords:** Tailwind, blocks, sections, templates, landing page, ecommerce, dashboard, themes, theme generator
- **Useful parts:** `css/themes/` (theme files) · `templates/` · `skills/theme-generator/` (**AI skill**)
- **How to fetch:** sparse-checkout `css/themes/` and `skills/theme-generator/`.

## 15. markmead/hyperui — free copy-paste HTML sections
- **Link:** https://github.com/markmead/hyperui · site https://hyperui.dev
- **Licence:** MIT · **Size:** 3.6 MB · **Stars:** 12.3k · **Updated:** 2026-10-25
- **Use it for:** marketing, app and ecommerce sections in plain HTML + Tailwind (heroes, pricing, CTAs, badges, cards, footers). No package needed.
- **Keywords:** HTML sections, Tailwind v4, hero, pricing, CTA, badges, cards, footer, ecommerce, marketing, copy-paste
- **Useful parts:** `public/examples/` (560 example files) · `.agents/skills/`
- **How to fetch:** copy from hyperui.dev, or sparse-checkout `public/examples/`.

## 16. themesberg/flowbite — Tailwind components and gradients
- **Link:** https://github.com/themesberg/flowbite · site https://flowbite.com
- **Licence:** MIT (Pro is paid) · **Size:** 20.5 MB · **Stars:** 9.4k · **Updated:** 2026-06-27
- **Use it for:** forms, navbars, modals, layouts; gradient background images; default theme variables.
- **Keywords:** Tailwind, components, forms, layouts, gradients, backgrounds, themes, plain HTML
- **Useful parts:** `src/themes/` · `static/images/gradients/` · `content/components/` (docs with examples)
- **How to fetch:** `npm install flowbite`; sparse-checkout `static/images/gradients/` for backgrounds.

## 17. SyntaxUI/syntaxui — animated effects and gradients
- **Link:** https://github.com/SyntaxUI/syntaxui · site https://syntaxui.com
- **Licence:** MIT · **Size:** 1.1 MB · **Stars:** 1k · **Updated:** 2026-05-18
- **Use it for:** animated backgrounds, gradient effects, text effects, buttons with motion (Tailwind + Framer Motion).
- **Keywords:** animation, gradients, backgrounds, effects, text effects, Framer Motion, Tailwind, copy-paste
- **Useful parts:** `src/showcase/effects/` (incl. `gradients/`) · `src/components/icons/`
- **How to fetch:** copy from syntaxui.com.

## 18. ekmas/neobrutalism-components — bold neobrutalism style
- **Link:** https://github.com/ekmas/neobrutalism-components · site https://neobrutalism.dev
- **Licence:** MIT · **Size:** 2.3 MB · **Stars:** 5.6k · **Updated:** 2026-09-19
- **Use it for:** a loud, bold, playful look: thick black borders, hard offset shadows, flat bright colours, chunky badges.
- **Keywords:** neobrutalism, bold, thick borders, hard shadow, bright colours, playful, badges, shadcn
- **Useful parts:** `src/components/` · `src/data/` · registry `public/r/`
- **How to fetch:** `npx shadcn@latest add` from neobrutalism.dev.

## 19. origin-space/ui-experiments — layout ideas (LOOK ONLY)
- **Link:** https://github.com/origin-space/ui-experiments · live demos https://originui.com/layouts
- **Licence:** custom — **use in your own projects is allowed, but redistribution or resale, even partial, is NOT allowed.** Never copy its files into this repo.
- **Size:** 2.3 MB · **Stars:** 1.4k · **Updated:** 2025-12
- **Use it for:** inspiration for dashboards, heroes and app layouts (6 experiments).
- **Keywords:** layouts, dashboard, hero, app UI, shadcn, inspiration only

## 20. lemomo-ai/lemo-opuscar — 66 video styles made in code
- **Link:** https://github.com/lemomo-ai/lemo-opuscar · gallery https://lemomo-ai.github.io/lemo-opuscar/
- **Licence:** MIT (Copyright 2026 LemoLab); each style lists its font, voice and music credits in `demo/CREDITS` · **Stars:** 9.6k · **Updated:** 2026-10-29
- **Use it for:** making an explainer or ad video in a complete, ready style: each style has a style prompt (`STYLE.md`), a demo film with all its code, and its credits. Tuned for Claude; other models may reproduce it less well.
- **Keywords:** video styles, explainer video, motion graphics in code, blueprint, swiss motion, iso infographic, dataviz, dark keynote, glass product, whiteboard, papercut, risograph, newsreel, transit map, kinetic, film
- **Styles (66):** archive-lighttable, art-deco, ascii-crt, backrooms, blueprint, brick-toy, briefing-board, caption-news, cel-anime-80s, chalkboard, circuit-board, city-symphony, countdown, crayon-book, dark-keynote, data-physical, dataviz, desktop-flythrough, engraving, game-show, glass-product, halftone-dossier, hd-2d, hologram-hud, impasto, ink-wash, iso-infographic, isometric-picture-book, kino-montage, lidar-survey, living-screencast, lowpoly-island, memphis-diorama, microgame, microscope, midcentury-toon, news-package, newsreel, one-line, paper-lantern, paper-popup, papercut-red, pictogram-motion, pixel-rpg, printed-long-take, risograph, rubber-hose, satellite-briefing, scifi-toon, shadow-puppet, silent-film, silkscreen-poster, spy-titles, stained-glass, swiss-motion, teardown, telestrator, tilt-shift, transit-map, ukiyoe, urban-sketch, visual-investigation, watercolor, white-model, whiteboard, woodcut
- **Best fits for our channel style guide:** `swiss-motion` + `blueprint` (Mix 1), `iso-infographic` + `dark-keynote` (Mix 3), `dataviz` for numbers, `glass-product` for product ads.
- **Useful parts:** `styles/<name>/STYLE.md` (the style rules) · `styles/<name>/demo/` (full film code) · `styles/_template/` (start your own style)
- **Already copied here:** the Blueprint engine → [`../third-party/lemo-opuscar-blueprint/`](../third-party/lemo-opuscar-blueprint/)
- **How to fetch:** sparse-checkout one style: `'/styles/<name>/' '/LICENSE'`. Font files are not in the repo; get them from google/fonts as named in each style's CREDITS.

---

## How to fetch only one folder (any repo)
```bash
git clone --depth 1 --filter=blob:none --sparse https://github.com/OWNER/REPO.git
cd REPO
git sparse-checkout set --no-cone '/path/to/folder/' '/LICENSE'
```
On Windows Git Bash, run `export MSYS_NO_PATHCONV=1` first, or the `/path` arguments get rewritten.
Always keep the repo's LICENSE next to anything you copy, and add a line to [`../SOURCES.md`](../SOURCES.md).
