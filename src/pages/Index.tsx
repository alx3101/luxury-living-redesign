import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useInView, useMotionValue, useTransform } from "framer-motion";
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
    description: "Un'esperienza di 5 anni volta al servizio dei propri clienti, per valutare ogni aspetto tecnico-legale durante tutto il processo di trattativa e vendita.",
  },
];

const stats = [
  { value: 5, suffix: "+", label: "Anni di Esperienza" },
  { value: 200, suffix: "+", label: "Clienti Soddisfatti" },
  { value: 50, suffix: "+", label: "Proprietà Vendute" },
  { value: 100, suffix: "%", label: "Dedizione" },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
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

  return (
    <span ref={ref} className="font-display text-5xl md:text-6xl font-bold gold-text-gradient">
      {count}{suffix}
    </span>
  );
}

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const imgX = useTransform(mouseX, [-500, 500], [8, -8]);
  const imgY = useTransform(mouseY, [-500, 500], [5, -5]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentSlide((s) => (s + 1) % slides.length), 6000);
    return () => clearInterval(timer);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  return (
    <main>
      {/* Hero */}
      <section
        className="relative h-screen overflow-hidden"
        onMouseMove={handleMouseMove}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ scale: 1.15, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            <motion.img
              src={slides[currentSlide].image}
              alt=""
              className="w-full h-full object-cover"
              style={{ x: imgX, y: imgY }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/70" />
          </motion.div>
        </AnimatePresence>

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <motion.div
            key={`text-${currentSlide}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-gold uppercase tracking-[0.5em] text-xs md:text-sm font-body mb-6"
            >
              {slides[currentSlide].subtitle}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-[1.1]"
            >
              {slides[currentSlide].title}
            </motion.h1>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="elegant-divider mx-auto mb-10"
            />

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              <Link
                to="/immobili"
                className="inline-flex items-center gap-3 border border-gold/40 text-gold px-10 py-4 font-body text-xs uppercase tracking-[0.25em] hover:bg-gold hover:text-white transition-all duration-700 group"
              >
                {slides[currentSlide].cta}
                <ChevronRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Slide indicators */}
          <div className="absolute bottom-12 flex gap-4">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`h-[2px] transition-all duration-700 ${i === currentSlide ? "bg-gold w-12" : "bg-white/30 w-6 hover:bg-white/50"
                  }`}
              />
            ))}
          </div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-12 right-8 hidden md:flex flex-col items-center gap-2"
          >
            <span className="font-body text-[10px] uppercase tracking-[0.3em] text-white/40 [writing-mode:vertical-lr]">
              Scroll
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-[1px] h-8 bg-gradient-to-b from-gold/60 to-transparent"
            />
          </motion.div>
        </div>
      </section>

      {/* Stats Counter Bar */}
      <section className="bg-navy py-16 lg:py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, hsl(38 45% 55% / 0.3) 0%, transparent 50%)' }} />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={`text-center ${i < stats.length - 1 ? "md:border-r md:border-white/10" : ""}`}
              >
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                <p className="text-white/50 font-body text-xs uppercase tracking-[0.2em] mt-3">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-6">
          <AnimatedSection className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <span className="font-display text-6xl font-bold text-gold/10">01</span>
                <p className="text-gold uppercase tracking-[0.3em] text-xs font-body">Selezione Esclusiva</p>
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground leading-tight">
                Le Nostre Migliori<br />Offerte
              </h2>
            </div>
            <div className="elegant-divider hidden md:block" />
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
            {properties.slice(0, 6).map((p, i) => (
              <PropertyCard key={p.id} property={p} index={i} />
            ))}
          </div>

          <AnimatedSection className="text-center mt-16">
            <Link
              to="/immobili"
              className="inline-flex items-center gap-3 border border-gold/40 text-gold px-10 py-4 font-body text-xs uppercase tracking-[0.25em] hover:bg-gold hover:text-white transition-all duration-700 group"
            >
              Vedi Tutti gli Immobili
              <ChevronRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* Parallax Divider */}
      <section
        className="parallax-section h-[60vh] relative flex items-center justify-center"
        style={{ backgroundImage: `url(${hero2})` }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <AnimatedSection>
            <div className="luxury-border p-12 md:p-16">
              <p className="text-gold uppercase tracking-[0.5em] text-xs font-body mb-6">
                San Marco Real Estate
              </p>
              <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Il Nostro Impegno,
                <br />
                <span className="italic font-normal">La Vostra Soddisfazione</span>
              </h2>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 lg:py-32 bg-muted/50">
        <div className="container mx-auto px-6">
          <AnimatedSection className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <span className="font-display text-6xl font-bold text-gold/10">02</span>
                <p className="text-gold uppercase tracking-[0.3em] text-xs font-body">I Nostri Servizi</p>
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground leading-tight">
                Eccellenza<br />Immobiliare
              </h2>
            </div>
            <div className="elegant-divider hidden md:block" />
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((s, i) => (
              <AnimatedSection key={s.title} delay={i * 0.15}>
                <div className="bg-card p-10 group hover:-translate-y-3 transition-all duration-700 relative overflow-hidden gold-line-top shimmer">
                  <div className="relative z-10">
                    <div className="w-14 h-14 mb-8 flex items-center justify-center border border-gold/30 group-hover:border-gold group-hover:bg-gold/5 transition-all duration-500">
                      <s.icon className="w-6 h-6 text-gold" />
                    </div>
                    <h3 className="font-display text-xl font-semibold text-foreground mb-1">{s.title}</h3>
                    <p className="text-gold text-xs font-body uppercase tracking-[0.2em] mb-5">{s.subtitle}</p>
                    <p className="text-muted-foreground text-sm font-body leading-relaxed">{s.description}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Search CTA */}
      <section className="bg-navy py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 80% 50%, hsl(38 45% 55% / 0.4) 0%, transparent 50%)' }} />
        </div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <AnimatedSection>
            <p className="text-white/50 font-body text-sm mb-4 tracking-wide">
              Trova il tuo immobile tra tutte le nostre proposte
            </p>
            <h3 className="font-display text-3xl md:text-4xl font-bold text-white mb-10">
              Inizia la Tua Ricerca
            </h3>
            <Link
              to="/immobili"
              className="inline-flex items-center gap-3 gold-gradient text-white px-12 py-4 font-body text-xs uppercase tracking-[0.25em] hover:opacity-90 transition-all duration-500 group"
            >
              <Search className="w-4 h-4" />
              Cerca Proprietà
              <ChevronRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" />
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}
