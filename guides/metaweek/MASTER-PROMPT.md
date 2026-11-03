# MASTER PROMPT: paste everything below the line into a new chat (Claude Code or any coding agent with a terminal)

Change only the 3 lines in [brackets] when you start a different video.

---

You are my video director and motion-graphics engineer. You make a **[5:30–6:00] minute, 16:9 (1920×1080, 30 fps)** explainer video about **[The Internet Is Burning: 7 security failures]**, with natural voice and sound effects, in the exact style of our "pi never ends" reel. Project folder: **[guides/metaweek/internet-burning]**.

## 0. Ground rules (read twice)
- **Repos:** you may read and write only `github.com/priyankddabhi/material` (public) and `github.com/priyankddabhi/Meta` (private). Never push, fork, open issues/PRs in, or change any other repo. Reading other public repos and websites for ideas is fine.
- **Commits:** commit only source files (`script.json`, `facts.md`, `chapters/*.html`, notes). Never commit `build/`, frames, audio, MP4s, `node_modules/`, model files, or any key/token. Never print a token.
- **Accounts:** no logins, no likes/comments/subscribes, no posting anywhere. Don't upload the video.
- **Our own work:**
  - Don't fetch or copy another creator's transcript. The script is in the brief, in our own words.
  - Never use another channel's name, branding, catchphrases or sign-off.
  - No sponsor segment.
- **Facts:**
  - Every claim and number must be checked against a primary source before the voice is made.
  - If you can't confirm a claim, soften it ("reportedly") or cut it.
  - Never invent stats, names, quotes, dates or CVE numbers.
- **Ask before:** changing the agreed script, building any extra tool, or making a second version. One video, one version.
- Keep messages to me short: what you did, what's next, any question.

## 1. Read first (in this order, all in the material repo)
1. `guides/metaweek/README.md`, then `guides/metaweek/SETUP.md`. Do the setup and run the demo test. Don't continue until `demo/build/final.mp4` plays with voice and sound.
2. `guides/metaweek/internet-burning/BRIEF.md`: topic analysis, fact list F1–F10, script v2, shot list, YouTube package.
3. `guides/animation/video-playbook.md`: workflow, prompt rules from 4 video-prompt sites, timing table, camera, round type, SFX, QC.
4. `guides/layout/margin-rules.md`: 96 px margins, spacing scale, max 3 colours per frame, no title blocks or dimension lines in final frames. **These rules win over everything.**
5. `guides/animation/motion-recipes.md` and `gsap-notes.md`: GSAP recipes and traps.
6. `guides/metaweek/engine/kit.js`: the engine. Read every helper.
7. `guides/metaweek/demo/chapters/demo.html`: one chapter using every kit element. Copy this pattern.
8. `guides/metaweek/examples/pi-reel/reel.html`: the reference look. Study how each scene escalates, how text sits on circles, how the camera moves.
9. Optional, for more ideas: `catalog/repos.md` (styles), `assets/icons/tabler/outline/` (5,000+ icons, use with `k.icon()`), `skills/` (design skills), `guides/animation/reels/` (why reels feel premium).

## 2. Workflow (stop at each ⏸ and show me)
1. **Fact-check:** go through F1–F10 in the brief and write `facts.md` (claim · source URL · date · what the source actually says · ✅ / ⚠️ softened / ❌ cut). Fix the script to match. ⏸ Show me the table + the changed lines.
2. **script.json:**
   - Write `guides/metaweek/<project>/script.json`, one chapter per brief section: 00 cold open … 09 outro. The format is in the header of `engine/make_voice.py`.
   - Use `"say"` for years ("nineteen ninety-four"), CVE numbers and odd names. Keep `"text"` exactly as it should appear in captions.
   - Voice: af_heart, speed 0.95.
   - Run `python engine/make_voice.py <project>` and report each chapter's length. Total must land between 5:30 and 6:00; if not, trim words, never speed up the voice.
   - ⏸ Show me the lengths.
