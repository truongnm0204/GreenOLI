"use client";

import type { TextFieldClientComponent } from "payload";
import { TextField, useField } from "@payloadcms/ui";

const YT =
  /(?:youtube\.com\/watch\?(?:[^#]*&)?v=|youtube\.com\/embed\/|youtube\.com\/shorts\/|youtu\.be\/)([A-Za-z0-9_-]{11})/i;
const VIMEO = /(?:vimeo\.com\/|player\.vimeo\.com\/video\/)(\d+)/i;

function toEmbed(raw: string): string | null {
  const url = raw.trim();
  if (!url) return null;
  const yt = url.match(YT);
  if (yt?.[1]) return `https://www.youtube.com/embed/${yt[1]}`;
  const vimeo = url.match(VIMEO);
  if (vimeo?.[1]) return `https://player.vimeo.com/video/${vimeo[1]}`;
  return null;
}

/**
 * Field URL video = TextField chuẩn + iframe preview trong admin (B3).
 */
export const VideoUrlField: TextFieldClientComponent = (props) => {
  const { path } = props;
  const { value } = useField<string>({ path });
  const str = typeof value === "string" ? value : "";
  const embed = toEmbed(str);

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
            Dán link YouTube hoặc Vimeo hợp lệ để xem preview tại đây (block Video).
          </p>
        )}
      </div>
    </div>
  );
};
