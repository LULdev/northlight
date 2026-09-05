import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/shell";

export const Route = createFileRoute("/about")({
  component: AboutPage,
});

function AboutPage() {
  return (
    <Shell>
      <main className="mx-auto w-full max-w-2xl px-4 py-12 sm:px-6">
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-sage">Contact</p>
        <h1 className="mt-2 font-display text-4xl font-extrabold tracking-tight">About Northlight</h1>
        <div className="mt-6 space-y-4 text-[1.05rem] leading-relaxed text-muted">
          <p>
            Northlight is an archive of amateur documentary photo essays. Search a city, combine the
            filters, favorite the albums you want to sit with.
          </p>
          <p>
            The shop sells archival prints of the lead plates, the annual, and a members clamshell —
            printed to order in Germany. This desk invoices; no card is charged here.
          </p>
        </div>
        <div className="mt-10 flex flex-wrap gap-5">
          <Link to="/" className="inline-flex h-11 items-center text-sm font-bold text-sage hover:underline">
            Albums
          </Link>
          <Link to="/shop" className="inline-flex h-11 items-center text-sm font-bold text-sage hover:underline">
            Shop
          </Link>
        </div>
      </main>
    </Shell>
  );
}
