import { useState } from 'preact/hooks';
import { hobbies } from '../data/hobbies';
import GalleryModal from './GalleryModal';

export default function HobbiesGallery() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
        {hobbies.map((img, i) => (
          <button key={img.id} onClick={() => setOpenIndex(i)} style={{ border: 'none', padding: 0, background: 'transparent' }}>
            <img src={img.src} alt={img.alt} loading="lazy" style={{ width: '100%', height: 200, objectFit: 'cover', borderRadius: 8 }} />
          </button>
        ))}
      </div>

      {openIndex !== null && (
        <GalleryModal images={hobbies} startIndex={openIndex} onClose={() => setOpenIndex(null)} />
      )}
    </div>
  );
}
