// src/components/Footer.tsx
export function Footer() {
  return (
    <footer class="mx-auto mt-10 max-w-6xl px-4 pb-10 pt-6 text-sm text-gray-500 dark:text-gray-400">
      <div class="flex flex-col items-center justify-between gap-3 sm:flex-row">
        <p>© {new Date().getFullYear()} Your Name. Built with Preact + Tailwind.</p>
        <a class="underline underline-offset-4" href="#top">Back to top</a>
      </div>
    </footer>
  );
}
