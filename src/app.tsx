// src/app.tsx
import { useState, useEffect } from 'preact/hooks';
import { ProfileCard } from "./components/profileCard";
import { Projects } from "./components/projects";
import { About } from "./components/about";
import { Experiences } from "./components/Experiences";
import { Hobbies } from "./components/hobbies";
import { SideNavigation } from "./components/SideNavigation";
import { ProjectsCollection } from "./components/ProjectsCollection";
import { Gallery } from "./components/Gallery";
import { Sketchbook } from "./components/Sketchbook";

export function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'projects' | 'gallery' | 'sketchbook'>('home');
  const [savedScrollPosition, setSavedScrollPosition] = useState(0);

  // Disable automatic scroll restoration
  useEffect(() => {
    if (window.history.scrollRestoration) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  // Handle browser back/forward
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path === '/projects') setCurrentPage('projects');
      else if (path === '/gallery') setCurrentPage('gallery');
      else if (path === '/sketchbook') setCurrentPage('sketchbook');
      else {
        setCurrentPage('home');
        // Restore scroll position when returning to home
        setTimeout(() => {
          window.scrollY = savedScrollPosition;
          document.documentElement.scrollTop = savedScrollPosition;
          document.body.scrollTop = savedScrollPosition;
        }, 0);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [savedScrollPosition]);

  // Handle navigation
  useEffect(() => {
    const handleNavigation = (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      if (target.href?.endsWith('/projects')) {
        e.preventDefault();
        window.history.pushState({}, '', '/projects');
        setCurrentPage('projects');
      }
    };

    const handleGalleryNav = () => {
      // Save scroll position before navigating
      setSavedScrollPosition(window.scrollY || document.documentElement.scrollTop);
      window.history.pushState({}, '', '/gallery');
      setCurrentPage('gallery');
    };

    const handleSketchbookNav = () => {
      // Save scroll position before navigating
      setSavedScrollPosition(window.scrollY || document.documentElement.scrollTop);
      window.history.pushState({}, '', '/sketchbook');
      setCurrentPage('sketchbook');
    };

    document.addEventListener('click', handleNavigation, true);
    window.addEventListener('navigate-to-gallery', handleGalleryNav);
    window.addEventListener('navigate-to-sketchbook', handleSketchbookNav);
    
    return () => {
      document.removeEventListener('click', handleNavigation, true);
      window.removeEventListener('navigate-to-gallery', handleGalleryNav);
      window.removeEventListener('navigate-to-sketchbook', handleSketchbookNav);
    };
  }, []);

  if (currentPage === 'projects') {
    return <ProjectsCollection />;
  }

  if (currentPage === 'gallery') {
    return <Gallery />;
  }

  if (currentPage === 'sketchbook') {
    return <Sketchbook />;
  }

  return (
    <main className="layout-root">
      <div className="layout-grid">
        {/* LEFT: sticky navigation */}
        <aside className="layout-left">
          <SideNavigation />
        </aside>

        {/* RIGHT: scrolling narrative */}
        <section className="layout-right">
          <div className="section" id="profile">
            <ProfileCard />
          </div>

          <div className="section" id="projects">
            <Projects />
          </div>

          <div className="section" id="experiences">
            <Experiences />
          </div>

          <div className="section" id="hobbies">
            <Hobbies />
          </div>
        </section>
      </div>
    </main>
  );
}
