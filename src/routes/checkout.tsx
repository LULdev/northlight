import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Shell } from "@/components/shell";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";
import {
  COUNTRIES,
  euro,
  getOrder,
  getProduct,
  newOrderId,
  saveOrder,
  shippingFor,
  sizeLabel,
  unitPrice,
  type Order,
} from "@/lib/shop";

type Search = { placed?: string };

export const Route = createFileRoute("/checkout")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    placed: typeof s.placed === "string" ? s.placed : undefined,
  }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const { placed } = Route.useSearch();
  if (placed) return <Confirmation id={placed} />;
  return <CheckoutForm />;
}

function CheckoutForm() {
  const navigate = useNavigate();
  const lines = useCart((s) => s.lines);
  const clear = useCart((s) => s.clear);
  const [ready, setReady] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postcode, setPostcode] = useState("");
  const [country, setCountry] = useState("DE");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => setReady(true), []);

  const resolved = useMemo(
    () =>
      lines
        .map((line) => {
          const product = getProduct(line.productSlug);
          if (!product) return null;
          return {
            line,
            product,
            unit: unitPrice(product, line.sizeId),
            size: sizeLabel(product, line.sizeId),
          };
        })
        .filter((x): x is NonNullable<typeof x> => x !== null),
    [lines],
  );

  const subtotal = resolved.reduce((n, r) => n + r.unit * r.line.qty, 0);
  const shipping = shippingFor(country, subtotal);
  const total = subtotal + shipping;

  if (!ready) {
    return (
      <Shell>
        <main className="mx-auto max-w-6xl px-4 py-20 text-sm text-muted sm:px-6">Opening checkout…</main>
      </Shell>
    );
  }

  if (resolved.length === 0) {
    return (
      <Shell>
        <main className="mx-auto max-w-6xl px-4 py-20 text-center sm:px-6">
          <p className="font-display text-3xl font-semibold">Nothing to check out</p>
          <Link to="/shop" className="mt-6 inline-flex h-11 items-center text-sm font-medium text-sage hover:underline">
            Open the shop
          </Link>
        </main>
      </Shell>
    );
  }

  function place(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !address.trim() || !city.trim() || !postcode.trim()) {
      setError("Please fill in every field.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("That email does not look usable.");
      return;
    }
    const order: Order = {
      id: newOrderId(),
      createdAt: new Date().toISOString(),
      name: name.trim(),
      email: email.trim(),
      address: address.trim(),
      city: city.trim(),
      postcode: postcode.trim(),
      country,
      lines: resolved.map((r) => ({
        productSlug: r.product.slug,
        title: r.product.title,
        sizeLabel: r.size,
        qty: r.line.qty,
        unitPrice: r.unit,
      })),
      shipping,
      subtotal,
      total,
    };
    saveOrder(order);
    clear();
    navigate({ to: "/checkout", search: { placed: order.id } });
  }

  return (
    <Shell>
      <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-sage">Print room</p>
        <h1 className="mt-2 font-display text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">Checkout</h1>
        <p className="mt-2 max-w-xl text-sm text-muted">
          This desk invoices. No card is taken here — you will receive the order on paper, paid
          later if this were a live press.
        </p>

        <form onSubmit={place} className="mt-8 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div className="space-y-4">
            <Field label="Name" value={name} onChange={setName} autoComplete="name" />
            <Field label="Email" value={email} onChange={setEmail} type="email" autoComplete="email" />
            <Field label="Street" value={address} onChange={setAddress} autoComplete="street-address" />
            <div className="grid grid-cols-2 gap-3">
              <Field label="Postcode" value={postcode} onChange={setPostcode} autoComplete="postal-code" />
              <Field label="City" value={city} onChange={setCity} autoComplete="address-level2" />
            </div>
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-subtle">Country</span>
              <select
                className="mt-1 h-11 w-full rounded-md bg-surface px-3 text-sm text-ink shadow-[var(--shadow-border)] focus:outline-none"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                {COUNTRIES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.label}
                  </option>
                ))}
              </select>
            </label>
            {error && <p className="text-sm text-ink">{error}</p>}
            <Button type="submit" className="w-full sm:w-auto">
              Place order · {euro(total)}
            </Button>
          </div>

          <aside className="rounded-lg bg-surface p-5 shadow-[var(--shadow-border)] sm:p-6">
            <h2 className="font-display text-xl font-semibold tracking-[-0.02em]">Order</h2>
            <ul className="mt-4 divide-y divide-line text-sm">
              {resolved.map((r) => (
                <li key={r.line.id} className="flex justify-between gap-3 py-3">
                  <span>
                    {r.product.title}
                    {r.size ? ` · ${r.size}` : ""}
                    <span className="text-muted"> × {r.line.qty}</span>
                  </span>
                  <span className="tabular-nums">{euro(r.unit * r.line.qty)}</span>
                </li>
              ))}
            </ul>
            <dl className="mt-2 space-y-2 border-t border-line pt-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted">Subtotal</dt>
                <dd className="tabular-nums">{euro(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted">Shipping</dt>
                <dd className="tabular-nums">{shipping === 0 ? "Free" : euro(shipping)}</dd>
              </div>
              <div className="flex justify-between font-medium">
                <dt>Total</dt>
                <dd className="tabular-nums">{euro(total)}</dd>
              </div>
            </dl>
          </aside>
        </form>
      </main>
    </Shell>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-[0.14em] text-subtle">{label}</span>
      <input
        type={type}
        value={value}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 h-11 w-full rounded-md bg-surface px-3 text-sm text-ink shadow-[var(--shadow-border)] placeholder:text-subtle focus:outline-none focus:shadow-[var(--shadow-border-hover)]"
      />
    </label>
  );
}

