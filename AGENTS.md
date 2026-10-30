# Instructions for AI agents

You are using **material**, a design library for making websites, videos / animated infographics, and product photos / ads.

## How to work with this repo
1. **Find the task** in the router in [`README.md`](README.md), or search [`INDEX.md`](INDEX.md) by keyword (font, glow, progress ring, margin, palette…).
2. **Read our rules first** in [`guides/`](guides/README.md). They come from real projects. When a skill or library says something different, **our rules win**.
3. **Then use a skill** from [`skills/`](skills/README.md) for taste and quality checks, and **assets / libraries** from [`assets/`](assets/README.md) and [`libraries/`](libraries/README.md) for the actual files.
4. **Open only what the task needs.** Do not load whole folders of icons or fonts; pick files by name (Lucide icons have a `.json` file with search tags next to each `.svg`).
5. **Nothing fits?** Check [`catalog/repos.md`](catalog/repos.md) and fetch only the folder it names, or [`catalog/websites.md`](catalog/websites.md).

## Quality loop (always)
- Make it → render it → **look at the real output** (frames, screenshots, phone size) → fix → repeat. Never call a result good from code alone.
- One focal point, one accent colour, generous whitespace, hierarchy by size and weight.
- Videos: something moves every 0.5–1 s; a new element every 1–3 s; never a still scene.

## Licences
- Every third-party folder keeps its licence file; [`SOURCES.md`](SOURCES.md) lists origin and licence for each.
- Keep the licence file when copying anything out of this repo.
- `libraries/animate-css` uses the Hippocratic License (ethical-use conditions, not standard open source).
- GSAP is **not** included; install it with `npm install gsap`.
- `skills/brand-styles/` describe real brands: use them as style direction, never to imitate a brand's identity.
- `catalog/` repos are not copied; check each repo's licence before fetching. Never copy files from `origin-space/ui-experiments` (no redistribution allowed).

## Do not
- Do not invent files or paths; if a path in a note does not exist (old notes mention `~/workspace/...`), ignore it.
- Do not change files under `skills/`, `assets/` or `libraries/` in place; they are verified copies of their source. Copy them into your project instead.
