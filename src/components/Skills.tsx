import { skillCategories } from '../data/skills';

export function Skills() {
  return (
    <div className="skills-grid">
      {skillCategories.map((cat) => (
        <div key={cat.category} className="skills-row">
          <span className="skills-category">{cat.category}</span>
          <div className="skills-items">
            {cat.items.map((item) => (
              <span key={item} className="skill-chip">{item}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
