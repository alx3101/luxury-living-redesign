import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import hero3 from "@/assets/hero-3.jpg";

export default function ContactPage() {
  return (
    <main>
      <section
        className="relative h-[45vh] flex items-end pb-12 parallax-section"
        style={{ backgroundImage: `url(${hero3})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/40 to-foreground/20" />
        <div className="relative z-10 container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="text-gold uppercase tracking-[0.3em] text-sm font-body mb-2">Parliamo</p>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-primary-foreground">Contatti</h1>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <AnimatedSection>
              <p className="text-gold uppercase tracking-[0.3em] text-sm font-body mb-3">Contattaci</p>
              <h2 className="font-display text-3xl font-bold text-foreground mb-6">Siamo a Tua Disposizione</h2>
              <div className="elegant-divider mb-8" />

              <div className="space-y-6 mb-10">
                {[
                  { icon: MapPin, label: "Indirizzo", value: "Viale Venezia 1/G – 33054\nLignano Sabbiadoro (UD)" },
                  { icon: Phone, label: "Telefono", value: "327.6617744" },
                  { icon: Mail, label: "Email", value: "info@sanmarcorealestate.com" },
                  { icon: Clock, label: "Orari", value: "Lun–Ven: 9:00 – 18:00\nSab: 9:00 – 13:00" },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                      <item.icon className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <p className="text-sm font-body uppercase tracking-wider text-gold mb-1">{item.label}</p>
                      <p className="text-foreground font-body whitespace-pre-line">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="bg-card p-8 rounded-sm luxury-shadow">
                <h3 className="font-display text-2xl font-semibold text-foreground mb-6">Invia un Messaggio</h3>
                <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Nome"
                      className="px-4 py-3 bg-muted border border-border rounded-sm text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/40"
                    />
                    <input
                      type="text"
                      placeholder="Cognome"
                      className="px-4 py-3 bg-muted border border-border rounded-sm text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/40"
                    />
                  </div>
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full px-4 py-3 bg-muted border border-border rounded-sm text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/40"
                  />
                  <input
                    type="tel"
                    placeholder="Telefono"
                    className="w-full px-4 py-3 bg-muted border border-border rounded-sm text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/40"
                  />
                  <textarea
                    placeholder="Il tuo messaggio..."
                    rows={5}
                    className="w-full px-4 py-3 bg-muted border border-border rounded-sm text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/40 resize-none"
                  />
                  <button
                    type="submit"
                    className="w-full gold-gradient text-accent-foreground py-3 rounded-sm font-body text-sm uppercase tracking-[0.15em] hover:opacity-90 transition-opacity"
                  >
                    Invia Messaggio
                  </button>
                </form>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </main>
  );
}
