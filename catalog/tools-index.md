> **Updates 2026-10-30** — added when this file moved into this repo. Everything below the line is the original text, unchanged.
> - The **Folder map** below describes the old local `added/` folder; those files are not in this repo. Use [`../README.md`](../README.md) and [`../INDEX.md`](../INDEX.md) here instead.
> - **Copied into this repo:** impeccable, taste-skill, Anthropic skills, awesome-design-md, Tabler + Lucide icons, Tailwind theme, Magic UI, Anime.js, Rough.js, Chart.js, Animate.css — see [`../SOURCES.md`](../SOURCES.md). 20 more repos with fetch paths: [`repos.md`](repos.md).
> - **cosscom/coss** (listed under Origin UI) is now an email API, not a UI kit.
> - **PrimeNG, PrimeReact, PrimeVue** now get security fixes only (they moved to PrimeUI).
> - **Gitleaks** is feature-complete; its author moved to "Betterleaks".
> - **taste-skill** now ships one skill (`design-taste-frontend`), copied in [`../skills/taste-skill/`](../skills/taste-skill/).
> - **Bootstrap**'s main branch is Bootstrap 6 alpha; **ZAP** is now "ZAP by Checkmarx".

---

# AI RESOURCE INDEX — UI · Graphics · Design · Security · AI-skills
Verified online: 2026-10-05 · ~90 resources · Score = Overall /10 (≥8 use · 6–7 ok · ≤5 avoid)

## 📁 FOLDER MAP (`added/`)
| Path | Contains |
|---|---|
| `AI-RESOURCE-INDEX.md` | This file — read first |
| `1-websites/websites.txt` | Website bookmarks (ThreeUI, Refero) |
| `2-github-repos/ai-design-skill-repos.txt` | AI design skill repos (impeccable, taste-skill, awesome-design-md) |
| `2-github-repos/UI-Kits-Master-Collection.md` | Full UI kit list with notes |
| `2-github-repos/graphics-repos-list.md` | Full graphics library list with notes |
| `3-security/vulnerability_review_repos.md` | Full security tool list with notes |
| `4-cloned-repos/README.md` | Commands to use or re-clone shadcn/ui, create-t3-app, anthropic-skills |
| `tools/` | headroom-ai npm package + Claude Code proxy settings |

## 🌐 OPEN & LOOK (websites — for the human)
| Site | What you see | Cost |
|---|---|---|
| https://threeui.com/browse?sort=recent | Three.js 3D heroes, shaders, animated backgrounds, landing templates | Free tier (MIT) · Pro $199/yr |
| https://styles.refero.design/ | 2,000+ real-site design systems (colors, type, spacing tokens, DESIGN.md) | Free browse · MCP paid |
| https://github.com/pbakaus/impeccable | AI design-quality skill (audit/polish/critique, anti-slop rules) | Free |
| https://github.com/leonxlnx/taste-skill | AI skill against generic UI (variance/motion/density dials) | Free |
| https://github.com/voltagent/awesome-design-md | Brand DESIGN.md index (Stripe, Vercel, Nike…) → links to getdesign.md | Free |
| https://ui.shadcn.com | shadcn/ui component gallery | Free |

---

## 🤖 HOW AI MUST USE THIS FILE
1. Read only this file — do not fetch every link. Match the user's task to **ROUTER** keywords below, then read only the matching section.
2. Prefer Score ≥8. Never recommend anything in **⛔ AVOID**.
3. Respect the project's existing stack (React/Vue/Svelte/Angular/plain HTML). Don't add a second UI kit if one exists.
4. Check **Lic** before commercial use. Mind **Weight** for performance-sensitive (mobile/e-commerce) sites.
5. Security scanners that attack live sites: only on sites the user owns/is authorised to test.
6. Data may age — if a decision depends on version/license, re-verify that one link.

---

