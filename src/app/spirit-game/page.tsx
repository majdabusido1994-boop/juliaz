"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Sun,
  Moon,
  Star,
  Heart,
  ArrowRight,
  RotateCcw,
  Share2,
  Trophy,
  Crown,
  User,
  Mail,
  Phone,
  CheckCircle,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface Question {
  id: number;
  question: string;
  icon: React.ReactNode;
  options: { text: string; points: number }[];
}

interface GameEntry {
  name: string;
  email: string;
  phone: string;
  score: number;
  archetype: string;
  date: string;
  discountCode: string | null;
}

type Screen = "welcome" | "register" | "game" | "results";

/* ------------------------------------------------------------------ */
/*  Questions                                                          */
/* ------------------------------------------------------------------ */

const questions: Question[] = [
  {
    id: 1,
    question: "What element do you feel most connected to?",
    icon: <Sparkles className="w-6 h-6" />,
    options: [
      { text: "Earth — grounded, steady, nurturing", points: 2 },
      { text: "Water — flowing, intuitive, adaptable", points: 3 },
      { text: "Fire — passionate, transformative, bold", points: 4 },
      { text: "Air — free, expansive, visionary", points: 1 },
    ],
  },
  {
    id: 2,
    question: "How do you prefer to start your morning?",
    icon: <Sun className="w-6 h-6" />,
    options: [
      { text: "Meditation — in stillness and silence", points: 4 },
      { text: "Exercise — moving energy through the body", points: 3 },
      { text: "Nature walk — feeling the earth beneath my feet", points: 2 },
      { text: "Journaling — pouring thoughts onto paper", points: 1 },
    ],
  },
  {
    id: 3,
    question: "Which healing practice calls to you most?",
    icon: <Heart className="w-6 h-6" />,
    options: [
      { text: "Reiki — channeling universal energy", points: 4 },
      { text: "Sound healing — vibrations that shift reality", points: 3 },
      { text: "Crystal therapy — ancient earth wisdom", points: 2 },
      { text: "Breathwork — the power of life force", points: 1 },
    ],
  },
  {
    id: 4,
    question: "What does your ideal retreat look like?",
    icon: <Moon className="w-6 h-6" />,
    options: [
      { text: "Mountain solitude — above the clouds", points: 3 },
      { text: "Beach yoga — waves as your soundtrack", points: 2 },
      { text: "Forest bathing — embraced by ancient trees", points: 4 },
      { text: "Desert stargazing — infinite sky, infinite soul", points: 1 },
    ],
  },
  {
    id: 5,
    question: "Which chakra do you feel needs the most attention?",
    icon: <Sparkles className="w-6 h-6" />,
    options: [
      { text: "Root — stability and grounding", points: 1 },
      { text: "Heart — love and compassion", points: 3 },
      { text: "Third Eye — intuition and insight", points: 4 },
      { text: "Crown — divine connection", points: 2 },
    ],
  },
  {
    id: 6,
    question: "How do you recharge your energy?",
    icon: <Star className="w-6 h-6" />,
    options: [
      { text: "Alone time — solitude restores me", points: 2 },
      { text: "With loved ones — shared warmth heals", points: 3 },
      { text: "In nature — the earth is my sanctuary", points: 4 },
      { text: "Through movement — dance, yoga, flow", points: 1 },
    ],
  },
  {
    id: 7,
    question: "What mantra resonates with you?",
    icon: <Heart className="w-6 h-6" />,
    options: [
      { text: "I am enough — whole and complete", points: 2 },
      { text: "I am free — boundless and uncontained", points: 1 },
      { text: "I am love — radiating warmth to all", points: 3 },
      { text: "I am light — illuminating the path", points: 4 },
    ],
  },
  {
    id: 8,
    question: "Your spirit animal is calling — which one?",
    icon: <Moon className="w-6 h-6" />,
    options: [
      { text: "Wolf — deep intuition and loyalty", points: 3 },
      { text: "Butterfly — transformation and rebirth", points: 2 },
      { text: "Eagle — soaring vision and clarity", points: 4 },
      { text: "Dolphin — playful joy and connection", points: 1 },
    ],
  },
  {
    id: 9,
    question: "What season feels most like your soul?",
    icon: <Sun className="w-6 h-6" />,
    options: [
      { text: "Spring — renewal and fresh beginnings", points: 2 },
      { text: "Summer — radiant passion and fullness", points: 3 },
      { text: "Autumn — deep wisdom and letting go", points: 4 },
      { text: "Winter — stillness and inner reflection", points: 1 },
    ],
  },
  {
    id: 10,
    question: "What gift would you offer the world?",
    icon: <Star className="w-6 h-6" />,
    options: [
      { text: "Healing — mending what is broken", points: 4 },
      { text: "Creativity — painting new possibilities", points: 2 },
      { text: "Wisdom — guiding with gentle truth", points: 3 },
      { text: "Compassion — holding space for all", points: 1 },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Archetype helpers                                                  */
/* ------------------------------------------------------------------ */

function getArchetype(score: number) {
  if (score >= 35)
    return {
      name: "The Luminous Guide",
      description:
        "You radiate pure light and healing energy. Your soul has traveled far and gathered wisdom from countless lifetimes. Others are naturally drawn to your presence, finding comfort and clarity in your warm, steady glow. You are a beacon for those navigating their own spiritual journey.",
      color: "from-accent-gold via-primary to-accent",
    };
  if (score >= 27)
    return {
      name: "The Radiant Healer",
      description:
        "You carry a deep well of inner wisdom that flows through everything you touch. Your hands hold the gift of transformation, and your heart knows the ancient language of healing. The universe has been quietly preparing you for a role of great tenderness and power.",
      color: "from-lavender via-primary-light to-sage",
    };
  if (score >= 19)
    return {
      name: "The Awakening Soul",
      description:
        "Your awareness is blossoming like a lotus rising through still water. You are in the most beautiful phase of becoming — where every experience carries a lesson and every breath draws you closer to your truest self. Trust the unfolding; your light grows stronger each day.",
      color: "from-sage via-sage-light to-primary-light",
    };
  return {
    name: "The Gentle Seeker",
    description:
      "You are at the beginning of a beautiful journey, and there is such magic in that. Your curiosity is the compass that will guide you through unexplored territories of the spirit. Every question you ask opens a door, and behind each door is a piece of your own infinite light.",
    color: "from-primary-light via-cream to-lavender-light",
  };
}

/* ------------------------------------------------------------------ */
/*  Gradient backgrounds per question                                  */
/* ------------------------------------------------------------------ */

const questionGradients = [
  "from-cream via-warm-white to-lavender-light",
  "from-lavender-light via-warm-white to-sage-light",
  "from-sage-light via-warm-white to-cream",
  "from-cream via-primary-light/30 to-warm-white",
  "from-lavender-light via-cream to-primary-light/30",
  "from-sage-light via-cream to-lavender-light",
  "from-primary-light/30 via-warm-white to-sage-light",
  "from-cream via-lavender-light to-warm-white",
  "from-sage-light via-warm-white to-cream",
  "from-lavender-light via-cream to-sage-light",
];

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

export default function SpiritGamePage() {
  const [screen, setScreen] = useState<Screen>("welcome");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [leaderboard, setLeaderboard] = useState<GameEntry[]>([]);
  const [discountCode, setDiscountCode] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  /* Load leaderboard from localStorage */
  useEffect(() => {
    try {
      const saved = localStorage.getItem("spiritGameScores");
      if (saved) setLeaderboard(JSON.parse(saved));
    } catch {
      /* ignore */
    }
  }, []);

  /* ---- Registration validation ---- */
  const validateForm = useCallback(() => {
    const errors: Record<string, string> = {};
    if (!name.trim()) errors.name = "Please enter your name";
    if (!email.trim()) errors.email = "Please enter your email";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      errors.email = "Please enter a valid email";
    if (!phone.trim()) errors.phone = "Please enter your phone number";
    else if (!/^[+]?[\d\s()-]{7,}$/.test(phone))
      errors.phone = "Please enter a valid phone number";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }, [name, email, phone]);

  /* ---- Handlers ---- */
  const handleStartGame = () => setScreen("register");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) setScreen("game");
  };

  const handleAnswer = (points: number, optionIdx: number) => {
    setSelectedOption(optionIdx);

    setTimeout(() => {
      const newScore = score + points;
      const newAnswers = [...answers, points];
      setScore(newScore);
      setAnswers(newAnswers);
      setSelectedOption(null);

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion((q) => q + 1);
      } else {
        /* Finished — compute results */
        const archetype = getArchetype(newScore);
        const code =
          newScore >= 27
            ? `LIGHT-${name.trim().slice(0, 3).toUpperCase()}-${newScore}`
            : null;
        setDiscountCode(code);

        const entry: GameEntry = {
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          score: newScore,
          archetype: archetype.name,
          date: new Date().toISOString(),
          discountCode: code,
        };

        const updated = [...leaderboard, entry].sort(
          (a, b) => b.score - a.score
        );
        setLeaderboard(updated);
        try {
          localStorage.setItem("spiritGameScores", JSON.stringify(updated));
        } catch {
          /* ignore */
        }

        /* Check if in top 3 for discount */
        const rank = updated.findIndex(
          (e) => e.date === entry.date && e.email === entry.email
        );
        if (rank < 3 && !code) {
          const topCode = `LIGHT-${name.trim().slice(0, 3).toUpperCase()}-${newScore}`;
          setDiscountCode(topCode);
          entry.discountCode = topCode;
          const updated2 = [...leaderboard, entry].sort(
            (a, b) => b.score - a.score
          );
          setLeaderboard(updated2);
          try {
            localStorage.setItem("spiritGameScores", JSON.stringify(updated2));
          } catch {
            /* ignore */
          }
        }

        setScreen("results");
      }
    }, 600);
  };

  const handlePlayAgain = () => {
    setCurrentQuestion(0);
    setScore(0);
    setAnswers([]);
    setSelectedOption(null);
    setDiscountCode(null);
    setScreen("welcome");
  };

  const handleShare = async () => {
    const archetype = getArchetype(score);
    const text = `I just discovered I'm "${archetype.name}" with a score of ${score}/40 in the Discover Your Inner Light spiritual quiz! Take the quiz and find your archetype.`;
    if (navigator.share) {
      try {
        await navigator.share({ title: "Discover Your Inner Light", text });
      } catch {
        /* cancelled */
      }
    } else {
      await navigator.clipboard.writeText(text);
      alert("Result copied to clipboard!");
    }
  };

  /* ---- Derived values ---- */
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const archetype = getArchetype(score);
  const isInTopThree =
    screen === "results" &&
    leaderboard.findIndex(
      (e) => e.email === email.trim() && e.score === score
    ) < 3;

  /* ================================================================ */
  /*  RENDER                                                           */
  /* ================================================================ */

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-cream via-warm-white to-cream">
      {/* ---- CSS-only star particles ---- */}
      <div className="pointer-events-none fixed inset-0 z-0" aria-hidden>
        {Array.from({ length: 30 }).map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full opacity-40"
            style={{
              width: `${2 + (i % 4)}px`,
              height: `${2 + (i % 4)}px`,
              background:
                i % 3 === 0
                  ? "var(--primary)"
                  : i % 3 === 1
                    ? "var(--lavender)"
                    : "var(--accent-gold)",
              top: `${(i * 37) % 100}%`,
              left: `${(i * 53) % 100}%`,
              animation: `float ${4 + (i % 5)}s ease-in-out ${(i % 7) * 0.5}s infinite`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-16 sm:py-20">
        <AnimatePresence mode="wait">
          {/* ============================================ */}
          {/*  WELCOME SCREEN                              */}
          {/* ============================================ */}
          {screen === "welcome" && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-lg text-center"
            >
              <div className="rounded-3xl border border-border bg-white/70 px-8 py-12 shadow-xl backdrop-blur-md sm:px-12">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary-light to-lavender-light"
                >
                  <Sparkles className="h-10 w-10 text-primary-dark" />
                </motion.div>

                <h1 className="font-heading text-4xl font-semibold text-text-primary sm:text-5xl">
                  Discover Your Inner Light
                </h1>

                <p className="mt-4 font-body text-base leading-relaxed text-text-secondary">
                  Embark on a journey of 10 soulful questions to uncover your
                  spiritual archetype. Each answer reveals a facet of your inner
                  world, guiding you closer to the light you already carry within.
                </p>

                <div className="mt-8 space-y-3 rounded-2xl bg-cream/60 px-6 py-5 text-left text-sm text-text-secondary">
                  <p className="flex items-start gap-2">
                    <Star className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent-gold" />
                    <span>10 beautifully crafted spiritual questions</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <Star className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent-gold" />
                    <span>Discover your unique spiritual archetype</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <Trophy className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent-gold" />
                    <span>
                      Top scorer gets{" "}
                      <strong className="text-primary-dark">
                        20% discount
                      </strong>{" "}
                      on their first session
                    </span>
                  </p>
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleStartGame}
                  className="mt-8 inline-flex cursor-pointer items-center gap-2 rounded-full bg-gradient-to-r from-primary to-primary-dark px-8 py-3.5 font-body text-sm font-semibold tracking-wide text-white shadow-lg transition-shadow hover:shadow-xl"
                >
                  Begin Your Journey
                  <ArrowRight className="h-4 w-4" />
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* ============================================ */}
          {/*  REGISTRATION SCREEN                         */}
          {/* ============================================ */}
          {screen === "register" && (
            <motion.div
              key="register"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-md"
            >
              <form
                onSubmit={handleRegister}
                className="rounded-3xl border border-border bg-white/70 px-8 py-10 shadow-xl backdrop-blur-md sm:px-10"
              >
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-sage-light to-lavender-light">
                  <User className="h-7 w-7 text-secondary" />
                </div>

                <h2 className="text-center font-heading text-3xl font-semibold text-text-primary">
                  Before We Begin
                </h2>
                <p className="mt-2 text-center text-sm text-text-muted">
                  Tell us a little about yourself so we can personalize your
                  experience.
                </p>

                {/* Name */}
                <label className="mt-8 block">
                  <span className="mb-1.5 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-text-secondary">
                    <User className="h-3.5 w-3.5" /> Full Name
                  </span>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your full name"
                    className="w-full rounded-xl border border-border bg-warm-white px-4 py-3 text-sm text-text-primary outline-none transition-colors placeholder:text-text-muted/60 focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                  {formErrors.name && (
                    <span className="mt-1 block text-xs text-red-500">
                      {formErrors.name}
                    </span>
                  )}
                </label>

                {/* Email */}
                <label className="mt-5 block">
                  <span className="mb-1.5 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-text-secondary">
                    <Mail className="h-3.5 w-3.5" /> Email
                  </span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full rounded-xl border border-border bg-warm-white px-4 py-3 text-sm text-text-primary outline-none transition-colors placeholder:text-text-muted/60 focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                  {formErrors.email && (
                    <span className="mt-1 block text-xs text-red-500">
                      {formErrors.email}
                    </span>
                  )}
                </label>

                {/* Phone */}
                <label className="mt-5 block">
                  <span className="mb-1.5 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-text-secondary">
                    <Phone className="h-3.5 w-3.5" /> Phone Number
                  </span>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+358 XX XXX XXXX"
                    className="w-full rounded-xl border border-border bg-warm-white px-4 py-3 text-sm text-text-primary outline-none transition-colors placeholder:text-text-muted/60 focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                  {formErrors.phone && (
                    <span className="mt-1 block text-xs text-red-500">
                      {formErrors.phone}
                    </span>
                  )}
                </label>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="mt-8 flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary to-primary-dark px-6 py-3.5 font-body text-sm font-semibold tracking-wide text-white shadow-lg transition-shadow hover:shadow-xl"
                >
                  Continue
                  <ArrowRight className="h-4 w-4" />
                </motion.button>
              </form>
            </motion.div>
          )}

          {/* ============================================ */}
          {/*  GAME SCREEN                                 */}
          {/* ============================================ */}
          {screen === "game" && (
            <motion.div
              key={`game-${currentQuestion}`}
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -80 }}
              transition={{ duration: 0.45, ease: "easeInOut" }}
              className="w-full max-w-xl"
            >
              {/* Progress bar */}
              <div className="mb-6">
                <div className="flex items-center justify-between text-xs font-medium text-text-muted">
                  <span>
                    Question {currentQuestion + 1} of {questions.length}
                  </span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-border/60">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-primary to-accent-gold"
                    initial={false}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                </div>
              </div>

              {/* Question card */}
              <div
                className={`rounded-3xl border border-border bg-gradient-to-br ${questionGradients[currentQuestion]} p-8 shadow-xl backdrop-blur-md sm:p-10`}
              >
                <div className="mb-6 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-primary-dark shadow-sm">
                    {questions[currentQuestion].icon}
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-widest text-text-muted">
                    Question {currentQuestion + 1}
                  </span>
                </div>

                <h2 className="font-heading text-2xl font-semibold leading-snug text-text-primary sm:text-3xl">
                  {questions[currentQuestion].question}
                </h2>

                <div className="mt-8 space-y-3">
                  {questions[currentQuestion].options.map((opt, idx) => (
                    <motion.button
                      key={idx}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleAnswer(opt.points, idx)}
                      disabled={selectedOption !== null}
                      className={`flex w-full cursor-pointer items-center gap-3 rounded-2xl border px-5 py-4 text-left text-sm font-medium transition-all sm:text-base ${
                        selectedOption === idx
                          ? "border-primary bg-primary/10 text-primary-dark shadow-md"
                          : "border-border/80 bg-white/60 text-text-primary hover:border-primary/40 hover:bg-white/90 hover:shadow-sm"
                      }`}
                    >
                      <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary-light/50 text-xs font-bold text-primary-dark">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{opt.text}</span>
                      {selectedOption === idx && (
                        <CheckCircle className="ml-auto h-5 w-5 flex-shrink-0 text-primary-dark" />
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* ============================================ */}
          {/*  RESULTS SCREEN                              */}
          {/* ============================================ */}
          {screen === "results" && (
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="w-full max-w-lg"
            >
              {/* Archetype card */}
              <div className="overflow-hidden rounded-3xl border border-border bg-white/70 shadow-2xl backdrop-blur-md">
                {/* Top gradient band */}
                <div
                  className={`relative flex flex-col items-center bg-gradient-to-r ${archetype.color} px-8 py-10`}
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 15,
                      delay: 0.3,
                    }}
                    className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-white/30 shadow-lg"
                  >
                    <Crown className="h-10 w-10 text-white drop-shadow" />
                  </motion.div>

                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="font-heading text-3xl font-bold text-white drop-shadow sm:text-4xl"
                  >
                    {archetype.name}
                  </motion.h2>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="mt-2 text-sm font-semibold text-white/90"
                  >
                    {score} / 40 points
                  </motion.p>
                </div>

                {/* Description */}
                <div className="px-8 py-8 sm:px-10">
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="text-center font-body text-base leading-relaxed text-text-secondary"
                  >
                    {archetype.description}
                  </motion.p>

                  {/* Discount */}
                  {(discountCode || isInTopThree) && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1 }}
                      className="mt-6 rounded-2xl border border-accent-gold/30 bg-gradient-to-r from-cream to-primary-light/30 px-6 py-5 text-center"
                    >
                      <Trophy className="mx-auto mb-2 h-6 w-6 text-accent-gold" />
                      <p className="text-sm font-semibold text-text-primary">
                        Congratulations! You&apos;ve earned a{" "}
                        <span className="text-primary-dark">20% discount</span>{" "}
                        on your first session!
                      </p>
                      <p className="mt-3 inline-block rounded-full bg-white px-6 py-2.5 font-mono text-sm font-bold tracking-wider text-primary-dark shadow-sm">
                        {discountCode}
                      </p>
                    </motion.div>
                  )}

                  {/* CTA Buttons */}
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                    {(discountCode || isInTopThree) && (
                      <motion.a
                        href="/book"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary to-primary-dark px-6 py-3 text-sm font-semibold text-white shadow-lg transition-shadow hover:shadow-xl"
                      >
                        Book Now with Discount
                        <ArrowRight className="h-4 w-4" />
                      </motion.a>
                    )}

                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={handlePlayAgain}
                      className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border border-border bg-white px-6 py-3 text-sm font-semibold text-text-primary shadow-sm transition-colors hover:bg-cream"
                    >
                      <RotateCcw className="h-4 w-4" />
                      Play Again
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={handleShare}
                      className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border border-border bg-white px-6 py-3 text-sm font-semibold text-text-primary shadow-sm transition-colors hover:bg-cream"
                    >
                      <Share2 className="h-4 w-4" />
                      Share Results
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* Leaderboard */}
              {leaderboard.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 }}
                  className="mt-8 rounded-3xl border border-border bg-white/70 px-8 py-8 shadow-xl backdrop-blur-md"
                >
                  <h3 className="mb-5 flex items-center gap-2 font-heading text-xl font-semibold text-text-primary">
                    <Trophy className="h-5 w-5 text-accent-gold" />
                    Leaderboard
                  </h3>

                  <div className="space-y-3">
                    {leaderboard.slice(0, 5).map((entry, idx) => (
                      <div
                        key={`${entry.email}-${entry.date}`}
                        className={`flex items-center gap-4 rounded-xl border px-4 py-3 ${
                          idx === 0
                            ? "border-accent-gold/30 bg-gradient-to-r from-cream to-primary-light/20"
                            : "border-border/60 bg-warm-white/50"
                        }`}
                      >
                        <span
                          className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                            idx === 0
                              ? "bg-accent-gold text-white"
                              : idx === 1
                                ? "bg-text-muted/30 text-text-secondary"
                                : idx === 2
                                  ? "bg-primary-light text-primary-dark"
                                  : "bg-border/40 text-text-muted"
                          }`}
                        >
                          {idx + 1}
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold text-text-primary">
                            {entry.name}
                          </p>
                          <p className="text-xs text-text-muted">
                            {entry.archetype}
                          </p>
                        </div>
                        <span className="text-sm font-bold text-primary-dark">
                          {entry.score}/40
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
