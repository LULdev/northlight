export function Stars({ rating }: { rating: number }) {
  const full = Math.round(rating);
  return (
    <p className="mt-1 text-sm text-sage" aria-label={`Rated ${rating.toFixed(2)} out of 5`}>
      {"★".repeat(full)}
      <span className="text-subtle">{"★".repeat(5 - full)}</span>
      <span className="ml-2 text-xs text-muted">Rated {rating.toFixed(2)} out of 5</span>
    </p>
  );
}
