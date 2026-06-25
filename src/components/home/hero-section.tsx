import Image from "next/image";
import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-surface-light molecular-pattern">
      <div className="container-page py-16 md:py-24 lg:py-28 grid items-center gap-10 lg:grid-cols-12">
        <div className="lg:col-span-6 space-y-6">
          <Chip variant="primary" className="px-4 py-1.5">
            <Sparkles className="size-3.5" aria-hidden />
            10+ năm dẫn đầu thị trường
          </Chip>
          <h1 className="font-bold tracking-tight text-text-primary text-4xl md:text-5xl lg:text-6xl leading-[1.1]">
            Giải pháp <span className="text-primary-dark">hóa chất xanh</span>
            <br />
            cho nông nghiệp & sức khỏe cộng đồng
          </h1>
          <p className="text-lg text-text-muted leading-relaxed max-w-xl">
            Green Oli phân phối hóa chất nông nghiệp, phân bón và sản phẩm kiểm soát
            côn trùng từ các thương hiệu hàng đầu thế giới. Chúng tôi cam kết an toàn,
            hiệu quả và thân thiện với môi trường.
          </p>
          <div className="flex flex-wrap gap-3">
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
            ].map((stat) => (
              <li key={stat.label}>
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
          <div className="relative aspect-square md:aspect-[5/4] rounded-card overflow-hidden shadow-ambient-lg">
            <Image
              src="https://picsum.photos/seed/hero-greenoli/1280/1024"
              alt="Đội ngũ kỹ thuật Green Oli kiểm tra chất lượng sản phẩm"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="hidden md:flex absolute -bottom-6 -left-6 gap-3 items-center bg-surface-container-lowest rounded-card shadow-ambient-lg p-4 max-w-xs">
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
