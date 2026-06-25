import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/cn";

export type BreadcrumbItem = {
  label: string;
  href?: string; // omit href to render as the active terminal item
};

type BreadcrumbProps = {
  items: BreadcrumbItem[];
  className?: string;
};

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn("text-sm", className)}>
      <ol className="flex flex-wrap items-center gap-1.5 text-text-muted">
        <li className="flex items-center gap-1.5">
          <Link
            href="/"
            className="flex items-center gap-1 text-text-muted transition-colors hover:text-primary-dark"
            aria-label="Trang chủ"
          >
            <Home className="size-4" aria-hidden />
            <span className="sr-only">Trang chủ</span>
          </Link>
        </li>
        {items.map((item, idx) => (
          <li key={idx} className="flex items-center gap-1.5">
            <ChevronRight className="size-4 text-text-muted/60" aria-hidden />
            {item.href ? (
              <Link
                href={item.href}
                className="text-text-muted transition-colors hover:text-primary-dark"
              >
                {item.label}
              </Link>
            ) : (
              <span className="font-medium text-text-primary" aria-current="page">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
