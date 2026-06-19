import { profile } from '../data/profile.js';

export default function Footer() {
  return (
    <footer className="footer">
      <div>
        <strong>{profile.name}</strong>
        <p>Built with React, Vite and Firebase-ready hosting.</p>
      </div>
      <div className="footer-links">
        <a href={profile.linkedIn} target="_blank" rel="noreferrer">LinkedIn</a>
        <a href={`mailto:${profile.email}`}>Email</a>
        <a href={profile.resume} download>Resume</a>
      </div>
    </footer>
  );
}
