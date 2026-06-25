import type { Product } from "@/types/product";

/**
 * Product seeds extracted from the Stitch reference HTML
 * (homepage product carousel + danh-muc-hoa-chat-diet-con-trung page).
 * All copy is illustrative — replace with vendor data when CMS is wired.
 */
export const PRODUCTS: Product[] = [
  {
    slug: "sumipro-ew",
    name: "Sumipro EW",
    category: "hoa-chat-diet-con-trung",
    shortDescription:
      "Hóa chất diệt côn trùng gốc Pyrethroid dạng nhũ dầu trong nước, hiệu lực mạnh và lưu dẫn dài.",
    longDescription:
      "Sumipro EW là chế phẩm hóa chất diệt côn trùng tiên tiến, sử dụng công nghệ nhũ tương trong nước (Emulsion in Water) để bảo đảm hiệu quả tối đa, an toàn cho người sử dụng và thân thiện với môi trường. Sản phẩm đặc trị muỗi, ruồi, gián, kiến và các loại côn trùng gây hại trong khu dân cư, bệnh viện, kho hàng và cơ sở chế biến thực phẩm.",
    heroImage: "https://picsum.photos/seed/sumipro-ew/1200/900",
    galleryImages: [
      "https://picsum.photos/seed/sumipro-ew-1/1200/900",
      "https://picsum.photos/seed/sumipro-ew-2/1200/900",
      "https://picsum.photos/seed/sumipro-ew-3/1200/900",
      "https://picsum.photos/seed/sumipro-ew-4/1200/900",
    ],
    specs: [
      { label: "Hoạt chất", value: "Permethrin 10% + Sumithrin 1%" },
      { label: "Dạng pha chế", value: "EW – Nhũ dầu trong nước" },
      { label: "Quy cách", value: "Chai 1L, can 5L, can 20L" },
      { label: "Hạn sử dụng", value: "36 tháng" },
      { label: "Đăng ký", value: "VN-1234-2024 (Bộ Y Tế)" },
    ],
    composition:
      "Permethrin 10% w/w, Sumithrin 1% w/w, dung môi dầu nhẹ và phụ gia an toàn theo tiêu chuẩn WHO.",
    usage:
      "Pha 50ml/8L nước phun đều lên các bề mặt côn trùng thường trú đậu (tường, gầm tủ, kẽ cửa). Liều cao hơn (80ml/8L) áp dụng cho khu vực có mật độ côn trùng cao.",
    warning:
      "Đeo khẩu trang, kính bảo hộ và găng tay khi pha và phun. Không cho người, vật nuôi vào khu vực vừa phun trong 2 giờ. Bảo quản nơi khô ráo, tránh xa thực phẩm và trẻ em.",
    packaging: "Chai 1L, can 5L, can 20L (HDPE chống tia UV)",
    certifications: [
      "Đăng ký lưu hành Bộ Y Tế Việt Nam",
      "Chứng nhận ISO 9001:2015",
      "Tuân thủ WHO Pesticide Evaluation Scheme",
    ],
    tags: ["Diệt muỗi", "Diệt côn trùng", "Pyrethroid", "EW"],
  },
  {
    slug: "sumithrin-10sec",
    name: "Sumithrin 10SEC",
    category: "hoa-chat-diet-con-trung",
    shortDescription:
      "Hoạt chất Sumithrin 10% dạng SEC, dùng phun ULV và phun tồn lưu chuyên nghiệp.",
    longDescription:
      "Sumithrin 10SEC là sản phẩm chuyên dụng cho dịch vụ kiểm soát côn trùng, hiệu lực nhanh trên muỗi truyền sốt xuất huyết, ruồi nhà và gián Đức. Công thức SEC bám tốt trên bề mặt xốp.",
    heroImage: "https://picsum.photos/seed/sumithrin/1200/900",
    galleryImages: [
      "https://picsum.photos/seed/sumithrin-1/1200/900",
      "https://picsum.photos/seed/sumithrin-2/1200/900",
      "https://picsum.photos/seed/sumithrin-3/1200/900",
    ],
    specs: [
      { label: "Hoạt chất", value: "Sumithrin (d-Phenothrin) 10%" },
      { label: "Dạng pha chế", value: "SEC – Suspo-emulsion concentrate" },
      { label: "Quy cách", value: "Chai 1L, can 5L" },
      { label: "Hạn sử dụng", value: "24 tháng" },
    ],
    composition: "Sumithrin (d-Phenothrin) 10% w/w + chất nhũ hóa.",
    usage:
      "Pha 30–50ml/L nước cho phun ULV không gian; 100ml/8L cho phun tồn lưu. Phun lúc sáng sớm hoặc chiều mát.",
    warning:
      "Tránh phun trực tiếp lên người, thực phẩm và bể cá. Đậy kín thùng nước và thực phẩm trước khi phun.",
    packaging: "Chai 1L, can 5L",
    certifications: ["Đăng ký Bộ Y Tế Việt Nam", "WHOPES recommended"],
    tags: ["ULV", "Phun tồn lưu", "Diệt muỗi"],
  },
  {
    slug: "pesguard-fg-161",
    name: "Pesguard FG 161",
    category: "hoa-chat-diet-con-trung",
    shortDescription:
      "Hỗn hợp permethrin và d-tetramethrin dạng FG, đặc trị gián và kiến.",
    longDescription:
      "Pesguard FG 161 phối hợp 2 hoạt chất Pyrethroid mang lại hiệu quả knock-down nhanh và lưu dẫn lâu, được khuyến nghị bởi WHO cho chương trình kiểm soát côn trùng đô thị.",
    heroImage: "https://picsum.photos/seed/pesguard/1200/900",
    galleryImages: [
      "https://picsum.photos/seed/pesguard-1/1200/900",
      "https://picsum.photos/seed/pesguard-2/1200/900",
    ],
    specs: [
      { label: "Hoạt chất", value: "Permethrin 13% + d-Tetramethrin 3.3%" },
      { label: "Dạng pha chế", value: "FG – Flowable concentrate" },
      { label: "Quy cách", value: "Chai 1L" },
    ],
    composition: "Permethrin 13% + d-Tetramethrin 3.3% trong nền nước.",
    usage:
      "Pha loãng theo hướng dẫn nhà sản xuất (thường 1:50–1:100), phun tồn lưu lên bề mặt côn trùng đậu.",
    warning: "Đeo PPE đầy đủ. Không phun gần nguồn nước sinh hoạt.",
    packaging: "Chai 1L (PE)",
    certifications: ["WHO BCPC accepted", "Đăng ký Bộ Y Tế VN"],
    tags: ["Gián", "Kiến", "Pyrethroid"],
  },
  {
    slug: "map-permethrin-50ec",
    name: "Map Permethrin 50EC",
    category: "hoa-chat-diet-con-trung",
    shortDescription:
      "Permethrin 50% EC nồng độ cao cho dịch vụ phun tồn lưu chuyên nghiệp.",
    longDescription:
      "Map Permethrin 50EC là dung dịch nhũ dầu nồng độ Permethrin 50%, lý tưởng cho ứng dụng phun tồn lưu trên bề mặt khô (tường, sàn, vách kho) trong các chương trình kiểm soát véc-tơ truyền bệnh.",
    heroImage: "https://picsum.photos/seed/permethrin/1200/900",
    galleryImages: [
      "https://picsum.photos/seed/permethrin-1/1200/900",
      "https://picsum.photos/seed/permethrin-2/1200/900",
    ],
    specs: [
      { label: "Hoạt chất", value: "Permethrin 50%" },
      { label: "Dạng pha chế", value: "EC – Emulsifiable concentrate" },
      { label: "Quy cách", value: "Can 5L, 20L" },
    ],
    composition: "Permethrin 50% w/v trong dầu khoáng tinh chế.",
    usage:
      "Pha 25ml/8L nước phun tồn lưu định kỳ 3 tháng. Diện tích 1L pha sử dụng cho ~200m².",
    warning:
      "Sản phẩm dễ cháy. Tránh xa nguồn lửa, không phun trên bề mặt nóng.",
    packaging: "Can HDPE 5L, 20L",
    certifications: ["Đăng ký Bộ Y Tế VN", "ISO 9001:2015"],
    tags: ["Permethrin", "EC", "Dịch vụ chuyên nghiệp"],
  },
  {
    slug: "sumipro-solution",
    name: "Sumipro Solution",
    category: "hoa-chat-diet-con-trung",
    shortDescription:
      "Dung dịch sẵn sàng dùng cho hộ gia đình, không cần pha loãng.",
    longDescription:
      "Sumipro Solution là phiên bản pha sẵn của dòng Sumipro, đóng chai xịt tay tiện lợi cho hộ gia đình, văn phòng và quán cà phê. An toàn cho trẻ em và thú cưng sau khi phun 30 phút.",
    heroImage: "https://picsum.photos/seed/sumipro-sol/1200/900",
    galleryImages: [
      "https://picsum.photos/seed/sumipro-sol-1/1200/900",
      "https://picsum.photos/seed/sumipro-sol-2/1200/900",
    ],
    specs: [
      { label: "Hoạt chất", value: "Permethrin 0.25% + Sumithrin 0.05%" },
      { label: "Dạng pha chế", value: "AL – Aqueous solution (RTU)" },
      { label: "Quy cách", value: "Bình xịt 500ml, 1L" },
    ],
    composition: "Hoạt chất pha loãng sẵn trong nước cất + phụ gia thơm nhẹ.",
    usage: "Lắc đều, xịt trực tiếp lên côn trùng hoặc bề mặt côn trùng đậu.",
    warning: "Không xịt vào mắt, thực phẩm, bể cá.",
    packaging: "Bình xịt PET 500ml, 1L",
    certifications: ["Đăng ký Bộ Y Tế VN"],
    tags: ["Hộ gia đình", "Ready-to-use"],
  },
  {
    slug: "sumithrin-extra",
    name: "Sumithrin Extra",
    category: "hoa-chat-diet-con-trung",
    shortDescription:
      "Phiên bản tăng cường của Sumithrin với chất hiệp đồng PBO.",
    longDescription:
      "Sumithrin Extra bổ sung Piperonyl Butoxide (PBO) – chất hiệp đồng giúp ngăn cản chuyển hóa của côn trùng, qua đó tăng hiệu lực của hoạt chất Sumithrin lên gấp 2–3 lần.",
    heroImage: "https://picsum.photos/seed/sumithrin-x/1200/900",
    galleryImages: [
      "https://picsum.photos/seed/sumithrin-x-1/1200/900",
      "https://picsum.photos/seed/sumithrin-x-2/1200/900",
    ],
    specs: [
      { label: "Hoạt chất", value: "Sumithrin 10% + PBO 10%" },
      { label: "Dạng pha chế", value: "EC" },
      { label: "Quy cách", value: "Can 5L" },
    ],
    composition: "Sumithrin 10% + Piperonyl Butoxide 10% trong dầu khoáng.",
    usage:
      "Pha 30ml/8L nước cho phun tồn lưu hoặc 5ml/L cho ULV không gian.",
    warning: "Sản phẩm dạng EC, dễ cháy. Bảo quản nơi thoáng mát.",
    packaging: "Can HDPE 5L",
    certifications: ["WHO PES", "Đăng ký Bộ Y Tế VN"],
    tags: ["PBO", "Hiệp đồng", "ULV"],
  },
  {
    slug: "xterm-system",
    name: "Hệ Thống Xterm",
    category: "hoa-chat-diet-con-trung",
    shortDescription:
      "Trạm bả chống mối ngầm Xterm – hệ thống bảo vệ công trình toàn diện.",
    longDescription:
      "Xterm là hệ thống trạm bả mối thế hệ mới sử dụng hoạt chất Hexaflumuron, có khả năng tiêu diệt cả tổ mối thay vì chỉ những con riêng lẻ. Lý tưởng cho công trình mới, biệt thự, kho hàng và di tích lịch sử.",
    heroImage: "https://picsum.photos/seed/xterm/1200/900",
    galleryImages: [
      "https://picsum.photos/seed/xterm-1/1200/900",
      "https://picsum.photos/seed/xterm-2/1200/900",
      "https://picsum.photos/seed/xterm-3/1200/900",
    ],
    specs: [
      { label: "Hoạt chất bả", value: "Hexaflumuron 0.5%" },
      { label: "Dạng", value: "Trạm bả ngầm + bả gỗ" },
      { label: "Vòng đời trạm", value: "5 năm" },
    ],
    composition: "Bả gỗ tẩm Hexaflumuron 0.5% trong vỏ trạm HDPE.",
    usage:
      "Lắp đặt trạm bả cách công trình 2–3m, kiểm tra định kỳ 1–3 tháng/lần.",
    warning: "Chỉ kỹ thuật viên đã được đào tạo mới được lắp đặt và bảo trì.",
    packaging: "Bộ trạm 10–30 trạm/công trình",
    certifications: ["EPA US Registered", "WHO Approved"],
    tags: ["Mối", "Trạm bả", "Hexaflumuron"],
  },
];

export const getProductBySlug = (slug: string) =>
  PRODUCTS.find((p) => p.slug === slug);

export const getProductsByCategory = (categorySlug: string) =>
  PRODUCTS.filter((p) => p.category === categorySlug);

export const getRelatedProducts = (slug: string, limit = 4) => {
  const current = getProductBySlug(slug);
  if (!current) return [];
  return PRODUCTS.filter(
    (p) => p.slug !== slug && p.category === current.category,
  ).slice(0, limit);
};
