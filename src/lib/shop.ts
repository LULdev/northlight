import { essays, type Essay } from "./essays";

export type ProductKind = "print" | "folio";

export type PrintSize = {
  id: string;
  label: string;
  price: number;
};

export const PRINT_SIZES: PrintSize[] = [
  { id: "s", label: "30 × 20 cm", price: 48 },
  { id: "m", label: "50 × 33 cm", price: 92 },
  { id: "l", label: "70 × 47 cm", price: 165 },
];

export type Product = {
  slug: string;
  kind: ProductKind;
  title: string;
  photographer?: string;
  image: string;
  blurb: string;
  body: string;
  essaySlug?: string;
  sizes?: PrintSize[];
  price: number;
  edition?: string;
  paper?: string;
  lead?: boolean;
  rating: number;
};

function printFromEssay(essay: Essay, lead = false): Product {
  return {
    slug: `print-${essay.slug}`,
    kind: "print",
    title: essay.title,
    photographer: essay.photographer,
    image: essay.cover,
    blurb: essay.excerpt,
    body: `An archival pigment print of the lead plate from ${essay.photographer}’s essay ${essay.title}, made at ${essay.location}. Printed to order on Hahnemühle Photo Rag 308 g, signed in the margin on the back, packed flat from Germany. Allow 5–8 working days.`,
    essaySlug: essay.slug,
    sizes: PRINT_SIZES,
    price: PRINT_SIZES[1]!.price,
    paper: "Hahnemühle Photo Rag 308 g",
    edition: "Open edition, 2026",
    lead,
    rating: Math.min(5, essay.rating / 2),
  };
}

const FOLIOS: Product[] = [
  {
    slug: "vol-04-annual",
    kind: "folio",
    title: "Northlight Vol. 04",
    image: "https://raw.githubusercontent.com/LULdev/northlight/main/public/photos/hunza.jpg",
    blurb: "The autumn annual: sixteen essays, field notes, and a sewn binding.",
    body: "A 96-page sewn paperback of the current desk. Printed in two inks on uncoated stock, 23 × 30 cm. Ships from Germany. The cover plate is Hunza After Snow.",
    price: 42,
    edition: "First printing, 800 copies",
    paper: "Munken Print Cream 115 g",
    lead: true,
    rating: 4.6,
  },
  {
    slug: "members-clamshell",
    kind: "folio",
    title: "Members clamshell",
    image: "https://raw.githubusercontent.com/LULdev/northlight/main/public/photos/lofoten.jpg",
    blurb: "Six plates from the members folio, in a cloth clamshell.",
    body: "A limited clamshell of six 30 × 20 cm plates drawn from the members desk this season — Lofoten, Skardu, Venice, Serengeti among them. Cloth case, foil title, signed colophon. Forty copies.",
    price: 128,
    edition: "40 copies, numbered",
    paper: "Hahnemühle Photo Rag 308 g",
    lead: true,
    rating: 4.8,
  },
];

const LEAD_PRINTS = new Set(["hunza-after-snow", "lofoten-winter-light", "serengeti-crossing"]);

export const products: Product[] = [
  ...FOLIOS,
  ...essays.map((e) => printFromEssay(e, LEAD_PRINTS.has(e.slug))),
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function printForEssay(essaySlug: string): Product | undefined {
  return products.find((p) => p.essaySlug === essaySlug);
}

export function euro(n: number): string {
  return new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(n);
}

export function lineId(productSlug: string, sizeId?: string): string {
  return sizeId ? `${productSlug}::${sizeId}` : productSlug;
}

export function unitPrice(product: Product, sizeId?: string): number {
  if (product.sizes && sizeId) {
    return product.sizes.find((s) => s.id === sizeId)?.price ?? product.price;
  }
  return product.price;
}

export function sizeLabel(product: Product, sizeId?: string): string | undefined {
  if (!sizeId || !product.sizes) return undefined;
  return product.sizes.find((s) => s.id === sizeId)?.label;
}

export const COUNTRIES = [
  { code: "DE", label: "Germany" },
  { code: "AT", label: "Austria" },
  { code: "CH", label: "Switzerland" },
  { code: "NL", label: "Netherlands" },
  { code: "BE", label: "Belgium" },
  { code: "FR", label: "France" },
  { code: "IT", label: "Italy" },
  { code: "ES", label: "Spain" },
  { code: "PL", label: "Poland" },
  { code: "GB", label: "United Kingdom" },
  { code: "US", label: "United States" },
  { code: "WW", label: "Rest of world" },
] as const;

export function shippingFor(country: string, subtotal: number): number {
  if (subtotal >= 150) return 0;
  if (country === "DE") return 6.9;
  if (country === "CH" || country === "GB") return 16;
  if (country === "WW" || country === "US") return 22;
  return 11;
}

export type OrderLine = {
  productSlug: string;
  title: string;
  sizeLabel?: string;
  qty: number;
  unitPrice: number;
};

export type Order = {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  address: string;
  city: string;
  postcode: string;
  country: string;
  lines: OrderLine[];
  shipping: number;
  subtotal: number;
  total: number;
};

const ORDERS_KEY = "northlight-orders";

export function readOrders(): Order[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(ORDERS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? (parsed as Order[]) : [];
  } catch {
    return [];
  }
}

export function saveOrder(order: Order): void {
  const next = [order, ...readOrders()].slice(0, 20);
  window.localStorage.setItem(ORDERS_KEY, JSON.stringify(next));
}

export function getOrder(id: string): Order | undefined {
  return readOrders().find((o) => o.id === id);
}

export function newOrderId(): string {
  const n = Math.floor(1000 + Math.random() * 9000);
  return `NL-${n}`;
}
