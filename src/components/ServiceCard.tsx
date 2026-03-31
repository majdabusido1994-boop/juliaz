"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import * as LucideIcons from "lucide-react";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: string;
  href: string;
  image?: string;
}

export default function ServiceCard({
  title,
  description,
  icon,
  href,
  image,
}: ServiceCardProps) {
  // Dynamically resolve the Lucide icon
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const icons = LucideIcons as Record<string, any>;
  const IconComponent = icons[icon] ?? LucideIcons.Sparkles;

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="group cursor-pointer"
    >
      <Link href={href} className="block h-full">
        <div className="flex h-full flex-col overflow-hidden rounded-2xl bg-cream shadow-[0_2px_16px_rgba(200,164,126,0.1)] transition-shadow duration-300 group-hover:shadow-[0_8px_30px_rgba(200,164,126,0.2)]">
          {/* Optional image */}
          {image && (
            <div className="relative h-48 w-full overflow-hidden">
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cream/60 to-transparent" />
            </div>
          )}

          <div className="flex flex-1 flex-col p-6">
            {/* Icon */}
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-light/40">
              <IconComponent size={24} className="text-primary-dark" />
            </div>

            {/* Title */}
            <h3 className="font-heading text-xl font-semibold text-text-primary sm:text-2xl">
              {title}
            </h3>

            {/* Description */}
            <p className="mt-2 flex-1 font-body text-sm text-text-secondary leading-relaxed">
              {description}
            </p>

            {/* Learn More */}
            <span className="mt-4 inline-flex items-center gap-1.5 font-body text-sm font-medium text-primary-dark transition-all duration-200 group-hover:gap-2.5">
              Learn More
              <ArrowRight
                size={16}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
