# Motion recipes — how to build each effect in code

Code recipes for a GSAP + SVG video pipeline (paused timeline, rendered frame by frame with `seek(t)`).
Each effect was seen in one of the studied reels; "Reel" points to [`reels/`](reels/README.md). Build the effect, then render frames and look at them (see [`../layout/margin-rules.md`](../layout/margin-rules.md) and the work loop: never judge from code alone).

| Effect | Reel | How to build it |
|---|---|---|
| Small lead-in → huge punch word | 1, 4, 8 | Two text elements. `gsap.from(punch, {scale:0.2, opacity:0, duration:0.5, ease:"back.out(1.7)"})` about 1 s after the lead-in. Set `transformOrigin:"50% 50%"`, because SVG's default is 0 0 |
| Same accent circle behind the hero | 1 | One reusable `<circle>` component, same size and position rules in every scene; `scale` from 0 with `back.out` |
| Giant background word drifting, cropped | 1, 7 | Huge text at opacity 0.06–0.1; `gsap.to(word, {x:-400, duration:sceneLength, ease:"none"})`; the viewBox crops it |
| Progress bar / ring filling | 2 | Bar: `scaleX` 0→1 with `transformOrigin:"left center"`. Ring: animate `stroke-dashoffset` from the full length to the target (or DrawSVG) |
| Cards land tilted, then settle | 2, 5 | `gsap.from(card, {rotation:-8, y:60, opacity:0, duration:0.8, ease:"power3.out"})` |
| 3D flip entrance | 5 | Wrap in HTML or a `<g>` with CSS 3D: `gsap.from(card, {rotationY:-70, transformPerspective:900, ease:"power2.out"})` |
| Pills / labels one by one | 3 | `gsap.from(pills, {scale:0, opacity:0, stagger:0.3, ease:"back.out(2)"})` |
| Letter-by-letter build | 6 | GSAP SplitText (now free), chars `stagger:0.067–0.133` (2–4 frames at 30 fps) |
| Motion blur on a fast slide | 3, 4 | SVG `<feGaussianBlur>`: set `stdDeviation` from the slide's speed each frame, peak in the middle, 0 at rest |
| Orbiting dots | 4, 8 | MotionPath along a circle path, or compute `angle = t × speed` per frame (safe with `seek()`) |
| Drifting colour wash | 5 | 2–3 large blurred radial gradients; animate `cx/cy` slowly (20–40 s cycle); colour in the accent only |
| Panel wipe / shard break | 4, 5, 8 | Wipe: 4 rects, `scaleY` 0→1, `stagger:0.06`, then out. Shards: pre-cut polygons flying out with random `x/y/rotation` |
| Slow push-in, sides slide away | 7 | Scene `<g>`: `scale` 1→1.08 over 6–10 s, `ease:"sine.inOut"`; side groups `x:±300, opacity:0` |
| Labels fading in over a long hold | 7 | `stagger:2.5` on small labels, so something new appears every 2–4 s |
| Text synced to voice | 8 | Read the voice timing file (seconds per line), turn each line's start into a timeline label (`tl.addLabel("line3", t)`), add each text beat at its label |
| Counting numbers | 2, 5 | `seek()` skips `onUpdate`, so compute the number from time in your per-frame render; on websites use Magic UI's `number-ticker` |
| Never fully still | all | Rules: something moves every 0.5–1 s, a new element every 1–3 s, scenes 2–4 s; one background per section; one accent colour only |

## Tools already in this repo
- GSAP notes: [`gsap-notes.md`](gsap-notes.md) · install with `npm install gsap`
- SVG traps (CSS beats `fill`, `transform-origin`): [`svg2-notes.md`](svg2-notes.md)
- Anime.js (alternative engine): [`../../libraries/anime/`](../../libraries/anime/)
- Web effects incl. `number-ticker`: [`../../libraries/magicui/components/`](../../libraries/magicui/components/)
- Blueprint drawing engine: [`../../libraries/blueprint-engine/`](../../libraries/blueprint-engine/)
