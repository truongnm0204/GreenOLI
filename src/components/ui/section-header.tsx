import React from "react";
import { Leaf } from "lucide-react";
import { MotionWrapper } from "./motion-wrapper";
import { AnimatedText } from "@/components/motion/animated-text";
import { cn } from "@/lib/cn";

export interface SectionHeaderProps {
  eyebrow: string;
  title: string | React.ReactNode;
  theme?: "light" | "dark";
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  theme = "light",
  align = "center",
  className,
}: SectionHeaderProps) {
  const isDark = theme === "dark";
  const isCenter = align === "center";

  return (
    <MotionWrapper 
      delay={0.1} 
      direction="up" 
      className={cn("mb-10 md:mb-16 max-w-4xl", isCenter ? "mx-auto flex flex-col items-center text-center" : "", className)}
    >
      <div className={cn("flex items-center gap-2 mb-3", isCenter ? "justify-center" : "")}>
        <Leaf className={cn("size-5", isDark ? "text-primary-light" : "text-secondary")} />
        <p className={cn("font-bold text-sm md:text-base uppercase tracking-wider", isDark ? "text-primary-light" : "text-secondary")}>
          {eyebrow}
        </p>
        <Leaf className={cn("size-5 transform scale-x-[-1]", isDark ? "text-primary-light" : "text-secondary")} />
      </div>
      <h2 className={cn(
        "font-extrabold text-3xl md:text-4xl lg:text-5xl uppercase leading-tight drop-shadow-sm",
        isDark ? "text-white" : "text-primary-dark"
      )}>
        {typeof title === "string" ? <AnimatedText text={title} /> : title}
      </h2>
    </MotionWrapper>
  );
}
