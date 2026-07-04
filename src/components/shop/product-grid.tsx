import { ProductCard } from "@/components/shop/product-card";
import type { Product } from "@/types/product";
import { cn } from "@/lib/cn";

type Props = {
  products: Product[];
  /** Nhãn danh mục chung cho mọi card (khi cả lưới cùng 1 danh mục). */
  categoryLabel?: string;
  /** Map slug danh mục → nhãn hiển thị (khi lưới trộn nhiều danh mục). */
  categoryLabels?: Record<string, string>;
  className?: string;
};

export function ProductGrid({
  products,
  categoryLabel,
  categoryLabels,
  className,
}: Props) {
  if (products.length === 0) {
    return (
      <div className="rounded-card border border-dashed border-border-soft p-10 text-center text-text-muted">
        Chưa có sản phẩm trong danh mục này.
      </div>
    );
  }

  return (
    <div
      className={cn(
        "grid gap-5 sm:grid-cols-2 lg:grid-cols-3",
        className,
      )}
    >
      {products.map((p) => (
        <ProductCard
          key={p.slug}
          product={p}
          categoryLabel={categoryLabel ?? categoryLabels?.[p.category]}
        />
      ))}
    </div>
  );
}
