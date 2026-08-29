# Design: "Passing a Cube Through Itself" blog post (Nieuwland Numbers and Polar Duality)

Date: 2026-08-29
Status: approved

## 1. Purpose

A new writing for the personal site (branch `blog-nieuwland-numbers`) explaining the paper
*"On Nieuwland Numbers and Polar Duality"* by Kavin Satheeskumar and Liam Benoit
(arXiv:2608.14912), plus the reader's own numerical companion codebase built to explore it
(source material: `~/Downloads/nieuwland-for-researcher.zip` and
`~/Desktop/Publications/On Nieuwland Numbers and Polar Duality/`). The post pairs the paper's
proven results with an interactive 3D widget of Prince Rupert's Cube and two Mermaid diagrams.

## 2. Source material (ground truth for the writing)

- Paper PDF, extracted to text at `2608.14912v1.pdf` (via `pdftotext -layout`). Key content:
  Rupert's property / Nieuwland number definitions (Def 2, 4), Nieuwland's 1816 cube
  construction (nu_C = 3*sqrt(2)/4 = 1.06066...), polar duality basics (Section 2.1), the dual
  pass-through condition (Theorem 10), Theorem 14 (nu_cube = nu_octahedron, resolving the
  Steininger-Yurkevich conjecture), the QCQP formulation (Section 4.2), the hyperplane
  arrangement algorithm (Algorithm 1 / Lemma 16), the polynomial-time result (Algorithm 2 /
  Theorem 18, via Tarski-Seidenberg quantifier elimination), and open problems (Section 5: does
  every point-symmetric polytope share its Nieuwland number with its polar dual; the
  rhombicosidodecahedron's Rupert status is unknown).
- `NOTES_FOR_RESEARCHER.md` (from the zip): the numerical companion's own findings, to be
  reported honestly as observation, not proof: the tight region-count formula `m^2 - m + 2`
  (cube: 8 regions not 32; octahedron: 14 not 58) versus the paper's looser `O(m^3)` bound; the
  restart-budget blowup near the critical nu (3-4 restarts away from nu*, 37 needed within
  1.6e-4 of it); region-guided vs. uniform multistart sampling on the octahedron (168
  region-guided samples certified feasibility at nu = 1.0594 where 300 uniform samples failed);
  empirical support for Theorem 14 (cube and octahedron both certify nu = 1.0594 under
  identical search settings).
- `docs/superpowers/specs/2026-08-18-nieuwland-solver-design.md` (companion codebase's own
  design doc): exact formulas, Nieuwland's construction data (w1..w4, eta, nu), and scope
  decisions for the numerical solver.

## 3. Writing structure and tone

Modeled on the site's existing three writings (`src/writings/*.md`), closest in shape to
`bip-test.md` (explaining someone else's paper) with a Collatz-style honest empirical-findings
section layered on top for the numerical companion's own results.

Sections, in order:
1. Hook: Prince Rupert's centuries-old bet, Nieuwland's 1816 improvement.
2. Plain-English explanation of Rupert's property and Nieuwland numbers, written for a general
   audience (not assuming a math background), while still using the paper's own terminology
   (convex polytope, projection, certificate, polar dual, etc.) so a reader who wants to go
   deeper has the right vocabulary.
3. Interactive widget embed (see Section 4).
4. Polar duality and the dual pass-through trick: how Theorem 10 turns the octahedron
   self-passing problem into a statement about the cube, and vice versa, proving Theorem 14.
   Includes Mermaid diagram 1.
5. The algorithm: QCQP formulation, why the naive version is exponential, how the hyperplane
   arrangement (Algorithm 1) cuts it to a polynomial number of regions, and the resulting
   polynomial-time algorithm (Algorithm 2 / Theorem 18). Includes Mermaid diagram 2.
6. Numerical companion findings: dedicated section, framed honestly as computational evidence,
   not proof, matching the Collatz post's "what I verified vs. what I haven't" pattern.
7. Open questions: the paper's own Section 5 (general point-symmetric polytopes vs. their
   duals; the rhombicosidodecahedron).
8. References and footer, matching the existing attribution-line style.

**Hard punctuation rule:** no em dashes anywhere in the post. Use commas, parentheses, colons,
semicolons, or a spaced hyphen (" - ") instead.

## 4. Interactive widget

Built and verified first as a standalone Claude Artifact (own URL). Two problems surfaced during
implementation: Claude Artifacts send an X-Frame-Options / CSP `frame-ancestors` header that
blocks external `<iframe>` embedding outright (`net::ERR_BLOCKED_BY_RESPONSE`, confirmed via
Playwright), and the artifact is private by default, so even the fallback link 404s for
unauthenticated visitors until manually shared. Sharing was set to "anyone with the link" but a
fully logged-out Playwright check against that exact URL still returned Claude's own 404 page
three times in a row, not a propagation delay.

Resolved by self-hosting instead: the same verified HTML/JS, wrapped as a complete standalone
document, lives at `public/widgets/rupert-cube.html` (a static asset Vite serves as-is, no build
step). The post embeds it via a same-origin `<iframe src="/widgets/rupert-cube.html">`, which
is not subject to the cross-origin framing block, plus a same-path fullscreen fallback link.
This also removes any dependency on Claude Artifacts' sharing/auth model for the published site.

One further bug found only through interactive testing (not caught by the earlier headless-math
verification): the "Snap to Nieuwland's construction" button originally wrote `.toFixed()`
values into the rotation sliders. Nieuwland's construction sits exactly on the containment
boundary with zero slack, so that rounding was enough numerical error to flip the demo's
headline moment from "Passes through" to "Does not fit". Fixed by writing full-precision values
into the sliders (display-only rounding still happens separately, in the render loop) and by
widening the containment tolerance from `1e-4` to `1e-3` for headroom.

Technical choice: vanilla Three.js (UMD build via cdnjs) rather than `@react-three/fiber`.
React Three Fiber has no UMD build on the Artifact sandbox's allowed CDNs (cdnjs, jsdelivr/npm
script tags, tailwind CDN, jquery) and its ESM dependency graph would likely hit blocked
sub-resource fetches under the sandbox's CSP. This is the fallback the original prompt itself
allowed ("or vanilla HTML/Three.js").

