"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Send,
  CheckCircle2,
  Loader2,
  Clock,
} from "lucide-react";
import Navbar from "@/components/homepage/nav";
import { Footer } from "@/components/homepage/footer";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const contactDetails = [
  {
    icon: <MapPin size={18} className="text-blue-600" />,
    label: "Address",
    value: "35B Primex Tower, EDSA, San Juan City, 1554 Metro Manila",
  },
  {
    icon: <Phone size={18} className="text-blue-600" />,
    label: "Phone",
    value: "+63 (2) 8123-4567",
    href: "tel:+6328123456",
  },
  {
    icon: <Mail size={18} className="text-blue-600" />,
    label: "Email",
    value: "info@buildchem.com.ph",
    href: "mailto:info@buildchem.com.ph",
  },
  {
    icon: <Clock size={18} className="text-blue-600" />,
    label: "Office Hours",
    value: "Monday–Friday: 8:00 AM – 5:00 PM",
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await addDoc(collection(db, "contact_messages"), {
        ...formData,
        submittedAt: serverTimestamp(),
        status: "new",
      });
      setSubmitted(true);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative h-[55vh] min-h-[400px] flex items-end">
        <Image
          src="/images/hero-image.jpg"
          alt="Contact Buildchem"
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
            Get in <span className="text-white/60">Touch</span>
          </h1>
          <p className="text-white/70 text-base max-w-xl leading-relaxed">
            Have a project in mind or need technical guidance? Our team is ready
            to help.
          </p>
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <section className="py-24 md:py-32 bg-white border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* ── LEFT: CONTACT INFO ── */}
            <div className="lg:col-span-4 space-y-10">
              <div>
                <div className="flex items-center gap-3 px-4 py-2 border border-gray-300 w-fit mb-6">
                  <div className="w-2.5 h-2.5 bg-blue-600" />
                  <span className="text-sm font-medium text-gray-600 tracking-wide">
                    Contact Information
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-normal text-gray-900 tracking-tight mb-4">
                  {"Let's Talk".split(" ").map((word, i) => (
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
                <p className="text-sm text-gray-600 leading-relaxed">
                  Whether you&apos;re looking for product information, technical
                  support, or partnership opportunities — we&apos;re here for
                  you.
                </p>
              </div>

              <div className="space-y-6">
                {contactDetails.map((detail, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.08 }}
                    className="flex gap-4"
                  >
                    <div className="w-9 h-9 bg-blue-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                      {detail.icon}
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold mb-0.5">
                        {detail.label}
                      </p>
                      {detail.href ? (
                        <a
                          href={detail.href}
                          className="text-sm text-gray-700 hover:text-blue-600 transition-colors"
                        >
                          {detail.value}
                        </a>
                      ) : (
                        <p className="text-sm text-gray-700 leading-relaxed">
                          {detail.value}
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Social */}
              <div>
                <p className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold mb-4">
                  Follow Us
                </p>
                <div className="flex gap-3">
                  <a
                    href="https://www.facebook.com/BuildChemSolutionsInc/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 border border-gray-200 flex items-center justify-center text-gray-400 hover:text-blue-600 hover:border-blue-300 transition-colors"
                  >
                    <Facebook size={15} />
                  </a>
                  <a
                    href="https://www.instagram.com/buildchemsolutionsincph/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 border border-gray-200 flex items-center justify-center text-gray-400 hover:text-blue-600 hover:border-blue-300 transition-colors"
                  >
                    <Instagram size={15} />
                  </a>
                  <a
                    href="mailto:info@buildchem.com.ph"
                    className="w-9 h-9 border border-gray-200 flex items-center justify-center text-gray-400 hover:text-blue-600 hover:border-blue-300 transition-colors"
                  >
                    <Mail size={15} />
                  </a>
                </div>
              </div>

              {/* Map placeholder */}
              <div className="relative aspect-[4/3] overflow-hidden border border-gray-200">
                <Image
                  src="/images/hero-image.jpg"
                  alt="Location"
                  fill
                  className="object-cover opacity-60"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white/90 px-4 py-2 text-xs font-medium text-gray-700 tracking-wide uppercase">
                    San Juan City, Metro Manila
                  </div>
                </div>
              </div>
            </div>

            {/* ── RIGHT: FORM ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-8"
            >
              {submitted ? (
                <div className="h-full flex items-center justify-center py-24">
                  <div className="text-center max-w-sm">
                    <div className="w-16 h-16 bg-blue-50 flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 size={30} className="text-blue-600" />
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                      Message Sent!
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-8">
                      Thank you for reaching out. Our team will get back to you
                      within 1–2 business days.
                    </p>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({
                          name: "",
                          email: "",
                          company: "",
                          subject: "",
                          message: "",
                        });
                      }}
                      className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
                    >
                      Send another message
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-3 px-4 py-2 border border-gray-300 w-fit mb-8">
                    <div className="w-2.5 h-2.5 bg-blue-600" />
                    <span className="text-sm font-medium text-gray-600 tracking-wide">
                      Send a Message
                    </span>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                      <div className="p-4 bg-red-50 border border-red-200 text-sm text-red-700">
                        {error}
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500">
                          Full Name <span className="text-blue-600">*</span>
                        </label>
                        <input
                          required
                          name="name"
                          type="text"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Juan Dela Cruz"
                          className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 focus:border-blue-500 focus:bg-white focus:outline-none text-sm text-gray-900 placeholder:text-gray-400 transition-colors"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500">
                          Email Address <span className="text-blue-600">*</span>
                        </label>
                        <input
                          required
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="juan@company.com"
                          className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 focus:border-blue-500 focus:bg-white focus:outline-none text-sm text-gray-900 placeholder:text-gray-400 transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500">
                          Company / Organization
                        </label>
                        <input
                          name="company"
                          type="text"
                          value={formData.company}
                          onChange={handleChange}
                          placeholder="Your Company"
                          className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 focus:border-blue-500 focus:bg-white focus:outline-none text-sm text-gray-900 placeholder:text-gray-400 transition-colors"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500">
                          Subject <span className="text-blue-600">*</span>
                        </label>
                        <select
                          required
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 focus:border-blue-500 focus:bg-white focus:outline-none text-sm text-gray-900 transition-colors appearance-none"
                        >
                          <option value="">Select a subject</option>
                          <option value="Product Inquiry">
                            Product Inquiry
                          </option>
                          <option value="Technical Support">
                            Technical Support
                          </option>
                          <option value="Quote Request">Quote Request</option>
                          <option value="Partnership">Partnership</option>
                          <option value="General Inquiry">
                            General Inquiry
                          </option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500">
                        Message <span className="text-blue-600">*</span>
                      </label>
                      <textarea
                        required
                        name="message"
                        rows={6}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Describe your project or inquiry in detail…"
                        className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 focus:border-blue-500 focus:bg-white focus:outline-none text-sm text-gray-900 placeholder:text-gray-400 transition-colors resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-4 text-sm font-medium tracking-wide transition-colors"
                    >
                      {loading ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          Sending…
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send size={15} />
                        </>
                      )}
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
