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
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold text-white heading-font"
          >
            About Julia
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-purple-300 text-lg max-w-2xl mx-auto mt-4"
          >
            When you move, everything moves
          </motion.p>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 px-6">
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
                  src="/img/julia-portrait-3.jpg"
                  alt="Julia on the beach"
                  width={600}
                  height={800}
                  className="w-full h-auto object-cover"
                  priority
                />
              </div>
            </motion.div>

            <div className="space-y-6">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-purple-700 text-base leading-relaxed"
              >
                I&rsquo;m Julia Josefiina &ndash; a yoga teacher, somatic movement
                facilitator, and Reiki Master working at the intersection of movement,
                presence, and energy. My work brings these elements together to support
                nervous system regulation, awareness, and a deeper connection to your body.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-purple-700 text-base leading-relaxed"
              >
                Here, you&rsquo;ll find practices, spaces, and offerings designed to help
                you slow down, listen, and reconnect &mdash; at your own pace, in your own way.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-purple-700 text-base leading-relaxed"
              >
                If you have any questions, curiosities, or feel called to connect,
                you&rsquo;re always welcome to reach out. I&rsquo;d love to hear from you.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
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

      {/* Philosophy — dark section */}
      <section className="py-24 lg:py-32 px-6 bg-purple-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-purple-400 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <p className="text-gold-400 text-sm font-medium uppercase tracking-wider mb-4">My Philosophy</p>
            <blockquote className="text-2xl md:text-3xl lg:text-4xl text-white/90 leading-relaxed italic heading-font max-w-3xl mx-auto">
              &ldquo;The body is not something that needs fixing &mdash; it is something
              to meet, listen to, and work with.&rdquo;
            </blockquote>
            <div className="mt-8 w-16 h-1 mx-auto rounded-full bg-gradient-to-r from-purple-500 to-gold-500" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                text: "Approaching your experience with openness rather than fixing \u2014 meeting yourself exactly where you are.",
              },
            ].map((pillar, i) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="text-center"
              >
                <h3 className="text-xl font-bold text-gold-400 heading-font mb-3">
                  {pillar.title}
                </h3>
                <p className="text-purple-300 text-sm leading-relaxed">
                  {pillar.text}
                </p>
              </motion.div>
            ))}
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
              Ready to Begin Your Journey?
            </h2>
            <p className="text-purple-700 text-lg max-w-xl mx-auto mb-8">
              Whether you are new to movement practices or deepening an existing journey,
              I would love to support you.
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
