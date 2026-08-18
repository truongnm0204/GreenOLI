"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Send, AlertCircle, Loader2 } from "lucide-react";
import { Input, Textarea } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ContactSchema, type ContactValues } from "@/lib/contact-schema";
import { trackContactSubmit } from "@/lib/analytics";

function firstParam(value: string | null): string {
  return (value ?? "").trim();
}

/** Build subject/message from ?product=&name=&qc=&variant= deep-links. */
export function prefillFromSearchParams(sp: {
  get(name: string): string | null;
}): Pick<ContactValues, "subject" | "message"> {
  const productSlug = firstParam(sp.get("product"));
  const productName = firstParam(sp.get("name")) || productSlug;
  const qc = firstParam(sp.get("qc"));
  const variant = firstParam(sp.get("variant"));
  const subjectIn = firstParam(sp.get("subject"));
  const messageIn = firstParam(sp.get("message"));

  if (subjectIn || messageIn) {
    return {
      subject: subjectIn.slice(0, 120),
      message: messageIn.slice(0, 2000),
    };
  }

  if (!productSlug && !productName) {
    return { subject: "", message: "" };
  }

  const label = productName || productSlug;
  const subject = `Tư vấn / báo giá: ${label}`.slice(0, 120);
  const lines = [
    `Tôi quan tâm sản phẩm: ${label}.`,
    productSlug && productSlug !== label ? `Mã / slug: ${productSlug}` : "",
    qc ? `Quy cách: ${qc}` : "",
    variant && !qc ? `Mã quy cách: ${variant}` : "",
    "",
    "Nhu cầu / ghi chú:",
    "- ",
  ].filter((line, i, arr) => line !== "" || (i > 0 && arr[i - 1] !== ""));

  return {
    subject,
    message: lines.join("\n").slice(0, 2000),
  };
}

export function ContactForm() {
  const searchParams = useSearchParams();
  const prefill = React.useMemo(
    () => prefillFromSearchParams(searchParams),
    [searchParams],
  );

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
      subject: prefill.subject,
      message: prefill.message,
      company: "",
    },
  });

  // Khi user đổi query (client navigate) → cập nhật subject/message nếu form chưa dirty nhiều.
  React.useEffect(() => {
    reset((prev) => ({
      ...prev,
      subject: prefill.subject || prev.subject,
      message: prefill.message || prev.message,
    }));
  }, [prefill.subject, prefill.message, reset]);

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
      trackContactSubmit(
        firstParam(searchParams.get("product"))
          ? "product_quote"
          : "contact_form",
      );
      setSubmitted(true);
      reset({
        fullName: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        company: "",
      });
      setTimeout(() => setSubmitted(false), 5000);
    } catch {
      setErrorMsg("Không kết nối được máy chủ. Vui lòng thử lại sau.");
    }
  };

  const productHint =
    firstParam(searchParams.get("name")) ||
    firstParam(searchParams.get("product"));

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4"
      aria-label="Form liên hệ"
      noValidate
    >
      {productHint ? (
        <p
          role="status"
          className="rounded-xl border border-primary/25 bg-primary/8 px-4 py-3 text-sm text-text-primary"
        >
          Đang yêu cầu tư vấn cho:{" "}
          <span className="font-semibold text-primary-dark">{productHint}</span>
          {firstParam(searchParams.get("qc")) ? (
            <>
              {" "}
              · Quy cách:{" "}
              <span className="font-medium">
                {firstParam(searchParams.get("qc"))}
              </span>
            </>
          ) : null}
        </p>
      ) : null}

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

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full sm:w-auto font-bold"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden />
            Đang gửi thông tin...
          </>
        ) : (
          <>
            <Send className="size-4" aria-hidden />
            Gửi yêu cầu
          </>
        )}
      </Button>

      {submitted ? (
        <p
          role="status"
          className="flex items-start gap-2 rounded-input bg-primary/10 p-3 text-sm text-primary-dark animate-fade-up"
        >
          <CheckCircle2 className="size-5 flex-none mt-0.5" aria-hidden />
          Cảm ơn bạn đã liên hệ. Đội ngũ Oli Xanh sẽ phản hồi trong vòng 24 giờ.
        </p>
      ) : null}

      {errorMsg ? (
        <p
          role="alert"
          className="flex items-start gap-2 rounded-input bg-red-50 p-3 text-sm text-red-600 animate-slide-in-right"
        >
          <AlertCircle className="size-5 flex-none mt-0.5" aria-hidden />
          {errorMsg}
        </p>
      ) : null}
    </form>
  );
}
