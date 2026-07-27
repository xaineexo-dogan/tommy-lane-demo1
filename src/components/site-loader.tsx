import { useEffect, useState } from "react";

export function SiteLoader() {
  const [hidden, setHidden] = useState(false);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFading(true), 4600);
    const hideTimer = setTimeout(() => setHidden(true), 5000);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (hidden) return null;

  // Bars animating like an equalizer — the "Nashville music" motif.
  const bars = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  return (
    <div
      className={`fixed inset-0 z-[100] grid place-items-center bg-paper transition-opacity duration-500 ${
        fading ? "opacity-0" : "opacity-100"
      }`}
      aria-hidden="true"
    >
      <div className="flex flex-col items-center gap-8">
        {/* Nashville music animation: guitar + equalizer bars + music notes */}
        <div className="relative flex flex-col items-center gap-4">
          {/* Floating music notes */}
          <div className="relative h-10 w-40">
            <span className="absolute left-2 top-0 font-serif text-2xl text-brand-accent animate-[note_2.4s_ease-in-out_infinite]">
              ♪
            </span>
            <span className="absolute left-16 top-1 font-serif text-3xl text-ink/70 animate-[note_2.4s_ease-in-out_infinite_.6s]">
              ♫
            </span>
            <span className="absolute right-4 top-0 font-serif text-2xl text-brand-accent animate-[note_2.4s_ease-in-out_infinite_1.2s]">
              ♩
            </span>
          </div>

          {/* Equalizer bars */}
          <div className="flex items-end gap-1 h-14">
            {bars.map((i) => (
              <span
                key={i}
                className="w-1.5 bg-ink rounded-sm origin-bottom"
                style={{
                  animation: `eq 1s ease-in-out ${i * 0.08}s infinite`,
                  height: "100%",
                }}
              />
            ))}
          </div>

          {/* Guitar silhouette (SVG) with subtle strum */}
          <svg
            viewBox="0 0 220 60"
            className="w-56 h-14 text-ink animate-[strum_2.6s_ease-in-out_infinite]"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
          >
            {/* Neck */}
            <line x1="10" y1="30" x2="140" y2="30" />
            {/* Frets */}
            {[30, 55, 80, 105, 130].map((x) => (
              <line key={x} x1={x} y1="26" x2={x} y2="34" />
            ))}
            {/* Body */}
            <ellipse cx="175" cy="30" rx="35" ry="22" />
            <circle cx="170" cy="30" r="7" className="text-brand-accent" stroke="currentColor" />
            {/* Strings */}
            <line x1="10" y1="27" x2="205" y2="27" strokeWidth="0.4" />
            <line x1="10" y1="30" x2="205" y2="30" strokeWidth="0.4" />
            <line x1="10" y1="33" x2="205" y2="33" strokeWidth="0.4" />
          </svg>

          {/* NASHVILLE label */}
          <span className="text-[10px] tracking-[0.5em] uppercase font-bold text-ink/60">
            Nashville · Est. Since 1985
          </span>
        </div>

        {/* Logo */}
        <div className="flex items-center gap-3 animate-pulse">
          <div className="size-14 bg-ink rounded-full grid place-items-center text-paper font-serif italic text-3xl">
            T
          </div>
          <span className="font-serif text-2xl tracking-tight font-bold uppercase">
            Tommy Lane{" "}
            <span className="font-light opacity-60 italic normal-case">Publishing</span>
          </span>
        </div>

        <div className="h-px w-32 bg-ink/10 overflow-hidden">
          <div className="h-full w-1/2 bg-brand-accent animate-[loader_1.4s_ease-in-out_infinite]" />
        </div>
      </div>
      <style>{`
        @keyframes loader {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
        @keyframes eq {
          0%, 100% { transform: scaleY(0.25); }
          50% { transform: scaleY(1); }
        }
        @keyframes note {
          0% { transform: translateY(6px); opacity: 0; }
          30% { opacity: 1; }
          100% { transform: translateY(-24px); opacity: 0; }
        }
        @keyframes strum {
          0%, 100% { transform: translateX(0) rotate(0deg); }
          50% { transform: translateX(2px) rotate(-1deg); }
        }
      `}</style>
    </div>
  );
}
