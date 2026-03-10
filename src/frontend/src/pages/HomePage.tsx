import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Briefcase,
  Gem,
  Heart,
  HeartPulse,
  MessageCircle,
  Quote,
  ScrollText,
  Sparkles,
  Star,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import type { ZodiacSign } from "../backend.d";
import { useZodiacSigns } from "../hooks/useQueries";

const elementColors: Record<string, string> = {
  Fire: "text-orange-400 border-orange-400/30 bg-orange-400/10",
  Earth: "text-emerald-400 border-emerald-400/30 bg-emerald-400/10",
  Air: "text-sky-300 border-sky-300/30 bg-sky-300/10",
  Water: "text-blue-400 border-blue-400/30 bg-blue-400/10",
};

const ZODIAC_SYMBOLS = [
  { symbol: "\u2648", name: "Aries" },
  { symbol: "\u2649", name: "Taurus" },
  { symbol: "\u264a", name: "Gemini" },
  { symbol: "\u264b", name: "Cancer" },
  { symbol: "\u264c", name: "Leo" },
  { symbol: "\u264d", name: "Virgo" },
  { symbol: "\u264e", name: "Libra" },
  { symbol: "\u264f", name: "Scorpio" },
  { symbol: "\u2650", name: "Sagittarius" },
  { symbol: "\u2651", name: "Capricorn" },
  { symbol: "\u2652", name: "Aquarius" },
  { symbol: "\u2653", name: "Pisces" },
];

const FALLBACK_SIGNS: ZodiacSign[] = [
  {
    name: "Aries",
    symbol: "\u2648",
    element: "Fire",
    dateRange: "Mar 21 \u2013 Apr 19",
    modality: "Cardinal",
    rulingPlanet: "Mars",
    description: "Bold and ambitious.",
  },
  {
    name: "Taurus",
    symbol: "\u2649",
    element: "Earth",
    dateRange: "Apr 20 \u2013 May 20",
    modality: "Fixed",
    rulingPlanet: "Venus",
    description: "Patient and reliable.",
  },
  {
    name: "Gemini",
    symbol: "\u264a",
    element: "Air",
    dateRange: "May 21 \u2013 Jun 20",
    modality: "Mutable",
    rulingPlanet: "Mercury",
    description: "Curious and adaptable.",
  },
  {
    name: "Cancer",
    symbol: "\u264b",
    element: "Water",
    dateRange: "Jun 21 \u2013 Jul 22",
    modality: "Cardinal",
    rulingPlanet: "Moon",
    description: "Intuitive and nurturing.",
  },
  {
    name: "Leo",
    symbol: "\u264c",
    element: "Fire",
    dateRange: "Jul 23 \u2013 Aug 22",
    modality: "Fixed",
    rulingPlanet: "Sun",
    description: "Passionate and creative.",
  },
  {
    name: "Virgo",
    symbol: "\u264d",
    element: "Earth",
    dateRange: "Aug 23 \u2013 Sep 22",
    modality: "Mutable",
    rulingPlanet: "Mercury",
    description: "Analytical and kind.",
  },
  {
    name: "Libra",
    symbol: "\u264e",
    element: "Air",
    dateRange: "Sep 23 \u2013 Oct 22",
    modality: "Cardinal",
    rulingPlanet: "Venus",
    description: "Diplomatic and gracious.",
  },
  {
    name: "Scorpio",
    symbol: "\u264f",
    element: "Water",
    dateRange: "Oct 23 \u2013 Nov 21",
    modality: "Fixed",
    rulingPlanet: "Pluto",
    description: "Resourceful and brave.",
  },
  {
    name: "Sagittarius",
    symbol: "\u2650",
    element: "Fire",
    dateRange: "Nov 22 \u2013 Dec 21",
    modality: "Mutable",
    rulingPlanet: "Jupiter",
    description: "Generous and idealistic.",
  },
  {
    name: "Capricorn",
    symbol: "\u2651",
    element: "Earth",
    dateRange: "Dec 22 \u2013 Jan 19",
    modality: "Cardinal",
    rulingPlanet: "Saturn",
    description: "Responsible and disciplined.",
  },
  {
    name: "Aquarius",
    symbol: "\u2652",
    element: "Air",
    dateRange: "Jan 20 \u2013 Feb 18",
    modality: "Fixed",
    rulingPlanet: "Uranus",
    description: "Progressive and original.",
  },
  {
    name: "Pisces",
    symbol: "\u2653",
    element: "Water",
    dateRange: "Feb 19 \u2013 Mar 20",
    modality: "Mutable",
    rulingPlanet: "Neptune",
    description: "Compassionate and wise.",
  },
];

