import nodemailer from "nodemailer";
import type { ContactValues } from "@/lib/contact-schema";

/**
 * Mailer qua SMTP (Nodemailer). Cấu hình từ SMTP_* env.
 * Dùng gửi email thông báo lead mới tới LEAD_NOTIFY_EMAIL.
 */

const smtpConfigured = Boolean(
  process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS,
);

const transporter = smtpConfigured
  ? nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      // 465 = SMTPS (secure); các port khác (587/25) dùng STARTTLS.
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })
  : null;

const escapeHtml = (s: string): string =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

/**
 * Gửi email thông báo lead mới. Trả false nếu SMTP chưa cấu hình hoặc gửi lỗi
 * (caller coi email là best-effort, không chặn việc lưu lead).
 */
export async function sendLeadNotification(lead: ContactValues): Promise<boolean> {
  const to = process.env.LEAD_NOTIFY_EMAIL;
  if (!transporter || !to) {
    console.warn("[mailer] SMTP/LEAD_NOTIFY_EMAIL chưa cấu hình — bỏ qua gửi email.");
    return false;
  }

  const rows: Array<[string, string]> = [
    ["Họ tên", lead.fullName],
    ["Email", lead.email],
    ["Điện thoại", lead.phone],
    ["Chủ đề", lead.subject],
    ["Nội dung", lead.message],
  ];

  const html = `
    <h2>Yêu cầu liên hệ mới từ website Oli Xanh</h2>
    <table cellpadding="8" style="border-collapse:collapse;font-family:sans-serif">
      ${rows
        .map(
          ([k, v]) =>
            `<tr><td style="border:1px solid #ddd;font-weight:600">${k}</td>` +
            `<td style="border:1px solid #ddd">${escapeHtml(v)}</td></tr>`,
        )
        .join("")}
    </table>
  `;

  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n");

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to,
      replyTo: lead.email,
      subject: `[Liên hệ] ${lead.subject} — ${lead.fullName}`,
      text,
      html,
    });
    return true;
  } catch (err) {
    console.error("[mailer] Gửi email lead thất bại:", err);
    return false;
  }
}
