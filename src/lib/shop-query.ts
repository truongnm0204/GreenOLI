/**
 * Shop catalog URL query contract.
 * Params: q, category, brand, page, sort — URL is source of truth.
 */

export const SHOP_PAGE_SIZE = 12;

export type ShopSort = "newest" | "name-asc" | "name-desc";

export const SHOP_SORT_OPTIONS: { value: ShopSort; label: string }[] = [
  { value: "newest", label: "Mới nhất" },
  { value: "name-asc", label: "Tên A–Z" },
  { value: "name-desc", label: "Tên Z–A" },
];

export type ShopQuery = {
  /** Trimmed search term as typed (may be shorter than 2). */
  q: string;
  /** Effective text search term (length >= 2) or empty. */
  searchTerm: string;
  categorySlug?: string;
  brandSlug?: string;
  page: number;
  pageSize: number;
  sort: ShopSort;
};

export type ShopPathScope = {
  /** Force category from path (category pages). */
  categorySlug?: string;
  /** Force brand from path (brand pages). */
  brandSlug?: string;
  /** Base path for building links (default /cua-hang). */
  basePath?: string;
};

type SearchParamsLike =
  | Record<string, string | string[] | undefined>
  | URLSearchParams
  | undefined
  | null;

const DEFAULT_SORT: ShopSort = "newest";

function firstParam(
  value: string | string[] | undefined,
): string | undefined {
  if (Array.isArray(value)) return value[0];
  return value;
}

function readRaw(
  params: SearchParamsLike,
  key: string,
): string | undefined {
  if (!params) return undefined;
  if (params instanceof URLSearchParams) {
    const v = params.get(key);
    return v ?? undefined;
  }
  return firstParam(params[key]);
}

function parseSort(raw: string | undefined): ShopSort {
  if (raw === "name-asc" || raw === "name-desc" || raw === "newest") {
    return raw;
  }
  return DEFAULT_SORT;
}

function parsePage(raw: string | undefined): number {
  const n = Number.parseInt(raw ?? "1", 10);
  if (!Number.isFinite(n) || n < 1) return 1;
  return Math.floor(n);
}

/** Trimmed q length >= 2 qualifies as text search. */
export function normalizeSearchTerm(q: string | undefined | null): string {
  const trimmed = (q ?? "").trim();
  return trimmed.length >= 2 ? trimmed : "";
}

/**
 * Parse URL/searchParams into a normalized ShopQuery.
 * Path scope overwrites conflicting category/brand query keys.
 */
export function parseShopQuery(
  searchParams: SearchParamsLike,
  pathScope: ShopPathScope = {},
): ShopQuery {
  const qRaw = (readRaw(searchParams, "q") ?? "").trim();
  const searchTerm = normalizeSearchTerm(qRaw);

  const categoryFromQuery = (readRaw(searchParams, "category") ?? "").trim();
  const brandFromQuery = (readRaw(searchParams, "brand") ?? "").trim();

  const categorySlug =
    pathScope.categorySlug?.trim() ||
    categoryFromQuery ||
    undefined;
  const brandSlug =
    pathScope.brandSlug?.trim() || brandFromQuery || undefined;

  return {
    q: qRaw,
    searchTerm,
    categorySlug: categorySlug || undefined,
    brandSlug: brandSlug || undefined,
    page: parsePage(readRaw(searchParams, "page")),
    pageSize: SHOP_PAGE_SIZE,
    sort: parseSort(readRaw(searchParams, "sort")),
  };
}

/**
 * Catalog intent on /cua-hang hub:
 * q length>=2, category, brand, page>1, or sort !== newest.
 */
export function hasCatalogIntent(query: ShopQuery): boolean {
  return (
    query.searchTerm.length >= 2 ||
    Boolean(query.categorySlug) ||
    Boolean(query.brandSlug) ||
    query.page > 1 ||
    query.sort !== DEFAULT_SORT
  );
}

export type SerializeShopQueryInput = {
  q?: string;
  category?: string;
  brand?: string;
  page?: number;
  sort?: ShopSort;
};

/**
 * Build query string (without `?`), stripping defaults:
 * page=1, empty q, default sort newest.
 * Empty string when no params remain.
 */
export function serializeShopQuery(
  input: SerializeShopQueryInput,
  options?: { omitCategory?: boolean; omitBrand?: boolean },
): string {
  const params = new URLSearchParams();

  const q = (input.q ?? "").trim();
  if (q) params.set("q", q);

  if (!options?.omitCategory) {
    const category = (input.category ?? "").trim();
    if (category) params.set("category", category);
  }

  if (!options?.omitBrand) {
    const brand = (input.brand ?? "").trim();
    if (brand) params.set("brand", brand);
  }

  const sort = input.sort ?? DEFAULT_SORT;
  if (sort !== DEFAULT_SORT) params.set("sort", sort);

  const page = input.page ?? 1;
  if (page > 1) params.set("page", String(page));

  return params.toString();
}

export function shopQueryToSerializeInput(
  query: ShopQuery,
): SerializeShopQueryInput {
  return {
    q: query.q || undefined,
    category: query.categorySlug,
    brand: query.brandSlug,
    page: query.page,
    sort: query.sort,
  };
}

/**
 * Build a shop href for the given base path + query state.
 * On scoped routes, category/brand live in the path — omit from query.
 */
export function buildShopHref(
  query: SerializeShopQueryInput,
  pathScope: ShopPathScope = {},
): string {
  const basePath = pathScope.basePath ?? "/cua-hang";
  const qs = serializeShopQuery(query, {
    omitCategory: Boolean(pathScope.categorySlug),
    omitBrand: Boolean(pathScope.brandSlug),
  });
  return qs ? `${basePath}?${qs}` : basePath;
}

/** Merge partial updates onto current query for link generation. */
export function mergeShopQuery(
  current: ShopQuery,
  patch: Partial<SerializeShopQueryInput>,
): SerializeShopQueryInput {
  const next: SerializeShopQueryInput = {
    q: patch.q !== undefined ? patch.q : current.q || undefined,
    category:
      patch.category !== undefined
        ? patch.category
        : current.categorySlug,
    brand: patch.brand !== undefined ? patch.brand : current.brandSlug,
    page: patch.page !== undefined ? patch.page : current.page,
    sort: patch.sort !== undefined ? patch.sort : current.sort,
  };

  // Reset to page 1 when filters/search/sort change (unless page was explicit in patch
  // and is the only change — callers usually set page: 1 on filter changes).
  const filterChanged =
    (patch.q !== undefined && (patch.q ?? "").trim() !== current.q) ||
    (patch.category !== undefined &&
      (patch.category || undefined) !== current.categorySlug) ||
    (patch.brand !== undefined &&
      (patch.brand || undefined) !== current.brandSlug) ||
    (patch.sort !== undefined && patch.sort !== current.sort);

  if (filterChanged && patch.page === undefined) {
    next.page = 1;
  }

  return next;
}

export function payloadSortFromShopSort(sort: ShopSort): string {
  switch (sort) {
    case "name-asc":
      return "name";
    case "name-desc":
      return "-name";
    case "newest":
    default:
      return "-createdAt";
  }
}
