"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { db } from "@/lib/firebase";
import { collection, getDocs, limit, query } from "firebase/firestore";
import Link from "next/link";

interface Solution {
  id: string;
  title: string;
  description: string;
  mainImage: string;
}

export function SolutionSection() {
  const [solutions, setSolutions] = useState<Solution[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const fetchSolutions = async () => {
      try {
        const q = query(collection(db, "solutions"), limit(3));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          title: doc.data().title,
          description: doc.data().description,
          mainImage: doc.data().mainImage,
        }));
        setSolutions(data);
      } catch (error) {
        console.error("Error fetching solutions:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSolutions();
  }, []);

  useEffect(() => {
    if (solutions.length === 0) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % solutions.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [solutions.length]);

  return (
    <section className="w-full bg-white text-gray-900 py-24 flex flex-col items-center overflow-hidden border-b border-gray-200/50">
      <div className="max-w-7xl w-full px-6 md:px-12 lg:px-16 space-y-12">
        {/* Header */}
        <div className="flex flex-col gap-4 max-w-[560px]">
          <div className="flex items-center gap-3 px-4 py-2 border border-gray-300 w-fit">
            <div className="w-2.5 h-2.5 bg-blue-600" />
            <span className="text-sm font-medium text-gray-600 tracking-wide">
              Solutions
            </span>
          </div>
          <h2 className="text-balance text-4xl md:text-5xl font-normal leading-[1.1] tracking-tight text-gray-900">
            {"Our Featured Solutions".split(" ").map((word, i) => (
              <motion.span
                key={i}
                initial={{ filter: "blur(10px)", opacity: 0 }}
                whileInView={{ filter: "blur(0px)", opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="inline-block mr-[0.25em]"
              >
                {word}
              </motion.span>
            ))}
          </h2>
          <p className="text-balance text-gray-600 text-base leading-relaxed">
            Explore our range of construction chemical solutions — engineered
            for performance, durability, and reliability on every project.
          </p>
        </div>

        {/* Interactive Content */}
        {loading ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <Loader2 className="animate-spin text-gray-400" size={36} />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[400px]">
            {/* Left: Image */}
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-200">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                  className="absolute inset-0"
                >
                  <img
                    src={solutions[activeIndex]?.mainImage || "/placeholder.svg"}
                    alt={solutions[activeIndex]?.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </motion.div>
              </AnimatePresence>

              {/* Progress bars */}
              <div className="absolute bottom-4 left-4 right-4 h-1 flex gap-2">
                {solutions.map((_, idx) => (
                  <div key={idx} className="h-full flex-1 bg-gray-400 overflow-hidden">
                    {activeIndex === idx && (
                      <motion.div
                        className="h-full bg-blue-600"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 8, ease: "linear" }}
                      />
                    )}
                    {idx < activeIndex && (
                      <div className="h-full w-full bg-blue-600" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Step list */}
            <div className="flex flex-col gap-4">
              {solutions.map((solution, index) => (
                <motion.button
                  key={solution.id}
                  onClick={() => setActiveIndex(index)}
                  className={cn(
                    "group relative w-full text-left p-6 transition-all duration-300 outline-none",
                    activeIndex === index
                      ? "bg-blue-50 border border-blue-200"
                      : "bg-transparent border border-transparent hover:bg-gray-50"
                  )}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={cn(
                        "mt-1 w-7 h-7 flex items-center justify-center text-xs font-semibold flex-shrink-0 transition-colors duration-300",
                        activeIndex === index
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200 text-gray-500"
                      )}
                    >
                      {index + 1}
                    </div>

                    <div className="flex-1 space-y-1">
                      <h3
                        className={cn(
                          "text-xl font-medium transition-colors duration-300",
                          activeIndex === index ? "text-gray-900" : "text-gray-600"
                        )}
                      >
                        {solution.title}
                      </h3>

                      <AnimatePresence>
                        {activeIndex === index && (
                          <motion.p
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="text-gray-600 text-base leading-relaxed overflow-hidden"
                          >
                            {solution.description}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>

                    <div
                      className={cn(
                        "mt-1.5 transition-all duration-300",
                        activeIndex === index
                          ? "opacity-100 translate-x-0"
                          : "opacity-0 -translate-x-2"
                      )}
                    >
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="pt-12 flex justify-center border-t border-gray-200">
          <Link href="/solutions">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-blue-600 text-white font-medium flex items-center gap-2 hover:bg-blue-700"
            >
              View All Solutions
              <ChevronRight className="w-4 h-4" />
            </motion.button>
          </Link>
        </div>
      </div>
    </section>
  );
}