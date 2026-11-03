"""Voice + timing for the pi reel. schedule.json is read by reel.html and mix.py so picture and sound cannot drift.
Run: PYTHONPATH=D:/dabhim/timepass/claude/pylib-kokoro python make_voice.py"""
import json, os, re, sys
import numpy as np
import soundfile as sf

HERE = os.path.dirname(os.path.abspath(__file__))
CLAUDE = os.path.dirname(os.path.dirname(HERE))                     # D:\dabhim\timepass\claude
os.environ.setdefault("KOKORO_DIR", os.path.join(CLAUDE, "kokoro"))
sys.path.insert(0, os.path.join(CLAUDE, "fb-templates", "daily"))
sys.stdout.reconfigure(encoding="utf-8")
import voice_reel as V                                                 # tts(), speakable()

# id, caption text (what the viewer reads). SAY = how the voice should say it, when different.
LINES = [
    ("hook",  "We've calculated pi to 314 trillion digits."),
    ("nasa0", "NASA uses fifteen."),
    ("what",  "So what is pi?"),
    ("circ",  "Take any circle. Divide the distance around it by the distance across."),
    ("same",  "You always get the same number. Three point one four one five nine..."),
    ("stop",  "And it never stops."),
    ("inf",   "Not almost infinite. Truly infinite."),
    ("proof", "The digits never end and never repeat. That was proven in 1761."),
    ("arch",  "Over two thousand years ago, Archimedes trapped it between two 96-sided shapes."),
    ("rec",   "Today, one server ran for 110 days to reach 314 trillion digits."),
    ("jpl",   "But NASA steers spacecraft with just fifteen decimals."),
    ("inch",  "On a circle 40 billion miles across, that's off by about half an inch."),
    ("uni",   "With 37 decimals, you could measure around the visible universe, accurate to one atom."),
    ("cur",   "Everything after that is pure curiosity."),
    ("end",   "Pi never ends. We just stop counting."),
]
SAY = {
    "same":  "You always get the same number. Three point one four one five nine.",
    "proof": "The digits never end and never repeat. That was proven in seventeen sixty-one.",
}
PASSAGES = [["hook", "nasa0"], ["what", "circ", "same", "stop"], ["inf", "proof"], ["arch"], ["rec"], ["jpl", "inch"], ["uni"], ["cur", "end"]]
SPEED, PASS_GAP = 0.95, 0.5


