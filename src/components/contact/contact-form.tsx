"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2, Send } from "lucide-react";
import { Input, Textarea } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const ContactSchema = z.object({
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
});

type ContactValues = z.infer<typeof ContactSchema>;

export function ContactForm() {
  const [submitted, setSubmitted] = React.useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactValues>({
    resolver: zodResolver(ContactSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactValues) => {
    // Backend chưa kết nối ở phase UI — log + simulate.
    console.log("[contact-form] submitted", data);
    await new Promise((r) => setTimeout(r, 600));
    setSubmitted(true);
    reset();
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4"
      aria-label="Form liên hệ"
      noValidate
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          label="Họ và tên"
          placeholder="Nguyễn Văn A"
          autoComplete="name"
          error={errors.fullName?.message}
          {...register("fullName")}
        />
        <Input
          label="Số điện thoại"
          type="tel"
          placeholder="0901 234 567"
          autoComplete="tel"
          error={errors.phone?.message}
          {...register("phone")}
        />
      </div>
      <Input
        label="Email"
        type="email"
        placeholder="ban@congty.vn"
        autoComplete="email"
        error={errors.email?.message}
        {...register("email")}
      />
      <Input
        label="Chủ đề"
        placeholder="Tư vấn dịch vụ kiểm soát côn trùng"
        error={errors.subject?.message}
        {...register("subject")}
      />
      <Textarea
        label="Nội dung"
        placeholder="Mô tả ngắn gọn nhu cầu của bạn..."
        error={errors.message?.message}
        {...register("message")}
      />

      <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
        <Send className="size-4" aria-hidden />
        {isSubmitting ? "Đang gửi..." : "Gửi yêu cầu"}
      </Button>

      {submitted ? (
        <p
          role="status"
          className="flex items-start gap-2 rounded-input bg-primary/10 p-3 text-sm text-primary-dark"
        >
          <CheckCircle2 className="size-5 flex-none mt-0.5" aria-hidden />
          Cảm ơn bạn đã liên hệ. Đội ngũ Green Oli sẽ phản hồi trong vòng 24 giờ.
        </p>
      ) : null}
    </form>
  );
}
