import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Bed, Bath, Maximize, Car, MapPin, ArrowUpRight } from "lucide-react";
import type { Property } from "@/data/properties";

interface Props {
  property: Property;
  index?: number;
}

export default function PropertyCard({ property, index = 0 }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col h-full"
    >
      <Link
        to={`/immobile/${property.slug}`}
        className="group flex flex-col bg-card overflow-hidden h-full gold-line-top relative"
      >
        {/* Image */}
        <div className="relative overflow-hidden aspect-[4/3]">
          <img
            src={property.image}
            alt={property.title}
            className="w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {/* Contract badge */}
          <span className="absolute top-5 left-5 bg-gold/90 backdrop-blur-sm text-white text-[10px] font-body uppercase tracking-[0.2em] px-4 py-1.5">
            {property.contract}
          </span>

          {/* Price - frosted glass */}
          <div className="absolute bottom-5 left-5">
            <div className="glass-card px-4 py-2">
              <p className="text-white text-xl font-display font-bold tracking-wide">
                {property.priceFormatted}
              </p>
            </div>
          </div>

          {/* Arrow icon */}
          <div className="absolute bottom-5 right-5 w-10 h-10 flex items-center justify-center bg-gold/0 border border-white/30 text-white/70 transition-all duration-500 group-hover:bg-gold group-hover:border-gold group-hover:text-white">
            <ArrowUpRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-1">
          <p className="text-[10px] uppercase tracking-[0.25em] text-gold font-body mb-2 font-medium">
            {property.type} · {property.category}
          </p>
          <h3 className="font-display text-lg font-semibold text-foreground mb-2 group-hover:text-gold transition-colors duration-500 line-clamp-1">
            {property.title}
          </h3>
          <div className="flex items-center gap-1.5 text-muted-foreground text-xs font-body mb-4">
            <MapPin className="w-3 h-3 text-gold" />
            {property.location}
          </div>
          <p className="text-sm text-muted-foreground font-body mb-5 line-clamp-2 leading-relaxed min-h-[2.8em]">
            {property.shortDescription}
          </p>

          {/* Stats divider */}
          <div className="flex items-center justify-between text-muted-foreground text-xs font-body border-t border-border pt-4 mt-auto">
            <span className="flex items-center gap-1.5 hover:text-gold transition-colors">
              <Maximize className="w-3.5 h-3.5" /> {property.sqm} m²
            </span>
            <span className="w-[1px] h-3 bg-border" />
            <span className="flex items-center gap-1.5 hover:text-gold transition-colors">
              <Bed className="w-3.5 h-3.5" /> {property.bedrooms}
            </span>
            <span className="w-[1px] h-3 bg-border" />
            <span className="flex items-center gap-1.5 hover:text-gold transition-colors">
              <Bath className="w-3.5 h-3.5" /> {property.bathrooms}
            </span>
            <span className="w-[1px] h-3 bg-border" />
            <span className="flex items-center gap-1.5 hover:text-gold transition-colors">
              <Car className="w-3.5 h-3.5" /> {property.garage}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