const SERVICES = [
  {
    icon: Heart,
    title: "Love Problems",
    description:
      "Get guidance on relationship issues, compatibility, and finding love through the ancient wisdom of astrology.",
    waMessage: "Hello! I would like to consult about Love problems.",
    color: "text-rose-400",
    glow: "shadow-rose-500/20",
    bg: "bg-rose-500/10 border-rose-500/30",
    ocid: "services.love.button",
  },
  {
    icon: Users,
    title: "Family Problems",
    description:
      "Resolve family conflicts, understand dynamics, and restore harmony in your home with cosmic insight.",
    waMessage: "Hello! I would like to consult about Family problems.",
    color: "text-amber-400",
    glow: "shadow-amber-500/20",
    bg: "bg-amber-500/10 border-amber-500/30",
    ocid: "services.family.button",
  },
  {
    icon: Briefcase,
    title: "Career Problems",
    description:
      "Discover your true career path, timing for job changes, and professional growth through your birth chart.",
    waMessage: "Hello! I would like to consult about Career problems.",
    color: "text-sky-400",
    glow: "shadow-sky-500/20",
    bg: "bg-sky-500/10 border-sky-500/30",
    ocid: "services.career.button",
  },
];

const STATS = [
  { value: "10+", label: "Years Experience" },
  { value: "5000+", label: "Consultations" },
  { value: "Vedic", label: "Astrology Expert" },
  { value: "Pan India", label: "Trusted Across India" },
];

const EXPERTISE = [
  {
    icon: Heart,
    title: "Love & Relationship Problems",
    description:
      "Get clarity on love life, compatibility, and marriage timing through Vedic astrology.",
    color: "text-rose-400",
    bg: "bg-rose-500/10 border-rose-500/20",
  },
  {
    icon: Users,
    title: "Family & Marriage Problems",
    description:
      "Resolve family disputes and strengthen bonds with astrological guidance.",
    color: "text-amber-400",
    bg: "bg-amber-500/10 border-amber-500/20",
  },
  {
    icon: Briefcase,
    title: "Career & Business Problems",
    description:
      "Find the right path for career growth, job changes, and financial success.",
    color: "text-sky-400",
    bg: "bg-sky-500/10 border-sky-500/20",
  },
  {
    icon: HeartPulse,
    title: "Health & Wellbeing",
    description:
      "Understand health patterns in your birth chart and find effective remedies.",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10 border-emerald-500/20",
  },
  {
    icon: ScrollText,
    title: "Kundli & Birth Chart Analysis",
    description:
      "Detailed analysis of your Kundli for life predictions and future planning.",
    color: "text-violet-400",
    bg: "bg-violet-500/10 border-violet-500/20",
  },
  {
    icon: Gem,
    title: "Gemstone & Remedies",
    description:
      "Personalized gemstone and remedy recommendations based on your horoscope.",
    color: "text-yellow-400",
    bg: "bg-yellow-500/10 border-yellow-500/20",
  },
];

const TESTIMONIALS = [
  {
    name: "Priya S.",
    location: "Mumbai",
    rating: 5,
    text: "AstroAvi helped me understand my relationship problems so clearly. The guidance was accurate and very helpful. Highly recommend!",
  },
  {
    name: "Rahul M.",
    location: "Delhi",
    rating: 5,
    text: "I was confused about my career path for years. One consultation with AstroAvi gave me the clarity I needed. My life has changed since then.",
  },
  {
    name: "Anita K.",
    location: "Bangalore",
    rating: 5,
    text: "Amazing astrologer! The Kundli analysis was very detailed and the remedies actually worked. Very satisfied with the service.",
  },
  {
    name: "Deepak V.",
    location: "Kolkata",
    rating: 5,
    text: "Best astrologer online. Consulted for family problems and got very practical solutions. The ₹499 consultation is totally worth it.",
  },
];

