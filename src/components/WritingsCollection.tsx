import { writings } from '../data/writings';

interface WritingsCollectionProps {
  onOpenWriting: (slug: string) => void;
  onBack: () => void;
}

export function WritingsCollection({ onOpenWriting, onBack }: WritingsCollectionProps) {
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
        <h1>All Writings</h1>
      </div>

      <div className="projects-collection-container">
        <div className="writings-collection-list">
          {writings.map(writing => (
            <div key={writing.slug} className="writing-collection-row">
              <span className="writing-collection-date">{writing.date}</span>
              <div className="writing-collection-body">
                <button
                  className="writing-collection-title"
                  onClick={() => onOpenWriting(writing.slug)}
                >
                  {writing.title}
                </button>
                <p className="writing-collection-summary">{writing.summary}</p>
              </div>
            </div>
          ))}
        </div>

        {writings.length === 0 && (
          <p style={{ fontFamily: 'EB Garamond, serif', color: 'var(--ink-fade)', padding: '2rem 0', textAlign: 'center' }}>
            No writings yet.
          </p>
        )}
      </div>
    </main>
  );
}
