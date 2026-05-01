"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send, Check } from "lucide-react";

export default function NewsletterSignup({
  variant = "light",
  title = "Join Monthly Newsletter",
  subtitle = "A monthly email with what’s coming up — classes, events, and new offerings. No spam, just a simple love letter to let you know what’s next.",
}: {
  variant?: "light" | "dark";
  title?: string;
  subtitle?: string;
}) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMsg("Please enter a valid email");
      return;
    }
    setState("sending");
    const body = new URLSearchParams({
      "form-name": "newsletter",
      "bot-field": "",
      name: name.trim(),
      email: email.trim(),
    });
    try {
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });
      if (res.ok) {
        setState("sent");
        setName("");
        setEmail("");
      } else {
        setState("error");
        setErrorMsg("Something went wrong. Please try again.");
      }
    } catch {
      setState("error");
      setErrorMsg("Something went wrong. Please try again.");
    }
  };

  const isDark = variant === "dark";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className={`rounded-2xl p-8 md:p-12 ${
        isDark
          ? "bg-purple-950 text-white"
          : "bg-purple-50 text-purple-950 border border-purple-100"
      }`}
    >
      <div className="max-w-2xl mx-auto text-center">
        <div
          className={`mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full ${
            isDark ? "bg-gold-500/20 text-gold-400" : "bg-gold-100 text-gold-600"
          }`}
        >
          <Mail size={20} />
        </div>
        <h3
          className={`text-2xl md:text-3xl font-bold heading-font ${
            isDark ? "text-white" : "text-purple-950"
          }`}
        >
          {title}
        </h3>
        <p
          className={`mt-3 text-sm leading-relaxed ${
            isDark ? "text-purple-200" : "text-purple-700"
          }`}
        >
          {subtitle}
        </p>

        {state === "sent" ? (
          <div
            className={`mt-6 inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm ${
              isDark
                ? "bg-green-500/20 text-green-300"
                : "bg-green-50 text-green-700 border border-green-200"
            }`}
          >
            <Check size={16} />
            You&rsquo;re in. Thanks for joining!
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-6 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name (optional)"
              className={`flex-1 rounded-full px-5 py-3 text-sm outline-none transition-all ${
                isDark
                  ? "bg-white/10 text-white placeholder:text-purple-300 focus:bg-white/15"
                  : "bg-white text-purple-950 placeholder:text-gray-400 border border-gray-200 focus:border-purple-300"
              }`}
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              required
              className={`flex-1 rounded-full px-5 py-3 text-sm outline-none transition-all ${
                isDark
                  ? "bg-white/10 text-white placeholder:text-purple-300 focus:bg-white/15"
                  : "bg-white text-purple-950 placeholder:text-gray-400 border border-gray-200 focus:border-purple-300"
              }`}
            />
            <button
              type="submit"
              disabled={state === "sending"}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gold-500 px-6 py-3 text-sm font-semibold text-white hover:bg-gold-400 transition-all disabled:opacity-60 cursor-pointer"
            >
              {state === "sending" ? "Joining..." : "Join"}
              {state !== "sending" && <Send size={14} />}
            </button>
          </form>
        )}

        {errorMsg && (
          <p
            className={`mt-3 text-xs ${
              isDark ? "text-rose-300" : "text-rose-500"
            }`}
          >
            {errorMsg}
          </p>
        )}
      </div>
    </motion.div>
  );
}
