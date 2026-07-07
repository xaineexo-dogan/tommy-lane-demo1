import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { songs } from "@/lib/catalog-data";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Licensing Inquiries — Tommy Lane Publishing" },
      { name: "description", content: "Contact Tommy Lane Publishing for sync licensing inquiries, quotes, and catalog access. Response within two business days." },
      { property: "og:title", content: "Contact — Tommy Lane Publishing" },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  company: z.string().trim().min(1, "Company is required").max(120),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z.string().trim().max(40).optional(),
  projectType: z.string().trim().min(1, "Select a project type").max(80),
  songSlug: z.string().trim().max(120).optional(),
  timeline: z.string().trim().max(80).optional(),
  details: z.string().trim().min(10, "Please share a few sentences").max(2000),
});

const projectTypes = ["Film", "Television", "Advertising", "Trailer / Promo", "Documentary", "Video Game", "Digital / Social", "Other"];

function Contact() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const data = Object.fromEntries(form.entries());
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        fieldErrors[issue.path.join(".")] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setSubmitted(true);
  };

  return (
    <div className="px-6 py-20 max-w-6xl mx-auto">
      <p className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-40 mb-4">Contact</p>
      <h1 className="font-serif text-5xl md:text-7xl leading-[0.95] mb-8">
        Start a <span className="italic text-brand-accent">licensing conversation</span>.
      </h1>
      <p className="text-lg max-w-2xl opacity-70 mb-16">
        Tell us about your project. We respond to every inquiry within two business days.
      </p>

      <div className="grid md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] gap-12">
        {submitted ? (
          <div className="bg-ink text-paper p-12 rounded-2xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-accent mb-4">Received</p>
            <h2 className="font-serif italic text-4xl mb-4">Thank you.</h2>
            <p className="opacity-70">Your inquiry has been sent. A member of the Tommy Lane team will reach out within two business days.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Field label="Name" name="name" required error={errors.name} />
              <Field label="Company" name="company" required error={errors.company} />
              <Field label="Email" name="email" type="email" required error={errors.email} />
              <Field label="Phone (optional)" name="phone" type="tel" error={errors.phone} />
            </div>
            <SelectField label="Project type" name="projectType" required options={projectTypes} error={errors.projectType} />
            <SelectField
              label="Song of interest (optional)"
              name="songSlug"
              options={["", ...songs.map((s) => s.title)]}
              error={errors.songSlug}
            />
            <Field label="Expected production timeline (optional)" name="timeline" placeholder="e.g. Q3 2026" error={errors.timeline} />
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-[0.2em] opacity-60 mb-2">Project details</label>
              <textarea
                name="details"
                required
                rows={5}
                className="w-full px-4 py-3 bg-transparent border border-ink/15 rounded-sm text-sm focus:outline-none focus:border-brand-accent"
              />
              {errors.details && <p className="text-xs text-destructive mt-1">{errors.details}</p>}
            </div>
            <button className="px-8 py-4 bg-ink text-paper rounded-sm text-xs font-bold uppercase tracking-[0.2em] hover:bg-brand-accent transition-colors">
              Send inquiry
            </button>
          </form>
        )}

        <aside className="space-y-8">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-50 mb-2">Direct email</div>
            <a href="mailto:licensing@tommylanepublishing.com" className="font-serif italic text-xl hover:text-brand-accent">
              licensing@tommylanepublishing.com
            </a>
          </div>
          <div>
            <div className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-50 mb-2">Phone</div>
            <a href="tel:+16155550142" className="font-serif italic text-xl hover:text-brand-accent">
              (615) 555-0142
            </a>
          </div>
          <div>
            <div className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-50 mb-2">Office</div>
            <p className="text-sm opacity-80 leading-relaxed">
              Tommy Lane Publishing LLC<br />
              Nashville, Tennessee
            </p>
          </div>
          <div>
            <div className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-50 mb-2">Response time</div>
            <p className="text-sm opacity-80">Within two business days.</p>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Field({ label, error, ...props }: { label: string; error?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="block text-[10px] font-bold uppercase tracking-[0.2em] opacity-60 mb-2">{label}</label>
      <input
        {...props}
        className="w-full px-4 py-3 bg-transparent border border-ink/15 rounded-sm text-sm focus:outline-none focus:border-brand-accent"
      />
      {error && <p className="text-xs text-destructive mt-1">{error}</p>}
    </div>
  );
}

function SelectField({ label, options, error, ...props }: { label: string; options: string[]; error?: string } & React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div>
      <label className="block text-[10px] font-bold uppercase tracking-[0.2em] opacity-60 mb-2">{label}</label>
      <select
        {...props}
        className="w-full px-4 py-3 bg-transparent border border-ink/15 rounded-sm text-sm focus:outline-none focus:border-brand-accent"
      >
        {options.map((o) => (
          <option key={o} value={o}>{o || "—"}</option>
        ))}
      </select>
      {error && <p className="text-xs text-destructive mt-1">{error}</p>}
    </div>
  );
}
