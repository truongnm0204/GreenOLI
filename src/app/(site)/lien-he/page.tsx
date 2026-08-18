import type { Metadata } from "next";
import Script from "next/script";
import { Suspense } from "react";
import {
  Mail,
  MapPin,
  Phone,
  Clock,
  Facebook,
  Youtube,
  MessageCircle,
  Send,
} from "lucide-react";
import { ContactHeroSection } from "@/components/contact/contact-hero";
import { Card } from "@/components/ui/card";
import { ContactForm } from "@/components/contact/contact-form";
import { MotionWrapper } from "@/components/ui/motion-wrapper";
import { AnimatedText } from "@/components/motion/animated-text";
import {
  SITE_CONFIG,
  activeSocialLinks,
} from "@/data/site-config";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, localBusinessSchema } from "@/lib/json-ld";

export const metadata: Metadata = buildMetadata({
  title: "Liên Hệ – Tư vấn giải pháp kiểm soát côn trùng",
  description:
    "Liên hệ Oli Xanh để nhận tư vấn sản phẩm và giải pháp kiểm soát côn trùng, mối, chuột. Hotline hỗ trợ trong giờ làm việc.",
  path: "/lien-he",
});

const SOCIAL_ICON = {
  facebook: Facebook,
  youtube: Youtube,
  zalo: MessageCircle,
  tiktok: Send,
} as const;

const SOCIAL_LABEL: Record<keyof typeof SITE_CONFIG.social, string> = {
  facebook: "Facebook",
  youtube: "YouTube",
  zalo: "Zalo",
  tiktok: "TikTok",
};

export default function ContactPage() {
  const socials = activeSocialLinks();

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
              <Suspense
                fallback={
                  <p className="text-sm text-text-muted">Đang tải form…</p>
                }
              >
                <ContactForm />
              </Suspense>
            </Card>
          </MotionWrapper>

          <div className="lg:col-span-2 space-y-6">
            <MotionWrapper delay={0.3} direction="up">
              <Card className="space-y-6 p-8 rounded-[2rem] shadow-ambient hover-card-effect border-none">
                <h3 className="font-bold text-xl text-text-primary flex items-center gap-2">
                  <span className="w-2 h-6 rounded-full bg-primary inline-block" />
                  Thông tin liên hệ
                </h3>
                <ul className="space-y-5">
                  <li className="flex items-start gap-4">
                    <span className="grid size-11 place-items-center rounded-xl bg-primary/10 text-primary-dark flex-none">
                      <MapPin className="size-5" aria-hidden />
                    </span>
                    <span>
                      <span className="block text-xs uppercase tracking-wider text-text-muted font-bold">
                        Địa chỉ
                      </span>
                      <span className="block text-base text-text-primary mt-1 font-medium">
                        {SITE_CONFIG.address}
                      </span>
                    </span>
                  </li>

                  {SITE_CONFIG.hotlines.map((h) => (
                    <li key={h.tel}>
                      <a
                        href={`tel:${h.tel}`}
                        className="flex items-start gap-4 hover:text-primary-dark transition-colors group"
                      >
                        <span className="grid size-11 place-items-center rounded-xl bg-primary/10 text-primary-dark flex-none group-hover:bg-primary/20">
                          <Phone className="size-5" aria-hidden />
                        </span>
                        <span>
                          <span className="block text-xs uppercase tracking-wider text-text-muted font-bold">
                            Hotline
                          </span>
                          <span className="block text-base text-text-primary mt-1 font-medium">
                            {h.label}
                          </span>
                        </span>
                      </a>
                    </li>
                  ))}

                  {SITE_CONFIG.email ? (
                    <li>
                      <a
                        href={`mailto:${SITE_CONFIG.email}`}
                        className="flex items-start gap-4 hover:text-primary-dark transition-colors group"
                      >
                        <span className="grid size-11 place-items-center rounded-xl bg-primary/10 text-primary-dark flex-none">
                          <Mail className="size-5" aria-hidden />
                        </span>
                        <span>
                          <span className="block text-xs uppercase tracking-wider text-text-muted font-bold">
                            Email
                          </span>
                          <span className="block text-base text-text-primary mt-1 font-medium">
                            {SITE_CONFIG.email}
                          </span>
                        </span>
                      </a>
                    </li>
                  ) : null}

                  <li className="flex items-start gap-4">
                    <span className="grid size-11 place-items-center rounded-xl bg-primary/10 text-primary-dark flex-none">
                      <Clock className="size-5" aria-hidden />
                    </span>
                    <span>
                      <span className="block text-xs uppercase tracking-wider text-text-muted font-bold">
                        Giờ làm việc
                      </span>
                      <span className="block text-base text-text-primary mt-1 font-medium">
                        {SITE_CONFIG.workingHours}
                      </span>
                    </span>
                  </li>
                </ul>
              </Card>
            </MotionWrapper>

            {socials.length > 0 ? (
              <MotionWrapper delay={0.5} direction="up">
                <Card className="space-y-4 p-8 rounded-[2rem] shadow-ambient hover-card-effect border-none">
                  <h3 className="font-bold text-xl text-text-primary flex items-center gap-2">
                    <span className="w-2 h-6 rounded-full bg-secondary inline-block" />
                    Kết nối mạng xã hội
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {socials.map(({ key, href }) => {
                      const Icon = SOCIAL_ICON[key] ?? Send;
                      return (
                        <a
                          key={key}
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={SOCIAL_LABEL[key]}
                          className="grid size-12 place-items-center rounded-xl bg-surface-container hover:bg-primary-light hover:text-primary-dark hover:-translate-y-1 hover:shadow-lg transition-all"
                        >
                          <Icon className="size-5" />
                        </a>
                      );
                    })}
                  </div>
                </Card>
              </MotionWrapper>
            ) : null}
          </div>
        </div>
      </section>

      <section className="pb-16 md:pb-24" aria-label="Bản đồ Google Maps">
        <div className="container-page">
          <MotionWrapper
            delay={0.2}
            direction="up"
            className="overflow-hidden rounded-[2rem] shadow-ambient-lg group"
          >
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
