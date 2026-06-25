import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/data/site-config";
import { CATEGORIES } from "@/data/categories";
import { PRODUCTS } from "@/data/products";
import { ARTICLES } from "@/data/articles";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE_CONFIG.url;
  const now = new Date();

  const STATIC: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/gioi-thieu`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/cua-hang`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/tin-tuc`, lastModified: now, changeFrequency: "daily", priority: 0.8 },
    { url: `${base}/lien-he`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
  ];

  const categories: MetadataRoute.Sitemap = CATEGORIES.map((c) => ({
    url: `${base}/cua-hang/${c.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const products: MetadataRoute.Sitemap = PRODUCTS.map((p) => ({
    url: `${base}/san-pham/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const articles: MetadataRoute.Sitemap = ARTICLES.map((a) => ({
    url: `${base}/tin-tuc/${a.slug}`,
    lastModified: new Date(a.publishedAt),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...STATIC, ...categories, ...products, ...articles];
}
