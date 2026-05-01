import { useState } from 'preact/hooks';
import { useTheme } from '../contexts/ThemeContext';
import type { Theme } from '../contexts/ThemeContext';

const THEMES: { value: Theme; label: string }[] = [
  { value: 'broadsheet', label: 'Broadsheet' },
  { value: 'nightprint', label: 'Nightprint' },
  { value: 'sepia',      label: 'Sepia'      },
  { value: 'telegraph',  label: 'Telegraph'  },
  { value: 'herald',     label: 'Herald'     },
  { value: 'noir',       label: 'Noir'       },
];

export function ThemeDropdown() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <div className="theme-dropdown">
      <button
        className="theme-trigger"
        onClick={() => setOpen(!open)}
        aria-label="Change theme"
      >
        {THEMES.find(t => t.value === theme)?.label ?? 'Theme'}
      </button>

      {open && (
        <div className="theme-menu">
          {THEMES.map(({ value, label }) => (
            <button
              key={value}
              className={`theme-option ${theme === value ? 'active' : ''}`}
              onClick={() => { setTheme(value); setOpen(false); }}
            >
              <span className="theme-option-check">{theme === value ? '✓' : ''}</span>
              <span className="theme-option-text">{label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
