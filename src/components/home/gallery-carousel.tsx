import Image from "next/image";
import { EmblaCarousel } from "@/components/carousel/embla-carousel";
import { MotionWrapper } from "@/components/ui/motion-wrapper";
import { AnimatedText } from "@/components/motion/animated-text";
import { getGallery } from "@/data/gallery";

export async function GalleryCarousel() {
  const gallery = await getGallery();
  return (
    <section className="container-page py-16 md:py-24">
      <MotionWrapper delay={0.1} direction="up" className="text-center mb-12">
        <p className="text-primary-dark font-bold text-sm uppercase tracking-widest mb-3">
          Khoảnh khắc Oli Xanh
        </p>
        <h2 className="font-bold text-3xl md:text-4xl text-text-primary leading-tight">
          <AnimatedText text="Hành trình kiến tạo môi trường an toàn" />
        </h2>
      </MotionWrapper>

      <MotionWrapper direction="up" delay={0.3}>
        <EmblaCarousel
          options={{ align: "start", containScroll: "trimSnaps", loop: true }}
          slidesClassName="-ml-4"
        >
          {gallery.map((item, idx) => (
            <div
              key={idx}
              className="pl-4 flex-[0_0_100%] sm:flex-[0_0_60%] lg:flex-[0_0_40%]"
            >
              <figure className="overflow-hidden rounded-[2rem] shadow-ambient hover:shadow-ambient-lg hover-card-effect group">
                <div className="relative aspect-[4/3]">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 60vw, 40vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                {item.caption ? (
                  <figcaption className="bg-surface-container-lowest p-5 text-sm md:text-base text-text-primary font-medium border-t border-border-soft/50">
                    {item.caption}
                  </figcaption>
                ) : null}
              </figure>
            </div>
          ))}
        </EmblaCarousel>
      </MotionWrapper>
    </section>
  );
}

