"use client";

import * as React from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { cn } from "@/lib/cn";
import type { GalleryItem } from "@/types/product";
import {
  ImageLightbox,
  ZoomHint,
  type LightboxItem,
} from "@/components/ui/image-lightbox";

type Props = {
  images: GalleryItem[];
  alt: string;
  /**
   * Index ảnh/video cần hiển thị — điều khiển từ variant selector.
   */
  activeIndex?: number;
};

const isVideo = (item: GalleryItem) =>
  item.mimeType?.startsWith("video/") ?? false;

function GallerySlide({
  item,
  alt,
  priority = false,
}: {
  item: GalleryItem;
  alt: string;
  priority?: boolean;
}) {
  const [loaded, setLoaded] = React.useState(false);

  if (isVideo(item)) {
    return (
      <video
        src={item.url}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full bg-white object-contain"
        aria-label={alt}
      />
    );
  }
  return (
    <>
      {!loaded ? (
        <div
          className="absolute inset-0 animate-pulse bg-gradient-to-br from-surface-container via-surface-light to-surface-container"
          aria-hidden
        />
      ) : null}
      <Image
        src={item.url}
        alt={alt}
        fill
        sizes="(max-width: 1024px) 100vw, 50vw"
        priority={priority}
        onLoad={() => setLoaded(true)}
        className={cn(
          "bg-white object-contain transition-opacity duration-300",
          loaded ? "opacity-100" : "opacity-0",
        )}
      />
    </>
  );
}

function GalleryThumb({
  item,
  selected,
  onClick,
  index,
}: {
  item: GalleryItem;
  selected: boolean;
  onClick: () => void;
  index: number;
}) {
  const video = isVideo(item);
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Xem ${video ? "video" : "ảnh"} ${index + 1}`}
      aria-pressed={selected}
      className={cn(
        "relative size-20 flex-none overflow-hidden rounded-input border-2 transition-colors",
        selected
          ? "border-primary"
          : "border-transparent hover:border-border-soft",
      )}
    >
      {video ? (
        <>
          <video
            src={item.url}
            muted
            playsInline
            preload="metadata"
            className="pointer-events-none absolute inset-0 h-full w-full bg-white object-contain"
          />
          <span className="absolute inset-0 flex items-center justify-center rounded-input bg-black/30">
            <Play className="size-5 fill-white text-white" aria-hidden />
          </span>
        </>
      ) : (
        <Image
          src={item.url}
          alt={`Thumbnail ${index + 1}`}
          fill
          sizes="80px"
          className="bg-white object-contain"
        />
      )}
    </button>
  );
}

export function ProductGallery({ images, alt, activeIndex }: Props) {
  const safeImages = React.useMemo(
    () => (images ?? []).filter((i) => Boolean(i?.url)),
    [images],
  );

  const [mainRef, mainApi] = useEmblaCarousel({ loop: safeImages.length > 1 });
  const [thumbRef, thumbApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });
  const [selected, setSelected] = React.useState(0);
  const [lightboxOpen, setLightboxOpen] = React.useState(false);
  const [lightboxIndex, setLightboxIndex] = React.useState(0);

  const imageOnly = React.useMemo(() => {
    const items: LightboxItem[] = [];
    const map: number[] = []; // gallery idx → lightbox idx
    safeImages.forEach((item, i) => {
      if (isVideo(item) || !item.url) {
        map[i] = -1;
        return;
      }
      map[i] = items.length;
      items.push({ src: item.url, alt: `${alt} – ${i + 1}` });
    });
    return { items, map };
  }, [safeImages, alt]);

  React.useEffect(() => {
    if (activeIndex === undefined || activeIndex < 0 || !mainApi) return;
    if (activeIndex >= safeImages.length) return;
    mainApi.scrollTo(activeIndex, false);
  }, [activeIndex, mainApi, safeImages.length]);

  const onThumbClick = (idx: number) => {
    mainApi?.scrollTo(idx);
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

  const openLightboxFor = (galleryIdx: number) => {
    const li = imageOnly.map[galleryIdx];
    if (li == null || li < 0) return;
    setLightboxIndex(li);
    setLightboxOpen(true);
  };

  if (!safeImages.length) {
    return (
      <div className="relative aspect-square overflow-hidden rounded-card bg-surface-light shadow-ambient">
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-surface-container via-surface-light to-surface-container px-6 text-center">
          <span className="text-sm font-semibold text-text-muted">
            Chưa có ảnh sản phẩm
          </span>
          <span className="text-xs text-text-muted/80">{alt}</span>
        </div>
      </div>
    );
  }

  const currentIsImage = !isVideo(safeImages[selected] ?? { url: "" });

  return (
    <div className="space-y-3">
      <div className="relative overflow-hidden rounded-card bg-surface-light shadow-ambient">
        <div ref={mainRef}>
          <div className="flex">
            {safeImages.map((item, idx) => {
              const canZoom = !isVideo(item);
              return (
                <div
                  key={`${item.url}-${idx}`}
                  className="relative aspect-square flex-[0_0_100%]"
                >
                  {canZoom ? (
                    <button
                      type="button"
                      className="absolute inset-0 z-[1] cursor-zoom-in"
                      aria-label={`Phóng to ảnh ${idx + 1}`}
                      onClick={() => openLightboxFor(idx)}
                    />
                  ) : null}
                  <GallerySlide
                    item={item}
                    alt={`${alt} – ${idx + 1}`}
                    priority={idx === 0}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {currentIsImage && imageOnly.items.length > 0 ? <ZoomHint /> : null}

        {safeImages.length > 1 && (
          <>
            <button
              type="button"
              aria-label="Ảnh trước"
              onClick={() => mainApi?.scrollPrev()}
              className="absolute left-3 top-1/2 z-[2] grid size-10 -translate-y-1/2 place-items-center rounded-full bg-surface-container-lowest/95 shadow-ambient transition-colors hover:bg-primary hover:text-on-primary"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              aria-label="Ảnh kế tiếp"
              onClick={() => mainApi?.scrollNext()}
              className="absolute right-3 top-1/2 z-[2] grid size-10 -translate-y-1/2 place-items-center rounded-full bg-surface-container-lowest/95 shadow-ambient transition-colors hover:bg-primary hover:text-on-primary"
            >
              <ChevronRight className="size-5" />
            </button>
          </>
        )}
      </div>

      {safeImages.length > 1 && (
        <div className="overflow-hidden" ref={thumbRef}>
          <div className="flex gap-3">
            {safeImages.map((item, idx) => (
              <GalleryThumb
                key={`${item.url}-thumb-${idx}`}
                item={item}
                selected={idx === selected}
                onClick={() => onThumbClick(idx)}
                index={idx}
              />
            ))}
          </div>
        </div>
      )}

      <ImageLightbox
        open={lightboxOpen}
        items={imageOnly.items}
        index={lightboxIndex}
        onClose={() => setLightboxOpen(false)}
        onIndexChange={setLightboxIndex}
      />
    </div>
  );
}
