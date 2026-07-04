import Link from "next/link";
import { Home, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="container-page py-20 md:py-28 text-center">
      <p className="font-bold text-7xl md:text-9xl bg-gradient-to-br from-primary to-primary-dark bg-clip-text text-transparent">
        404
      </p>
      <h1 className="mt-6 font-bold text-2xl md:text-3xl text-text-primary">
        Không tìm thấy trang bạn yêu cầu
      </h1>
      <p className="mt-3 max-w-md mx-auto text-text-muted">
        Có thể trang đã bị di chuyển, đổi tên hoặc tạm thời không khả dụng. Bạn có thể quay lại
        trang chủ hoặc khám phá danh mục sản phẩm.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button href="/">
          <Home className="size-5" aria-hidden />
          Trang chủ
        </Button>
        <Button href="/cua-hang" variant="outline">
          Xem sản phẩm
          <ArrowRight className="size-5" aria-hidden />
        </Button>
      </div>
    </section>
  );
}

// Required so Next.js doesn't shake away the unused Link import in some bundlers
export const _ = Link;
