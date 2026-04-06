"use client";

import { useState, useEffect, useMemo, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  CalendarDays,
  User,
  Mail,
  Phone,
  FileText,
  Check,
  Sparkles,
  Activity,
  Mountain,
  X,
  MessageCircle,
} from "lucide-react";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  addMonths,
  subMonths,
  isSameMonth,
  isSameDay,
  isBefore,
  startOfDay,
  isSunday,
} from "date-fns";

const serviceOptions = [
  {
    id: "intuitive-massage-reiki",
    label: "Intuitive Massage & Reiki",
    icon: Sparkles,
    variants: [
      { label: "60 min", price: 80 },
      { label: "90 min", price: 110 },
    ],
  },
  {
    id: "reiki",
    label: "Reiki",
    icon: Activity,
    variants: [
      { label: "60 min", price: 70 },
      { label: "90 min", price: 95 },
    ],
  },
  {
    id: "classes",
    label: "Class (Drop-in / Card)",
    icon: Mountain,
    payOnSite: true,
    variants: [
      { label: "Drop-in", price: 18 },
      { label: "10-class card", price: 150 },
    ],
  },
];

const timeSlots = ["9:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"];

function Calendar({
  selected,
  onSelect,
}: {
  selected: Date | null;
  onSelect: (d: Date) => void;
}) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const today = useMemo(() => startOfDay(new Date()), []);

  const days = useMemo(() => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const start = startOfWeek(monthStart, { weekStartsOn: 1 });
    const end = endOfWeek(monthEnd, { weekStartsOn: 1 });
    const result: Date[] = [];
    let day = start;
    while (day <= end) {
      result.push(day);
      day = addDays(day, 1);
    }
    return result;
  }, [currentMonth]);

  const isDisabled = useCallback(
    (day: Date) => isBefore(day, today) || isSunday(day),
    [today]
  );

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
          className="cursor-pointer rounded-lg p-2 text-purple-600 hover:bg-purple-50 transition-colors"
          aria-label="Previous month"
        >
          <ChevronLeft size={20} />
        </button>
        <h3 className="text-lg font-semibold text-purple-950 heading-font">
          {format(currentMonth, "MMMM yyyy")}
        </h3>
        <button
          type="button"
          onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
          className="cursor-pointer rounded-lg p-2 text-purple-600 hover:bg-purple-50 transition-colors"
          aria-label="Next month"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="mt-4 grid grid-cols-7 text-center">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
          <span key={d} className="pb-2 text-xs font-medium uppercase tracking-wider text-purple-400">
            {d}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((day, idx) => {
          const inMonth = isSameMonth(day, currentMonth);
          const disabled = isDisabled(day);
          const isSelected = selected ? isSameDay(day, selected) : false;
          const isToday = isSameDay(day, today);

          return (
            <button
              type="button"
              key={idx}
              disabled={disabled || !inMonth}
              onClick={() => onSelect(day)}
              className={`
                relative flex h-10 w-full items-center justify-center rounded-lg text-sm transition-all duration-150
                ${!inMonth ? "invisible" : ""}
                ${disabled && inMonth ? "cursor-not-allowed text-gray-300" : ""}
                ${!disabled && inMonth && !isSelected ? "cursor-pointer text-purple-950 hover:bg-purple-50" : ""}
                ${isSelected ? "cursor-pointer bg-gold-500 text-white font-medium shadow-md" : ""}
              `}
              aria-label={format(day, "EEEE, MMMM d, yyyy")}
            >
              {format(day, "d")}
              {isToday && !isSelected && (
                <span className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-gold-500" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function SuccessModal({
  onClose,
  waUrl,
  onSendEmail,
  emailState,
}: {
  onClose: () => void;
  waUrl: string;
  onSendEmail: () => void;
  emailState: "idle" | "sending" | "sent" | "error";
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 25 }}
        className="relative w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-2xl"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 cursor-pointer rounded-full p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
          aria-label="Close"
        >
          <X size={20} />
        </button>
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <Check size={32} className="text-green-600" />
        </div>
        <h2 className="mt-6 text-2xl font-bold text-purple-950 heading-font">
          One Last Step
        </h2>
        <p className="mt-3 text-sm text-purple-700 leading-relaxed">
          Choose how you&apos;d like to send your booking to Julia — tap a
          button below, then press send.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 cursor-pointer rounded-full bg-[#25D366] px-6 py-3 text-sm font-medium text-white hover:bg-[#20b858] transition-all"
          >
            <MessageCircle size={18} fill="white" />
            WhatsApp
          </a>
          <button
            type="button"
            onClick={onSendEmail}
            disabled={emailState === "sending" || emailState === "sent"}
            className="inline-flex items-center justify-center gap-2 cursor-pointer rounded-full bg-purple-600 px-6 py-3 text-sm font-medium text-white hover:bg-purple-500 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <Mail size={18} />
            {emailState === "idle" && "Send Email"}
            {emailState === "sending" && "Sending..."}
            {emailState === "sent" && "Sent \u2713"}
            {emailState === "error" && "Retry"}
          </button>
        </div>
        {emailState === "sent" && (
          <p className="mt-4 text-xs text-green-600">Email delivered to Julia.</p>
        )}
        {emailState === "error" && (
          <p className="mt-4 text-xs text-rose-500">Could not send email. Please try WhatsApp instead.</p>
        )}
        <button
          type="button"
          onClick={onClose}
          className="mt-3 block w-full cursor-pointer text-xs text-purple-400 hover:text-purple-600 transition-colors"
        >
          Close
        </button>
      </motion.div>
    </motion.div>
  );
}

export default function BookPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <BookPageContent />
    </Suspense>
  );
}

