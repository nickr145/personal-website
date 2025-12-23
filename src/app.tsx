// src/app.tsx
import { ProfileCard } from "./components/profileCard";
import { Projects } from "./components/projects";
import { About } from "./components/about";
import { SideNavigation } from "./components/SideNavigation";

export function App() {
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
