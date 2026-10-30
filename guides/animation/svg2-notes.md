# SVG 2 — deep notes for our video work (read 2026-10-29)

Source: https://www.w3.org/TR/SVG2/ — W3C Candidate Recommendation Snapshot, 06 Oct 2026, expected to advance no earlier than 01 Dec 2026. Plus its Changes appendix and the editor's-draft coords chapter (svgwg.org/svg2-draft/coords.html).
Status warning: SVG 2 is NOT a finished Recommendation yet. Some features below are at-risk or unimplemented in browsers. Test in Chrome-for-Testing before relying on one in a render.

## 1. What SVG 2 is
- XML language for 2D vector + mixed vector/raster graphics. Stylable, scalable to any resolution, viewable stand-alone, mixed with HTML, or embedded in other XML.
- Dynamic: script can change it, animation can be declarative or script-driven.
- Builds on SVG 1.1 Second Edition, adding commonly requested author features. It is NOT a new drawing model — same shapes, paths, text, paint, filters, clipping.

## 2. Coordinate system — the part that decides if a scene looks right
- Every SVG viewport has a size (width, height) and an origin, in abstract user units. Initially, viewport coordinates = user coordinates, origin top-left, x right, y DOWN, 1 user unit = 1 CSS px.
- viewBox = 4 numbers: min-x, min-y, width, height. It maps that user-space rectangle onto the viewport bounds. Formula (spec §8.2): scale-x = e-width/vb-width, scale-y = e-height/vb-height, then translate = e-x - vb-x*scale-x (same for y).
- preserveAspectRatio, default xMidYMid meet:
  - meet = shrink the larger scale to the smaller, whole viewBox visible, letterbox gaps possible.
  - slice = grow the smaller scale to the larger, viewport filled, viewBox cropped.
  - none = stretch, x and y scale independently (distorts shapes — only for a deliberate stretch).
  - xMin/xMid/xMax + yMin/yMid/yMax = which edge the leftover gap sits on.
  - Negative viewBox width/height = error, whole viewBox ignored. Zero = rendering disabled for that element.
  - preserveAspectRatio is IGNORED if no viewBox is given on that element (except image, where it controls image fitting).
- Percentages are relative to the width/height of the specified viewBox, resolved against the nearest ancestral viewport — nested <svg> redefines what % means.
- Our rule from this: always set width + height + viewBox together (1080x1920 + viewBox="0 0 1080 1920" for vertical, 1920x1080 for landscape). Never rely on a default viewport, or a scene will shift when the canvas size changes.

## 3. Geometry properties — CSS now controls shape size/position
- SVG 2 promotes x, y, width, height (and rx, ry, cx, cy, r, d) from attributes-only to CSS properties / presentation attributes.
- That means: `rect { x: 100px; width: 50%; transition: width .3s; }` is legal, and CSS variables can drive positions: `x: var(--x, 10px)`.
- auto: on <svg> width/height auto = 100%; on most other SVG elements auto computes to 0; on <image> auto = intrinsic size / aspect ratio.
- max/min-width/height can constrain the sizing properties.
- Practical for us: do NOT animate x/y/width/height with GSAP for motion (layout cost) — animate transform + opacity. Use geometry properties for layout tokens (margins, grid positions), not for per-frame motion.
- New in SVG 2: <symbol> can carry x/y/width/height, and a <use> instance copies them (overridable on <use>); symbol also gains refX/refY (left/center/right, top/center/bottom) so a symbol can anchor by a point, like a map pin. Note: refX/refY NOT specified behaves differently from refX=0 — backwards-compat quirk, test before using.

## 4. Transforms — and the trap that bit our earlier videos
- transform is now the CSS Transforms property, not a separate SVG-only attribute. Same functions: translate, rotate, scale, skewX/Y, matrix.
- SVG 2 user-agent stylesheet sets transform-origin default to '0 0' for all elements EXCEPT root <svg> and <svg> inside <foreignObject>. HTML default is 50% 50%.
- Consequence: a GSAP scale on an SVG element scales from its top-left corner unless you set transformOrigin explicitly (GSAP: transformOrigin:'50% 50%' or 'left center' for bars). Our v2 bars used transformOrigin left — correct. A hero word scaled without transformOrigin will drift sideways — exactly the "font never changed size / moved oddly" class of bug.
- vector-effect: non-scaling-stroke keeps stroke width constant when the element (or its viewBox) scales. Other values added in SVG 2 — non-scaling-size, non-rotation, fixed-position — are marked AT-RISK / unimplemented: do not rely on them, only non-scaling-stroke is safe.
- vector-effect has NO effect inside a 3D rendering context.

