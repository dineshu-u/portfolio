import SectionHeader from '../components/SectionHeader.jsx';
import { companyFeatures, profile } from '../data/profile.js';

export default function About() {
  return (
    <section id="about" className="section about-section">
      <div className="container split-layout">
        <div>
          <SectionHeader
            eyebrow="About"
            title="A practical engineer who connects mobile, backend and realtime UX."
            description={profile.objective}
          />
          <div className="language-row">
            {profile.languagesSpoken.map((language) => (
              <span key={language}>{language}</span>
            ))}
          </div>
        </div>

        <div className="expectation-card">
          <p className="card-kicker">What this site highlights</p>
          <h3>A focused overview of my skills, projects, education and contact details.</h3>
          <div className="feature-grid">
            {companyFeatures.map((feature) => (
              <div key={feature} className="feature-pill">
                <span aria-hidden="true">✓</span>
                {feature}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
