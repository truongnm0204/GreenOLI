"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

export function ScrollProgress({ className }: { className?: string }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      const scrollPercent = scrollY / (docHeight - winHeight);
      setProgress(Math.min(1, Math.max(0, scrollPercent)));
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={cn("fixed top-0 left-0 h-1 bg-primary-dark z-[100] origin-left transition-transform duration-100 ease-out", className)}
      style={{ transform: `scaleX(${progress})` }}
    />
  );
}
