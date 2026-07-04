"use client";

import { motion } from "framer-motion";

export function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
      {/* Base subtle grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      
      {/* Primary Color Blob */}
      <motion.div
        animate={{
          x: [0, 50, -50, 0],
          y: [0, 40, -40, 0],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[100px] opacity-70"
      />
      
      {/* Secondary Color Blob */}
      <motion.div
        animate={{
          x: [0, -60, 40, 0],
          y: [0, -40, 50, 0],
          scale: [1, 1.2, 0.8, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-1/3 -right-32 w-[500px] h-[500px] bg-secondary/15 rounded-full blur-[100px] opacity-60"
      />
      
      {/* Tertiary/Accent Color Blob */}
      <motion.div
        animate={{
          x: [0, 40, -30, 0],
          y: [0, 60, -20, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute -bottom-40 left-1/3 w-[700px] h-[700px] bg-primary-light/15 rounded-full blur-[120px] opacity-50"
      />
    </div>
  );
}
