import { createFileRoute, Link } from "@tanstack/react-router";
import { songs, genres, artists, getArtist, getGenre } from "@/lib/catalog-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tommy Lane Publishing — 45 Years of Uncompromised Sound" },
      { name: "description", content: "Independent publisher with fully owned master and publishing rights across four decades of professionally recorded music. Available for film, TV, and advertising sync." },
      { property: "og:title", content: "Tommy Lane Publishing — 45 Years of Uncompromised Sound" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

function Home() {
  const featured = songs.slice(0, 3);
  const featuredGenres = genres.slice(0, 6);

  return (
    <>
      {/* Hero */}
      <header className="relative py-20 lg:py-32 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <div className="inline-block px-3 py-1 border border-ink/20 rounded-full text-[10px] font-bold uppercase tracking-widest mb-6 opacity-60">
              Est. 1979 · BMI Affiliated
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-8xl font-serif leading-[0.9] mb-8 text-balance">
              45 Years of <br />
              <span className="italic text-brand-accent">Uncompromised</span> Sound.
            </h1>
            <p className="text-xl max-w-xl font-light leading-relaxed mb-10 opacity-80">
              A legacy catalog spanning four decades of professionally recorded master and publishing rights.
              Direct access to the soundtrack of American music history.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/catalog" className="px-8 py-4 bg-ink text-paper rounded-sm font-semibold text-sm hover:shadow-2xl hover:bg-brand-accent transition-all">
                Explore the Catalog
              </Link>
              <Link to="/about" className="px-8 py-4 border border-ink/20 rounded-sm font-semibold text-sm hover:bg-ink hover:text-paper transition-all">
                About the Collection
              </Link>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="aspect-[4/5] rounded-2xl bg-gradient-to-br from-stone-300 via-stone-200 to-amber-100 outline-1 -outline-offset-1 outline-ink/5 grid place-items-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_20%,var(--brand-accent),transparent_60%)]" />
              <div className="relative text-center">
                <div className="font-serif italic text-6xl text-ink/80">TL</div>
                <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-ink/60 mt-2">Archival Record · 1979</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Featured Recordings */}
      <section className="py-24 bg-ink text-paper">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap justify-between items-end gap-6 mb-16">
            <div>
              <h2 className="text-4xl font-serif italic mb-4">Featured Recordings</h2>
              <p className="text-paper/50 font-light">Hand-selected tracks from our most sought-after masters.</p>
            </div>
            <Link to="/catalog" className="text-xs font-bold uppercase tracking-widest border-b border-paper/20 pb-1 hover:text-brand-accent hover:border-brand-accent transition-all">
              View Full Catalog
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featured.map((song) => {
              const artist = getArtist(song.artistSlug);
              const genre = getGenre(song.genreSlug);
              return (
                <Link
                  key={song.slug}
                  to="/catalog/$slug"
                  params={{ slug: song.slug }}
                  className="group block"
                >
                  <div className="aspect-square bg-paper/5 outline-1 -outline-offset-1 outline-paper/10 rounded-lg mb-6 group-hover:outline-brand-accent/50 transition-all grid place-items-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/10 via-transparent to-paper/5" />
                    <div className="relative text-center px-6">
                      <div className="font-serif italic text-2xl opacity-60 mb-1">{song.title}</div>
                      <div className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40">{song.year}</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-start gap-4">
                    <div className="min-w-0">
                      <h3 className="text-lg font-serif italic group-hover:text-brand-accent transition-colors truncate">{song.title}</h3>
                      <p className="text-xs font-bold uppercase tracking-widest opacity-40 mt-1 truncate">
                        {artist?.name} · {genre?.name}
                      </p>
                    </div>
                    <div className="size-10 shrink-0 border border-paper/20 rounded-full flex items-center justify-center opacity-40 group-hover:opacity-100 group-hover:border-brand-accent transition-all">
                      <div className="w-0 h-0 border-y-[6px] border-y-transparent border-l-[9px] border-l-paper ml-[2px]" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Genres */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-between items-end gap-6 mb-12">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-40 mb-2">By Genre</p>
              <h2 className="font-serif text-4xl">Explore the collection.</h2>
            </div>
            <Link to="/genres" className="text-xs font-bold uppercase tracking-widest border-b border-ink/20 pb-1 hover:text-brand-accent hover:border-brand-accent transition-all">
              All Genres
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-border">
            {featuredGenres.map((g) => (
              <Link
                key={g.slug}
                to="/genres/$slug"
                params={{ slug: g.slug }}
                className="bg-paper p-8 hover:bg-ink hover:text-paper transition-colors group"
              >
                <div className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-40 group-hover:opacity-60 mb-3">{g.era}</div>
                <h3 className="font-serif italic text-3xl mb-3 group-hover:text-brand-accent transition-colors">{g.name}</h3>
                <p className="text-sm opacity-70">{g.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Company intro */}
      <section className="py-24 px-6 border-t border-border">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-40 mb-4">The Publisher</p>
            <h2 className="font-serif text-4xl leading-tight mb-6">
              Four decades of songs, <span className="italic text-brand-accent">professionally prepared</span> for what's next.
            </h2>
            <p className="opacity-70 leading-relaxed mb-6">
              Tommy Lane Publishing has spent forty-five years writing, recording, and preserving a catalog with clear ownership of both master and publishing rights. Every recording is cleared, catalogued, and ready for a supervisor's next placement.
            </p>
            <Link to="/about" className="text-xs font-bold uppercase tracking-[0.2em] border-b border-ink pb-1 hover:text-brand-accent hover:border-brand-accent transition-colors">
              Read the full story
            </Link>
          </div>
          <ul className="grid grid-cols-2 gap-px bg-border border border-border">
            {[
              { k: "45", v: "Years in publishing" },
              { k: "12", v: "Genres represented" },
              { k: `${artists.length}+`, v: "Artists in catalog" },
              { k: "100%", v: "Rights ownership" },
            ].map((s) => (
              <li key={s.v} className="bg-paper p-8 text-center">
                <div className="font-serif text-5xl text-brand-accent">{s.k}</div>
                <div className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-60 mt-2">{s.v}</div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Licensing portal CTA */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto bg-ink text-paper rounded-3xl p-12 md:p-16 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-accent/20 rounded-full -mr-32 -mt-32 blur-3xl" />
          <div className="relative z-10">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-accent mb-4">For Supervisors & Producers</p>
            <h2 className="font-serif text-4xl md:text-5xl mb-6">
              Access the <span className="italic">Licensing Portal</span>.
            </h2>
            <p className="text-lg max-w-2xl mx-auto font-light leading-relaxed mb-10 opacity-70">
              Approved music supervisors, production companies, and agencies receive credentials to download high-quality masters, metadata, and stems.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/portal" className="px-10 py-4 bg-brand-accent text-paper rounded-full font-bold text-xs uppercase tracking-widest hover:bg-paper hover:text-ink transition-colors">
                Request Access
              </Link>
              <Link to="/portal" className="px-10 py-4 border border-paper/20 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-paper hover:text-ink transition-colors">
                Login to Portal
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
