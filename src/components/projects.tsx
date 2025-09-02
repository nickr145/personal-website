// src/components/Projects.tsx
import { projects } from '../data/projects';

export function Projects() {
  return (
    <section id="projects" class="scroll-mt-24 py-16">
      <h2 class="text-2xl font-semibold">Projects</h2>
      <div class="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <article
            key={p.title}
            class="group rounded-2xl border border-gray-200 p-5 transition hover:-translate-y-0.5 hover:shadow-sm data-[theme=dark]:border-gray-800"
          >
            <h3 class="text-lg font-semibold">{p.title}</h3>
            <p class="mt-2 text-sm text-gray-600 data-[theme=dark]:text-gray-300">{p.description}</p>
            <div class="mt-4 flex flex-wrap gap-2">
              {p.tags.map((t) => (
                <span key={t} class="rounded-lg border border-gray-200 px-2 py-0.5 text-xs text-gray-600 data-[theme=dark]:border-gray-800 data-[theme=dark]:text-gray-300">
                  {t}
                </span>
              ))}
            </div>
            <div class="mt-4 flex gap-3 text-sm">
              {p.link && <a class="underline underline-offset-4" href={p.link} target="_blank">Live</a>}
              {p.repo && <a class="underline underline-offset-4" href={p.repo} target="_blank">Code</a>}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
