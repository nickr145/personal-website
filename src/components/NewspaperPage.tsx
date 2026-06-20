import { lazy, Suspense, useState, useEffect } from 'preact/compat';
import { Projects } from './projects';
import { Experiences } from './Experiences';
import { Skills } from './Skills';
import { Education } from './Education';
import { Footer } from './Footer';
import { galleryImages } from '../data/gallery';
import { sketchImages } from '../data/sketchbook';
import GalleryModal from './GalleryModal';
import { WritingsSection } from './WritingsSection';

const FrontPage = lazy(() =>
  import('./FrontPage').then(m => ({ default: m.FrontPage }))
);

const featuredPhotos = galleryImages.filter(img => img.rating === 5).slice(0, 5);

function GallerySection() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  return (
    <>
      <p className="section-intro">
        A selection of my favourite shots - landscapes, wildlife, and night skies captured mostly on trips across North America.
        Click any photo to open it full-screen; hover to reveal the caption.
      </p>
      <div className="gallery-grid">
        {featuredPhotos.map((img, i) => (
          <button
            key={img.id}
            className="gallery-item"
            onClick={() => setLightboxIndex(i)}
            aria-label={`Open ${img.alt}`}
          >
            <img src={img.src} alt={img.alt} loading="lazy" />
            {img.caption && <div className="gallery-caption">{img.caption}</div>}
          </button>
        ))}
      </div>
      {lightboxIndex !== null && (
        <GalleryModal
          images={featuredPhotos}
          startIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </>
  );
}

function SketchbookSection() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  return (
    <>
      <p className="section-intro">
        Pencil and ink sketches from my spare time - portraits, studies, and whatever else I felt like drawing.
        Click any sketch to open it full-screen.
      </p>
      <div className="gallery-grid">
        {sketchImages.map((img, i) => (
          <button
            key={img.id}
            className="gallery-item"
            onClick={() => setLightboxIndex(i)}
            aria-label={`Open ${img.alt}`}
          >
            <img src={img.src} alt={img.alt} loading="lazy" />
            {img.caption && <div className="gallery-caption">{img.caption}</div>}
          </button>
        ))}
      </div>
      {lightboxIndex !== null && (
        <GalleryModal
          images={sketchImages}
          startIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </>
  );
}

interface NewspaperPageProps {
  onViewAllProjects: () => void;
  onViewAllPhotos: () => void;
  onViewAllWritings: () => void;
  onOpenWriting: (slug: string) => void;
  onInkTrigger: () => void;
}

export function NewspaperPage({ onViewAllProjects, onViewAllPhotos, onViewAllWritings, onOpenWriting, onInkTrigger }: NewspaperPageProps) {
  // Scroll-triggered fade-in for all content sections
  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>('.np-section:not(.np-section--front)')
    );
    sections.forEach(s => s.classList.add('js-fade'));

    const obs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.remove('js-fade');
          e.target.classList.add('section-visible');
          obs.unobserve(e.target);
        }
      }),
      { threshold: 0.06 }
    );

    sections.forEach(s => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  return (
    <div className="newspaper-page">
      <section id="profile" className="np-section np-section--front">
        <Suspense fallback={<div className="front-page-loading" />}>
          <FrontPage />
        </Suspense>
      </section>

      <section id="projects" className="np-section">
        <div className="np-section-header">
          <div>
            <span className="section-eyebrow">Latest Work</span>
            <h2 className="section-headline">Projects</h2>
          </div>
          <button className="view-all-btn" onClick={onViewAllProjects}>
            View All Projects ↗
          </button>
        </div>
        <Projects />
      </section>

      <section id="writings" className="np-section">
        <div className="np-section-header">
          <div>
            <span className="section-eyebrow">Research &amp; Ideas</span>
            <h2 className="section-headline">Writings</h2>
          </div>
          <button className="view-all-btn" onClick={onViewAllWritings}>
            All Writings ↗
          </button>
        </div>
        <WritingsSection onOpenWriting={onOpenWriting} />
      </section>

      <section id="experiences" className="np-section">
        <div className="np-section-header">
          <div>
            <span className="section-eyebrow">Career</span>
            <h2 className="section-headline">Experience</h2>
          </div>
        </div>
        <Experiences />
      </section>

      <section id="skills" className="np-section">
        <div className="np-section-header">
          <div>
            <span className="section-eyebrow">Expertise</span>
            <h2 className="section-headline">Technical Skills &amp; Tools</h2>
          </div>
        </div>
        <Skills />
      </section>

      <section id="education" className="np-section">
        <div className="np-section-header">
          <div>
            <span className="section-eyebrow">Academic Background</span>
            <h2 className="section-headline">Education</h2>
          </div>
        </div>
        <Education />
      </section>

      <section id="gallery" className="np-section">
        <div className="np-section-header">
          <div>
            <span className="section-eyebrow">Arts &amp; Leisure</span>
            <h2 className="section-headline">Gallery</h2>
          </div>
          <button className="view-all-btn" onClick={onViewAllPhotos}>
            View All Photos ↗
          </button>
        </div>
        <GallerySection />
      </section>

      <section id="sketchbook" className="np-section">
        <div className="np-section-header">
          <div>
            <span className="section-eyebrow">Arts &amp; Leisure</span>
            <h2 className="section-headline">Sketchbook</h2>
          </div>
        </div>
        <SketchbookSection />
      </section>

      <Footer onInkTrigger={onInkTrigger} />
    </div>
  );
}
