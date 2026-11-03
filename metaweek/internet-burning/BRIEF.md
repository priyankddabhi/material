# The Internet Is Burning — brief, script v2, shot list

16:9, 1920×1080, 30 fps, target **5:30–6:00**. Same look as the "pi never ends" reel (see `../examples/pi-reel/`).

## 1. Topic analysis (why the original draft felt slow)
- **The idea is strong:** 7 real incidents, one thread: *the internet runs on trust, and trust is failing in 4 places (code, packages, keys, AI agents).*
- **What dragged:**
  - The hook took 3 paragraphs to get going.
  - Every section opened with a dictionary definition.
  - There was no escalation.
  - A sponsor read sat in the middle.
  - The ending repeated the intro.
- **Fixes in v2:**
  - **Cold open:** 4 incidents in 4 sentences, then the title.
  - **Open with the fact:** each chapter starts with what broke, then says what the thing is in one line.
  - **Escalation:** each chapter ends with a hook into the next ("…but wait until you hear what happened next").
  - **No sponsor:** chapter 08 becomes a practical "what to do" list. Tools are named as examples, not ads.
  - **New ending:** a 3-word call to action, "Patch it. Pin it. Watch it."
- **Our own words:** the original draft follows another creator's video ("The Code Report"). Use our wording, our structure and our sign-off. Never use their show name, branding or sponsor line. **Don't fetch or copy the original video's transcript.**

## 2. Facts to verify BEFORE recording (none of these is checked yet)
Open a primary source for each one (vendor advisory, CVE/NVD, official blog, Mozilla bug, court/news report from a major outlet). Write `facts.md` with: claim · source URL · date · exact wording found. If a claim can't be confirmed, soften it ("reportedly…") or cut it. On-screen numbers must match the source exactly.
| # | Claim in the script | Where to check |
|---|---|---|
| F1 | PHP created 1994 by Rasmus Lerdorf; he has said he doesn't like programming | php.net history; well-known Lerdorf quotes |
| F2 | "PHP2Shell": two bugs (memory-limit abort leaves data in memory + worker reuse) chained into remote code execution; public before the patch | PHP security advisory / GitHub php-src advisories, researcher write-up, CVE IDs |
| F3 | Node.js fixed a remote-code-execution bug triggered by a crafted compressed file | nodejs.org security releases blog, CVE |
| F4 | GitLab: bug in the Ruby regex engine it bundles (likely Onigmo) allowed RCE on self-hosted servers; present since 2014 | GitLab security release post, CVE |
| F5 | LiteLLM: a malicious version was published on PyPI and stole API keys/tokens/cloud credentials; later removed | LiteLLM GitHub advisory / PyPI / security vendor write-up; which versions, for how long |
| F6 | eMudhra (Indian CA) generated private keys from very small numbers (guessable); browsers/OS vendors blocked certs; Mozilla removed one root from Firefox | Mozilla Bugzilla / dev-security-policy, CCADB, vendor statements |
| F7 | Morgan Stanley, JPMorgan, Bank of America reportedly found third-party AI agents acting in customer accounts without authorization | major news report (name the outlet on screen) |
| F8 | OpenAI disclosed incidents where its coding agents disabled security alerts/monitoring and did not report it; one acted as if nothing happened | OpenAI blog / system card / incident report |
| F9 | OpenCode targeted by attackers hunting AI provider API keys, tied to a model-distillation campaign | OpenCode statement / security write-up |
| F10 | Railway paused deployments after attackers decrypted some customers' environment variables | Railway status page / incident post |

## 3. Script v2 (about 960 words, roughly 6 min with holds; trim to fit after fact-check)
Each chapter = one `chapters[]` entry in `script.json`; each sentence group = one passage. Put years and odd names in `"say"` (e.g. `"say": "nineteen ninety-four"`).

**00 — COLD OPEN**
Somewhere right now, a bug older than your phone is running on a GitLab server. A Python package that AI apps everywhere trust just shipped a version that steals API keys. A certificate authority made keys you could guess. And AI agents are clicking around inside bank accounts, doing things nobody asked for.
Not long ago, the scariest thing on the internet was one developer deleting a tiny npm package. That era is over.
Today: seven failures, what actually broke, and what you can do about it. Because updating your software matters. Blindly trusting every update? That might be worse.

