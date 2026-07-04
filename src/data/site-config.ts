export const SITE_CONFIG = {
  name: "Oli Xanh",
  tagline: "CÔNG TY TNHH HÓA CHẤT VÀ THIẾT BỊ OLI XANH",
  description:
    "Công ty TNHH Hóa Chất và Thiết Bị Oli Xanh chuyên phân phối độc quyền khu vực phía Bắc sản phẩm kiểm soát côn trùng, mối, chuột từ các tập đoàn đa quốc gia. Giải pháp an toàn cho sức khỏe và môi trường, hướng đến tiêu chuẩn ESG.",
  url: "https://greenoli.vn", // Giữ nguyên domain hiện tại hoặc cập nhật nếu có
  ogImage: "/opengraph-image",
  locale: "vi_VN",
  hotline: "0976 187 957 - 0866 795 576", // Added spaces for readability
  email: "", // Không cung cấp
  address: "Số 84, phố Phú Viên, phường Bồ Đề, tp Hà Nội",
  workingHours: "T2 - T7: 8h-12h và 13h30-17h",
  social: {
    facebook: "", // Không cung cấp
    zalo: "https://zalo.me/0976187957", // Sử dụng số hotline chính
    youtube: "",
    tiktok: "",
  },
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.4!2d106.7!3d10.732!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0!2sGreen%20Oli!5e0!3m2!1svi!2s!4v1719000000000",
};

export type NavItem = {
  href: string;
  label: string;
  hasDropdown?: boolean;
};

export const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "Trang chủ" },
  { href: "/gioi-thieu", label: "Giới thiệu" },
  { href: "/cua-hang", label: "Sản phẩm", hasDropdown: true },
  { href: "/tin-tuc", label: "Tin tức" },
  { href: "/lien-he", label: "Liên hệ" },
];
