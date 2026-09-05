import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-line bg-bg">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 sm:flex-row sm:items-end sm:justify-between sm:px-6">
        <div>
          <p className="font-display text-lg font-extrabold">Northlight</p>
          <p className="mt-1 max-w-sm text-sm text-muted">Amateur documentary photo essays — landscapes, streets, and quiet rooms.</p>
        </div>
        <div className="flex flex-wrap gap-5 text-sm font-semibold text-muted">
          <Link to="/" className="hover:text-ink">
            Albums
          </Link>
          <Link to="/shop" className="hover:text-ink">
            Shop
          </Link>
          <Link to="/cart" className="hover:text-ink">
            Cart
          </Link>
          <Link to="/about" className="hover:text-ink">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
