"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Offerings", href: "/services" },
  { label: "Spirit Game", href: "/spirit-game" },
  { label: "Book Now", href: "/book", isCTA: true },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-warm-white/95 backdrop-blur-md shadow-[0_2px_20px_rgba(200,164,126,0.12)]"
            : "bg-transparent"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          {/* Logo */}
          <Link href="/" className="cursor-pointer">
            <span className="font-heading text-2xl italic font-semibold text-text-primary tracking-wide lg:text-3xl">
              Julia Josefiina
            </span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) =>
              link.isCTA ? (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="ml-4 inline-block cursor-pointer rounded-full bg-primary px-6 py-2.5 font-body text-sm font-medium text-white transition-all duration-200 hover:bg-primary-dark hover:shadow-lg"
                  >
                    {link.label}
                  </Link>
                </li>
              ) : (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="cursor-pointer rounded-lg px-4 py-2 font-body text-sm font-medium text-text-secondary transition-colors duration-200 hover:bg-primary-light/30 hover:text-text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              )
            )}
          </ul>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="cursor-pointer rounded-lg p-2 text-text-primary transition-colors duration-200 hover:bg-primary-light/30 lg:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </motion.header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
            />

            {/* Slide-in panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 z-50 flex h-full w-[280px] flex-col bg-warm-white shadow-2xl lg:hidden"
            >
              {/* Close button */}
              <div className="flex items-center justify-between px-6 py-4">
                <span className="font-heading text-xl italic font-semibold text-text-primary">
                  Julia Josefiina
                </span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="cursor-pointer rounded-lg p-2 text-text-primary transition-colors duration-200 hover:bg-primary-light/30"
                  aria-label="Close menu"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Divider */}
              <div className="mx-6 h-px bg-border" />

              {/* Links */}
              <ul className="flex flex-col gap-1 px-4 py-6">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i, duration: 0.25 }}
                  >
                    {link.isCTA ? (
                      <Link
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className="mt-4 block cursor-pointer rounded-full bg-primary px-6 py-3 text-center font-body text-sm font-medium text-white transition-all duration-200 hover:bg-primary-dark"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <Link
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className="block cursor-pointer rounded-lg px-4 py-3 font-body text-base font-medium text-text-secondary transition-colors duration-200 hover:bg-primary-light/30 hover:text-text-primary"
                      >
                        {link.label}
                      </Link>
                    )}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
