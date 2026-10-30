# material — design library for AI agents

One place an AI agent reads before making a **website**, a **video / infographic**, or a **product photo / ad**.
It holds free, licence-checked design assets (fonts, icons, colours, patterns, animation libraries, design skills) plus a catalog of other useful repos and websites.

## AI agent: start here
1. Find your task in **Task router** below and open only the listed items.
2. Read our own rules in [`rules/`](rules/README.md) first. When they disagree with a third-party skill, our rules win.
3. Use files from [`third-party/`](third-party/) directly. They are complete copies, verified against their source.
4. If nothing fits, check [`repo-catalog/`](repo-catalog/README.md) (repos not copied here, with what to fetch) and [`websites/`](websites/README.md).
5. Before copying anything into a project, check its licence in the item's folder and in [`SOURCES.md`](SOURCES.md).
6. Make original work. The brand DESIGN.md files are style references; never imitate a real brand's identity.

## Task router
| Task | Read / use first | Then |
|---|---|---|
| **Website / landing page** | `third-party/impeccable` + `third-party/taste-skill` (design rules) | fonts, `tailwindcss/theme.css` (colours + spacing), icons, `magicui` (patterns/effects), brand DESIGN.md for a style direction |
| **Video / animated infographic** | `rules/animation/` (margin-rules, motion-principles, gsap-notes, svg2-notes), then GSAP (`npm install gsap`) or `third-party/anime`, `chart.js` for charts | `third-party/lemo-opuscar-blueprint` (blueprint-drawing look), icons, `roughjs` for a hand-drawn look, fonts, colours; catalog: lemo-opuscar for 66 more video styles |
| **Product photo / ad image** | `rules/product-photo/topics/` (composition, colour, lighting, typography, prompt-craft, process), `anthropic-skills/canvas-design` (layout + fonts) | `theme-factory` (colour + font pairs), fonts, brand DESIGN.md for premium styles |
| **Infographic / poster (static)** | `canvas-design`, icons, `tailwindcss/theme.css` colours | `roughjs`, `chart.js` |
| **Pick a colour theme** | `theme-factory/themes/` (10 ready themes) · `tailwindcss/theme.css` | `awesome-design-md` brand palettes · catalog: daisyui |
| **Pick fonts** | `anthropic-skills/skills/canvas-design/canvas-fonts/` (29 families) | `theme-factory` font pairings |
| **Margins, spacing, layout** | `rules/animation/margin-rules.md` · `rules/animation/space-concepts-notes.md` · `tailwindcss/theme.css` spacing scale | `impeccable` layout reference · `rules/animation/m3-layout-notes.md` (breakpoints) · brand DESIGN.md spacing sections |
| **Rich / premium look, badges, glow** | `magicui` (shine border, border beam, neon card, sparkles) | `impeccable` → bolder / polish / delight |
| **Background pattern** | `magicui` (dot, grid, hexagon, striped, retro grid, noise, flickering grid) | catalog: flowbite gradients |

---

## What is inside `third-party/`
Each folder is a full, verified copy of the listed part, with its licence file.

### Design rules and skills (for AI agents)
| Folder | What it is | Use it for | Keywords | Licence |
|---|---|---|---|---|
| [`impeccable/skills/impeccable/`](third-party/impeccable/skills/impeccable/) | Design vocabulary skill: `SKILL.md` + 42 reference playbooks (adapt, animate, audit, bolder, clarify, colorize, critique, delight, distill, harden, layout, polish, quieter, typeset, visualize…) | Making UI look professional; critiquing and fixing AI-made pages; layout, typography, colour, motion decisions | design rules, anti-slop, polish, critique, audit, typography, colour, layout, spacing, hierarchy, motion, professional look | Apache-2.0 |
| [`taste-skill/skills/taste-skill/`](third-party/taste-skill/skills/taste-skill/) | "design-taste-frontend" skill: art direction distilled from 247 award-gallery sites; idea, composition, type, palette, photos, section blueprints | Websites that look art-directed, not generic | taste, art direction, composition, palette, typography, section blueprints, landing page, portfolio | MIT |
| [`anthropic-skills/skills/frontend-design/`](third-party/anthropic-skills/skills/frontend-design/) | Guidance for distinctive, intentional visual design | Choosing an aesthetic direction and typography for a UI | aesthetic direction, typography, distinctive UI, not templated | Apache-2.0 |
| [`anthropic-skills/skills/canvas-design/`](third-party/anthropic-skills/skills/canvas-design/) | Skill for posters, art and static designs as PNG/PDF, **plus 54 font files (29 families)** | Product ads, posters, infographics, thumbnails | poster, static design, PNG, PDF, composition, fonts, design philosophy | Apache-2.0 · fonts OFL |
| [`anthropic-skills/skills/theme-factory/`](third-party/anthropic-skills/skills/theme-factory/) | 10 ready themes with colours + fonts: arctic-frost, botanical-garden, desert-rose, forest-canopy, golden-hour, midnight-galaxy, modern-minimalist, ocean-depths, sunset-boulevard, tech-innovation | Instantly styling slides, docs, reports, landing pages | theme, colour palette, font pairing, preset, slides, report | Apache-2.0 |
| [`anthropic-skills/skills/algorithmic-art/`](third-party/anthropic-skills/skills/algorithmic-art/) | Generative art with p5.js: flow fields, particles, seeded randomness | Unique abstract backgrounds and visuals | generative art, p5.js, flow field, particles, abstract background | Apache-2.0 |
| [`awesome-design-md/design-md/`](third-party/awesome-design-md/design-md/) | 84 brand design systems as DESIGN.md (Apple, Stripe, Vercel, Linear, Notion, Airbnb, Nike, Tesla, Spotify, Ferrari, Starbucks, PlayStation…) | Choosing a style direction (colours, type, spacing, components) in plain text an AI can follow | brand style, design system, DESIGN.md, colour tokens, typography, spacing, premium, luxury, tech | MIT |

