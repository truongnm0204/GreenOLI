"use client";

import { Phone, Mail, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { primaryTelHref } from "@/data/site-config";
import { trackEvent, trackPhoneClick } from "@/lib/analytics";
import { useProductPurchase } from "@/components/shop/product-purchase-context";
import { ProductSlaLine } from "@/components/shop/product-sla-line";

/**
 * CTA chốt sau mô tả — giữ quy cách đang chọn từ hero.
 */
export function ProductBottomCta() {
  const { product, selectedOption, quoteHref } = useProductPurchase();

  return (
    <div className="rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/10 via-white to-secondary/10 p-5 shadow-ambient sm:p-7 md:p-8">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0 space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary-dark">
            Sẵn sàng đặt hàng / nhận báo giá
          </p>
          <h3 className="text-xl font-bold text-text-primary md:text-2xl">
            {product.name}
          </h3>
          <p className="flex flex-wrap items-center gap-2 text-sm text-text-muted md:text-base">
            <Package className="size-4 shrink-0 text-primary-dark" aria-hidden />
            {selectedOption ? (
              <>
                Quy cách đang chọn:{" "}
                <span className="font-semibold text-text-primary">
                  {selectedOption.label}
                </span>
              </>
            ) : (
              <span>Liên hệ để nhận tư vấn quy cách phù hợp</span>
            )}
          </p>
        </div>

        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
          <Button
            href={primaryTelHref()}
            size="lg"
            className="h-12 px-6 shadow-md sm:min-w-[160px]"
            onClick={() => trackPhoneClick(`product_bottom:${product.name}`)}
          >
            <Phone className="size-4" aria-hidden />
            Gọi ngay
          </Button>
          <Button
            href={quoteHref}
            variant="outline"
            size="lg"
            className="h-12 bg-white/80 px-6 sm:min-w-[200px]"
            onClick={() =>
              trackEvent("click_quote", {
                event_category: "engagement",
                event_label: `product_bottom:${product.slug}`,
                product_name: product.name,
                variant: selectedOption?.label,
              })
            }
          >
            <Mail className="size-4" aria-hidden />
            {selectedOption
              ? `Báo giá: ${selectedOption.label}`
              : "Yêu cầu báo giá"}
          </Button>
        </div>
      </div>
      <ProductSlaLine compact className="mt-4 border-t border-primary/10 pt-4" />
    </div>
  );
}
