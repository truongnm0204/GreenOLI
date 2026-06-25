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
import {
  ARTICLES,
  getArticleBySlug,
  getRelatedArticles,
} from "@/data/articles";
import { buildMetadata } from "@/lib/seo";
import { articleSchema, breadcrumbSchema } from "@/lib/json-ld";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const a = getArticleBySlug(slug);
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
  const article = getArticleBySlug(slug);
  if (!article) notFound();
  const related = getRelatedArticles(article.slug, 3);

  return (
    <>
      <PageHeader
        title={article.title}
        breadcrumb={[
          { label: "Tin tức", href: "/tin-tuc" },
          { label: article.title },
        ]}
      />

      <article className="container-page py-10 md:py-16">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="flex flex-wrap items-center gap-3 text-sm text-text-muted">
            <Chip variant="primary">{article.category}</Chip>
            <span className="flex items-center gap-1.5">
              <Calendar className="size-4" aria-hidden />
              {fmt(article.publishedAt)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="size-4" aria-hidden />
              {article.readingMinutes} phút đọc
            </span>
            <span className="flex items-center gap-1.5">
              <User className="size-4" aria-hidden />
              {article.author}
            </span>
          </div>

          <p className="text-lg md:text-xl text-text-muted leading-relaxed">
            {article.excerpt}
          </p>

          <div className="relative aspect-[16/9] overflow-hidden rounded-card shadow-ambient">
            <Image
              src={article.coverImage}
              alt={article.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 768px"
              className="object-cover"
            />
          </div>

          <ArticleProse body={article.body} />

          {article.tags.length > 0 ? (
            <div className="flex flex-wrap gap-2 pt-6 border-t border-border-soft">
              {article.tags.map((tag) => (
                <Chip key={tag} variant="neutral">
                  #{tag}
                </Chip>
              ))}
            </div>
          ) : null}

          <div className="pt-4">
            <Link
              href="/tin-tuc"
              className="inline-flex items-center gap-2 text-primary-dark font-semibold hover:gap-3 transition-all"
            >
              <ArrowLeft className="size-5" aria-hidden />
              Quay lại danh sách tin tức
            </Link>
          </div>
        </div>
      </article>

      {related.length > 0 ? (
        <section className="bg-surface-light py-14 md:py-16">
          <div className="container-page">
            <h2 className="font-bold text-2xl md:text-3xl text-text-primary mb-8">
              Bài viết liên quan
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((a) => (
                <NewsCard key={a.slug} article={a} />
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
