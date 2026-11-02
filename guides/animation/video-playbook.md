# Video playbook: prompt rules, camera, round type, sound effects

How we make a code-rendered explainer reel (HTML + SVG + GSAP → frames → MP4), with the best rules from 4 video-prompt sites (read 2026-11-02) and what we learned building the "pi never ends" reel (61 s, 9:16, voice + SFX).
Layout rules still win: [`../layout/margin-rules.md`](../layout/margin-rules.md). Code basics: [`gsap-notes.md`](gsap-notes.md), [`motion-recipes.md`](motion-recipes.md).

## 1. Workflow (in this order)
1. **Facts first.** Every number on screen needs a source you opened today. Never let the AI invent stats, names or quotes ("without it the model happily adds fake numbers"). Put the source in a small line on the end card.
2. **Script before code.** One sentence = one beat = one idea + one visual metaphor. Fixing a scene list is cheaper than fixing a render.
3. **Voice before animation.** Make the voice, measure each word's start time, write one `schedule.json`. The page and the mixer both read it, so picture and sound cannot drift.
4. **Storyboard with times.** For each shot: start and end, what must be readable, how it exits. Hold the final card 0.8–3 s.
5. **Every frame is a pure function of time.** One paused timeline + `seek(t)`. No CSS transitions, no timers, no state carried between frames. Seeded random only.
6. **Contact sheet before the full render.** Shoot 20–30 frames (every beat), tile them, look for clipped text, overlaps, empty frames, things too small on a phone.
7. **Render with a virtual clock** (advance exactly 1/fps per frame). Several browser pages in parallel cut render time (4 pages ≈ 3× faster).
8. **Mux audio with ffmpeg, never record from the browser.**

## 2. Prompt template (for any AI video tool or coding agent)
```
Make a [length] s [9:16 | 16:9] [explainer | launch | data story] about [topic] for [audience].
Facts: use ONLY these, with sources: [list]. Do not invent numbers, names or quotes.
Script first: [4–8] beats, one idea + one visual metaphor each. Hook in the first 1.5 s, readable with sound off.
Style: [named style, e.g. "dark Swiss + blueprint + iso, slightly neo-brutalist"].
Palette: [hex list] — what each colour MEANS (e.g. orange = the answer, blue = construction).
Type: [fonts], sizes ≥ 28 px at 1080 wide, text ≥ letters/15 + 1.5 s on screen.
Motion: ease cubic-bezier(.7,0,.2,1) for snaps; camera moves 0.6–3 s; whip cuts between scenes.
Sound: voice [tts/voice], SFX on every cut and every reveal, synthesized in code, ducked under the voice.
Technical: every frame = pure function of time, one draw(t)/seek(t), deterministic, render to MP4.
Banned: corner labels, fake UI frames, particle bursts, lens flares, camera shake, "left-aligned headline with one coloured word".
Before code: show me the script + shot list and wait.
```
Why each line is there: a named style + numeric rules + an avoid list beats a long description ("constraints beat length"). Asking for the assets/facts first stops placeholders.

## 3. Timing rules (numbers, not adjectives)
| Thing | Rule |
|---|---|
| Hook | inside the first 1–1.5 s, works with sound off; frame 0 must already show it (Reels thumbnail) |
| New idea | every 2–4 s in a reel; one action every 3–4 s in a tutorial |
| Swiss snap | `cubic-bezier(.7,0,.2,1)`, 0.3–0.7 s |
| Flat explainer pop | `cubic-bezier(.34,1.56,.64,1)`, settle within 12 frames, stagger 2–4 frames |
| Keynote / camera glide | `cubic-bezier(.16,1,.3,1)`, 30–45 frames |
| Shape morph | 18–30 frames, hold each shape ≥ 1 s |
| Reading | ~0.3 s per word, minimum 1 s; captions 1–4 words |
| Final card | hold 0.8–3 s |
| Frame rate as style | 30 fps for UI/type; 24 fps "on twos" (12) for hand-drawn/paper |

