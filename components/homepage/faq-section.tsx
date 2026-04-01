"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    id: "1",
    question: "What types of projects are your products suitable for?",
    answer:
      "Our product range covers residential, commercial, and infrastructure projects of all scales. From waterproofing a basement apartment to rehabilitating a multi-storey carpark or protecting a bridge deck — we have a tested solution for every application and exposure condition.",
  },
  {
    id: "2",
    question:
      "Are your products compliant with local and international standards?",
    answer:
      "Yes. All our products are tested and certified to meet relevant Philippine national standards as well as internationally recognized benchmarks including ASTM, BS EN, and ISO. We provide full technical datasheets and certificates of conformance upon request.",
  },
  {
    id: "3",
    question: "Do you provide on-site technical support?",
    answer:
      "Absolutely. Our team of trained technical representatives is available for on-site consultations, application guidance, and quality checks throughout your project. We believe product performance starts with proper application, and we're committed to being there every step of the way.",
  },
  {
    id: "4",
    question: "How do I select the right waterproofing system for my project?",
    answer:
      "The right system depends on factors like substrate type, exposure to water pressure, foot traffic, and aesthetic requirements. Our technical team will assess your site conditions and recommend the most suitable solution — whether that's a cementitious coating, crystalline system, liquid membrane, or sheet-applied product.",
  },
  {
    id: "5",
    question: "Can your concrete admixtures be used with any mix design?",
    answer:
      "Our admixtures are compatible with most standard and blended cement mixes. We recommend a pre-project trial mix to confirm compatibility and establish optimal dosage rates. Our technical staff can assist with mix design optimization at no additional cost.",
  },
];

export function FaqSection() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleQuestion = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section
      id="faq"
      className="w-full bg-white py-24 md:py-32 border-b border-gray-200/50"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Column - Header */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3 px-4 py-2 border border-gray-300 w-fit">
              <div className="w-2.5 h-2.5 bg-[#004AAD]" />
              <span className="text-sm font-medium text-gray-600 tracking-wide">
                FAQ
              </span>
            </div>

            <h2 className="text-balance text-4xl md:text-5xl lg:text-6xl font-normal text-gray-900 tracking-tight leading-[1.1]">
              {"Common Questions".split(" ").map((word, i) => (
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

            <p className="text-balance text-base md:text-lg text-gray-600 leading-relaxed max-w-md">
              Get quick answers about our construction chemicals, application
              processes, and technical support. Can't find what you're looking
              for? Reach out to our team directly.
            </p>
          </div>

          {/* Right Column - FAQ Items */}
          <div className="flex flex-col">
            {faqs.map((faq, index) => (
              <div
                key={faq.id}
                className={cn(
                  "border-t border-gray-200/50",
                  index === faqs.length - 1 && "border-b",
                )}
              >
                <button
                  onClick={() => toggleQuestion(faq.id)}
                  className="w-full py-6 flex items-center justify-between gap-4 text-left group"
                >
                  <span className="text-lg md:text-xl font-normal text-gray-900 group-hover:text-gray-700 transition-colors">
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: openId === faq.id ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex-shrink-0"
                  >
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {openId === faq.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="pb-6 pr-12">
                        <p className="text-base leading-relaxed text-gray-600">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
