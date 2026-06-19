import { useState } from 'preact/hooks';
import { galleryImages } from '../data/gallery';
import type { GalleryImage } from '../data/gallery';
import GalleryModal from './GalleryModal';

const allImages = [...galleryImages].sort((a, b) => b.rating - a.rating);

const groups: { label: string; eyebrow: string; images: GalleryImage[] }[] = [
  {
    label: 'Top Picks',
    eyebrow: 'Best of the collection',
    images: allImages.filter(img => img.rating === 5),
  },
  {
    label: 'Selected',
    eyebrow: 'Honourable mentions',
    images: allImages.filter(img => img.rating === 4),
  },
  {
    label: 'Collection',
    eyebrow: 'The full archive',
    images: allImages.filter(img => img.rating === 3),
  },
].filter(g => g.images.length > 0);

// Flat index map so lightbox spans the entire sorted list
function globalIndex(groupIdx: number, localIdx: number): number {
  let offset = 0;
  for (let i = 0; i < groupIdx; i++) offset += groups[i].images.length;
  return offset + localIdx;
}

export function GalleryCollection() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <main className="layout-root">
      <div className="projects-collection-header">
        <button
          className="back-button"
          onClick={() => window.history.back()}
          aria-label="Go back"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          <span>Back</span>
        </button>
        <h1>Gallery</h1>
      </div>

      <div className="gallery-collection-body">
        {groups.map((group, gi) => (
          <section key={group.label} className="gallery-group">
            <div className="gallery-group-header">
              <span className="section-eyebrow">{group.eyebrow}</span>
              <h2 className="gallery-group-title">{group.label}</h2>
            </div>

            <div className="gallery-masonry">
              {group.images.map((img, li) => (
                <button
                  key={img.id}
                  className="gallery-masonry-item"
                  onClick={() => setLightboxIndex(globalIndex(gi, li))}
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
        ))}
      </div>

      {lightboxIndex !== null && (
        <GalleryModal
          images={allImages}
          startIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </main>
  );
}
