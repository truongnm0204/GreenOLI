"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import type { Product } from "@/types/product";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/button";

interface FeaturedProductsCarouselProps {
  products: Product[];
}

export function FeaturedProductsCarousel({ products }: FeaturedProductsCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "center",
    loop: true,
    skipSnaps: false,
    inViewThreshold: 0.7,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  const activeProduct = products[selectedIndex];

  return (
    <div className="w-full flex flex-col items-center">
      {/* Carousel Container */}
      <div className="w-full overflow-hidden" ref={emblaRef}>
        <div className="flex -ml-4 md:-ml-6 touch-pan-y">
          {products.map((product, index) => {
            const isActive = index === selectedIndex;
            return (
              <div
                key={`${product.slug}-${index}`}
                className="flex-[0_0_65%] md:flex-[0_0_40%] lg:flex-[0_0_30%] pl-4 md:pl-6 min-w-0"
              >
                <div
                  className={cn(
                    "flex flex-col items-center justify-center p-6 bg-white rounded-[2rem] transition-all duration-500 cursor-pointer h-[400px]",
                    isActive
                      ? "scale-100 border-[3px] border-secondary shadow-xl z-10 relative opacity-100"
                      : "scale-90 border border-transparent shadow-md opacity-60 hover:opacity-80"
                  )}
                  onClick={() => {
                    if (!isActive && emblaApi) {
                      emblaApi.scrollTo(index);
                    }
                  }}
                >
                  <div className="relative w-full h-[250px] mb-6">
                    <Image
                      src={product.heroImage || "/placeholder-image.png"}
                      alt={product.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <h3 className={cn(
                    "font-bold text-center uppercase tracking-wide transition-colors",
                    isActive ? "text-primary-dark text-xl" : "text-text-primary text-lg"
                  )}>
                    {product.name}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Controls & Pagination */}
      <div className="mt-12 flex flex-col items-center gap-6">
        {/* Navigation Row */}
        <div className="flex items-center gap-4">
          <button
            onClick={scrollPrev}
            className="size-12 rounded-full border-2 border-secondary text-secondary flex items-center justify-center hover:bg-secondary hover:text-white transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeft className="size-6" />
          </button>
          
          <Button
            href={`/cua-hang/${activeProduct?.slug}`}
            className="bg-secondary hover:bg-secondary-strong text-white rounded-full px-8 py-6 text-base font-bold shadow-lg shadow-secondary/30 transition-all hover:-translate-y-1"
          >
            XEM THÊM
          </Button>
          
          <button
            onClick={scrollNext}
            className="size-12 rounded-full border-2 border-secondary text-secondary flex items-center justify-center hover:bg-secondary hover:text-white transition-colors"
            aria-label="Next slide"
          >
            <ChevronRight className="size-6" />
          </button>
        </div>

        {/* Dots */}
        <div className="flex gap-2">
          {products.map((_, index) => (
            <button
              key={index}
              onClick={() => emblaApi?.scrollTo(index)}
              className={cn(
                "w-3 h-3 rounded-full transition-all duration-300",
                index === selectedIndex ? "bg-secondary w-6" : "bg-gray-300 hover:bg-gray-400"
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
