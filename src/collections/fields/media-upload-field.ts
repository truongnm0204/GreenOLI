import type { UploadField } from 'payload';

type SingleMediaUploadField = Extract<UploadField, { relationTo: string }>;
type MediaUploadFieldOptions = Omit<SingleMediaUploadField, 'relationTo' | 'type'>;

const DEFAULT_DESCRIPTION =
  'Kéo thả hoặc chọn ảnh/video mới. File lưu trên máy chủ. "Chọn file đã tải trên máy chủ" chỉ tái dùng file local, không phải Cloudinary. Nhớ Lưu thay đổi.';

/**
 * Field upload chuẩn → collection `media` (kho file local).
 * Dùng cho heroImage, gallery, cover, logo...
 */
export function mediaUploadField(options: MediaUploadFieldOptions): UploadField {
  const { admin, filterOptions, ...fieldOptions } = options;

  return {
    ...fieldOptions,
    type: 'upload',
    relationTo: 'media',
    filterOptions: filterOptions ?? {
      mimeType: {
        contains: 'image',
      },
    },
    admin: {
      ...admin,
      description: admin?.description ?? DEFAULT_DESCRIPTION,
      components: {
        ...admin?.components,
        Field: '/src/components/admin/media-upload-field#MediaUploadField',
      },
    },
  } as UploadField;
}
