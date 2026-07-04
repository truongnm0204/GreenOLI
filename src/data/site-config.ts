export const SITE_CONFIG = {
  name: "Oli Xanh",
  tagline: "Giải pháp hóa chất nông nghiệp & kiểm soát côn trùng chuyên nghiệp",
  description:
    "Oli Xanh cung cấp hóa chất nông nghiệp, phân bón, thuốc bảo vệ thực vật và dịch vụ kiểm soát côn trùng chuyên nghiệp. 10+ năm kinh nghiệm, đại lý độc quyền các thương hiệu quốc tế.",
  url: "https://greenoli.vn",
  ogImage: "/opengraph-image",
  locale: "vi_VN",
  hotline: "1900 1234",
  email: "info@greenoli.vn",
  address: "123 Nguyễn Văn Linh, Quận 7, TP. Hồ Chí Minh, Việt Nam",
  workingHours: "T2 – T7: 8:00 – 17:30",
  social: {
    facebook: "https://facebook.com/greenoli",
    zalo: "https://zalo.me/greenoli",
    youtube: "https://youtube.com/@greenoli",
    tiktok: "https://tiktok.com/@greenoli",
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
