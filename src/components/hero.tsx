import InteractiveParticleCanvas from "./particlePlayground";

// src/components/Hero.tsx
export function Hero() {
  return (
    <section class="py-20">
      <div class="grid items-center gap-10 md:grid-cols-2">
        <div>
          <p class="text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400">Hello, I’m</p>
          <h1 class="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">Nicholas Rebello</h1>
          <p class="mt-4 text-lg text-gray-600 dark:text-gray-300">
            CS + Business student building fast, delightful web & mobile experiences. Interested in AI/ML, product, and fintech.
          </p>
        </div>

        <div className="mx-auto my-12">
          <InteractiveParticleCanvas width={720} height={420} />
        </div>
      </div>
    </section>
  );
}
