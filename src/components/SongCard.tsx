import { useEffect, useRef, useState } from "react";
import type { Song } from "@/data/program";

type Props = {
  index: number;
  song: Song;
};

export function slugifySong(title: string) {
  return `song-${title.replace(/\s+/g, "-").replace(/[^\p{L}\p{N}-]/gu, "")}`;
}

export function SongCard({ index, song }: Props) {
  const [open, setOpen] = useState(false);
  const num = String(index + 1).padStart(2, "0");
  const id = slugifySong(song.title);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<string>).detail;
      if (detail === id) {
        setOpen(true);
        setTimeout(() => {
          ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 50);
      }
    };
    window.addEventListener("open-song", handler);
    return () => window.removeEventListener("open-song", handler);
  }, [id]);

  return (
    <article
      ref={ref}
      id={id}
      className={`paper-card rounded-2xl overflow-hidden scroll-mt-20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/10 ${
        open ? "ring-1 ring-gold/40 shadow-lg shadow-primary/10" : ""
      }`}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full text-left px-4 py-4 sm:px-7 sm:py-6 flex items-center gap-3 sm:gap-5 group"
        aria-expanded={open}
      >
        <span className="font-display text-2xl sm:text-4xl text-gold tabular-nums shrink-0 w-9 sm:w-12">
          {num}
        </span>

        <div className="flex-1 min-w-0">
          <h3 className="text-lg sm:text-2xl font-semibold text-foreground leading-tight break-words">
            {song.title}
          </h3>
          <p className="mt-1 text-xs sm:text-base text-muted-foreground">
            <span className="text-primary/80 font-medium">{song.performer}</span>
            {song.role && <span className="text-muted-foreground"> · {song.role}</span>}
          </p>
        </div>

        <span
          className={`shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-gold/50 flex items-center justify-center text-gold transition-all duration-300 ${
            open ? "rotate-45 bg-gold/15 scale-110" : "group-hover:bg-gold/10 group-hover:scale-105"
          }`}
          aria-hidden
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12h14" strokeLinecap="round" />
          </svg>
        </span>
      </button>

      <div
        className={`grid transition-[grid-template-rows] duration-500 ease-out ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-4 sm:px-7 pb-6 sm:pb-7 pt-1">
            <div className="ornament-divider mb-4 sm:mb-5">
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-gold/80">Lyrics</span>
            </div>
            <pre className="whitespace-pre-wrap font-body text-sm sm:text-lg leading-relaxed text-foreground/90">
{song.lyrics}
            </pre>
            <div className="mt-6 flex justify-center">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex items-center gap-2 text-xs sm:text-sm uppercase tracking-[0.3em] text-gold/90 hover:text-gold transition-colors"
              >
                <span aria-hidden>▲</span> Hide lyrics
              </button>
            </div>
          </div>
        </div>
      </div>

      {!open && (
        <div className="px-4 sm:px-7 pb-4 -mt-2">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="w-full text-center text-xs sm:text-sm uppercase tracking-[0.3em] text-gold/80 hover:text-gold transition-colors py-1"
          >
            View lyrics ▾
          </button>
        </div>
      )}
    </article>
  );
}
