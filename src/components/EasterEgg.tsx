import { useState, useEffect } from 'preact/hooks';

const RADII = [
  '62% 38% 46% 54% / 60% 44% 56% 40%',
  '40% 60% 70% 30% / 40% 50% 60% 50%',
  '55% 45% 38% 62% / 46% 65% 35% 54%',
  '48% 52% 64% 36% / 55% 48% 52% 45%',
  '35% 65% 52% 48% / 58% 42% 58% 42%',
  '68% 32% 44% 56% / 52% 62% 38% 48%',
];

function rand(min: number, max: number) {
  return min + Math.random() * (max - min);
}

interface Blob { x: number; y: number; w: number; h: number; radii: string; delay: number; rotation: number; }
interface Dot  { x: number; y: number; size: number; delay: number; }

export function EasterEgg({ onDone }: { onDone: () => void }) {
  const [fading, setFading] = useState(false);

  const [blobs] = useState<Blob[]>(() =>
    Array.from({ length: 12 }, () => ({
      x:        rand(2, 98),
      y:        rand(2, 98),
      w:        rand(45, 115),
      h:        rand(38, 95),
      radii:    RADII[Math.floor(Math.random() * RADII.length)],
      delay:    rand(0, 0.22),
      rotation: rand(-45, 45),
    }))
  );

  const [dots] = useState<Dot[]>(() =>
    Array.from({ length: 20 }, () => ({
      x:     rand(1, 99),
      y:     rand(1, 99),
      size:  rand(4, 15),
      delay: rand(0.05, 0.32),
    }))
  );

  useEffect(() => {
    // Snap page to greyscale like a printing press
    document.documentElement.style.transition = 'filter 0.09s ease';
    document.documentElement.style.filter    = 'grayscale(1) contrast(1.08) sepia(0.1)';

    const t1 = setTimeout(() => {
      setFading(true);
      // Slowly bleed colour back in
      document.documentElement.style.transition = 'filter 0.75s ease';
      document.documentElement.style.filter    = '';
    }, 1500);

    const t2 = setTimeout(() => {
      document.documentElement.style.transition = '';
      onDone();
    }, 2300);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      document.documentElement.style.filter    = '';
      document.documentElement.style.transition = '';
    };
  }, []);

  return (
    <div className={`ink-overlay${fading ? ' ink-overlay--fading' : ''}`} aria-hidden="true">
      {blobs.map((b, i) => (
        <div
          key={i}
          style={{
            position:  'absolute',
            left:      `${b.x}%`,
            top:       `${b.y}%`,
            width:     `${b.w}px`,
            height:    `${b.h}px`,
            transform: `translate(-50%,-50%) rotate(${b.rotation}deg)`,
          }}
        >
          <div
            className="ink-blob"
            style={{ borderRadius: b.radii, animationDelay: `${b.delay}s` }}
          />
        </div>
      ))}

      {dots.map((d, i) => (
        <div
          key={`d${i}`}
          className="ink-dot"
          style={{
            left:          `${d.x}%`,
            top:           `${d.y}%`,
            width:         `${d.size}px`,
            height:        `${d.size}px`,
            animationDelay: `${d.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
