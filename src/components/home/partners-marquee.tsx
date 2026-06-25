import Image from "next/image";
import { PARTNERS } from "@/data/partners";

export function PartnersMarquee() {
  // Duplicate list once so the CSS marquee can loop seamlessly via -50% translate.
  const items = [...PARTNERS, ...PARTNERS];

  return (
    <section
      className="bg-surface-light py-14 md:py-16 overflow-hidden"
      aria-label="Đối tác chiến lược"
    >
      <div className="container-page">
        <div className="text-center mb-10">
          <p className="text-primary-dark font-semibold text-sm uppercase tracking-wider mb-3">
            Đối tác chiến lược
          </p>
          <h2 className="font-bold text-2xl md:text-3xl text-text-primary">
            Hợp tác cùng các thương hiệu hàng đầu thế giới
          </h2>
        </div>
      </div>
      <div className="relative" aria-hidden>
        <div className="flex w-max gap-12 md:gap-16 animate-marquee will-change-transform">
          {items.map((p, idx) => (
            <div
              key={`${p.name}-${idx}`}
              className="flex-none grid place-items-center grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100"
              style={{ width: 180, height: 80 }}
            >
              <Image
                src={p.logo}
                alt={p.name}
                width={180}
                height={80}
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
