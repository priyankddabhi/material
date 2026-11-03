"""Put voice + sound effects on a rendered chapter.
  python mix.py <project_dir> <chapter_id>   → <project>/build/<id>.mp4
Voice: build/<id>.wav. SFX: build/<id>-sfx.json (cues the page registered with sfx()) synthesized by
material/guides/animation/tools/sfx_synth.py (sine + noise only, no licence issues), ducked under the voice.
Optional music bed: put build/music.wav (royalty-free/your own) and it is mixed at -26 dB under everything."""
import importlib.util, json, os, subprocess, sys
import numpy as np
import soundfile as sf

ENGINE = os.path.dirname(os.path.abspath(__file__))
spec = importlib.util.spec_from_file_location("sfx_synth", os.path.join(ENGINE, "..", "..", "guides", "animation", "tools", "sfx_synth.py"))
S = importlib.util.module_from_spec(spec); spec.loader.exec_module(S)

proj, ch = os.path.abspath(sys.argv[1]), sys.argv[2]
B = lambda f: os.path.join(proj, "build", f)
voice, vsr = sf.read(B(ch + ".wav"))
bus = np.zeros(int(len(voice) / vsr * S.SR) + S.SR)
cues = json.load(open(B(ch + "-sfx.json"), encoding="utf-8"))
for c in cues:
    f = S.GEN[c["type"]]
    x = (f(c["d"]) if c.get("d") else f()) * c.get("g", 1)
    i = max(0, int(c["t"] * S.SR)); x = x[:max(0, len(bus) - i)]; bus[i:i + len(x)] += x
sf.write(B(ch + "-sfx.wav"), np.clip(bus, -1, 1).astype(np.float32), S.SR)

music = os.path.exists(B("music.wav"))
vchain = "highpass=f=70,deesser=i=0.35,acompressor=threshold=-20dB:ratio=2:attack=10:release=180:makeup=1,aresample=48000"
fc = (f"[1:a]{vchain},asplit=3[v][k1][k2];[2:a]volume=0.5[s0];[s0][k1]sidechaincompress=threshold=0.04:ratio=3:attack=15:release=250[s];"
      + (f"[3:a]aresample=48000,volume=-26dB[m0];[m0][k2]sidechaincompress=threshold=0.03:ratio=4:attack=20:release=400[m];[v][s][m]amix=inputs=3"
         if music else "[k2]anullsink;[v][s]amix=inputs=2")
      + ":normalize=0:duration=first,loudnorm=I=-14:TP=-1.5:LRA=9,volume=1.6dB,alimiter=limit=0.84:level=false,aresample=48000[a]")
args = ["ffmpeg", "-y", "-loglevel", "error", "-i", B(ch + "-silent.mp4"), "-i", B(ch + ".wav"), "-i", B(ch + "-sfx.wav")]
if music: args += ["-stream_loop", "-1", "-i", B("music.wav")]
subprocess.run(args + ["-filter_complex", fc, "-map", "0:v", "-map", "[a]", "-c:v", "copy", "-c:a", "aac", "-b:a", "192k", "-ar", "48000",
                       "-shortest", "-movflags", "+faststart", B(ch + ".mp4")], check=True)
print(f"{ch}: {len(cues)} sound effects -> {B(ch + '.mp4')}")
