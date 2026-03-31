"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import Image from "next/image";
import {
  ArrowRight,
  Globe,
  ChevronUp,
  ChevronDown,
  CheckCircle2,
  Star,
  Lightbulb,
  Target,
  Zap,
  Users,
  ArrowLeft,
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
      icon: <Zap className="text-[#dcb485]" />,
      title: "Fast-Growing and Innovative",
      desc: "Be at the forefront of industry innovation.",
    },
    {
      icon: <Target className="text-[#dcb485]" />,
      title: "Learn and Grow",
      desc: "Mentorship and hands-on training to become an expert.",
    },
    {
      icon: <Users className="text-[#dcb485]" />,
      title: "Collaborative Team Culture",
      desc: "Work in a dynamic, fun, and supportive environment.",
    },
    {
      icon: <Lightbulb className="text-[#dcb485]" />,
      title: "Driven by Impact",
      desc: "Contribute to projects that make real impact.",
    },
    {
      icon: <Star className="text-[#dcb485]" />,
      title: "Competitive Compensation",
      desc: "We value top talent and offer excellent benefits.",
    },
  ];

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-[#dcb485]/10 selection:text-[#dcb485] overflow-x-hidden">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative min-h-[60vh] md:min-h-[70vh] flex items-center justify-center overflow-hidden pt-safe-top pb-safe-bottom">
        <div className="absolute inset-0">
          <Image
            src="/images/vah-hero.png"
            alt="Careers at VAH"
            fill
            className="object-cover brightness-[0.20]"
            priority
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 w-full">
          <div className="flex flex-col items-center justify-center gap-8 text-center">
            {/* Text */}
            <div className="max-w-2xl w-full animate-[fadeUp_0.6s_ease-out]">
              <h1 className="text-[22px] xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-white mb-4 text-balance leading-tight">
                Join Our
                <span className="block text-[#dcb485]">Growing Team</span>
              </h1>

              <p className="text-[13px] xs:text-sm sm:text-base md:text-lg text-white/90 mb-8 text-pretty leading-relaxed">
                Be part of a dynamic team driving innovation and excellence in
                industrial solutions. We're looking for talented individuals who
                want to make an impact.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* JOBS SECTION */}
      <div className="pt-6 px-6 md:px-10 max-w-7xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-gray-500 hover:text-[#dcb485] transition-colors group"
        >
          <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-50 group-hover:bg-[#dcb485]/10 transition-colors">
            <ArrowLeft size={14} />
          </div>
          Back to Home
        </Link>
      </div>
      <section
        className="relative pt-20 pb-16 md:pt-32 md:pb-32 px-6"
        id="jobs"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mb-16"
          >
            <span className="text-[#dcb485] text-[10px] md:text-[11px] font-black uppercase tracking-[0.4em] mb-4 block italic">
              Available Positions
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter uppercase leading-[0.9]">
              Current <span className="text-[#dcb485]">Openings</span>
            </h2>
          </motion.div>

          {/* JOB LIST */}
          <div className="max-w-7xl mx-auto mt-16">
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start"
            >
              {loading
                ? [1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="h-64 w-full bg-gray-50 animate-pulse rounded-[2rem]"
                    />
                  ))
                : jobs.map((job) => (
                    <motion.div
                      layout
                      key={job.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                      className={`relative border transition-shadow duration-500 h-fit ${
                        expandedJob === job.id
                          ? "bg-gray-50 border-[#dcb485] shadow-2xl z-10"
                          : "bg-white border-gray-100 hover:border-gray-300 hover:shadow-lg z-0"
                      }`}
                    >
                      <div
                        className="p-8 md:p-10 cursor-pointer flex flex-col gap-6"
                        onClick={() =>
                          setExpandedJob(expandedJob === job.id ? null : job.id)
                        }
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex flex-wrap gap-2">
                            <span className="px-3 py-1 bg-black text-white text-[9px] font-bold uppercase rounded-md tracking-widest">
                              {job.category}
                            </span>
                            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest italic">
                              {job.jobType}
                            </span>
                          </div>
                          <motion.div
                            animate={{
                              rotate: expandedJob === job.id ? 180 : 0,
                            }}
                            className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors ${
                              expandedJob === job.id
                                ? "bg-[#dcb485] text-black"
                                : "bg-gray-50 text-gray-400"
                            }`}
                          >
                            <ChevronDown size={20} />
                          </motion.div>
                        </div>

                        <div>
                          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 uppercase tracking-tight leading-[1.1] mb-2">
                            {job.title}
                          </h3>
                          <p className="text-gray-500 text-[13px] flex items-center gap-1.5 font-bold italic">
                            <Globe size={14} className="text-[#dcb485]" />{" "}
                            {job.location}
                          </p>
                        </div>
                      </div>

                      <AnimatePresence>
                        {expandedJob === job.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="px-8 md:px-10 pb-10 pt-6 border-t border-gray-200">
                              <h4 className="text-[9px] font-bold uppercase text-[#dcb485] tracking-widest mb-4">
                                Qualifications:
                              </h4>
                              <ul className="space-y-3 mb-8">
                                {job.qualifications?.map(
                                  (q: string, i: number) => (
                                    <li
                                      key={i}
                                      className="flex gap-3 text-sm text-gray-700 font-medium leading-tight"
                                    >
                                      <CheckCircle2
                                        size={16}
                                        className="text-[#dcb485] shrink-0 mt-0.5"
                                      />{" "}
                                      {q}
                                    </li>
                                  ),
                                )}
                              </ul>

                              <Link
                                href={{
                                  pathname: "/careers/apply",
                                  query: {
                                    jobId: job.id,
                                    jobTitle: job.title,
                                  },
                                }}
                                className="w-full md:w-auto bg-gray-900 text-white px-8 py-5 rounded-xl font-bold uppercase text-[10px] tracking-widest hover:bg-[#dcb485] hover:text-gray-900 transition-all shadow-lg flex items-center justify-center gap-3"
                              >
                                Apply for this position <ArrowRight size={16} />
                              </Link>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* WHY WORK WITH US SECTION */}
      <section className="relative py-20 md:py-32 px-6 bg-[url('/images/HERO.png')] bg-cover bg-center">
        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />

        {/* CONTENT */}
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/90 rounded-full shadow-sm border border-gray-100 mb-4">
              <Star className="text-yellow-500 fill-yellow-500" size={16} />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-900">
                Why Work With Us
              </span>
            </div>

            <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter text-white leading-[0.9]">
              Our Culture & <span className="text-[#dcb485]">Benefits</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {benefits.map((b, i) => (
              <motion.div
                whileHover={{ y: -5 }}
                key={i}
                className="bg-white p-8 md:p-10 rounded-[2rem] border border-gray-100 shadow-sm flex flex-col items-center text-center md:items-start md:text-left gap-4"
              >
                <div className="p-4 bg-red-50 rounded-2xl">
                  {React.cloneElement(b.icon as React.ReactElement<any>, {
                    size: 28,
                  })}
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold uppercase tracking-tight text-gray-900 mb-2 leading-tight">
                    {b.title}
                  </h3>
                  <p className="text-gray-500 text-sm font-medium leading-relaxed">
                    {b.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* FOOTER CTA */}
          <div className="mt-24 text-center">
            <div className="bg-white p-8 md:p-16 rounded-[3rem] border border-gray-100 shadow-xl max-w-4xl mx-auto relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Lightbulb size={120} />
              </div>

              <h3 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter text-gray-900 mb-6">
                Still looking for your <br />
                <span className="text-[#dcb485]">spot on the team?</span>
              </h3>

              <p className="text-gray-500 font-medium mb-8 max-w-xl mx-auto text-sm md:text-base italic">
                We're always on the lookout for passionate people who want to
                make an impact.
              </p>

              <a
                href="mailto:info@valueacquisitions.com"
                className="inline-flex items-center gap-2 text-sm md:text-lg font-bold text-[#dcb485] border-b-2 border-[#dcb485] pb-1 hover:text-gray-900 hover:border-gray-900 transition-all uppercase tracking-widest"
              >
                info@valueacquisitions.com
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black text-white py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[10px] font-bold text-gray-600 tracking-[0.3em] uppercase">
            © 2026 All Rights Reserved
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2 text-gray-500 hover:text-white transition-all text-[10px] font-bold uppercase"
          >
            Back to Top <ChevronUp size={16} />
          </button>
        </div>
      </footer>
    </div>
  );
}