'use client';

import type { UploadFieldClientComponent } from 'payload';
import {
  Button,
  UploadField,
  useDocumentInfo,
  useField,
  useForm,
  useFormModified,
} from '@payloadcms/ui';

/**
 * Field ảnh/video cho admin:
 * - Dùng native UploadField (kéo-thả / chọn file mới) — lưu local trên máy chủ.
 * - Không nhấn mạnh "thư viện Cloudinary"; file chỉ nằm public/media.
 * - Nút Lưu nhanh sau khi đổi ảnh.
 */
export const MediaUploadField: UploadFieldClientComponent = (props) => {
  const { field, path, readOnly } = props;
  const { disabled } = useField({ path });
  const { submit } = useForm();
  const modified = useFormModified();
  const { uploadStatus } = useDocumentInfo();

  const isMediaField = field.relationTo === 'media';
  const canEdit = isMediaField && !readOnly && !disabled;
  const isSaveDisabled = !modified || uploadStatus === 'uploading';

  return (
    <div>
      <UploadField {...props} />

      {canEdit ? (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            marginTop: '0.75rem',
          }}
        >
          <p
            style={{
              color: 'var(--theme-elevation-500)',
              fontSize: '0.85rem',
              lineHeight: 1.45,
              margin: 0,
            }}
          >
            Kéo thả hoặc chọn ảnh/video mới — file lưu trên máy chủ (
            <code>public/media</code>), không lên Cloudinary. Nút
            &quot;Chọn file đã tải trên máy chủ&quot; chỉ tái dùng file local
            đã upload trước đó, không phải thư viện cloud.
          </p>

          <div>
            <Button
              buttonStyle="primary"
              disabled={isSaveDisabled}
              onClick={() => void submit()}
              size="small"
              type="button"
            >
              Lưu thay đổi
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
};
