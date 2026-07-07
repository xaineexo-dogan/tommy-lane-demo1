import { createFileRoute, Link } from "@tanstack/react-router";
import { artists, songsByArtist } from "@/lib/catalog-data";

export const Route = createFileRoute("/artists")({
  head: () => ({
    meta: [
      { title: "Artists — Tommy Lane Publishing" },
      { name: "description", content: "Artists represented in the Tommy Lane Publishing catalog, from Memphis soul to Nashville synth-pop." },
      { property: "og:title", content: "Artists — Tommy Lane Publishing" },
      { property: "og:url", content: "/artists" },
    ],
    links: [{ rel: "canonical", href: "/artists" }],
  }),
  component: ArtistsIndex,
});

function ArtistsIndex() {
  return (
    <div className="px-6 py-20 max-w-7xl mx-auto">
      <p className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-40 mb-4">Artists</p>
      <h1 className="font-serif text-5xl md:text-7xl leading-[0.95] mb-12">The players.</h1>
      <div className="grid md:grid-cols-2 gap-px bg-border">
        {artists.map((a) => {
          const count = songsByArtist(a.slug).length;
          return (
            <Link
              key={a.slug}
              to="/artists/$slug"
              params={{ slug: a.slug }}
              className="bg-paper p-10 hover:bg-ink hover:text-paper transition-colors group"
            >
              <div className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-40 group-hover:opacity-60 mb-3">
                {a.hometown} · {a.era}
              </div>
              <h2 className="font-serif italic text-3xl mb-3 group-hover:text-brand-accent transition-colors">{a.name}</h2>
              <p className="opacity-70 mb-4 leading-relaxed">{a.bio}</p>
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-50">
                {count} recording{count === 1 ? "" : "s"} in catalog →
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
