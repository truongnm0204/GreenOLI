'use client';

import type { UploadFieldClientComponent } from 'payload';
import {
  Button,
  UploadField,
  useDocumentInfo,
  useField,
  useForm,
  useFormModified,
  useListDrawer,
} from '@payloadcms/ui';

export const MediaUploadField: UploadFieldClientComponent = (props) => {
  const { field, path, readOnly } = props;
  const { disabled, filterOptions, setValue, value } = useField<
    string | number | (number | string)[] | null
  >({ path });
  const { submit } = useForm();
  const modified = useFormModified();
  const { uploadStatus } = useDocumentInfo();
  const [ListDrawer, , { closeDrawer, openDrawer }] = useListDrawer({
    collectionSlugs: ['media'],
    filterOptions,
    selectedCollection: 'media',
    uploads: true,
  });

  const isMediaField = field.relationTo === 'media';
  const isSingleMediaField = isMediaField && field.hasMany !== true;
  const canEditMediaField = isMediaField && !readOnly && !disabled;
  const canShowMediaPicker = isSingleMediaField && canEditMediaField;
  const isSaveDisabled = !modified || uploadStatus === 'uploading';

  return (
    <div>
      <UploadField {...props} />

      {canEditMediaField ? (
        <div
          style={{
            alignItems: 'center',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.5rem',
            marginTop: '0.75rem',
          }}
        >
          {canShowMediaPicker ? (
            <>
              <Button buttonStyle="secondary" onClick={openDrawer} size="small" type="button">
                {value ? 'Chọn ảnh khác từ Media' : 'Chọn ảnh từ Media'}
              </Button>
              <ListDrawer
                allowCreate={false}
                enableRowSelections={false}
                onSelect={({ doc }) => {
                  setValue(doc.id);
                  closeDrawer();
                }}
              />
            </>
          ) : null}
          <Button
            buttonStyle="primary"
            disabled={isSaveDisabled}
            onClick={() => void submit()}
            size="small"
            type="button"
          >
            Lưu thay đổi
          </Button>
          <span style={{ color: 'var(--theme-elevation-500)', fontSize: '0.85rem' }}>
            Sau khi chọn hoặc chỉnh ảnh, bấm Lưu thay đổi để lưu document.
          </span>
        </div>
      ) : null}
    </div>
  );
};
