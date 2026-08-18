import { Search } from "lucide-react";
import { cn } from "@/lib/cn";

type HiddenField = { name: string; value: string };

type ProductSearchFieldProps = {
  /** Form GET action path (default /cua-hang). */
  action?: string;
  /** Prefilled q value. */
  defaultValue?: string;
  /** Hidden fields preserved on submit (category, brand, sort…). */
  hiddenFields?: HiddenField[];
  placeholder?: string;
  /** Accessible name for the text input. */
  ariaLabel?: string;
  /** Visual size variant. */
  size?: "sm" | "md";
  className?: string;
  inputClassName?: string;
  id?: string;
};

/**
 * Progressive-enhancement product search: form GET → action?q=…
 * Reusable in header and shop surfaces.
 */
export function ProductSearchField({
  action = "/cua-hang",
  defaultValue = "",
  hiddenFields = [],
  placeholder = "Tìm sản phẩm…",
  ariaLabel = "Tìm kiếm sản phẩm",
  size = "md",
  className,
  inputClassName,
  id,
}: ProductSearchFieldProps) {
  const inputId = id ?? "shop-product-search";
  const isSm = size === "sm";

  return (
    <form
      action={action}
      method="get"
      role="search"
      className={cn("relative flex w-full items-center", className)}
    >
      {hiddenFields.map((field) => (
        <input
          key={field.name}
          type="hidden"
          name={field.name}
          value={field.value}
        />
      ))}
      <label htmlFor={inputId} className="sr-only">
        {ariaLabel}
      </label>
      <Search
        className={cn(
          "pointer-events-none absolute left-3 text-text-muted",
          "size-4",
        )}
        aria-hidden
      />
      <input
        id={inputId}
        type="search"
        name="q"
        defaultValue={defaultValue}
        placeholder={placeholder}
        autoComplete="off"
        enterKeyHint="search"
        className={cn(
          "w-full rounded-input border border-border-soft bg-surface-container-lowest",
          "text-text-primary placeholder:text-text-muted",
          "transition-colors duration-200",
          "focus:outline-none focus:border-primary focus:ring-0",
          isSm ? "h-9 pl-9 pr-3 text-sm" : "h-11 pl-10 pr-4 text-sm md:text-base",
          inputClassName,
        )}
      />
      <button
        type="submit"
        className={cn(
          "sr-only focus:not-sr-only focus:absolute focus:right-1 focus:top-1/2 focus:-translate-y-1/2",
          "rounded-button bg-primary px-3 py-1.5 text-xs font-medium text-on-primary",
        )}
      >
        Tìm
      </button>
    </form>
  );
}
