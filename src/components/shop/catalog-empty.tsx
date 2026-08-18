import Link from "next/link";
import { SearchX } from "lucide-react";
import { cn } from "@/lib/cn";

type CatalogEmptyProps = {
  title?: string;
  description?: string;
  /** Primary clear / back action. */
  clearHref?: string;
  clearLabel?: string;
  className?: string;
};

export function CatalogEmpty({
  title = "Không tìm thấy sản phẩm",
  description = "Thử đổi từ khóa hoặc bỏ bớt bộ lọc để xem thêm sản phẩm phù hợp.",
  clearHref = "/cua-hang",
  clearLabel = "Xem tất cả sản phẩm",
  className,
}: CatalogEmptyProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-4 rounded-card border border-dashed border-border-soft bg-surface-container-lowest px-6 py-14 text-center",
        className,
      )}
      role="status"
    >
      <div className="grid size-14 place-items-center rounded-full bg-surface-light text-text-muted">
        <SearchX className="size-7" aria-hidden />
      </div>
      <div className="max-w-md space-y-2">
        <h3 className="font-bold text-lg text-text-primary">{title}</h3>
        <p className="text-sm text-text-muted leading-relaxed">{description}</p>
      </div>
      <Link
        href={clearHref}
        className="inline-flex items-center justify-center rounded-button bg-primary px-5 py-2.5 text-sm font-semibold text-on-primary transition-opacity hover:opacity-90"
      >
        {clearLabel}
      </Link>
    </div>
  );
}
