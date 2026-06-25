import type { Metadata } from "next";
import Script from "next/script";
import { Mail, MapPin, Phone, Clock, Facebook, Youtube, MessageCircle } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Card } from "@/components/ui/card";
import { ContactForm } from "@/components/contact/contact-form";
import { SITE_CONFIG } from "@/data/site-config";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, localBusinessSchema } from "@/lib/json-ld";

export const metadata: Metadata = buildMetadata({
  title: "Liên Hệ – Tư vấn miễn phí 24/7",
  description:
    "Liên hệ Green Oli để nhận tư vấn miễn phí về sản phẩm hóa chất nông nghiệp, phân bón và dịch vụ kiểm soát côn trùng. Hotline 24/7.",
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
      <PageHeader
        title="Liên hệ với Green Oli"
        description="Để lại thông tin – đội ngũ kỹ sư của chúng tôi sẽ phản hồi trong vòng 24 giờ."
        breadcrumb={[{ label: "Liên hệ" }]}
      />

      <section className="container-page py-12 md:py-16">
        <div className="grid gap-8 lg:grid-cols-5">
          <Card className="lg:col-span-3 space-y-1">
            <h2 className="font-bold text-2xl text-text-primary">
              Gửi yêu cầu tư vấn
            </h2>
            <p className="text-text-muted mb-4">
              Mọi thông tin của bạn được bảo mật theo chính sách của Green Oli.
            </p>
            <ContactForm />
          </Card>

          <div className="lg:col-span-2 space-y-5">
            <Card className="space-y-4">
              <h3 className="font-bold text-xl text-text-primary">
                Thông tin liên hệ
              </h3>
              <ul className="space-y-3">
                {INFO.map((item) => {
                  const Icon = item.icon;
                  const content = (
                    <span className="flex items-start gap-3">
                      <span className="grid size-9 place-items-center rounded-full bg-primary/10 text-primary-dark flex-none">
                        <Icon className="size-4" aria-hidden />
                      </span>
                      <span>
                        <span className="block text-xs uppercase tracking-wider text-text-muted">
                          {item.label}
                        </span>
                        <span className="block text-sm text-text-primary mt-0.5">
                          {item.value}
                        </span>
                      </span>
                    </span>
                  );
                  return (
                    <li key={item.label}>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="block hover:text-primary-dark transition-colors"
                        >
                          {content}
                        </a>
                      ) : (
                        content
                      )}
                    </li>
                  );
                })}
              </ul>
            </Card>

            <Card className="space-y-3">
              <h3 className="font-bold text-xl text-text-primary">
                Kết nối mạng xã hội
              </h3>
              <div className="flex flex-wrap gap-2">
                {SOCIAL.map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="grid size-11 place-items-center rounded-full bg-surface-container hover:bg-primary hover:text-on-primary transition-colors"
                  >
                    <Icon className="size-5" />
                  </a>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="pb-16 md:pb-20" aria-label="Bản đồ Google Maps">
        <div className="container-page">
          <div className="overflow-hidden rounded-card shadow-ambient">
            <iframe
              title="Vị trí Green Oli trên Google Maps"
              src={SITE_CONFIG.mapEmbedUrl}
              width="100%"
              height="420"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block w-full"
            />
          </div>
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
