import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, X, ChevronDown, RotateCcw } from "lucide-react";
import { properties } from "@/data/properties";
import PropertyCard from "@/components/PropertyCard";
import hero2 from "@/assets/hero-2.jpg";

/* ── Filter options matching the original site ── */

const contractOptions = ["Qualsiasi", "Vendita", "Affitto"] as const;

const propertyTypes: Record<string, string[]> = {
  Residenziale: ["Appartamenti", "Garage", "Villa"],
  Commerciale: ["Magazzino", "Negozio", "Ufficio"],
  Terreno: [],
  "Posto Barca": [],
};

const locationOptions = [
  "Lignano Sabbiadoro",
  "Lignano Pineta",
  "Lignano Riviera",
  "Bibione",
];

const featureOptions = [
  "Allarme Anti Incendio",
  "Arredato",
  "Ascensore",
  "Box Auto",
  "Caminetto",
  "Cantina",
  "Climatizzazione",
  "Doppio Lavandino",
  "Finiture Di Pregio",
  "Garage",
  "Giardino",
  "Giardino Privato",
  "Home Theater",
  "Imp. Allarme",
  "Lavanderia",
  "Pavimenti In Marmo",
  "Piscina",
  "Posto Auto",
  "Riscaldamento",
  "Riscaldamento Autonomo",
  "Uscita Di Emergenza",
  "Vista Mare",
  "Wifi",
];

const roomOptions = ["Qualsiasi", "1+", "2+", "3+", "4+", "5+"];
const bathOptions = ["Qualsiasi", "1+", "2+", "3+"];

/* ── Luxury select component ── */

function LuxurySelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[10px] uppercase tracking-[0.2em] text-gold font-body">{label}</label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none bg-muted/50 border border-border px-4 py-2.5 pr-10 text-sm font-body text-foreground focus:outline-none focus:border-gold/50 transition-colors cursor-pointer"
        >
          {options.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
      </div>
    </div>
  );
}

/* ── Number input component ── */

function LuxuryNumberInput({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[10px] uppercase tracking-[0.2em] text-gold font-body">{label}</label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-muted/50 border border-border px-4 py-2.5 text-sm font-body text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-gold/50 transition-colors"
      />
    </div>
  );
}

/* ── Main page ── */

