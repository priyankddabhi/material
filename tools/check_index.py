"""Keep the router files honest. Run after adding, moving or removing anything:
    python tools/check_index.py
1. Every markdown link and every `path/` in backticks in our own docs must point to something that exists.
2. Every folder (2 levels deep) must be mentioned in README.md, INDEX.md or its parent's README.md.
Exit code 1 if anything is wrong, so it can also run in CI."""
import os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TOPS = ("guides", "skills", "assets", "libraries", "catalog", "tools")
os.chdir(ROOT)
sys.stdout.reconfigure(encoding="utf-8")

# our own docs (third-party copies under skills/ and libraries/ keep their own links; only their top README is ours)
docs = [f for f in os.listdir(".") if f.endswith(".md")]
for top in TOPS:
    if os.path.exists(os.path.join(top, "README.md")): docs.append(os.path.join(top, "README.md"))
for d, ds, fs in os.walk("guides"):
    ds[:] = [x for x in ds if x not in ("node_modules", "build", "kokoro", "examples")]
    docs += [os.path.join(d, f) for f in fs if f.endswith(".md")]
docs += [os.path.join("catalog", f) for f in os.listdir("catalog") if f.endswith(".md")]
docs = sorted(set(os.path.normpath(p) for p in docs))

broken = []
for doc in docs:
    text = open(doc, encoding="utf-8").read()
    base = os.path.dirname(doc)
    for m in re.finditer(r"\]\(([^)\s]+)\)", text):
        link = m.group(1).split("#")[0]
        if not link or re.match(r"^[a-z]+:", link): continue
        if not os.path.exists(os.path.normpath(os.path.join(base, link))): broken.append((doc, link))
    if doc == "SOURCES.md" or doc.startswith("catalog"): continue    # those name paths inside OTHER repos
    for m in re.finditer(r"`([^`\s<>*]+)`", text):                   # `guides/x/y.md` style paths, from the repo root
        p = m.group(1).rstrip("/")
        if set(p.split("/")) & {"kokoro", "build", "node_modules"}: continue   # made locally, git-ignored
        if p.split("/")[0] in TOPS and "/" in p and not os.path.exists(p) and not os.path.exists(os.path.join(base, p)):
            broken.append((doc, m.group(1)))

mentioned = open("README.md", encoding="utf-8").read() + open("INDEX.md", encoding="utf-8").read()
unindexed = []
for top in TOPS:
    if not os.path.isdir(top): unindexed.append(top + "/ (missing)"); continue
    for sub in sorted(os.listdir(top)):
        if not os.path.isdir(os.path.join(top, sub)) or sub in ("node_modules", "__pycache__"): continue
        parent = os.path.join(top, "README.md")
        local = open(parent, encoding="utf-8").read() if os.path.exists(parent) else ""
        if f"{sub}/" not in mentioned and f"{sub}/" not in local: unindexed.append(f"{top}/{sub}/")

print(f"checked {len(docs)} docs")
for doc, link in broken: print(f"BROKEN   {doc}: {link}")
for p in unindexed: print(f"UNLISTED {p}  (add it to README.md / INDEX.md / {p.split('/')[0]}/README.md)")
print("OK" if not broken and not unindexed else f"{len(broken)} broken, {len(unindexed)} unlisted")
sys.exit(1 if broken or unindexed else 0)
