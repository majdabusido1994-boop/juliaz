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

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

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
    variants: [
      { label: "Drop-in", price: 18 },
      { label: "10-class card", price: 150 },
    ],
  },
];

const timeSlots = [
  "9:00",
  "10:00",
  "11:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
];

/* ------------------------------------------------------------------ */
/*  Calendar component                                                 */
/* ------------------------------------------------------------------ */

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
    <div className="rounded-2xl border border-border bg-warm-white p-5 shadow-sm">
      {/* Month nav */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
          className="cursor-pointer rounded-lg p-2 text-text-secondary transition-colors duration-200 hover:bg-primary-light/30 hover:text-text-primary"
          aria-label="Previous month"
        >
          <ChevronLeft size={20} />
        </button>
        <h3 className="font-heading text-lg font-semibold text-text-primary">
          {format(currentMonth, "MMMM yyyy")}
        </h3>
        <button
          type="button"
          onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
          className="cursor-pointer rounded-lg p-2 text-text-secondary transition-colors duration-200 hover:bg-primary-light/30 hover:text-text-primary"
          aria-label="Next month"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Weekday headers */}
      <div className="mt-4 grid grid-cols-7 text-center">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
          <span
            key={d}
            className="pb-2 font-body text-xs font-medium uppercase tracking-wider text-text-muted"
          >
            {d}
          </span>
        ))}
      </div>

      {/* Days grid */}
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
                relative flex h-10 w-full items-center justify-center rounded-lg font-body text-sm transition-all duration-150
                ${!inMonth ? "invisible" : ""}
                ${
                  disabled && inMonth
                    ? "cursor-not-allowed text-text-muted/40"
                    : ""
                }
                ${
                  !disabled && inMonth && !isSelected
                    ? "cursor-pointer text-text-primary hover:bg-primary-light/40"
                    : ""
                }
                ${
                  isSelected
                    ? "cursor-pointer bg-primary text-white font-medium shadow-md"
                    : ""
                }
              `}
              aria-label={format(day, "EEEE, MMMM d, yyyy")}
            >
              {format(day, "d")}
              {isToday && !isSelected && (
                <span className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-primary" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Success modal                                                      */
/* ------------------------------------------------------------------ */

function SuccessModal({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 25 }}
        className="relative w-full max-w-md rounded-3xl bg-warm-white p-8 text-center shadow-2xl"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 cursor-pointer rounded-full p-1.5 text-text-muted transition-colors hover:bg-primary-light/30 hover:text-text-primary"
          aria-label="Close"
        >
          <X size={20} />
        </button>
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-sage-light">
          <Check size={32} className="text-sage" />
        </div>
        <h2 className="mt-6 font-heading text-2xl font-semibold text-text-primary">
          Booking Confirmed
        </h2>
        <p className="mt-3 font-body text-sm text-text-secondary leading-relaxed">
          Thank you for booking with Julia. You will receive a confirmation
          shortly. Looking forward to seeing you!
        </p>
        <button
          type="button"
          onClick={onClose}
          className="mt-8 cursor-pointer rounded-full bg-primary px-8 py-3 font-body text-sm font-medium text-white transition-all duration-200 hover:bg-primary-dark hover:shadow-lg"
        >
          Done
        </button>
      </motion.div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main page                                                          */
/* ------------------------------------------------------------------ */

export default function BookPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-warm-white" />}>
      <BookPageContent />
    </Suspense>
  );
}

function BookPageContent() {
  const searchParams = useSearchParams();

  /* State */
  const [serviceId, setServiceId] = useState("");
  const [variantIdx, setVariantIdx] = useState(0);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  /* Pre-select from query param */
  useEffect(() => {
    const sp = searchParams.get("service");
    if (sp && serviceOptions.find((s) => s.id === sp)) {
      setServiceId(sp);
    }
  }, [searchParams]);

  /* Derived */
  const selectedService = serviceOptions.find((s) => s.id === serviceId);
  const selectedVariant = selectedService?.variants[variantIdx];

  /* Validation */
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

  /* Submit */
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

    const existing = JSON.parse(
      localStorage.getItem("juliaBookings") || "[]"
    );
    existing.push(booking);
    localStorage.setItem("juliaBookings", JSON.stringify(existing));

    setShowSuccess(true);
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

  return (
    <div className="min-h-screen bg-warm-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-cream pt-32 pb-16 lg:pt-40 lg:pb-20">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 right-1/4 h-64 w-64 rounded-full bg-sage-light/50 blur-3xl" />
          <div className="absolute bottom-10 left-1/3 h-56 w-56 rounded-full bg-lavender-light/40 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-3xl px-6 text-center lg:px-8">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-body text-sm font-medium uppercase tracking-[0.2em] text-primary-dark"
          >
            Book a Session
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 font-heading text-4xl font-semibold text-text-primary sm:text-5xl"
          >
            Reserve Your Time
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 font-body text-base text-text-secondary leading-relaxed"
          >
            Choose your service, pick a date and time, and take the first step
            toward your well-being.
          </motion.p>
        </div>
      </section>

      {/* Booking form */}
      <section className="mx-auto max-w-6xl px-6 py-16 lg:px-8 lg:py-24">
        <form
          onSubmit={handleSubmit}
          noValidate
          className="grid gap-12 lg:grid-cols-[1fr_380px]"
        >
          {/* Left column: selections & form */}
          <div className="flex flex-col gap-10">
            {/* Step 1: Service */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="flex items-center gap-3 font-heading text-xl font-semibold text-text-primary">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-white font-body">
                  1
                </span>
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
                      onClick={() => {
                        setServiceId(svc.id);
                        setVariantIdx(0);
                      }}
                      className={`cursor-pointer flex items-center gap-3 rounded-xl border p-4 text-left transition-all duration-200
                        ${
                          active
                            ? "border-primary bg-primary-light/30 shadow-md"
                            : "border-border bg-warm-white hover:border-primary/40 hover:shadow-sm"
                        }
                      `}
                    >
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                          active ? "bg-primary text-white" : "bg-cream text-primary"
                        }`}
                      >
                        <Icon size={20} />
                      </div>
                      <span className="font-body text-sm font-medium text-text-primary">
                        {svc.label}
                      </span>
                    </button>
                  );
                })}
              </div>
              {formErrors.service && (
                <p className="mt-2 font-body text-xs text-red-500">
                  {formErrors.service}
                </p>
              )}

              {/* Variant selector */}
              {selectedService && selectedService.variants.length > 1 && (
                <div className="mt-4">
                  <label className="font-body text-sm font-medium text-text-secondary">
                    Session type
                  </label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {selectedService.variants.map((v, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setVariantIdx(idx)}
                        className={`cursor-pointer rounded-full border px-5 py-2 font-body text-sm transition-all duration-200
                          ${
                            variantIdx === idx
                              ? "border-primary bg-primary text-white"
                              : "border-border bg-warm-white text-text-secondary hover:border-primary/40"
                          }
                        `}
                      >
                        {v.label} &mdash; &euro;{v.price}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>

            {/* Step 2: Date & Time */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h2 className="flex items-center gap-3 font-heading text-xl font-semibold text-text-primary">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-white font-body">
                  2
                </span>
                Pick a Date & Time
              </h2>
              <div className="mt-5 grid gap-6 md:grid-cols-2">
                <div>
                  <Calendar
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                  />
                  {formErrors.date && (
                    <p className="mt-2 font-body text-xs text-red-500">
                      {formErrors.date}
                    </p>
                  )}
                </div>
                <div>
                  <p className="mb-3 font-body text-sm font-medium text-text-secondary">
                    Available time slots
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedTime(slot)}
                        className={`cursor-pointer flex items-center justify-center gap-2 rounded-xl border px-4 py-3 font-body text-sm transition-all duration-200
                          ${
                            selectedTime === slot
                              ? "border-primary bg-primary text-white shadow-md"
                              : "border-border bg-warm-white text-text-secondary hover:border-primary/40 hover:shadow-sm"
                          }
                        `}
                      >
                        <Clock size={14} />
                        {slot}
                      </button>
                    ))}
                  </div>
                  {formErrors.time && (
                    <p className="mt-2 font-body text-xs text-red-500">
                      {formErrors.time}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Step 3: Your details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="flex items-center gap-3 font-heading text-xl font-semibold text-text-primary">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-white font-body">
                  3
                </span>
                Your Details
              </h2>
              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                {/* Name */}
                <div className="sm:col-span-2 md:col-span-1">
                  <label
                    htmlFor="book-name"
                    className="flex items-center gap-2 font-body text-sm font-medium text-text-secondary"
                  >
                    <User size={14} className="text-primary" />
                    Full Name
                  </label>
                  <input
                    id="book-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-border bg-warm-white px-4 py-3 font-body text-sm text-text-primary placeholder:text-text-muted outline-none transition-all duration-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
                    placeholder="Your full name"
                  />
                  {formErrors.name && (
                    <p className="mt-1 font-body text-xs text-red-500">
                      {formErrors.name}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="sm:col-span-2 md:col-span-1">
                  <label
                    htmlFor="book-email"
                    className="flex items-center gap-2 font-body text-sm font-medium text-text-secondary"
                  >
                    <Mail size={14} className="text-primary" />
                    Email
                  </label>
                  <input
                    id="book-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-border bg-warm-white px-4 py-3 font-body text-sm text-text-primary placeholder:text-text-muted outline-none transition-all duration-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
                    placeholder="you@email.com"
                  />
                  {formErrors.email && (
                    <p className="mt-1 font-body text-xs text-red-500">
                      {formErrors.email}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div className="sm:col-span-2 md:col-span-1">
                  <label
                    htmlFor="book-phone"
                    className="flex items-center gap-2 font-body text-sm font-medium text-text-secondary"
                  >
                    <Phone size={14} className="text-primary" />
                    Phone
                  </label>
                  <input
                    id="book-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-border bg-warm-white px-4 py-3 font-body text-sm text-text-primary placeholder:text-text-muted outline-none transition-all duration-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
                    placeholder="+358 40 123 4567"
                  />
                  {formErrors.phone && (
                    <p className="mt-1 font-body text-xs text-red-500">
                      {formErrors.phone}
                    </p>
                  )}
                </div>

                {/* Notes */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="book-notes"
                    className="flex items-center gap-2 font-body text-sm font-medium text-text-secondary"
                  >
                    <FileText size={14} className="text-primary" />
                    Special Notes or Requests
                  </label>
                  <textarea
                    id="book-notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={4}
                    className="mt-1.5 w-full resize-none rounded-xl border border-border bg-warm-white px-4 py-3 font-body text-sm text-text-primary placeholder:text-text-muted outline-none transition-all duration-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
                    placeholder="Anything Julia should know before your session..."
                  />
                </div>
              </div>
            </motion.div>

            {/* Submit (mobile) */}
            <div className="lg:hidden">
              <button
                type="submit"
                className="w-full cursor-pointer rounded-full bg-primary px-8 py-4 font-body text-base font-medium text-white transition-all duration-200 hover:bg-primary-dark hover:shadow-lg"
              >
                Confirm Booking
              </button>
            </div>
          </div>

          {/* Right column: Summary panel */}
          <motion.aside
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="hidden lg:block"
          >
            <div className="sticky top-28 rounded-3xl border border-border bg-cream/60 p-8 shadow-sm">
              <h3 className="font-heading text-xl font-semibold text-text-primary">
                Booking Summary
              </h3>

              <div className="mt-6 flex flex-col gap-4">
                {/* Service */}
                <div className="flex items-start gap-3">
                  <CalendarDays size={18} className="mt-0.5 shrink-0 text-primary" />
                  <div>
                    <p className="font-body text-xs font-medium uppercase tracking-wider text-text-muted">
                      Service
                    </p>
                    <p className="font-body text-sm text-text-primary">
                      {selectedService
                        ? `${selectedService.label}${
                            selectedVariant
                              ? ` (${selectedVariant.label})`
                              : ""
                          }`
                        : "Not selected"}
                    </p>
                  </div>
                </div>

                {/* Date */}
                <div className="flex items-start gap-3">
                  <CalendarDays size={18} className="mt-0.5 shrink-0 text-primary" />
                  <div>
                    <p className="font-body text-xs font-medium uppercase tracking-wider text-text-muted">
                      Date
                    </p>
                    <p className="font-body text-sm text-text-primary">
                      {selectedDate
                        ? format(selectedDate, "EEEE, MMMM d, yyyy")
                        : "Not selected"}
                    </p>
                  </div>
                </div>

                {/* Time */}
                <div className="flex items-start gap-3">
                  <Clock size={18} className="mt-0.5 shrink-0 text-primary" />
                  <div>
                    <p className="font-body text-xs font-medium uppercase tracking-wider text-text-muted">
                      Time
                    </p>
                    <p className="font-body text-sm text-text-primary">
                      {selectedTime || "Not selected"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="my-6 h-px bg-border" />

              {/* Price */}
              <div className="flex items-baseline justify-between">
                <span className="font-body text-sm text-text-secondary">
                  Total
                </span>
                <span className="font-heading text-3xl font-semibold text-text-primary">
                  {selectedVariant ? `€${selectedVariant.price}` : "---"}
                </span>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="mt-8 w-full cursor-pointer rounded-full bg-primary px-8 py-4 font-body text-sm font-medium text-white transition-all duration-200 hover:bg-primary-dark hover:shadow-lg"
              >
                Confirm Booking
              </button>
            </div>
          </motion.aside>
        </form>
      </section>

      {/* Success modal */}
      <AnimatePresence>
        {showSuccess && <SuccessModal onClose={resetForm} />}
      </AnimatePresence>
    </div>
  );
}
