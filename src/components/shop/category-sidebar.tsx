import Link from "next/link";
import * as Icons from "lucide-react";
import { getAllCategories } from "@/data/categories";
import { cn } from "@/lib/cn";

type Props = {
  activeSlug?: string;
  className?: string;
};

export async function CategorySidebar({ activeSlug, className }: Props) {
  const categories = await getAllCategories();
  return (
    <aside
      className={cn(
        "rounded-card bg-surface-container-lowest shadow-ambient border border-border-soft/60 p-5",
        className,
      )}
      aria-label="Danh mục sản phẩm"
    >
      <h3 className="font-semibold text-text-primary mb-4 text-base">
        Danh mục sản phẩm
      </h3>
      <ul className="space-y-1">
        {categories.map((cat) => {
          const Icon =
            (Icons as unknown as Record<
              string,
              React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>
            >)[cat.iconKey] ?? Icons.Sparkles;
          const isActive = cat.slug === activeSlug;
          return (
            <li key={cat.slug}>
              <Link
                href={`/cua-hang/${cat.slug}`}
                className={cn(
                  "flex items-center gap-3 rounded-button px-3 py-2.5 text-sm transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary-dark font-semibold"
                    : "text-text-primary hover:bg-surface-container-low",
                )}
                aria-current={isActive ? "page" : undefined}
              >
                <Icon className="size-4 flex-none" aria-hidden />
                <span className="flex-1 line-clamp-1">{cat.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
