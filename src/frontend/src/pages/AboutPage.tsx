import { Skeleton } from "@/components/ui/skeleton";
import { Eye, Heart, Star } from "lucide-react";
import { motion } from "motion/react";
import { useAboutPage } from "../hooks/useQueries";

const FALLBACK_ABOUT = `Welcome to AstroAvi, where ancient Vedic wisdom meets modern life guidance.

AstroAvi was founded with a single mission: to make expert astrology accessible to everyone across India. With over 10 years of experience in Vedic astrology, we have helped thousands of people find clarity in love, family, and career through the power of the stars.

We believe your birth chart is not a prediction of fate, but a map of your potential. Every planetary position, every house, every aspect tells the story of who you are and what you are here to do.

Whether you are struggling with relationship problems, family conflicts, career confusion, or health concerns — our detailed Kundli analysis and personalized guidance help you navigate life's challenges with confidence and clarity.

Our consultations are rooted in authentic Vedic astrology, combined with compassionate listening and practical solutions. We offer personalized gemstone recommendations, mantra guidance, and actionable remedies tailored to your chart.

Thousands of satisfied clients across India trust AstroAvi for accurate predictions, genuine guidance, and real solutions.

Book your consultation today for just ₹499 for 30 minutes via WhatsApp and take the first step toward a clearer, more purposeful life.`;

const values = [
  {
    icon: Star,
    label: "Cosmic Wisdom",
    text: "Rooted in millennia of Vedic astrological tradition",
  },
  {
    icon: Heart,
    label: "Personal Growth",
    text: "Astrology as a tool for real life solutions",
  },
  {
    icon: Eye,
    label: "Spiritual Sight",
    text: "Seeing beyond the surface into deeper patterns",
  },
];

export function AboutPage() {
  const { data: aboutText, isLoading } = useAboutPage();
  const displayText =
    aboutText && aboutText.trim().length > 0 ? aboutText : FALLBACK_ABOUT;
  const paragraphs = displayText.split("\n\n").filter(Boolean);

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary text-xs tracking-[0.3em] uppercase mb-3">
            ✦ Our Story ✦
          </p>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-foreground mb-4">
            About AstroAvi
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Your trusted Vedic astrology guide for love, family and career
            guidance.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        >
          {values.map((v) => {
            const Icon = v.icon;
            return (
              <div
                key={v.label}
                className="card-cosmic rounded-xl p-6 text-center"
              >
                <div className="w-12 h-12 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                  {v.label}
                </h3>
                <p className="text-sm text-muted-foreground">{v.text}</p>
              </div>
            );
          })}
        </motion.div>

        {isLoading ? (
          <div className="space-y-4" data-ocid="about.loading_state">
            {["p1", "p2", "p3", "p4", "p5"].map((id) => (
              <Skeleton key={id} className="h-6 w-full rounded bg-muted/50" />
            ))}
          </div>
        ) : (
          <motion.article
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="card-cosmic rounded-2xl p-8 md:p-12"
            data-ocid="about.section"
          >
            <div className="prose prose-invert max-w-none">
              {paragraphs.map((para, i) => (
                <motion.p
                  key={para.slice(0, 25)}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 + i * 0.08 }}
                  className="text-muted-foreground leading-relaxed mb-6 last:mb-0 text-base"
                >
                  {i === 0 ? (
                    <>
                      <span className="font-display text-2xl font-bold text-foreground float-left mr-3 mt-1 leading-none text-glow">
                        {para[0]}
                      </span>
                      {para.slice(1)}
                    </>
                  ) : (
                    para
                  )}
                </motion.p>
              ))}
            </div>
          </motion.article>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-16"
        >
          <blockquote className="font-display text-2xl md:text-3xl italic text-primary text-glow">
            &ldquo;We are all made of stardust, guided by the light
            <br />
            of a thousand ancient suns.&rdquo;
          </blockquote>
        </motion.div>
      </div>
    </main>
  );
}
