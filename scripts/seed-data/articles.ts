/**
 * Article seed (dữ liệu gốc). body là markdown string — seed.ts convert sang Lexical.
 * Type tự định nghĩa, độc lập với type app (Article.body giờ là Lexical object).
 */
type ArticleSeed = {
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  coverImage: string;
  publishedAt: string;
  author: string;
  category: string;
  readingMinutes: number;
  tags: string[];
};

export const ARTICLES: ArticleSeed[] = [
  {
    slug: "cach-phong-chong-muoi-mua-mua",
    title: "5 cách phòng chống muỗi hiệu quả trong mùa mưa",
    excerpt:
      "Mùa mưa tới kéo theo bùng phát muỗi truyền sốt xuất huyết. Cùng Green Oli điểm qua 5 biện pháp phòng chống được khuyến nghị bởi Bộ Y Tế.",
    body: "## Tại sao mùa mưa muỗi sinh sản mạnh?\n\nĐộ ẩm cao và các vũng nước đọng tạo điều kiện lý tưởng cho muỗi đẻ trứng. Trung bình, một con muỗi cái Aedes aegypti có thể đẻ 100–200 trứng mỗi lần, và trứng có thể nở chỉ sau 2–3 ngày trong nước sạch.\n\n## 5 biện pháp phòng chống\n\n1. **Loại bỏ nước đọng** — kiểm tra và làm sạch các vật chứa quanh nhà ít nhất 1 lần/tuần.\n2. **Phun thuốc tồn lưu** — sử dụng các sản phẩm như Sumipro EW phun lên tường và bề mặt côn trùng đậu.\n3. **Cửa lưới + màn ngủ** — biện pháp vật lý đơn giản nhưng hiệu quả cao.\n4. **Thuốc xịt cá nhân** — DEET, Picaridin được khuyến nghị cho người lớn và trẻ trên 2 tuổi.\n5. **Phối hợp cộng đồng** — phun ULV không gian khi có ổ dịch xuất hiện.\n\n## Khi nào cần dịch vụ chuyên nghiệp?\n\nNếu mật độ muỗi quanh khu nhà bạn cao bất thường hoặc có ca sốt xuất huyết trong khu vực, hãy liên hệ đội ngũ Green Oli để được phun ULV và phun tồn lưu chuyên nghiệp.",
    coverImage: "https://picsum.photos/seed/news-muoi/1280/720",
    publishedAt: "2026-06-10",
    author: "BS. Nguyễn Thị Hương",
    category: "Sức khỏe cộng đồng",
    readingMinutes: 5,
    tags: ["Phòng chống muỗi", "Sốt xuất huyết", "Mùa mưa"],
  },
  {
    slug: "huong-dan-su-dung-phan-bon-la-dung-cach",
    title: "Hướng dẫn sử dụng phân bón lá đúng cách cho rau ăn lá",
    excerpt:
      "Phân bón lá hấp thu nhanh nhưng nếu dùng sai liều và sai thời điểm sẽ gây cháy lá, ngộ độc cây. Bài viết này tổng hợp 7 nguyên tắc cốt lõi.",
    body: "Phân bón lá là giải pháp dinh dưỡng bổ sung tuyệt vời, đặc biệt khi bộ rễ cây gặp vấn đề hoặc cần phục hồi nhanh sau stress.\n\n## 7 nguyên tắc vàng\n\n1. Phun vào sáng sớm hoặc chiều mát, tránh nắng gắt.\n2. Pha đúng liều khuyến cáo, không tự ý tăng liều.\n3. Phun đều mặt dưới lá — nơi tập trung khí khổng.\n4. Không phun khi cây đang ra hoa rộ.\n5. Kết hợp với phân bón gốc, không thay thế hoàn toàn.\n6. Bảo quản nơi khô ráo, tránh ánh nắng trực tiếp.\n7. Theo dõi phản ứng của cây sau 3 ngày để điều chỉnh.",
    coverImage: "https://picsum.photos/seed/news-bonla/1280/720",
    publishedAt: "2026-06-05",
    author: "KS. Trần Văn Minh",
    category: "Nông nghiệp",
    readingMinutes: 7,
    tags: ["Phân bón lá", "Rau ăn lá", "Hướng dẫn"],
  },
  {
    slug: "kiem-soat-moi-cho-cong-trinh-moi",
    title: "Kiểm soát mối cho công trình mới: nên làm trước hay sau xây dựng?",
    excerpt:
      "Phòng mối tiền xây dựng tiết kiệm chi phí 60% so với xử lý sau. Cùng Green Oli phân tích 3 phương án phổ biến.",
    body: "Mối là một trong những tác nhân gây hư hại công trình hàng đầu tại Việt Nam, ước tính thiệt hại lên đến hàng trăm tỷ đồng mỗi năm.\n\n## Tiền xây dựng vs hậu xây dựng\n\nXử lý nền móng trước khi đổ bê tông cho phép tạo lớp hàng rào hóa học liên tục, ngăn mối từ đất đi lên. Phương án này có hiệu lực 10–15 năm.\n\nXử lý sau xây dựng phải khoan và bơm hóa chất qua sàn, chi phí cao hơn và hiệu quả thấp hơn do không tạo được lớp bảo vệ liền mạch.\n\n## Đề xuất Green Oli\n\nKết hợp xử lý nền móng (Termidor SC) với hệ thống bả ngầm Xterm để tạo bảo vệ kép tối ưu.",
    coverImage: "https://picsum.photos/seed/news-moi/1280/720",
    publishedAt: "2026-05-28",
    author: "KS. Lê Quang Vinh",
    category: "Kiểm soát côn trùng",
    readingMinutes: 8,
    tags: ["Mối", "Công trình", "Xterm"],
  },
  {
    slug: "che-pham-vi-sinh-cuu-dat-bac-mau",
    title: "Chế phẩm vi sinh – giải pháp cứu đất bạc màu",
    excerpt:
      "Đất bạc màu sau nhiều năm canh tác hóa học có thể được phục hồi bằng chế phẩm Trichoderma + Bacillus. Cách dùng đơn giản, chi phí thấp.",
    body: "Đất là nền tảng của mọi vụ mùa. Khi đất bạc màu, năng suất giảm 30–50% và phải bù bằng phân hóa học, tạo vòng xoáy độc hại.\n\n## Vai trò của vi sinh có lợi\n\n- Trichoderma: ức chế nấm bệnh trong đất.\n- Bacillus: cố định đạm, phân giải lân.\n- Mycorrhiza: cộng sinh với rễ giúp cây hấp thu dinh dưỡng tốt hơn.\n\n## Quy trình sử dụng\n\n1. Trộn chế phẩm với phân chuồng hoai mục.\n2. Bón gốc 200g/m² đất.\n3. Tưới giữ ẩm 7 ngày liên tục.\n4. Lặp lại sau mỗi vụ thu hoạch.",
    coverImage: "https://picsum.photos/seed/news-visinh/1280/720",
    publishedAt: "2026-05-20",
    author: "TS. Phạm Thanh Hà",
    category: "Nông nghiệp",
    readingMinutes: 6,
    tags: ["Vi sinh", "Đất bạc màu", "Trichoderma"],
  },
  {
    slug: "an-toan-khi-su-dung-hoa-chat-diet-con-trung",
    title: "An toàn khi sử dụng hóa chất diệt côn trùng tại nhà",
    excerpt:
      "10 nguyên tắc bắt buộc để bảo vệ sức khỏe gia đình bạn khi tự xử lý côn trùng tại nhà.",
    body: "Việc tự phun thuốc tại nhà là phổ biến nhưng tiềm ẩn rủi ro nếu không tuân thủ quy tắc an toàn.\n\n## 10 nguyên tắc\n\n1. Đeo khẩu trang N95 và găng tay.\n2. Mặc quần áo dài tay, kính bảo hộ.\n3. Không phun gần thực phẩm và bể cá.\n4. Đậy kín đồ chơi trẻ em và thức ăn vật nuôi.\n5. Cho người và thú cưng ra ngoài 2 giờ.\n6. Mở cửa thông gió sau khi phun.\n7. Không pha trộn nhiều loại thuốc.\n8. Bảo quản nơi khóa tủ, xa tầm trẻ em.\n9. Vứt bỏ vỏ bao bì đúng quy định.\n10. Liên hệ trung tâm chống độc nếu có triệu chứng bất thường.",
    coverImage: "https://picsum.photos/seed/news-antoan/1280/720",
    publishedAt: "2026-05-12",
    author: "BS. Hoàng Anh Tuấn",
    category: "Sức khỏe cộng đồng",
    readingMinutes: 5,
    tags: ["An toàn", "PPE", "Hộ gia đình"],
  },
  {
    slug: "xu-huong-nong-nghiep-xanh-2026",
    title: "Xu hướng nông nghiệp xanh 2026: cơ hội và thách thức",
    excerpt:
      "EU CBAM, USDA Organic và GlobalGAP đang thay đổi cuộc chơi xuất khẩu nông sản. Doanh nghiệp Việt cần chuẩn bị gì?",
    body: "Năm 2026, nhiều rào cản kỹ thuật mới sẽ có hiệu lực với nông sản xuất khẩu. Đây vừa là thách thức, vừa là cơ hội tái cấu trúc ngành.\n\n## 3 xu hướng chính\n\n1. **Giảm dấu chân carbon** — báo cáo phát thải bắt buộc cho 5 ngành mục tiêu.\n2. **Truy xuất nguồn gốc số** — QR code trên từng đơn vị sản phẩm.\n3. **Thuốc BVTV sinh học** — thay thế dần hoạt chất hóa học có dư lượng cao.\n\n## Hành động cho doanh nghiệp\n\nĐầu tư vào chế phẩm sinh học, vi sinh hữu ích và phần mềm quản lý vùng trồng là 3 ưu tiên hàng đầu.",
    coverImage: "https://picsum.photos/seed/news-xuhuong/1280/720",
    publishedAt: "2026-04-30",
    author: "ThS. Đỗ Minh Khôi",
    category: "Tin ngành",
    readingMinutes: 9,
    tags: ["Nông nghiệp xanh", "CBAM", "Xuất khẩu"],
  },
  {
    slug: "green-oli-mo-rong-thi-truong-mien-trung",
    title: "Green Oli mở rộng thị trường miền Trung – khai trương 3 chi nhánh",
    excerpt:
      "Tháng 7/2026, Green Oli sẽ chính thức có mặt tại Đà Nẵng, Huế và Quy Nhơn nhằm phục vụ tốt hơn khách hàng khu vực miền Trung.",
    body: "Sau hơn 10 năm phát triển tại miền Bắc và miền Nam, Green Oli quyết định mở rộng sự hiện diện tại miền Trung với 3 chi nhánh đầu tiên.\n\n## Lịch khai trương\n\n- 05/07/2026 — Đà Nẵng (đường Nguyễn Văn Linh)\n- 12/07/2026 — Huế (đường Hùng Vương)\n- 19/07/2026 — Quy Nhơn (đường Trần Hưng Đạo)\n\nKhách hàng tham dự sẽ nhận được ưu đãi 15% trong tuần đầu khai trương.",
    coverImage: "https://picsum.photos/seed/news-mienTrung/1280/720",
    publishedAt: "2026-04-15",
    author: "Phòng Truyền thông Green Oli",
    category: "Tin công ty",
    readingMinutes: 3,
    tags: ["Khai trương", "Miền Trung", "Green Oli"],
  },
];

export const getArticleBySlug = (slug: string) =>
  ARTICLES.find((a) => a.slug === slug);

export const getFeaturedArticle = () => ARTICLES[0];

export const getRelatedArticles = (slug: string, limit = 3) =>
  ARTICLES.filter((a) => a.slug !== slug).slice(0, limit);
