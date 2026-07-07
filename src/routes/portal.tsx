import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/portal")({
  head: () => ({
    meta: [
      { title: "Licensing Portal — Tommy Lane Publishing" },
      { name: "description", content: "Secure portal for approved music supervisors, agencies, and production companies. Request access or sign in to download hi-res masters." },
      { property: "og:title", content: "The Licensing Portal" },
      { property: "og:url", content: "/portal" },
    ],
    links: [{ rel: "canonical", href: "/portal" }],
  }),
  component: Portal,
});

function Portal() {
  const [mode, setMode] = useState<"login" | "request">("login");
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="px-6 py-20 max-w-5xl mx-auto">
      <p className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-40 mb-4">The Portal</p>
      <h1 className="font-serif text-5xl md:text-7xl leading-[0.95] mb-6">
        For approved <span className="italic text-brand-accent">supervisors</span>.
      </h1>
      <p className="text-lg max-w-2xl opacity-70 mb-12">
        The portal gives credentialed licensing professionals access to hi-res WAV masters, stems, metadata, and publishing documentation across the full catalog.
      </p>

      <div className="grid md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-12">
        <ul className="space-y-6 text-sm">
          {[
            ["High-resolution masters", "24-bit WAV downloads for every recording."],
            ["Stems & instrumentals", "Vocal-up, vocal-down, and full stem beds on request."],
            ["Full metadata", "ISRC, BMI work numbers, writer splits, tempo, and key."],
            ["Direct support", "One point of contact for clearance, quotes, and cue sheets."],
          ].map(([t, d]) => (
            <li key={t}>
              <div className="text-sm font-bold">{t}</div>
              <div className="opacity-60 mt-1">{d}</div>
            </li>
          ))}
        </ul>

        <div className="bg-ink text-paper rounded-2xl p-8 md:p-10">
          <div className="flex gap-2 mb-8 text-[10px] font-bold uppercase tracking-[0.2em]">
            <button
              onClick={() => { setMode("login"); setSubmitted(false); }}
              className={`px-4 py-2 rounded-full transition-colors ${mode === "login" ? "bg-brand-accent text-paper" : "border border-paper/20 hover:bg-paper/10"}`}
            >
              Sign in
            </button>
            <button
              onClick={() => { setMode("request"); setSubmitted(false); }}
              className={`px-4 py-2 rounded-full transition-colors ${mode === "request" ? "bg-brand-accent text-paper" : "border border-paper/20 hover:bg-paper/10"}`}
            >
              Request access
            </button>
          </div>

          {submitted ? (
            <div className="py-12 text-center">
              <div className="font-serif italic text-3xl mb-3 text-brand-accent">Thank you.</div>
              <p className="opacity-70">
                {mode === "login"
                  ? "For a live portal, we'd verify your credentials here."
                  : "Your request has been received. We'll review and respond within two business days."}
              </p>
            </div>
          ) : (
            <form
              onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
              className="space-y-4"
            >
              {mode === "login" ? (
                <>
                  <PortalField label="Email" name="email" type="email" required />
                  <PortalField label="Password" name="password" type="password" required />
                  <button className="w-full py-4 bg-brand-accent text-paper text-xs font-bold uppercase tracking-[0.2em] rounded-full hover:bg-paper hover:text-ink transition-colors">
                    Sign in
                  </button>
                </>
              ) : (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <PortalField label="Name" name="name" required />
                    <PortalField label="Company" name="company" required />
                  </div>
                  <PortalField label="Work email" name="email" type="email" required />
                  <PortalField label="Role" name="role" placeholder="Music supervisor, agency, etc." />
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-[0.2em] opacity-60 mb-2">Project or catalog interest</label>
                    <textarea
                      required
                      rows={3}
                      className="w-full px-4 py-3 bg-paper/5 border border-paper/15 rounded-sm text-sm focus:outline-none focus:border-brand-accent"
                    />
                  </div>
                  <button className="w-full py-4 bg-brand-accent text-paper text-xs font-bold uppercase tracking-[0.2em] rounded-full hover:bg-paper hover:text-ink transition-colors">
                    Request access
                  </button>
                </>
              )}
            </form>
          )}
        </div>
      </div>

      <p className="mt-16 text-sm opacity-60">
        Not sure where to start? <Link to="/contact" className="underline hover:text-brand-accent">Send us a licensing inquiry</Link> and we'll follow up directly.
      </p>
    </div>
  );
}

function PortalField({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="block text-[10px] font-bold uppercase tracking-[0.2em] opacity-60 mb-2">{label}</label>
      <input
        {...props}
        className="w-full px-4 py-3 bg-paper/5 border border-paper/15 rounded-sm text-sm focus:outline-none focus:border-brand-accent"
      />
    </div>
  );
}
