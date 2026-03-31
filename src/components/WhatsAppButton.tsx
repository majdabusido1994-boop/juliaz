"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
      {/* Tooltip */}
      <AnimatePresence>
        {hovered && (
          <motion.span
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.2 }}
            className="whitespace-nowrap rounded-lg bg-text-primary px-4 py-2.5 font-body text-sm text-white shadow-lg"
          >
            Chat with Julia
          </motion.span>
        )}
      </AnimatePresence>

      {/* Button */}
      <a
        href="https://wa.me/358405596735"
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="group relative cursor-pointer"
        aria-label="Chat with Julia on WhatsApp"
      >
        {/* Pulse ring */}
        <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366]/30" />

        {/* Button circle */}
        <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg transition-transform duration-200 group-hover:scale-110">
          <MessageCircle size={26} className="text-white" fill="white" />
        </span>
      </a>
    </div>
  );
}