## 4. Style used in the pi reel — "dark Swiss / blueprint / iso / neo-brutal"
- **Dark theme, not black.** Background = gradient of navy `#172036` → `#151A26` → coffee-maroon `#1E1719`, plus two big soft glows (blue top-left, coffee bottom-right). Pure `#000` looks cheap on phones.
- **Colours with jobs:** cream ink `#F0E6D6` (text), burnt orange `#C9621F` / `#E3843D` (the answer, the key number), maroon `#6E1E2B` / `#92303F` (slabs, shadows), dark blue `#1F3656` (panels), blueprint blue `#6F98C8` (construction lines, labels), coffee `#3A2A20` (iso solids).
- **Swiss:** one sans (Instrument Sans Bold) + condensed display numerals (Big Shoulders Bold) + mono labels (Geist Mono). 96 px margins, 12-column grid lines at 3.5 % opacity in the background.
- **Round type (text on circles):** digits running around π, "AROUND" running around the circle, 38 digits around the "universe", the end line "PI NEVER ENDS ● WE JUST STOP COUNTING" around π. Spacing is computed so the text closes the circle exactly (recipe 6.2).
- **Blueprint, low:** 36 px micro-grid at 5 % opacity, construction circles + radial lines at 5–7 %, rotating very slowly. It adds value, never competes.
- **Iso elements:** server tower + growing stack of digit blocks, probe on an orbit; 3 tones per face, no outlines (formula `P(o,u,v,z)=[o0+.866(u−v), o1+.5(u+v)−z]`). A real 3D coin made of 16 stacked circles (`translateZ`) that flips flat into the 2D blueprint circle.
- **Neo-brutal:** flat slabs with hard offset shadows (`box-shadow: 14px 14px 0 maroon`), thick strike bars, a rotated stamp ("PROVEN 1761"), vertical giant word on the edge, slabs that overlap the drawing on purpose.
- **Not AI slop:** no "left headline + one coloured word". Instead: type set on circles, vertical words, numbers in boxed cells, fractions set as real fractions, words that are struck out, slabs at −3°…+5°.

## 5. Camera
- **Real 3D camera on HTML:** `#cam { perspective: 1000px }` (short = wide-angle look) → `#world { transform-style: preserve-3d }`. Tween `rotationX / rotationY / rotationZ / scale / x / y` of `#world` with GSAP.
- **Parallax depth for type:** a second camera (`#words`) gets the same move × 0.2–0.35, so text moves less than the drawing (feels like depth, and big zooms do not push type into the margins). Use × 0 for extreme zooms.
- **Every chain must stay 3D:** each element between the camera and a 3D object needs `transform-style: preserve-3d`. Opacity < 1 on such an element flattens it (fine during a short fade).
- **Whip cut between scenes:** blur the camera 0 → 16 px in 0.14 s, swap scenes, blur back in 0.26 s while the new scene arrives from `x: ±260, rotationY: ∓25°`, + a whoosh.
- **Zoom-to-detail reveal:** draw a detail too small to see (two arcs 4 px apart at the top of a 1500 px circle), then zoom the camera 9× onto that point. Set the transform origin to that point while scale is still 1, otherwise it jumps.
- **Fall-into-it:** spiral of real digits rotating per frame while the camera dollies 0.95 → 1.75 with a little rotationZ.
- **Crane:** start `rotationX: 40°, y: −160, scale: 1.14`, end flat.
- A darker band behind the top HUD row keeps the chapter label readable while the camera zooms under it.

## 6. Code recipes
### 6.1 Camera with parallax
```js
const K = (v, k) => Object.fromEntries(Object.entries(v).map(([key, x]) => [key, typeof x !== 'number' ? x : key === 'scale' ? 1 + (x - 1) * k : x * k]));
function cam(at, dur, from, to, ease = 'power2.inOut', k = .35, origin = '540px 880px') {
  tl.fromTo(world, { ...from, transformOrigin: origin }, { ...to, transformOrigin: origin, duration: dur, ease, immediateRender: false }, at);
  tl.fromTo(words, { ...K(from, k), transformOrigin: origin }, { ...K(to, k), transformOrigin: origin, duration: dur, ease, immediateRender: false }, at);
}
```
`immediateRender: false` on every later `fromTo` of the same element, or the last scene's start pose shows on frame 0. Set the first pose with `gsap.set`.

