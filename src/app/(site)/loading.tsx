import Image from "next/image";

export default function Loading() {
  return (
    <main
      className="oli-loader"
      role="status"
      aria-live="polite"
      aria-label="Đang tải nội dung"
    >
      <div className="oli-loader__content">
        <div className="oli-loader__molecule">
          <span className="oli-loader__orbit">
            <span className="oli-loader__dot oli-loader__dot--one" />
            <span className="oli-loader__dot oli-loader__dot--two" />
            <span className="oli-loader__dot oli-loader__dot--three" />
          </span>
          <div className="oli-loader__logo">
            <Image
              src="/logo.svg"
              alt="Oli Xanh Logo"
              width={190}
              height={70}
              priority
              className="w-[160px] md:w-[190px] h-auto object-contain"
            />
          </div>
        </div>
        <p className="oli-loader__text">
          Đang chuẩn bị giải pháp xanh…
        </p>
        <div className="oli-loader__progress" aria-hidden="true">
          <span />
        </div>
      </div>
    </main>
  );
}
