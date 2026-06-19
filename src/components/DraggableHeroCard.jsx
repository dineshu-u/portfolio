import { useRef, useState } from 'react';

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

export default function DraggableHeroCard() {
  const cardRef = useRef(null);
  const dragRef = useRef({ active: false, startX: 0, startY: 0, originX: 0, originY: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);

  const startDrag = (event) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;

    dragRef.current = {
      active: true,
      startX: event.clientX,
      startY: event.clientY,
      originX: position.x,
      originY: position.y
    };

    cardRef.current?.setPointerCapture?.(event.pointerId);
    setDragging(true);
  };

  const moveDrag = (event) => {
    if (!dragRef.current.active) return;

    const nextX = dragRef.current.originX + event.clientX - dragRef.current.startX;
    const nextY = dragRef.current.originY + event.clientY - dragRef.current.startY;

    setPosition({
      x: clamp(nextX, -120, 120),
      y: clamp(nextY, -90, 90)
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
      onPointerMove={moveDrag}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      aria-label="Draggable developer profile card"
    >
      <div className="code-window">
        <div className="window-dots drag-handle" onPointerDown={startDrag} role="button" tabIndex="0" aria-label="Drag hero card">
          <i />
          <i />
          <i />
          <span>Drag this card</span>
        </div>
        <pre>{`const dinesh = {\n  role: 'Software Engineer',\n  focus: ['React Native', 'FastAPI', 'Realtime'],\n  strengths: ['async I/O', 'WebSockets', 'RLS'],\n  location: 'Chennai, India',\n  status: 'ready_to_build'\n};`}</pre>
      </div>

      <div className="drag-tools">
        <span>{dragging ? 'Move anywhere inside the safe zone' : 'Tip: drag the top bar'}</span>
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
