import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";
import {
  buildShopHref,
  mergeShopQuery,
  type ShopPathScope,
  type ShopQuery,
} from "@/lib/shop-query";

type CatalogPaginationProps = {
  query: ShopQuery;
  totalPages: number;
  pathScope?: ShopPathScope;
  className?: string;
};

function pageWindow(current: number, total: number): (number | "ellipsis")[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages = new Set<number>();
  pages.add(1);
  pages.add(total);
  for (let p = current - 1; p <= current + 1; p += 1) {
    if (p >= 1 && p <= total) pages.add(p);
  }

  const sorted = [...pages].sort((a, b) => a - b);
  const out: (number | "ellipsis")[] = [];
  let prev = 0;
  for (const p of sorted) {
    if (prev && p - prev > 1) out.push("ellipsis");
    out.push(p);
    prev = p;
  }
  return out;
}

export function CatalogPagination({
  query,
  totalPages,
  pathScope = {},
  className,
}: CatalogPaginationProps) {
  if (totalPages <= 1) return null;

  const current = Math.min(Math.max(query.page, 1), totalPages);
  const items = pageWindow(current, totalPages);

  const hrefFor = (page: number) =>
    buildShopHref(mergeShopQuery(query, { page }), pathScope);

  return (
    <nav
      aria-label="Phân trang sản phẩm"
      className={cn("flex flex-wrap items-center justify-center gap-2", className)}
    >
      {current > 1 ? (
        <Link
          href={hrefFor(current - 1)}
          className="inline-flex h-10 items-center gap-1 rounded-button border border-border-soft bg-surface-container-lowest px-3 text-sm font-medium text-text-primary transition-colors hover:border-primary hover:text-primary-dark"
          rel="prev"
        >
          <ChevronLeft className="size-4" aria-hidden />
          Trước
        </Link>
      ) : (
        <span
          className="inline-flex h-10 items-center gap-1 rounded-button border border-border-soft/60 px-3 text-sm text-text-muted opacity-50"
          aria-disabled="true"
        >
          <ChevronLeft className="size-4" aria-hidden />
          Trước
        </span>
      )}

      <ul className="flex flex-wrap items-center gap-1">
        {items.map((item, idx) =>
          item === "ellipsis" ? (
            <li
              key={`e-${idx}`}
              className="px-2 text-sm text-text-muted"
              aria-hidden
            >
              …
            </li>
          ) : (
            <li key={item}>
              <Link
                href={hrefFor(item)}
                aria-label={`Trang ${item}`}
                aria-current={item === current ? "page" : undefined}
                className={cn(
                  "grid size-10 place-items-center rounded-button text-sm font-medium transition-colors",
                  item === current
                    ? "bg-primary text-on-primary"
                    : "border border-border-soft bg-surface-container-lowest text-text-primary hover:border-primary hover:text-primary-dark",
                )}
              >
                {item}
              </Link>
            </li>
          ),
        )}
      </ul>

      {current < totalPages ? (
        <Link
          href={hrefFor(current + 1)}
          className="inline-flex h-10 items-center gap-1 rounded-button border border-border-soft bg-surface-container-lowest px-3 text-sm font-medium text-text-primary transition-colors hover:border-primary hover:text-primary-dark"
          rel="next"
        >
          Sau
          <ChevronRight className="size-4" aria-hidden />
        </Link>
      ) : (
        <span
          className="inline-flex h-10 items-center gap-1 rounded-button border border-border-soft/60 px-3 text-sm text-text-muted opacity-50"
          aria-disabled="true"
        >
          Sau
          <ChevronRight className="size-4" aria-hidden />
        </span>
      )}
    </nav>
  );
}
