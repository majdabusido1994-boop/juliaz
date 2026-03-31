"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Phone, Send, Heart } from "lucide-react";

function InstagramIcon({ size = 16, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Spirit Game", href: "/spirit-game" },
  { label: "Book Now", href: "/book" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="border-t border-border bg-cream">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="cursor-pointer">
              <h3 className="font-heading text-2xl italic font-semibold text-text-primary">
                Julia Josefiina
              </h3>
            </Link>
            <p className="mt-3 font-body text-sm italic text-text-secondary leading-relaxed">
              &ldquo;when you move, everything moves&rdquo;
            </p>
            <p className="mt-4 font-body text-sm text-text-muted leading-relaxed">
              Holistic wellness journeys for body, mind, and spirit. Guiding
              you toward balance and inner harmony.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-lg font-semibold text-text-primary">
              Quick Links
            </h4>
            <ul className="mt-4 flex flex-col gap-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="cursor-pointer font-body text-sm text-text-secondary transition-colors duration-200 hover:text-primary-dark"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-lg font-semibold text-text-primary">
              Get in Touch
            </h4>
            <ul className="mt-4 flex flex-col gap-3">
              <li>
                <a
                  href="mailto:julia.taivalmaki@gmail.com"
                  className="flex cursor-pointer items-center gap-2.5 font-body text-sm text-text-secondary transition-colors duration-200 hover:text-primary-dark"
                >
                  <Mail size={16} className="shrink-0 text-primary" />
                  julia.taivalmaki@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/358405596735"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex cursor-pointer items-center gap-2.5 font-body text-sm text-text-secondary transition-colors duration-200 hover:text-primary-dark"
                >
                  <Phone size={16} className="shrink-0 text-primary" />
                  +358 40 559 6735
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/juliamooves"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex cursor-pointer items-center gap-2.5 font-body text-sm text-text-secondary transition-colors duration-200 hover:text-primary-dark"
                >
                  <InstagramIcon size={16} className="shrink-0 text-primary" />
                  @juliamooves
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-heading text-lg font-semibold text-text-primary">
              Stay Connected
            </h4>
            <p className="mt-4 font-body text-sm text-text-secondary leading-relaxed">
              Subscribe for wellness tips, upcoming events, and soulful
              inspiration.
            </p>
            {subscribed ? (
              <p className="mt-4 font-body text-sm font-medium text-sage">
                Thank you for subscribing!
              </p>
            ) : (
              <form onSubmit={handleSubscribe} className="mt-4 flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  required
                  className="min-w-0 flex-1 rounded-lg border border-border bg-warm-white px-4 py-2.5 font-body text-sm text-text-primary placeholder:text-text-muted outline-none transition-all duration-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
                <button
                  type="submit"
                  className="cursor-pointer rounded-lg bg-primary px-4 py-2.5 text-white transition-all duration-200 hover:bg-primary-dark hover:shadow-md"
                  aria-label="Subscribe"
                >
                  <Send size={16} />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-border pt-8">
          <p className="flex items-center justify-center gap-1.5 font-body text-sm text-text-muted">
            &copy; 2024 Julia Josefiina Taivalm&auml;ki. Made with
            <Heart size={14} className="text-primary" fill="currentColor" />
          </p>
        </div>
      </div>
    </footer>
  );
}
