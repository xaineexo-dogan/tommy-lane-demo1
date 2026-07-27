import { Link } from "@tanstack/react-router";
import { genres } from "@/lib/catalog-data";

const nav = [
  { to: "/catalog", label: "Catalog" },
  { to: "/artists", label: "Artists" },
  { to: "/genres", label: "Genres", hasDropdown: true },
  { to: "/about", label: "About" },
  { to: "/news", label: "News" },
  { to: "/podcast", label: "Podcast" },
  { to: "/portal", label: "The Portal" },
] as const;

const extendedGenreGroups: { label: string; options: string[] }[] = [
  { label: "Country", options: ["Traditional country", "Nashville sound", "Countrypolitan", "Country pop", "Country rock", "Alternative country", "Americana", "Outlaw country", "Honky-tonk", "Western swing", "Cowboy/Western", "Hillbilly", "Rockabilly", "Bakersfield sound"] },
  { label: "Bluegrass & Folk", options: ["Bluegrass", "Progressive bluegrass", "Newgrass", "Folk", "Folk rock", "Roots music", "Old-time music", "Appalachian music"] },
  { label: "Gospel & Christian", options: ["Southern gospel", "Black gospel", "CCM", "Christian pop", "Christian rock", "Worship music"] },
  { label: "Rock", options: ["Rock", "Southern rock", "Indie rock", "Alternative rock", "Pop rock", "Hard rock", "Garage rock"] },
  { label: "Pop", options: ["Pop", "Adult contemporary", "Singer-songwriter"] },
  { label: "Black American", options: ["Blues", "R&B", "Soul", "Funk", "Jazz"] },
  { label: "Other Communities", options: ["Classical", "Orchestral", "Chamber music", "Barbershop harmony", "Choral music", "Celtic", "Irish folk", "Cajun", "Zydeco", "Latin music", "Hip hop", "Rap", "Trap", "Electronic", "EDM", "Lo-fi", "Indie pop"] },
  { label: "Hybrid & Niche", options: ["Cowpunk", "Gothic country", "Country soul", "Country blues", "Progressive country", "Neo-traditional country", "Red Dirt", "Heartland rock", "Roots rock", "Southern soul", "Blues rock"] },
];

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function SiteHeader() {
  return (
    <nav className="sticky top-0 z-50 bg-paper/85 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-6">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="size-8 bg-ink rounded-full grid place-items-center text-paper font-serif italic text-xl">
            T
          </div>
          <span className="font-serif text-lg tracking-tight font-bold uppercase">
            Tommy Lane <span className="font-light opacity-60 italic normal-case">Publishing</span>
          </span>
        </Link>
        <div className="hidden lg:flex items-center gap-8 text-xs font-semibold uppercase tracking-[0.2em] opacity-70">
          {nav.map((n) =>
            "hasDropdown" in n && n.hasDropdown ? (
              <div key={n.to} className="relative group py-6 -my-6">
                <Link
                  to={n.to}
                  activeProps={{ className: "text-brand-accent opacity-100" }}
                  className="hover:text-brand-accent transition-colors"
                >
                  {n.label}
                </Link>
                {/* Hover bridge + dropdown */}
                <div className="invisible opacity-0 translate-y-1 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 absolute left-1/2 -translate-x-1/2 top-full pt-3 z-50">
                  <div className="w-[720px] max-w-[92vw] bg-paper border border-ink/15 rounded-sm shadow-2xl p-6 grid grid-cols-3 gap-x-6 gap-y-4 normal-case tracking-normal font-normal text-[13px]">
                    {genres.length > 0 && (
                      <div>
                        <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-accent mb-2">Featured</div>
                        <ul className="space-y-1.5">
                          {genres.slice(0, 6).map((g) => (
                            <li key={g.slug}>
                              <Link to="/genres/$slug" params={{ slug: g.slug }} className="hover:text-brand-accent transition-colors">
                                {g.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {extendedGenreGroups.map((group) => (
                      <div key={group.label}>
                        <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-ink/60 mb-2">{group.label}</div>
                        <ul className="space-y-1.5">
                          {group.options.slice(0, 6).map((opt) => (
                            <li key={opt}>
                              <Link
                                to="/catalog"
                                search={{ genre: slugify(opt) } as never}
                                className="opacity-80 hover:opacity-100 hover:text-brand-accent transition-colors"
                              >
                                {opt}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={n.to}
                to={n.to}
                activeProps={{ className: "text-brand-accent opacity-100" }}
                className="hover:text-brand-accent transition-colors"
              >
                {n.label}
              </Link>
            )
          )}
        </div>
        <Link
          to="/contact"
          className="px-5 py-2.5 bg-ink text-paper text-[10px] font-bold uppercase tracking-[0.2em] rounded-full hover:bg-brand-accent transition-colors shrink-0"
        >
          Licensing Inquiry
        </Link>
      </div>
    </nav>
  );
}
