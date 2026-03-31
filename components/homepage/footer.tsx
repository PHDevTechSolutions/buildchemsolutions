"use client";

import Image from "next/image";
import { Mail, Facebook, Instagram } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-14 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 mb-12">

          {/* ── Logo + tagline ── */}
          <div className="flex flex-col gap-5">
            <div className="relative w-44 h-12">
              <Image
                src="/images/buildchem-white.png"
                alt="Buildchem Logo"
                fill
                className="object-contain object-left"
                priority
              />
            </div>
            <p className="text-sm text-primary-foreground/60 leading-relaxed max-w-xs">
              A trusted partner in the construction industry, offering innovative
              products that enhance performance, durability, and sustainability.
            </p>
          </div>

          {/* ── Quick Links ── */}
          <div>
            <h4 className="text-[10px] font-semibold uppercase tracking-[0.25em] text-primary-foreground/50 mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { name: "Home", href: "/" },
                { name: "About Us", href: "/about" },
                { name: "Solutions", href: "/solutions" },
                { name: "Blogs", href: "/blogs" },
                { name: "Contact Us", href: "/contact" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Connect ── */}
          <div>
            <h4 className="text-[10px] font-semibold uppercase tracking-[0.25em] text-primary-foreground/50 mb-6">
              Connect
            </h4>
            <p className="text-sm text-primary-foreground/70 leading-relaxed mb-3">
              35B Primex Tower, EDSA, San Juan City,
              <br />1554 Metro Manila
            </p>
            <p className="text-sm font-semibold text-primary-foreground mb-6">
              +63 (2) 8123-4567
            </p>
            <a
              href="mailto:info@buildchem.com.ph"
              className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors duration-200 mb-6 block"
            >
              info@buildchem.com.ph
            </a>

            <div className="flex gap-4 pt-2">
              <a
                href="https://www.facebook.com/BuildChemSolutionsInc/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-[var(--radius-sm)] bg-primary-foreground/10 hover:bg-primary-foreground/20 text-primary-foreground transition-colors duration-200"
                aria-label="Facebook"
              >
                <Facebook size={16} />
              </a>
              <a
                href="https://www.instagram.com/buildchemsolutionsincph/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-[var(--radius-sm)] bg-primary-foreground/10 hover:bg-primary-foreground/20 text-primary-foreground transition-colors duration-200"
                aria-label="Instagram"
              >
                <Instagram size={16} />
              </a>
              <a
                href="mailto:info@buildchem.com.ph"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-[var(--radius-sm)] bg-primary-foreground/10 hover:bg-primary-foreground/20 text-primary-foreground transition-colors duration-200"
                aria-label="Email"
              >
                <Mail size={16} />
              </a>
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="border-t border-primary-foreground/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[10px] uppercase tracking-[0.25em] text-primary-foreground/40">
            &copy; {new Date().getFullYear()} Buildchem Solutions Inc. All rights reserved.
          </p>
          <p className="text-[10px] uppercase tracking-[0.25em] text-primary-foreground/40">
            A Value Acquisitions Holdings Company
          </p>
        </div>
      </div>
    </footer>
  );
}