"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export default function SectionHeading({
  title,
  subtitle,
  centered = true,
}: SectionHeadingProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`mb-12 ${centered ? "text-center" : ""}`}
    >
      <h2 className="font-heading text-3xl font-semibold text-text-primary sm:text-4xl lg:text-5xl">
        {title}
      </h2>

      {/* Decorative divider */}
      <div
        className={`mt-4 flex items-center gap-3 ${
          centered ? "justify-center" : ""
        }`}
      >
        <span className="h-px w-10 bg-primary/40" />
        {/* Lotus-inspired diamond */}
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          className="text-primary"
        >
          <path
            d="M10 2C10 2 6 6.5 6 10C6 12.5 7.8 14.5 10 15C12.2 14.5 14 12.5 14 10C14 6.5 10 2 10 2Z"
            fill="currentColor"
            opacity="0.3"
          />
          <path
            d="M10 4C10 4 3 8 3 12C3 14 5 16 7 16.5C6.5 15 7 13 10 11C13 13 13.5 15 13 16.5C15 16 17 14 17 12C17 8 10 4 10 4Z"
            fill="currentColor"
            opacity="0.5"
          />
          <path
            d="M10 7C10 7 5.5 10 5.5 13C5.5 14.5 7 16 8.5 16.5C8 15.5 8.5 14 10 13C11.5 14 12 15.5 11.5 16.5C13 16 14.5 14.5 14.5 13C14.5 10 10 7 10 7Z"
            fill="currentColor"
            opacity="0.8"
          />
          <ellipse cx="10" cy="17" rx="1.5" ry="0.8" fill="currentColor" />
        </svg>
        <span className="h-px w-10 bg-primary/40" />
      </div>

      {subtitle && (
        <p className="mt-4 font-body text-base text-text-secondary sm:text-lg max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
