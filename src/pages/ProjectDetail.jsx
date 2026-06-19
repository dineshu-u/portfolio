import { Link, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import { projects } from '../data/profile.js';

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return (
      <div className="app-shell">
        <Navbar />
        <main className="container not-found">
          <h1>Project not found</h1>
          <Link className="btn primary" to="/#projects">Back to projects</Link>
        </main>
        <Footer />
      </div>
    );
  }

  const primaryLink = project.apk || project.bot;
  const secondaryLink = project.bot || project.apk;

  return (
    <div className="app-shell detail-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <Navbar />

      <main>
        <section className={`project-hero-detail ${project.gradient}`}>
          <div className="container detail-grid">
            <div>
              <Link className="back-link" to="/#projects">← Back to projects</Link>
              <p className="eyebrow">{project.type}</p>
              <h1>{project.title}</h1>
              <p className="detail-lead">{project.longSummary}</p>
              <div className="detail-actions">
                {primaryLink && (
                  <a className="btn primary" href={primaryLink} target="_blank" rel="noreferrer">
                    {project.primaryCta}
                  </a>
                )}
                {project.apk && project.bot && secondaryLink && (
                  <a className="btn secondary" href={secondaryLink} target="_blank" rel="noreferrer">
                    Open secondary link
                  </a>
                )}
              </div>
            </div>

            <div className="detail-device-card">
              <div className="preview-orbit large">
                <span />
                <span />
                <span />
                <strong>{project.icon}</strong>
              </div>
              <div className="metrics-row stacked">
                {project.metrics.map((metric) => (
                  <div key={metric.label}>
                    <strong>{metric.value}</strong>
                    <span>{metric.label}</span>
                  </div>
                ))}
              </div>
              <p>{project.date}</p>
            </div>
          </div>
        </section>

        <section className="section detail-content">
          <div className="container detail-content-grid">
            <article className="detail-card">
              <p className="card-kicker">Project summary</p>
              <h2>{project.tagline}</h2>
              <p>{project.summary}</p>
            </article>

            <article className="detail-card">
              <p className="card-kicker">Tech stack</p>
              <div className="skill-cloud detail-cloud">
                {project.tech.map((tech) => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>
            </article>

            <article className="detail-card wide">
              <p className="card-kicker">Key engineering work</p>
              <ul className="highlight-list">
                {project.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </article>

            {project.slug === 'telegram-music-bot' && (
              <article className="detail-card wide callout-card">
                <p className="card-kicker">Telegram Bot Link</p>
                <h2>Try Drizzy Graham Bot directly on Telegram.</h2>
                <p>
                  This page includes the requested bot link and explains the backend architecture used to keep the bot lightweight and realtime.
                </p>
                <a className="btn primary" href={project.bot} target="_blank" rel="noreferrer">Open https://t.me/DrizzyGrahamBot</a>
              </article>
            )}

            {project.slug === 'fetchmate' && (
              <article className="detail-card wide callout-card">
                <p className="card-kicker">APK Link</p>
                <h2>Install the React Native app build.</h2>
                <p>
                  The APK link is included as requested so visitors can immediately download and test the app on Android.
                </p>
                <a className="btn primary" href={project.apk} target="_blank" rel="noreferrer">Download Expo APK</a>
              </article>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
