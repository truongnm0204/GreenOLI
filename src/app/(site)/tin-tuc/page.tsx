import Script from "next/script";
import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { NewsCard } from "@/components/news/news-card";
import { MotionWrapper } from "@/components/ui/motion-wrapper";
import { AnimatedText } from "@/components/motion/animated-text";
import { getAllArticles } from "@/data/articles";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/json-ld";

// ISR: bài viết mới hiện sau tối đa 5 phút, build không cần DB.
export const revalidate = 300;

export const metadata: Metadata = buildMetadata({
  title: "Tin Tức – Kiến thức nông nghiệp & kiểm soát côn trùng",
  description:
    "Cập nhật những bài viết mới nhất về phân bón, thuốc bảo vệ thực vật, kiểm soát côn trùng và xu hướng nông nghiệp xanh từ đội ngũ kỹ sư Oli Xanh.",
  path: "/tin-tuc",
});

export default async function NewsListPage() {
  const articles = await getAllArticles();
  const [featured, ...rest] = articles;
  const sidebar = rest.slice(0, 3);
  const grid = rest.slice(3);

  return (
    <>
      <PageHeader
        title="Tin tức & Kiến thức"
        description="Bài viết chuyên sâu từ đội ngũ kỹ sư của Oli Xanh – cập nhật xu hướng, hướng dẫn kỹ thuật và tin tức ngành."
        breadcrumb={[{ label: "Tin tức" }]}
      />

      {featured ? (
        <section className="container-page py-16 md:py-24 relative">
          <div className="bg-blob bg-blob-primary w-[300px] h-[300px] top-0 -left-20 opacity-10" />
          <div className="grid gap-8 lg:grid-cols-12 relative z-10">
            <MotionWrapper delay={0.1} direction="left" className="lg:col-span-8">
              <NewsCard article={featured} variant="featured" />
            </MotionWrapper>
            <aside className="lg:col-span-4" aria-label="Bài viết gần đây">
              <MotionWrapper delay={0.3} direction="up" className="space-y-4">
                <h2 className="font-bold text-2xl text-text-primary mb-4 flex items-center gap-2">
                  <span className="w-2 h-6 rounded-full bg-primary inline-block"></span>
                  Mới nhất
                </h2>
                <div className="space-y-4">
                  {sidebar.map((article, idx) => (
                    <MotionWrapper key={article.slug} delay={0.4 + idx * 0.15} direction="up">
                      <NewsCard
                        article={article}
                        variant="compact"
                      />
                    </MotionWrapper>
                  ))}
                </div>
              </MotionWrapper>
            </aside>
          </div>
        </section>
      ) : (
        <section className="container-page py-16 md:py-24">
          <div className="rounded-[2rem] border border-border-soft bg-surface-container-lowest p-12 text-center shadow-ambient">
            <h2 className="font-bold text-2xl text-text-primary">
              Chưa có bài viết nào
            </h2>
            <p className="mt-4 text-text-muted text-lg">
              Nội dung tin tức đang được cập nhật. Vui lòng quay lại sau.
            </p>
          </div>
        </section>
      )}

      {grid.length > 0 ? (
        <section className="bg-surface-light py-16 md:py-24 relative overflow-hidden">
          <div className="bg-blob bg-blob-secondary w-[500px] h-[500px] bottom-0 -right-40 opacity-10" />
          <div className="container-page relative z-10">
            <MotionWrapper delay={0.1} direction="up" className="mb-10">
              <h2 className="font-bold text-3xl md:text-4xl text-text-primary">
                <AnimatedText text="Tất cả bài viết" />
              </h2>
            </MotionWrapper>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {grid.map((article, index) => (
                <MotionWrapper
                  key={article.slug}
                  delay={0.2 + index * 0.1}
                  direction="up"
                >
                  <NewsCard article={article} />
                </MotionWrapper>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <Script
        id="ld-news-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Trang chủ", href: "/" },
              { name: "Tin tức", href: "/tin-tuc" },
            ]),
          ),
        }}
      />
    </>
  );
}

