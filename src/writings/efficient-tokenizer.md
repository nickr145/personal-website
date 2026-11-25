# Beyond Frequency: An Information-Theoretic Approach to Byte-Pair Encoding

Tokenization is the first step in an NLP pipeline: it turns raw text into numbers your model can learn from. People tend to treat it as solved. Use BPE, move on. I wondered whether tokenizer design matters more than that attitude suggests.

I spent three weeks designing and implementing a new tokenizer to find out. The results surprised me.

## The Problem: BPE Only Counts

Byte-pair encoding (BPE) is simple:

1. Start with bytes (0-255)
2. Count every adjacent pair in your data
3. Merge the most-frequent pair
4. Repeat until you reach your target vocabulary size

It works, and most modern language models use a variant of it (GPT-2, GPT-3, Claude). My issue is that **BPE merges by frequency alone**.

Say the pair "th" appears 10,000 times and "qu" appears 5,000 times. BPE merges "th" first. But merging "qu" might reduce information loss more, and it might be the better token boundary from an information-theoretic view. Standard BPE never checks. It just counts.

## The Idea: Let Information Theory Guide the Merges

While reading about tokenization, I started to think that some merges compress data better than others, even when they're less frequent.

So I asked: *What if we weighted merge decisions by information gain instead of just frequency?*

The tool for that is **entropy**. In information theory, entropy measures the average information content of a probability distribution, in bits:

```
H = -Σ p(token) * log₂(p(token))
```

When you merge two tokens into one, the token distribution changes, and the entropy can go down. That means you've saved bits and compressed better.

My hypothesis: **prefer merges that reduce entropy the most, not just merges that happen most often.**

The formula:

```
significance_score = entropy_reduction × merge_frequency
best_merge = argmax(significance_score)
```

Why multiply them?
- **Entropy reduction** measures *quality*: how much compression you gain
- **Merge frequency** measures *impact*: how often the merge applies
- **Their product** favors merges that are both theoretically sound *and* common enough to matter

## Building It: Three Weeks, Two Phases

### Week 1: Tokenizer Design

I implemented two tokenizers in Python from scratch:

1. **StandardBPE**: vanilla, frequency-only (the baseline)
2. **SignificanceAwareBPE**: entropy-weighted (my approach)

Both inherit from a shared `Tokenizer` base class. The difference is one line in the merge selection logic, but it compounds across hundreds of merge decisions.

I benchmarked them on Shakespeare's complete works:

| Tokenizer | Compression | Merge Speed | Improvement |
|-----------|------------|-------------|------------|
| StandardBPE | 4.2x | 0.8s |  -  |
| **SignificanceAwareBPE** | **4.5x** | **1.2s** | **+7%** |

**Result**: 7% better compression. Not revolutionary, but measurable. The extra 0.4s of training time (50% slower) seemed worth it.

### Week 2: Integration with a Real Model

Next I built three Shakespeare GPT models with identical architecture (8 layers, 128 embedding dim), each using a different tokenizer:

1. Character-level (baseline)
2. StandardBPE
3. SignificanceAwareBPE

**Results**:

| Model | Seq Length | Val Loss | Perplexity | Time/Epoch |
|-------|-----------|----------|-----------|-----------|
| Char-level | 128.0 | 1.45 | 4.26 | 45s |
| StandardBPE | 44.8 | 1.42 | 4.14 | 22s |
| **SignificanceAwareBPE** | **41.0** | **1.39** | **4.01** | **20s** |

In plain terms:

- **68% shorter sequences** (128 → 41 tokens)
- **6% better perplexity** (4.26 → 4.01) from the same model
- **2.25x faster training** (45s → 20s per epoch), since fewer tokens means less computation
- **90% smaller attention matrices** (128² vs 41²), which cuts memory use

The model architecture is identical. Only the tokenizer changed.

## Week 3: Understanding Token Importance

I wanted to know *which tokens matter* to the model, so I measured importance three ways:

### 1. Frequency-Based
How often does each token appear?

```python
importance = count(token) / total_tokens
```

A simple baseline. The top tokens are THE, AND, and punctuation, as you'd expect.

### 2. Attention-Based
Which tokens does the model attend to most?

```python
importance = sum(attention_weights[token]) across all heads/layers
```

