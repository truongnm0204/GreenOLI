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

/**
 * Scroll / mount reveal wrapper.
 *
 * Important: never leave above-the-fold content stuck at opacity:0.
 * Framer `whileInView` can miss the first paint (SSR hydration, full-viewport
 * heroes, sticky headers) — user only sees content after a client navigation.
 * We combine useInView + a layout fallback that forces visible if the node
 * already intersects the viewport after mount.
 */
export function MotionWrapper({
  children,
  delay = 0,
  direction = "up",
  duration = 0.3,
  className,
  viewportAmount = 0.05,
  trigger = "view",
  ...props
}: MotionWrapperProps) {
  const reduceMotion = useReducedMotion();
  const ref = React.useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, {
    once: true,
    amount: viewportAmount === "all" ? 1 : viewportAmount === "some" ? 0.05 : viewportAmount,
    // Trigger a bit before the element fully enters (helps full-bleed heroes).
    margin: "0px 0px -8% 0px",
  });
  const [fallbackVisible, setFallbackVisible] = React.useState(false);

  React.useEffect(() => {
    if (trigger === "mount" || reduceMotion) {
      setFallbackVisible(true);
      return;
    }
    const el = ref.current;
    if (!el || typeof window === "undefined") return;

    const check = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const vw = window.innerWidth || document.documentElement.clientWidth;
      const visible =
        rect.width > 0 &&
        rect.height > 0 &&
        rect.bottom > 0 &&
        rect.right > 0 &&
        rect.top < vh &&
        rect.left < vw;
      if (visible) setFallbackVisible(true);
    };

    // After layout/paint — catches "already in view" cases IO missed on hydrate.
    const raf = requestAnimationFrame(() => {
      check();
      // Second pass after fonts/images may shift layout
      window.setTimeout(check, 120);
    });

    return () => cancelAnimationFrame(raf);
  }, [trigger, reduceMotion]);

  const directions = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { x: 40, y: 0 },
    right: { x: -40, y: 0 },
    none: { x: 0, y: 0 },
  };

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
