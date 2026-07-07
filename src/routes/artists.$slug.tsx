import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getArtist, songsByArtist } from "@/lib/catalog-data";
import { TrackRow } from "@/components/track-row";

export const Route = createFileRoute("/artists/$slug")({
  loader: ({ params }) => {
    const artist = getArtist(params.slug);
    if (!artist) throw notFound();
    return { artist, tracks: songsByArtist(params.slug) };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return { meta: [{ title: "Artist not found" }, { name: "robots", content: "noindex" }] };
    const { artist } = loaderData;
    return {
      meta: [
        { title: `${artist.name} — Tommy Lane Publishing` },
        { name: "description", content: artist.bio },
        { property: "og:title", content: `${artist.name}` },
        { property: "og:description", content: artist.bio },
        { property: "og:url", content: `/artists/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/artists/${params.slug}` }],
    };
  },
  component: ArtistPage,
});

function ArtistPage() {
  const { artist, tracks } = Route.useLoaderData();
  return (
    <div className="px-6 py-20 max-w-6xl mx-auto">
      <Link to="/artists" className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-60 hover:text-brand-accent">
        ← All artists
      </Link>
      <header className="grid lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-12 mt-8 mb-16">
        <div className="aspect-square rounded-2xl bg-gradient-to-br from-ink/80 to-brand-accent grid place-items-center text-paper">
          <span className="font-serif italic text-6xl">{artist.name.split(" ").map(w => w[0]).join("").slice(0,3)}</span>
        </div>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-40 mb-4">
            {artist.hometown} · {artist.era}
          </p>
          <h1 className="font-serif text-5xl md:text-6xl leading-[1] mb-6">{artist.name}</h1>
          <p className="text-lg leading-relaxed opacity-85">{artist.bio}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/contact" className="px-8 py-4 bg-ink text-paper rounded-sm text-xs font-bold uppercase tracking-[0.2em] hover:bg-brand-accent transition-colors">
              License this artist's catalog
            </Link>
          </div>
        </div>
      </header>

      <section>
        <h2 className="font-serif text-3xl italic mb-6">Recordings ({tracks.length})</h2>
        <div>
          {tracks.map((s) => <TrackRow key={s.slug} song={s} />)}
        </div>
      </section>
    </div>
  );
}
