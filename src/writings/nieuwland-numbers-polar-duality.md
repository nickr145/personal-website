# Passing a Cube Through Itself: On Nieuwland Numbers and Polar Duality

More than 300 years ago, Prince Rupert made a strange bet: that you could bore a hole through a cube and pass an identical cube through that hole, without the two ever touching. He was right, and for a long time that was the whole story. Then, in 1816, the Dutch scientist Pieter Nieuwland went further. He worked out exactly how much bigger the passing cube could be: a cube with side length $\frac{3\sqrt{2}}{4}$ times the original (about 1.06066) can still be threaded through a hole bored into a unit cube, and that is the largest size for which it works. That number stood alone for two centuries as the only Rupert-style bound anyone knew exactly.

A new paper, "On Nieuwland Numbers and Polar Duality" by Kavin Satheeskumar and Liam Benoit (arXiv:2608.14912), gives this old puzzle some company. It proves a conjecture posed by Steininger and Yurkevich: that the cube and the octahedron share the exact same value of this bound. It also gives, for the first time, a way to compute the bound for any convex shape in polynomial time, at least in theory. I read through the paper, built a small interactive widget to explore the cube's passage, and wrote a numerical companion of my own to check the paper's claims from scratch (results near the end, reported honestly as observation, not proof).

## What is Rupert's property, exactly?

Take any solid, convex shape: a cube, a tetrahedron, something stranger. That shape has **Rupert's property** if you can bore a tunnel through it and pass an identical copy of the shape through that tunnel without the copy ever touching the walls. Made precise: a shape $P$ "passes through" a shape $Q$ if there is some way to rotate $P$, shine a light through it from some direction, and see its shadow land entirely inside the shadow $Q$ casts from that same direction. Mathematicians call that shadow a projection, and the paper writes it as $\text{proj}_\eta$, the projection onto the plane perpendicular to a direction $\eta$. If a scaled-up copy of a shape can pass through the shape itself in this sense, the shape has Rupert's property, and the largest scale factor $\nu$ for which $\nu P$ can pass through $P$ is called the **Nieuwland number** of $P$.

Before this paper, the cube was the only shape with a genuinely interesting Nieuwland number (one bigger than 1) that anyone actually knew exactly. Other shapes, including the octahedron and tetrahedron, were shown decades ago to have Rupert's property at all, and recent computational work has produced good numerical estimates for many more solids, but pinning a value down exactly has stayed hard. That is what makes Theorem 14 in this paper notable: it is a second exact answer, not just another estimate.

## Try it yourself

I built a small interactive demo of the cube-through-cube case, using the paper's own numbers. The tunnel is fixed along the exact direction Nieuwland used in 1816 (so the demo matches his construction rather than searching blind). Drag the rotation sliders to hunt for an orientation where the smaller cube's shadow fits entirely inside the tunnel, push the scale slider past the Nieuwland limit and watch it turn red, since no orientation is known to make that work, and click "Snap to Nieuwland's solution" to see his 1816 construction directly.

<div style="margin: 2rem 0;">
  <iframe src="/widgets/rupert-cube.html" style="width: 100%; height: 900px; border: 1px solid #d8cfae; border-radius: 8px;" title="Interactive Prince Rupert's Cube demo" loading="lazy"></iframe>
  <p style="text-align: center; margin-top: 0.5rem;">
    <a href="/widgets/rupert-cube.html" target="_blank" rel="noopener">Open the demo fullscreen &#8594;</a>
  </p>
</div>

## Polar duality and the trick that connects the cube to the octahedron

The paper's proof of Theorem 14 rests on **polar duality**, a way of turning a convex shape inside out. Given a convex polytope $P$ containing the origin, its polar dual $P^*$ is built by swapping the roles of vertices and faces: each face of $P$ becomes a vertex of $P^*$, and each vertex of $P$ becomes a face of $P^*$. Applying the operation twice gets you back where you started, since $P^{**} = P$, and it comes with two useful facts the paper leans on: shrinking or enlarging a shape by a factor $c$ scales its dual by $\frac{1}{c}$ in the opposite direction, formally $(cP)^* = \frac{1}{c}P^*$, and containment flips: $P \subseteq Q$ exactly when $Q^* \subseteq P^*$. Since the cube and the octahedron happen to be duals of each other (the cube's 8 vertices correspond to the octahedron's 8 faces, and vice versa), anything you can prove about one that survives duality tells you something about the other.

