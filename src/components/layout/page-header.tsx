import { Breadcrumb, type BreadcrumbItem } from "@/components/ui/breadcrumb";
import { cn } from "@/lib/cn";

type PageHeaderProps = {
  title: string;
  description?: string;
  breadcrumb?: BreadcrumbItem[];
  className?: string;
  align?: "left" | "center";
};

export function PageHeader({
  title,
  description,
  breadcrumb,
  className,
  align = "left",
}: PageHeaderProps) {
  return (
    <header
      className={cn(
        "relative overflow-hidden bg-surface-light molecular-pattern",
        "py-12 md:py-16",
        className,
      )}
    >
      <div className="container-page">
        {breadcrumb && breadcrumb.length > 0 ? (
          <Breadcrumb items={breadcrumb} className="mb-6" />
        ) : null}
        <div
          className={cn(
            "max-w-3xl",
            align === "center" && "mx-auto text-center",
          )}
        >
          <h1 className="font-bold tracking-tight text-text-primary text-3xl md:text-4xl lg:text-5xl">
            {title}
          </h1>
          {description ? (
            <p className="mt-4 text-base md:text-lg text-text-muted leading-relaxed">
              {description}
            </p>
          ) : null}
        </div>
      </div>
    </header>
  );
}
