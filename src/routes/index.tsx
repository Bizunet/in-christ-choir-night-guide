import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import logo from "@/assets/bekrstos.png";
import { program, type Song } from "@/data/program";
import { SongCard, slugifySong } from "@/components/SongCard";
import { ThemeToggle } from "@/components/ThemeToggle";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "በክርስቶስ · A Night of Worship" },
      {
        name: "description",
        content:
          "የምሽቱ የመዝሙር ፕሮግራም — sessions, songs, performers and lyrics for the በክርስቶስ choir night.",
      },
      { property: "og:title", content: "በክርስቶስ · A Night of Worship" },
      {
        property: "og:description",
        content: "Follow the program, performers and lyrics throughout the evening.",
      },
    ],
    links: [
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Noto+Serif+Ethiopic:wght@400;500;600;700&display=swap",
      },
    ],
  }),
  component: Index,
});

function Moment({ time, title, description }: { time?: string; title: string; description?: string }) {
  return (
    <div className="my-12 sm:my-16 text-center">
      <div className="ornament-divider mb-6">
        <span className="text-gold text-lg">✦</span>
      </div>
      {time && (
        <p className="font-display text-gold text-sm tracking-[0.4em] uppercase mb-2">
          {time}
        </p>
      )}
      <h3 className="font-display text-2xl sm:text-3xl text-primary italic">{title}</h3>
      {description && (
        <p className="mt-2 text-muted-foreground text-sm sm:text-base max-w-md mx-auto">
          {description}
        </p>
      )}
      <div className="ornament-divider mt-6">
        <span className="text-gold text-lg">✦</span>
      </div>
    </div>
  );
}

type SongMatch = { song: Song; sessionNumber: number; sessionTitle: string };

function Index() {
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);

  const matches = useMemo<SongMatch[]>(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    const results: SongMatch[] = [];
    for (const item of program) {
      if (item.kind !== "session") continue;
      for (const song of item.songs) {
        const haystack = `${song.title} ${song.performer} ${song.lyrics}`.toLowerCase();
        if (haystack.includes(q)) {
          results.push({ song, sessionNumber: item.number, sessionTitle: item.title });
        }
      }
    }
    return results;
  }, [query]);

  return (
    <main className="min-h-screen">
      {/* Floating controls */}
      <div className="fixed top-4 right-4 z-40 flex items-center gap-2">
        <button
          type="button"
          onClick={() => setSearchOpen((o) => !o)}
          aria-label="Search lyrics"
          title="Search lyrics"
          className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-gold/50 bg-card/70 backdrop-blur text-gold hover:bg-gold/10 transition-colors shadow-md"
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="7" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </button>
        <ThemeToggle />
      </div>

      {/* Search overlay */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-start justify-center pt-20 px-4"
          onClick={() => setSearchOpen(false)}
        >
          <div
            className="w-full max-w-2xl paper-card rounded-2xl p-5 sm:p-7"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-gold/30 pb-3">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-gold shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="7" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              <input
                autoFocus
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="የመዝሙር ቃላት ፈልግ · Search title, singer, or lyrics…"
                className="flex-1 bg-transparent outline-none text-base sm:text-lg text-foreground placeholder:text-muted-foreground"
              />
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="text-muted-foreground hover:text-foreground text-sm"
                aria-label="Close search"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 max-h-[60vh] overflow-y-auto space-y-3">
              {!query.trim() && (
                <p className="text-sm text-muted-foreground italic px-1 py-6 text-center">
                  Type a word from a song title, performer, or lyric line.
                </p>
              )}
              {query.trim() && matches.length === 0 && (
                <p className="text-sm text-muted-foreground italic px-1 py-6 text-center">
                  No matching songs found.
                </p>
              )}
              {matches.map((m, i) => (
                <div key={i} className="rounded-lg border border-gold/20 px-4 py-3 bg-background/50">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-gold/80">
                    Session {m.sessionNumber} · {m.sessionTitle}
                  </p>
                  <h4 className="font-display text-xl text-primary mt-1">{m.song.title}</h4>
                  <p className="text-xs text-muted-foreground">{m.song.performer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Hero */}
      <section className="relative px-5 pt-14 pb-20 sm:pt-20 sm:pb-28 text-center max-w-5xl mx-auto">
        <p className="font-display tracking-[0.5em] text-xs sm:text-sm text-gold uppercase mb-6">
          A Choir Night of Worship
        </p>

        <div className="mx-auto w-[min(320px,75%)] aspect-square rounded-full overflow-hidden border-4 border-gold/70 shadow-[0_25px_60px_-15px_rgba(74,14,14,0.55)] ring-8 ring-gold/10">
          <img
            src={logo}
            alt="በክርስቶስ — In Christ"
            className="w-full h-full object-cover select-none"
          />
        </div>

        <p className="mt-8 font-display italic text-xl sm:text-2xl text-primary/80 text-balance">
          “In Christ alone our hope is found.”
        </p>

        <div className="mt-10 ornament-divider max-w-md mx-auto">
          <span className="text-gold text-xl">✦</span>
        </div>

        <p className="mt-10 text-base sm:text-lg text-muted-foreground max-w-xl mx-auto text-pretty">
          Welcome to tonight's worship gathering. Tap any song to follow along with the lyrics
          and meet the voice leading us into His presence.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#program"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-primary text-primary-foreground font-medium shadow-lg shadow-primary/30 hover:bg-primary/90 transition-all hover:-translate-y-0.5"
          >
            View the Program
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M5 12l7 7 7-7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full border border-gold/60 text-foreground font-medium hover:bg-gold/10 transition-all"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="7" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            Search Lyrics
          </button>
        </div>
      </section>

      {/* Program */}
      <section id="program" className="px-5 pb-24 max-w-3xl mx-auto">
        {program.map((item, i) => {
          if (item.kind === "moment") {
            return <Moment key={i} time={item.time} title={item.title} description={item.description} />;
          }

          return (
            <div key={i} className="my-10 sm:my-14">
              <header className="text-center mb-8">
                <p className="font-display text-gold tracking-[0.4em] uppercase text-xs sm:text-sm">
                  Session {item.number}
                </p>
                <h2 className="font-display text-4xl sm:text-5xl text-primary mt-2">
                  {item.title}
                </h2>
              </header>

              <div className="space-y-4">
                {item.songs.map((song, idx) => (
                  <SongCard key={song.title} index={idx} song={song} />
                ))}
              </div>
            </div>
          );
        })}
      </section>

      {/* Footer */}
      <footer className="px-5 py-12 text-center border-t border-gold/30">
        <p className="font-display italic text-primary text-lg">በክርስቶስ</p>
        <p className="mt-2 text-xs tracking-[0.3em] uppercase text-muted-foreground">
          To God be the glory
        </p>
      </footer>
    </main>
  );
}
