"use client";

import { useEffect, useState } from "react";
import { InfiniteSlider } from "@/components/motion-primitives/infinite-slider";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

// ── Fallback shown while loading or if Firestore returns nothing ──
const FALLBACK_LOGOS: string[] = ["/images/buildchem.png"];

const COMPANY_DOC_ID = "99Wh5JciHNYPC3mB1efl";

export function LogoSection() {
  const [logos, setLogos] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogos = async () => {
      try {
        const docRef = doc(db, "company", COMPANY_DOC_ID);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const images: string[] = docSnap.data().partnersImage ?? [];
          setLogos(images.length > 0 ? images : FALLBACK_LOGOS);
        } else {
          setLogos(FALLBACK_LOGOS);
        }
      } catch (error) {
        console.error("Error fetching partner logos:", error);
        setLogos(FALLBACK_LOGOS);
      } finally {
        setLoading(false);
      }
    };

    fetchLogos();
  }, []);

  return (
    <section className="relative w-full bg-background py-16 md:py-24 border-b border-border">
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
        {/* Heading */}
        <p className="text-center text-[10px] font-semibold uppercase tracking-[0.3em] text-muted-foreground mb-12">
          Trusted Partners &amp; Affiliates
        </p>

        {/* Slider */}
        <div className="relative">
          {/* Edge fades */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

          {loading ? (
            // Skeleton shimmer row while fetching
            <div className="flex items-center gap-24 overflow-hidden py-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="h-22 w-42 rounded-[var(--radius-md)] bg-muted animate-pulse flex-shrink-0"
                />
              ))}
            </div>
          ) : (
            <InfiniteSlider gap={100} speed={40}>
              {logos.map((url, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-center flex-shrink-0"
                  style={{ minWidth: "160px" }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={url}
                    alt="Partner"
                    className="h-22 w-auto object-contain opacity-40 hover:opacity-100 grayscale hover:grayscale-0 transition-all duration-500"
                  />
                </div>
              ))}
            </InfiniteSlider>
          )}
        </div>
      </div>
    </section>
  );
}
