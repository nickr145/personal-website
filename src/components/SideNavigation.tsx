import { useState, useEffect } from 'react';
import { ThemeDropdown } from './ThemeDropdown';

export function SideNavigation() {
  const [activeSection, setActiveSection] = useState<string>('profile');

  const sections = [
    { id: 'projects', label: 'Projects' },
    { id: 'experiences', label: 'Experiences' },
    { id: 'hobbies', label: 'Hobbies' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200; // offset for sticky header

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  return (
    <nav className="side-navigation">
      <ul className="nav-list">
        {sections.map((section) => (
          <li key={section.id}>
            <button
              className={`nav-link ${activeSection === section.id ? 'active' : ''}`}
              onClick={() => handleNavClick(section.id)}
            >
              {section.label}
            </button>
          </li>
        ))}
      </ul>

      {/* Bottom section */}
      <div className="sidenav-bottom">
        <ThemeDropdown />
      </div>
    </nav>
  );
}
