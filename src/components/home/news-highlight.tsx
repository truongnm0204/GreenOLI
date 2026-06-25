import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { NewsCard } from "@/components/news/news-card";
import { ARTICLES } from "@/data/articles";

export function NewsHighlight() {
  const items = ARTICLES.slice(0, 3);
  return (
    <section className="bg-surface-light py-16 md:py-20">
      <div className="container-page">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-12">
          <div className="max-w-2xl">
            <p className="text-primary-dark font-semibold text-sm uppercase tracking-wider mb-3">
              Tin tức & Kiến thức
            </p>
            <h2 className="font-bold text-3xl md:text-4xl text-text-primary leading-tight">
              Cập nhật xu hướng nông nghiệp và kiểm soát côn trùng
            </h2>
          </div>
          <Link
            href="/tin-tuc"
            className="inline-flex items-center gap-2 text-primary-dark font-semibold hover:gap-3 transition-all"
          >
            Tất cả bài viết
            <ArrowRight className="size-5" aria-hidden />
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {items.map((article) => (
            <NewsCard key={article.slug} article={article} />
          ))}
        </div>
      </div>
    </section>
  );
}
