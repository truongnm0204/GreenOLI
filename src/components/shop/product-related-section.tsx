import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/shop/product-card";
import { MotionWrapper } from "@/components/ui/motion-wrapper";
import type { Product } from "@/types/product";

type Props = {
  products: Product[];
  categoryLabel?: string;
  categorySlug?: string;
  /** true nếu ưu tiên cùng brand (copy khác một chút) */
  sameBrandHint?: boolean;
};

/**
 * Khối SP hay đi kèm / cùng danh mục — dưới trang chi tiết.
 */
export function ProductRelatedSection({
  products,
  categoryLabel,
  categorySlug,
  sameBrandHint,
}: Props) {
  if (!products.length) return null;

  const title = sameBrandHint
    ? "Sản phẩm cùng thương hiệu / hay đi kèm"
    : "Sản phẩm cùng danh mục";
  const subtitle = sameBrandHint
    ? "Gợi ý thêm từ cùng hãng hoặc cùng nhóm giải pháp"
    : categoryLabel
      ? `Xem thêm trong ${categoryLabel}`
      : "Có thể bạn quan tâm";

  return (
    <section
      id="lien-quan"
      className="scroll-mt-28 border-t border-border-soft/50 py-12 md:py-16"
    >
      <div className="container-page">
        <MotionWrapper
          delay={0.05}
          direction="up"
          className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <h2 className="text-2xl font-bold text-text-primary md:text-3xl">
              {title}
            </h2>
            <p className="mt-1.5 text-sm text-text-muted md:text-base">
              {subtitle}
            </p>
          </div>
          {categorySlug ? (
            <Link
              href={`/cua-hang/${categorySlug}`}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-dark underline-offset-2 hover:underline"
            >
              Xem cả danh mục
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          ) : (
            <Link
              href="/cua-hang"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-dark underline-offset-2 hover:underline"
            >
              Về cửa hàng
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          )}
        </MotionWrapper>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p, idx) => (
            <MotionWrapper
              key={p.slug}
              delay={0.08 + idx * 0.05}
              direction="up"
            >
              <ProductCard product={p} categoryLabel={categoryLabel} />
            </MotionWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}