export default function PropertiesPage() {
  const [search, setSearch] = useState("");
  const [contractFilter, setContractFilter] = useState("Qualsiasi");
  const [typeFilter, setTypeFilter] = useState("Tutti i tipi");
  const [categoryFilter, setCategoryFilter] = useState("Qualsiasi");
  const [locationFilter, setLocationFilter] = useState("Tutte le località");
  const [roomsMin, setRoomsMin] = useState("Qualsiasi");
  const [bathsMin, setBathsMin] = useState("Qualsiasi");
  const [sqmMin, setSqmMin] = useState("");
  const [sqmMax, setSqmMax] = useState("");
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showFeatures, setShowFeatures] = useState(false);

  // Count active filters (excluding defaults)
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (search) count++;
    if (contractFilter !== "Qualsiasi") count++;
    if (typeFilter !== "Tutti i tipi") count++;
    if (categoryFilter !== "Qualsiasi") count++;
    if (locationFilter !== "Tutte le località") count++;
    if (roomsMin !== "Qualsiasi") count++;
    if (bathsMin !== "Qualsiasi") count++;
    if (sqmMin) count++;
    if (sqmMax) count++;
    count += selectedFeatures.length;
    return count;
  }, [search, contractFilter, typeFilter, categoryFilter, locationFilter, roomsMin, bathsMin, sqmMin, sqmMax, selectedFeatures]);

  const resetFilters = useCallback(() => {
    setSearch("");
    setContractFilter("Qualsiasi");
    setTypeFilter("Tutti i tipi");
    setCategoryFilter("Qualsiasi");
    setLocationFilter("Tutte le località");
    setRoomsMin("Qualsiasi");
    setBathsMin("Qualsiasi");
    setSqmMin("");
    setSqmMax("");
    setSelectedFeatures([]);
  }, []);

  const toggleFeature = useCallback((feature: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(feature)
        ? prev.filter((f) => f !== feature)
        : [...prev, feature]
    );
  }, []);

  // Available sub-categories based on selected type
  const availableCategories = useMemo(() => {
    if (typeFilter === "Tutti i tipi") {
      return Object.values(propertyTypes).flat();
    }
    return propertyTypes[typeFilter] || [];
  }, [typeFilter]);

  // Filter properties
  const filtered = useMemo(() => {
    return properties.filter((p) => {
      // Search
      if (search) {
        const q = search.toLowerCase();
        const matchSearch =
          p.title.toLowerCase().includes(q) ||
          p.location.toLowerCase().includes(q) ||
          p.address.toLowerCase().includes(q);
        if (!matchSearch) return false;
      }

      // Contract
      if (contractFilter !== "Qualsiasi" && p.contract !== contractFilter) return false;

      // Type
      if (typeFilter !== "Tutti i tipi" && p.type !== typeFilter) return false;

      // Category (sub-type)
      if (categoryFilter !== "Qualsiasi" && p.category !== categoryFilter) return false;

      // Location
      if (locationFilter !== "Tutte le località" && p.location !== locationFilter) return false;

      // Rooms min
      if (roomsMin !== "Qualsiasi") {
        const min = parseInt(roomsMin);
        if (p.bedrooms < min) return false;
      }

      // Baths min
      if (bathsMin !== "Qualsiasi") {
        const min = parseInt(bathsMin);
        if (p.bathrooms < min) return false;
      }

      // SQM range
      if (sqmMin && p.sqm < parseInt(sqmMin)) return false;
      if (sqmMax && p.sqm > parseInt(sqmMax)) return false;

      // Features
      if (selectedFeatures.length > 0) {
        const propFeatsLower = p.features.map((f) => f.toLowerCase());
        const allMatch = selectedFeatures.every((sf) =>
          propFeatsLower.some((pf) => pf.includes(sf.toLowerCase()))
        );
        if (!allMatch) return false;
      }

      return true;
    });
  }, [search, contractFilter, typeFilter, categoryFilter, locationFilter, roomsMin, bathsMin, sqmMin, sqmMax, selectedFeatures]);

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
      <section className="bg-card border-b border-border sticky top-[60px] z-30">
        <div className="container mx-auto px-6">
          {/* Main filter bar */}
          <div className="flex flex-wrap items-center gap-3 py-4">
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
                  {opt === "Qualsiasi" ? "Tutti" : opt}
                </button>
              ))}
            </div>

            {/* Advanced toggle */}
            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs font-body uppercase tracking-wider transition-all duration-300 border ${
                showAdvanced || activeFilterCount > 0
                  ? "border-gold text-gold bg-gold/5"
                  : "border-border text-muted-foreground hover:border-gold/50 hover:text-foreground"
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              Filtri
              {activeFilterCount > 0 && (
                <span className="bg-gold text-white text-[10px] w-5 h-5 flex items-center justify-center -mr-1">
                  {activeFilterCount}
                </span>
              )}
            </button>

            {/* Reset */}
            {activeFilterCount > 0 && (
              <button
                onClick={resetFilters}
                className="flex items-center gap-1.5 px-3 py-2.5 text-xs font-body text-muted-foreground hover:text-gold transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                Reset
              </button>
            )}

            {/* Count */}
            <p className="text-muted-foreground text-xs font-body tracking-wider ml-auto hidden sm:block">
              <span className="text-gold font-medium">{filtered.length}</span> immobili
            </p>
          </div>

          {/* Advanced filters panel */}
          <AnimatePresence>
            {showAdvanced && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <div className="border-t border-border py-6 space-y-6">
                  {/* Row 1: Type, Category, Location, Contract */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <LuxurySelect
                      label="Tipo Proprietà"
                      value={typeFilter}
                      options={["Tutti i tipi", ...Object.keys(propertyTypes)]}
                      onChange={(v) => {
                        setTypeFilter(v);
                        setCategoryFilter("Qualsiasi");
                      }}
                    />
                    <LuxurySelect
                      label="Categoria"
                      value={categoryFilter}
                      options={["Qualsiasi", ...availableCategories]}
                      onChange={setCategoryFilter}
                    />
                    <LuxurySelect
                      label="Località"
                      value={locationFilter}
                      options={["Tutte le località", ...locationOptions]}
                      onChange={setLocationFilter}
                    />
                    <LuxurySelect
                      label="Contratto"
                      value={contractFilter}
                      options={[...contractOptions]}
                      onChange={setContractFilter}
                    />
                  </div>

                  {/* Row 2: Rooms, Baths, SQM range */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <LuxurySelect
                      label="Camere Min"
                      value={roomsMin}
                      options={roomOptions}
                      onChange={setRoomsMin}
                    />
                    <LuxurySelect
                      label="Bagni Min"
                      value={bathsMin}
                      options={bathOptions}
                      onChange={setBathsMin}
                    />
                    <LuxuryNumberInput
                      label="Metri Min (mq)"
                      value={sqmMin}
                      onChange={setSqmMin}
                      placeholder="es. 50"
                    />
                    <LuxuryNumberInput
                      label="Metri Max (mq)"
                      value={sqmMax}
                      onChange={setSqmMax}
                      placeholder="es. 200"
                    />
                  </div>

                  {/* Features toggle */}
                  <div>
                    <button
                      onClick={() => setShowFeatures(!showFeatures)}
                      className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-gold font-body mb-3 hover:text-gold/80 transition-colors"
                    >
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${showFeatures ? "rotate-180" : ""}`} />
                      Altre opzioni
                      {selectedFeatures.length > 0 && (
                        <span className="text-muted-foreground normal-case tracking-normal">
                          ({selectedFeatures.length} selezionate)
                        </span>
                      )}
                    </button>

                    <AnimatePresence>
                      {showFeatures && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden"
                        >
                          <div className="flex flex-wrap gap-2 pt-1 pb-2">
                            {featureOptions.map((feature) => {
                              const isActive = selectedFeatures.includes(feature);
                              return (
                                <button
                                  key={feature}
                                  onClick={() => toggleFeature(feature)}
                                  className={`px-3 py-1.5 text-[11px] font-body transition-all duration-300 border ${
                                    isActive
                                      ? "border-gold bg-gold/10 text-gold"
                                      : "border-border text-muted-foreground hover:border-gold/30 hover:text-foreground"
                                  }`}
                                >
                                  {isActive && <span className="mr-1">✓</span>}
                                  {feature}
                                </button>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Active filters chips */}
                  {selectedFeatures.length > 0 && (
                    <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-border">
                      <span className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground font-body">Filtri attivi:</span>
                      {selectedFeatures.map((f) => (
                        <button
                          key={f}
                          onClick={() => toggleFeature(f)}
                          className="flex items-center gap-1 px-2.5 py-1 bg-gold/10 border border-gold/20 text-gold text-[11px] font-body hover:bg-gold/20 transition-colors"
                        >
                          {f}
                          <X className="w-3 h-3" />
                        </button>
                      ))}
                      <button
                        onClick={() => setSelectedFeatures([])}
                        className="text-[11px] font-body text-muted-foreground hover:text-gold transition-colors underline"
                      >
                        Rimuovi tutti
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Mobile count */}
      <div className="sm:hidden bg-card border-b border-border py-2 px-6">
        <p className="text-muted-foreground text-xs font-body tracking-wider text-center">
          <span className="text-gold font-medium">{filtered.length}</span> immobili trovati
        </p>
      </div>

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
              <p className="text-muted-foreground font-body text-sm mb-6">
                Prova a modificare i filtri di ricerca
              </p>
              <button
                onClick={resetFilters}
                className="inline-flex items-center gap-2 px-6 py-3 border border-gold text-gold text-xs font-body uppercase tracking-wider hover:bg-gold hover:text-white transition-all duration-300"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Resetta filtri
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
