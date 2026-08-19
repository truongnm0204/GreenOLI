import {
  FileText,
  Download,
  BookOpen,
  Shield,
  Wrench,
  File,
} from "lucide-react";
import type { ProductAttachment } from "@/types/product";
import { Card } from "@/components/ui/card";

const TYPE_META: Record<
  ProductAttachment["type"],
  { label: string; icon: typeof FileText }
> = {
  msds: { label: "MSDS", icon: Shield },
  catalogue: { label: "Catalogue", icon: BookOpen },
  manual: { label: "Hướng dẫn", icon: Wrench },
  technical: { label: "Kỹ thuật", icon: FileText },
  other: { label: "Tài liệu", icon: File },
};

function formatSize(bytes?: number): string | null {
  if (!bytes || bytes <= 0) return null;
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

type Props = {
  attachments: ProductAttachment[];
  productName: string;
};

/**
 * Danh sách tài liệu đính kèm (MSDS, catalogue…) trên trang SP.
 */
export function ProductAttachments({ attachments, productName }: Props) {
  const list = (attachments ?? []).filter((a) => a.fileUrl);
  if (!list.length) return null;

  return (
    <div className="space-y-4">
      <div className="max-w-3xl">
        <h2 className="text-2xl font-bold text-text-primary md:text-3xl">
          Tài liệu sản phẩm
        </h2>
        <p className="mt-1.5 text-sm text-text-muted md:text-base">
          MSDS, catalogue và hướng dẫn liên quan tới {productName}
        </p>
      </div>

      <ul className="grid gap-3 sm:grid-cols-2">
        {list.map((doc) => {
          const meta = TYPE_META[doc.type] ?? TYPE_META.other;
          const Icon = meta.icon;
          const size = formatSize(doc.fileSize);
          return (
            <li key={doc.id}>
              <Card className="flex h-full items-start gap-3 p-4 transition-shadow hover:shadow-ambient">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary-dark">
                  <Icon className="size-5" aria-hidden />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">
                    {meta.label}
                  </p>
                  <p className="mt-0.5 truncate font-semibold text-text-primary">
                    {doc.label}
                  </p>
                  <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                    {size ? (
                      <span className="text-text-muted">{size}</span>
                    ) : null}
                    {doc.mimeType ? (
                      <span className="text-text-muted">
                        {doc.mimeType.includes("pdf")
                          ? "PDF"
                          : doc.mimeType.split("/").pop()?.toUpperCase()}
                      </span>
                    ) : null}
                    <a
                      href={doc.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-semibold text-primary-dark underline-offset-2 hover:underline"
                    >
                      <Download className="size-3.5" aria-hidden />
                      Tải / mở
                    </a>
                  </div>
                </div>
              </Card>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
