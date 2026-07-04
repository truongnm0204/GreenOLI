import type { Metadata } from "next";
import Script from "next/script";
import { Mail, MapPin, Phone, Clock, Facebook, Youtube, MessageCircle } from "lucide-react";
import { ContactHeroSection } from "@/components/contact/contact-hero";
import { Card } from "@/components/ui/card";
import { ContactForm } from "@/components/contact/contact-form";
import { MotionWrapper } from "@/components/ui/motion-wrapper";
import { AnimatedText } from "@/components/motion/animated-text";
import { SITE_CONFIG } from "@/data/site-config";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, localBusinessSchema } from "@/lib/json-ld";

export const metadata: Metadata = buildMetadata({
  title: "Liên Hệ – Tư vấn miễn phí 24/7",
  description:
    "Liên hệ Oli Xanh để nhận tư vấn miễn phí về sản phẩm hóa chất nông nghiệp, phân bón và dịch vụ kiểm soát côn trùng. Hotline 24/7.",
  path: "/lien-he",
});

const INFO = [
  { icon: MapPin, label: "Địa chỉ", value: SITE_CONFIG.address },
  {
    icon: Phone,
    label: "Hotline",
    value: SITE_CONFIG.hotline,
    href: `tel:${SITE_CONFIG.hotline.replace(/\s/g, "")}`,
  },
  {
    icon: Mail,
    label: "Email",
    value: SITE_CONFIG.email,
    href: `mailto:${SITE_CONFIG.email}`,
  },
  { icon: Clock, label: "Giờ làm việc", value: SITE_CONFIG.workingHours },
];

const SOCIAL = [
  { icon: Facebook, label: "Facebook", href: SITE_CONFIG.social.facebook },
  { icon: MessageCircle, label: "Zalo", href: SITE_CONFIG.social.zalo },
  { icon: Youtube, label: "YouTube", href: SITE_CONFIG.social.youtube },
];

export default function ContactPage() {
  return (
    <>
      <ContactHeroSection
        title="Liên hệ với Oli Xanh"
        description="Để lại thông tin – đội ngũ kỹ sư của chúng tôi sẽ phản hồi trong vòng 24 giờ."
        breadcrumb={[{ label: "Liên hệ" }]}
      />

      <section className="container-page py-16 md:py-24 relative">
        <div className="bg-blob bg-blob-secondary w-[400px] h-[400px] -top-20 -left-20 opacity-10" />
        <div className="grid gap-8 lg:grid-cols-5 relative z-10">
          <MotionWrapper delay={0.1} direction="left" className="lg:col-span-3">
            <Card className="space-y-4 p-8 md:p-10 rounded-[2rem] shadow-ambient-lg border-none hover-card-effect h-full">
              <h2 className="font-bold text-2xl md:text-3xl text-text-primary">
                <AnimatedText text="Gửi yêu cầu tư vấn" delay={0.2} />
              </h2>
              <p className="text-text-muted mb-6 text-lg font-medium">
                Mọi thông tin của bạn được bảo mật theo chính sách của Oli Xanh.
              </p>
              <ContactForm />
            </Card>
          </MotionWrapper>

          <div className="lg:col-span-2 space-y-6">
            <MotionWrapper delay={0.3} direction="up">
              <Card className="space-y-6 p-8 rounded-[2rem] shadow-ambient hover-card-effect border-none">
                <h3 className="font-bold text-xl text-text-primary flex items-center gap-2">
                  <span className="w-2 h-6 rounded-full bg-primary inline-block"></span>
                  Thông tin liên hệ
                </h3>
                <ul className="space-y-5">
                  {INFO.map((item, idx) => {
                    const Icon = item.icon;
                    const content = (
                      <MotionWrapper as="span" key={item.label} delay={0.4 + idx * 0.1} direction="up" className="flex items-start gap-4">
                        <span className="grid size-11 place-items-center rounded-xl bg-primary/10 text-primary-dark flex-none">
                          <Icon className="size-5" aria-hidden />
                        </span>
                        <span>
                          <span className="block text-xs uppercase tracking-wider text-text-muted font-bold">
                            {item.label}
                          </span>
                          <span className="block text-base text-text-primary mt-1 font-medium">
                            {item.value}
                          </span>
                        </span>
                      </MotionWrapper>
                    );
                    return (
                      <li key={item.label}>
                        {item.href ? (
                          <a
                            href={item.href}
                            className="block hover:text-primary-dark transition-colors group"
                          >
                            <span className="group-hover:translate-x-1 transition-transform inline-block w-full">
                              {content}
                            </span>
                          </a>
                        ) : (
                          content
                        )}
                      </li>
                    );
                  })}
                </ul>
              </Card>
            </MotionWrapper>

            <MotionWrapper delay={0.5} direction="up">
              <Card className="space-y-4 p-8 rounded-[2rem] shadow-ambient hover-card-effect border-none">
                <h3 className="font-bold text-xl text-text-primary flex items-center gap-2">
                  <span className="w-2 h-6 rounded-full bg-secondary inline-block"></span>
                  Kết nối mạng xã hội
                </h3>
                <div className="flex flex-wrap gap-3">
                  {SOCIAL.map(({ icon: Icon, label, href }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="grid size-12 place-items-center rounded-xl bg-surface-container hover:bg-primary-light hover:text-primary-dark hover:-translate-y-1 hover:shadow-lg transition-all"
                    >
                      <Icon className="size-5" />
                    </a>
                  ))}
                </div>
              </Card>
            </MotionWrapper>
          </div>
        </div>
      </section>

      <section className="pb-16 md:pb-24" aria-label="Bản đồ Google Maps">
        <div className="container-page">
          <MotionWrapper delay={0.2} direction="up" className="overflow-hidden rounded-[2rem] shadow-ambient-lg group">
            <iframe
              title="Vị trí Oli Xanh trên Google Maps"
              src={SITE_CONFIG.mapEmbedUrl}
              width="100%"
              height="450"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block w-full transition-transform duration-700 group-hover:scale-[1.02]"
            />
          </MotionWrapper>
        </div>
      </section>

      <Script
        id="ld-contact-business"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema()),
        }}
      />
      <Script
        id="ld-contact-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Trang chủ", href: "/" },
              { name: "Liên hệ", href: "/lien-he" },
            ]),
          ),
        }}
      />
    </>
  );
}

