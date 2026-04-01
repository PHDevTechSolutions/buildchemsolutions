"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import {
  ArrowRight,
  ChevronDown,
  CheckCircle2,
  Star,
  Lightbulb,
  Target,
  Zap,
  Users,
  MapPin,
  Clock,
  Briefcase,
} from "lucide-react";
import Navbar from "@/components/homepage/nav";
import { Footer } from "@/components/homepage/footer";

export default function CareersPage() {
  const [expandedJob, setExpandedJob] = useState<string | null>(null);
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "careers"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const jobsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setJobs(jobsData.filter((job: any) => job.status === "Open"));
        setLoading(false);
      },
      () => setLoading(false),
    );
    return () => unsubscribe();
  }, []);

  const benefits = [
    {
      icon: <Zap size={24} className="text-blue-600" />,
      title: "Fast-Growing & Innovative",
      desc: "Be at the forefront of construction industry innovation.",
    },
    {
      icon: <Target size={24} className="text-blue-600" />,
      title: "Learn & Grow",
      desc: "Mentorship and hands-on training to become an expert.",
    },
    {
      icon: <Users size={24} className="text-blue-600" />,
      title: "Collaborative Culture",
      desc: "Work in a dynamic, fun, and supportive environment.",
    },
    {
      icon: <Lightbulb size={24} className="text-blue-600" />,
      title: "Driven by Impact",
      desc: "Contribute to projects that make a real difference.",
    },
    {
      icon: <Star size={24} className="text-blue-600" />,
      title: "Competitive Compensation",
      desc: "We value top talent and offer excellent benefits.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative h-[55vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <Image
          src="/images/hero-image.jpg"
          alt="Careers at Buildchem"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/55 to-black/70" />
        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-3 px-4 py-2 border border-white/30 w-fit mx-auto mb-6">
            <div className="w-2 h-2 bg-blue-400" />
            <span className="text-xs font-medium text-white/80 tracking-wide uppercase">
              Join Our Team
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight text-white mb-4">
            {"Build Your Career".split(" ").map((word, i) => (
              <motion.span
                key={i}
                initial={{ filter: "blur(10px)", opacity: 0 }}
                animate={{ filter: "blur(0px)", opacity: 1 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="inline-block mr-[0.25em]"
              >
                {word}
              </motion.span>
            ))}
          </h1>
          <p className="text-white/75 text-base md:text-lg leading-relaxed">
            Join a team driving innovation and excellence in construction
            solutions.
          </p>
        </div>
      </section>

      {/* ── OPEN POSITIONS ── */}
      <section className="py-24 md:py-32 bg-white border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <div className="flex flex-col gap-6 mb-16">
            <div className="flex items-center gap-3 px-4 py-2 border border-gray-300 w-fit">
              <div className="w-2.5 h-2.5 bg-blue-600" />
              <span className="text-sm font-medium text-gray-600 tracking-wide">
                Available Positions
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-normal text-gray-900 tracking-tight">
              {"Current Openings".split(" ").map((word, i) => (
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
            <p className="text-gray-600 text-base max-w-xl leading-relaxed">
              We&apos;re looking for passionate people who want to make an
              impact in the construction industry.
            </p>
          </div>

          {/* Job List */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-48 bg-gray-50 animate-pulse border border-gray-200"
                />
              ))}
            </div>
          ) : jobs.length === 0 ? (
            <div className="text-center py-24 border border-gray-200">
              <Briefcase size={36} className="text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg font-medium">
                No open positions at the moment.
              </p>
              <p className="text-gray-400 text-sm mt-2">
                Check back soon or send us your CV.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {jobs.map((job, idx) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className={`border transition-all duration-300 ${
                    expandedJob === job.id
                      ? "border-blue-200 bg-blue-50/30"
                      : "border-gray-200 bg-white hover:border-blue-200 hover:shadow-sm"
                  }`}
                >
                  <button
                    onClick={() =>
                      setExpandedJob(expandedJob === job.id ? null : job.id)
                    }
                    className="w-full text-left p-6 md:p-8"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex flex-wrap gap-2 mb-3">
                          <span className="text-[10px] font-semibold uppercase tracking-wider bg-gray-900 text-white px-2.5 py-1">
                            {job.category}
                          </span>
                          <span className="text-[10px] font-medium text-gray-500 uppercase tracking-wider border border-gray-200 px-2.5 py-1">
                            {job.jobType}
                          </span>
                        </div>
                        <h3 className="text-xl md:text-2xl font-semibold text-gray-900 tracking-tight mb-3">
                          {job.title}
                        </h3>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1.5">
                            <MapPin size={13} className="text-blue-600" />
                            {job.location || "Metro Manila"}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Clock size={13} className="text-blue-600" />
                            {job.jobType || "Full-time"}
                          </span>
                        </div>
                      </div>
                      <motion.div
                        animate={{ rotate: expandedJob === job.id ? 180 : 0 }}
                        transition={{ duration: 0.25 }}
                        className={`w-9 h-9 flex items-center justify-center flex-shrink-0 border transition-colors ${
                          expandedJob === job.id
                            ? "bg-blue-600 border-blue-600 text-white"
                            : "border-gray-200 text-gray-400"
                        }`}
                      >
                        <ChevronDown size={18} />
                      </motion.div>
                    </div>
                  </button>

                  <AnimatePresence>
                    {expandedJob === job.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 md:px-8 pb-8 pt-0 border-t border-gray-200">
                          <p className="text-sm text-gray-500 uppercase tracking-wider font-semibold mb-4 pt-6">
                            Qualifications
                          </p>
                          <ul className="space-y-3 mb-8">
                            {job.qualifications?.map((q: string, i: number) => (
                              <li
                                key={i}
                                className="flex items-start gap-3 text-sm text-gray-700"
                              >
                                <CheckCircle2
                                  size={15}
                                  className="text-blue-600 mt-0.5 flex-shrink-0"
                                />
                                {q}
                              </li>
                            ))}
                          </ul>
                          <Link
                            href={{
                              pathname: "/careers/apply",
                              query: { jobId: job.id, jobTitle: job.title },
                            }}
                            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 text-sm font-medium transition-colors"
                          >
                            Apply for this Position
                            <ArrowRight size={15} />
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── BENEFITS ── */}
      <section className="py-24 md:py-32 bg-white border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <div className="flex flex-col gap-6 mb-16">
            <div className="flex items-center gap-3 px-4 py-2 border border-gray-300 w-fit">
              <div className="w-2.5 h-2.5 bg-blue-600" />
              <span className="text-sm font-medium text-gray-600 tracking-wide">
                Why Join Us
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-normal text-gray-900 tracking-tight">
              {"Culture & Benefits".split(" ").map((word, i) => (
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
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="p-8 border border-gray-200 hover:border-blue-200 hover:shadow-sm transition-all duration-300 group"
              >
                <div className="w-10 h-10 bg-blue-50 flex items-center justify-center mb-5 group-hover:bg-blue-100 transition-colors">
                  {b.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {b.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {b.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/hero-image.jpg')" }}
        >
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-24 md:py-32 text-center">
          <h2 className="text-3xl md:text-4xl font-normal text-white mb-4 tracking-tight">
            Don&apos;t see the right role?
          </h2>
          <p className="text-white/75 text-base leading-relaxed mb-8 max-w-xl mx-auto">
            We&apos;re always on the lookout for passionate people. Send us your
            CV and we&apos;ll be in touch.
          </p>
          <a
            href="mailto:info@buildchem.com.ph"
            className="inline-flex items-center gap-2 bg-white text-gray-900 px-8 py-3 text-sm font-medium hover:bg-white/90 transition-colors"
          >
            Send Your CV
            <ArrowRight size={15} />
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
