import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Search, Bed, Bath, Maximize, Car } from "lucide-react";
import { properties } from "@/data/properties";
import PropertyCard from "@/components/PropertyCard";
import LeafletMap from "@/components/LeafletMap";
import hero2 from "@/assets/hero-2.jpg";

export default function PropertiesPage() {
  const [search, setSearch] = useState("");
  const [contractFilter, setContractFilter] = useState<string>("Tutti");
  const [categoryFilter, setCategoryFilter] = useState<string>("Tutti");

  const filtered = useMemo(() => {
    return properties.filter((p) => {
      const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.location.toLowerCase().includes(search.toLowerCase());
      const matchContract = contractFilter === "Tutti" || p.contract === contractFilter;
      const matchCategory = categoryFilter === "Tutti" || p.category === categoryFilter;
      return matchSearch && matchContract && matchCategory;
    });
  }, [search, contractFilter, categoryFilter]);

  return (
    <main>
      {/* Header */}
      <section
        className="relative h-[40vh] flex items-end pb-12 parallax-section"
        style={{ backgroundImage: `url(${hero2})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/40 to-foreground/20" />
        <div className="relative z-10 container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="text-gold uppercase tracking-[0.3em] text-sm font-body mb-2">Portfolio</p>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-primary-foreground">I Nostri Immobili</h1>
          </motion.div>
        </div>
      </section>

      {/* Map - always visible */}
      <section className="border-b border-border">
        <div className="h-[45vh] w-full">
          <LeafletMap properties={filtered} />
        </div>
      </section>

      {/* Filters */}
      <section className="bg-card border-b border-border sticky top-[60px] z-30 py-4">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Cerca per nome o località..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-muted border border-border rounded-sm text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/40"
              />
            </div>
            <select
              value={contractFilter}
              onChange={(e) => setContractFilter(e.target.value)}
              className="px-4 py-2.5 bg-muted border border-border rounded-sm text-sm font-body text-foreground focus:outline-none focus:ring-2 focus:ring-gold/40"
            >
              <option>Tutti</option>
              <option>Vendita</option>
              <option>Affitto</option>
            </select>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-2.5 bg-muted border border-border rounded-sm text-sm font-body text-foreground focus:outline-none focus:ring-2 focus:ring-gold/40"
            >
              <option>Tutti</option>
              <option>Appartamenti</option>
              <option>Villa</option>
            </select>
            <p className="text-muted-foreground text-sm font-body ml-auto">
              {filtered.length} immobili trovati
            </p>
          </div>
        </div>
      </section>

      {/* Properties Grid */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((p, i) => (
              <PropertyCard key={p.id} property={p} index={i} />
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground font-body text-lg">Nessun immobile trovato con i filtri selezionati.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
