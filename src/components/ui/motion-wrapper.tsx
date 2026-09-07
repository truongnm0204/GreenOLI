"use client";

import React from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  type HTMLMotionProps,
} from "framer-motion";
import { cn } from "@/lib/cn";

interface MotionWrapperProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  duration?: number;
  className?: string;
  viewportAmount?: number | "some" | "all";
  /**
   * `view` (default): animate when scrolled into viewport.
   * `mount`: animate as soon as the component mounts (use for above-the-fold).
   */
  trigger?: "view" | "mount";
}

const directions = {
  up: { y: 20, x: 0 },
  down: { y: -20, x: 0 },
  left: { x: 20, y: 0 },
  right: { x: -20, y: 0 },
  none: { x: 0, y: 0 },
};

/**
 * Scroll / mount reveal wrapper.
 *
 * Designed to ensure content is NEVER hidden in SSR or if scrolling fast.
 * - During SSR / before mount: renders semantic visible markup (no opacity:0).
 * - Positive margin (150px) triggers before element reaches viewport bottom.
 * - Scroll/resize fallback ensures visibility even if IntersectionObserver misses.
 */
export function MotionWrapper({
  children,
  delay = 0,
  direction = "up",
  duration = 0.25,
  className,
  viewportAmount = 0,
  trigger = "view",
  ...props
}: MotionWrapperProps) {
  const reduceMotion = useReducedMotion();
  const ref = React.useRef<HTMLDivElement | null>(null);

  // Positive bottom margin so animation triggers 150px BEFORE element enters view
  const inView = useInView(ref, {
    once: true,
    amount: viewportAmount === "all" ? 1 : viewportAmount === "some" ? 0.05 : viewportAmount,
    margin: "0px 0px 150px 0px",
  });

  const [fallbackVisible, setFallbackVisible] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    if (trigger === "mount" || reduceMotion) {
      setFallbackVisible(true);
      return;
    }

    const check = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      // If element is within 200px of viewport bottom or already scrolled past
      if (rect.top < vh + 200 && rect.bottom > -100) {
        setFallbackVisible(true);
        window.removeEventListener("scroll", check);
        window.removeEventListener("resize", check);
      }
    };

    // Initial check after mount
    check();
    const raf = requestAnimationFrame(check);

    // Also listen to scroll/resize as fallback in case IntersectionObserver lags
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, [trigger, reduceMotion]);

  if (reduceMotion) {
    return (
      <div
        className={cn(className)}
        {...(props as React.HTMLAttributes<HTMLDivElement>)}
      >
        {children}
      </div>
    );
  }

  // During SSR (not mounted yet), render clean HTML without opacity: 0.
  // This ensures SEO crawlers and initial paint never see blank or missing sections.
  if (!mounted) {
    return (
      <div
        ref={ref}
        className={cn(className)}
        {...(props as React.HTMLAttributes<HTMLDivElement>)}
      >
        {children}
      </div>
    );
  }

  const show = trigger === "mount" || inView || fallbackVisible;

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        ...directions[direction],
      }}
      animate={
        show
          ? {
              opacity: 1,
              x: 0,
              y: 0,
            }
          : {
              opacity: 0,
              ...directions[direction],
            }
      }
      transition={{
        duration,
        delay: show ? delay : 0,
        ease: [0.25, 0.25, 0, 1],
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}
