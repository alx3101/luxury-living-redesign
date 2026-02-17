import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import {
  Bed, Bath, Maximize, Car, MapPin, ChevronLeft, ChevronRight,
  Check, Phone, Mail, ArrowLeft, Expand,
  ShoppingBag, GraduationCap, Stethoscope, Waves, UtensilsCrossed, TreePine
} from "lucide-react";
import { properties } from "@/data/properties";
import AnimatedSection from "@/components/AnimatedSection";
import LeafletMap, { type POI } from "@/components/LeafletMap";
import Lightbox from "@/components/Lightbox";

// POI database - simulated nearby points of interest based on locations
const allPOIs: (POI & { refLat: number; refLng: number })[] = [
  // Lignano Sabbiadoro area
  { name: "Spiaggia di Sabbiadoro", type: "Spiaggia", lat: 45.6945, lng: 13.1520, refLat: 45.69, refLng: 13.15 },
  { name: "Terrazza a Mare", type: "Monumento", lat: 45.6930, lng: 13.1490, refLat: 45.69, refLng: 13.15 },
  { name: "Centro Commerciale Sabbiadoro", type: "Shopping", lat: 45.6905, lng: 13.1470, refLat: 45.69, refLng: 13.15 },
  { name: "Parco del Mare", type: "Parco", lat: 45.6920, lng: 13.1560, refLat: 45.69, refLng: 13.15 },
  { name: "Farmacia Centrale", type: "Farmacia", lat: 45.6915, lng: 13.1505, refLat: 45.69, refLng: 13.15 },
  { name: "Ristorante La Terrazza", type: "Ristorante", lat: 45.6938, lng: 13.1545, refLat: 45.69, refLng: 13.15 },
  { name: "Scuola Elementare Lignano", type: "Scuola", lat: 45.6880, lng: 13.1450, refLat: 45.69, refLng: 13.15 },
  { name: "Marina Punta Faro", type: "Porto", lat: 45.6960, lng: 13.1600, refLat: 45.69, refLng: 13.15 },
  { name: "Ospedale di Latisana", type: "Ospedale", lat: 45.6870, lng: 13.1380, refLat: 45.69, refLng: 13.15 },
  { name: "Aquasplash", type: "Divertimento", lat: 45.6895, lng: 13.1420, refLat: 45.69, refLng: 13.15 },
  // Bibione area
  { name: "Spiaggia di Bibione", type: "Spiaggia", lat: 45.6400, lng: 13.0580, refLat: 45.638, refLng: 13.055 },
  { name: "Terme di Bibione", type: "Terme", lat: 45.6350, lng: 13.0520, refLat: 45.638, refLng: 13.055 },
  { name: "Faro di Bibione", type: "Monumento", lat: 45.6420, lng: 13.0600, refLat: 45.638, refLng: 13.055 },
  { name: "Supermercato Eurospin", type: "Shopping", lat: 45.6360, lng: 13.0540, refLat: 45.638, refLng: 13.055 },
  // Lignano Riviera
  { name: "Parco Hemingway", type: "Parco", lat: 45.6860, lng: 13.1180, refLat: 45.685, refLng: 13.12 },
  { name: "Golf Club Lignano", type: "Sport", lat: 45.6840, lng: 13.1150, refLat: 45.685, refLng: 13.12 },
  { name: "Ristorante Al Cason", type: "Ristorante", lat: 45.6855, lng: 13.1230, refLat: 45.685, refLng: 13.12 },
];

function getDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

const poiIconMap: Record<string, typeof ShoppingBag> = {
  "Shopping": ShoppingBag,
  "Scuola": GraduationCap,
  "Ospedale": Stethoscope,
  "Farmacia": Stethoscope,
  "Spiaggia": Waves,
  "Ristorante": UtensilsCrossed,
  "Parco": TreePine,
};

