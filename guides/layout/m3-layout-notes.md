# Material 3 layout — notes, 2026-10-29
Source: https://m3.material.io/foundations/layout/layout-overview/overview
Scope note: the overview page itself gives principles + breakpoint names, not a full numeric table. Numbers below were read from the M3 pages linked from it (Parts of layout, Adaptive design, Breakpoints, Grids & spacing, Scaffold, Spacing system). Read-only, nothing signed in / changed.

## Breakpoints (window width, dp — not device width)
| Breakpoint | Width | Typical |
|---|---|---|
| Compact | under 600 | Phone portrait |
| Medium | 600–839 | Tablet portrait, foldable portrait unfolded |
| Expanded | 840–1199 | Phone landscape, tablet landscape, desktop |
| Large | 1200–1599 | Desktop |
| Extra-large | 1600+ | Desktop, ultra-wide |

Design for breakpoints, not specific devices. Old name "window size class" is now "breakpoint"; "responsive layout" is now "adaptive design".

## Margins, spacers, panes
| Breakpoint | Margin (leading + trailing) | Spacer between panes | Panes |
|---|---|---|---|
| Compact | 16 dp | — (single pane) | 1 |
| Medium | 24 dp | 24 dp | 1 recommended, or 2 |
| Expanded | 24 dp | 24 dp | 1, or 2 recommended |
| Large | 24 dp | 24 dp | 1, or 2 recommended |
| Extra-large | 24 dp | 24 dp | 1 to 3 recommended |

Max 3 panes total. Fixed pane defaults: 360 dp (expanded), 412 dp (large / extra-large). Side sheet max 400 dp (extra-large).
Compact = single pane only. Medium two panes only for low-density content, each 50%, no custom widths.

## Columns
Compact 4, medium / expanded 8, large / extra-large 12. No separate numeric gutter table was found on the pages checked — margin and spacer numbers above are the verified ones.

## Spacing tokens
8 dp scale. space100 = 8 dp. Main tokens are multiples of 8, 0x to 9x. Small steps also used: 2, 4, 6, 10 dp. Rule from M3: define padding/gaps on the parent container; use margins mainly for layout / beyond parent padding, not on every child.

## Scaffold order
Safety region (system UI, no primary content) → bars / rails at edges → panes (body) in the middle. Body has no separate fixed width — it is what remains after safety, bars, rails, margins, fixed panes and spacers.
Text: keep lines 40–60 characters. Desktop may use more generous spacing than mobile.

## Adapt across breakpoints: reveal, divide, resize, reposition, swap
Swap only functionally equal components (e.g. navigation bar → rail). Never swap a button for a menu/chip.