def word_times(text, spoken_words, audio, rate, start):
    """Per-word start/end from the real audio: sentence ends take the longest real pauses, commas snap to a pause
    only when one is near; between anchors, words are spread over voiced time by their SPOKEN length
    (so "314" weighs like "three hundred fourteen")."""
    words = text.split()
    weight = [len(V.speakable(w)) + 1 for w in words]
    hop = int(.01 * rate); n = len(audio) // hop
    env = np.array([np.sqrt(np.mean(audio[k * hop:(k + 1) * hop] ** 2)) for k in range(n)])
    quiet = env < 0.05 * env.max()
    runs, k = [], 0                                                     # silences of 0.12 s or more
    while k < n:
        j = k
        while j < n and quiet[j] == quiet[k]:
            j += 1
        if quiet[k] and j - k >= 12:
            runs.append((k, j))
        k = j

    def spread(idx, h0, h1):
        parts, a = [], h0
        for k, j in runs:
            if j <= h0 or k >= h1: continue
            if k > a: parts.append((a, k))
            a = max(a, j)
        if a < h1: parts.append((a, h1))
        parts = parts or [(h0, h1)]
        tot = sum(b - a for a, b in parts)
        def real(x):
            for a, b in parts:
                if x <= b - a: return a + x
                x -= b - a
            return parts[-1][1]
        wts = [weight[i] for i in idx]; W = sum(wts) or 1; cum, out = 0, []
        for wt in wts:
            s0 = real(cum / W * tot); cum += wt
            out.append((s0, real(cum / W * tot)))
        return out

    first = runs[0][1] if runs and runs[0][0] == 0 else 0
    last_ = runs[-1][0] if runs and runs[-1][1] >= n - 2 else n
    inner = [r for r in runs if r[0] > first and r[1] < last_]
    sb = [i for i, w in enumerate(words[:-1]) if re.search(r"[.?!:]$", w)]
    longest = sorted(sorted(inner, key=lambda r: r[0] - r[1])[:len(sb)])
    anchors = [(i, k, j) for i, (k, j) in zip(sb, longest)]
    bounds = [(-1, first)] + [(i, j) for i, k, j in anchors] + [(len(words) - 1, last_)]
    extra = []
    for (ia, ha), (ib, hb) in zip(bounds, bounds[1:]):
        idx = list(range(ia + 1, ib + 1))
        segend = next((k for i, k, j in anchors if i == ib), hb)
        est = spread(idx, ha, segend)
        after = ha
        for o, wi in enumerate(idx[:-1]):
            if re.search(r"[,;]$", words[wi]):
                c = [(abs(k - est[o][1]), k, j) for k, j in inner if after < k < segend and abs(k - est[o][1]) <= 50]
                if c:
                    _, k, j = min(c); extra.append((wi, k, j)); after = j
    anchors = sorted(anchors + extra)
    times, ws, h0 = [], 0, first
    for i, k, j in anchors:
        times += spread(range(ws, i + 1), h0, k); ws, h0 = i + 1, j
    times += spread(range(ws, len(words)), h0, last_)
    return [{"w": w, "s": round(start + a * hop / rate, 3), "e": round(start + b * hop / rate, 3)} for w, (a, b) in zip(words, times)]


def caption_chunks(wl):
    """Captions of up to 4 words / 22 characters, broken at punctuation; times = first word's start."""
    out, cur = [], []
    for w in wl:
        cur.append(w)
        txt = " ".join(x["w"] for x in cur)
        if len(cur) >= 4 or len(txt) >= 22 or re.search(r"[.,:;?!]$", w["w"]):
            out.append({"t": txt, "s": cur[0]["s"]}); cur = []
    if cur:
        out.append({"t": " ".join(x["w"] for x in cur), "s": cur[0]["s"]})
    return out


TXT = dict(LINES)
t, sched, clips, rate = 0.35, [], [], 24000
for group in PASSAGES:
    text = " ".join(TXT[i] for i in group)
    spoken = " ".join(SAY.get(i, TXT[i]) for i in group)
    audio, rate = V.tts().create(V.speakable(spoken), voice="af_heart", speed=SPEED, lang="en-us")
    loud = np.where(np.abs(audio) > 0.02 * np.abs(audio).max())[0]
    audio = audio[max(0, loud[0] - int(.03 * rate)): loud[-1] + int(.12 * rate)]
    wl = word_times(text, spoken, audio, rate, t)
    k = 0
    for lid in group:
        n = len(TXT[lid].split()); ws = wl[k:k + n]; k += n
        sched.append({"id": lid, "start": ws[0]["s"], "end": ws[-1]["e"], "text": TXT[lid], "words": ws, "chunks": caption_chunks(ws)})
        print(f"{lid:6s} {ws[0]['s']:6.2f} → {ws[-1]['e']:6.2f}  " + " ".join(f"{w['w']}@{w['s']:.1f}" for w in ws))
    clips.append((t, audio))
    t += len(audio) / rate + PASS_GAP
end = round(sched[-1]["end"] + 2.8, 2)                 # hold for the final card
json.dump({"lines": sched, "end": end}, open(os.path.join(HERE, "schedule.json"), "w", encoding="utf-8"), indent=1)
track = np.zeros(int(end * rate) + rate, dtype=np.float32)
for start, a in clips:
    s = int(start * rate); track[s:s + len(a)] += a
sf.write(os.path.join(HERE, "voice.wav"), track, rate)
print(f"TOTAL {end:.1f} s")
