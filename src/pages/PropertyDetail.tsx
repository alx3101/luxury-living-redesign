import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useMemo, useCallback } from "react";
import {
  Bed, Bath, Maximize, Car, MapPin, ChevronLeft, ChevronRight,
  Check, Phone, Mail, ArrowLeft, Expand, Loader2,
  ShoppingBag, GraduationCap, Stethoscope, Waves, UtensilsCrossed, TreePine,
  Church, Dumbbell, Landmark, Hotel, Fuel, ParkingCircle, CreditCard, Building2
} from "lucide-react";
import { properties } from "@/data/properties";
import AnimatedSection from "@/components/AnimatedSection";
import LeafletMap from "@/components/LeafletMap";
import Lightbox from "@/components/Lightbox";
import { usePOIs, CATEGORY_COLORS, type POIResult } from "@/hooks/usePOIs";

const poiIconMap: Record<string, typeof ShoppingBag> = {
  Ristorante: UtensilsCrossed,
  Caffetteria: UtensilsCrossed,
  Bar: UtensilsCrossed,
  "Fast Food": UtensilsCrossed,
  Farmacia: Stethoscope,
  Ospedale: Stethoscope,
  Clinica: Stethoscope,
  Medico: Stethoscope,
  Dentista: Stethoscope,
  Scuola: GraduationCap,
  Asilo: GraduationCap,
  Banca: CreditCard,
  Bancomat: CreditCard,
  "Ufficio Postale": Building2,
  Distributore: Fuel,
  Parcheggio: ParkingCircle,
  Supermercato: ShoppingBag,
  "Centro Commerciale": ShoppingBag,
  Minimarket: ShoppingBag,
  Hotel: Hotel,
  Museo: Landmark,
  Attrazione: Landmark,
  Spiaggia: Waves,
  Parco: TreePine,
  Giardino: TreePine,
  "Centro Sportivo": Dumbbell,
  Piscina: Dumbbell,
  Palestra: Dumbbell,
  Chiesa: Church,
};

