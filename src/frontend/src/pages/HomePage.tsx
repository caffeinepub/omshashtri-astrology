import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "motion/react";
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

export function HomePage() {
  const { data: signs, isLoading } = useZodiacSigns();
  const displaySigns = signs && signs.length > 0 ? signs : FALLBACK_SIGNS;
  // Merge backend symbols into ring if available
  const ringSymbols =
    signs && signs.length === 12
      ? signs.map((s) => ({ symbol: s.symbol, name: s.name }))
      : ZODIAC_SYMBOLS;

  return (
    <main className="relative min-h-screen">
      {/* ── Hero: background image layer ── */}
      <section
        className="relative overflow-hidden"
        style={{
          backgroundImage: `url('/assets/generated/astrology-hero.dim_1200x500.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/30 to-background" />

        {/* ── Two-column hero layout ── */}
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
                <span className="block text-4xl md:text-5xl lg:text-6xl text-primary text-glow tracking-widest">
                  OMSHASHTRI
                </span>
                <span className="block text-2xl md:text-3xl lg:text-4xl text-foreground/80 tracking-[0.25em] mt-1">
                  ASTROLOGY
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

            {/* Right: Spinning Zodiac Wheel + symbol ring */}
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

        {/* scroll indicator */}
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

// ── Spinning zodiac wheel with symbol ring ──────────────────────────────────
function ZodiacWheelDisplay({
  symbols,
}: {
  symbols: { symbol: string; name: string }[];
}) {
  // Outer container size accounts for wheel + symbol ring
  const containerSize = 520;
  const wheelSize = 360;
  const ringRadius = 220; // px from center to symbol

  return (
    <div
      className="relative"
      style={{ width: containerSize, height: containerSize }}
    >
      {/* Static outer glow ring */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          boxShadow:
            "0 0 60px oklch(0.76 0.14 82 / 0.15), 0 0 120px oklch(0.76 0.14 82 / 0.07)",
        }}
      />

      {/* Symbol ring — counter-rotates so glyphs stay upright */}
      {symbols.map((s, idx) => {
        const angleDeg = idx * 30; // 360 / 12
        const angleRad = ((angleDeg - 90) * Math.PI) / 180;
        const cx = containerSize / 2 + ringRadius * Math.cos(angleRad);
        const cy = containerSize / 2 + ringRadius * Math.sin(angleRad);
        return (
          <motion.div
            key={s.name}
            className="absolute flex items-center justify-center"
            style={{
              width: 36,
              height: 36,
              left: cx - 18,
              top: cy - 18,
            }}
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

      {/* Dashed orbit ring */}
      <div
        className="absolute rounded-full border border-dashed border-primary/20"
        style={{
          width: ringRadius * 2,
          height: ringRadius * 2,
          left: containerSize / 2 - ringRadius,
          top: containerSize / 2 - ringRadius,
        }}
      />

      {/* Spinning wheel image */}
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

      {/* Centre glow dot */}
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

// ── Zodiac grid card ─────────────────────────────────────────────────────────
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
