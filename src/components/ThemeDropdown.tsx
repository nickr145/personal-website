import { useState } from 'preact/hooks';
import { useTheme } from '../contexts/ThemeContext';

const themes = [
  'neutral',
  'neon',
  'teal',
  'lavender',
  'midnight',
] as const;

export function ThemeDropdown() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <div className="theme-dropdown">
      <button
        className="theme-trigger"
        onClick={() => setOpen(!open)}
      >
        {theme.charAt(0).toUpperCase() + theme.slice(1)}
      </button>

      {open && (
        <div className="theme-menu">
          {themes.map((t) => (
            <button
              key={t}
              className={`theme-option ${theme === t ? 'active' : ''}`}
              onClick={() => {
                setTheme(t);
                setOpen(false);
              }}
            >
              {theme === t && '✓ '}
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
