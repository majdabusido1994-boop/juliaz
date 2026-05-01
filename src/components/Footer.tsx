"use client";

import Link from "next/link";
import { Mail, Phone } from "lucide-react";

function InstagramIcon({ className = "" }: { className?: string }) {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Offerings" },
  { href: "/book", label: "Book Now" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="bg-purple-950 text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-semibold heading-font">
              Julia <span className="text-gradient-gold">Josefiina</span>
            </h3>
            <p className="text-purple-300 text-sm leading-relaxed max-w-xs mt-4">
              Somatic Movement. Yoga. Reiki. Intuitive touch.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gold-400 mb-4">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-purple-300 text-sm hover:text-white transition-colors duration-300 cursor-pointer"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gold-400 mb-4">
              Get in Touch
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:julia.taivalmaki@gmail.com"
                  className="flex items-center gap-3 text-purple-300 text-sm hover:text-white transition-colors duration-300"
                >
                  <Mail size={16} />
                  julia.taivalmaki@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="https://api.whatsapp.com/send?phone=358405596735"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-purple-300 text-sm hover:text-white transition-colors duration-300"
                >
                  <Phone size={16} />
                  +358 40 559 6735
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/juliamooves"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-purple-300 text-sm hover:text-white transition-colors duration-300"
                >
                  <InstagramIcon />
                  @juliamooves
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-purple-800 text-center">
          <p className="text-purple-400 text-sm">
            &copy; {new Date().getFullYear()} Julia Josefiina. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
