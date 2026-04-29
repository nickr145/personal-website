import { experiences } from '../data/experiences';

export function Experiences() {
  return (
    <div>
      {experiences.map((exp, i) => (
        <article key={i} className="newspaper-brief">
          <div className="brief-dateline">
            {exp.company} · {exp.startDate}–{exp.endDate}
          </div>
          <h3 className="brief-headline">{exp.role}</h3>
          <p className="brief-body">
            {exp.description.replace(/^[-–]\s*/gm, '').trim()}
          </p>
          {exp.skills.length > 0 && (
            <div className="brief-tags">
              {exp.skills.slice(0, 6).map((s) => (
                <span key={s} className="brief-tag">{s}</span>
              ))}
            </div>
          )}
        </article>
      ))}
    </div>
  );
}
