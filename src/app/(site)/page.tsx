import Script from "next/script";
import type { Metadata } from "next";
import { HeroSection } from "@/components/home/hero-section";
import { IntroSection } from "@/components/home/intro-section";
import { VisionMissionSection } from "@/components/home/vision-mission";
import { CategoryShowcase } from "@/components/home/category-showcase";
import { EcosystemSection } from "@/components/home/ecosystem-section";
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

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <IntroSection />
      <VisionMissionSection />
      <CategoryShowcase />
      <EcosystemSection />
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
