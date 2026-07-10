import Image from "next/image";
import { MotionWrapper } from "@/components/ui/motion-wrapper";
import { AnimatedText } from "@/components/motion/animated-text";
import { getAllPartners } from "@/data/partners";

export async function PartnersMarquee() {
  const partners = [
    { name: "Envu", logo: "/Logo_Envu_R_Gradient_RGB-with space.png" },
    { name: "BASF", logo: "/logoBASF.png" },
    { name: "Sumitomo", logo: "/logoSumimoto.png" },
    { name: "Syngenta", logo: "/logoSyngenta.png" },
    { name: "Ensystex", logo: "/logoEnsystex.png" }
  ];
  
  // Duplicate list once so the CSS marquee can loop seamlessly via -50% translate.
  const items = [...partners, ...partners];

  return (
    <section
      className="bg-surface-light py-16 md:py-24 overflow-hidden relative"
      aria-label="Đối tác chiến lược"
    >
      <div className="bg-blob bg-blob-primary w-[300px] h-[300px] top-10 -left-20 opacity-20" />
      <div className="container-page relative z-10">
        <MotionWrapper delay={0.1} direction="up" className="text-center mb-12">
          <p className="text-primary-dark font-bold text-sm uppercase tracking-widest mb-4">
            Đối tác chiến lược
          </p>
          <h2 className="font-bold text-2xl md:text-4xl text-text-primary">
            <AnimatedText text="Hợp tác cùng các thương hiệu hàng đầu thế giới" />
          </h2>
        </MotionWrapper>
      </div>
      <MotionWrapper delay={0.3} direction="up" className="relative marquee-mask marquee-pause z-10" aria-hidden>
        <div className="flex w-max gap-16 md:gap-24 animate-marquee will-change-transform">
          {items.map((p, idx) => (
            <div
              key={`${p.name}-${idx}`}
              className="flex-none grid place-items-center grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100 hover:scale-110 cursor-pointer"
              style={{ width: 240, height: 120 }}
            >
              <Image
                src={p.logo}
                alt={p.name}
                width={240}
                height={120}
                className="h-auto w-auto max-h-[120px] max-w-[240px] object-contain mix-blend-multiply"
              />
            </div>
          ))}
        </div>
      </MotionWrapper>
    </section>
  );
}

