"use client";

import { motion, type Variants } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, Sparkles, Leaf, Wind } from "lucide-react";

/* ─── animation variants ─── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" as const },
  },
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 1, ease: "easeOut" as const },
  },
};

const stagger: Variants = {
  visible: { transition: { staggerChildren: 0.15 } },
};

/* ─── types ─── */
interface SubService {
  name: string;
  description: string;
  image: string;
  icon: typeof Leaf;
}

/* ─── class sub-types ─── */
const classTypes: SubService[] = [
  {
    name: "Embodied Yin",
    description:
      "A slow, meditative practice that invites you into deep stillness. Through long-held floor postures and somatic awareness, Embodied Yin nurtures your connective tissues, calms the nervous system, and creates space for emotional release and inner listening.",
    image: "/img/classes.jpg",
    icon: Leaf,
  },
  {
    name: "Shake the Dust",
    description:
      "A dynamic, liberating movement practice that uses shaking, rhythmic movement, and breathwork to release stored tension, trauma, and stagnant energy from the body. An invitation to let go, move freely, and return to your body\u2019s natural aliveness.",
    image: "/img/shake-the-dust.jpg",
    icon: Wind,
  },
  {
    name: "Monthly Shake the Dust for Time for Humanity",
    description:
      "A special monthly gathering where Shake the Dust meets community. Offered in partnership with Time for Humanity \u2014 a space to shake, move, connect, and share energy with others. All are welcome, regardless of experience.",
    image: "/img/social-collab.jpg",
    icon: Sparkles,
  },
];

