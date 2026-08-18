"use client";

import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { MotionWrapper } from "@/components/ui/motion-wrapper";
import { SectionHeader } from "@/components/ui/section-header";
import { motion, type Variants } from "framer-motion";

const HIGHLIGHTS = [
  "Phân phối hóa chất & thiết bị kiểm soát côn trùng, mối, chuột",
  "Hợp tác cùng các thương hiệu quốc tế uy tín",
  "Tư vấn giải pháp an toàn, hướng tới tiêu chuẩn ESG",
  "Cam kết sản phẩm chính hãng, có tài liệu kỹ thuật / MSDS",
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
    <section className="py-16 md:py-24 relative overflow-hidden" style={{ background: "linear-gradient(180deg, #ffffff 0%, #f3fbe6 60%, #eaf6d5 100%)" }}>
      {/* Botanical & Floral Leaf Watermark Pattern */}
      <div className="absolute inset-0 floral-leaf-pattern opacity-90 pointer-events-none" />
      <div className="container-page relative z-10">
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
              alt="Hình ảnh hoạt động và giải pháp Oli Xanh"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-primary-dark/5 mix-blend-multiply" />
          </motion.div>
        </MotionWrapper>
        
        <div className="lg:col-span-7 space-y-6">
          <SectionHeader 
            eyebrow="Về Oli Xanh" 
            title="Đối tác kiểm soát côn trùng đáng tin cậy khu vực phía Bắc"
            align="left"
            className="mb-6 md:mb-8"
          />
          
          <MotionWrapper delay={0.5} direction="up">
            <p className="text-text-muted text-lg leading-relaxed font-medium">
              Oli Xanh đồng hành cùng doanh nghiệp, nhà thầu và đơn vị dịch vụ trong
              kiểm soát côn trùng, mối và chuột. Chúng tôi tin rằng hiệu quả kỹ thuật
              phải đi cùng an toàn cho sức khỏe và môi trường.
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
      </div>
    </section>
  );
}

