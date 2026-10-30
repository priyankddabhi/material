# Space / taking-space concepts — internet research, 2026-10-29
Added at user request, alongside design-engineering repo + Material 3 + GSAP. Material 3 page read is still running in a browser task; its numbers will be merged into margin-rules.md when it returns. Do NOT present this file alone as the full M3 answer.

## Whitespace is not empty — it is structure
- Macro whitespace: wide margins around a page/composition — whole thing breathes.
- Meso whitespace: gaps between sections/columns/groups — separates related groups.
- Micro whitespace: letter, line, paragraph spacing — keeps text legible.
- Rough guide seen: about one third of a page empty; cluttered pages usually break this. Use as a check, not a hard rule for video frames.
- Isolation raises importance: whitespace around an element makes it feel more important.
- Source: https://business-analytics-with-visualisation.yuvijen.com/2-visualization-design-for-business-audiences/15-typography-and-layout-design.html

## Margin vs padding — do not mix them up
- Margin = space OUTSIDE an element, between it and neighbours.
- Padding = space INSIDE an element, between its border and its content.
- Vertical margins can collapse: two 20px margins do not always make 40px — often the larger one wins.
- Source: https://hackr.io/blog/margin-vs-padding

## 8-point spacing system — the "where, how much" answer
- Every spacing, padding, margin, gutter, and (hard grid) size is a multiple of 8: 8, 16, 24, 32, 40, 48, 64, 72…
- Half step 4 is allowed where needed.
- Long-form example measured: list items 8, inside-card heading gap 16, paragraphs 24, h3 above 48 / below 24, h2 above 72 / below 48, container 1280 wide with 32 gutters, 12 columns.
- Hard grid: spacing AND sizes follow 8. Soft grid (most projects): only spacing follows 8, sizes can vary.
- Material aligns to an 8dp grid; IBM Carbon builds from an 8px mini unit.
- Sources: https://artofstyleframe.com/blog/spacing-scale-long-form-article-layout/ , https://wpdean.com/what-is-the-8-point-grid-system/ , https://medium.com/@muskanvermabsp/understanding-grid-systems-in-ui-design-8023c6bc56e8

## Grid: columns, gutters, margins
- 12 columns is standard because 12 divides by 2, 3, 4, 6.
- Gutter = space between columns, keeps blocks from merging. Margin = space between screen edge and content.
- Column width formula: (screen width − gutter count × gutter − 2 × margin) ÷ columns.
- Desktop example seen: 12 columns, gutter 16–32, margin 120–200 (that margin is for wide web pages, NOT for a video frame — do not copy it blindly into video).
- Grid types: manuscript (one block), column, modular (columns + rows), hierarchical (content-driven), baseline (shared text rhythm).
- Sources: https://medium.com/@muskanvermabsp/understanding-grid-systems-in-ui-design-8023c6bc56e8 , https://graphicdesigneye.com/grid-systems-in-graphic-design/ , https://www.flyriver.com/g/establish-guides-and-grids

## Proximity (Gestalt) — space IS grouping
- Close together = perceived as one group. Far apart = separate group. No box or line needed.
- Label must sit closer to its own field/content than to the element above it. Heading gap below must be smaller than gap above it, or spacing contradicts grouping.
- Gap between groups must be clearly larger than gap inside a group (design-engineering says at least 2× — same rule, different source).
- Common fate: things that move/change together are seen as one group — relevant to animation: move a group together, not scattered pieces.
- Sources: https://fiveable.me/lists/gestalt-principles-in-design , https://www.gestaltprinciples.com/principles/proximity , https://weareaffective.com/learning-centre/what-spacing-rules-should-i-follow-in-app-interface-design

## What this means for our videos (to be locked in margin-rules.md)
- Pick ONE spacing scale (8-based) before building a scene, and use only its steps.
- Set equal left/right margins first, then place everything on those two edges.
- Group gap ≥ 2× inner gap. Heading: more space above than below.
- Fill the frame: a hero that is small with huge empty black around it is a hole, not "minimal".
- Check on a phone-sized view, not only at 1920 wide — that is where v4 failed.
