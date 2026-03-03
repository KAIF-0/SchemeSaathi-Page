export function Footer() {
  return (
    <footer className="bg-foreground text-background py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-background text-foreground rounded-lg flex items-center justify-center font-display font-black shadow-lg">
            S
          </div>
          <span className="font-display font-bold text-xl tracking-tight">
            Scheme<span className="text-secondary">Saathi</span>
          </span>
        </div>
        
        <p className="text-muted-foreground text-sm font-medium text-center md:text-left">
          Made by bunMaska team using AWS services
        </p>
        
        <p className="text-background/60 text-sm font-medium text-center md:text-right">
          &copy; 2026 SchemeSaathi. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
