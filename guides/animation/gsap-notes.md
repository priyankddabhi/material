# GSAP — notes for our video work (scraped 2026-10-29)

Source: https://gsap.com/ + GSAP docs/search results, 2026-10-29.
Local test: `npm install gsap` in ~/workspace/gsap-notes/ — version 3.15.0, installed cleanly. All plugin files present in node_modules/gsap/dist/, copied to ~/workspace/animation-test-5sec/gsap-test/ (gsap.min.js, MotionPathPlugin, DrawSVGPlugin, SplitText).

## What GSAP is, in one line
A JavaScript animation library for professionals. Core idea: animate any numeric property with a tween, sequence tweens in a timeline, control the whole timeline like a video editor (play, pause, seek, reverse, timeScale).

## Core API we will actually use
- `gsap.to(target, {x, y, scale, rotation, opacity, duration, ease})`
- `gsap.from(target, {...})` — starts from given values, ends at natural state. Pitfall: from() renders immediately and can flash — use fromTo() or set initial state in CSS when that matters.
- `gsap.fromTo(target, {from}, {to})` — explicit both ends, safest for frame rendering.
- `gsap.set(target, {...})` — instant, no animation.
- `gsap.timeline({defaults, paused})` — chain .to()/.from()/.fromTo(), add labels, position parameters like "-=0.5" (overlap), "<" (with previous).
- Timeline control: .play(), .pause(), .seek(seconds), .progress(0-1), .timeScale(2) = double speed, .reverse(), .restart(), .kill().
- `gsap.defaults({ease, duration})` — one place for the house easing/duration.
- `gsap.registerPlugin(Plugin)` — must register a plugin before using it, or its option is silently ignored (classic ScrollTrigger bug).
- Scope selectors: do NOT animate '.box' globally — scope to a container, or one scene's tweens will hit another scene's elements.

## Timeline = our storyboard
- A timeline is the video-editor mental model: beats in order, overlaps, labels for beats (HOOK, MOVE, COUNT, HERO, PAYOFF).
- For frame rendering: build the timeline PAUSED, then seek(t) for each frame (t = frame/30). That gives deterministic frames — same t, same picture, every render. This replaces our hand-coded ease functions in v2 main.js.
- Do NOT use setTimeout chains for sequencing — a timeline can be paused/reversed/replayed as one unit, timeouts cannot.

## Stagger — the pill/label/build mechanic
- `stagger: 0.2` = 0.2s delay between each element in a group.
- Use for: pill builds, bar growth, rack assembly, label pops, chart ticks.
- Advanced: stagger with grid, from centre/edges distribution — useful for grids of cards, not needed for a first proof.
- Our animation-folder rule "stagger 0.2-0.4s" maps directly to this one property.

## Easing — why our v1/v2 felt flat or jumpy
- Eases are the personality. Built-ins: power1/2/3/4 (in, out, inOut), sine, expo, circ, back (overshoot — back.out(1.7) is the pop we used), elastic, bounce, steps.
- Rule from GSAP practice: fast-in / slow-out = power2.out / power3.out for entrances; back.out for pops that must overshoot and settle; power2.inOut for moves that start and end at rest (dot travelling a path, camera zoom).
- CustomEase: build an ease from an SVG path curve. CustomBounce / CustomWiggle / RoughEase / SlowMo / ExpoScaleEase are in EasePack.
- GSAP homepage point: "Nice and Easy Easings — huge variety, plug and play, or build your own custom curves."
- Performance rule: animate transforms (x, y, scale, rotation) + opacity only. Those are GPU-accelerated and do not trigger layout reflow. Never animate left/top/width/height for motion — that is slow and janky. (Bars growing: animate scaleX with transformOrigin left, not width, in the GSAP version.)

## Plugins — what each does, and which we need first
FREE / core (all in npm gsap, see licence note below):
- ScrollTrigger — scroll-linked animation, pin, scrub, snap. NOT needed for video rendering (no scroll in a video), only for web pages. Skip for video.
- TextPlugin — animate text content, typewriter, number counters. Useful for counting $20M -> $100M.
- SplitText — split text into chars / words / lines, with mask option (overflow hidden) for line reveals. This is the kinetic-typography tool: hero word letters pop one by one, line mask reveal. Essential for our titles.
- ScrambleText — scramble/decode characters, numbers, upper/lower. Good for a "decoding a number" beat, use sparingly.
- Flip — animate between two layout states without calculating deltas. Useful for a card moving/resizing between beats.
- Draggable / Inertia / Observer / ScrollTo / ScrollSmoother — interaction/scroll tools, NOT video tools. Skip.
- DrawSVG — animate stroke-dashoffset/dasharray so an SVG path looks drawn by hand. Directly useful: loop path drawing itself, underline drawing, ring filling (as a stroke, not a fill).
- MorphSVG — morph one SVG path into another, even with different point counts; shapeIndex controls point mapping to avoid twisting. Useful: chip -> rack shape, circle -> square, but only if the morph is meaningful, not decorative.
- MotionPath — move any element along an SVG path, with align + autoRotate + start/end progress. Directly useful: green money dot travelling the loop, with autoRotate if the dot has direction. Can also take an array of points instead of a path string.
- CustomEase / CustomBounce / CustomWiggle — custom curves, see Easing.
- GSDevTools — timeline scrubber/debugger for web preview. Useful in a browser preview, not in headless frame rendering.

