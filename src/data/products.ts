import type { Product } from "@/types/product";
import { getPayloadClient } from "@/lib/payload-client";
import { mediaUrl, mediaUrls, valueList, relSlug } from "@/lib/map-helpers";

/**
 * Data layer products: query Payload Local API, map về type `Product` cũ.
 * - category (relationship depth=1) → slug string
 * - heroImage/galleryImages (media) → url string(s)
 * - specs/certifications/tags (array field) → shape cũ
 */

type ProductDoc = {
  slug: string;
  name: string;
  category: unknown;
  shortDescription: string;
  longDescription: string;
  heroImage: unknown;
  galleryImages?: unknown[];
  specs?: Array<{ label: string; value: string }>;
  composition: string;
  usage: string;
  warning: string;
  packaging: string;
  certifications?: Array<{ value: string }>;
  tags?: Array<{ value: string }>;
};

const toProduct = (doc: ProductDoc): Product => ({
  slug: doc.slug,
  name: doc.name,
  category: relSlug(doc.category as { slug?: string }),
  shortDescription: doc.shortDescription,
  longDescription: doc.longDescription,
  heroImage: mediaUrl(doc.heroImage),
  galleryImages: mediaUrls(doc.galleryImages),
  specs: (doc.specs ?? []).map((s) => ({ label: s.label, value: s.value })),
  composition: doc.composition,
  usage: doc.usage,
  warning: doc.warning,
  packaging: doc.packaging,
  certifications: valueList(doc.certifications),
  tags: valueList(doc.tags),
});

export const getAllProducts = async (): Promise<Product[]> => {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "products",
    limit: 200,
    depth: 1,
    sort: "createdAt",
  });
  return (docs as ProductDoc[]).map(toProduct);
};

export const getProductBySlug = async (
  slug: string,
): Promise<Product | undefined> => {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "products",
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 1,
  });
  const doc = docs[0] as ProductDoc | undefined;
  return doc ? toProduct(doc) : undefined;
};

export const getProductsByCategory = async (
  categorySlug: string,
): Promise<Product[]> => {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "products",
    where: { "category.slug": { equals: categorySlug } },
    limit: 200,
    depth: 1,
    sort: "createdAt",
  });
  return (docs as ProductDoc[]).map(toProduct);
};

export const getRelatedProducts = async (
  slug: string,
  limit = 4,
): Promise<Product[]> => {
  const current = await getProductBySlug(slug);
  if (!current) return [];
  const sameCategory = await getProductsByCategory(current.category);
  return sameCategory.filter((p) => p.slug !== slug).slice(0, limit);
};
