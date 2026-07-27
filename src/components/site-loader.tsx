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

  return (
    <div
      className={`fixed inset-0 z-[100] grid place-items-center bg-paper transition-opacity duration-500 ${
        fading ? "opacity-0" : "opacity-100"
      }`}
      aria-hidden="true"
    >
      <div className="flex flex-col items-center gap-6">
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
      `}</style>
    </div>
  );
}
