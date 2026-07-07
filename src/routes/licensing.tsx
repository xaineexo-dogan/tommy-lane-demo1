import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/licensing")({
  head: () => ({
    meta: [
      { title: "Licensing — Tommy Lane Publishing" },
      { name: "description", content: "How to license music from the Tommy Lane Publishing catalog for film, television, advertising, and digital media." },
      { property: "og:title", content: "Licensing" },
      { property: "og:url", content: "/licensing" },
    ],
    links: [{ rel: "canonical", href: "/licensing" }],
  }),
  component: Licensing,
});

const steps = [
  { n: "01", t: "Browse", d: "Explore the public catalog and shortlist recordings that fit your project." },
  { n: "02", t: "Inquire", d: "Submit a licensing inquiry with your project type, timeline, and territory." },
  { n: "03", t: "Portal Access", d: "Approved supervisors receive credentials to download hi-res masters, stems, and metadata." },
  { n: "04", t: "Clear", d: "Because we own both master and publishing, clearance is one signature — not two." },
];

function Licensing() {
  return (
    <div className="px-6 py-20 max-w-6xl mx-auto">
      <p className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-40 mb-4">Licensing</p>
      <h1 className="font-serif text-5xl md:text-7xl leading-[0.95] mb-8 text-balance">
        One-stop clearance. <span className="italic text-brand-accent">Zero friction.</span>
      </h1>
      <p className="text-xl max-w-3xl opacity-70 mb-16 leading-relaxed">
        Tommy Lane Publishing owns 100% of master and publishing rights across the catalog. That means one signature, one invoice, and one point of contact — for supervisors, agencies, and production companies worldwide.
      </p>

      <ol className="grid md:grid-cols-2 gap-px bg-border border border-border mb-20">
        {steps.map((s) => (
          <li key={s.n} className="bg-paper p-10">
            <div className="font-serif text-6xl text-brand-accent mb-4">{s.n}</div>
            <h3 className="font-serif text-2xl italic mb-2">{s.t}</h3>
            <p className="opacity-70">{s.d}</p>
          </li>
        ))}
      </ol>

      <div className="grid md:grid-cols-2 gap-12 mb-20">
        <div>
          <h2 className="font-serif text-3xl italic mb-4">Available for</h2>
          <ul className="space-y-2 opacity-80">
            {["Film & television", "Advertising & commercials", "Streaming & digital media", "Trailers & promos", "Documentary & unscripted", "Video games"].map((x) => (
              <li key={x} className="flex items-center gap-3">
                <span className="size-1.5 bg-brand-accent rounded-full" /> {x}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-serif text-3xl italic mb-4">Rights & clearance</h2>
          <ul className="space-y-2 opacity-80">
            <li className="flex items-center gap-3"><span className="size-1.5 bg-brand-accent rounded-full" /> 100% owned master rights</li>
            <li className="flex items-center gap-3"><span className="size-1.5 bg-brand-accent rounded-full" /> 100% owned publishing</li>
            <li className="flex items-center gap-3"><span className="size-1.5 bg-brand-accent rounded-full" /> BMI affiliated publisher</li>
            <li className="flex items-center gap-3"><span className="size-1.5 bg-brand-accent rounded-full" /> Worldwide territory available</li>
            <li className="flex items-center gap-3"><span className="size-1.5 bg-brand-accent rounded-full" /> Stems & instrumentals on request</li>
          </ul>
        </div>
      </div>

      <div className="flex flex-wrap gap-4">
        <Link to="/contact" className="px-8 py-4 bg-ink text-paper rounded-sm text-xs font-bold uppercase tracking-[0.2em] hover:bg-brand-accent transition-colors">
          Submit a licensing inquiry
        </Link>
        <Link to="/portal" className="px-8 py-4 border border-ink/20 rounded-sm text-xs font-bold uppercase tracking-[0.2em] hover:bg-ink hover:text-paper transition-colors">
          Enter the portal
        </Link>
      </div>
    </div>
  );
}
