import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollReveal() {
  const location = useLocation();

  useEffect(() => {
    const selector = [
      '.section-header',
      '.expectation-card',
      '.skill-card',
      '.project-card',
      '.project-preview',
      '.leetcode-card',
      '.education-card',
      '.timeline-item',
      '.contact-links a',
      '.contact-form',
      '.detail-card',
      '.detail-device-card'
    ].join(',');

    const items = Array.from(document.querySelectorAll(selector));

    if (!('IntersectionObserver' in window)) {
      items.forEach((item) => item.classList.add('is-visible'));
      return undefined;
    }

    items.forEach((item, index) => {
      item.classList.add('reveal-on-scroll');
      item.classList.remove('is-visible');
      item.style.setProperty('--reveal-delay', `${Math.min(index % 6, 5) * 70}ms`);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -10% 0px' }
    );

    items.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, [location.pathname]);

  return null;
}
