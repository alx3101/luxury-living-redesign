import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { properties } from "@/data/properties";
import PropertyCard from "@/components/PropertyCard";
import hero2 from "@/assets/hero-2.jpg";

const contractOptions = ["Tutti", "Vendita", "Affitto"];
const categoryOptions = ["Tutti", "Appartamenti", "Villa"];

export default function PropertiesPage() {
  const [search, setSearch] = useState("");
  const [contractFilter, setContractFilter] = useState("Tutti");
  const [categoryFilter, setCategoryFilter] = useState("Tutti");

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
        className="relative h-[45vh] flex items-end pb-16 parallax-section"
        style={{ backgroundImage: `url(${hero2})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        <div className="relative z-10 container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-gold uppercase tracking-[0.4em] text-xs font-body mb-3">Portfolio</p>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-white leading-tight">
              I Nostri Immobili
            </h1>
            <div className="elegant-divider mt-6" />
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-card border-b border-border sticky top-[60px] z-30 py-5">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap items-center gap-4">
            {/* Search */}
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Cerca per nome o località..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-muted/50 border border-border text-sm font-body text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-gold/50 transition-colors"
              />
            </div>

            {/* Contract pills */}
            <div className="flex gap-1">
              {contractOptions.map((opt) => (
                <button
                  key={opt}
                  onClick={() => setContractFilter(opt)}
                  className={`px-4 py-2.5 text-xs font-body uppercase tracking-wider transition-all duration-300 ${
                    contractFilter === opt
                      ? "bg-gold text-white"
                      : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>

            {/* Category pills */}
            <div className="flex gap-1">
              {categoryOptions.map((opt) => (
                <button
                  key={opt}
                  onClick={() => setCategoryFilter(opt)}
                  className={`px-4 py-2.5 text-xs font-body uppercase tracking-wider transition-all duration-300 ${
                    categoryFilter === opt
                      ? "bg-navy text-white"
                      : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>

            {/* Count */}
            <p className="text-muted-foreground text-xs font-body tracking-wider ml-auto">
              <span className="text-gold font-medium">{filtered.length}</span> immobili
            </p>
          </div>
        </div>
      </section>

      {/* Properties Grid */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
            {filtered.map((p, i) => (
              <PropertyCard key={p.id} property={p} index={i} />
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-24">
              <p className="font-display text-2xl text-foreground/30 mb-3">Nessun risultato</p>
              <p className="text-muted-foreground font-body text-sm">
                Prova a modificare i filtri di ricerca
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
