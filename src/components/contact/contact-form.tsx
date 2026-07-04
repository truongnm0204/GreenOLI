"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Send, AlertCircle } from "lucide-react";
import { Input, Textarea } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ContactSchema, type ContactValues } from "@/lib/contact-schema";

export function ContactForm() {
  const [submitted, setSubmitted] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);
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
    setErrorMsg(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        setErrorMsg(json.error ?? "Gửi không thành công. Vui lòng thử lại.");
        return;
      }
      setSubmitted(true);
      reset();
      setTimeout(() => setSubmitted(false), 5000);
    } catch {
      setErrorMsg("Không kết nối được máy chủ. Vui lòng thử lại sau.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4"
      aria-label="Form liên hệ"
      noValidate
    >
      {/* Honeypot chống bot: ẩn với người dùng thật, bot điền sẽ bị bỏ qua. */}
      <input
        type="text"
        {...register("company")}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />
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
          className="flex items-start gap-2 rounded-input bg-primary/10 p-3 text-sm text-primary-dark animate-fade-up"
        >
          <CheckCircle2 className="size-5 flex-none mt-0.5" aria-hidden />
          Cảm ơn bạn đã liên hệ. Đội ngũ Green Oli sẽ phản hồi trong vòng 24 giờ.
        </p>
      ) : null}
    </form>
  );
}
