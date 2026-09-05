import { Heart } from "lucide-react";
import { useSaved } from "@/lib/saved";
import { cn } from "@/lib/utils";

export function SaveButton({
  slug,
  label,
  className,
}: {
  slug: string;
  label?: boolean;
  className?: string;
}) {
  const ids = useSaved((s) => s.ids);
  const toggle = useSaved((s) => s.toggle);
  const on = ids.includes(slug);

  return (
    <button
      type="button"
      aria-pressed={on}
      aria-label={on ? "Remove from saved" : "Save essay"}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(slug);
      }}
      className={cn(
        "inline-flex h-11 items-center justify-center gap-1.5 rounded-md px-2.5 text-sm font-semibold transition-[transform,color] duration-150 ease-out active:scale-[0.96]",
        on ? "text-accent" : "text-muted hover:text-ink",
        className,
      )}
    >
      <Heart className="size-4" strokeWidth={1.75} fill={on ? "currentColor" : "none"} />
      {label && <span>{on ? "Saved" : "Favorite"}</span>}
    </button>
  );
}
