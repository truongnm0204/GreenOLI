import Script from "next/script";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/layout/page-header";
import { CatalogResults } from "@/components/shop/catalog-results";
import { getBrandBySlug, getAllBrands } from "@/data/brands";
import { getAllCategories } from "@/data/categories";
import { findProducts } from "@/data/products";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/json-ld";
import { SITE_CONFIG } from "@/data/site-config";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { parseShopQuery } from "@/lib/shop-query";

type Params = { brand: string };
type SearchParams = Record<string, string | string[] | undefined>;

export const revalidate = 300;
export const dynamicParams = true;

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<Params>;
  searchParams: Promise<SearchParams>;
}): Promise<Metadata> {
  const { brand } = await params;
  const sp = await searchParams;
  const b = await getBrandBySlug(brand);
  if (!b) return {};
  const query = parseShopQuery(sp, {
    brandSlug: b.slug,
    basePath: `/cua-hang/hang/${b.slug}`,
  });
  const isSearchResult = Boolean(query.searchTerm);
  return buildMetadata({
    title: isSearchResult
      ? `${b.name} – Tìm: ${query.searchTerm}`
      : `${b.name} – Cửa Hàng`,
    description:
      b.description || b.tagline || `Khám phá các sản phẩm từ hãng ${b.name}`,
    path: `/cua-hang/hang/${b.slug}`,
    noIndex: isSearchResult,
  });
}

export default async function BrandPage({
  params,
  searchParams,
}: {
  params: Promise<Params>;
  searchParams: Promise<SearchParams>;
}) {
  const { brand } = await params;
  const sp = await searchParams;
  const b = await getBrandBySlug(brand);
  if (!b) notFound();

  const pathScope = {
    brandSlug: b.slug,
    basePath: `/cua-hang/hang/${b.slug}`,
  };
  const query = parseShopQuery(sp, pathScope);

  const [result, allBrands, categories] = await Promise.all([
    findProducts({
      q: query.q,
      brandSlug: b.slug,
      categorySlug: query.categorySlug,
      page: query.page,
      pageSize: query.pageSize,
      sort: query.sort,
    }),
    getAllBrands(),
    getAllCategories(),
  ]);

  const categoryOptions = categories.map((c) => ({
    slug: c.slug,
    label: c.shortName ?? c.name,
  }));
  const categoryLabels = Object.fromEntries(
    categories.map((c) => [c.slug, c.shortName ?? c.name]),
  );

  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: b.name,
    description: b.description,
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
        title={b.name}
        description={b.tagline || `Sản phẩm chính hãng từ ${b.name}`}
        breadcrumb={[
          { label: "Cửa hàng", href: "/cua-hang" },
          { label: b.name },
        ]}
      />

      <section className="container-page py-12 md:py-16">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <div className="lg:sticky lg:top-28">
              <h3 className="font-semibold text-lg text-text-primary mb-4 border-b border-border-soft pb-2">
                Các hãng sản xuất
              </h3>
              <ul className="space-y-2">
                {allBrands.map((item) => (
                  <li key={item.slug}>
                    <Link
                      href={`/cua-hang/hang/${item.slug}`}
                      className={cn(
                        "block px-3 py-2 rounded-md transition-colors text-sm",
                        item.slug === b.slug
                          ? "bg-primary/10 text-primary-dark font-medium"
                          : "text-text-muted hover:bg-surface-light hover:text-text-primary",
                      )}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="lg:col-span-9 space-y-10">
            {b.description && (
              <div>
                <h2 className="font-bold text-2xl text-text-primary mb-3">
                  Tổng quan
                </h2>
                <p className="text-text-muted leading-relaxed">
                  {b.description}
                </p>
              </div>
            )}

            <CatalogResults
              query={query}
              products={result.products}
              totalDocs={result.totalDocs}
              totalPages={result.totalPages}
              pathScope={pathScope}
              categories={categoryOptions}
              categoryLabel={
                query.categorySlug
                  ? categoryLabels[query.categorySlug]
                  : undefined
              }
              categoryLabels={categoryLabels}
              heading="Sản phẩm của hãng"
              emptyTitle="Không có sản phẩm trong phạm vi này"
              emptyDescription="Thử đổi từ khóa, danh mục hoặc xóa bộ lọc để xem thêm sản phẩm của hãng."
            />
          </div>
        </div>
      </section>

      <Script
        id="ld-brand-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Trang chủ", href: "/" },
              { name: "Cửa hàng", href: "/cua-hang" },
              { name: b.name, href: `/cua-hang/hang/${b.slug}` },
            ]),
          ),
        }}
      />
      <Script
        id="ld-brand-itemlist"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }}
      />
    </>
  );
}
