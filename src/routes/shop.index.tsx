import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Shell } from "@/components/shell";
import { Stars } from "@/components/stars";
import { useCart } from "@/lib/cart";
import { euro, products, type Product } from "@/lib/shop";
import { cn } from "@/lib/utils";


export const Route = createFileRoute("/shop/")({
  component: ShopPage,
});

function ShopPage() {
  const [sort, setSort] = useState<"latest" | "price-asc" | "price-desc" | "rating">("latest");
  const list = [...products].sort((a, b) => {
    if (sort === "price-asc") return a.price - b.price;
    if (sort === "price-desc") return b.price - a.price;
    if (sort === "rating") return b.rating - a.rating;
    return 0;
  });

  return (
    <Shell>
      <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-muted">
            Showing all <span className="font-bold text-ink">{list.length}</span> results
          </p>
          <label className="flex items-center gap-2 text-sm text-muted">
            <select
              className="h-10 rounded-sm bg-surface px-2 text-sm text-ink shadow-[var(--shadow-border)] focus:outline-none"
              value={sort}
              onChange={(e) => setSort(e.target.value as typeof sort)}
            >
              <option value="latest">Sort by latest</option>
              <option value="rating">Sort by average rating</option>
              <option value="price-asc">Sort by price: low to high</option>
              <option value="price-desc">Sort by price: high to low</option>
            </select>
          </label>
        </div>

        <ul className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2">
          {list.map((p) => (
            <ShopCard key={p.slug} product={p} />
          ))}
        </ul>
      </main>
    </Shell>
  );
}

function ShopCard({ product }: { product: Product }) {
  const add = useCart((s) => s.add);
  const [added, setAdded] = useState(false);
  const from = product.sizes ? Math.min(...product.sizes.map((s) => s.price)) : product.price;
  const defaultSize = product.sizes?.[1]?.id ?? product.sizes?.[0]?.id;

  return (
    <li className="min-w-0">
      <Link to="/shop/$slug" params={{ slug: product.slug }} className="group block">
        <div className="overflow-hidden rounded-md shadow-[var(--shadow-card)]">
          <img
            src={product.image}
            alt=""
            className="aspect-[8/3] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          />
        </div>
        <h2 className="mt-3 font-display text-lg font-extrabold leading-snug group-hover:text-sage sm:text-xl">
          {product.title}
          {product.kind === "print" ? " — archival print" : ""}
        </h2>
        <Stars rating={product.rating} />
        <p className="mt-1 text-base font-bold tabular-nums">
          {product.sizes ? `from ${euro(from)}` : euro(from)}
        </p>
      </Link>
      <button
        type="button"
        onClick={() => {
          add(product.slug, defaultSize);
          setAdded(true);
        }}
        className={cn(
          "mt-3 inline-flex h-11 items-center rounded-md px-5 text-sm font-bold",
          added ? "bg-paper text-ink" : "bg-sage text-sage-fg hover:bg-sage/90",
        )}
      >
        {added ? "Added" : "Add to cart"}
      </button>
    </li>
  );
}
