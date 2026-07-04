import * as React from "react";
import Image from "next/image";
import { Breadcrumb, type BreadcrumbItem } from "@/components/ui/breadcrumb";
import { cn } from "@/lib/cn";

type ShopHeroProps = {
  title: string;
  description: string;
  breadcrumb?: BreadcrumbItem[];
  className?: string;
};

export function ShopHeroSection({
  title,
  description,
  breadcrumb,
  className,
}: ShopHeroProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden bg-surface-lowest",
        "py-16 lg:py-24",
        className,
      )}
    >
      {/* Background Banner with Parallax-like floating items */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden bg-gradient-to-r from-primary/10 to-surface-lowest">
        <div className="absolute top-0 right-0 w-full h-full opacity-30 animate-pulse-ring mix-blend-multiply">
          <Image 
            src="https://picsum.photos/seed/shop-pattern/1920/1080"
            alt="Mẫu nền nông nghiệp"
            fill
            className="object-cover"
          />
        </div>
      </div>

      <div className="container-page relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left: Text */}
          <div className="max-w-2xl">
            {breadcrumb && breadcrumb.length > 0 ? (
              <Breadcrumb items={breadcrumb} className="mb-6 animate-fade-in" />
            ) : null}
            
            <h1
              className="font-bold tracking-tight text-text-primary text-4xl md:text-5xl lg:text-6xl animate-fade-up leading-tight"
            >
              {title}
            </h1>
            
            <p
              className="mt-6 text-lg md:text-xl text-text-muted leading-relaxed animate-fade-up"
              style={{ animationDelay: "150ms" }}
            >
              {description}
            </p>
          </div>

          {/* Right: Dynamic Product Floating Showcase */}
          <div className="relative hidden lg:block h-[350px] w-full animate-fade-in" style={{ animationDelay: "300ms" }}>
            
            <div className="absolute top-[20px] left-[10%] w-[45%] h-[250px] rounded-2xl overflow-hidden shadow-ambient-lg animate-float" style={{ animationDelay: "0.5s" }}>
              <Image 
                src="https://picsum.photos/seed/fertilizer/600/600" 
                alt="Phân bón nổi bật" 
                fill 
                className="object-cover hover:scale-110 transition-transform duration-700"
              />
            </div>

            <div className="absolute bottom-[20px] right-[10%] w-[50%] h-[280px] rounded-2xl overflow-hidden shadow-ambient-xl animate-float-reverse" style={{ animationDelay: "1.5s", zIndex: 10 }}>
              <Image 
                src="https://picsum.photos/seed/pesticide/600/600" 
                alt="Chế phẩm sinh học" 
                fill 
                className="object-cover hover:scale-110 transition-transform duration-700"
              />
              {/* Hot tag */}
              <div className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-bounce">
                HOT
              </div>
            </div>
            
          </div>
          
        </div>
      </div>
    </section>
  );
}
