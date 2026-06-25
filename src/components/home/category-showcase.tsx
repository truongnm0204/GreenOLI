import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CategoryCard } from "@/components/shop/category-card";
import { CATEGORIES } from "@/data/categories";

export function CategoryShowcase() {
  return (
    <section className="bg-surface-container-low py-16 md:py-20">
      <div className="container-page">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-12">
          <div className="max-w-2xl">
            <p className="text-primary-dark font-semibold text-sm uppercase tracking-wider mb-3">
              Danh mục sản phẩm
            </p>
            <h2 className="font-bold text-3xl md:text-4xl text-text-primary leading-tight">
              8 danh mục chuyên biệt cho nông nghiệp & y tế
            </h2>
          </div>
          <Link
            href="/cua-hang"
            className="inline-flex items-center gap-2 text-primary-dark font-semibold hover:gap-3 transition-all"
          >
            Xem tất cả danh mục
            <ArrowRight className="size-5" aria-hidden />
          </Link>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map((cat) => (
            <CategoryCard key={cat.slug} category={cat} />
          ))}
        </div>
      </div>
    </section>
  );
}
