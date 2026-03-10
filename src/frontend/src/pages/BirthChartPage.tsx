import { Skeleton } from "@/components/ui/skeleton";
import { ArrowUp, Moon, Sun } from "lucide-react";
import { motion } from "motion/react";
import { useBirthChartInfo } from "../hooks/useQueries";

const FALLBACK = {
  sun: "Your Sun Sign reveals your core identity, ego, and the conscious self you present to the world. It represents your fundamental nature, the essence of who you are. The Sun drives your will, your vitality, and your life force. Understanding your Sun Sign illuminates your purpose and the path to authentic self-expression.",
  moon: "Your Moon Sign governs your emotional landscape, instincts, and subconscious patterns. It speaks to your inner world, how you feel, what brings you comfort, and your deepest needs. The Moon rules intuition, memory, and the nurturing part of your soul. It reveals the hidden you that only those closest to you truly know.",
  rising:
    "Your Rising Sign (Ascendant) is the mask you wear, the first impression you give to the world, and the lens through which you experience life. It shapes your physical appearance, mannerisms, and the way others perceive you before they know your deeper self. Your Rising Sign is the horizon point of your chart where the sky meets the earth.",
};

const planetCards = [
  {
    key: "sun" as const,
    title: "Sun Sign",
    subtitle: "Your Core Identity",
    icon: Sun,
    symbol: "\u2609",
    gradient: "from-amber-500/20 to-orange-500/10",
    glowClass: "hover:shadow-[0_0_30px_oklch(0.76_0.14_82/0.25)]",
    iconColor: "text-amber-400",
  },
  {
    key: "moon" as const,
    title: "Moon Sign",
    subtitle: "Your Emotional Depth",
    icon: Moon,
    symbol: "\u263D",
    gradient: "from-sky-400/20 to-blue-500/10",
    glowClass: "hover:shadow-[0_0_30px_oklch(0.6_0.16_220/0.25)]",
    iconColor: "text-sky-300",
  },
  {
    key: "rising" as const,
    title: "Rising Sign",
    subtitle: "Your Public Persona",
    icon: ArrowUp,
    symbol: "ASC",
    gradient: "from-violet-500/20 to-purple-500/10",
    glowClass: "hover:shadow-[0_0_30px_oklch(0.55_0.18_285/0.25)]",
    iconColor: "text-violet-400",
  },
];

export function BirthChartPage() {
  const { data, isLoading } = useBirthChartInfo();
  const chartData =
    data && (data.sun || data.moon || data.rising) ? data : FALLBACK;

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary text-xs tracking-[0.3em] uppercase mb-3">
            ✦ Celestial Blueprint ✦
          </p>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-foreground mb-4">
            Your Birth Chart
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            At the moment of your birth, the planets froze in a unique
            configuration, your personal cosmic fingerprint. These three
            placements form the foundation of your astrological identity.
          </p>
        </motion.div>

        {/* Cosmic wheel */}
        <div className="relative flex justify-center mb-16">
          <div className="w-48 h-48 rounded-full border border-primary/20 flex items-center justify-center animate-spin-slow">
            <div className="w-36 h-36 rounded-full border border-primary/30 flex items-center justify-center">
              <div className="w-24 h-24 rounded-full border border-primary/40 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center animate-pulse-glow">
                  <span className="text-2xl">✦</span>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {["\u2648", "\u264a", "\u264c", "\u264e", "\u2650", "\u2652"].map(
              (symbol, idx) => (
                <span
                  key={symbol}
                  className="absolute text-primary/40 text-xs"
                  style={{
                    transform: `rotate(${idx * 60}deg) translateY(-90px) rotate(-${idx * 60}deg)`,
                  }}
                >
                  {symbol}
                </span>
              ),
            )}
          </div>
        </div>

        {isLoading ? (
          <div
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            data-ocid="birth-chart.loading_state"
          >
            {["sun", "moon", "rising"].map((id) => (
              <Skeleton key={id} className="h-72 rounded-2xl bg-muted/50" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {planetCards.map((card, index) => {
              const Icon = card.icon;
              const content = chartData[card.key];
              return (
                <motion.div
                  key={card.key}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  whileHover={{ y: -6 }}
                  data-ocid={`birth-chart.${card.key}.card`}
                >
                  <div
                    className={`card-cosmic rounded-2xl p-8 h-full bg-gradient-to-br ${card.gradient} ${card.glowClass} transition-all duration-300`}
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-14 h-14 rounded-full bg-background/50 border border-border flex items-center justify-center">
                        <Icon className={`w-6 h-6 ${card.iconColor}`} />
                      </div>
                      <div>
                        <h2 className="font-display text-2xl font-bold text-foreground">
                          {card.title}
                        </h2>
                        <p className={`text-sm ${card.iconColor}`}>
                          {card.subtitle}
                        </p>
                      </div>
                    </div>
                    <div className="text-6xl font-display text-center mb-6 opacity-30">
                      {card.symbol}
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {content}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 card-cosmic rounded-2xl p-8 text-center"
        >
          <h3 className="font-display text-2xl font-bold text-foreground mb-3">
            The Holy Trinity of Astrology
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Together, your Sun, Moon, and Rising signs form the sacred triad of
            your astrological identity. The Sun is who you are, the Moon is who
            you feel, and the Rising is who the world sees.
          </p>
        </motion.div>
      </div>
    </main>
  );
}
