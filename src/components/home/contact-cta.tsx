import { Phone, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { SITE_CONFIG } from "@/data/site-config";

export function ContactCta() {
  return (
    <section className="container-page py-16 md:py-20">
      <Reveal
        as="div"
        variant="scale-in"
        className="relative overflow-hidden rounded-card bg-gradient-to-br from-primary-dark via-primary to-primary-fixed p-10 md:p-16 text-white shadow-ambient-lg"
      >
        <div className="absolute inset-0 molecular-pattern opacity-20" aria-hidden />
        <div className="relative grid gap-8 md:grid-cols-12 items-center">
          <div className="md:col-span-7 space-y-4">
            <span className="inline-flex items-center gap-2 rounded-chip bg-white/15 backdrop-blur px-3 py-1 text-xs font-semibold">
              <Sparkles className="size-3.5" aria-hidden />
              Tư vấn miễn phí 24/7
            </span>
            <h2 className="font-bold text-3xl md:text-4xl lg:text-5xl leading-tight">
              Sẵn sàng đồng hành cùng giải pháp xanh của bạn?
            </h2>
            <p className="text-white/90 text-base md:text-lg leading-relaxed max-w-xl">
              Đội ngũ kỹ sư của Green Oli luôn sẵn sàng tư vấn miễn phí giải pháp phù hợp
              cho cây trồng, công trình và doanh nghiệp của bạn.
            </p>
          </div>
          <div className="md:col-span-5 flex flex-col gap-3 md:items-end">
            <Button
              href={`tel:${SITE_CONFIG.hotline.replace(/\s/g, "")}`}
              variant="secondary"
              size="lg"
              className="bg-white text-primary-dark hover:bg-white/90"
            >
              <Phone className="size-5" aria-hidden />
              {SITE_CONFIG.hotline}
            </Button>
            <Button
              href="/lien-he"
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-primary-dark"
            >
              Để lại thông tin
            </Button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
