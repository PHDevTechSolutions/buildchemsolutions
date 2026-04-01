"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const keyFeatures = [
  "Expert Technical Services and On-Site Support",
  "Flexible Pricing Designed for Project Needs",
  "International-Grade Quality and Performance",
];

export function CtaSection() {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/HERO.png')",
        }}
      >
        <div className="absolute inset-0 bg-black/55" />
      </div>

      {/* Content */}
      <div className="relative mx-auto max-w-7xl px-6 md:px-12 lg:px-16 py-24 md:py-32 lg:py-40">
        <div className="max-w-2xl">
          <h2 className="text-balance text-4xl font-normal tracking-tight text-white md:text-5xl lg:text-6xl">
            {"Build with confidence. Protect what lasts."
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

          <p className="text-balance mt-6 max-w-xl text-base leading-relaxed text-white/80 md:text-lg">
            From waterproofing to structural repair, our construction chemicals
            are trusted by engineers and contractors across the Philippines.
          </p>

          {/* Key Features */}
          <div className="mt-10 flex flex-col gap-0">
            <p className="text-sm font-semibold text-white/50 uppercase tracking-widest mb-4 pl-4 border-l-2 border-[#D4A853]">
              Key Features
            </p>
            {keyFeatures.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                className="pl-4 py-3 border-l border-white/20 text-white/80 text-sm md:text-base"
              >
                {feature}
              </motion.div>
            ))}
          </div>

          <Link href="/contact">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="mt-10 bg-[#004AAD] px-8 py-3.5 text-white text-sm font-semibold hover:bg-[#003a8c] transition-colors duration-300"
            >
              Request a Free Consultation
            </motion.button>
          </Link>
        </div>
      </div>
    </section>
  );
}
