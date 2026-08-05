import Script from "next/script";
import type { Metadata } from "next";
import { HeroSection } from "@/components/home/hero-section";
import { FeaturedProductsSection } from "@/components/home/featured-products-section";
import { HighlightBanner } from "@/components/home/highlight-banner";
import { IntroSection } from "@/components/home/intro-section";
import { VisionMissionSection } from "@/components/home/vision-mission";
import { CategoryShowcase } from "@/components/home/category-showcase";
import { PartnersMarquee } from "@/components/home/partners-marquee";
import { GalleryCarousel } from "@/components/home/gallery-carousel";
import { NewsHighlight } from "@/components/home/news-highlight";
import { ContactCta } from "@/components/home/contact-cta";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/json-ld";

export const metadata: Metadata = buildMetadata({
  title: "Oli Xanh – Giải pháp hóa chất y tế & kiểm soát côn trùng",
  description:
    "Phân phối hóa chất y tế, phân bón, thuốc bảo vệ thực vật và dịch vụ kiểm soát côn trùng chuyên nghiệp. Đại lý chính hãng Sumitomo, Bayer, Syngenta, BASF.",
  path: "/",
});

// ISR thay SSG: build không cần DB, nội dung mới hiện sau tối đa 5 phút.
// (Trang chủ gọi nhiều section async query Payload — nếu để SSG, Vercel build
//  sẽ treo khi DB chưa reachable trong lúc "Generating static pages".)
export const revalidate = 300;

export default function HomePage() {
  return (
    <>
      <HighlightBanner />
      <HeroSection />
      <IntroSection />
      <FeaturedProductsSection />
      <VisionMissionSection />
      <CategoryShowcase />
      <PartnersMarquee />
      {/* <GalleryCarousel /> */}
      <NewsHighlight />
      <ContactCta />
      <Script
        id="ld-home-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([{ name: "Trang chủ", href: "/" }]),
          ),
        }}
      />
    </>
  );
}
