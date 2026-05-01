import { useState, useEffect } from 'preact/hooks';

const LINES: Array<{ delay: number; thin?: boolean; gold?: boolean }> = [
  { delay: 0.00 },
  { delay: 0.12, gold: true },
  { delay: 0.22, thin: true },
  { delay: 0.29, thin: true },
  { delay: 0.35, thin: true },
  { delay: 0.40, thin: true },
  { delay: 0.52 },
  { delay: 0.62, gold: true },
  { delay: 0.70, thin: true },
  { delay: 0.76, thin: true },
  { delay: 0.81, thin: true },
  { delay: 0.90 },
];

export function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [hiding, setHiding] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setHiding(true), 1700);
    const t2 = setTimeout(() => onDone(), 2200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div className={`loading-screen${hiding ? ' loading-screen--exit' : ''}`}>
      <div className="loading-press">
        <p className="loading-press-title">Nicholas Rebello</p>
        {LINES.map((l, i) => (
          <div
            key={i}
            className={[
              'loading-line',
              l.thin ? 'loading-line--thin' : '',
              l.gold ? 'loading-line--gold' : '',
            ].filter(Boolean).join(' ')}
            style={{ animationDelay: `${l.delay}s` }}
          />
        ))}
      </div>
      <p className="loading-label">Setting type…</p>
    </div>
  );
}
