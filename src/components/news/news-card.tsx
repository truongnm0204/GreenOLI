import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock } from "lucide-react";
import { Chip } from "@/components/ui/chip";
import type { Article } from "@/types/article";
import { cn } from "@/lib/cn";

type Props = {
  article: Article;
  variant?: "default" | "featured" | "compact";
  className?: string;
};

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

export function NewsCard({ article, variant = "default", className }: Props) {
  if (variant === "compact") {
    return (
      <Link
        href={`/tin-tuc/${article.slug}`}
        className={cn(
          "group flex gap-4 rounded-button p-2 transition-colors hover:bg-surface-container-low",
          className,
        )}
      >
        <div className="relative size-20 flex-none overflow-hidden rounded-input bg-surface-light">
          <Image
            src={article.coverImage}
            alt={article.title}
            fill
            sizes="80px"
            className="object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-sm text-text-primary line-clamp-2 group-hover:text-primary-dark transition-colors">
            {article.title}
          </h4>
          <p className="mt-1 text-xs text-text-muted">{formatDate(article.publishedAt)}</p>
        </div>
      </Link>
    );
  }

  if (variant === "featured") {
    return (
      <Link
        href={`/tin-tuc/${article.slug}`}
        className={cn(
          "group block rounded-3xl overflow-hidden relative shadow-ambient-lg h-[500px]",
          className,
        )}
      >
        <Image
          src={article.coverImage}
          alt={article.title}
          fill
          sizes="(max-width: 1024px) 100vw, 60vw"
          className="object-cover transition-transform duration-1000 group-hover:scale-110"
          priority
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />
        
        {/* Content Box */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 z-10 flex flex-col justify-end space-y-4">
          <div>
            <Chip variant="primary" className="bg-primary/90 text-on-primary border-none shadow-md">{article.category}</Chip>
          </div>
          <h3 className="font-bold text-3xl md:text-4xl text-white line-clamp-3 group-hover:text-primary-light transition-colors drop-shadow-md">
            {article.title}
          </h3>
          <p className="text-white/80 leading-relaxed line-clamp-2 max-w-3xl drop-shadow">
            {article.excerpt}
          </p>
          <div className="flex items-center gap-4 text-sm text-white/70 font-medium">
            <span className="flex items-center gap-1.5">
              <Calendar className="size-4" aria-hidden />
              {formatDate(article.publishedAt)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="size-4" aria-hidden />
              {article.readingMinutes} phút đọc
            </span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/tin-tuc/${article.slug}`}
      className={cn(
        "group block rounded-card overflow-hidden bg-surface-container-lowest shadow-ambient",
        "border border-border-soft/60 hover:shadow-ambient-lg transition-shadow",
        "bg-gradient-to-br from-primary/5 to-transparent",
        className,
      )}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={article.coverImage}
          alt={article.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-5 space-y-2.5">
        <Chip variant="primary">{article.category}</Chip>
        <h3 className="font-semibold text-lg text-text-primary line-clamp-2 min-h-[3.5rem] group-hover:text-primary-dark transition-colors">
          {article.title}
        </h3>
        <p className="text-sm text-text-muted line-clamp-2">{article.excerpt}</p>
        <div className="flex items-center gap-3 text-xs text-text-muted">
          <span className="flex items-center gap-1">
            <Calendar className="size-3.5" aria-hidden />
            {formatDate(article.publishedAt)}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="size-3.5" aria-hidden />
            {article.readingMinutes} phút
          </span>
        </div>
      </div>
    </Link>
  );
}
