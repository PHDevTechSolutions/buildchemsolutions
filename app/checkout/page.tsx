"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart-context";
import { Footer } from "@/components/homepage/footer";
import { ArrowLeft, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, clearCart } = useCart();
 
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    company: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const processedItems = cart.map((item) => {
        let downloadUrl = item.pdfUrl || "";
        if (downloadUrl && downloadUrl.includes("cloudinary")) {
          downloadUrl = downloadUrl
            .replace("/f_auto,q_auto/", "/")
            .replace("/upload/", "/upload/fl_attachment/");
        }
        return {
          productId: item.productId,
          productName: item.productName,
          solutionTitle: item.solutionTitle,
          pdfUrl: downloadUrl,
        };
      });

      const inquiryData = {
        customerName: formData.name,
        customerEmail: formData.email,
        company: formData.company,
        requestedItems: processedItems,
        source: "Website Catalog Request",
        status: "new",
        requestedAt: serverTimestamp(),
      };

      const docRef = await addDoc(collection(db, "catalog_requests"), inquiryData);

      const response = await fetch("/api/solutions/send-catalogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          inquiryId: docRef.id,
          catalogs: processedItems,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.error ||
            "Failed to send automated email, but your request was recorded."
        );
      }

      clearCart();
      setSuccess(true);
    } catch (err) {
      console.error("Submission Error:", err);
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred."
      );
    } finally {
      setLoading(false);
    }
  };

  // ── Success ──
  if (success) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <div className="flex-1 flex items-center justify-center px-6 py-24">
          <div className="max-w-md w-full text-center">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-foreground" />
            </div>
            <h1 className="text-3xl font-semibold text-foreground mb-4">
              Request Sent!
            </h1>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Thank you for your interest. We've recorded your request and sent
              the catalogs to <strong className="text-foreground">{formData.email}</strong>.
            </p>
            <Link href="/solutions">
              <button className="w-full py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-[var(--radius-lg)] transition-colors">
                Return to Solutions
              </button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // ── Empty cart ──
  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <div className="flex-1 flex items-center justify-center px-6 py-24">
          <div className="max-w-md w-full text-center">
            <h1 className="text-2xl font-semibold text-foreground mb-4">
              Your request list is empty
            </h1>
            <p className="text-muted-foreground mb-8">
              Browse our solutions and add catalogs to your request list.
            </p>
            <Link href="/solutions">
              <button className="w-full py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-[var(--radius-lg)] transition-colors">
                Browse Solutions
              </button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-1 pt-32 pb-20">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <Link
            href="/solutions"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground font-medium mb-8 group transition-colors"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to Solutions
          </Link>

          <div className="grid lg:grid-cols-5 gap-12">
            {/* ── Form ── */}
            <div className="lg:col-span-3">
              <h1 className="text-3xl font-semibold text-foreground mb-2">
                Request Catalogs
              </h1>
              <p className="text-muted-foreground mb-10">
                Complete the form below to receive detailed technical datasheets.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="flex items-start gap-3 p-4 bg-destructive/10 border border-destructive/20 rounded-[var(--radius-md)] text-destructive text-sm">
                    <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    {error}
                  </div>
                )}

                <div className="space-y-4">
                  {[
                    { label: "Full Name", name: "name", type: "text", placeholder: "John Doe" },
                    { label: "Work Email", name: "email", type: "email", placeholder: "john@company.com" },
                    { label: "Company Name", name: "company", type: "text", placeholder: "Your Construction Firm" },
                  ].map((field) => (
                    <div key={field.name}>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        name={field.name}
                        required
                        value={formData[field.name as keyof typeof formData]}
                        onChange={handleChange}
                        placeholder={field.placeholder}
                        className="w-full px-4 py-3 bg-muted border border-input rounded-[var(--radius-md)] text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all text-sm"
                      />
                    </div>
                  ))}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed text-primary-foreground font-medium rounded-[var(--radius-lg)] transition-colors flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Processing...
                    </>
                  ) : (
                    "Request Selected Catalogs"
                  )}
                </button>
              </form>
            </div>

            {/* ── Order summary ── */}
            <div className="lg:col-span-2">
              <div className="bg-card rounded-[var(--radius-xl)] p-6 border border-border sticky top-32">
                <h3 className="text-base font-semibold text-foreground mb-5">
                  Selected Products ({cart.length})
                </h3>
                <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
                  {cart.map((item) => (
                    <div
                      key={item.productId}
                      className="bg-background p-4 rounded-[var(--radius-md)] border border-border"
                    >
                      <p className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground mb-1">
                        {item.solutionTitle}
                      </p>
                      <p className="text-sm font-medium text-foreground">
                        {item.productName}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {item.seriesName}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-5 border-t border-border">
                  <p className="text-xs text-muted-foreground text-center">
                    All catalogs will be sent as PDF attachments.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}