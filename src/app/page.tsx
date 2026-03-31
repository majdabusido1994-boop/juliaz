"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRef, useEffect } from "react";

const services = [
  {
    title: "Intuitive Massage & Reiki",
    description:
      "A healing blend of intuitive bodywork and Reiki energy channeling. Each session flows to where your body needs it most.",
    image: "/img/reiki-massage.jpg",
    href: "/services#intuitive-massage-reiki",
  },
  {
    title: "Reiki",
    description:
      "A gentle yet profound energy healing practice rooted in ancient Japanese tradition. Promoting balance on all levels.",
    image: "/img/studio-2.jpg",
    href: "/services#reiki",
  },
  {
    title: "Classes & Events",
    description:
      "Embodied Yin, Shake the Dust, and monthly community events. Trauma-informed movement to support body awareness.",
    image: "/img/shake-the-dust.jpg",
    href: "/services#classes",
  },
];

export default function HomePage() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const tryPlay = () => { video.play().catch(() => {}); };
    tryPlay();
    document.addEventListener("touchstart", tryPlay, { once: true });
    document.addEventListener("click", tryPlay, { once: true });
    return () => {
      document.removeEventListener("touchstart", tryPlay);
      document.removeEventListener("click", tryPlay);
    };
  }, []);

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden bg-purple-950">
        <video
          ref={videoRef}
          autoPlay muted loop playsInline preload="auto"
          poster="/img/about.jpg"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/vid/hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 hero-overlay" />

        {/* Wave bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" className="w-full">
            <path
              d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H0Z"
              fill="white"
            />
          </svg>
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <p className="text-gold-400 text-sm font-medium uppercase tracking-[0.3em] mb-6">
              Movement &middot; Presence &middot; Energy
            </p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight heading-font">
              Julia <span className="text-gradient-gold">Josefiina</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed mt-6"
          >
            Yoga teacher, somatic movement facilitator, and Reiki Master &mdash;
            supporting nervous system regulation, awareness, and a deeper
            connection to your body.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/book"
              className="px-8 py-4 bg-gold-500 text-white font-semibold rounded-full hover:bg-gold-400 transition-all duration-300 text-sm tracking-wide cursor-pointer"
            >
              Book a Session
            </Link>
            <Link
              href="/services"
              className="px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-full hover:bg-white/10 hover:border-white/50 transition-all duration-300 text-sm tracking-wide cursor-pointer"
            >
              Explore Offerings
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── INTRO ── */}
      <section className="py-24 lg:py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-purple-950 heading-font mb-6">
              When you move, everything moves
            </h2>
            <p className="text-purple-700 text-lg leading-relaxed max-w-3xl mx-auto">
              Here, you&rsquo;ll find practices, spaces, and offerings designed to help
              you slow down, listen, and reconnect &mdash; at your own pace, in your
              own way.
            </p>
          </motion.div>
        </div>
        <div className="section-divider max-w-md mx-auto mt-16" />
      </section>

      {/* ── SERVICES PREVIEW ── */}
      <section className="py-24 lg:py-32 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-purple-950 heading-font mb-4">
              What I Offer
            </h2>
            <div className="mt-6 w-16 h-1 mx-auto rounded-full bg-gradient-to-r from-purple-500 to-gold-500" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
              >
                <Link href={service.href} className="group block cursor-pointer">
                  <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:border-purple-200 card-lift">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                    <div className="p-8">
                      <h3 className="text-xl font-bold text-purple-950 heading-font mb-3">
                        {service.title}
                      </h3>
                      <p className="text-purple-700 text-sm leading-relaxed mb-6">
                        {service.description}
                      </p>
                      <span className="inline-flex items-center text-sm font-semibold text-gold-500 hover:text-gold-600 transition-colors group-hover:gap-2 gap-1 duration-300">
                        Learn more
                        <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── QUOTE ── */}
      <section className="py-24 lg:py-32 px-6 bg-purple-950 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/4 w-80 h-80 rounded-full bg-purple-500/8 blur-3xl" />
          <div className="absolute bottom-1/3 right-1/4 w-64 h-64 rounded-full bg-gold-500/6 blur-3xl" />
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="relative max-w-3xl mx-auto text-center"
        >
          <div className="text-purple-400/20 text-7xl leading-none mb-4 heading-font">&ldquo;</div>
          <p className="text-2xl md:text-3xl text-white/90 leading-relaxed italic heading-font -mt-10">
            Practices rooted in listening &mdash; to the body, to the breath,
            to the subtle layers of experience.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-gold-500 flex items-center justify-center text-white font-bold text-sm">J</div>
            <div className="text-left">
              <p className="text-white text-sm font-medium">Julia Josefiina</p>
              <p className="text-purple-400/60 text-xs">Yoga & Somatic Movement</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── ABOUT PREVIEW ── */}
      <section className="py-24 lg:py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/img/julia-portrait-1.jpg"
                  alt="Julia in yoga pose on sand dunes"
                  width={600}
                  height={800}
                  className="w-full h-auto object-cover"
                  priority
                />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="space-y-6"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-purple-950 heading-font">
                About Julia
              </h2>
              <p className="text-purple-700 text-base leading-relaxed">
                Julia is an E-RYT 500 yoga teacher, somatic movement facilitator,
                and Reiki Master with a Master&rsquo;s degree in Social Services.
                With over 800 hours of movement and yoga studies, she works at the
                intersection of movement, presence, and energy.
              </p>
              <p className="text-purple-700 text-base leading-relaxed">
                I believe the body is not something that needs fixing &mdash; it is
                something to meet, listen to, and work with.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-sm font-semibold text-gold-500 hover:text-gold-600 transition-colors cursor-pointer"
              >
                Read more about Julia
                <ArrowRight size={16} />
              </Link>
            </motion.div>
          </div>
        </div>
        <div className="section-divider max-w-md mx-auto mt-16" />
      </section>

      {/* ── INSTAGRAM CTA ── */}
      <section className="py-24 lg:py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-purple-950 heading-font mb-4">
              Follow the Journey
            </h2>
            <p className="text-purple-700 text-lg max-w-2xl mx-auto mb-8">
              Join the community on Instagram for movement inspiration, behind-the-scenes, and soulful reflections.
            </p>
            <a
              href="https://instagram.com/juliamooves"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-purple-950 text-white font-semibold rounded-full hover:bg-purple-900 transition-colors duration-300 text-sm tracking-wide cursor-pointer"
            >
              @juliamooves
              <ArrowRight size={16} />
            </a>
          </motion.div>

          {/* Instagram preview grid */}
          <div className="mt-12 grid grid-cols-3 md:grid-cols-6 gap-3">
            {[
              "/img/julia-portrait-5.jpg",
              "/img/lifestyle-1.jpg",
              "/img/studio-1.jpg",
              "/img/nature-1.jpg",
              "/img/session-2.jpg",
              "/img/lifestyle-3.jpg",
            ].map((src, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="aspect-square rounded-xl overflow-hidden"
              >
                <Image
                  src={src}
                  alt="Instagram"
                  width={200}
                  height={200}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
