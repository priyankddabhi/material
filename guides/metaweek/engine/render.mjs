// Render a chapter page to frames → MP4 (deterministic: seek every 1/30 s), in parallel browser pages.
//   node render.mjs <project_dir> <chapter_id> 3,7.5,12      → <project>/build/shots/<id>-<t>.png (+ contact sheet)
//   node render.mjs <project_dir> <chapter_id> full [workers] → <project>/build/<id>-silent.mp4 + <id>-sfx.json (resumes if stopped)
//   node render.mjs <project_dir> join                        → <project>/build/final.mp4 (chapters in script.json order, after mix.py)
// The http server serves the MATERIAL REPO ROOT, so pages load fonts/icons/kit from it. The project folder must sit inside the repo.
import http from 'node:http';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright-core';

const ENGINE = path.dirname(fileURLToPath(import.meta.url));
let ROOT = ENGINE; while (!fs.existsSync(path.join(ROOT, 'AGENTS.md')) && path.dirname(ROOT) !== ROOT) ROOT = path.dirname(ROOT);   // material repo root
const [projArg, chId, mode = '1', workersArg] = process.argv.slice(2);
if (!projArg || !chId) { console.log('usage: node render.mjs <project_dir> <chapter_id|join> [times|full] [workers]'); process.exit(1); }
const PROJ = path.resolve(projArg), BUILD = path.join(PROJ, 'build'), FPS = 30;
const rel = path.relative(ROOT, PROJ).split(path.sep).join('/');
if (rel.startsWith('..')) { console.log('project folder must be inside the material repo:', ROOT); process.exit(1); }
fs.mkdirSync(BUILD, { recursive: true });
const ff = (args) => { const r = spawnSync('ffmpeg', ['-y', '-loglevel', 'error', ...args]); if (r.status !== 0) { console.log(r.stderr.toString()); process.exit(1); } };

if (chId === 'join') {
  const S = JSON.parse(fs.readFileSync(path.join(PROJ, 'script.json'), 'utf8'));
  const list = S.chapters.map((c) => path.join(BUILD, c.id + '.mp4'));
  const missing = list.filter((f) => !fs.existsSync(f)); if (missing.length) { console.log('missing (run mix.py first):', missing); process.exit(1); }
  fs.writeFileSync(path.join(BUILD, 'join.txt'), list.map((f) => `file '${f.replace(/\\/g, '/')}'`).join('\n'));
  ff(['-f', 'concat', '-safe', '0', '-i', path.join(BUILD, 'join.txt'), '-c', 'copy', '-movflags', '+faststart', path.join(BUILD, 'final.mp4')]);
  console.log('joined', list.length, 'chapters →', path.join(BUILD, 'final.mp4')); process.exit(0);
}

const server = http.createServer((req, res) => {
  const p = path.join(ROOT, decodeURIComponent(new URL(req.url, 'http://x').pathname));
  if (!p.startsWith(ROOT) || !fs.existsSync(p) || fs.statSync(p).isDirectory()) { res.writeHead(404); return res.end(); }
  const T = { '.html': 'text/html', '.js': 'text/javascript', '.json': 'application/json', '.png': 'image/png', '.svg': 'image/svg+xml', '.ttf': 'font/ttf' };
  res.writeHead(200, { 'Content-Type': T[path.extname(p)] || 'application/octet-stream' }); fs.createReadStream(p).pipe(res);
});
await new Promise((r) => server.listen(0, '127.0.0.1', r));
const CHROME = [process.env.CHROME, 'C:/Program Files/Google/Chrome/Application/chrome.exe', 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', '/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser'].find((p) => p && fs.existsSync(p));
const browser = await chromium.launch({ headless: true, ...(CHROME ? { executablePath: CHROME } : {}) });
const url = `http://127.0.0.1:${server.address().port}/${rel}/chapters/${chId}.html?sched=/${rel}/build/${chId}.json`;
async function open() {
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  page.on('pageerror', (e) => console.log('PAGE ERROR:', e.message));
  page.on('console', (m) => { if (m.type() === 'error' && !/favicon|404/.test(m.text())) console.log('CONSOLE:', m.text()); });
  await page.goto(url); await page.waitForFunction(() => window.READY === true, null, { timeout: 90000 });
  return page;
}

if (mode === 'full') {
  const frames = path.join(BUILD, 'frames-' + chId); fs.mkdirSync(frames, { recursive: true });
  const first = await open();
  const n = Math.round((await first.evaluate(() => window.TL.duration())) * FPS);
  fs.writeFileSync(path.join(BUILD, chId + '-sfx.json'), JSON.stringify(await first.evaluate(() => window.SFX), null, 1));
  const W = +workersArg || Math.max(2, Math.min(8, Math.floor(os.cpus().length / 3)));
  const pages = [first, ...(await Promise.all(Array.from({ length: W - 1 }, open)))];
  const t0 = Date.now(); let done = 0;
  await Promise.all(pages.map(async (page, w) => {
    for (let f = w; f < n; f += W) {
      const file = path.join(frames, String(f).padStart(5, '0') + '.jpg');      // JPEG q92: ~3× faster than PNG, no visible loss after x264
      if (!fs.existsSync(file)) { await page.evaluate((t) => window.seek(t), f / FPS); await page.screenshot({ path: file, type: 'jpeg', quality: 92 }); }
      if (++done % 300 === 0) { const s = (Date.now() - t0) / 1000; console.log(`  ${chId}: ${done}/${n} frames, ~${Math.round(s / done * (n - done) / 60)} min left`); }
    }
  }));
  ff(['-framerate', String(FPS), '-i', path.join(frames, '%05d.jpg'), '-vf', 'noise=alls=5:allf=t', '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '17', '-preset', 'medium', path.join(BUILD, chId + '-silent.mp4')]);
  fs.rmSync(frames, { recursive: true, force: true });
  console.log(`rendered ${n} frames → ${path.join(BUILD, chId + '-silent.mp4')}`);
} else {
  const page = await open(); const dir = path.join(BUILD, 'shots'); fs.mkdirSync(dir, { recursive: true });
  const ts = mode.split(',').map(Number), files = [];
  for (const t of ts) { const f = path.join(dir, `${chId}-${String(t).replace('.', '_')}.png`); await page.evaluate((x) => window.seek(x), t); await page.screenshot({ path: f }); files.push(f); }
  // contact sheet: 3 per row at 640×360
  if (files.length > 1) {
    const n = files.length, inputs = files.flatMap((f) => ['-i', f]);
    const fl = files.map((_, i) => `[${i}:v]scale=640:360[v${i}];`).join('') + files.map((_, i) => `[v${i}]`).join('') + `xstack=inputs=${n}:layout=${files.map((_, i) => `${(i % 3) * 640}_${Math.floor(i / 3) * 360}`).join('|')}:fill=black`;
    ff([...inputs, '-filter_complex', fl, path.join(dir, `${chId}-sheet.png`)]);
  }
  console.log('shots →', dir);
}
await browser.close(); server.close();
