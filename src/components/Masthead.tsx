import { ThemeDropdown } from './ThemeDropdown';

type Page = 'home' | 'projects' | 'gallery' | 'sketchbook';

interface MastheadProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  onSectionFlip?: (sectionId: string) => void;
}

const NAV_SECTIONS = [
  { id: 'profile',     label: 'About'      },
  { id: 'projects',    label: 'Projects'   },
  { id: 'experiences', label: 'Experience' },
  { id: 'hobbies',     label: 'Hobbies'   },
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
        The Nicholas Times
      </button>

      <nav className="masthead-nav">
        {NAV_SECTIONS.map(({ id, label }) => (
          <button key={id} onClick={() => handleSectionClick(id)}>
            {label}
          </button>
        ))}
        <button
          className={currentPage === 'gallery' ? 'active' : ''}
          onClick={() => onNavigate('gallery')}
        >
          Gallery
        </button>
        <button
          className={currentPage === 'sketchbook' ? 'active' : ''}
          onClick={() => onNavigate('sketchbook')}
        >
          Sketchbook
        </button>
      </nav>

      <div className="masthead-right">
        <span className="masthead-date">{today}</span>
        <ThemeDropdown />
      </div>
    </header>
  );
}
