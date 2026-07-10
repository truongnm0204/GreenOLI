"use client";

import * as React from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";

type Props = {
  images: string[];
  alt: string;
};

export function ProductGallery({ images, alt }: Props) {
  const [mainRef, mainApi] = useEmblaCarousel({ loop: true });
  const [thumbRef, thumbApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });
  const [selected, setSelected] = React.useState(0);

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
      <div className="relative overflow-hidden rounded-card bg-surface-light shadow-ambient">
        <div ref={mainRef}>
          <div className="flex">
            {images.map((src, idx) => (
              <div key={idx} className="relative flex-[0_0_100%] aspect-square">
                <Image
                  src={src}
                  alt={`${alt} – ảnh ${idx + 1}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority={idx === 0}
                  className="object-contain bg-white"
                />
              </div>
            ))}
          </div>
        </div>
        {images.length > 1 ? (
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
        ) : null}
      </div>

      {images.length > 1 ? (
        <div className="overflow-hidden" ref={thumbRef}>
          <div className="flex gap-3">
            {images.map((src, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => onThumbClick(idx)}
                aria-label={`Xem ảnh ${idx + 1}`}
                aria-pressed={idx === selected}
                className={cn(
                  "relative flex-none size-20 rounded-input overflow-hidden border-2 transition-colors",
                  idx === selected
                    ? "border-primary"
                    : "border-transparent hover:border-border-soft",
                )}
              >
                <Image
                  src={src}
                  alt={`Thumbnail ${idx + 1}`}
                  fill
                  sizes="80px"
                  className="object-contain bg-white"
                />
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
