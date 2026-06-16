import { writings } from '../data/writings';

interface WritingsSectionProps {
  onOpenWriting: (slug: string) => void;
}

export function WritingsSection({ onOpenWriting }: WritingsSectionProps) {
  const featured = writings.filter(w => w.featured);

  return (
    <div className="writings-list">
      {featured.map(writing => (
        <div key={writing.slug} className="writing-row">
          <span className="writing-row-date">{writing.date}</span>
          <div className="writing-row-body">
            <button
              className="writing-row-title"
              onClick={() => onOpenWriting(writing.slug)}
            >
              {writing.title}
            </button>
            <p className="writing-row-summary">{writing.summary}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
