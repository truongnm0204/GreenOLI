import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Oli Xanh – Giải pháp hóa chất nông nghiệp & kiểm soát côn trùng";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background:
            "linear-gradient(135deg, #80bc00 0%, #456800 50%, #410099 100%)",
          color: "white",
          fontFamily: "system-ui",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: 999,
              background: "white",
              color: "#456800",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 48,
              fontWeight: 800,
            }}
          >
            G
          </div>
          <div style={{ fontSize: 36, fontWeight: 700, letterSpacing: -1 }}>
            Oli Xanh
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              fontSize: 64,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: -2,
            }}
          >
            Giải pháp hóa chất xanh cho nông nghiệp & sức khỏe cộng đồng
          </div>
          <div style={{ fontSize: 24, opacity: 0.9 }}>
            10+ năm dẫn đầu thị trường · 500+ khách hàng tin tưởng
          </div>
        </div>

        <div style={{ display: "flex", gap: 24, fontSize: 20, opacity: 0.85 }}>
          <span>greenoli.vn</span>
          <span>·</span>
          <span>Hotline 1900 1234</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
