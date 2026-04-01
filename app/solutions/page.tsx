"use client";

import { useState, useEffect, useMemo } from "react";
import Navbar from "@/components/homepage/nav";
import { Footer } from "@/components/homepage/footer";
import {
  Loader2,
  ChevronDown,
  ArrowRight,
  ShieldCheck,
  Layers,
  Wrench,
  HardHat,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

// ── Static metadata keyed by label — gracefully ignored for unknown labels ────
const LABEL_META: Record<
  string,
  { description: string; icon: React.ReactNode }
> = {
  Build: {
    description:
      "Foundation chemicals, concrete admixtures, and structural systems engineered for strength from the ground up.",
    icon: <HardHat size={20} className="text-blue-600" />,
  },
  Protect: {
    description:
      "Advanced waterproofing membranes, crystalline systems, and moisture barriers that guard structures for decades.",
    icon: <ShieldCheck size={20} className="text-blue-600" />,
  },
  Finish: {
    description:
      "Tile adhesives, grouts, surface coatings, and decorative treatments that define the final look and feel.",
    icon: <Layers size={20} className="text-blue-600" />,
  },
  Repair: {
    description:
      "Rehabilitation mortars, injection systems, and patching compounds that restore structural integrity.",
    icon: <Wrench size={20} className="text-blue-600" />,
  },
};

const WHY_ITEMS = [
  {
    title: "Field-Tested Formulations",
    body: "Every product has been validated on real Philippine construction sites — from high-rise cores in BGC to below-grade basements in Cebu.",
  },
  {
    title: "Full-Lifecycle Coverage",
    body: "We cover every phase: ground-up construction, envelope protection, interior finishing, and long-term rehabilitation — a single trusted source from slab to facade.",
  },
  {
    title: "Technical Support On-Site",
    body: "Our certified engineers review substrate conditions, oversee application, and sign off on quality — they don't just sell products.",
  },
  {
    title: "International Standards",
    body: "All solutions meet or exceed ASTM, BS EN, and ISO benchmarks, giving specifiers the confidence to include them in compliance-critical projects.",
  },
];

// ── Order known labels predictably; unknown labels sorted alphabetically after ─
const KNOWN_ORDER = ["Build", "Protect", "Finish", "Repair"];

function sortLabels(labels: string[]): string[] {
  const known = KNOWN_ORDER.filter((l) => labels.includes(l));
  const rest = labels.filter((l) => !KNOWN_ORDER.includes(l)).sort();
  return [...known, ...rest];
}

// ─────────────────────────────────────────────────────────────────────────────

export default function SolutionsPage() {
  const [solutions, setSolutions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  // CATEGORIES is the default view
  const [activeTab, setActiveTab] = useState<"CATEGORIES" | "ALL">(
    "CATEGORIES",
  );
  // Track which groups are open — start with all open once data arrives
  const [openGroups, setOpenGroups] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetch = async () => {
      try {
        const snap = await getDocs(collection(db, "solutions"));
        const data = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setSolutions(data);
        // Auto-open every group on first load
        const labels = Array.from(
          new Set(data.map((s: any) => (s.label || "Other").trim())),
        ) as string[];
        setOpenGroups(new Set(labels.length ? labels : ["Other"]));
      } catch (err) {
        console.error("Error fetching solutions:", err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  // Dynamically group by the `label` field read from Firestore
  const { groupedMap, orderedLabels } = useMemo(() => {
    const map: Record<string, any[]> = {};
    solutions.forEach((sol) => {
      const lbl = (sol.label || "Other").trim();
      if (!map[lbl]) map[lbl] = [];
      map[lbl].push(sol);
    });
    return { groupedMap: map, orderedLabels: sortLabels(Object.keys(map)) };
  }, [solutions]);

  const toggleGroup = (label: string) => {
    setOpenGroups((prev) => {
      const next = new Set(prev);
      next.has(label) ? next.delete(label) : next.add(label);
      return next;
    });
  };

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative h-[55vh] min-h-[400px] flex items-end">
        <Image
          src="/images/hero-image.jpg"
          alt="Solutions Hero"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 pb-16 md:pb-24">
          <div className="flex items-center gap-3 px-4 py-2 border border-white/30 w-fit mb-6">
            <div className="w-2 h-2 bg-blue-500" />
            <span className="text-xs font-medium text-white/70 tracking-widest uppercase">
              Buildchem Solutions
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal text-white tracking-tight mb-4 leading-tight">
            {"Solutions Built to Last".split(" ").map((word, i) => (
              <motion.span
                key={i}
                initial={{ filter: "blur(10px)", opacity: 0 }}
                animate={{ filter: "blur(0px)", opacity: 1 }}
                transition={{ duration: 0.45, delay: 0.1 + i * 0.08 }}
                className="inline-block mr-[0.25em]"
              >
                {word}
              </motion.span>
            ))}
          </h1>
          <p className="text-white/70 text-base md:text-lg max-w-2xl leading-relaxed">
            A complete portfolio of construction chemical solutions — from
            structural foundations to protective envelopes, surface finishes,
            and long-term rehabilitation.
          </p>
        </div>
      </section>

      {/* ── Stats strip ── */}
      <section className="bg-white border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-gray-200">
            {[
              { value: "100+", label: "Products Available" },
              { value: "500+", label: "Projects Completed" },
              { value: "20+", label: "Years of Experience" },
              { value: "50+", label: "Industry Partners" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="bg-white px-8 py-8 flex flex-col"
              >
                <span className="text-3xl md:text-4xl font-semibold text-blue-600 tracking-tight mb-1">
                  {stat.value}
                </span>
                <span className="text-xs uppercase tracking-wider text-gray-500 font-medium">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tabs + Solutions ── */}
      <section className="py-16 md:py-24 bg-white border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          {/* Section header */}
          <div className="flex flex-col gap-4 mb-12">
            <div className="flex items-center gap-3 px-4 py-2 border border-gray-300 w-fit">
              <div className="w-2.5 h-2.5 bg-blue-600" />
              <span className="text-sm font-medium text-gray-600 tracking-wide">
                Product Range
              </span>
            </div>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <h2 className="text-4xl md:text-5xl font-normal text-gray-900 tracking-tight max-w-xl">
                {"Browse Our Solutions".split(" ").map((word, i) => (
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
              <p className="text-sm text-gray-500 max-w-sm leading-relaxed">
                Browse by category to find the right solution for your project
                phase, or view all solutions at once.
              </p>
            </div>
          </div>

          {/* Tab bar */}
          <div className="mb-10 flex items-center border-b border-gray-200">
            {(["CATEGORIES", "ALL"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 text-[11px] font-semibold tracking-widest uppercase transition-all ${
                  activeTab === tab
                    ? "border-b-2 border-blue-600 text-gray-900 -mb-[1px]"
                    : "text-gray-400 hover:text-gray-700"
                }`}
              >
                {tab === "CATEGORIES" ? "By Category" : "All Solutions"}
              </button>
            ))}
          </div>

          {/* Loading state */}
          {loading && (
            <div className="flex justify-center py-24">
              <Loader2 className="animate-spin text-blue-600" size={36} />
            </div>
          )}

          {/* ══ BY CATEGORY (default) ══════════════════════════════════════ */}
          {!loading && activeTab === "CATEGORIES" && (
            <div className="space-y-4">
              {orderedLabels.map((label) => {
                const items = groupedMap[label];
                const isOpen = openGroups.has(label);
                const meta = LABEL_META[label];

                return (
                  <div
                    key={label}
                    className={`border transition-all duration-300 ${
                      isOpen
                        ? "border-blue-200 bg-blue-50/20"
                        : "border-gray-200 bg-white hover:border-blue-200 hover:shadow-sm"
                    }`}
                  >
                    {/* Header */}
                    <button
                      onClick={() => toggleGroup(label)}
                      className="w-full flex items-center justify-between p-6 md:p-8 text-left"
                    >
                      <div className="flex items-start gap-5">
                        <div
                          className={`w-10 h-10 flex items-center justify-center flex-shrink-0 transition-colors ${
                            isOpen ? "bg-blue-100" : "bg-gray-50"
                          }`}
                        >
                          {meta?.icon ?? (
                            <CheckCircle2 size={20} className="text-blue-600" />
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <h3
                              className={`text-xl md:text-2xl font-semibold tracking-tight transition-colors ${
                                isOpen ? "text-gray-900" : "text-gray-700"
                              }`}
                            >
                              {label}
                            </h3>
                            <span
                              className={`text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 transition-colors ${
                                isOpen
                                  ? "bg-blue-600 text-white"
                                  : "bg-gray-100 text-gray-500"
                              }`}
                            >
                              {items.length}{" "}
                              {items.length === 1 ? "solution" : "solutions"}
                            </span>
                          </div>
                          {meta?.description && (
                            <p className="text-sm text-gray-500 max-w-lg leading-relaxed">
                              {meta.description}
                            </p>
                          )}
                        </div>
                      </div>
                      <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.25 }}
                        className={`flex-shrink-0 w-9 h-9 flex items-center justify-center border transition-colors ${
                          isOpen
                            ? "bg-blue-600 border-blue-600 text-white"
                            : "border-gray-200 text-gray-400"
                        }`}
                      >
                        <ChevronDown size={18} />
                      </motion.div>
                    </button>

                    {/* Body — CSS grid-rows for smooth height animation */}
                    <div
                      className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                        isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="px-6 pb-8 md:px-8 md:pb-10 border-t border-gray-200/70">
                          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5 pt-6">
                            {items.map((solution, idx) => (
                              <SolutionCard
                                key={solution.id}
                                solution={solution}
                                index={idx}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {orderedLabels.length === 0 && (
                <p className="text-center text-gray-400 py-20 text-sm">
                  No solutions available at this time.
                </p>
              )}
            </div>
          )}

          {/* ══ ALL SOLUTIONS ═══════════════════════════════════════════════ */}
          {!loading && activeTab === "ALL" && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {solutions.length === 0 ? (
                <p className="col-span-full text-center text-gray-400 py-20 text-sm">
                  No solutions available at this time.
                </p>
              ) : (
                solutions.map((solution, index) => (
                  <SolutionCard
                    key={solution.id}
                    solution={solution}
                    index={index}
                  />
                ))
              )}
            </div>
          )}
        </div>
      </section>

      {/* ── Why Buildchem ── */}
      <section className="py-24 md:py-32 bg-white border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 px-4 py-2 border border-gray-300 w-fit">
                <div className="w-2.5 h-2.5 bg-blue-600" />
                <span className="text-sm font-medium text-gray-600 tracking-wide">
                  Why Buildchem
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-normal text-gray-900 tracking-tight leading-tight">
                {"The Right Chemistry for Every Project Phase"
                  .split(" ")
                  .map((word, i) => (
                    <motion.span
                      key={i}
                      initial={{ filter: "blur(10px)", opacity: 0 }}
                      whileInView={{ filter: "blur(0px)", opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.04 }}
                      className="inline-block mr-[0.25em]"
                    >
                      {word}
                    </motion.span>
                  ))}
              </h2>
              <p className="text-gray-600 text-base leading-relaxed max-w-lg">
                Construction chemicals aren't interchangeable. The wrong product
                applied to the wrong substrate — even correctly — will fail.
                Buildchem's portfolio is structured around actual project
                lifecycle stages, so you always start with the right product for
                the right phase.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 text-sm font-medium transition-colors"
              >
                Request Technical Guidance <ArrowRight size={15} />
              </Link>
            </div>

            {/* Right */}
            <div className="space-y-5">
              {WHY_ITEMS.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="flex gap-4 p-6 border border-gray-200 hover:border-blue-200 hover:shadow-sm transition-all duration-300"
                >
                  <CheckCircle2
                    size={18}
                    className="text-blue-600 flex-shrink-0 mt-0.5"
                  />
                  <div>
                    <h4 className="text-base font-semibold text-gray-900 mb-1">
                      {item.title}
                    </h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {item.body}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="py-24 md:py-32 bg-white border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <div className="flex flex-col gap-4 mb-16 max-w-2xl">
            <div className="flex items-center gap-3 px-4 py-2 border border-gray-300 w-fit">
              <div className="w-2.5 h-2.5 bg-blue-600" />
              <span className="text-sm font-medium text-gray-600 tracking-wide">
                How It Works
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-normal text-gray-900 tracking-tight">
              {"From Specification to Application".split(" ").map((word, i) => (
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
              We don't hand off a product and walk away. Our process is designed
              to support you from the first spec sheet to the final quality
              check.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-200">
            {[
              {
                step: "01",
                title: "Browse & Select",
                body: "Explore our solution categories or request a consultation to identify the right product for your substrate and exposure conditions.",
              },
              {
                step: "02",
                title: "Request Datasheets",
                body: "Add products to your catalog request. Technical datasheets are delivered to your inbox for inclusion in project specifications.",
              },
              {
                step: "03",
                title: "On-Site Assessment",
                body: "For complex projects, our engineers conduct a site visit to assess conditions and recommend application methods.",
              },
              {
                step: "04",
                title: "Application & QA",
                body: "We support application teams with training and quality assurance checks to ensure products are applied correctly the first time.",
              },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="bg-white p-8 md:p-10 group hover:bg-blue-50/30 transition-colors duration-300"
              >
                <p className="text-4xl font-semibold text-blue-100 mb-6 group-hover:text-blue-200 transition-colors">
                  {s.step}
                </p>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {s.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {s.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/hero-image.jpg')" }}
        >
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-24 md:py-32 text-center">
          <h2 className="text-3xl md:text-4xl font-normal text-white mb-4 tracking-tight">
            Not sure which solution fits your project?
          </h2>
          <p className="text-white/75 text-base leading-relaxed mb-8 max-w-xl mx-auto">
            Our technical team can review your project drawings, substrate
            conditions, and exposure requirements — and recommend the right
            product at no obligation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-white text-gray-900 px-8 py-3 text-sm font-medium hover:bg-white/90 transition-colors"
            >
              Get a Free Consultation <ArrowRight size={15} />
            </Link>
            <Link
              href="/checkout"
              className="inline-flex items-center justify-center gap-2 border border-white/40 text-white px-8 py-3 text-sm font-medium hover:bg-white/10 transition-colors"
            >
              Request Datasheets
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

// ── Reusable card ─────────────────────────────────────────────────────────────
function SolutionCard({ solution, index }: { solution: any; index: number }) {
  return (
    <Link href={`/solutions/${solution.id}`} className="block group">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.35, delay: Math.min(index * 0.04, 0.3) }}
        className="h-full bg-white border border-gray-200 group-hover:border-blue-200 group-hover:shadow-sm overflow-hidden transition-all duration-300 flex flex-col"
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={solution.mainImage || "/placeholder.svg"}
            alt={solution.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
        </div>
        <div className="p-4 md:p-5 flex-grow flex flex-col justify-center">
          <h3 className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-200 leading-snug">
            {solution.title}
          </h3>
          <div className="mt-2 w-6 h-px bg-blue-600 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
        </div>
      </motion.div>
    </Link>
  );
}
