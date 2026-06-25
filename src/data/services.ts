import type { Service } from "@/types/service";

/**
 * 5 ecosystem services — featured on the homepage "Hệ Sinh Thái" section.
 * Pulled from the Stitch reference HTML (Cửa Hàng page banner row).
 */
export const SERVICES: Service[] = [
  {
    slug: "diet-moi-tan-goc",
    name: "Diệt Mối Tận Gốc",
    tagline: "Bảo vệ công trình bền vững",
    description:
      "Hệ thống bả mối Xterm và phun phòng chống mối cho công trình mới, công trình hiện hữu, kho hàng và đồ gỗ nội thất.",
    iconKey: "Hammer",
    image: "https://picsum.photos/seed/dietmoi/960/720",
  },
  {
    slug: "diet-chuot",
    name: "Diệt Chuột",
    tagline: "Kiểm soát loài gặm nhấm",
    description:
      "Giải pháp đặt bả, đặt bẫy và niêm phong điểm xâm nhập theo chuẩn IPM, an toàn cho người và thú nuôi.",
    iconKey: "Mouse",
    image: "https://picsum.photos/seed/dietchuot/960/720",
  },
  {
    slug: "diet-muoi",
    name: "Diệt Muỗi",
    tagline: "Phun ULV – tồn lưu chuyên nghiệp",
    description:
      "Phun không gian, phun tồn lưu và xử lý nguồn nước tù đọng, áp dụng cho khu dân cư, trường học, bệnh viện và resort.",
    iconKey: "Sparkles",
    image: "https://picsum.photos/seed/dietmuoi/960/720",
  },
  {
    slug: "ve-sinh-cong-nghiep",
    name: "Vệ Sinh Công Nghiệp",
    tagline: "Sạch sâu cho nhà máy & cao ốc",
    description:
      "Tổng vệ sinh sau xây dựng, lau kính nhà cao tầng, giặt ghế sofa thảm và bảo dưỡng định kỳ tòa nhà.",
    iconKey: "SprayCan",
    image: "https://picsum.photos/seed/vesinh/960/720",
  },
  {
    slug: "diet-gian-con-trung",
    name: "Diệt Gián & Côn Trùng",
    tagline: "Kiểm soát côn trùng tổng thể",
    description:
      "Đặt gel, phun tồn lưu và xử lý ổ cho gián, kiến, ruồi, bọ chét trong nhà hàng, khách sạn và hộ gia đình.",
    iconKey: "Bug",
    image: "https://picsum.photos/seed/dietgian/960/720",
  },
];

export const getServiceBySlug = (slug: string) =>
  SERVICES.find((s) => s.slug === slug);
