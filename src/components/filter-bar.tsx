import { Search, SlidersHorizontal, X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { useNavigate, useRouterState } from "@tanstack/react-router";
import {
  FILTERS,
  activeFilterEntries,
  facetOptions,
  type EssaySearch,
} from "@/lib/essays";
import { cn } from "@/lib/utils";

type Props = {
  search: EssaySearch;
  onChange: (patch: Partial<EssaySearch>) => void;
  onClear: () => void;
};


export function FilterBar({ search, onChange, onClear }: Props) {
  const [open, setOpen] = useState(false);
  const chips = activeFilterEntries(search);
  const navigate = useNavigate();
  const searchStr = useRouterState({ select: (s) => s.location.searchStr });
  const [q, setQ] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(searchStr);
    setQ(params.get("q") ?? "");
  }, [searchStr]);

  return (
    <div className="border-b border-line bg-bg">
      <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <form
            className="relative min-w-0 flex-1 sm:max-w-sm"
            onSubmit={(e) => {
              e.preventDefault();
              const next = q.trim();
              navigate({
                to: "/",
                search: (prev) => ({ ...prev, q: next || undefined, page: 1 }),
              });
            }}
          >
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search essays…"
              className="h-11 w-full rounded-md bg-surface px-4 pr-11 text-sm text-ink shadow-[var(--shadow-border)] placeholder:text-subtle focus:outline-none focus:shadow-[var(--shadow-border-hover)]"
              type="search"
              name="q"
              aria-label="Search essays"
            />
            <button
              type="submit"
              className="absolute right-1 top-1/2 grid size-9 -translate-y-1/2 place-items-center text-muted hover:text-ink"
              aria-label="Submit search"
            >
              <Search className="size-4" />
            </button>
          </form>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-surface px-4 text-sm font-bold shadow-[var(--shadow-border)] hover:shadow-[var(--shadow-border-hover)] sm:ml-auto"
          >
            <SlidersHorizontal className="size-4" />
            {open ? "Hide filters" : "Show filters"}
            <span className="text-sage">{open ? "–" : "+"}</span>
          </button>
        </div>

        {open && (
          <div className="mt-4">
            <p className="mb-3 text-sm text-muted">Tip: Combine filters for a precise search.</p>
            <div className="flex flex-wrap gap-2">
              {FILTERS.map((f) => (
                <FilterMenu
                  key={f.key}
                  label={f.label}
                  options={facetOptions(f.key)}
                  value={search[f.key]}
                  onSelect={(value) => onChange({ [f.key]: value, page: 1 })}
                />
              ))}
            </div>
          </div>
        )}

        {chips.length > 0 && (
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {chips.map((c) => (
              <button
                key={c.key + c.value}
                type="button"
                onClick={() =>
                  onChange(c.key === "q" ? { q: undefined, page: 1 } : { [c.key]: undefined, page: 1 })
                }
                className="inline-flex h-9 items-center gap-1.5 rounded-full bg-paper px-3 text-xs font-semibold text-ink hover:bg-line"
              >
                <span className="text-muted">{c.label}</span>
                {c.value}
                <X className="size-3.5 text-subtle" />
              </button>
            ))}
            <button
              type="button"
              onClick={onClear}
              className="h-9 px-2 text-xs font-semibold text-muted underline-offset-2 hover:text-ink hover:underline"
            >
              Clear all
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function FilterMenu({
  label,
  options,
  value,
  onSelect,
}: {
  label: string;
  options: { value: string; count: number }[];
  value?: string;
  onSelect: (value: string | undefined) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (options.length === 0) return null;

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "inline-flex h-10 items-center gap-2 rounded-sm bg-surface px-3 text-sm font-semibold shadow-[var(--shadow-border)]",
          value ? "text-sage" : "text-ink",
        )}
      >
        {value ?? label}
        <span className="text-[10px] text-subtle">▼</span>
      </button>
      {open && (
        <div
          id={id}
          role="listbox"
          className="absolute left-0 z-30 mt-2 max-h-72 min-w-56 overflow-auto rounded-md bg-surface py-1 shadow-[var(--shadow-border-hover)]"
        >
          {value && (
            <button
              type="button"
              className="flex w-full items-center justify-between px-3 py-2.5 text-left text-sm text-muted hover:bg-paper"
              onClick={() => {
                onSelect(undefined);
                setOpen(false);
              }}
            >
              Any {label.toLowerCase()}
            </button>
          )}
          {options.map((o) => (
            <button
              key={o.value}
              type="button"
              role="option"
              aria-selected={value === o.value}
              className={cn(
                "flex w-full items-center justify-between gap-4 px-3 py-2.5 text-left text-sm hover:bg-paper",
                value === o.value ? "font-bold text-sage" : "text-ink",
              )}
              onClick={() => {
                onSelect(o.value === value ? undefined : o.value);
                setOpen(false);
              }}
            >
              <span>{o.value}</span>
              <span className="tabular-nums text-subtle">({o.count})</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
