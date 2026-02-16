import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/react";

import { FloatingCartButton } from "@/components/solutions/floating-cart-button";
import { CartProvider } from "@/lib/cart-context";

import "./globals.css";

/* -----------------------------
   Font setup (Next.js native)
------------------------------ */
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

/* -----------------------------
   Metadata
------------------------------ */
export const metadata: Metadata = {
  title: "Buildchem Solutions Inc. - Your Partner in Industrial Excellence",
  description:
    "Leading industrial holdings company managing construction, cement production, and industrial materials companies with strength, reliability, and scale.",
  icons: {
    icon: [
      { url: "/images/logo-vah.png", media: "(prefers-color-scheme: light)" },
      { url: "/images/logo-vah.png", media: "(prefers-color-scheme: dark)" },
      { url: "/images/logo-vah.png", type: "image/png" },
    ],
    apple: "/apple-icon.png",
  },
};

/* -----------------------------
   Root Layout
------------------------------ */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} antialiased`}
      >
        <CartProvider>
          {children}
          <FloatingCartButton />
          <Toaster />
          <Analytics />
        </CartProvider>
      </body>
    </html>
  );
}
