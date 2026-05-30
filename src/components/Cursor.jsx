import { useEffect, useRef } from 'react';

export default function Cursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    let animationFrameId;
        const render = () => {
      cursor.style.transform = `translate3d(${mouseX - 12}px, ${mouseY - 12}px, 0)`;
      animationFrameId = requestAnimationFrame(render);
    };
    render();
