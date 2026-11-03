// Quick look: node shots.mjs <t1,t2,...>  → shots/<t>.png.   Full: node shots.mjs full  → silent.mp4 + sfx.json
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url)), ROOT = path.resolve(HERE, '../..');   // D:\dabhim\timepass\claude
const { chromium } = createRequire(path.join(ROOT, 'fb-templates/package.json'))('playwright-core');
const FPS = 30, WORKERS = 4;
const [arg = '1,3'] = process.argv.slice(2);
const server = http.createServer((req, res) => {
  const p = path.join(ROOT, decodeURIComponent(new URL(req.url, 'http://x').pathname));
  if (!p.startsWith(path.normalize(ROOT)) || !fs.existsSync(p) || fs.statSync(p).isDirectory()) { res.writeHead(404); return res.end(); }
  const T = { '.html': 'text/html', '.js': 'text/javascript', '.json': 'application/json', '.png': 'image/png', '.ttf': 'font/ttf' };
  res.writeHead(200, { 'Content-Type': T[path.extname(p)] || 'application/octet-stream' });
  fs.createReadStream(p).pipe(res);
});
await new Promise((r) => server.listen(0, '127.0.0.1', r));
const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
async function open() {
  const page = await browser.newPage({ viewport: { width: 1080, height: 1920 } });
  page.on('pageerror', (e) => console.log('PAGE ERROR:', e.message));
  page.on('console', (m) => { if (m.type() === 'error') console.log('CONSOLE:', m.text()); });
  await page.goto(`http://127.0.0.1:${server.address().port}/videos/pi/reel.html?dir=/videos/pi/`);
  await page.waitForFunction(() => window.READY === true, null, { timeout: 60000 });
  return page;
}

if (arg === 'full') {
  const frames = path.join(HERE, 'frames');
  fs.rmSync(frames, { recursive: true, force: true }); fs.mkdirSync(frames, { recursive: true });
  const first = await open();
  const n = Math.round((await first.evaluate(() => window.TL.duration())) * FPS);
  fs.writeFileSync(path.join(HERE, 'sfx.json'), JSON.stringify(await first.evaluate(() => window.SFX), null, 1));
  const pages = [first, ...(await Promise.all(Array.from({ length: WORKERS - 1 }, open)))];
  let done = 0;
  await Promise.all(pages.map(async (page, w) => {
    for (let f = w; f < n; f += WORKERS) {
      await page.evaluate((t) => window.seek(t), f / FPS);
      await page.screenshot({ path: path.join(frames, String(f).padStart(4, '0') + '.png') });
      if (++done % 150 === 0) console.log(`  frame ${done} / ${n}`);
    }
  }));
  const out = path.join(HERE, 'silent.mp4');
  const enc = spawnSync('ffmpeg', ['-y', '-loglevel', 'error', '-framerate', String(FPS), '-i', path.join(frames, '%04d.png'), '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '17', '-preset', 'slow', out]);
  if (enc.status !== 0) console.log(enc.stderr.toString());
  fs.rmSync(frames, { recursive: true, force: true });
  console.log('rendered', n, 'frames →', out);
} else {
  const page = await open();
  fs.mkdirSync(path.join(HERE, 'shots'), { recursive: true });
  for (const t of arg.split(',').map(Number)) {
    await page.evaluate((x) => window.seek(x), t);
    await page.screenshot({ path: path.join(HERE, 'shots', `${String(t).replace('.', '_')}.png`) });
  }
  console.log('shots done');
}
await browser.close(); server.close();
