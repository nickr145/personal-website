import { useState } from 'preact/hooks';
import { projects } from '../data/projects';

export function ProjectsCollection() {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const allTags = [...new Set(projects.flatMap(p => p.tags))].sort();
  const filtered = activeTag ? projects.filter(p => p.tags.includes(activeTag)) : projects;

  return (
    <main className="layout-root">
      <div className="projects-collection-header">
        <button
          className="back-button"
          onClick={() => window.history.back()}
          aria-label="Go back"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          <span>Back</span>
        </button>
        <h1>All Projects</h1>
      </div>

      <div className="projects-collection-container">
        <div className="tag-filter-row">
          <span className="tag-filter-label">Filter:</span>
          <button
            className={`tag-filter-btn${!activeTag ? ' active' : ''}`}
            onClick={() => setActiveTag(null)}
          >
            All
          </button>
          {allTags.map(tag => (
            <button
              key={tag}
              className={`tag-filter-btn${activeTag === tag ? ' active' : ''}`}
              onClick={() => setActiveTag(t => t === tag ? null : tag)}
            >
              {tag}
            </button>
          ))}
        </div>

        <table className="projects-table">
          <thead>
            <tr>
              <th>Year</th>
              <th>Project</th>
              <th>Built with</th>
              <th>Link</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((project, idx) => (
              <tr key={idx}>
                <td className="year-cell">{project.year}</td>
                <td className="project-name-cell">{project.title}</td>
                <td className="tags-cell">
                  <div className="tags-container">
                    {project.tags.map(tag => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>
                </td>
                <td className="link-cell">
                  {project.repo && (
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-icon"
                      aria-label={`View ${project.title} repository`}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 6H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <p style={{ fontFamily: 'EB Garamond, serif', color: 'var(--ink-fade)', padding: '2rem 0', textAlign: 'center' }}>
            No projects match that tag.
          </p>
        )}
      </div>
    </main>
  );
}
