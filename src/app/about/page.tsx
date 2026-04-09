"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function AboutPage() {
  return (
    <>
      {/* Hero Banner */}
      <section className="pt-32 pb-20 px-6 bg-gradient-to-b from-purple-950 to-purple-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-400 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold-400 rounded-full blur-3xl" />
        </div>

        {/* Wave bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" className="w-full">
            <path
              d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H0Z"
              fill="white"
            />
          </svg>
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          {/* Hero left intentionally empty — wave transition only */}
        </div>
      </section>

      {/* Story */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/img/about-page.jpeg"
                  alt="Julia Josefiina"
                  width={600}
                  height={800}
                  className="w-full h-auto object-cover"
                  priority
                />
              </div>
            </motion.div>

            <div className="space-y-5">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-3xl md:text-4xl font-bold heading-font"
                style={{ color: "#c4a882" }}
              >
                Hi there. I am Julia Josefiina.
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.05 }}
                className="text-purple-700 text-base leading-relaxed"
              >
                I work at the intersection of movement, presence, and energy.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-purple-700 text-base leading-relaxed"
              >
                I&rsquo;m an ERYT-500 yoga teacher, somatic movement facilitator, and
                Reiki Master. My work is rooted in trauma-informed approaches to the
                body&ndash;mind connection, where safety, awareness, and curiosity are
                at the center.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="text-purple-700 text-base leading-relaxed"
              >
                My path into this work began through listening. Listening to people, to
                stories, and to nervous systems under pressure. This experience continues
                to shape how I approach the body: not as something to fix, but as
                something to meet.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-purple-700 text-base leading-relaxed"
              >
                Before stepping into this field, I completed a Master&rsquo;s degree in
                Social Services and worked in humanitarian and refugee support. Supporting
                people through complex life situations changed how I understand the
                body&mdash;less as something to fix, and more as something to listen to
                and work with.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="text-purple-700 text-base leading-relaxed"
              >
                My path into this work has been shaped both through formal training and
                lived experience. I have completed over 800 hours of studies in yoga and
                movement, including Embodied Yin, Shake the Dust, and Authentic Flow
                (200h + 300h), alongside studies in Body-Mind Centering and massage
                techniques.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-purple-700 text-base leading-relaxed"
              >
                Today, my work brings together movement, nervous system awareness, and
                energy work to support a sense of safety, connection, and inner stability.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="text-purple-700 text-base leading-relaxed"
              >
                My intention is to create spaces where you can reconnect with your body,
                at your own pace, in your own way.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-gold-500 hover:text-gold-600 transition-colors cursor-pointer mt-4"
                >
                  Connect with me
                  <ArrowRight size={16} />
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 lg:py-32 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-purple-950 heading-font mb-4">
              Explore Different Ways to Work with Me
            </h2>
            <p className="text-purple-700 text-lg max-w-xl mx-auto mb-8">
              Classes, 1:1 sessions, and events
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/services"
                className="px-8 py-4 border-2 border-purple-200 text-purple-900 font-semibold rounded-full hover:bg-purple-50 transition-all duration-300 text-sm tracking-wide cursor-pointer"
              >
                View Offerings
              </Link>
              <Link
                href="/book"
                className="px-8 py-4 bg-gold-500 text-white font-semibold rounded-full hover:bg-gold-400 transition-all duration-300 text-sm tracking-wide cursor-pointer"
              >
                Book a Session
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
