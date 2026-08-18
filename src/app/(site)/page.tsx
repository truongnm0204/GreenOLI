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
import { FaqSection } from "@/components/home/faq-section";
import { ContactCta } from "@/components/home/contact-cta";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/json-ld";

export const metadata: Metadata = buildMetadata({
  title: "Oli Xanh – Giải pháp kiểm soát côn trùng, mối & chuột",
  description:
    "Công ty TNHH Hóa Chất và Thiết Bị Oli Xanh phân phối độc quyền khu vực phía Bắc sản phẩm kiểm soát côn trùng, mối, chuột từ các tập đoàn đa quốc gia. An toàn – ESG – tư vấn chuyên sâu.",
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
      <FaqSection />
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
