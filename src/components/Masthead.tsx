import { ThemeDropdown } from './ThemeDropdown';

type Page = 'home' | 'projects' | 'photography';

interface MastheadProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  onSectionFlip?: (sectionId: string) => void;
}

const NAV_SECTIONS = [
  { id: 'profile',     label: 'About'      },
  { id: 'projects',    label: 'Projects'   },
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
        Nicholas J Rebello
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
        {/* Place your PDF at /public/Nicholas_Rebello_Resume.pdf */}
        <a href="/Nicholas_Rebello_Resume.pdf" className="resume-btn" target="_blank" rel="noopener noreferrer">
          Resume ↓
        </a>
        <ThemeDropdown />
      </div>
    </header>
  );
}
