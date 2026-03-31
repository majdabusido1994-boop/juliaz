"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { ArrowRight, Mail, Star, Sparkles, ChevronDown } from "lucide-react";
import { useState, useRef } from "react";

/* ------------------------------------------------------------------ */
/*  Animation variants                                                 */
/* ------------------------------------------------------------------ */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay, ease: "easeOut" },
  }),
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: (delay: number) => ({
    opacity: 1,
    transition: { duration: 1, delay, ease: "easeOut" },
  }),
};

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */
const offerings = [
  {
    title: "Intuitive Massage & Reiki",
    description:
      "A healing blend of intuitive bodywork and Reiki energy channeling. Each session flows to where your body needs it most — releasing tension and restoring balance.",
    image: "/img/reiki-massage.jpg",
    href: "/services",
  },
  {
    title: "Reiki",
    description:
      "A gentle yet profound energy healing practice rooted in ancient Japanese tradition. Promoting balance and harmony on physical, emotional, mental, and spiritual levels.",
    image: "/img/studio-2.jpg",
    href: "/services",
  },
  {
    title: "Classes & Events",
    description:
      "Embodied Yin, Shake the Dust, and monthly community events. Trauma-informed movement classes to support nervous system regulation and body awareness.",
    image: "/img/shake-the-dust.jpg",
    href: "/services",
  },
];

const testimonials = [
  {
    quote:
      "Julia creates the most nurturing and safe space. After just one session I felt a shift in my body that I had been searching for through years of therapy. Her presence is truly healing.",
    name: "Anna K.",
    role: "Private Session Client",
  },
  {
    quote:
      "The weekly classes have become my anchor. Julia's trauma-informed approach helped me reconnect with my body in ways I never thought possible. I feel more grounded and alive.",
    name: "Maria S.",
    role: "Movement Class Participant",
  },
  {
    quote:
      "The retreat was transformative. The combination of movement, Reiki, and Julia's gentle guidance allowed me to release layers of tension I didn't know I was holding. Life-changing.",
    name: "Elina P.",
    role: "Retreat Participant",
  },
];

const galleryImages = [
  { src: "/img/session-1.jpg", alt: "Julia in nature, powerful pose" },
  { src: "/img/julia-portrait-3.jpg", alt: "Julia on beach, serene" },
  { src: "/img/classes.jpg", alt: "Meditation class" },
  { src: "/img/movement.jpg", alt: "Expressive movement in nature" },
  { src: "/img/social-collab.jpg", alt: "Julia teaching group" },
  { src: "/img/contact.jpg", alt: "Julia meditating, aerial view" },
];

