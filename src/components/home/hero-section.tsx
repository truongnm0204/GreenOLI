"use client";

import Image from "next/image";
import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import { motion, AnimatePresence } from "framer-motion";
import { MotionWrapper } from "@/components/ui/motion-wrapper";
import * as React from "react";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { AnimatedText } from "@/components/motion/animated-text";

const HERO_IMAGES = [
  "/hero_product_1.png",
  "/hero_product_2.png",
  "/hero_product_3.png",
];

export function HeroSection() {
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden bg-surface-lowest">
      {/* Dynamic Animated Background */}
      <AnimatedBackground />

      <div className="container-page relative z-10 py-20 md:py-28 lg:py-32 grid items-center gap-10 lg:grid-cols-12">
        <div className="lg:col-span-6 space-y-6">
          <MotionWrapper delay={0.1} direction="up">
            <Chip
              variant="primary"
              className="px-4 py-1.5 shadow-sm"
            >
              <Sparkles className="size-3.5 text-primary-dark" aria-hidden />
              <span className="text-primary-dark font-medium">10+ năm dẫn đầu thị trường</span>
            </Chip>
          </MotionWrapper>
          
          <h1 className="font-bold tracking-tight text-text-primary text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.4]">
            <span className="block pb-1">
              <AnimatedText text="GIẢI PHÁP" delay={0.1} />
            </span>
            <span className="block pb-1">
              <AnimatedText text="KIỂM SOÁT CÔN TRÙNG XANH" delay={0.2} className="text-primary-dark" />
            </span>
            <span className="block pb-1 mt-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-[1.4]">
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
                <Button href="/cua-hang" size="lg" className="hover-card-effect tinted-shadow-primary h-14 px-8 text-base">
                  Khám phá sản phẩm
                  <ArrowRight className="size-5" aria-hidden />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button href="/lien-he" variant="outline" size="lg" className="hover-card-effect bg-white/70 backdrop-blur-md h-14 px-8 text-base">
                  Tư vấn miễn phí
                </Button>
              </motion.div>
            </div>
          </MotionWrapper>

          <ul className="grid grid-cols-3 gap-6 pt-10 border-t border-border-soft/60 mt-4">
            {[
              { value: "10+", label: "Năm kinh nghiệm" },
              { value: "500+", label: "Khách hàng tin tưởng" },
              { value: "100%", label: "Sản phẩm chính hãng" },
            ].map((stat, idx) => (
              <li key={stat.label}>
                <MotionWrapper delay={1.2 + (idx * 0.15)} direction="up">
                  <p className="text-3xl md:text-4xl font-extrabold text-primary-dark tracking-tight">
                    {stat.value}
                  </p>
                  <p className="text-sm md:text-base text-text-muted mt-1 font-medium">
                    {stat.label}
                  </p>
                </MotionWrapper>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-6 relative mt-10 lg:mt-0">
          <MotionWrapper delay={0.6} direction="left" className="relative">
            <motion.div
              initial={{ scale: 0.8, opacity: 0, filter: "blur(10px)" }}
              animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              className="relative w-full aspect-square md:aspect-[4/3] rounded-[2rem] overflow-hidden tinted-shadow-primary hover-card-effect group"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImageIndex}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  <Image
                    src={HERO_IMAGES[currentImageIndex]}
                    alt="Đội ngũ kỹ thuật Oli Xanh"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </motion.div>
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none z-10" />
            </motion.div>
          </MotionWrapper>
          
          <MotionWrapper delay={1.4} direction="up" className="absolute -bottom-8 -left-8 md:-bottom-12 md:-left-12 z-20">
            <motion.div 
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="flex gap-4 items-center bg-white/90 backdrop-blur-xl rounded-2xl shadow-ambient-lg p-5 max-w-[280px] border border-white/40"
            >
              <span className="grid size-14 place-items-center rounded-full bg-gradient-to-br from-primary-light to-primary text-white shadow-sm">
                <ShieldCheck className="size-7" aria-hidden />
              </span>
              <div>
                <p className="font-bold text-sm text-text-primary">
                  Chứng nhận an toàn
                </p>
                <p className="text-xs text-text-muted mt-0.5">
                  ISO 9001 · WHO · Bộ Y Tế
                </p>
              </div>
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
            className="fill-primary-dark"
          ></path>
        </svg>
      </div>
    </section>
  );
}


