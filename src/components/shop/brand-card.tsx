import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import type { Brand } from "@/types/brand";
import { cn } from "@/lib/cn";

type Props = {
  brand: Brand;
  className?: string;
};

const getLocalLogo = (name: string) => {
  const normalized = name.toLowerCase();
  if (normalized.includes("envu")) return "/Logo_Envu_R_Gradient_RGB-with space.png";
  if (normalized.includes("basf")) return "/logoBASF.png";
  if (normalized.includes("sumitomo")) return "/logoSumimoto.png";
  if (normalized.includes("syngenta")) return "/logoSyngenta.png";
  if (normalized.includes("ensystex")) return "/logoEnsystex.png";
  return null;
};

export function BrandCard({ brand, className }: Props) {
  const logoSrc = getLocalLogo(brand.name) || brand.logo;

  return (
    <Card padding="none" className={cn("group overflow-hidden bg-white", className)}>
      <Link
        href={`/cua-hang/hang/${brand.slug}`}
        className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-card h-full flex flex-col"
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-surface-container-lowest p-6 flex items-center justify-center border-b border-border-soft/50">
          {logoSrc ? (
            <div className="relative w-full h-full">
              <Image
                src={logoSrc}
                alt={brand.name}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-contain transition-transform duration-500 group-hover:scale-105 mix-blend-multiply"
              />
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-surface-light rounded-md">
              <span className="text-3xl font-bold text-text-muted">{brand.name[0]}</span>
            </div>
          )}
        </div>
        <div className="p-5 flex-1 flex flex-col justify-between">
          <div className="space-y-2">
            <h3 className="font-semibold text-base text-text-primary line-clamp-1">
              {brand.name}
            </h3>
            {brand.description ? (
              <p className="text-sm text-text-muted line-clamp-2 min-h-[2.5rem]">
                {brand.description}
              </p>
            ) : brand.tagline ? (
               <p className="text-sm text-text-muted line-clamp-2 min-h-[2.5rem]">
                {brand.tagline}
              </p>
            ) : (
               <div className="min-h-[2.5rem]" />
            )}
          </div>
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-dark mt-4">
            Khám phá
            <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" aria-hidden />
          </span>
        </div>
      </Link>
    </Card>
  );
}
