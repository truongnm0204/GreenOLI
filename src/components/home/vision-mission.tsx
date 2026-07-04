import { Target, Lightbulb, Sprout, ShieldCheck } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/motion/reveal";

const PILLARS = [
  {
    icon: Lightbulb,
    title: "Tầm nhìn",
    body: "Trở thành đơn vị dẫn đầu Việt Nam trong cung cấp giải pháp hóa chất nông nghiệp và kiểm soát côn trùng theo chuẩn quốc tế vào năm 2030.",
  },
  {
    icon: Target,
    title: "Sứ mệnh",
    body: "Cung cấp các sản phẩm và dịch vụ chất lượng cao, an toàn cho con người và môi trường, đồng hành cùng nông dân và cộng đồng vì một Việt Nam xanh.",
  },
  {
    icon: ShieldCheck,
    title: "Giá trị cốt lõi",
    body: "Chính trực · Khoa học · Bền vững · Tận tâm. Mỗi sản phẩm trên kệ Oli Xanh đều được lựa chọn nghiêm ngặt theo bốn nguyên tắc này.",
  },
];

export function VisionMissionSection() {
  return (
    <section className="container-page py-16 md:py-20">
      <Reveal as="div" className="max-w-3xl mb-12 md:mb-16">
        <p className="text-primary-dark font-semibold text-sm uppercase tracking-wider mb-3">
          Định hướng chiến lược
        </p>
        <h2 className="font-bold text-3xl md:text-4xl lg:text-5xl text-text-primary leading-tight">
          Khoa học vì sức khỏe cộng đồng
          <br className="hidden md:block" /> và môi trường bền vững
        </h2>
      </Reveal>
      <div className="grid gap-6 md:grid-cols-3">
        {PILLARS.map(({ icon: Icon, title, body }, idx) => (
          <Reveal key={title} as="div" delay={idx * 80}>
            <Card className="space-y-4 h-full">
              <span className="grid size-14 place-items-center rounded-full bg-primary/10 text-primary-dark">
                <Icon className="size-7" aria-hidden />
              </span>
              <h3 className="font-semibold text-xl text-text-primary">{title}</h3>
              <p className="text-text-muted leading-relaxed">{body}</p>
            </Card>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
