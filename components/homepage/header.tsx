"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";
import Image from "next/image";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Solutions", href: "/solutions", isDropdown: true },
  { name: "Blogs", href: "/blogs" },
];

interface Solution {
  id: string;
  title: string;
  label?: string;
  [key: string]: any;
}

export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSolutionsDropdownOpen, setIsSolutionsDropdownOpen] = useState(false);
  const [isMobileSolutionsOpen, setIsMobileSolutionsOpen] = useState(false);
  const [solutions, setSolutions] = useState<Solution[]>([]);
  const [groupedSolutions, setGroupedSolutions] = useState<Record<string, Solution[]>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if ((isSolutionsDropdownOpen || isMobileMenuOpen) && solutions.length === 0) {
      const fetchSolutions = async () => {
        setLoading(true);
        try {
          const querySnapshot = await getDocs(collection(db, "solutions"));
          const solutionsData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            title: doc.data().title,
            label: doc.data().label || "Other",
            ...doc.data(),
          }));
          setSolutions(solutionsData);

          const grouped = solutionsData.reduce(
            (acc: Record<string, Solution[]>, solution: Solution) => {
              const label = solution.label || "Other";
              if (!acc[label]) acc[label] = [];
              acc[label].push(solution);
              return acc;
            },
            {}
          );
          setGroupedSolutions(grouped);
        } catch (error) {
          console.error("Error fetching solutions:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchSolutions();
    }
  }, [isSolutionsDropdownOpen, isMobileMenuOpen, solutions.length]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsSolutionsDropdownOpen(false);
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-background shadow-sm border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* ── LOGO ── */}
          <Link href="/" className="flex items-center">
            <div className="relative w-40 h-10">
              <Image
                src={isScrolled ? "/images/buildchem.png" : "/images/buildchem-white.png"}
                alt="Buildchem Logo"
                fill
                className="object-contain object-left transition-all duration-300"
                priority
              />
            </div>
          </Link>

          {/* ── DESKTOP NAV ── */}
          <div className="hidden md:flex items-center absolute left-1/2 -translate-x-1/2 gap-1">
            {navItems.map((item) => (
              <div key={item.name} className="relative">
                {item.isDropdown ? (
                  <button
                    onClick={() => setIsSolutionsDropdownOpen(!isSolutionsDropdownOpen)}
                    className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-[var(--radius-md)] transition-all duration-300 cursor-pointer ${
                      isSolutionsDropdownOpen || pathname?.startsWith("/solutions")
                        ? isScrolled
                          ? "text-foreground bg-accent"
                          : "text-white bg-white/10"
                        : isScrolled
                        ? "text-muted-foreground hover:text-foreground hover:bg-accent"
                        : "text-white/80 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {item.name}
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-300 ${
                        isSolutionsDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                ) : (
                  <Link
                    href={item.href!}
                    className={`px-4 py-2 text-sm font-medium rounded-[var(--radius-md)] transition-all duration-300 block ${
                      pathname === item.href
                        ? isScrolled
                          ? "text-foreground bg-accent"
                          : "text-white bg-white/10"
                        : isScrolled
                        ? "text-muted-foreground hover:text-foreground hover:bg-accent"
                        : "text-white/80 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* ── CONTACT BUTTON ── */}
          <div className="hidden md:flex items-center">
            <Link
              href="/contact"
              className={`inline-flex items-center justify-center px-5 py-2 text-sm font-medium rounded-[var(--radius-md)] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                isScrolled
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "bg-white text-foreground hover:bg-white/90"
              }`}
            >
              Contact Us
            </Link>
          </div>

          {/* ── MOBILE TOGGLE ── */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 z-[60] rounded-[var(--radius-sm)] transition-colors ${
              isScrolled || isMobileMenuOpen ? "text-foreground" : "text-white"
            }`}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* ── DESKTOP MEGA MENU ── */}
      {isSolutionsDropdownOpen && (
        <div className="hidden md:block absolute top-full left-0 w-full bg-background shadow-md border-t border-border animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="max-w-7xl mx-auto px-12 py-10">
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="w-5 h-5 rounded-full border-2 border-border border-t-foreground animate-spin" />
              </div>
            ) : (
              <div className="grid grid-cols-4 gap-10">
                {Object.entries(groupedSolutions)
                  .sort((a, b) => b[1].length - a[1].length)
                  .map(([label, items]) => (
                    <div key={label} className="space-y-4">
                      <h3 className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground border-b border-border pb-3">
                        {label}
                        <span className="ml-1.5 opacity-50">({items.length})</span>
                      </h3>
                      <ul className="space-y-3">
                        {items.map((solution) => (
                          <li key={solution.id}>
                            <Link
                              href={`/solutions/${solution.id}`}
                              className="text-[13px] text-muted-foreground hover:text-foreground hover:translate-x-1 transition-all duration-200 inline-block"
                            >
                              {solution.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
              </div>
            )}
          </div>

          <div className="bg-muted border-t border-border px-12 py-3 text-right">
            <Link
              href="/solutions"
              onClick={() => setIsSolutionsDropdownOpen(false)}
              className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              View All Solutions →
            </Link>
          </div>
        </div>
      )}

      {/* ── MOBILE MENU ── */}
      <div
        className={`fixed inset-0 bg-background z-50 md:hidden transition-transform duration-500 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full pt-24 px-8 pb-10 overflow-y-auto">
          <div className="space-y-1">
            {navItems.map((item) => (
              <div key={item.name} className="border-b border-border">
                {item.isDropdown ? (
                  <div className="py-4">
                    <button
                      onClick={() => setIsMobileSolutionsOpen(!isMobileSolutionsOpen)}
                      className="flex items-center justify-between w-full text-lg font-semibold text-foreground cursor-pointer"
                    >
                      {item.name}
                      <ChevronRight
                        size={20}
                        className={`text-muted-foreground transition-transform duration-300 ${
                          isMobileSolutionsOpen ? "rotate-90" : ""
                        }`}
                      />
                    </button>

                    <div
                      className={`mt-4 space-y-6 overflow-hidden transition-all duration-300 ${
                        isMobileSolutionsOpen
                          ? "max-h-[1000px] opacity-100"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      {Object.entries(groupedSolutions)
                        .sort((a, b) => b[1].length - a[1].length)
                        .map(([label, items]) => (
                          <div key={label} className="pl-3">
                            <h4 className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-3">
                              {label}
                            </h4>
                            <ul className="space-y-3">
                              {items.map((sol) => (
                                <li key={sol.id}>
                                  <Link
                                    href={`/solutions/${sol.id}`}
                                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                                  >
                                    {sol.title}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      <Link
                        href="/solutions"
                        className="block pl-3 py-2 text-xs font-semibold uppercase tracking-widest text-foreground underline underline-offset-4"
                      >
                        View All Solutions →
                      </Link>
                    </div>
                  </div>
                ) : (
                  <Link
                    href={item.href!}
                    className="block py-4 text-lg font-semibold text-foreground hover:text-muted-foreground transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}

            <div className="pt-6">
              <Link
                href="/contact"
                className="flex w-full items-center justify-center py-2.5 px-6 bg-primary text-primary-foreground text-sm font-medium rounded-[var(--radius-lg)] hover:bg-primary/90 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── DROPDOWN BACKDROP ── */}
      {isSolutionsDropdownOpen && (
        <div
          className="fixed inset-0 bg-foreground/10 -z-10 backdrop-blur-[2px] hidden md:block"
          onClick={() => setIsSolutionsDropdownOpen(false)}
        />
      )}
    </nav>
  );
}