Math, kept honest rather than decorative:
- Outer cube P: side length 2, axis-aligned, semi-transparent. Fixed as the reference frame
  (WLOG: Q's own rotational freedom in Definition 2 is absorbable into a global frame change,
  so fixing it loses no generality).
- Inner cube: scaled by nu (slider, range 0.8 to 1.1), rotated by U built from three Euler
  sliders (rotation X, Y, Z).
- Containment check: project both cubes onto the xy-plane (eta = z-axis). Since the outer
  cube's projection is exactly the square [-1,1] x [-1,1], containment reduces to a genuine
  per-vertex bounds check on the inner cube's 8 transformed vertices, recomputed live on every
  slider change. Visual state (green "passes" / red "does not fit") reflects the real check, not
  a canned animation.
- nu slider turns red past the Nieuwland limit (1.06066), reflecting the paper's own claim that
  this is the proven maximum for the cube.
- A translation-along-tunnel-axis slider (translation with a component parallel to eta) drives
  the "pass through the hole" animation. This is a visual device; per the projection formula,
  translation along eta does not affect proj_eta, so it does not change the containment result,
  only the animated position.
- Below the viewport: the same 3-paragraph plain-English explanation called for in the original
  prompt (what Rupert's property and Nieuwland numbers are, how polar duality and the quadratic
  constraint set produce the bound, how to use the sliders to find a valid passing angle),
  written in the post's general-audience tone.

## 5. Diagrams

Two Mermaid diagrams, loaded via a CDN `<script>` tag plus `<pre class="mermaid">` blocks
directly in the `.md` file (no site-wide infrastructure change; this is the only writing using
Mermaid so far).

1. Dual pass-through flow: P passes through Q with certificate (U, eta, delta) implies (via
   Theorem 10) Q* passes through P*; instantiated for (P, Q) = (nu*O, O) and (nu*C, C) to show
   how both directions combine into Theorem 14 (nu_C = nu_O).
2. Algorithm 2 pipeline: hyperplane arrangement (Algorithm 1) produces O(m^3) regions and
   bipartitions, each region's bipartition seeds one QCQP, the max feasible nu across all
   regions is the Nieuwland number (Theorem 18).

Numeric comparisons (region counts, restart counts) use plain Markdown tables, not Mermaid.

## 6. File changes

- New: `src/writings/nieuwland-numbers-polar-duality.md`
- Edit: `src/data/writings.ts` (add entry to `writings` array and `writingContent` map,
  following the existing pattern exactly)
- No changes to rendering components, `package.json`, or global CSS. The Mermaid CDN script and
  iframe are self-contained within the one `.md` file.

## 7. Testing / verification

- `npm run build` (or the project's type-check script) after editing `writings.ts` to confirm
  no TypeScript errors.
- Run the dev server and visually check the new writing page: math renders via KaTeX, both
  Mermaid diagrams render, the iframe loads the published Artifact, tables and code blocks match
  the site's existing writing-post styling.
- Confirm the Artifact's containment check against the known Nieuwland construction as a manual
  sanity check: at nu = 3*sqrt(2)/4 with the paper's construction angles, the widget should
  report "passes."

## 8. Open items carried forward (not decisions, just visible scope notes)

- The Artifact is a separately hosted page; if Claude Artifacts are ever set to disallow
  framing from external origins, the fallback is the "open fullscreen" link already included
  by design, so no post edit would be needed.
- The three MCP tools named in the original request (desmos-mcp-server, symbolica,
  sympy-interpreter) are not connected in this environment. The Artifact tool's native Three.js
  and Mermaid support, plus the site's existing KaTeX pipeline, cover the same ground; this was
  confirmed with the user before proceeding.
