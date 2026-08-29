# Nieuwland Numbers Blog Post Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish a new writing, "Passing a Cube Through Itself: On Nieuwland Numbers and Polar
Duality," to the personal site, with an embedded interactive Three.js widget and two Mermaid
diagrams.

**Architecture:** A standalone Claude Artifact (vanilla Three.js, own hosted URL) is built and
published first. Its URL is then embedded via `<iframe>` inside a new Markdown writing file,
alongside two Mermaid diagrams (loaded via CDN script tag) and KaTeX math (already wired into
the site). The writing is wired into the existing `src/data/writings.ts` registry using the
established pattern.

**Tech Stack:** Vanilla Three.js (UMD, cdnjs) for the artifact; Markdown + KaTeX (`marked` +
`marked-katex-extension`, already in the site) + Mermaid (CDN) for the post; no new npm
dependencies, no changes to rendering components.

## Global Constraints

- No em dashes ("-") anywhere in written prose. Use commas, parentheses, colons, semicolons, or
  " - " instead.
- General-audience tone matching `src/writings/bip-test.md` and
  `src/writings/collatz-conjecture-computational-analysis.md`: correct math terminology from the
  paper, explained in plain English, no assumed math background.
- All facts, formulas, and values must trace back to the paper text (`2608.14912v1.pdf`) or
  `NOTES_FOR_RESEARCHER.md`; the numerical companion's findings are reported as observation, not
  proof (see design spec Section 6).
- No new site-wide infrastructure or npm dependencies; the Mermaid script and iframe are
  self-contained in the one `.md` file.
- Full design detail lives in
  `docs/superpowers/specs/2026-08-29-nieuwland-numbers-blog-design.md`; this plan implements it.

---

### Task 1: Interactive Prince Rupert's Cube Artifact

**Files:**
- Create (via Artifact tool, not a repo file): a single self-contained HTML page.
- Scratch copy for editing: `/private/tmp/claude-501/-Users-nrebello-Documents-PersonalWebsite/ffb8ffb8-12be-4200-a124-a9ec5e2f2a89/scratchpad/nieuwland/rupert-cube-widget.html`

**Interfaces:**
- Produces: a published Artifact URL. Task 2 embeds this URL in an `<iframe src="...">`.

**Technical spec (must all be satisfied):**

- Load Three.js UMD build from `https://cdnjs.cloudflare.com/ajax/libs/three.js/<pinned version>/three.min.js` and `OrbitControls` from the matching cdnjs path. Pin an exact version.
- Scene: outer cube `P`, side length 2.0, centered at origin, axis-aligned, rendered
  semi-transparent (e.g. `MeshBasicMaterial` with `transparent: true, opacity: 0.15`, plus
  wireframe edges for readability).
- Inner cube: base side length 2.0, scaled by `nu`, rotated by a rotation matrix built from
  three Euler angle sliders (rotation X, Y, Z, range 0 to 360 degrees, applied in a fixed XYZ
  order), then translated along the z-axis by a "tunnel position" slider (range -3 to 3) for the
  pass-through animation.
- Sliders (plain HTML `<input type="range">`, styled inline, no external UI library):
  - `nu`: range 0.8 to 1.1, step 0.001, default 1.0.
  - `rotX`, `rotY`, `rotZ`: range 0 to 360, step 1, default 0.
  - `tunnelZ`: range -3 to 3, step 0.05, default -3. Optional "Animate" button that ramps this
    from -3 to 3 over ~4 seconds using `requestAnimationFrame`.
  - A "Snap to Nieuwland's solution" button that sets `rotX/rotY/rotZ` to the Euler angles
    equivalent to Nieuwland's construction (derive from the paper's data: `w1 = (-0.5, 1, -1)`,
    `w2 = (1, 1, 0.5)`, `w3 = (0.5, -1, 1)`, `w4 = (-1, -1, -0.5)`, `eta = (-2/3, 1/3, 2/3)`,
    `nu = 3*sqrt(2)/4`) and `nu` to `3*Math.sqrt(2)/4` (≈ 1.06066).
