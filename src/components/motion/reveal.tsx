"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

type RevealVariant =
  | "fade-in"
  | "fade-up"
  | "slide-left"
  | "slide-right"
  | "scale-in"
  | "blur-in";

type RevealProps<T extends keyof React.JSX.IntrinsicElements = "div"> = {
  as?: T;
  children: React.ReactNode;
  className?: string;
  variant?: RevealVariant;
  delay?: number;
  duration?: number;
  once?: boolean;
  rootMargin?: string;
  threshold?: number;
} & Omit<React.ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

const VARIANT_CLASS: Record<RevealVariant, string> = {
  "fade-in": "motion-reveal-fade-in",
  "fade-up": "motion-reveal-fade-up",
  "slide-left": "motion-reveal-slide-left",
  "slide-right": "motion-reveal-slide-right",
  "scale-in": "motion-reveal-scale-in",
  "blur-in": "motion-reveal-blur-in",
};

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Reveal on scroll — client wrapper nhỏ, dùng IntersectionObserver.
 * Nội dung vẫn SSR bình thường; JS chỉ đổi data attribute để bật CSS transition.
 */
export function Reveal<T extends keyof React.JSX.IntrinsicElements = "div">({
  as,
  children,
  className,
  variant = "fade-up",
  delay = 0,
  duration = 640,
  once = true,
  rootMargin = "0px 0px -12% 0px",
  threshold = 0.12,
  style,
  ...props
}: RevealProps<T>) {
  const [visible, setVisible] = React.useState(false);
  const observerRef = React.useRef<IntersectionObserver | null>(null);

  const ref = React.useCallback(
    (node: HTMLElement | null) => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }

      if (!node) return;

      if (prefersReducedMotion() || !("IntersectionObserver" in window)) {
        setVisible(true);
        return;
      }

      observerRef.current = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisible(true);
            if (once) observerRef.current?.disconnect();
          } else if (!once) {
            setVisible(false);
          }
        },
        { rootMargin, threshold },
      );

      observerRef.current.observe(node);
    },
    [once, rootMargin, threshold],
  );

  const Component = (as ?? "div") as React.ElementType;

  return (
    <Component
      ref={ref}
      className={cn("motion-reveal", VARIANT_CLASS[variant], className)}
      data-reveal-state={visible ? "visible" : "hidden"}
      style={
        {
          "--motion-delay": `${delay}ms`,
          "--motion-duration": `${duration}ms`,
          ...style,
        } as React.CSSProperties
      }
      {...props}
    >
      {children}
    </Component>
  );
}
