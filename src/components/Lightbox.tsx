import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface Props {
  images: string[];
  initialIndex?: number;
  open: boolean;
  onClose: () => void;
}

export default function Lightbox({ images, initialIndex = 0, open, onClose }: Props) {
  const [current, setCurrent] = useState(initialIndex);

  useEffect(() => {
    if (open) setCurrent(initialIndex);
  }, [open, initialIndex]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setCurrent((c) => (c + 1) % images.length);
      if (e.key === "ArrowLeft") setCurrent((c) => (c - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, images.length, onClose]);

  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center"
        onClick={onClose}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-foreground/90 backdrop-blur-sm" />

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full glass-card flex items-center justify-center text-primary-foreground hover:bg-gold/30 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Image */}
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="relative z-10 max-w-[90vw] max-h-[85vh]"
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={images[current]}
            alt=""
            className="max-w-full max-h-[85vh] object-contain rounded-sm"
          />
        </motion.div>

        {/* Navigation */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); setCurrent((c) => (c - 1 + images.length) % images.length); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full glass-card flex items-center justify-center text-primary-foreground hover:bg-gold/30 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); setCurrent((c) => (c + 1) % images.length); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full glass-card flex items-center justify-center text-primary-foreground hover:bg-gold/30 transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}

        {/* Counter & thumbnails */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex items-center gap-4">
          <span className="text-primary-foreground/70 text-sm font-body">
            {current + 1} / {images.length}
          </span>
          <div className="flex gap-2">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setCurrent(i); }}
                className={`w-12 h-8 rounded-sm overflow-hidden border-2 transition-all ${
                  i === current ? "border-gold" : "border-transparent opacity-50 hover:opacity-80"
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
