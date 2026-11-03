# Setup (once per PC)

Needs: **git, Node 20+, Python 3.10+, ffmpeg, Google Chrome** (or Chromium). Windows, macOS or Linux.

```bash
git clone https://github.com/priyankddabhi/material.git
cd material/guides/metaweek/engine
npm install                                   # gsap + playwright-core (uses your installed Chrome)
pip install kokoro-onnx soundfile numpy scipy
```

**Voice model (Kokoro, offline, Apache-2.0)**: make a folder `material/guides/metaweek/kokoro/` (already in `.gitignore`) and download two files into it:
- `kokoro-v1.0.int8.onnx` (≈ 88 MB): github.com/thewh1teagle/kokoro-onnx → Releases → `model-files-v1.0`
- `voices-v1.0.bin` (≈ 27 MB, all voices): same release

`guides/metaweek/kokoro/` is the default place. If you keep the model somewhere else, set `KOKORO_DIR`:
```bash
# Windows PowerShell:  $env:KOKORO_DIR = "C:\path\to\material\guides\metaweek\kokoro"
# bash:                export KOKORO_DIR=/path/to/material/guides/metaweek/kokoro
```
If Chrome is not in a standard place, set `CHROME` to its .exe path.

## Test the whole pipeline (≈ 10 min)
```bash
cd material/guides/metaweek
python engine/make_voice.py demo                 # → demo/build/demo.wav + demo.json
node engine/render.mjs demo demo 0,3,6,9,12      # → demo/build/shots/demo-sheet.png  (look at it)
node engine/render.mjs demo demo full            # → demo/build/demo-silent.mp4 + demo-sfx.json
python engine/mix.py demo demo                   # → demo/build/demo.mp4 (voice + SFX, -14 LUFS)
node engine/render.mjs demo join                 # → demo/build/final.mp4
```

## Speed
Measured on a 12-thread laptop CPU with 4 browser pages: **about 250 frames/min at 1080p** (frames are saved as JPEG q92 and film grain is added by ffmpeg, which is 8× faster than PNG + in-page grain). That's about 45 min of render for a 6 min video. Each chapter is a separate page: render chapter by chapter, review each one, and re-render only the chapter you change. A stopped render resumes where it stopped (frames already on disk are skipped). Use more workers on a bigger CPU: `node engine/render.mjs <proj> <ch> full 8`.
