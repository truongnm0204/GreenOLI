"use client";

import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { MotionWrapper } from "@/components/ui/motion-wrapper";
import { AnimatedText } from "@/components/motion/animated-text";
import { motion, type Variants } from "framer-motion";

const HIGHLIGHTS = [
  "Hơn 10 năm phân phối hóa chất y tế tại Việt Nam",
  "Đại lý chính thức của Sumitomo, Bayer, Syngenta, BASF",
  "Đội ngũ 50+ kỹ sư nông nghiệp và y tế dự phòng",
  "Cam kết 100% sản phẩm chính hãng, có CO/CQ và MSDS",
];

export function IntroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <section className="container-page py-16 md:py-24">
      <div className="grid gap-12 lg:grid-cols-12 items-center">
        <MotionWrapper delay={0.1} direction="left" className="lg:col-span-5">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative aspect-[4/5] rounded-[2rem] overflow-hidden tinted-shadow-primary hover-card-effect group"
          >
            <Image
              src="/intro_greenoli.png"
              alt="Văn phòng Oli Xanh tại TP. Hồ Chí Minh"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-primary-dark/5 mix-blend-multiply" />
          </motion.div>
        </MotionWrapper>
        
        <div className="lg:col-span-7 space-y-6">
          <MotionWrapper delay={0.2} direction="up">
            <p className="text-primary-dark font-bold text-sm uppercase tracking-widest">
              Về Oli Xanh
            </p>
          </MotionWrapper>
          
          <h2 className="font-bold text-3xl md:text-4xl lg:text-5xl text-text-primary leading-tight">
            <AnimatedText text="Đối tác hóa chất y tế đáng tin cậy của 500+ doanh nghiệp Việt" delay={0.3} />
          </h2>
          
          <MotionWrapper delay={0.5} direction="up">
            <p className="text-text-muted text-lg leading-relaxed font-medium">
              Thành lập từ năm 2014, Oli Xanh đã đồng hành cùng hàng trăm hợp tác xã,
              trang trại và đơn vị kiểm soát côn trùng trên cả nước. Chúng tôi tin
              rằng nông nghiệp bền vững và sức khỏe cộng đồng phải đi cùng nhau.
            </p>
          </MotionWrapper>
          
          <motion.ul 
            className="grid sm:grid-cols-2 gap-4 pt-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {HIGHLIGHTS.map((h) => (
              <motion.li key={h} variants={itemVariants} className="flex items-start gap-3">
                <span className="grid size-6 place-items-center rounded-full bg-primary/15 text-primary-dark flex-none mt-0.5">
                  <CheckCircle2 className="size-4" aria-hidden />
                </span>
                <span className="text-sm font-medium text-text-primary leading-relaxed">{h}</span>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}

