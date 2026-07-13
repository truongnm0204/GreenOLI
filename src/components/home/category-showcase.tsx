import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CategoryCard } from "@/components/shop/category-card";
import { MotionWrapper } from "@/components/ui/motion-wrapper";
import { SectionHeader } from "@/components/ui/section-header";
import { getAllCategories } from "@/data/categories";

export async function CategoryShowcase() {
  const categories = await getAllCategories();
  return (
    <section className="relative bg-surface-container-low py-16 md:py-20 overflow-hidden">
      <div className="bg-blob bg-blob-secondary w-[400px] h-[400px] top-20 -right-20 opacity-30" />
      
      <div className="container-page relative z-10">
        <MotionWrapper
          delay={0.1} direction="up"
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-12"
        >
          <div className="max-w-2xl">
            <SectionHeader 
              eyebrow="Danh mục sản phẩm" 
              title="8 danh mục chuyên biệt cho nông nghiệp & y tế"
              align="left"
              className="mb-0 md:mb-0" // override default margin
            />
          </div>
          <Link
            href="/cua-hang"
            className="inline-flex items-center gap-2 text-primary-dark font-semibold hover:gap-3 transition-all"
          >
            Xem tất cả danh mục
            <ArrowRight className="size-5" aria-hidden />
          </Link>
        </MotionWrapper>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat, idx) => (
            <MotionWrapper key={cat.slug} delay={0.2 + Math.min(idx * 0.1, 0.6)} direction="up">
              <CategoryCard category={cat} />
            </MotionWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}

