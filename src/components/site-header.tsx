import { Link } from "@tanstack/react-router";

const nav = [
  { to: "/catalog", label: "Catalog" },
  { to: "/artists", label: "Artists" },
  { to: "/genres", label: "Genres" },
  { to: "/about", label: "About" },
  { to: "/news", label: "News" },
  { to: "/portal", label: "The Portal" },
] as const;

export function SiteHeader() {
  return (
    <nav className="sticky top-0 z-50 bg-paper/85 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-6">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="size-8 bg-ink rounded-full grid place-items-center text-paper font-serif italic text-xl">
            T
          </div>
          <span className="font-serif text-lg tracking-tight font-bold uppercase">
            Tommy Lane <span className="font-light opacity-60 italic normal-case">Publishing</span>
          </span>
        </Link>
        <div className="hidden lg:flex items-center gap-8 text-xs font-semibold uppercase tracking-[0.2em] opacity-70">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeProps={{ className: "text-brand-accent opacity-100" }}
              className="hover:text-brand-accent transition-colors"
            >
              {n.label}
            </Link>
          ))}
        </div>
        <Link
          to="/contact"
          className="px-5 py-2.5 bg-ink text-paper text-[10px] font-bold uppercase tracking-[0.2em] rounded-full hover:bg-brand-accent transition-colors shrink-0"
        >
          Licensing Inquiry
        </Link>
      </div>
    </nav>
  );
}
