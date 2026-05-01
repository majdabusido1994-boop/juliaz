"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronDown } from "lucide-react";
import NewsletterSignup from "@/components/NewsletterSignup";

const services = [
  {
    id: "intuitive-touch-reiki",
    title: "Intuitive Touch and Reiki",
    image: "/img/reiki-massage.jpg",
    description: [
      "This session is a blend of hands-on Reiki and intuitive touch. I work with the body through gentle, responsive contact - following where there is tension, holding, or a need for support. The touch may include elements like rocking, tapping, or still holding, guided by what your body is asking for in the moment.",
      "This offering is especially supportive if you feel that touch helps you to arrive more fully into your body. It is not a traditional massage, but rather an intuitive, attuned approach for those who enjoy and benefit from mindful, present touch.",
      "Reiki is a gentle, hands-on energy practice where the energy is invited to flow through the body. It often supports deep relaxation and can help you soften, settle, and arrive more fully into yourself, also on a more subtle, energetic level. Often, the session begins with intuitive touch and gradually shifts into hands-on Reiki. This allows the body to settle first, before moving into the more subtle layers of the energetic body. This can support a deeper sense of arrival, softness, and integration to your body.",
      "Each session includes a short moment to arrive and share before we begin, and space at the end to gently land and reflect on your experience.",
    ],
    pricing: [
      { label: "60 min", price: 70 },
      { label: "90 min", price: 95 },
    ],
    bookHref: "/book?service=intuitive-massage-reiki",
  },
  {
    id: "reiki",
    title: "Reiki",
    image: "/img/studio-2.jpg",
    description: [
      "Reiki is a gentle, hands-on energy practice that originates from Japan. I am trained in the Usui Reiki lineage, which has deep roots in traditional Japanese healing methods. It is based on the understanding that a natural life force energy moves through all living beings. Reiki can be understood as this life force energy itself, and the practice as a way of channeling it. I experience Reiki as a way of arriving into the body on a more subtle, energetic level.",
      "I don’t approach Reiki as something to add or bring into your body, but as something that is already there - life force energy that is simply allowed to move freely, guided through my hands. During a session, this energy is invited to flow through light touch or with hands placed just above the body, while you rest comfortably on a massage table.",
      "Reiki is not about fixing or changing anything. Rather, it is an ancient, natural practice that meets you exactly as you are. It can bring a sense of peace, create space within the body and energetic field, and support you in feeling what you feel more deeply - allowing for a deeper arrival into the body.",
      "The experience of a Reiki session is often deeply calming for the body, mind, and heart. It may invite softness, grounding, and quiet presence, allowing the nervous system to settle in its own way. Each session includes a short moment to arrive and share before we begin, and space at the end to gently land and reflect on your experience.",
    ],
    pricing: [
      { label: "60 min", price: 60 },
      { label: "90 min", price: 75 },
    ],
    bookHref: "/book?service=reiki",
  },
];

const classTypes = [
  {
    name: "Embodied Yin ™",
    image: "/img/classes.jpg",
    description: [
      "Embodied Yin ™ is a gentle yin practice that invites you into discovery, stillness, and movement: through long holds and deeper layers of the body. Rooted in the tradition and exploration of Traditional Chinese Medicine, it works with the elements of the body, offering a way to connect with the natural rhythms and inner landscapes within.",
      "Through time and softness, the body is given space to open gradually — allowing sensation, breath, and awareness to unfold in their own rhythm. Even in stillness, there is movement. Beneath the surface, the body continues to shift, release, and respond. This practice is about learning to listen and get curious there. The sessions are slow and spacious, combining traditional yin shapes with subtle somatic awareness. There is an emphasis on sensing rather than doing, on allowing rather than pushing.",
    ],
  },
  {
    name: "Shake the Dust ™",
    image: "/img/shake-the-dust.jpg",
    description: [
      "Shake the Dust ™ is an embodied movement practice for the body, heart, and mind. Each session moves through a guided, intuitive theme, inviting you into a continuous flow between movement and rest, effort and release.",
      "The practice weaves together somatic tools — such as shaking, tapping, and intuitive movement — with more repetitive, grounding patterns like jumping or simple strength-based movements. Within this, there is space for both structure and freedom, allowing the body to move what is ready to move.",
      "The invitation is not to do more, but to be more — to become one with the movement. To meet the subtle “sweet spots” within resistance, within familiar patterns, and within moments of free, intuitive expression.",
      "It is a space for deep listening, for expression, for building resilience, and for arriving more fully into the body. Expect to sweat, to feel, and to meet yourself as you are. It’s like HIIT — but deep.",
    ],
  },
  {
    name: "Monthly community classes — Move for humanity!",
    image: "/img/social-collab.jpg",
    description: [
      "A monthly online gathering where we come together to move, feel, and connect — within ourselves and as part of something larger.",
      "These sessions are Shake the Dust ™ classes: a somatic movement practice for the body, heart, and mind. We move through a guided theme, exploring both repetition and freedom — through shaking, tapping, jumping, and intuitive movement, alongside more familiar, grounding patterns that build strength and resilience.",
      "This is a space for deep listening. For arriving into the body. For expression, sweat, and release: not only as individuals, but as part of a shared human experience. A space to feel, to reconnect, and to remember that we are not separate from each other.",
      "All Move for Humanity classes are donation-based, and all profits are directed toward humanitarian aid. This offering is part of a small way of moving with and for the collective.",
    ],
    extra: {
      label: "Read more about Time for Humanity",
      href: "https://www.timeforhumanity.world/aboutmanity",
    },
    note: "Join the mailing list to receive updates about the next community class.",
  },
  {
    name: "Brunch & Soft Movement",
    image: "/img/brunch-and-move.jpeg",
    subtitle: "A Middle Eastern brunch with Palestinian twists",
    description: [
      "A slow morning to move and arrive into the body. We begin with a gentle somatic movement practice — soft, intuitive, and grounding. Moving through simple guided patterns, subtle repetition, and free movement, with space for breath, stillness, and listening to what’s there. An invitation to do less, and be more.",
      "After the practice, we gather for a shared brunch. Expect rich, nourishing Middle Eastern flavours rooted in Palestinian traditions — everything homemade, simple, and made to be shared.",
    ],
    note: "Coming soon! Join the mailing list to hear when the next one is happening.",
  },
];

