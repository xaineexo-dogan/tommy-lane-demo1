import { createFileRoute, Link } from "@tanstack/react-router";
import { genres, songsByGenre } from "@/lib/catalog-data";

export const Route = createFileRoute("/genres")({
  head: () => ({
    meta: [
      { title: "Genres — Tommy Lane Publishing" },
      { name: "description", content: "Browse the Tommy Lane Publishing catalog by genre — soul, country rock, synth-pop, cinematic, and more." },
      { property: "og:title", content: "Genres — Tommy Lane Publishing" },
      { property: "og:url", content: "/genres" },
    ],
    links: [{ rel: "canonical", href: "/genres" }],
  }),
  component: GenresIndex,
});

function GenresIndex() {
  return (
    <div className="px-6 py-20 max-w-7xl mx-auto">
      <p className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-40 mb-4">Genres</p>
      <h1 className="font-serif text-5xl md:text-7xl leading-[0.95] mb-12">By genre.</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-px bg-border">
        {genres.map((g) => {
          const count = songsByGenre(g.slug).length;
          return (
            <Link
              key={g.slug}
              to="/genres/$slug"
              params={{ slug: g.slug }}
              className="bg-paper p-8 hover:bg-ink hover:text-paper transition-colors group aspect-square flex flex-col justify-between"
            >
              <div>
                <div className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-40 group-hover:opacity-60">{g.era}</div>
                <h3 className="font-serif italic text-3xl mt-3 group-hover:text-brand-accent transition-colors">{g.name}</h3>
                <p className="text-sm opacity-70 mt-3">{g.description}</p>
              </div>
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-50 mt-6">
                {count} recording{count === 1 ? "" : "s"} →
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
