import type { Product, PackagingOption } from "@/types/product";
import { getPayloadClient } from "@/lib/payload-client";
import { mediaUrl, mediaItems, valueList, relSlug } from "@/lib/map-helpers";

/**
 * Data layer products: query Payload Local API, map về type `Product`.
 * - packagingOptions: relationship unit → unitId/unitName/unitSymbol
 * - description: Lexical JSON (bài giới thiệu)
 * - Không còn attachments/documents download
 */

type PackagingUnitDoc = {
  id: string | number;
  name: string;
  symbol: string;
};

type RawPackagingOption = {
  id: string;
  quantity: number | null | undefined;
  unit: PackagingUnitDoc | number | null;
  customLabel?: string | null;
  variantImage?: unknown;
};

type RawAttachment = {
  id: string;
  type: "msds" | "catalogue" | "manual" | "technical" | "other";
  label: string;
  file: unknown;
};

type ProductDoc = {
  slug: string;
  name: string;
  category: unknown;
  brand?: unknown;
  shortDescription: string;
  longDescription: string;
  heroImage: unknown;
  galleryImages?: unknown[];
  specs?: Array<{ label: string; value: string }>;
  composition: string;
  usage: string;
  warning: string;
  packagingOptions?: RawPackagingOption[];
  packaging?: string;
  certifications?: Array<{ value: string }>;
  tags?: Array<{ value: string }>;
  description?: unknown;
  attachments?: RawAttachment[];
};

/** Resolve PackagingUnit từ relationship (depth=1 trả object, depth=0 trả id) */
const resolveUnit = (
  unit: PackagingUnitDoc | number | null,
): { id: string; name: string; symbol: string } => {
  if (!unit || typeof unit === "number") {
    return { id: String(unit ?? ""), name: "", symbol: "" };
  }
  return {
    id: String(unit.id),
    name: unit.name ?? "",
    symbol: unit.symbol ?? "",
  };
};

const mapPackagingOption = (opt: RawPackagingOption): PackagingOption => {
  const unit = resolveUnit(opt.unit);
  // Số lượng có thể để trống → nhãn chỉ là đơn vị ("cái", "hộp")
  const label =
    opt.customLabel?.trim() ||
    (opt.quantity != null
      ? `${opt.quantity} ${unit.symbol}`.trim()
      : unit.symbol);
  return {
    id: opt.id,
    quantity: opt.quantity ?? 0,
    unitId: unit.id,
    unitName: unit.name,
    unitSymbol: unit.symbol,
    label,
    variantImage: opt.variantImage ? mediaUrl(opt.variantImage) : undefined,
  };
};

const toProduct = (doc: ProductDoc): Product => ({
  slug: doc.slug,
  name: doc.name,
  category: relSlug(doc.category as { slug?: string }),
  brand: doc.brand ? relSlug(doc.brand as { slug?: string }) : undefined,
  shortDescription: doc.shortDescription,
  longDescription: doc.longDescription,
  heroImage: mediaUrl(doc.heroImage),
  galleryImages: mediaItems(doc.galleryImages),
  specs: (doc.specs ?? []).map((s) => ({ label: s.label, value: s.value })),
  composition: doc.composition,
  usage: doc.usage,
  warning: doc.warning,
  packagingOptions: (doc.packagingOptions ?? []).map(mapPackagingOption),
  packaging: doc.packaging ?? "",
  certifications: valueList(doc.certifications),
  tags: valueList(doc.tags),
  description:
    (doc.description as import("@payloadcms/richtext-lexical/lexical").SerializedEditorState) ??
    null,
  attachments: (doc.attachments ?? []).map((a) => ({
    id: a.id,
    type: a.type,
    label: a.label,
    fileUrl: mediaUrl(a.file),
    mimeType:
      typeof a.file === "object" && a.file !== null
        ? (a.file as { mimeType?: string }).mimeType
        : undefined,
    fileSize:
      typeof a.file === "object" && a.file !== null
        ? (a.file as { filesize?: number }).filesize
        : undefined,
  })),
});

export const getAllProducts = async (): Promise<Product[]> => {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "products",
    limit: 200,
    depth: 2,
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
    depth: 2,
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
    depth: 2,
    sort: "createdAt",
  });
  return (docs as ProductDoc[]).map(toProduct);
};

export const getProductsByBrand = async (
  brandSlug: string,
): Promise<Product[]> => {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "products",
    where: { "brand.slug": { equals: brandSlug } },
    limit: 200,
    depth: 2,
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
