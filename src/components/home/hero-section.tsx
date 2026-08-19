"use client";

import Image from "next/image";
import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import { motion } from "framer-motion";
import { MotionWrapper } from "@/components/ui/motion-wrapper";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { AnimatedText } from "@/components/motion/animated-text";
import { AnimatedCounter } from "@/components/ui/animated-counter";

export function HeroSection() {
  return (
    <section id="giai-phap" className="relative overflow-hidden py-16 md:py-24 lg:py-28" style={{ background: "linear-gradient(135deg, #e8f5c8 0%, #f0fadf 30%, #f7faf2 60%, #eaf6d5 100%)" }}>
      {/* Dynamic Animated Background */}
      <AnimatedBackground />
      {/* Botanical & Floral Leaf Watermark Pattern */}
      <div className="absolute inset-0 floral-leaf-pattern opacity-90 pointer-events-none z-0" />

      <div className="container-page relative z-10 grid items-center gap-8 lg:gap-12 lg:grid-cols-12">
        {/* Left Column: Content */}
        <div className="lg:col-span-6 space-y-6">
          <MotionWrapper delay={0.1} direction="up" className="flex flex-wrap items-center gap-3">
            <Chip
              variant="primary"
              className="px-4 py-1.5 shadow-sm"
            >
              <Sparkles className="size-3.5 text-primary-dark" aria-hidden />
              <span className="text-primary-dark font-semibold">10+ năm dẫn đầu thị trường</span>
            </Chip>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-primary/25 text-xs font-bold text-primary-dark shadow-sm backdrop-blur-md">
              <ShieldCheck className="size-4 text-primary" aria-hidden />
              <span>Chuẩn an toàn ISO 9001 · WHO · Bộ Y Tế</span>
            </div>
          </MotionWrapper>
          
          <h1 className="font-bold tracking-tight text-text-primary text-3xl sm:text-4xl md:text-5xl lg:text-[52px] xl:text-6xl leading-[1.3]">
            <span className="block pb-1">
              <AnimatedText text="GIẢI PHÁP" delay={0.1} />
            </span>
            <span className="block pb-1">
              <AnimatedText text="KIỂM SOÁT CÔN TRÙNG XANH" delay={0.2} className="text-primary-dark" />
            </span>
            <span className="block pb-1 mt-1 text-2xl sm:text-3xl md:text-4xl lg:text-[38px] xl:text-[44px] leading-[1.3]">
              <AnimatedText text="CHO SỨC KHỎE CỘNG ĐỒNG" delay={0.3} />
            </span>
          </h1>
          
          <MotionWrapper delay={0.9} direction="up">
            <p className="text-lg md:text-xl text-text-muted leading-relaxed max-w-xl font-medium">
              Phân phối độc quyền các sản phẩm kiểm soát côn trùng, mối, chuột an toàn và bền vững theo tiêu chuẩn ESG toàn cầu.
            </p>
          </MotionWrapper>

          <MotionWrapper delay={1.1} direction="up">
            <div className="flex flex-wrap gap-4 pt-2">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button href="/cua-hang" size="lg" className="hover-card-effect tinted-shadow-primary h-14 px-8 text-base font-bold">
                  Khám phá sản phẩm
                  <ArrowRight className="size-5" aria-hidden />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button href="/lien-he" variant="outline" size="lg" className="hover-card-effect bg-white/90 backdrop-blur-md h-14 px-8 text-base font-bold">
                  Tư vấn miễn phí
                </Button>
              </motion.div>
            </div>
          </MotionWrapper>

          <ul className="grid grid-cols-3 gap-6 pt-8 border-t border-border-soft/60 mt-4">
            {[
              { val: 10, suffix: "+", label: "Năm kinh nghiệm" },
              { val: 500, suffix: "+", label: "Khách hàng tin tưởng" },
              { val: 100, suffix: "%", label: "Sản phẩm chính hãng" },
            ].map((stat, idx) => (
              <li key={stat.label}>
                <MotionWrapper delay={1.2 + (idx * 0.15)} direction="up">
                  <p className="text-3xl md:text-4xl font-extrabold text-primary-dark tracking-tight">
                    <AnimatedCounter value={stat.val} suffix={stat.suffix} duration={3.5} />
                  </p>
                  <p className="text-sm md:text-base text-text-muted mt-1 font-medium">
                    {stat.label}
                  </p>
                </MotionWrapper>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Column: Extra Large Hero Image Card */}
        <div className="lg:col-span-6 relative mt-6 lg:mt-0">
          <MotionWrapper delay={0.4} direction="left">
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative w-full aspect-[4/3] lg:aspect-[16/11] min-h-[380px] sm:min-h-[440px] lg:min-h-[480px] xl:min-h-[540px] rounded-[2.5rem] overflow-hidden shadow-2xl shadow-primary-dark/20 border-4 border-white bg-white hover-card-effect group"
            >
              <Image
                src="/hero.png"
                alt="Sản phẩm kiểm soát côn trùng chính hãng Oli Xanh"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent pointer-events-none" />
            </motion.div>
          </MotionWrapper>
        </div>
      </div>

      {/* Wave Divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-10 pointer-events-none transform translate-y-[1px]">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-full h-[60px] md:h-[100px]"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.08,130.83,119.3,192.39,101.41C237.74,88.2,280.89,71.18,321.39,56.44Z"
            className="fill-white"
          ></path>
        </svg>
      </div>
    </section>
  );
}


