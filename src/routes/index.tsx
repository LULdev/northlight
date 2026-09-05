import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { EssayCard } from "@/components/essay-row";
import { FilterBar } from "@/components/filter-bar";
import { Shell } from "@/components/shell";
import {
  parseSearch,
  queryEssays,
  type EssaySearch,
  type SortKey,
} from "@/lib/essays";

export const Route = createFileRoute("/")({
  validateSearch: parseSearch,
  component: Home,
});

function Home() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const { total, page, pages, items } = queryEssays(search);

  const patch = (next: Partial<EssaySearch>) => {
    navigate({
      search: (prev) => ({ ...prev, ...next }),
    });
  };

  return (
    <Shell>
      <FilterBar
        search={search}
        onChange={patch}
        onClear={() =>
          navigate({
            search: { sort: search.sort, page: 1 },
          })
        }
      />

      <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-muted">
            <span className="tabular-nums font-bold text-ink">{total}</span>{" "}
            {total === 1 ? "album" : "albums"}
            {search.q ? ` matching “${search.q}”` : ""}
          </p>
          <label className="flex items-center gap-2 text-sm text-muted">
            Sort
            <select
              className="h-10 rounded-sm bg-surface px-2 text-sm text-ink shadow-[var(--shadow-border)] focus:outline-none"
              value={search.sort ?? "latest"}
              onChange={(e) => patch({ sort: e.target.value as SortKey, page: 1 })}
            >
              <option value="latest">Latest</option>
              <option value="saved">Most popular</option>
              <option value="rating">Highest rated</option>
              <option value="size">Largest set</option>
            </select>
          </label>
        </div>

        {total === 0 ? (
          <div className="rounded-lg bg-surface px-6 py-16 text-center shadow-[var(--shadow-border)]">
            <p className="font-display text-2xl font-extrabold">Nothing in this combination</p>
            <p className="mt-2 text-sm text-muted">Clear a filter or try a broader search.</p>
            <button
              type="button"
              className="mt-5 text-sm font-bold text-sage underline-offset-2 hover:underline"
              onClick={() => navigate({ search: { sort: search.sort, page: 1 } })}
            >
              Reset filters
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((essay) => (
                <EssayCard key={essay.slug} essay={essay} />
              ))}
            </div>
            {pages > 1 && (
              <nav className="mt-10 flex items-center justify-between text-sm" aria-label="Pagination">
                {page > 1 ? (
                  <Link
                    to="/"
                    search={{ ...search, page: page - 1 }}
                    className="inline-flex h-11 items-center gap-1 font-bold text-ink hover:text-sage"
                  >
                    <ChevronLeft className="size-4" />
                    Prev
                  </Link>
                ) : (
                  <span />
                )}
                <span className="tabular-nums text-muted">
                  {page} / {pages}
                </span>
                {page < pages ? (
                  <Link
                    to="/"
                    search={{ ...search, page: page + 1 }}
                    className="inline-flex h-11 items-center gap-1 font-bold text-ink hover:text-sage"
                  >
                    Next
                    <ChevronRight className="size-4" />
                  </Link>
                ) : (
                  <span />
                )}
              </nav>
            )}
          </>
        )}
      </main>
    </Shell>
  );
}
