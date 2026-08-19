import type { Where } from "payload";
import type { Product, PackagingOption } from "@/types/product";
import { getPayloadClient } from "@/lib/payload-client";
import { mediaUrl, mediaItems, valueList, relSlug } from "@/lib/map-helpers";
import {
  SHOP_PAGE_SIZE,
  normalizeSearchTerm,
  payloadSortFromShopSort,
  type ShopSort,
} from "@/lib/shop-query";

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
  if (!doc) return undefined;
  const product = toProduct(doc);
  if (product.description) {
    const { hydrateDescriptionUploads } = await import(
      "@/lib/hydrate-description-uploads"
    );
    product.description = await hydrateDescriptionUploads(product.description);
  }
  return product;
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

export type RelatedProductsResult = {
  products: Product[];
  /** true chỉ khi có ≥1 SP thực sự cùng brand (không tính fill category) */
  hasSameBrand: boolean;
};

/**
 * SP liên quan / hay đi kèm:
 * 1) cùng brand (nếu có)
 * 2) bù bằng cùng category
 * 3) loại chính nó, dedupe, giới hạn limit
 */
export const getRelatedProducts = async (
  slug: string,
  limit = 4,
): Promise<RelatedProductsResult> => {
  const current = await getProductBySlug(slug);
  if (!current) return { products: [], hasSameBrand: false };

  const picked: Product[] = [];
  const seen = new Set<string>([slug]);
  let sameBrandCount = 0;

  const pushMany = (list: Product[], fromBrand: boolean) => {
    for (const p of list) {
      if (seen.has(p.slug)) continue;
      seen.add(p.slug);
      picked.push(p);
      if (fromBrand) sameBrandCount += 1;
      if (picked.length >= limit) break;
    }
  };

  if (current.brand) {
    const sameBrand = await getProductsByBrand(current.brand);
    pushMany(sameBrand, true);
  }

  if (picked.length < limit && current.category) {
    const sameCategory = await getProductsByCategory(current.category);
    pushMany(sameCategory, false);
  }

  return {
    products: picked.slice(0, limit),
    hasSameBrand: sameBrandCount > 0,
  };
};

export type FindProductsInput = {
  q?: string;
  categorySlug?: string;
  brandSlug?: string;
  page?: number;
  pageSize?: number;
  sort?: ShopSort;
};

export type FindProductsResult = {
  products: Product[];
  page: number;
  pageSize: number;
  totalDocs: number;
  totalPages: number;
};

function buildTextSearchClause(term: string): Where {
  return {
    or: [
      { name: { contains: term } },
      { shortDescription: { contains: term } },
      { "tags.value": { contains: term } },
    ],
  };
}

function buildTextSearchClauseWithoutTags(term: string): Where {
  return {
    or: [
      { name: { contains: term } },
      { shortDescription: { contains: term } },
    ],
  };
}

function buildFindWhere(
  input: {
    searchTerm: string;
    categorySlug?: string;
    brandSlug?: string;
  },
  includeTags: boolean,
): Where | undefined {
  const and: Where[] = [];

  if (input.categorySlug) {
    and.push({ "category.slug": { equals: input.categorySlug } });
  }
  if (input.brandSlug) {
    and.push({ "brand.slug": { equals: input.brandSlug } });
  }
  if (input.searchTerm) {
    and.push(
      includeTags
        ? buildTextSearchClause(input.searchTerm)
        : buildTextSearchClauseWithoutTags(input.searchTerm),
    );
  }

  if (and.length === 0) return undefined;
  if (and.length === 1) return and[0];
  return { and };
}

/**
 * Server-side catalog query: search + category + brand + sort + pagination.
 * Does not load the full catalog client-side.
 * Tags path (`tags.value`) is attempted first; on query failure falls back to
 * name + shortDescription only so listing never hard-fails.
 */
export const findProducts = async (
  input: FindProductsInput = {},
): Promise<FindProductsResult> => {
  const pageSize =
    input.pageSize && input.pageSize > 0
      ? Math.floor(input.pageSize)
      : SHOP_PAGE_SIZE;
  const page =
    input.page && input.page > 0 ? Math.floor(input.page) : 1;
  const sort = payloadSortFromShopSort(input.sort ?? "newest");
  const searchTerm = normalizeSearchTerm(input.q);
  const categorySlug = input.categorySlug?.trim() || undefined;
  const brandSlug = input.brandSlug?.trim() || undefined;

  const payload = await getPayloadClient();

  const runFind = async (includeTags: boolean) => {
    const where = buildFindWhere(
      { searchTerm, categorySlug, brandSlug },
      includeTags,
    );
    return payload.find({
      collection: "products",
      where,
      limit: pageSize,
      page,
      depth: 2,
      sort,
    });
  };

  let result;
  try {
    result = await runFind(true);
  } catch (err) {
    // Nested array path may be unsupported by the adapter — degrade gracefully.
    console.warn(
      "[findProducts] tags search path failed; falling back to name + shortDescription",
      err,
    );
    result = await runFind(false);
  }

  return {
    products: (result.docs as ProductDoc[]).map(toProduct),
    page: result.page ?? page,
    pageSize,
    totalDocs: result.totalDocs ?? 0,
    totalPages: result.totalPages ?? 0,
  };
};
