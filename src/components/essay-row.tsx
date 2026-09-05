import { Link } from "@tanstack/react-router";
import { Eye } from "lucide-react";
import type { Essay } from "@/lib/essays";
import { formatBytes, formatDate } from "@/lib/essays";
import { SaveButton } from "./save-button";

export function mediaLine(e: Essay): string {
  const stills = `${e.photos} photo${e.photos === 1 ? "" : "s"}`;
  const clips = e.videos ? `, ${e.videos} video${e.videos === 1 ? "" : "s"}` : "";
  return `${stills}${clips} – ${formatBytes(e.sizeMb)}`;
}

export function EssayCard({ essay }: { essay: Essay }) {
  return (
    <article className="min-w-0">
      <Link to="/essay/$slug" params={{ slug: essay.slug }} className="group block">
        <div className="relative overflow-hidden rounded-md shadow-[var(--shadow-card)]">
          <img
            src={essay.cover}
            alt=""
            className="aspect-[4/3] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
          />
        </div>
      </Link>
      <div className="mt-3 flex items-center gap-3 text-xs text-muted">
        <time dateTime={essay.postedAt}>{formatDate(essay.postedAt)}</time>
        <span className="ml-auto inline-flex items-center gap-1">
          <Eye className="size-3.5" />
          <span className="tabular-nums">{essay.saves}</span>
        </span>
        <SaveButton slug={essay.slug} className="h-8 px-1" />
      </div>
      <h2 className="mt-1 font-display text-xl font-extrabold leading-snug tracking-tight">
        <Link to="/essay/$slug" params={{ slug: essay.slug }} className="hover:text-sage">
          {essay.title}
        </Link>
      </h2>
      <p className="mt-1 text-sm text-muted">{mediaLine(essay)}</p>
      <p className="mt-0.5 text-xs text-subtle">{essay.location}</p>
    </article>
  );
}

export function EssayRow({ essay }: { essay: Essay }) {
  return <EssayCard essay={essay} />;
}

export function LeadEssay({ essay }: { essay: Essay }) {
  return <EssayCard essay={essay} />;
}
