"use client";

import { motion, type Variants } from "framer-motion";

interface AnimatedTextProps {
  text: string | React.ReactNode;
  className?: string;
  delay?: number;
  once?: boolean;
}

export function AnimatedText({ text, className, delay = 0, once = true }: AnimatedTextProps) {
  // We handle string text by splitting into words.
  // If it's ReactNode, we just wrap it in a single fade-up for simplicity,
  // or we can expect users to pass only strings for full staggered effect.
  
  const isString = typeof text === "string";
  
  if (!isString) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        viewport={{ once }}
        transition={{ duration: 0.3, delay, ease: [0.25, 0.25, 0, 1] }}
        className={className}
      >
        {text}
      </motion.div>
    );
  }

  const words = (text as string).split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: delay * i },
    }),
  };

  const child: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 200,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
    },
  };

  return (
    <motion.div
      className={className}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
    >
      {words.map((word, index) => (
        <motion.span
          variants={child}
          style={{ display: "inline-block", marginRight: "0.25em" }}
          key={index}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
}
