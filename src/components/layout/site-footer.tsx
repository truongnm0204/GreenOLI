import Link from "next/link";
import {
  Facebook,
  Mail,
  MapPin,
  Phone,
  Youtube,
  Send,
} from "lucide-react";
import { SITE_CONFIG, NAV_ITEMS } from "@/data/site-config";
import type { NavCategory } from "@/components/layout/site-header";

export function SiteFooter({ categories }: { categories: NavCategory[] }) {
  return (
    <footer className="bg-surface-container-lowest border-t border-border-soft">
      <div className="container-page py-16 grid gap-12 md:gap-8 md:grid-cols-2 lg:grid-cols-4">
        {/* About */}
        <div className="lg:max-w-sm">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <span className="grid size-9 place-items-center rounded-full bg-primary text-on-primary">
              G
            </span>
            <span>
              Green <span className="text-primary-dark">Oli</span>
            </span>
          </Link>
          <p className="mt-4 text-sm text-text-muted leading-relaxed">
            {SITE_CONFIG.description}
          </p>
          <div className="mt-5 flex gap-2">
            <a
              href={SITE_CONFIG.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="grid size-10 place-items-center rounded-full bg-surface-container hover:bg-primary hover:text-on-primary transition-colors"
            >
              <Facebook className="size-4" />
            </a>
            <a
              href={SITE_CONFIG.social.youtube}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="grid size-10 place-items-center rounded-full bg-surface-container hover:bg-primary hover:text-on-primary transition-colors"
            >
              <Youtube className="size-4" />
            </a>
            <a
              href={SITE_CONFIG.social.zalo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Zalo"
              className="grid size-10 place-items-center rounded-full bg-surface-container hover:bg-primary hover:text-on-primary transition-colors"
            >
              <Send className="size-4" />
            </a>
          </div>
        </div>

        {/* Quick links */}
        <nav aria-label="Liên kết nhanh">
          <h3 className="mb-4 font-semibold text-text-primary">Liên kết nhanh</h3>
          <ul className="space-y-2.5 text-sm text-text-muted">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="hover:text-primary-dark transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Categories */}
        <nav aria-label="Danh mục sản phẩm">
          <h3 className="mb-4 font-semibold text-text-primary">Sản phẩm</h3>
          <ul className="space-y-2.5 text-sm text-text-muted">
            {categories.slice(0, 6).map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/cua-hang/${c.slug}`}
                  className="hover:text-primary-dark transition-colors"
                >
                  {c.shortName ?? c.name}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/cua-hang"
                className="font-semibold text-primary-dark hover:underline"
              >
                Xem tất cả →
              </Link>
            </li>
          </ul>
        </nav>

        {/* Contact */}
        <div>
          <h3 className="mb-4 font-semibold text-text-primary">Liên hệ</h3>
          <ul className="space-y-3 text-sm text-text-muted">
            <li className="flex gap-3">
              <MapPin className="size-4 mt-0.5 shrink-0 text-primary-dark" aria-hidden />
              <span>{SITE_CONFIG.address}</span>
            </li>
            <li>
              <a
                href={`tel:${SITE_CONFIG.hotline.replace(/\s/g, "")}`}
                className="flex items-center gap-3 hover:text-primary-dark transition-colors"
              >
                <Phone className="size-4 text-primary-dark" aria-hidden />
                {SITE_CONFIG.hotline}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="flex items-center gap-3 hover:text-primary-dark transition-colors"
              >
                <Mail className="size-4 text-primary-dark" aria-hidden />
                {SITE_CONFIG.email}
              </a>
            </li>
            <li className="text-xs italic">{SITE_CONFIG.workingHours}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border-soft">
        <div className="container-page py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-text-muted">
          <p>
            © {new Date().getFullYear()} {SITE_CONFIG.name}. Mọi quyền được bảo lưu.
          </p>
          <p>
            Thiết kế theo bộ nhận diện{" "}
            <span className="font-semibold text-primary-dark">
              Molecular Precision
            </span>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}
