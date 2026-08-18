/**
 * Thông tin công ty hiển thị trên storefront + schema SEO.
 * Điền email/Facebook/YouTube khi có — UI tự ẩn link trống.
 */
export const SITE_CONFIG = {
  name: "Oli Xanh",
  tagline: "CÔNG TY TNHH HÓA CHẤT VÀ THIẾT BỊ OLI XANH",
  description:
    "Công ty TNHH Hóa Chất và Thiết Bị Oli Xanh chuyên phân phối độc quyền khu vực phía Bắc sản phẩm kiểm soát côn trùng, mối, chuột từ các tập đoàn đa quốc gia. Giải pháp an toàn cho sức khỏe và môi trường, hướng đến tiêu chuẩn ESG.",
  url: "https://greenoli.vn",
  ogImage: "/opengraph-image",
  locale: "vi_VN",
  /** Chuỗi hiển thị gộp (footer/copy). Gọi điện dùng `hotlines`. */
  hotline: "0976 187 957 – 0866 795 576",
  /** Từng số — mỗi phần tử một `tel:` hợp lệ. */
  hotlines: [
    { label: "0976 187 957", tel: "0976187957" },
    { label: "0866 795 576", tel: "0866795576" },
  ] as const,
  /** Để trống nếu chưa công bố — UI không render mailto. */
  email: "",
  address: "Số 84, phố Phú Viên, phường Bồ Đề, thành phố Hà Nội",
  workingHours: "T2 – T7: 8h–12h và 13h30–17h",
  social: {
    facebook: "",
    /** Zalo OA / chat theo hotline chính */
    zalo: "https://zalo.me/0976187957",
    youtube: "",
    tiktok: "",
  },
  /**
   * Google Maps embed — khu vực Phú Viên, Bồ Đề, Hà Nội
   * (query address; cập nhật pb= chính xác khi có tọa độ GPS văn phòng).
   */
  mapEmbedUrl:
    "https://www.google.com/maps?q=S%E1%BB%91+84+ph%E1%BB%91+Ph%C3%BA+Vi%C3%AAn,+B%E1%BB%93+%C4%90%E1%BB%81,+H%C3%A0+N%E1%BB%99i&output=embed",
  /** URL logo tuyệt đối cho JSON-LD (file public). */
  logoPath: "/logo.svg",
} as const;

/** Số hotline chính (tel href). */
export function primaryTelHref(): string {
  const first = SITE_CONFIG.hotlines[0];
  return first ? `tel:${first.tel}` : `tel:${SITE_CONFIG.hotline.replace(/\D/g, "")}`;
}

/** Các kênh social có URL thật (bỏ chuỗi rỗng). */
export function activeSocialLinks(): Array<{
  key: keyof typeof SITE_CONFIG.social;
  href: string;
}> {
  return (Object.entries(SITE_CONFIG.social) as Array<
    [keyof typeof SITE_CONFIG.social, string]
  >)
    .filter(([, href]) => Boolean(href?.trim()))
    .map(([key, href]) => ({ key, href: href.trim() }));
}

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
