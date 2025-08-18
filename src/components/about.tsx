// src/components/About.tsx
export function About() {
  return (
    <section id="about" class="scroll-mt-24 py-16">
      <h2 class="text-2xl font-semibold">About</h2>
      <p class="mt-4 max-w-3xl text-gray-600 dark:text-gray-300">
        I’m a CS + Business student who enjoys building products end-to-end—from ideation and design to performant
        implementations. I’ve worked with SwiftUI, TypeScript, Preact/React, and enjoy shipping tiny, fast UIs.
      </p>
      <ul class="mt-6 grid gap-3 sm:grid-cols-2">
        <li class="rounded-xl border border-gray-200 p-4 dark:border-gray-800">💡 Product thinking & rapid prototyping</li>
        <li class="rounded-xl border border-gray-200 p-4 dark:border-gray-800">⚙️ TypeScript, Preact/React, SwiftUI</li>
        <li class="rounded-xl border border-gray-200 p-4 dark:border-gray-800">📈 Interest in AI/ML + fintech</li>
        <li class="rounded-xl border border-gray-200 p-4 dark:border-gray-800">🧪 Testing and performance budgets</li>
      </ul>
    </section>
  );
}
