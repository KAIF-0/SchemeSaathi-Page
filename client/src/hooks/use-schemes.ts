import { useQuery } from "@tanstack/react-query";
import { api } from "@shared/routes";

// Using the type directly from the schema manifest
type SchemeResponse = typeof api.schemes.list.responses[200] extends { parse: (val: any) => infer T } ? T : any[];

export function useSchemes() {
  return useQuery({
    queryKey: [api.schemes.list.path],
    queryFn: async () => {
      const res = await fetch(api.schemes.list.path, { credentials: "include" });
      
      if (!res.ok) {
        throw new Error("Failed to fetch schemes");
      }
      
      const data = await res.json();
      
      // Attempt Zod parsing if available, else return raw
      try {
        return api.schemes.list.responses[200].parse(data) as SchemeResponse;
      } catch (err) {
        console.error("[Zod] schemes.list validation failed:", err);
        return data as SchemeResponse;
      }
    },
  });
}
