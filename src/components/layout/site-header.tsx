"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  ChevronDown,
  Mail,
  Menu,
  PhoneCall,
  Truck,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductSearchField } from "@/components/shop/product-search-field";
import { NAV_ITEMS, SITE_CONFIG } from "@/data/site-config";
import { trackPhoneClick } from "@/lib/analytics";
import { cn } from "@/lib/cn";

const HEADER_HEIGHT_VAR = { ["--header-h" as never]: "76px" } as React.CSSProperties;

/** Danh mục tối giản truyền từ layout (server) xuống — header là client component. */
export type NavCategory = {
  slug: string;
  name: string;
  shortName?: string;
  tagline: string;
};

export type NavBrand = {
  slug: string;
  name: string;
  tagline?: string;
};

export function SiteHeader({ categories, brands }: { categories: NavCategory[], brands?: NavBrand[] }) {
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
          ? "bg-white/95 backdrop-blur shadow-ambient border-b-2 border-primary/30"
          : "bg-white/85 backdrop-blur-sm border-b border-primary/20",
      )}
    >
      {/* Utility strip */}
      <div className="hidden lg:block border-b border-primary/20 bg-primary/8 py-1.5">
        <div className="container-page flex items-center justify-between">
          <div className="flex flex-wrap items-center gap-4 xl:gap-7">
            <div className="group flex items-center gap-2 rounded-lg px-2 py-1 transition-all duration-200 hover:bg-white/90 hover:shadow-xs">
              <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary transition-transform duration-200 group-hover:scale-110">
                <PhoneCall
                  className="size-4 shrink-0 animate-phone-ring transition-transform"
                  aria-hidden
                />
              </div>
              <div className="flex flex-col text-left">
                <div className="flex items-center gap-1.5 leading-tight">
                  <span className="relative flex size-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500"></span>
                  </span>
                  <span className="text-[11px] font-medium text-text-secondary">
                    Hotline
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-sm font-bold leading-tight text-red-600 tracking-tight">
                  {SITE_CONFIG.hotlines.map((h, idx) => (
                    <React.Fragment key={h.tel}>
                      {idx > 0 && <span className="text-red-600/70 font-semibold">-</span>}
                      <a
                        href={`tel:${h.tel}`}
                        className="transition-colors hover:text-red-700 hover:underline"
                        onClick={() => trackPhoneClick(`header:${h.label}`)}
                      >
                        {h.label}
                      </a>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>

            <div className="group flex items-center gap-2 rounded-lg px-2 py-1 transition-all duration-200 hover:bg-white/90 hover:shadow-xs">
              <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary transition-transform duration-200 group-hover:scale-110">
                <Truck
                  className="size-4 shrink-0 animate-truck-drive"
                  aria-hidden
                />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[11px] font-medium leading-tight text-text-secondary">
                  Giao hàng toàn quốc
                </span>
                <span className="text-sm font-bold leading-tight text-red-600 tracking-tight transition-colors group-hover:text-red-700">
                  Nhận hàng 24/7
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs text-text-muted">
            {SITE_CONFIG.workingHours ? (
              <span className="text-[11px] font-medium text-text-muted">
                {SITE_CONFIG.workingHours}
              </span>
            ) : null}
            {SITE_CONFIG.email ? (
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="flex items-center gap-1.5 hover:text-primary-dark"
              >
                <Mail className="size-3.5" aria-hidden />
                {SITE_CONFIG.email}
              </a>
            ) : null}
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
                      <div
                        className="flex w-[800px] gap-6 rounded-card bg-surface-container-lowest p-5 shadow-ambient-lg border border-border-soft"
                      >
                        <div className="flex-1">
                          <p className="text-xs uppercase tracking-widest font-semibold text-primary-dark mb-3 px-3">Mục đích sử dụng</p>
                          <ul className="grid grid-cols-2 gap-1">
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
                        {brands && brands.length > 0 && (
                          <div className="w-[300px] border-l border-border-soft pl-6">
                            <p className="text-xs uppercase tracking-widest font-semibold text-primary-dark mb-3 px-3">Hãng sản xuất</p>
                            <ul className="flex flex-col gap-1">
                              {brands.map((b) => (
                                <li key={b.slug}>
                                  <Link
                                    href={`/cua-hang/hang/${b.slug}`}
                                    className="flex flex-col gap-0.5 rounded-button px-3 py-2 transition-colors hover:bg-surface-light"
                                  >
                                    <span className="text-sm font-semibold text-text-primary">
                                      {b.name}
                                    </span>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
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

        <div className="hidden lg:flex items-center gap-3">
          <ProductSearchField
            action="/cua-hang"
            size="sm"
            placeholder="Tìm sản phẩm…"
            ariaLabel="Tìm kiếm sản phẩm"
            className="w-52 xl:w-64"
            id="header-product-search"
          />
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
            <div className="px-1 pb-3">
              <ProductSearchField
                action="/cua-hang"
                size="md"
                placeholder="Tìm sản phẩm…"
                ariaLabel="Tìm kiếm sản phẩm"
                id="header-product-search-mobile"
              />
            </div>
            {/* Mobile hotlines */}
            <div className="px-1 pb-2">
              <div className="flex items-center gap-2.5 rounded-xl bg-primary/5 p-2.5 border border-primary/15">
                <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                  <PhoneCall
                    className="size-3.5 shrink-0 animate-phone-ring"
                    aria-hidden
                  />
                </div>
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-1">
                    <span className="relative flex size-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500"></span>
                    </span>
                    <span className="text-[10px] font-medium text-text-secondary truncate">Hotline</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-red-600 flex-wrap">
                    {SITE_CONFIG.hotlines.map((h, idx) => (
                      <React.Fragment key={h.tel}>
                        {idx > 0 && <span className="text-red-600/70 font-semibold">-</span>}
                        <a
                          href={`tel:${h.tel}`}
                          className="hover:underline hover:text-red-700"
                          onClick={() => trackPhoneClick(`mobile-drawer:${h.label}`)}
                        >
                          {h.label}
                        </a>
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>
            </div>
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
            {/* Mobile categories & brands */}
            <div className="mt-2 border-t border-border-soft pt-4">
              <p className="px-4 py-1 text-xs uppercase tracking-wider font-semibold text-primary-dark">
                Mục đích sử dụng
              </p>
              <div className="mt-1 mb-4 flex flex-col">
                {categories.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/cua-hang/${c.slug}`}
                    className="block rounded-button px-4 py-2-5 text-sm text-text-primary hover:bg-surface-container-low"
                  >
                    {c.name}
                  </Link>
                ))}
              </div>

              {brands && brands.length > 0 && (
                <>
                  <p className="px-4 py-1 text-xs uppercase tracking-wider font-semibold text-primary-dark mt-2 border-t border-border-soft/50 pt-4">
                    Hãng sản xuất
                  </p>
                  <div className="mt-1 flex flex-col">
                    {brands.map((b) => (
                      <Link
                        key={b.slug}
                        href={`/cua-hang/hang/${b.slug}`}
                        className="block rounded-button px-4 py-2-5 text-sm text-text-primary hover:bg-surface-container-low"
                      >
                        {b.name}
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </div>
            <Button href="/lien-he" className="mt-4">
              Liên hệ ngay
            </Button>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
