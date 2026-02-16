"use client";

import { useState } from "react";
import { ChevronDown, FileText, Plus, Check } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { useParams } from "next/navigation";

interface Product {
  name: string;
  pdfUrl: string;
  fileName: string;
}

interface Series {
  id: string;
  name: string;
  products: Product[];
}

interface SeriesAccordionProps {
  series: Series[];
  solutionTitle?: string;
}

export function SeriesAccordion({
  series,
  solutionTitle = "Solution",
}: SeriesAccordionProps) {
  const params = useParams();
  const solutionId = params.id as string;
  const { cart, addItem } = useCart();
  const [expandedId, setExpandedId] = useState<string | null>(
    series[0]?.id || null
  );
  const [addedItems, setAddedItems] = useState<Set<string>>(new Set());

  const toggleSeries = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleAddToCart = (product: Product, seriesName: string) => {
    const productId = `${solutionId}-${seriesName}-${product.name}`.replace(
      /\s+/g,
      "-"
    );

    addItem({
      productId,
      productName: product.name,
      seriesName,
      solutionTitle,
      pdfUrl: product.pdfUrl,
    });

    setAddedItems((prev) => new Set(prev).add(productId));
    setTimeout(() => {
      setAddedItems((prev) => {
        const updated = new Set(prev);
        updated.delete(productId);
        return updated;
      });
    }, 2000);
  };

  return (
    <div className="space-y-3">
      {series.map((s) => {
        const isOpen = expandedId === s.id;

        return (
          <div
            key={s.id}
            className={`border transition-all duration-300 rounded-[var(--radius-lg)] overflow-hidden ${
              isOpen
                ? "border-primary bg-card shadow-sm"
                : "border-border bg-card hover:border-primary/40"
            }`}
          >
            {/* ── Header ── */}
            <button
              onClick={() => toggleSeries(s.id)}
              className="w-full flex items-center justify-between p-6 md:p-8 text-left"
            >
              <div className="flex items-center gap-4">
                <span
                  className={`flex items-center justify-center w-7 h-7 rounded-full border text-xs font-medium transition-colors ${
                    isOpen
                      ? "bg-primary border-primary text-primary-foreground"
                      : "bg-background border-border text-muted-foreground"
                  }`}
                >
                  {s.products.length}
                </span>
                <h3
                  className={`text-lg md:text-2xl font-semibold tracking-tight transition-colors ${
                    isOpen ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {s.name}
                </h3>
              </div>
              <ChevronDown
                size={20}
                className={`text-muted-foreground transition-transform duration-300 flex-shrink-0 ${
                  isOpen ? "rotate-180 text-foreground" : ""
                }`}
              />
            </button>

            {/* ── Content ── */}
            <div
              className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <div className="px-6 pb-8 md:px-8 md:pb-10 pt-0">
                  <div className="w-full h-px bg-border mb-6" />

                  {s.products.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {s.products.map((product, idx) => {
                        const productId =
                          `${solutionId}-${s.name}-${product.name}`.replace(
                            /\s+/g,
                            "-"
                          );
                        const isAdded =
                          addedItems.has(productId) ||
                          cart.some((item) => item.productId === productId);

                        return (
                          <div
                            key={idx}
                            className="group bg-background border border-border rounded-[var(--radius-md)] p-4 flex items-center justify-between hover:border-primary/50 hover:shadow-sm transition-all duration-200"
                          >
                            <div className="flex items-center gap-3 overflow-hidden">
                              <div className="bg-muted p-2.5 rounded-[var(--radius-sm)] text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors flex-shrink-0">
                                <FileText size={18} />
                              </div>
                              <div className="min-w-0">
                                <h4 className="font-medium text-foreground text-xs truncate group-hover:text-primary transition-colors">
                                  {product.name}
                                </h4>
                                <p className="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">
                                  Data Sheet · PDF
                                </p>
                              </div>
                            </div>

                            <button
                              onClick={() => handleAddToCart(product, s.name)}
                              className={`ml-4 p-2 rounded-[var(--radius-sm)] transition-colors flex-shrink-0 ${
                                isAdded
                                  ? "bg-primary/15 text-primary"
                                  : "bg-primary text-primary-foreground hover:bg-primary/90"
                              }`}
                              title={isAdded ? "Added to catalog" : "Add to catalog"}
                            >
                              {isAdded ? (
                                <Check size={15} />
                              ) : (
                                <Plus size={15} />
                              )}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground text-center py-6">
                      No technical documents available.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}