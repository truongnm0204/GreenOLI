import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CategoryCard } from "@/components/shop/category-card";
import { Reveal } from "@/components/motion/reveal";
import { getAllCategories } from "@/data/categories";

export async function CategoryShowcase() {
  const categories = await getAllCategories();
  return (
    <section className="bg-surface-container-low py-16 md:py-20">
      <div className="container-page">
        <Reveal
          as="div"
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-12"
        >
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
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat, idx) => (
            <Reveal key={cat.slug} as="div" delay={Math.min(idx * 60, 600)}>
              <CategoryCard category={cat} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