function ExpandableText({ paragraphs, threshold = 2 }: { paragraphs: string[]; threshold?: number }) {
  const [expanded, setExpanded] = useState(false);
  const needsToggle = paragraphs.length > threshold;
  const visible = !needsToggle || expanded ? paragraphs : paragraphs.slice(0, threshold);

  return (
    <div>
      <div className="space-y-4">
        {visible.map((p, i) => (
          <p key={i} className="text-purple-700 leading-relaxed text-sm md:text-base">
            {p}
          </p>
        ))}
      </div>
      {needsToggle && (
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-gold-500 hover:text-gold-600 transition-colors cursor-pointer"
        >
          {expanded ? "Read less" : "Read more"}
          <ChevronDown
            size={16}
            className={`transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
          />
        </button>
      )}
    </div>
  );
}

export default function ServicesPage() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(() => {});
  }, []);

  return (
    <>
      {/* Hero Banner with video */}
      <section className="relative min-h-[60vh] flex items-center justify-center px-6 overflow-hidden bg-purple-950">
        <video
          ref={videoRef}
          autoPlay muted loop playsInline preload="auto"
          poster="/img/about.jpg"
          className="absolute inset-0 w-full h-full object-cover blur-[2px] brightness-[0.5]"
        >
          <source src="/vid/offerings.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-purple-950/40" />

        {/* Wave bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" className="w-full">
            <path
              d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H0Z"
              fill="white"
            />
          </svg>
        </div>

        <div className="relative pt-28 pb-16 max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold text-white heading-font"
          >
            Offerings
          </motion.h1>
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
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
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

                    <ExpandableText paragraphs={service.description} threshold={2} />

                    {/* Pricing */}
                    <div className="flex gap-8 mt-8 mb-8">
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
        <div className="max-w-5xl mx-auto">
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
            <div className="mt-6 w-16 h-1 mx-auto rounded-full bg-gradient-to-r from-purple-500 to-gold-500" />
          </motion.div>

          <div className="space-y-16">
            {classTypes.map((cls, i) => {
              const isEven = i % 2 === 0;
              return (
                <motion.div
                  key={cls.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start bg-white rounded-2xl p-6 md:p-10 shadow-sm border border-gray-100"
                >
                  <div className={!isEven ? "lg:order-2" : ""}>
                    <div className="aspect-[4/3] rounded-xl overflow-hidden relative">
                      <Image
                        src={cls.image}
                        alt={cls.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    </div>
                  </div>
                  <div className={!isEven ? "lg:order-1" : ""}>
                    <h3 className="text-2xl md:text-3xl font-bold text-purple-950 heading-font mb-2">
                      {cls.name}
                    </h3>
                    {cls.subtitle && (
                      <p className="text-gold-600 text-sm italic mb-4">{cls.subtitle}</p>
                    )}
                    <ExpandableText paragraphs={cls.description} threshold={2} />
                    {cls.extra && (
                      <a
                        href={cls.extra.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-purple-600 hover:text-purple-800 transition-colors cursor-pointer"
                      >
                        {cls.extra.label}
                        <ArrowRight size={14} />
                      </a>
                    )}
                    {cls.note && (
                      <p className="mt-5 text-sm italic text-purple-600">
                        {cls.note}
                      </p>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-24 lg:py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <NewsletterSignup variant="dark" />
        </div>
      </section>
    </>
  );
}
