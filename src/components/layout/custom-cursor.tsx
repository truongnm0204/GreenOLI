"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

export function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable custom cursor on non-touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    // Add global class to hide default cursor
    document.body.classList.add("hide-default-cursor");

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
      
      // Check if hovering over clickable elements
      const target = e.target as HTMLElement;
      const isClickable = target.closest("a, button, input, [role='button'], .cursor-pointer, .hover-target");
      setIsHovering(!!isClickable);
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.body.classList.remove("hide-default-cursor");
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <div
        className={cn(
          "fixed top-0 left-0 pointer-events-none z-[100] rounded-full mix-blend-difference transition-all duration-300 ease-out",
          isHovering ? "size-12 bg-white/20 border border-white" : "size-4 bg-white"
        )}
        style={{
          transform: `translate(${position.x - (isHovering ? 24 : 8)}px, ${position.y - (isHovering ? 24 : 8)}px)`,
        }}
      />
      {/* Optional: Add a smaller dot that strictly follows without delay */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[100] size-1.5 bg-primary rounded-full"
        style={{
          transform: `translate(${position.x - 3}px, ${position.y - 3}px)`,
        }}
      />
    </>
  );
}
