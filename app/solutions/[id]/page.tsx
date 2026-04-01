"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Footer } from "@/components/homepage/footer";
import { Loader2, ArrowLeft, FileText, Plus, Check } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { SeriesAccordion } from "@/components/solutions/series-accordion";
import { useCart } from "@/lib/cart-context";

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

// ── Flat product card used when there is only one series ─────────────────────
function ProductCard({
  product,
  seriesName,
  solutionId,
  solutionTitle,
}: {
  product: Product;
  seriesName: string;
  solutionId: string;
  solutionTitle: string;
}) {
  const { cart, addItem } = useCart();
  const [added, setAdded] = useState(false);

  const productId = `${solutionId}-${seriesName}-${product.name}`.replace(
    /\s+/g,
    "-",
  );
  const isInCart = cart.some((item) => item.productId === productId);

  const handleAdd = () => {
    addItem({
      productId,
      productName: product.name,
      seriesName,
      solutionTitle,
      pdfUrl: product.pdfUrl,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="group bg-card border border-border hover:border-primary/50 hover:shadow-md transition-all duration-200 rounded-[var(--radius-lg)] flex flex-col overflow-hidden">
      {/* Top colour bar */}
      <div className="h-1 bg-primary/20 group-hover:bg-primary transition-colors duration-300" />

      <div className="p-6 flex flex-col flex-1 gap-4">
        {/* Icon + label */}
        <div className="flex items-start gap-4">
          <div className="bg-muted p-3 rounded-[var(--radius-md)] text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors flex-shrink-0">
            <FileText size={22} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">
              Data Sheet · PDF
            </p>
            <h4 className="font-semibold text-foreground text-sm leading-snug group-hover:text-primary transition-colors">
              {product.name}
            </h4>
          </div>
        </div>

        {/* Spacer pushes button to bottom */}
        <div className="flex-1" />

        {/* Add button */}
        <button
          onClick={handleAdd}
          className={`w-full flex items-center justify-center gap-2 py-2.5 text-xs font-semibold uppercase tracking-wider rounded-[var(--radius-md)] transition-all duration-200 ${
            isInCart || added
              ? "bg-primary/10 text-primary border border-primary/20"
              : "bg-primary text-primary-foreground hover:bg-primary/90"
          }`}
          title={
            isInCart || added ? "Added to catalog" : "Add to catalog request"
          }
        >
          {isInCart || added ? (
            <>
              <Check size={14} /> Added
            </>
          ) : (
            <>
              <Plus size={14} /> Add to Request
            </>
          )}
        </button>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function SolutionDetailPage() {
  const params = useParams();
  const solutionId = params.id as string;

  const [solution, setSolution] = useState<any>(null);
  const [seriesList, setSeriesList] = useState<Series[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSolutionAndSeries = async () => {
      try {
        const solutionDocRef = doc(db, "solutions", solutionId);
        const solutionDoc = await getDoc(solutionDocRef);

        if (solutionDoc.exists()) {
          const solutionData = {
            id: solutionDoc.id,
            ...solutionDoc.data(),
          } as any;
          setSolution(solutionData);

          if (solutionData.series && Array.isArray(solutionData.series)) {
            const seriesPromises = solutionData.series.map(
              async (seriesId: string) => {
                const seriesDocRef = doc(db, "series", seriesId);
                const seriesDoc = await getDoc(seriesDocRef);
                if (seriesDoc.exists()) {
                  const data = seriesDoc.data();
                  return {
                    id: seriesDoc.id,
                    name: data.name,
                    products: data.products || [],
                  } as Series;
                }
                return null;
              },
            );

            const seriesData = await Promise.all(seriesPromises);
            setSeriesList(seriesData.filter((s) => s !== null) as Series[]);
          }
        }
      } catch (error) {
        console.error("Error fetching solution:", error);
      } finally {
        setLoading(false);
      }
    };

    if (solutionId) fetchSolutionAndSeries();
  }, [solutionId]);

  if (loading) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="animate-spin text-muted-foreground" size={40} />
      </main>
    );
  }

  if (!solution) {
    return (
      <main className="min-h-screen bg-background">
        <div className="py-24 text-center flex flex-col items-center justify-center min-h-[60vh]">
          <h1 className="text-3xl font-semibold text-foreground mb-4">
            Solution Not Found
          </h1>
          <Link
            href="/solutions"
            className="text-sm font-medium text-muted-foreground underline underline-offset-4 hover:text-foreground transition-colors"
          >
            Return to Solutions
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  const hasMultipleSeries = seriesList.length > 1;
  const singleSeries = seriesList.length === 1 ? seriesList[0] : null;

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* ── Hero ── */}
      <section className="relative h-[60vh] min-h-[500px] flex items-end">
        <div className="absolute inset-0 z-0">
          {solution.mainImage && (
            <Image
              src={solution.mainImage || "/placeholder.svg"}
              alt={solution.title}
              fill
              className="object-cover"
              priority
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 pb-16 md:pb-24">
          <Link
            href="/solutions"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-6 text-xs uppercase font-medium tracking-[0.18em]"
          >
            <ArrowLeft size={14} /> Back to Solutions
          </Link>
          <h1 className="text-5xl md:text-7xl font-semibold text-white tracking-tight mb-4 leading-tight">
            {solution.title}
          </h1>
          <p className="text-base md:text-lg text-white/70 max-w-2xl leading-relaxed">
            {solution.description}
          </p>
        </div>
      </section>

      {/* ── Products section ── */}
      {seriesList.length > 0 && (
        <section className="py-20 bg-background border-t border-border">
          <div className="max-w-5xl mx-auto px-6 lg:px-8">
            {/* Divider heading */}
            <div className="flex items-center gap-4 mb-12">
              <div className="h-px bg-border flex-1" />
              <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground text-center">
                {hasMultipleSeries
                  ? "Available Series & Specs"
                  : `${singleSeries!.name} — Product Specs`}
              </h2>
              <div className="h-px bg-border flex-1" />
            </div>

            {/* ── Multiple series → accordion ── */}
            {hasMultipleSeries && (
              <SeriesAccordion
                series={seriesList}
                solutionTitle={solution?.title || "Solution"}
              />
            )}

            {/* ── Single series → flat product cards ── */}
            {singleSeries && (
              <>
                {singleSeries.products.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-12">
                    No technical documents available for this series.
                  </p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {singleSeries.products.map((product, idx) => (
                      <ProductCard
                        key={idx}
                        product={product}
                        seriesName={singleSeries.name}
                        solutionId={solutionId}
                        solutionTitle={solution?.title || "Solution"}
                      />
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}
