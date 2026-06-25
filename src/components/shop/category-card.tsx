import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import * as Icons from "lucide-react";
import { Card } from "@/components/ui/card";
import type { Category } from "@/types/category";
import { cn } from "@/lib/cn";

type Props = {
  category: Category;
  variant?: "default" | "compact";
  className?: string;
};

export function CategoryCard({ category, variant = "default", className }: Props) {
  const Icon =
    (Icons as unknown as Record<
      string,
      React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>
    >)[category.iconKey] ?? Icons.Sparkles;

  if (variant === "compact") {
    return (
      <Link
        href={`/cua-hang/${category.slug}`}
        className={cn(
          "group flex items-center gap-4 rounded-card border border-border-soft bg-surface-container-lowest p-4",
          "shadow-ambient hover:shadow-ambient-lg transition-shadow",
          className,
        )}
      >
        <span className="grid size-12 flex-none place-items-center rounded-full bg-primary/10 text-primary-dark">
          <Icon className="size-6" aria-hidden />
        </span>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-text-primary line-clamp-1">
            {category.name}
          </h3>
          <p className="text-xs text-text-muted line-clamp-1">{category.tagline}</p>
        </div>
        <ArrowRight
          className="size-5 text-text-muted group-hover:text-primary-dark group-hover:translate-x-0.5 transition-transform"
          aria-hidden
        />
      </Link>
    );
  }

  return (
    <Card padding="none" className={cn("group overflow-hidden", className)}>
      <Link
        href={`/cua-hang/${category.slug}`}
        className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-card"
      >
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={category.heroImage}
            alt={category.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-text-primary/60 to-transparent" />
          <span className="absolute top-3 left-3 grid size-10 place-items-center rounded-full bg-surface-container-lowest text-primary-dark shadow-ambient">
            <Icon className="size-5" aria-hidden />
          </span>
        </div>
        <div className="p-5 space-y-2">
          <h3 className="font-semibold text-base text-text-primary line-clamp-1">
            {category.name}
          </h3>
          <p className="text-sm text-text-muted line-clamp-2 min-h-[2.5rem]">
            {category.description}
          </p>
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-dark">
            Khám phá
            <ArrowRight className="size-4" aria-hidden />
          </span>
        </div>
      </Link>
    </Card>
  );
}
