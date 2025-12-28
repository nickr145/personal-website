import Card from './Card';
import { experiences } from '../data/experiences';

export function Experiences() {
  return (
    <Card title="Experiences">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {experiences.map((exp, idx) => (
          <div key={idx} className="work-experience-item">
            {/* Header: Role and Company */}
            <div className="work-header">
              <div>
                <h3 style={{ fontWeight: 600, fontSize: '1.1em', margin: '0 0 0.25rem 0' }}>
                  {exp.role}
                </h3>
                <p style={{ margin: '0 0 0.5rem 0', color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.95em' }}>
                  {exp.company}
                </p>
              </div>
              <div style={{ textAlign: 'right', fontSize: '0.9em', color: 'rgba(255, 255, 255, 0.6)' }}>
                <p style={{ margin: 0 }}>
                  {exp.startDate} – {exp.endDate}
                </p>
              </div>
            </div>

            {/* Description */}
            <div style={{ margin: '0.75rem 0', fontSize: '0.95em', lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>
              {exp.description}
            </div>

            {/* Skills */}
            <div className="work-skills">
              {exp.skills.map((skill) => (
                <span key={skill} className="skill-tag">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
