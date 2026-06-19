import { projects } from '../data/projects';

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="project-link-icon" aria-hidden="true">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
  </svg>
);

const WebsiteIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="project-link-icon" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const WritingIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="project-link-icon" aria-hidden="true">
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
  </svg>
);

function spaNavigate(path: string) {
  window.history.pushState({}, '', path);
  window.dispatchEvent(new PopStateEvent('popstate'));
}

export function Projects() {
  const displayed = projects.slice(0, 5);

  return (
    <div>
      {displayed.map((p) => {
        const paragraphs = p.description?.trim().split(/\n{2,}/) ?? [];
        return (
          <article key={p.title} className="project-article">
            <div className="project-dateline">{p.year}</div>

            <div className="project-headline-row">
              <h3 className="project-headline">{p.title}</h3>
              {(p.repo || p.link || p.writingSlug) && (
                <div className="project-check-it-out">
                  <span className="project-check-label">Check it out:</span>
                  {p.repo && (
                    <a href={p.repo} target="_blank" rel="noopener noreferrer" className="project-ext-link">
                      <GithubIcon />
                      Github
                    </a>
                  )}
                  {p.link && (
                    <a href={p.link} target="_blank" rel="noopener noreferrer" className="project-ext-link">
                      <WebsiteIcon />
                      Website
                    </a>
                  )}
                  {p.writingSlug && (
                    <button
                      className="project-ext-link"
                      onClick={() => spaNavigate(`/writings/${p.writingSlug}`)}
                    >
                      <WritingIcon />
                      Writing
                    </button>
                  )}
                </div>
              )}
            </div>

            <div className="project-body-wrap">
              {p.image && (
                <div className="project-photo">
                  <img src={p.image} alt={p.title} className="project-photo-img" />
                </div>
              )}
              <div className="project-text">
                {paragraphs.map((para, i) => (
                  <p key={i} className="project-description">{para.trim()}</p>
                ))}
                {p.tags.length > 0 && (
                  <div className="project-tags">
                    {p.tags.map((tag) => (
                      <span key={tag} className="project-tag">{tag}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
