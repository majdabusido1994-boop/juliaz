"use client";

import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  return (
    <a
      href="https://api.whatsapp.com/send?phone=358405596735"
      target="_blank"
      rel="noopener noreferrer"
      className="group fixed bottom-6 right-6 z-40 flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-[#25D366] shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
      aria-label="Chat with Julia on WhatsApp"
    >
      <MessageCircle size={24} className="text-white" fill="white" />
      <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-xl bg-white px-5 py-3 text-sm font-medium text-purple-950 opacity-0 shadow-xl border border-gray-200 transition-opacity duration-200 group-hover:opacity-100">
        Chat with Julia
      </span>
    </a>
  );
}
