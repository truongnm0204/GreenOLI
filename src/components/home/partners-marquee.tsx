import Image from "next/image";
import { MotionWrapper } from "@/components/ui/motion-wrapper";
import { SectionHeader } from "@/components/ui/section-header";

export async function PartnersMarquee() {

  return (
    <section className="bg-surface-light relative w-full overflow-hidden pt-16 md:pt-24" aria-label="Đối tác chiến lược">
      <div className="container-page relative z-10">
        <SectionHeader 
          eyebrow="Đối tác chiến lược"
          title="Hợp tác cùng các thương hiệu hàng đầu thế giới"
          align="center"
          className="mb-8"
        />
      </div>
      <MotionWrapper delay={0.3} direction="up" className="w-full flex">
        <Image
          src="/logoGroup.png"
          alt="Các nhãn hàng đối tác hàng đầu"
          width={1920}
          height={800}
          className="w-full h-auto object-cover"
          sizes="100vw"
          quality={100}
        />
      </MotionWrapper>
    </section>
  );
}

