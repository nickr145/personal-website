// src/components/Header.tsx
import { useEffect, useState } from 'preact/hooks';
import { Moon, Sun, Menu, X } from 'lucide-preact';

const nav = [
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
];

type Mode = 'light' | 'dark' | 'system';

function getSaved(): Mode {
  return (localStorage.getItem('theme-choice') as Mode) || 'system';
}
function resolve(mode: Mode): 'light' | 'dark' {
  if (mode === 'system') {
    return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return mode;
}
function apply(mode: Mode) {
  const resolved = resolve(mode);
  document.documentElement.setAttribute('data-theme', resolved);
  localStorage.setItem('theme-choice', mode);
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [choice, setChoice] = useState<Mode>(() => getSaved());
  const resolved = resolve(choice);

  useEffect(() => {
    apply(choice);
    if (choice !== 'system') return;
    const mq = matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => apply('system');
    mq.addEventListener?.('change', onChange);
    return () => mq.removeEventListener?.('change', onChange);
  }, [choice]);

  function toggleTheme() {
    // simple light <-> dark toggle (ignores system)
    const next: Mode = resolved === 'dark' ? 'light' : 'dark';
    setChoice(next);
  }

  return (
    <header class="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur
                   data-[theme=dark]:border-gray-800 data-[theme=dark]:bg-gray-950/70">
      <div class="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#" class="text-lg font-semibold tracking-tight">Nicholas Rebello</a>

        <nav class="hidden gap-6 md:flex">
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              class="text-sm text-gray-600 transition hover:text-gray-900
                     data-[theme=dark]:text-gray-300 data-[theme=dark]:hover:text-white"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div class="flex items-center gap-2">
          <button
            class="rounded-xl border border-gray-300 px-3 py-1 text-sm transition hover:bg-gray-100
                   data-[theme=dark]:border-gray-700 data-[theme=dark]:hover:bg-gray-900"
            title="Toggle theme"
            onClick={toggleTheme}
          >
            {resolved === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            class="ml-1 md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div class="border-t border-gray-200 px-4 pb-4 pt-2 md:hidden
                    data-[theme=dark]:border-gray-800">
          <div class="flex flex-col gap-2">
            {nav.map((n) => (
              <a
                key={n.href}
                href={n.href}
                class="rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-100
                       data-[theme=dark]:text-gray-300 data-[theme=dark]:hover:bg-gray-900"
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
