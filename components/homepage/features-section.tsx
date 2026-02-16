"use client";

import React from "react"

import { motion } from "framer-motion";
import { Brain, Shield, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface FeatureItem {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

const DEFAULT_FEATURES: FeatureItem[] = [
  {
    id: "1",
    icon: <Brain className="w-5 h-5 text-white" />,
    title: "Predictive Heuristics",
    description:
      "We don't just react. Our AI models attack vectors 10,000 times a second to predict where the next breach will attempt to strike.",
  },
  {
    id: "2",
    icon: <Shield className="w-5 h-5 text-white" />,
    title: "Autonomous Patching",
    description:
      "When a vulnerability is detected, Aegis rewrites the security protocol in real-time, closing the door before it can be opened.",
  },
  {
    id: "3",
    icon: <Globe className="w-5 h-5 text-white" />,
    title: "Deep Web Reconnaissance",
    description:
      "We scan the dark web for your credentials, alerting you to leaks before they become breaches.",
  },
  {
    id: "4",
    icon: <Brain className="w-5 h-5 text-white" />,
    title: "Behavioral Analytics",
    description:
      "Advanced machine learning tracks user behavior patterns to detect anomalies and insider threats before damage occurs.",
  },
  {
    id: "5",
    icon: <Shield className="w-5 h-5 text-white" />,
    title: "Zero-Trust Architecture",
    description:
      "Every request is verified, every session authenticated. Trust nothing, verify everything, protect all endpoints.",
  },
  {
    id: "6",
    icon: <Globe className="w-5 h-5 text-white" />,
    title: "Real-Time Threat Intelligence",
    description:
      "Continuously updated threat feeds from global sources ensure you're protected against the latest attack methods.",
  },
];

const containerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

interface FeaturesSectionProps {
  preHeading?: string;
  headline?: string;
  features?: FeatureItem[];
  className?: string;
}

export function FeaturesSection({
  preHeading = "Key Capabilities",
  headline = "Built for the Post-Perimeter Era",
  features = DEFAULT_FEATURES,
  className,
}: FeaturesSectionProps) {
  return (
    <section
      className={cn(
        "w-full bg-white py-24 border-b border-gray-200/50",
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-6 mb-16"
        >
          <div className="flex items-center gap-3 px-4 py-2 border border-gray-300 w-fit">
            <div className="w-2.5 h-2.5 bg-blue-600" />
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
                transition={{ duration: 0.4, delay: i * 0.05 }}
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 mb-16"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.id}
              variants={itemVariants}
              className="flex flex-col group"
            >
              {/* Icon */}
              <div className="mb-8">
                <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-blue-600 shadow-lg shadow-blue-600/20 transform transition-transform group-hover:scale-110 duration-300">
                  {feature.icon}
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col gap-3">
                <h4 className="text-gray-900 text-xl font-medium tracking-tight font-sans">
                  {feature.title}
                </h4>
                <p className="text-balance text-gray-600 text-base leading-relaxed font-sans">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button
            size="lg"
            className="bg-blue-600 text-white hover:bg-blue-700 px-8"
          >
            Explore Full Features
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-blue-600 text-blue-600 hover:bg-blue-50 bg-white px-8"
          >
            Compare vs. Legacy
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
