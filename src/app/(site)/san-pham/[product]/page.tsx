import Script from "next/script";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Phone, Mail, ShieldCheck } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { ProductGallery } from "@/components/shop/product-gallery";
import { ProductSpecs } from "@/components/shop/product-specs";
import { ProductCard } from "@/components/shop/product-card";
import { Button } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import { Card } from "@/components/ui/card";
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

      <section className="container-page py-12 md:py-16">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <ProductGallery images={images} alt={product.name} />
          </div>
          <div className="lg:col-span-6 space-y-5">
            {category ? (
              <Chip variant="primary">{category.name}</Chip>
            ) : null}
            <h1 className="font-bold text-3xl md:text-4xl text-text-primary leading-tight">
              {product.name}
            </h1>
            <p className="text-text-muted text-base md:text-lg leading-relaxed">
              {product.longDescription}
            </p>

            <Card padding="md" className="space-y-2.5">
              {product.specs.map((spec) => (
                <div
                  key={spec.label}
                  className="grid grid-cols-3 gap-3 text-sm border-b border-border-soft/60 pb-2 last:border-0 last:pb-0"
                >
                  <dt className="text-text-muted">{spec.label}</dt>
                  <dd className="col-span-2 font-medium text-text-primary">
                    {spec.value}
                  </dd>
                </div>
              ))}
            </Card>

            <div className="flex flex-wrap gap-3 pt-2">
              <Button
                href={`tel:${SITE_CONFIG.hotline.replace(/\s/g, "")}`}
                size="lg"
              >
                <Phone className="size-5" aria-hidden />
                Gọi mua ngay
              </Button>
              <Button href="/lien-he" variant="outline" size="lg">
                <Mail className="size-5" aria-hidden />
                Yêu cầu báo giá
              </Button>
            </div>

            <div className="flex items-center gap-3 rounded-card bg-surface-light p-4 border border-border-soft/60">
              <ShieldCheck className="size-6 text-primary-dark flex-none" aria-hidden />
              <p className="text-sm text-text-muted">
                Sản phẩm chính hãng – có CO/CQ và MSDS đầy đủ. Đổi trả trong 7 ngày
                nếu phát hiện lỗi từ nhà sản xuất.
              </p>
            </div>

            {product.tags.length > 0 ? (
              <div className="flex flex-wrap gap-2 pt-2">
                {product.tags.map((t) => (
                  <Chip key={t} variant="neutral">
                    #{t}
                  </Chip>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <section className="bg-surface-light py-14 md:py-16">
        <div className="container-page space-y-6">
          <h2 className="font-bold text-2xl md:text-3xl text-text-primary">
            Thông số kỹ thuật & hướng dẫn
          </h2>
          <ProductSpecs product={product} />
        </div>
      </section>

      {related.length > 0 ? (
        <section className="container-page py-14 md:py-16">
          <h2 className="font-bold text-2xl md:text-3xl text-text-primary mb-8">
            Sản phẩm cùng danh mục
          </h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard
                key={p.slug}
                product={p}
                categoryLabel={category?.name}
              />
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
    </>
  );
}
