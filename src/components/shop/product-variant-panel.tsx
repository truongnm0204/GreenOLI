"use client";

import * as React from "react";
import { Phone, Mail, ShieldCheck, Package, FileText } from "lucide-react";
import { ProductGallery } from "@/components/shop/product-gallery";
import { Button } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import { Card } from "@/components/ui/card";
import { MotionWrapper } from "@/components/ui/motion-wrapper";
import { cn } from "@/lib/cn";
import type { GalleryItem, Product } from "@/types/product";
import { primaryTelHref } from "@/data/site-config";
import { trackEvent, trackPhoneClick } from "@/lib/analytics";
import { useProductPurchase } from "@/components/shop/product-purchase-context";
import { ProductSlaLine } from "@/components/shop/product-sla-line";

type Props = {
  product: Product;
  categoryName?: string;
  categorySlug?: string;
};

const KEY_SPEC_LIMIT = 5;

function shortUsp(text: string, max = 180): string {
  const t = (text || "").replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  const cut = t.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > 80 ? cut.slice(0, lastSpace) : cut).trim()}…`;
}

/**
 * ProductVariantPanel — gallery + quy cách + CTA.
 * State quy cách lấy từ ProductPurchaseProvider (dùng chung bottom CTA / floating).
 */
export function ProductVariantPanel({ product, categoryName }: Props) {
  const {
    selectedOption,
    selectedOptionId,
    setSelectedOptionId,
    quoteHref,
  } = useProductPurchase();

  const hasVariants = product.packagingOptions.length > 0;
  const keySpecs = product.specs.slice(0, KEY_SPEC_LIMIT);
  const hasMoreSpecs = product.specs.length > KEY_SPEC_LIMIT;
  const usp = shortUsp(product.shortDescription || product.longDescription || "");

  const activeImageUrl = selectedOption?.variantImage ?? product.heroImage;

  const galleryImages = React.useMemo<GalleryItem[]>(() => {
    const seen = new Set<string>();
    const result: GalleryItem[] = [];
    const push = (item: GalleryItem | undefined) => {
      if (!item?.url || seen.has(item.url)) return;
      seen.add(item.url);
      result.push(item);
    };
    push({ url: product.heroImage, mimeType: "image/jpeg" });
    product.galleryImages.forEach(push);
    product.packagingOptions.forEach((opt) => {
      if (!opt.variantImage) return;
      push({ url: opt.variantImage, mimeType: "image/jpeg" });
    });
    return result;
  }, [product.heroImage, product.galleryImages, product.packagingOptions]);

  const activeIndex = React.useMemo(
    () => galleryImages.findIndex((item) => item.url === activeImageUrl),
    [galleryImages, activeImageUrl],
  );

  React.useEffect(() => {
    product.packagingOptions.forEach((opt) => {
      if (!opt.variantImage) return;
      const img = new window.Image();
      img.src = opt.variantImage;
    });
  }, [product.packagingOptions]);

  const msds = product.attachments?.find((a) => a.type === "msds");
  const catalogue = product.attachments?.find((a) => a.type === "catalogue");

  return (
    <div className="container-page relative z-10 grid gap-10 lg:grid-cols-12 lg:gap-12">
      <MotionWrapper delay={0.05} direction="up" className="lg:col-span-6">
        <div className="sticky top-28 z-10 overflow-hidden rounded-3xl shadow-ambient-lg hover-card-effect">
          <ProductGallery
            images={galleryImages}
            alt={product.name}
            activeIndex={activeIndex >= 0 ? activeIndex : undefined}
          />
        </div>
      </MotionWrapper>

      <div className="space-y-6 lg:col-span-6 lg:space-y-7">
        <MotionWrapper delay={0.1} direction="up" className="space-y-3">
          {categoryName ? <Chip variant="primary">{categoryName}</Chip> : null}
          <h1 className="text-3xl font-bold leading-tight text-text-primary md:text-4xl lg:text-[2.75rem]">
            {product.name}
          </h1>
          {usp ? (
            <p className="text-base leading-relaxed text-text-muted md:text-lg">
              {usp}{" "}
              {product.description ? (
                <a
                  href="#mo-ta-san-pham"
                  className="font-semibold text-primary-dark underline-offset-2 hover:underline"
                >
                  Xem mô tả chi tiết
                </a>
              ) : null}
            </p>
          ) : null}
        </MotionWrapper>

        {/* Key specs only — full technical content ở section dưới */}
        {keySpecs.length > 0 ? (
          <MotionWrapper delay={0.15} direction="up">
            <Card
              padding="md"
              className="space-y-3 rounded-2xl border-none shadow-ambient hover-card-effect"
            >
              {keySpecs.map((spec) => (
                <div
                  key={spec.label}
                  className="grid grid-cols-3 gap-3 border-b border-border-soft/60 pb-3 text-sm last:border-0 last:pb-0 md:text-base"
                >
                  <dt className="text-text-muted">{spec.label}</dt>
                  <dd className="col-span-2 font-semibold text-text-primary">
                    {spec.value}
                  </dd>
                </div>
              ))}
              {(hasMoreSpecs || product.composition) && (
                <a
                  href="#thong-so"
                  className="inline-flex text-sm font-semibold text-primary-dark underline-offset-2 hover:underline"
                >
                  Xem đầy đủ thông số & hướng dẫn
                </a>
              )}
            </Card>
          </MotionWrapper>
        ) : null}

        {hasVariants ? (
          <MotionWrapper delay={0.2} direction="up" className="space-y-3">
            <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-text-muted">
              <Package className="size-4" aria-hidden />
              Quy cách có sẵn
            </p>
            <div
              className="flex flex-wrap gap-2"
              role="group"
              aria-label="Chọn quy cách đóng gói"
            >
              {product.packagingOptions.map((opt) => {
                const isSelected = selectedOptionId === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => setSelectedOptionId(opt.id)}
                    className={cn(
                      "relative inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-semibold transition-all duration-200",
                      "border-border-soft bg-surface-light text-text-primary",
                      "hover:-translate-y-0.5 hover:border-primary/50 hover:bg-primary/5",
                      isSelected && [
                        "scale-[1.03] border-primary bg-primary/10 text-primary-dark",
                        "shadow-sm ring-2 ring-primary/30",
                      ],
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                    )}
                  >
                    {opt.variantImage ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={opt.variantImage}
                        alt=""
                        className="size-6 flex-none rounded border border-border-soft/40 bg-white object-contain"
                        aria-hidden
                      />
                    ) : null}
                    {opt.label}
                    {isSelected ? (
                      <span
                        className="size-1.5 flex-none rounded-full bg-primary"
                        aria-hidden
                      />
                    ) : null}
                  </button>
                );
              })}
            </div>
            {product.packaging ? (
              <p className="text-sm italic text-text-muted">{product.packaging}</p>
            ) : null}
          </MotionWrapper>
        ) : null}

        <MotionWrapper delay={0.25} direction="up" className="space-y-3 pt-1">
          <div className="flex flex-wrap gap-3">
            <Button
              href={primaryTelHref()}
              size="lg"
              className="h-14 px-8 text-base shadow-xl hover:-translate-y-1"
              onClick={() => trackPhoneClick(`product_hero:${product.name}`)}
            >
              <Phone className="size-5" aria-hidden />
              Gọi mua ngay
            </Button>
            <Button
              href={quoteHref}
              variant="outline"
              size="lg"
              className="h-14 bg-white/50 px-8 text-base backdrop-blur hover:-translate-y-1"
              onClick={() =>
                trackEvent("click_quote", {
                  event_category: "engagement",
                  event_label: `product_hero:${product.slug}`,
                  product_name: product.name,
                  variant: selectedOption?.label,
                })
              }
            >
              <Mail className="size-5" aria-hidden />
              {selectedOption
                ? `Báo giá: ${selectedOption.label}`
                : "Yêu cầu báo giá"}
            </Button>
          </div>
          <ProductSlaLine compact />
        </MotionWrapper>

        {(msds || catalogue) && (
          <MotionWrapper delay={0.28} direction="up" className="flex flex-wrap gap-3">
            {msds?.fileUrl ? (
              <a
                href={msds.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border-soft bg-white px-3 py-1.5 text-sm font-medium text-text-primary hover:border-primary/40 hover:text-primary-dark"
              >
                <FileText className="size-4" aria-hidden />
                {msds.label || "MSDS"}
              </a>
            ) : null}
            {catalogue?.fileUrl ? (
              <a
                href={catalogue.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border-soft bg-white px-3 py-1.5 text-sm font-medium text-text-primary hover:border-primary/40 hover:text-primary-dark"
              >
                <FileText className="size-4" aria-hidden />
                {catalogue.label || "Catalogue"}
              </a>
            ) : null}
          </MotionWrapper>
        )}

        <MotionWrapper
          delay={0.3}
          direction="up"
          className="flex items-start gap-4 rounded-2xl border border-border-soft/60 bg-surface-light p-5 shadow-inner hover-card-effect"
        >
          <ShieldCheck
            className="mt-0.5 size-7 flex-none text-primary-dark"
            aria-hidden
          />
          <p className="text-sm leading-relaxed text-text-muted md:text-base">
            <span className="font-bold text-text-primary">Sản phẩm chính hãng</span>{" "}
            – có CO/CQ và MSDS đầy đủ. Đổi trả trong 7 ngày nếu lỗi nhà sản xuất.
            Báo giá nhanh theo quy cách bạn chọn.
          </p>
        </MotionWrapper>

        {product.tags.length > 0 ? (
          <MotionWrapper delay={0.35} direction="up" className="flex flex-wrap gap-2">
            {product.tags.map((t) => (
              <Chip
                key={t}
                variant="neutral"
                className="transition-colors hover:bg-surface-container"
              >
                #{t}
              </Chip>
            ))}
          </MotionWrapper>
        ) : null}
      </div>
    </div>
  );
}
