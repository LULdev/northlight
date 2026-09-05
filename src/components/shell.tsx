import { useEffect } from "react";
import { useCart } from "@/lib/cart";
import { useSaved } from "@/lib/saved";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

export function Shell({ children }: { children: React.ReactNode }) {
  const hydrateSaved = useSaved((s) => s.hydrate);
  const hydrateCart = useCart((s) => s.hydrate);
  useEffect(() => {
    hydrateSaved();
    hydrateCart();
  }, [hydrateSaved, hydrateCart]);

  return (
    <div className="flex min-h-dvh flex-col bg-bg text-ink">
      <SiteHeader />
      <div className="flex-1">{children}</div>
      <SiteFooter />
    </div>
  );
}
