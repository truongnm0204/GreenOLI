import Script from "next/script";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Phone, Mail, ShieldCheck } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { ProductGallery } from "@/components/shop/product-gallery";
import { ProductSpecs } from "@/components/shop/product-specs";
import { ProductCard } from "@/components/shop/product-card";
import { FloatingCTA } from "@/components/shop/floating-cta";
import { Button } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import { Card } from "@/components/ui/card";
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
  const images = [product.heroImage, ...product.galleryImages];

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

      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="bg-blob bg-blob-secondary w-[400px] h-[400px] top-0 -left-20 opacity-10" />
        <div className="container-page grid gap-12 lg:grid-cols-12 relative z-10">
          <MotionWrapper delay={0.1} direction="up" className="lg:col-span-6">
            <div className="sticky top-28 z-10 shadow-ambient-lg rounded-3xl overflow-hidden hover-card-effect">
              <ProductGallery images={images} alt={product.name} />
            </div>
          </MotionWrapper>
          <div className="lg:col-span-6 space-y-8">
            <MotionWrapper delay={0.2} direction="up" className="space-y-4">
              {category ? (
                <Chip variant="primary">{category.name}</Chip>
              ) : null}
              <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl text-text-primary leading-tight">
                <AnimatedText text={product.name} />
              </h1>
              <p className="text-text-muted text-lg md:text-xl leading-relaxed font-medium">
                {product.longDescription}
              </p>
            </MotionWrapper>

            <MotionWrapper delay={0.4} direction="up">
              <Card padding="md" className="space-y-4 rounded-2xl shadow-ambient hover-card-effect border-none">
                {product.specs.map((spec) => (
                  <div
                    key={spec.label}
                    className="grid grid-cols-3 gap-4 text-base border-b border-border-soft/60 pb-4 last:border-0 last:pb-0"
                  >
                    <dt className="text-text-muted">{spec.label}</dt>
                    <dd className="col-span-2 font-bold text-text-primary">
                      {spec.value}
                    </dd>
                  </div>
                ))}
              </Card>
            </MotionWrapper>

            <MotionWrapper delay={0.5} direction="up" className="flex flex-wrap gap-4 pt-4">
              <Button
                href={`tel:${SITE_CONFIG.hotline.replace(/\s/g, "")}`}
                size="lg"
                className="h-14 px-8 text-base shadow-xl hover:-translate-y-1"
              >
                <Phone className="size-5" aria-hidden />
                Gọi mua ngay
              </Button>
              <Button href="/lien-he" variant="outline" size="lg" className="h-14 px-8 text-base bg-white/50 backdrop-blur hover:-translate-y-1">
                <Mail className="size-5" aria-hidden />
                Yêu cầu báo giá
              </Button>
            </MotionWrapper>

            <MotionWrapper delay={0.6} direction="up" className="flex items-start gap-4 rounded-2xl bg-surface-light p-6 border border-border-soft/60 shadow-inner hover-card-effect">
              <ShieldCheck className="size-8 text-primary-dark flex-none mt-1" aria-hidden />
              <p className="text-base text-text-muted leading-relaxed">
                <span className="font-bold text-text-primary">Sản phẩm chính hãng</span> – có CO/CQ và MSDS đầy đủ. Đổi trả trong 7 ngày
                nếu phát hiện lỗi từ nhà sản xuất.
              </p>
            </MotionWrapper>

            {product.tags.length > 0 ? (
              <MotionWrapper delay={0.7} direction="up" className="flex flex-wrap gap-2 pt-4">
                {product.tags.map((t) => (
                  <Chip key={t} variant="neutral" className="hover:bg-surface-container transition-colors">
                    #{t}
                  </Chip>
                ))}
              </MotionWrapper>
            ) : null}
          </div>
        </div>
      </section>

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
      <FloatingCTA productName={product.name} />
    </>
  );
}

