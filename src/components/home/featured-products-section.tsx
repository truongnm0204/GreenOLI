import { getFeaturedProducts } from "@/data/products";
import { SectionHeader } from "@/components/ui/section-header";
import { FeaturedProductsCarousel } from "./featured-products-carousel";

export async function FeaturedProductsSection() {
  // Lấy danh sách sản phẩm nổi bật (ưu tiên isFeatured = true, bù sản phẩm mới)
  const featuredProducts = await getFeaturedProducts(6);

  if (!featuredProducts || featuredProducts.length === 0) return null;

  return (
    <section 
      id="san-pham-noi-bat" 
      className="relative py-16 md:py-24 overflow-hidden scroll-mt-24 md:scroll-mt-28" 
      style={{ background: "linear-gradient(135deg, #eaf6d5 0%, #f3fbe6 50%, #e8f5c8 100%)" }}
    >
      {/* Decorative background blobs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/15 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary-dark/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <SectionHeader 
        eyebrow="SẢN PHẨM" 
        title="SẢN PHẨM NỔI BẬT" 
      />

      <div className="w-full relative z-10">
        <FeaturedProductsCarousel products={featuredProducts} />
      </div>
    </section>
  );
}
