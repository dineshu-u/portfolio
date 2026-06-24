import { useEffect, useRef, useState } from 'react';

export default function AnimatedCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const frame = useRef(null);
  const [enabled, setEnabled] = useState(false);
  const [pulses, setPulses] = useState([]);

  useEffect(() => {
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    setEnabled(canHover);
    if (!canHover) return undefined;

    const move = (event) => {
      mouse.current.x = event.clientX;
      mouse.current.y = event.clientY;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
      }
    };

    const animate = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.18;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.18;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0)`;
      }

      frame.current = requestAnimationFrame(animate);
    };

    const setHover = (state) => {
      document.documentElement.classList.toggle('cursor-hovering', state);
    };

    const pointerOver = (event) => {
      if (event.target.closest('a, button, input, textarea, [role="button"], .project-card, .drag-handle')) {
        setHover(true);
      }
    };

    const pointerOut = (event) => {
      if (event.target.closest('a, button, input, textarea, [role="button"], .project-card, .drag-handle')) {
        setHover(false);
      }
    };

    const click = (event) => {
      const id = `${Date.now()}-${Math.random()}`;
      setPulses((items) => [...items.slice(-5), { id, x: event.clientX, y: event.clientY }]);
      window.setTimeout(() => {
        setPulses((items) => items.filter((item) => item.id !== id));
      }, 700);
    };

    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerdown', click, { passive: true });
    document.addEventListener('mouseover', pointerOver);
    document.addEventListener('mouseout', pointerOut);
    frame.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerdown', click);
      document.removeEventListener('mouseover', pointerOver);
      document.removeEventListener('mouseout', pointerOut);
      cancelAnimationFrame(frame.current);
      document.documentElement.classList.remove('cursor-hovering');
    };
  }, []);

  if (!enabled) return null;

  return (
    <div className="custom-cursor" aria-hidden="true">
      <span ref={ringRef} className="cursor-ring" />
      <span ref={dotRef} className="cursor-dot" />
      {pulses.map((pulse) => (
        <span
          key={pulse.id}
          className="cursor-pulse"
          style={{ left: pulse.x, top: pulse.y }}
        />
      ))}
    </div>
  );
}
