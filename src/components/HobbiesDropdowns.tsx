import { useState } from 'preact/hooks';
import { hobbies } from '../data/hobbies';
import GalleryModal from './GalleryModal';

export default function HobbiesDropdowns() {
  const sketches = hobbies.filter(h => h.category === 'sketch');
  const photos = hobbies.filter(h => h.category === 'photography');
  const [open, setOpen] = useState<'none' | 'sketch' | 'photo'>('none');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [lightboxImgs, setLightboxImgs] = useState<any[]>([]);

  function toggle(kind: 'sketch' | 'photo') {
    setOpen(open === kind ? 'none' : kind);
  }

  function openLightbox(list:any[], index:number) {
    setLightboxImgs(list);
    setLightboxIndex(index);
  }

  return (
    <div>
      <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
        <button className="hobby-toggle" onClick={() => toggle('sketch')}>View sketches</button>
        <button className="hobby-toggle" onClick={() => toggle('photo')}>View photos</button>
      </div>

      {open === 'sketch' && (
        <div className="hobby-dropdown-panel">
          <div className="hobby-scroller">
            {sketches.map((img, i) => {
              const thumb = img.src.replace('/images/hobbies/sketches/', '/images/hobbies/sketches/thumbs/');
              return (
                <button key={img.id} className="hobby-thumb-button" onClick={() => openLightbox(sketches, i)} aria-label={`Open ${img.alt}`}>
                  <img className="hobby-thumb" src={thumb} alt={img.alt} loading="lazy" />
                </button>
              );
            })}
          </div>
        </div>
      )}

      {open === 'photo' && (
        <div className="hobby-dropdown-panel">
          <div className="hobby-scroller">
            {photos.length === 0 ? <div style={{ padding: 12 }}>No photos yet</div> : photos.map((img, i) => {
              const thumb = img.src.replace('/images/hobbies/photography/', '/images/hobbies/photography/thumbs/');
              return (
                <button key={img.id} className="hobby-thumb-button" onClick={() => openLightbox(photos, i)} aria-label={`Open ${img.alt}`}>
                  <img className="hobby-thumb" src={thumb} alt={img.alt} loading="lazy" />
                </button>
              );
            })}
          </div>
        </div>
      )}

      {lightboxIndex !== null && <GalleryModal images={lightboxImgs} startIndex={lightboxIndex} onClose={() => setLightboxIndex(null)} />}
    </div>
  );
}
