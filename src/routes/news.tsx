import { createFileRoute, Link } from "@tanstack/react-router";
import { news } from "@/lib/catalog-data";

export const Route = createFileRoute("/news")({
  head: () => ({
    meta: [
      { title: "News & Updates — Tommy Lane Publishing" },
      { name: "description", content: "Sync placements, catalog additions, and updates from Tommy Lane Publishing." },
      { property: "og:title", content: "News — Tommy Lane Publishing" },
      { property: "og:url", content: "/news" },
    ],
    links: [{ rel: "canonical", href: "/news" }],
  }),
  component: News,
});

function News() {
  return (
    <div className="px-6 py-20 max-w-4xl mx-auto">
      <p className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-40 mb-4">News & Updates</p>
      <h1 className="font-serif text-5xl md:text-7xl leading-[0.95] mb-12">From the studio.</h1>
      <ul className="divide-y divide-border">
        {news.map((n) => (
          <li key={n.slug} className="py-8">
            <div className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40 mb-2">
              {new Date(n.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </div>
            <h2 className="font-serif italic text-3xl mb-3">{n.title}</h2>
            <p className="opacity-70 leading-relaxed">{n.excerpt}</p>
          </li>
        ))}
      </ul>
      <div className="mt-16">
        <Link to="/contact" className="text-xs font-bold uppercase tracking-[0.2em] border-b border-ink pb-1 hover:text-brand-accent hover:border-brand-accent">
          Get updates by email →
        </Link>
      </div>
    </div>
  );
}
