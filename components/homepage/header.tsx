"use client"

import { Shield, Menu, X } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-md border-b border-gray-200/50 shadow-sm"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 py-4 md:px-12">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className={`flex items-center gap-2 transition-colors ${
            isScrolled ? "text-gray-900" : "text-white"
          }`}>
            <Shield className={`h-5 w-5 ${isScrolled ? "text-blue-600" : "text-amber-500"}`} />
            <span className="font-semibold">Skydda</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className={`hidden items-center gap-8 text-sm lg:flex ${
            isScrolled ? "text-gray-600" : "text-white/70"
          }`}>
            <Link href="#about" className={`transition-colors hover:${isScrolled ? "text-gray-900" : "text-white"}`}>
              About
            </Link>
            <Link href="#features" className={`transition-colors hover:${isScrolled ? "text-gray-900" : "text-white"}`}>
              Features
            </Link>
            <Link href="#testimonials" className={`transition-colors hover:${isScrolled ? "text-gray-900" : "text-white"}`}>
              Testimonials
            </Link>
            <Link href="#pricing" className={`transition-colors hover:${isScrolled ? "text-gray-900" : "text-white"}`}>
              Pricing
            </Link>
            <Link href="#faq" className={`transition-colors hover:${isScrolled ? "text-gray-900" : "text-white"}`}>
              FAQ
            </Link>
          </nav>

          {/* CTA and Mobile Menu */}
          <div className="flex items-center gap-4">
            <Link
              href="#"
              className={`hidden text-sm font-medium transition-colors lg:block ${
                isScrolled
                  ? "text-gray-900 hover:text-blue-600"
                  : "text-white hover:text-white/80"
              }`}
            >
              Get Started
            </Link>

            {/* Hamburger Menu */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden transition-colors ${isScrolled ? "text-gray-900" : "text-white"}`}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className={`absolute left-0 right-0 top-full border-t transition-colors ${
            isScrolled
              ? "bg-white border-gray-200/50"
              : "bg-slate-900/95 border-white/10"
          }`}>
            <div className="flex flex-col gap-4 px-6 py-6">
              <Link
                href="#about"
                className={`py-2 transition-colors ${
                  isScrolled
                    ? "text-gray-600 hover:text-gray-900"
                    : "text-white/70 hover:text-white"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="#features"
                className={`py-2 transition-colors ${
                  isScrolled
                    ? "text-gray-600 hover:text-gray-900"
                    : "text-white/70 hover:text-white"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </Link>
              <Link
                href="#testimonials"
                className={`py-2 transition-colors ${
                  isScrolled
                    ? "text-gray-600 hover:text-gray-900"
                    : "text-white/70 hover:text-white"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Testimonials
              </Link>
              <Link
                href="#pricing"
                className={`py-2 transition-colors ${
                  isScrolled
                    ? "text-gray-600 hover:text-gray-900"
                    : "text-white/70 hover:text-white"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link
                href="#faq"
                className={`py-2 transition-colors ${
                  isScrolled
                    ? "text-gray-600 hover:text-gray-900"
                    : "text-white/70 hover:text-white"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                FAQ
              </Link>
              <Link
                href="#"
                className={`mt-2 border-t py-2 font-medium transition-colors ${
                  isScrolled
                    ? "border-gray-200/50 text-gray-900"
                    : "border-white/10 text-white"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
