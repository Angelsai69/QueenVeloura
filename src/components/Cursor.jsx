import { useEffect, useRef } from 'react';
import './Cursor.css';

export default function Cursor() {
  const cursorRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const ring = ringRef.current;
    let ringX = 0, ringY = 0;
    let curX = 0, curY = 0;
    let raf;

    const onMove = (e) => {
      curX = e.clientX;
      curY = e.clientY;
      cursor.style.left = curX + 'px';
      cursor.style.top = curY + 'px';
    };

    const animateRing = () => {
      ringX += (curX - ringX) * 0.12;
      ringY += (curY - ringY) * 0.12;
      ring.style.left = ringX + 'px';
      ring.style.top = ringY + 'px';
      raf = requestAnimationFrame(animateRing);
    };

    const onEnter = () => { cursor.classList.add('hovering'); ring.classList.add('hovering'); };
    const onLeave = () => { cursor.classList.remove('hovering'); ring.classList.remove('hovering'); };

    document.addEventListener('mousemove', onMove);
    document.querySelectorAll('a, button, [role="button"]').forEach(el => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    // MutationObserver to handle dynamically added elements
    const observer = new MutationObserver(() => {
      document.querySelectorAll('a, button, [role="button"]').forEach(el => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
        el.addEventListener('mouseenter', onEnter);
        el.addEventListener('mouseleave', onLeave);
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    raf = requestAnimationFrame(animateRing);

    return () => {
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="cursor" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}
