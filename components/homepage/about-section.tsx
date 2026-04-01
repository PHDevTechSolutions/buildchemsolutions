"use client";

import { motion } from "framer-motion";

export function AboutSection() {
  return (
    <section className="relative w-full bg-white py-24 md:py-32 border-b border-gray-200/50">
      {/* Grain texture overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "url('data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22><filter id=%22noise%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%224%22 result=%22noise%22 /></filter><rect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22 fill=%22%23ffffff%22/></svg>')",
        }}
      />

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center justify-center px-6 md:px-12 lg:px-16">
        <div className="space-y-8 text-center flex flex-col items-center">
          <div className="flex items-center gap-3 px-4 py-2 border border-gray-300 w-fit">
            <div className="w-2.5 h-2.5 bg-[#004AAD]" />
            <span className="text-sm font-medium text-gray-600 tracking-wide">
              Why It Matters
            </span>
          </div>

          <h2 className="text-balance text-5xl font-normal tracking-tight text-gray-900 md:text-6xl lg:text-5xl">
            {"Structures Fail When Chemistry Is Overlooked"
              .split(" ")
              .map((word, i) => (
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

          <p className="text-balance text-lg leading-relaxed text-gray-600 md:text-xl max-w-3xl">
            Water ingress, concrete deterioration, and premature structural
            failure are rarely caused by poor design — they stem from the wrong
            materials applied the wrong way. The Philippine climate is
            unforgiving: high humidity, tropical rainfall, and aggressive ground
            conditions demand construction chemicals that are engineered for
            performance, not just compliance. We exist to close that gap.
          </p>
        </div>
      </div>
    </section>
  );
}
