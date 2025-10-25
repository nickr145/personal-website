import { useEffect, useState } from 'preact/hooks';
import { createPortal } from 'preact/compat';

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
  // create a portal container so the modal is mounted at document.body level
  const [portalEl] = useState(() => (typeof document !== 'undefined' ? document.createElement('div') : null));

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

  // prevent background from scrolling while modal is open
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, []);

  // append portal element to body so modal overlays entire viewport
  useEffect(() => {
    if (!portalEl) return;
    document.body.appendChild(portalEl);
    return () => {
      try { document.body.removeChild(portalEl); } catch (e) { /* ignore */ }
    };
  }, [portalEl]);

  const img = images[index];
  if (!img) return null;

  const modalContent = (
    <div role="dialog" aria-modal="true" style={overlay} onClick={onClose}>
      <div style={content} onClick={(e) => e.stopPropagation()}>
  <button aria-label="Close" onClick={(e) => { e.stopPropagation(); onClose(); }} style={closeBtn}>×</button>
        <div style={imageWrap}>
          <img src={img.src} alt={img.alt} style={imgStyle} />
          <button aria-label="Previous" onClick={() => setIndex((i:number) => Math.max(0, i - 1))} style={navLeft}>{'‹'}</button>
          <button aria-label="Next" onClick={() => setIndex((i:number) => Math.min(images.length - 1, i + 1))} style={navRight}>{'›'}</button>
        </div>
        {img.caption && <p style={{ textAlign: 'center', marginTop: 8 }}>{img.caption}</p>}
      </div>
    </div>
  );

  if (portalEl) return createPortal(modalContent, portalEl);
  return modalContent; // fallback if document isn't available
}

const overlay: any = {
  position: 'fixed',
  inset: 0,
  background: 'rgba(0,0,0,0.6)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 10000,
  padding: '24px',
  overflowY: 'auto'
};

const content: any = {
  background: 'white',
  padding: 20,
  borderRadius: 10,
  width: '90%',
  maxWidth: 1100,
  position: 'relative',
  boxShadow: '0 12px 40px rgba(0,0,0,0.28)'
};

const closeBtn: any = { position: 'absolute', right: 12, top: 12, fontSize: 22, border: 'none', background: 'rgba(0,0,0,0.04)', padding: '6px 10px', borderRadius: 6, cursor: 'pointer', zIndex: 10050, pointerEvents: 'auto' };

const imageWrap: any = { position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' };

const imgStyle: any = { maxWidth: '100%', maxHeight: '80vh', display: 'block', margin: '0 auto', borderRadius: 6 };

const navBtnCommon: any = { position: 'absolute', top: '50%', transform: 'translateY(-50%)', border: 'none', background: 'rgba(255,255,255,0.85)', padding: '8px 12px', borderRadius: 6, cursor: 'pointer', fontSize: 22, zIndex: 10040 };

const navLeft: any = { ...navBtnCommon, left: 8 };
const navRight: any = { ...navBtnCommon, right: 8 };
