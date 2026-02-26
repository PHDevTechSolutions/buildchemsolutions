"use client";

import Navbar from "@/components/nav";
import Footer from "@/components/footer";
import Image from "next/image";
import { motion, Variants } from "framer-motion";

export default function Home() {
  // Explicitly typed variants to avoid TypeScript easing errors
  const containerVars: Variants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.5,
      },
    },
  };

  const itemVars: Variants = {
    initial: { y: 40, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1], // Aggressive Brutalist curve
      },
    },
  };

  const imageVars: Variants = {
    initial: { scale: 1.1 },
    animate: {
      scale: 1,
      transition: { duration: 2, ease: "easeOut" },
    },
  };

  return (
    <main className="bg-white">
      <Navbar />

      <motion.section
        initial="initial"
        animate="animate"
        variants={containerVars}
        className="relative h-screen w-full overflow-hidden bg-neutral-900"
      >
        {/* HERO IMAGE - Scaled animation on load */}
        <motion.div variants={imageVars} className="absolute inset-0 z-0">
          <Image
            src="/images/hero-image.jpg"
            fill
            className="object-cover brightness-[0.4]"
            alt="Hero"
            priority
          />
        </motion.div>

        {/* OVERLAY CONTENT - Centered within the hero */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-6">
          <motion.div variants={itemVars} className="mb-8">
            <h1 className="text-hero text-white text-center">
              NEW
              <br />
              COLLECTION
            </h1>
          </motion.div>

          <motion.div variants={itemVars}>
            {/* REDUCED SIZE BUTTON: Smaller padding (px-8 py-3) and text (text-xs) */}
            <button className="group relative overflow-hidden border border-white bg-transparent px-8 py-3 transition-colors duration-500">
              {/* THE SLIDE-DOWN BACKGROUND */}
              <div className="absolute inset-0 z-0 h-full w-full -translate-y-full bg-white transition-transform duration-500 ease-in-out group-hover:translate-y-0" />

              {/* BUTTON TEXT: text-xs and wide tracking for that 'serial number' look */}
              <span className="relative z-10 font-bricolage text-xs font-bold tracking-[0.3em] text-white transition-colors duration-500 group-hover:text-black">
                SHOP NOW
              </span>
            </button>
          </motion.div>
        </div>
      </motion.section>

      {/* SECONDARY SECTION (Triggered on Scroll) */}
      <section className="min-h-screen bg-white p-10 border-t border-black grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="border border-black p-8 flex flex-col justify-between aspect-square">
          <h2 className="text-4xl font-black">
            STRICTLY
            <br />
            LIMITED
          </h2>
          <p className="font-bricolage max-w-xs text-sm">
            EACH GARMENT IS NUMBERED AND TRACKED. NO RE-STOCKS. NO COMPROMISE.
          </p>
        </div>
        <div className="bg-neutral-100 border border-black aspect-square flex items-center justify-center grayscale">
          <span className="font-unbounded text-neutral-300 text-6xl font-black">
            01
          </span>
        </div>
      </section>
      <Footer />
    </main>
  );
}