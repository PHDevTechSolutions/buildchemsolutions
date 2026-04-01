"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Shield,
  Award,
  Wrench,
  Droplets,
  FlaskConical,
  Layers,
  PaintBucket,
  HardHat,
  CheckCircle2,
} from "lucide-react";
import Navbar from "@/components/homepage/nav";
import { Footer } from "@/components/homepage/footer";

const services = [
  {
    icon: <FlaskConical size={20} className="text-blue-600" />,
    title: "Construction Chemicals",
    desc: "High-performance chemical solutions engineered for the demands of modern construction projects.",
  },
  {
    icon: <Droplets size={20} className="text-blue-600" />,
    title: "Waterproofing Solutions",
    desc: "Comprehensive waterproofing systems that protect structures from water ingress and moisture damage.",
  },
  {
    icon: <Layers size={20} className="text-blue-600" />,
    title: "Concrete Admixtures",
    desc: "Advanced admixtures that enhance workability, strength, and durability of concrete mixes.",
  },
  {
    icon: <Wrench size={20} className="text-blue-600" />,
    title: "Tile Adhesives & Grouts",
    desc: "Professional-grade adhesive and grouting systems for lasting tile installations.",
  },
  {
    icon: <PaintBucket size={20} className="text-blue-600" />,
    title: "Protective Coatings",
    desc: "Specialized coatings that shield surfaces from corrosion, chemical attack, and weathering.",
  },
  {
    icon: <HardHat size={20} className="text-blue-600" />,
    title: "Repair & Rehabilitation",
    desc: "Targeted repair mortars and rehabilitation products that restore structural integrity.",
  },
];

const features = [
  "Expert Technical Services and On-Site Support",
  "Flexible Pricing Designed for Project Needs",
  "International-Grade Quality and Performance",
];

