import Script from "next/script";
import type { Metadata } from "next";
import { CategoryCard } from "@/components/shop/category-card";
import { ProductGrid } from "@/components/shop/product-grid";
import { PageHeader } from "@/components/layout/page-header";
import { CATEGORIES } from "@/data/categories";
import { PRODUCTS } from "@/data/products";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/json-ld";

export const metadata: Metadata = buildMetadata({
  title: "Cửa Hàng – Toàn bộ sản phẩm Green Oli",
  description:
    "Khám phá 8 danh mục sản phẩm chính của Green Oli: phân bón lá, phân bón gốc, thuốc trừ bệnh, trừ cỏ, trừ sâu, chế phẩm sinh học, hóa chất nguyên liệu và hóa chất diệt côn trùng.",
  path: "/cua-hang",
});

export default function ShopPage() {
  const featured = PRODUCTS.slice(0, 6);
  return (
    <>
      <PageHeader
        title="Cửa Hàng Green Oli"
        description="Toàn bộ sản phẩm chính hãng từ các thương hiệu hàng đầu thế giới, được phân loại theo 8 danh mục chuyên biệt."
        breadcrumb={[{ label: "Cửa hàng" }]}
      />

      <section className="container-page py-14 md:py-16">
        <div className="max-w-2xl mb-10">
          <p className="text-primary-dark font-semibold text-sm uppercase tracking-wider mb-3">
            Danh mục sản phẩm
          </p>
          <h2 className="font-bold text-2xl md:text-3xl text-text-primary">
            Chọn danh mục phù hợp với nhu cầu của bạn
          </h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map((cat) => (
            <CategoryCard key={cat.slug} category={cat} />
          ))}
        </div>
      </section>

      <section className="bg-surface-light py-14 md:py-16">
        <div className="container-page">
          <div className="max-w-2xl mb-10">
            <p className="text-primary-dark font-semibold text-sm uppercase tracking-wider mb-3">
              Sản phẩm nổi bật
            </p>
            <h2 className="font-bold text-2xl md:text-3xl text-text-primary">
              Được tin dùng bởi 500+ khách hàng doanh nghiệp
            </h2>
          </div>
          <ProductGrid products={featured} />
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
