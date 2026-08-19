"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { MotionWrapper } from "@/components/ui/motion-wrapper";
import { ChevronRight, ChevronDown } from "lucide-react";

export function HighlightBanner() {
  return (
    <section className="relative w-full min-h-[calc(100vh-76px)] flex flex-col justify-center overflow-hidden pt-8 md:pt-16 pb-12">
      {/* Background Image */}
      <Image
        src="/images/Banner.png"
        alt="Oli Xanh Banner Background"
        fill
        className="object-cover"
        priority
      />
      
      {/* Overlay — giảm trắng, thêm tint xanh lá nhẹ */}
      <div className="absolute inset-0 z-0" style={{ background: "linear-gradient(135deg, rgba(232,245,200,0.55) 0%, rgba(255,255,255,0.25) 50%, rgba(234,246,213,0.45) 100%)" }} />
      
      {/* Container */}
      <div className="relative z-10 w-full container-page px-4 pt-8 md:pt-12 pb-12 flex flex-col items-center justify-center">
        
        {/* Center Content */}
        <MotionWrapper delay={0.2} direction="up" className="flex flex-col items-center text-center max-w-4xl w-full">

          <div className="flex items-center justify-center gap-4 mb-6 w-full">
            <div className="h-px w-12 md:w-24 bg-primary" />
            <h2 className="text-primary-dark font-bold tracking-widest text-sm md:text-base uppercase">
              TỰ HÀO THƯƠNG HIỆU VIỆT NAM
            </h2>
            <div className="h-px w-12 md:w-24 bg-primary" />
          </div>
          
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-primary-dark uppercase leading-tight mb-8 drop-shadow-sm">
            OLI XANH CHÍNH THỨC <br className="hidden md:block" />
            <span className="text-primary">MỞ RỘNG MẠNG LƯỚI ĐỐI TÁC TOÀN VIỆT NAM</span>
          </h1>

          <div className="mb-10">
            <Image 
              src="/logo.svg" 
              alt="Oli Xanh Logo" 
              width={250} 
              height={80} 
              className="w-auto h-16 md:h-20 drop-shadow-lg"
            />
          </div>

          <Button 
            href="/tin-tuc" 
            className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-8 py-6 text-base font-bold shadow-lg hover:shadow-orange-500/30 transition-all hover:-translate-y-1"
          >
            CLICK ĐỂ XEM CHI TIẾT
            <ChevronRight className="ml-2 size-5" />
          </Button>
        </MotionWrapper>

        {/* Scroll Down Button */}
        <a 
          href="#giai-phap" 
          className="mt-16 animate-bounce bg-white/50 hover:bg-white/80 p-3 rounded-full backdrop-blur-md transition-colors text-primary-dark shadow-sm"
          aria-label="Scroll down"
        >
          <ChevronDown className="size-6" />
        </a>
      </div>
    </section>
  );
}
