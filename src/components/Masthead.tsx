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
  const today = new Date().toLocaleDateString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric',
  });

  const handleSectionClick = (id: string) => {
    if (currentPage !== 'home') {
      onNavigate('home');
      setTimeout(() => onSectionFlip?.(id), 150);
    } else {
      onSectionFlip?.(id);
    }
  };

  return (
    <header className="newspaper-masthead">
      <button className="masthead-brand" onClick={() => onNavigate('home')}>
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
      </div>
    </header>
  );
}
