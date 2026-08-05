"use client";

import * as React from "react";
import { Phone, Mail, ShieldCheck, Package } from "lucide-react";
import { ProductGallery } from "@/components/shop/product-gallery";
import { Button } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import { Card } from "@/components/ui/card";
import { MotionWrapper } from "@/components/ui/motion-wrapper";
import { AnimatedText } from "@/components/motion/animated-text";
import { cn } from "@/lib/cn";
import type { Product, PackagingOption, GalleryItem } from "@/types/product";
import { SITE_CONFIG } from "@/data/site-config";

type Props = {
  product: Product;
  categoryName?: string;
  categorySlug?: string;
};

/**
 * ProductVariantPanel — client island.
 * Quản lý state: variant đang chọn + ảnh tương ứng.
 * Gallery và variant là 2 state độc lập:
 *   - Click chip → gallery đổi ảnh
 *   - Vuốt gallery → chip KHÔNG thay đổi
 */
export function ProductVariantPanel({
  product,
  categoryName,
}: Props) {
  const hasVariants = product.packagingOptions.length > 0;

  // Mặc định chọn option đầu tiên (như Shopee)
  const [selectedOptionId, setSelectedOptionId] = React.useState<string | null>(
    product.packagingOptions[0]?.id ?? null,
  );

  const selectedOption: PackagingOption | null =
    product.packagingOptions.find((o) => o.id === selectedOptionId) ?? null;

  // activeImage URL: variantImage nếu có, fallback về heroImage
  const activeImageUrl = selectedOption?.variantImage ?? product.heroImage;

  // Gallery: hero + gallery + các variantImage còn thiếu (dedupe theo URL).
  // Mỗi quy cách có ảnh riêng đều cần nằm trong gallery để scroll tới được.
  const galleryImages = React.useMemo<GalleryItem[]>(() => {
    const seen = new Set<string>();
    const result: GalleryItem[] = [];
    const push = (item: GalleryItem | undefined) => {
      if (!item || !item.url || seen.has(item.url)) return;
      seen.add(item.url);
      result.push(item);
    };
    push({ url: product.heroImage, mimeType: "image/jpeg" });
    product.galleryImages.forEach(push);
    // Ảnh riêng của từng quy cách → thêm cuối gallery
    product.packagingOptions.forEach((opt) => {
      if (!opt.variantImage) return;
      push({ url: opt.variantImage, mimeType: "image/jpeg" });
    });
    return result;
  }, [product.heroImage, product.galleryImages, product.packagingOptions]);

  // Index active trong gallery để scroll đến đúng vị trí
  const activeIndex = React.useMemo(
    () => galleryImages.findIndex((item) => item.url === activeImageUrl),
    [galleryImages, activeImageUrl],
  );

  // Preload các variantImage là ảnh (bỏ qua video)
  React.useEffect(() => {
    product.packagingOptions.forEach((opt) => {
      if (!opt.variantImage) return;
      const img = new window.Image();
      img.src = opt.variantImage;
    });
  }, [product.packagingOptions]);

  // URL yêu cầu báo giá kèm thông tin variant đang chọn
  const quoteHref = selectedOption
    ? `/lien-he?product=${encodeURIComponent(product.slug)}&variant=${encodeURIComponent(selectedOption.id)}&qc=${encodeURIComponent(selectedOption.label)}`
    : `/lien-he?product=${encodeURIComponent(product.slug)}`;

  return (
    <div className="container-page grid gap-12 lg:grid-cols-12 relative z-10">
      {/* Gallery — nhận activeIndex để scroll đến ảnh variant */}
      <MotionWrapper delay={0.1} direction="up" className="lg:col-span-6">
        <div className="sticky top-28 z-10 shadow-ambient-lg rounded-3xl overflow-hidden hover-card-effect">
          <ProductGallery
            images={galleryImages}
            alt={product.name}
            activeIndex={activeIndex >= 0 ? activeIndex : undefined}
          />
        </div>
      </MotionWrapper>

      {/* Info panel */}
      <div className="lg:col-span-6 space-y-8">
        <MotionWrapper delay={0.2} direction="up" className="space-y-4">
          {categoryName ? (
            <Chip variant="primary">{categoryName}</Chip>
          ) : null}
          <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl text-text-primary leading-tight">
            <AnimatedText text={product.name} />
          </h1>
          <p className="text-text-muted text-lg md:text-xl leading-relaxed font-medium">
            {product.longDescription}
          </p>
        </MotionWrapper>

        {/* Thông số specs */}
        <MotionWrapper delay={0.4} direction="up">
          <Card padding="md" className="space-y-4 rounded-2xl shadow-ambient hover-card-effect border-none">
            {product.specs.map((spec) => (
              <div
                key={spec.label}
                className="grid grid-cols-3 gap-4 text-base border-b border-border-soft/60 pb-4 last:border-0 last:pb-0"
              >
                <dt className="text-text-muted">{spec.label}</dt>
                <dd className="col-span-2 font-bold text-text-primary">
                  {spec.value}
                </dd>
              </div>
            ))}
          </Card>
        </MotionWrapper>

        {/* Variant selector — chips quy cách */}
        {hasVariants && (
          <MotionWrapper delay={0.45} direction="up" className="space-y-3">
            <p className="text-sm font-semibold text-text-muted uppercase tracking-wide flex items-center gap-2">
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
                      // Base
                      "relative inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-semibold transition-all duration-200",
                      // Default
                      "border-border-soft bg-surface-light text-text-primary",
                      // Hover
                      "hover:border-primary/50 hover:bg-primary/5 hover:-translate-y-0.5",
                      // Selected
                      isSelected && [
                        "border-primary bg-primary/10 text-primary-dark",
                        "ring-2 ring-primary/30 shadow-sm scale-[1.03]",
                      ],
                      // Focus keyboard
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                    )}
                  >
                    {/* Mini thumbnail nếu có variantImage */}
                    {opt.variantImage && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={opt.variantImage}
                        alt={opt.label}
                        className="size-6 rounded object-contain bg-white border border-border-soft/40 flex-none"
                        aria-hidden
                      />
                    )}
                    {opt.label}
                    {isSelected && (
                      <span className="size-1.5 rounded-full bg-primary flex-none" aria-hidden />
                    )}
                  </button>
                );
              })}
            </div>
            {/* Ghi chú phụ nếu có */}
            {product.packaging && (
              <p className="text-sm text-text-muted italic">{product.packaging}</p>
            )}
          </MotionWrapper>
        )}

        {/* CTA buttons */}
        <MotionWrapper delay={0.5} direction="up" className="flex flex-wrap gap-4 pt-4">
          <Button
            href={`tel:${SITE_CONFIG.hotline.replace(/\s/g, "")}`}
            size="lg"
            className="h-14 px-8 text-base shadow-xl hover:-translate-y-1"
          >
            <Phone className="size-5" aria-hidden />
            Gọi mua ngay
          </Button>
          <Button
            href={quoteHref}
            variant="outline"
            size="lg"
            className="h-14 px-8 text-base bg-white/50 backdrop-blur hover:-translate-y-1"
          >
            <Mail className="size-5" aria-hidden />
            {selectedOption ? `Báo giá: ${selectedOption.label}` : "Yêu cầu báo giá"}
          </Button>
        </MotionWrapper>

        {/* Badge chính hãng */}
        <MotionWrapper delay={0.6} direction="up" className="flex items-start gap-4 rounded-2xl bg-surface-light p-6 border border-border-soft/60 shadow-inner hover-card-effect">
          <ShieldCheck className="size-8 text-primary-dark flex-none mt-1" aria-hidden />
          <p className="text-base text-text-muted leading-relaxed">
            <span className="font-bold text-text-primary">Sản phẩm chính hãng</span> – có CO/CQ và MSDS đầy đủ. Đổi trả trong 7 ngày
            nếu phát hiện lỗi từ nhà sản xuất.
          </p>
        </MotionWrapper>

        {/* Tags */}
        {product.tags.length > 0 ? (
          <MotionWrapper delay={0.7} direction="up" className="flex flex-wrap gap-2 pt-4">
            {product.tags.map((t) => (
              <Chip key={t} variant="neutral" className="hover:bg-surface-container transition-colors">
                #{t}
              </Chip>
            ))}
          </MotionWrapper>
        ) : null}
      </div>
    </div>
  );
}
