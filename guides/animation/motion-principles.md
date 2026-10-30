# Motion principles — IBM + U-M Library (read 2026-10-29)

Sources:
- IBM Design Language, Tips and techniques: https://www.ibm.com/design/language/animation/tips-and-techniques/
- U-M Library Design System, Motion: https://design-system.lib.umich.edu/visual-elements/motion/
These are DESIGN principles, not code. They decide whether a technically correct animation feels good or feels messy — the exact failure of our Nvidia video and v1.

## IBM — the rules that fix our videos
1. Attention is an investment. Keep ONE focal point, transfer it seamlessly from subject to subject. Every extra moving thing taxes the viewer. (Matches our mind rule: one eye-start.)
2. Camera: efficient single-axis moves feel deliberate; untethered dynamic camera = chaos. If a camera must move, keep it controlled, focused, balanced. (Our videos: keep camera static or one slow zoom 1.00->1.08, never a wandering camera.)
3. Inverse complexity rule: simple design -> expressive, expansive animation allowed. Dense/complex design -> SMALL, textural motion only. (Our Nvidia scenes were dense AND we tried big motion on everything — wrong side of this rule. Dense scene = subtle motion.)
4. Clean silhouettes in transition: no odd shapes, irregular angles, overlaps, intersections mid-transition unless deliberate. Keep crisp lines: animate stroke WEIGHT from 0 to full, NOT crossfade opacity (crossfading lines look blurry/ghosty). Animate between swatch colours, not opacity, for overlapping transparent shapes.
5. Consistency is the system: same entry/exit directions, same type behaviour, same crossfade rule across the whole video. Capricious movement reads as random, even if each move alone looks fine. Set expectations, then a deliberate break stands out.
6. Personality = natural + engineered, not one alone. Decisive, efficient, purposeful moves; align to grid, snap into place, momentum for crisp transitions. No superfluous motion.
7. Rhythm: rarely everything at once. Stagger hero performances, offset similar actions by small increments, cause -> effect, move -> rest -> move. A pause before the next beat lets the viewer absorb it.
8. Smoothness: >=24 fps for smooth motion (we use 30 fps). No stepped/stilted/disorderly motion.
9. Physicality / mass: a feather must not fall like lead, stone must not stretch like rubber. Avoid cartoonish overshoot/bounce unless the object is cartoonish. (Our back.out pops are for small UI pills, NOT for heavy objects like servers/racks — use power2.out there.)
10. Sequential vs loop: sequential = A-to-B story with start and end (our explainer videos). Loop = one idea, seamless cycle (a logo sting, an ambient background). Do not make an explainer loop, do not make a loop tell a story.
11. Type: reveal in reading order — left to right, top to bottom. One axis at a time (never move + scale + rotate a word at once). Leave it on screen long enough to read. Never stretch/warp/distort type. Avoid centred paragraphs for long text and multi-axis reveals.
12. Loops in a page: offset loops so attention moves region to region in sequence; avoid excessive overlaps in action.

## U-M Library — duration, safety, accessibility
1. Two kinds of motion: micro-interaction (subtle, functional, triggered by an action — e.g. a tick, a button state) vs animation (larger, story/tone, e.g. a hero banner). Our 5-sec proofs are animations, not micro-interactions.
2. Purpose first: focus, inform, or delight — delight alone is valid, but "because we can animate it" is not a purpose. Every beat must answer: what does the viewer learn here?
3. Trigger: scroll / click / hover / autoplay. Autoplay >=5s MUST have play/pause. (For our videos: the player controls are the pause mechanism; for a web embed, add a pause button.)
4. Duration: micro-interactions 100-500 ms. Full animation: no more than 3-5 seconds per animation unit (U-M's UI rule — for our long videos, read as: each BEAT should resolve in 3-5 s, not the whole video).
5. Feeling = easing: calm/quiet vs bouncy/playful is a choice, not an accident. Pick one feeling per video and keep it.
6. Effects: scale, opacity, movement, elevation. AVOID flashes and bounces (seizure/disorientation risk) and parallax scrolling.
7. Containment: an animation should live in a contained area, and any important information inside it must ALSO be presented as text (captions/subtitles — we already embed subtitles).
8. Motion budget: motion on less than a third of a page. Translated to video: not every element moves at once; a third moving, two-thirds holding, is a healthy ratio.
9. Accessibility is OUR job, no tool gives it free:
   - prefers-reduced-motion: reduce — collapse animations to near-zero duration, one iteration, no smooth scroll (U-M's CSS snippet in the page).
   - WCAG 2.2: 1.4.11 non-text contrast, 2.2.2 pause/stop/hide, 2.3.1 three flashes or below threshold, 2.3.3 animation from interactions (AAA).
   - Provide start/stop/speed controls where appropriate.
   - Motion can cause dizziness/nausea (vestibular) and break focus (ADHD) — another reason for one focal point and no flashing.
10. Tools ladder (U-M): CSS keyframes/transitions = simple, performant. JavaScript = advanced/dynamic sequencing. Canvas/WebGL = drawable surface. SVG <animate> = vector points/shapes. GSAP = named explicitly as a powerful third-party tool. (Our stack matches: GSAP for sequencing, SVG for shapes.)

## Combined checklist for the next proof (IBM + U-M + our animation folder)
- [ ] One focal point per beat, transferred cleanly to the next beat.
- [ ] Dense scene -> subtle motion only; simple scene -> one expressive move.
- [ ] No crossfade of lines; stroke weight 0 -> full for draw-on.
- [ ] Same entry direction + same type behaviour in every beat.
- [ ] Stagger 0.2-0.4 s, cause -> effect, rest between beats.
- [ ] Type: one axis, reading order, long enough to read (letters/15 + 1.5 s rule), never warped.
- [ ] Heavy objects: power2.out, no bounce. Small pills/labels: back.out allowed.
- [ ] 30 fps, no flash, no bounce on large elements, no parallax.
- [ ] Subtitles carry the facts, so a paused frame still teaches.
