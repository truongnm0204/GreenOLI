"use client";

import * as React from "react";
import {
  FlaskConical,
  Sparkles,
  AlertTriangle,
  Award,
  ChevronDown,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/cn";
import type { Product } from "@/types/product";

type Props = {
  product: Product;
};

type SpecSection = {
  id: string;
  icon: typeof FlaskConical;
  title: string;
  body: string;
  tone?: "warning";
  /** Mobile: mở mặc định */
  defaultOpen?: boolean;
};

/**
 * ProductSpecs — desktop grid cards; mobile accordion (đỡ scroll dài).
 */
export function ProductSpecs({ product }: Props) {
  const rawSections: SpecSection[] = [
    {
      id: "thanh-phan",
      icon: FlaskConical,
      title: "Thành phần",
      body: product.composition,
      defaultOpen: true,
    },
    {
      id: "huong-dan",
      icon: Sparkles,
      title: "Hướng dẫn sử dụng",
      body: product.usage,
    },
    {
      id: "canh-bao",
      icon: AlertTriangle,
      title: "Cảnh báo & an toàn",
      body: product.warning,
      tone: "warning" as const,
      defaultOpen: true,
    },
  ];
  const sections = rawSections.filter((s) => Boolean(s.body?.trim()));

  const [open, setOpen] = React.useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = {};
    for (const s of sections) {
      init[s.id] = Boolean(s.defaultOpen);
    }
    return init;
  });

  const toggle = (id: string) => {
    setOpen((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-6">
      {/* Mobile accordion */}
      <div className="space-y-3 md:hidden">
        {sections.map(({ id, icon: Icon, title, body, tone }) => {
          const isOpen = open[id];
          return (
            <div
              key={id}
              className={cn(
                "overflow-hidden rounded-2xl border bg-white shadow-sm",
                tone === "warning"
                  ? "border-error/25"
                  : "border-border-soft/70",
              )}
            >
              <button
                type="button"
                onClick={() => toggle(id)}
                aria-expanded={isOpen}
                className="flex w-full items-center gap-3 px-4 py-3.5 text-left"
              >
                <span
                  className={cn(
                    "grid size-10 shrink-0 place-items-center rounded-full",
                    tone === "warning"
                      ? "bg-error-container text-error"
                      : "bg-primary/10 text-primary-dark",
                  )}
                >
                  <Icon className="size-5" aria-hidden />
                </span>
                <span className="min-w-0 flex-1 text-base font-semibold text-text-primary">
                  {title}
                </span>
                <ChevronDown
                  className={cn(
                    "size-5 shrink-0 text-text-muted transition-transform duration-200",
                    isOpen && "rotate-180",
                  )}
                  aria-hidden
                />
              </button>
              {isOpen ? (
                <div className="border-t border-border-soft/60 px-4 pb-4 pt-3">
                  <p className="whitespace-pre-line text-sm leading-relaxed text-text-muted">
                    {body}
                  </p>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>

      {/* Desktop / tablet grid */}
      <div className="hidden gap-4 md:grid md:grid-cols-2 md:gap-5 lg:grid-cols-3">
        {sections.map(({ icon: Icon, title, body, tone }) => (
          <Card key={title} className="h-full space-y-3">
            <div className="flex items-center gap-3">
              <span
                className={
                  tone === "warning"
                    ? "grid size-10 place-items-center rounded-full bg-error-container text-error"
                    : "grid size-10 place-items-center rounded-full bg-primary/10 text-primary-dark"
                }
              >
                <Icon className="size-5" aria-hidden />
              </span>
              <h3 className="text-lg font-semibold text-text-primary">{title}</h3>
            </div>
            <p className="whitespace-pre-line text-sm leading-relaxed text-text-muted md:text-base">
              {body}
            </p>
          </Card>
        ))}
      </div>

      {product.certifications.length > 0 && (
        <Card className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-full bg-secondary/10 text-secondary-strong">
              <Award className="size-5" aria-hidden />
            </span>
            <h3 className="text-lg font-semibold text-text-primary">
              Chứng nhận an toàn
            </h3>
          </div>
          <ul className="grid gap-2 text-text-muted sm:grid-cols-2">
            {product.certifications.map((cert) => (
              <li key={cert} className="flex items-start gap-2">
                <span className="mt-1.5 text-primary-dark">•</span>
                <span>{cert}</span>
              </li>
            ))}
          </ul>
        </Card>
      )}
    </div>
  );
}
