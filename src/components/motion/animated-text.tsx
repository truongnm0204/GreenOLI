"use client";

import { motion, type Variants } from "framer-motion";

interface AnimatedTextProps {
  text: string | React.ReactNode;
  className?: string;
  delay?: number;
  once?: boolean;
  /** Default mount — above-the-fold text must not wait for whileInView. */
  trigger?: "view" | "mount";
}

export function AnimatedText({
  text,
  className,
  delay = 0,
  once = true,
  trigger = "mount",
}: AnimatedTextProps) {
  const isString = typeof text === "string";
  const useMount = trigger === "mount";

  if (!isString) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        {...(useMount
          ? { animate: { opacity: 1, y: 0 } }
          : { whileInView: { opacity: 1, y: 0 }, viewport: { once } })}
        transition={{ duration: 0.3, delay, ease: [0.25, 0.25, 0, 1] }}
        className={className}
      >
        {text}
      </motion.div>
    );
  }

  const words = (text as string).split(" ");

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: delay },
    },
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
      {...(useMount
        ? { animate: "visible" }
        : { whileInView: "visible", viewport: { once } })}
    >
      {words.map((word, index) => (
        <motion.span
          variants={child}
          style={{ display: "inline-block", marginRight: "0.25em" }}
          key={`${word}-${index}`}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
}
