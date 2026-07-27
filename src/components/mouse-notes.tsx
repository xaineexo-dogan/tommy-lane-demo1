import { useEffect, useRef } from "react";

const NOTES = ["♪", "♫", "♩", "♬"];

export function MouseNotes() {
  const lastSpawn = useRef(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const now = performance.now();
      // Throttle to ~1 note per 60ms so movement leaves a trail without flooding
      if (now - lastSpawn.current < 60) return;
      lastSpawn.current = now;

      const el = document.createElement("span");
      el.textContent = NOTES[Math.floor(Math.random() * NOTES.length)];
      el.className = "mouse-note";
      el.style.left = `${e.clientX}px`;
      el.style.top = `${e.clientY}px`;
      const drift = (Math.random() - 0.5) * 60;
      const size = 14 + Math.random() * 14;
      el.style.setProperty("--drift", `${drift}px`);
      el.style.fontSize = `${size}px`;
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 1200);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <style>{`
      .mouse-note {
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        transform: translate(-50%, -50%);
        color: var(--brand-accent, #c8102e);
        font-family: Georgia, serif;
        text-shadow: 0 1px 3px rgba(0,0,0,0.15);
        animation: mouse-note-float 1.2s ease-out forwards;
        will-change: transform, opacity;
      }
      @keyframes mouse-note-float {
        0%   { opacity: 0; transform: translate(-50%, -50%) scale(0.6); }
        20%  { opacity: 1; transform: translate(calc(-50% + calc(var(--drift) * 0.2)), -60%) scale(1); }
        100% { opacity: 0; transform: translate(calc(-50% + var(--drift)), -160%) scale(1.1); }
      }
      @media (prefers-reduced-motion: reduce) {
        .mouse-note { display: none; }
      }
    `}</style>
  );
}