export default function PropertyDetail() {
  const { slug } = useParams();
  const property = properties.find((p) => p.slug === slug);
  const [currentImage, setCurrentImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const nearbyPOIs = useMemo(() => {
    if (!property) return [];
    return allPOIs
      .map((poi) => {
        const dist = getDistance(property.lat, property.lng, poi.lat, poi.lng);
        return { ...poi, distKm: dist, distance: dist < 1 ? `${Math.round(dist * 1000)}m` : `${dist.toFixed(1)}km` };
      })
      .filter((poi) => poi.distKm < 5)
      .sort((a, b) => a.distKm - b.distKm)
      .slice(0, 8);
  }, [property]);

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
      <Lightbox
        images={images}
        initialIndex={currentImage}
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />

      <div className="container mx-auto px-6 py-4">
        <Link to="/immobili" className="inline-flex items-center gap-2 text-muted-foreground hover:text-gold transition-colors font-body text-sm">
          <ArrowLeft className="w-4 h-4" /> Torna agli immobili
        </Link>
      </div>

      {/* Gallery - clickable */}
      <section className="container mx-auto px-6 mb-12">
        <div
          className="relative rounded-sm overflow-hidden aspect-[16/7] luxury-shadow cursor-pointer group"
          onClick={() => setLightboxOpen(true)}
        >
          <motion.img
            key={currentImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            src={images[currentImage]}
            alt={property.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent" />

          {/* Expand icon */}
          <div className="absolute top-4 right-4 w-10 h-10 rounded-full glass-card flex items-center justify-center text-primary-foreground opacity-0 group-hover:opacity-100 transition-opacity">
            <Expand className="w-5 h-5" />
          </div>

          {images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prevImage(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass-card flex items-center justify-center text-primary-foreground hover:bg-gold/30 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); nextImage(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass-card flex items-center justify-center text-primary-foreground hover:bg-gold/30 transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          <div className="absolute bottom-4 left-4">
            <span className="bg-gold text-accent-foreground text-xs font-body uppercase tracking-wider px-3 py-1.5 rounded-sm">
              {property.contract}
            </span>
          </div>

          <div className="absolute bottom-4 right-4 flex gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setCurrentImage(i); }}
                className={`w-2 h-2 rounded-full transition-all ${i === currentImage ? "bg-gold w-6" : "bg-primary-foreground/50"}`}
              />
            ))}
          </div>
        </div>

        {/* Thumbnails - also clickable for lightbox */}
        <div className="flex gap-3 mt-4 overflow-x-auto">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => { setCurrentImage(i); setLightboxOpen(true); }}
              className={`shrink-0 w-24 h-16 rounded-sm overflow-hidden border-2 transition-all hover:opacity-100 ${
                i === currentImage ? "border-gold" : "border-transparent opacity-60"
              }`}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </section>

      {/* Content */}
      <section className="container mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main */}
          <div className="lg:col-span-2 space-y-10">
            <AnimatedSection>
              <p className="text-gold text-sm uppercase tracking-[0.2em] font-body mb-2">
                {property.type} · {property.category}
              </p>
              <h1 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
                {property.title}
              </h1>
              <div className="flex items-center gap-2 text-muted-foreground font-body text-sm mb-6">
                <MapPin className="w-4 h-4 text-gold" />{property.address}
              </div>
              <p className="font-display text-3xl font-bold gold-text-gradient">
                {property.priceFormatted}
              </p>
            </AnimatedSection>

            {/* Stats */}
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

            {/* Description */}
            <AnimatedSection>
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">Descrizione</h2>
              <div className="elegant-divider mb-6" />
              <p className="text-muted-foreground font-body leading-relaxed">{property.description}</p>
            </AnimatedSection>

            {/* Features */}
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

            {/* Map with POIs */}
            <AnimatedSection>
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">Posizione e Dintorni</h2>
              <div className="elegant-divider mb-6" />
              <div className="rounded-sm overflow-hidden luxury-shadow h-[400px]">
                <LeafletMap
                  properties={[property]}
                  center={[property.lat, property.lng]}
                  zoom={14}
                  singleMarker
                  pois={nearbyPOIs}
                />
              </div>
            </AnimatedSection>

            {/* Nearby POIs list */}
            {nearbyPOIs.length > 0 && (
              <AnimatedSection>
                <h2 className="font-display text-2xl font-semibold text-foreground mb-4">Punti d'Interesse Vicini</h2>
                <div className="elegant-divider mb-6" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {nearbyPOIs.map((poi) => {
                    const Icon = poiIconMap[poi.type] || MapPin;
                    return (
                      <div
                        key={poi.name}
                        className="flex items-center gap-3 p-3 bg-muted rounded-sm"
                      >
                        <div className="w-9 h-9 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                          <Icon className="w-4 h-4 text-gold" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-body font-medium text-foreground truncate">{poi.name}</p>
                          <p className="text-xs font-body text-muted-foreground">{poi.type}</p>
                        </div>
                        <span className="text-xs font-body text-gold font-medium shrink-0">{poi.distance}</span>
                      </div>
                    );
                  })}
                </div>
              </AnimatedSection>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <AnimatedSection delay={0.2}>
              <div className="bg-navy text-primary-foreground p-8 rounded-sm luxury-shadow sticky top-24">
                <h3 className="font-display text-xl font-semibold mb-2">Richiedi Informazioni</h3>
                <p className="text-primary-foreground/60 text-sm font-body mb-6">
                  Contattaci per maggiori dettagli su questa proprietà.
                </p>
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
