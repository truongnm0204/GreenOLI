import type { Metadata } from "next";
import Image from "next/image";
import Script from "next/script";
import { Award, Leaf, Users, ShieldCheck, Sparkles, Target } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Card } from "@/components/ui/card";
import { ContactCta } from "@/components/home/contact-cta";
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
      <PageHeader
        title="Câu chuyện Oli Xanh"
        description="10+ năm đồng hành cùng nông dân, doanh nghiệp và cộng đồng vì một Việt Nam xanh, an toàn và bền vững."
        breadcrumb={[{ label: "Giới thiệu" }]}
      />

      <section className="container-page py-14 md:py-20">
        <div className="grid gap-12 lg:grid-cols-12 items-center">
          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] overflow-hidden rounded-card shadow-ambient-lg">
              <Image
                src="https://picsum.photos/seed/about-greenoli/1200/900"
                alt="Văn phòng Oli Xanh và đội ngũ làm việc"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
          <div className="lg:col-span-6 space-y-5">
            <p className="text-primary-dark font-semibold text-sm uppercase tracking-wider">
              Hành trình của chúng tôi
            </p>
            <h2 className="font-bold text-3xl md:text-4xl text-text-primary leading-tight">
              Từ một cửa hàng nhỏ đến mạng lưới phân phối toàn quốc
            </h2>
            <p className="text-text-muted leading-relaxed">
              Năm 2014, Oli Xanh khởi đầu chỉ với một cửa hàng nhỏ tại Quận 7, TP. Hồ Chí
              Minh – nơi các kỹ sư trẻ ấp ủ giấc mơ mang đến cho nông dân Việt những sản phẩm
              hóa chất chất lượng quốc tế với giá phù hợp.
            </p>
            <p className="text-text-muted leading-relaxed">
              Mười năm sau, chúng tôi đã có mặt tại 15 tỉnh thành, hợp tác cùng các tập đoàn
              hàng đầu thế giới và phục vụ hơn 500 khách hàng doanh nghiệp. Nhưng điều khiến
              chúng tôi tự hào nhất không phải là quy mô, mà là sự tin tưởng mà nông dân và
              khách hàng dành cho thương hiệu Oli Xanh.
            </p>
            <ul className="grid grid-cols-2 gap-4 pt-4 border-t border-border-soft">
              <li>
                <p className="text-3xl font-bold text-primary-dark">15</p>
                <p className="text-sm text-text-muted mt-1">Tỉnh thành phân phối</p>
              </li>
              <li>
                <p className="text-3xl font-bold text-primary-dark">500+</p>
                <p className="text-sm text-text-muted mt-1">Khách hàng doanh nghiệp</p>
              </li>
              <li>
                <p className="text-3xl font-bold text-primary-dark">50+</p>
                <p className="text-sm text-text-muted mt-1">Kỹ sư & cố vấn</p>
              </li>
              <li>
                <p className="text-3xl font-bold text-primary-dark">10+</p>
                <p className="text-sm text-text-muted mt-1">Năm kinh nghiệm</p>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-surface-light py-14 md:py-20">
        <div className="container-page">
          <div className="max-w-3xl mb-12">
            <p className="text-primary-dark font-semibold text-sm uppercase tracking-wider mb-3">
              Sứ mệnh & Tầm nhìn
            </p>
            <h2 className="font-bold text-3xl md:text-4xl text-text-primary leading-tight">
              Khoa học vì sức khỏe cộng đồng và môi trường bền vững
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="space-y-3">
              <span className="grid size-12 place-items-center rounded-full bg-primary/10 text-primary-dark">
                <Target className="size-6" aria-hidden />
              </span>
              <h3 className="font-semibold text-xl">Sứ mệnh</h3>
              <p className="text-text-muted leading-relaxed">
                Cung cấp các sản phẩm và dịch vụ chất lượng cao, an toàn cho con người
                và môi trường, đồng hành cùng nông dân và cộng đồng vì một Việt Nam xanh.
              </p>
            </Card>
            <Card className="space-y-3">
              <span className="grid size-12 place-items-center rounded-full bg-secondary/10 text-secondary-strong">
                <Award className="size-6" aria-hidden />
              </span>
              <h3 className="font-semibold text-xl">Tầm nhìn 2030</h3>
              <p className="text-text-muted leading-relaxed">
                Trở thành đơn vị dẫn đầu Việt Nam trong cung cấp giải pháp hóa chất
                nông nghiệp và kiểm soát côn trùng theo chuẩn quốc tế vào năm 2030.
              </p>
            </Card>
          </div>
        </div>
      </section>

      <section className="container-page py-14 md:py-20">
        <div className="max-w-3xl mb-12">
          <p className="text-primary-dark font-semibold text-sm uppercase tracking-wider mb-3">
            Giá trị cốt lõi
          </p>
          <h2 className="font-bold text-3xl md:text-4xl text-text-primary leading-tight">
            Bốn nguyên tắc dẫn dắt mọi quyết định của Oli Xanh
          </h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map(({ icon: Icon, title, body }) => (
            <Card key={title} className="space-y-3">
              <span className="grid size-12 place-items-center rounded-full bg-primary/10 text-primary-dark">
                <Icon className="size-6" aria-hidden />
              </span>
              <h3 className="font-semibold text-lg text-text-primary">{title}</h3>
              <p className="text-sm text-text-muted leading-relaxed">{body}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-surface-light py-14 md:py-20">
        <div className="container-page">
          <div className="max-w-3xl mb-12">
            <p className="text-primary-dark font-semibold text-sm uppercase tracking-wider mb-3">
              Đội ngũ lãnh đạo
            </p>
            <h2 className="font-bold text-3xl md:text-4xl text-text-primary leading-tight">
              Những người đứng sau Oli Xanh
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {TEAM.map((member) => (
              <Card key={member.name} padding="none" className="overflow-hidden">
                <div className="relative aspect-square">
                  <Image
                    src={member.avatar}
                    alt={`Chân dung ${member.name}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-5">
                  <p className="font-semibold text-text-primary">{member.name}</p>
                  <p className="text-sm text-text-muted mt-1">{member.role}</p>
                </div>
              </Card>
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
