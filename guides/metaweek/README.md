# metaweek: long 16:9 explainer videos in the "pi never ends" style

A ready kit for making a 5–6 minute horizontal explainer with voice and sound effects. It uses the same look and code as our pi reel (dark Swiss + blueprint + iso + neo-brutal, text on circles, 3D camera). Everything is code, so it's rendered frame by frame and fully repeatable.

**Start here:** paste [`MASTER-PROMPT.md`](MASTER-PROMPT.md) into a new AI chat (Claude Code or any coding agent with a terminal).

| Path | What it is |
|---|---|
| [`MASTER-PROMPT.md`](MASTER-PROMPT.md) | The prompt for a new chat: rules, reading order, step-by-step workflow with review stops, style, motion, sound, speed |
| [`SETUP.md`](SETUP.md) | Install (Node, Python, ffmpeg, Chrome, Kokoro voice model) + a 10-minute pipeline test |
| [`engine/kit.js`](engine/kit.js) | The engine: camera with parallax, whip cuts, ring/path text, draw-on lines, iso boxes/servers/packages/floor, slabs, stamps, digit cells, code panels that type themselves, Tabler icons, counters, SFX cue registry, HUD, captions |
| [`engine/make_voice.py`](engine/make_voice.py) | `script.json` → per-chapter voice (Kokoro af_heart) + word timings |
| [`engine/render.mjs`](engine/render.mjs) | Chapter page → test shots + contact sheet, or the full render (parallel, resumable), or joining all chapters |
| [`engine/mix.py`](engine/mix.py) | Synthesized SFX ducked under the voice (+ optional music bed), -14 LUFS |
| [`demo/`](demo/) | A 15 s chapter using every kit element: copy `demo/chapters/demo.html` to start a chapter |
| [`internet-burning/BRIEF.md`](internet-burning/BRIEF.md) | Video #1: topic analysis, facts to verify, script v2, shot list, YouTube package |
| [`examples/pi-reel/`](examples/pi-reel/) | The original 9:16 reel source, as the reference for the look |

Project layout (one folder per video, inside this `guides/metaweek/` folder so the render server can reach the fonts and icons in the repo):
```
guides/metaweek/<project>/
  BRIEF.md  facts.md  script.json  youtube.md
  chapters/ch00.html … ch09.html
  build/            ← voice, frames, MP4s (git-ignored)
```
Fonts: `skills/anthropic/canvas-design/canvas-fonts/` (SIL OFL). Icons: `assets/icons/tabler/` (MIT). GSAP comes from npm (own licence, not stored in this repo). Voice: Kokoro (Apache-2.0). Sound effects: synthesized by [`../animation/tools/sfx_synth.py`](../animation/tools/sfx_synth.py), no third-party audio.