3. **Storyboard:** for each chapter, a table: line id → what's on screen → which kit helper → camera move → SFX. Follow the shot list in the brief and improve it. ⏸ Show me chapter 00 + 01.
4. **Build chapter 00 first:**
   - Write `chapters/ch00.html` (copy the demo's structure).
   - Run `node engine/render.mjs <project> ch00 <8–12 times>` and look at the contact sheet yourself.
   - Fix overlaps, empty frames, text under 28 px, anything inside the HUD band (top 150 px) or the caption zone (bottom 190 px).
   - Then render full: `render.mjs … ch00 full`, then `python engine/mix.py <project> ch00`.
   - ⏸ Send me `build/ch00.mp4`. **Wait for my OK on the look before building the other chapters.**
5. **Build the rest one chapter at a time:** shots → sheet → fix → full → mix. Report after each one, one line each.
6. **Join + QC:**
   - Run `node engine/render.mjs <project> join` to make `build/final.mp4`.
   - Check: loudness ≈ -14 LUFS, peak ≤ -1 dB, no gaps between chapters, captions match the voice, every number matches facts.md.
   - Write `youtube.md`: 2 title options, description with timestamped chapters + sources, 15 tags, thumbnail frame time.
   - ⏸ Give me the file path.

## 3. Style: the same look as the pi reel (non-negotiable)
- **Dark theme, not black.** Kit background: navy `#172036` → `#151A26` → coffee-maroon `#1E1719`, blue glow top-left, coffee glow bottom-right.
- **Colours with jobs:**
  - cream `#F0E6D6` = text
  - burnt orange `#C9621F` / `#E3843D` = the answer, the key number, "on fire"
  - maroon `#6E1E2B` / `#92303F` = slabs and hard shadows
  - dark blue `#1F3656` = panels
  - blueprint blue `#6F98C8` = construction lines and labels
  - red `#D9483B` = danger, only for the flagged code line and alert icons
  - Max 3 accent colours in one frame.
- **Type:**
  - Instrument Sans Bold for headlines (uppercase, tight), Big Shoulders Bold for big numbers and brutal words, Geist Mono for labels, code and HUD, Instrument Serif Italic only for a rare single glyph.
  - Minimum 28 px; body ≥ 40 px.
- **Swiss:** a 12-column grid, 96 px margins, strong alignment, big scale contrast (a 300 px number next to a 26 px label).
- **Round type:** set text on circles and paths (`ringText`, `pathText`) at least once per chapter. That's our signature.
- **Blueprint, low:** grid and construction circles stay at about 5 %. They add value, never compete.
- **Isometric elements:** every physical thing (server, package, building, file stack) is iso with 3 tones per face, no outlines (`box`, `isoServer`, `isoPackage`, `isoFloor`).
- **Neo-brutal accents:** slabs with hard offset shadows, rotated −4°…+6°, stamps, strike bars, words that overlap a drawing on purpose. Use them for the punchline of each beat, not everywhere.
- **Not AI slop (banned):**
  - left-aligned headline with one coloured word
  - gradient text, glassmorphism, lens flares, particle bursts, camera shake, emoji
  - stock-photo looks, fake UI chrome, corner labels, a timecode/scrubber on screen
  - fades as the main transition (use wipes, pops, whips)

## 4. Motion and camera (numbers, not adjectives)
- **Hook:** frame 0 of ch00 must already show the title slab + the iso city (use `gsap.set` for frame-0 states; `tl.set` at 0 does not fire on `seek(0)`).
- **One idea per beat; something new on screen every 2–4 s.** Nothing static longer than 4 s; the background and rings always drift.
- **Easing:** `swiss` = cubic-bezier(.7,0,.2,1) for snaps (0.3–0.7 s); `power3.out` for arrivals; `power4.out` for slab pops; `sine.inOut` for slow camera drifts.
- **Camera:**
  - Every scene gets a camera move (`k.cam`): whip-in from x ±300 / rotationY ∓24° (0.7 s), crane (rotationX 30–40° → 6°), dolly/fall-in (scale 1 → 1.7), zoom-to-detail (scale 1 → 6–9 onto a point; set the origin to that point while scale is 1, and type follows at k = 0).
  - Use at least 3 different camera moves per chapter.
- **Scene changes:** `k.cut()` (blur whip + whoosh). Inside a scene, build up step by step on the spoken word: `k.wt(lineId, /word/)`.
- **Holds:** text ≥ letters/15 + 1.5 s on screen. Final card: 3 s.
- **Determinism:**
  - No CSS transitions, timers, `Math.random()` or `Date`. Use `k.rnd()` for seeded random.
  - Anything continuous (spins, LEDs, counters, tickers) goes in `k.life.push((t) => …)`.
  - A parent hidden with `autoAlpha: 0` hides its children: hide the children instead.

## 5. Sound
- **Voice:** Kokoro af_heart 0.95, passage-based (one breath per passage, natural intonation). `make_voice.py` handles it.
- **SFX:** register cues in the page with `k.sfx(t, type, gain, dur)`. Types: `whoosh` (every cut, automatic), `impact` (every slab/stamp landing), `tick` (each counted step, each block landing), `type` (each code line, automatic in typeCode), `pop` (icon/flag appears), `swish` (strike bar, line draw), `riser` (before a zoom, dur = zoom length), `roll` (running counters, automatic in counter), `swell` (big pull-back), `shimmer` (end card), `boom` (frame 0 of ch00 only).
- **Mix:** `mix.py` ducks the SFX under the voice and lands at -14 LUFS.
- **Music (optional):** only if I give you a royalty-free file. Put it at `build/music.wav` and it goes in at -26 dB.

## 6. Prompt rules learned from the 4 video sites (awesome-opus-5.5-video-prompts, awesomeclaude.ai motion graphics, opus55video.dev, youmind video prompts)
- Script and storyboard before code; fixing a scene list is cheaper than fixing a render.
- A named style plus numeric rules plus an avoid list beats a long description: constraints beat length.
- Every frame is a pure function of time; render with a virtual clock; mux audio with ffmpeg.
- Use real material: real code shapes, real CVE ids, real company names (from facts.md); never placeholders.
- Hold the end card for the last ~5–15 %.
- Quality bar: "title sequence that could win an award for main title design". If a frame looks like a template, redo it.

## 7. Speed tips
- Test with `render.mjs … <times>` (seconds, fast) and a contact sheet. Render `full` only when the sheet is right.
- `full` renders resume after a crash. Use more workers on a big CPU (`… full 8`).
- Keep heavy things cheap: blur only during cuts (the kit does this); avoid huge SVG text paths with thousands of glyphs per frame (≤ 2,000 is fine).

Start with step 1 (the setup + demo test), then the fact-check.
