"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Mail,
  Phone,
  Send,
  User,
  MessageSquare,
  FileText,
  Check,
  X,
} from "lucide-react";

function InstagramIcon({ size = 20, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function SuccessToast({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      transition={{ type: "spring", damping: 25 }}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl bg-white px-6 py-4 shadow-xl border border-gray-200"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-100">
        <Check size={20} className="text-green-600" />
      </div>
      <div>
        <p className="text-sm font-medium text-purple-950">Message Sent</p>
        <p className="text-xs text-purple-600">I&apos;ll get back to you soon!</p>
      </div>
      <button
        type="button"
        onClick={onClose}
        className="ml-2 cursor-pointer rounded-full p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
        aria-label="Dismiss"
      >
        <X size={16} />
      </button>
    </motion.div>
  );
}

const contactMethods = [
  {
    icon: Mail,
    label: "Email",
    value: "julia.taivalmaki@gmail.com",
    href: "mailto:julia.taivalmaki@gmail.com",
    color: "bg-purple-50 text-purple-600",
  },
  {
    icon: Phone,
    label: "WhatsApp",
    value: "+358 40 559 6735",
    href: "https://api.whatsapp.com/send?phone=358405596735",
    color: "bg-green-50 text-green-600",
  },
  {
    icon: InstagramIcon,
    label: "Instagram",
    value: "@juliamooves",
    href: "https://instagram.com/juliamooves",
    color: "bg-pink-50 text-pink-600",
  },
];

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [showToast, setShowToast] = useState(false);

  const validate = () => {
    const errors: Record<string, string> = {};
    if (!name.trim()) errors.name = "Name is required";
    if (!email.trim()) errors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      errors.email = "Please enter a valid email";
    if (!subject.trim()) errors.subject = "Subject is required";
    if (!message.trim()) errors.message = "Please write a message";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const msg = {
      id: Date.now().toString(36),
      name: name.trim(),
      email: email.trim(),
      subject: subject.trim(),
      message: message.trim(),
      createdAt: new Date().toISOString(),
    };
    const existing = JSON.parse(localStorage.getItem("juliaMessages") || "[]");
    existing.push(msg);
    localStorage.setItem("juliaMessages", JSON.stringify(existing));

    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
    setFormErrors({});
    setShowToast(true);
    setTimeout(() => setShowToast(false), 5000);
  };

  const inputClass =
    "mt-1.5 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-purple-950 placeholder:text-gray-400 outline-none transition-all duration-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-100";

  return (
    <>
      {/* Hero Banner */}
      <section className="pt-32 pb-20 px-6 bg-gradient-to-b from-purple-950 to-purple-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-gold-400 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold text-white heading-font"
          >
            Let&apos;s Connect
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-purple-300 text-lg mt-4"
          >
            I&apos;d love to hear from you
          </motion.p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Methods */}
          <div>
            <h2 className="text-2xl font-bold text-purple-950 heading-font mb-8">
              Reach Out
            </h2>
            <div className="space-y-4">
              {contactMethods.map((method, i) => {
                const Icon = method.icon;
                return (
                  <motion.a
                    key={method.label}
                    href={method.href}
                    target={method.label !== "Email" ? "_blank" : undefined}
                    rel={method.label !== "Email" ? "noopener noreferrer" : undefined}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="flex items-center gap-4 p-5 rounded-xl border border-gray-100 hover:border-purple-200 hover:shadow-md transition-all duration-300 group cursor-pointer"
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${method.color}`}>
                      <Icon size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-purple-500">{method.label}</p>
                      <p className="font-medium text-purple-950 group-hover:text-gold-500 transition-colors">
                        {method.value}
                      </p>
                    </div>
                  </motion.a>
                );
              })}
            </div>

            <div className="section-divider max-w-xs mt-8" />

            {/* Book CTA */}
            <div className="mt-8">
              <p className="text-purple-700 text-sm mb-4">
                Ready to book? Go directly to the booking page.
              </p>
              <Link
                href="/book"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gold-500 text-white font-semibold rounded-full hover:bg-gold-400 transition-all duration-300 text-sm cursor-pointer"
              >
                Book a Session
              </Link>
            </div>
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
          >
            <h3 className="text-xl font-bold text-purple-950 heading-font mb-6">
              Send a Message
            </h3>
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-name" className="flex items-center gap-2 text-sm font-medium text-purple-700">
                    <User size={14} className="text-purple-400" /> Name
                  </label>
                  <input id="contact-name" type="text" value={name} onChange={(e) => setName(e.target.value)} className={inputClass} placeholder="Your name" />
                  {formErrors.name && <p className="mt-1 text-xs text-rose-500">{formErrors.name}</p>}
                </div>
                <div>
                  <label htmlFor="contact-email" className="flex items-center gap-2 text-sm font-medium text-purple-700">
                    <Mail size={14} className="text-purple-400" /> Email
                  </label>
                  <input id="contact-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} placeholder="you@email.com" />
                  {formErrors.email && <p className="mt-1 text-xs text-rose-500">{formErrors.email}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="contact-subject" className="flex items-center gap-2 text-sm font-medium text-purple-700">
                  <FileText size={14} className="text-purple-400" /> Subject
                </label>
                <input id="contact-subject" type="text" value={subject} onChange={(e) => setSubject(e.target.value)} className={inputClass} placeholder="What is this about?" />
                {formErrors.subject && <p className="mt-1 text-xs text-rose-500">{formErrors.subject}</p>}
              </div>

              <div>
                <label htmlFor="contact-message" className="flex items-center gap-2 text-sm font-medium text-purple-700">
                  <MessageSquare size={14} className="text-purple-400" /> Message
                </label>
                <textarea id="contact-message" value={message} onChange={(e) => setMessage(e.target.value)} rows={5} className={`${inputClass} resize-none`} placeholder="Share what's on your heart..." />
                {formErrors.message && <p className="mt-1 text-xs text-rose-500">{formErrors.message}</p>}
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto cursor-pointer inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-gold-500 text-white font-semibold rounded-full hover:bg-gold-400 transition-all duration-300 text-sm tracking-wide"
              >
                Send Message
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {showToast && <SuccessToast onClose={() => setShowToast(false)} />}
      </AnimatePresence>
    </>
  );
}
