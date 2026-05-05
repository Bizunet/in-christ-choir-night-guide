import { createFileRoute } from "@tanstack/react-router";
import logo from "@/assets/logo.png";
import { program } from "@/data/program";
import { SongCard } from "@/components/SongCard";

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

function Index() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative px-5 pt-14 pb-20 sm:pt-20 sm:pb-28 text-center max-w-5xl mx-auto">
        <p className="font-display tracking-[0.5em] text-xs sm:text-sm text-gold uppercase mb-6">
          A Choir Night of Worship
        </p>

        <img
          src={logo}
          alt="በክርስቶስ — In Christ"
          className="mx-auto w-[min(560px,85%)] h-auto select-none drop-shadow-[0_20px_40px_rgba(74,14,14,0.25)]"
        />

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

        <a
          href="#program"
          className="inline-flex items-center gap-2 mt-10 px-7 py-3 rounded-full bg-primary text-primary-foreground font-medium shadow-lg shadow-primary/30 hover:bg-primary/90 transition-all hover:-translate-y-0.5"
        >
          View the Program
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12l7 7 7-7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
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
