"use client";

import * as React from "react";
import { Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { primaryTelHref } from "@/data/site-config";
import { trackEvent, trackPhoneClick } from "@/lib/analytics";
import { cn } from "@/lib/cn";
import { useProductPurchase } from "@/components/shop/product-purchase-context";

/**
 * Mobile sticky bar — dùng quy cách đang chọn từ ProductPurchaseProvider.
 */
export function FloatingCTA() {
  const { product, selectedOption, quoteHref } = useProductPurchase();
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > 400);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 p-3 transition-transform duration-500 ease-in-out md:hidden",
        // chừa safe-area
        "pb-[max(0.75rem,env(safe-area-inset-bottom))]",
        isVisible ? "translate-y-0" : "translate-y-full",
      )}
    >
      <div className="mx-auto flex max-w-md items-center gap-2 rounded-full border border-border-soft bg-surface-lowest/95 p-2 shadow-ambient-lg backdrop-blur-md">
        <div className="min-w-0 flex-1 pl-3">
          <p className="truncate text-xs font-semibold text-text-primary">
            {product.name}
          </p>
          {selectedOption ? (
            <p className="truncate text-[11px] text-text-muted">
              {selectedOption.label}
            </p>
          ) : null}
        </div>
        <div className="flex shrink-0 gap-1.5">
          <Button
            href={primaryTelHref()}
            variant="primary"
            className="rounded-full px-3 shadow-md"
            onClick={() => trackPhoneClick(`product_bar:${product.name}`)}
          >
            <Phone className="size-4" aria-hidden />
            <span className="sr-only sm:not-sr-only sm:ml-1">Gọi</span>
          </Button>
          <Button
            href={quoteHref}
            variant="secondary"
            className="rounded-full px-3 shadow-md"
            onClick={() =>
              trackEvent("click_quote", {
                event_category: "engagement",
                event_label: `product_bar:${product.slug}`,
                product_name: product.name,
                variant: selectedOption?.label,
              })
            }
          >
            <Mail className="size-4" aria-hidden />
            <span className="ml-1">Báo giá</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
