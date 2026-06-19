import SectionHeader from '../components/SectionHeader.jsx';
import { profile } from '../data/profile.js';

export default function Education() {
  return (
    <section id="education" className="section education-section">
      <div className="container split-layout reverse-mobile">
        <div className="education-card">
          <p className="card-kicker">Current Education</p>
          <h3>{profile.education.degree}</h3>
          <p>{profile.education.institution}</p>
          <div className="education-meta">
            <div><span>Duration</span><strong>{profile.education.period}</strong></div>
            <div><span>CGPA</span><strong>{profile.education.cgpa}</strong></div>
          </div>
        </div>

        <div>
          <SectionHeader
            eyebrow="Education"
            title="Formal learning backed by hands-on project execution."
            description="The academic foundation in Information Technology is paired with practical work in realtime systems, mobile development, backend APIs and cloud-ready deployment workflows."
          />
          <div className="timeline">
            <div className="timeline-item">
              <span />
              <div>
                <strong>B.Tech Information Technology</strong>
                <p>R.M.K. Engineering College, Chennai — CGPA 8.44 / 10</p>
              </div>
            </div>
            <div className="timeline-item">
              <span />
              <div>
                <strong>Project-led learning</strong>
                <p>React Native, FastAPI, Supabase, WebSockets, memory profiling and async backend patterns.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