const instagramPreviews = [
  "/img/julia-portrait-5.jpg",
  "/img/lifestyle-1.jpg",
  "/img/studio-1.jpg",
  "/img/nature-1.jpg",
  "/img/session-2.jpg",
  "/img/lifestyle-3.jpg",
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */
export default function HomePage() {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSent, setNewsletterSent] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsletterSent(true);
      setNewsletterEmail("");
    }
  };

  return (
    <>
      {/* ============================================================ */}
      {/*  HERO — Full-screen video background                         */}
      {/* ============================================================ */}
      <section
        ref={heroRef}
        className="relative flex min-h-screen items-center justify-center overflow-hidden"
      >
        {/* Video background */}
        <motion.div style={{ scale: heroScale }} className="absolute inset-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full object-cover hero-video-blur"
          >
            <source src="/vid/hero.mp4" type="video/mp4" />
          </video>
        </motion.div>

        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-transparent" />
        <div className="absolute inset-0 bg-black/20" />

        {/* Content */}
        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 mx-auto max-w-5xl px-6 text-center"
        >
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.2}
            className="mb-6 font-body text-xs font-medium uppercase tracking-[0.3em] text-white/70 sm:text-sm"
          >
            Julia Josefiina Taivalm&auml;ki
          </motion.p>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.5}
            className="font-heading text-5xl font-light italic leading-[1.1] text-white sm:text-6xl md:text-7xl lg:text-8xl"
          >
            when you move,
            <br />
            everything moves
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.8}
            className="mt-8 font-body text-sm font-light tracking-[0.15em] text-white/60 sm:text-base"
          >
            Yoga &middot; Somatic Movement &middot; Reiki Healing
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1.1}
            className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          >
            <Link
              href="/services"
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border border-white/40 bg-transparent px-8 py-3.5 font-body text-sm font-medium tracking-wide text-white transition-all duration-300 hover:border-white hover:bg-white/10"
            >
              Explore Offerings
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/book"
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-primary px-8 py-3.5 font-body text-sm font-medium tracking-wide text-white transition-all duration-300 hover:bg-primary-dark hover:shadow-lg"
            >
              Book a Session
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
          className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="h-6 w-6 text-white/50" strokeWidth={1.5} />
          </motion.div>
        </motion.div>
      </section>

      {/* ============================================================ */}
      {/*  ABOUT PREVIEW — Cinematic split                             */}
      {/* ============================================================ */}
      <section className="overflow-hidden py-28 md:py-40">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
            {/* Left: Large photo */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              className="relative"
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl shadow-2xl">
                <Image
                  src="/img/julia-portrait-1.jpg"
                  alt="Julia in yoga pose on sand dunes"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>
            </motion.div>

            {/* Right: Text */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.9, delay: 0.15, ease: "easeOut" }}
            >
              <p className="mb-4 font-body text-xs font-medium uppercase tracking-[0.25em] text-primary-dark">
                About Julia
              </p>
              <h2 className="font-heading text-3xl font-light italic text-text-primary sm:text-4xl md:text-5xl">
                Movement, Presence
                <br />
                &amp; Energy
              </h2>
              <div className="mt-4 h-px w-16 bg-primary/60" />

              <p className="mt-10 font-body text-base leading-[1.8] text-text-secondary sm:text-lg">
                Julia is an E-RYT 500 yoga teacher, somatic movement facilitator,
                and Reiki Master with a Master&rsquo;s degree in Social Services.
                With over 800 hours of movement and yoga studies, she works at the
                intersection of movement, presence, and energy &mdash; supporting
                nervous system regulation, awareness, and a deeper connection to
                your body.
              </p>

              <blockquote className="mt-10 border-l-2 border-primary/50 pl-6">
                <p className="font-heading text-xl italic leading-relaxed text-text-primary sm:text-2xl">
                  &ldquo;I believe the body is not something that needs
                  fixing &mdash; it is something to meet, listen to, and work
                  with.&rdquo;
                </p>
              </blockquote>

              <Link
                href="/about"
                className="mt-10 inline-flex cursor-pointer items-center gap-2 font-body text-sm font-medium tracking-wide text-primary-dark transition-all duration-200 hover:gap-3 hover:text-primary"
              >
                Learn More
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  OFFERINGS — Full-width immersive cards                      */}
      {/* ============================================================ */}
      <section className="bg-cream py-28 md:py-40">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="mb-16 text-center"
          >
            <p className="mb-4 font-body text-xs font-medium uppercase tracking-[0.25em] text-primary-dark">
              What I Offer
            </p>
            <h2 className="font-heading text-3xl font-light italic text-text-primary sm:text-4xl md:text-5xl">
              Offerings
            </h2>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3">
            {offerings.map((offering, i) => (
              <motion.div
                key={offering.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.15,
                  ease: "easeOut",
                }}
              >
                <Link href={offering.href} className="group block cursor-pointer">
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
                    <Image
                      src={offering.image}
                      alt={offering.title}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    {/* Text on overlay */}
                    <div className="absolute inset-x-0 bottom-0 px-8 pb-8 pt-16">
                      <h3 className="font-heading text-2xl font-medium italic text-white sm:text-3xl">
                        {offering.title}
                      </h3>
                    </div>
                  </div>
                  <p className="mt-4 font-body text-sm leading-relaxed text-text-secondary">
                    {offering.description}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1.5 font-body text-sm font-medium text-primary-dark transition-all duration-200 group-hover:gap-2.5">
                    Learn More
                    <ArrowRight
                      size={16}
                      className="transition-transform duration-200 group-hover:translate-x-1"
                    />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  PHOTO GALLERY — Horizontal scroll                           */}
      {/* ============================================================ */}
      <section className="py-28 md:py-40">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="mb-10 font-body text-xs font-medium uppercase tracking-[0.25em] text-primary-dark"
          >
            Moments
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8 }}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 scrollbar-hide lg:px-8"
        >
          {galleryImages.map((img, i) => (
            <div
              key={i}
              className="relative aspect-[3/4] w-72 flex-shrink-0 snap-center overflow-hidden rounded-xl sm:w-80 md:w-96"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-500 hover:scale-105"
                sizes="(max-width: 640px) 288px, (max-width: 768px) 320px, 384px"
              />
            </div>
          ))}
        </motion.div>
      </section>

      {/* ============================================================ */}
      {/*  SPIRIT GAME TEASER                                          */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden bg-[#1E1B2E] py-28 md:py-40">
        {/* Decorative gradient glow */}
        <div
          className="pointer-events-none absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 spirit-glow"
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-3xl px-6 text-center lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Star
              className="mx-auto mb-8 h-10 w-10 text-lavender/70"
              strokeWidth={1}
            />
            <h2 className="font-heading text-3xl font-light italic text-white sm:text-4xl md:text-5xl">
              Discover Your Inner Light
            </h2>
            <p className="mx-auto mt-8 max-w-xl font-body text-base leading-[1.8] text-white/60">
              Take a journey inward with our interactive spiritual discovery
              game. Explore questions about movement, energy, and presence to
              uncover insights about your body-mind connection.
            </p>
            <p className="mt-6 font-body text-sm font-medium tracking-wide text-accent-gold/80">
              Top scorers receive 20% off their first session
            </p>
            <Link
              href="/spirit-game"
              className="mt-10 inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border border-lavender/40 bg-lavender/10 px-8 py-3.5 font-body text-sm font-medium tracking-wide text-white transition-all duration-300 hover:border-lavender/60 hover:bg-lavender/20"
            >
              Play Now
              <Sparkles className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  TESTIMONIALS                                                 */}
      {/* ============================================================ */}
      <section className="py-28 md:py-40">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="mb-16 text-center"
          >
            <p className="mb-4 font-body text-xs font-medium uppercase tracking-[0.25em] text-primary-dark">
              Kind Words
            </p>
            <h2 className="font-heading text-3xl font-light italic text-text-primary sm:text-4xl md:text-5xl">
              Words of Heart
            </h2>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.12,
                  ease: "easeOut",
                }}
                className="relative rounded-2xl border border-border/60 bg-warm-white p-10 sm:p-12"
              >
                {/* Decorative quote */}
                <span className="font-heading text-6xl leading-none text-primary/20">
                  &ldquo;
                </span>

                <blockquote className="-mt-4 font-heading text-lg italic leading-relaxed text-text-primary sm:text-xl">
                  {t.quote}
                </blockquote>

                <div className="mt-6 flex items-center gap-3">
                  <span className="h-px w-8 bg-primary/30" />
                  <div>
                    <p className="font-body text-sm font-semibold text-text-primary">
                      {t.name}
                    </p>
                    {t.role && (
                      <p className="font-body text-xs text-text-muted">
                        {t.role}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  NEWSLETTER — Monthly Loveletter                             */}
      {/* ============================================================ */}
      <section id="newsletter" className="bg-cream py-28 md:py-36">
        <div className="mx-auto max-w-2xl px-6 text-center lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
          >
            <Mail
              className="mx-auto mb-6 h-9 w-9 text-primary/70"
              strokeWidth={1.5}
            />
            <h2 className="font-heading text-3xl font-light italic text-text-primary sm:text-4xl">
              Monthly Loveletter
            </h2>
            <p className="mx-auto mt-5 max-w-md font-body text-base leading-[1.8] text-text-secondary">
              Receive soulful reflections, upcoming events, and gentle
              invitations to slow down and reconnect &mdash; straight to your
              inbox.
            </p>

            {newsletterSent ? (
              <p className="mt-10 font-body text-base font-medium text-sage">
                Thank you for subscribing. Check your inbox soon.
              </p>
            ) : (
              <form
                onSubmit={handleNewsletter}
                className="mx-auto mt-10 flex max-w-md flex-col gap-3 sm:flex-row"
              >
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="min-w-0 flex-1 rounded-full border border-border bg-warm-white px-6 py-3.5 font-body text-sm text-text-primary placeholder:text-text-muted outline-none transition-all duration-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
                <button
                  type="submit"
                  className="cursor-pointer rounded-full bg-primary px-8 py-3.5 font-body text-sm font-medium tracking-wide text-white transition-all duration-200 hover:bg-primary-dark hover:shadow-md"
                >
                  Subscribe
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  INSTAGRAM CTA                                               */}
      {/* ============================================================ */}
      <section className="bg-[#2D2A26] py-24 md:py-32">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
          >
            <svg
              className="mx-auto mb-6 h-8 w-8 text-white/40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <circle cx="12" cy="12" r="5" />
              <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
            </svg>
            <h2 className="font-heading text-3xl font-light italic text-white sm:text-4xl md:text-5xl">
              Follow the Journey
            </h2>
            <a
              href="https://instagram.com/juliamooves"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block cursor-pointer font-body text-sm font-medium tracking-wide text-primary-light/70 transition-colors duration-200 hover:text-primary-light"
            >
              @juliamooves
            </a>

            {/* Preview images row */}
            <div className="mt-10 flex items-center justify-center gap-3 sm:gap-4">
              {instagramPreviews.map((src, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="relative h-14 w-14 overflow-hidden rounded-full sm:h-16 sm:w-16 md:h-20 md:w-20"
                >
                  <Image
                    src={src}
                    alt="Julia on Instagram"
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
