// src/app.tsx

import { AnimatedSky } from "./components/AnimatedSky";
import { About } from "./components/about";
import { Projects } from "./components/projects";
import { Contact } from "./components/contact";
import { Hobbies } from "./components/hobbies";
import { Badges } from "./components/badges";

export function App() {
  return (
    <div style={{ position: 'relative', minHeight: '100vh', width: '100vw', overflow: 'hidden' }}>
      <AnimatedSky />
      <div className="page-content">
        <div className="title-row">
          <div className="card card-title-box" role="heading" aria-level={1}>Nicholas Rebello</div>
        </div>

        <div className="cards-grid" role="main">
          <div className="about-box"><About /></div>
          <div className="projects-box"><Projects /></div>
          <div className="badges-box"><Badges /></div>
          <div className="contact-box"><Contact /></div>
        </div>

        <div className="hobbies-fullwidth"><Hobbies /></div>
      </div>
    </div>
  );
}
