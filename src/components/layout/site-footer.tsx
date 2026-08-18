import Link from "next/link";
import Image from "next/image";
import {
  Facebook,
  Mail,
  MapPin,
  Phone,
  Youtube,
  Send,
} from "lucide-react";
import {
  SITE_CONFIG,
  NAV_ITEMS,
  activeSocialLinks,
} from "@/data/site-config";
import type { NavCategory } from "@/components/layout/site-header";

const SOCIAL_ICON = {
  facebook: Facebook,
  youtube: Youtube,
  zalo: Send,
  tiktok: Send,
} as const;

const SOCIAL_LABEL: Record<keyof typeof SITE_CONFIG.social, string> = {
  facebook: "Facebook",
  youtube: "YouTube",
  zalo: "Zalo",
  tiktok: "TikTok",
};

export function SiteFooter({ categories }: { categories: NavCategory[] }) {
  const socials = activeSocialLinks();

  return (
    <footer className="bg-primary-dark text-white border-t border-border-soft/20 relative overflow-hidden">
      <div
        className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 blur-[100px] rounded-full pointer-events-none"
        aria-hidden
      />

      <div className="container-page py-16 grid gap-12 md:gap-8 md:grid-cols-2 lg:grid-cols-4 relative z-10">
        {/* About */}
        <div className="lg:max-w-sm">
          <Link
            href="/"
            className="flex items-center bg-white/5 p-2 rounded-xl backdrop-blur-sm w-fit"
            aria-label="Trang chủ"
          >
            <Image
              src="/logo.svg"
              alt="Oli Xanh Logo"
              width={320}
              height={112}
              className="w-48 lg:w-64 h-auto object-contain brightness-0 invert"
            />
          </Link>
          <p className="mt-6 text-sm text-white/70 leading-relaxed font-medium">
            {SITE_CONFIG.description}
          </p>
          {socials.length > 0 ? (
            <div className="mt-6 flex gap-3">
              {socials.map(({ key, href }) => {
                const Icon = SOCIAL_ICON[key] ?? Send;
                return (
                  <a
                    key={key}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={SOCIAL_LABEL[key]}
                    className="grid size-10 place-items-center rounded-full bg-white/10 hover:bg-primary-light hover:text-primary-dark transition-colors"
                  >
                    <Icon className="size-4" />
                  </a>
                );
              })}
            </div>
          ) : null}
        </div>

        {/* Quick links */}
        <nav aria-label="Liên kết nhanh">
          <h3 className="mb-5 font-bold text-lg text-white">Liên kết nhanh</h3>
          <ul className="space-y-3 text-sm text-white/70 font-medium">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="hover:text-primary-light hover:translate-x-1 transition-all inline-block"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Categories */}
        <nav aria-label="Danh mục sản phẩm">
          <h3 className="mb-5 font-bold text-lg text-white">Sản phẩm</h3>
          <ul className="space-y-3 text-sm text-white/70 font-medium">
            {categories.slice(0, 6).map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/cua-hang/${c.slug}`}
                  className="hover:text-primary-light hover:translate-x-1 transition-all inline-block"
                >
                  {(c.shortName ?? c.name).replace(/Diệt/g, "Kiểm soát")}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Link
                href="/cua-hang"
                className="font-bold text-primary-light hover:underline inline-flex items-center gap-1"
              >
                Xem tất cả &rarr;
              </Link>
            </li>
          </ul>
        </nav>

        {/* Contact */}
        <div>
          <h3 className="mb-5 font-bold text-lg text-white">Liên hệ</h3>
          <ul className="space-y-4 text-sm text-white/70 font-medium">
            <li className="flex gap-3">
              <MapPin
                className="size-5 shrink-0 text-primary-light"
                aria-hidden
              />
              <span className="leading-relaxed">{SITE_CONFIG.address}</span>
            </li>
            {SITE_CONFIG.hotlines.map((h) => (
              <li key={h.tel}>
                <a
                  href={`tel:${h.tel}`}
                  className="flex items-center gap-3 hover:text-primary-light transition-colors"
                >
                  <Phone
                    className="size-5 shrink-0 text-primary-light"
                    aria-hidden
                  />
                  {h.label}
                </a>
              </li>
            ))}
            {SITE_CONFIG.email ? (
              <li>
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="flex items-center gap-3 hover:text-primary-light transition-colors"
                >
                  <Mail
                    className="size-5 shrink-0 text-primary-light"
                    aria-hidden
                  />
                  {SITE_CONFIG.email}
                </a>
              </li>
            ) : null}
            <li className="text-xs italic opacity-80 pt-2">
              {SITE_CONFIG.workingHours}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 relative z-10 bg-black/20">
        <div className="container-page py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-medium text-white/60">
          <p>
            © {new Date().getFullYear()} {SITE_CONFIG.name}. Mọi quyền được bảo
            lưu.
          </p>
          <p>
            Thiết kế theo bộ nhận diện{" "}
            <span className="font-bold text-primary-light">
              Molecular Precision
            </span>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}
