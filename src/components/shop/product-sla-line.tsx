import { Clock3, MapPin, FileCheck2 } from "lucide-react";
import { cn } from "@/lib/cn";

type Props = {
  className?: string;
  /** compact: 1 hàng scroll trên mobile */
  compact?: boolean;
};

/**
 * Tín hiệu tin cậy / SLA gần CTA — B2B lead.
 */
export function ProductSlaLine({ className, compact }: Props) {
  const items = [
    { icon: Clock3, text: "Báo giá trong 2 giờ làm việc" },
    { icon: MapPin, text: "Giao HN – HCM & toàn quốc" },
    { icon: FileCheck2, text: "VAT · CO/CQ theo lô" },
  ];

  return (
    <ul
      className={cn(
        compact
          ? "flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-text-muted sm:text-sm"
          : "flex flex-col gap-2 text-sm text-text-muted sm:flex-row sm:flex-wrap sm:gap-x-5 sm:gap-y-2",
        className,
      )}
    >
      {items.map(({ icon: Icon, text }) => (
        <li key={text} className="inline-flex items-center gap-1.5">
          <Icon
            className="size-3.5 shrink-0 text-primary-dark sm:size-4"
            aria-hidden
          />
          <span>{text}</span>
        </li>
      ))}
    </ul>
  );
}
