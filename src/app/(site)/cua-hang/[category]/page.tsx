import Script from "next/script";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/layout/page-header";
import { CategorySidebar } from "@/components/shop/category-sidebar";
import { CatalogResults } from "@/components/shop/catalog-results";
import { getCategoryBySlug } from "@/data/categories";
import { getAllBrands } from "@/data/brands";
import { findProducts } from "@/data/products";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/json-ld";
import { SITE_CONFIG } from "@/data/site-config";
import { parseShopQuery } from "@/lib/shop-query";

type Params = { category: string };
type SearchParams = Record<string, string | string[] | undefined>;

// ISR thay SSG: không cần DB lúc build; nội dung mới hiện sau tối đa 5 phút.
export const revalidate = 300;
export const dynamicParams = true;

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<Params>;
  searchParams: Promise<SearchParams>;
}): Promise<Metadata> {
  const { category } = await params;
  const sp = await searchParams;
  const cat = await getCategoryBySlug(category);
  if (!cat) return {};
  const query = parseShopQuery(sp, {
    categorySlug: cat.slug,
    basePath: `/cua-hang/${cat.slug}`,
  });
  const isSearchResult = Boolean(query.searchTerm);
  return buildMetadata({
    title: isSearchResult
      ? `${cat.name} – Tìm: ${query.searchTerm}`
      : `${cat.name} – Cửa Hàng`,
    description: cat.description,
    path: `/cua-hang/${cat.slug}`,
    noIndex: isSearchResult,
  });
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<Params>;
  searchParams: Promise<SearchParams>;
}) {
  const { category } = await params;
  const sp = await searchParams;
  const cat = await getCategoryBySlug(category);
  if (!cat) notFound();

  const pathScope = {
    categorySlug: cat.slug,
    basePath: `/cua-hang/${cat.slug}`,
  };
  const query = parseShopQuery(sp, pathScope);

  const [result, brands] = await Promise.all([
    findProducts({
      q: query.q,
      categorySlug: cat.slug,
      brandSlug: query.brandSlug,
      page: query.page,
      pageSize: query.pageSize,
      sort: query.sort,
    }),
    getAllBrands(),
  ]);

  const brandOptions = brands.map((b) => ({
    slug: b.slug,
    label: b.name,
  }));
  const brandLabels = Object.fromEntries(brands.map((b) => [b.slug, b.name]));

  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: cat.name,
    description: cat.description,
    itemListElement: result.products.map((p, idx) => ({
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
            <CategorySidebar
              activeSlug={cat.slug}
              className="lg:sticky lg:top-28"
            />
          </div>
          <div className="lg:col-span-9 space-y-10">
            <div>
              <h2 className="font-bold text-2xl text-text-primary mb-3">
                Tổng quan
              </h2>
              <p className="text-text-muted leading-relaxed">
                {cat.longDescription}
              </p>
            </div>

            <CatalogResults
              query={query}
              products={result.products}
              totalDocs={result.totalDocs}
              totalPages={result.totalPages}
              pathScope={pathScope}
              brands={brandOptions}
              brandLabel={
                query.brandSlug ? brandLabels[query.brandSlug] : undefined
              }
              productCategoryLabel={cat.shortName ?? cat.name}
              heading={`Sản phẩm trong danh mục`}
              emptyTitle="Không có sản phẩm trong phạm vi này"
              emptyDescription="Thử đổi từ khóa, hãng hoặc xóa bộ lọc để xem thêm sản phẩm trong danh mục."
            />
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