### Fonts
| Folder | What it is | Families |
|---|---|---|
| [`anthropic-skills/skills/canvas-design/canvas-fonts/`](third-party/anthropic-skills/skills/canvas-design/canvas-fonts/) | 54 font files, each family with its OFL licence (free for commercial use) | Arsenal SC, Big Shoulders, Boldonse, Bricolage Grotesque, Crimson Pro, DM Mono, Erica One, Geist Mono, Gloock, IBM Plex Mono, IBM Plex Serif, Instrument Sans, Instrument Serif, Italiana, JetBrains Mono, Jura, Libre Baskerville, Lora, National Park, Nothing You Could Do, Outfit, Pixelify Sans, Poiret One, Red Hat Mono, Silkscreen, Smooch Sans, Tektur, Work Sans, Young Serif |

Keywords: serif, sans-serif, mono, display, handwriting, luxury serif, tech mono, pixel, headline, body text.

### Icons
| Folder | What it is | Use it for | Keywords | Licence |
|---|---|---|---|---|
| [`tabler-icons/icons/`](third-party/tabler-icons/icons/) | 6,257 SVG icons: `outline/` (5,203) + `filled/` (1,054); 24 px grid, 2 px stroke | Infographics, websites, video scenes | icons, SVG, outline, filled, infographic, UI | MIT |
| [`lucide/icons/`](third-party/lucide/icons/) | 1,998 SVG icons, each with a `.json` file listing **tags and categories** (search these to find the right icon) | Same, in a slightly softer style | icons, SVG, tags, categories, charts, arrows | ISC |

### Colours, spacing, typography scale
| Folder | What it is | Keywords | Licence |
|---|---|---|---|
| [`tailwindcss/theme.css`](third-party/tailwindcss/theme.css) | Tailwind's full design scale as CSS variables: 26 colours × 11 shades (plus black and white), spacing, font stacks and weights, text sizes with line heights, shadows, radius, breakpoints, container widths | colour palette, shades, spacing scale, margins, font size, line height, shadow, radius, breakpoints | MIT |

### Patterns, effects, rich look
| Folder | What it is | Keywords | Licence |
|---|---|---|---|
| [`magicui/registry/magicui/`](third-party/magicui/registry/magicui/) | 79 React + Tailwind effect components. **Patterns:** dot, grid, animated grid, interactive grid, flickering grid, hexagon, striped, retro grid, noise texture, dotted map. **Rich look:** shine border, border beam, neon gradient card, magic card, sparkles text, aurora text, shimmer/rainbow buttons, light rays, meteors, particles. **Infographic motion:** number ticker, animated circular progress, animated beam, orbiting circles, globe, kinetic text, text reveal, typing animation | patterns, background, gradient, glow, shine, badge, premium, effects, number counter, progress ring, animated text | MIT |

### Animation and drawing libraries (ready built files)
| Folder | What it is | Keywords | Licence |
|---|---|---|---|
| [`anime/bundles/`](third-party/anime/bundles/) | Anime.js v4: ES module + UMD, normal + minified | animation, timeline, stagger, SVG morph, line drawing, seekable | MIT |
| [`roughjs/`](third-party/roughjs/) | Rough.js 4.6.6: hand-drawn, sketchy lines and shapes (canvas + SVG) | sketch, hand-drawn, whiteboard, infographic | MIT |
| [`chart.js/`](third-party/chart.js/) | Chart.js 4.6.1 UMD build (normal + minified) | charts, bar, line, pie, doughnut, radar, infographic, dashboard | MIT |
| [`animate-css/animate.min.css`](third-party/animate-css/animate.min.css) | Animate.css 4.1.1: 80+ ready CSS animations (fade, bounce, zoom, slide, flip) | CSS animation, entrance, exit, attention | Hippocratic 2.1 ⚠ (not open source: ethical-use conditions; read `LICENSE`) |

**GSAP** (main animation tool for videos) is not copied: its licence is GSAP's own. Install it with `npm install gsap`.

### Video style engine
| Folder | What it is | Keywords | Licence |
|---|---|---|---|
| [`lemo-opuscar-blueprint/`](third-party/lemo-opuscar-blueprint/) | The "Blueprint" video style from lemo-opuscar: drawing engine (`engine/draw.js`: projection, lines that draw themselves by length), WebGL cyanotype paper (`engine/paper.js`: stains, shadows, stamp), sheet furniture (`engine/sheet.js`: border, title block, parts list, notes, rain, hand shadow), its 5 fonts with OFL licences, and `STYLE.md` (the full style rules) | blueprint, technical drawing, patent drawing, line drawing animation, cyanotype, engineering, explainer video | MIT (code) · OFL (fonts) |

Note: `sheet.js` still contains the original demo's text ("The Cloud Catcher", "C. Wrenfield", "LemoLab × Claude Opus 5.5"). Replace it with your own title-block text before using it in a video.

---

## Other folders
- [`rules/`](rules/README.md): our own rules: video margins, motion, GSAP/SVG notes, and the product-photo topics (composition, colour, lighting, typography, prompts, QC).
- [`repo-catalog/`](repo-catalog/README.md): 20 more repos (lemo-opuscar video styles, three.js, zdog, pixijs, konva, daisyUI, shadcn/ui, preline, hyperui…) with use cases, keywords, useful paths and how to fetch only that part.
- [`websites/`](websites/README.md): 11 reference websites (Refero Styles, ThreeUI, GSAP docs, motion rules, SVG spec…).
- [`SOURCES.md`](SOURCES.md): where every copied file came from (repo, commit or version, path, licence).
