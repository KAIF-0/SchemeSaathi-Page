import { schemes, type Scheme, type InsertScheme } from "@shared/schema";
import { db } from "./db";

export interface IStorage {
  getSchemes(): Promise<Scheme[]>;
  createScheme(scheme: InsertScheme): Promise<Scheme>;
}

export class DatabaseStorage implements IStorage {
  async getSchemes(): Promise<Scheme[]> {
    return await db.select().from(schemes);
  }

  async createScheme(insertScheme: InsertScheme): Promise<Scheme> {
    const [scheme] = await db.insert(schemes).values(insertScheme).returning();
    return scheme;
  }
}

export const storage = new DatabaseStorage();
