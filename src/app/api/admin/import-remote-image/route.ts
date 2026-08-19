import { NextRequest, NextResponse } from "next/server";
import { getPayloadClient } from "@/lib/payload-client";

export const runtime = "nodejs";

const MAX_BYTES = 12 * 1024 * 1024; // 12MB
const ALLOWED = new Set([
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/avif",
  "image/svg+xml",
]);

function pickExt(mime: string, urlPath: string): string {
  const fromMime: Record<string, string> = {
    "image/jpeg": "jpg",
    "image/jpg": "jpg",
    "image/png": "png",
    "image/gif": "gif",
    "image/webp": "webp",
    "image/avif": "avif",
    "image/svg+xml": "svg",
  };
  if (fromMime[mime]) return fromMime[mime];
  const m = urlPath.match(/\.([a-zA-Z0-9]{2,5})(?:$|\?)/);
  return m?.[1]?.toLowerCase() || "jpg";
}

function safeName(base: string, ext: string): string {
  const cleaned = base
    .replace(/\.[a-zA-Z0-9]{2,5}$/, "")
    .replace(/[^a-zA-Z0-9._-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
  return `${cleaned || "pasted-image"}-${Date.now()}.${ext}`;
}

/**
 * POST /api/admin/import-remote-image
 * Body: { url: string, alt?: string }
 * Downloads image server-side (bypass browser CORS) and creates a Media doc.
 * Requires logged-in Payload user (cookie auth).
 */
export async function POST(req: NextRequest) {
  let body: { url?: string; alt?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "JSON không hợp lệ." }, { status: 400 });
  }

  const rawUrl = typeof body.url === "string" ? body.url.trim() : "";
  if (!rawUrl || (!rawUrl.startsWith("http://") && !rawUrl.startsWith("https://"))) {
    return NextResponse.json(
      { ok: false, error: "URL ảnh không hợp lệ." },
      { status: 400 },
    );
  }

  let parsed: URL;
  try {
    parsed = new URL(rawUrl);
  } catch {
    return NextResponse.json({ ok: false, error: "URL không parse được." }, { status: 400 });
  }
  if (!["http:", "https:"].includes(parsed.protocol)) {
    return NextResponse.json({ ok: false, error: "Chỉ hỗ trợ http/https." }, { status: 400 });
  }

  const payload = await getPayloadClient();

  // Auth: must be logged into admin
  const { user } = await payload.auth({ headers: req.headers });
  if (!user) {
    return NextResponse.json(
      { ok: false, error: "Cần đăng nhập admin để import ảnh." },
      { status: 401 },
    );
  }

  let remote: Response;
  try {
    remote = await fetch(rawUrl, {
      redirect: "follow",
      headers: {
        // Một số CDN chặn bot không UA
        "User-Agent":
          "Mozilla/5.0 (compatible; GreenOLI-Importer/1.0; +http://localhost)",
        Accept: "image/*,*/*;q=0.8",
        Referer: parsed.origin + "/",
      },
      signal: AbortSignal.timeout(20000),
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "fetch failed";
    return NextResponse.json(
      { ok: false, error: `Không tải được ảnh: ${msg}` },
      { status: 502 },
    );
  }

  if (!remote.ok) {
    return NextResponse.json(
      { ok: false, error: `Máy chủ ảnh trả ${remote.status}` },
      { status: 502 },
    );
  }

  const mimeRaw = (remote.headers.get("content-type") || "").split(";")[0].trim().toLowerCase();
  const buf = Buffer.from(await remote.arrayBuffer());
  if (buf.byteLength === 0) {
    return NextResponse.json({ ok: false, error: "File ảnh rỗng." }, { status: 502 });
  }
  if (buf.byteLength > MAX_BYTES) {
    return NextResponse.json(
      { ok: false, error: "Ảnh quá lớn (>12MB)." },
      { status: 413 },
    );
  }

  // Sniff mime if header missing / wrong
  let mime = mimeRaw;
  if (!ALLOWED.has(mime)) {
    if (buf[0] === 0xff && buf[1] === 0xd8) mime = "image/jpeg";
    else if (buf[0] === 0x89 && buf[1] === 0x50) mime = "image/png";
    else if (buf[0] === 0x47 && buf[1] === 0x49) mime = "image/gif";
    else if (buf.toString("ascii", 0, 4) === "RIFF" && buf.toString("ascii", 8, 12) === "WEBP")
      mime = "image/webp";
    else if (buf.toString("utf8", 0, 100).includes("<svg")) mime = "image/svg+xml";
  }

  if (!ALLOWED.has(mime)) {
    return NextResponse.json(
      {
        ok: false,
        error: `Định dạng không hỗ trợ (${mime || "unknown"}). Chỉ ảnh JPEG/PNG/GIF/WebP/AVIF/SVG.`,
      },
      { status: 415 },
    );
  }

  const pathName = parsed.pathname || "/image";
  const base = pathName.split("/").filter(Boolean).pop() || "pasted-image";
  const filename = safeName(decodeURIComponent(base), pickExt(mime, pathName));
  const alt =
    (typeof body.alt === "string" && body.alt.trim()) ||
    filename.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " ");

  try {
    const doc = await payload.create({
      collection: "media",
      data: { alt },
      file: {
        data: buf,
        mimetype: mime,
        name: filename,
        size: buf.byteLength,
      },
      user,
      overrideAccess: false,
    });

    return NextResponse.json({
      ok: true,
      doc: {
        id: doc.id,
        alt: doc.alt,
        url: doc.url,
        filename: doc.filename,
      },
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "create media failed";
    console.error("[import-remote-image]", msg);
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