## 5. Paths — commands we use, plus SVG 2 changes
- Commands: M move, L line, H/V horizontal/vertical, C cubic, S smooth cubic, Q quadratic, T smooth quadratic, A arc, Z close. Lowercase = relative, uppercase = absolute.
- SVG 2 additions:
  - NEW B / b "bearing" commands (path direction/bearing — rarely needed, do not use until a browser renders it in our pipeline).
  - Z/z can now fill missing coordinate data in the previous command with the subpath's start point.
  - Empty path / polygon / polyline (no valid commands) renders nothing.
  - 'd' is now a CSS property, so it can be set/animated via CSS in supporting browsers — but GSAP MorphSVG is the reliable way to morph paths in our renders.
  - pathLength moved from SVGPathElement to SVGGeometryElement, and now exists on ALL basic shapes (rect, circle, ellipse, line, polygon, polyline), not just <path>. pathLength=0 is valid. getTotalLength() / getPointAtLength() live on SVGGeometryElement — these are how a "draw-on" length and a MotionPath position are computed.
- Stroke rendering rules clarified: a zero-length subpath renders according to stroke-linecap (round = a dot, butt = nothing). Useful for dot/point beats.

## 6. Basic shapes
- rect (x, y, width, height, rx, ry), circle (cx, cy, r), ellipse (cx, cy, rx, ry — rx/ry now have auto behaviour), line, polygon, polyline.
- All shapes are geometry elements: they support pathLength, getTotalLength, getPointAtLength, isPointInFill / isPointInStroke, and markers (markers allowed on all shapes in SVG 2).
- Fill rule: nonzero (default) vs evenodd — for overlapping / donut shapes, evenodd is usually what a designer expects.

## 7. Painting — fill, stroke, paint-order, markers
- Fill paints the interior; stroke paints the centreline, half inside / half outside the path edge. Stroke properties: stroke-width, stroke-linecap (butt/round/square), stroke-linejoin (miter/round/bevel + SVG 2 'arcs'), stroke-miterlimit, stroke-dasharray / dashoffset (the mechanism behind draw-on animations).
- paint-order (SVG 2, widely supported): order of fill, stroke, markers. Default fill then stroke — a thick stroke eats into the fill. `paint-order: stroke fill` draws stroke FIRST, fill on top, so outlined text stays readable. For a stroke that must sit OUTSIDE a shape, double the width with paint-order stroke fill (inner half hidden under fill).
- context-fill / context-stroke: inside a <use> shadow tree, a child can take the <use> element's fill/stroke. Handy for recolouring an icon by changing one property on <use>.
- Markers: arrowheads / dots at vertices, start/mid/end. SVG 2 adds orient="auto-start-reverse" — one marker serves both ends, flipped at the start. context-fill lets a marker match the path colour automatically.
- Paint servers: linearGradient, radialGradient (SVG 2 adds 'fr' = focal-circle radius), pattern. mesh gradients and hatch are DEFERRED to a future version — do not use. solidcolor element was REMOVED again. Gradients/patterns can be transformed with gradientTransform / patternTransform.
- Compositing: SVG 2 references CSS Compositing and Blending — mix-blend-mode and isolation are supported in browsers; simple alpha compositing is mandatory.

## 8. Text — the chapter that matters most for our titles
- Elements: <text> (block-like, holds the string + start point), <tspan> (inline, style/position change mid-string, nestable), <textPath> (text along a path). REMOVED in SVG 2: <tref>, <altGlyph>, <altGlyphDef>, <glyphRef>, SVG Fonts (<font>, <glyph>, <font-face> etc.) — use WOFF web fonts instead, which SVG 2 requires browsers to support.
- No wrapping by default. <text> does NOT wrap like HTML. Wrapping needs author work: manual <tspan> lines, or the new inline-size property.
- inline-size (SVG 2, on <text>): sets a wrapping width. WARNING from a 2026 source: implemented in NO browser yet (Inkscape does). Until our Chrome-for-Testing renders it, keep manual line breaks — do not ship a scene that depends on inline-size.
- textPath: reference by href (xlink:href deprecated — use href). New in SVG 2: a 'path' attribute directly on <textPath> (no separate <path> needed), reference to basic shapes allowed, 'side' attribute to put text on either side of the path, startOffset + text-anchor for centring (startOffset="50%" + text-anchor="middle" = centred on path), one loop of a closed path only.
- Glyphs on a path rotate so their horizontal axis is parallel to the path tangent at that point. Offsets along a transformed path are measured in the TEXT element's coordinate system, not the path's.
- Spacing: letter-spacing (uniform, e.g. 2px / 0.02em), word-spacing, textLength + lengthAdjust (force a string to an exact length — useful for fitting a headline to a frame, but it distorts spacing; prefer choosing a font size that fits).
- text-anchor: start / middle / end — centre a headline with x=540 + text-anchor="middle", never by guessing x.
- text-decoration: CSS3 model adopted, plus text-decoration-fill / text-decoration-stroke (underline colour can differ from text colour).
- white-space property replaces deprecated xml:space. kerning property REMOVED (use letter-spacing / font-kerning from CSS Fonts).
- shape-inside / shape-subtract (text inside a shape) are in the spec but treat as experimental — not for our renders yet.
- Text is a graphics element: gradients, patterns, clipPath, mask, filter all apply to it. Colour comes from fill, NOT the CSS color property.
- Accessibility: <title> and <desc> inside SVG, lang attribute, ARIA roles. Multiple <title>/<desc> for localisation is AT-RISK.

