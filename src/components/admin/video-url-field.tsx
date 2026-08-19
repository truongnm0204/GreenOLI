"use client";

import type { TextFieldClientComponent } from "payload";
import { TextField, useField } from "@payloadcms/ui";
import { toVideoEmbedUrl } from "@/lib/video-embed";

/**
 * Field URL video = TextField chuẩn + iframe preview trong admin.
 * Hỗ trợ watch / live / shorts / youtu.be / embed / iframe paste.
 */
export const VideoUrlField: TextFieldClientComponent = (props) => {
  const { path } = props;
  const { value } = useField<string>({ path });
  const str = typeof value === "string" ? value : "";
  const embed = toVideoEmbedUrl(str);

  return (
    <div>
      <TextField {...props} />
      <div
        style={{
          marginTop: 12,
          borderRadius: 12,
          overflow: "hidden",
          border: "1px solid var(--theme-elevation-150)",
          background: "var(--theme-elevation-50)",
        }}
      >
        {embed ? (
          <div style={{ position: "relative", paddingTop: "56.25%" }}>
            <iframe
              src={embed}
              title="Xem trước video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{
                border: 0,
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
              }}
            />
          </div>
        ) : (
          <p
            style={{
              margin: 0,
              padding: "16px 14px",
              color: "var(--theme-elevation-500)",
              fontSize: 13,
              lineHeight: 1.45,
            }}
          >
            Dán link YouTube/Vimeo (watch, live, shorts, youtu.be) hoặc thẻ iframe
            để xem preview. Ví dụ: https://www.youtube.com/live/…
          </p>
        )}
      </div>
    </div>
  );
};
