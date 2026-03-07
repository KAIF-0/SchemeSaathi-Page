import BlurFade from "@/components/ui/blur-fade";
import { AnimatedProcessBeam } from "@/components/ui/animated-process-beam";
import { MessageCircle, Mic, FileText, ShieldCheck, Languages, MapPin, Bell } from "lucide-react";

export default function Home() {
  const features = [
    { icon: Mic, title: "Voice-first AI", desc: "Interact naturally using voice commands instead of typing out long forms." },
    { icon: FileText, title: "WhatsApp-first profiling", desc: "Before recommendations, we ask your profile questions directly on WhatsApp and guide you step by step." },
    { icon: ShieldCheck, title: "Source-grounded accuracy", desc: "Every scheme recommendation is backed by verifiable government sources." },
    { icon: Languages, title: "Hyper-local translation", desc: "Communicate in your regional language seamlessly with native translation." },
    { icon: MapPin, title: "Step-by-step guidance", desc: "Know exactly where to go and what to do next to claim your benefits." },
    { icon: Bell, title: "Continuously updated data", desc: "Schemes are refreshed from official government sources, so information stays valid and up to date." },
  ];

  const techLogos = ["AWS", "LangGraph", "Upstash", "Index", "LangChain", "Gemini", "Bhashini", "Twilio"];

  return (
    <div className="min-h-screen bg-warm-mesh pt-20">
      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32 flex flex-col items-center text-center overflow-hidden">
        <BlurFade delay={0.1}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/20 text-secondary-foreground font-semibold text-sm mb-8 border border-secondary/30">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
            </span>
            Live for Citizens
          </div>
        </BlurFade>

        <BlurFade delay={0.2}>
          <h1 className="text-5xl md:text-7xl lg:text-8xl max-w-5xl font-display font-black leading-[1.1] tracking-tighter text-balance text-foreground uppercase">
            Discover Government Schemes Meant For You — <span className="text-gradient">Instantly</span>
          </h1>
        </BlurFade>

        <BlurFade delay={0.3}>
          <p className="mt-8 text-xl md:text-2xl text-muted-foreground max-w-2xl font-medium text-balance">
            Stop searching. Start claiming. Our AI matches your profile to thousands of benefits and delivers them directly to your WhatsApp.
          </p>
        </BlurFade>

        <BlurFade delay={0.4} className="mt-12 flex flex-col sm:flex-row items-center gap-6">
          <a
            href="https://wa.me/14155238886"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex items-center justify-center gap-3 bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_40px_rgba(224,93,58,0.3)] hover:shadow-[0_0_60px_rgba(224,93,58,0.5)] rounded-full px-8 py-5 text-xl font-bold transition-all hover:-translate-y-1"
          >
            <MessageCircle className="w-6 h-6" />
            Chat on WhatsApp
          </a>
        </BlurFade>
      </section>

      {/* Demo Video Section */}
      <section className="py-20 bg-background border-y border-border/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BlurFade inView>
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground">See SchemeSaathi in Action</h2>
              <p className="mt-4 text-lg md:text-xl text-muted-foreground font-medium">
                Quick walkthrough of WhatsApp-based profiling and scheme guidance.
              </p>
            </div>
          </BlurFade>

          <BlurFade delay={0.1} inView>
            <div className="relative w-full aspect-video rounded-3xl overflow-hidden border border-border bg-black shadow-[0_20px_70px_rgba(0,0,0,0.18)]">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/CmXMZQANbko"
                title="SchemeSaathi Demo Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </BlurFade>
        </div>
      </section>

      {/* Beam Animation Section */}
      <section className="py-24 bg-white border-y border-border relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
          <BlurFade inView>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground">
              How SchemeSaathi Works Behind The Scenes
            </h2>
            <p className="mt-4 text-xl text-muted-foreground font-medium">From query to delivery in milliseconds.</p>
          </BlurFade>
        </div>
        <AnimatedProcessBeam />
      </section>

      {/* Features Section */}
      <section className="py-24 bg-warm-mesh">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <BlurFade key={idx} delay={idx * 0.1} inView>
                <div className="glass-panel rounded-3xl p-8 h-full flex flex-col items-start hover-lift transition-all duration-300 group">
                  <div className="w-14 h-14 rounded-2xl bg-secondary/20 flex items-center justify-center text-primary mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all">
                    <feature.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-black uppercase text-foreground mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">{feature.desc}</p>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Logos */}
      <section className="py-20 bg-background border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-8">Powered By Industry Leaders</p>
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6">
            {techLogos.map((tech) => (
              <div
                key={tech}
                className="px-5 py-3 rounded-2xl border border-border/70 bg-card/70 text-lg md:text-xl font-display font-black text-foreground hover:border-primary/50 hover:text-primary transition-all cursor-default"
              >
                {tech}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-[#E5A96E] to-primary opacity-10" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <BlurFade inView>
            <h2 className="text-5xl md:text-7xl font-display font-black text-foreground text-balance">
              Access What You Deserve
            </h2>
            <p className="mt-6 text-2xl text-muted-foreground">
              Join thousands of citizens receiving benefits today.
            </p>
            <div className="mt-12">
              <a
                href="https://wa.me/14155238886"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-foreground text-background hover:bg-foreground/90 shadow-2xl rounded-full px-10 py-5 text-2xl font-bold transition-all hover:scale-105"
              >
                <MessageCircle className="w-7 h-7 text-green-400" />
                Start Chatting Now
              </a>
            </div>
          </BlurFade>
        </div>
      </section>
    </div>
  );
}
