// src/components/Hero.tsx
export function Hero() {
  return (
    <section class="py-20">
      <div class="grid items-center gap-10 md:grid-cols-2">
        <div>
          <p class="text-sm uppercase tracking-wider text-gray-500 data-[theme=dark]:text-gray-400">Hello, I’m</p>
          <h1 class="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">Nicholas Rebello</h1>
          <p class="mt-4 text-lg text-gray-600 data-[theme=dark]:text-gray-300">
            CS + Business student building fast, delightful web & mobile experiences. Interested in AI/ML, product, and fintech.
          </p>
          <div class="mt-8 flex flex-wrap gap-3">
            <a
              href="#projects"
              class="inline-flex items-center rounded-xl border border-gray-900 px-4 py-2 text-sm transition hover:-translate-y-0.5 data-[theme=dark]:border-gray-100"
            >
              View Projects
            </a>
            <a
              href="/resume.pdf"
              class="inline-flex items-center rounded-xl border border-gray-300 px-4 py-2 text-sm transition hover:bg-gray-100 data-[theme=dark]:border-gray-700 data-[theme=dark]:hover:bg-gray-900"
            >
              Résumé
            </a>
          </div>
        </div>

        <div class="mx-auto w-full max-w-sm rounded-3xl border border-gray-200 bg-white/60 p-6 shadow-sm backdrop-blur data-[theme=dark]:border-gray-800 data-[theme=dark]:bg-gray-900/50">
          <div class="aspect-square w-full rounded-2xl bg-gradient-to-br from-indigo-200 via-sky-200 to-emerald-200 data-[theme=dark]:from-indigo-900/40 data-[theme=dark]:via-sky-900/40 data-[theme=dark]:to-emerald-900/40" />
          <p class="mt-4 text-center text-sm text-gray-500 data-[theme=dark]:text-gray-400">Add a headshot or logo here</p>
        </div>
      </div>
    </section>
  );
}
