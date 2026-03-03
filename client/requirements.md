## Packages
framer-motion | Required for page transitions, smooth section reveals, and complex UI animations
clsx | Utility for constructing className strings conditionally
tailwind-merge | Utility to merge Tailwind classes without style conflicts

## Notes
Tailwind Config - Please ensure the following fonts are extended if you update tailwind.config.ts, though I have handled it via CSS variables in index.css:
fontFamily: {
  display: ["var(--font-display)"],
  body: ["var(--font-body)"],
}

The main CTA links externally to WhatsApp (wa.me).
Icons are sourced from lucide-react.
Animations are powered by framer-motion.
