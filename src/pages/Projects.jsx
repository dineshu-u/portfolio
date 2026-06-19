import { useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import SectionHeader from '../components/SectionHeader.jsx';
import ProjectCard from '../components/ProjectCard.jsx';
import { projects } from '../data/profile.js';

export default function Projects() {
  const [activeSlug, setActiveSlug] = useState(projects[0].slug);
  const touchStartX = useRef(0);

  const activeIndex = useMemo(
    () => Math.max(projects.findIndex((project) => project.slug === activeSlug), 0),
    [activeSlug]
  );

  const activeProject = projects[activeIndex] || projects[0];
  const actionLink = activeProject.apk || activeProject.bot;

  const changeProject = (direction) => {
    const nextIndex = (activeIndex + direction + projects.length) % projects.length;
    setActiveSlug(projects[nextIndex].slug);
  };

  const handleTouchEnd = (event) => {
    const endX = event.changedTouches[0]?.clientX ?? 0;
    const distance = endX - touchStartX.current;

    if (Math.abs(distance) < 48) return;
    changeProject(distance < 0 ? 1 : -1);
  };

  return (
    <section id="projects" className="section projects-section">
      <div className="container">
        <SectionHeader
          eyebrow="Projects"
          title="Projects with working links and implementation notes."
          description="Open a project for the full breakdown. On mobile, swipe the preview or use the quick actions below it."
          align="center"
        />

        <div className="project-studio">
          <div className="project-list" aria-label="Project list">
            {projects.map((project) => (
              <ProjectCard
                key={project.slug}
                project={project}
                active={project.slug === activeProject.slug}
                onActivate={() => setActiveSlug(project.slug)}
              />
            ))}
          </div>

          <aside
            className={`project-preview ${activeProject.gradient}`}
            aria-live="polite"
            onTouchStart={(event) => { touchStartX.current = event.touches[0]?.clientX ?? 0; }}
            onTouchEnd={handleTouchEnd}
          >
            <div className="preview-orbit">
              <span />
              <span />
              <span />
              <strong>{activeProject.icon}</strong>
            </div>
            <p className="project-type">{activeProject.type}</p>
            <h3>{activeProject.title}</h3>
            <p>{activeProject.tagline}</p>
            <div className="metrics-row">
              {activeProject.metrics.map((metric) => (
                <div key={metric.label}>
                  <strong>{metric.value}</strong>
                  <span>{metric.label}</span>
                </div>
              ))}
            </div>
            <div className="preview-tech">
              {activeProject.tech.map((tech) => (
                <span key={tech}>{tech}</span>
              ))}
            </div>

            <div className="mobile-project-actions" aria-label="Mobile project controls">
              <div className="mobile-switcher">
                <button type="button" onClick={() => changeProject(-1)}>← Previous</button>
                <span>{activeIndex + 1} / {projects.length}</span>
                <button type="button" onClick={() => changeProject(1)}>Next →</button>
              </div>
              <div className="mobile-project-buttons">
                <Link className="btn primary" to={`/projects/${activeProject.slug}`}>View details</Link>
                {actionLink && (
                  <a className="btn secondary" href={actionLink} target="_blank" rel="noreferrer">
                    {activeProject.apk ? 'Download APK' : 'Open bot'}
                  </a>
                )}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
