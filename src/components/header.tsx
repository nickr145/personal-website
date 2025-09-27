// src/components/Header.tsx
import { useState } from 'preact/hooks';

const nav = [
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header class="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur dark:border-gray-800 dark:bg-gray-950/70">
      <div class="mx-auto flex h-16 max-w-6xl items-center px-4 sm:px-6 lg:px-8">
        {/* <a href="#" class="text-lg font-semibold tracking-tight">Nicholas Rebello</a> */}

        <nav class="flex-1 flex justify-center gap-6">
          {nav.map((n) => (
            <a 
              key={n.href} 
              href={n.href}
              class="text-sm text-gray-600 transition hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
            >
              {n.label}
            </a>
          ))}
        </nav>
      </div>

      {/* Mobile menu */}
      {open && (
        <div class="border-t border-gray-200 px-4 pb-4 pt-2 md:hidden dark:border-gray-800">
          <div class="flex flex-col gap-2">
            {nav.map((n) => (
              <a
                key={n.href}
                href={n.href}
                class="rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-900"
                onClick={() => setOpen(false)}
              >
                {n.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
