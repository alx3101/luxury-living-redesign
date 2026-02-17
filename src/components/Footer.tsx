import { Link } from "react-router-dom";
import { MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-navy text-primary-foreground">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="font-display text-2xl font-bold mb-2">SAN MARCO</h3>
            <p className="text-xs uppercase tracking-[0.3em] text-gold mb-6">Real Estate</p>
            <p className="text-primary-foreground/60 text-sm leading-relaxed font-body">
              Il nostro impegno, la vostra soddisfazione. Da oltre 25 anni al servizio
              dell'eccellenza immobiliare sulla costa adriatica.
            </p>
          </div>

          <div>
            <h4 className="font-display text-lg mb-6">Navigazione</h4>
            <div className="flex flex-col gap-3">
              {[
                { label: "Home", path: "/" },
                { label: "Immobili", path: "/immobili" },
                { label: "Chi Siamo", path: "/chi-siamo" },
                { label: "Contatti", path: "/contatti" },
              ].map((l) => (
                <Link
                  key={l.path}
                  to={l.path}
                  className="text-primary-foreground/60 hover:text-gold transition-colors text-sm font-body"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display text-lg mb-6">Contatti</h4>
            <div className="flex flex-col gap-4 text-sm font-body">
              <div className="flex items-start gap-3 text-primary-foreground/60">
                <MapPin className="w-4 h-4 mt-0.5 text-gold shrink-0" />
                <span>Viale Venezia 1/G – 33054<br />Lignano Sabbiadoro (UD)</span>
              </div>
              <a href="tel:+393276617744" className="flex items-center gap-3 text-primary-foreground/60 hover:text-gold transition-colors">
                <Phone className="w-4 h-4 text-gold" />
                327.6617744
              </a>
              <a href="mailto:info@sanmarcorealestate.com" className="flex items-center gap-3 text-primary-foreground/60 hover:text-gold transition-colors">
                <Mail className="w-4 h-4 text-gold" />
                info@sanmarcorealestate.com
              </a>
            </div>
          </div>
        </div>

        <div className="elegant-divider mx-auto mt-12 mb-8" />

        <div className="text-center text-primary-foreground/40 text-xs font-body space-y-1">
          <p>SAN MARCO REAL ESTATE SRL – P.IVA 03023620309 – REA UD-359116</p>
          <p>© {new Date().getFullYear()} San Marco Real Estate. Tutti i diritti riservati.</p>
        </div>
      </div>
    </footer>
  );
}
