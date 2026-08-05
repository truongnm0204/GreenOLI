import type { CollectionConfig } from "payload";

/**
 * Collection packaging-units: quản lý đơn vị đóng gói (kg, lít, cái, bộ...).
 * Admin thêm/sửa/tắt tự do. Không cho xóa cứng nếu đang được sản phẩm dùng.
 * Dùng isActive=false thay vì xóa để bảo toàn dữ liệu sản phẩm cũ.
 */
export const PackagingUnits: CollectionConfig = {
  slug: "packaging-units",
  labels: {
    singular: "Đơn vị đóng gói",
    plural: "Đơn vị đóng gói",
  },
  access: {
    read: () => true,
  },
  admin: {
    group: "Sản phẩm",
    useAsTitle: "name",
    defaultColumns: ["name", "symbol", "isActive", "sortOrder"],
    description:
      "Quản lý các đơn vị đóng gói sản phẩm (kg, lít, cái, bộ...). Tắt isActive thay vì xóa để không ảnh hưởng sản phẩm đang dùng.",
  },
  hooks: {
    beforeDelete: [
      async ({ id, req }) => {
        // Kiểm tra xem unit này có đang được sản phẩm nào dùng không
        const { payload } = req;
        const result = await payload.db.pool.query(
          `SELECT COUNT(*) AS cnt
           FROM products_packaging_options
           WHERE unit_id = $1`,
          [id],
        );
        const count = parseInt(result.rows?.[0]?.cnt ?? "0", 10);
        if (count > 0) {
          throw new Error(
            `Không thể xóa đơn vị này vì đang được dùng bởi ${count} quy cách sản phẩm. Hãy tắt "Đang hoạt động" thay vì xóa.`,
          );
        }
      },
    ],
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      label: "Tên đơn vị",
      admin: { description: 'Ví dụ: Kilogram, Lít, Cái, Bộ' },
    },
    {
      name: "symbol",
      type: "text",
      required: true,
      unique: true,
      label: "Ký hiệu (symbol)",
      admin: {
        description: 'Viết thường, ví dụ: kg, lít, cái, bộ. Dùng để hiển thị trên chip và tự sinh label.',
        width: "50%",
      },
    },
    {
      name: "sortOrder",
      type: "number",
      defaultValue: 0,
      label: "Thứ tự hiển thị",
      admin: { width: "50%" },
    },
    {
      name: "isActive",
      type: "checkbox",
      defaultValue: true,
      label: "Đang hoạt động",
      admin: {
        description: "Tắt để ẩn khỏi danh sách chọn khi tạo quy cách mới. Không xóa để bảo toàn sản phẩm cũ.",
      },
    },
  ],
};