## 🧭 ROUTER (keyword → pick)
| Task keywords | Pick (score) | Alt |
|---|---|---|
| react, nextjs, components, modern ui | shadcn/ui 10 + Tailwind 10 | Mantine 9, HeroUI 8 |
| plain html, css only, no build, beginner | Bootstrap 9 | daisyUI 9, HyperUI 8, Bulma 7 |
| tailwind, utility css, fast prototype | Tailwind 10 + daisyUI 9 | Flowbite 8, HyperUI 8, Preline 7 |
| dashboard, admin, crud, enterprise | MUI 9 / Ant Design 9 | Refine 7, Mantine 9 |
| data grid, table, charts in react | MUI X 8 | Tremor 6 |
| charts, graphs, stats (any framework) | Chart.js 9 | ApexCharts 7 (license!) |
| landing page, animated, hero, wow | Magic UI 8 + Motion 8 | ThreeUI 7, GSAP 8 |
| 3d, webgl, product viewer, shader | three.js 9 | ThreeUI 7 (heavy), Pixi.js 8 (2D) |
| animation, motion, transitions | anime.js 9 / Motion 8 (React) | GSAP 8, Animate.css 6 |
| icons | Lucide 9 | Tabler Icons 8 |
| accessible, headless, design system | Radix 8 / Base UI 8 / React Aria 8 | Ark UI 7, Ariakit 7, Headless UI 7 |
| vue, nuxt | Nuxt UI 8 / Element Plus 8 / shadcn-vue 8 | Vuetify 8, PrimeVue 8, Quasar 8, Vant 7 (mobile) |
| svelte, sveltekit | shadcn-svelte 8 | Skeleton 7, Bits UI 7 |
| angular | PrimeNG 8 | ng-zorro-antd 7 |
| mobile hybrid, ios android pwa | Ionic 8 | Quasar 8 |
| framework-agnostic, web components | Web Awesome (Shoelace successor) | Material Web 6 |
| canvas, drag, editor, whiteboard | Konva.js 8 | Pixi.js 8 |
| hand-drawn, sketch, wireframe look | Rough.js 8 | — |
| retro, pixel, 8-bit, game ui | NES.css 7 | Pxlkit 6, pixel-retroui 6, RPGUI 5 |
| isometric, pseudo-3d, tiny 3d | Zdog 6 | obelisk.js 5 |
| design taste, better ai ui, design audit | impeccable 8 | taste-skill 7 |
| design inspiration, tokens, brand style | Refero Styles 7 | awesome-design-md 6 |
| new fullstack app, typesafe, trpc, prisma | create-t3-app 7 | — |
| leaked keys, secrets, api key in git | Gitleaks 9 | TruffleHog 8 |
| code security scan, sast | Semgrep 8 | Bandit 7 (py), Gosec 7 (go), Brakeman 6 (rails) |
| dependency vulnerabilities, cve, sca | OSV-Scanner 8 | Trivy 8 (pin version!) |
| website scan, dast, pentest | ZAP 8 (baseline in CI) | Nuclei 8 |
| wordpress security | WPScan 6 | — |
| docx, pdf, pptx, xlsx, claude skills | anthropic-skills | — |
| reduce llm tokens, context compression | headroom-ai 5 | — |

---

