import { useState } from 'preact/hooks';
import { hobbies as all } from '../data/hobbies';
import GalleryModal from './GalleryModal';

export default function HobbiesPreview() {
  // show a compact preview inside the card (3 thumbnails) to avoid visual duplication
  const preview = all.slice(0, 3);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
        {preview.map((img, i) => (
          <button key={img.id} onClick={() => setOpenIndex(i)} style={{ border: 'none', padding: 0, background: 'transparent' }}>
            <img src={img.src} alt={img.alt} width={220} height={140} loading="lazy" style={{ display: 'block', borderRadius: 8, width: '100%', height: 'auto', objectFit: 'cover' }} />
          </button>
        ))}
      </div>

      {openIndex !== null && (
        <GalleryModal images={preview} startIndex={openIndex} onClose={() => setOpenIndex(null)} />
      )}
    </div>
  );
}
