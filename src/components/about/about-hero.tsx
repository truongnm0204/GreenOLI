import * as React from "react";
import Image from "next/image";
import { Breadcrumb, type BreadcrumbItem } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";

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
        "relative overflow-hidden bg-surface-light molecular-pattern",
        "py-16 lg:py-24",
        className,
      )}
    >
      {/* Floating Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Leaf 1 */}
        <svg
          className="absolute top-[10%] left-[5%] w-12 h-12 text-primary/20 animate-float"
          style={{ animationDelay: "0s" }}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 7,14 7,14C18,14 17,8 17,8Z" />
        </svg>
        {/* Leaf 2 */}
        <svg
          className="absolute bottom-[20%] left-[45%] w-8 h-8 text-secondary/30 animate-float-reverse"
          style={{ animationDelay: "2s" }}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 7,14 7,14C18,14 17,8 17,8Z" />
        </svg>
        {/* Leaf 3 */}
        <svg
          className="absolute top-[30%] right-[10%] w-16 h-16 text-primary/10 animate-float"
          style={{ animationDelay: "1s" }}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 7,14 7,14C18,14 17,8 17,8Z" />
        </svg>
      </div>

      <div className="container-page relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Text & CTA */}
          <div className="max-w-2xl">
            {breadcrumb && breadcrumb.length > 0 ? (
              <Breadcrumb items={breadcrumb} className="mb-6 animate-fade-in" />
            ) : null}
            
            <h1
              className="font-bold tracking-tight text-text-primary text-4xl md:text-5xl lg:text-6xl animate-fade-up leading-tight"
              style={{ animationDelay: "100ms" }}
            >
              {title}
            </h1>
            
            <p
              className="mt-6 text-lg md:text-xl text-text-muted leading-relaxed animate-fade-up"
              style={{ animationDelay: "200ms" }}
            >
              {description}
            </p>
            
            <div 
              className="mt-8 animate-fade-up" 
              style={{ animationDelay: "300ms" }}
            >
              <Button href="/lien-he" size="lg" className="shadow-ambient-md hover:-translate-y-1 transition-transform">
                Nhận tư vấn ngay
              </Button>
            </div>
          </div>

          {/* Right Column: Visual Collage */}
          <div className="relative hidden md:block h-[500px] w-full animate-fade-in" style={{ animationDelay: "400ms" }}>
            
            {/* Image 1: Background Base (Agri Field) */}
            <div className="absolute top-0 right-0 w-[70%] h-[320px] rounded-2xl overflow-hidden shadow-ambient-lg animate-float" style={{ animationDelay: "0s" }}>
              <Image 
                src="/images/about/agri_field.png" 
                alt="Nông nghiệp hiện đại" 
                fill 
                className="object-cover hover:scale-105 transition-transform duration-700" 
                sizes="(max-width: 1024px) 50vw, 33vw"
              />
            </div>

            {/* Image 2: Middle Overlap (Science Lab) */}
            <div className="absolute top-[140px] left-0 w-[55%] h-[260px] rounded-2xl overflow-hidden shadow-ambient-xl animate-float-reverse" style={{ animationDelay: "1s" }}>
              <Image 
                src="/images/about/science_lab.png" 
                alt="Phòng thí nghiệm nông nghiệp" 
                fill 
                className="object-cover hover:scale-105 transition-transform duration-700" 
                sizes="(max-width: 1024px) 50vw, 25vw"
              />
            </div>

            {/* Image 3: Bottom Right Overlap (Healthy Leaf) */}
            <div className="absolute bottom-[20px] right-[10%] w-[45%] h-[220px] rounded-full overflow-hidden shadow-ambient-md animate-float" style={{ animationDelay: "2s" }}>
              <Image 
                src="/images/about/healthy_leaf.png" 
                alt="Lá cây khỏe mạnh" 
                fill 
                className="object-cover hover:scale-105 transition-transform duration-700" 
                sizes="(max-width: 1024px) 33vw, 20vw"
              />
            </div>
            
          </div>
          
        </div>
      </div>
    </section>
  );
}
