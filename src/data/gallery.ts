import { getPayloadClient } from "@/lib/payload-client";

export type GalleryItem = {
  src: string;
  alt: string;
  caption?: string;
};

type MediaDoc = { url?: string | null; alt?: string | null };
type GalleryDoc = {
  image: MediaDoc | number | null;
  caption?: string | null;
};

const toGalleryItem = (doc: GalleryDoc): GalleryItem => {
  const media = typeof doc.image === "object" && doc.image ? doc.image : null;
  return {
    src: media?.url ?? "",
    alt: media?.alt ?? doc.caption ?? "",
    caption: doc.caption ?? undefined,
  };
};

/** Data layer gallery: query Payload, map image (media) → src + alt. */
export const getGallery = async (): Promise<GalleryItem[]> => {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "gallery",
    limit: 100,
    depth: 1,
    sort: "createdAt",
  });
  return (docs as GalleryDoc[]).map(toGalleryItem);
};
