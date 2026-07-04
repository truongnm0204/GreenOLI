import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Chip } from "@/components/ui/chip";
import type { Product } from "@/types/product";

type Props = {
  product: Product;
  /** Nhãn danh mục hiển thị (chip). Truyền từ nơi gọi đã có category để tránh query lồng. */
  categoryLabel?: string;
  className?: string;
};

export function ProductCard({ product, categoryLabel, className }: Props) {
  return (
    <Card padding="none" className={className}>
      <Link
        href={`/san-pham/${product.slug}`}
        className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-card"
      >
        <div className="relative aspect-[4/3] overflow-hidden rounded-t-card bg-surface-light">
          <Image
            src={product.heroImage}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="p-5 space-y-3">
          {categoryLabel ? (
            <Chip variant="primary">{categoryLabel}</Chip>
          ) : null}
          <h3 className="font-semibold text-text-primary text-lg line-clamp-2 min-h-[3.5rem]">
            {product.name}
          </h3>
          <p className="text-sm text-text-muted line-clamp-2">
            {product.shortDescription}
          </p>
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-dark">
            Xem chi tiết
            <ArrowRight className="size-4" aria-hidden />
          </span>
        </div>
      </Link>
    </Card>
  );
}