## 🎨 UI KITS
Cols: Name · Framework · Score · Use for · Weight · Lic · Link
| Name | Fw | S | Use for | Weight | Lic | Link |
|---|---|---|---|---|---|---|
| shadcn/ui | React | 10 | Own-able copy-paste components (`npx shadcn@latest add`) | none (copied code) | MIT | github.com/shadcn-ui/ui |
| Tailwind CSS | Any | 10 | Utility CSS base | small purged CSS | MIT (Plus paid) | github.com/tailwindlabs/tailwindcss |
| Bootstrap | Any | 9 | Classic grid+components, easiest | ~40KB gz | MIT | github.com/twbs/bootstrap |
| MUI | React | 9 | Material, dashboards | heavy, Emotion | MIT (X Pro paid) | github.com/mui/material-ui |
| Ant Design | React | 9 | Enterprise tables/forms | heavy | MIT | github.com/ant-design/ant-design |
| daisyUI | Tailwind | 9 | Semantic Tailwind classes, zero JS | tiny | MIT | github.com/saadeghi/daisyui |
| Mantine | React | 9 | 100+ comps + hooks, polished | moderate | MIT | github.com/mantinedev/mantine |
| Lucide | Any | 9 | Default icons | <1KB/icon | ISC | github.com/lucide-icons/lucide |
| HeroUI | React | 8 | Pretty defaults (ex-NextUI) | Tailwind+framer | Apache-2.0 | github.com/heroui-inc/heroui |
| Chakra UI | React | 8 | Themeable composable | Emotion | MIT | github.com/chakra-ui/chakra-ui |
| Magic UI | React | 8 | Animated landing sections | needs motion | MIT (Pro paid) | github.com/magicuidesign/magicui |
| Base UI | React | 8 | Headless primitives (MUI) | small | MIT | github.com/mui/base-ui |
| Radix Primitives | React | 8 | Headless a11y (shadcn core) | small | MIT | github.com/radix-ui/primitives |
| React Aria | React | 8 | Best accessibility, hard | moderate | Apache-2.0 | github.com/adobe/react-spectrum |
| MUI X | React | 8 | Data grid, charts, pickers | heavy | MIT core, Pro paid | github.com/mui/mui-x |
| Motion | React/JS | 8 | Animations (ex-Framer Motion) | ~30KB | MIT | github.com/motiondivision/motion |
| GSAP | Any | 8 | Pro timeline animation | ~25KB | free, NOT OSI | github.com/greensock/GSAP |
| Tabler Icons | Any | 8 | 5k+ icons | tree-shaken | MIT | github.com/tabler/tabler-icons |
| Flowbite | Tailwind | 8 | Tailwind comps + small JS | small | MIT (Pro paid) | github.com/themesberg/flowbite |
| HyperUI | HTML/Tailwind | 8 | Free copy-paste sections | none | MIT | github.com/markmead/hyperui |
| Ionic | Ang/React/Vue | 8 | Hybrid mobile apps | heavy | MIT | github.com/ionic-team/ionic-framework |
| Element Plus | Vue 3 | 8 | Vue admin | moderate | MIT | github.com/element-plus/element-plus |
| Vuetify | Vue | 8 | Material for Vue | heavy-ish | MIT | github.com/vuetifyjs/vuetify |
| Nuxt UI | Nuxt | 8 | Official Nuxt kit | Tailwind | MIT | github.com/nuxt/ui |
| shadcn-vue | Vue | 8 | shadcn for Vue | copied | MIT | github.com/unovue/shadcn-vue |
| PrimeVue | Vue | 8 | 90+ comps | moderate | MIT | github.com/primefaces/primevue |
| Quasar | Vue | 8 | SPA/PWA/mobile/desktop | framework | MIT | github.com/quasarframework/quasar |
| shadcn-svelte | Svelte | 8 | shadcn for Svelte | copied | MIT | github.com/huntabyte/shadcn-svelte |
| PrimeNG | Angular | 8 | 90+ Angular comps | moderate | MIT (LTS paid) | github.com/primefaces/primeng |
| Headless UI | React/Vue | 7 | Tailwind-team headless | small | MIT | github.com/tailwindlabs/headlessui |
| Bulma | Any | 7 | CSS-only flexbox | ~25KB | MIT | github.com/jgthms/bulma |
| Refine | React | 7 | CRUD/admin meta-framework | heavy | MIT | github.com/refinedev/refine |
| ng-zorro-antd | Angular | 7 | Ant Design for Angular | mod-heavy | MIT | github.com/NG-ZORRO/ng-zorro-antd |
| Vant | Vue | 7 | Mobile-web Vue | light | MIT | github.com/youzan/vant |
| PrimeReact | React | 7 | 90+ comps incl. editors | moderate | MIT | github.com/primefaces/primereact |
| Skeleton | Svelte | 7 | Svelte design system | Tailwind | MIT | github.com/skeletonlabs/skeleton |
| Bits UI | Svelte | 7 | Headless Svelte | small | MIT | github.com/huntabyte/bits-ui |
| Ark UI | Multi | 7 | Headless, cross-framework | small | MIT | github.com/chakra-ui/ark |
| Ariakit | React | 7 | Light headless | small | MIT | github.com/ariakit/ariakit |
| Fluent UI | React | 7 | Microsoft/Office style | heavy | MIT | github.com/microsoft/fluentui |
| Blueprint | React | 7 | Dense desktop data tools | heavy | Apache-2.0 | github.com/palantir/blueprint |
| React-Bootstrap | React | 7 | Bootstrap in React (slowing) | + Bootstrap CSS | MIT | github.com/react-bootstrap/react-bootstrap |
| Preline UI | Tailwind | 7 | Tailwind comps + JS | small | dual MIT/Fair-Use ⚠ | github.com/htmlstreamofficial/preline |
| Animate.css | Any | 6 | CSS class animations (2020) | small | Hippocratic ⚠ | github.com/animate-css/animate.css |
| Tremor | React | 6 | Copy-paste dashboard charts | needs Recharts | Apache-2.0 | github.com/tremorlabs/tremor |
| Material Web | Web comp | 6 | Google Material WC (maintenance) | moderate | Apache-2.0 | github.com/material-components/material-web |
| React Suite | React | 6 | Enterprise suite | moderate | MIT | github.com/rsuite/rsuite |
| Neobrutalism | React | 6 | Neobrutalist style | copied | MIT | github.com/ekmas/neobrutalism-components |
| Syntax UI | React | 5 | Animated snippets, small | motion | MIT | github.com/SyntaxUI/syntaxui |
| 98.css | Any | 5 | Windows-98 novelty | tiny | MIT | github.com/jdan/98.css |
| Foundation→Yeti | Any | 5 | Renamed; v7 source-available | single CSS | FSL ⚠ (v6 MIT) | github.com/foundation/yeti |
| Origin UI→coss | React | 5 | Real repo is coss (AGPL ⚠) | copied | AGPL-3.0 | github.com/cosscom/coss |
| Semantic UI React | React | 4 | Stale since 2023 | + Semantic CSS | MIT | github.com/Semantic-Org/Semantic-UI-React |

