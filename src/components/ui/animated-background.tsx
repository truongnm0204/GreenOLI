"use client";

import { motion } from "framer-motion";
import { Leaf, Sprout, Sparkles, Flower2, Trees, Sun } from "lucide-react";

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
        className="absolute -top-32 -left-32 w-[750px] h-[750px] bg-primary/40 rounded-full blur-[90px]"
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
        className="absolute top-1/3 -right-32 w-[650px] h-[650px] bg-secondary/20 rounded-full blur-[100px]"
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
        className="absolute -bottom-40 left-1/3 w-[850px] h-[850px] bg-primary-light/35 rounded-full blur-[110px]"
      />

      {/* Floating Botanical Leaf & Flower Elements (Lá cây, hoa & mầm xanh hoa hòe sinh động) */}
      <motion.div
        animate={{
          y: [0, -25, 12, 0],
          rotate: [0, 20, -15, 0],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-10 left-[6%] text-primary-dark/35"
      >
        <Leaf className="size-20 md:size-28" />
      </motion.div>

      <motion.div
        animate={{
          y: [0, 30, -20, 0],
          rotate: [0, -25, 15, 0],
          scale: [0.9, 1.15, 0.95, 1],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
        className="absolute top-1/4 right-[8%] text-secondary/30"
      >
        <Flower2 className="size-20 md:size-32" />
      </motion.div>

      <motion.div
        animate={{
          y: [0, -20, 20, 0],
          rotate: [0, 18, -18, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute top-1/2 left-[5%] text-primary/35"
      >
        <Sprout className="size-16 md:size-24" />
      </motion.div>

      <motion.div
        animate={{
          y: [0, -35, 15, 0],
          rotate: [0, 30, -20, 0],
        }}
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute bottom-16 left-[18%] text-primary-dark/30"
      >
        <Leaf className="size-16 md:size-24 transform -scale-x-100" />
      </motion.div>

      <motion.div
        animate={{
          y: [0, 25, -25, 0],
          rotate: [0, -20, 20, 0],
        }}
        transition={{
          duration: 13,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5,
        }}
        className="absolute bottom-28 right-[12%] text-secondary/30"
      >
        <Trees className="size-18 md:size-28" />
      </motion.div>

      <motion.div
        animate={{
          rotate: [0, 180, 360],
          scale: [0.85, 1.15, 0.85],
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-1/3 left-[48%] text-amber-500/25"
      >
        <Sun className="size-14 md:size-20" />
      </motion.div>

      <motion.div
        animate={{
          scale: [0.8, 1.3, 0.8],
          opacity: [0.4, 0.85, 0.4],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-20 right-[40%] text-primary-dark/40"
      >
        <Sparkles className="size-10" />
      </motion.div>

      <motion.div
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.3, 0.8, 0.3],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute bottom-1/4 left-[38%] text-secondary/40"
      >
        <Sparkles className="size-12" />
      </motion.div>
    </div>
  );
}
