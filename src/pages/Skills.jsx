import SectionHeader from '../components/SectionHeader.jsx';
import { skillGroups } from '../data/profile.js';

export default function Skills() {
  return (
    <section id="skills" className="section skills-section">
      <div className="container">
        <SectionHeader
          eyebrow="Technical Skills"
          title="Technical toolkit I use to build apps."
          description="Languages, frameworks, tools and concepts I have used across mobile, backend and realtime projects."
          align="center"
        />

        <div className="skills-grid">
          {skillGroups.map((group) => (
            <article key={group.title} className={`skill-card ${group.accent}`}>
              <div className="skill-card-header">
                <h3>{group.title}</h3>
                <span>{group.skills.length} skills</span>
              </div>
              <p>{group.description}</p>
              <div className="skill-cloud">
                {group.skills.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
