"use client"

import { Button } from "@/components/ui/button"
import { Header } from "@/components/homepage/header"
import { motion } from "framer-motion"

export function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/hero-bg.jpg')",
        }}
      />
      
      {/* Subtle overlay for text readability */}
      <div className="absolute inset-0 bg-slate-950/20" />
      
      {/* Header */}
      <Header />
      
      {/* Content */}
      <div className="relative z-10 flex h-full flex-col pt-20">
        {/* Hero Content - Positioned in upper portion */}
        <div className="flex flex-1 flex-col items-center px-6 pt-16 text-center md:pt-24">
          <h1 className="max-w-3xl text-balance text-5xl font-normal tracking-tight text-white md:text-6xl lg:text-7xl">
            {"AI Defense That Sees Through the Dark".split(" ").map((word, i) => (
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
          </h1>
          
          <p className="mt-6 max-w-xl text-balance text-center text-sm leading-relaxed text-white/70 md:text-base">
            Our autonomous AI sentinel detects and neutralizes zero-day threats before they reach your gateway.
          </p>

          {/* CTAs - Two buttons side by side */}
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row">
            <Button
              size="lg"
              className="bg-white px-6 text-slate-900 hover:bg-white/90"
            >
              Deploy the Sentinel
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white/30 bg-transparent px-6 text-white hover:bg-white/10 hover:text-white"
            >
              Read the Whitepaper
            </Button>
          </div>
        </div>

        {/* Scroll Indicator - At bottom */}
      </div>
    </section>
  )
}
