import Script from "next/script";
import type { Metadata } from "next";
import { CategoryCard } from "@/components/shop/category-card";
import { ProductGrid } from "@/components/shop/product-grid";
import { ShopHeroSection } from "@/components/shop/shop-hero";
import { MotionWrapper } from "@/components/ui/motion-wrapper";
import { getAllCategories } from "@/data/categories";
import { getAllProducts } from "@/data/products";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/json-ld";

// ISR: nội dung mới từ CMS hiện sau tối đa 5 phút, build không cần DB.
export const revalidate = 300;

export const metadata: Metadata = buildMetadata({
  title: "Cửa Hàng – Toàn bộ sản phẩm Oli Xanh",
  description:
    "Khám phá 8 danh mục sản phẩm chính của Oli Xanh: phân bón lá, phân bón gốc, thuốc trừ bệnh, trừ cỏ, trừ sâu, chế phẩm sinh học, hóa chất nguyên liệu và hóa chất diệt côn trùng.",
  path: "/cua-hang",
});

export default async function ShopPage() {
  const [categories, allProducts] = await Promise.all([
    getAllCategories(),
    getAllProducts(),
  ]);
  const featured = allProducts.slice(0, 6);
  const categoryLabels = Object.fromEntries(
    categories.map((c) => [c.slug, c.shortName ?? c.name]),
  );
  return (
    <>
      <ShopHeroSection
        title="Cửa Hàng Oli Xanh"
        description="Toàn bộ sản phẩm chính hãng từ các thương hiệu hàng đầu thế giới, được phân loại theo 8 danh mục chuyên biệt."
        breadcrumb={[{ label: "Cửa hàng" }]}
      />

      <section className="container-page py-16 md:py-24 relative overflow-hidden">
        <div className="bg-blob bg-blob-primary w-[300px] h-[300px] top-1/4 -right-20 opacity-20" />
        <MotionWrapper delay={0.1} direction="up" className="max-w-2xl mb-12 relative z-10">
          <p className="text-primary-dark font-bold text-sm uppercase tracking-widest mb-4">
            Danh mục sản phẩm
          </p>
          <h2 className="font-bold text-3xl md:text-4xl text-text-primary">
            Chọn danh mục phù hợp với nhu cầu của bạn
          </h2>
        </MotionWrapper>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 relative z-10">
          {categories.map((cat, idx) => (
            <MotionWrapper key={cat.slug} delay={0.2 + idx * 0.1} direction="up">
              <CategoryCard category={cat} />
            </MotionWrapper>
          ))}
        </div>
      </section>

      <section className="bg-surface-light py-16 md:py-24 relative overflow-hidden">
        <div className="bg-blob bg-blob-secondary w-[400px] h-[400px] top-0 -left-32 opacity-10" />
        <div className="container-page relative z-10">
          <MotionWrapper delay={0.1} direction="up" className="max-w-2xl mb-12">
            <p className="text-primary-dark font-bold text-sm uppercase tracking-widest mb-4">
              Sản phẩm nổi bật
            </p>
            <h2 className="font-bold text-3xl md:text-4xl text-text-primary">
              Được tin dùng bởi 500+ khách hàng doanh nghiệp
            </h2>
          </MotionWrapper>
          <MotionWrapper delay={0.3} direction="up">
            <ProductGrid products={featured} categoryLabels={categoryLabels} />
          </MotionWrapper>
        </div>
      </section>

      <Script
        id="ld-shop-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Trang chủ", href: "/" },
              { name: "Cửa hàng", href: "/cua-hang" },
            ]),
          ),
        }}
      />
    </>
  );
}

