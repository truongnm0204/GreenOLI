import type { Service } from "@/types/service";
import { getPayloadClient } from "@/lib/payload-client";
import { mediaUrl } from "@/lib/map-helpers";

/**
 * Data layer services: query Payload Local API, map về type `Service` cũ
 * (image: media object → .url string).
 */

type ServiceDoc = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  iconKey: string;
  image: unknown;
};

const toService = (doc: ServiceDoc): Service => ({
  slug: doc.slug,
  name: doc.name,
  tagline: doc.tagline,
  description: doc.description,
  iconKey: doc.iconKey,
  image: mediaUrl(doc.image),
});

export const getAllServices = async (): Promise<Service[]> => {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "services",
    limit: 100,
    depth: 1,
    sort: "createdAt",
  });
  return (docs as ServiceDoc[]).map(toService);
};

export const getServiceBySlug = async (
  slug: string,
): Promise<Service | undefined> => {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "services",
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 1,
  });
  const doc = docs[0] as ServiceDoc | undefined;
  return doc ? toService(doc) : undefined;
};
