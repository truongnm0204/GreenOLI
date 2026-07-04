import Image from "next/image";
import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-surface-light molecular-pattern">
      <div className="container-page py-16 md:py-24 lg:py-28 grid items-center gap-10 lg:grid-cols-12">
        <div className="lg:col-span-6 space-y-6">
          <Chip
            variant="primary"
            className="px-4 py-1.5 animate-fade-up"
          >
            <Sparkles className="size-3.5" aria-hidden />
            10+ năm dẫn đầu thị trường
          </Chip>
          <h1 className="font-bold tracking-tight text-text-primary text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.1]">
            <span className="block overflow-hidden pb-1">
              <span className="block animate-reveal-up" style={{ animationDelay: "100ms" }}>Giải pháp</span>
            </span>
            <span className="block overflow-hidden pb-1">
              <span className="block animate-reveal-up text-primary-dark" style={{ animationDelay: "200ms" }}>hóa chất xanh</span>
            </span>
            <span className="block overflow-hidden pb-1 mt-2">
              <span className="block animate-reveal-up" style={{ animationDelay: "300ms" }}>cho nông nghiệp</span>
            </span>
            <span className="block overflow-hidden pb-1">
              <span className="block animate-reveal-up" style={{ animationDelay: "400ms" }}>& sức khỏe cộng đồng</span>
            </span>
          </h1>
          <p
            className="text-lg text-text-muted leading-relaxed max-w-xl animate-fade-up"
            style={{ animationDelay: "160ms" }}
          >
            Công ty TNHH Hóa Chất và Thiết Bị Oli Xanh chuyên phân phối độc quyền khu vực phía Bắc các sản phẩm kiểm soát côn trùng,
            mối, chuột từ các tập đoàn đa quốc gia như Bayer, Syngenta, Ensystex, Sumitomo, BASF (Mythic, Seclira). Chúng tôi chuyên cung cấp
            tất cả các giải pháp mang tính an toàn đối với con người, vật nuôi và môi trường. Mục tiêu hướng đến là tiêu chuẩn ESG.
          </p>
          <div
            className="flex flex-wrap gap-3 animate-fade-up"
            style={{ animationDelay: "240ms" }}
          >
            <Button href="/cua-hang" size="lg">
              Khám phá sản phẩm
              <ArrowRight className="size-5" aria-hidden />
            </Button>
            <Button href="/lien-he" variant="outline" size="lg">
              Tư vấn miễn phí
            </Button>
          </div>
          <ul className="grid grid-cols-3 gap-4 pt-6 border-t border-border-soft">
            {[
              { value: "10+", label: "Năm kinh nghiệm" },
              { value: "500+", label: "Khách hàng tin tưởng" },
              { value: "100%", label: "Sản phẩm chính hãng" },
            ].map((stat, idx) => (
              <li
                key={stat.label}
                className="animate-fade-up"
                style={{ animationDelay: `${300 + idx * 70}ms` }}
              >
                <p className="text-2xl md:text-3xl font-bold text-primary-dark">
                  {stat.value}
                </p>
                <p className="text-xs md:text-sm text-text-muted mt-1">
                  {stat.label}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-6 relative">
          <div
            className="relative aspect-square md:aspect-[5/4] rounded-card overflow-hidden shadow-ambient-lg animate-scale-in"
            style={{ animationDelay: "180ms" }}
          >
            <Image
              src="https://picsum.photos/seed/hero-greenoli/1280/1024"
              alt="Đội ngũ kỹ thuật Oli Xanh kiểm tra chất lượng sản phẩm"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div
            className="hidden md:flex absolute -bottom-6 -left-6 gap-3 items-center bg-surface-container-lowest rounded-card shadow-ambient-lg p-4 max-w-xs animate-fade-up"
            style={{ animationDelay: "360ms" }}
          >
            <span className="grid size-12 place-items-center rounded-full bg-primary/10 text-primary-dark">
              <ShieldCheck className="size-6" aria-hidden />
            </span>
            <div>
              <p className="font-semibold text-sm text-text-primary">
                Chứng nhận an toàn
              </p>
              <p className="text-xs text-text-muted">
                ISO 9001 · WHO · Bộ Y Tế
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
