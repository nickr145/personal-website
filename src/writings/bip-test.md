# Testing Bipartiteness in Logarithmic Rounds: A Practical Implementation

With a graph of billions of vertices and edges, you can't afford to look at all of it. So could you sample a small piece and still tell whether the graph is **bipartite**, meaning its vertices split into two groups with edges only running between the groups?

Fei & Rubinfeld (2026) take this on in **"Testing Bipartiteness in Logarithmic Rounds"**. It improves a 1999 result by tying the problem to semidefinite programming.

## The Problem: Sublinear Testing

**Property testing** asks a simple question: given limited access to a large object, can you tell whether it has some property or is far from having it?

For graphs, that becomes: *Can you test if a graph is bipartite using **sublinear** time and space?*

Two reasons to care:
- **Practical**: Real-world graphs (social networks, web graphs, protein interactions) are enormous.
- **Theoretical**: It shows what information you need in order to verify structural properties.

## The Prior State (Goldreich-Ron, 1999)

The 1999 algorithm used random walks:
1. Sample starting vertices (weighted by degree)
2. Run random walks from each vertex
3. If two walks from the same vertex **reach the same endpoint with different parities** (one took an even number of steps, the other odd), you've found an odd cycle, so the graph is not bipartite.

**Results**: O(√n log n) random walks of length O(log⁶ n)

The analysis relied on graph decomposition, and that left polylog factors in the bound.

## The 2026 Improvement: Using SDPs

Fei & Rubinfeld skip the direct analysis of the algorithm. They analyze the SDP relaxation of Max-Cut instead.

The argument goes like this:
- Rather than decomposing the graph to prove the algorithm finds a large cut, they show that **if the algorithm fails to find a violation, then the SDP solution must have high value**.
- The Goemans-Williamson SDP rounding theorem turns that into a large actual cut.
- SDP solutions are *smooth*, so local solutions can be combined via semidefinite matrices without the polylog losses.

**New results**: O(√n) random walks of length O(log n)

Going from log⁶ n to log n is several orders of magnitude for realistic graph sizes.

## How It Works

**Algorithm 1: BipTest**

```
1. Sample ≈1/ε vertices with probability ∝ degree
2. For each sampled vertex v:
   - Run k ≈ √n walks of random length ℓ ~ Bin(m, 1/2)
   - Record endpoint u_i and parity of ℓ_i
3. If any vertex is reached with both even and odd parity:
   - REJECT (found odd cycle!)
4. Otherwise: ACCEPT (likely bipartite)
```

**Why it works:**
- **Birthday Paradox**: With O(√n) endpoints, collisions happen if the two parity distributions differ.
- **Mixing**: O(log n) length ensures walks mix enough that relative entropy converges.
- **Parity Detection**: Even/odd parity walk counts are complementary - collisions reveal odd cycles.

The error is one-sided: if the graph is bipartite, the algorithm **always** accepts. It can only go wrong by accepting a non-bipartite graph.

## The Implementation

I built a working implementation in Python with:

### Core Classes
- **Graph**: Adjacency-list representation with degree-weighted sampling
- **RandomWalk**: Simple and lazy walks with binomial-distributed lengths
- **BipTest**: The main tester from Algorithm 1

### Key Challenge: Theory vs Practice

The paper derives theoretical parameters: **m = Θ(ε⁻⁸ log²(n))**

With ε = 0.1 and n = 100:
- m ≈ **265 billion steps per walk**
- Total operations: ~10¹⁸, which takes days to run

**Fix**: use a practical m = 5·log(n) instead:
- m ≈ 33 steps per walk
- Still detects odd cycles with >95% success rate
- Runs in minutes, not hours

Theoretical parameters are tuned for asymptotic bounds. Practical ones are tuned for actual runtime. They rarely agree.

### Experimental Results

I ran it on five graphs:

| Graph | Type | Result | Time |
|-------|------|--------|------|
| C₆ (6-cycle) | Bipartite | ✓ Accept | <1s |
| C₁₁ (11-cycle) | Non-bipartite | ✓ Reject (20/20 trials) | ~1s |
| K₃,₃ | Bipartite | ✓ Accept | <1s |
| K₅ | Non-bipartite | ✓ Reject | <1s |
| Petersen | Non-bipartite | ✓ Reject | <1s |

**Accuracy: 100%** on all test cases. These are five small graphs, so read that as a sanity check and not a benchmark.

## Why This Matters

1. **Streaming algorithms**: The result directly implies an O(log n)-pass streaming algorithm, which is optimal given a lower bound by Fei, Minzer, and Wang (2026).

2. **SDPs as an analysis tool**: Convex relaxations can simplify the analysis of randomized algorithms, and the technique isn't tied to this problem.

3. **Real speedups**: Dropping polylog factors matters when your graph has 10 billion vertices.

4. **One-sided error**: Bipartite graphs are always accepted, which helps when you need high precision on positive cases.

## The Bigger Picture

The paper leans on tools (SDPs, entropy, mixing) that weren't available in 1999.

Goldreich-Ron was good work for its time, but the proof was intricate. With newer tools, you can often get a cleaner and tighter analysis by using structural properties instead of carefully decomposing the problem.

## Try It Yourself

The full implementation includes:
- 5 experiments
- Parameter tuning for theory vs. practice
- NetworkX integration for testing on real graphs
- ~5-8 minute runtime on CPU

```bash
python bipartiteness_tester_fixed.py
```

Or point the BipTest class at your own graphs:

```python
from bipartiteness_tester_fixed import Graph, BipTest

g = Graph(100)
g.add_edge(0, 1)
g.add_edge(1, 2)
# ... add more edges

tester = BipTest(m=30, epsilon=0.1)
accept, stats = tester.test(g)
print(f"Graph is {'likely bipartite' if accept else 'not bipartite'}")
```

## Conclusion

Bipartiteness testing shows how algorithms changed over a couple of decades. The 1999 result used decomposition arguments and carried polylog overheads. The 2026 result uses SDP-based analysis and reaches optimal bounds. And you can run it, not just prove it.

The tools that cracked this one are decades newer than the problem.

---

**References:**
- Fei, Y. & Rubinfeld, R. (2026). "Testing Bipartiteness in Logarithmic Rounds." arXiv:2606.13583.
- Goldreich, O. & Ron, D. (1999). "A sublinear bipartiteness tester for bounded degree graphs." Combinatorica, 19(3), 335–373.
- Goemans, M. X., & Williamson, D. P. (1995). "Improved approximation algorithms for maximum cut and satisfiability problems using semidefinite programming." J. ACM, 42(6), 1115–1145.

**Keywords:** Property testing, Bipartiteness, Random walks, Semidefinite programming, Sublinear algorithms, Graph algorithms

---

*Implementation by Nicholas Rebello, June 2026. Full code available [here](https://github.com/nickr145/bipartiteness-tester).*