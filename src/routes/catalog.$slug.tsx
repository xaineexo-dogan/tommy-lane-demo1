import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getSong, getArtist, getGenre, songsByArtist } from "@/lib/catalog-data";
import { TrackRow } from "@/components/track-row";

export const Route = createFileRoute("/catalog/$slug")({
  loader: ({ params }) => {
    const song = getSong(params.slug);
    if (!song) throw notFound();
    return { song };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return { meta: [{ title: "Recording not found" }, { name: "robots", content: "noindex" }] };
    }
    const { song } = loaderData;
    const artist = getArtist(song.artistSlug);
    return {
      meta: [
        { title: `${song.title} — ${artist?.name} · Tommy Lane Publishing` },
        { name: "description", content: song.description },
        { property: "og:title", content: `${song.title} — ${artist?.name}` },
        { property: "og:description", content: song.description },
        { property: "og:type", content: "music.song" },
        { property: "og:url", content: `/catalog/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/catalog/${params.slug}` }],
    };
  },
  component: SongPage,
});

function SongPage() {
  const { song } = Route.useLoaderData();
  const artist = getArtist(song.artistSlug);
  const genre = getGenre(song.genreSlug);
  const related = songsByArtist(song.artistSlug).filter((s) => s.slug !== song.slug);

  return (
    <div className="px-6 py-20 max-w-6xl mx-auto">
      <Link to="/catalog" className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-60 hover:text-brand-accent">
        ← Back to catalog
      </Link>

      <div className="grid lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-12 mt-8">
        <div className="aspect-square rounded-2xl bg-gradient-to-br from-brand-accent/20 via-stone-200 to-ink/20 outline-1 -outline-offset-1 outline-ink/5 grid place-items-center">
          <div className="text-center px-6">
            <div className="font-serif italic text-4xl mb-2">{song.title}</div>
            <div className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-60">{song.year}</div>
          </div>
        </div>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-40 mb-4">
            {genre?.name} · {song.year} · {song.duration}
          </p>
          <h1 className="font-serif text-5xl md:text-6xl leading-[1] mb-4">{song.title}</h1>
          <Link to="/artists/$slug" params={{ slug: song.artistSlug }} className="text-lg italic font-serif opacity-70 hover:text-brand-accent">
            by {artist?.name}
          </Link>
          <p className="mt-8 text-lg leading-relaxed opacity-85">{song.description}</p>

          <dl className="mt-8 grid grid-cols-2 gap-6 py-6 border-y border-border text-sm">
            <div>
              <dt className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-50">Mood</dt>
              <dd className="mt-1">{song.mood}</dd>
            </div>
            <div>
              <dt className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-50">Type</dt>
              <dd className="mt-1">{song.vocal}</dd>
            </div>
            <div className="col-span-2">
              <dt className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-50">Suggested uses</dt>
              <dd className="mt-2 flex flex-wrap gap-2">
                {song.suggestedUses.map((u) => (
                  <span key={u} className="px-3 py-1 bg-ink/5 text-xs rounded-full">{u}</span>
                ))}
              </dd>
            </div>
          </dl>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/contact" className="px-8 py-4 bg-ink text-paper rounded-sm text-xs font-bold uppercase tracking-[0.2em] hover:bg-brand-accent transition-colors">
              License this recording
            </Link>
            <Link to="/portal" className="px-8 py-4 border border-ink/20 rounded-sm text-xs font-bold uppercase tracking-[0.2em] hover:bg-ink hover:text-paper transition-colors">
              Access hi-res master
            </Link>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-24">
          <h2 className="font-serif text-3xl italic mb-6">More from {artist?.name}</h2>
          <div>
            {related.map((s) => <TrackRow key={s.slug} song={s} />)}
          </div>
        </section>
      )}
    </div>
  );
}
