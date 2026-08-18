import { SITE_CONFIG } from "@/data/site-config";
import type { Article } from "@/types/article";
import type { Product } from "@/types/product";

/**
 * JSON-LD schema builders for Google Rich Results.
 * Render with `<script type="application/ld+json" dangerouslySetInnerHTML>`.
 */

const logoUrl = () => `${SITE_CONFIG.url}${SITE_CONFIG.logoPath}`;

const sameAs = (): string[] =>
  [
    SITE_CONFIG.social.facebook,
    SITE_CONFIG.social.youtube,
    SITE_CONFIG.social.tiktok,
    SITE_CONFIG.social.zalo,
  ]
    .map((u) => String(u ?? "").trim())
    .filter((u) => u.length > 0);

const absoluteMedia = (src: string | undefined | null): string | undefined => {
  if (!src) return undefined;
  if (src.startsWith("http://") || src.startsWith("https://")) return src;
  return `${SITE_CONFIG.url}${src.startsWith("/") ? src : `/${src}`}`;
};

export const organizationSchema = () => {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    logo: logoUrl(),
    description: SITE_CONFIG.description,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: SITE_CONFIG.hotlines[0]
        ? `+84${SITE_CONFIG.hotlines[0].tel.replace(/^0/, "")}`
        : SITE_CONFIG.hotline,
      contactType: "customer service",
      areaServed: "VN",
      availableLanguage: ["vi"],
      ...(SITE_CONFIG.email ? { email: SITE_CONFIG.email } : {}),
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE_CONFIG.address,
      addressLocality: "Hà Nội",
      addressCountry: "VN",
    },
  };
  const links = sameAs();
  if (links.length) schema.sameAs = links;
  return schema;
};

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

/**
 * B2B catalog: không niêm yết giá → Offer kiểu “liên hệ báo giá”,
 * tránh price: 0 (Google coi offer không hợp lệ / misleading).
 */
export const productSchema = (product: Product) => {
  const images = [
    absoluteMedia(product.heroImage),
    ...product.galleryImages.map((g) => absoluteMedia(g.url)),
  ].filter((u): u is string => Boolean(u));

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.shortDescription,
    image: images,
    category: product.category,
    brand: { "@type": "Brand", name: SITE_CONFIG.name },
    offers: {
      "@type": "Offer",
      url: `${SITE_CONFIG.url}/san-pham/${product.slug}`,
      priceCurrency: "VND",
      availability: "https://schema.org/InStock",
      seller: { "@type": "Organization", name: SITE_CONFIG.name },
      // Không có giá niêm yết công khai — business function inquire.
      businessFunction: "https://schema.org/ProvideService",
      itemCondition: "https://schema.org/NewCondition",
    },
  };
};

export const articleSchema = (article: Article) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: article.title,
  description: article.excerpt,
  image: absoluteMedia(article.coverImage),
  datePublished: article.publishedAt,
  dateModified: article.publishedAt,
  author: { "@type": "Person", name: article.author },
  publisher: {
    "@type": "Organization",
    name: SITE_CONFIG.name,
    logo: { "@type": "ImageObject", url: logoUrl() },
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `${SITE_CONFIG.url}/tin-tuc/${article.slug}`,
  },
});

export const localBusinessSchema = () => {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    telephone: SITE_CONFIG.hotlines[0]
      ? `+84${SITE_CONFIG.hotlines[0].tel.replace(/^0/, "")}`
      : SITE_CONFIG.hotline,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE_CONFIG.address,
      addressLocality: "Hà Nội",
      addressCountry: "VN",
    },
    openingHours: "Mo-Sa 08:00-12:00,13:30-17:00",
    priceRange: "Liên hệ",
    image: logoUrl(),
  };
  if (SITE_CONFIG.email) schema.email = SITE_CONFIG.email;
  const links = sameAs();
  if (links.length) schema.sameAs = links;
  return schema;
};

export const faqPageSchema = (
  items: Array<{ question: string; answer: string }>,
) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: items.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
});
