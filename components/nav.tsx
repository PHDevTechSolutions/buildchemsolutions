"use client";

import { useState, useEffect } from "react";
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

const SOLUTIONS = [
  "Orders & Payment",
  "Shipping",
  "Returns",
  "Gift Card Manual",
  "Solutions",
];

const NAV_LINKS = ["Home", "About", "Blogs", "Contact", "Careers"];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileSubmenu, setMobileSubmenu] = useState<"main" | "solutions">(
    "main",
  );
  const [isSolutionsHovered, setIsSolutionsHovered] = useState(false);
  const [isNavHovered, setIsNavHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  const isActive = isScrolled || isMobileMenuOpen || isNavHovered;

  return (
    <>
      <nav
        onMouseEnter={() => setIsNavHovered(true)}
        onMouseLeave={() => setIsNavHovered(false)}
        className={cn(
          "fixed top-0 left-0 w-full h-20 z-[100] transition-colors duration-500",
          isActive ? "text-black" : "text-white",
        )}
      >
        <div
          className={cn(
            "absolute inset-0 bg-white transform transition-transform duration-500 ease-in-out -z-10",
            isActive ? "translate-y-0" : "-translate-y-full",
          )}
        />

        <div className="max-w-[1800px] mx-auto px-6 xl:px-10 h-full flex items-center justify-between font-bricolage tracking-[0.15em] text-[13px] font-medium">
          {/* MOBILE / TABLET TOGGLE — visible below xl */}
          <div className="flex xl:hidden flex-1 items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="relative z-[110] p-2 -ml-2"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* DESKTOP LINKS — xl and above */}
          <div className="hidden xl:flex items-center gap-6 2xl:gap-8 flex-1 h-full">
            {NAV_LINKS.map((item) => (
              <a
                key={item}
                href="#"
                className="nav-link-animated py-1 uppercase hover:opacity-50 whitespace-nowrap"
              >
                {item}
              </a>
            ))}
            <div
              className="relative h-full flex items-center"
              onMouseEnter={() => setIsSolutionsHovered(true)}
              onMouseLeave={() => setIsSolutionsHovered(false)}
            >
              <button
                className={cn(
                  "flex items-center gap-1 nav-link-animated py-1 uppercase tracking-widest whitespace-nowrap",
                  isSolutionsHovered && "after:scale-x-100",
                )}
              >
                Solutions{" "}
                <ChevronDown
                  size={14}
                  className={cn(
                    "transition-transform",
                    isSolutionsHovered && "rotate-180",
                  )}
                />
              </button>
              <div
                className={cn(
                  "absolute top-[80%] left-0 w-64 bg-white shadow-2xl border border-black/5 transition-all duration-300 origin-top",
                  isSolutionsHovered
                    ? "opacity-100 scale-y-100 visible"
                    : "opacity-0 scale-y-95 invisible",
                )}
              >
                <div className="flex flex-col py-6 px-8 gap-4 text-black font-normal normal-case">
                  {SOLUTIONS.map((link) => (
                    <a
                      key={link}
                      href="#"
                      className="text-[11px] uppercase tracking-widest hover:opacity-50"
                    >
                      {link}
                    </a>
                  ))}
                </div>
              </div>
            </div>
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
              href="#"
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

      {/* MOBILE / TABLET OVERLAY — visible below xl */}
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
                  href="#"
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
              {SOLUTIONS.map((link) => (
                <a
                  key={link}
                  href="#"
                  className="border-b border-black/5 py-5 text-xl font-bold uppercase tracking-widest"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
