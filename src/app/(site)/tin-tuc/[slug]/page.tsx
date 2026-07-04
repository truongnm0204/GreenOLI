import Script from "next/script";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Calendar, Clock, User, ArrowLeft } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { ArticleProse } from "@/components/news/article-prose";
import { NewsCard } from "@/components/news/news-card";
import { Chip } from "@/components/ui/chip";
import { MotionWrapper } from "@/components/ui/motion-wrapper";
import { AnimatedText } from "@/components/motion/animated-text";
import {
  getArticleBySlug,
  getRelatedArticles,
} from "@/data/articles";
import { buildMetadata } from "@/lib/seo";
import { articleSchema, breadcrumbSchema } from "@/lib/json-ld";

type Params = { slug: string };

// ISR thay SSG: build không cần DB; bài viết mới hiện sau tối đa 5 phút.
export const revalidate = 300;
export const dynamicParams = true;

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const a = await getArticleBySlug(slug);
  if (!a) return {};
  return buildMetadata({
    title: a.title,
    description: a.excerpt,
    path: `/tin-tuc/${a.slug}`,
    ogImage: a.coverImage,
  });
}

const fmt = (iso: string) =>
  new Date(iso).toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

export default async function ArticlePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();
  const related = await getRelatedArticles(article.slug, 3);

  return (
    <>
      <PageHeader
        title={article.title}
        breadcrumb={[
          { label: "Tin tức", href: "/tin-tuc" },
          { label: article.title },
        ]}
      />

      <article className="py-12 md:py-20 relative overflow-hidden">
        <div className="bg-blob bg-blob-primary w-[300px] h-[300px] top-1/4 -right-20 opacity-10" />
        <div className="container-page max-w-3xl mx-auto space-y-8 relative z-10">
          <MotionWrapper delay={0.1} direction="up" className="flex flex-wrap items-center gap-4 text-sm text-text-muted font-medium">
            <Chip variant="primary">{article.category}</Chip>
            <span className="flex items-center gap-2">
              <Calendar className="size-4 text-primary-dark" aria-hidden />
              {fmt(article.publishedAt)}
            </span>
            <span className="flex items-center gap-2">
              <Clock className="size-4 text-primary-dark" aria-hidden />
              {article.readingMinutes} phút đọc
            </span>
            <span className="flex items-center gap-2">
              <User className="size-4 text-primary-dark" aria-hidden />
              {article.author}
            </span>
          </MotionWrapper>

          <MotionWrapper delay={0.2} direction="up">
            <p className="text-lg md:text-xl text-text-primary leading-relaxed font-semibold italic border-l-4 border-primary pl-4">
              {article.excerpt}
            </p>
          </MotionWrapper>

          <MotionWrapper delay={0.4} direction="up">
            <div className="relative aspect-[16/9] overflow-hidden rounded-[2rem] shadow-ambient-lg hover-card-effect">
              <Image
                src={article.coverImage}
                alt={article.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 768px"
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </MotionWrapper>

          <MotionWrapper delay={0.5} direction="up">
            <ArticleProse body={article.body} />
          </MotionWrapper>

          {article.tags.length > 0 ? (
            <MotionWrapper delay={0.6} direction="up" className="flex flex-wrap gap-2 pt-8 border-t border-border-soft/60">
              {article.tags.map((tag) => (
                <Chip key={tag} variant="neutral" className="hover:bg-surface-container transition-colors">
                  #{tag}
                </Chip>
              ))}
            </MotionWrapper>
          ) : null}

          <MotionWrapper delay={0.7} direction="up" className="pt-6">
            <Link
              href="/tin-tuc"
              className="inline-flex items-center gap-2 text-primary-dark font-bold hover:gap-3 transition-all bg-primary/10 px-6 py-3 rounded-full hover:bg-primary/20"
            >
              <ArrowLeft className="size-5" aria-hidden />
              Quay lại danh sách tin tức
            </Link>
          </MotionWrapper>
        </div>
      </article>

      {related.length > 0 ? (
        <section className="bg-surface-light py-16 md:py-24 relative overflow-hidden">
          <div className="bg-blob bg-blob-secondary w-[400px] h-[400px] bottom-0 -left-20 opacity-10" />
          <div className="container-page relative z-10">
            <MotionWrapper delay={0.1} direction="up" className="mb-10">
              <h2 className="font-bold text-3xl md:text-4xl text-text-primary">
                <AnimatedText text="Bài viết liên quan" />
              </h2>
            </MotionWrapper>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((a, idx) => (
                <MotionWrapper key={a.slug} delay={0.2 + idx * 0.1} direction="up">
                  <NewsCard article={a} />
                </MotionWrapper>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <Script
        id="ld-article"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema(article)),
        }}
      />
      <Script
        id="ld-article-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Trang chủ", href: "/" },
              { name: "Tin tức", href: "/tin-tuc" },
              { name: article.title, href: `/tin-tuc/${article.slug}` },
            ]),
          ),
        }}
      />
    </>
  );
}

