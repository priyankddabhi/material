# Web Graphics Repos — Style Cheat Sheet

Low-weight, good-looking graphics libraries for websites. Grouped by style, with a short "what's inside + where to use it" note for each.

---

## ⭐ MAIN / GENERAL (core graphics + one-liners)

**1. GraphicsJS** — `github.com/anychart/graphicsjs`
- What's inside: Lightweight SVG-based drawing engine, animations, text measurement/wrapping, layers, transforms. Powers AnyChart charts.
- Use for: Drawing shapes, logos, animated scenes, mini games, diagrams — ~small bundle, no WebGL needed.

**2. Konva.js** — `github.com/konvajs/konva`
- What's inside: 2D canvas framework — shapes, text, images, layers, dragging, hit-detection, events.
- Use for: Interactive canvas apps, whiteboards, editors, layered graphics, animations.

**3. Zdog** — `github.com/metafizzy/zdog`
- What's inside: Tiny pseudo-3D engine (flat, rounded, "designer-friendly") that renders to canvas & SVG.
- Use for: Simple 3D-looking logos, icons, playful 3D graphics without WebGL complexity.

**4. Rough.js** — `github.com/rough-stuff/rough`
- What's inside: Draws in a sketchy, hand-drawn style on canvas or SVG.
- Use for: Sketch/whiteboard/wireframe aesthetics, playful illustrations, mockups.

**5. Chart.js / ApexCharts** — `github.com/chartjs/Chart.js`, `github.com/apexcharts/apexcharts.js`
- What's inside: Lightweight chart libraries (canvas / SVG), many chart types, animations, responsive.
- Use for: Dashboards, stats, data-reports, graphs on any website.

---

## 🕹️ RETRO GAME / PIXEL ART (CSS frameworks)

**6. NES.css** — `github.com/nostalgic-css/NES.css`
- What's inside: Retro 8-bit NES-style CSS components (buttons, badges, balloons, progress bars).
- Use for: Old-school NES look for landing pages, portfolios, retro sites, game UIs.

**7. snes.css** — `github.com/devMiguelCarrero/snes.css`
- What's inside: 16-bit SNES-inspired CSS framework with pixel UI components + retro palettes.
- Use for: 16-bit/super-nintendo look, retro fan sites, nostalgic dashboards.

**8. RPGUI** — `github.com/RonenNess/RPGUI`
- What's inside: Old-school RPG GUI in pure CSS/JS (~25kb) — frames, sliders, progress bars, 8-bit cursors, icons, draggable boxes.
- Use for: Role-playing game menus, fantasy/quest UIs, game-style interfaces.

**9. pixel-retroui** — `github.com/Dksie09/RetroUI`
- What's inside: Pixelated, retro-gaming React/Next.js UI components (buttons, cards, popups, progress bars), Tailwind-compatible.
- Use for: React apps that want a polished retro/Minecraft-ish UI.

**10. Pixelact UI** — `github.com/pixelact-ui/pixelact-ui`
- What's inside: Pixel-art components built on shadcn/ui — install individual components, Tailwind-based, fully customizable.
- Use for: Retro styling layered on a modern shadcn/React project.

**11. Pxlkit** — `github.com/Joangeldelarosa/pxlkit`
- What's inside: 226+ pixel-art SVG icons (7 themed packs), 111 retro React components, animated/3D-parallax icon player, plus a 3D voxel toolkit.
- Use for: Ready-made pixel icons + retro UI in one, and voxel/3D-pixel scenes.

---

## 🧊 3D PIXEL / VOXEL / ISOMETRIC

**12. obelisk.js** — `github.com/nosir/obelisk.js`
- What's inside: Builds pixel **isometric** 3D objects (brick, cube, pyramid, slope) on canvas, strictly pixel-level for crisp 1:2 lines.
- Use for: Isometric game maps, isometric buildings, retro 3D-looking scenes. (Great for "3D pixel / isometric" look.)

**14. three.js** — `github.com/mrdoob/three.js`
- What's inside: The full WebGL 3D library (scenes, cameras, meshes, materials, lighting).
- Use for: Any real 3D — product viewers, immersive backgrounds, 3D-pixel scenes using voxel data.

---

## 🏙️ METRO / FLUENT (flat, tile, Windows 8-style)

**15. Metro-UI-CSS** — `github.com/olton/Metro-UI-CSS`
- What's inside: Windows Metro/Fluent-style frontend framework — tiles, grid, 300+ icons, components, live tile animations.
- Use for: Flat "metro" dashboards, Windows-8-style tiles, clean corporate/app UIs.

---

## 🎴 ANIME / MANGA / TOKYO *bonus ideas*
(No full framework is a "one-click," but these get you there fast:)
- **Anime.js** (`github.com/juliangarnier/anime`) — super-light animation engine for that snappy, expressive motion.
- **Canvas + image sprites** (from anime/manga assets) — combine with **Pixi.js** (`github.com/pixijs/pixijs`) for the anime/manga sprite look.
- For a "Tokyo/neon cyberpunk" vibe: **Metro + neon CSS gradients + pixel fonts** (e.g. `Press Start 2P`) via **Google Fonts**.

---

## Quick pick guide
| You want... | Grab this |
|---|---|
| Retro 8-bit / NES site | NES.css |
| 16-bit / SNES | snes.css |
| RPG / fantasy game UI | RPGUI |
| Pixel icons + retro React kit | Pxlkit / pixel-retroui |
| Isometric 3D pixel art | obelisk.js |
| Any 3D | three.js |
| Windows/Metro tiles | Metro-UI-CSS |
| Charts/dashboards | Chart.js / ApexCharts |
| Hand-drawn / sketchy | Rough.js |
| General lightweight drawing | GraphicsJS / Konva / Zdog |