## 9. Structure, reuse, embedding
- <svg> nested = new viewport. <g> groups (transform, style, opacity apply to children). <defs> = never-rendered definitions. <use> clones by reference into a Shadow DOM tree — clones are read-only, style is cloned into the shadow scope, event listeners copy from the original, circular <use> blocks only the looping <use>, not its host. <use> can now reference a whole document, and any element valid as a child of an SVG container (not only graphics).
- <symbol> + <use> = reusable icon/component system (see §3 for geometry + refX/refY).
- <image>: width/height auto, href (not xlink:href). Embedded content chapter also covers HTML <video>, <audio>, <iframe>, <canvas> inside SVG containers — not relevant to our frame renders, but explains why SVG can host a video element.
- <foreignObject> is now a graphics element, with x/y/width/height as presentation attributes — HTML inside SVG.
- <a> links: xlink:type/role/arcrole/show/actuate REMOVED; use plain href, and HTML <a> attributes are synced.
- <switch> + systemLanguage still exists for language variants; requiredFeatures REMOVED.
- Script: <script> allowed inside any element's content model; crossorigin attribute on <script> and <image>.
- Rendering order = document order (later = on top). There is NO z-index in SVG 2 (removed). To bring a hero forward, move it later in the document, or use a separate top layer group.
- display / visibility: display:none removes from rendering AND from text character counting; visibility:hidden keeps layout/space but hides paint. Non-rendered text is NOT counted for positioning attributes or getNumberOfChars.
- Overflow: root <svg> and <foreignObject> are NO LONGER overflow:hidden by default in the UA stylesheet. A scene that bleeds past the frame will show unless you clip it (clipPath or overflow:hidden on the svg). For our renders, set overflow:hidden explicitly on the stage svg.

## 10. Animation in the spec — what SVG 2 itself does and does not give
- The Animation chapter was MOVED OUT of SVG 2 into a separate SVG Animations module (SMIL-based <animate>, <animateTransform>, <animateMotion>, <set>, <mpath>). SVG 2 does not define its own animation timing.
- That is why the practical animation tools are: CSS transitions/animations, Web Animations API, GSAP, SVG.js, Anime.js — or our frame-by-frame seek rendering. SMIL <animate> is a fallback for simple in-file animation (see svg-tools.md), not our main engine.
- DOM modernisation: SVGMatrix -> DOMMatrix, SVGRect -> DOMRect, SVGPoint -> DOMPoint, SVGElement gains dataset, tabIndex, focus/blur, GlobalEventHandlers. SVGGeometryElement: isPointInFill, isPointInStroke, getTotalLength, getPointAtLength, getBBox with options (including stroke bbox). Useful for hit-testing / measuring in a browser preview, not needed for frame rendering.

## 11. Rules for our next videos, derived from SVG 2
1. Stage: <svg width height viewBox overflow:hidden>, one coordinate system per scene, no mixed units.
2. One hero per beat, document order = layer order, hero last in its beat group.
3. Text: text-anchor middle for centred headlines, manual line breaks (no inline-size yet), letter-spacing in em, fill for colour, WOFF fonts only.
4. Motion: transform + opacity only; set transformOrigin explicitly on every scaled/rotated element; non-scaling-stroke for strokes that must stay thin under a zoom.
5. Draw-on: stroke-dasharray/dashoffset or GSAP DrawSVG; line growth via scaleX with origin left, not width.
6. Reuse: <symbol>/<use> for repeated racks, chips, cards — one definition, many instances, recolour via context-fill where it works.
7. QC before render: viewBox non-zero, no negative width/height, no text wider than frame (measure with getComputedTextLength in preview), no element relying on an at-risk feature (B/b bearings, non-scaling-size, mesh, hatch, inline-size).
