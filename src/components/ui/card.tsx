import * as React from "react";
import { cn } from "@/lib/cn";

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  as?: keyof React.JSX.IntrinsicElements;
  padding?: "none" | "sm" | "md" | "lg";
};

const PADDING_CLASSES = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

export function Card({
  as: Tag = "div",
  padding = "md",
  className,
  children,
  ...rest
}: CardProps) {
  const Component = Tag as React.ElementType;
  return (
    <Component
      className={cn(
        "bg-surface-container-lowest rounded-card shadow-ambient",
        "border border-border-soft/60",
        "transition-shadow duration-300 hover:shadow-ambient-lg",
        PADDING_CLASSES[padding],
        className,
      )}
      {...rest}
    >
      {children}
    </Component>
  );
}
