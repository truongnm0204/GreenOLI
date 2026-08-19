"use client";

import * as React from "react";
import type { PackagingOption, Product } from "@/types/product";

type ProductPurchaseContextValue = {
  product: Product;
  selectedOption: PackagingOption | null;
  selectedOptionId: string | null;
  setSelectedOptionId: (id: string | null) => void;
  quoteHref: string;
};

const ProductPurchaseContext =
  React.createContext<ProductPurchaseContextValue | null>(null);

export function ProductPurchaseProvider({
  product,
  children,
}: {
  product: Product;
  children: React.ReactNode;
}) {
  const [selectedOptionId, setSelectedOptionId] = React.useState<string | null>(
    product.packagingOptions[0]?.id ?? null,
  );

  const selectedOption =
    product.packagingOptions.find((o) => o.id === selectedOptionId) ?? null;

  const quoteHref = React.useMemo(() => {
    const params = new URLSearchParams({
      product: product.slug,
      name: product.name,
    });
    if (selectedOption) {
      params.set("variant", selectedOption.id);
      params.set("qc", selectedOption.label);
    }
    return `/lien-he?${params.toString()}`;
  }, [product.slug, product.name, selectedOption]);

  const value = React.useMemo(
    () => ({
      product,
      selectedOption,
      selectedOptionId,
      setSelectedOptionId,
      quoteHref,
    }),
    [product, selectedOption, selectedOptionId, quoteHref],
  );

  return (
    <ProductPurchaseContext.Provider value={value}>
      {children}
    </ProductPurchaseContext.Provider>
  );
}

export function useProductPurchase() {
  const ctx = React.useContext(ProductPurchaseContext);
  if (!ctx) {
    throw new Error("useProductPurchase must be used within ProductPurchaseProvider");
  }
  return ctx;
}
