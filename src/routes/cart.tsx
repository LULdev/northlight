import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Shell } from "@/components/shell";
import { buttonVariants } from "@/components/ui/button";
import { cartCount, useCart } from "@/lib/cart";
import { euro, getProduct, shippingFor, sizeLabel, unitPrice } from "@/lib/shop";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/cart")({
  component: CartPage,
});

function CartPage() {
  const lines = useCart((s) => s.lines);
  const setQty = useCart((s) => s.setQty);
  const remove = useCart((s) => s.remove);
  const count = cartCount(lines);
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);

  const resolved = lines
    .map((line) => {
      const product = getProduct(line.productSlug);
      if (!product) return null;
      const unit = unitPrice(product, line.sizeId);
      return { line, product, unit, size: sizeLabel(product, line.sizeId) };
    })
    .filter((x): x is NonNullable<typeof x> => x !== null);

  const subtotal = resolved.reduce((n, r) => n + r.unit * r.line.qty, 0);
  const ship = shippingFor("DE", subtotal);

  return (
    <Shell>
      <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-sage">Print room</p>
        <h1 className="mt-2 font-display text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">Cart</h1>

        {!ready ? (
          <p className="mt-10 text-sm text-muted">Opening the cart…</p>
        ) : resolved.length === 0 ? (
          <div className="mt-10 rounded-lg bg-surface px-6 py-16 text-center shadow-[var(--shadow-border)]">
            <p className="font-display text-2xl font-semibold">The cart is empty</p>
            <p className="mt-2 text-sm text-muted">The print room has plates waiting.</p>
            <Link
              to="/shop"
              className="mt-5 inline-flex h-11 items-center text-sm font-medium text-sage hover:underline"
            >
              Open the shop
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
            <ul className="divide-y divide-line border-y border-line">
              {resolved.map(({ line, product, unit, size }) => (
                <li
                  key={line.id}
                  className="grid grid-cols-[88px_minmax(0,1fr)] gap-4 py-5 sm:grid-cols-[120px_minmax(0,1fr)]"
                >
                  <img src={product.image} alt="" className="frame aspect-[3/2] w-full object-cover" />
                  <div className="min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <Link
                          to="/shop/$slug"
                          params={{ slug: product.slug }}
                          className="font-display text-lg font-semibold tracking-[-0.02em] hover:text-sage"
                        >
                          {product.title}
                        </Link>
                        {size && <p className="text-sm text-muted">{size}</p>}
                      </div>
                      <p className="tabular-nums text-sm font-medium">{euro(unit * line.qty)}</p>
                    </div>
                    <div className="mt-3 flex items-center gap-3">
                      <div className="inline-flex items-center rounded-sm bg-paper">
                        <button
                          type="button"
                          className="grid size-11 place-items-center"
                          aria-label="Decrease quantity"
                          onClick={() => setQty(line.id, line.qty - 1)}
                        >
                          <Minus className="size-3.5" />
                        </button>
                        <span className="min-w-6 text-center text-sm tabular-nums">{line.qty}</span>
                        <button
                          type="button"
                          className="grid size-11 place-items-center"
                          aria-label="Increase quantity"
                          onClick={() => setQty(line.id, line.qty + 1)}
                        >
                          <Plus className="size-3.5" />
                        </button>
                      </div>
                      <button
                        type="button"
                        className="inline-flex h-11 items-center gap-1.5 px-2 text-sm text-muted hover:text-ink"
                        onClick={() => remove(line.id)}
                      >
                        <Trash2 className="size-3.5" />
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <aside className="rounded-lg bg-surface p-5 shadow-[var(--shadow-border)] sm:p-6">
              <h2 className="font-display text-xl font-semibold tracking-[-0.02em]">Summary</h2>
              <dl className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted">
                    {count} {count === 1 ? "item" : "items"}
                  </dt>
                  <dd className="tabular-nums">{euro(subtotal)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted">Shipping (DE)</dt>
                  <dd className="tabular-nums">{ship === 0 ? "Free" : euro(ship)}</dd>
                </div>
                <div className="flex justify-between border-t border-line pt-3 font-medium">
                  <dt>Total</dt>
                  <dd className="tabular-nums">{euro(subtotal + ship)}</dd>
                </div>
              </dl>
              <p className="mt-3 text-xs text-subtle">
                Shipping is recalculated at checkout. Free from {euro(150)}.
              </p>
              <Link to="/checkout" className={cn(buttonVariants(), "mt-5 w-full")}>
                Checkout
              </Link>
            </aside>
          </div>
        )}
      </main>
    </Shell>
  );
}
