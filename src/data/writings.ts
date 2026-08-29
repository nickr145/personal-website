export interface Writing {
  slug: string;
  title: string;
  date: string;
  summary: string;
  featured?: boolean;
}

export const writings: Writing[] = [
  {
    slug: 'efficient-tokenizer',
    title: 'Beyond Frequency: An Information-Theoretic Approach to Byte-Pair Encoding',
    date: 'May 2026',
    summary:
      'Standard byte-pair encoding (BPE) merges tokens blindly by frequency. What if we designed tokenization using information theory instead? I built significance-aware BPE and measured the impact: 7% better compression, 68% shorter sequences, and 6% lower perplexity on the same model. Here\'s what I learned.',
    featured: true,
  },
  {
    slug: 'bip-test',
    title: 'Testing Bipartiteness in Logarithmic Rounds: From Theory to Implementation',
    date: 'June 2026',
    summary:
      'A deep dive into how modern algorithm analysis can dramatically improve real-world performance. We explore the Fei & Rubinfeld (2026) breakthrough that cuts random walk complexity from O(log⁶ n) to O(log n) using semidefinite programming, walk through the elegant parity-based detection of odd cycles, and implement a fully-working tester that achieves 100% accuracy while running ~10,000× faster than theory predicts.',
    featured: true,
  },
  {
    slug: 'collatz-conjecture-computational-analysis',
    title: 'Computational Analysis of the Collatz Conjecture',
    date: 'July 2026',
    summary:
      'An exploration of the famous unsolved problem in mathematics. We analyze the behavior of the Collatz sequence using computational methods, identify patterns, and discuss the implications for number theory and algorithm design.',
    featured: true,
  },
  {
    slug: 'nieuwland-numbers-polar-duality',
    title: "Passing a Cube Through Itself: On Nieuwland Numbers and Polar Duality",
    date: 'August 2026',
    summary:
      "Prince Rupert bet a cube could pass through a hole bored into an identical cube. Pieter Nieuwland found the largest scale factor for which that works in 1816, and it's stood as an isolated fact ever since. A new paper (arXiv:2608.14912) proves the cube and octahedron share that same number, using polar duality, and shows the general problem can be solved in polynomial time. I built an interactive 3D widget to explore the passage, plus a numerical companion to check the paper's claims from scratch.",
    featured: true,
  },
];

import bipTestContent from '../writings/bip-test.md?raw';
import efficientTokenizerContent from '../writings/efficient-tokenizer.md?raw';
import collatzContent from '../writings/collatz-conjecture-computational-analysis.md?raw';
import nieuwlandContent from '../writings/nieuwland-numbers-polar-duality.md?raw';

export const writingContent: Record<string, string> = {
  'efficient-tokenizer': efficientTokenizerContent,
  'bip-test': bipTestContent,
  'collatz-conjecture-computational-analysis': collatzContent,
  'nieuwland-numbers-polar-duality': nieuwlandContent,
};