export default function PropertyDetail() {
  const { slug } = useParams();
  const property = properties.find((p) => p.slug === slug);
  const [currentImage, setCurrentImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeCategories, setActiveCategories] = useState<Set<string>>(new Set());
  const [flyToCoords, setFlyToCoords] = useState<[number, number] | null>(null);

  const { data: pois, isLoading: poisLoading } = usePOIs(property?.lat, property?.lng);

  const categories = useMemo(() => {
    if (!pois) return [];
    const cats = [...new Set(pois.map((p) => p.category))];
    return cats.sort();
  }, [pois]);

  const filteredPOIs = useMemo(() => {
    if (!pois) return [];
    if (activeCategories.size === 0) return pois.slice(0, 12);
    return pois.filter((p) => activeCategories.has(p.category)).slice(0, 12);
  }, [pois, activeCategories]);

  const mapPOIs = useMemo(() => {
    return filteredPOIs.map((p) => ({
      name: p.name,
      type: p.type,
      lat: p.lat,
      lng: p.lng,
      distance: p.distance,
    }));
  }, [filteredPOIs]);

  const toggleCategory = useCallback((cat: string) => {
    setActiveCategories((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
  }, []);

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <h1 className="font-display text-4xl mb-4 text-foreground/30">Immobile non trovato</h1>
          <Link to="/immobili" className="text-gold hover:underline font-body text-sm tracking-wider">
            ← Torna agli immobili
          </Link>
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

      {/* Breadcrumb */}
      <div className="container mx-auto px-6 py-5">
        <Link
          to="/immobili"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-gold transition-colors font-body text-xs uppercase tracking-wider group"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
          Torna agli immobili
        </Link>
      </div>

      {/* Full-bleed Gallery */}
      <section className="mb-12">
        <div
          className="relative overflow-hidden aspect-[16/7] cursor-pointer group"
          onClick={() => setLightboxOpen(true)}
        >
          <motion.img
            key={currentImage}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            src={images[currentImage]}
            alt={property.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />

          {/* Expand icon */}
          <div className="absolute top-6 right-6 w-12 h-12 glass-card flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105">
            <Expand className="w-5 h-5" />
          </div>

          {images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prevImage(); }}
                className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 glass-card flex items-center justify-center text-white hover:bg-gold/30 transition-all duration-300 opacity-0 group-hover:opacity-100"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); nextImage(); }}
                className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 glass-card flex items-center justify-center text-white hover:bg-gold/30 transition-all duration-300 opacity-0 group-hover:opacity-100"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          {/* Contract badge */}
          <div className="absolute bottom-6 left-6">
            <span className="bg-gold text-white text-[10px] font-body uppercase tracking-[0.2em] px-5 py-2">
              {property.contract}
            </span>
          </div>

          {/* Image dots */}
          <div className="absolute bottom-6 right-6 flex gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setCurrentImage(i); }}
                className={`h-[2px] transition-all duration-500 ${
                  i === currentImage ? "bg-gold w-8" : "bg-white/40 w-4"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Thumbnails */}
        <div className="container mx-auto px-6">
          <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => { setCurrentImage(i); }}
                className={`shrink-0 w-28 h-20 overflow-hidden border-2 transition-all duration-300 hover:opacity-100 ${
                  i === currentImage ? "border-gold opacity-100" : "border-transparent opacity-50"
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="container mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Main */}
          <div className="lg:col-span-2 space-y-12">
            {/* Title & Price */}
            <AnimatedSection>
              <p className="text-gold text-xs uppercase tracking-[0.3em] font-body mb-3 font-medium">
                {property.type} · {property.category}
              </p>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
                {property.title}
              </h1>
              <div className="flex items-center gap-2 text-muted-foreground font-body text-sm mb-8">
                <MapPin className="w-4 h-4 text-gold" />{property.address}
              </div>
              <p className="font-display text-4xl font-bold gold-text-gradient">
                {property.priceFormatted}
              </p>
            </AnimatedSection>

            {/* Stats Bar */}
            <AnimatedSection>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-y border-border">
                {[
                  { icon: Maximize, label: "Superficie", value: `${property.sqm} m²` },
                  { icon: Bed, label: "Camere", value: `${property.bedrooms}` },
                  { icon: Bath, label: "Bagni", value: `${property.bathrooms}` },
                  { icon: Car, label: "Garage", value: `${property.garage}` },
                ].map((stat) => (
                  <div key={stat.label} className="flex items-center gap-3 p-3">
                    <stat.icon className="w-5 h-5 text-gold shrink-0" />
                    <div>
                      <p className="font-display text-xl font-bold text-foreground leading-none">{stat.value}</p>
                      <p className="text-muted-foreground text-[10px] font-body uppercase tracking-wider mt-1">{stat.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            {/* Description */}
            <AnimatedSection>
              <div className="flex items-center gap-4 mb-6">
                <h2 className="font-display text-2xl font-semibold text-foreground">Descrizione</h2>
                <div className="flex-1 h-[1px] bg-border" />
              </div>
              <p className="text-muted-foreground font-body leading-[1.8] text-[15px]">{property.description}</p>
            </AnimatedSection>

            {/* Features */}
            <AnimatedSection>
              <div className="flex items-center gap-4 mb-6">
                <h2 className="font-display text-2xl font-semibold text-foreground">Caratteristiche</h2>
                <div className="flex-1 h-[1px] bg-border" />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {property.features.map((f) => (
                  <div
                    key={f}
                    className="flex items-center gap-3 text-sm font-body text-muted-foreground p-3 hover:bg-muted/50 transition-colors"
                  >
                    <div className="w-5 h-5 flex items-center justify-center border border-gold/40">
                      <Check className="w-3 h-3 text-gold" />
                    </div>
                    {f}
                  </div>
                ))}
              </div>
            </AnimatedSection>

            {/* Map with POIs */}
            <AnimatedSection>
              <div className="flex items-center gap-4 mb-6">
                <h2 className="font-display text-2xl font-semibold text-foreground">Posizione e Dintorni</h2>
                <div className="flex-1 h-[1px] bg-border" />
              </div>

              {/* Category filter chips */}
              {categories.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => toggleCategory(cat)}
                      className={`px-3 py-1.5 text-[10px] font-body uppercase tracking-wider transition-all duration-300 border ${
                        activeCategories.has(cat)
                          ? "border-gold bg-gold text-white"
                          : "border-border text-muted-foreground hover:border-gold/50 hover:text-foreground"
                      }`}
                    >
                      <span
                        className="inline-block w-2 h-2 rounded-full mr-2"
                        style={{ backgroundColor: CATEGORY_COLORS[cat] || "#999" }}
                      />
                      {cat}
                    </button>
                  ))}
                </div>
              )}

              <div className="overflow-hidden luxury-shadow h-[500px]">
                <LeafletMap
                  properties={[property]}
                  center={[property.lat, property.lng]}
                  zoom={14}
                  singleMarker
                  pois={mapPOIs}
                  flyTo={flyToCoords}
                />
              </div>
            </AnimatedSection>

            {/* Nearby POIs list */}
            <AnimatedSection>
              <div className="flex items-center gap-4 mb-6">
                <h2 className="font-display text-2xl font-semibold text-foreground">Punti d'Interesse</h2>
                <div className="flex-1 h-[1px] bg-border" />
                {poisLoading && <Loader2 className="w-4 h-4 text-gold animate-spin" />}
              </div>

              {poisLoading && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-3 p-4 bg-muted/50 animate-pulse">
                      <div className="w-10 h-10 rounded-full bg-muted" />
                      <div className="flex-1 space-y-2">
                        <div className="h-3 bg-muted rounded w-2/3" />
                        <div className="h-2 bg-muted rounded w-1/3" />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {!poisLoading && filteredPOIs.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {filteredPOIs.map((poi) => {
                    const Icon = poiIconMap[poi.type] || MapPin;
                    const color = CATEGORY_COLORS[poi.category] || "#999";
                    return (
                      <button
                        key={`${poi.name}-${poi.lat}`}
                        onClick={() => setFlyToCoords([poi.lat, poi.lng])}
                        className="flex items-center gap-3 p-4 bg-muted/30 hover:bg-muted/60 transition-all duration-300 text-left group"
                      >
                        <div
                          className="w-10 h-10 flex items-center justify-center shrink-0 transition-colors"
                          style={{ backgroundColor: `${color}15`, border: `1px solid ${color}30` }}
                        >
                          <Icon className="w-4 h-4" style={{ color }} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-body font-medium text-foreground truncate group-hover:text-gold transition-colors">
                            {poi.name}
                          </p>
                          <p className="text-[10px] font-body text-muted-foreground uppercase tracking-wider">
                            {poi.type}
                          </p>
                        </div>
                        <span className="text-xs font-body text-gold font-medium shrink-0 tabular-nums">
                          {poi.distance}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}

              {!poisLoading && filteredPOIs.length === 0 && pois && pois.length === 0 && (
                <p className="text-muted-foreground font-body text-sm text-center py-8">
                  Nessun punto d'interesse trovato nelle vicinanze
                </p>
              )}
            </AnimatedSection>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <AnimatedSection delay={0.2}>
              <div className="bg-navy text-white p-8 luxury-shadow sticky top-24 relative overflow-hidden">
                {/* Gold accent corner */}
                <div className="absolute top-0 right-0 w-20 h-20">
                  <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-gold/10 to-transparent" />
                </div>

                <h3 className="font-display text-xl font-semibold mb-2">Richiedi Informazioni</h3>
                <p className="text-white/50 text-sm font-body mb-8">
                  Contattaci per maggiori dettagli su questa proprietà.
                </p>

                <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                  <input
                    type="text"
                    placeholder="Nome e Cognome"
                    className="luxury-input-dark"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    className="luxury-input-dark"
                  />
                  <input
                    type="tel"
                    placeholder="Telefono"
                    className="luxury-input-dark"
                  />
                  <textarea
                    placeholder="Messaggio"
                    rows={4}
                    defaultValue={`Sono interessato all'immobile "${property.title}".`}
                    className="luxury-input-dark resize-none"
                  />
                  <button
                    type="submit"
                    className="w-full gold-gradient text-white py-4 font-body text-xs uppercase tracking-[0.2em] hover:opacity-90 transition-opacity shimmer"
                  >
                    Invia Richiesta
                  </button>
                </form>

                <div className="mt-8 pt-8 border-t border-white/10 space-y-4">
                  <a
                    href="tel:+393276617744"
                    className="flex items-center gap-3 text-white/60 hover:text-gold transition-colors text-sm font-body group"
                  >
                    <Phone className="w-4 h-4 text-gold group-hover:scale-110 transition-transform" />
                    327.661.7744
                  </a>
                  <a
                    href="mailto:info@sanmarcorealestate.com"
                    className="flex items-center gap-3 text-white/60 hover:text-gold transition-colors text-sm font-body group"
                  >
                    <Mail className="w-4 h-4 text-gold group-hover:scale-110 transition-transform" />
                    info@sanmarcorealestate.com
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
