import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";

const HIGHLIGHTS = [
  "Hơn 10 năm phân phối hóa chất nông nghiệp tại Việt Nam",
  "Đại lý chính thức của Sumitomo, Bayer, Syngenta, BASF",
  "Đội ngũ 50+ kỹ sư nông nghiệp và y tế dự phòng",
  "Cam kết 100% sản phẩm chính hãng, có CO/CQ và MSDS",
];

export function IntroSection() {
  return (
    <section className="container-page py-16 md:py-20">
      <div className="grid gap-12 lg:grid-cols-12 items-center">
        <Reveal as="div" variant="slide-left" className="lg:col-span-5">
          <div className="relative aspect-[4/5] rounded-card overflow-hidden shadow-ambient">
            <Image
              src="https://picsum.photos/seed/intro-greenoli/960/1200"
              alt="Văn phòng Oli Xanh tại TP. Hồ Chí Minh"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
          </div>
        </Reveal>
        <Reveal
          as="div"
          variant="fade-up"
          delay={80}
          className="lg:col-span-7 space-y-5"
        >
          <p className="text-primary-dark font-semibold text-sm uppercase tracking-wider">
            Về Oli Xanh
          </p>
          <h2 className="font-bold text-3xl md:text-4xl text-text-primary leading-tight">
            Đối tác hóa chất nông nghiệp đáng tin cậy của 500+ doanh nghiệp Việt
          </h2>
          <p className="text-text-muted text-base md:text-lg leading-relaxed">
            Thành lập từ năm 2014, Oli Xanh đã đồng hành cùng hàng trăm hợp tác xã,
            trang trại và đơn vị kiểm soát côn trùng trên cả nước. Chúng tôi tin
            rằng nông nghiệp bền vững và sức khỏe cộng đồng phải đi cùng nhau.
          </p>
          <ul className="grid sm:grid-cols-2 gap-3 pt-2">
            {HIGHLIGHTS.map((h, idx) => (
              <li
                key={h}
                className="flex items-start gap-2.5 animate-fade-up"
                style={{ animationDelay: `${160 + idx * 60}ms` }}
              >
                <CheckCircle2 className="size-5 text-primary-dark flex-none mt-0.5" aria-hidden />
                <span className="text-sm text-text-primary">{h}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
