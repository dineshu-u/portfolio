import { Link } from 'react-router-dom';

export default function ProjectCard({ project, active, onActivate }) {
  return (
    <Link
      to={`/projects/${project.slug}`}
      className={`project-card ${active ? 'active' : ''}`}
      onMouseEnter={onActivate}
      onFocus={onActivate}
      aria-label={`Open details for ${project.title}`}
    >
      <div className="project-card-top">
        <span className="project-icon" aria-hidden="true">{project.icon}</span>
        <span className="project-type">{project.type}</span>
      </div>
      <h3>{project.title}</h3>
      <p>{project.summary}</p>
      <div className="project-tech-list">
        {project.tech.slice(0, 5).map((tech) => (
          <span key={tech}>{tech}</span>
        ))}
      </div>
      <div className="project-open">
        View full project <span aria-hidden="true">→</span>
      </div>
    </Link>
  );
}
