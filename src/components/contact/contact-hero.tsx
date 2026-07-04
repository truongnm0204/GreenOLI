import * as React from "react";
import Image from "next/image";
import { Breadcrumb, type BreadcrumbItem } from "@/components/ui/breadcrumb";
import { cn } from "@/lib/cn";

type ContactHeroProps = {
  title: string;
  description: string;
  breadcrumb?: BreadcrumbItem[];
  className?: string;
};

export function ContactHeroSection({
  title,
  description,
  breadcrumb,
  className,
}: ContactHeroProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden bg-surface-lowest",
        "py-16 lg:py-24",
        className,
      )}
    >
      {/* Dynamic Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-1/2 -right-1/4 w-[100%] h-[150%] bg-gradient-to-bl from-primary/10 to-transparent rounded-full blur-3xl opacity-60 animate-pulse-ring" />
      </div>

      <div className="container-page relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left Column: Text */}
          <div className="max-w-2xl">
            {breadcrumb && breadcrumb.length > 0 ? (
              <Breadcrumb items={breadcrumb} className="mb-6 animate-fade-in" />
            ) : null}
            
            <h1
              className="font-bold tracking-tight text-text-primary text-4xl md:text-5xl lg:text-6xl animate-slide-in-left leading-tight"
            >
              {title}
            </h1>
            
            <p
              className="mt-6 text-lg md:text-xl text-text-muted leading-relaxed animate-slide-in-left"
              style={{ animationDelay: "150ms" }}
            >
              {description}
            </p>
          </div>

          {/* Right Column: Visual */}
          <div className="relative hidden lg:block h-[400px] w-full animate-scale-in" style={{ animationDelay: "300ms" }}>
            <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-ambient-2xl">
              <Image 
                src="https://picsum.photos/seed/contact-greenoli/1200/800" 
                alt="Đội ngũ hỗ trợ khách hàng" 
                fill 
                className="object-cover hover:scale-105 transition-transform duration-1000" 
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Glassmorphism Badge */}
              <div className="absolute bottom-6 left-6 bg-surface-lowest/80 backdrop-blur-md px-6 py-4 rounded-2xl shadow-ambient-lg border border-white/20 animate-float" style={{ animationDelay: "1s" }}>
                <div className="flex items-center gap-4">
                  <div className="relative flex size-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full size-3 bg-primary"></span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-text-primary">Hỗ trợ 24/7</p>
                    <p className="text-xs text-text-muted">Luôn sẵn sàng phục vụ</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
