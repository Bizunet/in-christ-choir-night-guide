import { useState } from "react";
import type { Song } from "@/data/program";

type Props = {
  index: number;
  song: Song;
};

export function SongCard({ index, song }: Props) {
  const [open, setOpen] = useState(false);
  const num = String(index + 1).padStart(2, "0");

  return (
    <article className="paper-card rounded-xl overflow-hidden transition-all">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full text-left px-5 py-5 sm:px-7 sm:py-6 flex items-center gap-5 group"
        aria-expanded={open}
      >
        <span className="font-display text-3xl sm:text-4xl text-gold tabular-nums shrink-0 w-12">
          {num}
        </span>

        <div className="flex-1 min-w-0">
          <h3 className="text-xl sm:text-2xl font-semibold text-foreground leading-tight">
            {song.title}
          </h3>
          <p className="mt-1 text-sm sm:text-base text-muted-foreground">
            <span className="text-primary/80 font-medium">{song.performer}</span>
            {song.role && <span className="text-muted-foreground"> · {song.role}</span>}
          </p>
        </div>

        <span
          className={`shrink-0 w-9 h-9 rounded-full border border-gold/50 flex items-center justify-center text-gold transition-transform duration-300 ${
            open ? "rotate-45 bg-gold/10" : "group-hover:bg-gold/10"
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
          <div className="px-5 sm:px-7 pb-7 pt-1">
            <div className="ornament-divider mb-5">
              <span className="text-xs uppercase tracking-[0.3em] text-gold/80">Lyrics</span>
            </div>
            <pre className="whitespace-pre-wrap font-body text-base sm:text-lg leading-relaxed text-foreground/90">
{song.lyrics}
            </pre>
          </div>
        </div>
      </div>
    </article>
  );
}
