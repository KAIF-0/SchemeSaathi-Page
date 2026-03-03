import { pgTable, text, serial } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const schemes = pgTable("schemes", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  subHead: text("subHead").notNull(),
  desc: text("desc").notNull(),
  tags: text("tags").array().notNull(),
  link: text("link").notNull(),
});

export const insertSchemeSchema = createInsertSchema(schemes).omit({ id: true });

export type InsertScheme = z.infer<typeof insertSchemeSchema>;
export type Scheme = typeof schemes.$inferSelect;