The paper's Theorem 10 makes this precise for the passing-through relation: if $P$ passes through $Q$ with a certificate that also satisfies one extra condition, then $Q^*$ passes through $P^*$ with a related certificate. That extra condition is not automatic, so the real work is showing it holds in the two cases that matter here. For the octahedron, it holds because of a simple counting fact: the octahedron has only 6 vertices, but they come in 3 antipodal pairs (each vertex has an exact opposite), so there are really only 3 independent directions to worry about, exactly the dimension of the space. For the cube, it holds because of Nieuwland's own 1816 construction: take the square with vertices $w_1 = (-\tfrac{1}{2}, 1, -1)$, $w_2 = (1, 1, \tfrac{1}{2})$, $w_3 = (\tfrac{1}{2}, -1, 1)$, $w_4 = (-1, -1, -\tfrac{1}{2})$, and the direction $\eta = (-\tfrac{2}{3}, \tfrac{1}{3}, \tfrac{2}{3})$, which is perpendicular to all four points. Offsetting each $w_i$ by $\pm\nu\eta$, using $\nu = \frac{3\sqrt{2}}{4}$, produces the 8 vertices of the passing cube, and because the projection of that cube along $\eta$ lands exactly on the square, which itself sits inside the original cube, the passage works with no room to spare.

Put those two pieces together and you get Theorem 14: since an octahedron-through-octahedron certificate can be dualized into a cube-through-cube certificate and Nieuwland's cube-through-cube certificate can be dualized into an octahedron-through-octahedron one, each shape's Nieuwland number is at least as large as the other's, which forces them to be equal.

<pre class="mermaid">
flowchart LR
    A["P passes through Q<br/>certificate (U, &eta;, &delta;)"] -->|"Theorem 10<br/>(dual pass-through condition)"| B["Q* passes through P*"]
    B --> C["Instantiate (&nu;O, O):<br/>antipodal vertex pairs give<br/>the extra condition for free"]
    B --> D["Instantiate (&nu;C, C):<br/>Nieuwland's 1816 construction<br/>gives the extra condition"]
    C --> E["C passes through (1/&nu;)C"]
    D --> F["O passes through (1/&nu;)O"]
    E --> G["&nu;_C = &nu;_O<br/>(Theorem 14)"]
    F --> G
</pre>

## From an impossible search to a polynomial-time algorithm

Definition 2 says $P$ passes through $Q$ if there exist a rotation $U$, a direction $\eta$, and a translation $\delta$ such that the projected shadow fits. Turning that into something a computer can search over is not immediate: the paper's Proposition 3 rewrites it as a system where, for each vertex $v_k$ of $P$, there is some number $z_k$ making $A(Uv_k + z_k\eta + \delta) \le b$ hold, where $Q = \{x : Ax \le b\}$. That is a legitimate optimization problem, a quadratically constrained quadratic program, or QCQP, but it has one extra variable $z_k$ per vertex of $P$, which makes it too large to hand to a standard solver for anything but the smallest shapes.

Theorem 15 removes those extra variables. The idea, borrowed in spirit from a classical technique called Fourier-Motzkin elimination, is to split the faces of $Q$ into two groups based on the sign of $a_i \cdot \eta$ for each face normal $a_i$, and show that a valid $z_k$ exists for every vertex exactly when a certain inequality holds between every pair of faces drawn from opposite groups. The catch is that which faces belong to which group (the bipartition) depends on $\eta$, and there are exponentially many possible bipartitions to check if you consider them blindly.

Lemma 16 is what makes the search tractable: the bipartitions that can actually occur are exactly the ones corresponding to regions carved out of space by the planes $a_i \cdot \eta = 0$, one plane per face normal, all passing through the origin. The paper cites a known bound of $O(m^3)$ regions for $m$ planes in general position (Algorithm 1 walks through them one plane at a time, splitting each existing region into at most two smaller ones and discarding any that end up empty), which is enough to prove Theorem 18: there is an algorithm that computes the Nieuwland number of any convex polytope in polynomial time. The paper is upfront that this result is theoretical rather than practical, since the polynomial has a large enough degree, driven by a quantifier-elimination step used in the proof, that nobody would actually run it on real shapes.

<pre class="mermaid">
flowchart TD
    A["Face normals of Q<br/>a_1 ... a_m"] --> B["Hyperplane arrangement<br/>(Algorithm 1)"]
    B --> C["Polynomially many regions,<br/>each a bipartition (I+, I-)"]
    C --> D["One QCQP per region<br/>(Section 4.2 formulation)"]
    D --> E["Max feasible &nu;<br/>across all regions"]
    E --> F["Nieuwland number of P<br/>(Theorem 18)"]
