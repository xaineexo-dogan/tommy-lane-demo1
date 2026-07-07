import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Tommy Lane Publishing" },
      { name: "description", content: "Four decades of songwriting, recording, and publishing. How Tommy Lane Publishing built a professionally organized catalog of owned master and publishing rights." },
      { property: "og:title", content: "About Tommy Lane Publishing" },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

function About() {
  return (
    <article className="px-6 py-20 max-w-4xl mx-auto">
      <p className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-40 mb-6">About</p>
      <h1 className="font-serif text-5xl md:text-7xl leading-[0.95] mb-10 text-balance">
        The story behind <span className="italic text-brand-accent">the catalog</span>.
      </h1>
      <div className="prose-lg space-y-6 text-lg leading-relaxed opacity-85">
        <p>
          Tommy Lane Publishing was founded in 1979 in Nashville, Tennessee. What began as one songwriter's personal
          archive has grown, over forty-five years, into a professionally recorded catalog spanning soul, country
          rock, synth-pop, gospel, cinematic, and jazz — with clear, single-source ownership of both master and
          publishing rights.
        </p>
        <p>
          Every session in the catalog was recorded in a professional studio by musicians who intended these
          recordings to last. The tapes were archived, the paperwork was filed, and the rights were kept in-house.
          The result is a rare thing: a deep, era-spanning catalog with no split ownership, no missing signatures,
          and no clearance surprises.
        </p>
        <h2 className="font-serif text-3xl italic pt-8">A supervisor's shortcut.</h2>
        <p>
          Because every master and publishing right is owned by a single entity, licensing is direct. There are no
          co-publishers to chase and no orphaned tapes. Approved supervisors and agencies work with us through the
          Licensing Portal, where high-resolution WAV masters and metadata are available for review.
        </p>
        <h2 className="font-serif text-3xl italic pt-8">Built to keep going.</h2>
        <p>
          The catalog continues to grow. New sessions with the Lane Players and long-time collaborators are added
          each year, always with the same standard: professionally recorded, professionally documented, and ready
          for its next life on screen.
        </p>
      </div>

      <ul className="mt-16 grid sm:grid-cols-3 gap-px bg-border border border-border">
        {[
          ["1979", "Founded"],
          ["BMI", "Affiliation"],
          ["100%", "Rights owned"],
        ].map(([k, v]) => (
          <li key={v} className="bg-paper p-8 text-center">
            <div className="font-serif text-4xl text-brand-accent">{k}</div>
            <div className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-60 mt-2">{v}</div>
          </li>
        ))}
      </ul>

      <div className="mt-16 flex flex-wrap gap-4">
        <Link to="/catalog" className="px-8 py-4 bg-ink text-paper rounded-sm text-xs font-bold uppercase tracking-[0.2em] hover:bg-brand-accent transition-colors">
          Explore the catalog
        </Link>
        <Link to="/contact" className="px-8 py-4 border border-ink/20 rounded-sm text-xs font-bold uppercase tracking-[0.2em] hover:bg-ink hover:text-paper transition-colors">
          Contact for licensing
        </Link>
      </div>
    </article>
  );
}
