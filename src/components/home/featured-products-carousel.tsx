"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import type { Product } from "@/types/product";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight, ShieldCheck } from "lucide-react";
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
        <div className="flex -ml-4 md:-ml-6 touch-pan-y py-4">
          {products.map((product, index) => {
            const isActive = index === selectedIndex;
            return (
              <div
                key={`${product.slug}-${index}`}
                className="flex-[0_0_75%] sm:flex-[0_0_55%] md:flex-[0_0_42%] lg:flex-[0_0_32%] pl-4 md:pl-6 min-w-0"
              >
                <Link
                  href={`/san-pham/${product.slug}`}
                  onClick={(e) => {
                    if (!isActive) {
                      e.preventDefault();
                      emblaApi?.scrollTo(index);
                    }
                  }}
                  className={cn(
                    "group flex flex-col items-center justify-between p-6 bg-white rounded-[2rem] transition-all duration-500 cursor-pointer h-[440px] select-none block",
                    isActive
                      ? "scale-100 border-[3px] border-secondary shadow-2xl z-10 relative opacity-100 hover:shadow-[0_20px_50px_rgba(109,67,197,0.25)]"
                      : "scale-90 border border-transparent shadow-md opacity-60 hover:opacity-85"
                  )}
                  title={isActive ? `Xem chi tiết ${product.name}` : `Trượt đến ${product.name}`}
                >
                  {/* Badge chính hãng */}
                  <div className="w-full flex justify-between items-center mb-2">
                    <span className={cn(
                      "inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full",
                      isActive 
                        ? "bg-primary/15 text-primary-dark border border-primary/20" 
                        : "opacity-0"
                    )}>
                      <ShieldCheck className="size-3.5 text-primary" />
                      Chính hãng
                    </span>
                    {isActive && (
                      <span className="text-[11px] font-semibold text-secondary flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                        Xem chi tiết
                        <ArrowRight className="size-3" />
                      </span>
                    )}
                  </div>

                  {/* Image container */}
                  <div className="relative w-full h-[220px] my-2">
                    <Image
                      src={product.heroImage || "/placeholder-image.png"}
                      alt={product.name}
                      fill
                      className="object-contain transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 75vw, 33vw"
                    />
                  </div>

                  {/* Text info */}
                  <div className="w-full text-center mt-auto pt-2">
                    <h3 className={cn(
                      "font-bold uppercase tracking-wide transition-colors line-clamp-1",
                      isActive 
                        ? "text-primary-dark text-xl group-hover:text-secondary" 
                        : "text-text-primary text-base"
                    )}>
                      {product.name}
                    </h3>

                    {product.shortDescription && (
                      <p className={cn(
                        "text-xs text-text-muted line-clamp-2 mt-1.5 transition-opacity",
                        isActive ? "opacity-90" : "opacity-0 h-0 overflow-hidden"
                      )}>
                        {product.shortDescription}
                      </p>
                    )}
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      {/* Controls & Pagination */}
      <div className="mt-10 flex flex-col items-center gap-6">
        {/* Navigation Row */}
        <div className="flex items-center gap-4">
          <button
            onClick={scrollPrev}
            className="size-12 rounded-full border-2 border-secondary text-secondary flex items-center justify-center hover:bg-secondary hover:text-white transition-all hover:scale-105 active:scale-95"
            aria-label="Sản phẩm trước"
          >
            <ChevronLeft className="size-6" />
          </button>
          
          <Button
            href={`/san-pham/${activeProduct?.slug || ""}`}
            className="bg-secondary hover:bg-secondary-strong text-white rounded-full px-8 py-6 text-base font-bold shadow-lg shadow-secondary/30 transition-all hover:-translate-y-1 hover:shadow-secondary/50 flex items-center gap-2"
          >
            XEM CHI TIẾT SẢN PHẨM
            <ArrowRight className="size-5" />
          </Button>
          
          <button
            onClick={scrollNext}
            className="size-12 rounded-full border-2 border-secondary text-secondary flex items-center justify-center hover:bg-secondary hover:text-white transition-all hover:scale-105 active:scale-95"
            aria-label="Sản phẩm tiếp theo"
          >
            <ChevronRight className="size-6" />
          </button>
        </div>

        {/* Dots */}
        <div className="flex items-center gap-2">
          {products.map((_, index) => (
            <button
              key={index}
              onClick={() => emblaApi?.scrollTo(index)}
              className={cn(
                "h-2.5 rounded-full transition-all duration-300",
                index === selectedIndex 
                  ? "bg-secondary w-8" 
                  : "bg-gray-300 hover:bg-gray-400 w-2.5"
              )}
              aria-label={`Trượt đến sản phẩm ${index + 1}`}
            />
          ))}
        </div>

        {/* View all link */}
        <Link
          href="/cua-hang"
          className="inline-flex items-center gap-1.5 text-sm font-bold text-primary-dark hover:text-secondary transition-colors underline-offset-4 hover:underline mt-1"
        >
          <span>Xem tất cả danh mục sản phẩm</span>
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </div>
  );
}
