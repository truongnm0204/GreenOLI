"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { cn } from "@/lib/cn";

export type LightboxItem = {
  src: string;
  alt?: string;
};

type Props = {
  open: boolean;
  items: LightboxItem[];
  index: number;
  onClose: () => void;
  onIndexChange: (index: number) => void;
};

/**
 * Lightbox ảnh full-screen — keyboard Esc/←/→, click backdrop đóng.
 */
export function ImageLightbox({
  open,
  items,
  index,
  onClose,
  onIndexChange,
}: Props) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  React.useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") {
        onIndexChange((index - 1 + items.length) % items.length);
      }
      if (e.key === "ArrowRight") {
        onIndexChange((index + 1) % items.length);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, index, items.length, onClose, onIndexChange]);

  if (!mounted || !open || !items.length) return null;

  const safeIndex = ((index % items.length) + items.length) % items.length;
  const current = items[safeIndex];

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Xem ảnh phóng to"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-3 sm:p-6"
      onClick={onClose}
    >
      <button
        type="button"
        aria-label="Đóng"
        onClick={onClose}
        className="absolute right-3 top-3 z-10 grid size-11 place-items-center rounded-full bg-white/10 text-white backdrop-blur hover:bg-white/20 sm:right-5 sm:top-5"
      >
        <X className="size-6" />
      </button>

      {items.length > 1 ? (
        <>
          <button
            type="button"
            aria-label="Ảnh trước"
            className="absolute left-2 top-1/2 z-10 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white backdrop-blur hover:bg-white/20 sm:left-4"
            onClick={(e) => {
              e.stopPropagation();
              onIndexChange((safeIndex - 1 + items.length) % items.length);
            }}
          >
            <ChevronLeft className="size-6" />
          </button>
          <button
            type="button"
            aria-label="Ảnh kế"
            className="absolute right-2 top-1/2 z-10 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white backdrop-blur hover:bg-white/20 sm:right-4"
            onClick={(e) => {
              e.stopPropagation();
              onIndexChange((safeIndex + 1) % items.length);
            }}
          >
            <ChevronRight className="size-6" />
          </button>
        </>
      ) : null}

      <div
        className="relative flex max-h-full max-w-full flex-col items-center gap-3"
        onClick={(e) => e.stopPropagation()}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={current.src}
          alt={current.alt || "Ảnh sản phẩm"}
          className="max-h-[min(85vh,900px)] max-w-[min(96vw,1200px)] object-contain"
        />
        <div className="flex max-w-full items-center gap-3 px-2 text-center text-sm text-white/80">
          {items.length > 1 ? (
            <span className="shrink-0 tabular-nums">
              {safeIndex + 1}/{items.length}
            </span>
          ) : null}
          {current.alt ? (
            <span className="truncate italic">{current.alt}</span>
          ) : null}
        </div>
      </div>
    </div>,
    document.body,
  );
}

/** Nút gợi ý zoom — dùng overlay gallery */
export function ZoomHint({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "pointer-events-none absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-full bg-black/55 px-2.5 py-1 text-xs font-medium text-white backdrop-blur",
        className,
      )}
    >
      <ZoomIn className="size-3.5" aria-hidden />
      Phóng to
    </span>
  );
}
