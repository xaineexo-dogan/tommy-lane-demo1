import { Link } from "@tanstack/react-router";
import { useState } from "react";
import type { Song } from "@/lib/catalog-data";
import { getArtist, getGenre } from "@/lib/catalog-data";

export function TrackRow({ song }: { song: Song }) {
  const [playing, setPlaying] = useState(false);
  const artist = getArtist(song.artistSlug);
  const genre = getGenre(song.genreSlug);
  return (
    <div className="group grid grid-cols-[auto_minmax(0,1fr)_auto] md:grid-cols-[auto_minmax(0,3fr)_minmax(0,2fr)_auto_auto] items-center gap-4 md:gap-6 py-4 border-b border-border">
      <button
        type="button"
        onClick={() => setPlaying((p) => !p)}
        aria-label={playing ? `Pause ${song.title}` : `Play ${song.title}`}
        className="size-11 rounded-full border border-ink/20 grid place-items-center hover:bg-ink hover:text-paper transition-colors shrink-0"
      >
        {playing ? (
          <div className="flex gap-[3px]">
            <span className="w-[3px] h-3 bg-current" />
            <span className="w-[3px] h-3 bg-current" />
          </div>
        ) : (
          <div className="w-0 h-0 border-y-[6px] border-y-transparent border-l-[9px] border-l-current ml-[2px]" />
        )}
      </button>
      <div className="min-w-0">
        <Link to="/catalog/$slug" params={{ slug: song.slug }} className="font-serif italic text-lg truncate block hover:text-brand-accent">
          {song.title}
        </Link>
        <Link to="/artists/$slug" params={{ slug: song.artistSlug }} className="text-xs font-bold uppercase tracking-widest opacity-50 hover:text-brand-accent truncate block">
          {artist?.name}
        </Link>
      </div>
      <div className="hidden md:flex flex-col text-xs uppercase tracking-widest opacity-60">
        <Link to="/genres/$slug" params={{ slug: song.genreSlug }} className="hover:text-brand-accent">
          {genre?.name}
        </Link>
        <span className="opacity-60">{song.year} · {song.mood}</span>
      </div>
      <span className="hidden md:inline text-xs font-mono opacity-40 tabular-nums">{song.duration}</span>
      <Link
        to="/contact"
        className="text-[10px] font-bold uppercase tracking-[0.2em] px-4 py-2 rounded-full border border-ink/15 hover:bg-ink hover:text-paper transition-colors shrink-0"
      >
        License
      </Link>
    </div>
  );
}
