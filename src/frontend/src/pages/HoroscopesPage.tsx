import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import type { Horoscope, ZodiacSign } from "../backend.d";
import { useDailyHoroscopes, useZodiacSigns } from "../hooks/useQueries";

const ELEMENTS = ["All", "Fire", "Earth", "Air", "Water"] as const;
type Element = (typeof ELEMENTS)[number];

const elementColors: Record<string, string> = {
  Fire: "text-orange-400 border-orange-400/30 bg-orange-400/10",
  Earth: "text-emerald-400 border-emerald-400/30 bg-emerald-400/10",
  Air: "text-sky-300 border-sky-300/30 bg-sky-300/10",
  Water: "text-blue-400 border-blue-400/30 bg-blue-400/10",
};

const elementEmojis: Record<string, string> = {
  Fire: "\uD83D\uDD25",
  Earth: "\uD83C\uDF3F",
  Air: "\uD83D\uDCA8",
  Water: "\uD83D\uDCA7",
};

const FALLBACK_HOROSCOPES: Horoscope[] = [
  {
    sign: "Aries",
    dailyText:
      "The stars align in your favor today. New beginnings are on the horizon, and your natural leadership will shine brightly. Take that bold step you have been contemplating.",
  },
  {
    sign: "Taurus",
    dailyText:
      "Venus blesses you with beauty and grace today. Financial matters look promising. Indulge in life's simple pleasures and stay grounded in your values.",
  },
  {
    sign: "Gemini",
    dailyText:
      "Mercury energizes your mind with brilliant ideas today. Communication flows easily. Share your thoughts with others as your words carry special power now.",
  },
  {
    sign: "Cancer",
    dailyText:
      "The Moon, your ruler, amplifies your intuition today. Trust your gut feelings in relationships and at home. Nurturing others fills your own cup.",
  },
  {
    sign: "Leo",
    dailyText:
      "The Sun shines its golden light on you today. Your creativity soars and others are drawn to your magnetic presence. Step into the spotlight you deserve.",
  },
  {
    sign: "Virgo",
    dailyText:
      "Your analytical powers are razor-sharp today. Tackle complex problems with confidence. Small, consistent efforts compound into magnificent results.",
  },
  {
    sign: "Libra",
    dailyText:
      "Balance is your gift and your quest today. Partnerships flourish under Venus's harmonious influence. A diplomatic approach resolves long-standing tensions.",
  },
  {
    sign: "Scorpio",
    dailyText:
      "Pluto stirs deep transformation today. What no longer serves you must be released. Embrace the power of renewal as your greatest strength lies in letting go.",
  },
  {
    sign: "Sagittarius",
    dailyText:
      "Jupiter expands your horizons today. Adventure calls from every direction. Whether through travel, philosophy, or new learning, growth comes naturally.",
  },
  {
    sign: "Capricorn",
    dailyText:
      "Saturn rewards your discipline and patience today. Career achievements are within reach. Your steady climb is impressing those in high places.",
  },
  {
    sign: "Aquarius",
    dailyText:
      "Uranus sparks your innovative genius today. Your unique perspective solves what others cannot. Humanitarian pursuits align with your cosmic purpose.",
  },
  {
    sign: "Pisces",
    dailyText:
      "Neptune deepens your spiritual awareness today. Dreams carry important messages. Artistic inspiration flows like water so let creativity guide you.",
  },
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

export function HoroscopesPage() {
  const [activeElement, setActiveElement] = useState<Element>("All");
  const { data: horoscopes, isLoading: loadingHoroscopes } =
    useDailyHoroscopes();
  const { data: signs, isLoading: loadingSigns } = useZodiacSigns();

  const displayHoroscopes =
    horoscopes && horoscopes.length > 0 ? horoscopes : FALLBACK_HOROSCOPES;
  const displaySigns = signs && signs.length > 0 ? signs : FALLBACK_SIGNS;

  const signMap = displaySigns.reduce<Record<string, ZodiacSign>>((acc, s) => {
    acc[s.name] = s;
    return acc;
  }, {});

  const filtered =
    activeElement === "All"
      ? displayHoroscopes
      : displayHoroscopes.filter(
          (h) => signMap[h.sign]?.element === activeElement,
        );

  const isLoading = loadingHoroscopes || loadingSigns;

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-primary text-xs tracking-[0.3em] uppercase mb-3">
            ✦ Daily Readings ✦
          </p>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-foreground mb-4">
            Daily Horoscopes
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            The cosmos speaks through planetary alignments. Discover what the
            universe has in store for you today.
          </p>
        </motion.div>

        <div className="flex justify-center mb-10">
          <Tabs
            value={activeElement}
            onValueChange={(v) => setActiveElement(v as Element)}
          >
            <TabsList className="bg-muted/50 border border-border">
              {ELEMENTS.map((el) => (
                <TabsTrigger
                  key={el}
                  value={el}
                  data-ocid={`horoscopes.${el.toLowerCase()}.tab`}
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  {el !== "All" && (
                    <span className="mr-1">{elementEmojis[el]}</span>
                  )}
                  {el}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {isLoading ? (
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            data-ocid="horoscopes.loading_state"
          >
            {["s1", "s2", "s3", "s4", "s5", "s6"].map((id) => (
              <Skeleton key={id} className="h-48 rounded-xl bg-muted/50" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16" data-ocid="horoscopes.empty_state">
            <p className="text-4xl mb-4">🌌</p>
            <p className="text-muted-foreground">
              No horoscopes found for this element.
            </p>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeElement}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.map((horoscope, index) => {
                const sign = signMap[horoscope.sign];
                const colorClass = sign
                  ? (elementColors[sign.element] ?? "")
                  : "";
                return (
                  <motion.div
                    key={horoscope.sign}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.06 }}
                    data-ocid={`horoscopes.item.${index + 1}`}
                  >
                    <div className="card-cosmic rounded-xl p-6 h-full transition-all duration-200">
                      <div className="flex items-start gap-4 mb-4">
                        <span className="text-4xl">
                          {sign?.symbol ?? "\u2728"}
                        </span>
                        <div>
                          <h3 className="font-display text-xl font-semibold text-foreground">
                            {horoscope.sign}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            {sign && (
                              <Badge
                                variant="outline"
                                className={`text-xs border ${colorClass}`}
                              >
                                {elementEmojis[sign.element]} {sign.element}
                              </Badge>
                            )}
                            {sign && (
                              <span className="text-xs text-muted-foreground">
                                {sign.dateRange}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {horoscope.dailyText}
                      </p>
                      {sign?.rulingPlanet && (
                        <p className="mt-4 text-xs text-primary/70">
                          ✦ Ruled by {sign.rulingPlanet}
                        </p>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </main>
  );
}
