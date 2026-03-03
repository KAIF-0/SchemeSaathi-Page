import { motion } from "framer-motion";
import { 
  Database, 
  FileText, 
  MessageSquare, 
  Search, 
  Layout, 
  Cpu, 
  User,
  Share2
} from "lucide-react";
import React, { useRef } from "react";
import { cn } from "@/lib/utils";

const Circle = React.forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 border-border bg-white p-3 shadow-[0_8px_16px_rgba(0,0,0,0.08)]",
        className,
      )}
    >
      {children}
    </div>
  );
});

Circle.displayName = "Circle";

export function AnimatedProcessBeam() {
  const containerRef = useRef<HTMLDivElement>(null);
  const div1Ref = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLDivElement>(null);
  const div3Ref = useRef<HTMLDivElement>(null);
  const div4Ref = useRef<HTMLDivElement>(null);
  const div5Ref = useRef<HTMLDivElement>(null);
  const div6Ref = useRef<HTMLDivElement>(null);
  const div7Ref = useRef<HTMLDivElement>(null);

  return (
    <div
      className="relative flex h-[500px] w-full items-center justify-center overflow-hidden bg-background p-10"
      ref={containerRef}
    >
      <div className="flex h-full w-full flex-row items-stretch justify-between gap-10 max-w-4xl">
        <div className="flex flex-col justify-center gap-6">
          <Circle ref={div1Ref}>
            <Database className="h-6 w-6 text-muted-foreground" />
          </Circle>
          <Circle ref={div2Ref}>
            <FileText className="h-6 w-6 text-muted-foreground" />
          </Circle>
          <Circle ref={div3Ref}>
            <MessageSquare className="h-6 w-6 text-muted-foreground" />
          </Circle>
          <Circle ref={div4Ref}>
            <Search className="h-6 w-6 text-muted-foreground" />
          </Circle>
          <Circle ref={div5Ref}>
            <Layout className="h-6 w-6 text-muted-foreground" />
          </Circle>
        </div>
        <div className="flex flex-col justify-center">
          <Circle ref={div6Ref} className="h-24 w-24 border-primary/20 bg-white">
            <Cpu className="h-12 w-12 text-primary animate-pulse" />
          </Circle>
        </div>
        <div className="flex flex-col justify-center">
          <Circle ref={div7Ref}>
            <User className="h-6 w-6 text-primary" />
          </Circle>
        </div>
      </div>

      {/* SVG Beams */}
      <svg
        className="absolute inset-0 h-full w-full pointer-events-none"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <Beam containerRef={containerRef} fromRef={div1Ref} toRef={div6Ref} />
        <Beam containerRef={containerRef} fromRef={div2Ref} toRef={div6Ref} />
        <Beam containerRef={containerRef} fromRef={div3Ref} toRef={div6Ref} />
        <Beam containerRef={containerRef} fromRef={div4Ref} toRef={div6Ref} />
        <Beam containerRef={containerRef} fromRef={div5Ref} toRef={div6Ref} />
        <Beam containerRef={containerRef} fromRef={div6Ref} toRef={div7Ref} />
      </svg>
    </div>
  );
}

function Beam({ 
  containerRef, 
  fromRef, 
  toRef 
}: { 
  containerRef: React.RefObject<HTMLDivElement>, 
  fromRef: React.RefObject<HTMLDivElement>, 
  toRef: React.RefObject<HTMLDivElement> 
}) {
  const [path, setPath] = React.useState("");

  React.useEffect(() => {
    const updatePath = () => {
      if (!containerRef.current || !fromRef.current || !toRef.current) return;
      const containerRect = containerRef.current.getBoundingClientRect();
      const fromRect = fromRef.current.getBoundingClientRect();
      const toRect = toRef.current.getBoundingClientRect();

      const startX = ((fromRect.left + fromRect.width / 2) - containerRect.left) / containerRect.width * 100;
      const startY = ((fromRect.top + fromRect.height / 2) - containerRect.top) / containerRect.height * 100;
      const endX = ((toRect.left + toRect.width / 2) - containerRect.left) / containerRect.width * 100;
      const endY = ((toRect.top + toRect.height / 2) - containerRect.top) / containerRect.height * 100;

      const ctrlX = (startX + endX) / 2;
      setPath(`M ${startX} ${startY} C ${ctrlX} ${startY}, ${ctrlX} ${endY}, ${endX} ${endY}`);
    };

    updatePath();
    window.addEventListener('resize', updatePath);
    return () => window.removeEventListener('resize', updatePath);
  }, [containerRef, fromRef, toRef]);

  return (
    <>
      <path
        d={path}
        fill="none"
        stroke="currentColor"
        strokeWidth="0.2"
        className="text-border"
      />
      <motion.path
        d={path}
        fill="none"
        stroke="url(#gradient)"
        strokeWidth="0.4"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: [0, 1, 0] }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: Math.random() * 2
        }}
      />
      <defs>
        <linearGradient id="gradient" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="var(--primary)" stopOpacity="0" />
          <stop offset="50%" stopColor="var(--primary)" stopOpacity="1" />
          <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
        </linearGradient>
      </defs>
    </>
  );
}
