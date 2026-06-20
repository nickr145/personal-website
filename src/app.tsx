import { useState, useEffect } from 'preact/hooks';
import { Masthead } from './components/Masthead';
import { NewspaperPage } from './components/NewspaperPage';
import { ProjectsCollection } from './components/ProjectsCollection';
import { GalleryCollection } from './components/GalleryCollection';
import { WritingsCollection } from './components/WritingsCollection';
import { WritingPost } from './components/WritingPost';
import { LoadingScreen } from './components/LoadingScreen';
import { EasterEgg } from './components/EasterEgg';

type Page = 'home' | 'projects' | 'photography' | 'writings' | 'writing';

function pathToPage(path: string): Page {
  if (path === '/projects')    return 'projects';
  if (path === '/photography') return 'photography';
  if (path === '/writings')    return 'writings';
  if (path.startsWith('/writings/')) return 'writing';
  return 'home';
}

function pathToSlug(path: string): string | null {
  if (path.startsWith('/writings/')) return path.slice('/writings/'.length) || null;
  return null;
}

function pathToSection(path: string): string | null {
  if (path === '/gallery')    return 'gallery';
  if (path === '/sketchbook') return 'sketchbook';
  return null;
}

const SECTION_URLS: Record<string, string> = {
  gallery: '/gallery', sketchbook: '/sketchbook',
};

const KONAMI = [
  'ArrowUp','ArrowUp','ArrowDown','ArrowDown',
  'ArrowLeft','ArrowRight','ArrowLeft','ArrowRight',
  'b','a',
];

export function App() {
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<Page>(
    () => pathToPage(window.location.pathname)
  );
  const [currentSlug, setCurrentSlug] = useState<string | null>(
    () => pathToSlug(window.location.pathname)
  );
  const [progress, setProgress] = useState(0);
  const [inkActive, setInkActive] = useState(false);

  // Reading progress bar
  useEffect(() => {
    const update = () => {
      const scrolled = document.documentElement.scrollTop || document.body.scrollTop;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(height > 0 ? (scrolled / height) * 100 : 0);
    };
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  // Konami code → ink splatter easter egg
  useEffect(() => {
    let idx = 0;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === KONAMI[idx]) {
        idx++;
        if (idx === KONAMI.length) { setInkActive(true); idx = 0; }
      } else {
        idx = e.key === KONAMI[0] ? 1 : 0;
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    const section = pathToSection(window.location.pathname);
    if (section) {
      setTimeout(() => {
        document.getElementById(section)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 400);
    }
  }, []);

  const navigate = (page: Page, slug?: string) => {
    document.documentElement.style.scrollBehavior = 'auto';
    window.scrollTo(0, 0);
    let url = '/';
    if (page === 'projects')    url = '/projects';
    if (page === 'photography') url = '/photography';
    if (page === 'writings')    url = '/writings';
    if (page === 'writing' && slug) url = `/writings/${slug}`;
    window.history.pushState({}, '', url);
    setCurrentPage(page);
    setCurrentSlug(slug ?? null);
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
      const path = window.location.pathname;
      setCurrentPage(pathToPage(path));
      setCurrentSlug(pathToSlug(path));
      const section = pathToSection(path);
      if (section) {
        setTimeout(() => {
          document.getElementById(section)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  if (loading) return <LoadingScreen onDone={() => setLoading(false)} />;

  const inkSplatter = inkActive && (
    <EasterEgg onDone={() => setInkActive(false)} />
  );

  const masthead = (
    <Masthead
      currentPage={currentPage}
      onNavigate={navigate}
      onSectionFlip={scrollToSection}
    />
  );

  if (currentPage === 'projects')    return <>{masthead}<ProjectsCollection />{inkSplatter}</>;
  if (currentPage === 'photography') return <>{masthead}<GalleryCollection />{inkSplatter}</>;
  if (currentPage === 'writings')    return <>{masthead}<WritingsCollection onOpenWriting={slug => navigate('writing', slug)} onBack={() => { navigate('home'); setTimeout(() => document.getElementById('writings')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 150); }} />{inkSplatter}</>;
  if (currentPage === 'writing' && currentSlug) {
    return (
      <>
        {masthead}
        <WritingPost
          slug={currentSlug}
          onBack={() => navigate('writings')}
        />
        {inkSplatter}
      </>
    );
  }

  return (
    <>
      <div className="reading-progress" style={{ width: `${progress}%` }} />
      {masthead}
      <main>
        <NewspaperPage
          onViewAllProjects={() => navigate('projects')}
          onViewAllPhotos={() => navigate('photography')}
          onViewAllWritings={() => navigate('writings')}
          onOpenWriting={slug => navigate('writing', slug)}
          onInkTrigger={() => setInkActive(true)}
        />
      </main>
      {inkSplatter}
    </>
  );
}
