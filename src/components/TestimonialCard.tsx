"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Quote } from "lucide-react";

interface TestimonialCardProps {
  quote: string;
  name: string;
  role?: string;
}

export default function TestimonialCard({
  quote,
  name,
  role,
}: TestimonialCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative rounded-2xl bg-lavender-light p-6 sm:p-8"
    >
      {/* Decorative quote mark */}
      <Quote
        size={32}
        className="mb-3 text-lavender/60"
        fill="currentColor"
      />

      {/* Quote text */}
      <blockquote className="font-heading text-lg italic text-text-primary leading-relaxed sm:text-xl">
        &ldquo;{quote}&rdquo;
      </blockquote>

      {/* Attribution */}
      <div className="mt-5 flex items-center gap-3">
        {/* Decorative accent line */}
        <span className="h-px w-8 bg-lavender/50" />
        <div>
          <p className="font-body text-sm font-semibold text-text-primary">
            {name}
          </p>
          {role && (
            <p className="font-body text-xs text-text-muted">{role}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
