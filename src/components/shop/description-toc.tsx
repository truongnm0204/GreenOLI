"use client";

import * as React from "react";
import { ListTree } from "lucide-react";
import { cn } from "@/lib/cn";
import type { TocItem } from "@/lib/description-toc";

type Props = {
  items: TocItem[];
  /** selector root chứa dung mô tả để gán id heading theo thứ tự */
  contentSelector?: string;
};

/**
 * Mục lục H2/H3 — mobile collapsible, desktop sticky.
 * Gán id lên heading trong DOM theo đúng thứ tự extract từ Lexical JSON.
 */
export function DescriptionToc({
  items,
  contentSelector = "[data-product-description]",
}: Props) {
  const [open, setOpen] = React.useState(false);
  const [activeId, setActiveId] = React.useState<string>("");

  // Gán id + observe active section
  React.useEffect(() => {
    if (!items.length) return;
    const root = document.querySelector(contentSelector);
    if (!root) return;

    const headings = Array.from(
      root.querySelectorAll<HTMLElement>("h2, h3"),
    );
    const paired: Array<{ el: HTMLElement; id: string }> = [];
    let hi = 0;
    for (const item of items) {
      while (hi < headings.length) {
        const el = headings[hi++];
        const tag = el.tagName.toLowerCase();
        const level = tag === "h2" ? 2 : tag === "h3" ? 3 : 0;
        if (level !== item.level) continue;
        el.id = item.id;
        el.classList.add("scroll-mt-28");
        paired.push({ el, id: item.id });
        break;
      }
    }

    if (!paired.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target?.id) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-20% 0px -60% 0px",
        threshold: [0, 0.25, 0.5, 1],
      },
    );
    paired.forEach(({ el }) => io.observe(el));
    return () => io.disconnect();
  }, [items, contentSelector]);

  if (items.length < 2) return null;

  const nav = (
    <nav aria-label="Mục lục mô tả" className="space-y-1">
      {items.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          onClick={() => setOpen(false)}
          className={cn(
            "block rounded-lg px-2.5 py-1.5 text-sm leading-snug transition-colors",
            item.level === 3 && "pl-5 text-[13px]",
            activeId === item.id
              ? "bg-primary/10 font-semibold text-primary-dark"
              : "text-text-muted hover:bg-surface-container hover:text-text-primary",
          )}
        >
          {item.text}
        </a>
      ))}
    </nav>
  );

  return (
    <>
      {/* Mobile */}
      <div className="mb-5 lg:hidden">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex w-full items-center justify-between gap-2 rounded-2xl border border-border-soft bg-surface-light px-4 py-3 text-left text-sm font-semibold text-text-primary"
          aria-expanded={open}
        >
          <span className="inline-flex items-center gap-2">
            <ListTree className="size-4 text-primary-dark" aria-hidden />
            Mục lục ({items.length})
          </span>
          <span className="text-text-muted">{open ? "Ẩn" : "Hiện"}</span>
        </button>
        {open ? (
          <div className="mt-2 rounded-2xl border border-border-soft bg-white p-3 shadow-sm">
            {nav}
          </div>
        ) : null}
      </div>

      {/* Desktop sticky */}
      <aside className="hidden lg:block">
        <div className="sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto rounded-2xl border border-border-soft/70 bg-surface-light/80 p-4 backdrop-blur">
          <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-text-muted">
            <ListTree className="size-3.5" aria-hidden />
            Mục lục
          </p>
          {nav}
        </div>
      </aside>
    </>
  );
}