/* ─── page ─── */
export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-warm-white">
      {/* ══════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-cream pt-32 pb-24 lg:pt-44 lg:pb-32">
        {/* decorative orbs */}
        <div className="pointer-events-none absolute inset-0 opacity-40">
          <div className="absolute top-16 left-1/4 h-80 w-80 rounded-full bg-lavender-light/50 blur-[100px]" />
          <div className="absolute right-1/4 bottom-0 h-72 w-72 rounded-full bg-primary-light/50 blur-[100px]" />
          <div className="absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sage-light/40 blur-[120px]" />
        </div>

        <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-8">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-body text-xs font-semibold uppercase tracking-[0.25em] text-primary-dark"
          >
            Offerings
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-5 font-heading text-5xl font-semibold leading-[1.1] text-text-primary sm:text-6xl lg:text-7xl"
          >
            Services &amp; Offerings
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mx-auto mt-7 max-w-2xl font-body text-lg leading-relaxed text-text-secondary lg:text-xl"
          >
            Each offering is an invitation to slow down, reconnect, and nurture
            the relationship between your body, mind, and spirit.
          </motion.p>

          {/* thin decorative line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mx-auto mt-10 h-px w-24 origin-center bg-primary/40"
          />
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SERVICE 1 — Intuitive Massage & Reiki
          Layout: image LEFT, text RIGHT
      ══════════════════════════════════════════════ */}
      <section
        id="intuitive-massage-reiki"
        className="relative overflow-hidden bg-warm-white py-24 lg:py-32"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            {/* image */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeIn}
              className="group relative overflow-hidden rounded-2xl"
            >
              <div className="aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5]">
                <Image
                  src="/img/reiki-massage.jpg"
                  alt="Julia giving intuitive massage and Reiki healing to a client"
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>
              {/* accent overlay */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-lavender/20" />
            </motion.div>

            {/* text */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={stagger}
              className="flex flex-col"
            >
              <motion.div variants={fadeUp}>
                <span className="inline-block rounded-full bg-lavender-light/60 px-5 py-2 font-body text-xs font-semibold uppercase tracking-[0.15em] text-lavender">
                  Healing Touch
                </span>
              </motion.div>

              <motion.h2
                variants={fadeUp}
                className="mt-5 font-heading text-4xl font-semibold leading-[1.15] text-text-primary lg:text-5xl"
              >
                Intuitive Massage
                <br />
                &amp; Reiki
              </motion.h2>

              <motion.p
                variants={fadeUp}
                className="mt-6 font-body text-base leading-relaxed text-text-secondary lg:text-lg"
              >
                This session weaves together intuitive bodywork and Reiki energy
                healing into one deeply restorative experience. Julia listens to
                your body through her hands, combining massage techniques with the
                channeling of universal life energy to release tension, clear
                energetic blockages, and restore your natural state of balance.
              </motion.p>

              <motion.p
                variants={fadeUp}
                className="mt-4 font-body text-base italic leading-relaxed text-text-muted"
              >
                Each session is unique, flowing intuitively to where your body
                needs it most.
              </motion.p>

              {/* what to expect */}
              <motion.div variants={fadeUp} className="mt-8">
                <h3 className="font-heading text-xl font-semibold text-text-primary">
                  What to Expect
                </h3>
                <ul className="mt-4 flex flex-col gap-3">
                  {[
                    "You will lie comfortably on a treatment table in a calm, safe space",
                    "Julia combines intuitive massage with Reiki energy channeling",
                    "The session adapts to your body\u2019s needs in the moment",
                    "Many experience deep relaxation, warmth, and emotional release",
                    "A brief conversation before and after to support integration",
                  ].map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 font-body text-sm leading-relaxed text-text-secondary"
                    >
                      <span className="mt-2 block h-1.5 w-1.5 shrink-0 rounded-full bg-lavender" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* pricing */}
              <motion.div
                variants={fadeUp}
                className="mt-10 flex flex-wrap items-end gap-8"
              >
                <div>
                  <p className="font-body text-xs font-medium uppercase tracking-wider text-text-muted">
                    60 min session
                  </p>
                  <p className="mt-1 font-heading text-4xl font-semibold text-text-primary">
                    &euro;80
                  </p>
                </div>
                <div>
                  <p className="font-body text-xs font-medium uppercase tracking-wider text-text-muted">
                    90 min session
                  </p>
                  <p className="mt-1 font-heading text-4xl font-semibold text-text-primary">
                    &euro;110
                  </p>
                </div>
              </motion.div>

              {/* CTA */}
              <motion.div variants={fadeUp} className="mt-8">
                <Link
                  href="/book?service=intuitive-massage-reiki"
                  className="group inline-flex cursor-pointer items-center gap-2.5 rounded-full bg-lavender px-8 py-4 font-body text-sm font-semibold text-white transition-all duration-250 hover:bg-[#A090B8] hover:shadow-lg hover:shadow-lavender/20"
                >
                  Book This Session
                  <ArrowRight
                    size={16}
                    className="transition-transform duration-250 group-hover:translate-x-1"
                  />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SERVICE 2 — Reiki
          Layout: text LEFT, image RIGHT
      ══════════════════════════════════════════════ */}
      <section
        id="reiki"
        className="relative overflow-hidden bg-cream/60 py-24 lg:py-32"
      >
        {/* subtle bg accent */}
        <div className="pointer-events-none absolute -right-40 top-1/3 h-96 w-96 rounded-full bg-primary-light/30 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            {/* text — left on desktop */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={stagger}
              className="order-2 flex flex-col lg:order-1"
            >
              <motion.div variants={fadeUp}>
                <span className="inline-block rounded-full bg-primary-light/50 px-5 py-2 font-body text-xs font-semibold uppercase tracking-[0.15em] text-primary-dark">
                  Energy Healing
                </span>
              </motion.div>

              <motion.h2
                variants={fadeUp}
                className="mt-5 font-heading text-4xl font-semibold leading-[1.15] text-text-primary lg:text-5xl"
              >
                Reiki
              </motion.h2>

              <motion.p
                variants={fadeUp}
                className="mt-6 font-body text-base leading-relaxed text-text-secondary lg:text-lg"
              >
                Reiki is the channeling of universal life energy &mdash; a gentle
                yet profound healing practice rooted in ancient Japanese tradition.
                During a session, Julia places her hands gently on or near your
                body, allowing energy to flow where it is most needed.
              </motion.p>

              <motion.p
                variants={fadeUp}
                className="mt-4 font-body text-base leading-relaxed text-text-secondary lg:text-lg"
              >
                This deeply restorative practice works on physical, emotional,
                mental, and spiritual levels, supporting your body&apos;s innate
                ability to heal itself.
              </motion.p>

              {/* what to expect */}
              <motion.div variants={fadeUp} className="mt-8">
                <h3 className="font-heading text-xl font-semibold text-text-primary">
                  What to Expect
                </h3>
                <ul className="mt-4 flex flex-col gap-3">
                  {[
                    "You will lie fully clothed on a comfortable treatment table",
                    "Julia uses light touch or holds her hands just above the body",
                    "Many experience warmth, tingling, or deep waves of relaxation",
                    "The session is held in a calm, sacred space with soft music",
                    "A brief conversation before and after to support integration",
                  ].map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 font-body text-sm leading-relaxed text-text-secondary"
                    >
                      <span className="mt-2 block h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* benefits */}
              <motion.div variants={fadeUp} className="mt-8">
                <h3 className="font-heading text-xl font-semibold text-text-primary">
                  Benefits
                </h3>
                <div className="mt-4 flex flex-wrap gap-3">
                  {[
                    "Stress reduction",
                    "Improved sleep",
                    "Pain relief",
                    "Emotional clarity",
                    "Greater vitality",
                  ].map((benefit) => (
                    <span
                      key={benefit}
                      className="rounded-full border border-primary/20 bg-primary-light/20 px-5 py-2 font-body text-xs font-medium text-primary-dark"
                    >
                      {benefit}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* pricing */}
              <motion.div
                variants={fadeUp}
                className="mt-10 flex flex-wrap items-end gap-8"
              >
                <div>
                  <p className="font-body text-xs font-medium uppercase tracking-wider text-text-muted">
                    60 min session
                  </p>
                  <p className="mt-1 font-heading text-4xl font-semibold text-text-primary">
                    &euro;70
                  </p>
                </div>
                <div>
                  <p className="font-body text-xs font-medium uppercase tracking-wider text-text-muted">
                    90 min session
                  </p>
                  <p className="mt-1 font-heading text-4xl font-semibold text-text-primary">
                    &euro;95
                  </p>
                </div>
              </motion.div>

              {/* CTA */}
              <motion.div variants={fadeUp} className="mt-8">
                <Link
                  href="/book?service=reiki"
                  className="group inline-flex cursor-pointer items-center gap-2.5 rounded-full bg-primary px-8 py-4 font-body text-sm font-semibold text-white transition-all duration-250 hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/20"
                >
                  Book This Session
                  <ArrowRight
                    size={16}
                    className="transition-transform duration-250 group-hover:translate-x-1"
                  />
                </Link>
              </motion.div>
            </motion.div>

            {/* image — right on desktop */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeIn}
              className="order-1 lg:order-2"
            >
              <div className="group relative overflow-hidden rounded-2xl">
                <div className="aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5]">
                  <Image
                    src="/img/studio-2.jpg"
                    alt="Julia performing Reiki healing in a lush tropical setting"
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-primary/15" />
              </div>
              {/* secondary image — small accent */}
              <motion.div
                variants={fadeUp}
                className="mt-4 overflow-hidden rounded-xl lg:-mt-20 lg:ml-auto lg:mr-8 lg:w-48"
              >
                <div className="relative aspect-square">
                  <Image
                    src="/img/reiki.jpg"
                    alt="Close-up of palo santo and sage for Reiki ambience"
                    fill
                    className="object-cover"
                    sizes="200px"
                  />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SERVICE 3 — Classes & Events
          Layout: full-width hero image, then sub-type cards
      ══════════════════════════════════════════════ */}
      <section id="classes" className="relative overflow-hidden bg-warm-white py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* full-width hero image */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeIn}
            className="group relative overflow-hidden rounded-2xl"
          >
            <div className="aspect-[16/9] sm:aspect-[2.2/1]">
              <Image
                src="/img/shake-the-dust.jpg"
                alt="Dynamic group movement class led by Julia"
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                sizes="100vw"
              />
              {/* dark overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            </div>
            {/* text overlay on image */}
            <div className="absolute inset-x-0 bottom-0 p-8 lg:p-14">
              <span className="inline-block rounded-full bg-sage/80 px-5 py-2 font-body text-xs font-semibold uppercase tracking-[0.15em] text-white backdrop-blur-sm">
                Movement &amp; Community
              </span>
              <h2 className="mt-4 font-heading text-4xl font-semibold leading-[1.15] text-white lg:text-6xl">
                Classes &amp; Events
              </h2>
              <p className="mt-3 max-w-2xl font-body text-base leading-relaxed text-white/85 lg:text-lg">
                Movement classes and events that weave together somatic awareness,
                yoga, and nervous system regulation. An invitation to slow down,
                listen to your body, and discover new ways of moving that feel safe
                and nourishing.
              </p>
            </div>
          </motion.div>

          {/* class type cards */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="mt-16 grid gap-8 md:grid-cols-3"
          >
            {classTypes.map((classType) => {
              const Icon = classType.icon;
              return (
                <motion.div
                  key={classType.name}
                  variants={fadeUp}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-sage/15 bg-white shadow-sm transition-shadow duration-300 hover:shadow-md"
                >
                  {/* card image */}
                  <div className="relative overflow-hidden">
                    <div className="aspect-[4/3]">
                      <Image
                        src={classType.image}
                        alt={classType.name}
                        fill
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  </div>

                  {/* card body */}
                  <div className="flex flex-1 flex-col p-6 lg:p-8">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sage-light/70">
                      <Icon size={20} className="text-sage" />
                    </div>
                    <h3 className="mt-4 font-heading text-2xl font-semibold leading-snug text-text-primary">
                      {classType.name}
                    </h3>
                    <p className="mt-3 flex-1 font-body text-sm leading-relaxed text-text-secondary">
                      {classType.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* classes info bar */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mt-12"
          >
            <div className="flex flex-col items-start gap-6 rounded-2xl border border-sage/15 bg-sage-light/20 p-8 sm:flex-row sm:items-center sm:justify-between lg:p-10">
              {/* expectations */}
              <div>
                <h3 className="font-heading text-xl font-semibold text-text-primary">
                  What to Expect
                </h3>
                <ul className="mt-3 flex flex-col gap-2">
                  {[
                    "Trauma-informed and accessible to all levels",
                    "Focus on nervous system regulation and body awareness",
                    "A warm, supportive community atmosphere",
                  ].map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 font-body text-sm leading-relaxed text-text-secondary"
                    >
                      <span className="mt-2 block h-1.5 w-1.5 shrink-0 rounded-full bg-sage" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* pricing + CTA */}
              <div className="flex shrink-0 flex-col items-start gap-6 sm:items-end">
                <div className="flex gap-8">
                  <div className="text-left sm:text-right">
                    <p className="font-body text-xs font-medium uppercase tracking-wider text-text-muted">
                      Drop-in
                    </p>
                    <p className="mt-1 font-heading text-3xl font-semibold text-text-primary">
                      &euro;18
                    </p>
                  </div>
                  <div className="text-left sm:text-right">
                    <p className="font-body text-xs font-medium uppercase tracking-wider text-text-muted">
                      10-class card
                    </p>
                    <p className="mt-1 font-heading text-3xl font-semibold text-text-primary">
                      &euro;150
                    </p>
                  </div>
                </div>
                <Link
                  href="/book?service=classes"
                  className="group inline-flex cursor-pointer items-center gap-2.5 rounded-full bg-sage px-8 py-4 font-body text-sm font-semibold text-white transition-all duration-250 hover:bg-[#748A6A] hover:shadow-lg hover:shadow-sage/20"
                >
                  Book a Class
                  <ArrowRight
                    size={16}
                    className="transition-transform duration-250 group-hover:translate-x-1"
                  />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          BOTTOM CTA
      ══════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-cream py-24 lg:py-32">
        <div className="pointer-events-none absolute inset-0 opacity-30">
          <div className="absolute top-10 right-1/3 h-64 w-64 rounded-full bg-lavender-light/50 blur-[100px]" />
          <div className="absolute bottom-10 left-1/3 h-56 w-56 rounded-full bg-primary-light/50 blur-[100px]" />
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="relative mx-auto max-w-3xl px-6 text-center lg:px-8"
        >
          <motion.div
            variants={fadeUp}
            className="mx-auto mb-6 h-px w-16 bg-primary/30"
          />

          <motion.h2
            variants={fadeUp}
            className="font-heading text-3xl font-semibold text-text-primary lg:text-5xl"
          >
            Not sure where to start?
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mt-5 font-body text-base leading-relaxed text-text-secondary lg:text-lg"
          >
            Every journey is unique. Reach out and let&apos;s find the right path
            for you together.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          >
            <Link
              href="/contact"
              className="group inline-flex cursor-pointer items-center gap-2.5 rounded-full bg-primary px-8 py-4 font-body text-sm font-semibold text-white transition-all duration-250 hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/20"
            >
              Get in Touch
              <ArrowRight
                size={16}
                className="transition-transform duration-250 group-hover:translate-x-1"
              />
            </Link>
            <Link
              href="/book"
              className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-primary/40 bg-transparent px-8 py-4 font-body text-sm font-semibold text-primary-dark transition-all duration-250 hover:border-primary hover:bg-primary-light/20"
            >
              <Clock size={16} />
              Book a Session
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
