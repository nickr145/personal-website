import { projects } from '../data/projects';

export function Projects() {
  const topProjects = projects.slice(0, 4);

  return (
    <div>
      {topProjects.map((p) => (
        <article key={p.title} className="newspaper-article">
          <div className="article-headline-row">
            <h3 className="article-headline">{p.title}</h3>
            {p.repo && (
              <a
                href={p.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="article-repo-link"
                aria-label={`View ${p.title} on GitHub`}
              >
                ↗
              </a>
            )}
          </div>

          {p.description && (
            <p className="article-body">{p.description.trim()}</p>
          )}

          {p.tags.length > 0 && (
            <div className="article-tags">
              {p.tags.slice(0, 5).map((tag) => (
                <span key={tag} className="article-tag">{tag}</span>
              ))}
            </div>
          )}
        </article>
      ))}

      {projects.length > 4 && (
        <a href="/projects" className="section-read-more">
          View all {projects.length} projects →
        </a>
      )}
    </div>
  );
}
