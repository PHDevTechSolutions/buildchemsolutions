"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import {
  Droplets,
  Layers,
  Blocks,
  Grid2x2,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface FeatureItem {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

const DEFAULT_FEATURES: FeatureItem[] = [
  {
    id: "1",
    icon: <Droplets className="w-5 h-5 text-white" />,
    title: "Construction Chemicals",
    description:
      "A comprehensive range of specialty chemicals engineered for modern construction — from admixtures to surface treatments that enhance durability and performance.",
  },
  {
    id: "2",
    icon: <ShieldCheck className="w-5 h-5 text-white" />,
    title: "Waterproofing Solutions",
    description:
      "Advanced waterproofing systems for roofs, basements, tunnels, and wet areas. Proven protection against water ingress for the life of the structure.",
  },
  {
    id: "3",
    icon: <Layers className="w-5 h-5 text-white" />,
    title: "Concrete Admixtures",
    description:
      "Tailor concrete properties to your project needs — improve workability, accelerate setting times, enhance strength, and extend service life.",
  },
  {
    id: "4",
    icon: <Grid2x2 className="w-5 h-5 text-white" />,
    title: "Tile Adhesives & Grouts",
    description:
      "High-performance adhesive and grouting systems for ceramic, porcelain, and natural stone tiles in both interior and exterior applications.",
  },
  {
    id: "5",
    icon: <Blocks className="w-5 h-5 text-white" />,
    title: "Protective Coatings",
    description:
      "Durable surface coatings that defend structures against corrosion, chemical attack, UV degradation, and harsh environmental conditions.",
  },
  {
    id: "6",
    icon: <Wrench className="w-5 h-5 text-white" />,
    title: "Repair & Rehabilitation Products",
    description:
      "Specialized mortars, grouts, and systems for restoring aging or damaged concrete structures to their original integrity and appearance.",
  },
];

/* =========================
   Animation Variants
========================= */

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

interface FeaturesSectionProps {
  preHeading?: string;
  headline?: string;
  features?: FeatureItem[];
  className?: string;
}

export function ServicesSection({
  preHeading = "What We Offer",
  headline = "Solutions Built for Every Stage of Construction",
  features = DEFAULT_FEATURES,
  className,
}: FeaturesSectionProps) {
  return (
    <section
      className={cn(
        "w-full bg-white py-24 border-b border-gray-200/50",
        className,
      )}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-6 mb-16"
        >
          <div className="flex items-center gap-3 px-4 py-2 border border-gray-300 w-fit">
            <div className="w-2.5 h-2.5 bg-[#004AAD]" />
            <span className="text-sm font-medium text-gray-600 tracking-wide">
              {preHeading}
            </span>
          </div>

          <h2 className="text-balance text-gray-900 text-4xl md:text-5xl lg:text-6xl font-normal leading-[1.1] max-w-[700px] tracking-tight">
            {headline.split(" ").map((word, i) => (
              <motion.span
                key={i}
                initial={{ filter: "blur(10px)", opacity: 0 }}
                whileInView={{ filter: "blur(0px)", opacity: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  delay: i * 0.05,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="inline-block mr-[0.25em]"
              >
                {word}
              </motion.span>
            ))}
          </h2>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.id}
              variants={itemVariants}
              className="flex flex-col group"
            >
              {/* Icon */}
              <div className="mb-8">
                <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#004AAD] shadow-lg shadow-[#004AAD]/20 transform transition-transform group-hover:scale-110 duration-300">
                  {feature.icon}
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col gap-3">
                <h4 className="text-gray-900 text-xl font-medium tracking-tight">
                  {feature.title}
                </h4>
                <p className="text-balance text-gray-600 text-base leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
