import { getAllProducts } from "@/data/products";
import { SectionHeader } from "@/components/ui/section-header";
import { FeaturedProductsCarousel } from "./featured-products-carousel";

export async function FeaturedProductsSection() {
  // Fetch up to 6 products to display in the carousel
  const allProducts = await getAllProducts();
  const featuredProducts = allProducts.slice(0, 6);

  if (!featuredProducts.length) return null;

  return (
    <section className="relative py-16 md:py-24 overflow-hidden bg-white">
      {/* Decorative background blobs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

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
