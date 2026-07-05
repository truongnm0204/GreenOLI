import type { Metadata } from "next";
import Image from "next/image";
import Script from "next/script";
import { Award, Leaf, Users, ShieldCheck, Sparkles, Target } from "lucide-react";
import { AboutHeroSection } from "@/components/about/about-hero";
import { Card } from "@/components/ui/card";
import { ContactCta } from "@/components/home/contact-cta";
import { MotionWrapper } from "@/components/ui/motion-wrapper";
import { AnimatedText } from "@/components/motion/animated-text";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/json-ld";

export const metadata: Metadata = buildMetadata({
  title: "Giới Thiệu – Câu chuyện và đội ngũ Oli Xanh",
  description:
    "Hơn 10 năm phân phối hóa chất nông nghiệp tại Việt Nam. Tìm hiểu sứ mệnh, giá trị cốt lõi và đội ngũ kỹ sư của Oli Xanh.",
  path: "/gioi-thieu",
});

const TEAM = [
  {
    name: "Ông Nguyễn Hữu Long",
    role: "Tổng Giám Đốc",
    avatar: "https://picsum.photos/seed/team-long/480/480",
  },
  {
    name: "Bà Trần Mỹ Lan",
    role: "Giám đốc Kỹ thuật",
    avatar: "https://picsum.photos/seed/team-lan/480/480",
  },
  {
    name: "Ông Lê Quang Vinh",
    role: "Trưởng phòng Kiểm soát côn trùng",
    avatar: "https://picsum.photos/seed/team-vinh/480/480",
  },
  {
    name: "TS. Phạm Thanh Hà",
    role: "Cố vấn Khoa học",
    avatar: "https://picsum.photos/seed/team-ha/480/480",
  },
];

const VALUES = [
  {
    icon: ShieldCheck,
    title: "Chính trực",
    body: "Cam kết 100% sản phẩm chính hãng, có CO/CQ và MSDS đầy đủ. Không bán hàng giả, hàng nhái dưới mọi hình thức.",
  },
  {
    icon: Sparkles,
    title: "Khoa học",
    body: "Mọi giải pháp đều dựa trên cơ sở khoa học, được kiểm chứng và phù hợp với khuyến nghị của WHO và Bộ Y Tế.",
  },
  {
    icon: Leaf,
    title: "Bền vững",
    body: "Ưu tiên lựa chọn các hoạt chất thân thiện môi trường, hỗ trợ chuyển đổi sang nông nghiệp xanh.",
  },
  {
    icon: Users,
    title: "Tận tâm",
    body: "Đội ngũ kỹ sư đồng hành cùng khách hàng từ tư vấn ban đầu đến hỗ trợ kỹ thuật trong suốt quá trình sử dụng.",
  },
];