const stats = [
  { value: "20+", label: "Years of Experience" },
  { value: "500+", label: "Projects Completed" },
  { value: "100+", label: "Products Available" },
  { value: "50+", label: "Industry Partners" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative h-[55vh] min-h-[400px] flex items-end">
        <Image
          src="/images/hero-image.jpg"
          alt="About Buildchem"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 pb-16 md:pb-24">
          <p className="text-xs md:text-sm uppercase tracking-wider text-white/60 mb-3 font-medium">
            Buildchem Solutions
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white tracking-tight mb-4 leading-tight">
            About <span className="text-white/60">Us</span>
          </h1>
          <p className="text-white/70 text-base max-w-xl leading-relaxed">
            A trusted partner in the construction industry, delivering
            innovative solutions since our founding.
          </p>
        </div>
      </section>

      {/* ── INTRO ── */}
      <section className="py-24 md:py-32 bg-white border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div>
                <div className="flex items-center gap-3 px-4 py-2 border border-gray-300 w-fit mb-6">
                  <div className="w-2.5 h-2.5 bg-blue-600" />
                  <span className="text-sm font-medium text-gray-600 tracking-wide">
                    Who We Are
                  </span>
                </div>
                <h2 className="text-balance text-4xl md:text-5xl font-normal leading-tight tracking-tight text-gray-900 mb-6">
                  {"Concrete Made Better".split(" ").map((word, i) => (
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
                <p className="text-gray-600 text-base leading-relaxed mb-4">
                  Buildchem Solutions Inc. is a leading provider of construction
                  chemicals and building materials solutions. We are a trusted
                  partner in the construction industry, offering innovative
                  products that enhance performance, durability, and
                  sustainability.
                </p>
                <p className="text-gray-600 text-base leading-relaxed">
                  From small residential projects to large-scale infrastructure,
                  our comprehensive product range and expert technical team
                  ensure every structure is built to last.
                </p>
              </div>

              <ul className="space-y-3">
                {features.map((f, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.1 }}
                    className="flex items-center gap-3 text-sm text-gray-700"
                  >
                    <CheckCircle2
                      size={16}
                      className="text-blue-600 flex-shrink-0"
                    />
                    {f}
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-px bg-gray-200">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="bg-white p-8 md:p-10 flex flex-col justify-center"
                >
                  <span className="text-4xl md:text-5xl font-semibold text-blue-600 tracking-tight mb-2">
                    {stat.value}
                  </span>
                  <span className="text-xs uppercase tracking-wider text-gray-500 font-medium">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="py-24 md:py-32 bg-white border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <div className="flex flex-col gap-4 max-w-xl mb-16">
            <div className="flex items-center gap-3 px-4 py-2 border border-gray-300 w-fit">
              <div className="w-2.5 h-2.5 bg-blue-600" />
              <span className="text-sm font-medium text-gray-600 tracking-wide">
                What We Offer
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-normal text-gray-900 tracking-tight">
              {"Our Services".split(" ").map((word, i) => (
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
            <p className="text-gray-600 text-base leading-relaxed">
              Comprehensive construction chemical solutions tailored to every
              project requirement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-200">
            {services.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="bg-white p-8 group hover:bg-blue-50/30 transition-colors duration-300"
              >
                <div className="w-10 h-10 bg-blue-50 flex items-center justify-center mb-5 group-hover:bg-blue-100 transition-colors">
                  {s.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {s.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {s.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── KEY FEATURES ── */}
      <section className="py-24 md:py-32 bg-white border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-3 px-4 py-2 border border-gray-300 w-fit mb-6">
                <div className="w-2.5 h-2.5 bg-blue-600" />
                <span className="text-sm font-medium text-gray-600 tracking-wide">
                  Why Choose Us
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-normal text-gray-900 tracking-tight mb-8">
                {"The Buildchem Advantage".split(" ").map((word, i) => (
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

              <div className="space-y-6">
                {[
                  {
                    icon: <Award size={18} className="text-blue-600" />,
                    title: "Expert Technical Services",
                    desc: "Our team of certified engineers provides on-site support and technical guidance throughout your project lifecycle.",
                  },
                  {
                    icon: <Shield size={18} className="text-blue-600" />,
                    title: "International-Grade Quality",
                    desc: "All products meet or exceed international standards, ensuring consistent performance and reliability.",
                  },
                  {
                    icon: <CheckCircle2 size={18} className="text-blue-600" />,
                    title: "Flexible Project Pricing",
                    desc: "Tailored pricing structures designed to fit project budgets of all sizes without compromising quality.",
                  },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    className="flex gap-4 p-6 border border-gray-200 hover:border-blue-200 hover:shadow-sm transition-all duration-300"
                  >
                    <div className="w-9 h-9 bg-blue-50 flex items-center justify-center flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-gray-900 mb-1">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Image column */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative aspect-[4/3] overflow-hidden"
            >
              <Image
                src="/images/hero-image.jpg"
                alt="Buildchem Solutions"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-white/95 p-6">
                  <p className="text-xs uppercase tracking-wider text-blue-600 font-semibold mb-1">
                    Our Mission
                  </p>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    To provide innovative construction chemical solutions that
                    empower builders to create durable, sustainable structures.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/hero-image.jpg')" }}
        >
          <div className="absolute inset-0 bg-black/55" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-24 md:py-32">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-normal text-white tracking-tight mb-6 leading-tight">
              {"Ready to Build Better?".split(" ").map((word, i) => (
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
            <p className="text-white/75 text-base leading-relaxed mb-8 max-w-lg">
              Explore our full range of construction chemical solutions or speak
              with our technical team today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="/solutions"
                className="inline-flex items-center justify-center gap-2 bg-white text-gray-900 px-6 py-3 text-sm font-medium hover:bg-white/90 transition-colors"
              >
                View Solutions
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 border border-white/40 text-white px-6 py-3 text-sm font-medium hover:bg-white/10 transition-colors"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
