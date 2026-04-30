import { useState, useEffect } from 'preact/hooks';
import { Masthead } from './components/Masthead';
import { NewspaperPage } from './components/NewspaperPage';
import { ProjectsCollection } from './components/ProjectsCollection';
import { GalleryCollection } from './components/GalleryCollection';

type Page = 'home' | 'projects' | 'photography';

function pathToPage(path: string): Page {
  if (path === '/projects')    return 'projects';
  if (path === '/photography') return 'photography';
  return 'home';
}

function pathToSection(path: string): string | null {
  if (path === '/gallery')    return 'gallery';
  if (path === '/sketchbook') return 'sketchbook';
  return null;
}

const SECTION_URLS: Record<string, string> = {
  gallery: '/gallery', sketchbook: '/sketchbook',
};

export function App() {
  const [currentPage, setCurrentPage] = useState<Page>(
    () => pathToPage(window.location.pathname)
  );

  useEffect(() => {
    const section = pathToSection(window.location.pathname);
    if (section) {
      setTimeout(() => {
        document.getElementById(section)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 400);
    }
  }, []);

  const navigate = (page: Page) => {
    document.documentElement.style.scrollBehavior = 'auto';
    window.scrollTo(0, 0);
    window.history.pushState({}, '', page === 'home' ? '/' : `/${page}`);
    setCurrentPage(page);
    requestAnimationFrame(() => { document.documentElement.style.scrollBehavior = ''; });
  };

  const scrollToSection = (sectionId: string) => {
    const url = SECTION_URLS[sectionId] ?? '/';
    window.history.pushState({}, '', url);
    setTimeout(() => {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  };

  useEffect(() => {
    const onPopState = () => {
      setCurrentPage(pathToPage(window.location.pathname));
      const section = pathToSection(window.location.pathname);
      if (section) {
        setTimeout(() => {
          document.getElementById(section)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const masthead = (
    <Masthead
      currentPage={currentPage}
      onNavigate={navigate}
      onSectionFlip={scrollToSection}
    />
  );

  if (currentPage === 'projects')    return <>{masthead}<ProjectsCollection /></>;
  if (currentPage === 'photography') return <>{masthead}<GalleryCollection /></>;

  return (
    <>
      {masthead}
      <main>
        <NewspaperPage
          onViewAllProjects={() => navigate('projects')}
          onViewAllPhotos={() => navigate('photography')}
        />
      </main>
    </>
  );
}