Priority for our next proof: Timeline + SplitText + DrawSVG + MotionPath + TextPlugin (counters). Everything else is later.

## Reusable effects — the template system the OpenFilm brief asked for
- `gsap.registerEffect({name, effect, defaults, extendTimeline: true})` — pre-register a named effect once, then call it as a timeline method.
- Effects to register for us (from research, adapted to our style):
  - textReveal: SplitText lines + mask, y 100% -> 0, stagger 0.15, power3.out.
  - charCascade: SplitText chars, y 50 + opacity 0 + rotationX -90 -> normal, stagger 0.02, back.out(1.7).
  - drawIn: DrawSVG 0 -> 100%, stagger 0.1, power2.inOut.
  - wipeIn: clipPath inset(0 100% 0 0) -> inset(0 0% 0 0), power2.inOut.
  - circleReveal: clipPath circle(0%) -> circle(75%), power2.out.
- This is how "one hero per beat" becomes reusable: same effect, different text/colour, same timing tokens.

## Licence — check before shipping, sources conflict
- Newer sources (2025-2026): after Webflow acquired GreenSock (April 2025), GSAP is 100% free, all plugins including SplitText/MorphSVG/DrawSVG, commercial use, via `npm install gsap`. Version installed here, 3.15.0, includes all plugin files.
- Older sources still say Club GreenSock membership was required for bonus plugins, and trial files warn they only work locally / on approved domains and must not be deployed elsewhere.
- Rule for us: the npm install above is the evidence for local use. Before publishing any commercial video made with a plugin, re-check gsap.com licence page at that time. Do NOT ship a trial-only file.

## How GSAP fits our existing workflow (no rewrite needed)
- Current v2 workflow already works: HTML/SVG page + JS render(t) + Playwright screenshots at 30 fps + ffmpeg.
- GSAP replaces only the JS part: instead of hand-written clamp/lerp/easeOutBack, build a paused GSAP timeline per scene, seek(t) per frame.
- That gives: better easing, SplitText, DrawSVG, MotionPath, reusable effects, and a timeline that can be inspected in a browser (GSDevTools) before rendering.
- OpenFilm (from plan-openfilm.md) would add a Studio/timeline editor on top of this same HTML/SVG/GSAP idea. GSAP alone does NOT give a timeline editor or a render command — we still render with Playwright + ffmpeg, as now.
- Next step when user says go: rebuild the 5-sec proof as a GSAP timeline (paused + seek), with design tokens, one hero per beat, no footer, contact sheet + QA score. Do NOT start the long video.

## Seek test — PROVED 2026-10-29 (not just installed)
- Test page: ~/workspace/animation-test-5sec/gsap-test/index.html — paused GSAP timeline, window.seek(t), MotionPath dot + DrawSVG line + scaleX bar + SplitText "LOOP" chars.
- Render script: ~/workspace/animation-test-5sec/gsap-test/render-gsap.mjs (Playwright + Chrome-for-Testing, same pipeline as v2). Note: playwright-core only resolves via a node_modules symlink in gsap-test/ pointing at the lemo repo's node_modules — that symlink is in the project folder, the repo itself was not edited.
- Result: timeline duration 3.14 s. Dot centre: t=0 (540,400) top, t=1 (540,900) bottom of loop, t=2 (540,400) back to top, t=3 (540,400) held. Frames frame_0s/1s/2s/3s.png visually checked: at 1 s the draw line is only a short stub and the bar is small; at 3 s the line is full width and the bar is full — MotionPath + DrawSVG + scaleX all move correctly under seek(t). GSAP seek rendering WORKS in our pipeline and is ready for the next proof.
- One caution from the test: SplitText chars + opacity tween at 2.5 s — the word was not visible in the 3 s frame check (frame shows line + bar only, word area empty at that crop/time). Do not assume SplitText worked until a frame at 3.1 s is checked in the next proof; MotionPath/DrawSVG/scaleX are the proved parts.

## Sources
- https://gsap.com/ (homepage, 2026-10-29)
- https://gsap.com/text/ (ScrambleText, text plugins)
- Search: GSAP docs timeline/stagger/easing, DrawSVG/MotionPath/SplitText, free-vs-Club (2026-10-29, secondary sources — licence point above is the conflict to re-check)
