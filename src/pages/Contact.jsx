import { useMemo, useState } from 'react';
import SectionHeader from '../components/SectionHeader.jsx';
import { profile } from '../data/profile.js';

const buildMessage = (form) => `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`;

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [notice, setNotice] = useState('');

  const links = useMemo(() => {
    const subject = encodeURIComponent(`Portfolio contact from ${form.name || 'visitor'}`);
    const body = encodeURIComponent(buildMessage(form));

    return {
      gmail: `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(profile.email)}&su=${subject}&body=${body}`,
      mailto: `mailto:${profile.email}?subject=${subject}&body=${body}`
    };
  }, [form]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const opened = window.open(links.gmail, '_blank');
    if (opened) {
      opened.opener = null;
    } else {
      window.location.assign(links.gmail);
    }

    setNotice('Gmail compose opened in a new tab. If your browser blocks it, use the direct email or copy option below.');
  };

  const copyMessage = async () => {
    const text = `To: ${profile.email}\nSubject: Portfolio contact from ${form.name || 'visitor'}\n\n${buildMessage(form)}`;

    try {
      await navigator.clipboard.writeText(text);
      setNotice('Message copied. Paste it into Gmail, Outlook or any mail app.');
    } catch {
      setNotice('Copy was blocked by the browser. You can still use the direct email link.');
    }
  };

  return (
    <section id="contact" className="section contact-section">
      <div className="container contact-layout">
        <div>
          <SectionHeader
            eyebrow="Contact"
            title="Let’s build something useful."
            description="Reach out for internships, software engineering roles, project collaboration or technical discussions."
          />

          <div className="contact-links">
            <a href={`mailto:${profile.email}`}>
              <span>✉️</span>
              <div><small>Email</small><strong>{profile.email}</strong></div>
            </a>
            <a href={`tel:${profile.phone.replace(/\s/g, '')}`}>
              <span>📞</span>
              <div><small>Phone</small><strong>{profile.phone}</strong></div>
            </a>
            <a href={profile.linkedIn} target="_blank" rel="noreferrer">
              <span>💼</span>
              <div><small>LinkedIn</small><strong>linkedin.com/in/dinesh-b-20242032a</strong></div>
            </a>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <label>
            Your name
            <input
              type="text"
              value={form.name}
              onChange={(event) => setForm({ ...form, name: event.target.value })}
              placeholder="Recruiter / Company name"
              required
            />
          </label>
          <label>
            Your email
            <input
              type="email"
              value={form.email}
              onChange={(event) => setForm({ ...form, email: event.target.value })}
              placeholder="you@company.com"
              required
            />
          </label>
          <label>
            Message
            <textarea
              value={form.message}
              onChange={(event) => setForm({ ...form, message: event.target.value })}
              placeholder="Tell me about the opportunity..."
              rows="5"
              required
            />
          </label>
          <button className="btn primary" type="submit">Open Gmail compose</button>

          <div className="form-alt-actions">
            <a href={links.mailto}>Open default mail app</a>
            <button type="button" onClick={copyMessage}>Copy message</button>
          </div>

          {notice && <p className="form-helper" role="status">{notice}</p>}
        </form>
      </div>
    </section>
  );
}
