import type { Metadata, Viewport } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import Script from "next/script";
import "@/app/globals.css";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { FloatingSocialPanel } from "@/components/layout/floating-social-panel";
import { ScrollProgress } from "@/components/layout/scroll-progress";
import { GaScripts } from "@/components/analytics/ga-scripts";
import { SITE_CONFIG } from "@/data/site-config";
import { getAllCategories } from "@/data/categories";
import { getAllBrands } from "@/data/brands";
import { organizationSchema, websiteSchema } from "@/lib/json-ld";

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-be-vietnam-pro",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: `${SITE_CONFIG.name} – ${SITE_CONFIG.tagline}`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  applicationName: SITE_CONFIG.name,
  authors: [{ name: SITE_CONFIG.name, url: SITE_CONFIG.url }],
  keywords: [
    "Oli Xanh",
    "GreenOLI",
    "kiểm soát côn trùng",
    "kiểm soát mối",
    "kiểm soát chuột",
    "kiểm soát muỗi",
    "hóa chất kiểm soát côn trùng",
    "thiết bị kiểm soát côn trùng",
    "giải pháp ESG",
    "phân phối phía Bắc",
  ],
  openGraph: {
    type: "website",
    locale: SITE_CONFIG.locale,
    siteName: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
  },
  twitter: { card: "summary_large_image" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/icon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#80bc00",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [categories, brands] = await Promise.all([
    getAllCategories(),
    getAllBrands(),
  ]);
  const navCategories = categories.map((c) => ({
    slug: c.slug,
    name: c.name,
    shortName: c.shortName,
    tagline: c.tagline,
  }));
  const navBrands = brands.map((b) => ({
    slug: b.slug,
    name: b.name,
    tagline: b.tagline,
  }));

  return (
    <html lang="vi" className={beVietnamPro.variable}>
      <body className="min-h-screen bg-surface text-text-primary antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white focus:shadow-lg"
        >
          Bỏ qua điều hướng, tới nội dung chính
        </a>
        <GaScripts />
        <SiteHeader categories={navCategories} brands={navBrands} />
        <main id="main-content" className="pt-[var(--header-h,76px)]" tabIndex={-1}>
          {children}
        </main>
        <SiteFooter categories={navCategories} />
        <FloatingSocialPanel />
        <Script
          id="ld-organization"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema()),
          }}
        />
        <Script
          id="ld-website"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema()),
          }}
        />
        <ScrollProgress />
      </body>
    </html>
  );
}
