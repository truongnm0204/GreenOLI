"use client";

import { MessageCircle, Phone, ArrowUp } from "lucide-react";
import * as React from "react";
import { SITE_CONFIG } from "@/data/site-config";
import { cn } from "@/lib/cn";

type Item = {
  label: string;
  href: string;
  icon: React.ReactNode;
  className?: string;
  external?: boolean;
};

const ITEMS: Item[] = [
  {
    label: "Gọi hotline",
    href: `tel:${SITE_CONFIG.hotline.replace(/\s/g, "")}`,
    icon: <Phone className="size-5" />,
    className: "bg-primary text-on-primary hover:bg-primary-dark",
  },
  {
    label: "Zalo",
    href: SITE_CONFIG.social.zalo,
    icon: <MessageCircle className="size-5" />,
    className: "bg-secondary text-on-secondary hover:bg-secondary-strong",
    external: true,
  },

];

export function FloatingSocialPanel() {
  const [showTop, setShowTop] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className="fixed right-3 bottom-4 md:right-5 md:bottom-6 z-40 flex flex-col gap-2.5">
      {ITEMS.map((item) => (
        <a
          key={item.label}
          href={item.href}
          target={item.external ? "_blank" : undefined}
          rel={item.external ? "noopener noreferrer" : undefined}
          aria-label={item.label}
          className={cn(
            "grid size-11 md:size-12 place-items-center rounded-full shadow-ambient transition-all hover:scale-110",
            item.className,
          )}
        >
          {item.icon}
        </a>
      ))}
      {showTop ? (
        <button
          type="button"
          onClick={scrollTop}
          aria-label="Cuộn lên đầu trang"
          className="grid size-11 md:size-12 place-items-center rounded-full bg-text-primary text-white shadow-ambient transition-all hover:scale-110 animate-fade-up"
        >
          <ArrowUp className="size-5" />
        </button>
      ) : null}
    </div>
  );
}
