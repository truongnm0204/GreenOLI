import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { NewsCard } from "@/components/news/news-card";
import { MotionWrapper } from "@/components/ui/motion-wrapper";
import { SectionHeader } from "@/components/ui/section-header";
import { getAllArticles } from "@/data/articles";

export async function NewsHighlight() {
  const all = await getAllArticles();
  const items = all.slice(0, 3);
  return (
    <section className="bg-surface-light py-16 md:py-24 relative overflow-hidden">
      <div className="bg-blob bg-blob-secondary w-[400px] h-[400px] -bottom-20 -right-20 opacity-20" />
      
      <div className="container-page relative z-10">
        <MotionWrapper
          direction="up"
          delay={0.1}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12"
        >
          <div className="max-w-2xl">
            <SectionHeader 
              eyebrow="Tin tức & Kiến thức"
              title="Cập nhật xu hướng y tế và kiểm soát côn trùng"
              align="left"
              className="mb-0 md:mb-0"
            />
          </div>
          <Link
            href="/tin-tuc"
            className="inline-flex items-center gap-2 text-primary-dark font-bold hover:gap-3 transition-all bg-primary/10 px-6 py-3 rounded-full hover:bg-primary/20"
          >
            Tất cả bài viết
            <ArrowRight className="size-5" aria-hidden />
          </Link>
        </MotionWrapper>

        <div className="grid gap-6 md:grid-cols-3">
          {items.map((article, idx) => (
            <MotionWrapper key={article.slug} direction="up" delay={0.2 + (idx * 0.15)}>
              <NewsCard article={article} />
            </MotionWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}

