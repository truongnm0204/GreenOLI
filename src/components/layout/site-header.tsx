"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  ChevronDown,
  Mail,
  Menu,
  Phone,
  X,
  Facebook,
  Youtube,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { NAV_ITEMS, SITE_CONFIG } from "@/data/site-config";
import { cn } from "@/lib/cn";

const HEADER_HEIGHT_VAR = { ["--header-h" as never]: "76px" } as React.CSSProperties;

/** Danh mục tối giản truyền từ layout (server) xuống — header là client component. */
export type NavCategory = {
  slug: string;
  name: string;
  shortName?: string;
  tagline: string;
};

export function SiteHeader({ categories }: { categories: NavCategory[] }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [productsOpen, setProductsOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    setMobileOpen(false);
    setProductsOpen(false);
  }, [pathname]);

  return (
    <header
      style={HEADER_HEIGHT_VAR}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-surface-container-lowest/95 backdrop-blur shadow-ambient"
          : "bg-surface-container-lowest/80 backdrop-blur-sm",
      )}
    >
      {/* Utility strip */}
      <div className="hidden lg:block border-b border-border-soft/60">
        <div className="container-page flex h-9 items-center justify-between text-xs text-text-muted">
          <div className="flex items-center gap-5">
            <a
              href={`tel:${SITE_CONFIG.hotline.replace(/\s/g, "")}`}
              className="flex items-center gap-1.5 hover:text-primary-dark"
            >
              <Phone className="size-3.5" aria-hidden />
              Hotline: <span className="font-medium">{SITE_CONFIG.hotline}</span>
            </a>
            <a
              href={`mailto:${SITE_CONFIG.email}`}
              className="flex items-center gap-1.5 hover:text-primary-dark"
            >
              <Mail className="size-3.5" aria-hidden />
              {SITE_CONFIG.email}
            </a>
          </div>
          <div className="flex items-center gap-3">
            <span>{SITE_CONFIG.workingHours}</span>
            <span className="h-3 w-px bg-border-soft" aria-hidden />
            <a
              href={SITE_CONFIG.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary-dark"
              aria-label="Facebook"
            >
              <Facebook className="size-3.5" />
            </a>
            <a
              href={SITE_CONFIG.social.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary-dark"
              aria-label="YouTube"
            >
              <Youtube className="size-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="container-page flex py-3 min-h-[80px] items-center justify-between">
        <Link
          href="/"
          className="flex items-center"
        >
          <Image 
            src="/logo.svg" 
            alt="Oli Xanh Logo" 
            width={240} 
            height={84} 
            className="w-40 lg:w-48 h-auto object-contain"
            priority
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-1" aria-label="Chính">
          {NAV_ITEMS.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            if (item.hasDropdown) {
              return (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => setProductsOpen(true)}
                  onMouseLeave={() => setProductsOpen(false)}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-1 rounded-button px-4 py-2 text-sm font-medium transition-colors",
                      isActive
                        ? "text-primary-dark"
                        : "text-text-primary hover:text-primary-dark",
                    )}
                  >
                    {item.label}
                    <ChevronDown className="size-4" aria-hidden />
                  </Link>
                  {productsOpen ? (
                    <div className="absolute left-1/2 top-full -translate-x-1/2 pt-2 animate-fade-up" style={{ animationDuration: "180ms" }}>
                      <ul
                        className="grid w-[640px] grid-cols-2 gap-1 rounded-card bg-surface-container-lowest p-3 shadow-ambient-lg border border-border-soft"
                      >
                        {categories.map((cat) => (
                          <li key={cat.slug}>
                            <Link
                              href={`/cua-hang/${cat.slug}`}
                              className="flex flex-col gap-0.5 rounded-button px-3 py-2 transition-colors hover:bg-surface-light"
                            >
                              <span className="text-sm font-semibold text-text-primary">
                                {cat.name}
                              </span>
                              <span className="text-xs text-text-muted line-clamp-1">
                                {cat.tagline}
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </div>
              );
            }
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-button px-4 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "text-primary-dark"
                    : "text-text-primary hover:text-primary-dark",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:flex">
          <Button href="/lien-he" size="sm">
            Liên hệ ngay
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label={mobileOpen ? "Đóng menu" : "Mở menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          onClick={() => setMobileOpen((v) => !v)}
          className="lg:hidden grid size-10 place-items-center rounded-button hover:bg-surface-container-low"
        >
          {mobileOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen ? (
        <div id="mobile-nav" className="lg:hidden border-t border-border-soft animate-fade-up" style={{ animationDuration: "200ms" }}>
          <nav className="container-page flex flex-col py-3 gap-1" aria-label="Mobile">
            {NAV_ITEMS.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-button px-4 py-3 text-base font-medium",
                    isActive
                      ? "bg-primary/10 text-primary-dark"
                      : "text-text-primary hover:bg-surface-container-low",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
            {/* Mobile categories */}
            <div className="mt-2 border-t border-border-soft pt-2">
              <p className="px-4 py-1 text-xs uppercase tracking-wider text-text-muted">
                Danh mục
              </p>
              {categories.map((c) => (
                <Link
                  key={c.slug}
                  href={`/cua-hang/${c.slug}`}
                  className="block rounded-button px-4 py-2 text-sm text-text-primary hover:bg-surface-container-low"
                >
                  {c.name}
                </Link>
              ))}
            </div>
            <Button href="/lien-he" className="mt-3">
              Liên hệ ngay
            </Button>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
