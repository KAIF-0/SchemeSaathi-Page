import { schemes, type Scheme, type InsertScheme } from "@shared/schema";
import { db } from "./db";
import { sql } from "drizzle-orm";

export interface IStorage {
  getSchemes(search?: string): Promise<Scheme[]>;
  createScheme(scheme: InsertScheme): Promise<Scheme>;
}

export class DatabaseStorage implements IStorage {
  async getSchemes(search?: string): Promise<Scheme[]> {
    if (search) {
      const lowerSearch = `%${search.toLowerCase()}%`;
      return await db.select().from(schemes).where(
        sql`lower(${schemes.name}) || ' ' || lower(${schemes.desc}) LIKE ${lowerSearch}`
      );
    }
    return await db.select().from(schemes);
  }

  async createScheme(insertScheme: InsertScheme): Promise<Scheme> {
    const [scheme] = await db.insert(schemes).values(insertScheme).returning();
    return scheme;
  }
}

export const storage = new DatabaseStorage();
