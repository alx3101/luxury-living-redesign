import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Bed, Bath, Maximize, Car } from "lucide-react";
import type { Property } from "@/data/properties";

interface Props {
  property: Property;
  index?: number;
}

export default function PropertyCard({ property, index = 0 }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        to={`/immobile/${property.slug}`}
        className="group block bg-card rounded-sm overflow-hidden luxury-shadow hover:shadow-2xl transition-shadow duration-500"
      >
        <div className="relative overflow-hidden aspect-[4/3]">
          <img
            src={property.image}
            alt={property.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
          <span className="absolute top-4 left-4 bg-gold text-accent-foreground text-xs font-body uppercase tracking-wider px-3 py-1.5 rounded-sm">
            {property.contract}
          </span>
          <div className="absolute bottom-4 left-4">
            <p className="text-primary-foreground text-2xl font-display font-bold">
              {property.priceFormatted}
            </p>
          </div>
        </div>

        <div className="p-5">
          <p className="text-xs uppercase tracking-wider text-gold font-body mb-1">
            {property.type} · {property.category}
          </p>
          <h3 className="font-display text-lg font-semibold text-foreground mb-2 group-hover:text-gold transition-colors duration-300">
            {property.title}
          </h3>
          <p className="text-sm text-muted-foreground font-body mb-4 line-clamp-2">
            {property.shortDescription}
          </p>

          <div className="flex items-center gap-4 text-muted-foreground text-xs font-body border-t border-border pt-4">
            <span className="flex items-center gap-1.5">
              <Maximize className="w-3.5 h-3.5" /> {property.sqm} m²
            </span>
            <span className="flex items-center gap-1.5">
              <Bed className="w-3.5 h-3.5" /> {property.bedrooms}
            </span>
            <span className="flex items-center gap-1.5">
              <Bath className="w-3.5 h-3.5" /> {property.bathrooms}
            </span>
            <span className="flex items-center gap-1.5">
              <Car className="w-3.5 h-3.5" /> {property.garage}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
