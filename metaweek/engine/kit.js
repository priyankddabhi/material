/* metaweek kit — the animation engine behind the "pi never ends" reel, made reusable and 16:9.
   One chapter page = one paused GSAP timeline. Every frame is a pure function of time: window.seek(t).
   Load order in a chapter page: gsap.min.js, CustomEase.min.js, kit.js, then:
     const k = await KIT({ chapter: { n: 1, total: 9, title: 'PHP' } });   // reads ?sched=<schedule json>
     ...build scenes with k.* ...
     k.finish();                                                         // HUD, captions, grain, window.seek
   Style: dark theme (navy → coffee, never #000), cream ink, burnt orange = the answer, maroon = slabs/shadows,
   blueprint blue = construction. Swiss type (Instrument Sans Bold + Big Shoulders numerals + Geist Mono labels),
   type on circles, blueprint grid at 5 %, iso solids with 3 tones, neo-brutal slabs with hard offset shadows. */
(function () {
  const NS = 'http://www.w3.org/2000/svg';
  const FONTS = '/skills/anthropic/canvas-design/canvas-fonts/';          // material repo (served from its root)
  const ICONS = '/assets/icons/tabler/outline/';
  const C = { ink: '#F0E6D6', dim: 'rgba(240,230,214,.55)', or: '#C9621F', or2: '#E3843D', mar: '#6E1E2B', mar2: '#92303F',
              blu: '#1F3656', bp: '#6F98C8', cof: '#3A2A20', bg: '#151A26', red: '#D9483B', grn: '#7FB77E' };
  const TONE = { steel: ['#4B607F', '#2E3E5B', '#202C44'], or: ['#E0853F', '#B85A1E', '#8C4318'], mar: ['#A43B4B', '#7A2533', '#5A1A25'],
                 cof: ['#7A5A44', '#54392A', '#3B281E'], cream: ['#F0E6D6', '#C9BBA4', '#A39580'], ground: '#1A2133' };

  window.KIT = async function (opts = {}) {
    const W = opts.W || 1920, H = opts.H || 1080, M = opts.margin || 96;
    const q = new URLSearchParams(location.search);
    const SC = await (await fetch((q.get('sched') || opts.sched) + '?' + Date.now())).json();
    const L = Object.fromEntries(SC.lines.map((l) => [l.id, l]));
    const T = (id) => { if (!L[id]) throw new Error('no line ' + id); return L[id].start; };
    const wt = (id, re) => { const w = L[id].words.find((x) => re.test(x.w)); if (!w) console.error('no word', id, re); return w ? w.s : T(id); };
    const END = SC.end;

    /* ---------- page + fonts */
    const css = document.createElement('style');
    css.textContent = `
      @font-face { font-family: "Instrument Sans"; src: url(${FONTS}InstrumentSans-Bold.ttf); font-weight: 700; }
      @font-face { font-family: "Instrument Serif"; src: url(${FONTS}InstrumentSerif-Italic.ttf); font-style: italic; }
      @font-face { font-family: "Geist Mono"; src: url(${FONTS}GeistMono-Regular.ttf); font-weight: 400; }
      @font-face { font-family: "Geist Mono"; src: url(${FONTS}GeistMono-Bold.ttf); font-weight: 700; }
      @font-face { font-family: "Big Shoulders"; src: url(${FONTS}BigShoulders-Bold.ttf); font-weight: 700; }
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body { width: ${W}px; height: ${H}px; overflow: hidden; background: #000; }
      #stage { position: absolute; inset: 0; overflow: hidden; color: ${C.ink};
        background: radial-gradient(70% 70% at 8% 6%, #243860 0%, rgba(36,56,96,0) 70%),
                    radial-gradient(70% 75% at 96% 98%, #43291C 0%, rgba(67,41,28,0) 72%),
                    linear-gradient(160deg, #172036 0%, #151A26 50%, #1E1719 100%); }
      .abs { position: absolute; } svg { position: absolute; left: 0; top: 0; overflow: visible; }
      #cam, #tcam { position: absolute; inset: 0; perspective: ${opts.perspective || 1500}px; perspective-origin: 50% 48%; }
      #world, #words, .layer { position: absolute; inset: 0; transform-style: preserve-3d; }
      .bs { font-family: "Big Shoulders"; font-weight: 700; line-height: .8; letter-spacing: -.01em; }
      .sw { font-family: "Instrument Sans"; font-weight: 700; letter-spacing: -.035em; text-transform: uppercase; line-height: .9; }
      .serif { font-family: "Instrument Serif"; font-style: italic; }
      .mono { font: 700 26px "Geist Mono"; letter-spacing: .14em; text-transform: uppercase; }
      .slab { position: absolute; padding: 14px 26px 18px; box-shadow: 14px 14px 0 ${C.mar}; white-space: nowrap; }
      .cell { position: absolute; display: flex; align-items: center; justify-content: center; border: 3px solid rgba(240,230,214,.32); background: rgba(21,26,38,.82); }
      .code { position: absolute; background: rgba(15,19,29,.94); border: 3px solid rgba(240,230,214,.22); box-shadow: 16px 16px 0 ${C.mar}; font: 400 30px/1.55 "Geist Mono"; padding: 0 0 22px; }
      .code .bar { display: flex; gap: 10px; align-items: center; padding: 14px 20px; border-bottom: 2px solid rgba(240,230,214,.12); font: 700 20px "Geist Mono"; letter-spacing: .12em; color: ${C.dim}; }
      .code .bar i { width: 14px; height: 14px; border-radius: 50%; background: rgba(240,230,214,.18); display: block; }
      .code .ln { position: relative; padding: 0 28px 0 84px; white-space: pre; }
      .code .ln::before { content: attr(data-n); position: absolute; left: 22px; width: 40px; text-align: right; color: rgba(240,230,214,.28); }
      .code .ln.hot { background: rgba(217,72,59,.18); box-shadow: inset 6px 0 0 ${C.red}; }
      .k { color: ${C.or2}; } .s { color: #B9D08A; } .c { color: rgba(240,230,214,.4); } .f { color: ${C.bp}; }
      .hud { font: 700 24px "Geist Mono"; letter-spacing: .14em; }
      #cap { position: absolute; left: 0; width: ${W}px; top: ${H - M - 70}px; text-align: center; }
      #cap span { display: inline-block; font: 700 44px/1.1 "Instrument Sans"; letter-spacing: -.01em; padding: 10px 22px 13px; background: #2A1E18; box-shadow: 9px 9px 0 ${C.mar}; max-width: ${W - 2 * M - 400}px; }
      #grain { position: absolute; inset: -40px; pointer-events: none; mix-blend-mode: screen; opacity: .055; }
      #vig { position: absolute; inset: 0; pointer-events: none; background: radial-gradient(110% 100% at 50% 48%, rgba(0,0,0,0) 58%, rgba(0,0,0,.5) 100%); }`;
    document.head.appendChild(css);
    document.body.innerHTML = '<div id="stage"></div>';
    await Promise.all(['700 100px "Instrument Sans"', 'italic 100px "Instrument Serif"', '400 30px "Geist Mono"', '700 30px "Geist Mono"', '700 100px "Big Shoulders"'].map((f) => document.fonts.load(f)));
    gsap.registerPlugin(CustomEase); CustomEase.create('swiss', 'M0,0 C0.7,0 0.2,1 1,1');

    const E = (tag, attrs = {}, parent) => { const e = document.createElementNS(NS, tag); for (const k in attrs) e.setAttribute(k, attrs[k]); if (parent) parent.appendChild(e); return e; };
    const Hh = (html, parent) => { const t = document.createElement('template'); t.innerHTML = html.trim(); const e = t.content.firstElementChild; if (parent) parent.appendChild(e); return e; };
    const clamp = gsap.utils.clamp;
    let seed = opts.seed || 7; const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
    const st = document.getElementById('stage');
    const tl = gsap.timeline({ paused: true, defaults: { ease: 'swiss' } });
    const life = [];                                                     // per-frame functions: seek() skips onUpdate
    const SFX = []; const sfx = (t, type, g = 1, d) => SFX.push({ t: +Math.max(0, t).toFixed(3), type, g, d }); window.SFX = SFX;
    const mctx = document.createElement('canvas').getContext('2d');
    const monoW = (size, w = 700) => { mctx.font = `${w} ${size}px "Geist Mono"`; return mctx.measureText('0').width; };
    const CX = W / 2, CY = H / 2;

    /* ---------- background: blueprint micro-grid + Swiss columns + slow construction circles + drifting glow */
    const bg = E('svg', { width: W, height: H }, st);
    for (let x = 0; x <= W; x += 40) E('line', { x1: x, x2: x, y1: 0, y2: H, stroke: 'rgba(111,152,200,.05)', 'stroke-width': 1 }, bg);
    for (let y = 0; y <= H; y += 40) E('line', { x1: 0, x2: W, y1: y, y2: y, stroke: 'rgba(111,152,200,.05)', 'stroke-width': 1 }, bg);
    const colW = (W - 2 * M) / 12;
    for (let k = 0; k <= 12; k++) E('line', { x1: M + k * colW, x2: M + k * colW, y1: 0, y2: H, stroke: 'rgba(240,230,214,.03)', 'stroke-width': 2 }, bg);
    const cons = E('g', {}, bg);
    [200, 400, 600, 800].forEach((r, i) => E('circle', { cx: CX, cy: CY, r, fill: 'none', stroke: 'rgba(111,152,200,.065)', 'stroke-width': 2, 'stroke-dasharray': i % 2 ? '4 14' : 'none' }, cons));
    for (let a = 0; a < 12; a++) { const qq = a * Math.PI / 6; E('line', { x1: CX, y1: CY, x2: CX + Math.cos(qq) * 1100, y2: CY + Math.sin(qq) * 1100, stroke: 'rgba(111,152,200,.045)', 'stroke-width': 1.5 }, cons); }
    const glow = Hh('<div class="abs" style="width:1200px;height:1200px;border-radius:50%;background:radial-gradient(circle,rgba(201,98,31,.11) 0%,rgba(146,48,63,.05) 40%,rgba(146,48,63,0) 66%)"></div>', st);
    life.push((t) => { cons.setAttribute('transform', `rotate(${t * 2} ${CX} ${CY})`); glow.style.transform = `translate(${300 + Math.sin(t / 4.1) * 420}px, ${-200 + Math.cos(t / 4.7) * 260}px)`; });

    /* ---------- camera: #world (graphics) moves fully, #words (type) moves × k → parallax depth */
    const camEl = Hh('<div id="cam"></div>', st), world = Hh('<div id="world"></div>', camEl);
    const tcamEl = Hh('<div id="tcam"></div>', st), words = Hh('<div id="words"></div>', tcamEl);
    gsap.set([camEl, tcamEl], { filter: 'blur(0px)' });
    const K = (v, k) => { const o = {}; for (const key in v) { const x = v[key]; o[key] = typeof x !== 'number' ? x : key === 'scale' ? 1 + (x - 1) * k : x * k; } return o; };
    const ORG = `${CX}px ${CY}px`;
    // cam(at, dur, from, to): rotationX/Y/Z, x, y, z, scale. k = how much the type follows (0 = type stays still).
    // Set origin to the point you zoom into, and only change it while scale is 1.
    function cam(at, dur, from, to, ease = 'power2.inOut', k = .3, origin = ORG) {
      tl.fromTo(world, { ...from, transformOrigin: origin }, { ...to, transformOrigin: origin, duration: dur, ease, immediateRender: false }, at);
      tl.fromTo(words, { ...K(from, k), transformOrigin: origin }, { ...K(to, k), transformOrigin: origin, duration: dur, ease, immediateRender: false }, at);
    }
    function camSet(v, k = .3, origin = ORG) { gsap.set(world, { ...v, transformOrigin: origin }); gsap.set(words, { ...K(v, k), transformOrigin: origin }); }
    const layer = (par) => Hh('<div class="layer"></div>', par);
    const scene = (visible = false) => { const s = { g: layer(world), w: layer(words) }; s.svg = E('svg', { width: W, height: H }, s.g); s.tsvg = E('svg', { width: W, height: H }, s.w); if (!visible) gsap.set([s.g, s.w], { autoAlpha: 0 }); return s; };
    // whip cut: blur the camera out, swap scenes, blur in (+ whoosh). Pair it with a cam() that arrives from x ±300, rotationY ∓24.
    function cut(at, a, b) {
      tl.to([camEl, tcamEl], { filter: 'blur(18px)', duration: .14, ease: 'power2.in' }, at - .14);
      if (a) tl.set([a.g, a.w], { autoAlpha: 0 }, at);
      tl.set([b.g, b.w], { autoAlpha: 1 }, at);
      tl.to([camEl, tcamEl], { filter: 'blur(0px)', duration: .26, ease: 'power2.out' }, at);
      sfx(at - .2, 'whoosh', 1);
    }

    /* ---------- drawing helpers */
    const P = (o, u, v, z) => [o[0] + .866 * (u - v), o[1] + .5 * (u + v) - z];                  // true isometric
    const pts = (a) => a.map((p) => p.map((n) => n.toFixed(1)).join(',')).join(' ');
    const poly = (a, fill, par, extra = {}) => E('polygon', { points: pts(a), fill, stroke: fill, 'stroke-width': .7, ...extra }, par);
    function box(par, o, u, v, du, dv, h, tone = TONE.steel) {                                      // iso box: 3 tones, no outlines
      const g = E('g', {}, par);
      poly([P(o, u, v + dv, h), P(o, u + du, v + dv, h), P(o, u + du, v + dv, 0), P(o, u, v + dv, 0)], tone[1], g);
      poly([P(o, u + du, v, h), P(o, u + du, v + dv, h), P(o, u + du, v + dv, 0), P(o, u + du, v, 0)], tone[2], g);
      poly([P(o, u, v, h), P(o, u + du, v, h), P(o, u + du, v + dv, h), P(o, u, v + dv, h)], tone[0], g);
      return g;
    }
    function isoFloor(par, o, u0, u1, v0, v1, step = 40) {
      poly([P(o, u0, v0, 0), P(o, u1, v0, 0), P(o, u1, v1, 0), P(o, u0, v1, 0)], TONE.ground, par);
      for (let k = u0; k <= u1; k += step) E('polyline', { points: pts([P(o, k, v0, 0), P(o, k, v1, 0)]), stroke: 'rgba(111,152,200,.16)', 'stroke-width': 1.5, fill: 'none' }, par);
      for (let k = v0; k <= v1; k += step) E('polyline', { points: pts([P(o, u0, k, 0), P(o, u1, k, 0)]), stroke: 'rgba(111,152,200,.16)', 'stroke-width': 1.5, fill: 'none' }, par);
    }
    // iso server tower with rack lines + blinking LEDs (LEDs animate per frame)
    function isoServer(par, o, size = 150, h = 360, tone = TONE.steel) {
      const g = E('g', {}, par); box(g, o, 0, 0, size, size, h, tone); const leds = [];
      for (let z = 28; z < h - 10; z += 32) {
        E('polyline', { points: pts([P(o, 0, size, z), P(o, size, size, z)]), stroke: '#1A2338', 'stroke-width': 3, fill: 'none' }, g);
        E('polyline', { points: pts([P(o, size, 0, z), P(o, size, size, z)]), stroke: '#141B2B', 'stroke-width': 3, fill: 'none' }, g);
        for (let b = 14; b < size - 8; b += 17) { const p = P(o, size, b, z + 14); leds.push(E('circle', { cx: p[0], cy: p[1], r: 3.2, fill: rnd() < .4 ? C.or2 : C.bp }, g)); }
      }
      life.push((t) => leds.forEach((l, i) => { l.style.opacity = Math.sin(t * 7 + i * 2.3) > -.1 ? 1 : .2; }));
      return { g, leds };
    }
    // iso package cube with a label on its left face (npm/PyPI package, dependency)
    function isoPackage(par, o, label, tone = TONE.cof, s = 90) {
      const g = box(par, o, 0, 0, s, s, s, tone);
      const f = P(o, 0, s, s * .62);
      const t = E('text', { transform: `translate(${f[0] + 10} ${f[1]}) matrix(.866 .5 0 1 0 0)`, style: `font:700 ${Math.round(s * .2)}px "Geist Mono";fill:${C.ink};letter-spacing:1px` }, g); t.textContent = label;
      E('polyline', { points: pts([P(o, s / 2, 0, s), P(o, s / 2, s, s)]), stroke: 'rgba(240,230,214,.35)', 'stroke-width': 4, fill: 'none' }, g);   // tape
      return g;
    }
    let uid = 0;
    // text on a circle, spacing computed so it closes exactly. parts = [[text, css], ...]. Spin with .spin(deg) in life.
    function ringText(par, cx, cy, r, parts, size, weight = 700) {
      const id = 'rp' + (uid++), g = E('g', {}, par);
      E('path', { id, d: `M ${cx - r} ${cy} a ${r} ${r} 0 1 1 ${2 * r} 0 a ${r} ${r} 0 1 1 ${-2 * r} 0`, fill: 'none' }, g);
      const n = parts.reduce((a, p) => a + p[0].length, 0), ls = (2 * Math.PI * r - n * monoW(size, weight)) / n;
      const tx = E('text', { style: `font:${weight} ${size}px "Geist Mono";letter-spacing:${ls.toFixed(2)}px` }, g);
      const tp = E('textPath', { href: '#' + id }, tx);
      const spans = parts.map(([s, c]) => { const sp = E('tspan', { style: c }, tp); sp.textContent = s; return sp; });
      return { g, spans, spin: (deg) => g.setAttribute('transform', `rotate(${deg} ${cx} ${cy})`) };
    }
    // text along any path (arc, wave, spiral)
    function pathText(par, d, text, css, offset = '50%') {
      const id = 'pp' + (uid++), g = E('g', {}, par); E('path', { id, d, fill: 'none' }, g);
      const tx = E('text', { style: css }, g); E('textPath', { href: '#' + id, startOffset: offset, 'text-anchor': offset === '50%' ? 'middle' : 'start' }, tx).textContent = text;
      return g;
    }
    function draw(el, at, dur, ease = 'power2.inOut') {                                              // draw-on by dash offset
      const len = el.getTotalLength(); gsap.set(el, { attr: { 'stroke-dasharray': `${len} ${len}`, 'stroke-dashoffset': len } });
      tl.to(el, { attr: { 'stroke-dashoffset': 0 }, duration: dur, ease }, at);
    }
    const arcD = (cx, cy, r, a0, a1) => { const l = (a1 - a0) > Math.PI ? 1 : 0; return `M ${cx + r * Math.cos(a0)} ${cy + r * Math.sin(a0)} A ${r} ${r} 0 ${l} 1 ${cx + r * Math.cos(a1)} ${cy + r * Math.sin(a1)}`; };
    const hide = (...els) => gsap.set(els.flat(), { autoAlpha: 0 });
    const pop = (el, at, from = { scale: 1.5, rotation: 8 }, dur = .38) => tl.fromTo(el, { autoAlpha: 0, ...from }, { autoAlpha: 1, scale: 1, rotation: gsap.getProperty(el, 'rotation') || 0, duration: dur, ease: 'power4.out', immediateRender: false }, at);
    const slide = (el, at, dx = -60, dy = 0, dur = .5) => tl.fromTo(el, { autoAlpha: 0, x: dx, y: dy }, { autoAlpha: 1, x: 0, y: 0, duration: dur, ease: 'power3.out', immediateRender: false }, at);
    const out = (el, at, d = .3) => tl.to(el, { autoAlpha: 0, duration: d, ease: 'power2.in' }, at);
    const show = (el, at, d = .4) => tl.fromTo(el, { autoAlpha: 0 }, { autoAlpha: 1, duration: d, immediateRender: false }, at);

    /* ---------- type elements (HTML, live in a scene's .w layer) */
    // slab: flat block + hard shadow. opts: left/top/right, bg, color, shadow, rot, border
    function slab(par, html, o = {}) {
      const pos = ['left', 'top', 'right', 'bottom'].filter((k) => o[k] != null).map((k) => `${k}:${o[k]}px`).join(';');
      const el = Hh(`<div class="slab" style="${pos};background:${o.bg || C.or};color:${o.color || C.bg};box-shadow:${o.sh ?? 14}px ${o.sh ?? 14}px 0 ${o.shadow || C.mar};${o.border ? `border:4px solid ${o.border};` : ''}${o.css || ''}">${html}</div>`, par);
      gsap.set(el, { rotation: o.rot || 0 }); hide(el); return el;
    }
    // row of boxed characters (numbers, keys, hashes). Returns the cells.
    function cells(par, str, o = {}) {
      const w = o.w || 60, h = o.h || 100, g = o.gap ?? 6, x0 = o.left ?? (W - (str.length * (w + g) - g)) / 2;
      const row = Hh(`<div class="abs" style="left:0;top:${o.top || 200}px;width:${W}px;height:${h}px"></div>`, par);
      const cs = [...str].map((d, i) => Hh(`<div class="cell bs" style="left:${x0 + i * (w + g)}px;top:0;width:${w}px;height:${h}px;font-size:${o.size || h * .8}px;${(o.css || (() => ''))(i, d)}">${d}</div>`, row));
      hide(cs); return { row, cells: cs };
    }
    // code panel. lines = strings with simple markup: <k>keyword</k> <s>string</s> <c>comment</c> <f>func</f>. o.hot = [line numbers to flag]
    function codePanel(par, title, lines, o = {}) {
      const el = Hh(`<div class="code" style="left:${o.left ?? M}px;top:${o.top ?? 200}px;width:${o.width || 860}px;font-size:${o.size || 30}px"><div class="bar"><i></i><i></i><i></i><span style="margin-left:10px">${title}</span></div></div>`, par);
      const ls = lines.map((s, i) => Hh(`<div class="ln${(o.hot || []).includes(i + 1) ? '' : ''}" data-n="${i + 1}">${s.replace(/<(\/?)([kscf])>/g, (m, c, t) => c ? '</span>' : `<span class="${t}">`) || ' '}</div>`, el));
      hide(el); return { el, lines: ls };
    }
    // type the lines in one by one (clip reveal, left to right) + key clicks
    function typeCode(p, at, perLine = .22) {
      show(p.el, at, .25);
      p.lines.forEach((ln, i) => { const t0 = at + .2 + i * perLine; tl.fromTo(ln, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: perLine * .9, ease: 'none', immediateRender: false }, t0); sfx(t0, 'type', .45); });
      gsap.set(p.lines, { clipPath: 'inset(0 100% 0 0)' });
    }
    const flagLine = (p, n, at) => { tl.fromTo(p.lines[n - 1], { backgroundColor: 'rgba(217,72,59,0)', boxShadow: 'inset 0px 0 0 #D9483B' }, { backgroundColor: 'rgba(217,72,59,.22)', boxShadow: 'inset 8px 0 0 #D9483B', duration: .3, immediateRender: false }, at); sfx(at, 'pop', .7); };
    // Tabler outline icon (5,000+ in the material repo): await icon(par, 'lock', {x, y, size, color, stroke})
    async function icon(par, name, o = {}) {
      const txt = await (await fetch(ICONS + name + '.svg')).text();
      const g = E('g', { transform: `translate(${o.x || 0} ${o.y || 0}) scale(${(o.size || 96) / 24})` }, par);
      g.innerHTML = txt.replace(/<!--[\s\S]*?-->/, '').replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '');
      g.setAttribute('fill', 'none'); g.setAttribute('stroke', o.color || C.ink); g.setAttribute('stroke-width', o.stroke || 1.6);
      g.setAttribute('stroke-linecap', 'round'); g.setAttribute('stroke-linejoin', 'round');
      return g;
    }
    // number that counts between a and b (per frame). fmt(n) → string
    function counter(el, from, to, a, b, fmt = (n) => Math.round(n).toLocaleString('en-US'), ease = 'power2.out') {
      const e = gsap.parseEase(ease); life.push((t) => { el.textContent = fmt(from + (to - from) * e(clamp(0, 1, (t - a) / (b - a)))); });
      sfx(a, 'roll', .5, Math.max(.3, b - a));
    }
    // rotated rubber stamp (PROVEN 1761 / PATCHED / LEAKED)
    function stamp(par, top, big, bottom, o = {}) {
      const col = o.color || C.or2;
      const el = Hh(`<div class="abs" style="left:${o.left ?? M}px;top:${o.top ?? 200}px;border:8px solid ${col};padding:14px 22px 20px;background:rgba(21,26,38,.88);color:${col}">
          <div class="mono" style="font-size:26px">${top}</div><div class="bs" style="font-size:${o.size || 170}px;margin:8px 0 6px">${big}</div>
          <div class="mono" style="font-size:22px;color:${C.ink}">${bottom}</div></div>`, par);
      gsap.set(el, { rotation: o.rot ?? -7 }); hide(el); return el;
    }

    /* ---------- HUD, captions, grain + the seek function. Call last. */
    function finish() {
      tl.to({}, { duration: Math.max(0, END - tl.duration()) });
      Hh(`<div class="abs" style="left:0;top:0;width:${W}px;height:150px;background:linear-gradient(180deg,rgba(23,32,54,.9) 0%,rgba(23,32,54,.8) 70%,rgba(23,32,54,0) 100%)"></div>`, st);
      const ch = opts.chapter || { n: 1, total: 1, title: '' };
      const lab = Hh(`<div class="abs hud" style="left:${M}px;top:58px">${String(ch.n).padStart(2, '0')} — ${ch.title}</div>`, st);
      Hh(`<div class="abs hud" style="right:${M}px;top:58px;color:${C.dim};font-weight:400">${String(ch.n).padStart(2, '0')} / ${String(ch.total).padStart(2, '0')}</div>`, st);
      const pbar = Hh(`<div class="abs" style="left:${M}px;top:100px;width:${W - 2 * M}px;height:5px;background:rgba(240,230,214,.14)"><b style="display:block;height:100%;width:0;background:${C.or}"></b></div>`, st).firstElementChild;
      const cap = Hh('<div id="cap"><span></span></div>', st), capS = cap.firstElementChild;
      const chunks = SC.lines.flatMap((l) => l.chunks);
      const lastEnd = SC.lines[SC.lines.length - 1].end;
      const grain = Hh('<div id="grain"></div>', st); Hh('<div id="vig"></div>', st);
      if (!(opts.grain || new URLSearchParams(location.search).get('grain'))) grain.style.display = 'none';   // render adds grain in ffmpeg
      const cv = document.createElement('canvas'); cv.width = cv.height = 220; const g2 = cv.getContext('2d'), im = g2.createImageData(220, 220);
      for (let k = 0; k < im.data.length; k += 4) { im.data[k] = im.data[k + 1] = im.data[k + 2] = 255; im.data[k + 3] = rnd() * 255 | 0; }
      g2.putImageData(im, 0, 0); grain.style.backgroundImage = `url(${cv.toDataURL()})`;
      const e3 = gsap.parseEase('power3.out');
      function frame(t) {
        let c = null; for (const x of chunks) if (t >= x.s) c = x;
        const k = e3(clamp(0, 1, (c ? t - c.s : 0) / .2)), on = c && t < lastEnd + .3 && opts.captions !== false;
        capS.textContent = on ? c.t : ''; capS.style.visibility = on ? 'visible' : 'hidden';
        cap.style.opacity = k; cap.style.transform = `translateY(${(1 - k) * 14}px)`;
        pbar.style.width = (100 * clamp(0, 1, t / END)) + '%';
        life.forEach((f) => f(t));
        const fr = Math.floor(t * 30); grain.style.transform = `translate(${(fr * 37) % 40}px, ${(fr * 53) % 40}px)`;
      }
      window.TL = tl; window.seek = (t) => { tl.seek(t, false); frame(t); };
      window.seek(0); window.READY = true;
    }

    return { W, H, M, CX, CY, C, TONE, SC, L, T, wt, END, tl, st, world, words, life, sfx, rnd, clamp, E, H: Hh, P, pts, poly, box, isoFloor, isoServer, isoPackage,
             ringText, pathText, draw, arcD, hide, pop, slide, out, show, slab, cells, codePanel, typeCode, flagLine, icon, counter, stamp,
             cam, camSet, scene, cut, monoW, finish };
  };
})();
