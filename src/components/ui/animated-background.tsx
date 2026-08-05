"use client";

import { motion } from "framer-motion";
import { Leaf, Sprout, Sparkles } from "lucide-react";

export function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none select-none">
      {/* Primary Color Blob */}
      <motion.div
        animate={{
          x: [0, 50, -50, 0],
          y: [0, 40, -40, 0],
          scale: [1, 1.15, 0.9, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-32 -left-32 w-[750px] h-[750px] bg-primary/35 rounded-full blur-[90px]"
      />
      
      {/* Secondary Color Blob */}
      <motion.div
        animate={{
          x: [0, -60, 40, 0],
          y: [0, -40, 50, 0],
          scale: [1, 1.2, 0.85, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/3 -right-32 w-[650px] h-[650px] bg-primary-fixed/30 rounded-full blur-[100px]"
      />
      
      {/* Accent Color Blob */}
      <motion.div
        animate={{
          x: [0, 40, -30, 0],
          y: [0, 60, -20, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -bottom-40 left-1/3 w-[850px] h-[850px] bg-primary/25 rounded-full blur-[110px]"
      />

      {/* Floating Botanical Leaf Elements (Chi tiết lá cây & mầm xanh trôi dạt nhẹ nhàng) */}
      <motion.div
        animate={{
          y: [0, -20, 10, 0],
          rotate: [0, 15, -10, 0],
          scale: [1, 1.05, 0.95, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-12 left-[8%] text-primary-dark/20"
      >
        <Leaf className="size-16 md:size-24" />
      </motion.div>

      <motion.div
        animate={{
          y: [0, 25, -15, 0],
          rotate: [0, -20, 10, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute top-1/3 right-[12%] text-primary-dark/15"
      >
        <Sprout className="size-20 md:size-32" />
      </motion.div>

      <motion.div
        animate={{
          y: [0, -30, 15, 0],
          rotate: [0, 25, -15, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute bottom-20 left-[15%] text-primary-dark/20"
      >
        <Leaf className="size-14 md:size-20 transform -scale-x-100" />
      </motion.div>

      <motion.div
        animate={{
          scale: [0.8, 1.2, 0.8],
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/4 left-[45%] text-primary-dark/25"
      >
        <Sparkles className="size-8" />
      </motion.div>

      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.6, 0.2],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5,
        }}
        className="absolute bottom-1/3 right-[35%] text-primary-dark/20"
      >
        <Sparkles className="size-10" />
      </motion.div>
    </div>
  );
}
