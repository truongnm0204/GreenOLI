"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { ProductSearchField } from "@/components/shop/product-search-field";
import { cn } from "@/lib/cn";
import {
  SHOP_SORT_OPTIONS,
  buildShopHref,
  mergeShopQuery,
  type ShopPathScope,
  type ShopQuery,
  type ShopSort,
} from "@/lib/shop-query";

export type CatalogFilterOption = {
  slug: string;
  label: string;
};

type CatalogToolbarProps = {
  query: ShopQuery;
  totalDocs: number;
  pathScope?: ShopPathScope;
  /** Category options for filter select (hub + brand pages). */
  categories?: CatalogFilterOption[];
  /** Brand options for filter select (hub + category pages). */
  brands?: CatalogFilterOption[];
  /** Labels for active chips when slug alone is not enough. */
  categoryLabel?: string;
  brandLabel?: string;
  /** Heading above toolbar. */
  heading?: string;
  className?: string;
};

function resultCountLabel(totalDocs: number, q: string): string {
  if (totalDocs === 0) {
    return q
      ? `Không có kết quả cho “${q}”`
      : "Không có sản phẩm phù hợp";
  }
  if (q) {
    return `${totalDocs} kết quả cho “${q}”`;
  }
  return `${totalDocs} sản phẩm`;
}

export function CatalogToolbar({
  query,
  totalDocs,
  pathScope = {},
  categories = [],
  brands = [],
  categoryLabel,
  brandLabel,
  heading,
  className,
}: CatalogToolbarProps) {
  const basePath = pathScope.basePath ?? "/cua-hang";
  const categoryLocked = Boolean(pathScope.categorySlug);
  const brandLocked = Boolean(pathScope.brandSlug);

  const searchHidden: { name: string; value: string }[] = [];
  if (!categoryLocked && query.categorySlug) {
    searchHidden.push({ name: "category", value: query.categorySlug });
  }
  if (!brandLocked && query.brandSlug) {
    searchHidden.push({ name: "brand", value: query.brandSlug });
  }
  if (query.sort !== "newest") {
    searchHidden.push({ name: "sort", value: query.sort });
  }

  const clearHref = buildShopHref({}, pathScope);

  const activeChips: {
    key: string;
    label: string;
    href: string;
  }[] = [];

  if (query.q) {
    activeChips.push({
      key: "q",
      label: `Từ khóa: ${query.q}`,
      href: buildShopHref(
        mergeShopQuery(query, { q: "", page: 1 }),
        pathScope,
      ),
    });
  }

  if (query.categorySlug && !categoryLocked) {
    activeChips.push({
      key: "category",
      label: `Danh mục: ${categoryLabel ?? query.categorySlug}`,
      href: buildShopHref(
        mergeShopQuery(query, { category: "", page: 1 }),
        pathScope,
      ),
    });
  }

  if (query.brandSlug && !brandLocked) {
    activeChips.push({
      key: "brand",
      label: `Hãng: ${brandLabel ?? query.brandSlug}`,
      href: buildShopHref(
        mergeShopQuery(query, { brand: "", page: 1 }),
        pathScope,
      ),
    });
  }

  if (query.sort !== "newest") {
    const sortLabel =
      SHOP_SORT_OPTIONS.find((o) => o.value === query.sort)?.label ??
      query.sort;
    activeChips.push({
      key: "sort",
      label: `Sắp xếp: ${sortLabel}`,
      href: buildShopHref(
        mergeShopQuery(query, { sort: "newest", page: 1 }),
        pathScope,
      ),
    });
  }

  const showCategoryFilter = !categoryLocked && categories.length > 0;
  const showBrandFilter = !brandLocked && brands.length > 0;

  return (
    <div className={cn("space-y-4", className)}>
      {heading ? (
        <h2 className="font-bold text-2xl text-text-primary">{heading}</h2>
      ) : null}

      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <ProductSearchField
          action={basePath}
          defaultValue={query.q}
          hiddenFields={searchHidden}
          placeholder="Tìm trong cửa hàng…"
          ariaLabel="Tìm kiếm sản phẩm trong cửa hàng"
          className="w-full max-w-xl"
          id="catalog-search"
        />

        <p className="text-sm text-text-muted lg:text-right shrink-0">
          {resultCountLabel(totalDocs, query.q)}
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        {showCategoryFilter ? (
          <FilterSelect
            label="Danh mục"
            name="category"
            value={query.categorySlug ?? ""}
            emptyLabel="Tất cả danh mục"
            options={categories}
            action={basePath}
            preserve={{
              q: query.q,
              brand: brandLocked ? undefined : query.brandSlug,
              sort: query.sort !== "newest" ? query.sort : undefined,
            }}
          />
        ) : null}

        {showBrandFilter ? (
          <FilterSelect
            label="Hãng"
            name="brand"
            value={query.brandSlug ?? ""}
            emptyLabel="Tất cả hãng"
            options={brands}
            action={basePath}
            preserve={{
              q: query.q,
              category: categoryLocked ? undefined : query.categorySlug,
              sort: query.sort !== "newest" ? query.sort : undefined,
            }}
          />
        ) : null}

        <SortSelect
          value={query.sort}
          action={basePath}
          preserve={{
            q: query.q,
            category: categoryLocked ? undefined : query.categorySlug,
            brand: brandLocked ? undefined : query.brandSlug,
          }}
        />
      </div>

      {activeChips.length > 0 ? (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium uppercase tracking-wider text-text-muted">
            Đang lọc
          </span>
          {activeChips.map((chip) => (
            <Link
              key={chip.key}
              href={chip.href}
              className="inline-flex items-center gap-1.5 rounded-chip border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary-dark transition-colors hover:bg-primary/15"
            >
              {chip.label}
              <X className="size-3.5 shrink-0" aria-hidden />
              <span className="sr-only">Xóa bộ lọc này</span>
            </Link>
          ))}
          <Link
            href={clearHref}
            className="text-xs font-medium text-primary-dark underline-offset-2 hover:underline"
          >
            Xóa tất cả
          </Link>
        </div>
      ) : null}
    </div>
  );
}

