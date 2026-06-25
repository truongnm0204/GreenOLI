import * as React from "react";
import { cn } from "@/lib/cn";

type ChipVariant = "primary" | "secondary" | "neutral" | "success";

const VARIANT_CLASSES: Record<ChipVariant, string> = {
  primary: "bg-primary/10 text-primary-dark border-primary/20",
  secondary: "bg-secondary/10 text-secondary-strong border-secondary/20",
  neutral: "bg-surface-container text-text-primary border-border-soft",
  success: "bg-primary/15 text-primary-dark border-primary/30",
};

type ChipProps = React.HTMLAttributes<HTMLSpanElement> & {
  variant?: ChipVariant;
};

export function Chip({
  variant = "primary",
  className,
  children,
  ...rest
}: ChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-chip border px-3 py-1",
        "text-xs font-medium leading-tight",
        VARIANT_CLASSES[variant],
        className,
      )}
      {...rest}
    >
      {children}
    </span>
  );
}
