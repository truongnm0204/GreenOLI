import type { Brand } from "@/types/brand";
import { getPayloadClient } from "@/lib/payload-client";
import { mediaUrl } from "@/lib/map-helpers";

type BrandDoc = {
  slug: string;
  name: string;
  tagline?: string;
  description?: string;
  logo: unknown;
};

const toBrand = (doc: BrandDoc): Brand => ({
  slug: doc.slug,
  name: doc.name,
  tagline: doc.tagline,
  description: doc.description,
  logo: mediaUrl(doc.logo),
});

export const getAllBrands = async (): Promise<Brand[]> => {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "brands",
    limit: 100,
    sort: "createdAt",
  });
  return (docs as BrandDoc[]).map(toBrand);
};

export const getBrandBySlug = async (slug: string): Promise<Brand | undefined> => {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "brands",
    where: { slug: { equals: slug } },
    limit: 1,
  });
  const doc = docs[0] as BrandDoc | undefined;
  return doc ? toBrand(doc) : undefined;
};
