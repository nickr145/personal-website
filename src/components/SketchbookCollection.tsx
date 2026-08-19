import { useState } from 'preact/hooks';
import { sketchImages } from '../data/sketchbook';
import GalleryModal from './GalleryModal';

interface SketchbookCollectionProps {
  onBack: () => void;
}

export function SketchbookCollection({ onBack }: SketchbookCollectionProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <main className="layout-root">
      <div className="projects-collection-header">
        <button
          className="back-button"
          onClick={onBack}
          aria-label="Go back"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          <span>Back</span>
        </button>
        <h1>Sketchbook</h1>
      </div>

      <div className="gallery-collection-body">
        <section className="gallery-group">
          <div className="gallery-masonry">
            {sketchImages.map((img, i) => (
              <button
                key={img.id}
                className="gallery-masonry-item"
                onClick={() => setLightboxIndex(i)}
                aria-label={`Open ${img.alt}`}
              >
                <img src={img.src} alt={img.alt} loading="lazy" />
                {img.caption && (
                  <div className="gallery-masonry-caption">{img.caption}</div>
                )}
              </button>
            ))}
          </div>
        </section>
      </div>

      {lightboxIndex !== null && (
        <GalleryModal
          images={sketchImages}
          startIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </main>
  );
}
