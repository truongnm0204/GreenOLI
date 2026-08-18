import { CatalogEmpty } from "@/components/shop/catalog-empty";
import { CatalogPagination } from "@/components/shop/catalog-pagination";
import {
  CatalogToolbar,
  type CatalogFilterOption,
} from "@/components/shop/catalog-toolbar";
import { ProductGrid } from "@/components/shop/product-grid";
import type { Product } from "@/types/product";
import {
  buildShopHref,
  type ShopPathScope,
  type ShopQuery,
} from "@/lib/shop-query";
import { cn } from "@/lib/cn";

type CatalogResultsProps = {
  query: ShopQuery;
  products: Product[];
  totalDocs: number;
  totalPages: number;
  pathScope?: ShopPathScope;
  categories?: CatalogFilterOption[];
  brands?: CatalogFilterOption[];
  categoryLabel?: string;
  brandLabel?: string;
  /** Map slug → label for mixed grids. */
  categoryLabels?: Record<string, string>;
  /** Single category label for all cards. */
  productCategoryLabel?: string;
  heading?: string;
  emptyTitle?: string;
  emptyDescription?: string;
  className?: string;
};

export function CatalogResults({
  query,
  products,
  totalDocs,
  totalPages,
  pathScope = {},
  categories,
  brands,
  categoryLabel,
  brandLabel,
  categoryLabels,
  productCategoryLabel,
  heading,
  emptyTitle,
  emptyDescription,
  className,
}: CatalogResultsProps) {
  const clearHref = buildShopHref({}, pathScope);

  return (
    <div className={cn("space-y-8", className)}>
      <CatalogToolbar
        query={query}
        totalDocs={totalDocs}
        pathScope={pathScope}
        categories={categories}
        brands={brands}
        categoryLabel={categoryLabel}
        brandLabel={brandLabel}
        heading={heading}
      />

      {products.length === 0 ? (
        <CatalogEmpty
          title={emptyTitle}
          description={emptyDescription}
          clearHref={clearHref}
          clearLabel={
            pathScope.categorySlug || pathScope.brandSlug
              ? "Xóa bộ lọc trong phạm vi này"
              : "Về cửa hàng"
          }
        />
      ) : (
        <>
          <ProductGrid
            products={products}
            categoryLabel={productCategoryLabel}
            categoryLabels={categoryLabels}
            emptyMessage="Không có sản phẩm phù hợp."
          />
          <CatalogPagination
            query={query}
            totalPages={totalPages}
            pathScope={pathScope}
          />
        </>
      )}
    </div>
  );
}
