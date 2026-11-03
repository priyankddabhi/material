"""Voice + word timings for every chapter of a project (Kokoro af_heart, offline).
  python make_voice.py <project_dir> [chapter_id]
Reads <project>/script.json, writes <project>/build/<id>.wav + <id>.json (schedule: lines, word times, captions, end).
The chapter page and mix.py both read that JSON, so picture and sound cannot drift.

script.json:
{ "voice": "af_heart", "speed": 0.95,
  "chapters": [ { "id": "ch01", "title": "PHP", "hold": 1.2,
                  "passages": [ [ {"id": "hook", "text": "On-screen caption text.", "say": "optional: how to pronounce it"} ], [ ... ] ] } ] }
A passage is spoken in ONE breath (natural intonation), then cut into lines at the real pauses.
Kokoro model: set KOKORO_DIR to a folder with kokoro-v1.0.int8.onnx + voices-v1.0.bin (see SETUP.md)."""
import json, os, re, sys
import numpy as np
import soundfile as sf
from kokoro_onnx import Kokoro

sys.stdout.reconfigure(encoding="utf-8")
KOKORO = os.environ.get("KOKORO_DIR") or os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "kokoro")
ONES = "zero one two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen seventeen eighteen nineteen".split()
TENS = "_ _ twenty thirty forty fifty sixty seventy eighty ninety".split()


