import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";
import { MapPin, Phone, Mail, ArrowUp, Instagram, Facebook } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-navy text-white relative">
      {/* Gold line at top */}
      <div className="h-[2px] gold-gradient" />

      <div className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            {/* Logo */}
            <Link to="/" className="shrink-0 mb-6">
              <img
                src={logo}
                alt="San Marco Real Estate"
                className="h-10 md:h-12 w-auto mb-6"
              />
            </Link>
            <p className="text-white/40 text-sm leading-relaxed font-body">
              Agenzia immobiliare specializzata in proprietà di pregio a Lignano Sabbiadoro
              e Bibione. Dal 2021 al servizio dell'eccellenza immobiliare.
            </p>
            <div className="flex gap-3 mt-6">
              {[
                { icon: Instagram, label: "Instagram" },
                { icon: Facebook, label: "Facebook" },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  className="w-9 h-9 border border-white/10 flex items-center justify-center text-white/40 hover:border-gold hover:text-gold transition-all duration-300"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-body text-[10px] uppercase tracking-[0.3em] text-gold mb-6">Navigazione</h4>
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
                  className="text-white/40 hover:text-gold transition-colors text-sm font-body group flex items-center gap-2"
                >
                  <span className="w-0 h-[1px] bg-gold transition-all duration-300 group-hover:w-3" />
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-body text-[10px] uppercase tracking-[0.3em] text-gold mb-6">Contatti</h4>
            <div className="flex flex-col gap-4 text-sm font-body">
              <div className="flex items-start gap-3 text-white/40">
                <MapPin className="w-4 h-4 mt-0.5 text-gold shrink-0" />
                <span>Viale Venezia 1/G – 33054<br />Lignano Sabbiadoro (UD)</span>
              </div>
              <a href="tel:+393276617744" className="flex items-center gap-3 text-white/40 hover:text-gold transition-colors">
                <Phone className="w-4 h-4 text-gold" />
                327.661.7744
              </a>
              <a href="mailto:info@sanmarcorealestate.com" className="flex items-center gap-3 text-white/40 hover:text-gold transition-colors">
                <Mail className="w-4 h-4 text-gold" />
                info@sanmarcorealestate.com
              </a>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-body text-[10px] uppercase tracking-[0.3em] text-gold mb-6">Newsletter</h4>
            <p className="text-white/40 text-sm font-body mb-4 leading-relaxed">
              Ricevi le ultime novità sulle nostre proprietà esclusive.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
              <input
                type="email"
                placeholder="La tua email"
                className="flex-1 px-4 py-2.5 bg-transparent border border-white/10 text-white text-sm font-body placeholder:text-white/30 focus:outline-none focus:border-gold/50 transition-colors"
              />
              <button
                type="submit"
                className="px-4 py-2.5 bg-gold text-white text-xs font-body uppercase tracking-wider hover:opacity-80 transition-opacity"
              >
                Iscriviti
              </button>
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-white/20 text-[11px] font-body space-y-1 text-center md:text-left">
            <p>SAN MARCO REAL ESTATE SRL – P.IVA 03023620309 – REA UD-359116</p>
            <p>© {new Date().getFullYear()} San Marco Real Estate. Tutti i diritti riservati.</p>
          </div>

          <button
            onClick={scrollToTop}
            className="w-10 h-10 border border-white/10 flex items-center justify-center text-white/30 hover:border-gold hover:text-gold transition-all duration-300 group"
          >
            <ArrowUp className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
