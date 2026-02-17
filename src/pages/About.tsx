import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import hero1 from "@/assets/hero-1.jpg";
import hero3 from "@/assets/hero-3.jpg";

function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const increment = value / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, value]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function AboutPage() {
  return (
    <main>
      {/* Hero */}
      <section
        className="relative h-[50vh] flex items-end pb-16 parallax-section"
        style={{ backgroundImage: `url(${hero1})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        <div className="relative z-10 container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-gold uppercase tracking-[0.4em] text-xs font-body mb-3">La Nostra Storia</p>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-white">Chi Siamo</h1>
            <div className="elegant-divider mt-6" />
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-navy py-14">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-3 gap-8">
            {[
              { value: 5, suffix: "+", label: "Anni di Esperienza" },
              { value: 200, suffix: "+", label: "Clienti Soddisfatti" },
              { value: 50, suffix: "+", label: "Proprietà Vendute" },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className={`text-center ${i < 2 ? "border-r border-white/10" : ""}`}
              >
                <p className="font-display text-4xl md:text-5xl font-bold gold-text-gradient mb-2">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-white/40 font-body text-[10px] uppercase tracking-[0.2em]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <AnimatedSection>
              <div className="flex items-center gap-4 mb-6">
                <span className="font-display text-6xl font-bold text-gold/10">01</span>
                <p className="text-gold uppercase tracking-[0.3em] text-xs font-body">San Marco Real Estate</p>
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-8 leading-tight">
                5 Anni di<br />Eccellenza Immobiliare
              </h2>
              <div className="space-y-5 text-muted-foreground font-body leading-[1.8] text-[15px]">
                <p>
                  San Marco Real Estate è un punto di riferimento nel mercato immobiliare di lusso
                  sulla costa adriatica. Da oltre 5 anni, ci dedichiamo alla selezione e alla
                  valorizzazione degli immobili più esclusivi di Lignano Sabbiadoro e delle zone limitrofe.
                </p>
                <p>
                  La nostra missione è offrire un servizio personalizzato e di altissimo livello,
                  accompagnando ogni cliente in un percorso unico verso la casa dei propri sogni.
                  Ogni immobile viene analizzato nei minimi dettagli per garantire trasparenza,
                  qualità e valore.
                </p>
                <p>
                  Ci avvaliamo di tecnologie innovative, contenuti professionali e un team
                  di esperti per creare un'esperienza immobiliare senza paragoni.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="overflow-hidden luxury-shadow relative group">
                <img
                  src={hero3}
                  alt="Interior"
                  className="w-full h-[500px] object-cover transition-transform duration-[1.5s] group-hover:scale-105"
                />
                <div className="absolute inset-0 border border-gold/20 pointer-events-none" />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-muted/50">
        <div className="container mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <p className="text-gold uppercase tracking-[0.4em] text-xs font-body mb-4">I Nostri Valori</p>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground">
              Cosa Ci Distingue
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { number: "01", title: "Esperienza", desc: "Oltre 5 anni di attività nel settore immobiliare di lusso con una profonda conoscenza del mercato locale." },
              { number: "02", title: "Esclusività", desc: "Selezioniamo solo le proprietà migliori, garantendo standard qualitativi elevati per ogni proposta." },
              { number: "03", title: "Trasparenza", desc: "Ogni aspetto tecnico, legale e architettonico viene analizzato per garantire una comprensione chiara e reale." },
            ].map((v, i) => (
              <AnimatedSection key={v.number} delay={i * 0.15}>
                <div className="bg-card p-10 luxury-shadow hover:-translate-y-3 transition-all duration-700 group gold-line-top">
                  <span className="font-display text-6xl font-bold gold-text-gradient block mb-6">{v.number}</span>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-3">{v.title}</h3>
                  <p className="text-muted-foreground font-body text-sm leading-relaxed">{v.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
