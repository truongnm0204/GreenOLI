import { SITE_CONFIG } from "@/data/site-config";
import type { Article } from "@/types/article";
import type { Product } from "@/types/product";

/**
 * JSON-LD schema builders for Google Rich Results.
 * Render with `<script type="application/ld+json" dangerouslySetInnerHTML>`.
 */

export const organizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_CONFIG.name,
  url: SITE_CONFIG.url,
  logo: `${SITE_CONFIG.url}/logo.png`,
  description: SITE_CONFIG.description,
  contactPoint: {
    "@type": "ContactPoint",
    telephone: SITE_CONFIG.hotline,
    email: SITE_CONFIG.email,
    contactType: "customer service",
    areaServed: "VN",
    availableLanguage: ["vi"],
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE_CONFIG.address,
    addressCountry: "VN",
  },
  sameAs: [
    SITE_CONFIG.social.facebook,
    SITE_CONFIG.social.youtube,
    SITE_CONFIG.social.tiktok,
  ],
});

export const websiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_CONFIG.name,
  url: SITE_CONFIG.url,
  inLanguage: "vi-VN",
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE_CONFIG.url}/cua-hang?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
});

export const breadcrumbSchema = (
  items: Array<{ name: string; href: string }>,
) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, idx) => ({
    "@type": "ListItem",
    position: idx + 1,
    name: item.name,
    item: `${SITE_CONFIG.url}${item.href}`,
  })),
});

export const productSchema = (product: Product) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  name: product.name,
  description: product.shortDescription,
  image: [product.heroImage, ...product.galleryImages],
  category: product.category,
  brand: { "@type": "Brand", name: SITE_CONFIG.name },
  offers: {
    "@type": "Offer",
    url: `${SITE_CONFIG.url}/san-pham/${product.slug}`,
    priceCurrency: "VND",
    price: "0",
    availability: "https://schema.org/InStock",
    seller: { "@type": "Organization", name: SITE_CONFIG.name },
    priceValidUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 10),
  },
});

export const articleSchema = (article: Article) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: article.title,
  description: article.excerpt,
  image: article.coverImage,
  datePublished: article.publishedAt,
  dateModified: article.publishedAt,
  author: { "@type": "Person", name: article.author },
  publisher: {
    "@type": "Organization",
    name: SITE_CONFIG.name,
    logo: { "@type": "ImageObject", url: `${SITE_CONFIG.url}/logo.png` },
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `${SITE_CONFIG.url}/tin-tuc/${article.slug}`,
  },
});

export const localBusinessSchema = () => ({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: SITE_CONFIG.name,
  description: SITE_CONFIG.description,
  url: SITE_CONFIG.url,
  telephone: SITE_CONFIG.hotline,
  email: SITE_CONFIG.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE_CONFIG.address,
    addressCountry: "VN",
  },
  openingHours: "Mo-Sa 08:00-17:30",
  priceRange: "Liên hệ",
});
