# Example: "pi never ends" reel (9:16, 60.7 s) — the reference for the look

Exact files used for the finished reel (2026-11-02). Read `reel.html` to see every scene built by hand:
3D coin flip into a blueprint circle, diameter wrapped 3× around the rim, spiral of real digits with a camera falling in,
Archimedes polygons 6 → 96, iso server + growing digit stack, 9× zoom-to-detail on two arcs 4 px apart, text set on circles,
neo-brutal slabs and stamps, whip cuts, captions, chapter HUD, SFX cue registry (`sfx(t, type, gain, dur)`).

The 16:9 engine in `../../engine/kit.js` is this file turned into reusable helpers; start new videos from the engine.
Paths in these scripts point to the PC they were made on (`D:\dabhim\...`): read them, don't run them as-is.

| File | Role |
|---|---|
| `reel.html` | the whole animation (one paused GSAP timeline, `window.seek(t)`) |
| `schedule.json` | voice lines with per-word start/end times (made by `make_voice.py`) |
| `make_voice.py` | Kokoro af_heart, speed 0.95, passage-based TTS + word timing from real pauses |
| `shots.mjs` | test shots / full render with 4 parallel pages, also saves the SFX cue list |
| `mix.py` | synthesizes SFX, ducks them under the voice, loudness -14 LUFS, muxes |
