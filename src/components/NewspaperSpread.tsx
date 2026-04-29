import { useState, useEffect, useRef, lazy, Suspense } from 'preact/compat';
import { Projects } from './projects';
import { Experiences } from './Experiences';
import { Hobbies } from './hobbies';

// Three.js is heavy — lazy-load the front page so it splits into its own chunk
const FrontPage = lazy(() =>
  import('./FrontPage').then(m => ({ default: m.FrontPage }))
);

const PAGES = [
  { eyebrow: 'Front Page',   headline: 'The Nicholas Rebello Times', id: 'profile'     },
  { eyebrow: 'Latest Work',  headline: 'Projects',                   id: 'projects'    },
  { eyebrow: 'Career',       headline: 'Experience',                  id: 'experiences' },
  { eyebrow: 'Arts & Leisure', headline: 'Hobbies',                  id: 'hobbies'     },
] as const;

export const SPREAD_SECTION_MAP: Record<string, number> = {
  profile: 0, projects: 1, experiences: 2, hobbies: 3,
};

type AnimPhase = '' | 'exit-fwd' | 'exit-bwd' | 'enter-fwd' | 'enter-bwd';

interface Props {
  targetPage: number;
  onPageChange: (idx: number) => void;
}

function PageContent({ idx }: { idx: number }) {
  switch (idx) {
    case 0:
      return (
        <Suspense fallback={<div className="front-page-loading" />}>
          <FrontPage />
        </Suspense>
      );
    case 1:
      return <div className="spread-projects-grid"><Projects /></div>;
    case 2:
      return <Experiences />;
    default:
      return <Hobbies />;
  }
}

export function NewspaperSpread({ targetPage, onPageChange }: Props) {
  const [displayIdx, setDisplayIdx] = useState(targetPage);
  const [phase, setPhase] = useState<AnimPhase>('');
  const locked = useRef(false);
  const mounted = useRef(false);

  const flipTo = (to: number) => {
    if (locked.current || to === displayIdx || to < 0 || to >= PAGES.length) return;
    locked.current = true;
    const dir = to > displayIdx ? 'fwd' : 'bwd';
    setPhase(`exit-${dir}` as AnimPhase);

    setTimeout(() => {
      setDisplayIdx(to);
      onPageChange(to);
      setPhase(`enter-${dir}` as AnimPhase);
      setTimeout(() => {
        setPhase('');
        locked.current = false;
      }, 340);
    }, 300);
  };

  // Respond to external targetPage changes (masthead nav)
  useEffect(() => {
    if (!mounted.current) { mounted.current = true; return; }
    flipTo(targetPage);
  }, [targetPage]);

  const { eyebrow, headline, id } = PAGES[displayIdx];
  const isFront = displayIdx === 0;

  return (
    <div className="newspaper-spread">
      <div className="spread-scene">
        {/* key = displayIdx: forces a fresh DOM node on every swap so
            the enter animation always begins at the correct rotateY   */}
        <article
          key={displayIdx}
          className={`spread-page${isFront ? ' spread-page--front' : ''}${phase ? ` page-${phase}` : ''}`}
          id={id}
        >
          {/* Content pages get the eyebrow + headline header */}
          {!isFront && (
            <div className="spread-page-header">
              <div>
                <span className="section-eyebrow">{eyebrow}</span>
                <h2 className="section-headline">{headline}</h2>
              </div>
              <span className="spread-page-num">
                Page {displayIdx + 1} / {PAGES.length}
              </span>
            </div>
          )}

          <div className={isFront ? 'spread-page-body--front' : 'spread-page-body'}>
            <PageContent idx={displayIdx} />
          </div>
        </article>
      </div>

      {/* ── Navigation footer ── */}
      <footer className="spread-footer">
        <button
          className="spread-nav-btn"
          onClick={() => flipTo(displayIdx - 1)}
          disabled={displayIdx === 0}
          aria-label="Previous page"
        >
          ← Prev Page
        </button>

        <div className="spread-indicators" role="tablist" aria-label="Section pages">
          {(PAGES as unknown as { eyebrow: string; headline: string; id: string }[]).map((p, i) => (
            <button
              key={p.id}
              role="tab"
              aria-selected={i === displayIdx}
              className={`spread-dot${i === displayIdx ? ' spread-dot--active' : ''}`}
              onClick={() => flipTo(i)}
              aria-label={`Go to ${p.headline}`}
              title={p.headline}
            />
          ))}
        </div>

        <button
          className="spread-nav-btn"
          onClick={() => flipTo(displayIdx + 1)}
          disabled={displayIdx === PAGES.length - 1}
          aria-label="Next page"
        >
          Next Page →
        </button>
      </footer>
    </div>
  );
}