- Containment check (real math, recomputed every frame from current slider values, not a canned
  animation):
  1. Compute the inner cube's 8 vertices in local space: all combinations of
     `(+-1, +-1, +-1) * nu`.
  2. Apply rotation (rotX, rotY, rotZ) to each vertex, then translate by `(0, 0, tunnelZ)`.
  3. Project onto the xy-plane by dropping the z-coordinate.
  4. Containment holds iff every projected vertex satisfies `abs(x) <= 1` and `abs(y) <= 1`
     (this is valid because the outer cube's projection along the z-axis is exactly the square
     `[-1,1] x [-1,1]`, an axis-aligned cube's own projection onto a plane it is aligned to).
  5. Display state: green label "Passes through" if containment holds for the current
     `rotX/rotY/rotZ` (evaluate at `tunnelZ` fixed at 0, since containment is independent of
     `tunnelZ`, see design spec Section 4); red label "Does not fit" otherwise.
- When `nu > 1.06066` (the Nieuwland limit), turn the `nu` slider's track/label red and show the
  text "Exceeds the proven maximum for the cube" regardless of rotation.
- Below the 3D viewport, render (as plain HTML, styled to be readable on a light background)
  exactly 3 paragraphs, written in the same general-audience tone as the rest of the post:
  1. What Rupert's property and Nieuwland numbers are, in plain English (a shape "has Rupert's
     property" if a slightly-shrunk copy of itself can be threaded through a tunnel bored into
     the original; the Nieuwland number is the largest scale factor for which that is possible).
  2. How the paper uses polar duality and a quadratic constraint set to compute these bounds (at
     a high level: swapping vertices and faces via the polar dual turns "does the octahedron
     pass through itself" into an equivalent statement about the cube, and the pass-through
     condition itself reduces to a system of quadratic inequalities, i.e. a QCQP).
  3. How to use the widget: drag the rotation sliders to search for an orientation where the
     green "Passes through" state holds, watch the `nu` slider turn red past the Nieuwland
     limit, click "Snap to Nieuwland's solution" to see the paper's own exact construction, and
     use "Animate" to watch the inner cube travel through the tunnel.
- Publish via the Artifact tool. `title`: "Prince Rupert's Cube". `favicon`: a cube-suggestive
  emoji, e.g. "🧊". `description`: one sentence describing the interactive demo.

- [ ] **Step 1: Write the HTML/JS to the scratch file**

Write the complete self-contained page (structure per the technical spec above) to
`/private/tmp/claude-501/-Users-nrebello-Documents-PersonalWebsite/ffb8ffb8-12be-4200-a124-a9ec5e2f2a89/scratchpad/nieuwland/rupert-cube-widget.html`.

- [ ] **Step 2: Manual verification of the containment math before publishing**