type PreserveFields = {
  q?: string;
  category?: string;
  brand?: string;
  sort?: ShopSort;
};

function FilterSelect({
  label,
  name,
  value,
  emptyLabel,
  options,
  action,
  preserve,
}: {
  label: string;
  name: "category" | "brand";
  value: string;
  emptyLabel: string;
  options: CatalogFilterOption[];
  action: string;
  preserve: PreserveFields;
}) {
  const selectId = `catalog-filter-${name}`;
  return (
    <form action={action} method="get" className="flex flex-col gap-1 min-w-[10rem]">
      {preserve.q ? <input type="hidden" name="q" value={preserve.q} /> : null}
      {preserve.category && name !== "category" ? (
        <input type="hidden" name="category" value={preserve.category} />
      ) : null}
      {preserve.brand && name !== "brand" ? (
        <input type="hidden" name="brand" value={preserve.brand} />
      ) : null}
      {preserve.sort ? (
        <input type="hidden" name="sort" value={preserve.sort} />
      ) : null}
      <label htmlFor={selectId} className="text-xs font-medium text-text-muted">
        {label}
      </label>
      <select
        id={selectId}
        name={name}
        defaultValue={value}
        onChange={(e) => {
          // Progressive enhancement: submit on change when JS available.
          e.currentTarget.form?.requestSubmit();
        }}
        className={cn(
          "h-10 rounded-input border border-border-soft bg-surface-container-lowest px-3 text-sm text-text-primary",
          "focus:outline-none focus:border-primary",
        )}
      >
        <option value="">{emptyLabel}</option>
        {options.map((opt) => (
          <option key={opt.slug} value={opt.slug}>
            {opt.label}
          </option>
        ))}
      </select>
      <noscript>
        <button
          type="submit"
          className="mt-1 text-xs font-medium text-primary-dark underline"
        >
          Áp dụng
        </button>
      </noscript>
    </form>
  );
}

function SortSelect({
  value,
  action,
  preserve,
}: {
  value: ShopSort;
  action: string;
  preserve: PreserveFields;
}) {
  const selectId = "catalog-sort";
  return (
    <form action={action} method="get" className="flex flex-col gap-1 min-w-[10rem]">
      {preserve.q ? <input type="hidden" name="q" value={preserve.q} /> : null}
      {preserve.category ? (
        <input type="hidden" name="category" value={preserve.category} />
      ) : null}
      {preserve.brand ? (
        <input type="hidden" name="brand" value={preserve.brand} />
      ) : null}
      <label htmlFor={selectId} className="text-xs font-medium text-text-muted">
        Sắp xếp
      </label>
      <select
        id={selectId}
        name="sort"
        defaultValue={value}
        onChange={(e) => {
          e.currentTarget.form?.requestSubmit();
        }}
        className={cn(
          "h-10 rounded-input border border-border-soft bg-surface-container-lowest px-3 text-sm text-text-primary",
          "focus:outline-none focus:border-primary",
        )}
      >
        {SHOP_SORT_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <noscript>
        <button
          type="submit"
          className="mt-1 text-xs font-medium text-primary-dark underline"
        >
          Áp dụng
        </button>
      </noscript>
    </form>
  );
}