</pre>

## What I found running the numbers myself

Everything above is the paper's own, proven work. Out of curiosity, I also built a small numerical companion from scratch, independent of the paper's authors, to see how these ideas behave computationally on the cube and octahedron. This section is honestly labeled: it is computational exploration, not a verification of the paper's proofs, which stand on their own regardless of what my code finds.

The first thing worth reporting is how many regions Algorithm 1 actually produces. A cube has 6 faces and an octahedron has 8, so a naive reading of the region-count formula (roughly $m^2 - m + 2$ for $m$ planes through the origin, the tight version of the paper's own $O(m^3)$ bound) would predict 32 regions for the cube and 58 for the octahedron. The real counts are much smaller, because opposite faces of a point-symmetric solid like the cube or octahedron share the same plane through the origin: a face and its antipodal partner both satisfy $a_i \cdot \eta = 0$, so the *effective* number of distinct planes is half the face count.

| Solid | Faces | Distinct hyperplanes | Naive count ($m^2 - m + 2$ on raw faces) | Actual region count |
| --- | --- | --- | --- | --- |
| Cube | 6 | 3 | 32 | 8 |
| Octahedron | 8 | 4 | 58 | 14 |

I checked this two independent ways (Monte Carlo sampling and a direct transcription of Algorithm 1), and both agree; the exact quadratic formula, applied to distinct hyperplanes rather than raw faces, matches precisely.

The second finding is about how hard it gets to *certify* feasibility near the critical value. Away from $\nu^*$, a handful of random restarts of a local numerical search reliably found a valid passing orientation for the cube: 3 to 4 restarts typically sufficed. Within $1.6 \times 10^{-4}$ of $\nu^* = \frac{3\sqrt{2}}{4}$, that number jumped to 37. The search landscape gets much rougher right at the boundary, which is exactly where you would expect it to, since that is where the feasible region is shrinking to a single point.

The third finding suggests the paper's hyperplane arrangement is doing more than expository work. I tried two ways of picking restart points for the octahedron at $\nu = 1.0594$: sampling uniformly at random, and sampling from within each arrangement region separately (using the same regions Algorithm 1 produces). Three hundred uniform restarts failed to certify feasibility at all (best violation $+1.6 \times 10^{-4}$, still on the wrong side); 168 region-guided samples succeeded (best violation $-5.7 \times 10^{-4}$, comfortably feasible), using fewer than half as many attempts.

| Sampling strategy | Restarts used | Certified feasible at &nu; = 1.0594? | Best violation found |
| --- | --- | --- | --- |
| Uniform | 300 | No | +1.6 &times; 10<sup>-4</sup> |
| Region-guided | 168 | Yes | -5.7 &times; 10<sup>-4</sup> |

That is a hypothesis the data supports, not a proven claim: the arrangement structure Lemma 16 was built to make the algorithm polynomial also seems to be a genuinely useful sampling prior for numerical search, not just a proof device. Finally, and consistent with (though certainly not additional proof of) Theorem 14: under identical search settings, both the cube and the octahedron independently certified feasibility at the same value, $\nu = 1.0594$.

## What's still open

The paper is explicit that Theorem 14 answers a narrower question than the one that motivated it. The real question, stated plainly in the paper's closing section, is whether every point-symmetric convex polytope shares its Nieuwland number with its polar dual, and the cube-octahedron result is a proof of concept for a single pair, not a general theorem. The proof techniques used here lean on properties specific to each shape (the octahedron's small, antipodal vertex set; the cube's one known optimal construction), so extending the result is not just a matter of repeating the argument elsewhere.

There is also a very concrete open case: nobody currently knows whether the rhombicosidodecahedron, a far more complex solid, has Rupert's property at all. The paper suggests that a more exact way of solving the QCQPs from Section 4 (rather than the polynomial-time but impractical version proven here) could be enough to finally settle it.

## References

- Satheeskumar, K. and Benoit, L. (2026). "On Nieuwland Numbers and Polar Duality." arXiv:2608.14912.
- Steininger, J. and Yurkevich, S., for the cube-octahedron conjecture this paper resolves (cited as reference [9] in the paper).
- Nieuwland, P. (1816), for the original cube-through-cube construction that makes Lemma 13 possible.

*The numerical companion referenced above is an independent, from-scratch implementation built alongside the paper, not part of it; any errors in interpreting the paper's results are mine, not the authors'. Questions or thoughts? Reach out!*
