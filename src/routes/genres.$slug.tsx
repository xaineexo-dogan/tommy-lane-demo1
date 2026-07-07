import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getGenre, songsByGenre } from "@/lib/catalog-data";
import { TrackRow } from "@/components/track-row";

export const Route = createFileRoute("/genres/$slug")({
  loader: ({ params }) => {
    const genre = getGenre(params.slug);
    if (!genre) throw notFound();
    return { genre, tracks: songsByGenre(params.slug) };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return { meta: [{ title: "Genre not found" }, { name: "robots", content: "noindex" }] };
    const { genre } = loaderData;
    return {
      meta: [
        { title: `${genre.name} — Tommy Lane Publishing` },
        { name: "description", content: genre.description },
        { property: "og:title", content: `${genre.name} · ${genre.era}` },
        { property: "og:description", content: genre.description },
        { property: "og:url", content: `/genres/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/genres/${params.slug}` }],
    };
  },
  component: GenrePage,
});

function GenrePage() {
  const { genre, tracks } = Route.useLoaderData();
  return (
    <div className="px-6 py-20 max-w-6xl mx-auto">
      <Link to="/genres" className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-60 hover:text-brand-accent">
        ← All genres
      </Link>
      <header className="my-8">
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-40 mb-4">{genre.era}</p>
        <h1 className="font-serif text-5xl md:text-7xl leading-[1] mb-6">{genre.name}</h1>
        <p className="text-lg max-w-2xl opacity-70">{genre.description}</p>
      </header>
      <div>
        {tracks.map((s: any) => <TrackRow key={s.slug} song={s} />)}
      </div>
    </div>
  );
}
