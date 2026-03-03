import { motion, AnimatePresence } from "framer-motion";
import { X, Play } from "lucide-react";
import { useEffect } from "react";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function VideoModal({ isOpen, onClose }: VideoModalProps) {
  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-foreground/80 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-5xl aspect-video bg-foreground rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/20 z-10 flex items-center justify-center group cursor-pointer"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-primary text-white rounded-full transition-colors z-20"
            >
              <X className="w-5 h-5" />
            </button>
            
            {/* Generic Video Placeholder */}
            {/* landing page hero scenic mountain landscape */}
            <img
              src="https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=1920&h=1080&fit=crop"
              alt="Video thumbnail"
              className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            
            <div className="relative z-10 w-24 h-24 bg-primary/90 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(224,93,58,0.5)] group-hover:scale-110 transition-transform duration-300">
              <Play className="w-10 h-10 text-white ml-2" fill="currentColor" />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
