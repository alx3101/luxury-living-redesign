import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Immobili", path: "/immobili" },
  { label: "Chi Siamo", path: "/chi-siamo" },
  { label: "Contatti", path: "/contatti" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => setMobileOpen(false), [location]);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-navy/95 backdrop-blur-md shadow-lg py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <span className="font-display text-2xl font-bold tracking-wide text-primary-foreground">
            SAN MARCO
          </span>
          <span className="hidden sm:inline font-body text-xs uppercase tracking-[0.3em] text-gold opacity-80">
            Real Estate
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`font-body text-sm uppercase tracking-[0.15em] transition-colors duration-300 ${
                location.pathname === item.path
                  ? "text-gold"
                  : "text-primary-foreground/80 hover:text-gold"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <a
            href="tel:+393276617744"
            className="flex items-center gap-2 bg-gold/20 border border-gold/30 px-4 py-2 rounded-sm text-gold text-sm font-body tracking-wider hover:bg-gold/30 transition-colors"
          >
            <Phone className="w-3.5 h-3.5" />
            327.6617744
          </a>
        </nav>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden text-primary-foreground"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-navy/98 backdrop-blur-lg border-t border-gold/10"
          >
            <div className="container mx-auto px-6 py-6 flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`font-body text-base uppercase tracking-[0.15em] py-2 ${
                    location.pathname === item.path
                      ? "text-gold"
                      : "text-primary-foreground/80"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
