"use client";

import { Check, Package } from "lucide-react";
import { cn } from "@/lib/cn";
import { useProductPurchase } from "@/components/shop/product-purchase-context";
import { Button } from "@/components/ui/button";

/**
 * Bảng so sánh / chọn nhanh quy cách — hiện khi ≥ 2 packaging options.
 */
export function ProductVariantCompare() {
  const {
    product,
    selectedOptionId,
    setSelectedOptionId,
    quoteHref,
  } = useProductPurchase();

  const options = product.packagingOptions ?? [];
  if (options.length < 2) return null;

  return (
    <div className="space-y-4">
      <div className="max-w-3xl">
        <h2 className="flex items-center gap-2 text-2xl font-bold text-text-primary md:text-3xl">
          <Package className="size-7 text-primary-dark" aria-hidden />
          So sánh quy cách
        </h2>
        <p className="mt-1.5 text-sm text-text-muted md:text-base">
          Chọn quy cách phù hợp — báo giá sẽ kèm đúng lựa chọn của bạn
        </p>
      </div>

      {/* Mobile cards */}
      <ul className="grid gap-3 sm:hidden">
        {options.map((opt) => {
          const selected = selectedOptionId === opt.id;
          return (
            <li key={opt.id}>
              <button
                type="button"
                onClick={() => setSelectedOptionId(opt.id)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-2xl border p-3 text-left transition-all",
                  selected
                    ? "border-primary bg-primary/10 ring-2 ring-primary/25"
                    : "border-border-soft bg-white hover:border-primary/40",
                )}
              >
                {opt.variantImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={opt.variantImage}
                    alt=""
                    className="size-14 shrink-0 rounded-xl border border-border-soft/50 bg-surface-light object-contain"
                  />
                ) : (
                  <span className="grid size-14 shrink-0 place-items-center rounded-xl bg-surface-light text-text-muted">
                    <Package className="size-6" aria-hidden />
                  </span>
                )}
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold text-text-primary">
                    {opt.label}
                  </span>
                  <span className="mt-0.5 block text-sm text-text-muted">
                    {opt.quantity} {opt.unitSymbol}
                    {opt.unitName ? ` · ${opt.unitName}` : ""}
                  </span>
                </span>
                {selected ? (
                  <Check
                    className="size-5 shrink-0 text-primary-dark"
                    aria-label="Đang chọn"
                  />
                ) : null}
              </button>
            </li>
          );
        })}
      </ul>

      {/* Desktop table */}
      <div className="hidden overflow-x-auto rounded-2xl border border-border-soft bg-white shadow-sm sm:block">
        <table className="w-full min-w-[520px] border-collapse text-left text-sm md:text-base">
          <thead>
            <tr className="border-b border-border-soft bg-surface-container/80">
              <th className="px-4 py-3 font-semibold text-text-primary">
                Quy cách
              </th>
              <th className="px-4 py-3 font-semibold text-text-primary">
                Số lượng
              </th>
              <th className="px-4 py-3 font-semibold text-text-primary">
                Đơn vị
              </th>
              <th className="px-4 py-3 font-semibold text-text-primary">
                Ảnh
              </th>
              <th className="px-4 py-3 font-semibold text-text-primary">
                Chọn
              </th>
            </tr>
          </thead>
          <tbody>
            {options.map((opt) => {
              const selected = selectedOptionId === opt.id;
              return (
                <tr
                  key={opt.id}
                  className={cn(
                    "border-b border-border-soft/70 last:border-0",
                    selected && "bg-primary/5",
                  )}
                >
                  <td className="px-4 py-3 font-semibold text-text-primary">
                    {opt.label}
                  </td>
                  <td className="px-4 py-3 tabular-nums text-text-muted">
                    {opt.quantity}
                  </td>
                  <td className="px-4 py-3 text-text-muted">
                    {opt.unitSymbol}
                    {opt.unitName ? (
                      <span className="text-text-muted/80">
                        {" "}
                        ({opt.unitName})
                      </span>
                    ) : null}
                  </td>
                  <td className="px-4 py-3">
                    {opt.variantImage ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={opt.variantImage}
                        alt={opt.label}
                        className="size-12 rounded-lg border border-border-soft/50 bg-surface-light object-contain"
                      />
                    ) : (
                      <span className="text-xs text-text-muted">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      onClick={() => setSelectedOptionId(opt.id)}
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold transition-colors",
                        selected
                          ? "bg-primary text-on-primary"
                          : "bg-surface-light text-text-primary hover:bg-primary/10 hover:text-primary-dark",
                      )}
                      aria-pressed={selected}
                    >
                      {selected ? (
                        <>
                          <Check className="size-3.5" aria-hidden />
                          Đang chọn
                        </>
                      ) : (
                        "Chọn"
                      )}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Button href={quoteHref} size="lg" className="h-11 px-6">
          Báo giá quy cách đã chọn
        </Button>
        <a
          href="#bao-gia"
          className="text-sm font-semibold text-primary-dark underline-offset-2 hover:underline"
        >
          Xem form liên hệ đầy đủ
        </a>
      </div>
    </div>
  );
}
