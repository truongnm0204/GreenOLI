import Image from "next/image";
import Link from "next/link";
import * as Icons from "lucide-react";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { getAllServices } from "@/data/services";

export async function EcosystemSection() {
  const services = await getAllServices();
  return (
    <section className="container-page py-16 md:py-20">
      <Reveal as="div" className="max-w-3xl mx-auto text-center mb-12">
        <p className="text-primary-dark font-semibold text-sm uppercase tracking-wider mb-3">
          Hệ sinh thái Green Oli
        </p>
        <h2 className="font-bold text-3xl md:text-4xl lg:text-5xl text-text-primary leading-tight">
          Dịch vụ kiểm soát côn trùng & vệ sinh chuyên nghiệp
        </h2>
        <p className="mt-4 text-text-muted leading-relaxed">
          5 nhóm dịch vụ then chốt giúp khách hàng kiến tạo môi trường sống và làm việc
          an toàn, sạch sẽ và bền vững.
        </p>
      </Reveal>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-5">
        {services.map((service, idx) => {
          const Icon =
            (Icons as unknown as Record<
              string,
              React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>
            >)[service.iconKey] ?? Icons.Sparkles;
          const isHero = idx === 0;
          return (
            <Reveal
              key={service.slug}
              as="div"
              delay={idx * 70}
              className={isHero ? "lg:row-span-2 lg:col-span-2" : ""}
            >
              <Link
                href="/lien-he"
                className={`group relative block h-full overflow-hidden rounded-card shadow-ambient hover:shadow-ambient-lg transition-shadow ${
                  isHero ? "min-h-[420px]" : "min-h-[200px]"
                }`}
              >
                <Image
                  src={service.image}
                  alt={service.name}
                  fill
                  sizes={isHero ? "(max-width: 1024px) 100vw, 40vw" : "(max-width: 1024px) 50vw, 20vw"}
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-text-primary/85 via-text-primary/30 to-transparent" />
                <div className="absolute inset-0 p-5 md:p-6 flex flex-col justify-end text-white">
                  <span className="grid size-10 place-items-center rounded-full bg-primary text-on-primary mb-3 self-start">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <h3 className={`font-bold ${isHero ? "text-2xl md:text-3xl" : "text-lg"}`}>
                    {service.name}
                  </h3>
                  {isHero ? (
                    <p className="mt-2 text-sm md:text-base text-white/85 line-clamp-3 max-w-md">
                      {service.description}
                    </p>
                  ) : null}
                  <span className="mt-3 inline-flex items-center gap-1 text-xs md:text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                    Tìm hiểu thêm
                    <ArrowUpRight className="size-4" aria-hidden />
                  </span>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
