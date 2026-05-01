"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRef, useEffect } from "react";
import NewsletterSignup from "@/components/NewsletterSignup";

const services = [
  {
    title: "Intuitive Touch & Reiki",
    description:
      "A mix of intuitive touch and Reiki. Each session follows what’s there, through touch and presence.",
    image: "/img/reiki-massage.jpg",
    href: "/services#intuitive-touch-reiki",
  },
  {
    title: "Reiki",
    description:
      "A gentle, hands-on energy practice. A quiet space to rest and arrive into the body.",
    image: "/img/studio-2.jpg",
    href: "/services#reiki",
  },
  {
    title: "Classes & Events",
    description:
      "Embodied Yin, Shake the Dust, and monthly community sessions.",
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
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight heading-font">
              When you move,{" "}
              <span className="text-gradient-gold">everything moves</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-xs sm:text-sm md:text-base text-white/70 mb-10 max-w-2xl mx-auto leading-relaxed mt-6 whitespace-nowrap"
          >
            Somatic Movement. Yoga. Reiki. Intuitive touch.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <Link
              href="/book"
              className="px-6 py-2.5 bg-gold-500 text-white font-semibold rounded-full hover:bg-gold-400 transition-all duration-300 text-xs tracking-wide cursor-pointer"
            >
              Book a Session
            </Link>
            <Link
              href="/services"
              className="px-6 py-2.5 border-2 border-white/30 text-white font-semibold rounded-full hover:bg-white/10 hover:border-white/50 transition-all duration-300 text-xs tracking-wide cursor-pointer"
            >
              Explore Offerings
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── INTRO ── */}
      <section className="py-24 lg:py-32 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-purple-950 heading-font mb-6">
              Hi, I&rsquo;m glad you are here.
            </h2>
            <p className="text-purple-600 text-sm leading-relaxed max-w-2xl mx-auto">
              I&rsquo;m Julia Josefiina &ndash; a yoga teacher, somatic movement
              facilitator, and Reiki Master working at the intersection of movement,
              presence, and energy. Here, you&rsquo;ll find practices, spaces, and
              offerings to help you arrive, listen, and reconnect back to you &mdash;
              at your own pace, in your own way.
            </p>
            <p className="text-purple-600 text-sm leading-relaxed max-w-2xl mx-auto mt-4">
              If you have any questions, curiosities, or feel called to connect,
              you&rsquo;re always welcome to reach out. I&rsquo;d love to hear from you.
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

      {/* ── NEWSLETTER ── */}
      <section className="py-16 lg:py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <NewsletterSignup variant="light" />
        </div>
      </section>

      {/* ── INSTAGRAM / STAY CONNECTED ── */}
      <section className="py-24 lg:py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-purple-950 heading-font mb-8">
              Stay Connected
            </h2>
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