---

## 🖌️ GRAPHICS / ANIMATION / 3D
| Name | Style | S | Use for | Weight (gz) | Lic | Link |
|---|---|---|---|---|---|---|
| three.js | 3D | 9 | Real 3D, product viewers, WebGL | ~185KB heavy | MIT | github.com/mrdoob/three.js |
| Chart.js | Charts | 9 | Free default charts | ~68KB, tree-shake | MIT | github.com/chartjs/Chart.js |
| anime.js | Motion | 9 | General JS/CSS/SVG animation | ~40KB, modular | MIT | github.com/juliangarnier/anime |
| Konva.js | 2D canvas | 8 | Interactive canvas, drag, editors | ~55KB | MIT | github.com/konvajs/konva |
| Rough.js | Sketch | 8 | Hand-drawn look | ~9KB | MIT | github.com/rough-stuff/rough |
| Pixi.js | 2D WebGL | 8 | Sprite-heavy fast 2D | ~265KB heavy | MIT | github.com/pixijs/pixijs |
| ApexCharts | Charts | 7 | Rich interactive charts | ~270KB heavy | ⚠ v5 free <$2M rev only | github.com/apexcharts/apexcharts.js |
| NES.css | Retro | 7 | 8-bit look, instant | ~31KB | MIT | github.com/nostalgic-css/NES.css |
| Zdog | Pseudo-3D | 6 | Tiny flat 3D (unmaintained) | ~7KB | MIT | github.com/metafizzy/zdog |
| pixel-retroui | Retro | 6 | Pixel React/Tailwind kit | ~4KB | BSD-3 | github.com/Dksie09/RetroUI |
| Pixelact UI | Retro | 6 | Pixel shadcn registry | per comp | MIT | github.com/pixelact-ui/pixelact-ui |
| Pxlkit | Retro | 6 | Pixel icons + retro React + voxel | ~8KB core | MIT code, icons need attribution ⚠ | github.com/Joangeldelarosa/pxlkit |
| RPGUI | Retro | 5 | RPG game UI (inactive) | ~25KB + images | Zlib | github.com/RonenNess/RPGUI |
| obelisk.js | Isometric | 5 | Pixel isometric (no commits since 2019) | ~5KB | MIT | github.com/nosir/obelisk.js |
| Metro UI | Metro | 5 | Bootstrap-like framework now | ~440KB heavy | MIT | github.com/olton/metroui |
| snes.css | Retro | 4 | 16-bit hobby look | ~9KB | MIT | github.com/devMiguelCarrero/snes.css |
| GraphicsJS | SVG draw | 4 | Legacy SVG/VML engine | ~66KB | BSD-3 | github.com/anychart/graphicsjs |

---

## 🧠 AI DESIGN SKILLS & INSPIRATION (no runtime code; need an AI agent)
| Name | S | Keywords | Use for | Lic |
|---|---|---|---|---|
| impeccable | 8 | design audit, polish, critique, anti-slop | Make AI-built UI look professional; 24 commands | Apache-2.0 |
| taste-skill | 7 | taste, layout, typography, motion dials | Steer AI away from generic UI (v2 experimental) | MIT |
| ThreeUI | 7 | 3d hero, shader background, landing template | Copy one 3D section; adds 100–200KB JS each | MIT free / Pro paid |
| Refero Styles | 7 | design tokens, color palette, typography, inspiration | Pick a real design system as reference | free browse |
| awesome-design-md | 6 | brand style, DESIGN.md | Quick brand-like starting style; don't clone a brand | MIT index |

---

