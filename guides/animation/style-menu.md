# Style menu: what we can make in code

Filtered from a 133-item style list (2026-11-04). Kept only what our pipeline can build:
SVG / HTML / Canvas + GSAP, rendered frame by frame (see [`video-playbook.md`](video-playbook.md), engine [`../metaweek/engine/kit.js`](../metaweek/engine/kit.js)).
Preview of all visual styles in reel ratio (9:16): [`style-menu.png`](style-menu.png).

**✅ code** = 100% code. **🖼 hybrid** = code + images you send (photos, textures, drawings), which we place, mask, move and filter in code.
GSAP plugins available: DrawSVG, MorphSVG, MotionPath, SplitText, ScrambleText, Physics2D, Inertia, CustomEase/Bounce/Wiggle.

## 1. Visual styles (25 → 25 kept)
| Style | Type | How we build it |
|---|---|---|
| Swiss International | ✅ | 12-column grid, one sans, giant numbers, one signal colour |
| Isometric | ✅ | `P(o,u,v,z)` projection, 3 tones per face (`box`, `isoServer`, `isoPackage`) |
| Blueprint | ✅ | Blue ground, white grid, line drawings drawn on, mono labels |
| Forensic Investigation | ✅ / 🖼 | Evidence board: cards, pins, red string paths, "EXHIBIT" stamps; real photos = hybrid |
| Brutalist | ✅ | Raw grid, heavy borders, system-like type, no decoration |
| Cyberpunk Minimal | ✅ | Near-black, thin neon lines, glow filter, small mono text |
| Editorial Newspaper | ✅ | Newsprint colour, serif headline, columns, halftone dots |
| Chalkboard Sketch | ✅ | Green board, handwriting font, SVG turbulence chalk filter |
| Technical Manual | ✅ | Numbered callouts, leader lines, "FIG." captions |
| Terminal / Hacker UI | ✅ | Mono text typing line by line, prompt, cursor blink |
| Dark Data Visualization | ✅ | Bars, lines, counters on a dark ground (see `dataviz` rules) |
| Paper Cutout | ✅ / 🖼 | Layered flat shapes + soft shadows; real paper texture = hybrid |
| Retro Futurism | ✅ | Sunset gradient, striped sun, perspective grid floor |
| Bauhaus | ✅ | Primary colours, circle / square / triangle compositions |
| Industrial Design | 🖼 | Product photo or render from you; we add callouts, stripes, motion |
| Architectural Diagram | ✅ | Thin plan lines, hatching, section marks (style only, not on our normal videos) |
| Minimal Monochrome | ✅ | One colour, lots of empty space, one small word |
| Neo-Brutalism | ✅ | Bold flat colours, thick black outlines, hard offset shadows |
| Documentary Collage | 🖼 | Your photos + torn-paper masks, tape, halftone, parallax |
| Scientific Illustration | ✅ / 🖼 | Fine-line labelled diagrams; realistic drawings = hybrid |
| Wireframe | ✅ | Line-only 3D-looking shapes (sphere, cube, terrain) |
| Grunge Editorial | ✅ / 🖼 | Distressed type via SVG noise filters; scanned textures = hybrid |
| Abstract Geometry | ✅ | Overlapping shapes, gradients, rotating compositions |
| Vintage Computer | ✅ | Pixel font, CRT curve, scanlines, green/amber phosphor |
| Kinetic Typography | ✅ | Words as the main visual: scale, rotate, stack on the beat |

## 2. Text styles (18 → 18 kept, all ✅)
| Style | How |
|---|---|
| Kinetic · Oversized · Minimal · Editorial · Monospace · Condensed Bold | Fonts in `skills/anthropic/canvas-design/canvas-fonts/` + size contrast |
| Outline | `-webkit-text-stroke` or SVG stroke, transparent fill |
| 3D Typography | Stacked text-shadows (extrusion) or CSS 3D layers |
| Typewriter | Characters revealed one by one + cursor |
| Glitch | Offset RGB copies + clip slices, per-frame jitter |
| Staggered | SplitText + stagger |
| Masked | Text as clip-path / mask over image or video |
| Split | Word halves sliding apart (two clipped copies) |
| Vertical | Rotated 90° or `writing-mode` |
| Rotating | Text on circles / paths (`ringText`, `pathText`) |
| Highlighted | Marker bar grows behind words |
| Marquee | Endless row moved per frame |
| Number Typography | Counters, digit cells, giant numerals |

