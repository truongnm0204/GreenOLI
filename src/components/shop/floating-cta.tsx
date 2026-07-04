"use client";

import * as React from "react";
import { Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE_CONFIG } from "@/data/site-config";
import { cn } from "@/lib/cn";

export function FloatingCTA({ productName }: { productName: string }) {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      // Show when scrolled past 400px
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div 
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 p-4 transition-transform duration-500 ease-in-out md:hidden",
        isVisible ? "translate-y-0" : "translate-y-full"
      )}
    >
      <div className="bg-surface-lowest/90 backdrop-blur-md border border-border-soft rounded-full p-2 flex items-center justify-between shadow-ambient-lg mx-auto max-w-sm">
        <div className="pl-4 hidden sm:block truncate text-sm font-semibold text-text-primary mr-2">
          {productName}
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button
            href={`tel:${SITE_CONFIG.hotline.replace(/\s/g, "")}`}
            variant="primary"
            className="flex-1 rounded-full shadow-md"
          >
            <Phone className="size-4 mr-1.5" aria-hidden />
            Gọi ngay
          </Button>
          <Button
            href="/lien-he"
            variant="secondary"
            className="flex-1 rounded-full shadow-md"
          >
            <Mail className="size-4 mr-1.5" aria-hidden />
            Tư vấn
          </Button>
        </div>
      </div>
    </div>
  );
}
