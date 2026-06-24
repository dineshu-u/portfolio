import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { profile } from '../data/profile.js';
import ThemeToggle from './ThemeToggle.jsx';

const navItems = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#leetcode', label: 'LeetCode' },
  { href: '#education', label: 'Education' },
  { href: '#contact', label: 'Contact' }
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isProjectPage = location.pathname.startsWith('/projects/');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const close = () => setOpen(false);

  const handleBrandClick = () => {
    close();
    if (!isProjectPage) {
      window.setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 0);
    }
  };

  return (
    <header className={`site-nav ${scrolled ? 'scrolled' : ''}`}>
      <Link to="/" className="brand" onClick={handleBrandClick} aria-label="Dinesh B home">
        <span className="brand-mark">DB</span>
        <span>Dinesh B<span className="accent-dot">.</span></span>
      </Link>

      <button
        className={`nav-toggle ${open ? 'open' : ''}`}
        type="button"
        aria-label="Toggle navigation menu"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <span />
        <span />
        <span />
      </button>

      <nav className={`nav-links ${open ? 'open' : ''}`} aria-label="Primary navigation">
        {navItems.map((item) =>
          isProjectPage ? (
            <Link key={item.href} to={`/${item.href}`} onClick={close}>
              {item.label}
            </Link>
          ) : (
            <a key={item.href} href={item.href} onClick={close}>
              {item.label}
            </a>
          )
        )}
        <ThemeToggle />
        <a className="nav-cta" href={profile.resume} download onClick={close}>
          Resume
        </a>
      </nav>
    </header>
  );
}
