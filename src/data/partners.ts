import { getPayloadClient } from "@/lib/payload-client";
import { mediaUrl } from "@/lib/map-helpers";

export type Partner = {
  name: string;
  logo: string;
  url?: string;
};

type PartnerDoc = {
  name: string;
  logo: unknown;
  url?: string | null;
};

const toPartner = (doc: PartnerDoc): Partner => ({
  name: doc.name,
  logo: mediaUrl(doc.logo),
  url: doc.url ?? undefined,
});

/** Data layer partners: query Payload, map logo (media) → url string. */
export const getAllPartners = async (): Promise<Partner[]> => {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "partners",
    limit: 100,
    depth: 1,
    sort: "createdAt",
  });
  return (docs as PartnerDoc[]).map(toPartner);
};
