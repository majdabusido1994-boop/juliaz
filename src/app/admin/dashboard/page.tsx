"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  CalendarDays,
  Gamepad2,
  Mail,
  LogOut,
  Search,
  Download,
  Trophy,
  CheckCircle2,
  XCircle,
  Clock,
  Eye,
  EyeOff,
  ArrowUpDown,
  Loader2,
  BarChart3,
  Users,
  MessageSquare,
  Sparkles,
} from "lucide-react";

// ── Types ──────────────────────────────────────────────────────────────

interface Booking {
  id?: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  status?: "Pending" | "Confirmed" | "Completed" | "Cancelled";
  notes?: string;
}

interface GameScore {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  score: number;
  archetype: string;
  date: string;
  discountCode?: string;
}

interface ContactMessage {
  id?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  read?: boolean;
}

type Tab = "bookings" | "game" | "messages";

// ── Helpers ────────────────────────────────────────────────────────────

function safeParseJSON<T>(key: string, fallback: T[]): T[] {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
}

function formatDate(dateStr: string) {
  try {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

// ── Stat Card ──────────────────────────────────────────────────────────

function StatCard({
  label,
  value,
  icon: Icon,
  color,
}: {
  label: string;
  value: string | number;
  icon: React.ElementType;
  color: string;
}) {
  const colorMap: Record<string, string> = {
    primary: "bg-primary-light/40 text-primary-dark",
    sage: "bg-sage-light/50 text-sage",
    lavender: "bg-lavender-light/50 text-lavender",
    accent: "bg-primary-light/30 text-accent-gold",
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-warm-white rounded-xl border border-border/50 p-5 sm:p-6 shadow-sm"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-text-muted text-xs sm:text-sm font-medium uppercase tracking-wide">
            {label}
          </p>
          <p className="text-2xl sm:text-3xl font-heading font-semibold text-text-primary mt-1">
            {value}
          </p>
        </div>
        <div
          className={`w-10 h-10 sm:w-11 sm:h-11 rounded-lg flex items-center justify-center ${colorMap[color] || colorMap.primary}`}
        >
          <Icon className="w-5 h-5 sm:w-5.5 sm:h-5.5" />
        </div>
      </div>
    </motion.div>
  );
}

// ── Status Badge ───────────────────────────────────────────────────────

function StatusBadge({
  status,
  onClick,
}: {
  status: string;
  onClick?: () => void;
}) {
  const styles: Record<string, string> = {
    Pending: "bg-amber-50 text-amber-700 border-amber-200",
    Confirmed: "bg-blue-50 text-blue-700 border-blue-200",
    Completed: "bg-green-50 text-green-700 border-green-200",
    Cancelled: "bg-red-50 text-red-700 border-red-200",
  };
  return (
    <span
      onClick={onClick}
      className={`inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-medium rounded-full border ${styles[status] || styles.Pending} ${onClick ? "cursor-pointer hover:opacity-80 transition-opacity" : ""}`}
    >
      {status === "Completed" && <CheckCircle2 className="w-3 h-3" />}
      {status === "Cancelled" && <XCircle className="w-3 h-3" />}
      {status === "Pending" && <Clock className="w-3 h-3" />}
      {status === "Confirmed" && <CheckCircle2 className="w-3 h-3" />}
      {status}
    </span>
  );
}

// ── Main Dashboard ─────────────────────────────────────────────────────

export default function AdminDashboardPage() {
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>("bookings");
  const [searchQuery, setSearchQuery] = useState("");
  const [bookingSortAsc, setBookingSortAsc] = useState(false);
  const [gameSortField, setGameSortField] = useState<"score" | "date">("date");
  const [gameSortAsc, setGameSortAsc] = useState(false);

  // Data
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [gameScores, setGameScores] = useState<GameScore[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);

  // ── Auth check ─────────────────────────────────────────────────────
  useEffect(() => {
    const auth = localStorage.getItem("juliaAdmin");
    if (auth !== "authenticated") {
      router.replace("/admin");
    } else {
      setCheckingAuth(false);
    }
  }, [router]);

  // ── Load data ──────────────────────────────────────────────────────
  useEffect(() => {
    if (checkingAuth) return;
    setBookings(safeParseJSON<Booking>("juliaBookings", []));
    setGameScores(safeParseJSON<GameScore>("spiritGameScores", []));
    setMessages(safeParseJSON<ContactMessage>("juliaMessages", []));
  }, [checkingAuth]);

  // ── Persist helpers ────────────────────────────────────────────────
  const persistBookings = useCallback((updated: Booking[]) => {
    setBookings(updated);
    localStorage.setItem("juliaBookings", JSON.stringify(updated));
  }, []);

  const persistMessages = useCallback((updated: ContactMessage[]) => {
    setMessages(updated);
    localStorage.setItem("juliaMessages", JSON.stringify(updated));
  }, []);

  // ── Logout ─────────────────────────────────────────────────────────
  const handleLogout = () => {
    localStorage.removeItem("juliaAdmin");
    router.replace("/admin");
  };

  // ── Booking actions ────────────────────────────────────────────────
  const cycleBookingStatus = (index: number) => {
    const order: Booking["status"][] = [
      "Pending",
      "Confirmed",
      "Completed",
      "Cancelled",
    ];
    const updated = [...bookings];
    const current = updated[index].status || "Pending";
    const nextIdx = (order.indexOf(current) + 1) % order.length;
    updated[index] = { ...updated[index], status: order[nextIdx] };
    persistBookings(updated);
  };

  // ── Filtered / sorted bookings ─────────────────────────────────────
  const filteredBookings = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    let filtered = bookings;
    if (q) {
      filtered = bookings.filter(
        (b) =>
          b.name?.toLowerCase().includes(q) ||
          b.email?.toLowerCase().includes(q) ||
          b.service?.toLowerCase().includes(q) ||
          b.status?.toLowerCase().includes(q)
      );
    }
    return [...filtered].sort((a, b) => {
      const da = new Date(a.date).getTime() || 0;
      const db = new Date(b.date).getTime() || 0;
      return bookingSortAsc ? da - db : db - da;
    });
  }, [bookings, searchQuery, bookingSortAsc]);

  // ── Sorted game scores ─────────────────────────────────────────────
  const sortedGameScores = useMemo(() => {
    return [...gameScores].sort((a, b) => {
      if (gameSortField === "score") {
        return gameSortAsc ? a.score - b.score : b.score - a.score;
      }
      const da = new Date(a.date).getTime() || 0;
      const db = new Date(b.date).getTime() || 0;
      return gameSortAsc ? da - db : db - da;
    });
  }, [gameScores, gameSortField, gameSortAsc]);

  // Top 3 scorer IDs
  const top3Ids = useMemo(() => {
    const sorted = [...gameScores].sort((a, b) => b.score - a.score);
    return new Set(sorted.slice(0, 3).map((s) => s.email + s.score));
  }, [gameScores]);

  // ── Stats ──────────────────────────────────────────────────────────
  const avgScore = useMemo(() => {
    if (gameScores.length === 0) return 0;
    const total = gameScores.reduce((sum, s) => sum + (s.score || 0), 0);
    return Math.round(total / gameScores.length);
  }, [gameScores]);

  // ── Toggle message read ────────────────────────────────────────────
  const toggleReadStatus = (index: number) => {
    const updated = [...messages];
    updated[index] = { ...updated[index], read: !updated[index].read };
    persistMessages(updated);
  };

  // ── CSV Export ─────────────────────────────────────────────────────
  const exportGameCSV = () => {
    const headers = [
      "Name",
      "Email",
      "Phone",
      "Score",
      "Archetype",
      "Date",
      "Discount Code",
    ];
    const rows = sortedGameScores.map((s) =>
      [
        s.name,
        s.email,
        s.phone || "",
        s.score,
        s.archetype,
        s.date,
        s.discountCode || "",
      ]
        .map((v) => `"${String(v).replace(/"/g, '""')}"`)
        .join(",")
    );
    const csv = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `spirit-game-scores-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // ── Loading ────────────────────────────────────────────────────────
  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  // ── Tab config ─────────────────────────────────────────────────────
  const tabs: { key: Tab; label: string; icon: React.ElementType }[] = [
    { key: "bookings", label: "Bookings", icon: CalendarDays },
    { key: "game", label: "Game Data", icon: Gamepad2 },
    { key: "messages", label: "Messages", icon: Mail },
  ];

  const unreadCount = messages.filter((m) => !m.read).length;

  // ══════════════════════════════════════════════════════════════════════
  return (
    <div className="min-h-screen bg-cream">
      {/* ── Header ────────────────────────────────────────────────────── */}
      <header className="bg-warm-white border-b border-border/50 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="font-heading text-2xl sm:text-3xl font-semibold text-text-primary">
              Welcome, Julia
            </h1>
            <p className="text-text-muted text-xs sm:text-sm mt-0.5">
              Manage your wellness practice
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-text-secondary hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all duration-200 text-sm font-medium cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 sm:space-y-8">
        {/* ── Stats ─────────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <StatCard
            label="Total Bookings"
            value={bookings.length}
            icon={CalendarDays}
            color="primary"
          />
          <StatCard
            label="Game Players"
            value={gameScores.length}
            icon={Users}
            color="sage"
          />
          <StatCard
            label="Messages"
            value={messages.length}
            icon={MessageSquare}
            color="lavender"
          />
          <StatCard
            label="Avg. Score"
            value={avgScore}
            icon={BarChart3}
            color="accent"
          />
        </div>

        {/* ── Tab Nav ───────────────────────────────────────────────── */}
        <div className="flex gap-1 bg-warm-white rounded-xl p-1 border border-border/50 shadow-sm w-fit">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => {
                  setActiveTab(tab.key);
                  setSearchQuery("");
                }}
                className={`relative flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-primary text-warm-white shadow-sm"
                    : "text-text-secondary hover:text-text-primary hover:bg-cream/50"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
                {tab.key === "messages" && unreadCount > 0 && (
                  <span
                    className={`ml-1 px-1.5 py-0.5 text-[10px] font-bold rounded-full ${isActive ? "bg-warm-white text-primary" : "bg-primary text-warm-white"}`}
                  >
                    {unreadCount}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* ── Tab Content ───────────────────────────────────────────── */}
        <AnimatePresence mode="wait">
          {/* ── BOOKINGS TAB ──────────────────────────────────────── */}
          {activeTab === "bookings" && (
            <motion.div
              key="bookings"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              {/* Toolbar */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                  <input
                    type="text"
                    placeholder="Search by name, email, service, status..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-border bg-warm-white text-text-primary placeholder:text-text-muted/60 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-200 text-sm font-body"
                  />
                </div>
                <button
                  onClick={() => setBookingSortAsc(!bookingSortAsc)}
                  className="flex items-center gap-1.5 px-3 py-2.5 rounded-lg border border-border bg-warm-white text-text-secondary hover:text-text-primary hover:border-primary/40 transition-all duration-200 text-sm cursor-pointer"
                >
                  <ArrowUpDown className="w-4 h-4" />
                  Date {bookingSortAsc ? "Oldest" : "Newest"}
                </button>
              </div>

              {filteredBookings.length === 0 ? (
                <EmptyState
                  icon={CalendarDays}
                  message={
                    searchQuery
                      ? "No bookings match your search"
                      : "No bookings yet"
                  }
                />
              ) : (
                <>
                  {/* Desktop Table */}
                  <div className="hidden md:block bg-warm-white rounded-xl border border-border/50 shadow-sm overflow-hidden">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-cream/60 border-b border-border/50">
                          <th className="px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                            Client
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                            Contact
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                            Service
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                            Date & Time
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                            Notes
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredBookings.map((b, i) => (
                          <tr
                            key={i}
                            className={`border-b border-border/30 hover:bg-cream/30 transition-colors ${i % 2 === 0 ? "bg-warm-white" : "bg-cream/20"}`}
                          >
                            <td className="px-4 py-3 font-medium text-text-primary">
                              {b.name}
                            </td>
                            <td className="px-4 py-3 text-text-secondary">
                              <div>{b.email}</div>
                              <div className="text-text-muted text-xs">
                                {b.phone}
                              </div>
                            </td>
                            <td className="px-4 py-3 text-text-secondary">
                              {b.service}
                            </td>
                            <td className="px-4 py-3 text-text-secondary">
                              <div>{formatDate(b.date)}</div>
                              <div className="text-text-muted text-xs">
                                {b.time}
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <StatusBadge
                                status={b.status || "Pending"}
                                onClick={() => {
                                  const realIdx = bookings.indexOf(b);
                                  if (realIdx !== -1)
                                    cycleBookingStatus(realIdx);
                                }}
                              />
                            </td>
                            <td className="px-4 py-3 text-text-muted text-xs max-w-[150px] truncate">
                              {b.notes || "—"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Mobile Cards */}
                  <div className="md:hidden space-y-3">
                    {filteredBookings.map((b, i) => {
                      const realIdx = bookings.indexOf(b);
                      return (
                        <div
                          key={i}
                          className="bg-warm-white rounded-xl border border-border/50 p-4 shadow-sm space-y-2.5"
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="font-medium text-text-primary">
                                {b.name}
                              </p>
                              <p className="text-text-muted text-xs">
                                {b.email}
                              </p>
                            </div>
                            <StatusBadge
                              status={b.status || "Pending"}
                              onClick={() => {
                                if (realIdx !== -1)
                                  cycleBookingStatus(realIdx);
                              }}
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div>
                              <span className="text-text-muted">Service:</span>{" "}
                              <span className="text-text-secondary">
                                {b.service}
                              </span>
                            </div>
                            <div>
                              <span className="text-text-muted">Phone:</span>{" "}
                              <span className="text-text-secondary">
                                {b.phone}
                              </span>
                            </div>
                            <div>
                              <span className="text-text-muted">Date:</span>{" "}
                              <span className="text-text-secondary">
                                {formatDate(b.date)}
                              </span>
                            </div>
                            <div>
                              <span className="text-text-muted">Time:</span>{" "}
                              <span className="text-text-secondary">
                                {b.time}
                              </span>
                            </div>
                          </div>
                          {b.notes && (
                            <p className="text-text-muted text-xs pt-1 border-t border-border/30">
                              {b.notes}
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </motion.div>
          )}

          {/* ── GAME DATA TAB ─────────────────────────────────────── */}
          {activeTab === "game" && (
            <motion.div
              key="game"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              {/* Toolbar */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-4">
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setGameSortField("date");
                      setGameSortAsc((p) =>
                        gameSortField === "date" ? !p : false
                      );
                    }}
                    className={`flex items-center gap-1.5 px-3 py-2.5 rounded-lg border text-sm cursor-pointer transition-all duration-200 ${gameSortField === "date" ? "border-primary bg-primary-light/20 text-primary-dark" : "border-border bg-warm-white text-text-secondary hover:border-primary/40"}`}
                  >
                    <ArrowUpDown className="w-4 h-4" />
                    Date
                  </button>
                  <button
                    onClick={() => {
                      setGameSortField("score");
                      setGameSortAsc((p) =>
                        gameSortField === "score" ? !p : false
                      );
                    }}
                    className={`flex items-center gap-1.5 px-3 py-2.5 rounded-lg border text-sm cursor-pointer transition-all duration-200 ${gameSortField === "score" ? "border-primary bg-primary-light/20 text-primary-dark" : "border-border bg-warm-white text-text-secondary hover:border-primary/40"}`}
                  >
                    <ArrowUpDown className="w-4 h-4" />
                    Score
                  </button>
                </div>
                <div className="sm:ml-auto">
                  <button
                    onClick={exportGameCSV}
                    disabled={gameScores.length === 0}
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-primary text-warm-white text-sm font-medium hover:bg-primary-dark transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Download className="w-4 h-4" />
                    Export CSV
                  </button>
                </div>
              </div>

              {sortedGameScores.length === 0 ? (
                <EmptyState
                  icon={Gamepad2}
                  message="No game entries yet"
                />
              ) : (
                <>
                  {/* Desktop Table */}
                  <div className="hidden md:block bg-warm-white rounded-xl border border-border/50 shadow-sm overflow-hidden">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-cream/60 border-b border-border/50">
                          <th className="px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider w-8">
                            #
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                            Name
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                            Contact
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                            Score
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                            Archetype
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                            Date
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                            Discount
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {sortedGameScores.map((s, i) => {
                          const isTop3 = top3Ids.has(s.email + s.score);
                          return (
                            <tr
                              key={i}
                              className={`border-b border-border/30 hover:bg-cream/30 transition-colors ${isTop3 ? "bg-accent-gold/5" : i % 2 === 0 ? "bg-warm-white" : "bg-cream/20"}`}
                            >
                              <td className="px-4 py-3">
                                {isTop3 ? (
                                  <Trophy className="w-4 h-4 text-accent-gold" />
                                ) : (
                                  <span className="text-text-muted text-xs">
                                    {i + 1}
                                  </span>
                                )}
                              </td>
                              <td className="px-4 py-3 font-medium text-text-primary">
                                {s.name}
                              </td>
                              <td className="px-4 py-3 text-text-secondary">
                                <div>{s.email}</div>
                                {s.phone && (
                                  <div className="text-text-muted text-xs">
                                    {s.phone}
                                  </div>
                                )}
                              </td>
                              <td className="px-4 py-3">
                                <span
                                  className={`font-semibold ${isTop3 ? "text-accent-gold" : "text-text-primary"}`}
                                >
                                  {s.score}
                                </span>
                              </td>
                              <td className="px-4 py-3">
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-lavender-light/50 text-lavender text-xs font-medium">
                                  <Sparkles className="w-3 h-3" />
                                  {s.archetype}
                                </span>
                              </td>
                              <td className="px-4 py-3 text-text-secondary">
                                {formatDate(s.date)}
                              </td>
                              <td className="px-4 py-3 text-text-muted text-xs font-mono">
                                {s.discountCode || "—"}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  {/* Mobile Cards */}
                  <div className="md:hidden space-y-3">
                    {sortedGameScores.map((s, i) => {
                      const isTop3 = top3Ids.has(s.email + s.score);
                      return (
                        <div
                          key={i}
                          className={`rounded-xl border p-4 shadow-sm space-y-2.5 ${isTop3 ? "bg-accent-gold/5 border-accent-gold/30" : "bg-warm-white border-border/50"}`}
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="flex items-center gap-1.5">
                                {isTop3 && (
                                  <Trophy className="w-4 h-4 text-accent-gold" />
                                )}
                                <p className="font-medium text-text-primary">
                                  {s.name}
                                </p>
                              </div>
                              <p className="text-text-muted text-xs">
                                {s.email}
                              </p>
                            </div>
                            <span
                              className={`text-xl font-heading font-bold ${isTop3 ? "text-accent-gold" : "text-text-primary"}`}
                            >
                              {s.score}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-2 text-xs">
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-lavender-light/50 text-lavender font-medium">
                              <Sparkles className="w-3 h-3" />
                              {s.archetype}
                            </span>
                            <span className="text-text-muted">
                              {formatDate(s.date)}
                            </span>
                            {s.discountCode && (
                              <span className="font-mono text-text-muted">
                                {s.discountCode}
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </motion.div>
          )}

          {/* ── MESSAGES TAB ──────────────────────────────────────── */}
          {activeTab === "messages" && (
            <motion.div
              key="messages"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              {messages.length === 0 ? (
                <EmptyState icon={Mail} message="No messages yet" />
              ) : (
                <div className="space-y-3">
                  {messages.map((m, i) => (
                    <div
                      key={i}
                      className={`bg-warm-white rounded-xl border shadow-sm overflow-hidden transition-all duration-200 ${m.read ? "border-border/30 opacity-75" : "border-primary/30"}`}
                    >
                      <div className="p-4 sm:p-5">
                        {/* Header row */}
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <p className="font-medium text-text-primary">
                                {m.name}
                              </p>
                              {!m.read && (
                                <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
                              )}
                            </div>
                            <p className="text-text-muted text-xs truncate">
                              {m.email}
                            </p>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <span className="text-text-muted text-xs">
                              {formatDate(m.date)}
                            </span>
                            <button
                              onClick={() => toggleReadStatus(i)}
                              className="p-1.5 rounded-lg hover:bg-cream/80 text-text-muted hover:text-text-secondary transition-colors cursor-pointer"
                              title={m.read ? "Mark as unread" : "Mark as read"}
                            >
                              {m.read ? (
                                <EyeOff className="w-4 h-4" />
                              ) : (
                                <Eye className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                        </div>
                        {/* Subject */}
                        <p className="font-medium text-text-primary text-sm mb-1.5">
                          {m.subject}
                        </p>
                        {/* Body */}
                        <p className="text-text-secondary text-sm leading-relaxed whitespace-pre-wrap">
                          {m.message}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ── Empty State ──────────────────────────────────────────────────────────

function EmptyState({
  icon: Icon,
  message,
}: {
  icon: React.ElementType;
  message: string;
}) {
  return (
    <div className="bg-warm-white rounded-xl border border-border/50 p-12 sm:p-16 flex flex-col items-center justify-center text-center shadow-sm">
      <div className="w-14 h-14 rounded-full bg-cream flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-text-muted" />
      </div>
      <p className="text-text-muted text-sm">{message}</p>
    </div>
  );
}
