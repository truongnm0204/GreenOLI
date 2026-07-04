import Script from "next/script";
import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { NewsCard } from "@/components/news/news-card";
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
        <section className="container-page py-12 md:py-16">
          <div className="grid gap-6 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <NewsCard article={featured} variant="featured" />
            </div>
            <aside className="lg:col-span-4 space-y-2" aria-label="Bài viết gần đây">
              <h2 className="font-bold text-xl text-text-primary mb-3">
                Mới nhất
              </h2>
              {sidebar.map((article) => (
                <NewsCard
                  key={article.slug}
                  article={article}
                  variant="compact"
                />
              ))}
            </aside>
          </div>
        </section>
      ) : (
        <section className="container-page py-12 md:py-16">
          <div className="rounded-card border border-border-soft bg-surface-container-lowest p-8 text-center shadow-ambient">
            <h2 className="font-bold text-2xl text-text-primary">
              Chưa có bài viết nào
            </h2>
            <p className="mt-3 text-text-muted">
              Nội dung tin tức đang được cập nhật. Vui lòng quay lại sau.
            </p>
          </div>
        </section>
      )}

      {grid.length > 0 ? (
        <section className="bg-surface-light py-14 md:py-16">
          <div className="container-page">
            <h2 className="font-bold text-2xl md:text-3xl text-text-primary mb-8">
              Tất cả bài viết
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {grid.map((article, index) => (
                <div
                  key={article.slug}
                  className="animate-fade-up"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <NewsCard article={article} />
                </div>
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
