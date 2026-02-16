"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useCart } from "@/lib/cart-context";
import Link from "next/link";
import { ShoppingCart, X, Trash2 } from "lucide-react";

export function FloatingCartButton() {
  const pathname = usePathname();
  const { cart, removeItem } = useCart();
  const [isVisible, setIsVisible] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const isOnSolutionsPage = pathname.includes("/solutions");

  useEffect(() => {
    setIsVisible(isOnSolutionsPage && cart.length > 0);
  }, [isOnSolutionsPage, cart.length]);

  if (!isVisible) return null;

  return (
    <>
      {/* ── Floating Button ── */}
      <button
        onClick={() => setIsDrawerOpen(true)}
        className="fixed bottom-8 right-8 z-40 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full p-4 shadow-lg transition-all hover:scale-105 flex items-center gap-2"
      >
        <ShoppingCart size={22} />
        {cart.length > 0 && (
          <span className="bg-primary-foreground text-primary rounded-full w-5 h-5 flex items-center justify-center text-xs font-semibold">
            {cart.length}
          </span>
        )}
      </button>

      {/* ── Backdrop ── */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-foreground/20 backdrop-blur-[2px] z-50 transition-opacity"
          onClick={() => setIsDrawerOpen(false)}
        />
      )}

      {/* ── Drawer ── */}
      <div
        className={`fixed right-0 top-0 h-full w-full max-w-md bg-background border-l border-border shadow-2xl z-50 transition-transform duration-300 flex flex-col ${
          isDrawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-border">
          <h2 className="text-base font-semibold text-foreground">
            Catalog Request
          </h2>
          <button
            onClick={() => setIsDrawerOpen(false)}
            className="p-1.5 rounded-[var(--radius-sm)] text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-3">
          {cart.length > 0 ? (
            cart.map((item) => (
              <div
                key={item.productId}
                className="bg-card border border-border rounded-[var(--radius-md)] p-4 hover:border-primary/40 transition-colors"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] uppercase tracking-widest font-semibold text-muted-foreground mb-1">
                      {item.solutionTitle}
                    </p>
                    <p className="text-sm font-medium text-foreground truncate">
                      {item.productName}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5 uppercase tracking-wider">
                      {item.seriesName}
                    </p>
                  </div>
                  <button
                    onClick={() => removeItem(item.productId)}
                    className="flex-shrink-0 p-1.5 rounded-[var(--radius-sm)] text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                    title="Remove item"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-muted-foreground text-sm py-8">
              No items selected
            </p>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-border p-6 space-y-3">
          <p className="text-xs text-muted-foreground text-center uppercase tracking-wider">
            {cart.length} catalog{cart.length !== 1 ? "s" : ""} selected
          </p>
          {cart.length > 0 && (
            <Link
              href="/checkout"
              onClick={() => setIsDrawerOpen(false)}
              className="w-full block"
            >
              <button className="w-full py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-medium rounded-[var(--radius-md)] transition-colors">
                Proceed to Checkout
              </button>
            </Link>
          )}
          <button
            onClick={() => setIsDrawerOpen(false)}
            className="w-full py-2.5 bg-muted hover:bg-muted/70 text-foreground text-sm font-medium rounded-[var(--radius-md)] transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </>
  );
}