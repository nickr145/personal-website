import { useEffect, useState } from 'preact/hooks';

type Image = {
  id: string;
  src: string;
  alt: string;
  caption?: string;
};

interface Props {
  images: Image[];
  startIndex?: number;
  onClose: () => void;
}

export default function GalleryModal({ images, startIndex = 0, onClose }: Props) {
  const [index, setIndex] = useState(startIndex);

  // We'll use a simple local state shim if React hooks are not available in the runtime wrapper.
  // But in your project, Preact hooks are available so above fallback won't be used.

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') setIndex((i:number) => Math.max(0, i - 1));
      if (e.key === 'ArrowRight') setIndex((i:number) => Math.min(images.length - 1, i + 1));
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [images.length, onClose]);

  const img = images[index];
  if (!img) return null;

  return (
    <div role="dialog" aria-modal="true" style={overlay} onClick={onClose}>
      <div style={content} onClick={(e) => e.stopPropagation()}>
        <button aria-label="Close" onClick={onClose} style={closeBtn}>×</button>
        <img src={img.src} alt={img.alt} style={{ maxWidth: '100%', maxHeight: '80vh', display: 'block', margin: '0 auto' }} />
        {img.caption && <p style={{ textAlign: 'center', marginTop: 8 }}>{img.caption}</p>}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12 }}>
          <button onClick={() => setIndex((i:number) => Math.max(0, i - 1))} aria-label="Previous">Prev</button>
          <button onClick={() => setIndex((i:number) => Math.min(images.length - 1, i + 1))} aria-label="Next">Next</button>
        </div>
      </div>
    </div>
  );
}

const overlay: any = {
  position: 'fixed',
  inset: 0,
  background: 'rgba(0,0,0,0.6)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 10000
};

const content: any = {
  background: 'white',
  padding: 20,
  borderRadius: 10,
  width: '90%',
  maxWidth: 900,
  position: 'relative'
};

const closeBtn: any = { position: 'absolute', right: 10, top: 10, fontSize: 20, border: 'none', background: 'transparent' };
