import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="border-t border-border mt-24">
      <div className="max-w-7xl mx-auto px-6 py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <div className="size-8 bg-ink rounded-full grid place-items-center text-paper font-serif italic text-xl">T</div>
            <span className="font-serif text-lg font-bold uppercase">Tommy Lane <span className="font-light italic opacity-60 normal-case">Publishing</span></span>
          </div>
          <p className="text-sm opacity-70 max-w-sm leading-relaxed">
            Independent music publisher representing four decades of professionally recorded master and publishing rights. BMI affiliated.
          </p>
        </div>
        <div>
          <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40 mb-4">Catalog</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/catalog" className="hover:text-brand-accent">All Recordings</Link></li>
            <li><Link to="/artists" className="hover:text-brand-accent">Artists</Link></li>
            <li><Link to="/genres" className="hover:text-brand-accent">Genres</Link></li>
            <li><Link to="/news" className="hover:text-brand-accent">News</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40 mb-4">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about" className="hover:text-brand-accent">About</Link></li>
            <li><Link to="/licensing" className="hover:text-brand-accent">Licensing</Link></li>
            <li><Link to="/portal" className="hover:text-brand-accent">The Portal</Link></li>
            <li><Link to="/contact" className="hover:text-brand-accent">Contact</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold uppercase tracking-[0.2em] opacity-40">
          <span>© {new Date().getFullYear()} Tommy Lane Publishing LLC. All rights reserved.</span>
          <span>Nashville, Tennessee · BMI Affiliated</span>
        </div>
      </div>
    </footer>
  );
}
