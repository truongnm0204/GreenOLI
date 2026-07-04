import type { UploadField } from 'payload';

type SingleMediaUploadField = Extract<UploadField, { relationTo: string }>;
type MediaUploadFieldOptions = Omit<SingleMediaUploadField, 'relationTo' | 'type'>;

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
      components: {
        ...admin?.components,
        Field: '/src/components/admin/media-upload-field#MediaUploadField',
      },
    },
  } as UploadField;
}
