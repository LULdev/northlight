import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, ShoppingCart, X } from "lucide-react";
import { useState } from "react";
import { cartCount, useCart } from "@/lib/cart";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const bagCount = useCart((s) => cartCount(s.lines));
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3 sm:px-6">
        <button
          type="button"
          className="grid size-11 place-items-center md:hidden"
          aria-label="Menu"
          onClick={() => setOpen(true)}
        >
          <Menu className="size-5" />
        </button>

        <Link to="/" className="flex items-center gap-2">
          <span className="grid size-9 place-items-center rounded-sm bg-sage text-sage-fg" aria-hidden>
            <ApertureMark />
          </span>
          <span className="font-display text-lg font-extrabold tracking-tight sm:text-xl">Northlight</span>
        </Link>

        <nav className="ml-4 hidden items-center gap-1 md:flex">
          <NavLink to="/" active={pathname === "/"}>
            Albums
          </NavLink>
          <NavLink to="/shop" active={pathname.startsWith("/shop")}>
            Shop
          </NavLink>
          <NavLink to="/saved" active={pathname.startsWith("/saved")}>
            For You
          </NavLink>
          <NavLink to="/about" active={pathname.startsWith("/about")}>
            Contact
          </NavLink>
        </nav>

        <Link
          to="/cart"
          className="relative ml-auto inline-flex h-11 items-center gap-2 px-2 text-sm font-semibold hover:text-sage"
          aria-label={bagCount ? `Cart, ${bagCount} items` : "Cart"}
        >
          <ShoppingCart className="size-5" strokeWidth={1.75} />
          <span className="tabular-nums text-sage">{bagCount}</span>
        </Link>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <button type="button" className="absolute inset-0 bg-bg/70" aria-label="Close menu" onClick={() => setOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-[min(20rem,86vw)] bg-surface p-4 shadow-[var(--shadow-card)]">
            <div className="mb-4 flex items-center justify-between">
              <p className="font-display text-lg font-extrabold">Northlight</p>
              <button type="button" className="grid size-11 place-items-center" onClick={() => setOpen(false)} aria-label="Close">
                <X className="size-5" />
              </button>
            </div>
            <nav className="flex flex-col">
              <Link to="/" className="h-12 leading-[3rem] font-semibold" onClick={() => setOpen(false)}>
                Albums
              </Link>
              <Link to="/shop" className="h-12 leading-[3rem] font-semibold" onClick={() => setOpen(false)}>
                Shop
              </Link>
              <Link to="/saved" className="h-12 leading-[3rem] font-semibold" onClick={() => setOpen(false)}>
                For You
              </Link>
              <Link to="/about" className="h-12 leading-[3rem] font-semibold" onClick={() => setOpen(false)}>
                Contact
              </Link>
              <Link to="/cart" className="h-12 leading-[3rem] font-semibold" onClick={() => setOpen(false)}>
                Cart
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}

function NavLink({
  to,
  active,
  children,
}: {
  to: "/shop" | "/saved" | "/" | "/about";
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      to={to}
      className={cn(
        "inline-flex h-11 items-center px-3 text-sm font-bold",
        active ? "text-sage" : "text-ink hover:text-sage",
      )}
    >
      {children}
    </Link>
  );
}

function ApertureMark() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="8.2" />
      <circle cx="12" cy="12" r="2.2" />
    </svg>
  );
}
