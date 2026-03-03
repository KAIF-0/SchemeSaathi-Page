import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import fs from "fs/promises";
import path from "path";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // GET /api/schemes
  app.get(api.schemes.list.path, async (req, res) => {
    const allSchemes = await storage.getSchemes();
    res.status(200).json(allSchemes);
  });

  return httpServer;
}

// Seed the database with data from the JSON file
export async function seedDatabase() {
  const existingSchemes = await storage.getSchemes();
  if (existingSchemes.length === 0) {
    console.log("Seeding database with schemes...");
    try {
      const dataPath = path.resolve(process.cwd(), "attached_assets/corrected_schemes_1772542674499.json");
      const fileContent = await fs.readFile(dataPath, "utf-8");
      const schemesData = JSON.parse(fileContent);

      // Insert first 20 schemes to avoid taking too long, or all of them
      for (const item of schemesData.slice(0, 50)) {
        await storage.createScheme({
          name: item.Name,
          subHead: item.SubHead,
          desc: item.Desc,
          tags: item.Tags || [],
          link: item.Link,
        });
      }
      console.log("Database seeded successfully.");
    } catch (err) {
      console.error("Failed to seed database:", err);
    }
  }
}
