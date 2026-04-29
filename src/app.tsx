import { useState, useEffect } from 'preact/hooks';
import { Masthead } from './components/Masthead';
import { NewspaperSpread, SPREAD_SECTION_MAP } from './components/NewspaperSpread';
import { ProjectsCollection } from './components/ProjectsCollection';
import { Gallery } from './components/Gallery';
import { Sketchbook } from './components/Sketchbook';

type Page = 'home' | 'projects' | 'gallery' | 'sketchbook';

const PATH_MAP: Record<Page, string> = {
  home: '/', projects: '/projects', gallery: '/gallery', sketchbook: '/sketchbook',
};

function pathToPage(path: string): Page {
  if (path === '/projects')   return 'projects';
  if (path === '/gallery')    return 'gallery';
  if (path === '/sketchbook') return 'sketchbook';
  return 'home';
}

export function App() {
  const [currentPage, setCurrentPage] = useState<Page>(
    () => pathToPage(window.location.pathname)
  );
  const [spreadPage, setSpreadPage] = useState(0);

  const navigate = (page: Page) => {
    window.history.pushState({}, '', PATH_MAP[page]);
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const flipToSection = (sectionId: string) => {
    const idx = SPREAD_SECTION_MAP[sectionId];
    if (idx !== undefined) setSpreadPage(idx);
  };

  useEffect(() => {
    const onPopState = () => setCurrentPage(pathToPage(window.location.pathname));
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  useEffect(() => {
    const toGallery    = () => navigate('gallery');
    const toSketchbook = () => navigate('sketchbook');
    window.addEventListener('navigate-to-gallery',    toGallery);
    window.addEventListener('navigate-to-sketchbook', toSketchbook);
    return () => {
      window.removeEventListener('navigate-to-gallery',    toGallery);
      window.removeEventListener('navigate-to-sketchbook', toSketchbook);
    };
  }, []);

  const masthead = (
    <Masthead
      currentPage={currentPage}
      onNavigate={navigate}
      onSectionFlip={flipToSection}
    />
  );

  if (currentPage === 'projects')   return <>{masthead}<ProjectsCollection /></>;
  if (currentPage === 'gallery')    return <>{masthead}<Gallery /></>;
  if (currentPage === 'sketchbook') return <>{masthead}<Sketchbook /></>;

  return (
    <>
      {masthead}
      <main>
        <NewspaperSpread targetPage={spreadPage} onPageChange={setSpreadPage} />
      </main>
    </>
  );
}
