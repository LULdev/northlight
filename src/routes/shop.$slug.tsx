import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { useState } from "react";
import { Stars } from "@/components/stars";
import { Shell } from "@/components/shell";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";
import { euro, getProduct, PRINT_SIZES } from "@/lib/shop";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/shop/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return product;
  },
  notFoundComponent: Missing,
  component: ProductPage,
});

function Missing() {
  return (
    <Shell>
      <main className="mx-auto max-w-6xl px-4 py-20 text-center sm:px-6">
        <p className="font-display text-3xl font-extrabold">Not in the shop</p>
        <Link to="/shop" className="mt-6 inline-flex h-11 items-center text-sm font-bold text-sage hover:underline">
          Back to the shop
        </Link>
      </main>
    </Shell>
  );
}

function ProductPage() {
  const product = Route.useLoaderData();
  const add = useCart((s) => s.add);
  const [sizeId, setSizeId] = useState(product.sizes?.[1]?.id ?? product.sizes?.[0]?.id);
  const [added, setAdded] = useState(false);
  const price = product.sizes
    ? (product.sizes.find((s) => s.id === sizeId)?.price ?? product.price)
    : product.price;

  return (
    <Shell>
      <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <div className="overflow-hidden rounded-md shadow-[var(--shadow-card)]">
            <img src={product.image} alt={product.title} className="aspect-[8/3] w-full object-cover lg:aspect-[3/2]" />
          </div>

          <div>
            <h1 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">{product.title}</h1>
            {product.photographer && <p className="mt-1 text-muted">{product.photographer}</p>}
            <Stars rating={product.rating} />
            <p className="mt-4 text-[1.05rem] leading-relaxed text-muted">{product.body}</p>

            {product.sizes && (
              <fieldset className="mt-6">
                <legend className="text-xs font-bold uppercase tracking-[0.12em] text-subtle">Size</legend>
                <div className="mt-2 flex flex-col gap-2">
                  {PRINT_SIZES.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setSizeId(s.id)}
                      className={cn(
                        "flex h-12 items-center justify-between rounded-md px-4 text-sm font-semibold shadow-[var(--shadow-border)]",
                        sizeId === s.id ? "bg-sage text-sage-fg" : "bg-surface text-ink hover:bg-paper",
                      )}
                    >
                      <span>{s.label}</span>
                      <span className="tabular-nums">{euro(s.price)}</span>
                    </button>
                  ))}
                </div>
              </fieldset>
            )}

            <p className="mt-6 font-display text-3xl font-extrabold tabular-nums">{euro(price)}</p>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <Button
                type="button"
                variant="accent"
                onClick={() => {
                  add(product.slug, sizeId);
                  setAdded(true);
                }}
              >
                {added ? (
                  <>
                    <Check className="size-4" />
                    Added
                  </>
                ) : (
                  "Add to cart"
                )}
              </Button>
              {added && (
                <Link to="/cart" className="text-sm font-bold text-sage hover:underline">
                  View cart
                </Link>
              )}
            </div>

            <dl className="mt-8 grid grid-cols-2 gap-4 text-sm">
              {product.paper && (
                <div>
                  <dt className="text-xs font-bold uppercase tracking-[0.12em] text-subtle">Paper</dt>
                  <dd className="mt-1">{product.paper}</dd>
                </div>
              )}
              {product.edition && (
                <div>
                  <dt className="text-xs font-bold uppercase tracking-[0.12em] text-subtle">Edition</dt>
                  <dd className="mt-1">{product.edition}</dd>
                </div>
              )}
            </dl>

            {product.essaySlug && (
              <Link
                to="/essay/$slug"
                params={{ slug: product.essaySlug }}
                className="mt-6 inline-flex h-11 items-center text-sm font-bold text-sage hover:underline"
              >
                Open the album
              </Link>
            )}
          </div>
        </div>
      </main>
    </Shell>
  );
}
