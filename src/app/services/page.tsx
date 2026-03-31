"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";

const services = [
  {
    id: "intuitive-massage-reiki",
    title: "Intuitive Massage & Reiki",
    description:
      "This session weaves together intuitive bodywork and Reiki energy healing into one deeply restorative experience. Julia listens to your body through her hands, combining massage techniques with the channeling of universal life energy to release tension, clear energetic blockages, and restore your natural state of balance.",
    image: "/img/reiki-massage.jpg",
    benefits: [
      "Deep relaxation and tension release",
      "Energetic rebalancing through Reiki",
      "Session adapts to your body's needs",
      "Brief conversation before and after",
    ],
    pricing: [
      { label: "60 min", price: 80 },
      { label: "90 min", price: 110 },
    ],
    bookHref: "/book?service=intuitive-massage-reiki",
  },
  {
    id: "reiki",
    title: "Reiki",
    description:
      "Reiki is the channeling of universal life energy \u2014 a gentle yet profound healing practice rooted in ancient Japanese tradition. During a session, Julia places her hands gently on or near your body, allowing energy to flow where it is most needed. This deeply restorative practice works on physical, emotional, mental, and spiritual levels.",
    image: "/img/studio-2.jpg",
    benefits: [
      "Stress reduction and improved sleep",
      "Pain relief and emotional clarity",
      "Warmth, tingling, or deep relaxation",
      "Held in a calm, sacred space",
    ],
    pricing: [
      { label: "60 min", price: 70 },
      { label: "90 min", price: 95 },
    ],
    bookHref: "/book?service=reiki",
  },
];

const classTypes = [
  {
    name: "Embodied Yin",
    description:
      "A slow, meditative practice that invites you into deep stillness. Through long-held floor postures and somatic awareness, nurturing your connective tissues and calming the nervous system.",
    image: "/img/classes.jpg",
  },
  {
    name: "Shake the Dust",
    description:
      "A dynamic, liberating movement practice that uses shaking, rhythmic movement, and breathwork to release stored tension and stagnant energy from the body.",
    image: "/img/shake-the-dust.jpg",
  },
  {
    name: "Monthly Community Gathering",
    description:
      "A special monthly gathering where Shake the Dust meets community. Offered in partnership with Time for Humanity \u2014 a space to shake, move, and connect.",
    image: "/img/social-collab.jpg",
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero Banner */}
      <section className="pt-32 pb-20 px-6 bg-gradient-to-b from-purple-950 to-purple-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/3 w-96 h-96 bg-purple-400 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold text-white heading-font"
          >
            Services & Offerings
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-purple-300 text-lg max-w-2xl mx-auto mt-4"
          >
            Each offering is an invitation to slow down, reconnect, and nurture the
            relationship between your body, mind, and spirit.
          </motion.p>
        </div>
      </section>

      {/* Individual Services */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto space-y-24">
          {services.map((service, i) => {
            const isEven = i % 2 === 0;
            return (
              <motion.div
                key={service.id}
                id={service.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7 }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div className={!isEven ? "lg:order-2" : ""}>
                    <div className="aspect-[4/3] rounded-2xl overflow-hidden relative group">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    </div>
                  </div>

                  <div className={!isEven ? "lg:order-1" : ""}>
                    <h2 className="text-3xl font-bold text-purple-950 heading-font mb-4">
                      {service.title}
                    </h2>
                    <p className="text-purple-700 leading-relaxed mb-6">
                      {service.description}
                    </p>

                    <ul className="space-y-3 mb-8">
                      {service.benefits.map((benefit) => (
                        <li key={benefit} className="flex items-start gap-3">
                          <Check size={16} className="text-gold-500 mt-1 flex-shrink-0" />
                          <span className="text-purple-800 text-sm">{benefit}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Pricing */}
                    <div className="flex gap-8 mb-8">
                      {service.pricing.map((p) => (
                        <div key={p.label}>
                          <p className="text-purple-500 text-xs font-medium uppercase tracking-wider">
                            {p.label}
                          </p>
                          <p className="text-2xl font-bold text-purple-950 heading-font">
                            &euro;{p.price}
                          </p>
                        </div>
                      ))}
                    </div>

                    <Link
                      href={service.bookHref}
                      className="inline-flex items-center gap-2 px-8 py-3.5 bg-gold-500 text-white font-semibold rounded-full hover:bg-gold-400 transition-all duration-300 text-sm tracking-wide cursor-pointer"
                    >
                      Book This Session
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      <div className="section-divider max-w-lg mx-auto" />

      {/* Classes & Events */}
      <section id="classes" className="py-24 lg:py-32 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-purple-950 heading-font mb-4">
              Classes & Events
            </h2>
            <p className="text-purple-700 text-lg max-w-2xl mx-auto">
              Trauma-informed movement classes to support nervous system regulation and body awareness.
            </p>
            <div className="mt-6 w-16 h-1 mx-auto rounded-full bg-gradient-to-r from-purple-500 to-gold-500" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {classTypes.map((cls, i) => (
              <motion.div
                key={cls.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:border-purple-200 card-lift"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={cls.image}
                    alt={cls.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-bold text-purple-950 heading-font mb-3">
                    {cls.name}
                  </h3>
                  <p className="text-purple-700 text-sm leading-relaxed">
                    {cls.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Class pricing */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-12 bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col sm:flex-row items-start sm:items-center sm:justify-between gap-6"
          >
            <div className="flex gap-8">
              <div>
                <p className="text-purple-500 text-xs font-medium uppercase tracking-wider">Drop-in</p>
                <p className="text-2xl font-bold text-purple-950 heading-font">&euro;18</p>
              </div>
              <div>
                <p className="text-purple-500 text-xs font-medium uppercase tracking-wider">10-class card</p>
                <p className="text-2xl font-bold text-purple-950 heading-font">&euro;150</p>
              </div>
            </div>
            <Link
              href="/book?service=classes"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-gold-500 text-white font-semibold rounded-full hover:bg-gold-400 transition-all duration-300 text-sm tracking-wide cursor-pointer"
            >
              Book a Class
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-24 lg:py-32 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-purple-950 heading-font mb-4">
              Not sure where to start?
            </h2>
            <p className="text-purple-700 text-lg max-w-xl mx-auto mb-8">
              Every journey is unique. Reach out and let&apos;s find the right path for you together.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="px-8 py-4 bg-gold-500 text-white font-semibold rounded-full hover:bg-gold-400 transition-all duration-300 text-sm tracking-wide cursor-pointer"
              >
                Get in Touch
              </Link>
              <Link
                href="/book"
                className="px-8 py-4 border-2 border-purple-200 text-purple-900 font-semibold rounded-full hover:bg-purple-50 transition-all duration-300 text-sm tracking-wide cursor-pointer"
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
