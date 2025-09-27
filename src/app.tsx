// src/app.tsx

import { AnimatedSky } from "./components/AnimatedSky";
import { About } from "./components/about";
import { Projects } from "./components/projects";
import { Contact } from "./components/contact";

function App() {
  return (
    <div style={{ position: 'relative', minHeight: '100vh', width: '100vw', overflow: 'hidden' }}>
      <AnimatedSky />
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          minHeight: '100vh',
          background: 'none',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem 0',
        }}
      >
        <div style={{
          marginBottom: '2.5rem',
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
        }}>
          <div style={{
            background: 'rgba(255,255,255,0.85)',
            border: '2.5px solid #fff',
            borderRadius: '18px',
            padding: '1.2rem 2.5rem',
            fontWeight: 700,
            fontSize: '2.1rem',
            letterSpacing: '1.5px',
            boxShadow: 'none',
            textAlign: 'center',
          }}>
            Nicholas Rebello
          </div>
        </div>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '2rem',
          justifyContent: 'center',
          width: '100%',
          maxWidth: '1200px',
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', minWidth: 0 }}>
            <About />
            <Contact />
          </div>
          <Projects />
        </div>
      </div>
    </div>
  );
}
