import Script from "next/script";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/layout/page-header";
import { ProductVariantPanel } from "@/components/shop/product-variant-panel";
import { ProductSpecs } from "@/components/shop/product-specs";
import { ProductDescription } from "@/components/shop/product-description";
import { ProductBottomCta } from "@/components/shop/product-bottom-cta";
import { ProductAttachments } from "@/components/shop/product-attachments";
import { ProductSectionNav } from "@/components/shop/product-section-nav";
import { ProductVariantCompare } from "@/components/shop/product-variant-compare";
import { ProductRelatedSection } from "@/components/shop/product-related-section";
import { FloatingCTA } from "@/components/shop/floating-cta";
import { ProductPurchaseProvider } from "@/components/shop/product-purchase-context";
import { MotionWrapper } from "@/components/ui/motion-wrapper";
import {
  getProductBySlug,
  getRelatedProducts,
} from "@/data/products";
import { getCategoryBySlug } from "@/data/categories";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, productSchema } from "@/lib/json-ld";

type Params = { product: string };

export const revalidate = 300;
export const dynamicParams = true;

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { product: slug } = await params;
  const p = await getProductBySlug(slug);
  if (!p) return {};
  return buildMetadata({
    title: `${p.name} – Chi tiết sản phẩm`,
    description: p.shortDescription,
    path: `/san-pham/${p.slug}`,
    ogImage: p.heroImage,
  });
}

export default async function ProductPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { product: slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();
  const category = await getCategoryBySlug(product.category);
  const relatedResult = await getRelatedProducts(product.slug);
  const related = relatedResult.products;

  const hasDescription = Boolean(product.description);
  const hasDocs = (product.attachments ?? []).some((a) => a.fileUrl);
  const hasCompare = (product.packagingOptions ?? []).length >= 2;

  const sectionNav = [
    ...(hasDescription
      ? [{ id: "mo-ta-san-pham", label: "Mô tả" }]
      : []),
    { id: "thong-so", label: "Kỹ thuật" },
    ...(hasCompare ? [{ id: "quy-cach", label: "Quy cách" }] : []),
    ...(hasDocs ? [{ id: "tai-lieu", label: "Tài liệu" }] : []),
    { id: "bao-gia", label: "Báo giá" },
    ...(related.length > 0 ? [{ id: "lien-quan", label: "Liên quan" }] : []),
  ];

  return (
    <ProductPurchaseProvider product={product}>
      {/* Chỉ breadcrumb — H1 nằm ở hero, tránh trùng tên SP */}
      <PageHeader
        compact
        breadcrumb={[
          { label: "Cửa hàng", href: "/cua-hang" },
          ...(category
            ? [{ label: category.name, href: `/cua-hang/${category.slug}` }]
            : []),
          { label: product.name },
        ]}
      />

      {/* Hero */}
      <section className="relative overflow-hidden py-12 md:py-16 lg:py-20">
        <div className="bg-blob bg-blob-secondary -left-20 top-0 h-[400px] w-[400px] opacity-10" />
        <ProductVariantPanel
          product={product}
          categoryName={category?.name}
          categorySlug={category?.slug}
        />
      </section>

      <ProductSectionNav items={sectionNav} />

      {/* Mô tả trước (nội dung marketing) — dễ scan hơn kỹ thuật */}
      {hasDescription ? (
        <section
          id="mo-ta-san-pham"
          className="scroll-mt-28 border-t border-border-soft/60 bg-surface-container-lowest py-12 md:py-16"
        >
          <div className="container-page">
            <MotionWrapper delay={0.05} direction="up" className="mb-6 md:mb-8">
              <h2 className="text-2xl font-bold text-text-primary md:text-3xl">
                Mô tả sản phẩm
              </h2>
              <p className="mt-1.5 max-w-2xl text-sm text-text-muted md:text-base">
                Hình ảnh, video và nội dung giới thiệu chi tiết
              </p>
            </MotionWrapper>

            <MotionWrapper delay={0.1} direction="up">
              <div className="rounded-3xl border border-border-soft/60 bg-white px-4 py-6 shadow-sm sm:px-6 md:px-10 md:py-10 lg:px-12">
                <ProductDescription content={product.description!} />
              </div>
            </MotionWrapper>
          </div>
        </section>
      ) : null}

      {/* Kỹ thuật */}
      <section
        id="thong-so"
        className="relative scroll-mt-28 overflow-hidden bg-surface-light py-12 md:py-16"
      >
        <div className="bg-blob bg-blob-primary -right-40 top-0 h-[500px] w-[500px] opacity-10" />
        <div className="container-page relative z-10 space-y-8">
          <MotionWrapper delay={0.05} direction="up">
            <div className="max-w-3xl">
              <h2 className="text-2xl font-bold text-text-primary md:text-3xl">
                Thông số kỹ thuật & hướng dẫn
              </h2>
              <p className="mt-2 text-sm text-text-muted md:text-base">
                Thành phần, cách dùng và lưu ý an toàn — tham chiếu nhanh trước khi đặt hàng.
              </p>
            </div>
          </MotionWrapper>
          <MotionWrapper delay={0.1} direction="up">
            <ProductSpecs product={product} />
          </MotionWrapper>
        </div>
      </section>

      {/* So sánh quy cách */}
      {hasCompare ? (
        <section
          id="quy-cach"
          className="scroll-mt-28 border-t border-border-soft/60 py-12 md:py-16"
        >
          <div className="container-page">
            <MotionWrapper delay={0.05} direction="up">
              <ProductVariantCompare />
            </MotionWrapper>
          </div>
        </section>
      ) : null}

      {/* Tài liệu */}
      {hasDocs ? (
        <section
          id="tai-lieu"
          className="scroll-mt-28 border-t border-border-soft/60 py-12 md:py-16"
        >
          <div className="container-page">
            <MotionWrapper delay={0.05} direction="up">
              <ProductAttachments
                attachments={product.attachments}
                productName={product.name}
              />
            </MotionWrapper>
          </div>
        </section>
      ) : null}

      {/* CTA chốt — luôn có, giữ quy cách đang chọn */}
      <section
        id="bao-gia"
        className="scroll-mt-28 border-t border-border-soft/60 bg-surface-container-lowest py-12 md:py-16"
      >
        <div className="container-page">
          <MotionWrapper delay={0.05} direction="up">
            <ProductBottomCta />
          </MotionWrapper>
        </div>
      </section>

      <ProductRelatedSection
        products={related}
        categoryLabel={category?.name}
        categorySlug={category?.slug}
        sameBrandHint={relatedResult.hasSameBrand}
      />

      <Script
        id="ld-product"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productSchema(product)),
        }}
      />
      <Script
        id="ld-product-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Trang chủ", href: "/" },
              { name: "Cửa hàng", href: "/cua-hang" },
              ...(category
                ? [{ name: category.name, href: `/cua-hang/${category.slug}` }]
                : []),
              { name: product.name, href: `/san-pham/${product.slug}` },
            ]),
          ),
        }}
      />

      <FloatingCTA />
    </ProductPurchaseProvider>
  );
}
