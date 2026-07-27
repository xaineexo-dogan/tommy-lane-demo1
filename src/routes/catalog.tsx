import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { songs, genres, artists } from "@/lib/catalog-data";
import { TrackRow } from "@/components/track-row";

export const Route = createFileRoute("/catalog")({
  head: () => ({
    meta: [
      { title: "Catalog — Tommy Lane Publishing" },
      { name: "description", content: "Browse the full Tommy Lane Publishing catalog. Filter by genre, era, mood, and vocal or instrumental. All recordings professionally recorded with cleared rights." },
      { property: "og:title", content: "The Catalog — Tommy Lane Publishing" },
      { property: "og:url", content: "/catalog" },
    ],
    links: [{ rel: "canonical", href: "/catalog" }],
  }),
  component: Catalog,
});

const vocalOptions = ["All", "Vocal", "Instrumental"] as const;

const extendedGenreGroups: { label: string; options: string[] }[] = [
  {
    label: "Country",
    options: [
      "Traditional country",
      "Nashville sound",
      "Countrypolitan",
      "Country pop",
      "Country rock",
      "Alternative country",
      "Americana",
      "Outlaw country",
      "Honky-tonk",
      "Western swing",
      "Cowboy/Western",
      "Hillbilly",
      "Hillbilly bop",
      "Rockabilly",
      "Bakersfield sound",
    ],
  },
  {
    label: "Bluegrass and folk",
    options: [
      "Bluegrass",
      "Progressive bluegrass",
      "Newgrass",
      "Folk",
      "Folk rock",
      "Roots music",
      "Old-time music",
      "Appalachian music",
    ],
  },
  {
    label: "Gospel and Christian",
    options: [
      "Southern gospel",
      "Black gospel",
      "Contemporary Christian music (CCM)",
      "Christian pop",
      "Christian rock",
      "Worship music",
    ],
  },
  {
    label: "Rock",
    options: [
      "Rock",
      "Southern rock",
      "Indie rock",
      "Alternative rock",
      "Pop rock",
      "Hard rock",
      "Garage rock",
    ],
  },
  {
    label: "Pop",
    options: ["Pop", "Adult contemporary", "Singer-songwriter"],
  },
  {
    label: "Black American music",
    options: ["Blues", "Rhythm and blues (R&B)", "Soul", "Funk", "Jazz"],
  },
  {
    label: "Other Nashville communities",
    options: [
      "Classical",
      "Orchestral",
      "Chamber music",
      "Barbershop harmony",
      "Choral music",
      "Celtic",
      "Irish folk",
      "Cajun",
      "Zydeco",
      "Latin music",
      "Hip hop",
      "Rap",
      "Trap",
      "Electronic",
      "EDM",
      "Lo-fi",
      "Indie pop",
    ],
  },
  {
    label: "Hybrid and niche",
    options: [
      "Cowpunk",
      "Gothic country",
      "Country soul",
      "Country blues",
      "Progressive country",
      "Neo-traditional country",
      "Red Dirt",
      "Heartland rock",
      "Roots rock",
      "Southern soul",
      "Blues rock",
    ],
  },
];

function Catalog() {
  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState<string>("all");
  const [vocal, setVocal] = useState<(typeof vocalOptions)[number]>("All");

  const filtered = useMemo(() => {
    return songs.filter((s) => {
      if (genre !== "all" && s.genreSlug !== genre) return false;
      if (vocal !== "All" && s.vocal !== vocal) return false;
      if (query.trim()) {
        const q = query.toLowerCase();
        const artist = artists.find((a) => a.slug === s.artistSlug);
        const hay = `${s.title} ${artist?.name ?? ""}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [query, genre, vocal]);

  return (
    <div className="px-6 py-20 max-w-7xl mx-auto">
      <p className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-40 mb-4">The Catalog</p>
      <h1 className="font-serif text-5xl md:text-7xl leading-[0.95] mb-6">Every recording, one home.</h1>
      <p className="text-lg max-w-2xl opacity-70 mb-12">
        {songs.length} professionally recorded works, filterable by genre, mood, and use. Full stems and hi-res masters available inside the portal.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_auto_auto] gap-3 mb-8 pb-6 border-b border-border">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by song title or artist…"
          className="px-4 py-3 bg-transparent border border-ink/15 rounded-sm text-sm focus:outline-none focus:border-brand-accent"
        />
        <select
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className="px-4 py-3 bg-transparent border border-ink/15 rounded-sm text-sm focus:outline-none focus:border-brand-accent"
        >
          <option value="all">All genres</option>
          {genres.length > 0 && (
            <optgroup label="Catalog genres">
              {genres.map((g) => (
                <option key={g.slug} value={g.slug}>{g.name}</option>
              ))}
            </optgroup>
          )}
          {extendedGenreGroups.map((group) => (
            <optgroup key={group.label} label={group.label}>
              {group.options.map((name) => (
                <option key={name} value={name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}>
                  {name}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
        <div className="flex border border-ink/15 rounded-sm overflow-hidden text-xs">
          {vocalOptions.map((v) => (
            <button
              key={v}
              onClick={() => setVocal(v)}
              className={`px-4 py-3 font-bold uppercase tracking-widest transition-colors ${vocal === v ? "bg-ink text-paper" : "hover:bg-ink/5"}`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="py-16 text-center opacity-60">No recordings match those filters.</p>
      ) : (
        <div>
          {filtered.map((s) => (
            <TrackRow key={s.slug} song={s} />
          ))}
        </div>
      )}

      <div className="mt-16 text-center">
        <Link to="/contact" className="inline-block px-8 py-4 bg-ink text-paper rounded-full text-xs font-bold uppercase tracking-[0.2em] hover:bg-brand-accent transition-colors">
          Request a custom licensing quote
        </Link>
      </div>
    </div>
  );
}
