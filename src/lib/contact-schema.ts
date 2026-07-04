import { z } from "zod";

/**
 * Schema validate form liên hệ — dùng chung client (react-hook-form) và
 * server (route handler) để đảm bảo cùng một luật kiểm tra (DRY).
 */
export const ContactSchema = z.object({
  fullName: z
    .string()
    .min(2, "Vui lòng nhập họ và tên đầy đủ")
    .max(100, "Tên quá dài"),
  email: z.string().email("Email không hợp lệ"),
  phone: z
    .string()
    .min(9, "Số điện thoại không hợp lệ")
    .regex(/^[+0-9\s().-]+$/, "Chỉ chấp nhận số và ký tự +()-."),
  subject: z.string().min(3, "Vui lòng nhập chủ đề").max(120),
  message: z
    .string()
    .min(10, "Nội dung quá ngắn (tối thiểu 10 ký tự)")
    .max(2000, "Nội dung quá dài"),
  // Honeypot chống bot: người thật để trống. Không validate min để form hợp lệ.
  company: z.string().max(0, "").optional().or(z.literal("")),
});

export type ContactValues = z.infer<typeof ContactSchema>;
