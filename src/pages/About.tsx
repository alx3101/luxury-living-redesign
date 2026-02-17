import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import hero1 from "@/assets/hero-1.jpg";
import hero3 from "@/assets/hero-3.jpg";

export default function AboutPage() {
  return (
    <main>
      <section
        className="relative h-[45vh] flex items-end pb-12 parallax-section"
        style={{ backgroundImage: `url(${hero1})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/40 to-foreground/20" />
        <div className="relative z-10 container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="text-gold uppercase tracking-[0.3em] text-sm font-body mb-2">La Nostra Storia</p>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-primary-foreground">Chi Siamo</h1>
          </motion.div>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <p className="text-gold uppercase tracking-[0.3em] text-sm font-body mb-3">San Marco Real Estate</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                25 Anni di Eccellenza Immobiliare
              </h2>
              <div className="elegant-divider mb-8" />
              <div className="space-y-4 text-muted-foreground font-body leading-relaxed">
                <p>
                  San Marco Real Estate è un punto di riferimento nel mercato immobiliare di lusso
                  sulla costa adriatica. Da oltre 25 anni, ci dedichiamo alla selezione e alla
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
              <div className="rounded-sm overflow-hidden luxury-shadow">
                <img src={hero3} alt="Interior" className="w-full h-[450px] object-cover" />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <p className="text-gold uppercase tracking-[0.3em] text-sm font-body mb-3">I Nostri Valori</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              Cosa Ci Distingue
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { number: "01", title: "Esperienza", desc: "Oltre 25 anni di attività nel settore immobiliare di lusso con una profonda conoscenza del mercato locale." },
              { number: "02", title: "Esclusività", desc: "Selezioniamo solo le proprietà migliori, garantendo standard qualitativi elevati per ogni proposta." },
              { number: "03", title: "Trasparenza", desc: "Ogni aspetto tecnico, legale e architettonico viene analizzato per garantire una comprensione chiara e reale." },
            ].map((v, i) => (
              <AnimatedSection key={v.number} delay={i * 0.15}>
                <div className="bg-card p-8 rounded-sm luxury-shadow">
                  <span className="text-5xl font-display font-bold gold-text-gradient">{v.number}</span>
                  <h3 className="font-display text-xl font-semibold text-foreground mt-4 mb-3">{v.title}</h3>
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
