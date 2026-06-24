import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import { profile } from '../data/profile.js';
import DraggableHeroCard from '../components/DraggableHeroCard.jsx';
import About from './About.jsx';
import Skills from './Skills.jsx';
import Projects from './Projects.jsx';
import LeetCode from './LeetCode.jsx';
import Education from './Education.jsx';
import Contact from './Contact.jsx';

export default function Home() {
  return (
    <div className="app-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <Navbar />

      <main>
        <section className="hero" id="home">
          <div className="hero-kinetic-bg" aria-hidden="true">
            <span className="shape shape-one" />
            <span className="shape shape-two" />
            <span className="shape shape-three" />
            <span className="scan-line" />
          </div>
          <div className="hero-grid container">
            <div className="hero-copy reveal-up">
              <div className="hero-mini-row">
                <p className="availability"><span /> Open to software engineering opportunities</p>
                <p className="weather-chip">Chennai · IT Student</p>
              </div>
              <h1>
                Building realtime apps with <span>clean code</span> and product thinking.
              </h1>
              <p className="hero-lead">
                I am {profile.name}, an {profile.role.toLowerCase()} from {profile.location}, focused on full-stack development,
                mobile apps and realtime systems.
              </p>
              <div className="hero-actions">
                <a className="btn primary" href="#projects">Explore projects</a>
                <a className="btn secondary" href={profile.resume} download>Download resume</a>
              </div>
              <div className="quick-stats" aria-label="Portfolio highlights">
                <div><strong>8.44</strong><span>CGPA</span></div>
                <div><strong>2</strong><span>Major Projects</span></div>
                <div><strong>2028</strong><span>B.Tech Expected</span></div>
              </div>
              <a className="scroll-cue" href="#about">
                <span />
                Scroll to explore
              </a>
            </div>

            <DraggableHeroCard />
          </div>
        </section>

        <About />
        <Skills />
        <Projects />
        <LeetCode />
        <Education />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
