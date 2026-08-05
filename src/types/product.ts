import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";

/**
 * Item trong gallery sản phẩm: có thể là ảnh hoặc video.
 * mimeType dùng để quyết định render <Image> hay <video>.
 */
export type GalleryItem = {
  url: string;
  mimeType?: string; // "image/jpeg", "video/mp4"...
};

export type ProductSpec = {
  label: string;
  value: string;
};

export type ProductSection = {
  heading: string;
  body: string;
};

/** Đơn vị đóng gói — dynamic từ collection packaging-units */
export type PackagingOption = {
  /** Payload row id — dùng làm React key + selectedOptionId state */
  id: string;
  quantity: number;
  /** id của PackagingUnit document */
  unitId: string;
  /** Tên đầy đủ: "Kilogram", "Lít" */
  unitName: string;
  /** Ký hiệu: "kg", "lít", "cái" */
  unitSymbol: string;
  /**
   * Nhãn hiển thị trên chip:
   * - customLabel nếu admin nhập, vd: "Túi 5 kg", "Thùng 25 kg"
   * - Tự sinh: "${quantity} ${unitSymbol}", vd: "5 kg", "20 lít"
   */
  label: string;
  /** URL ảnh riêng cho quy cách này. Undefined → dùng heroImage */
  variantImage?: string;
};

export type Product = {
  slug: string;
  name: string;
  category: string; // category slug
  brand?: string; // brand slug
  shortDescription: string;
  longDescription: string;
  heroImage: string;
  galleryImages: GalleryItem[];
  specs: ProductSpec[];
  composition: string;
  usage: string;
  warning: string;
  /** Quy cách đóng gói có cấu trúc (dynamic từ packaging-units collection) */
  packagingOptions: PackagingOption[];
  /** Ghi chú phụ (text ngắn, optional) */
  packaging: string;
  certifications: string[];
  tags: string[];
  /**
   * Mô tả phong phú — Lexical SerializedEditorState (JSON).
   * Nơi dán bài giới thiệu / nội dung catalogue dạng trang.
   */
  description?: SerializedEditorState | null;
  /** Tài liệu đính kèm: MSDS, Catalogue, Hướng dẫn... */
  attachments: ProductAttachment[];
};

export type ProductAttachment = {
  id: string;
  type: "msds" | "catalogue" | "manual" | "technical" | "other";
  label: string;
  fileUrl: string;
  mimeType?: string;
  fileSize?: number;
};