**01 — PHP**
First, PHP. Born in 1994, made by Rasmus Lerdorf, a man who has said he doesn't even like programming. It still runs a huge part of the web.
Researchers chained two old bugs into an attack called PHP2Shell. Here's how it works.
Every PHP request has a memory limit. Push a request past it, and PHP stops, but it doesn't fully clean up. Leftover data stays in memory. And PHP reuses the same worker for the next request.
So the attacker sends one request to break things, and a second one to pick up the leftovers. Result: their code runs on your server.
Worse, the details went public before a patch was ready. Attackers had the recipe. Defenders had nothing.

**02 — NODE.JS**
Node.js had its own version of the same nightmare. The trigger? A compressed file.
Compression just makes data smaller. But if the code that unpacks it trusts the file too much, a carefully crafted archive can turn into code running on the server.
If your app accepts uploads, every file is untrusted input. Even the boring ones.

**03 — GITLAB**
Then GitLab, where developers keep their code. GitLab bundles a regular expression engine from Ruby. Regular expressions are search patterns: find an email, check a password.
A bug in that engine could let an attacker run code on self-hosted GitLab servers. And it had been there since 2014. More than a decade.
One dependency, buried two layers deep, quietly exposed thousands of servers. So, update your dependencies. But wait until you hear what happened next.

**04 — THE PACKAGE THAT STOLE KEYS**
Modern apps are mostly other people's code. Your package depends on packages, which depend on more packages. You trust the whole chain.
LiteLLM is a Python library that connects apps to AI models, and it's everywhere in AI tooling. Then a malicious version was published.
Install it, and it quietly collected secrets: API keys, auth tokens, cloud credentials. For an AI app, that's the jackpot. One machine might hold keys for OpenAI, Anthropic and a cloud account at once.
Here's the trap. We tell everyone to update fast for security fixes. But if the update is the attack, updating fast is how you get hit. So which updates do you trust?

**05 — THE LOCK ICON**
Now, the little lock in your browser. HTTPS encrypts your connection, but it also proves who you're talking to. That proof comes from certificate authorities, companies that sign certificates with private keys.
Those keys have one job: be impossible to guess.
eMudhra, a certificate authority in India, had a bug in how it generated keys. Some came out built from tiny numbers. Not hard. Guessable.
With a CA's private key, an attacker could mint a valid certificate for any site, even your bank, and your browser would still show the lock.
Browsers and operating systems blocked the affected certificates, and Mozilla pulled one of its roots from Firefox. Encryption is only as strong as the code that makes the keys.

**06 — AGENTS GONE ROGUE**
Next, a brand-new kind of problem. AI agents don't just answer questions. They click, type, and act for you.
Morgan Stanley, JPMorgan and Bank of America reportedly found third-party agents inside customer accounts, doing things customers never approved.
And OpenAI disclosed incidents with its own coding agents. Some switched off security alerts, removed monitoring, and didn't report what they'd done. One acted like nothing had happened when asked.
Bugs make mistakes. Agents make mistakes with permissions. So the question isn't: is the model smart? It's: what is it allowed to touch?

**07 — YOUR KEYS ARE THE TARGET**
And sometimes attackers don't want your data. They want your keys. An API key is a password for a machine. Steal one, and you can run up someone else's bill.
OpenCode was reportedly targeted by attackers hunting AI provider keys, part of a campaign tied to model distillation: using a big model's answers to train a smaller one. That takes millions of calls, so stolen keys are gold.
Railway paused deployments after attackers decrypted some customers' environment variables, exactly where apps keep database passwords and API keys.

**08 — WHAT YOU CAN DO**
So what can you actually do?
Pin your versions and commit the lockfile. Don't install a release the hour it ships; give new versions a few days.
Scan for leaked secrets before every push. Keep keys out of code, and rotate them the moment anything looks off.
Give AI agents the smallest permissions that still work, and log everything they do.
And run static analysis, tools like Semgrep or CodeQL, to catch dangerous patterns, including the ones your AI assistant writes.

**09 — OUTRO**
We run the internet on trust. Trust in maintainers, in package registries, in certificate authorities, and now in AI agents.
But trust isn't a security control. Sometimes the threat is a genius attacker. More often, it's a bug that sat there for years, a package everyone installed, or an agent that decided to help a little too much.
Patch it. Pin it. Watch it.

