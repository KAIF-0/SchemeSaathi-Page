import { useState, useMemo, useEffect } from "react";
import { useSchemes } from "@/hooks/use-schemes";
import BlurFade from "@/components/ui/blur-fade";
import { Search, Filter, ExternalLink, Loader2, AlertCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@shared/routes";

export default function SchemesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchQuery), 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const { data: schemes, isLoading, error } = useQuery({
    queryKey: [api.schemes.list.path, debouncedSearch],
    queryFn: async () => {
      const url = new URL(api.schemes.list.path, window.location.origin);
      if (debouncedSearch) url.searchParams.set("search", debouncedSearch);
      const res = await fetch(url.toString());
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json() as Promise<any[]>;
    }
  });

  // Extract unique tags for filtering
  const allTags = useMemo(() => {
    if (!schemes) return [];
    const tags = new Set<string>();
    schemes.forEach(s => s.tags.forEach(t => tags.add(t)));
    return Array.from(tags).sort();
  }, [schemes]);

  // Filter logic
  const filteredSchemes = useMemo(() => {
    if (!schemes) return [];
    return schemes.filter(scheme => {
      const matchesTag = selectedTag ? scheme.tags.includes(selectedTag) : true;
      return matchesTag;
    });
  }, [schemes, selectedTag]);

  return (
    <div className="min-h-screen bg-background pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <BlurFade>
          <div className="mb-12 md:mb-16">
            <h1 className="text-4xl md:text-6xl font-display font-black text-foreground">
              Scheme Directory
            </h1>
            <p className="mt-4 text-xl text-muted-foreground max-w-3xl">
              Browse our comprehensive database of government schemes. Find exactly what applies to your unique situation.
            </p>
          </div>

          {/* Search and Filter Bar */}
          <div className="bg-card p-4 md:p-6 rounded-3xl shadow-sm border border-border flex flex-col md:flex-row gap-4 items-center mb-12">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-6 h-6" />
              <input 
                type="text" 
                placeholder="Search by scheme name or keywords..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-14 pr-4 py-4 rounded-2xl bg-muted/50 border-none focus:ring-4 focus:ring-primary/20 text-lg transition-all"
              />
            </div>
            
            <div className="w-full md:w-auto overflow-x-auto pb-2 md:pb-0 hide-scrollbar flex items-center gap-2">
              <button
                onClick={() => setSelectedTag(null)}
                className={`whitespace-nowrap px-6 py-3 rounded-2xl font-bold transition-all ${
                  selectedTag === null ? "bg-primary text-primary-foreground shadow-md" : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                All Schemes
              </button>
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                  className={`whitespace-nowrap px-6 py-3 rounded-2xl font-bold transition-all ${
                    tag === selectedTag ? "bg-primary text-primary-foreground shadow-md" : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </BlurFade>

        {/* Content Area */}
        {isLoading ? (
          <div className="py-32 flex flex-col items-center justify-center">
            <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
            <p className="text-xl font-bold text-muted-foreground">Loading schemes...</p>
          </div>
        ) : error ? (
          <div className="py-32 flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 bg-destructive/10 rounded-full flex items-center justify-center text-destructive mb-6">
              <AlertCircle className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-foreground">Failed to load schemes</h3>
            <p className="text-muted-foreground mt-2 max-w-md">We couldn't connect to the directory. Please try refreshing the page.</p>
          </div>
        ) : filteredSchemes.length === 0 ? (
          <div className="py-32 flex flex-col items-center justify-center text-center">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center text-muted-foreground mb-6">
              <Filter className="w-12 h-12" />
            </div>
            <h3 className="text-2xl font-bold text-foreground">No schemes found</h3>
            <p className="text-muted-foreground mt-2">Try adjusting your search query or filters.</p>
            <button 
              onClick={() => { setSearchQuery(""); setSelectedTag(null); }}
              className="mt-6 text-primary font-bold hover:underline"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredSchemes.map((scheme, idx) => (
              <BlurFade key={scheme.id} delay={idx * 0.05}>
                <div className="bg-card h-full rounded-3xl p-6 md:p-8 border border-border/50 shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-300 flex flex-col group relative overflow-hidden">
                  
                  {/* Decorative background flare */}
                  <div className="absolute -top-20 -right-20 w-40 h-40 bg-secondary/10 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors duration-500" />
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {scheme.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-secondary/15 text-secondary-foreground text-xs font-bold uppercase tracking-wider rounded-lg border border-secondary/20">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <h3 className="text-2xl font-display font-bold text-foreground mb-2 leading-tight line-clamp-2">
                    {scheme.name}
                  </h3>
                  <h4 className="text-sm font-bold text-primary mb-4 uppercase tracking-wide">
                    {scheme.subHead}
                  </h4>
                  
                  <p className="text-muted-foreground mb-8 line-clamp-3 leading-relaxed flex-1">
                    {scheme.desc}
                  </p>
                  
                  <a 
                    href={scheme.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-muted text-foreground font-bold hover:bg-primary hover:text-white transition-colors mt-auto"
                  >
                    View Details
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </BlurFade>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
