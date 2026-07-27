import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

type Episode = {
  number: number;
  title: string;
  guest: string;
  date: string;
  duration: string;
  description: string;
};

const episodes: Episode[] = [
  {
    number: 12,
    title: "The Room Where It's Recorded",
    guest: "Emmylou Rae & Session Players",
    date: "2026-07-14",
    duration: "58 min",
    description: "Inside the analog rooms of Music Row — why tape still matters, and how a room's ghosts shape a record.",
  },
  {
    number: 11,
    title: "From Master to Sync",
    guest: "Dana Whitfield, Music Supervisor",
    date: "2026-06-30",
    duration: "1 hr 04 min",
    description: "A supervisor's-eye view of how a needle-drop actually happens, and what independent publishers get right.",
  },
  {
    number: 10,
    title: "Forty Years of Ownership",
    guest: "Tommy Lane",
    date: "2026-06-16",
    duration: "47 min",
    description: "Tommy on holding masters through four decades — the deals turned down, the songs kept, the reasons why.",
  },
  {
    number: 9,
    title: "Outlaw, Still",
    guest: "Cole Ridge",
    date: "2026-06-02",
    duration: "52 min",
    description: "A conversation about outlaw country's second life in streaming and the writers keeping the tradition honest.",
  },
  {
    number: 8,
    title: "The B-Side Economy",
    guest: "Marisol Vance, ASCAP",
    date: "2026-05-19",
    duration: "41 min",
    description: "How catalog B-sides became a quiet revenue engine, and what songwriters should watch in their statements.",
  },
  {
    number: 7,
    title: "Nashville, Rewritten",
    guest: "The Hollow Rangers",
    date: "2026-05-05",
    duration: "1 hr 12 min",
    description: "An hour with the band redefining the Nashville sound for a new generation — no polish, all room tone.",
  },
];

export const Route = createFileRoute("/podcast")({
  head: () => ({
    meta: [
      { title: "The Tommy Lane Podcast — Songwriters, Sessions & Sync" },
      { name: "description", content: "Conversations with the songwriters, players, and supervisors behind four decades of Nashville recordings. New episodes every other Tuesday." },
      { property: "og:title", content: "The Tommy Lane Podcast" },
      { property: "og:description", content: "Conversations with the songwriters, players, and supervisors behind four decades of Nashville recordings." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "The Tommy Lane Podcast" },
      { name: "twitter:description", content: "Songwriters, sessions & sync — from the room where it was recorded." },
    ],
    links: [{ rel: "canonical", href: "/podcast" }],
  }),
  component: PodcastPage,
});

function PodcastPage() {
  const [playing, setPlaying] = useState<number | null>(null);
  const [featured, ...rest] = episodes;

  return (
    <div className="px-6 py-20 max-w-6xl mx-auto">
      {/* Hero */}
      <div className="grid md:grid-cols-[1.2fr_1fr] gap-12 items-end mb-20">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-40 mb-4">The Podcast</p>
          <h1 className="font-serif text-5xl md:text-7xl leading-[0.95] mb-6">
            From the room <br />
            <span className="italic opacity-80">where it was recorded.</span>
          </h1>
          <p className="text-lg opacity-70 leading-relaxed max-w-lg mb-8">
            Conversations with the songwriters, session players, and music supervisors behind four decades of Nashville recordings. New episodes every other Tuesday.
          </p>
          <div className="flex flex-wrap gap-3">
            {["Apple Podcasts", "Spotify", "Overcast", "RSS"].map((p) => (
              <a
                key={p}
                href="#"
                className="px-5 py-2.5 border border-ink/20 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-ink hover:text-paper transition-colors"
              >
                {p}
              </a>
            ))}
          </div>
        </div>
        <div className="aspect-square bg-ink text-paper rounded-sm p-8 flex flex-col justify-between shadow-2xl">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-60">Ep. {featured.number}</span>
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-60">{featured.duration}</span>
          </div>
          <div>
            <p className="font-serif italic text-sm opacity-60 mb-2">Latest episode</p>
            <h2 className="font-serif text-3xl leading-tight mb-3">{featured.title}</h2>
            <p className="text-xs opacity-70 mb-6">with {featured.guest}</p>
            <button
              onClick={() => setPlaying(playing === featured.number ? null : featured.number)}
              className="w-full px-6 py-3 bg-paper text-ink rounded-full text-xs font-bold uppercase tracking-[0.2em] hover:bg-brand-accent hover:text-paper transition-colors flex items-center justify-center gap-3"
            >
              <span className="grid place-items-center size-5 rounded-full bg-ink text-paper text-[10px]">
                {playing === featured.number ? "❚❚" : "▶"}
              </span>
              {playing === featured.number ? "Pause episode" : "Play episode"}
            </button>
          </div>
        </div>
      </div>

      {/* Episode list */}
      <div className="mb-20">
        <div className="flex items-baseline justify-between mb-8 border-b border-border pb-4">
          <h2 className="font-serif text-3xl">All episodes</h2>
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-40">{episodes.length} recorded</span>
        </div>
        <ul className="divide-y divide-border">
          {rest.map((ep) => {
            const isPlaying = playing === ep.number;
            return (
              <li key={ep.number} className="py-6 grid grid-cols-[auto_1fr_auto] gap-6 items-center group">
                <button
                  onClick={() => setPlaying(isPlaying ? null : ep.number)}
                  aria-label={isPlaying ? `Pause episode ${ep.number}` : `Play episode ${ep.number}`}
                  className="size-12 rounded-full border border-ink/20 grid place-items-center text-xs hover:bg-ink hover:text-paper hover:border-ink transition-colors"
                >
                  {isPlaying ? "❚❚" : "▶"}
                </button>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40 mb-1">
                    Ep. {ep.number} · {new Date(ep.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })} · {ep.duration}
                  </div>
                  <h3 className="font-serif text-2xl mb-1 group-hover:text-brand-accent transition-colors">
                    {ep.title}
                  </h3>
                  <p className="text-sm opacity-70 leading-relaxed">
                    <span className="italic">with {ep.guest}</span> — {ep.description}
                  </p>
                </div>
                <span className="hidden md:block text-[10px] font-bold uppercase tracking-[0.2em] opacity-40 group-hover:opacity-100 group-hover:text-brand-accent transition">
                  Listen →
                </span>
              </li>
            );
          })}
        </ul>
      </div>

      {/* CTA */}
      <div className="border-t border-border pt-12 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-40 mb-3">Be a guest</p>
          <h2 className="font-serif text-4xl mb-4">Have a story from the studio?</h2>
          <p className="opacity-70 leading-relaxed">
            We're always looking for songwriters, engineers, and supervisors with something honest to say about how records actually get made — and how they find their second life on screen.
          </p>
        </div>
        <div className="md:justify-self-end">
          <Link
            to="/contact"
            className="inline-block px-8 py-4 bg-ink text-paper text-xs font-bold uppercase tracking-[0.2em] rounded-full hover:bg-brand-accent transition-colors"
          >
            Pitch an episode →
          </Link>
        </div>
      </div>
    </div>
  );
}
