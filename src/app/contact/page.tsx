"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  Mail,
  Phone,
  Send,
  User,
  Users,
  MessageSquare,
  FileText,
  Check,
  X,
  Heart,
  MapPin,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

/* Simple Instagram SVG icon component (brand icons removed from Lucide) */
function InstagramIcon({ size = 20, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
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

/* ------------------------------------------------------------------ */
/*  Success toast                                                      */
/* ------------------------------------------------------------------ */

function SuccessToast({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      transition={{ type: "spring", damping: 25 }}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl border border-sage/30 bg-warm-white px-6 py-4 shadow-xl"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sage-light">
        <Check size={20} className="text-sage" />
      </div>
      <div>
        <p className="font-body text-sm font-medium text-text-primary">
          Message Sent
        </p>
        <p className="font-body text-xs text-text-secondary">
          Julia will get back to you soon!
        </p>
      </div>
      <button
        type="button"
        onClick={onClose}
        className="ml-2 cursor-pointer rounded-full p-1 text-text-muted transition-colors hover:bg-primary-light/30 hover:text-text-primary"
        aria-label="Dismiss"
      >
        <X size={16} />
      </button>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Contact info card                                                  */
/* ------------------------------------------------------------------ */

const contactChannels = [
  {
    icon: Mail,
    label: "Email",
    value: "julia.taivalmaki@gmail.com",
    href: "mailto:julia.taivalmaki@gmail.com",
    description: "Send a detailed message anytime",
  },
  {
    icon: Phone,
    label: "WhatsApp",
    value: "+358 40 559 6735",
    href: "https://wa.me/358405596735",
    description: "Quick questions or booking inquiries",
  },
  {
    icon: InstagramIcon,
    label: "Instagram",
    value: "@juliamooves",
    href: "https://instagram.com/juliamooves",
    description: "Follow the journey & send a DM",
  },
];

/* ------------------------------------------------------------------ */
/*  Main page                                                          */
/* ------------------------------------------------------------------ */

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

    const existing = JSON.parse(
      localStorage.getItem("juliaMessages") || "[]"
    );
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

  return (
    <div className="min-h-screen bg-warm-white">
      {/* ============================================================ */}
      {/*  CINEMATIC HERO with contact.jpg background                  */}
      {/* ============================================================ */}
      <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden lg:min-h-[70vh]">
        {/* Background image */}
        <Image
          src="/img/contact.jpg"
          alt="Julia meditating, aerial view with mandala tattoo"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Dark warm overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#2D2A26]/60 via-[#2D2A26]/50 to-[#2D2A26]/70" />
        {/* Subtle vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(45,42,38,0.4)_100%)]" />

        {/* Hero content */}
        <div className="relative z-10 mx-auto max-w-3xl px-6 pt-32 pb-16 text-center lg:pt-40 lg:pb-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-body text-sm font-medium uppercase tracking-[0.25em] text-primary-light"
          >
            Reach Out
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-5 font-heading text-5xl font-semibold text-white sm:text-6xl lg:text-7xl"
          >
            Let&apos;s Connect
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-6 max-w-xl font-body text-lg leading-relaxed text-white/80"
          >
            I&apos;d love to hear from you. Whether you have a question, want to
            book a session, or simply want to say hello &mdash; my door is
            always open.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-8"
          >
            <a
              href="#contact-form"
              className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/30 bg-white/10 px-8 py-3.5 font-body text-sm font-medium text-white backdrop-blur-sm transition-all duration-300 hover:border-white/50 hover:bg-white/20"
            >
              Send a Message
              <ArrowRight size={16} />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  CONTACT CHANNELS — horizontal strip                         */}
      {/* ============================================================ */}
      <section className="relative z-10 -mt-12 mx-auto max-w-5xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid gap-4 sm:grid-cols-3"
        >
          {contactChannels.map((ch, i) => {
            const Icon = ch.icon;
            return (
              <motion.a
                key={ch.label}
                href={ch.href}
                target={ch.label !== "Email" ? "_blank" : undefined}
                rel={ch.label !== "Email" ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                className="group flex cursor-pointer items-center gap-4 rounded-2xl border border-border bg-warm-white p-5 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-light/60 transition-colors duration-200 group-hover:bg-primary-light">
                  <Icon size={22} className="text-primary-dark" />
                </div>
                <div className="min-w-0">
                  <p className="font-body text-xs font-medium uppercase tracking-wider text-text-muted">
                    {ch.label}
                  </p>
                  <p className="truncate font-body text-sm font-medium text-text-primary group-hover:text-primary-dark">
                    {ch.value}
                  </p>
                </div>
              </motion.a>
            );
          })}
        </motion.div>
      </section>

      {/* ============================================================ */}
      {/*  FORM + PORTRAIT SECTION                                     */}
      {/* ============================================================ */}
      <section
        id="contact-form"
        className="mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-28"
      >
        <div className="grid items-start gap-16 lg:grid-cols-[1fr_420px]">
          {/* ---- Contact form ---- */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading text-3xl font-semibold text-text-primary lg:text-4xl">
              Send a Message
            </h2>
            <p className="mt-3 font-body text-base text-text-secondary">
              Fill out the form below and I&apos;ll get back to you as soon as I
              can.
            </p>

            <form
              onSubmit={handleSubmit}
              noValidate
              className="mt-10 flex flex-col gap-6"
            >
              {/* Name & Email row */}
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="flex items-center gap-2 font-body text-sm font-medium text-text-secondary"
                  >
                    <User size={14} className="text-primary" />
                    Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-border bg-warm-white px-4 py-3.5 font-body text-sm text-text-primary placeholder:text-text-muted outline-none transition-all duration-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
                    placeholder="Your name"
                  />
                  {formErrors.name && (
                    <p className="mt-1 font-body text-xs text-red-500">
                      {formErrors.name}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="contact-email"
                    className="flex items-center gap-2 font-body text-sm font-medium text-text-secondary"
                  >
                    <Mail size={14} className="text-primary" />
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-border bg-warm-white px-4 py-3.5 font-body text-sm text-text-primary placeholder:text-text-muted outline-none transition-all duration-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
                    placeholder="you@email.com"
                  />
                  {formErrors.email && (
                    <p className="mt-1 font-body text-xs text-red-500">
                      {formErrors.email}
                    </p>
                  )}
                </div>
              </div>

              {/* Subject */}
              <div>
                <label
                  htmlFor="contact-subject"
                  className="flex items-center gap-2 font-body text-sm font-medium text-text-secondary"
                >
                  <FileText size={14} className="text-primary" />
                  Subject
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-border bg-warm-white px-4 py-3.5 font-body text-sm text-text-primary placeholder:text-text-muted outline-none transition-all duration-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
                  placeholder="What is this about?"
                />
                {formErrors.subject && (
                  <p className="mt-1 font-body text-xs text-red-500">
                    {formErrors.subject}
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="contact-message"
                  className="flex items-center gap-2 font-body text-sm font-medium text-text-secondary"
                >
                  <MessageSquare size={14} className="text-primary" />
                  Message
                </label>
                <textarea
                  id="contact-message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={6}
                  className="mt-1.5 w-full resize-none rounded-xl border border-border bg-warm-white px-4 py-3.5 font-body text-sm text-text-primary placeholder:text-text-muted outline-none transition-all duration-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
                  placeholder="Share what's on your heart..."
                />
                {formErrors.message && (
                  <p className="mt-1 font-body text-xs text-red-500">
                    {formErrors.message}
                  </p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="group inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 font-body text-sm font-medium text-white transition-all duration-200 hover:bg-primary-dark hover:shadow-lg sm:w-auto"
              >
                Send Message
                <Send
                  size={16}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </button>
            </form>
          </motion.div>

          {/* ---- Right column: portrait + sidebar cards ---- */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col gap-6"
          >
            {/* Julia portrait card */}
            <div className="overflow-hidden rounded-3xl border border-border shadow-sm">
              <div className="relative aspect-[4/5]">
                <Image
                  src="/img/julia-portrait-3.jpg"
                  alt="Julia on the beach with a serene smile"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 420px"
                />
                {/* Soft gradient overlay at bottom */}
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#2D2A26]/70 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <p className="font-heading text-2xl font-semibold text-white">
                    Julia Josefiina
                  </p>
                  <p className="mt-1 flex items-center gap-1.5 font-body text-sm text-white/80">
                    <MapPin size={14} />
                    Based in Finland
                  </p>
                </div>
              </div>
            </div>

            {/* Warm quote */}
            <div className="rounded-3xl border border-lavender/20 bg-lavender-light/20 p-8 shadow-sm">
              <Heart size={24} className="text-lavender" />
              <p className="mt-4 font-heading text-lg italic leading-relaxed text-text-primary">
                &ldquo;Every question, every curiosity, every hesitation is
                welcome here. There is no wrong way to reach out.&rdquo;
              </p>
              <p className="mt-3 font-body text-sm font-medium text-text-secondary">
                &mdash; Julia
              </p>
            </div>

            {/* Newsletter */}
            <div className="rounded-3xl border border-primary/20 bg-cream/60 p-8 shadow-sm">
              <Mail size={24} className="text-primary" />
              <h3 className="mt-4 font-heading text-lg font-semibold text-text-primary">
                Monthly Loveletter
              </h3>
              <p className="mt-2 font-body text-sm leading-relaxed text-text-secondary">
                Join my monthly newsletter for soulful reflections, upcoming
                events, and gentle invitations to slow down and reconnect.
              </p>
              <Link
                href="/#newsletter"
                className="mt-4 inline-flex cursor-pointer items-center gap-2 rounded-full bg-primary px-6 py-2.5 font-body text-sm font-medium text-white transition-all duration-200 hover:bg-primary-dark"
              >
                Subscribe
                <Mail size={14} />
              </Link>
            </div>

            {/* Collaboration */}
            <div className="rounded-3xl border border-sage/20 bg-sage-light/20 p-8 shadow-sm">
              <Users size={24} className="text-sage" />
              <h3 className="mt-4 font-heading text-lg font-semibold text-text-primary">
                Collaborate with Me
              </h3>
              <p className="mt-2 font-body text-sm leading-relaxed text-text-secondary">
                Are you a practitioner, studio, or organization interested in
                collaboration? I&apos;m always open to exploring meaningful
                partnerships that serve our shared vision of healing and
                connection.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  BOTTOM CTA                                                   */}
      {/* ============================================================ */}
      <section className="bg-cream py-16 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl px-6 text-center lg:px-8"
        >
          <h2 className="font-heading text-2xl font-semibold text-text-primary lg:text-3xl">
            Ready to Begin?
          </h2>
          <p className="mt-3 font-body text-base leading-relaxed text-text-secondary">
            If you already know which service is right for you, go ahead and
            book directly.
          </p>
          <Link
            href="/book"
            className="mt-6 inline-flex cursor-pointer items-center gap-2 rounded-full bg-primary px-8 py-3.5 font-body text-sm font-medium text-white transition-all duration-200 hover:bg-primary-dark hover:shadow-lg"
          >
            Book a Session
          </Link>
        </motion.div>
      </section>

      {/* Toast */}
      <AnimatePresence>
        {showToast && <SuccessToast onClose={() => setShowToast(false)} />}
      </AnimatePresence>
    </div>
  );
}
