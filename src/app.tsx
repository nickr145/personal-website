// src/app.tsx
import { useState, useEffect } from 'preact/hooks';
import { ProfileCard } from "./components/profileCard";
import { Projects } from "./components/projects";
import { About } from "./components/about";
import { SideNavigation } from "./components/SideNavigation";
import { ProjectsCollection } from "./components/ProjectsCollection";

export function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'projects'>('home');

  // Handle browser back/forward
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      setCurrentPage(path === '/projects' ? 'projects' : 'home');
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Handle navigation to projects page
  useEffect(() => {
    const handleNavigation = (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      if (target.href?.endsWith('/projects')) {
        e.preventDefault();
        window.history.pushState({}, '', '/projects');
        setCurrentPage('projects');
      }
    };

    document.addEventListener('click', handleNavigation, true);
    return () => document.removeEventListener('click', handleNavigation, true);
  }, []);

  if (currentPage === 'projects') {
    return <ProjectsCollection />;
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

          <div className="section" id="about">
            <About />
          </div>

          <div className="section" id="projects">
            <Projects />
          </div>

          <div className="section">
            {/*<Contact />*/}
          </div>
        </section>
      </div>
    </main>
  );
}
