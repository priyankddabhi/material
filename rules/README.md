# Our own rules

These are our own working rules and research notes, learned from real projects (videos and product ads).
**When a rule here disagrees with a third-party skill, follow the rule here.**

Copied unchanged from our private working repo on 2026-10-30. Some notes still mention old working paths (`~/workspace/...`) or use our first project (an Nvidia explainer video) as the example. The rules themselves are general; ignore the old paths.

## `animation/` — videos, motion, layout
| File | What it is | Read it when | Keywords |
|---|---|---|---|
| [`margin-rules.md`](animation/margin-rules.md) | Margins (96 px on 1080/1920 canvases), spacing steps 8/16/24/32/48/64/96/128/192, "set the frame first", gap between groups ≥ 2× gap inside a group | Laying out any video frame, poster or image | margins, spacing, grid, layout, safe area, alignment, whitespace |
| [`motion-principles.md`](animation/motion-principles.md) | IBM + U-Michigan motion rules: one focal point, single-axis camera, simple design allows bigger motion, dense design needs small motion | Deciding how things move | motion design, focal point, easing, camera, duration |
| [`gsap-notes.md`](animation/gsap-notes.md) | GSAP API we use (tweens, timelines, labels, stagger, easing, plugins), paused timeline + `seek(t)` for frame-by-frame video rendering, licence note | Writing animation code for videos | GSAP, timeline, seek, stagger, ease, MotionPath, DrawSVG, SplitText, render frames |
| [`svg2-notes.md`](animation/svg2-notes.md) | SVG 2 standard and its traps (CSS beats the `fill` attribute, `transform-origin` defaults to 0 0, viewBox, text measuring) | Drawing scenes in SVG | SVG, viewBox, transform-origin, paint, gradients, text, QC |
| [`svg-tools.md`](animation/svg-tools.md) | Comparison of SVG.js, Anime.js, SMIL `<animate>` and Figma Community | Picking an animation tool | SVG.js, Anime.js, SMIL, Figma, tool choice |
| [`m3-layout-notes.md`](animation/m3-layout-notes.md) | Google Material 3 breakpoints, panes, grids, margins | Phone vs tablet vs desktop layouts | breakpoints, responsive, grid, columns, Material 3 |
| [`space-concepts-notes.md`](animation/space-concepts-notes.md) | Whitespace theory: macro, meso, micro space; grouping; breathing room | Making a frame or page feel calm and premium | whitespace, negative space, grouping, proximity, breathing room |
| [`research-index.md`](animation/research-index.md) | Which websites were read, what was taken, which note holds it | Finding the source of a rule | sources, research, references |

## `product-photo/topics/` — product photos and ad images
| File | What it is | Keywords |
|---|---|---|
| [`composition.md`](product-photo/topics/composition.md) | One eye-start, one hero (largest), contrast pairs, focal point | composition, hierarchy, hero, focal point, eye-start |
| [`colour.md`](product-photo/topics/colour.md) | Two base colours + exactly one unexpected accent | colour, palette, accent, contrast |
| [`lighting.md`](product-photo/topics/lighting.md) | Three-point hero light, glow as a spotlight | lighting, key light, rim light, glow, shadows |
| [`photography.md`](product-photo/topics/photography.md) | Shallow depth of field, leading lines, rule of thirds | depth of field, leading lines, thirds |
| [`typography.md`](product-photo/topics/typography.md) | Frame text: title 1.5× body, distinct treatments, 4.5:1 contrast, learn type from real layouts | typography, headline, CTA, contrast, frame text |
| [`brand-identity.md`](product-photo/topics/brand-identity.md) | One theme repeated (motif, palette, wording) across every design | brand, consistency, theme, motif |
| [`ad-format-hooks.md`](product-photo/topics/ad-format-hooks.md) | Reel/ad formats, tonalities, attention triggers, 9 carousel types | ad format, hook, carousel, CTA, attention |
| [`prompt-craft.md`](product-photo/topics/prompt-craft.md) | Image prompt in 5 slots: product + setting + lighting + style + technical | AI image prompt, prompt formula |
| [`process.md`](product-photo/topics/process.md) | Diagnose the one weakness, fix it boldly; self-score before showing (below 7 = redo) | process, QC, critique, self-score |

Matching ready skill: [`../third-party/anthropic-skills/skills/canvas-design/`](../third-party/anthropic-skills/skills/canvas-design/) for the layout and fonts of a static ad.
