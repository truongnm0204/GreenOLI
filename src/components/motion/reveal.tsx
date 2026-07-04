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

/**
 * Reveal on scroll — client wrapper nhỏ, dùng IntersectionObserver.
 * Nội dung vẫn SSR bình thường; JS đổi data-reveal-state để bật CSS transition.
 *
 * Dùng useRef + useEffect — pattern đáng tin cậy nhất với SSR, React 19 và
 * Strict Mode (double-invoke). Observer luôn được cleanup đúng khi unmount.
 */
export function Reveal<T extends keyof React.JSX.IntrinsicElements = "div">({
  as,
  children,
  className,
  variant = "fade-up",
  delay = 0,
  duration = 640,
  once = true,
  rootMargin = "0px 0px -8% 0px",
  threshold = 0.1,
  style,
  ...props
}: RevealProps<T>) {
  const elementRef = React.useRef<HTMLElement | null>(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const node = elementRef.current;
    if (!node) return;

    // Reduced motion → hiển thị ngay, không cần observer
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setVisible(true);
      return;
    }

    // Fallback nếu trình duyệt không hỗ trợ IntersectionObserver
    if (!("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setVisible(false);
        }
      },
      { rootMargin, threshold },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
    // Props này không thay đổi sau mount nên safe để bỏ qua eslint rule
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const Component = (as ?? "div") as React.ElementType;

  return (
    <Component
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={elementRef as any}
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
