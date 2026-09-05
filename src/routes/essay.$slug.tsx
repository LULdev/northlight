import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Camera, MapPin } from "lucide-react";
import { useState } from "react";
import { EssayCard, mediaLine } from "@/components/essay-row";
import { Lightbox } from "@/components/lightbox";
import { SaveButton } from "@/components/save-button";
import { Shell } from "@/components/shell";
import { buttonVariants } from "@/components/ui/button";
import { formatDate, getEssay, relatedEssays } from "@/lib/essays";
import { euro, printForEssay, PRINT_SIZES } from "@/lib/shop";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/essay/$slug")({
  loader: ({ params }) => {
    const essay = getEssay(params.slug);
    if (!essay) throw notFound();
    return essay;
  },
  notFoundComponent: EssayMissing,
  component: EssayPage,
});

function EssayMissing() {
  return (
    <Shell>
      <main className="mx-auto max-w-6xl px-4 py-20 text-center sm:px-6">
        <p className="font-display text-3xl font-semibold">Essay not in the desk</p>
        <p className="mt-2 text-sm text-muted">It may have been filed under another title.</p>
        <Link to="/" className="mt-6 inline-flex h-11 items-center text-sm font-medium text-sage hover:underline">
          Back to the archive
        </Link>
      </main>
    </Shell>
  );
}

function EssayPage() {
  const essay = Route.useLoaderData();
  const related = relatedEssays(essay);
  const print = printForEssay(essay.slug);
  const [open, setOpen] = useState<number | null>(null);

  return (
    <Shell>
      <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
        <Link
          to="/"
          className="inline-flex h-11 items-center gap-1.5 text-sm font-medium text-muted hover:text-ink"
        >
          <ArrowLeft className="size-4" />
          Archive
        </Link>

        <header className="mt-4 max-w-3xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-sage">
            {essay.subject} · {essay.style}
          </p>
          <h1 className="mt-2 font-display text-3xl font-semibold tracking-[-0.03em] sm:text-5xl">
            {essay.title}
          </h1>
          <p className="mt-3 text-base text-muted">{essay.excerpt}</p>
          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-subtle">
            <span className="text-ink">{essay.photographer}</span>
            <span className="inline-flex items-center gap-1">
              <MapPin className="size-3.5" />
              {essay.location}, {essay.country}
            </span>
            <span>{formatDate(essay.postedAt)}</span>
            <span className="inline-flex items-center gap-1">
              <Camera className="size-3.5" />
              {mediaLine(essay)}
            </span>
            <span className="tabular-nums">{essay.rating}/10</span>
            {essay.access === "Members" && (
              <span className="rounded-full bg-paper px-2 py-0.5 text-xs font-medium text-ink">Members folio</span>
            )}
            <SaveButton slug={essay.slug} label />
          </div>
        </header>

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {essay.gallery.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setOpen(i)}
              className="group overflow-hidden rounded-md bg-paper text-left"
            >
              <img
                src={src}
                alt={essay.captions[i] ?? essay.title}
                className="frame aspect-[3/2] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
              />
              <p className="px-1 py-3 text-sm text-muted">{essay.captions[i]}</p>
            </button>
          ))}
        </div>

        <section className="mx-auto mt-10 max-w-2xl">
          <h2 className="font-display text-xl font-semibold tracking-[-0.02em]">Field notes</h2>
          <p className="mt-3 text-[1.05rem] leading-relaxed text-ink/90">{essay.body}</p>
          {print && (
            <div className="mt-8 rounded-lg bg-surface p-5 shadow-[var(--shadow-border)] sm:p-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-sage">Print room</p>
              <p className="mt-2 font-display text-xl font-semibold tracking-[-0.02em]">Order this plate</p>
              <p className="mt-1 text-sm text-muted">
                Archival pigment print on Hahnemühle, from {euro(PRINT_SIZES[0]!.price)}. Printed to order in Germany.
              </p>
              <Link
                to="/shop/$slug"
                params={{ slug: print.slug }}
                className={cn(buttonVariants({ variant: "sage" }), "mt-4")}
              >
                Open in the shop
              </Link>
            </div>
          )}
          <dl className="mt-8 grid grid-cols-2 gap-4 text-sm sm:grid-cols-3">
            <Meta label="Practice" value={essay.practice} />
            <Meta label="School" value={essay.school} />
            <Meta label="Format" value={essay.format} />
            <Meta label="Region" value={essay.region} />
            {essay.state && <Meta label="State" value={essay.state} />}
            <Meta label="Access" value={essay.access} />
          </dl>
          <div className="mt-6 flex flex-wrap gap-2">
            {[
              { to: "/", search: { location: essay.location, page: 1 }, label: essay.location },
              { to: "/", search: { subject: essay.subject, page: 1 }, label: essay.subject },
              { to: "/", search: { practice: essay.practice, page: 1 }, label: essay.practice },
            ]
              .filter((chip, i, all) => all.findIndex((c) => c.label === chip.label) === i)
              .map((chip) => (
                <Link
                  key={chip.label}
                  to="/"
                  search={chip.search}
                  className="h-9 rounded-full bg-paper px-3 text-sm leading-9 text-ink hover:bg-line"
                >
                  {chip.label}
                </Link>
              ))}
          </div>
        </section>

        {related.length > 0 && (
          <section className="mt-14">
            <h2 className="font-display text-xl font-extrabold tracking-tight">From the same climate</h2>
            <div className="mt-4 grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((e) => (
                <EssayCard key={e.slug} essay={e} />
              ))}
            </div>
          </section>
        )}
      </main>

      {open !== null && (
        <Lightbox
          images={essay.gallery}
          captions={essay.captions}
          index={open}
          onIndex={setOpen}
          onClose={() => setOpen(null)}
        />
      )}
    </Shell>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-subtle">{label}</dt>
      <dd className="mt-1 text-ink">{value}</dd>
    </div>
  );
}