def words(n):
    n = int(n)
    if n < 20: return ONES[n]
    if n < 100: return TENS[n // 10] + ("" if n % 10 == 0 else "-" + ONES[n % 10])
    if n < 1000: return ONES[n // 100] + " hundred" + ("" if n % 100 == 0 else " " + words(n % 100))
    for big, name in ((10 ** 12, "trillion"), (10 ** 9, "billion"), (10 ** 6, "million"), (1000, "thousand")):
        if n >= big: return words(n // big) + " " + name + ("" if n % big == 0 else " " + words(n % big))


def speakable(t):
    """Numbers the way a person says them (the voice reads digit strings badly). Years: put them in "say"."""
    t = re.sub(r"\$(\d[\d,]*)", lambda m: words(m.group(1).replace(",", "")) + " dollars", t)
    t = re.sub(r"(\d+)%", lambda m: words(m.group(1)) + " percent", t)
    t = re.sub(r"\d[\d,]*", lambda m: words(m.group(0).replace(",", "")), t)
    return t.replace("&", " and ")


def word_times(text, audio, rate, start):
    """Per-word start/end from the real audio: sentence ends take the longest real pauses, commas snap to a pause
    only when one is near; between anchors words are spread over voiced time by their spoken length."""
    ws = text.split(); weight = [len(speakable(w)) + 1 for w in ws]
    hop = int(.01 * rate); n = len(audio) // hop
    env = np.array([np.sqrt(np.mean(audio[k * hop:(k + 1) * hop] ** 2)) for k in range(n)])
    quiet = env < 0.05 * env.max()
    runs, k = [], 0
    while k < n:
        j = k
        while j < n and quiet[j] == quiet[k]: j += 1
        if quiet[k] and j - k >= 12: runs.append((k, j))
        k = j

    def spread(idx, h0, h1):
        parts, a = [], h0
        for k, j in runs:
            if j <= h0 or k >= h1: continue
            if k > a: parts.append((a, k))
            a = max(a, j)
        if a < h1: parts.append((a, h1))
        parts = parts or [(h0, h1)]; tot = sum(b - a for a, b in parts)
        def real(x):
            for a, b in parts:
                if x <= b - a: return a + x
                x -= b - a
            return parts[-1][1]
        wts = [weight[i] for i in idx]; Wt = sum(wts) or 1; cum, res = 0, []
        for w in wts:
            s0 = real(cum / Wt * tot); cum += w; res.append((s0, real(cum / Wt * tot)))
        return res

    first = runs[0][1] if runs and runs[0][0] == 0 else 0
    last_ = runs[-1][0] if runs and runs[-1][1] >= n - 2 else n
    inner = [r for r in runs if r[0] > first and r[1] < last_]
    sb = [i for i, w in enumerate(ws[:-1]) if re.search(r"[.?!:]$", w)]
    longest = sorted(sorted(inner, key=lambda r: r[0] - r[1])[:len(sb)])
    anchors = [(i, k, j) for i, (k, j) in zip(sb, longest)]
    bounds = [(-1, first)] + [(i, j) for i, k, j in anchors] + [(len(ws) - 1, last_)]
    extra = []
    for (ia, ha), (ib, hb) in zip(bounds, bounds[1:]):
        idx = list(range(ia + 1, ib + 1)); segend = next((k for i, k, j in anchors if i == ib), hb)
        est = spread(idx, ha, segend); after = ha
        for o, wi in enumerate(idx[:-1]):
            if re.search(r"[,;]$", ws[wi]):
                c = [(abs(k - est[o][1]), k, j) for k, j in inner if after < k < segend and abs(k - est[o][1]) <= 50]
                if c: _, k, j = min(c); extra.append((wi, k, j)); after = j
    anchors = sorted(anchors + extra)
    times, s, h0 = [], 0, first
    for i, k, j in anchors: times += spread(range(s, i + 1), h0, k); s, h0 = i + 1, j
    times += spread(range(s, len(ws)), h0, last_)
    return [{"w": w, "s": round(start + a * hop / rate, 3), "e": round(start + b * hop / rate, 3)} for w, (a, b) in zip(ws, times)]


def caption_chunks(wl, max_words=5, max_chars=34):
    out, cur = [], []
    for w in wl:
        cur.append(w); txt = " ".join(x["w"] for x in cur)
        if len(cur) >= max_words or len(txt) >= max_chars or re.search(r"[.,:;?!]$", w["w"]):
            out.append({"t": txt, "s": cur[0]["s"]}); cur = []
    if cur: out.append({"t": " ".join(x["w"] for x in cur), "s": cur[0]["s"]})
    return out


def main():
    proj = os.path.abspath(sys.argv[1]); only = sys.argv[2] if len(sys.argv) > 2 else None
    S = json.load(open(os.path.join(proj, "script.json"), encoding="utf-8"))
    os.makedirs(os.path.join(proj, "build"), exist_ok=True)
    pack = os.path.join(KOKORO, "voices-v1.0.bin")
    if not os.path.exists(pack): pack = os.path.join(KOKORO, "voices.npz")
    tts = Kokoro(os.path.join(KOKORO, "kokoro-v1.0.int8.onnx"), pack)
    voice, speed = S.get("voice", "af_heart"), S.get("speed", 0.95)
    for ch in S["chapters"]:
        if only and ch["id"] != only: continue
        t, sched, clips, rate = ch.get("lead", 0.6), [], [], 24000
        for group in ch["passages"]:
            text = " ".join(l["text"] for l in group); spoken = " ".join(l.get("say", l["text"]) for l in group)
            audio, rate = tts.create(speakable(spoken), voice=voice, speed=speed, lang="en-us")
            loud = np.where(np.abs(audio) > 0.02 * np.abs(audio).max())[0]
            audio = audio[max(0, loud[0] - int(.03 * rate)): loud[-1] + int(.12 * rate)]
            wl = word_times(text, audio, rate, t); k = 0
            for l in group:
                nw = len(l["text"].split()); w = wl[k:k + nw]; k += nw
                sched.append({"id": l["id"], "start": w[0]["s"], "end": w[-1]["e"], "text": l["text"], "words": w, "chunks": caption_chunks(w)})
            clips.append((t, audio)); t += len(audio) / rate + ch.get("gap", 0.55)
        end = round(sched[-1]["end"] + ch.get("hold", 1.2), 2)
        json.dump({"id": ch["id"], "title": ch.get("title", ""), "lines": sched, "end": end}, open(os.path.join(proj, "build", ch["id"] + ".json"), "w", encoding="utf-8"), indent=1)
        track = np.zeros(int(end * rate) + rate, dtype=np.float32)
        for s0, a in clips: i = int(s0 * rate); track[i:i + len(a)] += a
        sf.write(os.path.join(proj, "build", ch["id"] + ".wav"), track, rate)
        print(f"{ch['id']}: {end:.1f} s, {len(sched)} lines")
        for l in sched: print(f"   {l['id']:10s} {l['start']:6.2f} {l['text'][:70]}")


if __name__ == "__main__":
    main()
