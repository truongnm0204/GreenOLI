import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Chip } from "@/components/ui/chip";
import type { Product } from "@/types/product";
import { cn } from "@/lib/cn";
import { ArrowRight, ShieldCheck } from "lucide-react";

type Props = {
  product: Product;
  /** Nhãn danh mục hiển thị (chip). Truyền từ nơi gọi đã có category để tránh query lồng. */
  categoryLabel?: string;
  className?: string;
};

export function ProductCard({ product, categoryLabel, className }: Props) {
  return (
    <Card 
      padding="none" 
      className={cn(
        "group relative overflow-hidden transition-all duration-300 border border-border-soft/80 bg-white",
        "hover:shadow-[0_12px_40px_rgba(128,188,0,0.3)] hover:border-primary/60 hover:-translate-y-1.5",
        className
      )}
    >
      <Link
        href={`/san-pham/${product.slug}`}
        className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-card relative h-full flex flex-col"
      >
        <div className="relative aspect-[4/3] overflow-hidden rounded-t-card bg-surface-light">
          {/* Authentic Badge */}
          <div className="absolute top-3 right-3 z-10 bg-white/90 backdrop-blur-md text-primary-dark text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1 border border-primary/20">
            <ShieldCheck className="size-3.5 text-primary" />
            <span>Chính hãng</span>
          </div>

          <Image
            src={product.heroImage}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
            className="object-contain p-4 transition-transform duration-700 group-hover:scale-110 bg-white"
          />
          
          {/* Shimmer Light Sweep Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />

          {/* Slide-up View Overlay */}
          <div className="absolute inset-0 bg-primary-dark/25 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <span className="translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-75 bg-primary text-white font-bold px-5 py-2.5 rounded-full shadow-lg flex items-center gap-2 text-sm hover:bg-primary-dark">
              Xem chi tiết
              <ArrowRight className="size-4" />
            </span>
          </div>
        </div>
        <div className="p-5 flex-1 flex flex-col">
          <div className="mb-2.5">
            {categoryLabel ? (
              <Chip variant="primary" className="text-xs bg-primary/10 text-primary-dark border border-primary/20">{categoryLabel}</Chip>
            ) : null}
          </div>
          <h3 className="font-bold text-text-primary text-base line-clamp-2 min-h-[3rem] group-hover:text-primary-dark transition-colors leading-snug">
            {product.name}
          </h3>
          <p className="text-xs text-text-muted line-clamp-2 mt-2 flex-1 leading-relaxed">
            {product.shortDescription}
          </p>
        </div>
      </Link>
    </Card>
  );
}

