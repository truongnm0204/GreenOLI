import type { Metadata } from "next";
import Image from "next/image";
import Script from "next/script";
import { HeroSection } from "@/components/home/hero-section";
import { IntroSection } from "@/components/home/intro-section";
import { VisionMissionSection } from "@/components/home/vision-mission";
import { NewsHighlight } from "@/components/home/news-highlight";
import { ContactCta } from "@/components/home/contact-cta";
import { MotionWrapper } from "@/components/ui/motion-wrapper";
import { AnimatedText } from "@/components/motion/animated-text";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/json-ld";

export const metadata: Metadata = buildMetadata({
  title: "Về Oli Xanh – Giải pháp kiểm soát côn trùng & Đội ngũ",
  description:
    "Oli Xanh phân phối hóa chất và thiết bị kiểm soát côn trùng, mối, chuột khu vực phía Bắc. Tìm hiểu sứ mệnh, giá trị cốt lõi và đội ngũ kỹ sư.",
  path: "/gioi-thieu",
});

export const revalidate = 300;

export default function AboutPage() {
  return (
    <>
      <HeroSection />
      <IntroSection />

      <section className="container-page py-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-12 items-center">
          <MotionWrapper delay={0.1} direction="left" className="lg:col-span-6">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-ambient-lg hover-card-effect group">
              <Image
                src="/images/about/team.png"
                alt="Văn phòng Oli Xanh và đội ngũ làm việc"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-primary-dark/5 mix-blend-multiply" />
            </div>
          </MotionWrapper>
          <div className="lg:col-span-6 space-y-6">
            <MotionWrapper delay={0.2} direction="up">
              <p className="text-primary-dark font-bold text-sm uppercase tracking-widest">
                Hành trình của chúng tôi
              </p>
            </MotionWrapper>
            
            <h2 className="font-bold text-3xl md:text-4xl lg:text-5xl text-text-primary leading-tight">
              <AnimatedText text="Từ một cửa hàng nhỏ đến mạng lưới phân phối toàn quốc" delay={0.3} />
            </h2>
            
            <MotionWrapper delay={0.5} direction="up">
              <p className="text-text-muted text-lg leading-relaxed font-medium">
                Công ty TNHH Hóa Chất và Thiết Bị Oli Xanh tự hào là nhà phân phối độc quyền khu vực phía Bắc các sản phẩm kiểm soát côn trùng, mối, chuột từ các tập đoàn đa quốc gia hàng đầu như Bayer, Syngenta, Ensystex, Sumitomo, BASF (Mythic, Seclira).
              </p>
            </MotionWrapper>
            <MotionWrapper delay={0.6} direction="up">
              <p className="text-text-muted text-lg leading-relaxed font-medium">
                Chúng tôi chuyên cung cấp tất cả các giải pháp mang tính an toàn tuyệt đối đối với con người, vật nuôi và môi trường. Mục tiêu hướng đến của Oli Xanh luôn là tiêu chuẩn ESG – cam kết phát triển bền vững, mang lại giá trị dài lâu cho khách hàng và cộng đồng.
              </p>
            </MotionWrapper>
            
            <ul className="grid grid-cols-2 gap-6 pt-6 border-t border-border-soft/60">
              {[
                { value: "15", label: "Tỉnh thành phân phối" },
                { value: "500+", label: "Khách hàng doanh nghiệp" },
                { value: "50+", label: "Chuyên gia y tế & cố vấn" },
                { value: "10+", label: "Năm kinh nghiệm" }
              ].map((stat, idx) => (
                <li key={stat.label}>
                  <MotionWrapper delay={0.7 + idx * 0.1} direction="up">
                    <p className="text-4xl font-extrabold text-primary-dark tracking-tight">{stat.value}</p>
                    <p className="text-sm text-text-muted mt-1 font-medium">{stat.label}</p>
                  </MotionWrapper>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <VisionMissionSection />

      <NewsHighlight />

      <ContactCta />

      <Script
        id="ld-about-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Trang chủ", href: "/" },
              { name: "Về Oli Xanh", href: "/gioi-thieu" },
            ]),
          ),
        }}
      />
    </>
  );
}

