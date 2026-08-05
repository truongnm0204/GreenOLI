"use client";

import * as React from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { cn } from "@/lib/cn";
import type { GalleryItem } from "@/types/product";

type Props = {
  images: GalleryItem[];
  alt: string;
  /**
   * Index ảnh/video cần hiển thị — được điều khiển từ variant selector bên ngoài.
   * Khi thay đổi, carousel tự scroll đến đúng vị trí.
   */
  activeIndex?: number;
};

/** Kiểm tra item có phải video không */
const isVideo = (item: GalleryItem) =>
  item.mimeType?.startsWith("video/") ?? false;

/** Render một slide: <video> hoặc <Image> tùy mimeType */
function GallerySlide({
  item,
  alt,
  priority = false,
}: {
  item: GalleryItem;
  alt: string;
  priority?: boolean;
}) {
  if (isVideo(item)) {
    return (
      <video
        src={item.url}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-contain bg-white"
        aria-label={alt}
      />
    );
  }
  return (
    <Image
      src={item.url}
      alt={alt}
      fill
      sizes="(max-width: 1024px) 100vw, 50vw"
      priority={priority}
      className="object-contain bg-white"
    />
  );
}

/** Thumbnail: video hiện overlay play icon */
function GalleryThumb({
  item,
  alt: _alt,
  selected,
  onClick,
  index,
}: {
  item: GalleryItem;
  alt: string;
  selected: boolean;
  onClick: () => void;
  index: number;
}) {
  void _alt;
  const video = isVideo(item);
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Xem ${video ? "video" : "ảnh"} ${index + 1}`}
      aria-pressed={selected}
      className={cn(
        "relative flex-none size-20 rounded-input overflow-hidden border-2 transition-colors",
        selected
          ? "border-primary"
          : "border-transparent hover:border-border-soft",
      )}
    >
      {video ? (
        <>
          {/* Video thumbnail — dùng poster frame đầu tiên */}
          <video
            src={item.url}
            muted
            playsInline
            preload="metadata"
            className="absolute inset-0 h-full w-full object-contain bg-white pointer-events-none"
          />
          {/* Play overlay */}
          <span className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-input">
            <Play className="size-5 text-white fill-white" aria-hidden />
          </span>
        </>
      ) : (
        <Image
          src={item.url}
          alt={`Thumbnail ${index + 1}`}
          fill
          sizes="80px"
          className="object-contain bg-white"
        />
      )}
    </button>
  );
}

export function ProductGallery({ images, alt, activeIndex }: Props) {
  const [mainRef, mainApi] = useEmblaCarousel({ loop: true });
  const [thumbRef, thumbApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });
  const [selected, setSelected] = React.useState(0);

  // Scroll đến slide khi variant được chọn từ bên ngoài
  React.useEffect(() => {
    if (activeIndex === undefined || activeIndex < 0 || !mainApi) return;
    mainApi.scrollTo(activeIndex, false);
  }, [activeIndex, mainApi]);

  const onThumbClick = (idx: number) => {
    if (!mainApi) return;
    mainApi.scrollTo(idx);
  };

  React.useEffect(() => {
    if (!mainApi || !thumbApi) return;
    const onSelect = () => {
      const idx = mainApi.selectedScrollSnap();
      setSelected(idx);
      thumbApi.scrollTo(idx);
    };
    mainApi.on("select", onSelect);
    onSelect();
    return () => {
      mainApi.off("select", onSelect);
    };
  }, [mainApi, thumbApi]);

  return (
    <div className="space-y-3">
      {/* Main slide */}
      <div className="relative overflow-hidden rounded-card bg-surface-light shadow-ambient">
        <div ref={mainRef}>
          <div className="flex">
            {images.map((item, idx) => (
              <div key={idx} className="relative flex-[0_0_100%] aspect-square">
                <GallerySlide item={item} alt={`${alt} – ${idx + 1}`} priority={idx === 0} />
              </div>
            ))}
          </div>
        </div>

        {images.length > 1 && (
          <>
            <button
              type="button"
              aria-label="Ảnh trước"
              onClick={() => mainApi?.scrollPrev()}
              className="absolute left-3 top-1/2 -translate-y-1/2 grid size-10 place-items-center rounded-full bg-surface-container-lowest/95 shadow-ambient hover:bg-primary hover:text-on-primary transition-colors"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              aria-label="Ảnh kế tiếp"
              onClick={() => mainApi?.scrollNext()}
              className="absolute right-3 top-1/2 -translate-y-1/2 grid size-10 place-items-center rounded-full bg-surface-container-lowest/95 shadow-ambient hover:bg-primary hover:text-on-primary transition-colors"
            >
              <ChevronRight className="size-5" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="overflow-hidden" ref={thumbRef}>
          <div className="flex gap-3">
            {images.map((item, idx) => (
              <GalleryThumb
                key={idx}
                item={item}
                alt={alt}
                selected={idx === selected}
                onClick={() => onThumbClick(idx)}
                index={idx}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
