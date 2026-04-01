"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  doc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";
import { uploadToCloudinary } from "@/lib/cloudinary";
import {
  ArrowLeft,
  Send,
  User,
  Mail,
  CheckCircle2,
  UploadCloud,
  Phone,
  MapPin,
  Clock,
  Loader2,
  Briefcase,
} from "lucide-react";
import Navbar from "@/components/homepage/nav";
import { Footer } from "@/components/homepage/footer";

function ApplyFormContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const jobId = searchParams.get("jobId");

  const [jobData, setJobData] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [loadingJob, setLoadingJob] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    async function fetchJob() {
      if (!jobId) return;
      try {
        const docRef = doc(db, "careers", jobId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setJobData(docSnap.data());
        }
      } catch (error) {
        console.error("Error fetching job:", error);
      } finally {
        setLoadingJob(false);
      }
    }
    fetchJob();
  }, [jobId]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return alert("Please upload your resume.");

    setIsSubmitting(true);
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const resumeUrl = await uploadToCloudinary(file);
      await addDoc(collection(db, "applications"), {
        jobId,
        jobTitle: jobData?.title || searchParams.get("jobTitle") || "Unknown",
        fullName: formData.get("fullName"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        resumeUrl,
        status: "pending",
        appliedAt: serverTimestamp(),
      });
      setSubmitted(true);
    } catch (error: any) {
      console.error("Submission Error:", error);
      alert(error.message || "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="flex items-center justify-center min-h-screen px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-md"
          >
            <div className="w-16 h-16 bg-blue-50 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={32} className="text-blue-600" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              Application Submitted!
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-8">
              Thank you for applying. We&apos;ll review your application and get
              back to you soon.
            </p>
            <Link
              href="/careers"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 text-sm font-medium transition-colors"
            >
              Back to Careers
            </Link>
          </motion.div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative h-[40vh] min-h-[280px] flex items-end">
        <Image
          src="/images/hero-image.jpg"
          alt="Apply"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pb-12">
          <Link
            href="/careers"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-4 text-xs uppercase font-medium tracking-wider"
          >
            <ArrowLeft size={13} /> Back to Careers
          </Link>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-semibold uppercase tracking-wider bg-blue-600 text-white px-2.5 py-1">
              {loadingJob ? "Loading…" : jobData?.category || "Position"}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-semibold text-white tracking-tight">
            {jobData?.title || searchParams.get("jobTitle") || "Apply"}
          </h1>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* ── LEFT: JOB DETAILS ── */}
          <div className="lg:col-span-4 space-y-8">
            <div>
              <div className="flex items-center gap-3 px-4 py-2 border border-gray-300 w-fit mb-6">
                <div className="w-2.5 h-2.5 bg-blue-600" />
                <span className="text-sm font-medium text-gray-600 tracking-wide">
                  Role Details
                </span>
              </div>
              <div className="flex flex-wrap gap-3 mb-6">
                <span className="flex items-center gap-1.5 text-xs font-medium text-gray-600 border border-gray-200 px-3 py-1.5">
                  <MapPin size={12} className="text-blue-600" />
                  {jobData?.location || "Metro Manila"}
                </span>
                <span className="flex items-center gap-1.5 text-xs font-medium text-gray-600 border border-gray-200 px-3 py-1.5">
                  <Clock size={12} className="text-blue-600" />
                  {jobData?.jobType || "Full-time"}
                </span>
              </div>
            </div>

            {jobData?.description && (
              <div className="p-6 border border-gray-200">
                <h3 className="text-[10px] font-semibold uppercase tracking-wider text-blue-600 mb-4">
                  Job Overview
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {jobData.description}
                </p>
              </div>
            )}

            {jobData?.qualifications && jobData.qualifications.length > 0 && (
              <div className="p-6 border border-gray-200">
                <h3 className="text-[10px] font-semibold uppercase tracking-wider text-blue-600 mb-4">
                  Key Qualifications
                </h3>
                <ul className="space-y-3">
                  {jobData.qualifications.map((q: string, i: number) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-sm text-gray-700"
                    >
                      <CheckCircle2
                        size={14}
                        className="text-blue-600 mt-0.5 flex-shrink-0"
                      />
                      {q}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <p className="text-[10px] text-gray-400 uppercase tracking-wider">
              Ref: {jobId?.substring(0, 8).toUpperCase()}
            </p>
          </div>

          {/* ── RIGHT: FORM ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-8"
          >
            <div className="flex items-center gap-3 px-4 py-2 border border-gray-300 w-fit mb-8">
              <div className="w-2.5 h-2.5 bg-blue-600" />
              <span className="text-sm font-medium text-gray-600 tracking-wide">
                Your Application
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="space-y-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Full Name
                  </label>
                  <div className="relative">
                    <User
                      size={16}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <input
                      required
                      name="fullName"
                      type="text"
                      placeholder="Juan Dela Cruz"
                      className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-0 text-sm text-gray-900 placeholder:text-gray-400 transition-colors"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail
                      size={16}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <input
                      required
                      name="email"
                      type="email"
                      placeholder="juan@email.com"
                      className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-0 text-sm text-gray-900 placeholder:text-gray-400 transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone
                    size={16}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    required
                    name="phone"
                    type="tel"
                    placeholder="0912 345 6789"
                    className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-0 text-sm text-gray-900 placeholder:text-gray-400 transition-colors"
                  />
                </div>
              </div>

              {/* Resume Upload */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Resume / CV (PDF Only)
                </label>
                <input
                  type="file"
                  id="resume"
                  accept=".pdf"
                  className="hidden"
                  onChange={handleFileChange}
                  required
                />
                <label
                  htmlFor="resume"
                  className="flex flex-col items-center justify-center p-10 border-2 border-dashed border-gray-200 hover:border-blue-400 hover:bg-blue-50/30 transition-all cursor-pointer group"
                >
                  <div className="w-12 h-12 border border-gray-200 group-hover:border-blue-300 flex items-center justify-center mb-4 transition-colors">
                    {isSubmitting ? (
                      <Loader2
                        className="animate-spin text-blue-600"
                        size={22}
                      />
                    ) : fileName ? (
                      <CheckCircle2 className="text-blue-600" size={22} />
                    ) : (
                      <UploadCloud
                        className="text-gray-400 group-hover:text-blue-500 transition-colors"
                        size={22}
                      />
                    )}
                  </div>
                  <p className="text-sm font-medium text-gray-700">
                    {fileName || "Click to upload resume"}
                  </p>
                  <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider">
                    PDF only · Max 5MB
                  </p>
                </label>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-4 text-sm font-medium tracking-wide transition-colors"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Submitting…
                  </>
                ) : (
                  <>
                    Submit Application
                    <Send size={15} />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function ApplyPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white flex items-center justify-center">
          <Loader2 className="animate-spin text-blue-600" size={36} />
        </div>
      }
    >
      <ApplyFormContent />
    </Suspense>
  );
}
