"use client";

import * as React from "react";
import {
  ImageLightbox,
  type LightboxItem,
} from "@/components/ui/image-lightbox";

type Props = {
  /** Root selector chứa dung mô tả */
  contentSelector?: string;
  children: React.ReactNode;
};

/**
 * Bọc mô tả: click ảnh (img trong description) → lightbox, Esc/←/→.
 */
export function DescriptionImageZoom({
  contentSelector = "[data-product-description]",
  children,
}: Props) {
  const wrapRef = React.useRef<HTMLDivElement>(null);
  const [open, setOpen] = React.useState(false);
  const [index, setIndex] = React.useState(0);
  const [items, setItems] = React.useState<LightboxItem[]>([]);

  const collect = React.useCallback((): LightboxItem[] => {
    const root =
      wrapRef.current?.querySelector(contentSelector) ?? wrapRef.current;
    if (!root) return [];
    const imgs = Array.from(
      root.querySelectorAll<HTMLImageElement>("img[src]"),
    );
    return imgs
      .map((img) => ({
        src: img.currentSrc || img.src,
        alt: img.alt || "Ảnh mô tả",
      }))
      .filter((i) => Boolean(i.src));
  }, [contentSelector]);

  React.useEffect(() => {
    const root = wrapRef.current;
    if (!root) return;

    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const img = target?.closest?.("img");
      if (!img || !root.contains(img)) return;
      // bỏ qua icon nhỏ / decorative
      if (img.closest("a[download], button")) return;
      const list = collect();
      if (!list.length) return;
      const src = (img as HTMLImageElement).currentSrc || (img as HTMLImageElement).src;
      const idx = list.findIndex((i) => i.src === src);
      setItems(list);
      setIndex(idx >= 0 ? idx : 0);
      setOpen(true);
      e.preventDefault();
    };

    root.addEventListener("click", onClick);
    return () => root.removeEventListener("click", onClick);
  }, [collect]);

  // cursor zoom-in cho ảnh mô tả
  React.useEffect(() => {
    const root =
      wrapRef.current?.querySelector(contentSelector) ?? wrapRef.current;
    if (!root) return;
    const imgs = root.querySelectorAll<HTMLImageElement>("img[src]");
    imgs.forEach((img) => {
      img.style.cursor = "zoom-in";
      img.setAttribute("data-zoomable", "true");
    });
  });

  return (
    <div ref={wrapRef}>
      {children}
      <ImageLightbox
        open={open}
        items={items}
        index={index}
        onClose={() => setOpen(false)}
        onIndexChange={setIndex}
      />
    </div>
  );
}