I hooked into the transformer's attention layers and measured which tokens receive high attention. The result is very similar to frequency, but not identical: rare tokens can get high attention when they matter in context.

### 3. Gradient-Based
How much does loss change if we perturb a token?

```python
importance = |loss(embedding + ε) - loss(embedding)| / ε
```

This one is expensive, but it shows something the others miss. Rare tokens like "THOU" (in Shakespeare) have high gradient importance: changing their embedding noticeably shifts predictions. Frequency alone would underrate them.

All three metrics correlate but diverge in useful ways. Frequency captures prevalence, attention captures what the model actually uses, and gradients capture predictive sensitivity. No single metric tells the whole story.

## What Surprised Me

1. **Tokenization mattered more than I expected.** A better tokenizer gave a 6% perplexity improvement, which is comparable to some architectural changes.

2. **The theory held up.** An information-theoretic principle (entropy minimization) produced a practical gain, so principled design and empirical results didn't pull in different directions.

3. **Rare tokens can be critical.** A token can be low-frequency but high-importance. Entropy weighting doesn't catch this on its own, but gradient-based analysis does.

4. **Sequence length was the real win.** The perplexity gain was small. The 68% shorter sequences are what matter in practice, since they allow bigger models or longer contexts on the same compute budget.

5. **Most of the gain comes from BPE itself.** Going from character-level to any BPE variant is the biggest jump. The gap between standard and significance-aware is modest but real.

## What I'd Do Next

If I continue (Phase 3 would be a self-improving tokenizer), I'd start here:

1. **Test on more kinds of data.** Shakespeare is linguistically unusual. Would entropy weighting help with modern prose, code, scientific papers, or other languages?

2. **Scale up.** Try GPT-2 or GPT-3 scale models. The absolute numbers may change.

3. **Compare to production tokenizers** such as the GPT-2 tokenizer and LLaMA's, to see how this stacks up.

4. **Make it adaptive.** Use token importance scores during training to refine the vocabulary as the model learns. That feedback loop could improve results further.

## The Takeaway

Tokenization deserves better than blind frequency counting.

Entropy reduction is measurable, grounded in theory, and it worked here.

You don't have to be a researcher to try this. If you're building a language model:

1. Consider entropy-weighted BPE instead of vanilla BPE
2. Measure token importance in your model (attention, gradients)
3. Don't assume rare tokens are unimportant
4. Remember that tokenization cascades: good tokenization enables better models

A 6% perplexity improvement might not sound huge, but it compounds across a large model and dataset, and it can be the difference between shipping and not shipping.

## Open Questions

- Does entropy weighting help for non-English languages?
- What about code or scientific text?
- Can we do adaptive tokenization during training?
- How does this scale to 1B+ parameter models?
- What's the interaction with other efficiency techniques (quantization, distillation)?

I want to explore these. For now, my read is that **significance-aware BPE is a solid improvement over standard BPE**, and I'd recommend it to anyone serious about tokenizer design.

---

## Code & Results

The full implementation, benchmarks, and analysis are available on GitHub: [efficient-tokenizer](https://github.com/nickr145/efficient-tokenizer)

**Key files**:
- `bpe_tokenizer.py`: core implementations
- `shakespeare_gpt_v2.py`: model integration
- `token_importance.py`: importance analysis
- `analysis_week2.ipynb`: full results and visualizations

**Tech stack**: Python, PyTorch, NumPy, Matplotlib

---

## Lessons Learned

1. **A small change can add up.** One line in the merge selection logic, compounded across hundreds of merges.

2. **Measure everything.** Without benchmarks I wouldn't have seen the 7% and 6% improvements.

3. **Theory can pay off.** I worried entropy-weighted merges were too academic. They worked.

4. **Different metrics tell different stories.** Frequency, attention, and gradients all measure importance differently, so use all three.

5. **My first guess was off.** I expected gradient importance to matter most. It was interesting, but not the biggest factor.

---

## Final Thought

Every NLP project starts with tokenization, and it's easy to overlook. It shapes everything downstream: sequence length, model performance, compute cost, interpretability.

Better tokenization isn't flashy and won't headline a paper. But it helps you ship better models, faster. If you're working on an LLM project, it's worth an afternoon of thought.

If this was useful, share it with someone building language models.

---