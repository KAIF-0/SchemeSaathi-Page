import { motion } from "framer-motion";
import { UserCircle, BrainCircuit, FileText, Sparkles, MessageCircle } from "lucide-react";

const nodes = [
  { id: 1, label: "User Profile", icon: UserCircle, desc: "Zero-form inputs" },
  { id: 2, label: "Semantic Match", icon: BrainCircuit, desc: "AI-driven analysis" },
  { id: 3, label: "Document Parse", icon: FileText, desc: "Real-time verification" },
  { id: 4, label: "Recommendation", icon: Sparkles, desc: "Highly accurate curation" },
  { id: 5, label: "WhatsApp Delivery", icon: MessageCircle, desc: "Instant hyper-local alerts" },
];

export function AnimatedProcessBeam() {
  return (
    <div className="relative w-full max-w-5xl mx-auto py-12 px-4">
      {/* Connecting Line Background */}
      <div className="absolute top-1/2 left-0 w-full h-1 bg-border -translate-y-1/2 hidden md:block rounded-full overflow-hidden">
        <motion.div 
          className="h-full bg-gradient-to-r from-primary via-secondary to-primary w-1/3"
          animate={{ x: ["-100%", "300%"] }}
          transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
        />
      </div>

      <div className="absolute left-1/2 top-0 h-full w-1 bg-border -translate-x-1/2 md:hidden rounded-full overflow-hidden">
        <motion.div 
          className="w-full bg-gradient-to-b from-primary via-secondary to-primary h-1/3"
          animate={{ y: ["-100%", "300%"] }}
          transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
        />
      </div>

      {/* Nodes */}
      <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8 md:gap-4">
        {nodes.map((node, index) => (
          <motion.div 
            key={node.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 }}
            className="flex flex-col items-center text-center group w-full md:w-auto"
          >
            <div className="w-16 h-16 md:w-20 md:h-20 bg-card border-2 border-primary/20 rounded-2xl flex items-center justify-center shadow-lg group-hover:border-primary group-hover:shadow-primary/20 transition-all duration-300 group-hover:-translate-y-2 relative overflow-hidden">
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <node.icon className="w-8 h-8 md:w-10 md:h-10 text-primary relative z-10" />
            </div>
            <div className="mt-4 bg-background/80 backdrop-blur-sm px-3 py-1 rounded-lg">
              <h4 className="font-bold text-foreground text-sm md:text-base whitespace-nowrap">{node.label}</h4>
              <p className="text-xs text-muted-foreground mt-1 hidden md:block whitespace-nowrap">{node.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
