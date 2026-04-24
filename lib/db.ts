import fs from "fs";
import path from "path";
import { DB } from "@/types";

/**
 * Simple file-based database utility
 * - Reads/writes db.json
 * - Used for local persistence
 * - Not intended for production-scale
 */

const dbPath = path.join(process.cwd(), "db.json");

// Default structure to prevent crashes
const defaultDB: DB = {
  users: [],
  projects: [],
  tasks: [],
  logs: []
};

// Reads and parses the database file
export function readDB(): DB {
  try {
    if (!fs.existsSync(dbPath)) {
      writeDB(defaultDB);
      return defaultDB;
    }

    const file = fs.readFileSync(dbPath, "utf-8");
    return file ? JSON.parse(file) : defaultDB;
  } catch (err) {
    console.error("Failed to read DB:", err);
    return defaultDB;
  }
}

// Writes full database object to file
export function writeDB(data: DB) {
  try {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("Failed to write DB:", err);
  }
}