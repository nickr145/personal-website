import { useState, useEffect } from 'preact/hooks';
import { Masthead } from './components/Masthead';
import { NewspaperPage } from './components/NewspaperPage';
import { ProjectsCollection } from './components/ProjectsCollection';
import { GalleryCollection } from './components/GalleryCollection';
import { SketchbookCollection } from './components/SketchbookCollection';
import { WritingsCollection } from './components/WritingsCollection';
import { WritingPost } from './components/WritingPost';
import { LoadingScreen } from './components/LoadingScreen';
import { EasterEgg } from './components/EasterEgg';

type Page = 'home' | 'projects' | 'photography' | 'sketchbook' | 'writings' | 'writing';

function normalizePath(path: string): string {
  return path.length > 1 && path.endsWith('/') ? path.slice(0, -1) : path;
}

function pathToPage(rawPath: string): Page {
  const path = normalizePath(rawPath);
  if (path === '/projects')    return 'projects';
  if (path === '/photography') return 'photography';
  if (path === '/sketchbook')  return 'sketchbook';
  if (path === '/writings')    return 'writings';
  if (path.startsWith('/writings/')) return 'writing';
  return 'home';
}

function pathToSlug(rawPath: string): string | null {
  const path = normalizePath(rawPath);
  if (path.startsWith('/writings/')) return path.slice('/writings/'.length) || null;
  return null;
}

const KONAMI = [
  'ArrowUp','ArrowUp','ArrowDown','ArrowDown',
  'ArrowLeft','ArrowRight','ArrowLeft','ArrowRight',
  'b','a',
];

export function App() {
  const [currentPage, setCurrentPage] = useState<Page>(
    () => pathToPage(window.location.pathname)
  );
  const [loading, setLoading] = useState(() => currentPage === 'home');
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
    if (loading) return;
    const section = window.location.hash.slice(1);
    if (section) {
      setTimeout(() => {
        document.getElementById(section)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [loading]);

  const navigate = (page: Page, slug?: string) => {
    document.documentElement.style.scrollBehavior = 'auto';
    window.scrollTo(0, 0);
    let url = '/';
    if (page === 'projects')    url = '/projects';
    if (page === 'photography') url = '/photography';
    if (page === 'sketchbook')  url = '/sketchbook';
    if (page === 'writings')    url = '/writings';
    if (page === 'writing' && slug) url = `/writings/${slug}`;
    window.history.pushState({}, '', url);
    setCurrentPage(page);
    setCurrentSlug(slug ?? null);
    requestAnimationFrame(() => { document.documentElement.style.scrollBehavior = ''; });
  };

  const scrollToSection = (sectionId: string) => {
    window.history.pushState({}, '', `/#${sectionId}`);
    setTimeout(() => {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  };

  useEffect(() => {
    const onPopState = () => {
      const path = window.location.pathname;
      setCurrentPage(pathToPage(path));
      setCurrentSlug(pathToSlug(path));
      const section = window.location.hash.slice(1);
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

  if (currentPage === 'projects')    return <>{masthead}<ProjectsCollection onBack={() => { navigate('home'); setTimeout(() => scrollToSection('projects'), 150); }} />{inkSplatter}</>;
  if (currentPage === 'photography') return <>{masthead}<GalleryCollection onBack={() => { navigate('home'); setTimeout(() => scrollToSection('gallery'), 150); }} />{inkSplatter}</>;
  if (currentPage === 'sketchbook')  return <>{masthead}<SketchbookCollection onBack={() => { navigate('home'); setTimeout(() => scrollToSection('sketchbook'), 150); }} />{inkSplatter}</>;
  if (currentPage === 'writings')    return <>{masthead}<WritingsCollection onOpenWriting={slug => navigate('writing', slug)} onBack={() => { navigate('home'); setTimeout(() => scrollToSection('writings'), 150); }} />{inkSplatter}</>;
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
          onViewAllSketches={() => navigate('sketchbook')}
          onViewAllWritings={() => navigate('writings')}
          onOpenWriting={slug => navigate('writing', slug)}
          onInkTrigger={() => setInkActive(true)}
        />
      </main>
      {inkSplatter}
    </>
  );
}
