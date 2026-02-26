import type { Metadata } from "next";
import { Archivo_Black, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";

const archivoBlack = Archivo_Black({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-archivo-black",
});

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["500", "800"],
  variable: "--font-bricolage",
});

export const metadata: Metadata = {
  title: "Buildchem Solutions Inc.",
  description: "Aggressive Editorial Fashion",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-white" suppressHydrationWarning>
      <body
        className={`${archivoBlack.variable} ${bricolage.variable} font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
