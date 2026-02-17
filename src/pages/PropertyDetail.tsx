import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import { Bed, Bath, Maximize, Car, MapPin, ChevronLeft, ChevronRight, Check, Phone, Mail, ArrowLeft } from "lucide-react";
import { properties } from "@/data/properties";
import AnimatedSection from "@/components/AnimatedSection";
import LeafletMap from "@/components/LeafletMap";

export default function PropertyDetail() {
  const { slug } = useParams();
  const property = properties.find((p) => p.slug === slug);
  const [currentImage, setCurrentImage] = useState(0);

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <h1 className="font-display text-3xl mb-4">Immobile non trovato</h1>
          <Link to="/immobili" className="text-gold hover:underline font-body">← Torna agli immobili</Link>
        </div>
      </div>
    );
  }

  const images = property.images;
  const nextImage = () => setCurrentImage((c) => (c + 1) % images.length);
  const prevImage = () => setCurrentImage((c) => (c - 1 + images.length) % images.length);

  return (
    <main className="pt-20">
      <div className="container mx-auto px-6 py-4">
        <Link to="/immobili" className="inline-flex items-center gap-2 text-muted-foreground hover:text-gold transition-colors font-body text-sm">
          <ArrowLeft className="w-4 h-4" /> Torna agli immobili
        </Link>
      </div>

      <section className="container mx-auto px-6 mb-12">
        <div className="relative rounded-sm overflow-hidden aspect-[16/7] luxury-shadow">
          <motion.img key={currentImage} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
            src={images[currentImage]} alt={property.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent" />
          {images.length > 1 && (
            <>
              <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass-card flex items-center justify-center text-primary-foreground hover:bg-gold/30 transition-colors">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass-card flex items-center justify-center text-primary-foreground hover:bg-gold/30 transition-colors">
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}
          <div className="absolute bottom-4 left-4">
            <span className="bg-gold text-accent-foreground text-xs font-body uppercase tracking-wider px-3 py-1.5 rounded-sm">{property.contract}</span>
          </div>
          <div className="absolute bottom-4 right-4 flex gap-2">
            {images.map((_, i) => (
              <button key={i} onClick={() => setCurrentImage(i)}
                className={`w-2 h-2 rounded-full transition-all ${i === currentImage ? "bg-gold w-6" : "bg-primary-foreground/50"}`} />
            ))}
          </div>
        </div>
        <div className="flex gap-3 mt-4 overflow-x-auto">
          {images.map((img, i) => (
            <button key={i} onClick={() => setCurrentImage(i)}
              className={`shrink-0 w-24 h-16 rounded-sm overflow-hidden border-2 transition-all ${i === currentImage ? "border-gold" : "border-transparent opacity-60 hover:opacity-100"}`}>
              <img src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-10">
            <AnimatedSection>
              <p className="text-gold text-sm uppercase tracking-[0.2em] font-body mb-2">{property.type} · {property.category}</p>
              <h1 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">{property.title}</h1>
              <div className="flex items-center gap-2 text-muted-foreground font-body text-sm mb-6">
                <MapPin className="w-4 h-4 text-gold" />{property.address}
              </div>
              <p className="font-display text-3xl font-bold gold-text-gradient">{property.priceFormatted}</p>
            </AnimatedSection>

            <AnimatedSection>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { icon: Maximize, label: "Superficie", value: `${property.sqm} m²` },
                  { icon: Bed, label: "Camere", value: `${property.bedrooms}` },
                  { icon: Bath, label: "Bagni", value: `${property.bathrooms}` },
                  { icon: Car, label: "Garage", value: `${property.garage}` },
                ].map((stat) => (
                  <div key={stat.label} className="bg-muted p-5 rounded-sm text-center">
                    <stat.icon className="w-6 h-6 text-gold mx-auto mb-2" />
                    <p className="font-display text-xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-muted-foreground text-xs font-body uppercase tracking-wider">{stat.label}</p>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">Descrizione</h2>
              <div className="elegant-divider mb-6" />
              <p className="text-muted-foreground font-body leading-relaxed">{property.description}</p>
            </AnimatedSection>

            <AnimatedSection>
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">Caratteristiche</h2>
              <div className="elegant-divider mb-6" />
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {property.features.map((f) => (
                  <div key={f} className="flex items-center gap-2 text-sm font-body text-muted-foreground">
                    <Check className="w-4 h-4 text-gold shrink-0" />{f}
                  </div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">Posizione</h2>
              <div className="elegant-divider mb-6" />
              <div className="rounded-sm overflow-hidden luxury-shadow h-[350px]">
                <LeafletMap properties={[property]} center={[property.lat, property.lng]} zoom={14} singleMarker />
              </div>
            </AnimatedSection>
          </div>

          <div className="space-y-6">
            <AnimatedSection delay={0.2}>
              <div className="bg-navy text-primary-foreground p-8 rounded-sm luxury-shadow sticky top-24">
                <h3 className="font-display text-xl font-semibold mb-2">Richiedi Informazioni</h3>
                <p className="text-primary-foreground/60 text-sm font-body mb-6">Contattaci per maggiori dettagli su questa proprietà.</p>
                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <input type="text" placeholder="Nome e Cognome"
                    className="w-full px-4 py-3 bg-navy-light/50 border border-primary-foreground/10 rounded-sm text-sm font-body text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none focus:border-gold/50" />
                  <input type="email" placeholder="Email"
                    className="w-full px-4 py-3 bg-navy-light/50 border border-primary-foreground/10 rounded-sm text-sm font-body text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none focus:border-gold/50" />
                  <input type="tel" placeholder="Telefono"
                    className="w-full px-4 py-3 bg-navy-light/50 border border-primary-foreground/10 rounded-sm text-sm font-body text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none focus:border-gold/50" />
                  <textarea placeholder="Messaggio" rows={4}
                    defaultValue={`Sono interessato all'immobile "${property.title}".`}
                    className="w-full px-4 py-3 bg-navy-light/50 border border-primary-foreground/10 rounded-sm text-sm font-body text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none focus:border-gold/50 resize-none" />
                  <button type="submit"
                    className="w-full gold-gradient text-accent-foreground py-3 rounded-sm font-body text-sm uppercase tracking-[0.15em] hover:opacity-90 transition-opacity">
                    Invia Richiesta
                  </button>
                </form>
                <div className="mt-6 pt-6 border-t border-primary-foreground/10 space-y-3">
                  <a href="tel:+393276617744" className="flex items-center gap-3 text-primary-foreground/70 hover:text-gold transition-colors text-sm font-body">
                    <Phone className="w-4 h-4 text-gold" /> 327.6617744
                  </a>
                  <a href="mailto:info@sanmarcorealestate.com" className="flex items-center gap-3 text-primary-foreground/70 hover:text-gold transition-colors text-sm font-body">
                    <Mail className="w-4 h-4 text-gold" /> info@sanmarcorealestate.com
                  </a>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </main>
  );
}
