import { Breadcrumb, type BreadcrumbItem } from "@/components/ui/breadcrumb";
import { cn } from "@/lib/cn";

type PageHeaderProps = {
  /** Bỏ trống khi trang đã có H1 riêng (vd trang SP) — chỉ hiện breadcrumb. */
  title?: string;
  description?: string;
  breadcrumb?: BreadcrumbItem[];
  className?: string;
  align?: "left" | "center";
  /** compact: ít padding — dùng khi chỉ breadcrumb */
  compact?: boolean;
};

export function PageHeader({
  title,
  description,
  breadcrumb,
  className,
  align = "left",
  compact,
}: PageHeaderProps) {
  const onlyCrumb = !title && !description;
  const isCompact = compact ?? onlyCrumb;

  return (
    <header
      className={cn(
        "relative overflow-hidden border-b border-primary/20",
        isCompact ? "py-6 md:py-8" : "py-12 md:py-16",
        className,
      )}
      style={{
        background:
          "linear-gradient(135deg, #e8f5c8 0%, #f0fadf 40%, #eaf6d5 100%)",
      }}
    >
      <div className="pointer-events-none absolute inset-0 z-0 botanical-leaf-pattern opacity-80" />
      <div className="container-page relative z-10">
        {breadcrumb && breadcrumb.length > 0 ? (
          <Breadcrumb
            items={breadcrumb}
            className={cn("animate-fade-in", title || description ? "mb-6" : "mb-0")}
          />
        ) : null}
        {title || description ? (
          <div
            className={cn(
              "max-w-3xl",
              align === "center" && "mx-auto text-center",
            )}
          >
            {title ? (
              <h1
                className="text-3xl font-bold tracking-tight text-text-primary md:text-4xl lg:text-5xl animate-fade-up"
                style={{ animationDelay: "40ms" }}
              >
                {title}
              </h1>
            ) : null}
            {description ? (
              <p
                className="mt-4 text-base leading-relaxed text-text-muted md:text-lg animate-fade-up"
                style={{ animationDelay: "120ms" }}
              >
                {description}
              </p>
            ) : null}
          </div>
        ) : null}
      </div>
    </header>
  );
}