function Confirmation({ id }: { id: string }) {
  const [order, setOrder] = useState<Order | null | undefined>(undefined);
  useEffect(() => {
    setOrder(getOrder(id) ?? null);
  }, [id]);

  if (order === undefined) {
    return (
      <Shell>
        <main className="mx-auto max-w-6xl px-4 py-20 text-sm text-muted sm:px-6">Finding the slip…</main>
      </Shell>
    );
  }

  if (!order) {
    return (
      <Shell>
        <main className="mx-auto max-w-6xl px-4 py-20 text-center sm:px-6">
          <p className="font-display text-3xl font-semibold">Order not on this desk</p>
          <Link to="/shop" className="mt-6 inline-flex h-11 items-center text-sm font-medium text-sage hover:underline">
            Print room
          </Link>
        </main>
      </Shell>
    );
  }

  return (
    <Shell>
      <main className="mx-auto w-full max-w-2xl px-4 py-12 sm:px-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-sage">Filed</p>
        <h1 className="mt-2 font-display text-4xl font-semibold tracking-[-0.03em]">Order {order.id}</h1>
        <p className="mt-3 text-muted">
          Thank you, {order.name}. The print room has the slip. A live press would now send the
          invoice to {order.email}.
        </p>
        <ul className="mt-8 divide-y divide-line border-y border-line text-sm">
          {order.lines.map((l, i) => (
            <li key={i} className="flex justify-between gap-3 py-3">
              <span>
                {l.title}
                {l.sizeLabel ? ` · ${l.sizeLabel}` : ""} × {l.qty}
              </span>
              <span className="tabular-nums">{euro(l.unitPrice * l.qty)}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 flex justify-between font-medium">
          <span>Total</span>
          <span className="tabular-nums">{euro(order.total)}</span>
        </p>
        <p className="mt-2 text-sm text-muted">
          {order.address}, {order.postcode} {order.city}
        </p>
        <Link to="/shop" className="mt-10 inline-flex h-11 items-center text-sm font-medium text-sage hover:underline">
          Back to the print room
        </Link>
      </main>
    </Shell>
  );
}
