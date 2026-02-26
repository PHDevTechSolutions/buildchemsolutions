"use client";

import { motion, Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";

const fadeInUp: Variants = {
  initial: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const staggerContainer: Variants = {
  initial: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function Footer() {
  const footerLinks = {
    Shop: ["All Products", "New Arrivals", "Best Sellers", "Collections"],
    Support: [
      "Orders & Payment",
      "Shipping",
      "Returns",
      "Size Guide",
      "Contact",
    ],
    Company: ["About Us", "Terms of Service", "Privacy Policy"],
  };

  return (
    <footer className="bg-black text-white pt-24 pb-10 px-6 md:px-10 font-bricolage overflow-hidden">
      <div className="max-w-[1800px] mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-16 pb-20 border-b border-white/10"
        >
          <motion.div
            variants={fadeInUp}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            <h3 className="font-unbounded text-xl font-bold tracking-tighter uppercase">
              Join the viewsuals world
            </h3>
            <p className="text-sm opacity-50 max-w-sm tracking-wide leading-relaxed">
              Early access to drops and exclusive content.
            </p>
            <div className="relative mt-4 group max-w-md">
              <input
                type="email"
                placeholder="EMAIL ADDRESS"
                className="w-full bg-transparent border-b border-white/20 py-4 text-[10px] tracking-[0.3em] focus:outline-none focus:border-white transition-colors uppercase"
              />
              <button className="absolute right-0 bottom-4 hover:translate-x-1 transition-transform">
                <ArrowRight size={18} />
              </button>
            </div>
          </motion.div>

          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-10">
            {Object.entries(footerLinks).map(([category, links]) => (
              <motion.div
                key={category}
                variants={fadeInUp}
                className="flex flex-col gap-4"
              >
                <h4 className="text-[10px] font-bold tracking-[0.4em] uppercase opacity-30 mb-2">
                  {category}
                </h4>
                {links.map((link) => (
                  <a
                    key={link}
                    href="#"
                    className="text-[12px] tracking-widest hover:opacity-50 transition-opacity uppercase"
                  >
                    {link}
                  </a>
                ))}
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="pt-16 flex flex-col gap-12">
          {/* GIANT LOGO */}
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            whileInView={{ y: 0, opacity: 0.05 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <h2 className="font-unbounded text-[16vw] font-black tracking-[-0.05em] leading-none text-center">
              BUILDCHEM
            </h2>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col md:flex-row justify-between items-center gap-8 text-[9px] tracking-[0.3em] font-medium uppercase opacity-40"
          >
            <div className="flex gap-10">
              {["Instagram", "TikTok", "Facebook"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="hover:text-white transition-colors"
                >
                  {social}
                </a>
              ))}
            </div>
            <p>© 2026 BUILDCHEM SOLUTIONS INC. ALL RIGHTS RESERVED.</p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
