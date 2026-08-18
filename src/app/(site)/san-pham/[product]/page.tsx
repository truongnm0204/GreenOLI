import Script from "next/script";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/layout/page-header";
import { ProductVariantPanel } from "@/components/shop/product-variant-panel";
import { ProductSpecs } from "@/components/shop/product-specs";
import { ProductDescription } from "@/components/shop/product-description";
import { ProductCard } from "@/components/shop/product-card";
import { FloatingCTA } from "@/components/shop/floating-cta";
import { MotionWrapper } from "@/components/ui/motion-wrapper";
import { AnimatedText } from "@/components/motion/animated-text";
import {
  getProductBySlug,
  getRelatedProducts,
} from "@/data/products";
import { getCategoryBySlug } from "@/data/categories";
import { SITE_CONFIG } from "@/data/site-config";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, productSchema } from "@/lib/json-ld";

type Params = { product: string };

// ISR thay SSG: build không cần DB; sản phẩm mới hiện sau tối đa 5 phút.
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
  const related = await getRelatedProducts(product.slug);

  return (
    <>
      <PageHeader
        title={product.name}
        breadcrumb={[
          { label: "Cửa hàng", href: "/cua-hang" },
          ...(category
            ? [{ label: category.name, href: `/cua-hang/${category.slug}` }]
            : []),
          { label: product.name },
        ]}
      />

      {/* Hero section — client island: gallery + variant chips + CTA */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="bg-blob bg-blob-secondary w-[400px] h-[400px] top-0 -left-20 opacity-10" />
        <ProductVariantPanel
          product={product}
          categoryName={category?.name}
          categorySlug={category?.slug}
        />
      </section>

      {/* Thông số kỹ thuật & hướng dẫn — server component */}
      <section className="bg-surface-light py-16 md:py-24 relative overflow-hidden">
        <div className="bg-blob bg-blob-primary w-[500px] h-[500px] top-0 -right-40 opacity-10" />
        <div className="container-page space-y-10 relative z-10">
          <MotionWrapper delay={0.1} direction="up">
            <h2 className="font-bold text-3xl md:text-4xl text-text-primary text-center">
              <AnimatedText text="Thông số kỹ thuật & hướng dẫn" />
            </h2>
          </MotionWrapper>
          <MotionWrapper delay={0.3} direction="up">
            <ProductSpecs product={product} />
          </MotionWrapper>
        </div>
      </section>

      {/* Mô tả / bài giới thiệu — layout rộng kiểu trang catalog (Shopee-like) */}
      {product.description && (
        <section className="border-t border-border-soft/60 bg-surface-container-lowest py-14 md:py-20">
          <div className="container-page">
            <MotionWrapper delay={0.1} direction="up" className="mb-8 md:mb-10">
              <h2 className="font-bold text-3xl md:text-4xl text-text-primary">
                <AnimatedText text="Mô tả sản phẩm" />
              </h2>
              <p className="mt-2 max-w-2xl text-sm md:text-base text-text-muted">
                Chi tiết, hình ảnh và video giới thiệu sản phẩm
              </p>
            </MotionWrapper>
            <MotionWrapper delay={0.25} direction="up">
              <div className="mx-auto max-w-4xl rounded-3xl border border-border-soft/70 bg-white px-4 py-8 shadow-sm sm:px-8 md:px-12 md:py-12">
                <ProductDescription content={product.description} />
              </div>
            </MotionWrapper>
          </div>
        </section>
      )}

      {related.length > 0 ? (
        <section className="container-page py-16 md:py-24">
          <MotionWrapper delay={0.1} direction="up" className="mb-12">
            <h2 className="font-bold text-3xl md:text-4xl text-text-primary">
              <AnimatedText text="Sản phẩm cùng danh mục" />
            </h2>
          </MotionWrapper>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p, idx) => (
              <MotionWrapper key={p.slug} delay={0.2 + idx * 0.1} direction="up">
                <ProductCard
                  product={p}
                  categoryLabel={category?.name}
                />
              </MotionWrapper>
            ))}
          </div>
        </section>
      ) : null}

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
      <FloatingCTA
        productName={product.name}
        contactHref={`/lien-he?${new URLSearchParams({
          product: product.slug,
          name: product.name,
        }).toString()}`}
      />
    </>
  );
}