### 6.2 Text on a circle that closes exactly
```js
function ringText(svg, cx, cy, r, parts, size) {              // parts = [[text, css], ...]
  const id = 'rp' + (uid++), g = E('g', {}, svg);
  E('path', { id, d: `M ${cx - r} ${cy} a ${r} ${r} 0 1 1 ${2 * r} 0 a ${r} ${r} 0 1 1 ${-2 * r} 0`, fill: 'none' }, g);
  const n = parts.reduce((a, p) => a + p[0].length, 0);
  const ls = (2 * Math.PI * r - n * monoWidth(size)) / n;     // mono font: every char same width (measure with canvas)
  const tp = E('textPath', { href: '#' + id }, E('text', { style: `font:700 ${size}px "Geist Mono";letter-spacing:${ls}px` }, g));
  parts.forEach(([s, css]) => (E('tspan', { style: css }, tp).textContent = s));
  return { g, spin: (deg) => g.setAttribute('transform', `rotate(${deg} ${cx} ${cy})`) };
}
```
The path starts at the left and runs clockwise over the top, so text reads upright at the top. Spin it in the per-frame function. Tspans let one part change colour later (e.g. the first 15 decimals turn orange).

### 6.3 Draw-on without the DrawSVG plugin
```js
function draw(el, at, dur) { const len = el.getTotalLength();
  gsap.set(el, { attr: { 'stroke-dasharray': `${len} ${len}`, 'stroke-dashoffset': len } });
  tl.to(el, { attr: { 'stroke-dashoffset': 0 }, duration: dur }, at); }
```
For a circle that should start at 12 o'clock, give it `transform="rotate(-90 cx cy)"`.

### 6.4 Exact math on screen
Real digits, not typed by hand: `let i=1n,x=3n*10n**2120n,p=x; while(x>0n){x=x*i/((i+1n)*4n); i+=2n; p+=x/i}` → `p/10n**20n` = 2100 digits of π in a few ms.

### 6.5 Sound effects that never drift
- The page registers every cue while it builds the timeline: `sfx(t, 'whoosh' | 'impact' | 'tick' | 'type' | 'pop' | 'swish' | 'riser' | 'roll' | 'swell' | 'shimmer' | 'boom', gain, duration)` → `window.SFX`. The renderer saves it as `sfx.json`.
- [`tools/sfx_synth.py`](tools/sfx_synth.py) turns `sfx.json` into `sfx.wav` from sine + noise only (no third-party audio, no licence). Python + numpy + scipy + soundfile.
- Where to put sounds: whoosh on every cut, impact on every slab/stamp, tick per counted step, type per digit cell, roll under running counters, riser before a zoom, swell under a big pull-back, shimmer under the end card, one boom on frame 0.
- Mix (ffmpeg): voice chain `highpass=f=70,deesser=i=0.35,acompressor=threshold=-20dB:ratio=2:attack=10:release=180:makeup=1` → SFX `volume=0.5` then `sidechaincompress` keyed by the voice (threshold 0.04, ratio 3) so effects duck under words → `amix normalize=0` → `loudnorm=I=-14:TP=-1.5:LRA=9,volume=1.6dB,alimiter=limit=0.84:level=false`.

## 7. QC checklist before the full render
- Frame 0 shows the hook (title + key number).
- Nothing in the top 270 px or bottom 480 px of a 1080×1920 reel except the HUD/captions; captions keep 200 px clear on the right.
- Every scene has something moving or drawn in its first 0.5 s (an empty arc-before-draw frame looked broken).
- A parent hidden with `autoAlpha: 0` hides its animated children too: hide the children, not the parent.
- Words that sit on a drawing get a dark backing stroke or slab.
- Every number has a source line.

## Sources read (2026-11-02)
| Source | What it is | What we took |
|---|---|---|
| https://github.com/eastling/awesome-opus-5.5-video-prompts (list structure, notes and starter templates: CC0 1.0) | 90 community prompts in 11 categories + starter templates | "Ask me for assets first", avoid lists, timings in numbers, pure function of time, end card for the last 15 %, explainer = title → one step per scene → one-line summary, continuous shots instead of cuts for 3D |
| https://awesomeclaude.ai/claude-motion-graphics | Guide to motion graphics with Claude | Storyboard with times, contact sheet, virtual clock, per-style easing/timing table, camera per style (iso slides, never perspective-rotates), captions 1–4 words, mux audio with ffmpeg |
| https://opus55video.dev/ | Showcase + workflow (HyperFrames plugin by HeyGen) | Research real facts/screens first, script before code, 5-scene explainer skeleton, "constraints beat length", sound on every cut, no invented stats |
| https://youmind.com/prompts/video | Prompt gallery (titles + categories only; prompt bodies not readable without opening each) | Prompts vary three things: subject, camera movement, visual style |

Opinions in the table above are summaries in our words; nothing was copied.
