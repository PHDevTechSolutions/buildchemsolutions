import React from "react";
import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Toaster } from "react-hot-toast";
import "./globals.css";

import { FloatingCartButton } from "@/components/solutions/floating-cart-button";
import { CartProvider } from "@/lib/cart-context";


const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const interTight = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-inter-tight",
});

export const metadata: Metadata = {
  title: "Buildchem Solutions Inc. | Concrete Made Better",
  description:
    "A leading provider of construction chemicals and building materials solutions.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${interTight.variable} font-sans antialiased`}
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