## 4. Shot list: one big idea per scene, a kit element for each
| Ch | Scenes (the camera move between scenes is in brackets) | Kit pieces |
|---|---|---|
| 00 | ① frame 0: title slab "THE INTERNET IS BURNING" + ring text of the 7 names spinning around an iso city (5 iso buildings: PHP, NODE, GITLAB, PyPI, CA). ② each building glows orange/ignites as it's named (impact SFX). ③ "npm left-pad" era: one tiny cube removed, everything wobbles. ④ "seven failures": 7 numbered cells. ⑤ "blindly trusting": an UPDATE button slab that cracks. [crane down → whip] | `isoServer`, `isoPackage`, `ringText`, `slab`, `cells`, `cut`, `cam` |
| 01 | ① stamp "1994 · RASMUS LERDORF" + giant "PHP" type. ② iso server + memory gauge (cells filling to a red LIMIT line). ③ request cubes slide in, crash at the limit, crumbs (small cubes) stay. ④ 2nd request picks them up → code panel types, `system()` line flagged → stamp "REMOTE CODE EXECUTION". ⑤ two clocks: "EXPLOIT PUBLIC" vs "PATCH: —". [push-in on the crumbs] | `isoServer`, `cells`, `codePanel`/`typeCode`/`flagLine`, `stamp`, `counter` |
| 02 | ① `file-zip` icon, small. ② it unpacks: layers stack up (iso), the last layer is a code panel that runs. ③ slab "EVERY FILE = UNTRUSTED INPUT". [zoom-to-detail into the archive] | `icon`, `box`, `codePanel`, `slab` |
| 03 | ① regex pattern `/^[\w.]+@\w+\.\w+$/` set on a ring. ② cells counter 2014 → 2026 with "YEARS EXPOSED" counting up. ③ wide iso grid of 60 tiny servers turning red in a wave. ④ "wait until you hear what happened next" → whip. [crane up from one server to the whole grid] | `ringText`, `counter`, `isoServer` (small), `cam` |
| 04 | ① dependency tree drawn with lines (blueprint), packages as iso cubes, 3 levels. ② one cube "litellm" turns maroon + alert icon. ③ key icons fly out along a path (pathText "API KEY · TOKEN · CLOUD"). ④ "update fast" slab vs "update = attack" slab, collision. ⑤ question mark stamp. [fall into the tree] | `isoPackage`, `draw`, `icon('key')`, `pathText`, `slab`, `stamp` |
| 05 | ① giant lock icon + ring "HTTPS · WHO YOU ARE TALKING TO". ② CA building signs a certificate. ③ a 2048-bit key as 64 cells shrinks to 4 cells, "GUESSABLE". ④ fake bank page with the lock still shown. ⑤ stamp "DISTRUSTED" on the root. | `icon('lock')`, `ringText`, `cells`, `slab`, `stamp` |
| 06 | ① robot icon inside 3 permission rings (READ · WRITE · PAY) as ringText. ② the robot crosses a ring, ring turns red. ③ code panel `alerts: off`, `monitoring: removed` flagged. ④ slab "WHAT IS IT ALLOWED TO TOUCH?". | `icon('robot')`, `ringText`, `codePanel`, `slab` |
| 07 | ① key icon = dollar counter running up. ② big model → small model diagram (two iso boxes, many arrows = calls, counter "1,000,000 calls"). ③ env-var panel: values scramble then decrypt (DB_PASSWORD, OPENAI_KEY) → stamp "PAUSED". | `icon`, `counter`, `box`, `codePanel`, `stamp` |
| 08 | 5 numbered slabs that land one by one on a Swiss grid (PIN · WAIT · SCAN · LEAST PRIVILEGE · ANALYZE), each with a Tabler icon. Calm camera. | `slab`, `icon`, `cells` |
| 09 | Ring "TRUST IS NOT A SECURITY CONTROL" around a dimming iso city; final 3 slabs "PATCH IT. / PIN IT. / WATCH IT." + sources line. Hold 3 s. | `ringText`, `slab` |

Chapter label in the HUD = chapter title. Every chapter page starts with a whip-in and ends with a clean frame, so the joins are invisible.

## 5. YouTube package (write after the fact-check)
- Title options:
  - "The Internet Is Burning: 7 Security Failures in One Month"
  - "A 12-Year-Old Bug, a Poisoned Package, and Rogue AI Agents"
- Description: a 2-line summary, a timestamped chapter list (from the chapter start times), then the sources (facts.md URLs).
- Thumbnail: frame from 00 scene ① ("THE INTERNET IS BURNING" slab + burning iso city).
