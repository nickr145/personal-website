// src/components/Contact.tsx
export function Contact() {
  return (
    <section id="contact" class="scroll-mt-24 py-16">
      <h2 class="text-2xl font-semibold">Contact</h2>
      <p class="mt-4 max-w-2xl text-gray-600 dark:text-gray-300">
        Want to collaborate or chat about a project? Reach out anytime.
      </p>

      <div class="mt-6 flex flex-col gap-3 sm:flex-row">
        <a
          class="inline-flex items-center justify-center rounded-xl border border-gray-900 px-4 py-2 text-sm transition hover:-translate-y-0.5 dark:border-gray-100"
          href="mailto:nicholas.rebello@gmail.com"
        >
          Email me
        </a>
        <a
          class="inline-flex items-center justify-center rounded-xl border border-gray-300 px-4 py-2 text-sm transition hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-900"
          href="https://www.linkedin.com/in/nicholas-rebello-82609112b/" target="_blank"
        >
          LinkedIn
        </a>
        <a
          class="inline-flex items-center justify-center rounded-xl border border-gray-300 px-4 py-2 text-sm transition hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-900"
          href="https://github.com/nickr145" target="_blank"
        >
          GitHub
        </a>
      </div>
    </section>
  );
}
