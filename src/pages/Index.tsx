import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Search, Award, Camera, Users } from "lucide-react";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";
import { properties } from "@/data/properties";
import PropertyCard from "@/components/PropertyCard";
import AnimatedSection from "@/components/AnimatedSection";

const slides = [
  { image: hero1, subtitle: "Valutazione Immobiliare", title: "Stime ed Obiettivi", cta: "Scopri di più" },
  { image: hero2, subtitle: "Creazione di Valore", title: "Contenuti Professionali", cta: "Scopri di più" },
  { image: hero3, subtitle: "Consulenza", title: "Al Servizio dei Clienti", cta: "Scopri di più" },
];

const services = [
  {
    icon: Award,
    title: "Valutazione Immobiliare",
    subtitle: "Stime ed Obiettivi",
    description: "Ogni immobile può avere diversi valori a seconda del punto di vista dell'acquirente. San Marco analizza ogni immobile mediante diversi fattori di stima per valorizzare al meglio le proposte di mercato.",
  },
  {
    icon: Camera,
    title: "Creazione di Valore",
    subtitle: "Contenuti Professionali",
    description: "Video e foto professionali, storiografia, descrizione dei dettagli, caratteristiche tecniche ed architettoniche per creare un vero e proprio passaporto immobiliare.",
  },
  {
    icon: Users,
    title: "Consulenza",
    subtitle: "Al Servizio dei Clienti",
    description: "Un'esperienza di 25 anni volta al servizio dei propri clienti, per valutare ogni aspetto tecnico-legale durante tutto il processo di trattativa e vendita.",
  },
];

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrentSlide((s) => (s + 1) % slides.length), 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <main>
      {/* Hero */}
      <section className="relative h-screen overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            <img
              src={slides[currentSlide].image}
              alt=""
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-foreground/50 via-foreground/30 to-foreground/70" />
          </motion.div>
        </AnimatePresence>

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <motion.div
            key={`text-${currentSlide}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <p className="text-gold uppercase tracking-[0.4em] text-sm font-body mb-4">
              {slides[currentSlide].subtitle}
            </p>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-primary-foreground mb-6 leading-tight">
              {slides[currentSlide].title}
            </h1>
            <div className="elegant-divider mx-auto mb-8" />
            <Link
              to="/immobili"
              className="inline-flex items-center gap-2 bg-gold/20 border border-gold/40 text-gold px-8 py-3 rounded-sm font-body text-sm uppercase tracking-[0.2em] hover:bg-gold hover:text-accent-foreground transition-all duration-500"
            >
              {slides[currentSlide].cta}
              <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>

          {/* Slide indicators */}
          <div className="absolute bottom-10 flex gap-3">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`w-2 h-2 rounded-full transition-all duration-500 ${
                  i === currentSlide ? "bg-gold w-8" : "bg-primary-foreground/40"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Search CTA */}
      <section className="bg-navy py-12">
        <div className="container mx-auto px-6 text-center">
          <p className="text-primary-foreground/70 font-body text-lg mb-6">
            Trova il tuo immobile tra tutte le nostre proposte
          </p>
          <Link
            to="/immobili"
            className="inline-flex items-center gap-3 gold-gradient text-accent-foreground px-10 py-4 rounded-sm font-body text-sm uppercase tracking-[0.2em] hover:opacity-90 transition-opacity"
          >
            <Search className="w-4 h-4" />
            Cerca Proprietà
          </Link>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <p className="text-gold uppercase tracking-[0.3em] text-sm font-body mb-3">Selezione Esclusiva</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Le Nostre Migliori Offerte
            </h2>
            <div className="elegant-divider mx-auto" />
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.slice(0, 6).map((p, i) => (
              <PropertyCard key={p.id} property={p} index={i} />
            ))}
          </div>

          <AnimatedSection className="text-center mt-12">
            <Link
              to="/immobili"
              className="inline-flex items-center gap-2 border-2 border-gold text-gold px-8 py-3 rounded-sm font-body text-sm uppercase tracking-[0.2em] hover:bg-gold hover:text-accent-foreground transition-all duration-500"
            >
              Vedi Tutti gli Immobili
              <ChevronRight className="w-4 h-4" />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* Parallax Divider */}
      <section
        className="parallax-section h-[50vh] relative flex items-center justify-center"
        style={{ backgroundImage: `url(${hero2})` }}
      >
        <div className="absolute inset-0 bg-foreground/60" />
        <div className="relative z-10 text-center px-6">
          <AnimatedSection>
            <p className="text-gold uppercase tracking-[0.4em] text-sm font-body mb-4">
              San Marco Real Estate
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground max-w-3xl mx-auto leading-tight">
              Il Nostro Impegno,<br />La Vostra Soddisfazione
            </h2>
          </AnimatedSection>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 lg:py-28 bg-muted">
        <div className="container mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <p className="text-gold uppercase tracking-[0.3em] text-sm font-body mb-3">I Nostri Servizi</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Eccellenza Immobiliare
            </h2>
            <div className="elegant-divider mx-auto" />
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {services.map((s, i) => (
              <AnimatedSection key={s.title} delay={i * 0.15}>
                <div className="bg-card p-8 rounded-sm luxury-shadow text-center group hover:-translate-y-2 transition-transform duration-500">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                    <s.icon className="w-7 h-7 text-gold" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-1">{s.title}</h3>
                  <p className="text-gold text-sm font-body uppercase tracking-wider mb-4">{s.subtitle}</p>
                  <p className="text-muted-foreground text-sm font-body leading-relaxed">{s.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
