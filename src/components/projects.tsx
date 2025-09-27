import Card from './Card';
import { projects } from '../data/projects';

export function Projects() {
  return (
    <Card title="Projects">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5em' }}>
        {projects.map((p) => (
          <div key={p.title}>
            <h3 style={{ fontWeight: 600, fontSize: '1.1em', marginBottom: 4 }}>
              {p.repo ? (
                <a href={p.repo} target="_blank" rel="noopener noreferrer" style={{ color: '#222', textDecoration: 'underline', textUnderlineOffset: 3 }}>
                  {p.title}
                </a>
              ) : (
                p.title
              )}
            </h3>
            <p style={{ margin: 0 }}>{p.description}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}