export function HomePage() {
  const { data: signs, isLoading } = useZodiacSigns();
  const displaySigns = signs && signs.length > 0 ? signs : FALLBACK_SIGNS;
  const ringSymbols =
    signs && signs.length === 12
      ? signs.map((s) => ({ symbol: s.symbol, name: s.name }))
      : ZODIAC_SYMBOLS;

  return (
    <main className="relative min-h-screen">
      {/* ── Hero ── */}
      <section
        className="relative overflow-hidden"
        style={{
          backgroundImage: `url('/assets/generated/astrology-hero.dim_1200x500.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/30 to-background" />

        <div className="relative z-10 container mx-auto px-4 pt-28 pb-0">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 min-h-[80vh]">
            {/* Left: title + tagline + CTAs */}
            <motion.div
              className="flex-1 text-center lg:text-left max-w-xl"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
            >
              <p className="text-primary text-sm font-medium tracking-[0.3em] uppercase mb-5 flex items-center justify-center lg:justify-start gap-2">
                <Sparkles className="w-4 h-4" /> Ancient Wisdom, Cosmic Guidance
              </p>

              <h1 className="font-display font-bold leading-none mb-3">
                <span className="block text-5xl md:text-6xl lg:text-7xl text-primary text-glow tracking-widest">
                  AstroAvi
                </span>
              </h1>

              <div className="w-24 h-px bg-primary/50 my-6 mx-auto lg:mx-0" />

              <p className="text-base md:text-lg text-muted-foreground mb-4 leading-relaxed italic font-display">
                &ldquo;Discover Your Cosmic Path&rdquo;
              </p>
              <p className="text-sm md:text-base text-muted-foreground mb-10 leading-relaxed">
                Navigate life&apos;s journey through the ancient wisdom of the
                stars. Your celestial blueprint awaits.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link to="/horoscopes">
                  <Button
                    size="lg"
                    className="bg-primary text-primary-foreground hover:opacity-90 font-medium px-8 py-3 text-base"
                    data-ocid="hero.primary_button"
                  >
                    Read Horoscopes <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
                <Link to="/birth-chart">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-primary/40 text-primary hover:bg-primary/10 hover:border-primary px-8 py-3 text-base"
                    data-ocid="hero.secondary_button"
                  >
                    Explore Birth Chart
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Right: Spinning Zodiac Wheel */}
            <motion.div
              className="flex-shrink-0 flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.1, ease: "easeOut", delay: 0.2 }}
            >
              <ZodiacWheelDisplay symbols={ringSymbols} />
            </motion.div>
          </div>
        </div>

        <motion.div
          className="relative z-10 flex justify-center pb-8"
          animate={{ y: [0, 8, 0] }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <div className="w-5 h-8 border border-primary/30 rounded-full flex items-start justify-center p-1">
            <div className="w-1 h-2 bg-primary rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* ── Services Section ── */}
      <section
        className="container mx-auto px-4 py-20"
        data-ocid="services.section"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-primary text-xs tracking-[0.3em] uppercase mb-3">
            Expert Guidance
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            How Can We Help You?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Life's challenges have cosmic answers. Consult AstroAvi for
            personalized astrological guidance.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SERVICES.map((service, idx) => (
            <ServiceCard key={service.title} service={service} index={idx} />
          ))}
        </div>
      </section>

      {/* ── Why AstroAvi Section ── */}
      <section className="container mx-auto px-4 py-20" data-ocid="why.section">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <p className="text-primary text-xs tracking-[0.3em] uppercase mb-3 flex items-center justify-center gap-2">
            <Star className="w-3 h-3" /> Why Choose AstroAvi
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            India&apos;s Best Online Astrologer for Love, Career &amp; Family
            Problems
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base">
            Trusted by thousands across India for accurate Vedic astrology
            readings
          </p>
        </motion.div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {STATS.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="card-cosmic rounded-xl p-6 text-center"
            >
              <p className="font-display text-2xl md:text-3xl font-bold text-primary mb-1">
                {stat.value}
              </p>
              <p className="text-muted-foreground text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Description + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="card-cosmic rounded-2xl p-8 md:p-12 text-center max-w-3xl mx-auto"
        >
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-8">
            AstroAvi provides the{" "}
            <strong className="text-foreground">
              best astrology consultation online
            </strong>
            . Whether you&apos;re facing love problems, family conflicts, or
            career confusion, our expert Vedic astrologer helps you find clarity
            through the ancient science of astrology. Book your session today
            for just{" "}
            <strong className="text-primary">₹499 for 30 minutes</strong>.
          </p>
          <a
            href="https://wa.me/918777019632?text=Hello!%20I%20want%20to%20book%20an%20astrology%20consultation"
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="why.primary_button"
          >
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:opacity-90 font-semibold px-10 py-3 text-base"
            >
              Book Consultation on WhatsApp{" "}
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </a>
        </motion.div>
      </section>

      {/* ── Zodiac Signs Grid ── */}
      <section
        className="container mx-auto px-4 py-20"
        data-ocid="zodiac.section"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-primary text-xs tracking-[0.3em] uppercase mb-3">
            The Twelve Signs
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Your Zodiac Sign
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Each sign carries unique energies, traits, and cosmic gifts. Find
            yours below.
          </p>
        </motion.div>

        {isLoading ? (
          <div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
            data-ocid="zodiac.loading_state"
          >
            {[
              "s1",
              "s2",
              "s3",
              "s4",
              "s5",
              "s6",
              "s7",
              "s8",
              "s9",
              "s10",
              "s11",
              "s12",
            ].map((id) => (
              <Skeleton key={id} className="h-36 rounded-xl bg-muted/50" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {displaySigns.map((sign, index) => (
              <ZodiacCard key={sign.name} sign={sign} index={index} />
            ))}
          </div>
        )}
      </section>

      {/* ── Our Expertise Section ── */}
      <section
        className="container mx-auto px-4 py-20"
        data-ocid="expertise.section"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-primary text-xs tracking-[0.3em] uppercase mb-3">
            Our Expertise
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Expert Astrology Solutions for Every Life Problem
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            From love and marriage to career and health — our Vedic astrology
            expertise covers every aspect of your life.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {EXPERTISE.map((item, idx) => (
            <ExpertiseCard key={item.title} item={item} index={idx} />
          ))}
        </div>
      </section>

      {/* ── Contact / Enquiry Form ── */}
      <section
        className="container mx-auto px-4 py-20"
        data-ocid="contact.section"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-primary text-xs tracking-[0.3em] uppercase mb-3 flex items-center justify-center gap-2">
            <MessageCircle className="w-3 h-3" /> Free Quote
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Get Your Free Consultation Quote
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Fill in your details and we&apos;ll connect you on WhatsApp
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="max-w-lg mx-auto"
        >
          <ContactForm />
        </motion.div>
      </section>

      {/* ── Testimonials ── */}
      <section
        className="container mx-auto px-4 py-20"
        data-ocid="testimonials.section"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-primary text-xs tracking-[0.3em] uppercase mb-3">
            ✦ Client Stories ✦
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            What Our Clients Say
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Trusted by thousands across India
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TESTIMONIALS.map((t, idx) => (
            <TestimonialCard key={t.name} testimonial={t} index={idx} />
          ))}
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="container mx-auto px-4 pb-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="card-cosmic rounded-2xl p-10 text-center glow-gold"
        >
          <h3 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Unravel Your Celestial Story
          </h3>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Your birth chart is a cosmic snapshot of the universe at your first
            breath. Discover what the planets reveal about your destiny.
          </p>
          <Link to="/birth-chart">
            <Button
              className="bg-primary text-primary-foreground hover:opacity-90 px-10 py-3 text-base font-medium"
              data-ocid="cta.birth_chart.button"
            >
              Explore Your Birth Chart <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      </section>
    </main>
  );
}

// ── Contact Form ──────────────────────────────────────────────────────────────
function ContactForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [problem, setProblem] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const msg = `Hello! My name is ${name}, phone: ${phone}. I need help with: ${problem || "General Consultation"}`;
    window.open(
      `https://wa.me/918777019632?text=${encodeURIComponent(msg)}`,
      "_blank",
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="card-cosmic rounded-2xl p-8 md:p-10 flex flex-col gap-6"
    >
      <div className="flex flex-col gap-2">
        <Label htmlFor="contact-name" className="text-foreground font-medium">
          Your Name
        </Label>
        <Input
          id="contact-name"
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="bg-muted/40 border-border focus:border-primary"
          data-ocid="contact.name.input"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="contact-phone" className="text-foreground font-medium">
          Phone Number
        </Label>
        <Input
          id="contact-phone"
          type="tel"
          placeholder="Your WhatsApp number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          className="bg-muted/40 border-border focus:border-primary"
          data-ocid="contact.phone.input"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label className="text-foreground font-medium">Problem Type</Label>
        <Select onValueChange={setProblem} data-ocid="contact.problem.select">
          <SelectTrigger className="bg-muted/40 border-border focus:border-primary">
            <SelectValue placeholder="Select your concern" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Love Problems">Love Problems</SelectItem>
            <SelectItem value="Family Problems">Family Problems</SelectItem>
            <SelectItem value="Career Problems">Career Problems</SelectItem>
            <SelectItem value="Health Problems">Health Problems</SelectItem>
            <SelectItem value="Kundli Analysis">Kundli Analysis</SelectItem>
            <SelectItem value="Other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button
        type="submit"
        size="lg"
        className="bg-primary text-primary-foreground hover:opacity-90 font-semibold w-full mt-2 flex items-center gap-2"
        data-ocid="contact.submit_button"
      >
        <MessageCircle className="w-5 h-5" />
        Chat on WhatsApp
      </Button>

      <p className="text-center text-xs text-muted-foreground">
        Consultation:{" "}
        <strong className="text-primary">₹499 for 30 minutes</strong>
      </p>
    </form>
  );
}

// ── Testimonial Card ──────────────────────────────────────────────────────────
function TestimonialCard({
  testimonial,
  index,
}: {
  testimonial: (typeof TESTIMONIALS)[0];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      data-ocid={`testimonials.item.${index + 1}`}
    >
      <div className="card-cosmic rounded-2xl p-7 h-full flex flex-col gap-4">
        {/* Stars */}
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].slice(0, testimonial.rating).map((n) => (
            <Star key={n} className="w-4 h-4 fill-amber-400 text-amber-400" />
          ))}
        </div>

        {/* Quote */}
        <div className="relative flex-1">
          <Quote className="w-6 h-6 text-primary/30 mb-2" />
          <p className="text-muted-foreground text-sm leading-relaxed italic">
            &ldquo;{testimonial.text}&rdquo;
          </p>
        </div>

        {/* Author */}
        <div className="flex items-center gap-3 pt-2 border-t border-border/50">
          <div className="w-9 h-9 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center flex-shrink-0">
            <span className="text-primary font-display font-bold text-sm">
              {testimonial.name[0]}
            </span>
          </div>
          <div>
            <p className="font-display font-semibold text-foreground text-sm">
              {testimonial.name}
            </p>
            <p className="text-xs text-muted-foreground">
              {testimonial.location}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ── Service Card ─────────────────────────────────────────────────────────────
function ServiceCard({
  service,
  index,
}: {
  service: (typeof SERVICES)[0];
  index: number;
}) {
  const Icon = service.icon;
  const waLink = `https://wa.me/918777019632?text=${encodeURIComponent(service.waMessage)}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -6 }}
      data-ocid={`services.item.${index + 1}`}
    >
      <div
        className={`card-cosmic rounded-2xl p-8 flex flex-col items-center text-center h-full gap-5 shadow-lg ${service.glow}`}
      >
        <div
          className={`w-16 h-16 rounded-full border flex items-center justify-center ${service.bg}`}
        >
          <Icon className={`w-8 h-8 ${service.color}`} />
        </div>
        <div>
          <h3
            className={`font-display text-xl font-bold mb-2 ${service.color}`}
          >
            {service.title}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {service.description}
          </p>
        </div>
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto"
          data-ocid={service.ocid}
        >
          <Button className="bg-primary text-primary-foreground hover:opacity-90 font-semibold px-6">
            Contact Now
          </Button>
        </a>
      </div>
    </motion.div>
  );
}

// ── Expertise Card ────────────────────────────────────────────────────────────
function ExpertiseCard({
  item,
  index,
}: {
  item: (typeof EXPERTISE)[0];
  index: number;
}) {
  const Icon = item.icon;
  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: Math.floor(index / 2) * 0.1 }}
      whileHover={{ y: -4 }}
      data-ocid={`expertise.item.${index + 1}`}
    >
      <div
        className={`card-cosmic rounded-xl p-6 flex items-start gap-4 border ${item.bg}`}
      >
        <div
          className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${item.bg}`}
        >
          <Icon className={`w-6 h-6 ${item.color}`} />
        </div>
        <div>
          <h3 className={`font-display text-lg font-bold mb-1 ${item.color}`}>
            {item.title}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {item.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// ── Spinning zodiac wheel ─────────────────────────────────────────────────────
function ZodiacWheelDisplay({
  symbols,
}: {
  symbols: { symbol: string; name: string }[];
}) {
  const containerSize = 520;
  const wheelSize = 360;
  const ringRadius = 220;

  return (
    <div
      className="relative"
      style={{ width: containerSize, height: containerSize }}
    >
      <div
        className="absolute inset-0 rounded-full"
        style={{
          boxShadow:
            "0 0 60px oklch(0.76 0.14 82 / 0.15), 0 0 120px oklch(0.76 0.14 82 / 0.07)",
        }}
      />

      {symbols.map((s, idx) => {
        const angleDeg = idx * 30;
        const angleRad = ((angleDeg - 90) * Math.PI) / 180;
        const cx = containerSize / 2 + ringRadius * Math.cos(angleRad);
        const cy = containerSize / 2 + ringRadius * Math.sin(angleRad);
        return (
          <motion.div
            key={s.name}
            className="absolute flex items-center justify-center"
            style={{ width: 36, height: 36, left: cx - 18, top: cy - 18 }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.8 + idx * 0.06 }}
            title={s.name}
          >
            <span
              className="text-xl text-primary/80 hover:text-primary transition-colors cursor-default select-none"
              style={{ textShadow: "0 0 8px oklch(0.76 0.14 82 / 0.5)" }}
            >
              {s.symbol}
            </span>
          </motion.div>
        );
      })}

      <div
        className="absolute rounded-full border border-dashed border-primary/20"
        style={{
          width: ringRadius * 2,
          height: ringRadius * 2,
          left: containerSize / 2 - ringRadius,
          top: containerSize / 2 - ringRadius,
        }}
      />

      <motion.div
        className="absolute rounded-full overflow-hidden"
        style={{
          width: wheelSize,
          height: wheelSize,
          left: (containerSize - wheelSize) / 2,
          top: (containerSize - wheelSize) / 2,
        }}
        animate={{ rotate: 360 }}
        transition={{
          duration: 35,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      >
        <img
          src="/assets/generated/zodiac-wheel.dim_600x600.png"
          alt="Zodiac wheel"
          className="w-full h-full object-cover"
          style={{ filter: "drop-shadow(0 0 24px oklch(0.76 0.14 82 / 0.35))" }}
        />
      </motion.div>

      <div
        className="absolute rounded-full bg-primary/30 animate-pulse-glow"
        style={{
          width: 12,
          height: 12,
          left: containerSize / 2 - 6,
          top: containerSize / 2 - 6,
        }}
      />
    </div>
  );
}

// ── Zodiac grid card ──────────────────────────────────────────────────────────
function ZodiacCard({ sign, index }: { sign: ZodiacSign; index: number }) {
  const colorClass =
    elementColors[sign.element] ??
    "text-primary border-primary/30 bg-primary/10";
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ scale: 1.04, y: -4 }}
    >
      <Link to="/horoscopes" data-ocid={`zodiac.item.${index + 1}`}>
        <div className="card-cosmic rounded-xl p-4 text-center cursor-pointer transition-all duration-200 h-full min-h-[140px] flex flex-col items-center justify-center gap-2">
          <span className="text-3xl">{sign.symbol}</span>
          <p className="font-display font-semibold text-foreground text-sm">
            {sign.name}
          </p>
          <Badge variant="outline" className={`text-xs border ${colorClass}`}>
            {sign.element}
          </Badge>
          <p className="text-xs text-muted-foreground leading-tight">
            {sign.dateRange}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
