import Script from "next/script";
import type { Metadata } from "next";
import { ProductGrid } from "@/components/shop/product-grid";
import { ProductSearchField } from "@/components/shop/product-search-field";
import { CatalogResults } from "@/components/shop/catalog-results";
import { ShopHeroSection } from "@/components/shop/shop-hero";
import { MotionWrapper } from "@/components/ui/motion-wrapper";
import { ShopTabs } from "@/components/shop/shop-tabs";
import { getAllCategories } from "@/data/categories";
import { getAllBrands } from "@/data/brands";
import { findProducts, getAllProducts } from "@/data/products";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/json-ld";
import {
  hasCatalogIntent,
  parseShopQuery,
} from "@/lib/shop-query";

// ISR: nội dung mới từ CMS hiện sau tối đa 5 phút, build không cần DB.
export const revalidate = 300;

type SearchParams = Record<string, string | string[] | undefined>;

const SHOP_DESCRIPTION =
  "Khám phá danh mục sản phẩm Oli Xanh: hóa chất và thiết bị kiểm soát côn trùng, mối, chuột từ các thương hiệu quốc tế. Tư vấn giải pháp an toàn, hướng tới tiêu chuẩn ESG.";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}): Promise<Metadata> {
  const sp = await searchParams;
  const query = parseShopQuery(sp);
  // URL tìm kiếm / filter thin → noindex, canonical về hub cửa hàng.
  const isSearchResult = Boolean(query.searchTerm);
  return buildMetadata({
    title: isSearchResult
      ? `Tìm kiếm: ${query.searchTerm}`
      : "Cửa Hàng – Toàn bộ sản phẩm Oli Xanh",
    description: SHOP_DESCRIPTION,
    path: "/cua-hang",
    noIndex: isSearchResult,
  });
}

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const sp = await searchParams;
  const query = parseShopQuery(sp);
  const catalogMode = hasCatalogIntent(query);

  const [categories, brands] = await Promise.all([
    getAllCategories(),
    getAllBrands(),
  ]);

  const categoryLabels = Object.fromEntries(
    categories.map((c) => [c.slug, c.shortName ?? c.name]),
  );
  const brandLabels = Object.fromEntries(brands.map((b) => [b.slug, b.name]));

  const categoryOptions = categories.map((c) => ({
    slug: c.slug,
    label: c.shortName ?? c.name,
  }));
  const brandOptions = brands.map((b) => ({
    slug: b.slug,
    label: b.name,
  }));

  if (catalogMode) {
    const result = await findProducts({
      q: query.q,
      categorySlug: query.categorySlug,
      brandSlug: query.brandSlug,
      page: query.page,
      pageSize: query.pageSize,
      sort: query.sort,
    });

    const heading = query.searchTerm
      ? "Kết quả tìm kiếm"
      : "Sản phẩm";

    return (
      <>
        <ShopHeroSection
          title="Cửa Hàng Oli Xanh"
          description="Tìm kiếm và lọc sản phẩm theo danh mục, hãng sản xuất."
          breadcrumb={[{ label: "Cửa hàng", href: "/cua-hang" }, { label: heading }]}
        />

        <section className="container-page py-12 md:py-16 relative">
          <CatalogResults
            query={query}
            products={result.products}
            totalDocs={result.totalDocs}
            totalPages={result.totalPages}
            categories={categoryOptions}
            brands={brandOptions}
            categoryLabel={
              query.categorySlug
                ? categoryLabels[query.categorySlug]
                : undefined
            }
            brandLabel={
              query.brandSlug ? brandLabels[query.brandSlug] : undefined
            }
            categoryLabels={categoryLabels}
            heading={heading}
          />
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

  const allProducts = await getAllProducts();
  const featured = allProducts.slice(0, 6);

  return (
    <>
      <ShopHeroSection
        title="Cửa Hàng Oli Xanh"
        description="Toàn bộ sản phẩm chính hãng từ các thương hiệu hàng đầu thế giới, được phân loại theo 8 danh mục chuyên biệt."
        breadcrumb={[{ label: "Cửa hàng" }]}
      />

      <section className="container-page pt-10 pb-4 md:pt-12 relative z-10">
        <MotionWrapper delay={0.05} direction="up" className="max-w-xl">
          <p className="text-primary-dark font-bold text-sm uppercase tracking-widest mb-3">
            Tìm sản phẩm
          </p>
          <ProductSearchField
            action="/cua-hang"
            placeholder="Nhập tên sản phẩm, mô tả hoặc thẻ…"
            ariaLabel="Tìm kiếm sản phẩm trong cửa hàng"
            id="shop-hub-search"
          />
        </MotionWrapper>
      </section>

      <section className="container-page py-16 md:py-24 relative overflow-hidden">
        <div className="bg-blob bg-blob-primary w-[300px] h-[300px] top-1/4 -right-20 opacity-20" />
        <MotionWrapper delay={0.1} direction="up" className="max-w-2xl mb-12 relative z-10">
          <p className="text-primary-dark font-bold text-sm uppercase tracking-widest mb-4">
            Danh mục & Hãng sản xuất
          </p>
          <h2 className="font-bold text-3xl md:text-4xl text-text-primary">
            Chọn danh mục phù hợp với nhu cầu của bạn
          </h2>
        </MotionWrapper>
        <div className="relative z-10">
          <ShopTabs categories={categories} brands={brands} />
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
