import type { CollectionConfig } from "payload";

/**
 * Collection partners: đối tác. Map với type `Partner` (src/data/partners.ts).
 * logo là relationship tới media. Public read cho site.
 */
export const Partners: CollectionConfig = {
  slug: "partners",
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "url"],
  },
  fields: [
    { name: "name", type: "text", required: true, label: "Tên đối tác" },
    {
      name: "logo",
      type: "upload",
      relationTo: "media",
      required: true,
      label: "Logo",
    },
    { name: "url", type: "text", label: "Đường dẫn website" },
  ],
};