## 🛠️ STARTERS, CLAUDE SKILLS, TOOLS (local clones deleted — use online; see `4-cloned-repos/README.md`)
| Name | S | How to use | Notes |
|---|---|---|---|
| shadcn/ui CLI | 9 | `npx shadcn@latest init` / `add <comp>` | MIT |
| anthropic-skills | 8 | `/plugin marketplace add anthropics/skills` (Claude Code) | Skills: algorithmic-art, brand-guidelines, canvas-design, claude-api, doc-coauthoring, docx, frontend-design, internal-comms, mcp-builder, pdf, pptx, skill-creator, slack-gif-creator, theme-factory, web-artifacts-builder, webapp-testing, xlsx. docx/pdf/pptx/xlsx are source-available, not open source |
| create-t3-app | 7 | `npm create t3-app@latest` | New Next.js+tRPC+Tailwind+Prisma/Drizzle+auth app only; upstream quiet since Dec 2025 |
| headroom-ai | 5 | `added/tools` (npm 0.37.0; latest 0.39.1) | LLM context compression; needs the `headroom proxy` running. `added/tools/.claude/settings.local.json` routes Claude via 127.0.0.1:8787 |

---

## 🔒 SECURITY TOOLS
Recommended small-team stack: **Gitleaks (pre-commit) + Semgrep + OSV-Scanner in CI + ZAP baseline on staging.**
| Name | Type | S | Use for | Lic |
|---|---|---|---|---|
| Gitleaks | secrets | 9 | Block leaked keys (pre-commit/CI) | MIT · github.com/gitleaks/gitleaks |
| Semgrep | SAST | 8 | Insecure code patterns, many langs | LGPL engine; rules restricted ⚠ · github.com/semgrep/semgrep |
| OSV-Scanner | SCA | 8 | Vulnerable dependencies, low noise | Apache-2.0 · github.com/google/osv-scanner |
| Trivy | SCA/IaC/containers | 8 | All-in-one; ⚠ 2026 supply-chain hack (CVE-2026-33634) — pin safe version/SHA | Apache-2.0 · github.com/aquasecurity/trivy |
| ZAP | DAST | 8 | Website scan; baseline in CI | Apache-2.0 · github.com/zaproxy/zaproxy |
| TruffleHog | secrets | 8 | Full git history; verifies live keys | AGPL-3.0 · github.com/trufflesecurity/trufflehog |
| Nuclei | DAST | 8 | Template vuln scan (~13.5k templates) | MIT · github.com/projectdiscovery/nuclei |
| Bandit | SAST | 7 | Python only | Apache-2.0 · github.com/PyCQA/bandit |
| Gosec | SAST | 7 | Go only | Apache-2.0 · github.com/securego/gosec |
| SonarQube | SAST+quality | 7 | Quality gates; heavy server (Cloud easier) | LGPL-3.0 · github.com/SonarSource/sonarqube |
| Brakeman | SAST | 6 | Rails only | non-OSI ⚠ · github.com/presidentbeef/brakeman |
| Dependency-Check | SCA | 6 | Older; prefer OSV/Trivy | Apache-2.0 · github.com/dependency-check/DependencyCheck |
| WPScan | DAST | 6 | WordPress only | commercial use paid ⚠ · github.com/wpscanteam/wpscan |
| Nikto | DAST | 6 | Web-server misconfig, noisy | GPL-3.0 · github.com/sullo/nikto |
| SQLMap | DAST | 6 | SQL injection — intrusive, staging only | GPL-2.0 · github.com/sqlmapproject/sqlmap |
| Wapiti | DAST | 5 | Black-box fuzzer | GPL-2.0 · github.com/wapiti-scanner/wapiti |
| NodeJsScan | SAST | 5 | Node.js; Semgrep better | GPL-3.0 · github.com/ajinabraham/NodeJsScan |
| Amass | recon | 4 | Subdomain mapping, not vuln scan | Apache-2.0 · github.com/owasp-amass/amass |
⚠ Active scanners (ZAP active, Nuclei, Nikto, Wapiti, SQLMap, WPScan, Amass): only on owned/authorised targets.

---

## ⛔ AVOID (dead / archived / replaced)
| Name | Why | Use instead |
|---|---|---|
| voxel-engine | Dead since 2017 | three.js |
| Geist UI | Archived | shadcn/ui |
| Shoelace | Archived/sunset | Web Awesome (github.com/shoelace-style/webawesome) |
| Pico CSS | Archived | Bootstrap / daisyUI |
| GraphicsJS as "#1" | Legacy IE/VML focus | Konva / Rough.js |
| Unpinned Trivy action/binary | 2026 compromise | Pin by commit SHA |
