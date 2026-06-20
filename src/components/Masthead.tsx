import { useState } from 'preact/hooks';
import { ThemeDropdown } from './ThemeDropdown';

type Page = 'home' | 'projects' | 'photography' | 'writings' | 'writing';

interface MastheadProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  onSectionFlip?: (sectionId: string) => void;
}

const NAV_SECTIONS = [
  { id: 'projects',    label: 'Projects'   },
  { id: 'writings',    label: 'Writings'   },
  { id: 'experiences', label: 'Experience' },
  { id: 'skills',      label: 'Skills'     },
  { id: 'education',   label: 'Education'  },
  { id: 'gallery',     label: 'Gallery'    },
  { id: 'sketchbook',  label: 'Sketchbook' },
];

export function Masthead({ currentPage, onNavigate, onSectionFlip }: MastheadProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const today = new Date().toLocaleDateString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric',
  });

  const handleSectionClick = (id: string) => {
    setMenuOpen(false);
    if (currentPage !== 'home') {
      onNavigate('home');
      setTimeout(() => onSectionFlip?.(id), 150);
    } else {
      onSectionFlip?.(id);
    }
  };

  return (
    <header className="newspaper-masthead">
      <button className="masthead-brand" onClick={() => { onNavigate('home'); setMenuOpen(false); }}>
        NJR
      </button>

      <nav className="masthead-nav">
        {NAV_SECTIONS.map(({ id, label }) => (
          <button key={id} onClick={() => handleSectionClick(id)}>
            {label}
          </button>
        ))}
      </nav>

      <div className="masthead-right">
        <span className="masthead-date">{today}</span>
        <ThemeDropdown />
        <button
          className="masthead-hamburger"
          onClick={() => setMenuOpen(o => !o)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
          )}
        </button>
      </div>

      {menuOpen && (
        <nav className="mobile-nav-drawer" aria-label="Mobile navigation">
          {NAV_SECTIONS.map(({ id, label }) => (
            <button key={id} className="mobile-nav-item" onClick={() => handleSectionClick(id)}>
              {label}
            </button>
          ))}
        </nav>
      )}
    </header>
  );
}