In the scratch file, temporarily log (via an on-page debug line, not just console) the
computed containment result when `rotX/rotY/rotZ` are set to Nieuwland's snapped solution and
`nu = 3*sqrt(2)/4`. Confirm it reports "Passes through." This is the hand-checkable fixed point
from the paper (Section 3.2) and from `NOTES_FOR_RESEARCHER.md` ("hand-verified against the
Nieuwland-construction example to machine precision"). Remove the debug line once confirmed.

- [ ] **Step 3: Publish the Artifact**

Call the Artifact tool with `file_path` pointing at the scratch file, `favicon: "🧊"`, a `title`,
and a `description`. Record the returned URL, it is the Task 2 input.

- [ ] **Step 4: Interactive smoke test**

Open the published URL (or use the Artifact `read` action) and confirm: dragging each slider
updates the scene without console errors, the green/red containment state changes as rotation
changes, `nu` past 1.06066 shows the red warning state, "Snap to Nieuwland's solution" produces
the green "Passes through" state, and "Animate" moves the inner cube smoothly.

---

### Task 2: Write the blog post content

**Files:**
- Create: `src/writings/nieuwland-numbers-polar-duality.md`

**Interfaces:**
- Consumes: the Artifact URL from Task 1, Step 3.
- Produces: the complete Markdown file. Task 3 imports it via `?raw` and registers its slug.

**Content brief (exact facts/values each section must include; write full prose around them
in the established tone, general audience, correct terminology, no em dashes):**

1. **Hook.** Prince Rupert's 17th-century bet that a cube could be bored through so a copy of
   itself could pass through. Pieter Nieuwland's 1816 result: a cube with side length
   `3*sqrt(2)/4` (~1.06066) times the original can pass through it, the largest such factor
   (paper, Section 1, first two paragraphs). Name the paper and authors (Kavin Satheeskumar and
   Liam Benoit, arXiv:2608.14912) and state the paper's headline result up front: it proves the
   Steininger-Yurkevich conjecture that the cube and octahedron share the same Nieuwland number,
   and gives a polynomial-time algorithm for computing Nieuwland numbers in general.

2. **Plain English: Rupert's property and Nieuwland numbers.** Define, in prose, "P passes
   through Q" (paper Definition 2: there's some rotation, projection direction, and translation
   such that the shadow of the rotated-and-shifted P fits inside the shadow of Q) without heavy
   notation. Define Rupert's property and the Nieuwland number (Definition 4: the largest scale
   factor nu such that nu*P passes through P). Mention that only the cube's Nieuwland number was
   known exactly before this paper (paper, Section 1, "the cube remains the only shape ... whose
   Nieuwland number is known exactly").

3. **Widget embed.** Introduce it in one short paragraph, then:
   ```html
   <div style="margin: 2rem 0;">
     <iframe src="ARTIFACT_URL_FROM_TASK_1" style="width: 100%; height: 640px; border: 1px solid #ccc; border-radius: 8px;" title="Interactive Prince Rupert's Cube demo"></iframe>
     <p style="text-align: center; margin-top: 0.5rem;">
       <a href="ARTIFACT_URL_FROM_TASK_1" target="_blank" rel="noopener">Open the demo fullscreen &#8594;</a>
     </p>
   </div>
   ```
   (Replace `ARTIFACT_URL_FROM_TASK_1` with the real URL in both places. Use `&#8594;` for the
   arrow character, not a raw unicode arrow, to avoid encoding issues.)

4. **Polar duality and the dual pass-through trick.** Explain the polar dual in plain English
   (swap each vertex for a face and vice versa; paper Section 2.1) and give the two bullet facts
   used later: `P subset Q` iff `Q* subset P*`, and for `c > 0`, `(cP)* = (1/c)P*`. State
   Theorem 10 in prose (if P passes through Q with a certificate satisfying an extra condition,
   then the dual of Q passes through the dual of P with a related certificate). Walk through how
   this is used for the octahedron (Lemma 12: any octahedron-through-octahedron certificate
   automatically satisfies that extra condition, because the octahedron's 6 vertices come in 3
   antipodal pairs) and for the cube (Lemma 13, built from Nieuwland's own 1816 construction,
   using the explicit points `w1 = (-1/2, 1, -1)`, `w2 = (1, 1, 1/2)`, `w3 = (1/2, -1, 1)`,
   `w4 = (-1, -1, -1/2)`, and `eta = (-2/3, 1/3, 2/3)`). State Theorem 14 plainly: the cube and
   octahedron have the same Nieuwland number, proven by combining both directions. Include
   Mermaid diagram 1 here (see Task 2a below).

5. **The algorithm.** Explain why computing a Nieuwland number naively is a QCQP (Quadratically
   Constrained Quadratic Program) with too many variables to solve directly (paper Section 4.1,
   the `z_1...z_n` variables one per vertex). Explain Theorem 15's fix: eliminate those variables
   by splitting the outer polytope's faces into two groups (a bipartition) based on the sign of
   `a_i . eta`, similar in spirit to Fourier-Motzkin elimination. Explain that checking every
   possible bipartition is exponential, and Lemma 16 fixes this: the possible bipartitions that
   can actually occur correspond to regions carved out by `m` planes through the origin, and
   there are only polynomially many such regions (paper cites an `O(m^3)` bound; tie this
   forward to the companion-code section's tighter `m^2 - m + 2` finding). State Theorem 18
   plainly: this gives a polynomial-time algorithm for the Nieuwland number of any convex
   polytope, though the polynomial's degree is large enough that it is a theoretical result, not
   a practical one (paper Section 4, "this algorithm is only a theoretical contribution"; the
   Tarski-Seidenberg quantifier elimination bound used to prove it is explicitly "incredibly
   slow" per the paper). Include Mermaid diagram 2 here (see Task 2a below).

6. **What the numerical companion found.** Frame explicitly as computational exploration, not
   proof (matching the Collatz post's honesty section). Report, with a small Markdown table:
   - Region counts: cube has 8 regions (not 32), octahedron has 14 (not 58), matching the exact
     formula `m^2 - m + 2` for `m` planes through the origin in general position in R^3, versus
     the paper's own looser `O(m^3)` bound (this is expected framing per this codebase's own
     design notes: "Section 6 blog content, not a bug to chase").
   - Restart budget near the critical value: 3 to 4 restarts sufficed for the cube away from
     nu*, but 37 were needed within `1.6e-4` of it, evidence that certifying feasibility gets
     much harder right at the critical value.
   - Region-guided vs. uniform sampling: on the octahedron at nu = 1.0594, 300 uniform restarts
     failed to certify feasibility (best violation +1.6e-4), while 168 region-guided samples
     (drawing from within each arrangement region rather than uniformly) succeeded (best
     violation -5.7e-4). Note the honest hedge: this suggests the arrangement structure is doing
     real work as a sampling prior, framed as a hypothesis the data supports, not a proven claim.
   - Theorem 14 empirical support: both cube and octahedron independently certify feasibility at
     nu = 1.0594 under identical search settings, consistent with (though not additional proof
     of) the paper's Theorem 14.
   End with an explicit "what this is and isn't" note in the Collatz post's style: this is
   numerical evidence from an independent from-scratch implementation, not a verification of the
   paper's proofs, which stand on their own.

7. **Open questions.** State the paper's own Section 5 framing: the deeper question behind this
   paper is whether every point-symmetric convex polytope shares its Nieuwland number with its
   polar dual, and this result is a proof-of-concept for one case (the cube and octahedron), not
   a general theorem. Mention the rhombicosidodecahedron: its Rupert status (whether it has
   Rupert's property at all) is still unknown, and the paper notes that solving the relevant
   QCQPs exactly could resolve it.

8. **References and footer.** List: Satheeskumar, K. and Benoit, L. (2026). "On Nieuwland
   Numbers and Polar Duality." arXiv:2608.14912. Steininger, J. and Yurkevich, S., for the
   original conjecture (as cited in the paper, reference [9]). Nieuwland, P. (1816), for the
   original cube construction. Close with an italicized attribution line in the style of the
   existing posts (see `bip-test.md`'s final line), noting the numerical companion code as an
   independent exploration built alongside the paper.

**Diagrams (Task 2a, produced as part of this same file):**

Add near the top of the file, once, before the first Mermaid block:
```html
<script src="https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js"></script>
<script>mermaid.initialize({ startOnLoad: true, theme: "neutral" });</script>
```

Diagram 1 (place in Section 4, polar duality), a `flowchart LR` in a `<pre class="mermaid">`
block, showing: `P passes through Q` (with certificate U, eta, delta) to, via "Theorem 10 (dual
pass-through)", `Q* passes through P*`; then two instantiation branches, one substituting
`(nu*O, O)` to conclude `C passes through (1/nu)C` (via the octahedron's antipodal-pair
argument), one substituting `(nu*C, C)` to conclude `O passes through (1/nu)O` (via Nieuwland's
construction); both branches converging on `nu_C = nu_O` (Theorem 14).

Diagram 2 (place in Section 5, the algorithm), a `flowchart TD` in a `<pre class="mermaid">`
block, showing: `Faces of Q (a_1...a_m)` to `Hyperplane arrangement (Algorithm 1)` to `O(m^3)
regions, each a bipartition (I+, I-)` to `One QCQP per region (Section 4.2 formulation)` to `Max
feasible nu across all regions` to `Nieuwland number of P (Theorem 18)`.

- [ ] **Step 1: Write the complete Markdown file**

Write all 8 sections plus both Mermaid diagrams and the iframe embed to
`src/writings/nieuwland-numbers-polar-duality.md`, following the content brief exactly and the
Global Constraints (no em dashes, general-audience tone, terminology from the paper).

- [ ] **Step 2: Proofread pass for the punctuation rule**

Search the file for the em dash character. It must return zero matches.

Run: `grep -n $'\xe2\x80\x94' src/writings/nieuwland-numbers-polar-duality.md`
Expected: no output (no matches).

- [ ] **Step 3: Verify every stated formula/value against source material**

Cross-check every number and formula in the file (nu_C = 3*sqrt(2)/4 ≈ 1.06066, the w1..w4 and
eta values, region counts 8/14, restart counts 3-4/37, sampling counts 300/168 and their
violation values) against `2608.14912v1.pdf` (already extracted to
`/private/tmp/claude-501/-Users-nrebello-Documents-PersonalWebsite/ffb8ffb8-12be-4200-a124-a9ec5e2f2a89/scratchpad/nieuwland/paper.txt`)
and `NOTES_FOR_RESEARCHER.md`. Fix any transcription errors found.

---

### Task 3: Wire the writing into the site

**Files:**
- Modify: `src/data/writings.ts`

**Interfaces:**
- Consumes: `src/writings/nieuwland-numbers-polar-duality.md` from Task 2.
- Produces: the writing is live at the `/writings` route under the slug
  `nieuwland-numbers-polar-duality`.

- [ ] **Step 1: Add the writing entry**

In `src/data/writings.ts`, add a new object to the `writings` array (matching the existing
`Writing` interface, `date: 'August 2026'`, `featured: true`):

```typescript
  {
    slug: 'nieuwland-numbers-polar-duality',
    title: "Passing a Cube Through Itself: On Nieuwland Numbers and Polar Duality",
    date: 'August 2026',
    summary:
      "Prince Rupert bet a cube could pass through a hole bored into an identical cube. Pieter Nieuwland found the largest scale factor for which that works in 1816, and it's stood as an isolated fact ever since. A new paper (arXiv:2608.14912) proves the cube and octahedron share that same number, using polar duality, and shows the general problem can be solved in polynomial time. I built an interactive 3D widget to explore the passage, plus a numerical companion to check the paper's claims from scratch.",
    featured: true,
  },
```

- [ ] **Step 2: Register the raw import and content map entry**

In `src/data/writings.ts`, add the import alongside the existing three:

```typescript
import nieuwlandContent from '../writings/nieuwland-numbers-polar-duality.md?raw';
```

And add it to `writingContent`:

```typescript
  'nieuwland-numbers-polar-duality': nieuwlandContent,
```

- [ ] **Step 3: Type-check**

Run: `npx tsc --noEmit` (or the project's existing type-check script if one exists in
`package.json`, check first with `cat package.json | grep -A2 '"scripts"'`).
Expected: no errors.

- [ ] **Step 4: Visual verification in the dev server**

Run: `npm run dev` (background), then load `/writings` and navigate to the new post.
Confirm: the post appears in the writings list with its summary, the full post renders with
working KaTeX math, both Mermaid diagrams render as diagrams (not raw text), the iframe loads
and is interactive, tables and code blocks match the existing writing-post styling, and the
table of contents sidebar picks up the `##` headings correctly.

- [ ] **Step 5: Commit**

```bash
git add src/writings/nieuwland-numbers-polar-duality.md src/data/writings.ts
git commit -m "$(cat <<'EOF'
feat: add Nieuwland numbers and polar duality writing

Explains arXiv:2608.14912 (Satheeskumar and Benoit), including an
interactive Three.js widget for Prince Rupert's Cube and findings from
an independent numerical companion implementation.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01AKHJuJi1c3CAQGJeAMZboz
EOF
)"
```

---

## Self-Review Notes

- **Spec coverage:** all 8 design-doc sections map to Task 2 content-brief items 1-8; the
  widget's full technical spec (Section 4 of the design) maps to Task 1; the two Mermaid
  diagrams (Section 5 of the design) map to Task 2a; file changes (Section 6 of the design) map
  to Tasks 2 and 3 exactly; testing (Section 7 of the design) maps to Task 1 Step 4, Task 3
  Steps 3-4.
- **Placeholder scan:** no "TBD"/"handle appropriately" language; every content item names
  specific values, formulas, or citations rather than describing prose to write without content.
- **Type consistency:** the `Writing` interface fields used in Task 3 Step 1 match
  `src/data/writings.ts:1-7` exactly (slug, title, date, summary, featured); the import/map
  pattern in Task 3 Step 2 matches the existing three entries exactly.
