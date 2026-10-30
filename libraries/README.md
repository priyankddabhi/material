# Libraries — code to load or import

Ready built files; load them with a `<script>` / `<link>` tag or import them. How to use them for video effects: [`../guides/animation/motion-recipes.md`](../guides/animation/motion-recipes.md).

| Folder | What it is | Main files | Keywords | Licence |
|---|---|---|---|---|
| [`anime/`](anime/) | Anime.js v4 animation engine (free GSAP alternative) | `anime.umd.min.js`, `anime.esm.min.js` (+ non-minified) | animation, timeline, stagger, SVG morph, line drawing, seekable | MIT |
| [`animate-css/`](animate-css/) | Animate.css 4.1.1: 80+ ready CSS animations (fade, bounce, zoom, slide, flip) | `animate.min.css` | CSS animation, entrance, exit, attention | Hippocratic 2.1 ⚠ ethical-use conditions |
| [`chartjs/`](chartjs/) | Chart.js 4.6.1 charts (bar, line, pie, doughnut, radar…) | `chart.umd.min.js` | charts, infographic, dashboard, data | MIT |
| [`roughjs/`](roughjs/) | Rough.js 4.6.6: hand-drawn, sketchy lines and shapes on canvas or SVG | `rough.js`, `rough.esm.js`, `rough.cjs.js` | sketch, hand-drawn, whiteboard, infographic | MIT |
| [`magicui/`](magicui/) | **79 React + Tailwind effects** in `components/` (they import `@/lib/utils` → `lib/utils.ts`, plus `motion` and `react`). **Patterns:** dot, grid, animated/interactive/flickering grid, hexagon, striped, retro grid, noise texture, dotted map. **Premium look:** shine border, border beam, neon gradient card, magic card, sparkles/aurora text, shimmer/rainbow buttons, light rays, meteors, particles. **Infographic motion:** number ticker, animated circular progress, animated beam, orbiting circles, globe, kinetic text, text reveal, typing animation | `components/<name>.tsx` | patterns, background, glow, shine, badge, premium, number counter, progress ring, animated text | MIT |
| [`blueprint-engine/`](blueprint-engine/) | The "Blueprint" video style: `engine/draw.js` (projection, lines that draw themselves), `engine/paper.js` (WebGL cyanotype paper), `engine/sheet.js` (border, title block, parts list, notes, rain, hand shadow), `engine/fonts/` (4 OFL families + `fonts.css`), `STYLE.md` (full style rules), `CREDITS` | `engine/*.js`, `STYLE.md` | blueprint, technical drawing, patent drawing, line-drawing animation, explainer video | MIT · fonts OFL |

**GSAP**, our main video animation library, is not copied (it has its own licence): `npm install gsap`. Notes: [`../guides/animation/gsap-notes.md`](../guides/animation/gsap-notes.md).

`blueprint-engine/engine/sheet.js` still contains the original demo's text ("The Cloud Catcher", "C. Wrenfield", "LemoLab × Claude Opus 5.5"); replace it with your own title-block text. 65 more video styles like this one: [`../catalog/repos.md`](../catalog/repos.md) → lemo-opuscar.
