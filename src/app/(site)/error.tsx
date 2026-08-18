"use client";

import * as React from "react";
import Link from "next/link";
import { AlertTriangle, Home, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SiteError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    console.error("[site error boundary]", error);
  }, [error]);

  return (
    <div className="container-page flex min-h-[50vh] flex-col items-center justify-center py-20 text-center">
      <span className="mb-6 grid size-16 place-items-center rounded-2xl bg-red-50 text-red-600">
        <AlertTriangle className="size-8" aria-hidden />
      </span>
      <h1 className="text-2xl font-bold text-text-primary md:text-3xl">
        Đã xảy ra lỗi
      </h1>
      <p className="mt-3 max-w-md text-text-muted">
        Trang tạm thời không hiển thị được. Bạn có thể thử lại hoặc quay về
        trang chủ.
      </p>
      {error.digest ? (
        <p className="mt-2 text-xs text-text-muted/80">Mã: {error.digest}</p>
      ) : null}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Button type="button" onClick={reset} className="font-semibold">
          <RotateCcw className="size-4" aria-hidden />
          Thử lại
        </Button>
        <Button href="/" variant="secondary" className="font-semibold">
          <Home className="size-4" aria-hidden />
          Trang chủ
        </Button>
        <Link
          href="/lien-he"
          className="text-sm font-medium text-primary-dark underline-offset-4 hover:underline"
        >
          Liên hệ hỗ trợ
        </Link>
      </div>
    </div>
  );
}