export default function AboutPage() {
  return (
    <>
      <AboutHeroSection
        title={
          <>
            Câu chuyện <span className="text-primary-dark">Oli Xanh</span>
          </>
        }
        description="10+ năm đồng hành cùng nông dân, doanh nghiệp và cộng đồng vì một Việt Nam xanh, an toàn và bền vững."
        breadcrumb={[{ label: "Giới thiệu" }]}
      />

      <section className="container-page py-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-12 items-center">
          <MotionWrapper delay={0.1} direction="left" className="lg:col-span-6">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-ambient-lg hover-card-effect group">
              <Image
                src="https://picsum.photos/seed/about-greenoli/1200/900"
                alt="Văn phòng Oli Xanh và đội ngũ làm việc"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-primary-dark/5 mix-blend-multiply" />
            </div>
          </MotionWrapper>
          <div className="lg:col-span-6 space-y-6">
            <MotionWrapper delay={0.2} direction="up">
              <p className="text-primary-dark font-bold text-sm uppercase tracking-widest">
                Hành trình của chúng tôi
              </p>
            </MotionWrapper>
            
            <h2 className="font-bold text-3xl md:text-4xl lg:text-5xl text-text-primary leading-tight">
              <AnimatedText text="Từ một cửa hàng nhỏ đến mạng lưới phân phối toàn quốc" delay={0.3} />
            </h2>
            
            <MotionWrapper delay={0.5} direction="up">
              <p className="text-text-muted text-lg leading-relaxed font-medium">
                Công ty TNHH Hóa Chất và Thiết Bị Oli Xanh tự hào là nhà phân phối độc quyền khu vực phía Bắc các sản phẩm kiểm soát côn trùng, mối, chuột từ các tập đoàn đa quốc gia hàng đầu như Bayer, Syngenta, Ensystex, Sumitomo, BASF (Mythic, Seclira).
              </p>
            </MotionWrapper>
            <MotionWrapper delay={0.6} direction="up">
              <p className="text-text-muted text-lg leading-relaxed font-medium">
                Chúng tôi chuyên cung cấp tất cả các giải pháp mang tính an toàn tuyệt đối đối với con người, vật nuôi và môi trường. Mục tiêu hướng đến của Oli Xanh luôn là tiêu chuẩn ESG – cam kết phát triển bền vững, mang lại giá trị dài lâu cho khách hàng và cộng đồng.
              </p>
            </MotionWrapper>
            
            <ul className="grid grid-cols-2 gap-6 pt-6 border-t border-border-soft/60">
              {[
                { value: "15", label: "Tỉnh thành phân phối" },
                { value: "500+", label: "Khách hàng doanh nghiệp" },
                { value: "50+", label: "Kỹ sư & cố vấn" },
                { value: "10+", label: "Năm kinh nghiệm" }
              ].map((stat, idx) => (
                <li key={stat.label}>
                  <MotionWrapper delay={0.7 + idx * 0.1} direction="up">
                    <p className="text-4xl font-extrabold text-primary-dark tracking-tight">{stat.value}</p>
                    <p className="text-sm text-text-muted mt-1 font-medium">{stat.label}</p>
                  </MotionWrapper>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-surface-light py-16 md:py-24 relative overflow-hidden">
        <div className="bg-blob bg-blob-secondary w-[500px] h-[500px] -top-32 -right-32 opacity-20" />
        <div className="container-page relative z-10">
          <MotionWrapper delay={0.1} direction="up" className="max-w-3xl mb-12">
            <p className="text-primary-dark font-bold text-sm uppercase tracking-widest mb-4">
              Sứ mệnh & Tầm nhìn
            </p>
            <h2 className="font-bold text-3xl md:text-4xl lg:text-5xl text-text-primary leading-tight">
              <AnimatedText text="Khoa học vì sức khỏe cộng đồng và môi trường bền vững" />
            </h2>
          </MotionWrapper>
          <div className="grid gap-6 md:grid-cols-2">
            <MotionWrapper delay={0.3} direction="up">
              <Card className="space-y-4 h-full p-8 rounded-[2rem] hover:-translate-y-2 transition-transform duration-300 shadow-ambient-lg hover-card-effect border-none">
                <span className="grid size-14 place-items-center rounded-2xl bg-primary/10 text-primary-dark shadow-inner">
                  <Target className="size-7" aria-hidden />
                </span>
                <h3 className="font-bold text-2xl">Sứ mệnh</h3>
                <p className="text-text-muted text-lg leading-relaxed font-medium">
                  Cung cấp các sản phẩm và dịch vụ chất lượng cao, an toàn cho con người
                  và môi trường, đồng hành cùng nông dân và cộng đồng vì một Việt Nam xanh.
                </p>
              </Card>
            </MotionWrapper>
            <MotionWrapper delay={0.4} direction="up">
              <Card className="space-y-4 h-full p-8 rounded-[2rem] hover:-translate-y-2 transition-transform duration-300 shadow-ambient-lg hover-card-effect border-none">
                <span className="grid size-14 place-items-center rounded-2xl bg-secondary/10 text-secondary-strong shadow-inner">
                  <Award className="size-7" aria-hidden />
                </span>
                <h3 className="font-bold text-2xl">Tầm nhìn 2030</h3>
                <p className="text-text-muted text-lg leading-relaxed font-medium">
                  Trở thành đơn vị dẫn đầu Việt Nam trong cung cấp giải pháp hóa chất
                  nông nghiệp và kiểm soát côn trùng theo chuẩn quốc tế vào năm 2030.
                </p>
              </Card>
            </MotionWrapper>
          </div>
        </div>
      </section>

      <section className="container-page py-16 md:py-24 relative">
        <div className="bg-blob bg-blob-primary w-[400px] h-[400px] top-1/2 -left-20 opacity-10" />
        <MotionWrapper delay={0.1} direction="up" className="max-w-3xl mb-12 relative z-10">
          <p className="text-primary-dark font-bold text-sm uppercase tracking-widest mb-4">
            Giá trị cốt lõi
          </p>
          <h2 className="font-bold text-3xl md:text-4xl lg:text-5xl text-text-primary leading-tight">
            <AnimatedText text="Bốn nguyên tắc dẫn dắt mọi quyết định của Oli Xanh" />
          </h2>
        </MotionWrapper>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 relative z-10">
          {VALUES.map(({ icon: Icon, title, body }, idx) => (
            <MotionWrapper key={title} delay={0.2 + idx * 0.15} direction="up">
              <Card className="space-y-4 h-full hover-card-effect rounded-2xl shadow-ambient hover:shadow-ambient-lg hover:-translate-y-1 transition-all">
                <span className="grid size-14 place-items-center rounded-xl bg-primary/10 text-primary-dark">
                  <Icon className="size-7" aria-hidden />
                </span>
                <h3 className="font-bold text-xl text-text-primary">{title}</h3>
                <p className="text-base text-text-muted leading-relaxed font-medium">{body}</p>
              </Card>
            </MotionWrapper>
          ))}
        </div>
      </section>

      <section className="bg-surface-light py-16 md:py-24">
        <div className="container-page">
          <MotionWrapper delay={0.1} direction="up" className="max-w-3xl mb-12">
            <p className="text-primary-dark font-bold text-sm uppercase tracking-widest mb-4">
              Đội ngũ lãnh đạo
            </p>
            <h2 className="font-bold text-3xl md:text-4xl lg:text-5xl text-text-primary leading-tight">
              <AnimatedText text="Những người đứng sau Oli Xanh" />
            </h2>
          </MotionWrapper>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {TEAM.map((member, idx) => (
              <MotionWrapper key={member.name} delay={0.2 + idx * 0.15} direction="up">
                <Card padding="none" className="overflow-hidden rounded-2xl hover-card-effect group shadow-ambient">
                  <div className="relative aspect-square">
                    <Image
                      src={member.avatar}
                      alt={`Chân dung ${member.name}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 25vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-6 relative bg-white">
                    <p className="font-bold text-lg text-text-primary group-hover:text-primary-dark transition-colors">{member.name}</p>
                    <p className="text-sm text-text-muted mt-1 font-medium">{member.role}</p>
                  </div>
                </Card>
              </MotionWrapper>
            ))}
          </div>
        </div>
      </section>

      <ContactCta />

      <Script
        id="ld-about-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Trang chủ", href: "/" },
              { name: "Giới thiệu", href: "/gioi-thieu" },
            ]),
          ),
        }}
      />
    </>
  );
}

