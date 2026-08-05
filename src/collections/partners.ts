import type { CollectionConfig } from "payload";
import { mediaUploadField } from "./fields/media-upload-field";

/**
 * Collection partners: đối tác. Map với type `Partner` (src/data/partners.ts).
 * logo là relationship tới media. Public read cho site.
 */
export const Partners: CollectionConfig = {
  slug: "partners",
  labels: {
    singular: "Đối tác",
    plural: "Đối tác",
  },
  access: {
    read: () => true,
  },
  admin: {
    group: "Nội dung",
    useAsTitle: "name",
    defaultColumns: ["name", "url"],
    description: "Logo và thông tin đối tác (banner trang chủ).",
  },
  fields: [
    { name: "name", type: "text", required: true, label: "Tên đối tác" },
    mediaUploadField({
      name: "logo",
      required: true,
      label: "Logo",
    }),
    { name: "url", type: "text", label: "Đường dẫn website" },
  ],
};
