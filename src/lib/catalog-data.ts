export type Genre = {
  slug: string;
  name: string;
  description: string;
  era: string;
};

export type Artist = {
  slug: string;
  name: string;
  bio: string;
  era: string;
  hometown: string;
};

export type Song = {
  slug: string;
  title: string;
  artistSlug: string;
  genreSlug: string;
  year: number;
  mood: string;
  vocal: "Vocal" | "Instrumental";
  duration: string;
  suggestedUses: string[];
  description: string;
};

export const genres: Genre[] = [
  { slug: "blue-eyed-soul", name: "Blue-Eyed Soul", description: "Warm, horn-driven soul with a Memphis heart.", era: "1970s–1980s" },
  { slug: "country-rock", name: "Country Rock", description: "Wide open Americana with pedal steel and grit.", era: "1970s–1990s" },
  { slug: "synth-pop", name: "Synth Pop", description: "Neon-lit analog synths and drum machines.", era: "1980s" },
  { slug: "folk-americana", name: "Folk & Americana", description: "Acoustic storytelling from the heartland.", era: "1980s–2000s" },
  { slug: "cinematic", name: "Cinematic", description: "Instrumental beds built for picture.", era: "1990s–Today" },
  { slug: "classic-rock", name: "Classic Rock", description: "Guitar-forward, radio-ready anthems.", era: "1979–1989" },
  { slug: "gospel-roots", name: "Gospel & Roots", description: "Choir-driven, deeply American.", era: "1980s–2010s" },
  { slug: "jazz-noir", name: "Jazz Noir", description: "Smoky rooms, upright bass, brushed drums.", era: "1990s–Today" },
];

export const artists: Artist[] = [
  { slug: "the-midnight-sessions", name: "The Midnight Sessions", bio: "A Memphis-born five-piece led by longtime Tommy Lane collaborator Ray Estes. Their catalog defined the label's early soul sound.", era: "1972–1988", hometown: "Memphis, TN" },
  { slug: "high-sierra", name: "High Sierra", bio: "Country-rock outfit whose road-worn harmonies and pedal steel became a Tommy Lane staple through the '80s and '90s.", era: "1980–1997", hometown: "Bakersfield, CA" },
  { slug: "neon-horizons", name: "Neon Horizons", bio: "Synth-pop duo blending analog Moogs, DX7s, and Linn drums. A late-catalog favorite for supervisors of period pieces.", era: "1984–1991", hometown: "Nashville, TN" },
  { slug: "june-hollow", name: "June Hollow", bio: "Solo folk artist whose intimate acoustic recordings anchor the Americana wing of the catalog.", era: "1991–2015", hometown: "Asheville, NC" },
  { slug: "the-lane-players", name: "The Lane Players", bio: "In-house instrumental ensemble producing cinematic beds and score-ready cues.", era: "1995–Today", hometown: "Nashville, TN" },
];

export const songs: Song[] = [
  { slug: "ghost-of-beale-street", title: "Ghost of Beale Street", artistSlug: "the-midnight-sessions", genreSlug: "blue-eyed-soul", year: 1974, mood: "Wistful", vocal: "Vocal", duration: "3:42", suggestedUses: ["Period drama", "Documentary", "End credits"], description: "A horn-led soul ballad with a slow-building bridge — a supervisor's shortcut to 1970s Memphis." },
  { slug: "copper-canyon-road", title: "Copper Canyon Road", artistSlug: "high-sierra", genreSlug: "country-rock", year: 1982, mood: "Restless", vocal: "Vocal", duration: "4:15", suggestedUses: ["Road trip montage", "Western trailer", "Truck spot"], description: "Pedal steel, telecaster, and two-part harmony. Cleared for advertising in all territories." },
  { slug: "electric-pulse", title: "Electric Pulse", artistSlug: "neon-horizons", genreSlug: "synth-pop", year: 1986, mood: "Euphoric", vocal: "Vocal", duration: "3:58", suggestedUses: ["1980s flashback", "Tech reveal", "Fashion campaign"], description: "Bright DX7 stabs over a Linn LM-1. Instantly places a scene in 1986." },
  { slug: "hollow-hymn", title: "Hollow Hymn", artistSlug: "june-hollow", genreSlug: "folk-americana", year: 1994, mood: "Tender", vocal: "Vocal", duration: "3:11", suggestedUses: ["Emotional monologue", "Memorial", "Indie film"], description: "Fingerpicked guitar and a single vocal. Deeply usable, endlessly licensable." },
  { slug: "long-shadow-theme", title: "Long Shadow (Theme)", artistSlug: "the-lane-players", genreSlug: "cinematic", year: 2003, mood: "Foreboding", vocal: "Instrumental", duration: "2:44", suggestedUses: ["Cold open", "True crime", "Trailer bed"], description: "Instrumental cue built to underscore dialogue. Full stems available in the portal." },
  { slug: "beale-street-reprise", title: "Beale Street Reprise", artistSlug: "the-midnight-sessions", genreSlug: "blue-eyed-soul", year: 1976, mood: "Reflective", vocal: "Instrumental", duration: "2:58", suggestedUses: ["Montage", "Title sequence"], description: "The instrumental companion to Ghost of Beale Street. Same session, no vocal." },
  { slug: "high-desert-radio", title: "High Desert Radio", artistSlug: "high-sierra", genreSlug: "country-rock", year: 1988, mood: "Nostalgic", vocal: "Vocal", duration: "3:35", suggestedUses: ["Period drama", "Automotive"], description: "AM-radio warmth with a stinging guitar solo." },
  { slug: "after-hours-signal", title: "After Hours Signal", artistSlug: "neon-horizons", genreSlug: "synth-pop", year: 1987, mood: "Nocturnal", vocal: "Instrumental", duration: "4:02", suggestedUses: ["Night driving", "Neo-noir"], description: "Slow, glassy synth bed — perfect for headlights and rain." },
  { slug: "river-carry-me", title: "River, Carry Me", artistSlug: "june-hollow", genreSlug: "gospel-roots", year: 2001, mood: "Uplifting", vocal: "Vocal", duration: "3:47", suggestedUses: ["Documentary", "Faith-based"], description: "Choir-backed roots ballad recorded live in a church in eastern Tennessee." },
  { slug: "smokehouse", title: "Smokehouse", artistSlug: "the-lane-players", genreSlug: "jazz-noir", year: 2011, mood: "Sultry", vocal: "Instrumental", duration: "3:22", suggestedUses: ["Bar scene", "Detective story"], description: "Upright bass, brushed drums, a lonely tenor sax." },
];

export const news = [
  { slug: "sync-placement-2026-drama", title: "Ghost of Beale Street placed in fall drama series", date: "2026-06-04", excerpt: "The Midnight Sessions' 1974 recording anchors the pilot's closing scene." },
  { slug: "portal-launch", title: "Introducing the Tommy Lane Licensing Portal", date: "2026-05-12", excerpt: "Approved supervisors can now access high-resolution masters and stems directly." },
  { slug: "new-cinematic-cues", title: "Fifteen new cinematic cues added to the catalog", date: "2026-04-01", excerpt: "The Lane Players deliver a fresh session of trailer-ready instrumental beds." },
];

export const getArtist = (slug: string) => artists.find((a) => a.slug === slug);
export const getGenre = (slug: string) => genres.find((g) => g.slug === slug);
export const getSong = (slug: string) => songs.find((s) => s.slug === slug);
export const songsByArtist = (slug: string) => songs.filter((s) => s.artistSlug === slug);
export const songsByGenre = (slug: string) => songs.filter((s) => s.genreSlug === slug);
