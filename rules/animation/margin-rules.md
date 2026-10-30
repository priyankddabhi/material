# MARGIN RULES — strictly follow for every future video frame / image
Sources: design-engineering repo (cloned 2026-10-29, ~/workspace/design-engineering/), Material 3 layout (m3-layout-notes.md), internet space concepts (space-concepts-notes.md), v4 rating 4/10. This file outranks old habits (e.g. the 96px-everything guess, technical footers, tiny heroes).

## 1. Set the frame FIRST, before any element
- Pick canvas, then set ONE left margin and ONE right margin, equal. Drift between left/right margins must be under 16px, or it is a fail.
- Our project defaults (canvas px, not dp):
  - Vertical phone 1080 wide: margin 96, content width 888.
  - Landscape 1920 wide: margin 96, content width 1728.
- Text must never touch the edge: at least the margin above, in all cases.
- Few left edges: at least 60% of left-aligned text must start on the same 3 edges or fewer.

## 2. Spacing scale — only these numbers, nothing random
- Allowed steps (px): 8, 16, 24, 32, 48, 64, 96, 128, 192.
- Never use 13, 22, 37, 51, etc. If a gap looks wrong, move to the next step, do not invent a number.
- M3 equivalent: 8 dp base, multiples of 8. Phone margin 16 dp, larger screens 24 dp — our 96px canvas margin is a safe, larger equivalent, not a copy of the dp number.

## 3. Grouping — space is the grouping, not boxes/lines
- Gap between groups must be at least 2× the gap inside a group. Example: inner gap 32 → group gap 64 or more.
- Heading: gap above must be larger than gap below. A heading closer to the text above it than below it is a fail.
- Label must sit closer to its own element than to the element above it.
- Related elements move together in animation (common fate). Do not animate group members on scattered timings.

## 4. Fill the frame — no holes
- Hero must be large enough to fill its section. A small hero in a huge black field is a hole, not "minimal".
- No empty run taller than half the screen. No gap between sections over 40% of the screen.
- No half-empty section: if a section looks empty, make its main element bigger or cut it. Never add a decoration to fill it.
- Check at phone size, not only at full width. Landscape video viewed on a vertical phone will letterbox — that is a viewing fact, but the frame itself must still fill its own canvas.

## 5. What NOT to put in a final frame
- No technical footer, no dimension line, no "SCALE / SHEET" block, no "MIX 3" style label. Those make it look like a prototype (v4 rating: professional finish 3/10).
- No more than 3 colours. One accent colour only, on one kind of element.
- One hero per beat/frame. Other elements must be clearly smaller.

## 6. Work loop — mandatory, every time
1. See the code.
2. Render and check the VISUAL (frames, and at phone size).
3. Fix the code.
4. Check the visual again.
Repeat until fixed. Never call a frame "proper" from code alone. (See work-loop.md.)

## 7. Ratio is NOT fixed — choose by topic (user rule, 2026-10-29)
- Do NOT fix one mix ratio for all designs.
- Flat / diagram topic → Mix 1: 70% Swiss + 30% Blueprint.
- Physical / 3D topic → Mix 3: 50% Iso + 30% Dark + 20% Swiss.
- Choose from the topic name first, then build. Example: AI drone in the night sky = physical + dark → Mix 3.

## 8. Before showing any frame, pass this check
- [ ] Equal left/right margins?
- [ ] All gaps on the 8-step scale?
- [ ] Group gap ≥ 2× inner gap?
- [ ] Hero fills its section, no hole over half a screen?
- [ ] No footer / dimension / prototype label?
- [ ] Checked visually at phone size, not just code?
If any box is no, fix it first. Do not show it.
