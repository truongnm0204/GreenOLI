import { Phone, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MotionWrapper } from "@/components/ui/motion-wrapper";
import { AnimatedText } from "@/components/motion/animated-text";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { SITE_CONFIG } from "@/data/site-config";

export function ContactCta() {
  return (
    <section className="container-page py-16 md:py-24">
      <MotionWrapper
        direction="up"
        delay={0.1}
        className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-primary-dark via-primary to-primary-fixed p-10 md:p-16 text-white shadow-ambient-lg hover-card-effect"
      >
        <div className="absolute inset-0 opacity-40 mix-blend-overlay">
          <AnimatedBackground />
        </div>

        
        <div className="relative grid gap-10 md:grid-cols-12 items-center z-10">
          <div className="md:col-span-7 space-y-5">
            <span className="inline-flex items-center gap-2 rounded-chip bg-white/20 backdrop-blur-md px-4 py-1.5 text-sm font-bold shadow-sm">
              <Sparkles className="size-4" aria-hidden />
              Tư vấn miễn phí 24/7
            </span>
            <h2 className="font-bold text-3xl md:text-4xl lg:text-5xl leading-tight">
              <AnimatedText text="Sẵn sàng đồng hành cùng giải pháp xanh của bạn?" delay={0.2} />
            </h2>
            <MotionWrapper direction="up" delay={0.5}>
              <p className="text-white/90 text-lg leading-relaxed max-w-xl font-medium">
                Đội ngũ kỹ sư của Oli Xanh luôn sẵn sàng tư vấn miễn phí giải pháp phù hợp
                cho cây trồng, công trình và doanh nghiệp của bạn.
              </p>
            </MotionWrapper>
          </div>
          <div className="md:col-span-5 flex flex-col gap-4 md:items-end">
            <MotionWrapper direction="up" delay={0.6}>
              <Button
                href={`tel:${SITE_CONFIG.hotline.replace(/\s/g, "")}`}
                variant="secondary"
                size="lg"
                className="bg-white text-primary-dark hover:bg-white/90 shadow-xl hover:-translate-y-1 h-14 px-8 text-base font-bold w-full md:w-auto"
              >
                <Phone className="size-5" aria-hidden />
                {SITE_CONFIG.hotline}
              </Button>
            </MotionWrapper>
            <MotionWrapper direction="up" delay={0.7}>
              <Button
                href="/lien-he"
                variant="outline"
                size="lg"
                className="border-white/50 bg-white/10 backdrop-blur-sm text-white hover:bg-white hover:text-primary-dark h-14 px-8 text-base font-bold w-full md:w-auto hover:-translate-y-1"
              >
                Để lại thông tin
              </Button>
            </MotionWrapper>
          </div>
        </div>
      </MotionWrapper>
    </section>
  );
}

