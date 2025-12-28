import { hobbies } from '../data/hobbies';
import { useState } from 'preact/hooks';
import GalleryModal from './GalleryModal';

export function Sketchbook() {
  const sketches = hobbies.filter(h => h.category === 'sketch');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <main className="layout-root">
      <div className="projects-collection-header">
        <button
          className="back-button"
          onClick={() => window.history.back()}
          aria-label="Go back"
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          <span>Back</span>
        </button>
        <h1>Sketchbook</h1>
      </div>

      <div className="projects-collection-container">
        <div className="gallery-grid">
          {sketches.map((img, i) => (
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
      </div>

      {lightboxIndex !== null && <GalleryModal images={sketches} startIndex={lightboxIndex} onClose={() => setLightboxIndex(null)} />}
    </main>
  );
}

export default Sketchbook;
