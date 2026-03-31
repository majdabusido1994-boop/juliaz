"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Minus } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */
const trainings = [
  {
    category: "Yoga Certifications",
    items: [
      "Authentic Flow 200h Yoga Teacher Training",
      "Authentic Flow 300h Advanced Teacher Training",
      "E-RYT 500 — Experienced Registered Yoga Teacher (Yoga Alliance)",
    ],
  },
  {
    category: "Somatic & Movement",
    items: [
      "Body-Mind Centering",
      "Embodied Yin Yoga",
      "Shake the Dust — Trauma-Release Practices",
      "Sound-Based Practices",
    ],
  },
  {
    category: "Energy & Bodywork",
    items: [
      "Reiki Master / Teacher Certification (Full Lineage)",
      "Therapeutic Massage & Bodywork Techniques",
    ],
  },
  {
    category: "Academic",
    items: [
      "Master\u2019s Degree in Social Services",
      "Specialization in Humanitarian & Refugee Support",
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Fade-up animation variant                                          */
/* ------------------------------------------------------------------ */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay, ease: "easeOut" as const },
  }),
};

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */
export default function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <>
      {/* ============================================================ */}
      {/*  HERO — Full-width cinematic photo                            */}
      {/* ============================================================ */}
      <section
        ref={heroRef}
        className="relative flex min-h-screen items-center justify-center overflow-hidden"
      >
        {/* Parallax background image */}
        <motion.div className="absolute inset-0" style={{ y: heroY }}>
          <Image
            src="/img/about.jpg"
            alt="Julia meditating in a warm wooden room"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          {/* Dark gradient overlay */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(45,42,38,0.35) 0%, rgba(45,42,38,0.55) 50%, rgba(45,42,38,0.75) 100%)",
            }}
          />
        </motion.div>

        {/* Hero text */}
        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 mx-auto max-w-4xl px-6 text-center"
        >
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mx-auto mb-8 h-px w-20 bg-primary-light/70"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mb-5 font-body text-xs font-medium uppercase tracking-[0.3em] text-primary-light"
          >
            About Julia
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="font-heading text-5xl font-light italic leading-[1.15] tracking-wide text-white sm:text-6xl md:text-7xl lg:text-8xl"
          >
            When you move,
            <br />
            everything moves
          </motion.h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mx-auto mt-8 h-px w-20 bg-primary-light/70"
          />
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="h-10 w-6 rounded-full border border-white/30 p-1"
          >
            <div className="mx-auto h-2 w-0.5 rounded-full bg-white/60" />
          </motion.div>
        </motion.div>
      </section>

      {/* ============================================================ */}
      {/*  INTRO — Photo + Text side by side                            */}
      {/* ============================================================ */}
      <section className="overflow-hidden py-24 md:py-36">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
            {/* Left: Portrait */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUp}
              custom={0}
              className="relative"
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl">
                <Image
                  src="/img/julia-portrait-3.jpg"
                  alt="Julia on the beach with a serene smile"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              {/* Decorative accent */}
              <div className="absolute -bottom-6 -right-6 -z-10 h-full w-full rounded-2xl border border-primary-light/40" />
            </motion.div>

            {/* Right: Bio text */}
            <div>
              <motion.p
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeUp}
                custom={0}
                className="mb-3 font-body text-xs font-medium uppercase tracking-[0.25em] text-primary-dark"
              >
                Meet Julia
              </motion.p>
              <motion.h2
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeUp}
                custom={0.1}
                className="font-heading text-4xl font-light italic leading-tight text-text-primary sm:text-5xl"
              >
                Movement, Presence
                <br />
                &amp; Energy
              </motion.h2>
              <motion.div
                initial={{ scaleX: 0, originX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-5 h-px w-16 bg-primary"
              />

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeUp}
                custom={0.2}
                className="mt-8 space-y-5 font-body text-base leading-[1.8] text-text-secondary sm:text-[17px]"
              >
                <p>
                  I am Julia Josefiina Taivalm&auml;ki&mdash;an E-RYT 500 yoga
                  teacher, somatic movement facilitator, and Reiki Master. My
                  path has been shaped by a deep curiosity about the
                  body&rsquo;s intelligence and its capacity to heal, integrate,
                  and transform.
                </p>
                <p>
                  With a Master&rsquo;s degree in Social Services and years
                  spent in humanitarian and refugee support, I bring a
                  trauma-informed, nervous-system-aware perspective to everything
                  I offer. I have witnessed firsthand how the body carries our
                  stories&mdash;and how, with the right support, it can also
                  release them.
                </p>
                <p>
                  Over 800+ hours of movement and yoga studies, I have developed
                  a practice rooted in listening. Listening to the body, to the
                  breath, to the subtle layers of experience that often go
                  unnoticed.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  PHILOSOPHY — Full-width cinematic section                     */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden py-32 md:py-44">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/img/contact.jpg"
            alt="Julia meditating from above, mandala tattoo visible"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(45,42,38,0.7) 0%, rgba(45,42,38,0.82) 100%)",
            }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-5xl px-6 lg:px-8">
          {/* Main quote */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            custom={0}
            className="text-center"
          >
            <p className="mb-6 font-body text-xs font-medium uppercase tracking-[0.3em] text-primary-light/80">
              My Philosophy
            </p>
            <blockquote className="font-heading text-3xl font-light italic leading-snug text-white sm:text-4xl md:text-5xl lg:text-[3.5rem] lg:leading-[1.2]">
              &ldquo;The body is not something that needs fixing&mdash;it is
              something to meet, listen to, and work with.&rdquo;
            </blockquote>
            <div className="mx-auto mt-8 h-px w-16 bg-primary-light/50" />
          </motion.div>

          {/* Three pillars */}
          <div className="mt-20 grid gap-16 md:mt-24 md:grid-cols-3 md:gap-12">
            {[
              {
                title: "Safety",
                text: "Creating a container where your nervous system can soften and your body can begin to trust the process.",
              },
              {
                title: "Awareness",
                text: "Cultivating a gentle, non-judgmental attention to what is present in the body, breath, and mind.",
              },
              {
                title: "Curiosity",
                text: "Approaching your experience with openness rather than fixing\u2014meeting yourself exactly where you are.",
              },
            ].map((pillar, i) => (
              <motion.div
                key={pillar.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                variants={fadeUp}
                custom={0.1 + i * 0.12}
                className="text-center"
              >
                <h3 className="font-heading text-2xl font-light italic tracking-wide text-primary-light sm:text-3xl">
                  {pillar.title}
                </h3>
                <div className="mx-auto mt-4 h-px w-8 bg-primary-light/30" />
                <p className="mt-5 font-body text-sm leading-relaxed text-white/70 sm:text-base">
                  {pillar.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  BACKGROUND — Full-width editorial band                       */}
      {/* ============================================================ */}
      <section className="overflow-hidden py-24 md:py-36">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
            {/* Text */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="order-2 lg:order-1"
            >
              <motion.p
                variants={fadeUp}
                custom={0}
                className="mb-3 font-body text-xs font-medium uppercase tracking-[0.25em] text-primary-dark"
              >
                Background
              </motion.p>
              <motion.h2
                variants={fadeUp}
                custom={0.1}
                className="font-heading text-4xl font-light italic leading-tight text-text-primary sm:text-5xl"
              >
                The Body-Mind-Heart
                <br />
                Connection
              </motion.h2>
              <motion.div
                initial={{ scaleX: 0, originX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-5 h-px w-16 bg-primary"
              />
              <motion.div
                variants={fadeUp}
                custom={0.2}
                className="mt-8 space-y-5 font-body text-base leading-[1.8] text-text-secondary sm:text-[17px]"
              >
                <p>
                  My work lives at the intersection of movement, presence, and
                  energy. Whether through a flowing yoga class, the stillness of
                  a Reiki session, or the depth of a private somatic
                  session&mdash;my intention remains the same: to support you in
                  reconnecting with the intelligence of your own body.
                </p>
                <p>
                  I offer a space that is both held and spacious. A place where
                  you can explore your edges without being pushed past them.
                  Where your nervous system can regulate, your breath can deepen,
                  and your awareness can expand.
                </p>
                <p>
                  Every offering I create is an invitation to come home to
                  yourself&mdash;to the body you live in, the heart you feel
                  with, and the presence that is always available when you slow
                  down enough to notice.
                </p>
              </motion.div>
            </motion.div>

            {/* Photo */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUp}
              custom={0.1}
              className="relative order-1 lg:order-2"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl">
                <Image
                  src="/img/social-collab.jpg"
                  alt="Julia teaching a group yoga class"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 -z-10 h-full w-full rounded-2xl border border-sage-light/60" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  TRAINING & CERTIFICATIONS                                    */}
      {/* ============================================================ */}
      <section className="bg-cream py-24 md:py-36">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
            {/* Left: Training list */}
            <div>
              <motion.p
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={fadeUp}
                custom={0}
                className="mb-3 font-body text-xs font-medium uppercase tracking-[0.25em] text-primary-dark"
              >
                800+ Hours of Study
              </motion.p>
              <motion.h2
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={fadeUp}
                custom={0.1}
                className="font-heading text-4xl font-light italic leading-tight text-text-primary sm:text-5xl"
              >
                Training &amp;
                <br />
                Certifications
              </motion.h2>
              <motion.div
                initial={{ scaleX: 0, originX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-5 h-px w-16 bg-primary"
              />

              <div className="mt-12 space-y-10">
                {trainings.map((group, gi) => (
                  <motion.div
                    key={group.category}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-60px" }}
                    variants={fadeUp}
                    custom={0.1 + gi * 0.08}
                  >
                    <h3 className="mb-4 font-heading text-xl font-medium italic text-text-primary sm:text-2xl">
                      {group.category}
                    </h3>
                    <ul className="space-y-3">
                      {group.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-3 font-body text-sm leading-relaxed text-text-secondary sm:text-[15px]"
                        >
                          <Minus
                            className="mt-1 h-4 w-4 shrink-0 text-primary/60"
                            strokeWidth={1.5}
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right: Two stacked photos */}
            <div className="flex flex-col gap-6">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={fadeUp}
                custom={0.1}
                className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl"
              >
                <Image
                  src="/img/reiki-massage.jpg"
                  alt="Julia giving a Reiki healing session"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </motion.div>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={fadeUp}
                custom={0.2}
                className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl"
              >
                <Image
                  src="/img/movement.jpg"
                  alt="Julia in an expressive movement pose"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  CTA — Book a Session                                         */}
      {/* ============================================================ */}
      <section className="py-28 md:py-40">
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.p
              variants={fadeUp}
              custom={0}
              className="mb-3 font-body text-xs font-medium uppercase tracking-[0.25em] text-primary-dark"
            >
              Work With Me
            </motion.p>
            <motion.h2
              variants={fadeUp}
              custom={0.1}
              className="font-heading text-4xl font-light italic leading-tight text-text-primary sm:text-5xl md:text-6xl"
            >
              Ready to Begin
              <br />
              Your Journey?
            </motion.h2>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mx-auto mt-5 h-px w-16 bg-primary"
            />
            <motion.p
              variants={fadeUp}
              custom={0.2}
              className="mx-auto mt-8 max-w-xl font-body text-base leading-relaxed text-text-secondary sm:text-[17px]"
            >
              Whether you are new to movement practices or deepening an existing
              journey, I would love to support you. Let&rsquo;s find the right
              offering for where you are.
            </motion.p>
            <motion.div
              variants={fadeUp}
              custom={0.3}
              className="mt-12 flex flex-col justify-center gap-4 sm:flex-row"
            >
              <Link
                href="/services"
                className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border border-primary bg-transparent px-9 py-4 font-body text-sm font-medium tracking-wide text-primary-dark transition-all duration-200 hover:bg-primary hover:text-white"
              >
                View Offerings
              </Link>
              <Link
                href="/book"
                className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-primary px-9 py-4 font-body text-sm font-medium tracking-wide text-white transition-all duration-200 hover:bg-primary-dark hover:shadow-lg"
              >
                Book a Session
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
