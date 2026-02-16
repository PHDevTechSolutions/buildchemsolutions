"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/homepage/header";
import { Footer } from "@/components/homepage/footer";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export default function SolutionsPage() {
  const [solutions, setSolutions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSolutions = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "solutions"));
        const solutionsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setSolutions(solutionsData);
      } catch (error) {
        console.error("Error fetching solutions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSolutions();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="animate-spin text-muted-foreground" size={40} />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center">
        <Image
          src="/images/hero-image.jpg"
          alt="Solutions Hero"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 uppercase tracking-tighter italic">
            Our <span className="text-accent">Solutions</span>
          </h1>
          <p className="text-lg md:text-xl text-white/90 font-medium max-w-2xl mx-auto uppercase tracking-widest">
            Comprehensive industrial solutions for your business needs
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            {solutions.map((solution, index) => (
              <Link
                href={`/solutions/${solution.id}`}
                key={solution.id}
                className="block group"
              >
                <div
                  className="h-full bg-card border border-border group-hover:border-primary group-hover:shadow-lg overflow-hidden transition-all duration-500 animate-fade-in relative rounded-[var(--radius-xl)] flex flex-col"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={solution.mainImage || "/placeholder.svg"}
                      alt={solution.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                  </div>

                  {/* Text */}
                  <div className="p-4 md:p-6 flex-grow flex flex-col justify-center">
                    <h3 className="text-sm md:text-base font-semibold text-foreground group-hover:text-primary transition-colors duration-300 leading-snug">
                      {solution.title}
                    </h3>
                    <div className="mt-2 w-8 h-0.5 bg-primary transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-full" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {solutions.length === 0 && (
            <div className="text-center py-20">
              <p className="text-base font-medium text-muted-foreground">
                No solutions available at this time.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}