import { experiences } from '../data/experiences';

export function Experiences() {
  return (
    <div className="timeline">
      {experiences.map((exp, i) => {
        const bullets = exp.description
          .split('\n')
          .map(l => l.replace(/^[-–]\s*/, '').trim())
          .filter(Boolean);

        return (
          <div key={i} className="timeline-item">
            <div className="timeline-date">
              {exp.startDate}
              <br />– {exp.endDate}
            </div>

            <div className="timeline-connector">
              <div className="timeline-dot" />
              <div className="timeline-line" />
            </div>

            <div className="timeline-content">
              <div className="timeline-company">{exp.company}</div>
              <h3 className="timeline-role">{exp.role}</h3>
              <ul className="timeline-bullets">
                {bullets.map((b, j) => <li key={j}>{b}</li>)}
              </ul>
              {exp.skills.length > 0 && (
                <div className="timeline-tags">
                  {exp.skills.slice(0, 6).map(s => (
                    <span key={s} className="timeline-tag">{s}</span>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
