import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { EssayCard } from "@/components/essay-row";
import { Shell } from "@/components/shell";
import { essays } from "@/lib/essays";
import { useSaved } from "@/lib/saved";

export const Route = createFileRoute("/saved")({
  component: SavedPage,
});

function SavedPage() {
  const ids = useSaved((s) => s.ids);
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  const list = essays.filter((e) => ids.includes(e.slug));

  return (
    <Shell>
      <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
        <h1 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">For You</h1>
        <p className="mt-2 max-w-xl text-sm text-muted">Favorites kept on this device.</p>

        {!ready ? (
          <p className="mt-10 text-sm text-muted">Opening favorites…</p>
        ) : list.length === 0 ? (
          <div className="mt-10 rounded-lg bg-surface px-6 py-16 text-center shadow-[var(--shadow-border)]">
            <p className="font-display text-2xl font-extrabold">No favorites yet</p>
            <p className="mt-2 text-sm text-muted">Tap the heart on any album to keep it here.</p>
            <Link to="/" className="mt-5 inline-flex h-11 items-center text-sm font-bold text-sage hover:underline">
              Browse albums
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((essay) => (
              <EssayCard key={essay.slug} essay={essay} />
            ))}
          </div>
        )}
      </main>
    </Shell>
  );
}
