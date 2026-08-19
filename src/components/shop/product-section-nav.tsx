"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export type SectionNavItem = {
  id: string;
  label: string;
};

type Props = {
  items: SectionNavItem[];
};

/**
 * Sticky subnav trên trang SP: Mô tả | Kỹ thuật | Tài liệu | Báo giá
 */
export function ProductSectionNav({ items }: Props) {
  const [active, setActive] = React.useState(items[0]?.id ?? "");

  React.useEffect(() => {
    if (!items.length) return;
    const els = items
      .map((i) => document.getElementById(i.id))
      .filter(Boolean) as HTMLElement[];
    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (hit?.target?.id) setActive(hit.target.id);
      },
      { rootMargin: "-25% 0px -55% 0px", threshold: [0, 0.2, 0.5] },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [items]);

  if (items.length < 2) return null;

  return (
    <div className="sticky top-16 z-30 border-b border-border-soft/70 bg-surface-lowest/90 backdrop-blur-md md:top-20">
      <div className="container-page">
        <nav
          aria-label="Mục trên trang sản phẩm"
          className="-mx-1 flex gap-1 overflow-x-auto py-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {items.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={cn(
                "shrink-0 rounded-full px-3.5 py-1.5 text-sm font-semibold transition-colors",
                active === item.id
                  ? "bg-primary text-on-primary shadow-sm"
                  : "bg-surface-light text-text-muted hover:bg-primary/10 hover:text-primary-dark",
              )}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}
