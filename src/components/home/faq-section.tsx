import Script from "next/script";
import { HelpCircle } from "lucide-react";
import { HOME_FAQS } from "@/data/faq";
import { faqPageSchema } from "@/lib/json-ld";
import { MotionWrapper } from "@/components/ui/motion-wrapper";
import { SectionHeader } from "@/components/ui/section-header";
import { Button } from "@/components/ui/button";

export function FaqSection() {
  return (
    <section
      className="bg-surface-container-low/40 py-16 md:py-24"
      aria-labelledby="faq-heading"
    >
      <div className="container-page">
        <div id="faq-heading">
          <SectionHeader
            eyebrow="Hỗ trợ"
            title="Câu hỏi thường gặp"
            align="center"
            className="mb-4 md:mb-6"
          />
        </div>
        <p className="mx-auto mb-10 max-w-2xl text-center text-text-muted md:mb-12">
          Một số thắc mắc phổ biến về sản phẩm, tư vấn và hợp tác với Oli Xanh.
        </p>

        <div className="mx-auto max-w-3xl space-y-3">
          {HOME_FAQS.map((item, idx) => (
            <MotionWrapper key={item.id} delay={0.05 * idx} direction="up">
              <details className="group rounded-2xl border border-border-soft/80 bg-white px-5 py-1 shadow-sm open:shadow-ambient transition-shadow">
                <summary className="cursor-pointer list-none py-4 font-semibold text-text-primary marker:content-none flex items-start gap-3 [&::-webkit-details-marker]:hidden">
                  <HelpCircle
                    className="mt-0.5 size-5 shrink-0 text-primary-dark opacity-80"
                    aria-hidden
                  />
                  <span className="flex-1 text-left leading-snug">
                    {item.question}
                  </span>
                  <span
                    className="mt-0.5 text-xl font-light leading-none text-primary-dark transition-transform group-open:rotate-45"
                    aria-hidden
                  >
                    +
                  </span>
                </summary>
                <div className="border-t border-border-soft/60 pb-4 pl-8 pr-2 pt-3 text-sm leading-relaxed text-text-muted md:text-base">
                  {item.answer}
                </div>
              </details>
            </MotionWrapper>
          ))}
        </div>

        <MotionWrapper
          delay={0.35}
          direction="up"
          className="mt-10 flex justify-center"
        >
          <Button href="/lien-he" size="lg" className="font-bold">
            Vẫn cần tư vấn? Liên hệ ngay
          </Button>
        </MotionWrapper>
      </div>

      <Script
        id="ld-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqPageSchema(HOME_FAQS)),
        }}
      />
    </section>
  );
}
