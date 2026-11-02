"""Sound effects from a cue list, made only from sine waves and noise (no third-party audio, no licence).
Cue list = JSON array of {"t": seconds, "type": name, "g": gain, "d": duration (optional)}; the animation page
collects it while building its timeline (window.SFX) so sounds land exactly on the picture.
Types: whoosh swish impact boom tick type pop riser roll swell shimmer.
Run:  python sfx_synth.py sfx.json sfx.wav [length_seconds]      Needs: numpy scipy soundfile"""
import json, sys
import numpy as np
import soundfile as sf
from scipy.signal import butter, sosfilt

SR = 48000
rng = np.random.default_rng(3)
tt = lambda d: np.arange(int(d * SR)) / SR


def bp(x, lo, hi, order=2):
    return sosfilt(butter(order, [lo, hi], btype="band", fs=SR, output="sos"), x)


def lp(x, f, order=2):
    return sosfilt(butter(order, f, btype="low", fs=SR, output="sos"), x)


def sweep_noise(d, f0, f1, f2, q=.6):
    """Noise through a band-pass whose centre goes f0 → f1 → f2 (block-wise, smooth enough for air sounds)."""
    n = int(d * SR); x = rng.standard_normal(n); out = np.zeros(n); blk = 256
    for s in range(0, n, blk):
        k = s / n
        fc = f0 + (f1 - f0) * (k / .5) if k < .5 else f1 + (f2 - f1) * ((k - .5) / .5)
        out[s:s + blk] = bp(x[max(0, s - 2048):s + blk], fc * (1 - q / 2), fc * (1 + q / 2))[-len(x[s:s + blk]):]
    return out


def norm(x, peak=.5):
    m = np.abs(x).max()
    return x / m * peak if m > 0 else x


def whoosh(d=.5):
    t = tt(d); env = np.sin(np.pi * t / d) ** 1.6
    return norm(sweep_noise(d, 350, 2600, 700) * env)


def swish(d=.28):
    t = tt(d); env = np.sin(np.pi * t / d) ** 2
    return norm(sweep_noise(d, 1500, 5200, 3000) * env, .35)


def impact(d=.7, f0=110, f1=42, tau=.18):
    t = tt(d); ph = 2 * np.pi * np.cumsum(f1 + (f0 - f1) * np.exp(-t / .05)) / SR
    sub = np.sin(ph) * np.exp(-t / tau)
    click = lp(rng.standard_normal(len(t)), 3000) * np.exp(-t / .008)
    body = lp(rng.standard_normal(len(t)), 400) * np.exp(-t / .07)
    return norm(sub + .5 * click + .6 * body, .6)


def boom(d=1.6):
    return impact(d, 90, 38, .55)


def tick(d=.06, f=2200):
    t = tt(d)
    x = (np.sin(2 * np.pi * f * t) + .5 * np.sin(2 * np.pi * 1.5 * f * t)) * np.exp(-t / .012)
    x += .3 * bp(rng.standard_normal(len(t)), 3000, 8000) * np.exp(-t / .004)
    return norm(x, .35)


def typ(d=.05):
    return tick(d, rng.uniform(1600, 2600)) * .8


def pop(d=.14):
    t = tt(d); f = 380 + 600 * (1 - np.exp(-t / .03))
    return norm(np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t / .045), .45)


def riser(d=1.0):
    t = tt(d); env = (t / d) ** 2; env[-int(.03 * SR):] *= np.linspace(1, 0, int(.03 * SR))
    tone = np.sin(2 * np.pi * np.cumsum(200 + 700 * (t / d) ** 2) / SR)
    return norm((sweep_noise(d, 300, 1800, 4200) * .8 + .25 * tone) * env, .4)


def roll(d=1.0):
    out = np.zeros(int(d * SR) + SR // 10); s = 0.0; k = 0
    while s < d:
        rate = 8 + 26 * (s / d)
        x = tick(.04, 1900 + 400 * (k % 3)) * (.5 + .5 * s / d)
        i = int(s * SR); out[i:i + len(x)] += x; s += 1 / rate; k += 1
    return norm(out, .3)


def swell(d=2.0):
    t = tt(d); env = np.sin(np.pi * t / d) ** 2
    x = sum(np.sin(2 * np.pi * f * t) * a for f, a in [(55, 1), (82.5, .6), (110, .35)])
    return norm((x + .3 * lp(rng.standard_normal(len(t)), 300)) * env, .45)


def shimmer(d=2.5):
    t = tt(d); env = np.minimum(1, t / .25) * np.exp(-t / (d / 2.5))
    x = sum(np.sin(2 * np.pi * f * t) * (1 + .3 * np.sin(2 * np.pi * (3 + i) * t)) * a for i, (f, a) in enumerate([(1760, 1), (2637, .7), (3520, .5), (5274, .25)]))
    return norm(x * env, .22)


GEN = {"whoosh": whoosh, "swish": swish, "impact": impact, "boom": boom, "tick": tick, "type": typ, "pop": pop,
       "riser": riser, "roll": roll, "swell": swell, "shimmer": shimmer}


if __name__ == "__main__":
    cues = json.load(open(sys.argv[1], encoding="utf-8"))
    secs = float(sys.argv[3]) if len(sys.argv) > 3 else max(c["t"] + (c.get("d") or 1.6) for c in cues) + 1
    bus = np.zeros(int(secs * SR))
    for c in cues:
        f = GEN[c["type"]]
        x = (f(c["d"]) if c.get("d") else f()) * c.get("g", 1)
        i = max(0, int(c["t"] * SR)); x = x[:max(0, len(bus) - i)]
        bus[i:i + len(x)] += x
    sf.write(sys.argv[2], np.clip(bus, -1, 1).astype(np.float32), SR)
    print(len(cues), "sound effects ->", sys.argv[2])
