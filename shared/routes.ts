import { z } from 'zod';
import { insertSchemeSchema, schemes } from './schema';

export const errorSchemas = {
  internal: z.object({ message: z.string() }),
};

export const api = {
  schemes: {
    list: {
      method: 'GET' as const,
      path: '/api/schemes' as const,
      responses: {
        200: z.array(z.custom<typeof schemes.$inferSelect>()),
      },
    }
  }
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}

export type SchemeResponse = z.infer<typeof api.schemes.list.responses[200]>;
