import * as React from "react";
import Image from "next/image";
import { Breadcrumb, type BreadcrumbItem } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { Sparkles } from "lucide-react";

type AboutHeroProps = {
  title: React.ReactNode;
  description: string;
  breadcrumb?: BreadcrumbItem[];
  className?: string;
};

export function AboutHeroSection({
  title,
  description,
  breadcrumb,
  className,
}: AboutHeroProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden py-20 lg:py-32 min-h-[460px] flex items-center border-b border-primary/20",
        className,
      )}
    >
      {/* 1 Ảnh nền phòng thí nghiệm & sản xuất hóa chất y tế Banner.png */}
      <Image
        src="/images/Banner.png"
        alt="Nền hóa chất y tế và chăn nuôi Oli Xanh"
        fill
        className="object-cover"
        priority
      />

      {/* Overlay gradient dịu nhẹ bảo đảm tương phản chữ tuyệt đối */}
      <div className="absolute inset-0 bg-gradient-to-r from-surface-light/98 via-surface-light/90 to-surface-light/50 z-0" />
      <div className="absolute inset-0 botanical-leaf-pattern opacity-60 pointer-events-none z-0" />

      <div className="container-page relative z-10 w-full">
        <div className="max-w-4xl space-y-6">
          {breadcrumb && breadcrumb.length > 0 ? (
            <Breadcrumb items={breadcrumb} className="mb-4 animate-fade-in" />
          ) : null}

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary-dark text-xs font-bold shadow-sm">
            <Sparkles className="size-3.5 text-primary" />
            <span>Chuyên gia Hóa chất Y tế & Kiểm soát dịch bệnh</span>
          </div>
          
          <h1
            className="font-extrabold tracking-tight text-text-primary text-4xl md:text-5xl lg:text-6xl animate-fade-up leading-[1.2]"
            style={{ animationDelay: "100ms" }}
          >
            {title}
          </h1>
          
          <p
            className="text-lg md:text-xl text-text-muted leading-relaxed animate-fade-up font-medium max-w-3xl"
            style={{ animationDelay: "200ms" }}
          >
            {description}
          </p>
          
          <div 
            className="pt-2 animate-fade-up flex flex-wrap gap-4" 
            style={{ animationDelay: "300ms" }}
          >
            <Button href="/lien-he" size="lg" className="shadow-ambient-md hover:-translate-y-1 transition-transform font-bold text-base px-8 h-14">
              Nhận tư vấn ngay
            </Button>
            <Button href="/cua-hang" variant="outline" size="lg" className="bg-white/80 backdrop-blur-md hover:-translate-y-1 transition-transform font-bold text-base px-8 h-14">
              Xem sản phẩm hóa chất
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
