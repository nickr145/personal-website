import { educationEntries } from '../data/education';

export function Education() {
  return (
    <div className="education-list">
      {educationEntries.map((entry, i) => (
        <article key={i} className="education-article">
          <div className="education-period">{entry.period}</div>

          <div className="education-content">
            <h3 className="education-degree">{entry.degree}</h3>
            <div className="education-institution">{entry.institution}</div>

            <div className="education-courses-wrap">
              <span className="education-courses-label">Courses completed:</span>
              <div className="education-courses">
                {entry.courses.map((c) => (
                  <span key={c} className="skill-chip">{c}</span>
                ))}
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
