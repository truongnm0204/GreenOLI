import Script from "next/script";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/layout/page-header";
import { CategorySidebar } from "@/components/shop/category-sidebar";
import { ProductGrid } from "@/components/shop/product-grid";
import { getCategoryBySlug } from "@/data/categories";
import { getProductsByCategory } from "@/data/products";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/json-ld";
import { SITE_CONFIG } from "@/data/site-config";

type Params = { category: string };

// ISR thay SSG: không cần DB lúc build; nội dung mới hiện sau tối đa 5 phút.
export const revalidate = 300;
export const dynamicParams = true;

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { category } = await params;
  const cat = await getCategoryBySlug(category);
  if (!cat) return {};
  return buildMetadata({
    title: `${cat.name} – Cửa Hàng`,
    description: cat.description,
    path: `/cua-hang/${cat.slug}`,
  });
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { category } = await params;
  const cat = await getCategoryBySlug(category);
  if (!cat) notFound();

  const products = await getProductsByCategory(cat.slug);

  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: cat.name,
    description: cat.description,
    itemListElement: products.map((p, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      url: `${SITE_CONFIG.url}/san-pham/${p.slug}`,
      name: p.name,
    })),
  };

  return (
    <>
      <PageHeader
        title={cat.name}
        description={cat.tagline}
        breadcrumb={[
          { label: "Cửa hàng", href: "/cua-hang" },
          { label: cat.name },
        ]}
      />

      <section className="container-page py-12 md:py-16">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <CategorySidebar activeSlug={cat.slug} className="lg:sticky lg:top-28" />
          </div>
          <div className="lg:col-span-9 space-y-10">
            <div>
              <h2 className="font-bold text-2xl text-text-primary mb-3">
                Tổng quan
              </h2>
              <p className="text-text-muted leading-relaxed">{cat.longDescription}</p>
            </div>

            <div>
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-bold text-2xl text-text-primary">
                  Sản phẩm trong danh mục ({products.length})
                </h2>
              </div>
              <ProductGrid
                products={products}
                categoryLabel={cat.shortName ?? cat.name}
              />
            </div>
          </div>
        </div>
      </section>

      <Script
        id="ld-category-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Trang chủ", href: "/" },
              { name: "Cửa hàng", href: "/cua-hang" },
              { name: cat.name, href: `/cua-hang/${cat.slug}` },
            ]),
          ),
        }}
      />
      <Script
        id="ld-category-itemlist"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }}
      />
    </>
  );
}
