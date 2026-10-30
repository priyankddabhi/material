# material — design library for AI agents

One place an AI agent reads before making a **website**, a **video / animated infographic**, or a **product photo / ad**.
Our own rules come first; then free, licence-checked fonts, icons, colours, patterns, design skills and animation libraries.

**AI agents: read [`AGENTS.md`](AGENTS.md) first, then use the router below. To find anything by keyword, open [`INDEX.md`](INDEX.md).**

## Structure
```
material/
├─ AGENTS.md        how an AI agent should use this repo (rules, order, licences)
├─ INDEX.md         keyword → exact path finder
├─ SOURCES.md       where every copied file came from + its licence
├─ guides/          ★ OUR RULES — read first, they win over everything else
│  ├─ boss-mode.md     how the AI should work (owner mindset, reuse first, verify)
│  ├─ layout/          margins, spacing, whitespace, breakpoints
│  ├─ animation/       motion rules, code recipes, GSAP/SVG notes, reel lessons
│  └─ product-photo/   composition, colour, lighting, type, prompts, QC, reel lessons
├─ skills/          AI design skills (instructions an agent follows)
│  ├─ impeccable/      design vocabulary: polish, critique, layout, typeset, colorize…
│  ├─ taste-skill/     art direction for websites
│  ├─ anthropic/       frontend-design · canvas-design (+29 fonts) · theme-factory (10 themes) · algorithmic-art
│  └─ brand-styles/    84 brand design systems (DESIGN.md)
├─ assets/          ready files to use directly
│  ├─ fonts/           signpost to all 33 font families
│  ├─ icons/           tabler (6,257) · lucide (1,998)
│  └─ colors/          tailwind colour, spacing, type and shadow scale
├─ libraries/       code to load or import
│  ├─ anime/  animate-css/  chartjs/  roughjs/
│  ├─ magicui/         79 effects: patterns, glow, shine, number ticker, text effects
│  └─ blueprint-engine/  blueprint-drawing video style + its fonts
└─ catalog/         links only: our scored tools index (~90 tools), 20 more repos, 11 websites
```

## Task router
| Task | 1. Our rules | 2. Skill | 3. Assets / libraries |
|---|---|---|---|
| **Website / landing page** | [`guides/layout/`](guides/layout/) | [`skills/impeccable`](skills/impeccable/) + [`skills/taste-skill`](skills/taste-skill/) · style direction from [`skills/brand-styles`](skills/brand-styles/) | [`assets/fonts`](assets/fonts/README.md), [`assets/colors`](assets/colors/tailwind/theme.css), [`assets/icons`](assets/icons/), [`libraries/magicui`](libraries/magicui/) |
| **Video / animated infographic** | [`guides/animation/`](guides/animation/README.md) (start with `motion-recipes.md`) + [`guides/layout/margin-rules.md`](guides/layout/margin-rules.md) | — | GSAP (`npm install gsap`) or [`libraries/anime`](libraries/anime/), [`libraries/chartjs`](libraries/chartjs/), [`libraries/blueprint-engine`](libraries/blueprint-engine/), icons, fonts · more styles: [`catalog/repos.md`](catalog/repos.md) → lemo-opuscar |
| **Product photo / ad image** | [`guides/product-photo/`](guides/product-photo/README.md) | [`skills/anthropic/canvas-design`](skills/anthropic/canvas-design/) | fonts, [`theme-factory`](skills/anthropic/theme-factory/) palettes, brand styles |
| **Static infographic / poster** | [`guides/layout/`](guides/layout/) | [`skills/anthropic/canvas-design`](skills/anthropic/canvas-design/) | icons, colours, [`libraries/roughjs`](libraries/roughjs/), [`libraries/chartjs`](libraries/chartjs/) |
| **Pick colours / a theme** | [`guides/product-photo/topics/colour.md`](guides/product-photo/topics/colour.md) | [`skills/anthropic/theme-factory`](skills/anthropic/theme-factory/) (10 themes) | [`assets/colors/tailwind/theme.css`](assets/colors/tailwind/theme.css) · brand palettes in [`skills/brand-styles`](skills/brand-styles/) |
| **Pick fonts** | [`guides/product-photo/topics/typography.md`](guides/product-photo/topics/typography.md) | `theme-factory` font pairs | [`assets/fonts/`](assets/fonts/README.md) (33 families) |
| **Margins, spacing, layout** | [`guides/layout/`](guides/layout/) (margin-rules, space-concepts, m3-layout) | `impeccable` → layout | spacing scale in [`theme.css`](assets/colors/tailwind/theme.css) |
| **Pick a tool / library (UI kit, charts, 3D, security)** | [`guides/boss-mode.md`](guides/boss-mode.md) (reuse before build) | — | [`catalog/tools-index.md`](catalog/tools-index.md) (scored /10, avoid list) |
| **Premium look, glow, badges, patterns** | [`guides/animation/reels/`](guides/animation/reels/README.md) (why reels feel premium) | `impeccable` → bolder / polish / delight | [`libraries/magicui`](libraries/magicui/) |

If nothing here fits, use [`catalog/`](catalog/README.md). Every folder has a README with details and keywords.
