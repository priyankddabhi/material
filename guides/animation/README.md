# Animation — videos and motion

Our pipeline: SVG scenes + one paused GSAP timeline, rendered frame by frame with `seek(t)`, then voice and music added. Layout rules: [`../layout/`](../layout/README.md).

| File | What it is | Read it when | Keywords |
|---|---|---|---|
| [`motion-recipes.md`](motion-recipes.md) | **Code recipes (GSAP + SVG) for 17 effects:** punch word, accent circle, drifting background word, progress bar/ring, tilted cards, 3D flip, staggered pills, letter build, motion blur, orbit dots, colour wash, panel wipe, push-in, label fades, voice sync, counters | Building any animated effect | GSAP code, recipe, effect, stagger, ease, wipe, counter, voice sync |
| [`motion-principles.md`](motion-principles.md) | IBM + U-Michigan rules: one focal point, single-axis camera, simple design allows bigger motion, dense design needs small motion | Deciding how things move | motion design, focal point, easing, camera, duration |
| [`gsap-notes.md`](gsap-notes.md) | GSAP API we use (tweens, timelines, labels, stagger, easing, plugins), paused timeline + `seek(t)` rendering, licence note | Writing animation code | GSAP, timeline, seek, MotionPath, DrawSVG, SplitText, render frames |
| [`svg2-notes.md`](svg2-notes.md) | SVG 2 standard and its traps: CSS beats the `fill` attribute, `transform-origin` defaults to 0 0, viewBox, text measuring | Drawing scenes in SVG | SVG, viewBox, transform-origin, paint, gradients, QC |
| [`svg-tools.md`](svg-tools.md) | SVG.js vs Anime.js vs SMIL `<animate>` vs Figma Community | Picking an animation tool | SVG.js, Anime.js, SMIL, Figma |
| [`research-index.md`](research-index.md) | Which websites were read, what was taken, which note holds it | Finding the source of a rule | sources, references |
| [`reels/`](reels/README.md) | 8 Instagram motion reels studied frame by frame (style + main lesson each) + `all-lessons.md` summary | Getting ideas that keep viewers watching | reels, premium, pacing, kinetic typography |

Libraries for these recipes: GSAP (`npm install gsap`), [`../../libraries/anime/`](../../libraries/anime/), [`../../libraries/magicui/`](../../libraries/magicui/) (web), [`../../libraries/blueprint-engine/`](../../libraries/blueprint-engine/) (blueprint style).
