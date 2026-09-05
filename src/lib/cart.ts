import { create } from "zustand";
import { lineId } from "./shop";

export type CartLine = {
  id: string;
  productSlug: string;
  sizeId?: string;
  qty: number;
};

type CartState = {
  lines: CartLine[];
  hydrate: () => void;
  add: (productSlug: string, sizeId?: string, qty?: number) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clear: () => void;
};

const KEY = "northlight-cart";
const MAX_QTY = 5;

function read(): CartLine[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (x): x is CartLine =>
        x &&
        typeof x === "object" &&
        typeof x.id === "string" &&
        typeof x.productSlug === "string" &&
        typeof x.qty === "number",
    );
  } catch {
    return [];
  }
}

function persist(lines: CartLine[]) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(lines));
  } catch {
    /* ignore quota */
  }
}

export const useCart = create<CartState>((set, get) => ({
  lines: [],
  hydrate: () => set({ lines: read() }),
  add: (productSlug, sizeId, qty = 1) => {
    const id = lineId(productSlug, sizeId);
    const existing = get().lines.find((l) => l.id === id);
    const lines = existing
      ? get().lines.map((l) =>
          l.id === id ? { ...l, qty: Math.min(MAX_QTY, l.qty + qty) } : l,
        )
      : [...get().lines, { id, productSlug, sizeId, qty: Math.min(MAX_QTY, qty) }];
    set({ lines });
    persist(lines);
  },
  setQty: (id, qty) => {
    const lines =
      qty <= 0
        ? get().lines.filter((l) => l.id !== id)
        : get().lines.map((l) => (l.id === id ? { ...l, qty: Math.min(MAX_QTY, qty) } : l));
    set({ lines });
    persist(lines);
  },
  remove: (id) => {
    const lines = get().lines.filter((l) => l.id !== id);
    set({ lines });
    persist(lines);
  },
  clear: () => {
    set({ lines: [] });
    persist([]);
  },
}));

export function cartCount(lines: CartLine[]): number {
  return lines.reduce((n, l) => n + l.qty, 0);
}