function BookPageContent() {
  const searchParams = useSearchParams();

  const [serviceId, setServiceId] = useState("");
  const [variantIdx, setVariantIdx] = useState(0);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [waUrl, setWaUrl] = useState("");
  const [emailState, setEmailState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const sp = searchParams.get("service");
    if (sp && serviceOptions.find((s) => s.id === sp)) {
      setServiceId(sp);
    }
  }, [searchParams]);

  const selectedService = serviceOptions.find((s) => s.id === serviceId);
  const selectedVariant = selectedService?.variants[variantIdx];

  const validate = () => {
    const errors: Record<string, string> = {};
    if (!serviceId) errors.service = "Please select a service";
    if (!selectedDate) errors.date = "Please choose a date";
    if (!selectedTime) errors.time = "Please pick a time slot";
    if (!name.trim()) errors.name = "Name is required";
    if (!email.trim()) errors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      errors.email = "Please enter a valid email";
    if (!phone.trim()) errors.phone = "Phone number is required";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const booking = {
      id: Date.now().toString(36),
      service: selectedService!.label,
      variant: selectedVariant!.label,
      price: selectedVariant!.price,
      date: format(selectedDate!, "yyyy-MM-dd"),
      time: selectedTime,
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      notes: notes.trim(),
      createdAt: new Date().toISOString(),
    };
    const existing = JSON.parse(localStorage.getItem("juliaBookings") || "[]");
    existing.push(booking);
    localStorage.setItem("juliaBookings", JSON.stringify(existing));

    // Send booking details to Julia's WhatsApp
    const priceLine = selectedService!.payOnSite
      ? `*Payment:* Pay at studio\n`
      : `*Price:* \u20AC${booking.price}\n`;
    const message =
      `*New Booking Request*\n\n` +
      `*Service:* ${booking.service} (${booking.variant})\n` +
      priceLine +
      `*Date:* ${format(selectedDate!, "EEEE, MMMM d, yyyy")}\n` +
      `*Time:* ${booking.time}\n\n` +
      `*Name:* ${booking.name}\n` +
      `*Email:* ${booking.email}\n` +
      `*Phone:* ${booking.phone}` +
      (booking.notes ? `\n\n*Notes:* ${booking.notes}` : "");

    const url = `https://api.whatsapp.com/send?phone=358405596735&text=${encodeURIComponent(message)}`;
    setWaUrl(url);
    setEmailState("idle");
    setShowSuccess(true);
  };

  const sendEmail = async () => {
    if (!selectedService || !selectedVariant || !selectedDate) return;
    setEmailState("sending");
    const body = new URLSearchParams({
      "form-name": "booking",
      "bot-field": "",
      service: selectedService.label,
      variant: selectedVariant.label,
      price: selectedService.payOnSite ? "Pay at studio" : `\u20AC${selectedVariant.price}`,
      date: format(selectedDate, "EEEE, MMMM d, yyyy"),
      time: selectedTime,
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      notes: notes.trim(),
    });
    try {
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });
      setEmailState(res.ok ? "sent" : "error");
    } catch {
      setEmailState("error");
    }
  };

  const resetForm = () => {
    setServiceId("");
    setVariantIdx(0);
    setSelectedDate(null);
    setSelectedTime("");
    setName("");
    setEmail("");
    setPhone("");
    setNotes("");
    setFormErrors({});
    setShowSuccess(false);
  };

  const inputClass =
    "mt-1.5 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-purple-950 placeholder:text-gray-400 outline-none transition-all duration-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-100";

  return (
    <>
      {/* Hero Banner */}
      <section className="pt-32 pb-20 px-6 bg-gradient-to-b from-purple-950 to-purple-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-gold-400 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-3xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold text-white heading-font"
          >
            Book a Session
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-purple-300 text-lg mt-4"
          >
            Choose your service, pick a date, and take the first step.
          </motion.p>
        </div>
      </section>

      {/* Booking Form */}
      <section className="max-w-6xl mx-auto px-6 py-24 lg:px-8">
        <form onSubmit={handleSubmit} noValidate className="grid gap-12 lg:grid-cols-[1fr_380px]">
          <div className="flex flex-col gap-16">
            {/* Step 1: Service */}
            <div>
              <h2 className="flex items-center gap-3 text-xl font-bold text-purple-950 heading-font">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gold-500 text-sm font-bold text-white">1</span>
                Choose a Service
              </h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {serviceOptions.map((svc) => {
                  const Icon = svc.icon;
                  const active = serviceId === svc.id;
                  return (
                    <button
                      key={svc.id}
                      type="button"
                      onClick={() => { setServiceId(svc.id); setVariantIdx(0); }}
                      className={`cursor-pointer flex items-center gap-4 rounded-2xl border p-6 text-left transition-all duration-200
                        ${active
                          ? "border-gold-400 bg-gold-50 shadow-sm"
                          : "border-gray-200 bg-white hover:border-purple-200 hover:shadow-sm"
                        }
                      `}
                    >
                      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${active ? "bg-gold-500 text-white" : "bg-purple-50 text-purple-600"}`}>
                        <Icon size={20} />
                      </div>
                      <span className="text-sm font-medium text-purple-950">{svc.label}</span>
                    </button>
                  );
                })}
              </div>
              {formErrors.service && <p className="mt-2 text-xs text-rose-500">{formErrors.service}</p>}

              {selectedService && selectedService.variants.length > 1 && (
                <div className="mt-4">
                  <label className="text-sm font-medium text-purple-700">Session type</label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {selectedService.variants.map((v, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setVariantIdx(idx)}
                        className={`cursor-pointer rounded-full border px-6 py-3 text-sm transition-all duration-200
                          ${variantIdx === idx
                            ? "border-gold-400 bg-gold-500 text-white"
                            : "border-gray-200 bg-white text-purple-700 hover:border-purple-200"
                          }
                        `}
                      >
                        {v.label}{!selectedService.payOnSite && <> &mdash; &euro;{v.price}</>}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Step 2: Date & Time */}
            <div>
              <h2 className="flex items-center gap-3 text-xl font-bold text-purple-950 heading-font">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gold-500 text-sm font-bold text-white">2</span>
                Pick a Date & Time
              </h2>
              <div className="mt-5 grid gap-6 md:grid-cols-2">
                <div>
                  <Calendar selected={selectedDate} onSelect={setSelectedDate} />
                  {formErrors.date && <p className="mt-2 text-xs text-rose-500">{formErrors.date}</p>}
                </div>
                <div>
                  <p className="mb-3 text-sm font-medium text-purple-700">Available times</p>
                  <div className="grid grid-cols-2 gap-2">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedTime(slot)}
                        className={`cursor-pointer flex items-center justify-center gap-2 rounded-xl border px-5 py-4 text-sm transition-all duration-200
                          ${selectedTime === slot
                            ? "border-gold-400 bg-gold-500 text-white shadow-md"
                            : "border-gray-200 bg-white text-purple-700 hover:border-purple-200"
                          }
                        `}
                      >
                        <Clock size={14} />
                        {slot}
                      </button>
                    ))}
                  </div>
                  {formErrors.time && <p className="mt-2 text-xs text-rose-500">{formErrors.time}</p>}
                </div>
              </div>
            </div>

            {/* Step 3: Details */}
            <div>
              <h2 className="flex items-center gap-3 text-xl font-bold text-purple-950 heading-font">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gold-500 text-sm font-bold text-white">3</span>
                Your Details
              </h2>
              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="book-name" className="flex items-center gap-2 text-sm font-medium text-purple-700">
                    <User size={14} className="text-purple-400" /> Full Name
                  </label>
                  <input id="book-name" type="text" value={name} onChange={(e) => setName(e.target.value)} className={inputClass} placeholder="Your full name" />
                  {formErrors.name && <p className="mt-1 text-xs text-rose-500">{formErrors.name}</p>}
                </div>
                <div>
                  <label htmlFor="book-email" className="flex items-center gap-2 text-sm font-medium text-purple-700">
                    <Mail size={14} className="text-purple-400" /> Email
                  </label>
                  <input id="book-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} placeholder="you@email.com" />
                  {formErrors.email && <p className="mt-1 text-xs text-rose-500">{formErrors.email}</p>}
                </div>
                <div>
                  <label htmlFor="book-phone" className="flex items-center gap-2 text-sm font-medium text-purple-700">
                    <Phone size={14} className="text-purple-400" /> Phone
                  </label>
                  <input id="book-phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className={inputClass} placeholder="+358 40 123 4567" />
                  {formErrors.phone && <p className="mt-1 text-xs text-rose-500">{formErrors.phone}</p>}
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="book-notes" className="flex items-center gap-2 text-sm font-medium text-purple-700">
                    <FileText size={14} className="text-purple-400" /> Notes (optional)
                  </label>
                  <textarea id="book-notes" value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} className={`${inputClass} resize-none`} placeholder="Anything I should know beforehand..." />
                </div>
              </div>
            </div>

            {/* Submit mobile */}
            <div className="lg:hidden">
              <button type="submit" className="w-full cursor-pointer rounded-full bg-gold-500 px-10 py-4 text-base font-medium text-white hover:bg-gold-400 transition-all">
                Confirm Booking
              </button>
            </div>
          </div>

          {/* Summary sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-28 rounded-2xl bg-white p-8 shadow-lg border border-gray-100">
              <h3 className="text-xl font-bold text-purple-950 heading-font">Summary</h3>

              <div className="mt-6 flex flex-col gap-4">
                <div className="flex items-start gap-3">
                  <CalendarDays size={18} className="mt-0.5 shrink-0 text-gold-500" />
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-purple-400">Service</p>
                    <p className="text-sm text-purple-950">
                      {selectedService ? `${selectedService.label}${selectedVariant ? ` (${selectedVariant.label})` : ""}` : "Not selected"}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CalendarDays size={18} className="mt-0.5 shrink-0 text-gold-500" />
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-purple-400">Date</p>
                    <p className="text-sm text-purple-950">
                      {selectedDate ? format(selectedDate, "EEEE, MMMM d, yyyy") : "Not selected"}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock size={18} className="mt-0.5 shrink-0 text-gold-500" />
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-purple-400">Time</p>
                    <p className="text-sm text-purple-950">{selectedTime || "Not selected"}</p>
                  </div>
                </div>
              </div>

              <div className="section-divider my-6" />

              <div className="flex items-baseline justify-between">
                <span className="text-sm text-purple-600">Total</span>
                {selectedService?.payOnSite ? (
                  <span className="text-sm font-medium text-purple-700 heading-font">
                    Pay at studio
                  </span>
                ) : (
                  <span className="text-3xl font-bold text-purple-950 heading-font">
                    {selectedVariant ? `\u20AC${selectedVariant.price}` : "---"}
                  </span>
                )}
              </div>

              <button
                type="submit"
                className="mt-8 w-full cursor-pointer rounded-full bg-gold-500 px-10 py-4 text-sm font-medium text-white hover:bg-gold-400 transition-all"
              >
                Confirm Booking
              </button>
            </div>
          </aside>
        </form>
      </section>

      <AnimatePresence>
        {showSuccess && (
          <SuccessModal
            onClose={resetForm}
            waUrl={waUrl}
            onSendEmail={sendEmail}
            emailState={emailState}
          />
        )}
      </AnimatePresence>
    </>
  );
}
