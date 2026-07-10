import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Chip } from "@/components/ui/chip";
import type { Product } from "@/types/product";
import { cn } from "@/lib/cn";


type Props = {
  product: Product;
  /** Nhãn danh mục hiển thị (chip). Truyền từ nơi gọi đã có category để tránh query lồng. */
  categoryLabel?: string;
  className?: string;
};

export function ProductCard({ product, categoryLabel, className }: Props) {
  return (
    <Card padding="none" className={cn("group overflow-hidden transition-all duration-300 hover:shadow-ambient-xl hover:border-primary/30", className)}>
      <Link
        href={`/san-pham/${product.slug}`}
        className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-card relative h-full flex flex-col"
      >
        <div className="relative aspect-[4/3] overflow-hidden rounded-t-card bg-surface-light">
          <Image
            src={product.heroImage}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
            className="object-contain transition-transform duration-700 group-hover:scale-110 bg-white"
          />
          {/* Slide-up View Overlay */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <span className="translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-100 bg-white text-primary-dark font-bold px-4 py-2 rounded-full shadow-lg">
              Xem chi tiết
            </span>
          </div>
        </div>
        <div className="p-5 flex-1 flex flex-col">
          <div className="mb-3">
            {categoryLabel ? (
              <Chip variant="primary">{categoryLabel}</Chip>
            ) : null}
          </div>
          <h3 className="font-semibold text-text-primary text-lg line-clamp-2 min-h-[3.5rem] group-hover:text-primary-dark transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-text-muted line-clamp-2 mt-2 flex-1">
            {product.shortDescription}
          </p>
        </div>
      </Link>
    </Card>
  );
}
