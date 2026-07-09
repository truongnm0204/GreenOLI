import Script from "next/script";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/layout/page-header";
import { ProductGrid } from "@/components/shop/product-grid";
import { getBrandBySlug, getAllBrands } from "@/data/brands";
import { getProductsByBrand } from "@/data/products";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/json-ld";
import { SITE_CONFIG } from "@/data/site-config";
import Link from "next/link";
import { cn } from "@/lib/cn";

type Params = { brand: string };

export const revalidate = 300;
export const dynamicParams = true;

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { brand } = await params;
  const b = await getBrandBySlug(brand);
  if (!b) return {};
  return buildMetadata({
    title: `${b.name} – Cửa Hàng`,
    description: b.description || b.tagline || `Khám phá các sản phẩm từ hãng ${b.name}`,
    path: `/cua-hang/hang/${b.slug}`,
  });
}

export default async function BrandPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { brand } = await params;
  const b = await getBrandBySlug(brand);
  if (!b) notFound();

  const products = await getProductsByBrand(b.slug);
  const allBrands = await getAllBrands();

  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: b.name,
    description: b.description,
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
                <p className="text-text-muted leading-relaxed">{b.description}</p>
              </div>
            )}

            <div>
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-bold text-2xl text-text-primary">
                  Sản phẩm của hãng ({products.length})
                </h2>
              </div>
              <ProductGrid
                products={products}
                categoryLabel={b.name}
              />
            </div>
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
