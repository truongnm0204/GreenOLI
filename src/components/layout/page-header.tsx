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
        "relative overflow-hidden py-12 md:py-16 border-b border-primary/20",
        className,
      )}
      style={{ background: "linear-gradient(135deg, #e8f5c8 0%, #f0fadf 40%, #eaf6d5 100%)" }}
    >
      <div className="absolute inset-0 botanical-leaf-pattern opacity-80 pointer-events-none z-0" />
      <div className="container-page">
        {breadcrumb && breadcrumb.length > 0 ? (
          <Breadcrumb items={breadcrumb} className="mb-6 animate-fade-in" />
        ) : null}
        <div
          className={cn(
            "max-w-3xl",
            align === "center" && "mx-auto text-center",
          )}
        >
          <h1
            className="font-bold tracking-tight text-text-primary text-3xl md:text-4xl lg:text-5xl animate-fade-up"
            style={{ animationDelay: "40ms" }}
          >
            {title}
          </h1>
          {description ? (
            <p
              className="mt-4 text-base md:text-lg text-text-muted leading-relaxed animate-fade-up"
              style={{ animationDelay: "120ms" }}
            >
              {description}
            </p>
          ) : null}
        </div>
      </div>
    </header>
  );
}
