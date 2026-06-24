import { useRef, useState } from 'react';

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

export default function DraggableHeroCard() {
  const cardRef = useRef(null);
  const dragRef = useRef({
    active: false,
    startX: 0,
    startY: 0,
    originX: 0,
    originY: 0,
    bounds: { minX: -Infinity, maxX: Infinity, minY: -Infinity, maxY: Infinity }
  });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);

  const getDragBounds = () => {
    const card = cardRef.current;
    const hero = card?.closest('.hero');
    if (!card || !hero) {
      return { minX: -Infinity, maxX: Infinity, minY: -Infinity, maxY: Infinity };
    }

    const cardRect = card.getBoundingClientRect();
    const heroRect = hero.getBoundingClientRect();
    const padding = 12;

    return {
      minX: position.x + heroRect.left - cardRect.left + padding,
      maxX: position.x + heroRect.right - cardRect.right - padding,
      minY: position.y + heroRect.top - cardRect.top + padding,
      maxY: position.y + heroRect.bottom - cardRect.bottom - padding
    };
  };

  const startDrag = (event) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    if (event.target.closest('button, a, input, textarea')) return;

    event.preventDefault();

    dragRef.current = {
      active: true,
      startX: event.clientX,
      startY: event.clientY,
      originX: position.x,
      originY: position.y,
      bounds: getDragBounds()
    };

    cardRef.current?.setPointerCapture?.(event.pointerId);
    setDragging(true);
  };

  const moveDrag = (event) => {
    if (!dragRef.current.active) return;

    const nextX = dragRef.current.originX + event.clientX - dragRef.current.startX;
    const nextY = dragRef.current.originY + event.clientY - dragRef.current.startY;
    const { minX, maxX, minY, maxY } = dragRef.current.bounds;

    setPosition({
      x: clamp(nextX, minX, maxX),
      y: clamp(nextY, minY, maxY)
    });
  };

  const endDrag = (event) => {
    if (!dragRef.current.active) return;
    dragRef.current.active = false;
    cardRef.current?.releasePointerCapture?.(event.pointerId);
    setDragging(false);
  };

  const resetPosition = () => setPosition({ x: 0, y: 0 });

  return (
    <div
      ref={cardRef}
      className={`hero-panel draggable-card ${dragging ? 'dragging' : ''}`}
      style={{ '--drag-x': `${position.x}px`, '--drag-y': `${position.y}px` }}
      onPointerDown={startDrag}
      onPointerMove={moveDrag}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      aria-label="Draggable developer profile card"
    >
      <div className="code-window">
        <div className="window-dots drag-handle" role="button" tabIndex="0" aria-label="Drag hero card">
          <i />
          <i />
          <i />
          <span>Drag this card</span>
        </div>
        <pre>{`const dinesh = {\n  role: 'Software Engineer',\n  focus: ['React Native', 'FastAPI', 'Realtime'],\n  strengths: ['async I/O', 'WebSockets', 'RLS'],\n  location: 'Chennai, India',\n  status: 'ready_to_build'\n};`}</pre>
      </div>

      <div className="drag-tools">
        <span>{dragging ? 'Move it anywhere on this page' : 'Click and drag the card anywhere in the hero page'}</span>
        <button type="button" onClick={resetPosition}>Reset</button>
      </div>

      <div className="feature-stack">
        <span>Responsive across devices</span>
        <span>Project case studies</span>
        <span>Live coding profile</span>
        <span>Firebase deployment ready</span>
      </div>
    </div>
  );
}
