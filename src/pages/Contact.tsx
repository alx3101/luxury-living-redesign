import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import LeafletMap from "@/components/LeafletMap";
import hero3 from "@/assets/hero-3.jpg";

const officeLocation = {
  id: "office",
  title: "San Marco Real Estate",
  slug: "",
  price: 0,
  priceFormatted: "",
  type: "Ufficio",
  category: "",
  contract: "Vendita" as const,
  description: "",
  shortDescription: "",
  image: "",
  images: [],
  sqm: 0,
  bedrooms: 0,
  bathrooms: 0,
  garage: 0,
  location: "Lignano Sabbiadoro",
  address: "Viale Venezia 1/G, Lignano Sabbiadoro",
  lat: 45.6912,
  lng: 13.1510,
  features: [],
};

export default function ContactPage() {
  return (
    <main>
      {/* Hero */}
      <section
        className="relative h-[50vh] flex items-end pb-16 parallax-section"
        style={{ backgroundImage: `url(${hero3})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        <div className="relative z-10 container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-gold uppercase tracking-[0.4em] text-xs font-body mb-3">Parliamo</p>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-white">Contatti</h1>
            <div className="elegant-divider mt-6" />
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            {/* Left - Contact Info */}
            <AnimatedSection>
              <div className="flex items-center gap-4 mb-6">
                <span className="font-display text-6xl font-bold text-gold/10">01</span>
                <p className="text-gold uppercase tracking-[0.3em] text-xs font-body">Contattaci</p>
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-8 leading-tight">
                Siamo a Tua<br />Disposizione
              </h2>

              <div className="space-y-8 mb-12">
                {[
                  { icon: MapPin, label: "Indirizzo", value: "Viale Venezia 1/G – 33054\nLignano Sabbiadoro (UD)" },
                  { icon: Phone, label: "Telefono", value: "327.661.7744" },
                  { icon: Mail, label: "Email", value: "info@sanmarcorealestate.com" },
                  { icon: Clock, label: "Orari", value: "Lun–Ven: 9:00 – 18:00\nSab: 9:00 – 13:00" },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-5 group">
                    <div className="w-12 h-12 border border-gold/30 flex items-center justify-center shrink-0 group-hover:bg-gold/5 transition-colors">
                      <item.icon className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <p className="text-[10px] font-body uppercase tracking-[0.2em] text-gold mb-1.5">{item.label}</p>
                      <p className="text-foreground font-body whitespace-pre-line leading-relaxed">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Map */}
              <div className="h-[250px] luxury-shadow overflow-hidden">
                <LeafletMap
                  properties={[officeLocation]}
                  center={[45.6912, 13.1510]}
                  zoom={15}
                  singleMarker
                />
              </div>
            </AnimatedSection>

            {/* Right - Form */}
            <AnimatedSection delay={0.2}>
              <div className="bg-card p-10 luxury-shadow relative overflow-hidden">
                {/* Gold corner accent */}
                <div className="absolute top-0 left-0 w-16 h-16">
                  <div className="absolute top-0 left-0 w-full h-[2px] gold-gradient" />
                  <div className="absolute top-0 left-0 h-full w-[2px] gold-gradient" />
                </div>

                <h3 className="font-display text-2xl font-semibold text-foreground mb-2">Invia un Messaggio</h3>
                <p className="text-muted-foreground text-sm font-body mb-8">
                  Compila il modulo e ti risponderemo al più presto.
                </p>

                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input type="text" placeholder="Nome" className="luxury-input" />
                    <input type="text" placeholder="Cognome" className="luxury-input" />
                  </div>
                  <input type="email" placeholder="Email" className="luxury-input" />
                  <input type="tel" placeholder="Telefono" className="luxury-input" />
                  <textarea
                    placeholder="Il tuo messaggio..."
                    rows={5}
                    className="luxury-input resize-none"
                  />
                  <button
                    type="submit"
                    className="w-full gold-gradient text-white py-4 font-body text-xs uppercase tracking-[0.2em] hover:opacity-90 transition-opacity shimmer"
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
