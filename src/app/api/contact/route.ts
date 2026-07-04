import { NextRequest, NextResponse } from "next/server";
import { getPayloadClient } from "@/lib/payload-client";
import { ContactSchema } from "@/lib/contact-schema";
import { sendLeadNotification } from "@/lib/mailer";
import { checkRateLimit } from "@/lib/rate-limit";

/**
 * POST /api/contact — nhận contact form:
 * 1. rate-limit theo IP  2. honeypot chống bot  3. validate zod
 * 4. lưu lead vào DB      5. gửi email best-effort (lỗi email không chặn lưu lead)
 */
export async function POST(req: NextRequest) {
  // IP từ proxy header (Vercel/nginx) để rate-limit.
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { ok: false, error: "Bạn gửi quá nhiều lần. Vui lòng thử lại sau ít phút." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Dữ liệu không hợp lệ." }, { status: 400 });
  }

  // Honeypot: field ẩn "company" — bot thường điền, người thật để trống.
  // Trả ok giả để bot không biết bị chặn, nhưng không tạo lead.
  const honeypot = (body as Record<string, unknown>)?.company;
  if (typeof honeypot === "string" && honeypot.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const parsed = ContactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Vui lòng kiểm tra lại thông tin.", issues: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const data = parsed.data;

  try {
    const payload = await getPayloadClient();
    await payload.create({
      collection: "leads",
      data: { ...data, status: "new" },
    });
  } catch (err) {
    console.error("[contact] Lưu lead thất bại:", err);
    return NextResponse.json(
      { ok: false, error: "Có lỗi xảy ra. Vui lòng thử lại sau." },
      { status: 500 },
    );
  }

  // Email best-effort: không chặn phản hồi thành công nếu SMTP lỗi.
  void sendLeadNotification(data);

  return NextResponse.json({ ok: true });
}
