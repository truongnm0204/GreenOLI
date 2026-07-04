import type { Category } from "@/types/category";
import { getPayloadClient } from "@/lib/payload-client";
import { mediaUrl } from "@/lib/map-helpers";

/**
 * Data layer categories: query Payload Local API, map về type `Category` cũ
 * (heroImage: media object → .url string) để UI không phải đổi.
 */

type CategoryDoc = {
  slug: string;
  name: string;
  shortName?: string | null;
  tagline: string;
  description: string;
  longDescription: string;
  heroImage: unknown;
  iconKey: string;
};

const toCategory = (doc: CategoryDoc): Category => ({
  slug: doc.slug,
  name: doc.name,
  shortName: doc.shortName ?? undefined,
  tagline: doc.tagline,
  description: doc.description,
  longDescription: doc.longDescription,
  heroImage: mediaUrl(doc.heroImage),
  iconKey: doc.iconKey,
});

export const getAllCategories = async (): Promise<Category[]> => {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "categories",
    limit: 100,
    depth: 1,
    sort: "createdAt",
  });
  return (docs as CategoryDoc[]).map(toCategory);
};

export const getCategoryBySlug = async (
  slug: string,
): Promise<Category | undefined> => {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "categories",
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 1,
  });
  const doc = docs[0] as CategoryDoc | undefined;
  return doc ? toCategory(doc) : undefined;
};
