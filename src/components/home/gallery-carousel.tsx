import Image from "next/image";
import { EmblaCarousel } from "@/components/carousel/embla-carousel";
import { Reveal } from "@/components/motion/reveal";
import { getGallery } from "@/data/gallery";

export async function GalleryCarousel() {
  const gallery = await getGallery();
  return (
    <section className="container-page py-16 md:py-20">
      <Reveal as="div" className="max-w-3xl mb-10">
        <p className="text-primary-dark font-semibold text-sm uppercase tracking-wider mb-3">
          Khoảnh khắc Green Oli
        </p>
        <h2 className="font-bold text-3xl md:text-4xl text-text-primary leading-tight">
          Hành trình kiến tạo môi trường an toàn
        </h2>
      </Reveal>

      <Reveal as="div" variant="fade-up" delay={100}>
        <EmblaCarousel
          options={{ align: "start", containScroll: "trimSnaps", loop: true }}
          slidesClassName="-ml-4"
        >
          {gallery.map((item, idx) => (
            <div
              key={idx}
              className="pl-4 flex-[0_0_100%] sm:flex-[0_0_60%] lg:flex-[0_0_40%]"
            >
              <figure className="overflow-hidden rounded-card shadow-ambient">
                <div className="relative aspect-[4/3]">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 60vw, 40vw"
                    className="object-cover"
                  />
                </div>
                {item.caption ? (
                  <figcaption className="bg-surface-container-lowest p-4 text-sm text-text-primary font-medium">
                    {item.caption}
                  </figcaption>
                ) : null}
              </figure>
            </div>
          ))}
        </EmblaCarousel>
      </Reveal>
    </section>
  );
}
