import { Card } from "@/components/ui/card";
import { cn } from "@/lib/cn";

export function ProductCardSkeleton({ className }: { className?: string }) {
  return (
    <Card
      padding="none"
      className={cn(
        "group relative overflow-hidden border border-border-soft/80 bg-white shadow-sm animate-pulse",
        className
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-t-card bg-surface-container/60">
        {/* Shimmer sweep effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full animate-shimmer" />
      </div>
      <div className="p-5 flex flex-col space-y-3">
        {/* Category Badge Skeleton */}
        <div className="h-5 w-24 rounded-full bg-surface-container/80" />
        {/* Title Skeleton */}
        <div className="space-y-2">
          <div className="h-4 w-11/12 rounded bg-surface-container/80" />
          <div className="h-4 w-3/4 rounded bg-surface-container/80" />
        </div>
        {/* Description Skeleton */}
        <div className="h-3.5 w-full rounded bg-surface-container/50 mt-1" />
      </div>
    </Card>
  );
}
