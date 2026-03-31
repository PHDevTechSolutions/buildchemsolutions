"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Search,
  ShoppingBag,
  ChevronRight,
  Menu,
  X,
  ArrowLeft,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

const NAV_LINKS = ["Home", "About", "Blogs", "Contact", "Careers"];

interface Solution {
  id: string;
  title: string;
  label?: string;
  [key: string]: any;
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileSubmenu, setMobileSubmenu] = useState<"main" | "solutions">(
    "main",
  );
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);
  const [isNavHovered, setIsNavHovered] = useState(false);

  const [solutions, setSolutions] = useState<Solution[]>([]);
  const [groupedSolutions, setGroupedSolutions] = useState<
    Record<string, Solution[]>
  >({});
  const [loading, setLoading] = useState(false);

  // Fetch solutions when dropdown opens or mobile menu opens (only once)
  useEffect(() => {
    if ((isSolutionsOpen || isMobileMenuOpen) && solutions.length === 0) {
      const fetchSolutions = async () => {
        setLoading(true);
        try {
          const querySnapshot = await getDocs(collection(db, "solutions"));
          const data: Solution[] = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            title: doc.data().title,
            label: doc.data().label || "Other",
            ...doc.data(),
          }));
          setSolutions(data);
          const grouped = data.reduce((acc: Record<string, Solution[]>, s) => {
            const label = s.label || "Other";
            if (!acc[label]) acc[label] = [];
            acc[label].push(s);
            return acc;
          }, {});
          setGroupedSolutions(grouped);
        } catch (err) {
          console.error("Error fetching solutions:", err);
        } finally {
          setLoading(false);
        }
      };
      fetchSolutions();
    }
  }, [isSolutionsOpen, isMobileMenuOpen, solutions.length]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll lock for mobile
  useEffect(() => {
    if (isMobileMenuOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      window.scrollTo(0, parseInt(scrollY || "0") * -1);
      setMobileSubmenu("main");
    }
  }, [isMobileMenuOpen]);

  const isActive =
    isScrolled || isMobileMenuOpen || isNavHovered || isSolutionsOpen;

  return (
    <>
      {/* ── NAV SHELL ── */}
      <div
        className={cn(
          "fixed top-0 left-0 w-full z-[100] transition-colors duration-500",
          isActive ? "text-black" : "text-white",
        )}
        onMouseLeave={() => {
          setIsNavHovered(false);
          setIsSolutionsOpen(false);
        }}
      >
        {/* Sliding white background — covers nav bar + mega menu together */}
        <div
          className={cn(
            "absolute inset-0 bg-white transform transition-transform duration-500 ease-in-out -z-10",
            isActive ? "translate-y-0" : "-translate-y-full",
          )}
        />

        {/* ── NAV BAR ── */}
        <nav className="h-20" onMouseEnter={() => setIsNavHovered(true)}>
          <div className="max-w-[1800px] mx-auto px-6 xl:px-10 h-full flex items-center justify-between font-bricolage tracking-[0.15em] text-[13px] font-medium">
            {/* MOBILE / TABLET TOGGLE */}
            <div className="flex xl:hidden flex-1 items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="relative z-[110] p-2 -ml-2"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

            {/* DESKTOP LINKS */}
            <div className="hidden xl:flex items-center gap-6 2xl:gap-8 flex-1 h-full">
              {NAV_LINKS.map((item) => (
                <a
                  key={item}
                  href="/"
                  className="nav-link-animated py-1 uppercase hover:opacity-50 whitespace-nowrap"
                >
                  {item}
                </a>
              ))}

              {/* SOLUTIONS TRIGGER */}
              <button
                onMouseEnter={() => setIsSolutionsOpen(true)}
                onClick={() => setIsSolutionsOpen(!isSolutionsOpen)}
                className={cn(
                  "flex items-center gap-1 nav-link-animated py-1 uppercase tracking-widest whitespace-nowrap",
                  isSolutionsOpen && "after:scale-x-100",
                )}
              >
                Solutions
                <ChevronDown
                  size={14}
                  className={cn(
                    "transition-transform duration-300",
                    isSolutionsOpen && "rotate-180",
                  )}
                />
              </button>
            </div>

            {/* LOGO */}
            <div className="flex-1 flex justify-center relative z-[110]">
              <img
                src="/images/buildchem.png"
                alt="Logo"
                className={cn(
                  "h-8 md:h-10 w-auto object-contain cursor-pointer transition-all duration-500 ease-in-out",
                  isActive ? "brightness-100 invert-0" : "brightness-0 invert",
                )}
              />
            </div>

            {/* ACTIONS */}
            <div className="flex items-center gap-4 xl:gap-8 flex-1 justify-end relative z-[110]">
              <a
                href="/"
                className="hidden xl:block nav-link-animated py-1 uppercase"
              >
                Login
              </a>
              <button className="hover:opacity-60 transition-opacity">
                <Search size={20} strokeWidth={1.5} />
              </button>
              <div className="relative cursor-pointer hover:opacity-60">
                <ShoppingBag size={20} strokeWidth={1.5} />
                <span
                  className={cn(
                    "absolute -top-1 -right-2 text-[9px] w-4 h-4 flex items-center justify-center rounded-full font-bold transition-colors duration-500",
                    isActive ? "bg-black text-white" : "bg-white text-black",
                  )}
                >
                  0
                </span>
              </div>
            </div>
          </div>
        </nav>

        {/* ── DESKTOP MEGA MENU — extends the header down ── */}
        <div
          className={cn(
            "hidden xl:block w-full overflow-hidden transition-all duration-500 ease-in-out border-t border-black/5",
            isSolutionsOpen
              ? "max-h-[600px] opacity-100"
              : "max-h-0 opacity-0 border-transparent",
          )}
          onMouseEnter={() => setIsSolutionsOpen(true)}
        >
          <div className="max-w-[1800px] mx-auto px-10 py-10">
            {loading ? (
              <div className="flex items-center justify-center py-12 text-sm uppercase tracking-widest opacity-40">
                Loading…
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-10">
                {Object.entries(groupedSolutions)
                  .sort((a, b) => b[1].length - a[1].length)
                  .map(([label, items]) => (
                    <div key={label} className="space-y-5">
                      <h3 className="font-bricolage text-black text-[10px] uppercase tracking-[0.25em] border-b border-black/10 pb-3">
                        {label}
                        <span className="ml-2 opacity-30">
                          ({items.length})
                        </span>
                      </h3>
                      <ul className="space-y-3">
                        {items.map((solution) => (
                          <li key={solution.id}>
                            <Link
                              href={`/solutions/${solution.id}`}
                              onClick={() => setIsSolutionsOpen(false)}
                              className="text-[12px] font-bebas text-black/50 hover:text-black hover:translate-x-1 transition-all duration-200 inline-block uppercase tracking-wide"
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

          {/* FOOTER ROW */}
          <div className="border-t border-black/5 px-10 py-4 flex justify-end">
            <Link
              href="/solutions"
              onClick={() => setIsSolutionsOpen(false)}
              className="text-[10px] font-black uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity"
            >
              View All Solutions →
            </Link>
          </div>
        </div>
      </div>

      {/* ── MOBILE / TABLET OVERLAY ── */}
      <div
        className={cn(
          "fixed inset-0 bg-white z-[95] xl:hidden transition-transform duration-500 ease-in-out h-[100dvh]",
          isMobileMenuOpen ? "translate-y-0" : "translate-y-full",
        )}
      >
        <div className="relative w-full h-full pt-24 overflow-hidden">
          <div
            className={cn(
              "flex w-[200%] h-full transition-transform duration-500",
              mobileSubmenu === "solutions"
                ? "-translate-x-1/2"
                : "translate-x-0",
            )}
          >
            {/* MAIN PANEL */}
            <div className="w-1/2 h-full flex flex-col px-8 gap-1 overflow-y-auto">
              {NAV_LINKS.map((item) => (
                <a
                  key={item}
                  href="/"
                  className="border-b border-black/5 py-5 text-xl font-bold uppercase tracking-widest"
                >
                  {item}
                </a>
              ))}
              <button
                onClick={() => setMobileSubmenu("solutions")}
                className="flex items-center justify-between border-b border-black/5 py-5 text-xl font-bold uppercase tracking-widest text-left"
              >
                Solutions <ChevronRight size={20} />
              </button>
              <div className="mt-auto py-10">
                <a
                  href="#"
                  className="flex items-center gap-2 text-xs font-bold uppercase opacity-60"
                >
                  Login
                </a>
              </div>
            </div>

            {/* SOLUTIONS PANEL */}
            <div className="w-1/2 h-full flex flex-col px-8 gap-1 bg-white overflow-y-auto">
              <button
                onClick={() => setMobileSubmenu("main")}
                className="flex items-center gap-2 text-xs font-bold uppercase py-4 opacity-60"
              >
                <ArrowLeft size={16} /> Back to Menu
              </button>

              {loading ? (
                <div className="py-8 text-xs uppercase tracking-widest opacity-40">
                  Loading…
                </div>
              ) : solutions.length > 0 ? (
                // Grouped solutions on mobile
                Object.entries(groupedSolutions)
                  .sort((a, b) => b[1].length - a[1].length)
                  .map(([label, items]) => (
                    <div key={label} className="mb-6">
                      <p className="text-[9px] font-black uppercase tracking-[0.25em] opacity-30 py-3 border-b border-black/5">
                        {label}
                      </p>
                      {items.map((sol) => (
                        <Link
                          key={sol.id}
                          href={`/solutions/${sol.id}`}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="border-b border-black/5 py-4 text-base font-bold uppercase tracking-widest block"
                        >
                          {sol.title}
                        </Link>
                      ))}
                    </div>
                  ))
              ) : (
                // Fallback static list
                <div className="text-xs uppercase tracking-widest opacity-40 py-6">
                  No solutions found.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
