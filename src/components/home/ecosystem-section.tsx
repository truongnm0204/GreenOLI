import Image from "next/image";
import Link from "next/link";
import * as Icons from "lucide-react";
import { ArrowUpRight } from "lucide-react";
import { MotionWrapper } from "@/components/ui/motion-wrapper";
import { AnimatedText } from "@/components/motion/animated-text";
import { getAllServices } from "@/data/services";

export async function EcosystemSection() {
  const services = await getAllServices();
  return (
    <section className="container-page py-16 md:py-24 relative">
      <div className="bg-blob bg-blob-secondary w-[500px] h-[500px] top-1/3 -left-40 opacity-20" />
      
      <MotionWrapper delay={0.1} direction="up" className="max-w-3xl mx-auto text-center mb-12 relative z-10">
        <p className="text-primary-dark font-bold text-sm uppercase tracking-widest mb-4">
          Hệ sinh thái Oli Xanh
        </p>
        <h2 className="font-bold text-3xl md:text-4xl lg:text-5xl text-text-primary leading-tight">
          <AnimatedText text="Dịch vụ kiểm soát côn trùng & vệ sinh chuyên nghiệp" />
        </h2>
        <p className="mt-6 text-text-muted text-lg leading-relaxed font-medium">
          5 nhóm dịch vụ then chốt giúp khách hàng kiến tạo môi trường sống và làm việc
          an toàn, sạch sẽ và bền vững.
        </p>
      </MotionWrapper>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5 relative z-10">
        {services.map((service, idx) => {
          const Icon =
            (Icons as unknown as Record<
              string,
              React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>
            >)[service.iconKey] ?? Icons.Sparkles;
          const isHero = idx === 0;
          return (
            <MotionWrapper
              key={service.slug}
              delay={0.2 + (idx * 0.15)}
              direction="up"
              className={isHero ? "lg:row-span-2 lg:col-span-2" : ""}
            >
              <Link
                href="/lien-he"
                className={`group relative block h-full overflow-hidden rounded-[2rem] shadow-ambient hover:shadow-ambient-lg hover:-translate-y-1 transition-all duration-300 ${
                  isHero ? "min-h-[420px]" : "min-h-[220px]"
                }`}
              >
                <Image
                  src={service.image}
                  alt={service.name}
                  fill
                  sizes={isHero ? "(max-width: 1024px) 100vw, 40vw" : "(max-width: 1024px) 50vw, 20vw"}
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-text-primary/90 via-text-primary/40 to-transparent transition-opacity duration-300 group-hover:opacity-90" />
                <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end text-white">
                  <span className="grid size-12 place-items-center rounded-2xl bg-primary text-on-primary mb-4 self-start shadow-lg transform transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3">
                    <Icon className="size-6" aria-hidden />
                  </span>
                  <h3 className={`font-bold ${isHero ? "text-3xl" : "text-xl"}`}>
                    {service.name}
                  </h3>
                  {isHero ? (
                    <p className="mt-3 text-base text-white/90 line-clamp-3 max-w-md">
                      {service.description}
                    </p>
                  ) : null}
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-primary-light opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    Tìm hiểu thêm
                    <ArrowUpRight className="size-5" aria-hidden />
                  </span>
                </div>
              </Link>
            </MotionWrapper>
          );
        })}
      </div>
    </section>
  );
}

