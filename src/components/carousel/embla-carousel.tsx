"use client";

import * as React from "react";
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";

type EmblaApi = UseEmblaCarouselType[1];

type EmblaOptions = NonNullable<Parameters<typeof useEmblaCarousel>[0]>;

type Props = {
  children: React.ReactNode;
  options?: EmblaOptions;
  showArrows?: boolean;
  showDots?: boolean;
  arrowPosition?: "inside" | "outside";
  className?: string;
  slidesClassName?: string;
};

export function EmblaCarousel({
  children,
  options,
  showArrows = true,
  showDots = true,
  arrowPosition = "outside",
  className,
  slidesClassName,
}: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: true,
    skipSnaps: false,
    ...options,
  });

  const [selected, setSelected] = React.useState(0);
  const [snaps, setSnaps] = React.useState<number[]>([]);
  const [canPrev, setCanPrev] = React.useState(false);
  const [canNext, setCanNext] = React.useState(false);

  const onSelect = React.useCallback((api: EmblaApi) => {
    if (!api) return;
    setSelected(api.selectedScrollSnap());
    setCanPrev(api.canScrollPrev());
    setCanNext(api.canScrollNext());
  }, []);

  React.useEffect(() => {
    if (!emblaApi) return;
    setSnaps(emblaApi.scrollSnapList());
    onSelect(emblaApi);
    emblaApi.on("select", onSelect).on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollTo = (idx: number) => emblaApi?.scrollTo(idx);

  return (
    <div className={cn("relative", className)}>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className={cn("flex", slidesClassName)}>{children}</div>
      </div>

      {showArrows ? (
        <>
          <button
            type="button"
            onClick={() => emblaApi?.scrollPrev()}
            disabled={!canPrev && !options?.loop}
            aria-label="Trước"
            className={cn(
              "grid size-11 place-items-center rounded-full bg-surface-container-lowest shadow-ambient",
              "border border-border-soft hover:bg-primary hover:text-on-primary hover:border-primary",
              "transition-colors disabled:opacity-40 disabled:pointer-events-none",
              "absolute top-1/2 -translate-y-1/2 z-10",
              arrowPosition === "outside"
                ? "-left-2 md:-left-5"
                : "left-3",
            )}
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            type="button"
            onClick={() => emblaApi?.scrollNext()}
            disabled={!canNext && !options?.loop}
            aria-label="Sau"
            className={cn(
              "grid size-11 place-items-center rounded-full bg-surface-container-lowest shadow-ambient",
              "border border-border-soft hover:bg-primary hover:text-on-primary hover:border-primary",
              "transition-colors disabled:opacity-40 disabled:pointer-events-none",
              "absolute top-1/2 -translate-y-1/2 z-10",
              arrowPosition === "outside"
                ? "-right-2 md:-right-5"
                : "right-3",
            )}
          >
            <ChevronRight className="size-5" />
          </button>
        </>
      ) : null}

      {showDots && snaps.length > 1 ? (
        <div
          className="mt-6 flex items-center justify-center gap-2"
          role="tablist"
          aria-label="Slides"
        >
          {snaps.map((_, idx) => (
            <button
              key={idx}
              type="button"
              role="tab"
              aria-selected={idx === selected}
              aria-label={`Đi tới slide ${idx + 1}`}
              onClick={() => scrollTo(idx)}
              className={cn(
                "h-2 rounded-full transition-all",
                idx === selected
                  ? "w-6 bg-primary"
                  : "w-2 bg-border-soft hover:bg-text-muted/40",
              )}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
