import {
  FlaskConical,
  Sparkles,
  AlertTriangle,
  Package,
  Award,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import type { Product } from "@/types/product";

type Props = {
  product: Product;
};

export function ProductSpecs({ product }: Props) {
  const sections = [
    {
      icon: FlaskConical,
      title: "Thành phần",
      body: product.composition,
    },
    {
      icon: Sparkles,
      title: "Hướng dẫn sử dụng",
      body: product.usage,
    },
    {
      icon: AlertTriangle,
      title: "Cảnh báo & an toàn",
      body: product.warning,
      tone: "warning" as const,
    },
    {
      icon: Package,
      title: "Quy cách đóng gói",
      body: product.packaging,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-5 md:grid-cols-2">
        {sections.map(({ icon: Icon, title, body, tone }) => (
          <Card key={title} className="space-y-3">
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
              <h3 className="font-semibold text-text-primary text-lg">{title}</h3>
            </div>
            <p className="text-text-muted leading-relaxed whitespace-pre-line">
              {body}
            </p>
          </Card>
        ))}
      </div>

      <Card className="space-y-3">
        <div className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-full bg-secondary/10 text-secondary-strong">
            <Award className="size-5" aria-hidden />
          </span>
          <h3 className="font-semibold text-text-primary text-lg">
            Chứng nhận an toàn
          </h3>
        </div>
        <ul className="grid sm:grid-cols-2 gap-2 text-text-muted">
          {product.certifications.map((cert) => (
            <li key={cert} className="flex items-start gap-2">
              <span className="text-primary-dark mt-1.5">•</span>
              <span>{cert}</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
