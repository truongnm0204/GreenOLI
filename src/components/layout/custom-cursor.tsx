"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

export function CustomCursor() {
  const [position, setPosition] = useState({ x: -200, y: -200 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Không hiện cursor hiệu ứng trên màn hình cảm ứng (mobile/tablet)
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
      
      const target = e.target as HTMLElement;
      const isClickable = target.closest("a, button, input, select, textarea, [role='button'], .cursor-pointer, .hover-card-effect, .group");
      setIsHovering(!!isClickable);
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Soft Ambient Green Glow Trail (Vệt sáng xanh tỏa ra bám theo con trỏ chuột) */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[9998] size-[240px] rounded-full bg-primary/20 blur-[50px] transition-transform duration-500 ease-out"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%)`,
        }}
      />

      {/* Interactive Cursor Ring (Vòng tròn chỉ báo xanh căn tâm chuẩn 100% không bao giờ bị lệch) */}
      <div
        className={cn(
          "fixed top-0 left-0 pointer-events-none z-[9999] rounded-full flex items-center justify-center border transition-all duration-200 ease-out",
          isHovering
            ? "size-12 bg-primary/20 border-primary shadow-[0_0_20px_rgba(128,188,0,0.6)] scale-110"
            : "size-6 bg-primary/10 border-primary/60"
        )}
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%)`,
        }}
      >
        <div className={cn(
          "rounded-full bg-primary transition-all duration-200",
          isHovering ? "size-2.5 bg-primary-dark" : "size-1.5"
        )} />
      </div>
    </>
  );
}
