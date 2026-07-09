"use client";

import * as React from "react";
import { CategoryCard } from "./category-card";
import { BrandCard } from "./brand-card";
import type { Category } from "@/types/category";
import type { Brand } from "@/types/brand";
import { cn } from "@/lib/cn";
import { motion, AnimatePresence } from "framer-motion";

type ShopTabsProps = {
  categories: Category[];
  brands: Brand[];
};

export function ShopTabs({ categories, brands }: ShopTabsProps) {
  const [activeTab, setActiveTab] = React.useState<"category" | "brand">("category");

  return (
    <div className="space-y-8">
      <div className="flex justify-center">
        <div className="inline-flex bg-surface-container-lowest p-1 rounded-full shadow-sm border border-border-soft">
          <button
            onClick={() => setActiveTab("category")}
            className={cn(
              "px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300",
              activeTab === "category" 
                ? "bg-primary text-on-primary shadow-sm" 
                : "text-text-muted hover:text-text-primary hover:bg-surface-light"
            )}
          >
            Theo mục đích sử dụng
          </button>
          <button
            onClick={() => setActiveTab("brand")}
            className={cn(
              "px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300",
              activeTab === "brand" 
                ? "bg-primary text-on-primary shadow-sm" 
                : "text-text-muted hover:text-text-primary hover:bg-surface-light"
            )}
          >
            Theo hãng
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "category" ? (
          <motion.div
            key="category"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {categories.map((cat) => (
              <CategoryCard key={cat.slug} category={cat} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="brand"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {brands.length > 0 ? (
              brands.map((brand) => (
                <BrandCard key={brand.slug} brand={brand} />
              ))
            ) : (
              <div className="col-span-full py-12 text-center text-text-muted">
                <p>Đang cập nhật danh sách hãng...</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
