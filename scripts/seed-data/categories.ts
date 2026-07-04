import type { Category } from "@/types/category";

/**
 * 8 product categories — extracted directly from the Stitch reference HTML
 * (header dropdown of "Sản phẩm" on every page).
 *
 * Slugs are Vietnamese-friendly kebab-case (no diacritics) so they double
 * as SEO-friendly URLs (e.g. /cua-hang/hoa-chat-diet-con-trung).
 */
export const CATEGORIES: Category[] = [
  {
    slug: "phan-bon-la",
    name: "Phân Bón Lá",
    shortName: "Phân Bón Lá",
    tagline: "Dinh dưỡng cao cấp dạng phun lá",
    description:
      "Phân bón lá hấp thu nhanh, bổ sung trung – vi lượng và kích thích sinh trưởng cho mọi loại cây trồng.",
    longDescription:
      "Dòng phân bón lá của Green Oli được phối trộn theo công thức NPK cân bằng cùng các nguyên tố vi lượng chelate, giúp cây trồng hấp thu hiệu quả qua khí khổng. Phù hợp cho rau màu, cây ăn trái, hoa kiểng và cây công nghiệp ở mọi giai đoạn sinh trưởng.",
    heroImage: "https://picsum.photos/seed/phanbonla/1280/640",
    iconKey: "Leaf",
  },
  {
    slug: "phan-bon-goc",
    name: "Phân Bón Gốc",
    shortName: "Phân Bón Gốc",
    tagline: "Cung cấp dinh dưỡng nền cho đất",
    description:
      "Phân bón gốc dạng hạt và viên nén chậm tan, cải tạo đất và nuôi cây bền vững.",
    longDescription:
      "Phân bón gốc Green Oli kết hợp dinh dưỡng đa lượng với vi sinh vật có lợi, giúp cải thiện kết cấu đất, nâng cao độ phì nhiêu và duy trì năng suất ổn định cho cây dài ngày.",
    heroImage: "https://picsum.photos/seed/phanbongoc/1280/640",
    iconKey: "Sprout",
  },
  {
    slug: "thuoc-tru-benh",
    name: "Thuốc Trừ Bệnh",
    shortName: "Trừ Bệnh",
    tagline: "Phòng và trị bệnh hại cây trồng",
    description:
      "Thuốc trừ bệnh phổ rộng, hiệu quả cao trên các bệnh phổ biến do nấm và vi khuẩn.",
    longDescription:
      "Sản phẩm trừ bệnh của Green Oli được chọn lọc từ các hoạt chất tiên tiến, có tác động nội hấp và lưu dẫn, mang lại hiệu lực kéo dài và an toàn cho cây trồng cũng như môi trường canh tác.",
    heroImage: "https://picsum.photos/seed/trubenh/1280/640",
    iconKey: "ShieldCheck",
  },
  {
    slug: "thuoc-tru-co",
    name: "Thuốc Trừ Cỏ",
    shortName: "Trừ Cỏ",
    tagline: "Quản lý cỏ dại hiệu quả, chọn lọc",
    description:
      "Thuốc trừ cỏ tiền nảy mầm và hậu nảy mầm cho lúa, ngô, mía, cà phê.",
    longDescription:
      "Dòng thuốc trừ cỏ Green Oli giúp loại bỏ cỏ dại nhanh chóng nhưng không ảnh hưởng đến cây trồng chính, hỗ trợ giảm công lao động và nâng cao năng suất.",
    heroImage: "https://picsum.photos/seed/truco/1280/640",
    iconKey: "Scissors",
  },
  {
    slug: "thuoc-tru-sau-ray-rep",
    name: "Thuốc Trừ Sâu Rầy Rệp",
    shortName: "Trừ Sâu Rầy",
    tagline: "Trừ sâu rầy phổ rộng, an toàn",
    description:
      "Đặc trị sâu cuốn lá, rầy nâu, rệp sáp và nhện đỏ trên nhiều loại cây trồng.",
    longDescription:
      "Hoạt chất sinh học kết hợp hóa học chọn lọc giúp tiêu diệt nhanh sâu hại, đồng thời bảo vệ thiên địch và giảm tồn dư trên nông sản.",
    heroImage: "https://picsum.photos/seed/trusau/1280/640",
    iconKey: "Bug",
  },
  {
    slug: "che-pham-sinh-hoc-vi-sinh",
    name: "Chế Phẩm Sinh Học – Vi Sinh",
    shortName: "Sinh Học – Vi Sinh",
    tagline: "Giải pháp xanh, thân thiện môi trường",
    description:
      "Chế phẩm vi sinh kích thích rễ, đối kháng nấm bệnh và xử lý đất.",
    longDescription:
      "Bao gồm Trichoderma, Bacillus, nấm rễ cộng sinh và các dòng vi sinh hữu ích, sản phẩm giúp phục hồi đất bạc màu, ngăn ngừa nấm bệnh trong đất và nâng cao sức đề kháng tự nhiên cho cây.",
    heroImage: "https://picsum.photos/seed/visinh/1280/640",
    iconKey: "Microscope",
  },
  {
    slug: "hoa-chat-nguyen-lieu-co-ban",
    name: "Hóa Chất Nguyên Liệu Cơ Bản",
    shortName: "Nguyên Liệu Cơ Bản",
    tagline: "Nguyên liệu công nghiệp chất lượng cao",
    description:
      "Hóa chất nguyên liệu phục vụ sản xuất công nghiệp, xử lý nước và phòng thí nghiệm.",
    longDescription:
      "Green Oli cung cấp các nguyên liệu hóa chất cơ bản đạt chuẩn công nghiệp/dược phẩm, có chứng nhận xuất xứ, MSDS đầy đủ và tư vấn kỹ thuật theo từng ứng dụng cụ thể.",
    heroImage: "https://picsum.photos/seed/nguyenlieu/1280/640",
    iconKey: "FlaskConical",
  },
  {
    slug: "hoa-chat-diet-con-trung",
    name: "Hóa Chất Diệt Côn Trùng",
    shortName: "Diệt Côn Trùng",
    tagline: "Bảo vệ sức khỏe cộng đồng",
    description:
      "Hoá chất diệt côn trùng gia dụng và y tế, an toàn theo chuẩn WHO – Bộ Y Tế.",
    longDescription:
      "Danh mục hóa chất diệt côn trùng của Green Oli gồm các hoạt chất Pyrethroid, Carbamate và sinh học, đăng ký lưu hành chính thức tại Việt Nam, sử dụng trong dịch vụ kiểm soát côn trùng chuyên nghiệp và y tế dự phòng.",
    heroImage: "https://picsum.photos/seed/dietcontrung/1280/640",
    iconKey: "Bug",
  },
];

export const getCategoryBySlug = (slug: string) =>
  CATEGORIES.find((c) => c.slug === slug);
