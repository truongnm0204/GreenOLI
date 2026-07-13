"use client";

import { Target, Lightbulb, ShieldCheck } from "lucide-react";
import { Card } from "@/components/ui/card";
import { MotionWrapper } from "@/components/ui/motion-wrapper";
import { AnimatedText } from "@/components/motion/animated-text";
import { motion, type Variants } from "framer-motion";

const PILLARS = [
  {
    icon: Lightbulb,
    title: "Tầm nhìn",
    body: "Trở thành đơn vị dẫn đầu Việt Nam trong cung cấp giải pháp kiểm soát côn trùng và động vật gây hại theo chuẩn quốc tế",
  },
  {
    icon: Target,
    title: "Sứ mệnh",
    body: "Cung cấp các sản phẩm chất lượng cao, an toàn cho con người và môi trường vì một mục tiêu VN xanh",
  },
  {
    icon: ShieldCheck,
    title: "Giá trị cốt lõi",
    body: "Chính trực · Khoa học · Bền vững · Tận tâm. Mỗi sản phẩm trên kệ Oli Xanh đều được lựa chọn nghiêm ngặt theo bốn nguyên tắc này.",
  },
];

export function VisionMissionSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <section className="relative bg-primary-dark overflow-hidden py-16 md:py-24 pt-32">

      {/* Spotlight effect placeholder (static centered glow) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container-page relative z-10">
        <MotionWrapper delay={0.1} direction="up" className="max-w-3xl mb-12 md:mb-16">
          <p className="text-primary-light font-bold text-sm uppercase tracking-widest mb-4">
            Định hướng chiến lược
          </p>
          <h2 className="font-bold text-3xl md:text-4xl lg:text-5xl text-white leading-tight">
            <AnimatedText text="Khoa học vì sức khỏe cộng đồng" delay={0.1} />
            <span className="hidden md:block h-2" />
            <AnimatedText text="và môi trường bền vững" delay={0.3} className="text-white/90" />
          </h2>
        </MotionWrapper>
        
        <motion.div 
          className="grid gap-6 md:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {PILLARS.map(({ icon: Icon, title, body }) => (
            <motion.div key={title} variants={itemVariants} className="h-full">
              <Card className="space-y-5 h-full hover-card-effect border-none bg-surface/95 backdrop-blur-sm shadow-xl p-8 transition-all hover:-translate-y-2">
                <span className="grid size-16 place-items-center rounded-2xl bg-primary/15 text-primary-dark shadow-inner">
                  <Icon className="size-8" aria-hidden />
                </span>
                <h3 className="font-bold text-2xl text-text-primary">{title}</h3>
                <p className="text-text-muted leading-relaxed text-lg">{body}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}


