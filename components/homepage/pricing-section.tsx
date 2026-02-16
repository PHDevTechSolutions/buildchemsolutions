"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface PricingPlan {
  id: string;
  name: string;
  priceMonthly: number | string;
  priceYearly: number | string;
  description: string;
  features: string[];
  cta: string;
  popular?: boolean;
  type: "subscription" | "custom";
}

const plans: PricingPlan[] = [
  {
    id: "sentinel",
    name: "Sentinel",
    priceMonthly: 299,
    priceYearly: 239,
    description:
      "Essential threat detection for growing teams and small infrastructure.",
    features: [
      "Up to 100 endpoints",
      "Real-time threat monitoring",
      "Email & chat support",
      "Weekly threat reports",
    ],
    cta: "Start Free Trial",
    type: "subscription",
  },
  {
    id: "aegis",
    name: "Aegis Pro",
    priceMonthly: 799,
    priceYearly: 639,
    description:
      "Advanced AI-powered protection with autonomous patching for mid-size organizations.",
    features: [
      "Up to 500 endpoints",
      "Autonomous threat neutralization",
      "Dark web reconnaissance",
      "24/7 priority support",
      "Daily threat intelligence",
    ],
    cta: "Deploy Aegis Pro",
    popular: true,
    type: "subscription",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    priceMonthly: "Custom",
    priceYearly: "Custom",
    description:
      "Full Aegis Core deployment with dedicated security team and custom integrations.",
    features: [
      "Unlimited endpoints",
      "Dedicated security analyst",
      "Custom threat modeling",
      "On-premise deployment option",
      "SLA guarantee & compliance",
    ],
    cta: "Contact Sales",
    type: "custom",
  },
];

export function PricingSection() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section
      id="pricing"
      className="w-full bg-white py-24 md:py-32 border-b border-gray-200/50"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
        {/* Header */}
        <div className="mb-16 flex flex-col gap-4">
          <div className="flex items-center gap-3 px-4 py-2 border border-gray-300 w-fit">
            <div className="w-2.5 h-2.5 bg-blue-600" />
            <span className="text-sm font-medium text-gray-600 tracking-wide">Pricing</span>
          </div>
          <h2 className="text-balance text-4xl md:text-5xl tracking-tight leading-tight font-normal text-gray-900">
            <span className="block">
              {"Choose the plan".split(" ").map((word, i) => (
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
            </span>
            <span className="block text-gray-600">
              {"that matches your ambition".split(" ").map((word, i) => (
                <motion.span
                  key={i + 3}
                  initial={{ filter: "blur(10px)", opacity: 0 }}
                  whileInView={{ filter: "blur(0px)", opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: (i + 3) * 0.05 }}
                  className="inline-block mr-[0.25em]"
                >
                  {word}
                </motion.span>
              ))}
            </span>
          </h2>
        </div>

        {/* Switch and Plans Container */}
        <div className="flex flex-col gap-10 w-full">
          {/* Billing Toggle */}
          <div className="flex items-center gap-4">
            <span
              className={cn(
                "text-lg transition-colors duration-200",
                !isYearly ? "text-gray-900" : "text-gray-500"
              )}
            >
              Monthly
            </span>

            <button
              onClick={() => setIsYearly(!isYearly)}
              className="relative w-12 h-6 bg-gray-300 cursor-pointer p-1"
            >
              <motion.div
                animate={{
                  x: isYearly ? 24 : 0,
                }}
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 30,
                }}
                className="w-4 h-4 bg-white"
              />
            </button>

            <span
              className={cn(
                "text-lg transition-colors duration-200",
                isYearly ? "text-gray-900" : "text-gray-500"
              )}
            >
              Yearly
            </span>

            <div className="bg-blue-50 px-3 py-1.5 border border-blue-200">
              <span className="text-xs font-medium text-blue-600">
                20% OFF
              </span>
            </div>
          </div>

          {/* Pricing Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
            {plans.map((plan) => (
              <motion.div
                key={plan.id}
                whileHover={{
                  scale: 1.02,
                }}
                className={cn(
                  "relative flex flex-col gap-6 p-6 transition-all duration-300",
                  plan.popular
                    ? "bg-blue-50 border border-blue-200 shadow-sm"
                    : "bg-gray-50 border border-gray-200"
                )}
              >
                {/* Card Head */}
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-normal text-gray-900">
                      {plan.name}
                    </span>
                    {plan.popular && (
                      <div className="bg-blue-100 border border-blue-300 px-2.5 py-1">
                        <span className="text-xs font-medium text-blue-600">
                          Popular
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-baseline gap-1">
                    <h3 className="text-4xl font-normal text-gray-900 tracking-tighter">
                      {typeof plan.priceMonthly === "number"
                        ? `$${isYearly ? plan.priceYearly : plan.priceMonthly}`
                        : plan.priceMonthly}
                    </h3>
                    {plan.type === "subscription" && (
                      <span className="text-sm text-gray-500">/month</span>
                    )}
                  </div>

                  <p className="text-balance text-sm leading-relaxed text-gray-600 min-h-[40px]">
                    {plan.description}
                  </p>
                </div>

                {/* CTA Button */}
                <button
                  className={cn(
                    "w-full py-3 px-4 text-sm font-medium transition-all duration-200 cursor-pointer",
                    plan.popular
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-white text-blue-600 border border-blue-600 hover:bg-blue-50"
                  )}
                >
                  {plan.cta}
                </button>

                {/* Divider */}
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-[1px] bg-gray-300" />
                  <span className="text-xs text-gray-500 shrink-0">
                    Features
                  </span>
                  <div className="flex-1 h-[1px] bg-gray-300" />
                </div>

                {/* Features List */}
                <ul className="flex flex-col gap-3">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 group">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                      <span className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