## 3. Animation styles (20 → 17 kept)
| Style | Type | How |
|---|---|---|
| Motion Graphics · Kinetic · Explainer · Infographic · Diagram · Motion Typography | ✅ | Our standard pipeline |
| 2D Animation | ✅ | Shapes and simple objects (not full character acting) |
| Draw-on | ✅ | DrawSVG / dash offset (`draw`) |
| Path | ✅ | MotionPath along SVG paths |
| Morphing · Shape Transformation | ✅ | MorphSVG between paths |
| Isometric | ✅ | Iso helpers + crane camera |
| Parallax | ✅ | Two cameras (`#world` / `#words`) move at different rates |
| Mask Reveal | ✅ | clip-path / mask animated |
| Liquid Motion | ✅ | Blob paths + SVG turbulence/displacement |
| Particle | ✅ | Canvas particles, seeded random |
| Procedural | ✅ | Shapes made by code from rules (spirals, grids, noise) |
| Frame-by-Frame | 🖼 | Only if you send drawn frames; we sequence them |
| Stop Motion | 🖼 | Only with your photos; stepped at 12 fps |

**Not offered:** true 3D animation with models and lighting (we do pseudo-3D: CSS 3D, isometric, wireframe).

## 4. Smoothness & motion (15 → 15 kept, all ✅)
Ease-in / ease-out / in-out, spring, elastic, overshoot (`back.out`), inertia, momentum, fluid, organic (CustomWiggle), staggered, continuous (per-frame `life`), slow motion (time scale), cinematic (long ease `cubic-bezier(.16,1,.3,1)`), seamless loop (last frame = first frame).

## 5. Effects (25 → 24 kept)
| Effect | Type | How |
|---|---|---|
| Glitch · RGB Split · Chromatic Aberration · Digital Flicker | ✅ | Offset coloured copies, per-frame jitter, opacity flicker |
| Scanline · CRT | ✅ | Repeating gradient lines + barrel curve + vignette |
| Film Grain · Noise | ✅ | ffmpeg `noise` filter at render (fast) |
| Blur Transition · Motion Blur · Zoom Blur | ✅ | Camera blur on cuts; motion/zoom blur = layered copies (slower render) |
| Glow · Neon | ✅ | `drop-shadow` / SVG blur filter |
| Distortion · Liquid Distortion | ✅ | `feTurbulence` + `feDisplacementMap` |
| Halftone | ✅ | Dot pattern masks |
| Shake | ✅ | Seeded per-frame offset (use rarely) |
| Light Sweep · Shadow Reveal · Wireframe Reveal | ✅ | Moving gradient mask, shadow grow, draw-on lines then fill |
| Particle Dissolve · Shatter | ✅ | Canvas particles; clip-path shards |
| Scramble Text | ✅ | ScrambleText plugin |
| Gradient Flow | ✅ | Animated gradient stops |
| Pixel Sorting | 🖼 | Only on still images (canvas), slow |

## 6. Transitions (15 → 15 kept, all ✅)
Slide, wipe, zoom, match cut, morph, whip pan (`cut`), split screen, circular reveal, mask, glitch, push, parallax, seamless, shape-based, camera pan.

## Good combinations
| Use | Mix |
|---|---|
| Our house style | Swiss + Blueprint + Isometric + dark theme + Neo-Brutalism accents |
| Crime / hack / heist story | Forensic Investigation + Terminal UI + Dark Data Viz + Swiss type |
| Product ad | Kinetic Typography + Neo-Brutalism + Isometric product |
| History / documentary | Editorial Newspaper + Documentary Collage (🖼) + Paper Cutout |
| Retro tech | Vintage Computer + CRT + Typewriter text |
